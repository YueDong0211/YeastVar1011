/* Export the same reviewed source inventory used by the repository. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {ROOT, canonicalBytes, createManifest} = require('./source-manifest.cjs');

const releaseRoot = path.join(ROOT, 'releases');
const target = path.join(releaseRoot, 'public-source-' + new Date().toISOString().replace(/[:.]/g, '-'));
if (!target.startsWith(releaseRoot + path.sep) || fs.existsSync(target)) throw Error('Expected a new child of releases/.');
const manifest = createManifest();
fs.mkdirSync(target, {recursive: true});
for (const item of manifest.files) {
  const destination = path.join(target, item.path);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, canonicalBytes(ROOT, item.path));
}
fs.writeFileSync(path.join(target, 'source-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({path: target, version: manifest.version, files: manifest.files.length,
  bytes: manifest.files.reduce((sum, item) => sum + item.bytes, 0)}, null, 2));
