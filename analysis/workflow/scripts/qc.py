#!/usr/bin/env python3
"""Validated STARsolo QC tasks. No inferred chemistry and no biological filtering cutoffs."""
from __future__ import annotations
import argparse
import collections
import csv
import gzip
import hashlib
import itertools
import json
import math
from pathlib import Path
import re
import shlex
import shutil
import subprocess
import sys
import yaml

ROOT = Path(__file__).resolve().parents[2]
FEATURES = ['Gene', 'GeneFull', 'SJ', 'Velocyto']
TAGS = ['NH', 'HI', 'AS', 'nM', 'NM', 'MD', 'jM', 'jI', 'CR', 'CY', 'UR', 'UY',
        'CB', 'UB', 'GX', 'GN', 'sS', 'sQ', 'sM', 'sF']
SAFE_ID = re.compile(r'^[A-Za-z0-9][A-Za-z0-9_-]*$')

def require(test, message):
    if not test:
        raise ValueError(message)

def dump(filename, data):
    filename = Path(filename)
    filename.parent.mkdir(parents=True, exist_ok=True)
    filename.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

def text_open(filename):
    return gzip.open(filename, 'rt', encoding='ascii') if str(filename).endswith('.gz') else open(filename, encoding='ascii')

def digest(filename):
    value = hashlib.sha256()
    with open(filename, 'rb') as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b''):
            value.update(block)
    return value.hexdigest()

def resolve_file(value, key, base):
    require(isinstance(value, str) and value.strip() and 'REPLACE' not in value, f'{key}: provide a real input file.')
    require(not any(c in value for c in '\n\r\t,'), f'{key}: paths cannot contain newlines, tabs or commas (STAR lane separator).')
    result = Path(value).expanduser()
    if not result.is_absolute():
        result = base / result
    result = result.resolve()
    require(result.is_file() and result.stat().st_size > 0, f'{key}: missing or empty file: {result}')
    return str(result)

def integer(value, key, minimum=1):
    require(type(value) is int and value >= minimum, f'{key}: explicitly provide an integer >= {minimum}.')
    return value

def read_samples(filename, base):
    with open(filename, newline='', encoding='utf-8-sig') as handle:
        reader = csv.DictReader(handle, delimiter='\t')
        columns = ['library_id', 'lane_id', 'cdna_fastq', 'barcode_fastq', 'strain_background',
                   'condition', 'culture_replicate', 'batch']
        require(reader.fieldnames == columns, 'samples TSV columns must exactly match samples.example.tsv.')
        rows = list(reader)
    require(rows, 'samples TSV has no libraries.')
    seen_keys, seen_files, metadata = set(), set(), {}
    for row in rows:
        require(None not in row and all(v is not None and v.strip() for v in row.values()), 'samples TSV contains empty/extra fields.')
        for key in ['library_id', 'lane_id']:
            require(SAFE_ID.fullmatch(row[key]) and 'REPLACE' not in row[key], f'Invalid {key}: {row[key]}')
        key = (row['library_id'], row['lane_id'])
        require(key not in seen_keys, f'Duplicate library/lane: {key}')
        seen_keys.add(key)
        values = tuple(row[name] for name in columns[4:])
        require(row['library_id'] not in metadata or metadata[row['library_id']] == values,
                f'{row["library_id"]}: metadata differs between lanes; do not merge biological samples.')
        metadata[row['library_id']] = values
        for role in ['cdna_fastq', 'barcode_fastq']:
            row[role] = resolve_file(row[role], role, base)
            require(row[role] not in seen_files, f'FASTQ reused in multiple lanes/roles: {row[role]}')
            require(re.search(r'\.(?:fastq|fq)(?:\.gz)?$', row[role], re.I), f'Unsupported FASTQ extension: {row[role]}')
            seen_files.add(row[role])
    return rows

def validate_config(config, base=None):
    base = Path(base or Path.cwd()).resolve()
    require(isinstance(config, dict) and config.get('schema_version') == 1, 'schema_version must be 1.')
    config = json.loads(json.dumps(config))
    allowed = {'schema_version', 'samples', 'output_dir', 'protocol', 'reference', 'alignment', 'gene_groups', 'resources'}
    require(not (set(config) - allowed), 'Unknown config keys: ' + ', '.join(set(config) - allowed))
    for name in ['protocol', 'reference', 'alignment', 'resources']:
        require(isinstance(config.get(name), dict), f'{name}: section is required.')
    p, r, a = config['protocol'], config['reference'], config['alignment']
    require(isinstance(p.get('name'), str) and p['name'].strip(), 'protocol.name: supply the actual protocol/chemistry.')
    require(p.get('layout') == 'dedicated_barcode_read', 'Supported layout: dedicated_barcode_read only (single cDNA read + separate fixed CB/UMI read).')
    require(p.get('barcode_orientation') == 'forward', 'barcode_orientation must be verified as forward; transform reverse-complement layouts before using this workflow.')
    require(p.get('quality_encoding') == 'phred33', 'quality_encoding must be explicitly confirmed as phred33.')
    for key in ['cb_start', 'cb_length', 'umi_start', 'umi_length', 'barcode_read_length']:
        integer(p.get(key), 'protocol.' + key)
    require(p['cb_length'] <= 31 and p['umi_length'] <= 16, 'STAR 2.7.11b CB_UMI_Simple supports CB <= 31 and UMI <= 16 bases.')
    cb = set(range(p['cb_start'], p['cb_start'] + p['cb_length']))
    umi = set(range(p['umi_start'], p['umi_start'] + p['umi_length']))
    require(not cb.intersection(umi), 'CB and UMI intervals overlap.')
    require(max(cb | umi) <= p['barcode_read_length'], 'CB/UMI intervals exceed barcode_read_length.')
    require(p.get('strand') in ['Forward', 'Reverse', 'Unstranded'], 'protocol.strand must be Forward, Reverse or Unstranded.')
    require(p.get('cb_match') in ['Exact', '1MM', '1MM_multi', '1MM_multi_pseudocounts', '1MM_multi_Nbase_pseudocounts'], 'Select a supported protocol.cb_match.')
    require(p.get('umi_dedup') in ['Exact', '1MM_All', '1MM_Directional_UMItools', '1MM_Directional', '1MM_CR'], 'Select a supported protocol.umi_dedup.')
    require(p.get('umi_filter') in ['-', 'MultiGeneUMI', 'MultiGeneUMI_All', 'MultiGeneUMI_CR'], 'Select a supported protocol.umi_filter.')
    require(p['umi_filter'] != 'MultiGeneUMI_CR' or p['umi_dedup'] == '1MM_CR', 'MultiGeneUMI_CR requires 1MM_CR deduplication.')
    p['whitelist'] = resolve_file(p.get('whitelist'), 'protocol.whitelist', base)
    for key in ['fasta', 'gtf']:
        r[key] = resolve_file(r.get(key), 'reference.' + key, base)
        require(not r[key].endswith('.gz'), 'Reference FASTA/GTF must be uncompressed.')
    require(isinstance(r.get('source'), str) and r['source'].strip(), 'reference.source: provide release/accession provenance.')
    integer(r.get('sjdb_overhang'), 'reference.sjdb_overhang')
    require(isinstance(r.get('mitochondrial_contigs'), list) and all(isinstance(x, str) and x for x in r['mitochondrial_contigs']), 'reference.mitochondrial_contigs: supply exact IDs, or [] for not assessed.')
    for key in ['intron_min', 'intron_max', 'multimappers_max']:
        integer(a.get(key), 'alignment.' + key)
    require(a['intron_max'] >= a['intron_min'], 'intron_max must be >= intron_min.')
    filt = a.get('cell_filter')
    require(isinstance(filt, list) and (filt == ['None'] or (len(filt) == 2 and filt[0] == 'TopCells' and type(filt[1]) is int and filt[1] > 0)),
            'cell_filter must be [None] or [TopCells, explicit_integer]; raw matrices are always retained.')
    require(type(a.get('transcriptome_bam')) is bool, 'alignment.transcriptome_bam must be true or false.')
    resource_keys = ['star_threads', 'star_mem_mb', 'star_runtime_min', 'index_threads', 'index_mem_mb',
                     'index_runtime_min', 'qc_mem_mb', 'qc_runtime_min', 'fastqc_threads']
    for key in resource_keys:
        integer(config['resources'].get(key), 'resources.' + key)
    config['samples'] = resolve_file(config.get('samples'), 'samples', base)
    rows = read_samples(config['samples'], base)
    for library in {row['library_id'] for row in rows}:
        compressed = {row[role].endswith('.gz') for row in rows if row['library_id'] == library for role in ['cdna_fastq', 'barcode_fastq']}
        require(len(compressed) == 1, f'{library}: mix of compressed/uncompressed lanes is not supported; standardize files without trimming.')
    out = config.get('output_dir')
    require(isinstance(out, str) and out and not Path(out).is_absolute() and re.fullmatch(r'[A-Za-z0-9_-]+(?:/[A-Za-z0-9_-]+)*', out), 'output_dir: use a dedicated relative directory, such as results or results/run1.')
    output_path = (base / out).resolve()
    protected = [config['samples'], p['whitelist'], r['fasta'], r['gtf']] + [row[role] for row in rows for role in ['cdna_fastq', 'barcode_fastq']]
    require(not any(Path(x).is_relative_to(output_path) for x in protected), 'Input files must not be inside output_dir.')
    groups = config.get('gene_groups', {})
    require(isinstance(groups, dict), 'gene_groups must be a mapping of tag to gene-ID text file.')
    for tag, filename in groups.items():
        require(SAFE_ID.fullmatch(tag), f'Invalid gene group tag: {tag}')
        groups[tag] = resolve_file(filename, 'gene_groups.' + tag, base)
    config['gene_groups'] = groups
    config['_rows'] = rows
    return config

def load_config(filename):
    with open(filename, encoding='utf-8') as handle:
        return validate_config(yaml.safe_load(handle))

def reference_check(config):
    r = config['reference']
    contigs, current = {}, None
    with open(r['fasta'], encoding='ascii') as handle:
        for line in handle:
            if line.startswith('>'):
                current = line[1:].split()[0]
                require(current not in contigs, f'Duplicate FASTA contig: {current}')
                contigs[current] = 0
            elif line.strip():
                require(current is not None and re.fullmatch('[ACGTRYKMSWBDHVNacgtrykmswbdhvn]+', line.strip()), 'Malformed FASTA sequence.')
                contigs[current] += len(line.strip())
    require(contigs and all(contigs.values()), 'FASTA has missing/empty sequences.')
    require(set(r['mitochondrial_contigs']).issubset(contigs), 'Mitochondrial contig IDs do not match FASTA.')
    genes, transcripts = {}, collections.defaultdict(list)
    with open(r['gtf'], encoding='utf-8') as handle:
        for number, line in enumerate(handle, 1):
            if line.startswith('#') or not line.strip():
                continue
            fields = line.rstrip('\n').split('\t')
            require(len(fields) == 9, f'GTF line {number}: expected 9 columns.')
            chrom, _, feature, start, end, _, strand, _, attrs = fields
            require(chrom in contigs, f'GTF contig absent from FASTA: {chrom}')
            require(1 <= int(start) <= int(end) <= contigs[chrom], f'GTF coordinates out of range at line {number}.')
            if feature != 'exon':
                continue
            attributes = dict(re.findall(r'(\S+)\s+"([^"]*)"', attrs))
            gene, transcript = attributes.get('gene_id'), attributes.get('transcript_id')
            require(gene and transcript and strand in ['+', '-'], f'GTF exon {number} requires gene_id, transcript_id and strand.')
            require(gene not in genes or genes[gene]['contig'] == chrom, f'Gene ID occurs on multiple contigs: {gene}')
            genes[gene] = {'contig': chrom, 'name': attributes.get('gene_name', gene)}
            transcripts[(chrom, transcript)].append((int(start), int(end)))
    require(genes, 'GTF contains no usable exons.')
    introns = []
    for intervals in transcripts.values():
        ordered = sorted(set(intervals))
        for left, right in zip(ordered, ordered[1:]):
            if right[0] > left[1] + 1:
                introns.append(right[0] - left[1] - 1)
    whitelist = set()
    with open(config['protocol']['whitelist'], encoding='ascii') as handle:
        for line in handle:
            barcode = line.strip()
            require(re.fullmatch('[ACGT]{' + str(config['protocol']['cb_length']) + '}', barcode), 'Whitelist must contain one unsuffixed A/C/G/T barcode of cb_length per line.')
            require(barcode not in whitelist, f'Duplicate whitelist barcode: {barcode}')
            whitelist.add(barcode)
    require(whitelist, 'Whitelist is empty.')
    group_genes = {}
    for tag, filename in config['gene_groups'].items():
        ids = {line.strip() for line in Path(filename).read_text(encoding='utf-8').splitlines() if line.strip()}
        require(ids and ids.issubset(genes), f'gene_groups.{tag}: IDs must be present in GTF exon gene_id.')
        group_genes[tag] = sorted(ids)
    total = sum(contigs.values())
    # STAR manual recommends min(14, log2(genomeLength)/2 - 1) for small genomes.
    sa_bases = max(1, min(14, math.floor(math.log2(total) / 2 - 1)))
    return {'contigs': contigs, 'genome_bases': total, 'genes': genes, 'gene_groups': group_genes,
            'annotated_intron_count': len(introns), 'annotated_intron_min': min(introns) if introns else None,
            'annotated_intron_max': max(introns) if introns else None, 'whitelist_count': len(whitelist),
            'genomeSAindexNbases': sa_bases, 'mitochondrial_contigs': r['mitochondrial_contigs'],
            'sha256': {key: digest(filename) for key, filename in {'fasta': r['fasta'], 'gtf': r['gtf'], 'whitelist': config['protocol']['whitelist']}.items()}}

def fastq_records(filename):
    with text_open(filename) as handle:
        number = 0
        while True:
            header = handle.readline()
            if not header:
                break
            number += 1
            sequence, plus, quality = [handle.readline().rstrip('\r\n') for _ in range(3)]
            require(header.startswith('@') and plus.startswith('+') and sequence and len(sequence) == len(quality), f'{filename}: malformed/truncated FASTQ record {number}.')
            require(re.fullmatch('[ACGTNacgtn]+', sequence), f'{filename}: unsupported bases in record {number}.')
            require(all(33 <= ord(q) <= 126 for q in quality), f'{filename}: invalid Phred+33 quality characters at record {number}.')
            identity = re.sub(r'/[12]$', '', header[1:].split()[0])
            yield identity, sequence.upper(), quality

def fastq_check(config, library, lane):
    row = next(row for row in config['_rows'] if row['library_id'] == library and row['lane_id'] == lane)
    p = config['protocol']
    wl = set(Path(p['whitelist']).read_text(encoding='ascii').splitlines())
    metrics = collections.Counter(); lengths = collections.defaultdict(collections.Counter)
    for cdna, barcode in itertools.zip_longest(fastq_records(row['cdna_fastq']), fastq_records(row['barcode_fastq'])):
        require(cdna is not None and barcode is not None, f'{library}/{lane}: unequal FASTQ record counts.')
        require(cdna[0] == barcode[0], f'{library}/{lane}: cDNA/barcode read IDs differ: {cdna[0]} vs {barcode[0]}')
        require(len(barcode[1]) == p['barcode_read_length'], f'{library}/{lane}: barcode read length differs from declared length.')
        require(len(cdna[1]) <= config['reference']['sjdb_overhang'] + 1, f'{library}/{lane}: cDNA reads exceed sjdb_overhang + 1; rebuild with actual maximum read length minus 1.')
        cb_slice = slice(p['cb_start'] - 1, p['cb_start'] - 1 + p['cb_length'])
        umi_slice = slice(p['umi_start'] - 1, p['umi_start'] - 1 + p['umi_length'])
        cb, umi = barcode[1][cb_slice], barcode[1][umi_slice]
        metrics['read_pairs'] += 1; metrics['cb_exact_whitelist_reads'] += cb in wl
        metrics['cb_with_N_reads'] += 'N' in cb; metrics['umi_with_N_reads'] += 'N' in umi
        for role, sequence, qual in [('cdna', cdna[1], cdna[2]), ('cb', cb, barcode[2][cb_slice]), ('umi', umi, barcode[2][umi_slice])]:
            metrics[role + '_bases'] += len(sequence)
            metrics[role + '_q30_bases'] += sum(ord(q) - 33 >= 30 for q in qual)
            metrics[role + '_N_bases'] += sequence.count('N')
            lengths[role][len(sequence)] += 1
    require(metrics['read_pairs'] > 0, f'{library}/{lane}: FASTQs are empty.')
    return {'library_id': library, 'lane_id': lane, 'metrics': dict(metrics),
            'length_histograms': {key: dict(value) for key, value in lengths.items()},
            'sha256_compressed_or_plain_bytes': {role: digest(row[role]) for role in ['cdna_fastq', 'barcode_fastq']}}

def star_args(config, library, index, output, threads):
    rows = [row for row in config['_rows'] if row['library_id'] == library]
    require(rows, 'Unknown library: ' + library)
    p, a = config['protocol'], config['alignment']
    args = ['STAR', '--runThreadN', str(threads), '--genomeDir', str(index), '--readFilesIn',
            ','.join(row['cdna_fastq'] for row in rows), ','.join(row['barcode_fastq'] for row in rows)]
    if rows[0]['cdna_fastq'].endswith('.gz'):
        args += ['--readFilesCommand', 'zcat']
    args += ['--soloType', 'CB_UMI_Simple', '--soloBarcodeMate', '0', '--soloCBstart', str(p['cb_start']),
             '--soloCBlen', str(p['cb_length']), '--soloUMIstart', str(p['umi_start']), '--soloUMIlen', str(p['umi_length']),
             '--soloBarcodeReadLength', str(p['barcode_read_length']), '--soloCBwhitelist', p['whitelist'],
             '--soloCBmatchWLtype', p['cb_match'], '--soloUMIdedup', p['umi_dedup'], '--soloUMIfiltering', p['umi_filter'],
             '--soloStrand', p['strand'], '--soloFeatures', *FEATURES, '--soloMultiMappers', 'Unique',
             '--soloCellFilter', *map(str, a['cell_filter']), '--soloCellReadStats', 'Standard',
             '--genomeChrSetMitochondrial', *(config['reference']['mitochondrial_contigs'] or ['-']),
             '--outSAMtype', 'BAM', 'SortedByCoordinate', '--outSAMunmapped', 'Within',
             '--outSAMattributes', *TAGS, '--outSAMattrRGline', 'ID:' + library, 'SM:' + library,
             '--outFilterMultimapNmax', str(a['multimappers_max']), '--alignIntronMin', str(a['intron_min']),
             '--alignIntronMax', str(a['intron_max']), '--outFileNamePrefix', str(output).rstrip('/\\') + '/',
             '--limitBAMsortRAM', str(config['resources']['star_mem_mb'] * 1000000 // 2)]
    if a['transcriptome_bam']:
        args += ['--quantMode', 'TranscriptomeSAM', '--quantTranscriptomeSAMoutput', 'BanSingleEnd_ExtendSoftclip']
    return args

def run_command(args, log):
    Path(log).parent.mkdir(parents=True, exist_ok=True)
    with open(log, 'a', encoding='utf-8') as handle:
        handle.write('$ ' + shlex.join(map(str, args)) + '\n'); handle.flush()
        subprocess.run(list(map(str, args)), stdout=handle, stderr=subprocess.STDOUT, check=True)

def bam_qc(config, args):
    out = Path(args.output); out.mkdir(parents=True, exist_ok=True)
    bam = Path(args.star_dir) / 'Aligned.sortedByCoord.out.bam'
    run_command(['samtools', 'quickcheck', '-v', bam], out / 'quickcheck.log')
    run_command(['samtools', 'index', '-@', args.threads, bam], out / 'index.log')
    commands = {'flagstat.txt': ['samtools', 'flagstat', '-@', args.threads, bam],
                'stats.txt': ['samtools', 'stats', '-@', args.threads, bam],
                'idxstats.tsv': ['samtools', 'idxstats', bam]}
    for filename, command in commands.items():
        with open(out / filename, 'w', encoding='utf-8') as handle, open(out / 'samtools.log', 'a', encoding='utf-8') as log:
            subprocess.run(list(map(str, command)), stdout=handle, stderr=log, check=True)
    counts, contigs, tags = collections.Counter(), collections.Counter(), collections.Counter()
    cell_contigs = collections.defaultdict(collections.Counter)
    with open(out / 'samtools.log', 'a', encoding='utf-8') as log:
        process = subprocess.Popen(['samtools', 'view', str(bam)], stdout=subprocess.PIPE, stderr=log, text=True)
        try:
            for line in process.stdout:
                fields = line.rstrip('\n').split('\t'); flag = int(fields[1]); counts['all_alignment_records'] += 1
                if flag & (256 | 2048):
                    counts['secondary_or_supplementary_records'] += 1; continue
                counts['primary_records'] += 1
                if flag & 4:
                    counts['primary_unmapped_records'] += 1; continue
                counts['primary_mapped_records'] += 1; chrom = fields[2]; contigs[chrom] += 1
                attributes = {value.split(':', 2)[0]: value.split(':', 2)[2] for value in fields[11:] if value.count(':') >= 2}
                for tag in TAGS:
                    if tag in attributes and attributes[tag] not in ['-', '']: tags[tag] += 1
                counts['primary_mapped_spliced_records'] += 'N' in fields[5]
                counts['primary_mapped_softclipped_records'] += 'S' in fields[5]
                counts['primary_mapped_unique_locus_records'] += attributes.get('NH') == '1'
                cb = attributes.get('CB')
                if cb and cb != '-': cell_contigs[cb][chrom] += 1
                else: counts['primary_mapped_without_corrected_CB'] += 1
            process.stdout.close()
            require(process.wait() == 0, 'samtools view failed; inspect samtools.log.')
        finally:
            if process.poll() is None: process.kill(); process.wait()
    denominator = counts['primary_mapped_records']
    with open(out / 'chromosome_proportions.tsv', 'w', newline='', encoding='utf-8') as handle:
        writer = csv.writer(handle, delimiter='\t'); writer.writerow(['library_id', 'contig', 'primary_mapped_records', 'fraction_of_all_primary_mapped_records'])
        for chrom, value in sorted(contigs.items()): writer.writerow([args.library, chrom, value, value / denominator if denominator else 'NA'])
    with gzip.open(out / 'barcode_chromosome_counts.tsv.gz', 'wt', newline='', encoding='utf-8') as handle:
        writer = csv.writer(handle, delimiter='\t'); writer.writerow(['library_id', 'cell_id', 'barcode', 'contig', 'primary_mapped_records', 'fraction_of_barcode_primary_mapped_records'])
        for cb, values in sorted(cell_contigs.items()):
            total = sum(values.values())
            for chrom, value in sorted(values.items()): writer.writerow([args.library, args.library + ':' + cb, cb, chrom, value, value / total])
    dump(out / 'bam_metrics.json', {'counts': dict(counts), 'tag_present_on_primary_mapped_records': dict(tags),
         'tag_denominator': denominator, 'chromosome_unit': 'primary mapped alignment records, not molecules',
         'corrected_tags_can_be_absent_for_unassigned_reads': True})

def matrix_entries(filename):
    with open(filename, encoding='ascii') as handle:
        require(handle.readline().strip() == '%%MatrixMarket matrix coordinate integer general', 'Expected integer STARsolo matrix: ' + str(filename))
        line = handle.readline()
        while line.startswith('%'): line = handle.readline()
        shape = tuple(map(int, line.split()))
        require(len(shape) == 3 and all(x >= 0 for x in shape), 'Invalid Matrix Market dimensions.')
        yield shape
        entries = 0
        for line in handle:
            if not line.strip(): continue
            row, column, count = map(int, line.split())
            require(1 <= row <= shape[0] and 1 <= column <= shape[1] and count >= 0, 'Invalid matrix entry.')
            entries += 1
            yield row - 1, column - 1, count
        require(entries == shape[2], 'Matrix entry count does not match header.')

def aggregate_matrices(solo, reference):
    """Use integer unique-gene UMI counts; never infer introns by GeneFull minus Gene."""
    values = collections.defaultdict(collections.Counter)
    genes = reference['genes']; mitochondrial = set(reference['mitochondrial_contigs'])
    gene_groups = {name: set(ids) for name, ids in reference['gene_groups'].items()}
    layers = [('Gene', 'matrix.mtx', 'gene'), ('GeneFull', 'matrix.mtx', 'genefull'),
              ('Velocyto', 'spliced.mtx', 'spliced'), ('Velocyto', 'unspliced.mtx', 'unspliced'),
              ('Velocyto', 'ambiguous.mtx', 'ambiguous')]
    for feature, filename, label in layers:
        folder = Path(solo) / feature / 'raw'
        barcodes = (folder / 'barcodes.tsv').read_text(encoding='ascii').splitlines()
        ids = [line.split('\t')[0] for line in (folder / 'features.tsv').read_text(encoding='utf-8').splitlines()]
        require(len(set(barcodes)) == len(barcodes) and len(set(ids)) == len(ids), 'Duplicate barcode/gene identifiers in matrix metadata.')
        require(set(ids).issubset(genes), 'Matrix gene IDs do not match the validated GTF.')
        stream = matrix_entries(folder / filename); shape = next(stream)
        require(shape[:2] == (len(ids), len(barcodes)), 'Matrix dimensions and metadata differ.')
        for row, column, count in stream:
            if not count: continue
            cb, gene = barcodes[column], ids[row]; target = values[cb]
            target[label + '_umis'] += count
            if label == 'gene':
                target['detected_genes'] += 1
                target['top_gene_umis'] = max(target['top_gene_umis'], count)
                if genes[gene]['contig'] in mitochondrial: target['mitochondrial_umis'] += count
                for tag, members in gene_groups.items():
                    if gene in members: target[tag + '_umis'] += count
    return values

def matrix_qc(config, args):
    reference = json.loads(Path(args.reference).read_text(encoding='utf-8'))
    values = aggregate_matrices(Path(args.star_dir) / 'Solo.out', reference)
    metadata = next(row for row in config['_rows'] if row['library_id'] == args.library)
    columns = ['library_id', 'cell_id', 'barcode', 'strain_background', 'condition', 'culture_replicate', 'batch',
               'gene_umis', 'detected_genes', 'genefull_umis', 'top_gene_fraction', 'mitochondrial_umis', 'mitochondrial_fraction',
               'spliced_umis', 'unspliced_umis', 'ambiguous_umis', 'unspliced_fraction_of_spliced_plus_unspliced']
    for tag in reference['gene_groups']: columns += [tag + '_umis', tag + '_fraction']
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(args.output, 'wt', newline='', encoding='utf-8') as handle:
        writer = csv.DictWriter(handle, fieldnames=columns, delimiter='\t'); writer.writeheader()
        for cb, value in sorted(values.items()):
            total = value['gene_umis']; velo_total = value['spliced_umis'] + value['unspliced_umis']
            row = {key: metadata[key] for key in ['library_id', 'strain_background', 'condition', 'culture_replicate', 'batch']}
            row.update({key: value[key] for key in ['gene_umis', 'detected_genes', 'genefull_umis', 'spliced_umis', 'unspliced_umis', 'ambiguous_umis']})
            row.update(cell_id=args.library + ':' + cb, barcode=cb, top_gene_fraction=value['top_gene_umis'] / total if total else 'NA',
                       mitochondrial_umis=value['mitochondrial_umis'] if reference['mitochondrial_contigs'] else 'NA',
                       mitochondrial_fraction=value['mitochondrial_umis'] / total if reference['mitochondrial_contigs'] and total else 'NA',
                       unspliced_fraction_of_spliced_plus_unspliced=value['unspliced_umis'] / velo_total if velo_total else 'NA')
            for tag in reference['gene_groups']:
                row[tag + '_umis'] = value[tag + '_umis']; row[tag + '_fraction'] = value[tag + '_umis'] / total if total else 'NA'
            writer.writerow(row)
    dump(str(args.output) + '.meta.json', {'barcodes_with_any_nonzero_gene_or_velocity_layer': len(values),
         'not_cell_calls': True, 'zero_count_whitelist_barcodes_remain_in_raw_matrices': True,
         'GeneFull_is_not_pure_intronic': True, 'velocity_counts_are_not_velocity_vectors': True,
         'strain_background_is_library_metadata_not_per_cell_genotype_assignment': True})

def parse_args():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='task', required=True)
    sub.add_parser('init')
    for task in ['validate', 'reference', 'fastq', 'index', 'star', 'fastqc', 'bam', 'matrix', 'manifest']:
        item = sub.add_parser(task); item.add_argument('--config', required=True)
        if task != 'validate': item.add_argument('--output', required=True)
        if task in ['fastq', 'star', 'fastqc', 'bam', 'matrix']: item.add_argument('--library', required=True)
        if task in ['fastq', 'fastqc']: item.add_argument('--lane', required=True)
        if task == 'fastqc': item.add_argument('--role', choices=['cdna', 'barcode'], required=True)
        if task in ['index', 'star', 'fastqc', 'bam']: item.add_argument('--threads', type=int, default=1)
        if task in ['index', 'matrix']: item.add_argument('--reference', required=True)
        if task == 'star': item.add_argument('--index', required=True)
        if task in ['bam', 'matrix']: item.add_argument('--star-dir', required=True)
        if task == 'validate': item.add_argument('--inspect-reference', action='store_true')
    slurm = sub.add_parser('validate-slurm'); slurm.add_argument('--profile', required=True)
    return parser.parse_args()

def main():
    args = parse_args()
    if args.task == 'init':
        for source, dest in [('config.example.yaml', 'config.yaml'), ('samples.example.tsv', 'samples.tsv')]:
            target = ROOT / dest
            if target.exists(): print(f'Kept existing {dest}')
            else: shutil.copyfile(ROOT / source, target); print(f'Created {dest}; replace required values.')
        return
    if args.task == 'validate-slurm':
        profile = yaml.safe_load(Path(args.profile).read_text(encoding='utf-8'))
        resources = profile.get('default-resources', {})
        require(profile.get('executor') == 'slurm', 'SLURM profile requires executor: slurm.')
        for key in ['slurm_partition', 'slurm_account']:
            if key == 'slurm_account' and profile.get('slurm-no-account') is True: continue
            value = resources.get(key)
            require(isinstance(value, str) and value and 'REPLACE' not in value, f'SLURM: configure {key} before submission.')
        print('SLURM profile fields validated; scheduler access must be checked on the cluster.'); return
    config = load_config(args.config)
    if args.task == 'validate':
        if args.inspect_reference: reference_check(config)
        print(f'Configuration valid: {len(config["_rows"])} lanes, {len(set(row["library_id"] for row in config["_rows"]))} libraries. Full FASTQ integrity checks run before alignment.')
    elif args.task == 'reference': dump(args.output, reference_check(config))
    elif args.task == 'fastq': dump(args.output, fastq_check(config, args.library, args.lane))
    elif args.task == 'index':
        ref = json.loads(Path(args.reference).read_text(encoding='utf-8'))
        Path(args.output).mkdir(parents=True, exist_ok=True)
        run_command(['STAR', '--runMode', 'genomeGenerate', '--runThreadN', args.threads, '--genomeDir', args.output,
                     '--outFileNamePrefix', str(args.output).rstrip('/\\') + '/',
                     '--limitGenomeGenerateRAM', config['resources']['index_mem_mb'] * 1000000,
                     '--genomeFastaFiles', config['reference']['fasta'], '--sjdbGTFfile', config['reference']['gtf'],
                     '--sjdbOverhang', config['reference']['sjdb_overhang'], '--genomeSAindexNbases', ref['genomeSAindexNbases']],
                    Path(args.output) / 'build.log')
    elif args.task == 'star':
        Path(args.output).mkdir(parents=True, exist_ok=True)
        command = star_args(config, args.library, args.index, args.output, args.threads)
        dump(Path(args.output) / 'command.json', command)
        run_command(command, Path(args.output) / 'run.log')
    elif args.task == 'fastqc':
        row = next(row for row in config['_rows'] if row['library_id'] == args.library and row['lane_id'] == args.lane)
        Path(args.output).mkdir(parents=True, exist_ok=True)
        run_command(['fastqc', '--threads', args.threads, '--outdir', args.output, row[args.role + '_fastq']], Path(args.output) / 'run.log')
    elif args.task == 'bam': bam_qc(config, args)
    elif args.task == 'matrix': matrix_qc(config, args)
    elif args.task == 'manifest':
        versions = {}
        for name, cmd in {'STAR': ['STAR', '--version'], 'samtools': ['samtools', '--version'], 'FastQC': ['fastqc', '--version'], 'MultiQC': ['multiqc', '--version']}.items():
            versions[name] = subprocess.check_output(cmd, text=True).strip()
        dump(args.output, {'workflow': 'YeastVar1011 raw QC 1', 'config': config, 'versions': versions,
                          'assay': 'dedicated barcode read, fixed single CB/UMI, single cDNA read',
                          'features': FEATURES, 'bam_tags_requested': TAGS, 'results_are_measured_only_after_execution': True})

if __name__ == '__main__':
    try: main()
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        sys.exit('ERROR: ' + str(error))
