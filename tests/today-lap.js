// Today's adventure, island-stones edition (v30.2): the card is gone — 11 sun stones on the island
// (9 games + story + words). ☀️ guides to the next stone; each activity counts once; halfway note;
// celebration paid once; sound check in settings.
// node tests/today-lap.js [page.html] [phone]     (screenshots in tests/out/lap_*.png, exit code 1 on failure)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const OUTD=path.join(__dirname,'out');fs.mkdirSync(OUTD,{recursive:true});const HELP=f=>fs.readFileSync(path.join(__dirname,'helpers',f),'utf8');
const args=process.argv.slice(2),phone=args.includes('phone'),page=args.find(a=>a!=='phone');
const PAGE='file://'+path.resolve(page||path.join(__dirname,'..','index.html'));
const out=[];let bad=0;const ok=(n,c,x)=>{if(!c)bad++;out.push((c?'PASS ':'FAIL ')+n+(x!==undefined?' :: '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:phone?{width:390,height:844}:{width:1024,height:768}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speaking:false,speak:u=>setTimeout(()=>u.onend&&u.onend(),30),cancel(){},addEventListener(){}}});
  window.__toasts=[];const iv=setInterval(()=>{const t=document.getElementById('toast');if(!t)return;clearInterval(iv);new MutationObserver(()=>window.__toasts.push(t.textContent)).observe(t,{childList:true,characterData:true,subtree:true})},50);
  if(!localStorage.getItem('hiq2'))localStorage.setItem('hiq2',JSON.stringify({char:'tiger',lv:3,coins:50,st:4,lang:'ko',tut:1,rd:3,pgIntro:1}))});
 await p.goto(PAGE);await p.waitForTimeout(600);
 await p.evaluate(()=>{const g=document.querySelector('#spGo');g&&g.click()});await p.waitForTimeout(500);
 await p.evaluate(()=>{const b=document.querySelector('#tBtns .btn.pri');b&&b.click()});await p.waitForTimeout(600);
 await p.addScriptTag({content:HELP('pg-auto.js')});await p.addScriptTag({content:HELP('kz-auto.js')});
 const W=ms=>p.waitForTimeout(ms);const closeLv=()=>p.evaluate(()=>{const c=document.getElementById('lvOk');if(c&&!document.getElementById('lvOv').hidden)c.click()});
 const ACTS=['fish','mole','course','pair','rain','battle','train','trace','opp','fill','story','words'];
 let st=await p.evaluate(()=>({hud:!!$("tdHud"),chip:(document.querySelector('#extras .xbtn .tdp')||{}).textContent,lap:tdLap().length,tot:tdTotal()}));
 ok('sun chip removed; one lap: 10 games, total 12',st.hud===false&&st.chip==='0/12'&&st.lap===10&&st.tot===12,st);
 st=await p.evaluate(()=>({n:document.querySelectorAll('.tdstone').length,done:document.querySelectorAll('.tdstone.done').length,nx:emjText(document.querySelector('.tdstone.nx .stn')),tag:(document.querySelector('.tdstone .tag')||{}).textContent}));
 ok('12 stones on the island, none done, fishing glows first',st.n===12&&st.done===0&&(st.nx||'').includes('🎣')&&/0\/12/.test(st.tag||''),st);
 await p.screenshot({path:path.join(OUTD,`lap_${phone?'P':'T'}_island0.png`)});
 // ☀️ HUD: no card, toast the next stone, walk over and fishing opens by itself
 await p.evaluate(()=>{const b=document.querySelector('#extras .xbtn .tdp');(b?b.closest('.xbtn'):null)?tdOpen():tdOpen()});await W(400);
 st=await p.evaluate(()=>({td:!$("tdOv").hidden,toast:__toasts.join('|')}));
 ok('today button shows no card and names the next stone',!st.td&&/다음/.test(st.toast),st);
 let o=null;for(let i=0;i<30;i++){o=await p.evaluate(()=>({pg:!$("pgOv").hidden,g:PGS&&PGS.g}));if(o.pg)break;await W(400)}
 ok('hero walks to the stone and fishing opens',o.pg&&o.g==='fish',o);
 const playPg=async()=>{for(let k=0;k<260;k++){const d=await p.evaluate(()=>!!document.querySelector('.pgres'));if(d)break;await p.evaluate(()=>PGAUTO(false));await W(250)}await W(700);await closeLv()};
 const toIsland=async()=>{await p.evaluate(()=>{const hb=document.getElementById('pgHubB');if(hb)hb.click();else pgClose()});await W(400);await closeLv()};
 await playPg();
 st=await p.evaluate(()=>({lbl:(document.getElementById('pgHubB')||{}).textContent}));
 ok('stone game result offers the island',/섬으로/.test(st.lbl||''),st);
 await toIsland();
 st=await p.evaluate(()=>{renderAll();return {n:tdCount(),done:document.querySelectorAll('.tdstone.done').length,td:!$("tdOv").hidden}});
 ok('fishing done: 1/11, stone checked, still no card',st.n===1&&st.done===1&&!st.td,st);
 // the rest of the lap, invoking each stone directly (walking is covered above)
 const hitStone=i=>p.evaluate(i=>{let xy=null;for(let y=0;y<H&&!xy;y++)for(let x=0;x<W&&!xy;x++)if(tdStoneAt(x,y)===i+1)xy=[x,y];const a=interactAt(xy[0],xy[1]);a&&a()},i);
 for(let i=1;i<ACTS.length;i++){const k=ACTS[i];
  if(k==='story'){await p.evaluate(()=>tdMark('story'));await W(400);await closeLv()}
  else if(k==='course'){await hitStone(i);await W(900);
   const r=await p.evaluate(()=>!$("runOv").hidden);ok('course stone opens the course',r);
   await p.evaluate(()=>clearRun());await W(500);await p.evaluate(()=>closeRun());await W(400);await closeLv()}
  else if(k==='battle'){await hitStone(i);await W(900);
   const r=await p.evaluate(()=>!$("duelOv").hidden);ok('battle stone opens a practice battle',r);
   await p.evaluate(()=>{const go=document.getElementById('dGo');go&&go.click()});await W(600);
   await p.evaluate(()=>duWin());await W(600);await p.evaluate(()=>duClose());await W(400);await closeLv()}
  else if(k==='words'){await hitStone(i);await W(500);
   const r=await p.evaluate(()=>!$("rmOv").hidden);ok('words stone opens word review',r);
   for(let k2=0;k2<30;k2++){const r2=await p.evaluate(()=>RMAUTO(false));if(r2==='none')break;await W(1200)}await W(600);await closeLv()}
  else{await hitStone(i);await W(700);await playPg();await toIsland()}
  const n=await p.evaluate(()=>tdCount());
  ok(`${k}: counted once (${n}/12)`,n===i+1,{k,n});
  if(i===3)await p.screenshot({path:path.join(OUTD,`lap_${phone?'P':'T'}_mid.png`)});
  if(i===4){const t=await p.evaluate(()=>__toasts.join(' | '));ok('halfway note after 4 games',/절반/.test(t),t.slice(-130))}}
 // all 11 → celebration queued once
 await W(1200);await closeLv();await W(900);
 st=await p.evaluate(()=>({win:!!document.querySelector('.tdwin')&&!$("tdOv").hidden,paid:tdFresh().paid,hud:tdChip(),td:G.days[dkey()].td,coins:G.coins}));
 await p.screenshot({path:path.join(OUTD,`lap_${phone?'P':'T'}_done.png`)});
 ok('all 12 → celebration, paid, chip ✓',st.win&&st.paid===1&&/✓/.test(st.hud)&&st.td===1,st);
 await p.evaluate(()=>document.getElementById('tdX').click());await W(300);
 const c1=await p.evaluate(()=>{tdCelebrate();const c=G.coins;$("tdOv").hidden=true;return c});
 ok('celebration pays once',c1===st.coins,{c1,c:st.coins});
 st=await p.evaluate(()=>{renderAll();return {done:document.querySelectorAll('.tdstone.done').length,nx:document.querySelectorAll('.tdstone.nx').length,tag:(document.querySelector('.tdstone .tag')||{}).textContent}});
 ok('island shows 12 checked stones, nothing glowing',st.done===12&&st.nx===0&&/12\/12/.test(st.tag||''),st);
 // repeating a finished stone works and never double counts
 await hitStone(0);await W(700);
 st=await p.evaluate(()=>({pg:!$("pgOv").hidden,g:PGS&&PGS.g}));ok('a done stone can be played again',st.pg&&st.g==='fish',st);
 await p.evaluate(()=>{pgStop();$("pgOv").hidden=true;renderAll()});
 const n2=await p.evaluate(()=>tdCount());ok('no double count on repeat',n2===12,n2);
 // ☀️ while an overlay is open does nothing
 st=await p.evaluate(()=>{showSettings();const t0=__toasts.length;tdOpen();const r={set:!$("setOv").hidden,quiet:__toasts.length===t0};$("setOv").hidden=true;const g=$("gateOv");if(g)g.hidden=true;return r});
 ok('☀️ waits while another screen is open',st.set&&st.quiet,st);
 // sound check button still in settings
 await p.evaluate(()=>{showSettings()});await W(300);
 await p.evaluate(()=>document.getElementById('auTest').click());await W(700);
 st=await p.evaluate(()=>({stat:($("auStat")||{}).textContent,tdl:!!$("setCard").querySelector('[data-tdl]')}));
 ok('sound check shows a status; daily-length row is gone',!!st.stat&&st.tdl===false,st);
 await p.evaluate(()=>{$("setOv").hidden=true});
 console.log(out.join('\n'));console.log('page errors',JSON.stringify(errs.slice(0,8)));if(errs.length)bad++;await b.close();process.exit(bad?1:0)})();
