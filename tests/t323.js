// v45: 카드 크기 통일 · 카드 배틀 크게 · 별 위 숫자 삭제 · 카드 뒷면 = 짝꿍 🐾
const {chromium}=require('playwright');
const stub=()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>{try{el.dispatchEvent(new Event('ended'))}catch(e){}},60);return Promise.resolve()}};
const R=(n,ok,x)=>console.log((ok?'PASS':'FAIL')+' '+n+(x!==undefined?' | '+JSON.stringify(x):''));
(async()=>{const b=await chromium.launch();const errs=[];
const open=async vp=>{const p=await b.newPage({viewport:vp});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(stub);
 await p.goto('http://localhost:8814/game_new.html');await p.waitForTimeout(1500);
 await p.evaluate(()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});G.char='tiger';G.name='t';G.autoRead=false;G.rmOff=1;G.lang='ko';
  G.cards={own:{tiger:1,rat:0,dog:0,bk_yong:2,bk_cat:0,beaver:1,v_gray:1},q:[{id:'bk_owl',r:0}]};save();renderAll()});return p};
const battle=async p=>{await p.evaluate(()=>pgPlay('ncard',1));await p.waitForTimeout(400);await p.evaluate(()=>{const g=document.getElementById('pgGo');if(g)g.click()});await p.waitForTimeout(1800)};
const measure=p=>p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]};
 const hand=[...document.querySelectorAll('.nchc.nc2')],foe=document.querySelector('.ncv.nc2'),nc=document.querySelector('.nc2wrap'),area=document.getElementById('pgArea');
 const dots=[...document.querySelectorAll('.ncdots i')].map(i=>Math.round(i.getBoundingClientRect().width));
 return {hand:hand.map(R),foe:R(foe),foeAR:+(foe.getBoundingClientRect().width/foe.getBoundingClientRect().height).toFixed(3),
  num:document.querySelectorAll('#pgArea .num').length,cnt:hand.map(h=>[+h.getAttribute('aria-label'),h.querySelectorAll('.ncdots i').length]),
  foeCnt:[+foe.getAttribute('aria-label'),foe.querySelectorAll('.ncdots i').length],dots:[...new Set(dots)],fill:+(nc.getBoundingClientRect().height/area.clientHeight).toFixed(2),
  cols:getComputedStyle(nc).getPropertyValue('--cols').trim(),arts:hand.map(h=>h.querySelector('img').getAttribute('src').split('/').pop().slice(0,24))}});
// ---------- 아이패드 가로 ----------
let p=await open({width:1180,height:820});
await battle(p);
let m=await measure(p);
const same=a=>a.every(x=>Math.abs(x[0]-a[0][0])<=1&&Math.abs(x[1]-a[0][1])<=1);
R('t1 손패 4장 크기 같음(아이패드)',m.hand.length===4&&same(m.hand),m.hand);
R('t2 카드 크게: 손패 폭 ≥150px, 경기장이 칸을 채움',m.hand[0][0]>=150&&m.fill>=0.9,{w:m.hand[0][0],fill:m.fill,cols:m.cols});
R('t3 별 위 검정 숫자 없음',m.num===0,m.num);
R('t4 점 개수 = 카드 수 (손패·악당)',m.cnt.every(c=>c[0]===c[1])&&m.foeCnt[0]===m.foeCnt[1],{hand:m.cnt,foe:m.foeCnt});
R('t5 점 크기 모두 같음',m.dots.length===1,m.dots);
R('t6 악당 카드 39:50',Math.abs(m.foeAR-0.78)<0.02,m.foeAR);
// t7 게임 진행: 정답 카드 → 크리티컬 낱말 → 다음 판
const t7=await p.evaluate(async()=>{const A=document.getElementById('pgArea'),S=PGS,d0=S.done;const pick=A.__nc.pick;
 pick.forEach(i=>document.querySelector('.nchc[data-i="'+i+'"]').click());await new Promise(r=>setTimeout(r,700));
 const cr=document.querySelector('.nccrit');if(!cr)return {cr:false};const ans=A.__nc.word.ans;[...cr.querySelectorAll('.ncwo')].find(b=>b.dataset.t===ans).click();
 await new Promise(r=>setTimeout(r,1300));return {cr:true,done:PGS.done-d0,hand:document.querySelectorAll('.nchc.nc2').length,dots:document.querySelectorAll('.nchc.nc2 .ncdots').length}});
R('t7 카드 내기 → 크리티컬 → 다음 판',t7.cr&&t7.done===1&&t7.hand===4&&t7.dots===4,t7);
await p.evaluate(()=>{pgStop();document.getElementById('pgOv').hidden=true});
// t8 허브: 영웅·악당 카드 같은 크기, 이름은 카드 안 양피지
const t8=await p.evaluate(()=>{cardArena();const c=[...document.querySelectorAll('.caduel .cac')].map(e=>{const r=e.getBoundingClientRect(),n=e.querySelector('.can').getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),ny:+((n.top+n.height/2-r.top)/r.height).toFixed(2)}});
 const h2=document.querySelector('.crscard.arena h2').innerHTML;cardOv().hidden=true;return {c,paw:/pawi/.test(h2),hwatu:/🎴/.test(h2)}});
R('t8 허브 카드 같은 크기·이름 위치·제목 아이콘',t8.c.length===2&&t8.c[0].w===t8.c[1].w&&t8.c[0].h===t8.c[1].h&&t8.c.every(x=>x.ny>0.68&&x.ny<0.9)&&t8.paw&&!t8.hwatu,t8);
// t9 도감: 영웅 카드 = 잠긴 칸 크기, 맞춤 그림
const t9=await p.evaluate(async()=>{cardBook();await new Promise(r=>setTimeout(r,300));const own=document.querySelector('.cbslot.has .ccard.tcg'),lock=document.querySelector('.cbslot.lock .ccard');
 const R=e=>{const r=e.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]};const img=own.querySelector('.tcgi');const ir=img.getBoundingClientRect(),cr=own.getBoundingClientRect();
 const r={own:R(own),lock:R(lock),fit:img.classList.contains('tfit'),cover:+(ir.height/cr.height).toFixed(2),openBtn:/pawi/.test((document.getElementById('cbOpen')||{}).innerHTML||'')};cardOv().hidden=true;return r});
R('t9 도감 카드 크기 통일',t9.own[0]===t9.lock[0]&&t9.own[1]===t9.lock[1]&&t9.fit&&t9.cover>=0.8&&t9.openBtn,t9);
// t10 카드 뒷면(수수께끼 개봉) = 짝꿍 🐾 뒷면
const t10=await p.evaluate(async()=>{cardOpenNext();await new Promise(r=>setTimeout(r,300));const id=G.cards.q[0].id;document.querySelector('.cdface[data-id="'+id+'"]').click();await new Promise(r=>setTimeout(r,100));
 const bk=document.querySelector('.cdflip .cback.pawb img');const r={back:!!bk,src:bk?bk.getAttribute('src').split('/').pop():null,h2:/pawi/.test(document.querySelector('.cardcard h2').innerHTML)};cardOv().hidden=true;return r});
R('t10 카드 뒷면 = 짝꿍 뒷면 그림',t10.back&&/pair_back_tall/.test(t10.src)&&t10.h2,t10);
// t11 오른쪽 새 카드 토글 = 카드 뒷면 그림 + 숫자, 화투 이모지 없음
const t11=await p.evaluate(()=>{G.cards.q=[{id:'dog',r:0},{id:'gull',r:0}];save();cardChip();const c=document.getElementById('cardChip');const r=c.getBoundingClientRect();
 return {img:!!c.querySelector('img[src*="pair_back_tall"]'),n:c.querySelector('b').textContent,txt:/🎴/.test(c.innerHTML),w:Math.round(r.width),h:Math.round(r.height),menu:!!document.querySelector('#extras [data-x="cards"] .ic img.pawi')}});
R('t11 새 카드 토글·메뉴 아이콘 = 🐾 카드 뒷면',t11.img&&t11.n==='2'&&!t11.txt&&t11.w>=44&&t11.h>=44&&t11.menu,t11);
// t12 녹음 키: 토스트 문구의 이모지만 바뀜 → 녹음 대본 줄과 같은 키
const t12=await p.evaluate(()=>{const a=vKey('narrator','새 카드가 도착했어! 🐾 단추를 눌러 열어 봐.'),b0=vKey('narrator','새 카드가 도착했어! 🎴 단추를 눌러 열어 봐.'),c=vKey('narrator','새 카드가 도착했어! 단추를 눌러 열어 봐.');return {same:a===b0&&b0===c,a,c}});
R('t12 토스트 녹음 키 그대로',t12.same,t12);
await p.close();
// ---------- 폰 세로 ----------
p=await open({width:390,height:844});
await battle(p);m=await measure(p);
R('t13 폰: 2x2 손패, 같은 크기, 폭 ≥110px',m.cols==='2'&&same(m.hand)&&m.hand[0][0]>=110&&m.fill>=0.9,{hand:m.hand,cols:m.cols,fill:m.fill});
const t14=await p.evaluate(()=>{const els=[...document.querySelectorAll('#pgArea .nchc,#pgArea .ncv,#pgArea .ncask,#pgArea .ncside')];const W=innerWidth;return els.every(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=W})});
R('t14 폰: 화면 밖으로 넘치는 것 없음',t14,t14);
await p.close();
console.log('pageerrors:',errs.length?errs.slice(0,3):'none');await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
