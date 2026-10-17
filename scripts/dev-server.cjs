/* Dependency-free, loopback-only development server for the static dist/ app. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { pipeline } = require('node:stream/promises');

const DEFAULT_ROOT = path.resolve(__dirname, '..', 'dist');
const DEFAULT_PORT = 4173;
const MIME = Object.freeze({
  '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8', '.tsv': 'text/tab-separated-values; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.wasm': 'application/wasm', '.pdf': 'application/pdf', '.zip': 'application/zip',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
  '.wav': 'audio/wav', '.xml': 'application/xml; charset=utf-8'
});

function within(root, file) {
  const relative = path.relative(root, file);
  return relative === '' || (!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith('..' + path.sep));
}

function basePath(value = '/') {
  if (typeof value !== 'string' || value.includes('//') || !/^\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]*\/?$/.test(value)) {
    throw new Error('BASE_PATH must be a URL directory such as / or /YeastVar1011/.');
  }
  return value === '/' ? '/' : value.replace(/\/$/, '') + '/';
}

function parsePort(value = DEFAULT_PORT) {
  if (!/^\d{1,5}$/.test(String(value)) || Number(value) > 65535) {
    throw new Error('PORT must be an integer from 0 to 65535 (0 selects an available port).');
  }
  return Number(value);
}

function reply(req, res, code, message, extra = {}) {
  const body = Buffer.from(message + '\n');
  res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': body.length,
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra });
  res.end(req.method === 'HEAD' ? undefined : body);
}

// Inspect the original request target before a URL parser can normalize dot segments.
function requestPath(target) {
  if (typeof target !== 'string' || !target.startsWith('/') || target.startsWith('//')) return null;
  const queryAt = target.indexOf('?');
  const raw = queryAt < 0 ? target : target.slice(0, queryAt);
  if (/[#\\\u0000-\u001f\u007f]/.test(raw) || /%(?:2f|5c)/i.test(raw)) return null;
  let decoded;
  try { decoded = decodeURIComponent(raw); } catch { return null; }
  if (/[\\:\u0000-\u001f\u007f]/.test(decoded) || /%(?:2e|2f|5c|00)/i.test(decoded)) return null;
  const parts = decoded.split('/');
  if (parts.some(p => p === '.' || p === '..' || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p))) return null;
  return { decoded, raw, query: queryAt < 0 ? '' : target.slice(queryAt) };
}

function byteRange(value, length) {
  if (!value) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(value);
  if (!match || (!match[1] && !match[2]) || length === 0) return false;
  let start, end;
  if (!match[1]) {
    const count = Number(match[2]);
    if (!Number.isSafeInteger(count) || count <= 0) return false;
    start = Math.max(0, length - count); end = length - 1;
  } else {
    start = Number(match[1]); end = match[2] ? Number(match[2]) : length - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= length || end < start) return false;
    end = Math.min(end, length - 1);
  }
  return { start, end };
}

function createDevServer(options = {}) {
  const root = fs.realpathSync(options.root || DEFAULT_ROOT);
  if (!fs.statSync(root).isDirectory()) throw new Error('The static root must be a directory.');
  const prefix = basePath(options.basePath || '/');
  const server = http.createServer(async (req, res) => {
    // The server never binds a LAN interface. Host validation also rejects DNS rebinding.
    const port = server.address()?.port;
    if (![ `127.0.0.1:${port}`, `localhost:${port}` ].includes((req.headers.host || '').toLowerCase())) {
      reply(req, res, 400, 'Use this server\'s local address.'); return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      reply(req, res, 405, 'Only GET and HEAD are supported.', { Allow: 'GET, HEAD' }); return;
    }
    const parsed = requestPath(req.url);
    if (!parsed) { reply(req, res, 400, 'Invalid request path.'); return; }
    const { decoded, raw, query } = parsed;
    if (decoded.split('/').some(segment => segment.startsWith('.'))) {
      reply(req, res, 404, 'File not found.'); return;
    }
    if (prefix !== '/' && decoded === prefix.slice(0, -1)) {
      reply(req, res, 308, 'Use the directory URL.', { Location: prefix + query }); return;
    }
    if (!decoded.startsWith(prefix)) { reply(req, res, 404, 'File not found.'); return; }
    const relative = decoded.slice(prefix.length);
    const candidate = path.resolve(root, relative);
    if (!within(root, candidate)) { reply(req, res, 403, 'Path is outside this site.'); return; }
    let handle;
    try {
      let file = await fs.promises.realpath(candidate);
      if (!within(root, file)) { reply(req, res, 403, 'Path is outside this site.'); return; }
      let stat = await fs.promises.stat(file);
      if (stat.isDirectory()) {
        if (!decoded.endsWith('/')) {
          reply(req, res, 308, 'Use the directory URL.', { Location: raw + '/' + query }); return;
        }
        file = await fs.promises.realpath(path.join(file, 'index.html'));
        if (!within(root, file)) { reply(req, res, 403, 'Path is outside this site.'); return; }
      }
      // Open the resolved path, not the untrusted symlink path; stream this same handle.
      handle = await fs.promises.open(file, 'r');
      stat = await handle.stat();
      if (!stat.isFile()) { reply(req, res, 404, 'File not found.'); return; }
      const range = byteRange(req.headers.range, stat.size);
      if (range === false) {
        reply(req, res, 416, 'Requested byte range is not available.', { 'Content-Range': `bytes */${stat.size}` }); return;
      }
      const headers = { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Content-Length': range ? range.end - range.start + 1 : stat.size, 'Accept-Ranges': 'bytes',
        'Last-Modified': stat.mtime.toUTCString(), 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' };
      if (range) headers['Content-Range'] = `bytes ${range.start}-${range.end}/${stat.size}`;
      res.writeHead(range ? 206 : 200, headers);
      if (req.method === 'HEAD' || stat.size === 0) { res.end(); return; }
      await pipeline(handle.createReadStream({ ...(range || {}), autoClose: false }), res);
    } catch (error) {
      if (!res.headersSent && !res.destroyed) {
        if (['ENOENT', 'ENOTDIR', 'EISDIR', 'EACCES', 'EPERM'].includes(error.code)) reply(req, res, 404, 'File not found.');
        else reply(req, res, 500, 'The local file could not be read.');
      } else if (!res.destroyed) res.destroy();
    } finally { await handle?.close().catch(() => {}); }
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.keepAliveTimeout = 1000;
  return server;
}

function start() {
  if (Number(process.versions.node.split('.')[0]) < 20) throw new Error('Node.js 20 or newer is required.');
  const port = parsePort(process.env.PORT ?? DEFAULT_PORT);
  const prefix = basePath(process.env.BASE_PATH || '/');
  const server = createDevServer({ basePath: prefix });
  server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Set PORT to another port.` : 'Could not start the local server: ' + error.message);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`YeastVar1011 ready: http://127.0.0.1:${server.address().port}${prefix}`);
    console.log('Press Ctrl+C to stop. This server is accessible only from this computer.');
  });
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.close());
  return server;
}

module.exports = { createDevServer, start };
if (require.main === module) {
  try { start(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
