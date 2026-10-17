#!/usr/bin/env python3
"""Check actual synthetic STAR/samtools/FastQC/MultiQC products after a Linux run."""
import argparse
import csv
import gzip
import json
from pathlib import Path

def check(root):
    root = Path(root)
    library = root / 'star' / 'SYNTHETIC'
    expected = ['Aligned.sortedByCoord.out.bam', 'Aligned.sortedByCoord.out.bam.bai', 'Log.out', 'Log.final.out', 'SJ.out.tab', 'command.json']
    for filename in expected:
        path = library / filename
        assert path.is_file() and path.stat().st_size, str(path)
    for feature in ['Gene', 'GeneFull', 'SJ']:
        for filename in ['features.tsv', 'barcodes.tsv', 'matrix.mtx']:
            assert (library / 'Solo.out' / feature / 'raw' / filename).is_file()
    for filename in ['spliced.mtx', 'unspliced.mtx', 'ambiguous.mtx']:
        assert (library / 'Solo.out' / 'Velocyto' / 'raw' / filename).is_file()
    with gzip.open(root / 'cells' / 'SYNTHETIC.qc.tsv.gz', 'rt') as handle:
        cells = list(csv.DictReader(handle, delimiter='\t'))
    assert len(cells) == 2, cells
    assert {row['cell_id'] for row in cells} == {'SYNTHETIC:ACGTACGT', 'SYNTHETIC:TGCATGCA'}
    assert all(int(row['gene_umis']) > 0 and int(row['spliced_umis']) > 0 for row in cells)
    assert sum(int(row['unspliced_umis']) for row in cells) > 0
    assert all(0 < float(row['mitochondrial_fraction']) < 1 for row in cells)
    bam = json.loads((root / 'bam_qc' / 'SYNTHETIC' / 'bam_metrics.json').read_text())
    assert bam['counts']['primary_records'] == 240, bam
    assert bam['counts']['primary_mapped_spliced_records'] > 0, bam
    for tag in ['CR', 'CY', 'UR', 'UY', 'CB', 'UB', 'GX', 'GN']:
        assert bam['tag_present_on_primary_mapped_records'].get(tag, 0) > 0, tag
    assert (root / 'multiqc' / 'multiqc_report.html').stat().st_size > 0
    assert len(list((root / 'fastqc').rglob('*_fastqc.html'))) == 2
    manifest = json.loads((root / 'run_manifest.json').read_text())
    assert manifest['versions']['STAR'].startswith('2.7.11b'), manifest['versions']
    print(json.dumps({'synthetic_e2e': 'passed', 'barcodes': len(cells), 'primary_records': 240,
                      'spliced_and_unspliced_nonzero': True, 'biological_validation': False}, indent=2))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__); parser.add_argument('--results', required=True)
    check(parser.parse_args().results)
