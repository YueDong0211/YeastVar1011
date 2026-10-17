#!/usr/bin/env python3
"""Create deterministic synthetic software-test inputs; never a yeast biological dataset."""
import argparse
import csv
import gzip
from pathlib import Path
import random
import yaml

ANALYSIS = Path(__file__).resolve().parents[1]

def make_fixture(destination):
    destination = Path(destination).resolve()
    destination.mkdir(parents=True, exist_ok=False)
    rng = random.Random(1011)
    nuclear = ''.join(rng.choice('ACGT') for _ in range(12000))
    mito = ''.join(rng.choice('ACGT') for _ in range(1500))
    # Canonical synthetic splice donor/acceptor for the first transcript.
    nuclear = nuclear[:300] + 'GT' + nuclear[302:398] + 'AG' + nuclear[400:]
    (destination / 'reference.fa').write_text('>synthetic_nuclear\n' + nuclear + '\n>synthetic_mito\n' + mito + '\n', encoding='ascii')
    rows = [('synthetic_nuclear', 101, 300, 'SYN_G1', 'SYN_T1'), ('synthetic_nuclear', 401, 600, 'SYN_G1', 'SYN_T1'),
            ('synthetic_nuclear', 1001, 1400, 'SYN_G2', 'SYN_T2'), ('synthetic_mito', 101, 400, 'SYN_MT', 'SYN_TMT')]
    (destination / 'genes.gtf').write_text(''.join(f'{chrom}\tsynthetic\texon\t{start}\t{end}\t.\t+\t.\tgene_id "{gene}"; transcript_id "{tx}"; gene_name "{gene}";\n' for chrom, start, end, gene, tx in rows), encoding='ascii')
    barcodes = ['ACGTACGT', 'TGCATGCA']
    (destination / 'whitelist.txt').write_text('\n'.join(barcodes) + '\n', encoding='ascii')
    (destination / 'ribosomal-test-ids.txt').write_text('SYN_G2\n', encoding='ascii')
    records = []
    sequences = [nuclear[140:220], nuclear[260:300] + nuclear[400:440], nuclear[310:390], nuclear[1100:1180], mito[140:220]]
    for cell, barcode in enumerate(barcodes):
        for feature, sequence in enumerate(sequences):
            for molecule in range(12):
                umi = ''.join(rng.choice('ACGT') for _ in range(8))
                # Duplicated reads allow the UMI collapse path to be exercised.
                for duplicate in range(2):
                    identity = f'SYN_{cell}_{feature}_{molecule}_{duplicate}'
                    records.append((identity, sequence, barcode + umi))
    for role, index, mate in [('cdna', 1, 2), ('barcode', 2, 1)]:
        with gzip.open(destination / f'{role}.fastq.gz', 'wt', encoding='ascii') as handle:
            for record in records:
                handle.write(f'@{record[0]}/{mate}\n{record[index]}\n+\n' + 'I' * len(record[index]) + '\n')
    columns = ['library_id', 'lane_id', 'cdna_fastq', 'barcode_fastq', 'strain_background', 'condition', 'culture_replicate', 'batch']
    with open(destination / 'samples.tsv', 'w', newline='', encoding='utf-8') as handle:
        writer = csv.writer(handle, delimiter='\t'); writer.writerow(columns)
        writer.writerow(['SYNTHETIC', 'L001', destination / 'cdna.fastq.gz', destination / 'barcode.fastq.gz', 'synthetic_not_biological', 'software_test', 'NA', 'fixture'])
    config = yaml.safe_load((ANALYSIS / 'config.example.yaml').read_text(encoding='utf-8'))
    config['samples'] = str(destination / 'samples.tsv')
    config['output_dir'] = 'results-synthetic-test'
    config['protocol'] = {'name': 'synthetic software fixture; not a real chemistry', 'layout': 'dedicated_barcode_read',
        'barcode_orientation': 'forward', 'quality_encoding': 'phred33', 'cb_start': 1, 'cb_length': 8, 'umi_start': 9,
        'umi_length': 8, 'barcode_read_length': 16, 'strand': 'Forward', 'whitelist': str(destination / 'whitelist.txt'),
        'cb_match': 'Exact', 'umi_dedup': 'Exact', 'umi_filter': '-'}
    config['reference'] = {'fasta': str(destination / 'reference.fa'), 'gtf': str(destination / 'genes.gtf'),
        'source': 'deterministic synthetic test fixture, seed 1011', 'sjdb_overhang': 79, 'mitochondrial_contigs': ['synthetic_mito']}
    config['alignment'].update(intron_min=21, intron_max=1000, multimappers_max=10, cell_filter=['None'])
    config['gene_groups'] = {'ribosomal_test': str(destination / 'ribosomal-test-ids.txt')}
    config['resources'].update(star_threads=2, star_mem_mb=4000, index_threads=2, index_mem_mb=4000, fastqc_threads=1)
    filename = destination / 'config.yaml'
    filename.write_text(yaml.safe_dump(config, sort_keys=False), encoding='utf-8')
    (destination / 'SYNTHETIC_TEST_ONLY.txt').write_text('Artificial sequences for software validation. They are not observations of yeast or the 1011 collection.\n', encoding='utf-8')
    return filename

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True, help='A new directory; existing directories are never overwritten.')
    args = parser.parse_args()
    print(make_fixture(args.output))
