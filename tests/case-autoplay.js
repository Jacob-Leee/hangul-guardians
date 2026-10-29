// Plays the Case Squad cases in headless Chromium (one wrong answer per step where possible), including the v29 reading missions.
// Setup once:  npm install playwright && npx playwright install chromium
// Run:         node tests/case-autoplay.js        (all 12, about 4 minutes)
//              node tests/case-autoplay.js 3      (first 3 only)
//              node tests/case-autoplay.js 12 phone
// Exit code 1 = a case got stuck or the page threw an error. Screenshots of each report go to tests/out/.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const N=+(process.argv[2]||12),phone=process.argv[3]==='phone',vw=phone?{width:390,height:844}:{width:1024,height:768};
const url='file://'+path.resolve(__dirname,'..','index.html'),out=path.join(__dirname,'out');fs.mkdirSync(out,{recursive:true});
const AUTO=`window.KZAUTO=function(wrong){if(!KZ)return 'none';if(KZ.done)return 'done';const P=$("kzPanel"),c=KZ.c,clk=e=>{e.click();return 'click'};
 const nx=P.querySelector(".kznext:not(:disabled)");if(nx&&!KZ.busy)return clk(nx);if(KZ.busy)return 'busy';
 const opt=(sel,ok)=>{const all=[...P.querySelectorAll(sel)].filter(b=>!b.disabled);const b=all.find(x=>wrong?!ok(x):ok(x));return b?clk(b):'none'};
 if(KZ.act===0)return opt(".kzop",b=>b.dataset.a===c.q.a[0]);
 if(KZ.act===1){const s=c.spots.find(x=>!x.decoy&&!KZ.found.includes(x.k));const d=c.spots.find(x=>x.decoy);const t=wrong&&d?d:s;if(!t)return 'wait';return clk($("kzSpots").querySelector('[data-k="'+t.k+'"]'))}
 if(KZ.act===2){const S=KZ.ss;if(S.ph===0){const d=P.querySelector(".kzdone");if(d)return clk(d);const r=[...P.querySelectorAll(".kzw")].find((x,i)=>!S.heard.has(i));return r?clk(r):'wait'}
  if(S.ph===1)return opt(".kzw",b=>!!c.talk[+b.dataset.i].lie);const lie=c.talk.find(t=>t.lie);return opt(".kzop.ev",b=>lie.proof.includes(b.dataset.k))}
 if(KZ.act===3){const sk=c.sk;
  if(sk.type==="quiz"){const q=sk.qs[KZ.si];return q?opt(".kzq .kzop",b=>b.dataset.a===q.a[0]):'wait'}
  if(sk.type==="steps"){const s=sk.steps[KZ.si];return s?opt(".kzq .kzop",b=>b.dataset.a===s.a[0]):'wait'}
  if(sk.type==="fact")return opt(".kzop.st",b=>!!sk.st[+b.dataset.j][1]);
  if(sk.type==="fix"){const it=sk.items[KZ.si];if(!it)return 'wait';const S=KZ.ss;if(S.sub===0||S.k!==KZ.si){const toks=it.s.split(" ");return opt("[data-t]",b=>toks[+b.dataset.t]===it.bad)}return opt(".kzq [data-a]",b=>b.dataset.a===it.fix)}
  if(sk.type==="order"){const S=KZ.ss;return opt("[data-j]",b=>+b.dataset.j===(S.ord||[]).length)}
  if(sk.type==="who"){const q=sk.qs[KZ.si];return q?opt("[data-w]",b=>b.dataset.w===q.a):'wait'}}
 if(KZ.act===4){const d=c.ded[KZ.ss.d];return d?opt(".kzq [data-a]",b=>b.dataset.a===d.a):'wait'}
 return 'wait'};`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:vw});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),60),cancel:()=>{},addEventListener(){}}})});
 await p.goto(url);await p.waitForTimeout(500);await p.addScriptTag({content:AUTO});await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers','kz-auto.js'),'utf8')});
 await p.evaluate(()=>{document.querySelector('#spGo').click()});await p.waitForTimeout(300);
 await p.evaluate(()=>{G.lang='ko';showTitle();document.querySelector('#tBtns .btn.pri').click()});await p.waitForTimeout(800);
 await p.evaluate(()=>{G.cases={};openCases()});await p.waitForTimeout(300);let bad=0;
 for(let i=0;i<Math.min(12,N);i++){const t0=Date.now();await p.evaluate(i=>caseStart(i),i);await p.waitForTimeout(300);let last=-1,w=0;
  while(Date.now()-t0<70000){const st=await p.evaluate(()=>KZ?(KZ.done?'done':KZ.act):'none');if(st==='done')break;if(st!==last){last=st;w=0}
   if(await p.evaluate(()=>!$("rmOv").hidden)){await p.evaluate(()=>RMAUTO(false));await p.waitForTimeout(700);continue}   // v29 reading missions inside a case
   const r=await p.evaluate(x=>KZAUTO(x),w===0&&[0,2,3].includes(last));if(r==='click'&&w===0&&[0,2,3].includes(last))w=1;await p.waitForTimeout(r==='click'?380:250)}
  await p.waitForTimeout(800);await p.screenshot({path:path.join(out,(phone?'P':'T')+'_case'+(i+1)+'.png')});
  const o=await p.evaluate(()=>({done:!!(KZ&&KZ.done),act:KZ&&KZ.act,wrong:KZ&&KZ.wrong}));if(!o.done)bad++;
  console.log('case',i+1,((Date.now()-t0)/1000).toFixed(0)+'s',o.done?'OK':'STUCK at step '+o.act,'wrong',o.wrong)}
 console.log('page errors:',JSON.stringify(errs));await b.close();process.exit(errs.length||bad?1:0)})();
