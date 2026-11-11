#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {once} = require('node:events');

const ROOT = path.resolve(__dirname, '..');
const registry = require('../tests/suites.json');

function parse(args) {
  const options = {suite: 'core', list: false, keep: false, only: null};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--list') options.list = true;
    else if (args[i] === '--keep-output') options.keep = true;
    else if (['--suite', '--only'].includes(args[i])) {
      const flag = args[i];
      assert(args[i + 1] && !args[i + 1].startsWith('--'), 'Missing value for ' + flag);
      options[flag.slice(2)] = args[++i];
    } else throw Error('Unknown option: ' + args[i]);
  }
  return options;
}

function expand(name, active = new Set()) {
  assert(!active.has(name), 'Cyclic suite group: ' + name);
  if (registry.suites[name]) return [name];
  assert(registry.groups[name], 'Unknown suite: ' + name);
  return registry.groups[name].flatMap(child => expand(child, new Set([...active, name])));
}

function command(entry) {
  const item = typeof entry === 'string' ? {file: entry} : entry;
  const full = path.resolve(ROOT, item.file);
  assert(full.startsWith(ROOT + path.sep) && fs.statSync(full).isFile(), 'Invalid test path: ' + item.file);
  let executable, args;
  if (full.endsWith('.cjs')) { executable = process.execPath; args = [full]; }
  else if (full.endsWith('.py')) { executable = process.env.YV_PYTHON || (process.platform === 'win32' ? 'python' : 'python3'); args = [full]; }
  else if (full.endsWith('.ps1')) {
    executable = process.env.YV_POWERSHELL || (process.platform === 'win32' ? 'powershell.exe' : 'pwsh');
    args = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', full];
  } else throw Error('Unsupported test type: ' + item.file);
  return {file: item.file, executable, args: [...args, ...(item.args || [])]};
}

async function stop(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  const exited = once(child, 'exit');
  child.kill('SIGTERM');
  const timer = setTimeout(() => child.kill('SIGKILL'), 5000);
  try { await exited; } finally { clearTimeout(timer); }
}

async function serve(env) {
  const child = spawn(process.execPath, [path.join(ROOT, 'scripts/dev-server.cjs')], {
    cwd: ROOT, env: {...env, PORT: '0', BASE_PATH: '/'}, stdio: ['ignore', 'pipe', 'pipe']
  });
  try {
    const url = await new Promise((resolve, reject) => {
      let output = '';
      const timer = setTimeout(() => reject(Error('Isolated test server startup timed out')), 15000);
      child.stdout.on('data', data => {
        output = (output + data).slice(-8000);
        const match = output.match(/YeastVar1011 ready: (http:\/\/127\.0\.0\.1:\d+\/)/);
        if (match) { clearTimeout(timer); resolve(match[1]); }
      });
      child.stderr.on('data', data => { output = (output + data).slice(-8000); });
      child.once('error', error => { clearTimeout(timer); reject(error); });
      child.once('exit', code => { clearTimeout(timer); reject(Error('Test server exited: ' + code + '\n' + output)); });
    });
    return {child, url};
  } catch (error) { await stop(child); throw error; }
}

async function run(item, env) {
  console.log('\nRUN ' + item.file);
  const child = spawn(item.executable, item.args, {cwd: ROOT, env, stdio: 'inherit', shell: false});
  const [code, signal] = await once(child, 'exit');
  assert.equal(code, 0, item.file + ' failed' + (signal ? ' (' + signal + ')' : ''));
}

async function main() {
  const options = parse(process.argv.slice(2));
  if (options.list) {
    for (const [name, suite] of Object.entries(registry.suites)) {
      console.log(`${name}: ${suite.files.length} checks${suite.optional ? ' (explicit opt-in)' : ''} — ${suite.description}`);
    }
    for (const [name, suites] of Object.entries(registry.groups)) console.log(name + ': ' + suites.join(', '));
    return;
  }
  const names = [...new Set(options.suite.split(',').flatMap(name => expand(name)))];
  const suites = names.map(name => ({name, ...registry.suites[name]}));
  for (const suite of suites) assert(!suite.platform || suite.platform === process.platform, suite.name + ' requires ' + suite.platform);
  const base = path.join(ROOT, '.yeastvar-local', 'qa');
  fs.mkdirSync(base, {recursive: true});
  const output = fs.mkdtempSync(path.join(base, 'run-' + process.pid + '-'));
  const env = {...process.env, TEMP: output, TMP: output, TMPDIR: output,
    PYTHONDONTWRITEBYTECODE: '1', YV_QA_OUTPUT: output};
  let server, count = 0, passed = false;
  try {
    for (const suite of suites) {
      const selected = suite.files.map(command).filter(item => !options.only || path.basename(item.file) === options.only);
      if (!selected.length) continue;
      if (suite.server && !server) server = await serve(env);
      const suiteEnv = suite.server ? {...env, YV_TEST_URL: server.url} : env;
      console.log('\nSUITE ' + suite.name + ': ' + suite.description);
      for (const item of selected) { await run(item, suiteEnv); count++; }
    }
    assert(count > 0, 'No checks matched the selection');
    passed = true;
    console.log(`\nPASS ${count} checks: ${names.join(', ')}`);
  } finally {
    await stop(server?.child);
    if (passed && !options.keep) {
      assert.equal(path.dirname(path.resolve(output)), path.resolve(base));
      assert(path.basename(output).startsWith('run-'));
      fs.rmSync(output, {recursive: true, force: false});
    } else console.log('Diagnostic output retained at ' + output);
  }
}

main().catch(error => { console.error(error.stack); process.exitCode = 1; });
