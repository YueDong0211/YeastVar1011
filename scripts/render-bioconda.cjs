#!/usr/bin/env node
/* Render a release recipe from an identified source archive, or an explicit local CI source. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const RECIPE_ROOT = path.join(ROOT, 'releases', 'recipe');
const TEMPLATE = path.join(ROOT, 'packaging', 'bioconda');
const FILES = ['build.sh', 'run_test.sh', 'yeastvar1011.cjs', 'yeastvar1011-doctor.cjs'];

function parseArgs(args) {
  const out = {};
  const names = new Set(['--version', '--source-url', '--sha256', '--archive', '--local-source', '--output']);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--help' || args[i] === '-h') { out.help = true; continue; }
    if (!names.has(args[i]) || args[i + 1] == null) throw new Error('Unknown or incomplete option: ' + args[i]);
    const key = args[i].slice(2); if (out[key] !== undefined) throw new Error('Duplicate option: ' + args[i]);
    out[key] = args[++i];
  }
  return out;
}

function validateVersion(version) {
  if (!/^\d+\.\d+\.\d+(?:[a-z]+\d+)?$/.test(version || '')) throw new Error('Supply --version as a release version, for example 21.0.0.');
  return version;
}

function validateSourceURL(raw, version) {
  let url; try { url = new URL(raw); } catch { throw new Error('Supply a complete HTTPS source tag URL.'); }
  const escaped = version.replace(/\./g, '\\.');
  const tagPath = new RegExp('^/YueDong0211/YeastVar1011/archive/refs/tags/v?' + escaped + '\\.tar\\.gz$');
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.port || url.username || url.password || url.search || url.hash || !tagPath.test(url.pathname)) {
    throw new Error('The source must be this repository\'s versioned GitHub tag archive URL matching --version.');
  }
  return url.href;
}

async function checksum(file) {
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}

async function render(options) {
  const version = validateVersion(options.version);
  const local = options['local-source'] !== undefined;
  let sourceURL = null, sha256 = null, sourcePath = null;
  if (local) {
    if (options['source-url'] || options.sha256 || options.archive) throw new Error('--local-source cannot be combined with release archive options.');
    sourcePath = fs.realpathSync(options['local-source']);
    const pkg = JSON.parse(fs.readFileSync(path.join(sourcePath, 'package.json'), 'utf8'));
    if (pkg.version !== version) throw new Error('Local package.json version does not match --version.');
    for (const file of ['dist/index.html', 'scripts/dev-server.cjs', 'scripts/doctor.cjs']) {
      if (!fs.existsSync(path.join(sourcePath, file))) throw new Error('Incomplete local source: ' + file);
    }
  } else {
    sourceURL = validateSourceURL(options['source-url'], version);
    if (options.sha256 && !/^[a-f0-9]{64}$/i.test(options.sha256)) throw new Error('--sha256 must contain exactly 64 hexadecimal characters.');
    if (options.archive) {
      const archive = fs.realpathSync(options.archive);
      if (!fs.statSync(archive).isFile()) throw new Error('--archive must name the downloaded source archive.');
      const handle = fs.openSync(archive, 'r');
      const signature = Buffer.alloc(2);
      try { fs.readSync(handle, signature, 0, 2, 0); } finally { fs.closeSync(handle); }
      if (signature[0] !== 0x1f || signature[1] !== 0x8b) throw new Error('The source archive must be gzip-compressed, not an HTML error response.');
      sha256 = await checksum(archive);
      if (options.sha256 && sha256 !== options.sha256.toLowerCase()) throw new Error('Downloaded archive does not match the supplied SHA256.');
    } else {
      if (!options.sha256) throw new Error('Provide --archive to calculate its SHA256, or --sha256 from the downloaded tag archive.');
      sha256 = options.sha256.toLowerCase();
    }
  }
  const target = path.resolve(ROOT, options.output || path.join('releases', 'recipe', 'yeastvar1011-' + version + (local ? '-local' : '')));
  const relative = path.relative(RECIPE_ROOT, target);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Output must be a new directory inside releases/recipe/.');
  if (fs.existsSync(target)) throw new Error('Output already exists; choose another --output directory. No files were overwritten.');
  let metadata = fs.readFileSync(path.join(TEMPLATE, 'meta.yaml.in'), 'utf8').replace(/\r\n/g, '\n').replaceAll('@VERSION@', version);
  if (local) {
    metadata = metadata.replace('  url: @SOURCE_URL@\n  sha256: @SHA256@', '  path: ' + JSON.stringify(sourcePath));
  } else metadata = metadata.replaceAll('@SOURCE_URL@', JSON.stringify(sourceURL)).replaceAll('@SHA256@', sha256);
  if (/@[A-Z_]+@/.test(metadata)) throw new Error('Unresolved recipe template placeholder.');
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'meta.yaml'), metadata);
  for (const file of FILES) fs.writeFileSync(path.join(target, file), fs.readFileSync(path.join(TEMPLATE, file), 'utf8').replace(/\r\n/g, '\n'));
  const record = { version, mode: local ? 'local-ci-only' : 'release', sourceURL, sha256, recipe: target,
    sourceArchiveChecked: Boolean(options.archive), note: local ? 'Local source recipe; do not submit to Bioconda.' : 'Conda build verifies the source URL against this archive checksum.' };
  fs.writeFileSync(path.join(target, 'render-provenance.json'), JSON.stringify(record, null, 2) + '\n');
  return record;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log('Render a Bioconda recipe without overwriting existing output.\nRelease: node scripts/render-bioconda.cjs --version VERSION --source-url TAG_URL --archive DOWNLOADED.tar.gz [--sha256 EXPECTED] [--output releases/recipe/NAME]\nCI only: node scripts/render-bioconda.cjs --version VERSION --local-source . [--output releases/recipe/NAME]\nAn explicit --sha256 may replace --archive. Use the source archive hash, never a recipe or manifest hash.');
    return;
  }
  console.log(JSON.stringify(await render(options), null, 2));
}
module.exports = { parseArgs, validateVersion, validateSourceURL, checksum, render };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
