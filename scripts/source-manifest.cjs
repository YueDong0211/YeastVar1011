/* Canonical source inventory shared by the repository and source exporter. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

const ROOT = path.resolve(__dirname, '..');
const TOP = [
  '.gitattributes', '.github', '.gitignore', '.zenodo.json', 'analysis',
  'biotools.json', 'CHANGELOG.md', 'CITATION.cff', 'codemeta.json',
  'CONTRIBUTING.md', 'CREATE-SHORTCUT.cmd', 'DATA_SOURCES.md', 'dist', 'docs',
  'LICENSE', 'package.json', 'package-lock.json', 'packaging', 'portable',
  'README.md', 'research', 'scripts', 'START.cmd', 'STOP.cmd',
  'THIRD_PARTY_NOTICES.md'
];
const SKIP_DIRS = new Set(['__pycache__', '.snakemake', '.venv', 'work', 'logs', '.pytest_cache', 'cache']);
const PRIVATE_FILES = new Set(['analysis/config.yaml', 'analysis/samples.tsv', 'analysis/profiles/slurm/site.yaml']);
const TEXT_EXTENSIONS = new Set([
  '.js', '.cjs', '.mjs', '.json', '.md', '.txt', '.html', '.css', '.ps1',
  '.cmd', '.cs', '.py', '.yml', '.yaml', '.cff', '.sh', '.xml', '.csl',
  '.svg', '.tsv', '.tab', '.toml', '.in'
]);
const SENSITIVE = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\b(?:ghp|gho|ghu|ghs|github_pat)_[A-Za-z0-9_]{20,}/,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}/,
  /[A-Z]:[\\/]+Users[\\/]+[^\s"'<>]+/i,
  /[A-Z]:[\\/]+1 study[\\/]+/i
];

function isText(relative) {
  return TEXT_EXTENSIONS.has(path.extname(relative)) || /(?:^|\/)(?:LICENSE|Snakefile|\.gitignore|\.gitattributes)$/.test(relative);
}

function canonicalBytes(root, relative) {
  const data = fs.readFileSync(path.join(root, relative));
  // Git archives use LF; Windows checkout line endings must not change the inventory.
  return isText(relative) ? Buffer.from(data.toString('utf8').replace(/\r\n/g, '\n')) : data;
}

function sourceFiles(root) {
  const files = [];
  function visit(relative) {
    const full = path.join(root, relative), stat = fs.lstatSync(full);
    if (stat.isSymbolicLink()) throw Error('Refusing source symlink: ' + relative);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(full).sort()) {
        if (SKIP_DIRS.has(name) || /^results(?:-|$)/.test(name) || /\.py[co]$/.test(name)) continue;
        const child = relative + '/' + name;
        if (!PRIVATE_FILES.has(child)) visit(child);
      }
    } else if (stat.isFile()) {
      if (/(?:^|\/)(?:\.git|\.openai|node_modules|maintenance|publication|\.env)(?:\/|$)/i.test(relative)) {
        throw Error('Private path in source: ' + relative);
      }
      if (isText(relative) && SENSITIVE.some(pattern => pattern.test(fs.readFileSync(full, 'utf8')))) {
        throw Error('Review a local path or credential pattern in ' + relative);
      }
      files.push(relative);
    }
  }
  for (const relative of TOP) visit(relative);
  return files.sort();
}

function createManifest(root = ROOT) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  return {
    format: 'yeastvar1011.source-manifest.v1',
    version: pkg.version,
    textLineEndings: 'LF',
    files: sourceFiles(root).map(relative => {
      const data = canonicalBytes(root, relative);
      return {path: relative, bytes: data.length, sha256: crypto.createHash('sha256').update(data).digest('hex')};
    })
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--write', '--check'].includes(args[0])) throw Error('Use --write or --check.');
  const manifest = createManifest(), target = path.join(ROOT, 'source-manifest.json');
  if (args[0] === '--write') fs.writeFileSync(target, JSON.stringify(manifest, null, 2) + '\n');
  else assert.deepEqual(JSON.parse(fs.readFileSync(target, 'utf8')), manifest, 'Source inventory differs; review changes and run npm run release:manifest.');
  console.log(`${args[0] === '--write' ? 'WROTE' : 'PASS'} ${manifest.version}: ${manifest.files.length} source files; canonical LF SHA-256 inventory.`);
}

module.exports = {ROOT, canonicalBytes, createManifest};
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
