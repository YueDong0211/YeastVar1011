"""Synthetic, executable checks. No tests require private sequencing data."""
import copy
import gzip
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
import yaml

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workflow' / 'scripts'))
sys.path.insert(0, str(ROOT / 'tests'))
import qc
from make_fixture import make_fixture

class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='yvqc-test-')
        self.base = Path(self.temporary.name)
        self.config_file = make_fixture(self.base / 'inputs')
        self.raw = yaml.safe_load(self.config_file.read_text(encoding='utf-8'))
        self.config = qc.validate_config(self.raw, self.base)

    def tearDown(self):
        self.temporary.cleanup()

    def test_incomplete_template_is_rejected(self):
        template = yaml.safe_load((ROOT / 'config.example.yaml').read_text(encoding='utf-8'))
        with self.assertRaisesRegex(ValueError, 'protocol.name'):
            qc.validate_config(template, self.base)

    def test_explicit_read_structure_and_version_constraints(self):
        variants = [('umi_start', 4, 'overlap'), ('barcode_read_length', 12, 'exceed'),
                    ('umi_length', 17, 'UMI <= 16'), ('layout', 'unknown', 'Supported layout'),
                    ('quality_encoding', None, 'phred33'), ('strand', None, 'strand')]
        for key, value, expected in variants:
            raw = copy.deepcopy(self.raw); raw['protocol'][key] = value
            with self.subTest(key=key), self.assertRaisesRegex(ValueError, expected): qc.validate_config(raw, self.base)
        raw = copy.deepcopy(self.raw); raw['protocol']['umi_filter'] = 'MultiGeneUMI_CR'
        with self.assertRaisesRegex(ValueError, 'requires 1MM_CR'): qc.validate_config(raw, self.base)

    def test_full_reference_and_fastq_validation(self):
        ref = qc.reference_check(self.config)
        self.assertEqual(ref['annotated_intron_count'], 1)
        self.assertEqual(ref['annotated_intron_min'], 100)
        self.assertEqual(ref['whitelist_count'], 2)
        stats = qc.fastq_check(self.config, 'SYNTHETIC', 'L001')
        self.assertEqual(stats['metrics']['read_pairs'], 240)
        self.assertEqual(stats['metrics']['cb_exact_whitelist_reads'], 240)
        self.assertEqual(stats['metrics']['cdna_q30_bases'], 240 * 80)
        self.assertEqual(len(stats['sha256_compressed_or_plain_bytes']['cdna_fastq']), 64)

    def test_wrong_contigs_and_whitelist_are_rejected(self):
        config = copy.deepcopy(self.config); config['reference']['mitochondrial_contigs'] = ['wrong']
        with self.assertRaisesRegex(ValueError, 'contig IDs'): qc.reference_check(config)
        Path(self.config['protocol']['whitelist']).write_text('ACGTACGT-1\n', encoding='ascii')
        with self.assertRaisesRegex(ValueError, 'Whitelist'): qc.reference_check(self.config)

    def test_pair_desynchronization_and_truncated_gzip_are_rejected(self):
        barcode = Path(self.config['_rows'][0]['barcode_fastq'])
        original = barcode.read_bytes()
        with gzip.open(barcode, 'rt') as handle: contents = handle.read()
        with gzip.open(barcode, 'wt') as handle: handle.write(contents.replace('@SYN_0_0_0_0/1', '@WRONG/1', 1))
        with self.assertRaisesRegex(ValueError, 'read IDs differ'): qc.fastq_check(self.config, 'SYNTHETIC', 'L001')
        barcode.write_bytes(original[:-7])
        with self.assertRaises((EOFError, OSError)): qc.fastq_check(self.config, 'SYNTHETIC', 'L001')

    def test_duplicate_inputs_and_biological_sample_merge_are_rejected(self):
        samples = Path(self.raw['samples']); lines = samples.read_text(encoding='utf-8').splitlines()
        samples.write_text('\n'.join(lines + [lines[1]]) + '\n', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'Duplicate library/lane'): qc.validate_config(self.raw, self.base)
        other = lines[1].replace('\tL001\t', '\tL002\t').replace('\tsoftware_test\t', '\tother_condition\t')
        samples.write_text('\n'.join(lines + [other]) + '\n', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'metadata differs'): qc.validate_config(self.raw, self.base)

    def test_star_command_preserves_required_evidence(self):
        args = qc.star_args(self.config, 'SYNTHETIC', '/index', '/out', 2)
        self.assertEqual(args[args.index('--readFilesIn') + 1], self.config['_rows'][0]['cdna_fastq'])
        self.assertEqual(args[args.index('--readFilesIn') + 2], self.config['_rows'][0]['barcode_fastq'])
        self.assertEqual(args[args.index('--soloFeatures') + 1:args.index('--soloFeatures') + 5], ['Gene', 'GeneFull', 'SJ', 'Velocyto'])
        self.assertEqual(args[args.index('--soloCellFilter') + 1], 'None')
        for tag in ['CR', 'CY', 'UR', 'UY', 'CB', 'UB', 'GX', 'GN', 'NH', 'MD', 'sF']: self.assertIn(tag, args)
        self.assertNotIn('--outSAMmultNmax', args)

    def test_integer_matrix_layers_are_not_subtracted_or_mislabeled(self):
        reference = qc.reference_check(self.config)
        solo = self.base / 'Solo.out'
        fixtures = [('Gene', 'matrix.mtx', [(1, 1, 4), (3, 1, 2), (2, 2, 3)]),
                    ('GeneFull', 'matrix.mtx', [(1, 1, 7), (3, 1, 2), (2, 2, 3)]),
                    ('Velocyto', 'spliced.mtx', [(1, 1, 3)]), ('Velocyto', 'unspliced.mtx', [(1, 1, 2)]),
                    ('Velocyto', 'ambiguous.mtx', [(1, 1, 1)])]
        for feature, filename, entries in fixtures:
            folder = solo / feature / 'raw'; folder.mkdir(parents=True, exist_ok=True)
            (folder / 'features.tsv').write_text('SYN_G1\tG1\nSYN_G2\tG2\nSYN_MT\tMT\n')
            (folder / 'barcodes.tsv').write_text('ACGTACGT\nTGCATGCA\n')
            (folder / filename).write_text('%%MatrixMarket matrix coordinate integer general\n%\n3 2 ' + str(len(entries)) + '\n' + ''.join(f'{g} {c} {n}\n' for g, c, n in entries))
        counts = qc.aggregate_matrices(solo, reference)
        self.assertEqual(counts['ACGTACGT']['gene_umis'], 6)
        self.assertEqual(counts['ACGTACGT']['mitochondrial_umis'], 2)
        self.assertEqual(counts['ACGTACGT']['unspliced_umis'], 2)
        self.assertNotEqual(counts['ACGTACGT']['unspliced_umis'], counts['ACGTACGT']['genefull_umis'] - counts['ACGTACGT']['gene_umis'])
        self.assertEqual(counts['TGCATGCA']['ribosomal_test_umis'], 3)
        self.assertEqual(counts['ACGTACGT']['detected_genes'], 2)

    @unittest.skipUnless(importlib.util.find_spec('snakemake'), 'Install environment.yaml for a real Snakemake DAG test.')
    def test_real_snakemake_dry_run(self):
        run = subprocess.run([sys.executable, '-m', 'snakemake', '--snakefile', str(ROOT / 'workflow' / 'Snakefile'),
            '--configfile', str(self.config_file), '--directory', str(self.base), '--dry-run', '--cores', '2', '--printshellcmds'],
            text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        self.assertEqual(run.returncode, 0, run.stdout)
        for rule in ['reference', 'fastq_integrity', 'fastqc', 'star_index', 'starsolo', 'bam_qc', 'cell_qc', 'manifest', 'multiqc']:
            self.assertIn(rule, run.stdout)
        self.assertIn('This was a dry-run', run.stdout)
        self.assertFalse((self.base / 'results-synthetic-test' / 'star').exists())

if __name__ == '__main__': unittest.main()
