"""Check that the actual downloadable analysis ZIP matches the shipped source."""
import hashlib
import json
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
version = json.loads((root / 'package.json').read_text(encoding='utf-8'))['version']
archive = root / 'dist/assets/downloads' / f'YeastVar1011-analysis-v{version}.zip'
prefix = 'YeastVar1011-analysis/'
with zipfile.ZipFile(archive) as package:
    entries = package.namelist()
    assert len(entries) == len(set(entries)), 'Duplicate ZIP entries'
    assert all(name.startswith(prefix) and '..' not in name.split('/') for name in entries)
    manifest = json.loads(package.read(prefix + 'source-manifest.json'))
    assert manifest['version'] == version
    expected = {prefix + item['path'] for item in manifest['files']} | {prefix + 'source-manifest.json', prefix + 'LICENSE'}
    assert set(entries) == expected, 'Unexpected or missing source entries'
    for item in manifest['files']:
        data = package.read(prefix + item['path'])
        assert data == (root / 'analysis' / item['path']).read_bytes(), item['path']
        assert len(data) == item['bytes']
        assert hashlib.sha256(data).hexdigest() == item['sha256']
    assert package.read(prefix + 'LICENSE') == (root / 'LICENSE').read_bytes()
print(f'PASS {version}: all {len(manifest["files"])} analysis source files and license match the downloadable ZIP.')
