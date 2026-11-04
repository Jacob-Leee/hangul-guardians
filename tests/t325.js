// v46b 처음 일주일 단순하게: 새 아이만 · 메뉴 단계적 공개 · 스승님 소개 · 도서관 해님 돌 3개 · 8일째 한 바퀴 · 기존 기기 그대로
const {chromium}=require('playwright');
const R=(n,ok,x)=>console.log((ok?'PASS':'FAIL')+' '+n+(x!==undefined?' | '+JSON.stringify(x):''));
const stub=()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>{try{el.dispatchEvent(new Event('ended'))}catch(e){}},60);return Promise.resolve()}};
const shown=p=>p.evaluate(()=>[...document.querySelectorAll('#extras .xbtn')].filter(b=>b.style.display!=='none').map(b=>b.dataset.x));
(async()=>{const b=await chromium.launch();const errs=[];const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(stub);
 await p.goto('http://localhost:8814/game_new.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(1500);
 // 진짜 새 아이처럼 스플래시 '모험 시작'
 await p.evaluate(()=>{const s=document.getElementById('splashOv');if(s&&s.hidden)splash&&splash();});
 const t1=await p.evaluate(async()=>{const sp=document.getElementById('splashOv');sp.hidden=false;document.getElementById('spGo').click();await new Promise(r=>setTimeout(r,400));
  document.getElementById('titleOv').hidden=true;G.char='tiger';G.name='t';G.autoRead=false;G.rmOff=1;G.view='library';save();renderAll();await new Promise(r=>setTimeout(r,300));return obState()});
 R('t1 새 아이: 처음 일주일 모드 켜짐 · 오늘의 모험 3가지',t1.on&&t1.day===1&&t1.tdLen==='short',{on:t1.on,day:t1.day,tdLen:t1.tdLen});
 let x=await shown(p);
 R('t2 처음 메뉴: 놀이터만 (사건·카드·본부·섬·더보기 숨김)',x.includes('play')&&!['case','cards','hq','more','island','course','battle','stk'].some(k=>x.includes(k)),x);
 // 1권 끝: 카드·본부 열림 + 스승님 소개
 await p.evaluate(()=>{G.books={b1:{done:1,stars:2}};G.cards={own:{},q:[{id:'bk_turtle',r:0}]};G.hq=Object.assign(G.hq||{},{got:{book_b1:Date.now()}});save();renderAll()});
 await p.waitForTimeout(1800);
 const t3=await p.evaluate(()=>({menu:[...document.querySelectorAll('#extras .xbtn')].filter(b=>b.style.display!=='none').map(b=>b.dataset.x),dlg:!document.getElementById('dlgOv').hidden,txt:document.getElementById('dText').textContent,nm:document.getElementById('dName').textContent,btn:[...document.querySelectorAll('#dBtns button')].map(b=>b.textContent)}));
 R('t3 1권 끝: 카드·본부 열림 + 스승님 소개 1번',t3.menu.includes('cards')&&t3.menu.includes('hq')&&!t3.menu.includes('case')&&t3.dlg&&/카드와 보물/.test(t3.txt)&&t3.nm==='거북이 스승님'&&t3.btn.join()==='나중에,카드 배틀',t3);
 await p.evaluate(()=>{document.querySelector('#dBtns button').click()});
 // 2일째: 사건·섬·오늘의 모험 + 도서관 해님 돌
 await p.evaluate(()=>{const y=new Date();y.setDate(y.getDate()-1);G.ob.d0=dkey(y);G.days[dkey(y)]={min:12,games:2};dayLog(D=>{D.min=Math.max(D.min,2)});G.ob.last=0;save();renderAll()});
 await p.waitForTimeout(1800);
 const t4=await p.evaluate(()=>({menu:[...document.querySelectorAll('#extras .xbtn')].filter(b=>b.style.display!=='none').map(b=>b.dataset.x),stones:[...document.querySelectorAll('.obtd .obst')].map(b=>b.dataset.obs),head:(document.querySelector('.obtd .obh')||{}).textContent,dlg:document.getElementById('dText').textContent,open:!document.getElementById('dlgOv').hidden,st:obState()}));
 R('t4 2일째: 사건·섬 열림 + 도서관 해님 돌 3개 + 소개',t4.menu.includes('case')&&t4.menu.includes('island')&&t4.stones.join()==='story,play,words'&&/0\/3|1\/3/.test(t4.head)&&t4.open&&/오늘의 모험/.test(t4.dlg),{menu:t4.menu,stones:t4.stones,head:t4.head,dlg:t4.dlg});
 await p.evaluate(()=>{document.querySelector('#dBtns button').click()});
 const t5=await p.evaluate(async()=>{document.querySelector('.obtd [data-obs="play"]').click();await new Promise(r=>setTimeout(r,500));const r={pg:!document.getElementById('pgOv').hidden,g:PGS&&PGS.g};pgStop();document.getElementById('pgOv').hidden=true;renderAll();return r});
 R('t5 해님 돌 "놀이 한 판" → 놀이터 게임 시작',t5.pg&&!!t5.g,t5);
 // 사건 소개(40초 간격 대신 바로)
 await p.evaluate(()=>{G.ob.last=0;save();renderAll()});await p.waitForTimeout(1800);
 const t6=await p.evaluate(()=>({open:!document.getElementById('dlgOv').hidden,txt:document.getElementById('dText').textContent}));
 R('t6 다음 소개: 사건 수사대',t6.open&&/사건 수사대/.test(t6.txt),t6);
 await p.evaluate(()=>{document.querySelector('#dBtns button').click()});
 // 3일째: 더보기
 await p.evaluate(()=>{const z=new Date();z.setDate(z.getDate()-2);G.ob.d0=dkey(z);G.days[dkey(z)]={min:9};G.ob.last=0;save();renderAll()});await p.waitForTimeout(1800);
 const t7=await p.evaluate(()=>({menu:[...document.querySelectorAll('#extras .xbtn')].filter(b=>b.style.display!=='none').map(b=>b.dataset.x),txt:document.getElementById('dText').textContent,open:!document.getElementById('dlgOv').hidden}));
 R('t7 3일째: 더보기(코스·배틀·스티커판) 열림 + 소개',['more','course','battle','stk'].every(k=>t7.menu.includes(k))&&t7.open&&/더보기/.test(t7.txt),t7);
 await p.evaluate(()=>{document.querySelector('#dBtns button').click()});
 // 8일째: 한 바퀴로 + 소개, 해님 돌 줄 없어짐
 await p.evaluate(()=>{const z=new Date();z.setDate(z.getDate()-7);G.ob.d0=dkey(z);G.ob.last=0;save();renderAll()});await p.waitForTimeout(1800);
 const t8=await p.evaluate(()=>({tdLen:G.tdLen,txt:document.getElementById('dText').textContent,open:!document.getElementById('dlgOv').hidden,stones:document.querySelectorAll('.obtd').length,day:obState().day}));
 R('t8 8일째: 오늘의 모험 한 바퀴 + 소개 · 해님 돌 줄 없음',t8.tdLen==='lap'&&t8.open&&/한 바퀴/.test(t8.txt)&&t8.stones===0&&t8.day===8,t8);
 await p.evaluate(()=>{document.querySelector('#dBtns button').click()});
 // 소개는 한 번씩만
 await p.evaluate(()=>{G.ob.last=0;save();renderAll()});await p.waitForTimeout(1800);
 const t9=await p.evaluate(()=>({open:!document.getElementById('dlgOv').hidden,next:obNext()}));
 R('t9 같은 소개는 다시 안 나옴',!t9.open&&t9.next===null,t9);
 // 기존 기기: 그대로
 const p2=await ctx.newPage();await p2.addInitScript(stub);await p2.goto('http://localhost:8814/game_new.html');
 await p2.evaluate(()=>{localStorage.setItem('hiq2',JSON.stringify({char:'tiger',lv:2,books:{b1:{done:1,stars:2}},lang:'ko',view:'library'}))});await p2.reload();await p2.waitForTimeout(1500);
 await p2.evaluate(()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});const sp=document.getElementById('spGo');sp.click();renderAll()});await p2.waitForTimeout(400);
 const t10=await p2.evaluate(()=>({on:obState().on,menu:[...document.querySelectorAll('#extras .xbtn')].filter(b=>b.style.display!=='none').map(b=>b.dataset.x),stones:document.querySelectorAll('.obtd').length}));
 R('t10 기존 기기: 메뉴 전부 · 해님 돌 줄 없음',!t10.on&&['play','case','cards','hq','more'].every(k=>t10.menu.includes(k))&&t10.stones===0,t10);
 console.log('pageerrors:',errs.length?errs.slice(0,3):'none');await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
