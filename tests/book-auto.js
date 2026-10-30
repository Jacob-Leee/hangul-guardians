// Plays ANY storybook from its data (BD[id]) to the end: prologue pages, reading missions, explore, choose (one wrong answer
// first), fix, the scripted change, page order, the restored story and the shelf. Works for new books without writing a test.
// node tests/book-auto.js index.html b2 [phone]     (screenshots in tests/out/book_<id>_*.png; SW=1500 waits before each page shot)
const {chromium}=require('playwright');const OUTD=require('path').join(__dirname,'out');require('fs').mkdirSync(OUTD,{recursive:true});
const FILE=process.argv[2],ID=process.argv[3]||'b2',phone=process.argv[4]==='phone';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:phone?{width:390,height:844}:{width:1024,height:768}});const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 p.on('requestfailed',r=>errs.push('requestfailed: '+r.url().split('/').slice(-2).join('/')));
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};const q=[];let cur=null;
  const tick=()=>{if(cur||!q.length)return;cur=q.shift();const me=cur;setTimeout(()=>{if(cur!==me)return;cur=null;me.onend&&me.onend();tick()},60+me.text.length*6)};
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],get speaking(){return !!cur},speak:u=>{q.push(u);tick()},cancel:()=>{q.length=0;cur=null},addEventListener(){}}})});
 await p.goto('file://'+require('path').resolve(FILE));await p.waitForTimeout(500);
 await p.evaluate(()=>{document.querySelector('#spGo').click()});await p.waitForTimeout(300);
 await p.evaluate(()=>{const b=document.querySelector('#tBtns .btn.pri');b&&b.click()});await p.waitForTimeout(700);
 const ready=await p.evaluate(id=>({ready:!!(BOOKS.find(b=>b.id===id)||{}).ready,missions:!!(RMS[id])}),ID);
 await p.evaluate(id=>openBook(id),ID);await p.waitForTimeout(800);
 const log=[];let shots=0,missions=0,lastSig='',same=0;const t0=Date.now();const W=ms=>p.waitForTimeout(ms);
 const shot=async n=>{await p.screenshot({path:`${OUTD}/book_${ID}_${phone?'P':'T'}_${String(shots++).padStart(2,'0')}_${n}.png`})};
 while(Date.now()-t0<240000){
  const st=await p.evaluate(()=>{if(!BK)return {gone:1};const D=BK.D,S=D.steps[BK.si]||{};const rm=!$("rmOv").hidden;
   return {si:BK.si,type:S.type||(BK.si>=D.steps.length?'done':'pro'),busy:!!BK.busy,rm,rmDone:rm&&!$("rmDone").hidden,
    next:!!document.querySelector('#sbNext'),bnext:!!document.querySelector('#bNext'),shelf:!!document.querySelector('#bShelf'),
    pn:(document.querySelector('.sbnav .pn')||{}).textContent||'',ph:BK.ss&&BK.ss.ph,qi:BK.ss&&BK.ss.qi,ord:BK.ss&&BK.ss.ord&&BK.ss.ord.length,
    broken:[...document.querySelectorAll('#bookOv img')].filter(i=>i.complete&&i.getAttribute('src')&&i.naturalWidth===0).map(i=>i.getAttribute('src'))}});
  if(st.gone){log.push('book closed');break}
  if(st.broken.length)errs.push('broken img '+st.broken.join(','));
  const sig=JSON.stringify([st.si,st.type,st.rm,st.pn,st.ph,st.qi,st.ord,st.next,st.bnext]);if(sig===lastSig)same++;else{same=0;lastSig=sig}
  if(same>60){log.push('STUCK '+sig);await shot('stuck');break}
  if(st.shelf){await shot('finish');log.push('finished');break}
  if(st.rm){if(st.rmDone){missions++;await shot('mission'+missions);await p.evaluate(()=>$("rmDone").click())}else await p.evaluate(()=>{const b=document.querySelector('#rmQ .rmop[data-ok="1"]:not(:disabled)');b&&b.click()});await W(500);continue}
  if(st.busy){await W(400);continue}
  if(st.next){if(same===0){await W(+process.env.SW||0);}if(same===0)await shot('page_'+st.pn.replace(/\D+/g,'-'));await W(900);await p.evaluate(()=>{const n=document.querySelector('#sbNext');n&&n.click()});await W(400);continue}
  if(st.type==='explore'){const did=await p.evaluate(()=>{const h=document.querySelector('.bhot:not(.found)');if(h){h.click();return 'hot'}const n=document.querySelector('#bNext');if(n){n.click();return 'next'}return ''});if(did==='next')await shot('explored');await W(900);continue}
  if(st.type==='choose'){await p.evaluate(()=>{const D=BK.D,S=D.steps[BK.si],Q=S.qs[BK.ss.qi];if(!Q)return;
    if(BK.ss.ph==='who'){const bs=[...document.querySelectorAll('#bQ [data-who]:not(:disabled)')];const wrong=bs.find(b=>b.dataset.who!==Q.a);if(!BK.__w&&wrong){BK.__w=1;wrong.click();return}BK.__w=0;const r=bs.find(b=>b.dataset.who===Q.a);r&&r.click()}
    else{const rs=[...document.querySelectorAll('#bQ [data-rec]:not(:disabled)')];const r=rs.find(x=>Q.ev.includes(x.dataset.rec));r&&r.click()}});await W(900);continue}
  if(st.type==='fix'){await p.evaluate(()=>{const D=BK.D;const t=document.querySelector(`#bQ [data-tk="${D.sentence.bad}"]`);if(t&&!t.disabled&&!document.querySelector('#bQ [data-fix]')){t.click();return}const f=document.querySelector(`#bQ [data-fix="${D.sentence.fix}"]`);f&&f.click()});await W(900);continue}
  if(st.type==='script'){if(st.bnext){await shot('changed');await p.evaluate(()=>document.querySelector('#bNext').click())}await W(700);continue}
  if(st.type==='order'){await p.evaluate(()=>{const n=BK.ss.ord.length;const b=document.querySelector(`#bQ [data-pg="${n}"]:not(:disabled)`);b&&b.click()});await W(1200);continue}
  await W(500)}
 const res=await p.evaluate(id=>({book:G.books[id],days:G.days[dkey()]}),ID);
 console.log(JSON.stringify({ready,missions,log,book:res.book,dayRm:res.days&&res.days.rm,secs:Math.round((Date.now()-t0)/1000)}));
 console.log('errors',JSON.stringify(errs.slice(0,10)));await b.close()})();
