// v43: 버그 수정·🔊 정직하게·안내 문구 교체 검증
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1024,height:768}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>el.dispatchEvent(new Event('ended')),60);return Promise.resolve()}});
await p.goto('http://localhost:8814/game_new.html');await p.waitForTimeout(1500);
const R=(n,ok,x)=>console.log((ok?'PASS':'FAIL')+' '+n+(x!==undefined?' | '+JSON.stringify(x):''));
await p.evaluate(()=>{const s=document.getElementById('splashOv');if(s)s.hidden=true;G.char='tiger';G.autoRead=false;G.rmOff=1;save()});
// t1 본부 반짝이 테두리
const t1=await p.evaluate(()=>{hqOpen();const e=document.querySelector('.hqpic i.spk');const v=e?getComputedStyle(e).borderTopWidth:'none';document.getElementById('hqOv').hidden=true;return v});
R('t1 본부 반짝이 테두리 0',t1==='0px',t1);
const start=async(g,lv)=>{await p.evaluate(([g,lv])=>pgPlay(g,lv),[g,lv]);await p.waitForTimeout(400);await p.evaluate(()=>{const go=document.getElementById('pgGo');if(go)go.click()});await p.waitForTimeout(2300)};
// t2 카드 배틀 도움 → 반짝 힌트
await start('ncard',1);
const t2=await p.evaluate(async()=>{document.getElementById('pgHelp').click();await new Promise(r=>setTimeout(r,300));return {glow:document.querySelectorAll('.nchc.hintg').length,msg:document.getElementById('pgMsg').textContent}});
R('t2 카드 배틀 도움 → 낼 카드 반짝',t2.glow>=1,t2);
// t3 카드 배틀 🔊: 11/4 녹음(ux_009 등)이 들어와서 이제 보여야 함 — 🔊는 녹음이 있을 때만
const t3=await p.evaluate(()=>getComputedStyle(document.getElementById('pgSay')).visibility);
R('t3 카드 배틀 🔊 녹음 생겨서 보임',t3==='visible',t3);
await p.evaluate(()=>pgStop());
// t4 짝꿍 🔊 숨김
await start('pair',1);
const t4=await p.evaluate(()=>getComputedStyle(document.getElementById('pgSay')).visibility);
R('t4 짝꿍 🔊 숨김',t4==='hidden',t4);await p.evaluate(()=>pgStop());
// t5 낚시: 녹음된 글자면 🔊 보임 / 녹음 없는 낱말이면 숨김
await start('fish',3);
const t5=await p.evaluate(()=>({t:PGS.target&&PGS.target.t,rec:recAny('learn',PGS.target&&PGS.target.t),vis:getComputedStyle(document.getElementById('pgSay')).visibility}));
R('t5 🔊 = 녹음 여부와 일치',(t5.rec&&t5.vis!=='hidden')||(!t5.rec&&t5.vis==='hidden'),t5);
await p.evaluate(()=>pgStop());
await start('fish',1);
const t6=await p.evaluate(()=>({t:PGS.target&&PGS.target.t,rec:recAny('learn',PGS.target&&PGS.target.t),vis:getComputedStyle(document.getElementById('pgSay')).visibility}));
R('t6 낱말 단계 🔊 = 녹음 여부와 일치',(t6.rec&&t6.vis!=='hidden')||(!t6.rec&&t6.vis==='hidden'),t6);
// t7 오답 문구: 녹음 없는 목표면 '그림을 다시 봐'
const t7=await p.evaluate(async()=>{const S=PGS;const T=S.target.t;const f=[...document.querySelectorAll('.pgfish:not(.caught)')].find(e=>e.querySelector('.tag').textContent!==T);if(!f)return 'nofish';f.click();await new Promise(r=>setTimeout(r,300));return {msg:document.getElementById('pgMsg').textContent,rec:recAny('learn',T)}});
R('t7 오답 문구 조건부',(t7.rec&&/들어/.test(t7.msg))||(!t7.rec&&/그림을 다시/.test(t7.msg)),t7);
await p.evaluate(()=>pgStop());
// t8 책 도움(읽기 단계) → 다음 단추 반짝 + 안내
await p.evaluate(()=>{document.getElementById('pgOv').hidden=true;G.books={};save();openBook('b1')});
await p.waitForSelector('#sbText .sg',{timeout:30000});
const t8=await p.evaluate(async()=>{document.getElementById('bHelp').click();await new Promise(r=>setTimeout(r,200));return {glow:document.getElementById('sbNext').classList.contains('pghint'),msg:document.getElementById('bkMsg').textContent}});
R('t8 책 도움(읽기) 반응',t8.glow&&/다음/.test(t8.msg),t8);
// t9 녹음이 생기면 안내 문구가 소리로 (가짜 녹음 주입)
await p.evaluate(()=>{document.getElementById('bookOv').hidden=true;try{bookClose()}catch(e){}});
const t9=await p.evaluate(async()=>{window.__played=[];const op=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.__played.push(this.src.split('/').pop());const el=this;setTimeout(()=>el.dispatchEvent(new Event('ended')),60);return Promise.resolve()};
 VAUD[vKey('narrator','반짝이는 걸 찾아봐!')]='audio/b5_001.mp3';VAUD[vKey('narrator',PGAMES.fish.how.ko)]='audio/b5_002.mp3';
 pgPlay('fish',1);await new Promise(r=>setTimeout(r,1200));const intro=window.__played.slice();
 document.getElementById('pgGo').click();await new Promise(r=>setTimeout(r,1600));window.__played=[];
 document.getElementById('pgHelp').click();await new Promise(r=>setTimeout(r,600));
 return {intro,help:window.__played.slice()}});
R('t9 설명(영웅 목소리 없으면 내레이터)·도움 문구가 녹음으로 재생',t9.intro.includes('b5_002.mp3')&&t9.help.includes('b5_001.mp3'),t9);
await p.evaluate(()=>pgStop());
console.log('pageerrors:',errs.length?errs.slice(0,3):'none');await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
