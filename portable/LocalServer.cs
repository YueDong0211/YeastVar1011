// Local-only static server. Runs on the Windows .NET Framework; no URLACL/admin setup.
// A fresh random token authenticates readiness/stop endpoints. It serves only dist/.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace YeastVarPortable {
    public sealed class LocalServer : IDisposable {
        private readonly string root, rootPrefix, rootId, instanceId, token, log;
        private readonly int preferredPort;
        private readonly object logLock = new object(), cacheLock = new object();
        private readonly Dictionary<string, CachedFile> cache = new Dictionary<string, CachedFile>(StringComparer.OrdinalIgnoreCase);
        private readonly Semaphore connections = new Semaphore(12, 12);
        private TcpListener listener;
        private volatile bool stopping;
        private long cachedBytes;
        public int Port { get; private set; }

        private sealed class CachedFile {
            public byte[] Bytes, Gzip;
            public long Length, Stamp;
            public string Tag, Mime;
        }

        public LocalServer(string webRoot, string id, string instance, string key, string logPath, int previousPort) {
            root = Path.GetFullPath(webRoot).TrimEnd(Path.DirectorySeparatorChar);
            rootPrefix = root + Path.DirectorySeparatorChar;
            rootId = id; instanceId = instance; token = key; log = logPath;
            preferredPort = previousPort >= 1024 && previousPort <= 65535 ? previousPort : 0;
            if (!File.Exists(Path.Combine(root, "index.html"))) throw new FileNotFoundException("Missing dist/index.html");
        }

        public void Start() {
            listener = new TcpListener(IPAddress.Loopback, preferredPort);
            listener.Server.ExclusiveAddressUse = true;
            try { listener.Start(64); }
            catch (SocketException) {
                listener.Stop();
                if (preferredPort == 0) throw;
                listener = new TcpListener(IPAddress.Loopback, 0);
                listener.Server.ExclusiveAddressUse = true;
                listener.Start(64);
            }
            Port = ((IPEndPoint)listener.LocalEndpoint).Port;
            WriteLog("READY 127.0.0.1:" + Port.ToString(CultureInfo.InvariantCulture) + " instance=" + instanceId);
        }

        public void Run() {
            while (!stopping) {
                TcpClient client;
                try { client = listener.AcceptTcpClient(); }
                catch (SocketException) { if (stopping) break; throw; }
                catch (ObjectDisposedException) { if (stopping) break; throw; }
                if (!connections.WaitOne(0)) { client.Close(); continue; }
                ThreadPool.QueueUserWorkItem(delegate {
                    try { Handle(client); }
                    catch (Exception error) { if (!(error is IOException) && !(error is SocketException)) WriteLog("REQUEST " + error.Message); }
                    finally { client.Close(); connections.Release(); }
                });
            }
        }

        private void Handle(TcpClient client) {
            client.ReceiveTimeout = 5000; client.SendTimeout = 10000; client.NoDelay = true;
            using (NetworkStream stream = client.GetStream()) {
                string header = ReadHeader(stream);
                if (header == null) return;
                string[] lines = header.Split(new string[] { "\r\n" }, StringSplitOptions.None);
                string[] start = lines[0].Split(' ');
                if (start.Length != 3 || !start[2].StartsWith("HTTP/1.", StringComparison.Ordinal)) { Text(stream, 400, "Bad Request", "Invalid request", false); return; }
                string method = start[0], target = start[1];
                bool head = method == "HEAD";
                Dictionary<string, string> headers = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                for (int i = 1; i < lines.Length; i++) {
                    int colon = lines[i].IndexOf(':');
                    if (colon > 0) headers[lines[i].Substring(0, colon).Trim()] = lines[i].Substring(colon + 1).Trim();
                }
                string expectedHost = "127.0.0.1:" + Port.ToString(CultureInfo.InvariantCulture), requestHost;
                if (!headers.TryGetValue("Host", out requestHost) || !String.Equals(requestHost, expectedHost, StringComparison.OrdinalIgnoreCase)) {
                    Text(stream, 400, "Bad Request", "Use the address opened by START.cmd", head); return;
                }
                if (!target.StartsWith("/", StringComparison.Ordinal) || target.StartsWith("//", StringComparison.Ordinal)) { Text(stream, 400, "Bad Request", "Invalid path", head); return; }
                int queryPosition = target.IndexOf('?');
                string encodedPath = queryPosition < 0 ? target : target.Substring(0, queryPosition);
                string query = queryPosition < 0 ? "" : target.Substring(queryPosition + 1);
                string path;
                try { path = Uri.UnescapeDataString(encodedPath); }
                catch { Text(stream, 400, "Bad Request", "Invalid path encoding", head); return; }
                if (path == "/_yv/health" || path == "/_yv/stop") {
                    if (query != "token=" + token) { Text(stream, 403, "Forbidden", "Instance token required", head); return; }
                    if (path == "/_yv/health" && (method == "GET" || head)) {
                        string body = "{\"ready\":true,\"rootId\":\"" + rootId + "\",\"instanceId\":\"" + instanceId + "\"}";
                        Respond(stream, 200, "OK", "application/json; charset=utf-8", Encoding.UTF8.GetBytes(body), head, "Cache-Control: no-store\r\n"); return;
                    }
                    if (path == "/_yv/stop" && method == "POST") {
                        Respond(stream, 200, "OK", "application/json; charset=utf-8", Encoding.UTF8.GetBytes("{\"stopped\":true}"), false, "Cache-Control: no-store\r\n");
                        Stop(); return;
                    }
                    Text(stream, 405, "Method Not Allowed", "Unsupported method", head); return;
                }
                if (method != "GET" && !head) { Text(stream, 405, "Method Not Allowed", "Only GET and HEAD are supported", false); return; }
                if (path.IndexOf('\0') >= 0 || path.IndexOf('\\') >= 0 || path.IndexOf(':') >= 0) { Text(stream, 400, "Bad Request", "Invalid path", head); return; }
                string file;
                try {
                    file = Path.GetFullPath(Path.Combine(root, path.TrimStart('/').Replace('/', Path.DirectorySeparatorChar)));
                    if (String.Equals(file, root, StringComparison.OrdinalIgnoreCase)) file = Path.Combine(root, "index.html");
                    if (!file.StartsWith(rootPrefix, StringComparison.OrdinalIgnoreCase)) { Text(stream, 403, "Forbidden", "Path is outside this site", head); return; }
                    if (Directory.Exists(file)) file = Path.Combine(file, "index.html");
                    // No directory listing and no symlink/junction escapes from the packaged web root.
                    if (!File.Exists(file) || IsLinkedPath(file)) { Text(stream, 404, "Not Found", "File not found in this package", head); return; }
                } catch { Text(stream, 400, "Bad Request", "Invalid file path", head); return; }
                CachedFile data = ReadFile(file);
                string etag = "\"" + data.Tag + "\"", requestTag;
                string common = "Cache-Control: no-cache\r\nETag: " + etag + "\r\nAccept-Ranges: bytes\r\nVary: Accept-Encoding\r\n";
                if (headers.TryGetValue("If-None-Match", out requestTag) && requestTag == etag) {
                    Respond(stream, 304, "Not Modified", data.Mime, new byte[0], true, common); return;
                }
                string range;
                if (headers.TryGetValue("Range", out range)) {
                    long from, to;
                    if (!TryRange(range, data.Bytes.LongLength, out from, out to)) {
                        Respond(stream, 416, "Range Not Satisfiable", data.Mime, new byte[0], head, "Content-Range: bytes */" + data.Length + "\r\n"); return;
                    }
                    int count = checked((int)(to - from + 1));
                    WriteHeaders(stream, 206, "Partial Content", data.Mime, count, common + "Content-Range: bytes " + from + "-" + to + "/" + data.Length + "\r\n");
                    if (!head) stream.Write(data.Bytes, checked((int)from), count);
                    return;
                }
                string encoding;
                bool gzip = data.Gzip != null && headers.TryGetValue("Accept-Encoding", out encoding) && AcceptsGzip(encoding);
                Respond(stream, 200, "OK", data.Mime, gzip ? data.Gzip : data.Bytes, head, common + (gzip ? "Content-Encoding: gzip\r\n" : ""));
            }
        }

        private static string ReadHeader(Stream stream) {
            using (MemoryStream buffer = new MemoryStream()) {
                int a = -1, b = -1, c = -1;
                for (int count = 0; count < 16384; count++) {
                    int value = stream.ReadByte(); if (value < 0) return null;
                    buffer.WriteByte((byte)value);
                    if (a == 13 && b == 10 && c == 13 && value == 10) return Encoding.ASCII.GetString(buffer.ToArray());
                    a = b; b = c; c = value;
                }
                return null;
            }
        }

        private bool IsLinkedPath(string file) {
            string cursor = file;
            while (cursor.Length >= root.Length) {
                if ((File.GetAttributes(cursor) & FileAttributes.ReparsePoint) != 0) return true;
                if (String.Equals(cursor, root, StringComparison.OrdinalIgnoreCase)) break;
                cursor = Path.GetDirectoryName(cursor);
            }
            return false;
        }

        private CachedFile ReadFile(string path) {
            FileInfo info = new FileInfo(path);
            lock (cacheLock) {
                CachedFile found;
                if (cache.TryGetValue(path, out found) && found.Stamp == info.LastWriteTimeUtc.Ticks && found.Length == info.Length) return found;
                if (found != null) { cachedBytes -= found.Bytes.LongLength + (found.Gzip == null ? 0 : found.Gzip.LongLength); cache.Remove(path); }
                CachedFile item = new CachedFile();
                item.Bytes = File.ReadAllBytes(path); item.Length = item.Bytes.LongLength; item.Stamp = info.LastWriteTimeUtc.Ticks;
                item.Tag = item.Stamp.ToString("x") + "-" + item.Length.ToString("x"); item.Mime = Mime(path);
                if (item.Bytes.Length > 1024 && (item.Mime.StartsWith("text/", StringComparison.Ordinal) || item.Mime.StartsWith("application/javascript", StringComparison.Ordinal) || item.Mime.StartsWith("application/json", StringComparison.Ordinal) || item.Mime.StartsWith("image/svg", StringComparison.Ordinal))) {
                    using (MemoryStream output = new MemoryStream()) {
                        using (GZipStream gzip = new GZipStream(output, CompressionMode.Compress, true)) { gzip.Write(item.Bytes, 0, item.Bytes.Length); }
                        item.Gzip = output.ToArray();
                    }
                }
                if (cachedBytes + item.Bytes.LongLength + (item.Gzip == null ? 0 : item.Gzip.LongLength) > 64L * 1024L * 1024L) { cache.Clear(); cachedBytes = 0; }
                cache[path] = item; cachedBytes += item.Bytes.LongLength + (item.Gzip == null ? 0 : item.Gzip.LongLength);
                return item;
            }
        }

        private static bool AcceptsGzip(string value) {
            foreach (string entry in value.Split(',')) {
                string[] parts = entry.Trim().Split(';');
                if (!String.Equals(parts[0].Trim(), "gzip", StringComparison.OrdinalIgnoreCase)) continue;
                for (int i = 1; i < parts.Length; i++) {
                    string option = parts[i].Trim();
                    if (option.StartsWith("q=", StringComparison.OrdinalIgnoreCase)) {
                        double quality;
                        if (Double.TryParse(option.Substring(2), NumberStyles.Float, CultureInfo.InvariantCulture, out quality)) return quality > 0;
                    }
                }
                return true;
            }
            return false;
        }

        private static bool TryRange(string value, long length, out long start, out long end) {
            start = 0; end = length - 1;
            if (!value.StartsWith("bytes=", StringComparison.OrdinalIgnoreCase) || length == 0) return false;
            string[] pair = value.Substring(6).Split('-');
            if (pair.Length != 2) return false;
            if (pair[0].Length == 0) {
                long suffix; if (!Int64.TryParse(pair[1], out suffix) || suffix <= 0) return false;
                start = Math.Max(0, length - suffix); return true;
            }
            if (!Int64.TryParse(pair[0], out start) || start < 0 || start >= length) return false;
            if (pair[1].Length > 0 && (!Int64.TryParse(pair[1], out end) || end < start)) return false;
            end = Math.Min(end, length - 1); return true;
        }

        private static string Mime(string path) {
            switch (Path.GetExtension(path).ToLowerInvariant()) {
                case ".html": case ".htm": return "text/html; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".js": case ".mjs": return "application/javascript; charset=utf-8";
                case ".json": case ".map": return "application/json; charset=utf-8";
                case ".svg": return "image/svg+xml; charset=utf-8";
                case ".png": return "image/png";
                case ".jpg": case ".jpeg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".webp": return "image/webp";
                case ".avif": return "image/avif";
                case ".ico": return "image/x-icon";
                case ".woff": return "font/woff";
                case ".woff2": return "font/woff2";
                case ".ttf": return "font/ttf";
                case ".otf": return "font/otf";
                case ".wasm": return "application/wasm";
                case ".mp4": return "video/mp4";
                case ".webm": return "video/webm";
                case ".mp3": return "audio/mpeg";
                case ".ogg": return "audio/ogg";
                case ".wav": return "audio/wav";
                case ".pdf": return "application/pdf";
                case ".zip": return "application/zip";
                case ".md": case ".txt": case ".csv": case ".tsv": return "text/plain; charset=utf-8";
                default: return "application/octet-stream";
            }
        }

        private static void Text(Stream stream, int status, string reason, string text, bool head) {
            Respond(stream, status, reason, "text/plain; charset=utf-8", Encoding.UTF8.GetBytes(text), head, "Cache-Control: no-store\r\n");
        }
        private static void WriteHeaders(Stream stream, int status, string reason, string mime, long length, string extra) {
            string text = "HTTP/1.1 " + status + " " + reason + "\r\nContent-Type: " + mime + "\r\nContent-Length: " + length.ToString(CultureInfo.InvariantCulture) +
                "\r\nConnection: close\r\nX-Content-Type-Options: nosniff\r\nReferrer-Policy: strict-origin-when-cross-origin\r\n" + extra + "\r\n";
            byte[] bytes = Encoding.ASCII.GetBytes(text); stream.Write(bytes, 0, bytes.Length);
        }
        private static void Respond(Stream stream, int status, string reason, string mime, byte[] body, bool head, string extra) {
            WriteHeaders(stream, status, reason, mime, body.LongLength, extra);
            if (!head && body.Length > 0) stream.Write(body, 0, body.Length);
            stream.Flush();
        }
        private void WriteLog(string text) {
            lock (logLock) {
                try {
                    if (File.Exists(log) && new FileInfo(log).Length > 1024 * 1024) File.WriteAllText(log, "");
                    File.AppendAllText(log, DateTime.UtcNow.ToString("o") + " " + text + Environment.NewLine, Encoding.UTF8);
                } catch { }
            }
        }
        public void Stop() {
            if (stopping) return;
            stopping = true; if (listener != null) listener.Stop(); WriteLog("STOP instance=" + instanceId);
        }
        public void Dispose() { Stop(); }
    }
}
