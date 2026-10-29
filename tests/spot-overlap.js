// Clue sparkles must be visible: inside the picture, not under a character or the clue card, on tablet / phone /
// phone-landscape / iPad portrait / iPad landscape, for all 12 cases (search step) and book 1 (explore step).
// Then the parent tool (Settings → 🛠 Move picture spots): drag a sparkle, check it is saved, that a tap while editing
// does not count as finding a clue, and that 'reset' puts it back.
// node tests/spot-overlap.js        (screenshots in tests/out/ov_*.png, exit code 1 on any problem)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const OUTD=path.join(__dirname,'out');fs.mkdirSync(OUTD,{recursive:true});
const VW={T:{width:1024,height:768},P:{width:390,height:844},L:{width:844,height:390},IP:{width:820,height:1180},IL:{width:1180,height:820}};
const PAGE='file://'+path.resolve(__dirname,'..','index.html');
const init=()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};
 Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],speak:u=>setTimeout(()=>u.onend&&u.onend(),20),cancel(){},addEventListener(){}}});
 if(!localStorage.getItem('hiq2'))localStorage.setItem('hiq2',JSON.stringify({lang:'ko',char:'tiger',rd:3,rmOff:true,cases:{k1:1,k2:1,k3:1,k4:1,k5:1,k6:1,k7:1,k8:1,k9:1,k10:1,k11:1}}))};
const measure=()=>{const R=e=>{const r=e.getBoundingClientRect();return {l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
 const inter=(a,b)=>{const w=Math.min(a.r,b.r)-Math.max(a.l,b.l),h=Math.min(a.b,b.b)-Math.max(a.t,b.t);return w>0&&h>0?w*h:0};
 const stage=R($("kzStage")),panel=R($("kzPanel"));const spots=[...document.querySelectorAll('.kzspot')].map(e=>({k:e.dataset.k,...R(e)}));
 const acts=[...document.querySelectorAll('#kzActors img, #kzActors svg')].filter(e=>e.getBoundingClientRect().width>0&&+getComputedStyle(e.closest('.kzact')||e).opacity>.2).map(e=>({id:(e.closest('[id]')||{}).id,...R(e)}));
 const issues=[];spots.forEach(s=>{acts.forEach(a=>{const o=inter(s,a);if(o>s.w*s.h*.25)issues.push(`spot ${s.k} under ${a.id} ${Math.round(o/(s.w*s.h)*100)}%`)});
  if(s.l<stage.l-1||s.r>stage.r+1||s.t<stage.t-1||s.b>stage.b+1)issues.push(`spot ${s.k} outside the picture`);if(inter(s,panel)>0)issues.push(`spot ${s.k} under the clue card`)});
 return issues};
(async()=>{const b=await chromium.launch();const out=[];let bad=0;const errs=[];
 for(const [vn,vp] of Object.entries(VW)){const p=await b.newPage({viewport:vp});p.on('pageerror',e=>errs.push(vn+': '+e.message));await p.addInitScript(init);
  await p.goto(PAGE);await p.waitForTimeout(500);await p.evaluate(()=>{$("splashOv").hidden=true});
  for(let i=0;i<12;i++){await p.evaluate(i=>{openCases();caseStart(i)},i);await p.waitForTimeout(700);await p.evaluate(()=>kzGo(1));await p.waitForTimeout(2200);
   const r=await p.evaluate(measure);if(r.length)bad++;out.push(`${vn} case ${i+1}: ${r.length?r.join('; '):'ok'}`);await p.screenshot({path:path.join(OUTD,`ov_${vn}_k${i+1}.png`)})}
  await p.evaluate(()=>{caseClose();openBook('b1')});await p.waitForTimeout(1500);await p.evaluate(()=>{BK.skip=true;hush();goStep(0)});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return {l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
   const inter=(a,b)=>{const w=Math.min(a.r,b.r)-Math.max(a.l,b.l),h=Math.min(a.b,b.b)-Math.max(a.t,b.t);return w>0&&h>0?w*h:0};
   const hots=[...document.querySelectorAll('.bhot')].map(e=>({k:e.dataset.h,...R(e)}));const acts=[...document.querySelectorAll('.bact')].filter(e=>e.getBoundingClientRect().width>0).map(e=>({id:e.id,...R(e)}));
   const issues=[];hots.forEach(h=>acts.forEach(a=>{const o=inter(h,a);if(o>h.w*h.h*.25)issues.push(`scroll ${h.k} under ${a.id} ${Math.round(o/(h.w*h.h)*100)}%`)}));return issues});
  if(r.length)bad++;out.push(`${vn} book 1 explore: ${r.length?r.join('; '):'ok'}`);await p.screenshot({path:path.join(OUTD,`ov_${vn}_b1.png`)});await p.close()}
 // parent tool: drag a sparkle in case 1
 const p=await b.newPage({viewport:VW.T});p.on('pageerror',e=>errs.push('tool: '+e.message));await p.addInitScript(init);await p.goto(PAGE);await p.waitForTimeout(500);
 await p.evaluate(()=>{$("splashOv").hidden=true;G.layEdit=true;save();openCases();caseStart(0)});await p.waitForTimeout(700);await p.evaluate(()=>kzGo(1));await p.waitForTimeout(1500);
 const bar=await p.evaluate(()=>!!document.querySelector('#layBar'));
 const box=await p.evaluate(()=>{const r=document.querySelector('.kzspot[data-k="a"]').getBoundingClientRect(),w=$("kzWorld").getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,wl:w.left,wt:w.top,ww:w.width,wh:w.height}});
 await p.mouse.move(box.x,box.y);await p.mouse.down();await p.mouse.move(box.wl+box.ww*.5,box.wt+box.wh*.5,{steps:6});await p.mouse.up();await p.waitForTimeout(300);
 const saved=await p.evaluate(()=>({lay:(G.lay.k1||{}).a,found:KZ.found.length,x:KZ.c.spots.find(s=>s.k==='a').x}));
 await p.evaluate(()=>document.querySelector('.kzspot[data-k="b"]').click());await p.waitForTimeout(300);
 const tapFound=await p.evaluate(()=>KZ.found.length);
 await p.evaluate(()=>document.querySelector('#layBar [data-l="reset"]').click());await p.waitForTimeout(300);
 const reset=await p.evaluate(()=>({lay:G.lay.k1,x:KZ.c.spots.find(s=>s.k==='a').x}));
 await p.evaluate(()=>document.querySelector('#layBar [data-l="end"]').click());await p.waitForTimeout(900);
 const off=await p.evaluate(()=>({edit:G.layEdit,bar:!!document.querySelector('#layBar')}));
 const tool=[['tool bar shows on the search step',bar],['drag saved near the middle',Array.isArray(saved.lay)&&Math.abs(saved.lay[0]-50)<3&&Math.abs(saved.lay[1]-50)<3&&Math.abs(saved.x-50)<3],
  ['dragging does not find a clue',saved.found===0],['a tap while editing does not find a clue',tapFound===0],['reset restores the spot',!reset.lay&&reset.x!==saved.x],['done turns the tool off',off.edit===false&&!off.bar]];
 tool.forEach(([n,c])=>{if(!c)bad++;out.push(`${c?'PASS':'FAIL'} ${n}`)});
 console.log(out.join('\n'));console.log('page errors',JSON.stringify(errs.slice(0,10)));if(errs.length)bad++;
 await b.close();process.exit(bad?1:0)})();
