/* 열두동물 한글 수비대 — offline worker.
   Every build writes a new VERSION here; a changed sw.js is how an installed app notices there is an update.
   The new version waits until the player taps "업데이트" (or until the app is fully closed), so a game in progress is never swapped out. */
const VERSION = "__VERSION__";
const CACHE = "hg-" + VERSION;
const CORE = __CORE__;   /* must all be saved, or this version is not installed */
const REST = __REST__;   /* saved too; one missing file does not stop the install */

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE), total = CORE.length + REST.length;
    let done = 0;
    const tell = async () => { (await self.clients.matchAll({ includeUncontrolled: true })).forEach(x => x.postMessage({ type: "cache", done, total, version: VERSION })); };
    const put = async (u, must) => {
      try { const r = await fetch(new Request(u, { cache: "reload" })); if (!r.ok) throw new Error(u + " " + r.status); await c.put(u, r); }
      catch (err) { if (must) throw err; }
      done++;
    };
    for (const u of CORE) await put(u, true);
    await tell();
    for (let i = 0; i < REST.length; i += 8) { await Promise.all(REST.slice(i, i + 8).map(u => put(u, false))); await tell(); }
  })());
});

self.addEventListener("message", e => { if (e.data && e.data.type === "skip") self.skipWaiting(); });

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("hg-") && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* media players ask for byte ranges; answer them from the saved file so sound works offline too */
async function partial(res, range) {
  const buf = await res.arrayBuffer(), n = buf.byteLength, m = /bytes=(\d*)-(\d*)/.exec(range);
  let s = 0, end = n - 1;
  if (m) { if (m[1] === "" && m[2] !== "") { s = Math.max(0, n - +m[2]); } else { s = +m[1] || 0; if (m[2] !== "") end = Math.min(+m[2], n - 1); } }
  if (s >= n) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${n}` } });
  const body = buf.slice(s, end + 1);
  return new Response(body, { status: 206, statusText: "Partial Content", headers: {
    "Content-Type": res.headers.get("Content-Type") || "application/octet-stream",
    "Content-Range": `bytes ${s}-${end}/${n}`, "Content-Length": String(body.byteLength), "Accept-Ranges": "bytes" } });
}

/* code files (page, style, game script, book data, voice list) are shown from the saved copy at once and refreshed in the
   background, so a fix pushed to GitHub reaches the app on the next launch even without a new sw.js; everything else is cache-first */
const CODE = /\/(index\.html|css\/style\.css|js\/app\.js|audio\/voices\.js|manifest\.webmanifest|books\/[^/]+\/book\.js)$/;
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope);
  if (!url.pathname.startsWith(scope.pathname)) return;
  const isPage = req.mode === "navigate" && (url.pathname === scope.pathname || url.pathname === scope.pathname + "index.html");
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    if (isPage || CODE.test(url.pathname)) {
      const key = isPage ? new URL("index.html", scope).href : url.origin + url.pathname;
      const cached = await c.match(key);
      const refresh = fetch(new Request(key, { cache: "no-cache" })).then(async r => { if (r.ok && r.status === 200) await c.put(key, r.clone()); return r; });
      if (cached) { e.waitUntil(refresh.catch(() => {})); return cached; }
      return refresh;
    }
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) { const range = req.headers.get("range"); return range ? partial(hit, range) : hit; }
    try {
      const r = await fetch(req);
      if (r.ok && r.status === 200 && !req.headers.get("range")) c.put(req, r.clone());
      return r;
    } catch (err) {
      if (req.mode === "navigate") { const idx = await c.match(new URL("index.html", scope).href); if (idx) return idx; }
      throw err;
    }
  })());
});
