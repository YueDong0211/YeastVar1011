"""Check that same-sized evidence edits invalidate network and offline part URLs."""
import hashlib
import json
from pathlib import Path
import tempfile

import write_catalogue_assets as writer

with tempfile.TemporaryDirectory(prefix='yeastvar-catalogue-qa-') as tmp:
    writer.DIST = Path(tmp)
    (writer.DIST / 'data').mkdir()
    for name in ['workflow', 'literature', 'research-categories', 'projects']:
        (writer.DIST / 'data' / (name + '.json')).write_text('{}', encoding='utf-8')
    data = {'updated': 'fixture', 'sources': [], 'markers': [{'id': 'A', 'evidence': [{'tag': 'G1'}]}]}
    writer.write_assets(data)
    before = json.loads((writer.DIST / 'data/markers.json').read_text(encoding='utf-8'))
    data['markers'][0]['evidence'][0]['tag'] = 'G2'
    writer.write_assets(data)
    after = json.loads((writer.DIST / 'data/markers.json').read_text(encoding='utf-8'))
    assert before['markerCount'] == after['markerCount'] == 1
    assert before['shards'] == after['shards']
    part = after['shards'][0]
    assert before['shardVersions'][part] != after['shardVersions'][part]
    raw = (writer.DIST / 'data' / part).read_bytes()
    assert hashlib.sha256(raw).hexdigest()[:16] == after['shardVersions'][part]
    bundle = (writer.DIST / 'catalogue-bundle.js').read_text(encoding='utf-8')
    assert after['shardVersions'][part] in bundle
    assert '?v=22.0' not in bundle
    assert writer.load_markers() == data
    writer.write_assets(data)
    assert after == json.loads((writer.DIST / 'data/markers.json').read_text(encoding='utf-8'))
print('PASS: content-derived part versions change on same-count evidence edits, remain deterministic and round-trip exactly.')
