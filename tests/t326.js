// v46c 읽기 점검: 첫날 A 대기 · 30문항 + 1분 글 · 저장 · 리포트 코드에 포함 · 14일째 B + 차이 · 부모 리포트 막대
const {chromium}=require('playwright');
const R=(n,ok,x)=>console.log((ok?'PASS':'FAIL')+' '+n+(x!==undefined?' | '+JSON.stringify(x):''));
const stub=()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speak:u=>setTimeout(()=>u.onend&&u.onend(),40),cancel:()=>{},addEventListener(){}}});HTMLMediaElement.prototype.play=function(){const el=this;setTimeout(()=>{try{el.dispatchEvent(new Event('ended'))}catch(e){}},60);return Promise.resolve()}};
async function runCheck(p,f,pattern,errs){return p.evaluate(async([f,pattern,errs])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));GATE.until=Date.now()+600000;showSettings();await w(150);
 document.querySelector('[data-rcgo="'+f+'"]').click();await w(100);document.getElementById('rcGo').click();await w(80);
 const seen=[];for(let k=0;k<30;k++){seen.push(document.querySelector('.rcbig').textContent);const ok=pattern[Math.floor(k/10)][k%10]==='1';document.querySelector('[data-rc="'+(ok?1:0)+'"]').click();await w(20)}
 const words=document.querySelectorAll('#rcText [data-wi]').length;document.getElementById('rcStart').click();await w(2100);document.getElementById('rcEnd').click();await w(80);
 for(let i=0;i<errs;i++)document.getElementById('rcP').click();document.getElementById('rcSave').click();await w(100);
 return {seen,words,res:(document.querySelector('.rcres')||{}).textContent,last:G.beta.rc[G.beta.rc.length-1]}},[f,pattern,errs])}
(async()=>{const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:1180,height:820}});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(stub);
 await p.goto('http://localhost:8814/game_new.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(1500);
 const t1=await p.evaluate(()=>{['splashOv','titleOv'].forEach(i=>{const s=document.getElementById(i);if(s)s.hidden=true});G.char='tiger';save();renderAll();const c=document.getElementById('betaChip');return {pend:betaPending(),chip:c&&!c.hidden?c.textContent:null}});
 R('t1 첫날: 읽기 점검 A 대기 + 칩',t1.pend.join()==='rcA'&&t1.chip==='🔒 1',t1);
 const pA=['1111111100','1111111000','1111100000'];
 const a=await runCheck(p,'A',pA,2);
 const F=await p.evaluate(()=>rcBeta.forms.A);
 R('t2 A: 글자→받침 없는 낱말→받침 있는 낱말 순서로 30개',a.seen.join()===[...F.syl,...F.open,...F.closed].join()&&a.words===37,{n:a.seen.length,words:a.words});
 R('t3 A 저장: 점수 8·7·5, 표시, 1분 환산',a.last.f==='A'&&a.last.s.join()==='8,7,5'&&a.last.m[0]===pA[0]&&a.last.ws===37&&a.last.e===2&&a.last.w===Math.round(35*60/a.last.t)&&/글자 8/.test(a.res),{s:a.last.s,w:a.last.w,t:a.last.t,res:a.res});
 const t4=await p.evaluate(()=>({pend:betaPending(),chipHidden:document.getElementById('betaChip').hidden}));
 R('t4 A 뒤에는 대기 없음',t4.pend.length===0&&t4.chipHidden,t4);
 const t5=await p.evaluate(()=>{const c=betaReport();const bin=atob(c.slice(5).replace(/-/g,'+').replace(/_/g,'/'));const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);const o=JSON.parse(new TextDecoder().decode(u));return {rc:o.rc.length,f:o.rc[0].f,s:o.rc[0].s}});
 R('t5 리포트 코드에 읽기 점검 포함',t5.rc===1&&t5.f==='A'&&t5.s.join()==='8,7,5',t5);
 // 14일째: B
 await p.evaluate(()=>{document.getElementById('setOv').hidden=true;const d=new Date();d.setDate(d.getDate()-13);G.beta.d0=dkey(d);G.beta.q1=1;G.beta.r7={s:4,t:'',g:'',d:'x'};save()});await p.reload();await p.waitForTimeout(1500);
 const t6=await p.evaluate(()=>({day:betaDay(),pend:betaPending()}));
 R('t6 14일째: 읽기 점검 B + 14일째 평가 대기',t6.day===14&&t6.pend.includes('rcB')&&t6.pend.includes('r14'),t6);
 const bB=await runCheck(p,'B',['1111111110','1111111100','1111111000'],1);
 const FB=await p.evaluate(()=>rcBeta.forms.B);
 R('t7 B: 다른 문항(같은 짜임) · 저장 · 차이 표시',bB.seen.join()===[...FB.syl,...FB.open,...FB.closed].join()&&bB.last.f==='B'&&bB.last.s.join()==='9,8,7'&&/\(\+1 · \+1 · \+2/.test(bB.res),{s:bB.last.s,res:bB.res});
 const t8=await p.evaluate(()=>{document.getElementById('setOv').hidden=true;showPartner();const d=document.getElementById('pRc');return d?{bars:d.querySelectorAll('.rcbars i').length,h:d.querySelector('h3').textContent}:null});
 R('t8 부모 리포트: 첫날 vs 14일째 막대',t8&&t8.bars===8&&/A/.test(t8.h)&&/B/.test(t8.h),t8);
 // 겹치는 문항 없음 + 게임 글자에 없는 낱말 (빌드 시점 대조는 make 단계에서, 여기선 A/B 겹침만)
 const t9=await p.evaluate(()=>{const A=rcBeta.forms.A,B=rcBeta.forms.B;const all=[...A.open,...A.closed,...B.open,...B.closed];return {dup:all.length-new Set(all).size,wa:A.text.split(' ').length,wb:B.text.split(' ').length}});
 R('t9 A·B 낱말 겹침 없음 · 글 37어절씩',t9.dup===0&&t9.wa===37&&t9.wb===37,t9);
 console.log('pageerrors:',errs.length?errs.slice(0,3):'none');await b.close()})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
