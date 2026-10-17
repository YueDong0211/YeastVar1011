#!/usr/bin/env node
/* Read-only runtime checks. No installs, browser data access, or configuration writes. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const { spawnSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');

function parsePort(value) {
  if (!/^\d+$/.test(String(value)) || Number(value) > 65535) throw new Error('Port must be an integer from 0 to 65535; 0 selects a free port.');
  return Number(value);
}

function commandVersion(name) {
  // Windows npm is a command script; the command text is fixed, never user input.
  const result = process.platform === 'win32' && name === 'npm'
    ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'npm --version'], { encoding: 'utf8', timeout: 10000, windowsHide: true })
    : spawnSync(name, ['--version'], { encoding: 'utf8', timeout: 10000, windowsHide: true });
  return result.status === 0 ? String(result.stdout).trim().split(/\r?\n/)[0] : null;
}

function checkPort(port) {
  return new Promise(resolve => {
    const server = net.createServer();
    server.once('error', error => resolve({ available: false, code: error.code }));
    server.listen(port, '127.0.0.1', () => {
      const selected = server.address().port;
      server.close(() => resolve({ available: true, selected }));
    });
  });
}

async function runDoctor(options = {}) {
  const root = options.root || ROOT;
  const port = parsePort(options.port ?? process.env.PORT ?? 4173);
  const checks = [];
  function add(id, status, detail) { checks.push({ id, status, detail }); }
  const nodeVersion = options.nodeVersion || process.versions.node;
  const major = Number(nodeVersion.split('.')[0]);
  add('node', major >= 22 ? 'pass' : 'fail', 'Node.js ' + nodeVersion + '; minimum 22. Node.js 24 LTS is recommended for this release.');
  const getVersion = options.commandVersion || commandVersion;
  const npm = getVersion('npm');
  add('npm', npm ? 'pass' : options.dev ? 'fail' : 'info', npm ? 'npm ' + npm : 'npm is needed for --dev; the bundled app can run directly with Node.js.');
  const git = getVersion('git');
  add('git', git ? 'pass' : 'info', git || 'Git is optional for an extracted release; needed for cloning and source updates.');
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')); add('package', 'pass', pkg.name + ' ' + pkg.version); }
  catch { add('package', 'fail', 'package.json is missing or invalid. Extract the complete release.'); }
  const required = ['scripts/dev-server.cjs', 'dist/index.html', 'dist/app.js', 'dist/data/markers.json', 'dist/data/workflow.json', 'dist/vendor/three.module.js'];
  const missing = required.filter(file => !fs.existsSync(path.join(root, file)));
  add('application', missing.length ? 'fail' : 'pass', missing.length ? 'Missing: ' + missing.join(', ') : 'Application, server, primary catalogues, and bundled renderer are present.');
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/data/markers.json'), 'utf8'));
    const dataRoot = path.join(root, 'dist/data');
    const shards = manifest.shards || [];
    const missingShards = shards.filter(file => {
      const target = path.resolve(dataRoot, file), relative = path.relative(dataRoot, target);
      return relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(target);
    });
    add('marker-shards', missingShards.length ? 'fail' : 'pass', missingShards.length ? 'Missing or invalid marker shards: ' + missingShards.length : shards.length + ' referenced marker shards are available.');
  } catch { add('marker-shards', 'fail', 'Marker manifest could not be read.'); }
  if (options.dev) add('lockfile', fs.existsSync(path.join(root, 'package-lock.json')) ? 'pass' : 'fail', 'Development installation uses the committed package-lock.json.');
  const binding = await checkPort(port);
  add('port', binding.available ? 'pass' : 'fail', binding.available
    ? port === 0 ? 'A free loopback port is available. The server will print its selected address.' : '127.0.0.1:' + binding.selected + ' can be bound.'
    : '127.0.0.1:' + port + ' is unavailable (' + binding.code + '). Choose --port 0 or a different port.');
  add('analysis', 'info', 'Research-plan interface only. Scientific tool environments are configured separately in analysis/.');
  return { ok: !checks.some(check => check.status === 'fail'), version: pkg?.version || null,
    platform: process.platform, architecture: process.arch, node: nodeVersion, requestedPort: port,
    development: Boolean(options.dev), checks };
}

function parseArgs(args) {
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--json') options.json = true;
    else if (argument === '--dev') options.dev = true;
    else if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument === '--port') { if (args[index + 1] == null) throw new Error('--port requires a value.'); options.port = parsePort(args[++index]); }
    else throw new Error('Unknown option: ' + argument);
  }
  return options;
}

async function main(args = process.argv.slice(2)) {
  const options = parseArgs(args);
  if (options.help) { console.log('Usage: node scripts/doctor.cjs [--port N] [--dev] [--json]\nChecks local readiness without installing packages or changing configuration.'); return; }
  const report = await runDoctor(options);
  if (options.json) console.log(JSON.stringify(report, null, 2));
  else {
    console.log('YeastVar1011 environment check (' + report.platform + '/' + report.architecture + ')');
    for (const check of report.checks) console.log('[' + check.status.toUpperCase() + '] ' + check.id + ': ' + check.detail);
    console.log(report.ok ? 'Ready. Start with npm start or node scripts/dev-server.cjs.' : 'Resolve the failed checks before starting.');
  }
  process.exitCode = report.ok ? 0 : 1;
}

module.exports = { runDoctor, checkPort, parsePort, parseArgs, commandVersion };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
