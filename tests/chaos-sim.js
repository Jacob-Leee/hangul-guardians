// 카오스(무작위 터치) 시뮬레이터 — 오류·멈춤·반응 없는 단추·작은 터치 영역 측정
// node chaos-sim.js <phone|ipad|tab> <actions> <seed> [fresh]
const {chromium}=require('playwright');const fs=require('fs');
const VW={phone:{width:390,height:844},ipad:{width:1180,height:820},tab:{width:800,height:1280}};
const which=process.argv[2]||'phone',N=+process.argv[3]||300,seed=+process.argv[4]||1,fresh=process.argv[5]==='fresh';
let s=seed;const rnd=()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff};
const OUT='/tmp/claude-0/chk/CH/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({viewport:VW[which],hasTouch:true,isMobile:which!=='ipad'});
 const p=await ctx.newPage();
 const errs=[],cerr=[],fails=[],dialogs=[];
 p.on('pageerror',e=>errs.push({m:e.message.slice(0,160),at:step,trail:trail.slice(-8)}));
 p.on('console',m=>{if(m.type()==='error'){const t=m.text();if(!/favicon|net::ERR|Failed to load resource/.test(t))cerr.push({m:t.slice(0,160),at:step})}});
 p.on('requestfailed',r=>{const u=r.url();if(!u.startsWith('data:'))fails.push(u.split('/').slice(-2).join('/'))});
 p.on('dialog',d=>{dialogs.push(d.type()+': '+d.message().slice(0,80));d.dismiss().catch(()=>{})});
 p.on('filechooser',()=>{});
 await p.addInitScript(()=>{
  window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};
  window.__aud=0;
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>{window.__aud++;setTimeout(()=>u.onend&&u.onend(),80)},cancel:()=>{},addEventListener(){}}});
  const AC=window.AudioContext||window.webkitAudioContext;if(AC){['createOscillator','createBufferSource'].forEach(f=>{const o=AC.prototype[f];AC.prototype[f]=function(){window.__aud++;return o.apply(this,arguments)}})}
  const C2=CanvasRenderingContext2D.prototype;['stroke','fill','drawImage','fillText','clearRect'].forEach(f=>{const o=C2[f];C2[f]=function(){window.__aud++;return o.apply(this,arguments)}});
  HTMLMediaElement.prototype.play=function(){window.__aud++;const el=this;setTimeout(()=>{try{el.dispatchEvent(new Event('ended'))}catch(e){}},120);return Promise.resolve()};
 });
 let step=0;const trail=[];global.__trail=trail;global.__step=()=>step;
 await p.goto('http://localhost:8814/game_new.html');await p.waitForTimeout(1200);
 if(!fresh)await p.evaluate(()=>{try{const sp=document.getElementById('splashOv');if(sp)sp.hidden=true;
  G.char=G.char||'tiger';G.name=G.name||'하늘';G.autoRead=false;
  G.books=G.books||{};['b1','b2','b3'].forEach(k=>G.books[k]={done:1,stars:2});
  G.cards={own:{tiger:1,rat:0,bk_yong:2,v_gray:1},q:[{id:'bk_owl',r:0}]};
  G.pgm={'나비':{r:1,w:3,box:1},'포도':{r:0,w:2,box:0}};save();if(window.renderAll)renderAll()}catch(e){}});
 if(process.env.START){await p.waitForTimeout(400);await p.evaluate(x=>{try{(0,eval)(x)}catch(e){window.__startErr=e.message}},process.env.START);await p.waitForTimeout(1200)}
 const BAN=process.env.BAN?new RegExp(process.env.BAN):null;
 const small={},dead={},clicked={},screens={};
 let emptyFor=0,stuck=[];
 const cands=()=>p.evaluate(()=>{
  const sel='button,[onclick],[role=button],.hqhot,.pgfish,.mole3,.rdrop2,.pcard,.blk,.fopt,.dop,.nchc,.cdface,.rvw,select,label.btn,input[type=checkbox],a[href^="#"]';
  const out=[];const seen=new Set();
  document.querySelectorAll(sel).forEach(el=>{
   if(seen.has(el)||el.disabled)return;seen.add(el);
   const r=el.getBoundingClientRect();if(r.width<2||r.height<2)return;
   if(r.bottom<1||r.right<1||r.top>innerHeight-1||r.left>innerWidth-1)return;
   const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.pointerEvents==='none'||+cs.opacity<.05)return;
   const cx=Math.min(innerWidth-2,Math.max(1,r.left+r.width/2)),cy=Math.min(innerHeight-2,Math.max(1,r.top+r.height/2));
   const top=document.elementFromPoint(cx,cy);if(!top||!(el===top||el.contains(top)))return;
   const t=(el.getAttribute('aria-label')||el.textContent||'').replace(/\s+/g,' ').trim().slice(0,14);
   const lab=(el.id?'#'+el.id:el.tagName.toLowerCase()+'.'+String(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className).split(' ').filter(Boolean).slice(0,2).join('.'))+' '+t;
   out.push({x:cx,y:cy,w:Math.round(r.width),h:Math.round(r.height),lab,close:/닫기|Close|←|나중에|그만|도망|✕|×|Back|돌아가/.test(t)||/X$|Close|Back/.test(el.id||'')});
  });
  const ov=[...document.querySelectorAll('[id$="Ov"]')].filter(e=>!e.hidden&&getComputedStyle(e).display!=='none').map(e=>e.id);
  const g=(window.PGS&&PGS.g)||'',du=window.DU&&!DU.done?'duel':'',kz=window.KZ?'case':'',run=window.RUN?'run':'';
  return {c:out,scr:[ov.join('+')||'main',g,du,kz,run].filter(Boolean).join('/')};
 });
 const t0=Date.now();
 for(step=0;step<N;step++){
  let st;try{st=await cands()}catch(e){await p.waitForTimeout(500);continue}
  screens[st.scr]=(screens[st.scr]||0)+1;
  st.c.forEach(c=>{const m=Math.min(c.w,c.h);if(m<44){const k=st.scr.split('/')[0]+' | '+c.lab;small[k]=Math.min(small[k]||999,m)}});
  if(!st.c.length){emptyFor++;if(emptyFor>=10){stuck.push({at:step,scr:st.scr,trail:trail.slice(-6)});await p.screenshot({path:OUT+which+'_stuck_'+step+'.png'});
    await p.keyboard.press('Escape').catch(()=>{});emptyFor=0;await p.reload();await p.waitForTimeout(1500)}
   await p.waitForTimeout(600);continue}
  emptyFor=0;
  const ws=st.c.map(c=>(BAN&&BAN.test(c.lab))?0.0001:(c.close?.2:1)/(1+(clicked[c.lab]||0)));const tot=ws.reduce((a,x)=>a+x,0);
  let r=rnd()*tot,k=0;for(;k<ws.length-1;k++){r-=ws[k];if(r<=0)break}
  const c=st.c[k];clicked[c.lab]=(clicked[c.lab]||0)+1;trail.push(st.scr+' > '+c.lab);
  await p.evaluate(()=>{window.__mut=0;window.__aud0=window.__aud;if(window.__mo)window.__mo.disconnect();window.__mo=new MutationObserver(l=>{window.__mut+=l.length});window.__mo.observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true})}).catch(()=>{});
  const u0=p.url();
  try{await p.mouse.click(c.x,c.y)}catch(e){}
  await p.waitForTimeout(450+Math.floor(rnd()*500));
  const fx=await p.evaluate(()=>({m:window.__mut,a:window.__aud-window.__aud0})).catch(()=>({m:1,a:0}));
  if(fx.m===0&&fx.a===0){const kk=st.scr.split('/')[0]+' | '+c.lab;dead[kk]=(dead[kk]||0)+1}
  if(p.url()!==u0){trail.push('NAV '+p.url());await p.goto('http://localhost:8814/game_new.html');await p.waitForTimeout(1200)}
 }
 const res={which,seed,fresh,steps:N,secs:Math.round((Date.now()-t0)/1000),errors:errs,consoleErr:cerr.slice(0,15),failed:[...new Set(fails)].slice(0,20),dialogs,stuck,
  screens:Object.keys(screens).sort(),dead:Object.entries(dead).sort((a,b)=>b[1]-a[1]).slice(0,40),
  small:Object.entries(small).sort((a,b)=>a[1]-b[1]).slice(0,80)};
 fs.writeFileSync(OUT+which+'_'+seed+(process.env.TAG?'_'+process.env.TAG:'')+'.json',JSON.stringify(res,null,1));
 console.log(which,seed,'steps',N,'secs',res.secs,'errors',errs.length,'stuck',stuck.length,'dead',res.dead.length,'small',Object.keys(small).length,'screens',res.screens.length);
 await b.close();
})().catch(e=>{console.log('ERR',e.message,'| at step',global.__step&&global.__step(),'| trail:',JSON.stringify((global.__trail||[]).slice(-12)));process.exit(1)});
