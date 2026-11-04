// v44: 3단계 — 하루 이용 시간 · 낱말 레벨 하향 적응 · 출석 스티커판 · 설정 줄 위치
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1024,height:768}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>{try{el.dispatchEvent(new Event('ended'))}catch(e){}},60);return Promise.resolve()}});
await p.goto('http://localhost:8814/game_new.html');await p.waitForTimeout(1500);
const R=(n,ok,x)=>console.log((ok?'PASS':'FAIL')+' '+n+(x!==undefined?' | '+JSON.stringify(x):''));
await p.evaluate(()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});G.char='tiger';G.name='t';G.autoRead=false;G.rmOff=1;G.lang='ko';save()});
const solveGate=async()=>p.evaluate(async()=>{const g=document.getElementById('gateOv');if(!g||g.hidden)return 'nogate';
 const m=document.querySelector('#gateCard .gsum').textContent.match(/(\d+)\s*\+\s*(\d+)/);const ans=String(+m[1]+ +m[2]);
 for(const ch of ans){document.querySelector('#gateCard [data-g="'+ch+'"]').click();await new Promise(r=>setTimeout(r,30))}
 document.querySelector('#gateCard [data-g="ok"]').click();await new Promise(r=>setTimeout(r,80));return 'ok'});
// t1 제한 없으면 평소대로 놀이터 열림
const t1=await p.evaluate(async()=>{G.tlim=0;save();pgPlay('fish',1);await new Promise(r=>setTimeout(r,500));const o=!document.getElementById('pgOv').hidden;pgStop();document.getElementById('pgOv').hidden=true;return {open:o,rest:!!document.getElementById('restOv')}});
R('t1 제한 끔 → 놀이터 정상',t1.open&&!t1.rest,t1);
// t2 시간 초과 → 새 놀이 대신 쉬는 화면
const t2=await p.evaluate(async()=>{G.tlim=20;dayLog(D=>{D.min=25});save();pgPlay('fish',1);await new Promise(r=>setTimeout(r,600));
 return {pg:!document.getElementById('pgOv').hidden,rest:!!document.getElementById('restOv'),over:tlOver()}});
R('t2 시간 초과 → 쉬는 화면, 놀이 시작 안 함',t2.rest&&!t2.pg&&t2.over,t2);
// t3 다른 입구도 막힘 (오늘의 모험·배틀·사건·책)
const t3=await p.evaluate(async()=>{const out={};document.getElementById('restOv')&&document.getElementById('restOv').remove();
 for(const fn of ['tdOpen','duel','openCases','openBook','cardArena','startRun']){if(typeof window[fn]!=='function'){out[fn]='none';continue}
  try{window[fn](fn==='openBook'?'b1':undefined)}catch(e){}await new Promise(r=>setTimeout(r,250));out[fn]=!!document.getElementById('restOv');const ro=document.getElementById('restOv');if(ro)ro.remove()}
 return out});
R('t3 모든 입구 막힘',Object.values(t3).every(v=>v===true||v==='none'),t3);
// t4 어른 확인 → 10분 연장
await p.evaluate(()=>{restShow()});await p.waitForTimeout(200);
await p.evaluate(()=>{GATE.until=0;document.getElementById('restMore').click()});await p.waitForTimeout(200);
const g4=await solveGate();
const t4=await p.evaluate(()=>({gone:!document.getElementById('restOv'),ext:G.tlimExt,over:tlOver()}));
R('t4 어른 확인 후 10분 연장',g4==='ok'&&t4.gone&&t4.ext&&t4.ext.m===10&&!t4.over,{g4,...t4});
// t5 설정: 하루 이용 시간 줄 — 읽기 미션 줄 바로 다음
const t5=await p.evaluate(()=>{showSettings();const row=document.getElementById('tlRow');const prev=row&&row.previousElementSibling;
 const r={has:!!row,afterRmo:!!(prev&&prev.querySelector('[data-rmo]')),pressed:row&&row.querySelector('[aria-pressed="true"]')&&row.querySelector('[aria-pressed="true"]').dataset.tl,wl12:document.querySelectorAll('#setCard [data-wl="1"],#setCard [data-wl="2"]').length,wl3:!!document.querySelector('#setCard [data-wl="3"]')};
 row.querySelector('[data-tl="45"]').click();r.after=G.tlim;r.again=document.querySelectorAll('#tlRow').length;document.getElementById('setOv').hidden=true;return r});
R('t5 설정 줄 위치·선택 동작·레벨1·2 단추 숨김',t5.has&&t5.afterRmo&&t5.pressed==='20'&&t5.after===45&&t5.again===1&&t5.wl12===0&&t5.wl3,t5);
// t6 낱말 레벨: 3판 연속 50% 미만이면 한 단계 내림 + 그날은 다시 안 올림
const t6=await p.evaluate(async()=>{G.tlim=0;G.wl=4;delete G.wlT;delete G.wlHold;save();const log=[];
 for(let i=0;i<3;i++){pgPlay('fish',1);await new Promise(r=>setTimeout(r,400));const go=document.getElementById('pgGo');if(go)go.click();await new Promise(r=>setTimeout(r,900));
  const S=PGS;log.push({word:!!(S&&S.lad&&S.lad.word),n:S&&S.lad&&S.lad.n});if(!S){log.push('nogame');break}
  S.firstOK=0;S.done=S.goal;pgResult();await new Promise(r=>setTimeout(r,300));pgStop();document.getElementById('pgOv').hidden=true}
 const up=wbCheckUp();return {wl:G.wl,hold:G.wlHold===dkey(),blockedUp:up===false,log}});
R('t6 3판 50% 미만 → 레벨 4→3, 오늘은 다시 안 올림',t6.wl===3&&t6.hold&&t6.blockedUp,t6);
// t7 최저 레벨(3)에서는 더 내려가지 않음
const t7=await p.evaluate(async()=>{G.wl=3;G.wlT={lv:3,a:[.1,.1]};save();pgPlay('fish',1);await new Promise(r=>setTimeout(r,400));const go=document.getElementById('pgGo');if(go)go.click();await new Promise(r=>setTimeout(r,900));
 const S=PGS;S.firstOK=0;S.done=S.goal;pgResult();await new Promise(r=>setTimeout(r,300));pgStop();document.getElementById('pgOv').hidden=true;return {wl:G.wl}});
R('t7 최저 레벨 3 유지',t7.wl===3,t7);
// t8 오늘 첫 활동 → 스티커 토스트, 같은 날 두 번째는 없음
const t8=await p.evaluate(async()=>{const k=dkey();G.days[k]={};delete G.stkLast;save();
 dayLog(D=>{D.games=(D.games||0)+1});await new Promise(r=>setTimeout(r,1000));const m1=document.getElementById('toast').textContent;
 document.getElementById('toast').textContent='';dayLog(D=>{D.games=(D.games||0)+1});await new Promise(r=>setTimeout(r,1000));const m2=document.getElementById('toast').textContent;
 return {m1,m2,last:G.stkLast===k}});
R('t8 첫 활동 스티커 1번만',/스티커/.test(t8.m1)&&!/스티커/.test(t8.m2)&&t8.last,t8);
// t9 메인 '더보기' → 🗓️ 스티커판 열림 (오늘 칸에 스티커)
const t9=await p.evaluate(async()=>{document.querySelectorAll('[id$="Ov"]').forEach(o=>o.hidden=true);renderAll();
 const ex=document.getElementById('extras');const more=ex.querySelector('[data-x="more"]');if(!ex.classList.contains('open'))more.click();await new Promise(r=>setTimeout(r,200));
 const bt=document.querySelector('#extras [data-x="stk"]');const r={btn:!!bt,vis:bt?getComputedStyle(bt).display!=='none':false};
 if(bt){bt.click();await new Promise(r=>setTimeout(r,300));const g=document.querySelector('.mgrid2');r.board=!!g;r.on=g?g.querySelectorAll('.mcell.on').length:0;r.todayCell=!!(g&&g.querySelector('.mcell.today.on img'))}
 return r});
R('t9 더보기 → 스티커판',t9.btn&&t9.vis&&t9.board&&t9.on>=1&&t9.todayCell,t9);
// t10 놀지 않은 날은 빈칸, 논 날만 스티커 (dkey(날짜) 사용 확인)
const t10=await p.evaluate(async()=>{const now=new Date();if(now.getDate()<3)return {skip:true};
 const y=new Date(now);y.setDate(now.getDate()-1);const y2=new Date(now);y2.setDate(now.getDate()-2);
 G.days[dkey(y)]={games:1};delete G.days[dkey(y2)];save();stickerBoard();await new Promise(r=>setTimeout(r,200));
 const cells=[...document.querySelectorAll('.mgrid2 .mcell:not(.blank)')];const c=d=>cells[d-1];
 return {yOn:c(y.getDate()).classList.contains('on'),y2On:c(y2.getDate()).classList.contains('on')}});
R('t10 논 날만 스티커',t10.skip||(t10.yOn&&!t10.y2On),t10);
console.log('pageerrors:',errs.length?errs.slice(0,3):'none');await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
