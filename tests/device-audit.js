// iPhone / iPad layout audit: opens every main screen at phone and tablet sizes and reports
//  - tap targets or text covered by another element (checked with elementFromPoint after scrolling it into view)
//  - controls that cannot be scrolled into view, pages that scroll sideways, text cut off
// node tests/device-audit.js [index.html] [se,ip,ipL,air,airL] [screen filter regex]   -> tests/out/device/report.txt + screenshots
// sizes: se 375x667, ip 390x844, max 430x932, ipL 844x390, seL 667x375, mini 744x1133, air 820x1180, airL 1180x820, pro 1024x1366.
// Exit code 1 when a screen has an overlap / cut-off / sideways-scroll problem (small tap targets and clipped labels are only listed).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const FILE=process.argv[2]||'index.html';
const OUT=process.env.OUT||path.join(__dirname,'out','device');fs.mkdirSync(OUT,{recursive:true});
const IPH='Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const IPAD='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15';
const ALL={
 se:{viewport:{width:375,height:667},ua:IPH},      // iPhone SE / 8
 ip:{viewport:{width:390,height:844},ua:IPH},      // iPhone 12-15
 max:{viewport:{width:430,height:932},ua:IPH},     // iPhone Pro Max / Plus
 ipL:{viewport:{width:844,height:390},ua:IPH},     // iPhone landscape
 seL:{viewport:{width:667,height:375},ua:IPH},     // iPhone SE landscape
 mini:{viewport:{width:744,height:1133},ua:IPAD},  // iPad mini portrait
 air:{viewport:{width:820,height:1180},ua:IPAD},   // iPad Air portrait
 airL:{viewport:{width:1180,height:820},ua:IPAD},  // iPad Air landscape
 pro:{viewport:{width:1024,height:1366},ua:IPAD},  // iPad Pro 12.9 portrait
};
const pick=(process.argv[3]||'se,ip,ipL,air,airL').split(',');
const FILTER=new RegExp(process.argv[4]||'.');
// screens: [name, setup (runs in page), wait ms, audit root]
function screens(info){const S=[
 ['home','renderAll()',700,'body'],
 ['today','tdOpen()',800,'#tdOv'],
 ['settings','$("tdOv").hidden=true;showSettings()',700,'#setOv'],
 ['pghub','$("setOv").hidden=true;$("tdOv").hidden=true;pgHub()',700,'#pgOv']];
 info.pg.forEach(g=>S.push(['pg_'+g,`$("tdOv").hidden=true;pgPlay(${JSON.stringify(g)},3);setTimeout(()=>{const b=document.querySelector('#pgGo');b&&b.click()},300)`,1900,'#pgOv']));
 S.push(['wordbook','pgStop();wbBook()',700,'#pgOv']);
 S.push(['course','pgStop();$("pgOv").hidden=true;startRun()',1600,'#runOv']);
 S.push(['duel','try{cancelAnimationFrame(RUN.raf)}catch(e){};$("runOv").hidden=true;duel({lv:1,practice:true})',1800,'#duelOv']);
 // v29.5 new battle question types (tier 3, forced type)
 S.push(['duel_oxq','["setOv","tdOv","hqOv","hqGiftOv"].forEach(x=>{const e=$(x);if(e)e.hidden=true});duClose();duel({lv:3,practice:true,vil:"fat"});setTimeout(()=>{const go=$("dGo");go&&go.click();DU.busy=false;const o=duType;duType=()=>"oxq";duNext();duType=o},500)',2400,'#duelOv']);
 S.push(['duel_pic','DU.busy=false;const o1=duType;duType=()=>"pic";duNext();duType=o1',1500,'#duelOv']);
 S.push(['duel_who','DU.busy=false;const o2=duType;duType=()=>(typeof duWhoPool==="function"&&duWhoPool().length>3)?"who":"word";duNext();duType=o2',1500,'#duelOv']);
 S.push(['cases','$("duelOv").hidden=true;openCases()',900,'#caseOv']);
 for(let i=0;i<info.cases;i++)S.push([`case${i+1}_search`,`caseStart(${i});setTimeout(()=>kzGo(1),300)`,2600,'#caseOv']);
 [0,2,3,4,5].forEach(a=>S.push([`case1_act${a}`,`caseStart(0);setTimeout(()=>kzGo(${a}),300)`,2600,'#caseOv']));
 info.books.forEach(bk=>{S.push([`${bk.id}_prologue`,`caseClose&&!$("caseOv").hidden&&caseClose();openBook(${JSON.stringify(bk.id)})`,1500,'#bookOv']);
  bk.steps.forEach((t,i)=>S.push([`${bk.id}_s${i}_${t}`,`BK.skip=true;hush();$("bPov").hidden=true;$("bPov").innerHTML="";setTimeout(()=>{BK.skip=false;goStep(${i})},200)`,2200,'#bookOv']))});
 S.push(['mission','bookClose&&BK&&bookClose();rmShow((RMS.b1||[])[0])',900,'#rmOv']);
 // v29.5 our HQ: every room filled, the treasure tray, and the gift box
 S.push(['hq_living','try{$("rmSkip").click()}catch(e){};["rmOv","setOv","tdOv","pgOv","caseOv","bookOv","duelOv","runOv"].forEach(x=>{const e=$(x);if(e)e.hidden=true});hush();G.lv=9;G.unl=["tiger","monkey","rabbit"];const h=hqG();HQ_ITEMS.forEach(x=>h.got[x.src]=1);h.intro=1;h.place={living:{0:"plant",1:"lamp",6:"sofa"},case:{0:"key",1:"gold"},deck:{2:"scope"},study:{0:"books"}};save();hqOpen("living")',900,'#hqOv']);
 S.push(['hq_case','hqOpen("case")',700,'#hqOv']);
 S.push(['hq_deck','hqOpen("deck")',700,'#hqOv']);
 S.push(['hq_study','hqOpen("study")',700,'#hqOv']);
 S.push(['hq_locked','G.lv=1;save();hqOpen("living")',700,'#hqOv']);
 S.push(['hq_gift','$("hqOv").hidden=true;G.lv=9;hqG().got={};HQQ.length=0;HQGIFT=false;hqAward("case_k1")',2100,'#hqGiftOv']);
 return S}
const AUDIT=()=>{const issues=[];const R=e=>e.getBoundingClientRect();
 const shown=e=>{for(let x=e;x&&x.nodeType===1;x=x.parentElement){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.12||x.hidden)return false}return true};
 const desc=e=>{if(!e)return 'nothing';const t=(e.innerText||e.getAttribute('aria-label')||e.alt||'').replace(/\s+/g,' ').trim().slice(0,22);return `${e.tagName.toLowerCase()}${e.id?'#'+e.id:''}${e.classList.length?'.'+[...e.classList].slice(0,2).join('.'):''}${t?' "'+t+'"':''}`};
 const W=innerWidth,H=innerHeight;
 if(document.documentElement.scrollWidth>W+2)issues.push(`page scrolls sideways (${document.documentElement.scrollWidth}px > ${W}px)`);
 const root=document.querySelector(window.__ROOT)||document.body;
 // the open overlay's card must not run past the screen sideways
 root.querySelectorAll('.card').forEach(c=>{if(!shown(c))return;const r=R(c);if(r.width>2&&(r.left<-2||r.right>W+2))issues.push(`card ${desc(c)} wider than screen (${Math.round(r.left)}..${Math.round(r.right)})`)});
 const tgt=[...root.querySelectorAll('button,a[href],input,select,[data-rec],.bhot,.kzspot,.rec,.pcard,[role=button]')].filter(e=>{const r=R(e);return r.width>6&&r.height>6&&shown(e)&&getComputedStyle(e).pointerEvents!=='none'&&!e.disabled&&!e.closest('[aria-hidden=true]')});
 const txt=[...root.querySelectorAll('p,h1,h2,h3,b,small,.tok,li,label')].filter(e=>{const r=R(e);return r.width>6&&r.height>6&&shown(e)&&(e.innerText||'').trim().length>1&&!e.closest('button,.bhot,.kzspot,.rec')&&getComputedStyle(e).pointerEvents!=='none'});
 const covered=(e,kind)=>{try{e.scrollIntoView({block:'nearest',inline:'nearest'})}catch(x){}
  const r=R(e);const vx0=Math.max(0,r.left),vx1=Math.min(W,r.right),vy0=Math.max(0,r.top),vy1=Math.min(H,r.bottom);
  if(vx1-vx0<4||vy1-vy0<4){issues.push(`${kind} off screen, cannot reach: ${desc(e)} @${Math.round(r.left)},${Math.round(r.top)}`);return}
  // clipped by an overflow ancestor?
  let cx0=vx0,cx1=vx1,cy0=vy0,cy1=vy1;for(let x=e.parentElement;x&&x!==document.body;x=x.parentElement){const c=getComputedStyle(x);if(/(hidden|clip|auto|scroll)/.test(c.overflowX+c.overflowY)){const q=R(x);cx0=Math.max(cx0,q.left);cx1=Math.min(cx1,q.right);cy0=Math.max(cy0,q.top);cy1=Math.min(cy1,q.bottom)}}
  const vis=Math.max(0,cx1-cx0)*Math.max(0,cy1-cy0),full=r.width*r.height;
  if(vis<full*.55){issues.push(`${kind} cut off (${Math.round(vis/full*100)}% visible): ${desc(e)}`);if(vis<16)return}
  const pts=[[.5,.5],[.2,.5],[.8,.5],[.5,.18],[.5,.82]].map(([a,b])=>[cx0+(cx1-cx0)*a,cy0+(cy1-cy0)*b]);let bad=0,by=null;
  pts.forEach(([x,y])=>{const t=document.elementFromPoint(x,y);if(t&&t!==e&&!e.contains(t)&&!t.contains(e)){bad++;by=t}});
  if(bad>=2)issues.push(`${kind} covered: ${desc(e)} under ${desc(by.closest('button,.rec,.card,[id]')||by)}`);
  else if(bad===1)issues.push(`${kind} partly covered: ${desc(e)} under ${desc(by.closest('button,.rec,.card,[id]')||by)}`)};
 // a card's section whose content spills out of its own box (it overlaps the next section)
 root.querySelectorAll('.card').forEach(c=>{if(!shown(c))return;[...c.children].forEach(ch=>{if(!shown(ch))return;const cs=getComputedStyle(ch);if(cs.overflowY!=='visible'||cs.position==='absolute'||cs.position==='fixed')return;
  if(ch.scrollHeight>ch.clientHeight+6&&ch.clientHeight>0)issues.push(`section spills ${ch.scrollHeight-ch.clientHeight}px out of its box: ${desc(ch)}`)})});
 tgt.forEach(e=>covered(e,'button'));txt.forEach(e=>covered(e,'text'));
 // text cut by its own box (nowrap/overflow)
 [...root.querySelectorAll('button,b,small,span,p')].forEach(e=>{if(!shown(e))return;const c=getComputedStyle(e);if(c.overflow==='visible'&&c.textOverflow!=='ellipsis')return;if(e.scrollWidth>e.clientWidth+3&&e.clientWidth>0&&(e.innerText||'').trim())issues.push(`text clipped inside: ${desc(e)}`)});
 const small=tgt.filter(e=>{const r=R(e);return (r.width<30||r.height<30)&&!e.classList.contains('kzspot')}).map(desc);
 if(small.length)issues.push(`small tap targets (<30px): ${small.slice(0,6).join(', ')}${small.length>6?' …+'+(small.length-6):''}`);
 return [...new Set(issues)]};
(async()=>{const b=await chromium.launch();const report=[];const errs=[];
 for(const vn of pick){const V=ALL[vn];if(!V)continue;
  const ctx=await b.newContext({viewport:V.viewport,userAgent:V.ua,isMobile:!!process.env.MOBILE&&V.ua===IPH,hasTouch:true,deviceScaleFactor:1});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(`${vn}: ${e.message}`));
  await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],speaking:false,speak:u=>setTimeout(()=>u.onend&&u.onend(),30),cancel(){},addEventListener(){}}});
   if(!localStorage.getItem('hiq2'))localStorage.setItem('hiq2',JSON.stringify({lang:'ko',char:'tiger',lv:3,coins:50,st:4,tut:1,rd:3,pgIntro:1,appHint:1,rmOff:true,cases:{k1:1,k2:1,k3:1,k4:1,k5:1,k6:1,k7:1,k8:1,k9:1,k10:1,k11:1}}))});
  const load=async()=>{await p.goto('file://'+path.resolve(FILE));await p.waitForTimeout(600);await p.evaluate(()=>{const s=document.getElementById('splashOv');if(s)s.hidden=true;const t=document.getElementById('titleOv');if(t)t.hidden=true})};
  await load();
  const info=await p.evaluate(()=>({pg:Object.keys(PGAMES),cases:KC.length,books:BOOKS.filter(b=>BD[b.id]).map(b=>({id:b.id,steps:BD[b.id].steps.map(s=>s.type)}))}));
  for(const [name,code,ms,root] of screens(info)){if(!FILTER.test(name))continue;
   try{await p.evaluate(c=>{eval(c)},code)}catch(e){report.push(`${vn} ${name}: SETUP FAILED ${e.message.split('\n')[0]}`);await load();continue}
   await p.waitForTimeout(ms);
   const res=await p.evaluate(`(()=>{window.__ROOT=${JSON.stringify(root)};return (${AUDIT.toString()})()})()`).catch(e=>['AUDIT ERROR '+e.message]);
   await p.screenshot({path:`${OUT}/${vn}_${name}.png`});
   report.push(`${vn} ${name}: ${res.length?'\n   - '+res.join('\n   - '):'ok'}`)}
  await ctx.close()}
 const txt=report.join('\n')+'\n\npage errors: '+JSON.stringify(errs.slice(0,12));fs.writeFileSync(`${OUT}/report.txt`,txt);console.log(txt);await b.close();
 // moving game pieces (falling drops, swimming fish) may overlap or start outside for a moment: listed, not failed
 const bad=report.flatMap(r=>{const [head,...items]=r.split('\n   - ');return items.map(x=>head.replace(/:\s*$/,'')+': '+x)}).concat(report.filter(r=>/SETUP FAILED/.test(r)))
  .filter(x=>/(?<!partly )covered:|cut off|cannot reach|sideways|spills|wider than screen|SETUP FAILED/.test(x)&&!/rdrop|pgfish/.test(x));
 bad.forEach(x=>console.log('  ✗ '+x));
 console.log(bad.length?`FAIL ${bad.length} screen(s) with layout problems`:'PASS ALL layout checks');process.exit(bad.length?1:0)})();
