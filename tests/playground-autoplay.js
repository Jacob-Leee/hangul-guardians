// Plays every Hangul Playground game at levels 1 and 5 in headless Chromium.
// Setup once:  npm install playwright && npx playwright install chromium
// Run:         node tests/playground-autoplay.js          (tablet)
//              node tests/playground-autoplay.js phone    (390x844)
// Screenshots go to tests/out/. Exit code 1 = a game did not finish or the page threw an error.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const phone=process.argv[2]==='phone',vw=phone?{width:390,height:844}:{width:1024,height:768};
const url='file://'+path.resolve(__dirname,'..','index.html'),out=path.join(__dirname,'out');fs.mkdirSync(out,{recursive:true});
// in-page autoplayer: finds the right answer from the game state and taps it (one action per call)
const AUTO=`window.PGAUTO=function(wrong){const S=PGS;if(document.querySelector('.pgres'))return 'done';if(document.querySelector('.pgintro')){document.querySelector('#pgGo').click();return 'start'}if(!S||S.lock||!document.querySelector('#pgArea'))return 'wait';
 const T=S.target&&S.target.t,clk=e=>{e.click();return 'click'};
 if(S.g==='fish'){const fs=[...document.querySelectorAll('.pgfish:not(.caught):not(.catch)')];const f=fs.find(e=>wrong?e.querySelector('.tag').textContent!==T:e.querySelector('.tag').textContent===T);return f?clk(f):'none'}
 if(S.g==='mole'){const ms=[...document.querySelectorAll('.mole3.up')];const m=ms.find(e=>wrong?e.querySelector('.sign').textContent!==T:e.querySelector('.sign').textContent===T);return m?clk(m):'none'}
 if(S.g==='rain'){const ds=[...document.querySelectorAll('.rdrop2:not(.fade):not(.pop)')];const d=ds.find(e=>wrong?e.textContent!==T:e.textContent===T);return d?clk(d):'none'}
 if(S.g==='fill'){const o=[...document.querySelectorAll('.fopt:not(:disabled)')].find(e=>wrong?e.dataset.o!==T:e.dataset.o===T);return o?clk(o):'none'}
 if(S.g==='train'){let parts;if(S.lv<=2){const j=jamoOf(T);parts=[j.c,j.v]}else if(S.target.parts)parts=S.target.parts;else parts=[...T];
  const filled=document.querySelectorAll('#pgTrain .car.full').length+document.querySelectorAll('.dfly').length;const used=document.querySelectorAll('.blk.used').length;const next=parts[used];
  const b=[...document.querySelectorAll('.blk:not(.used)')].find(e=>wrong?e.textContent!==next:e.textContent===next);return b?clk(b):'none'}
 if(S.g==='pair'){if(!S.started)return 'wait';const open=[...document.querySelectorAll('.pcard.up:not(.done)')];if(open.length>=2)return 'wait';
  const cards=[...document.querySelectorAll('.pcard:not(.done)')];if(wrong&&!open.length){const w=cards.filter(c=>c.querySelector('.cw'));if(w.length>=2){w[0].click();setTimeout(()=>w[1].click(),50);return 'click'}}
  const pic2t=Object.fromEntries(S.pool.map(x=>[x.p,x.t]));
  if(open.length===1){const o=open[0],k=o.querySelector('.cw')?o.querySelector('.cw').textContent:pic2t[o.querySelector('.cpic').textContent];const m=cards.find(c=>c!==o&&(c.querySelector('.cw')?c.querySelector('.cw').textContent===k&&!o.querySelector('.cw'):pic2t[c.querySelector('.cpic').textContent]===k&&!!o.querySelector('.cw')));return m?clk(m):'none'}
  const pc=cards.find(c=>c.querySelector('.cpic')&&!c.classList.contains('up'));return pc?clk(pc):'none:'+cards.length+':'+open.length}
 return '?'};
`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:vw});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),150),cancel:()=>{},addEventListener(){}}})});
 await p.goto(url);await p.waitForTimeout(500);await p.addScriptTag({content:AUTO});
 await p.evaluate(()=>{document.querySelector('#spGo').click()});await p.waitForTimeout(300);
 await p.evaluate(()=>{G.lang='ko';showTitle();document.querySelector('#tBtns .btn.pri').click()});await p.waitForTimeout(800);
 await p.evaluate(()=>pgHub());await p.waitForTimeout(500);await p.screenshot({path:path.join(out,'hub.png')});
 const res={};let fail=0;
 for(const g of ['fish','mole','trace','opp','pair','rain','train','fill'])for(const lv of [1,5]){
  await p.evaluate(([g,lv])=>pgPlay(g,lv),[g,lv]);await p.waitForTimeout(400);let n=0,ok=false;const t0=Date.now();
  while(Date.now()-t0<45000){const r=await p.evaluate(w=>PGAUTO(w),n===3);if(r==='done'){ok=true;break}if(r==='click')n++;if(n===4)await p.screenshot({path:path.join(out,`${g}${lv}_play.png`)});await p.waitForTimeout(g==='pair'?520:g==='train'?380:300)}
  await p.waitForTimeout(900);await p.screenshot({path:path.join(out,`${g}${lv}_result.png`)});
  res[g+lv]=ok?await p.evaluate(()=>document.querySelectorAll('.stars3 .on').length)+' stars':'DID NOT FINISH';if(!ok)fail++}
 console.log(JSON.stringify(res,null,1));console.log('page errors:',JSON.stringify(errs));await b.close();process.exit(fail||errs.length?1:0)})();
