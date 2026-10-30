// Today's adventure, one-lap mode (v30.1): 9 games started from the card come back to the card, each counts once,
// halfway note, words + story, celebration paid once; short mode still works; settings sound check.
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
 let st=await p.evaluate(()=>({hud:emjText($("tdHud")),chip:(document.querySelector('#extras .xbtn .tdp')||{}).textContent,len:G.tdLen}));
 ok('default is one lap: HUD 0/11',st.hud==='☀️ 0/11'&&st.chip==='0/11',st);
 await p.evaluate(()=>tdOpen());await W(300);await p.screenshot({path:path.join(OUTD,`lap_${phone?'P':'T'}_card0.png`)});
 st=await p.evaluate(()=>({g:[...document.querySelectorAll('.tdg')].map(e=>e.dataset.tg),nx:(document.querySelector('.tdg.nx')||{}).dataset,rows:document.querySelectorAll('.tdlist > li').length}));
 ok('card shows 9 games, next = fishing',st.g.length===9&&st.nx&&st.nx.tg==='fish'&&st.rows===3,st);
 const lapN=()=>p.evaluate(()=>tdLapN(tdFresh()));
 const playPg=async()=>{for(let k=0;k<260;k++){const d=await p.evaluate(()=>!!document.querySelector('.pgres'));if(d)break;await p.evaluate(()=>PGAUTO(false));await W(250)}await W(700);await closeLv()};
 const backToCard=async()=>{for(let k=0;k<20;k++){const o=await p.evaluate(()=>!$("tdOv").hidden&&!!document.querySelector('.tdlist'));if(o)return true;await W(200)}return false};
 const order=[];
 for(let step=0;step<9;step++){const g=await p.evaluate(()=>tdNext());order.push(g);
  await p.evaluate(()=>document.querySelector('[data-td="lap"]').click());await W(700);
  if(g==='course'){const r=await p.evaluate(()=>!$("runOv").hidden);ok('course opens from the card',r);await p.evaluate(()=>clearRun());await W(400);
   const lbl=await p.evaluate(()=>(document.querySelector('#rStage .rres .tbtns .btn')||{}).textContent);ok('course result offers today\'s adventure',/오늘의 모험/.test(lbl||''),lbl);
   await p.evaluate(()=>document.querySelector('#rStage .rres .tbtns .btn').click())}
  else if(g==='battle'){const r=await p.evaluate(()=>!$("duelOv").hidden);ok('practice battle opens from the card',r);
   await p.evaluate(()=>{const go=document.getElementById('dGo');go&&go.click()});await W(600);
   // retry must not pop the card over the battle
   await p.evaluate(()=>{duLose()});await W(200);await p.evaluate(()=>document.getElementById('dRetry').click());await W(700);
   const still=await p.evaluate(()=>({duel:!$("duelOv").hidden,td:!$("tdOv").hidden,TDR}));ok('battle retry keeps the battle (card not shown over it)',still.duel&&!still.td&&still.TDR==='battle',still);
   await p.evaluate(()=>{const go=document.getElementById('dGo');go&&go.click()});await W(500);
   await p.evaluate(()=>duWin());await W(500);const lbl=await p.evaluate(()=>(document.getElementById('dDone')||{}).textContent);ok('battle result offers today\'s adventure',/오늘의 모험/.test(lbl||''),lbl);
   await p.evaluate(()=>document.getElementById('dDone').click())}
  else{const r=await p.evaluate(()=>!$("pgOv").hidden&&PGS&&PGS.o&&PGS.o.td);ok(`${g}: playground game opens from the card`,!!r);await playPg();
   const lbl=await p.evaluate(()=>(document.getElementById('pgHubB')||{}).textContent);ok(`${g}: result offers today's adventure`,/오늘의 모험/.test(lbl||''),lbl);
   await p.evaluate(()=>document.getElementById('pgHubB').click())}
  await W(500);await closeLv();const back=await backToCard();const n=await lapN();ok(`${g}: back on the card, lap ${n}/9`,back&&n===step+1,{back,n});
  if(step===3){await p.screenshot({path:path.join(OUTD,`lap_${phone?'P':'T'}_card4.png`)});const t=await p.evaluate(()=>({rest:!!document.querySelector('.tdrest'),toasts:window.__toasts.join(' | ')}));ok('halfway note after 4 games',t.rest,t)}}
 ok('lap order fish…fill (trace included)',order.join()==='fish,mole,course,pair,rain,battle,train,trace,fill',order);
 // repeating a finished game does not count twice; back arrow returns to the card
 await p.evaluate(()=>document.querySelector('.tdg[data-tg="fish"]').click());await W(600);await p.evaluate(()=>{const s=document.querySelector('.pgintro #pgGo');s&&s.click()});await W(300);
 await p.evaluate(()=>document.getElementById('pgBack').click());await W(500);
 st=await p.evaluate(()=>({card:!$("tdOv").hidden,pg:!$("pgOv").hidden,n:tdCount()}));ok('back arrow from a card game returns to the card, no double count',st.card&&!st.pg&&st.n===9,st);
 // words then story → celebration once
 await p.evaluate(()=>document.querySelector('[data-td="words"]').click());await W(300);
 for(let k=0;k<30;k++){const r=await p.evaluate(()=>RMAUTO(false));if(r==='none')break;await W(1200)}
 st=await p.evaluate(()=>({n:tdCount(),hud:emjText($("tdHud"))}));ok('words done → 10/11',st.n===10&&st.hud==='☀️ 10/11',st);
 await p.evaluate(()=>{$("tdOv").hidden=true});const c0=await p.evaluate(()=>G.coins);
 await closeLv();await p.evaluate(()=>tdMark("story"));await W(900);await closeLv();await W(900);
 st=await p.evaluate(()=>({win:!!document.querySelector('.tdwin')&&!$("tdOv").hidden,paid:tdFresh().paid,hud:emjText($("tdHud")),td:G.days[dkey()].td,coins:G.coins}));
 await p.screenshot({path:path.join(OUTD,`lap_${phone?'P':'T'}_done.png`)});
 ok('all 11 → celebration, paid, HUD ✓',st.win&&st.paid===1&&st.hud==='☀️ ✓'&&st.td===1&&st.coins>c0,st);
 await p.evaluate(()=>document.getElementById('tdX').click());await W(300);const c1=await p.evaluate(()=>{tdCelebrate();const c=G.coins;$("tdOv").hidden=true;return c});ok('celebration pays once',c1===st.coins,{c1,c:st.coins});
 // a level-up screen that comes up first is not covered by the card; the card follows when it closes
 await p.evaluate(()=>{showLv(G.lv);tdBack("course")});await W(500);
 st=await p.evaluate(()=>({lv:!$("lvOv").hidden,td:!$("tdOv").hidden}));ok('level-up first, card waits',st.lv&&!st.td,st);
 await p.evaluate(()=>document.getElementById('lvOk').click());await W(900);
 st=await p.evaluate(()=>({lv:!$("lvOv").hidden,td:!$("tdOv").hidden}));ok('card opens after the level-up closes',!st.lv&&st.td,st);
 await p.evaluate(()=>{$("tdOv").hidden=true});
 // short mode from settings
 await p.evaluate(()=>{G.today={d:dkey(),play:0,story:0,words:0,rm:0,paid:0,lap:{}};save();showSettings()});await W(300);
 await p.evaluate(()=>document.querySelector('[data-tdl="0"]').click());await W(300);
 st=await p.evaluate(()=>({len:G.tdLen,hud:emjText($("tdHud"))}));ok('settings → short: HUD 0/3',st.len==='short'&&st.hud==='☀️ 0/3',st);
 // sound check button
 await p.evaluate(()=>document.getElementById('auTest').click());await W(700);
 st=await p.evaluate(()=>({stat:($("auStat")||{}).textContent,ctx:window.AC&&AC.state}));ok('sound check shows a status',!!st.stat,st);
 await p.evaluate(()=>{$("setOv").hidden=true;G.tdLen="lap";save()});
 console.log(out.join('\n'));console.log('page errors',JSON.stringify(errs.slice(0,8)));if(errs.length)bad++;await b.close();process.exit(bad?1:0)})();
