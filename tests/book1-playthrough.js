// Plays 〈토끼와 거북이〉 from the library to the bonus ending in headless Chromium.
// Setup once:  npm install playwright && npx playwright install chromium
// Run:         node tests/book1-playthrough.js            (tablet 1024x768)
//              node tests/book1-playthrough.js phone      (390x844)
// Screenshots go to tests/out/. Exit code 1 means a step timed out or the page threw an error.
const {chromium} = require('playwright');
const path = require('path');
const fs = require('fs');

const phone = process.argv[2] === 'phone';
const vw = phone ? {width: 390, height: 844} : {width: 1024, height: 768};
const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
const outDir = path.join(__dirname, 'out');
fs.mkdirSync(outDir, {recursive: true});

(async () => {
  const browser = await chromium.launch();
  const p = await browser.newPage({viewport: vw});
  const errs = [];
  let timeouts = 0;
  p.on('pageerror', e => errs.push(e.message));
  // Fake speech so the test does not depend on the machine's voices.
  await p.addInitScript(() => {
    window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
    const q = []; let cur = null;
    const tick = () => { if (cur || !q.length) return; cur = q.shift(); const me = cur;
      setTimeout(() => { if (cur !== me) return; cur = null; me.onend && me.onend(); tick(); }, 120 + me.text.length * 8); };
    Object.defineProperty(window, 'speechSynthesis', {value: {getVoices: () => [{name: 'Yuna', lang: 'ko-KR'}],
      speak: u => { q.push(u); tick(); }, cancel: () => { q.length = 0; cur = null; }, addEventListener() {}}});
  });
  // reading missions (v29): answer like a child who reads well: "다 읽었어요", then the right picture
  await p.addInitScript(() => { window.__missions = []; setInterval(() => { const o = document.getElementById('rmOv'); if (!o || o.hidden) return;
    const t = (document.getElementById('rmText') || {}).textContent; if (t && !window.__missions.includes(t)) window.__missions.push(t);
    const d = document.getElementById('rmDone'); if (d && !d.hidden) { d.click(); return; }
    const b = o.querySelector('.rmop[data-ok="1"]:not(:disabled)'); if (b) b.click(); }, 400); });
  await p.goto(url);
  await p.waitForTimeout(500);
  const shot = n => p.screenshot({path: path.join(outDir, (phone ? 'P' : 'T') + n + '.png')});
  const W = async (fn, ms = 20000, arg) => { const t = Date.now();
    while (Date.now() - t < ms) { if (await p.evaluate(fn, arg)) return true; await p.waitForTimeout(150); }
    timeouts++; console.log('TIMEOUT', fn.toString().slice(0, 90)); return false; };
  const C = sel => p.evaluate(s => { const e = document.querySelector(s); if (!e) throw new Error('missing ' + s); e.click(); }, sel);
  const onPage = (i) => W(i => !!document.querySelector('#sbText') && document.querySelector('.sbnav .pn').textContent.includes((i + 1) + ' /'), 8000, i);

  // start a new game in Korean
  await p.evaluate(() => document.querySelector('#spGo').click());
  await p.waitForTimeout(300);
  await p.evaluate(() => { G.lang = 'ko'; showTitle(); document.querySelector('#tBtns .btn.pri').click(); });
  await p.waitForTimeout(1200);
  await shot('00_library');

  // prologue: why the book broke
  await C('#deskBook');
  // the number of prologue pages depends on the hero (tiger and rabbit get one extra illustrated page)
  await onPage(0);
  const pages = await p.evaluate(() => +document.querySelector('.sbnav .pn').textContent.split('/')[1]);
  for (let i = 0; i < pages; i++) { await onPage(i); await p.waitForTimeout(1200); await shot('01_prologue' + i); await C('#sbNext'); }
  await W(() => BK && BK.si === 0, 15000);
  await shot('02_explore');

  // explore: find the three records
  for (const k of ['tree', 'path', 'finish']) { await C(`.bhot[data-h="${k}"]`); await p.waitForTimeout(900); await W(() => !BK.busy, 15000); }
  await C('#bNext'); await W(() => BK.si === 1);

  // choose: one wrong answer each, then the right ones
  await C('[data-who="turtle"]'); await p.waitForTimeout(800);
  await C('[data-who="rabbit"]'); await W(() => BK.ss.ph === 'ev');
  await C('[data-rec="finish"]'); await p.waitForTimeout(600);
  await C('[data-rec="tree"]'); await W(() => BK.ss.qi === 1);
  await C('[data-who="turtle"]'); await W(() => BK.ss.ph === 'ev');
  await C('[data-rec="path"]');
  await W(() => BK.si === 2, 20000);

  // fix the changed word
  await C('[data-tk="1"]'); await p.waitForTimeout(600);
  await C('[data-tk="0"]'); await p.waitForTimeout(400);
  await C('[data-fix="토끼가"]');
  await W(() => BK.si === 3, 15000);

  // the story changes on screen
  await W(() => !!document.querySelector('#bNext'), 25000);
  await shot('03_changed');
  await C('#bNext'); await W(() => BK.si === 4);

  // put the pages in order
  await C('[data-pg="2"]'); await p.waitForTimeout(800);
  for (const j of [0, 1, 2]) { await C(`[data-pg="${j}"]`); await W(() => !BK.busy || BK.ss.ord.length === 3, 4000); await p.waitForTimeout(250); }
  await W(() => BK.si === 5, 8000);

  // read the restored story
  for (let i = 0; i < 6; i++) { await onPage(i); await p.waitForTimeout(1300); await shot('04_story' + i); await C('#sbNext'); }
  await W(() => !!document.querySelector('#bShelf'), 8000);
  await shot('05_finish');

  // bonus: my own ending
  await C('#bEnd'); await p.waitForTimeout(700);
  await C('[data-ea="2"]'); await W(() => !!document.querySelector('[data-eb]'), 8000);
  await C('[data-eb="2"]'); await W(() => !!document.querySelector('#bShelf2'), 10000);
  await shot('06_my_ending');
  const result = await p.evaluate(() => ({book: G.books.b1, hud: $('hObj').textContent, missions: window.__missions.length}));
  if (result.missions !== 3) { console.log('MISSIONS expected 3, saw', result.missions); timeouts++; }
  await C('#bShelf2'); await p.waitForTimeout(800);
  await shot('07_shelf');

  console.log(JSON.stringify(result, null, 1));
  const real = errs.filter(e => !/ERR_(INTERNET|TUNNEL|NAME)/.test(e));
  console.log('page errors:', JSON.stringify(real));
  await browser.close();
  process.exit(real.length || timeouts ? 1 : 0);
})();
