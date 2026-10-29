/* 열두동물 한글 수비대 — offline worker.
   Every build writes a new VERSION here; a changed sw.js is how an installed app notices there is an update.
   The new version waits until the player taps "업데이트" (or until the app is fully closed), so a game in progress is never swapped out. */
const VERSION = "4790c8cc46bb";
const CACHE = "hg-" + VERSION;
const CORE = ["./", "index.html", "css/style.css", "js/app.js", "audio/voices.js", "books/b1/book.js", "manifest.webmanifest", "assets/fonts/jua-korean-400-normal.woff2", "assets/fonts/gowun-dodum-korean-400-normal.woff2"];   /* must all be saved, or this version is not installed */
const REST = ["assets/audio/bgm/book.mp3", "assets/audio/bgm/case.mp3", "assets/audio/bgm/course.mp3", "assets/audio/bgm/duel.mp3", "assets/audio/bgm/explore.mp3", "assets/audio/bgm/play.mp3", "assets/audio/bgm/reveal.mp3", "assets/audio/bgm/solved.mp3", "assets/audio/bgm/tension.mp3", "assets/audio/bgm/title.mp3", "assets/fonts/fredoka-latin-400-normal.woff2", "assets/fonts/fredoka-latin-500-normal.woff2", "assets/fonts/fredoka-latin-600-normal.woff2", "assets/fonts/fredoka-latin-700-normal.woff2", "assets/img/card/dog_atk.webp", "assets/img/card/dog_def.webp", "assets/img/card/dragon_atk.webp", "assets/img/card/dragon_def.webp", "assets/img/card/horse_atk.webp", "assets/img/card/horse_def.webp", "assets/img/card/mentor_atk.webp", "assets/img/card/mentor_def.webp", "assets/img/card/monkey_atk.webp", "assets/img/card/monkey_def.webp", "assets/img/card/ox_atk.webp", "assets/img/card/ox_def.webp", "assets/img/card/pig_atk.webp", "assets/img/card/pig_def.webp", "assets/img/card/rabbit_atk.webp", "assets/img/card/rabbit_def.webp", "assets/img/card/rat_atk.webp", "assets/img/card/rat_def.webp", "assets/img/card/sheep_atk.webp", "assets/img/card/sheep_def.webp", "assets/img/card/snake_atk.webp", "assets/img/card/snake_def.webp", "assets/img/card/tiger_atk.webp", "assets/img/card/tiger_def.webp", "assets/img/card/v_black_atk.webp", "assets/img/card/v_black_def.webp", "assets/img/card/v_fat_atk.webp", "assets/img/card/v_fat_def.webp", "assets/img/card/v_gray_atk.webp", "assets/img/card/v_gray_def.webp", "assets/img/card/v_purple_atk.webp", "assets/img/card/v_purple_def.webp", "assets/img/card/v_tiger_atk.webp", "assets/img/card/v_tiger_def.webp", "assets/img/card/v_white_atk.webp", "assets/img/card/v_white_def.webp", "assets/img/hero/dog.webp", "assets/img/hero/dragon.webp", "assets/img/hero/horse.webp", "assets/img/hero/mentor.webp", "assets/img/hero/monkey.webp", "assets/img/hero/ox.webp", "assets/img/hero/pig.webp", "assets/img/hero/rabbit.webp", "assets/img/hero/rabbit_run_sheet.webp", "assets/img/hero/rat.webp", "assets/img/hero/rooster.webp", "assets/img/hero/sheep.webp", "assets/img/hero/snake.webp", "assets/img/hero/tiger.webp", "assets/img/npc/beaver.webp", "assets/img/npc/beaver_face.webp", "assets/img/npc/beaver_happy.webp", "assets/img/npc/beaver_worried.webp", "assets/img/npc/gull.webp", "assets/img/npc/gull_face.webp", "assets/img/npc/gull_happy.webp", "assets/img/npc/gull_worried.webp", "assets/img/npc/mole.webp", "assets/img/npc/mole_face.webp", "assets/img/npc/mole_happy.webp", "assets/img/npc/mole_worried.webp", "assets/img/npc/raccoon.webp", "assets/img/npc/raccoon_face.webp", "assets/img/npc/spider.webp", "assets/img/npc/spider_face.webp", "assets/img/npc/spider_happy.webp", "assets/img/npc/spider_worried.webp", "assets/img/npc/squirrel.webp", "assets/img/npc/squirrel_face.webp", "assets/img/npc/squirrel_happy.webp", "assets/img/npc/squirrel_worried.webp", "assets/img/npc/v_black.webp", "assets/img/npc/v_black_face.webp", "assets/img/portrait/dog.webp", "assets/img/portrait/dragon.webp", "assets/img/portrait/horse.webp", "assets/img/portrait/mentor.webp", "assets/img/portrait/monkey.webp", "assets/img/portrait/ox.webp", "assets/img/portrait/pig.webp", "assets/img/portrait/rabbit.webp", "assets/img/portrait/rat.webp", "assets/img/portrait/rooster.webp", "assets/img/portrait/sheep.webp", "assets/img/portrait/snake.webp", "assets/img/portrait/tiger.webp", "assets/img/portrait/v_black.webp", "assets/img/portrait/v_fat.webp", "assets/img/portrait/v_gray.webp", "assets/img/portrait/v_purple.webp", "assets/img/portrait/v_tiger.webp", "assets/img/portrait/v_white.webp", "assets/img/scene/course_forest.webp", "assets/img/scene/island.webp", "assets/img/scene/island_map.webp", "assets/img/scene/start_poster.webp", "assets/img/scene/storyboard_p1.webp", "assets/img/scene/storyboard_p2.webp", "assets/img/villain/black_head.webp", "assets/img/villain/fat.webp", "assets/img/villain/gray.webp", "assets/img/villain/purple.webp", "assets/img/villain/tiger.webp", "assets/img/villain/white.webp", "books/b1/card1.webp", "books/b1/card2.webp", "books/b1/card3.webp", "books/b1/cover.webp", "books/b1/page1.webp", "books/b1/page2.webp", "books/b1/page3.webp", "books/b1/rabbit_run.webp", "books/b1/rabbit_sleep.webp", "books/b1/rabbit_stand.webp", "books/b1/rabbit_surprise.webp", "books/b1/scene_broken.webp", "books/b1/scene_enter.webp", "books/b1/spread.webp", "books/b1/turtle_stand.webp", "books/b1/turtle_think.webp", "books/b1/turtle_walk.webp", "books/b1/turtle_win.webp", "icons/apple-touch-icon.png", "icons/favicon-32.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];   /* saved too; one missing file does not stop the install */

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
