"""Keep source-backed marker data below hosting file limits, including offline mode."""
import json
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'

def compact(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'))

def load_markers():
    data = json.loads((DIST / 'data/markers.json').read_text(encoding='utf-8'))
    if data.get('format') == 'yv-marker-shards-v1':
        parts = data.pop('shards')
        data.pop('shardVersions', None)
        expected = data.pop('markerCount')
        data.pop('format')
        data['markers'] = [m for part in parts for m in json.loads((DIST / 'data' / part).read_text(encoding='utf-8'))]
        assert len(data['markers']) == expected
    return data

def write_assets(data=None):
    data = data if data is not None else load_markers()
    records = data['markers']
    chunks, current, size = [], [], 2
    for marker in records:
        length = len(compact(marker).encode('utf-8')) + 1
        if current and size + length > 3_000_000:
            chunks.append(current)
            current, size = [], 2
        current.append(marker)
        size += length
    if current:
        chunks.append(current)
    (DIST / 'data/markers').mkdir(exist_ok=True)
    (DIST / 'catalogue-parts').mkdir(exist_ok=True)
    json_paths, js_paths, versions = [], [], {}
    for i, chunk in enumerate(chunks):
        name = f'part-{i + 1:03d}'
        json_paths.append(f'markers/{name}.json')
        js_paths.append(f'catalogue-parts/markers-{i + 1:03d}.js')
        text = compact(chunk)
        version = hashlib.sha256(text.encode('utf-8')).hexdigest()[:16]
        versions[json_paths[-1]] = version
        versions[js_paths[-1]] = version
        (DIST / 'data' / json_paths[-1]).write_text(text, encoding='utf-8')
        (DIST / js_paths[-1]).write_text(f'window.YV_MARKER_PARTS[{i}]={text};\n', encoding='utf-8')
    meta = {k: v for k, v in data.items() if k != 'markers'}
    manifest = {**meta, 'format': 'yv-marker-shards-v1', 'markerCount': len(records), 'shards': json_paths,
                'shardVersions': {name: versions[name] for name in json_paths}}
    (DIST / 'data/markers.json').write_text(compact(manifest), encoding='utf-8')
    bundle = {name: json.loads((DIST / 'data' / f'{name}.json').read_text(encoding='utf-8')) for name in ['workflow', 'literature', 'research-categories', 'projects']}
    bundle['markers'] = meta
    boot = """'use strict';
(() => {
  const base = new URL('.', document.currentScript.src);
  const data = __DATA__;
  const files = __FILES__;
  const versions = __VERSIONS__;
  window.YV_MARKER_PARTS = [];
  window.YV_BUNDLED_DATA_READY = Promise.all(files.map(file => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(file + '?v=' + versions[file], base).href;
    script.onload = () => { script.remove(); resolve(); };
    script.onerror = () => { script.remove(); reject(Error('Local marker part unavailable: ' + file)); };
    document.head.append(script);
  }))).then(() => {
    data.markers.markers = [];
    for (let i = 0; i < files.length; i++) {
      const part = window.YV_MARKER_PARTS[i];
      if (!Array.isArray(part)) throw Error('Invalid local marker part: ' + i);
      data.markers.markers.push(...part);
    }
    if (data.markers.markers.length !== __COUNT__) throw Error('Incomplete local marker catalogue');
    delete window.YV_MARKER_PARTS;
    window.YV_BUNDLED_DATA = data;
    return data;
  });
  window.YV_BUNDLED_DATA_READY.catch(() => {});
})();
"""
    boot = boot.replace('__DATA__', compact(bundle)).replace('__FILES__', compact(js_paths)).replace('__COUNT__', str(len(records)))
    boot = boot.replace('__VERSIONS__', compact({name: versions[name] for name in js_paths}))
    (DIST / 'catalogue-bundle.js').write_text(boot, encoding='utf-8')
    assert load_markers() == data
    print(compact({'markers': len(records), 'parts': len(chunks), 'largestPartBytes': max(len(compact(c).encode('utf-8')) for c in chunks), 'roundTripExact': True}))

if __name__ == '__main__':
    write_assets()
