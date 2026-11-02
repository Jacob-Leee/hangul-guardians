// Plays every Hangul Playground game (8, v31) at levels 1 and 5 in headless Chromium.
// Setup once:  npm install playwright && npx playwright install chromium
// Run:         node tests/playground-autoplay.js          (tablet)
//              node tests/playground-autoplay.js phone    (390x844)
// Screenshots go to tests/out/. Exit code 1 = a game did not finish or the page threw an error.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const phone=process.argv[2]==='phone',vw=phone?{width:390,height:844}:{width:1024,height:768};
const url='file://'+path.resolve(__dirname,'..','index.html'),out=path.join(__dirname,'out');fs.mkdirSync(out,{recursive:true});
// in-page autoplayer: tests/helpers/pg-auto.js (one action per call, knows every game)
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:vw});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),150),cancel:()=>{},addEventListener(){}}})});
 await p.goto(url);await p.waitForTimeout(500);await p.addScriptTag({path:path.join(__dirname,'helpers','pg-auto.js')});
 await p.evaluate(()=>{document.querySelector('#spGo').click()});await p.waitForTimeout(300);
 await p.evaluate(()=>{G.lang='ko';showTitle();document.querySelector('#tBtns .btn.pri').click()});await p.waitForTimeout(800);
 await p.evaluate(()=>pgHub());await p.waitForTimeout(500);await p.screenshot({path:path.join(out,'hub.png')});
 const res={};let fail=0;
 for(const g of ['fish','asm','ncard','pair','train','fill','trace','dict','opp'])for(const lv of [1,5]){
  await p.evaluate(([g,lv])=>pgPlay(g,lv),[g,lv]);await p.waitForTimeout(400);let n=0,ok=false;const t0=Date.now();
  while(Date.now()-t0<45000){const r=await p.evaluate(w=>PGAUTO(w),n===3);if(r==='done'){ok=true;break}if(r==='click')n++;if(n===4)await p.screenshot({path:path.join(out,`${g}${lv}_play.png`)});await p.waitForTimeout(g==='pair'?520:g==='train'?380:g==='dict'?200:300)}
  await p.waitForTimeout(900);await p.screenshot({path:path.join(out,`${g}${lv}_result.png`)});
  res[g+lv]=ok?await p.evaluate(()=>document.querySelectorAll('.stars3 .on').length)+' stars':'DID NOT FINISH';if(!ok)fail++}
 console.log(JSON.stringify(res,null,1));console.log('page errors:',JSON.stringify(errs));await b.close();process.exit(fail||errs.length?1:0)})();
