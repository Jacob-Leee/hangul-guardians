// 실제 기기 기준(기계음 꺼짐) 아이에게 '들려야 할 말'이 녹음으로 나오는 비율 — 게임별
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1024,height:768}});
await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>el.dispatchEvent(new Event('ended')),60);return Promise.resolve()}});
await p.goto('http://localhost:8815/index.html');await p.waitForTimeout(2500);
await p.addScriptTag({content:fs.readFileSync('pg-auto.js','utf8')});
await p.evaluate(()=>{const s=document.getElementById('splashOv');if(s)s.hidden=true;G.autoRead=false;G.rmOff=1;save();
 window.__REC=new Set(Object.keys(VAUD).map(k=>k.split('|').slice(1).join('|')));
 window.__log=[];window.__msg=[];
 const N=narrate;narrate=function(lines,done,lang,o){try{(Array.isArray(lines)?lines:[lines]).forEach(t=>{if(typeof t==='string'&&t.trim())window.__log.push({t,rec:window.__REC.has(ttsClean(t))})})}catch(e){}return N.apply(this,arguments)};
 const M=pgMsg;pgMsg=function(t,bad){if(t)window.__msg.push(t);return M.apply(this,arguments)};
 const S=say;say=function(t){try{if(typeof t==='string'&&t.trim())window.__log.push({t,rec:!!VAUD[vKey('learn',t)]||window.__REC.has(ttsClean(t)),w:1})}catch(e){}return S.apply(this,arguments)};});
const res={};
for(const [g,lv] of [['fish',1],['fish',3],['train',1],['train',3],['pair',2],['fill',1],['trace',2],['opp',1],['asm',2],['dict',2],['ncard',1]]){
 await p.evaluate(()=>{window.__log=[];window.__msg=[]});
 await p.evaluate(([g,lv])=>pgPlay(g,lv),[g,lv]);
 const t0=Date.now();
 while(Date.now()-t0<22000){const a=await p.evaluate(()=>window.PGAUTO?PGAUTO(Math.random()<.25):'x').catch(()=>'e');if(a==='done')break;
  if(a==='?'||a==='none'){await p.evaluate(()=>{const c=[...document.querySelectorAll('.nchc,.dop,.blk:not(.used),.opcard,.asmblk,.wtopt,.fopt')].filter(e=>e.offsetWidth);if(c.length)c[Math.floor(Math.random()*c.length)].click()})}
  await p.waitForTimeout(650)}
 const r=await p.evaluate(()=>{const L=window.__log;const uniq={};L.forEach(x=>{uniq[x.t]=x.rec});const u=Object.entries(uniq);
  const W=L.filter(x=>x.w);return {words:W.length,wordsRec:W.filter(x=>x.rec).length,lines:L.length,recorded:L.filter(x=>x.rec).length,uniq:u.length,uniqRec:u.filter(x=>x[1]).length,silentEx:u.filter(x=>!x[1]).slice(0,4).map(x=>x[0].slice(0,24)),msgs:[...new Set(window.__msg)].slice(0,4)}});
 res[g+lv]=r;await p.evaluate(()=>pgStop());await p.waitForTimeout(300);
}
console.log(JSON.stringify(res,null,1));await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
