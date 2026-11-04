// v46 베타 측정: 자동 켜짐 · 놀이 기록 · 헷갈림/도움 · 첫날 질문 · 7일째 평가 · 리포트 코드(이름 없음) · 끄기 · 기존 기기 꺼짐
const {chromium}=require('playwright');
const R=(n,ok,x)=>console.log((ok?'PASS':'FAIL')+' '+n+(x!==undefined?' | '+JSON.stringify(x):''));
const stub=()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>{try{el.dispatchEvent(new Event('ended'))}catch(e){}},60);return Promise.resolve()}};
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(stub);
 await p.goto('http://localhost:8814/game_new.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(1500);
 const t1=await p.evaluate(()=>{const s=betaState();return {on:s.on,day:s.day,id:G.beta.id,d0:G.beta.d0,pend:s.pending}});
 R('t1 새 기기: 베타 자동 켜짐 · 1일째 · 번호',t1.on&&t1.day===1&&/^B[A-Z0-9]{6}$/.test(t1.id)&&!!t1.d0&&t1.pend.join()==='rcA',t1);  // 읽기 점검 A(시작 기준점)는 첫날부터 대기
 await p.evaluate(()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});G.char='tiger';G.name='하늘이';G.autoRead=false;G.rmOff=1;save();renderAll()});
 const t2=await p.evaluate(async()=>{openBook('b1');await new Promise(r=>setTimeout(r,500));try{bookClose()}catch(e){}pgPlay('fish',1);await new Promise(r=>setTimeout(r,300));pgStop();document.getElementById('pgOv').hidden=true;
  const D=G.days[dkey()];return {act:D.act,first:G.beta.f.first,acts:G.beta.f.acts}});
 R('t2 놀이 시작 기록 (책·놀이터) + 첫 놀이까지 시간',t2.act&&t2.act.book===1&&t2.act.play===1&&t2.first>=0&&t2.acts===2,t2);
 const t3=await p.evaluate(async()=>{const el=document.querySelector('.hud .obj');const r=el.getBoundingClientRect();
  for(let i=0;i<3;i++)el.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:r.left+5,clientY:r.top+5}));
  const hb=document.createElement('button');hb.id='pgHelp';hb.textContent='🐢 도움';document.body.appendChild(hb);hb.click();hb.remove();
  const D=G.days[dkey()];return {conf:D.conf,hlp:D.hlp,fconf:G.beta.f.conf,fhelp:G.beta.f.help}});
 R('t3 헷갈림 신호(빈 곳 3번) · 도움 단추',t3.conf===1&&t3.hlp===1&&t3.fconf===1&&t3.fhelp===1,t3);
 // 다음 날: 첫 15분 마감 → 첫날 질문
 await p.evaluate(()=>{const d=new Date();d.setDate(d.getDate()-1);G.beta.d0=dkey(d);save()});await p.reload();await p.waitForTimeout(1500);
 const t4=await p.evaluate(()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});renderAll();const c=document.getElementById('betaChip');return {end:G.beta.f.end,pend:betaPending(),chip:c&&!c.hidden?c.textContent:null}});
 R('t4 2일째: 첫 15분 마감 + 보호자 질문 칩',t4.end===1&&t4.pend.join()==='q1,rcA'&&t4.chip==='🔒 2',t4);
 const t5=await p.evaluate(async()=>{GATE.until=Date.now()+600000;document.getElementById('betaChip').click();await new Promise(r=>setTimeout(r,300));
  const sec=document.getElementById('betaSec');const first=document.getElementById('setCard').querySelector('.setrow')===sec;
  const q=sec.querySelector('[data-q1="1"]');q.click();await new Promise(r=>setTimeout(r,100));const c=document.getElementById('betaChip');
  return {first,q1:G.beta.q1,chip:c.hidden?null:c.querySelector('b').textContent,done:document.querySelector('#betaSec .btdone .ok')?.textContent}});
 R('t5 칩 → 어른 확인 → 설정 맨 위 베타 → 첫날 질문 저장 (칩은 읽기 점검 1개 남음)',t5.first&&t5.q1===1&&t5.chip==='1'&&/첫날 질문/.test(t5.done||''),t5);
 await p.evaluate(()=>{document.getElementById('setOv').hidden=true;const d=new Date();d.setDate(d.getDate()-6);G.beta.d0=dkey(d);save()});await p.reload();await p.waitForTimeout(1500);
 const t6=await p.evaluate(async()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});renderAll();const pend=betaPending().join();GATE.until=Date.now()+600000;showSettings();
  const sec=document.getElementById('betaSec');sec.querySelector('[data-bsave="r7"]').click();const noStar=!G.beta.r7;
  sec.querySelectorAll('[data-bs="r7"]')[3].click();document.getElementById('bt_r7').value='소리가 가끔 늦게 나와요';document.getElementById('bg_r7').value='카드 배틀';sec.querySelector('[data-bsave="r7"]').click();
  await new Promise(r=>setTimeout(r,100));return {day:betaDay(),pend,noStar,r7:G.beta.r7,after:betaPending()}});
 R('t6 7일째 평가: 별 없이 저장 안 됨 → 별 4개 + 불편한 점 저장',t6.day===7&&t6.pend==='r7,rcA'&&t6.noStar&&t6.r7&&t6.r7.s===4&&/늦게/.test(t6.r7.t)&&t6.after.join()==='rcA',t6);
 const t7=await p.evaluate(async()=>{document.getElementById('betaSend').click();await new Promise(r=>setTimeout(r,100));const code=document.getElementById('betaTxt').value;
  const bin=atob(code.slice(5).replace(/-/g,'+').replace(/_/g,'/'));const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);const txt=new TextDecoder().decode(u);const o=JSON.parse(txt);
  return {pre:code.slice(0,5),len:code.length,id:o.id===G.beta.id,keys:Object.keys(o),days:Object.keys(o.days).length,q1:o.q1,r7:o.r7&&o.r7.s,dev:o.dev.t,noName:!txt.includes('하늘이')&&!('name' in o),acts:o.acts}});
 R('t7 리포트 코드: HGB1 · 이름 없음 · 기록·답 포함',t7.pre==='HGB1.'&&t7.id&&t7.q1===1&&t7.r7===4&&t7.noName&&t7.days>=1&&t7.acts.book===1,t7);
 const t8=await p.evaluate(async()=>{document.querySelector('#betaSec [data-bon="0"]').click();await new Promise(r=>setTimeout(r,100));const c=document.getElementById('betaChip');
  return {on:G.beta.on,pend:betaPending().length,chipHidden:!c||c.hidden,txt:document.querySelector('#betaSec small').textContent.slice(0,20)}});
 R('t8 베타 끄기 → 질문·칩 없음',t8.on===0&&t8.pend===0&&t8.chipHidden,t8);
 // 기존 기기(진행 있음): 꺼진 채로 시작
 const p2=await ctx.newPage();await p2.addInitScript(stub);await p2.goto('http://localhost:8814/game_new.html');
 await p2.evaluate(()=>{localStorage.setItem('hiq2',JSON.stringify({char:'tiger',lv:4,books:{b1:{done:1,stars:2}},lang:'ko'}))});await p2.reload();await p2.waitForTimeout(1500);
 const t9=await p2.evaluate(()=>({on:G.beta.on,d0:G.beta.d0||null}));
 R('t9 이미 진행이 있던 기기: 베타 꺼짐',t9.on===0&&t9.d0===null,t9);
 await p2.goto('http://localhost:8814/game_new.html?beta=1');await p2.waitForTimeout(1500);
 const t10=await p2.evaluate(()=>({on:G.beta.on,d0:G.beta.d0}));
 R('t10 주소 ?beta=1 → 켜짐',t10.on===1&&!!t10.d0,t10);
 console.log('pageerrors:',errs.length?errs.slice(0,3):'none');await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
