'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const { once } = require('node:events');
const { spawnSync } = require('node:child_process');
const { runDoctor, checkPort, parseArgs, parsePort } = require('./doctor.cjs');
const root = path.resolve(__dirname, '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'yeastvar-doctor-'));
let passed = 0;
async function test(name, fn) { await fn(); passed++; console.log('PASS ' + name); }
function status(report, id) { return report.checks.find(check => check.id === id).status; }
const tools = () => 'test-version';

(async () => {
  await test('Real released files, catalogue shards and ephemeral loopback port', async () => {
    const report = await runDoctor({ port: 0 }); assert(report.ok); assert.equal(status(report, 'marker-shards'), 'pass');
    const result = spawnSync(process.execPath, ['scripts/doctor.cjs', '--port', '0', '--json'], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0); assert(JSON.parse(result.stdout).ok);
  });
  await test('Node 22 and 24 pass; Node 20 does not meet this release requirement', async () => {
    for (const nodeVersion of ['22.0.0', '24.0.0']) assert((await runDoctor({ port: 0, nodeVersion, commandVersion: tools })).ok);
    const report = await runDoctor({ port: 0, nodeVersion: '20.19.0', commandVersion: tools }); assert.equal(status(report, 'node'), 'fail'); assert(!report.ok);
  });
  await test('Git/npm optional for runtime; npm mandatory for explicit development setup', async () => {
    assert((await runDoctor({ port: 0, commandVersion: () => null })).ok);
    const report = await runDoctor({ port: 0, dev: true, commandVersion: () => null }); assert(!report.ok); assert.equal(status(report, 'npm'), 'fail');
  });
  await test('Missing application files and development lockfile fail clearly', async () => {
    const report = await runDoctor({ root: temp, dev: true, port: 0, commandVersion: tools });
    for (const id of ['package', 'application', 'marker-shards', 'lockfile']) assert.equal(status(report, id), 'fail');
  });
  await test('Marker shard completeness and containment are checked', async () => {
    fs.mkdirSync(path.join(temp, 'dist/data'), { recursive: true });
    fs.writeFileSync(path.join(temp, 'dist/data/markers.json'), JSON.stringify({ shards: ['missing.json', '../../outside.json'] }));
    const report = await runDoctor({ root: temp, port: 0, commandVersion: tools }); assert.equal(status(report, 'marker-shards'), 'fail');
  });
  await test('A real occupied port fails; released probe ports are reusable', async () => {
    const server = net.createServer(); server.listen(0, '127.0.0.1'); await once(server, 'listening');
    const port = server.address().port;
    try { const report = await runDoctor({ port, commandVersion: tools }); assert.equal(status(report, 'port'), 'fail'); assert(!report.ok); }
    finally { await new Promise(resolve => server.close(resolve)); }
    assert((await checkPort(port)).available);
  });
  await test('Invalid options and port values cannot reach the server', async () => {
    for (const value of ['-1', '65536', '1.2', '', 'abc']) assert.throws(() => parsePort(value));
    assert.equal(parsePort('0'), 0); assert.equal(parsePort('65535'), 65535);
    assert.throws(() => parseArgs(['--port'])); assert.throws(() => parseArgs(['--unknown']));
    const result = spawnSync(process.execPath, ['scripts/doctor.cjs', '--port', 'bad'], { cwd: root, encoding: 'utf8' }); assert.equal(result.status, 1);
  });
  console.log(passed + '/7 environment checks passed.');
})().catch(error => { console.error(error.stack); process.exitCode = 1; }).finally(() => {
  const resolved = path.resolve(temp), parent = path.resolve(os.tmpdir());
  assert(resolved.startsWith(parent + path.sep) && path.basename(resolved).startsWith('yeastvar-doctor-'));
  fs.rmSync(resolved, { recursive: true, force: true });
});
