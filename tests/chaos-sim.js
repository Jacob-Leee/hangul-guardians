// Chaos simulator: plays every mode with random taps, quits mid-animation, screen resizes, language switches and reloads,
// and checks the page after every action (script errors, "undefined"/"NaN" on screen, broken images, sideways scrolling,
// two screens open at once, duplicate element ids, stuck screens, lost progress).
// Setup once:  npm install playwright && npx playwright install chromium
// Run:         node tests/chaos-sim.js [seed] [rounds] [tablet|phone|mix] [normal|slow|none]
//              e.g. node tests/chaos-sim.js 7 14 mix slow      (about 10 minutes)
// speech: normal = fast fake voice, slow = slow fake voice, none = a device without a speech engine.
// Report and screenshots go to tests/out/. Exit code 1 = at least one problem found.
const path=require('path');
// Scenario + chaos simulator. Plays every mode with the game's own answer helpers, mixes in random taps,
// quits mid-animation, resizes, toggles language, reloads, and checks page health after every action.
// node sim.js <seed> <rounds> <tablet|phone|mix> <speech:normal|slow|none> [file]
const {chromium}=require('playwright');const fs=require('fs');
const seed=+(process.argv[2]||1),ROUNDS=+(process.argv[3]||20),mode=process.argv[4]||'tablet',speech=process.argv[5]||'normal',OUT=path.join(__dirname,'out');fs.mkdirSync(OUT,{recursive:true});
let rs=seed*7919%233280+1;const rnd=()=>{rs=(rs*9301+49297)%233280;return rs/233280};const pickA=a=>a[Math.floor(rnd()*a.length)];
const STUCK=speech==='normal'?25000:45000;
const VW={tablet:{width:1024,height:768},phone:{width:390,height:844},tabletP:{width:768,height:1024},phoneL:{width:844,height:390},big:{width:1366,height:1024}};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:mode==='phone'?VW.phone:VW.tablet});const p=await ctx.newPage();
 const issues=[],trace=[];let scen='boot';
 const add=async(kind,msg)=>{const key=kind+':'+scen+':'+String(msg).slice(0,140);if(issues.find(x=>x.key===key))return;const n=issues.length;issues.push({key,kind,scen,msg:String(msg).slice(0,500),last:trace.slice(-8)});try{await p.screenshot({path:path.join(OUT,`sim_${seed}_${n}.png`)})}catch(e){}};
 p.on('pageerror',e=>add('pageerror',e.message+' @ '+(e.stack||'').split('\n').slice(1,3).join(' ')));
 p.on('console',m=>{if(m.type()==='error'&&!/ERR_|fonts|favicon|Failed to load resource/.test(m.text()))add('console',m.text())});
 await p.addInitScript(([speech,seed])=>{let s=seed;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
  window.addEventListener('unhandledrejection',e=>{(window.__rej=window.__rej||[]).push(String(e.reason&&e.reason.message||e.reason))});
  if(speech==='none'){Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});window.SpeechSynthesisUtterance=undefined;return}
  const per=speech==='slow'?55:6;window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};const q=[];let cur=null;
  const tick=()=>{if(cur||!q.length)return;cur=q.shift();const me=cur;setTimeout(()=>{if(cur!==me)return;cur=null;me.onend&&me.onend();tick()},60+me.text.length*per)};
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'},{name:'Karen',lang:'en-AU'}],get speaking(){return !!cur},speak:u=>{q.push(u);tick()},cancel:()=>{q.length=0;cur=null},addEventListener(){}}})},[speech,seed]);
 const url='file://'+path.resolve(__dirname,'..','index.html');
 const inject=async()=>{for(const f of ['pg-auto.js','kz-auto.js'])await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers',f),'utf8')})};
 await p.goto(url);await p.waitForTimeout(500);await inject();
 const E=(fn,arg)=>p.evaluate(fn,arg).catch(e=>{add('evalfail',e.message.split('\n')[0]);return null});
 const W=ms=>p.waitForTimeout(ms);
 const health=async()=>{const out=await E(()=>{const out=[];const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'};
   const txt=document.body.innerText;const m=txt.match(/[^\n]{0,30}(\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b|\bInfinity\b)[^\n]{0,30}/);if(m)out.push(['badtext',m[0]]);
   document.querySelectorAll('img').forEach(i=>{if(vis(i)&&i.complete&&i.getAttribute('src')&&i.naturalWidth===0)out.push(['brokenimg',(i.getAttribute('src')||'').slice(0,60)])});
   if(document.documentElement.scrollWidth>innerWidth+2)out.push(['hscroll',document.documentElement.scrollWidth+'>'+innerWidth]);
   const ovs=[...document.querySelectorAll('.ov')].filter(o=>!o.hidden&&getComputedStyle(o).display!=='none').map(o=>o.id);if(ovs.length>1&&!(ovs.length===2&&(ovs.includes('lvOv')||ovs.includes('rmOv'))))out.push(['multiov',ovs.join(',')]);
   if(window.__rej&&window.__rej.length){out.push(['rejection',window.__rej.join('|')]);window.__rej=[]}
   ['coins','exp','lv'].forEach(k=>{if(typeof G[k]!=='number'||!isFinite(G[k]))out.push(['state','G.'+k+'='+G[k]])});
   // a visible card wider than the screen
   document.querySelectorAll('.ov:not([hidden]) .card').forEach(c=>{const r=c.getBoundingClientRect();if(r.width>innerWidth+2)out.push(['cardwide',c.id||c.className])});
   const ids={};document.querySelectorAll('[id]').forEach(e=>{ids[e.id]=(ids[e.id]||0)+1});const dup=Object.keys(ids).filter(k=>ids[k]>1);if(dup.length)out.push(['dupid',dup.slice(0,6).join(',')]);
   return out});for(const [k,v] of out||[])await add(k,v)};
 // one random tap on any tappable control in the top layer
 const chaosTap=async()=>{const r=await E(r0=>{const ovs=[...document.querySelectorAll('.ov,#splashOv')].filter(o=>!o.hidden&&getComputedStyle(o).display!=='none');const root=ovs.length?ovs[ovs.length-1]:document.body;
   const cand=[...root.querySelectorAll('button,[data-a],[data-k],.bhot,.kzspot,.pcard,.mole3,.pgfish,.rdrop2,.blk,.fopt,canvas,.libcard,.bslot,.xbtn,#deskBook,.tok,.kzw')].filter(e=>{if(e.disabled)return false;const r=e.getBoundingClientRect();return r.width>3&&r.height>3&&r.top>=0&&r.left>=0&&r.bottom<=innerHeight&&r.right<=innerWidth});
   if(!cand.length)return null;const e=cand[Math.floor(r0*cand.length)];const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,d:(e.id||String(e.className).split(' ')[0])+' '+(e.textContent||'').trim().slice(0,14)}},rnd());
  if(r){trace.push(scen+' chaos> '+r.d);await p.mouse.click(r.x,r.y)}};
 const chaos=async()=>{const x=rnd();
  if(x<.05&&mode==='mix'){const k=pickA(Object.keys(VW));await p.setViewportSize(VW[k]);trace.push('resize '+k)}
  else if(x<.08){const l=rnd()<.5?'ko':'en';await E(l=>{G.lang=l;try{renderAll()}catch(e){}},l);trace.push('lang '+l)}
  else if(x<.10){await E(()=>hush());trace.push('hush')}
  else if(x<.22)await chaosTap()};
 const until=async(fn,ms,tickFn)=>{const t0=Date.now();let last='',lastT=Date.now();while(Date.now()-t0<ms){const st=await E(fn);if(st&&st.done)return true;const sig=JSON.stringify(st);if(sig!==last){last=sig;lastT=Date.now()}else if(Date.now()-lastT>STUCK){await add('stuck',scen+' no progress '+STUCK/1000+'s: '+sig);return false}
   if(tickFn)await tickFn(st);await W(250+rnd()*250);await health()}return false};
 const closeAll=async()=>{await E(()=>{try{hush()}catch(e){}document.querySelectorAll('.ov').forEach(o=>o.hidden=true);try{pgStop()}catch(e){};try{if(typeof KZ!=='undefined'&&KZ){KZ=null}}catch(e){};try{renderAll()}catch(e){}})};
 // ---------- boot through the real UI ----------
 await E(()=>document.querySelector('#spGo').click());await W(400);
 await E(()=>{const b=document.querySelector('#tBtns .btn.pri');b&&b.click()});await W(900);await health();
 // ---------- scenarios ----------
 const S={
  async pg(){const g=pickA(['fish','mole','pair','rain','train','fill']),lv=1+Math.floor(rnd()*5);scen='pg '+g+lv;trace.push(scen);await closeAll();
   await E(([g,lv])=>{pgPlay(g,lv)},[g,lv]);await W(400);const quitAt=rnd()<.3?4+Math.floor(rnd()*30):-1;let n=0;
   await until(()=>({done:!!document.querySelector('.pgres')||!PGS,d:PGS&&PGS.done}),70000,async()=>{n++;if(n===quitAt){trace.push('quit pg');await E(()=>{const b=$("pgBack");b&&b.click()});return}
    const r=await E(w=>typeof PGAUTO==='function'?PGAUTO(w):'none',rnd()<.15);if(rnd()<.25)await chaos()});
   if(rnd()<.5)await E(()=>{const b=[...document.querySelectorAll('.pgres button')];b.length&&b[Math.floor(Math.random()*b.length)].click()});await W(500)},
  async kase(){const i=Math.floor(rnd()*12);scen='case '+(i+1);trace.push(scen);await closeAll();await E(i=>{openCases();caseStart(i)},i);await W(500);const quitAt=rnd()<.3?5+Math.floor(rnd()*40):-1;let n=0;
   await until(()=>({done:!KZ||KZ.done,act:KZ&&KZ.act,si:KZ&&KZ.si,f:KZ&&KZ.found.length,ph:KZ&&KZ.ss&&KZ.ss.ph,d:KZ&&KZ.ss&&KZ.ss.d}),90000,async()=>{n++;if(n===quitAt){trace.push('quit case');await E(()=>{const b=$("kzBack");b&&b.click()});return}
    await E(w=>KZAUTO(w),rnd()<.15);const x=rnd();if(x<.05)await E(()=>{const b=$("kzHelp");b&&b.click()});else if(x<.08)await E(()=>{const b=$("kzNB");b&&b.click()});else if(x<.1)await E(()=>{const b=$("kzSay");b&&b.click()});else if(x<.22)await chaos()});
   await W(800);if(rnd()<.5)await E(()=>{const b=$("kzNextC")||$("kzList");b&&b.click()});await W(400);if(rnd()<.5)await E(()=>{const c=$("cClose");c&&c.click()})},
  async book(){scen='book1';trace.push(scen);await closeAll();await E(()=>{G.view='library';renderAll()});await W(400);
   const ok=await E(()=>{const d=$("deskBook");if(!d)return false;d.click();return true});if(!ok){await add('flow','deskBook missing');return}await W(800);
   const quitAt=rnd()<.35?3+Math.floor(rnd()*40):-1;let n=0;
   await until(()=>({done:!!document.querySelector('#bShelf,#bShelf2')||$("bookOv").hidden,si:typeof BK!=='undefined'&&BK?BK.si:-1,pg:(document.querySelector('.sbnav .pn')||{}).textContent,busy:typeof BK!=='undefined'&&BK&&BK.busy}),120000,async(st)=>{n++;
    if(n===quitAt){trace.push('quit book');await E(()=>{const b=$("bQuit")||document.querySelector('#bookOv .btn');b&&b.click()});return}
    if(await E(w=>typeof RMAUTO==='function'&&RMAUTO(w)!=='none',rnd()<.15))return;
    await E(()=>{const q=s=>document.querySelector(s);const vis=e=>e&&e.getBoundingClientRect().width>0&&!e.disabled;
     const pri=['#sbNext','#bNext','#bEnd'].map(q).find(vis);if(pri&&Math.random()<.7)return pri.click();
     const opts=[...document.querySelectorAll('#bookOv .bhot:not(.got),#bookOv [data-who],#bookOv [data-rec],#bookOv [data-tk],#bookOv [data-fix],#bookOv [data-pg],#bookOv [data-ea],#bookOv [data-eb]')].filter(vis);
     if(opts.length)opts[Math.floor(Math.random()*opts.length)].click()});if(rnd()<.15)await chaos()});
   if(rnd()<.5)await E(()=>{const b=$("bShelf2")||$("bShelf");b&&b.click()});await W(400)},
  async duel(){scen='duel';trace.push(scen);await closeAll();await E(()=>{G.st=Math.max(G.st||0,2);G.tut=1;renderAll();openStage(1)});await W(400);await E(()=>{const b=$("stGo");b&&b.click()});await W(900);
   await E(()=>{const b=$("dGo");b&&b.click()});await W(600);const quitAt=rnd()<.3?3+Math.floor(rnd()*15):-1;let n=0;
   await until(()=>({done:!DU||DU.done,hp:DU&&DU.hp,q:DU&&DU.qi,busy:DU&&DU.busy}),90000,async()=>{n++;if(n===quitAt){trace.push('quit duel');await E(()=>{const b=$("dQuit");b&&b.click()});return}
    await E(w=>{if(!DU||DU.busy||!DU.q)return;const bs=[...document.querySelectorAll('.dop')];const b=bs.find(x=>w?x.dataset.o!==DU.q.ans:x.dataset.o===DU.q.ans);b&&b.click()},rnd()<.2);if(rnd()<.15)await chaos()});
   await W(800);await E(()=>{const b=$("dDone");b&&b.click()});await W(500);await E(()=>{const b=$("lvOk");if(b&&!$("lvOv").hidden)b.click()})},
  async stagePg(){const i=pickA([0,2]);scen='stage '+i;trace.push(scen);await closeAll();await E(i=>{G.st=Math.max(G.st||0,i);renderAll();openStage(i)},i);await W(400);await E(()=>{const b=$("stGo");b&&b.click()});await W(600);
   await until(()=>({done:!!document.querySelector('.pgres')||$("pgOv").hidden,d:PGS&&PGS.done}),70000,async()=>{await E(w=>PGAUTO(w),rnd()<.12);if(rnd()<.15)await chaos()});
   await W(700);await E(()=>{const c=$("pgCont");c&&c.click()});await W(500);await E(()=>{const b=$("stMap");b&&b.click()});await W(300);await E(()=>{const b=$("lvOk");if(b&&!$("lvOv").hidden)b.click()})},
  async course(){scen='course';trace.push(scen);await closeAll();await E(()=>{G.st=Math.max(G.st||0,4);renderAll();openStage(4)});await W(400);await E(()=>{const b=$("stGo");b&&b.click()});await W(700);
   const t0=Date.now();while(Date.now()-t0<15000+rnd()*15000){const s=await E(()=>{if(typeof RUN==='undefined'||!RUN)return null;const r=$("runCv").getBoundingClientRect();return {done:RUN.done,x:r.left+r.width*(.2+Math.random()*.6),y:r.top+r.height*(.2+Math.random()*.6)}});if(!s||s.done)break;await p.mouse.click(s.x,s.y);if(rnd()<.1)await chaos();await W(200);await health()}
   await E(()=>{const b=$("rQuit");if(b&&!$("runOv").hidden)b.click()});await W(500);await closeAll()},
  async words(){scen='wordbook';trace.push(scen);await E(()=>wbBook(Math.floor(Math.random()*6)));await W(500);for(let k=0;k<6;k++){await chaosTap();await W(300);await health()}
   scen='leveltest';await E(()=>wbTest());await W(600);for(let k=0;k<25;k++){await E(()=>{const bs=[...document.querySelectorAll('#pgCard button')].filter(b=>!b.disabled&&b.getBoundingClientRect().width>0);bs.length&&bs[Math.floor(Math.random()*bs.length)].click()});await W(450);await health()}await closeAll()},
  async menus(){scen='menus';trace.push(scen);await closeAll();const fns=['showSettings()','showShop()','showPartner()','showHero()','pgHub()','openCases()','rrList&&rrList()','tdOpen()','rmWords()'];
   for(const f of [pickA(fns),pickA(fns)]){scen='menu '+f;await E(f=>{try{(0,eval)(f)}catch(e){throw e}},f);await W(400);for(let k=0;k<8;k++){await chaosTap();await W(250+rnd()*400);await health()}await closeAll()}},
  async reload(){scen='reload';trace.push(scen);const before=await E(()=>JSON.stringify({c:G.coins,b:Object.keys(G.books||{}).length,k:Object.keys(G.cases||{}).length,l:G.lv}));
   await p.reload();await W(600);await inject();await E(()=>{const b=document.querySelector('#spGo');b&&b.click()});await W(500);await E(()=>{const b=document.querySelector('#tBtns .btn.pri');b&&b.click()});await W(600);
   const after=await E(()=>JSON.stringify({c:G.coins,b:Object.keys(G.books||{}).length,k:Object.keys(G.cases||{}).length,l:G.lv}));if(before!==after)await add('progress-lost','reload: '+before+' -> '+after);await health()},
  async rapid(){scen='rapid';trace.push(scen);for(let k=0;k<20;k++){await chaosTap();await W(40)}await W(800);await health();await closeAll()}};
 const order=['pg','kase','book','duel','stagePg','course','words','menus','reload','rapid','pg','kase'];
 for(let r=0;r<ROUNDS;r++){const k=r<order.length?order[(r+seed)%order.length]:pickA(Object.keys(S));try{await S[k]()}catch(e){await add('simfail',k+': '+e.message.split('\n')[0])}await health()}
 const st=await E(()=>({coins:G.coins,lv:G.lv,books:Object.keys(G.books||{}),cases:Object.keys(G.cases||{}).length,pg:Object.keys(G.pg||{}).length,st:G.st}));
 fs.writeFileSync(path.join(OUT,`sim_${seed}_${mode}_${speech}.json`),JSON.stringify({issues,trace,st},null,1));
 console.log(`sim ${seed} ${mode} ${speech}: ${issues.length} issues ${JSON.stringify(st)}`);issues.forEach((i,n)=>console.log(` [${n}] ${i.kind} | ${i.scen} | ${i.msg.slice(0,220)} | ${i.last.slice(-3).join(' ; ')}`));
 await b.close();process.exit(issues.length?1:0)})();
