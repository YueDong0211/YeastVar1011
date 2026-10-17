/* Real HTTP checks for containment, media delivery and a GitHub Pages project path. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { createDevServer } = require('../scripts/dev-server.cjs');
const project = path.resolve(__dirname, '..');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'yeastvar-server-'));
const fixture = path.join(temporary, 'site with spaces');
const outside = path.join(temporary, 'private');
const servers = [], children = [], checks = [];
fs.mkdirSync(fixture); fs.mkdirSync(outside);
fs.writeFileSync(path.join(fixture, 'index.html'), '<!doctype html><title>Fixture</title>');
fs.writeFileSync(path.join(outside, 'private.txt'), 'OUTSIDE_ROOT_SENTINEL');
fs.writeFileSync(path.join(fixture, '.secret'), 'HIDDEN_SENTINEL');
fs.writeFileSync(path.join(fixture, 'space 酵母.txt'), 'Yeast · 酵母');
fs.writeFileSync(path.join(fixture, 'empty.txt'), '');
fs.writeFileSync(path.join(fixture, 'video.mp4'), Buffer.from('0123456789abcdef'));
fs.mkdirSync(path.join(fixture, 'nested'));
fs.writeFileSync(path.join(fixture, 'nested', 'index.html'), '<title>Nested</title>');
for (const name of ['module.mjs', 'script.js', 'style.css', 'data.json', 'font.woff2', 'image.webp', 'model.wasm']) {
  fs.writeFileSync(path.join(fixture, name), 'fixture');
}

async function check(name, run) {
  try { const detail = await run(); checks.push({ name, pass: true, ...(detail ? { detail } : {}) }); console.log('PASS ' + name); }
  catch (error) { checks.push({ name, pass: false, error: error.stack }); console.error('FAIL ' + name + ': ' + error.message); }
}

async function listen(root, basePath = '/') {
  const server = createDevServer({ root, basePath }); servers.push(server);
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  return 'http://127.0.0.1:' + server.address().port;
}

// http.request preserves traversal strings; fetch/URL would normalize some before sending.
function request(origin, target, options = {}) {
  const url = new URL(origin);
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: url.hostname, port: url.port, path: target,
      method: options.method || 'GET', headers: options.headers || {}, timeout: 10000 }, res => {
      const chunks = []; res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks), text: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject); req.on('timeout', () => req.destroy(Error('HTTP request timed out'))); req.end();
  });
}

function launch(env) {
  const child = spawn(process.execPath, [path.join(project, 'scripts', 'dev-server.cjs')], {
    cwd: fixture, env: { ...process.env, PORT: '0', BASE_PATH: '/', ...env }, stdio: ['ignore', 'pipe', 'pipe']
  });
  children.push(child); return child;
}

async function childReady(child) {
  return new Promise((resolve, reject) => {
    let output = '', settled = false;
    const timer = setTimeout(() => done(Error('CLI startup timed out')), 10000);
    function done(error, value) { if (settled) return; settled = true; clearTimeout(timer); error ? reject(error) : resolve(value); }
    child.stdout.on('data', data => { output += data; const match = output.match(/http:\/\/127\.0\.0\.1:\d+\/[^\s]*/); if (match) done(null, match[0]); });
    child.stderr.on('data', data => output += data);
    child.once('exit', code => done(Error('CLI exited (' + code + '): ' + output)));
  });
}

(async () => {
  const origin = await listen(fixture);
  await check('GET, HEAD, query strings, Unicode names and empty files', async () => {
    const full = await request(origin, '/?v=20'); assert.equal(full.status, 200); assert.match(full.text, /Fixture/);
    const head = await request(origin, '/', { method: 'HEAD' }); assert.equal(head.status, 200);
    assert.equal(head.body.length, 0); assert.equal(head.headers['content-length'], String(full.body.length));
    const unicode = await request(origin, '/' + encodeURIComponent('space 酵母.txt')); assert.equal(unicode.text, 'Yeast · 酵母');
    const empty = await request(origin, '/empty.txt'); assert.equal(empty.status, 200); assert.equal(empty.body.length, 0);
    assert.equal(full.headers['x-content-type-options'], 'nosniff');
  });
  await check('Browser module, font, image, data and WebAssembly MIME types', async () => {
    const expected = { 'module.mjs': 'text/javascript', 'script.js': 'text/javascript', 'style.css': 'text/css',
      'data.json': 'application/json', 'font.woff2': 'font/woff2', 'image.webp': 'image/webp', 'model.wasm': 'application/wasm' };
    for (const [name, mime] of Object.entries(expected)) {
      const res = await request(origin, '/' + name); assert.equal(res.status, 200); assert.equal(res.headers['content-type'].split(';')[0], mime);
    }
    return { types: Object.keys(expected).length };
  });
  await check('Directory URLs redirect without losing queries; no directory listing or route rewrite', async () => {
    const redirect = await request(origin, '/nested?x=1'); assert.equal(redirect.status, 308); assert.equal(redirect.headers.location, '/nested/?x=1');
    assert.match((await request(origin, '/nested/')).text, /Nested/);
    assert.equal((await request(origin, '/unknown-route')).status, 404);
    assert.equal((await request(origin, '/missing.js')).status, 404);
    const post = await request(origin, '/', { method: 'POST' }); assert.equal(post.status, 405); assert.equal(post.headers.allow, 'GET, HEAD');
  });
  await check('Byte ranges support media seeking, suffixes and HEAD; invalid ranges return 416', async () => {
    const partial = await request(origin, '/video.mp4', { headers: { Range: 'bytes=2-5' } });
    assert.equal(partial.status, 206); assert.equal(partial.text, '2345'); assert.equal(partial.headers['content-range'], 'bytes 2-5/16');
    assert.equal((await request(origin, '/video.mp4', { headers: { Range: 'bytes=-3' } })).text, 'def');
    assert.equal((await request(origin, '/video.mp4', { headers: { Range: 'bytes=13-' } })).text, 'def');
    const head = await request(origin, '/video.mp4', { method: 'HEAD', headers: { Range: 'bytes=0-1' } });
    assert.equal(head.status, 206); assert.equal(head.headers['content-length'], '2'); assert.equal(head.body.length, 0);
    for (const range of ['bytes=99-', 'bytes=3-2', 'bytes=-0', 'bytes=0-1,3-4']) {
      const res = await request(origin, '/video.mp4', { headers: { Range: range } }); assert.equal(res.status, 416); assert.equal(res.headers['content-range'], 'bytes */16');
    }
  });
  await check('Raw, encoded, double-encoded and Windows traversal attempts cannot escape the root', async () => {
    const targets = ['/../private/private.txt', '/%2e%2e/private/private.txt', '/.%2e/private/private.txt',
      '/%252e%252e/private/private.txt', '/%2e%2e%5cprivate%5cprivate.txt', '/%2e%2e%2fprivate/private.txt',
      '/nested/../../private/private.txt', '/C:/private/private.txt', '/%5c%5cserver/file', '/index.html:stream',
      '/index.html%00.txt', '/%zz', '/%E0%A4%A', '//private/private.txt', '/nul', '/con.txt', '/.secret', '/%2esecret'];
    for (const target of targets) {
      const res = await request(origin, target); assert([400, 403, 404].includes(res.status), target + ' returned ' + res.status);
      assert(!/OUTSIDE_ROOT_SENTINEL|HIDDEN_SENTINEL/.test(res.text), target);
    }
    return { attempts: targets.length };
  });
  await check('Real filesystem junction/symlink escape is refused', async () => {
    fs.symlinkSync(outside, path.join(fixture, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
    const res = await request(origin, '/escape/private.txt'); assert.equal(res.status, 403); assert(!res.text.includes('OUTSIDE_ROOT_SENTINEL'));
  });
  await check('A root directory alias resolves consistently while external links stay blocked', async () => {
    const alias = path.join(temporary, 'site-alias');
    fs.symlinkSync(fixture, alias, process.platform === 'win32' ? 'junction' : 'dir');
    const aliasedOrigin = await listen(alias);
    const inside = await request(aliasedOrigin, '/');
    assert.equal(inside.status, 200); assert.match(inside.text, /Fixture/);
    const outsideRequest = await request(aliasedOrigin, '/escape/private.txt');
    assert.equal(outsideRequest.status, 403); assert(!outsideRequest.text.includes('OUTSIDE_ROOT_SENTINEL'));
  });
  await check('Loopback binding and Host validation reject a foreign hostname', async () => {
    assert.equal(servers[0].address().address, '127.0.0.1');
    assert.equal((await request(origin, '/', { headers: { Host: 'attacker.example' } })).status, 400);
    assert.equal((await request(origin, '/', { headers: { Host: 'localhost:' + new URL(origin).port } })).status, 200);
  });
  const prefix = '/YeastVar1011/', siteOrigin = await listen(path.join(project, 'dist'), prefix);
  const siteURL = siteOrigin + prefix;
  await check('The real dist index and all direct local assets work below a project subpath', async () => {
    const redirect = await request(siteOrigin, prefix.slice(0, -1)); assert.equal(redirect.status, 308); assert.equal(redirect.headers.location, prefix);
    const index = await request(siteOrigin, prefix); assert.equal(index.status, 200); assert.match(index.text, /YeastVar1011/);
    assert.equal((await request(siteOrigin, '/')).status, 404);
    assert.equal((await request(siteOrigin, '/YeastVar1011-other/')).status, 404);
    const assets = [...new Set([...index.text.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m => m[1])
      .filter(value => !/^(?:#|data:|https?:|mailto:)/i.test(value)))];
    for (const asset of assets) {
      const url = new URL(asset, siteURL); assert(url.pathname.startsWith(prefix), 'Root-relative asset: ' + asset);
      assert.equal((await request(siteOrigin, url.pathname + url.search, { method: 'HEAD' })).status, 200, asset);
    }
    return { directAssets: assets.length, basePath: prefix };
  });
  await check('Actual data loader fetches every catalogue and marker shard under the project path', async () => {
    const requests = [];
    const context = vm.createContext({ window: { dispatchEvent() {} }, document: { currentScript: { src: siteURL + 'data-loader.js' } },
      location: { protocol: 'http:', href: siteURL }, URL, AbortController, setTimeout, clearTimeout,
      CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
      fetch: async (url, options) => { const actual = String(url); requests.push(actual); assert(actual.startsWith(siteURL)); return fetch(actual, options); } });
    vm.runInContext(fs.readFileSync(path.join(project, 'dist', 'data-loader.js'), 'utf8'), context);
    const data = await context.window.YV_DATA.load();
    assert.equal(context.window.YV_DATA.source, 'network');
    assert(Array.isArray(data.markers.markers) && data.markers.markers.length > 0);
    assert(data.workflow.metrics.length > 0 && data.workflow.tools.length > 0 && data.literature.papers.length > 0);
    const markerManifest = JSON.parse(fs.readFileSync(path.join(project, 'dist', 'data', 'markers.json'), 'utf8'));
    if (markerManifest.shards) assert.equal(data.markers.markers.length, markerManifest.markerCount);
    return { requests: requests.length, markers: data.markers.markers.length, source: context.window.YV_DATA.source };
  });
  await check('Stylesheet images, KaTeX fonts and real Three module imports retain the subpath', async () => {
    let assets = 0;
    const cssFiles = fs.readdirSync(path.join(project, 'dist')).filter(file => file.endsWith('.css'));
    cssFiles.push('vendor/katex/katex.min.css');
    for (const cssFile of cssFiles) {
      const css = fs.readFileSync(path.join(project, 'dist', cssFile), 'utf8');
      const urls = [...new Set([...css.matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)].map(m => m[1]).filter(url => !/^(?:data:|https?:|#)/i.test(url)))];
      for (const value of urls) {
        const url = new URL(value, siteURL + cssFile); assert(url.pathname.startsWith(prefix), cssFile + ': ' + value);
        assert.equal((await request(siteOrigin, url.pathname, { method: 'HEAD' })).status, 200, cssFile + ': ' + value); assets++;
      }
    }
    for (const name of ['yeast3d.js', 'cinematic-v15.js', 'journey-scene-v17.js', 'vendor/three.module.js']) {
      const code = fs.readFileSync(path.join(project, 'dist', name), 'utf8');
      const imports = [...code.matchAll(/(?:import\s*\(\s*|from\s*)['"](\.[^'"]+)['"]/g)].map(m => m[1]);
      assert(imports.length > 0, name + ' has no discovered local module import');
      for (const value of imports) {
        const url = new URL(value, siteURL + name); assert(url.pathname.startsWith(prefix));
        const res = await request(siteOrigin, url.pathname, { method: 'HEAD' }); assert.equal(res.status, 200); assert.match(res.headers['content-type'], /javascript/); assets++;
      }
    }
    return { referencedAssets: assets };
  });
  await check('CLI uses its own dist root from a different working directory, with PORT and BASE_PATH', async () => {
    const child = launch({ BASE_PATH: '/Pages-preview/' });
    const url = await childReady(child); assert(url.endsWith('/Pages-preview/'));
    const result = await request(new URL(url).origin, new URL(url).pathname); assert.equal(result.status, 200); assert.match(result.text, /YeastVar1011/);
    const exit = once(child, 'exit'); child.kill(); await exit;
    return { ephemeralPort: Number(new URL(url).port), independentOfWorkingDirectory: true };
  });
  await check('Invalid port and base-path configuration fail clearly without opening a service', async () => {
    for (const env of [{ PORT: 'not-a-port' }, { PORT: '65536' }, { BASE_PATH: '/../private/' }, { BASE_PATH: '//preview/' }]) {
      const child = launch(env); let error = ''; child.stderr.on('data', data => error += data);
      const [code] = await once(child, 'exit'); assert.equal(code, 1); assert.match(error, /PORT|BASE_PATH/);
    }
  });
  await check('An occupied port produces a clear error without replacing the running server', async () => {
    const child = launch({ PORT: new URL(origin).port }); let error = ''; child.stderr.on('data', data => error += data);
    const [code] = await once(child, 'exit'); assert.equal(code, 1); assert.match(error, /already in use/);
    assert.match((await request(origin, '/')).text, /Fixture/);
  });
})().catch(error => { checks.push({ name: 'QA setup', pass: false, error: error.stack }); console.error(error); })
  .finally(async () => {
    for (const child of children) if (child.exitCode === null && child.signalCode === null) child.kill();
    await Promise.all(servers.map(server => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); })));
    // Delete only the unique directory created by this test, after absolute containment checks.
    const resolved = path.resolve(temporary), parent = path.resolve(os.tmpdir());
    assert.equal(path.dirname(resolved), parent); assert(path.basename(resolved).startsWith('yeastvar-server-'));
    fs.rmSync(resolved, { recursive: true, force: true });
    const failed = checks.filter(check => !check.pass);
    console.log(JSON.stringify({ passed: checks.length - failed.length, total: checks.length, checks }, null, 2));
    if (failed.length) process.exitCode = 1;
  });
