// Installable-app test: serves the project like GitHub Pages (/hangul-guardians/), checks the manifest and installability,
// waits for the offline cache, then goes offline and plays: reload, title, book pictures, music, a case, a range request.
// Finally publishes a changed build and checks the update bar → update → new version.
// From the project root:  python -m http.server 8000   then   node tests/app-offline.js
// (BASE=http://host/path/ to test a deployed copy; it edits js/app.js and sw.js briefly and restores them)
const {chromium}=require('playwright');const fs=require('fs');
const path=require('path');const BASE=process.env.BASE||'http://localhost:8000/';const APPDIR=process.env.APPDIR||path.resolve(__dirname,'..');const OUTD=path.join(__dirname,'out');fs.mkdirSync(OUTD,{recursive:true});const R=[];const ok=(n,c,x)=>R.push((c?'PASS ':'FAIL ')+n+(x!==undefined?' :: '+JSON.stringify(x):''));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1024,height:768}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],speak:u=>setTimeout(()=>u.onend&&u.onend(),30),cancel(){},addEventListener(){}}})});
 await p.goto(BASE);await p.waitForTimeout(800);
 const cdp=await ctx.newCDPSession(p);
 const man=await cdp.send('Page.getAppManifest');ok('manifest parsed without errors',man.errors.length===0&&!!man.data,man.errors);
 let inst=null;try{inst=await cdp.send('Page.getInstallabilityErrors')}catch(e){inst={err:e.message}}ok('installable (no installability errors)',inst&&inst.installabilityErrors&&inst.installabilityErrors.length===0,inst);
 // wait for the worker and the full offline cache
 const t0=Date.now();let st;while(Date.now()-t0<120000){st=await p.evaluate(()=>({ctl:!!navigator.serviceWorker.controller,done:APP.done,total:APP.total}));if(st.ctl&&st.total&&st.done>=st.total)break;await p.waitForTimeout(500)}
 ok('worker controls the page and cached every file',st.ctl&&st.done===st.total&&st.total>100,st);
 const keys=await p.evaluate(async()=>{const ks=await caches.keys();const c=await caches.open(ks.find(k=>k.startsWith('hg-')));return (await c.keys()).length});ok('cache holds the files',keys>=st.total,{keys});
 // offline
 await ctx.setOffline(true);await p.reload();await p.waitForTimeout(1200);
 st=await p.evaluate(()=>({splash:!$("splashOv").hidden,poster:$("spImg").naturalWidth,font:document.fonts.check('20px "Gowun Dodum"')}));ok('offline reload boots to the title poster',st.splash&&st.poster>0,st);
 await p.evaluate(()=>{document.querySelector('#spGo').click()});await p.waitForTimeout(400);await p.evaluate(()=>{const b=document.querySelector('#tBtns .btn.pri');b&&b.click()});await p.waitForTimeout(800);
 st=await p.evaluate(async()=>{const r=await fetch('assets/audio/bgm/title.mp3');const a=await r.arrayBuffer();return {status:r.status,bytes:a.byteLength}});ok('offline: music file served from the cache',st.status===200&&st.bytes>100000,st);
 st=await p.evaluate(async()=>{const r=await fetch('assets/audio/bgm/title.mp3',{headers:{Range:'bytes=100-199'}});const a=await r.arrayBuffer();return {status:r.status,bytes:a.byteLength,cr:r.headers.get('Content-Range')}});ok('offline: byte-range request answered with 206',st.status===206&&st.bytes===100,st);
 await p.evaluate(()=>{G.view='library';renderAll();openBook('b1')});await p.waitForTimeout(2500);
 st=await p.evaluate(()=>{const imgs=[...document.querySelectorAll('#bookOv img')].filter(i=>i.getAttribute('src'));return {n:imgs.length,broken:imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.getAttribute('src'))}});ok('offline: storybook pictures load',st.n>0&&st.broken.length===0,st);
 await p.screenshot({path:OUTD+'/pwa_offline_book.png'});
 await p.evaluate(()=>{bookClose();openCases();caseStart(4)});await p.waitForTimeout(1500);
 st=await p.evaluate(()=>{const imgs=[...document.querySelectorAll('#caseOv img')].filter(i=>i.getAttribute('src'));return {n:imgs.length,broken:imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.getAttribute('src'))}});ok('offline: case pictures load',st.n>0&&st.broken.length===0,st);
 await p.screenshot({path:OUTD+'/pwa_offline_case.png'});
 await p.evaluate(()=>{caseClose()});
 // code fix pushed without a new sw.js: served from the saved copy first, refreshed in the background, used on the next launch
 await ctx.setOffline(false);
 const ajs=APPDIR+'/js/app.js',origJs=fs.readFileSync(ajs,'utf8');fs.writeFileSync(ajs,origJs+'\n/*swr-marker*/\n');
 // the browser's own cache may answer the script without asking the worker (heuristic freshness grows with the file's age,
 // and GitHub Pages sends max-age=600), so turn it off for this check: the request must reach the worker
 await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 try{await p.reload();await p.waitForTimeout(2500);
  const m1=await p.evaluate(async()=>{const k=(await caches.keys()).find(k=>k.startsWith('hg-'));const r=await (await caches.open(k)).match('js/app.js');return (await r.text()).includes('swr-marker')});
  ok('code change is fetched in the background into the saved copy',m1,{m1});
  await p.reload();await p.waitForTimeout(1500);
  const m2=await p.evaluate(()=>[...document.scripts].length>0&&typeof G==='object');ok('next launch runs fine with the refreshed code',m2)}
 finally{fs.writeFileSync(ajs,origJs)}
 // update: a changed build appears on the server
 const swp=APPDIR+'/sw.js';const orig=fs.readFileSync(swp,'utf8');fs.writeFileSync(swp,orig.replace(/const VERSION = "([0-9a-f]+)"/,'const VERSION = "$1-next"'));
 try{await p.evaluate(()=>APP.reg.update());let bar=null;const t1=Date.now();while(Date.now()-t1<60000){bar=await p.evaluate(()=>{const b=$("appBar");return b&&!b.hidden?b.textContent:null});if(bar)break;await p.waitForTimeout(500)}
  ok('update bar appears when a new build is published',!!bar&&/새 버전|new version/.test(bar),bar);
  await p.screenshot({path:OUTD+'/pwa_update.png'});
  await Promise.all([p.waitForNavigation({timeout:30000}).catch(()=>null),p.evaluate(()=>document.querySelector('#appBar [data-go]').click())]);await p.waitForTimeout(1500);
  const v=await p.evaluate(async()=>(await caches.keys()).filter(k=>k.startsWith('hg-')));ok('after update only the new cache is left',v.length===1&&/-next$/.test(v[0]),v)}
 finally{fs.writeFileSync(swp,orig)}
 ok('no page errors',errs.filter(e=>!/favicon|ERR_INTERNET_DISCONNECTED|net::ERR/.test(e)).length===0,errs.slice(0,6));
 console.log(R.join('\n'));await b.close();process.exit(R.some(x=>x.startsWith('FAIL'))?1:0)})();
