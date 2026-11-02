// in-page autoplayer: one action per call
/* TX: text with the 3D emoji pictures turned back into emoji (v29.3) */
const TX=e=>!e?'':window.emjText?emjText(e):e.textContent;
window.PGAUTO=function(wrong){const S=PGS;if(document.querySelector('.pgres'))return 'done';if(document.querySelector('.pgintro')){document.querySelector('#pgGo').click();return 'start'}if(!S||S.lock||!document.querySelector('#pgArea'))return 'wait';
 const T=S.target&&S.target.t,clk=e=>{e.click();return 'click'};
 if(S.g==='fish'){const fs=[...document.querySelectorAll('.pgfish:not(.caught):not(.catch)')];const f=fs.find(e=>wrong?e.querySelector('.tag').textContent!==T:e.querySelector('.tag').textContent===T);return f?clk(f):'none'}
 if(S.g==='mole'){const ms=[...document.querySelectorAll('.mole3.up')];const m=ms.find(e=>wrong?e.querySelector('.sign').textContent!==T:e.querySelector('.sign').textContent===T);return m?clk(m):'none'}
 if(S.g==='rain'){const ds=[...document.querySelectorAll('.rdrop2:not(.fade):not(.pop)')];const d=ds.find(e=>wrong?e.textContent!==T:e.textContent===T);return d?clk(d):'none'}
 if(S.g==='fill'){const o=[...document.querySelectorAll('.fopt:not(:disabled)')].find(e=>wrong?e.dataset.o!==T:e.dataset.o===T);return o?clk(o):'none'}
 if(S.g==='train'){let parts;if(S.lad&&S.lad.syl){const j=jamoOf(T);parts=[j.c,j.v]}else if(S.target.parts)parts=S.target.parts;else parts=[...T];
  const filled=document.querySelectorAll('#pgTrain .car.full').length+document.querySelectorAll('.dfly').length;const used=document.querySelectorAll('.blk.used').length;const next=parts[used];
  const b=[...document.querySelectorAll('.blk:not(.used)')].find(e=>wrong?e.textContent!==next:e.textContent===next);return b?clk(b):'none'}
 if(S.g==='trace'){const bx=document.querySelector('.trbox:not(.done)');if(!bx)return 'wait';
  const T2=bx.__trs,ink=bx.querySelector('canvas.trink');if(!T2||!ink)return 'wait';
  const r=ink.getBoundingClientRect(),sz=ink.width,sx=r.width/sz,sy=r.height/sz;
  const ev=(t,x,y)=>ink.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:r.left+x*sx,clientY:r.top+y*sy,pointerId:7,pointerType:'touch',isPrimary:true}));
  if(T2.font){const gd=bx.querySelector('canvas.trguide');const w=gd.width,h=gd.height,d=gd.getContext('2d').getImageData(0,0,w,h).data;
   const step=Math.max(4,Math.round(h*.05));
   for(let y=Math.round(step/2);y<h;y+=step){let run=false;
    for(let x=0;x<w;x+=3){const a=d[(y*w+x)*4+3]>60;
     if(a&&!run){run=true;ev('pointerdown',x,y)}else if(a&&run)ev('pointermove',x,y);
     else if(!a&&run){ev('pointerup',x-3,y);run=false}}if(run)ev('pointerup',w-2,y)}
   return 'click'}
  const p2=T2.strokes[T2.active];if(!p2)return 'wait';
  const trace=(pts,off)=>{ev('pointerdown',pts[0][0]+off,pts[0][1]);
   for(let s2=0;s2<pts.length-1;s2++){const a=pts[s2],b2=pts[s2+1],n=Math.max(2,Math.ceil(Math.hypot(b2[0]-a[0],b2[1]-a[1])/4));
    for(let i=1;i<=n;i++)ev('pointermove',a[0]+(b2[0]-a[0])*i/n+off,a[1]+(b2[1]-a[1])*i/n)}
   ev('pointerup',pts[pts.length-1][0]+off,pts[pts.length-1][1])};
  trace(p2,0);trace(p2,2.5);trace(p2,-2.5);
  return 'click'}
 if(S.g==='opp'){const o=[...document.querySelectorAll('.opcard')].find(e=>wrong?e.dataset.t!==T:e.dataset.t===T);return o?clk(o):'none'}
 if(S.g==='pair'){if(!S.started)return 'wait';const open=[...document.querySelectorAll('.pcard.up:not(.done)')];if(open.length>=2)return 'wait';
  const cards=[...document.querySelectorAll('.pcard:not(.done)')];if(wrong&&!open.length){const w=cards.filter(c=>c.querySelector('.cw'));if(w.length>=2){w[0].click();setTimeout(()=>w[1].click(),50);return 'click'}}
  const pic2t=Object.fromEntries(S.pool.map(x=>[x.p,x.t]));
  if(open.length===1){const o=open[0],k=o.querySelector('.cw')?o.querySelector('.cw').textContent:pic2t[TX(o.querySelector('.cpic'))];const m=cards.find(c=>c!==o&&(c.querySelector('.cw')?c.querySelector('.cw').textContent===k&&!o.querySelector('.cw'):pic2t[TX(c.querySelector('.cpic'))]===k&&!!o.querySelector('.cw')));return m?clk(m):'none'}
  const pc=cards.find(c=>c.querySelector('.cpic')&&!c.classList.contains('up'));return pc?clk(pc):'none:'+cards.length+':'+open.length}
 return '?'};
/* v30.8: 글자 공장 + 받아쓰기 드라이버 */
window.PGAUTO_EXT=1;
(function(){var base=window.PGAUTO;
/* v31 drivers: 🏭 조립 공장(맞는 조각 / wrong이면 틀린 조각) · 📝 받아쓰기(정답 획을 손글씨처럼 그려서 '다 썼어요') */
function drawStrokes(ink,strokes){const r=ink.getBoundingClientRect(),sx=r.width/100,sy=r.height/100;
 const ev=(t,p)=>ink.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:r.left+p[0]*sx,clientY:r.top+p[1]*sy,pointerId:7,pointerType:'touch',isPrimary:true}));
 strokes.forEach(st=>{const pts=[];for(let i=0;i<st.length-1;i++){const a=st[i],b=st[i+1],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/1.5));for(let k=0;k<n;k++)pts.push([a[0]+(b[0]-a[0])*k/n+(Math.random()-.5)*.8,a[1]+(b[1]-a[1])*k/n+(Math.random()-.5)*.8])}
  pts.push(st[st.length-1]);ev('pointerdown',pts[0]);pts.slice(1).forEach(p=>ev('pointermove',p));ev('pointerup',pts[pts.length-1])})}
window.PGDRAW=drawStrokes;
window.PGAUTO=function(wrong){const S=PGS;
 if(S&&!document.querySelector('.pgres')&&!document.querySelector('.pgintro')&&!S.lock){
  if(S.g==='asm'){const st=document.querySelector('.asm3');const H=st&&st.__asm;if(!H||!H.need)return 'wait';
   const b=[...document.querySelectorAll('.asmblk:not(.used)')].find(e=>wrong?e.dataset.ch!==H.need:e.dataset.ch===H.need);
   return b?(b.click(),'click'):'wait'}
  if(S.g==='dict'){const fl=document.querySelector('.dcflash');if(fl&&!fl.hidden&&!fl.classList.contains('out'))return 'wait';
   const bx=[...document.querySelectorAll('.dcbox2')].find(b=>b.__dc&&!b.__dc.done&&!b.__dc.n);
   if(bx){const ch=bx.__dc.ch;let tgt=ch;
    if(wrong){const rv=HSTK.rivals(ch).filter(x=>HSTK.charParts(x));tgt=rv.length?rv[0]:ch}
    drawStrokes(bx.querySelector('canvas.dcink'),HSTK.charStrokes(tgt));return 'draw'}
   const d=document.querySelector('.dcdone');if(d){const before=[...document.querySelectorAll('.dcbox2.bad')].length;d.click();
    /* 틀린 칸은 지우고 다시 (다음 호출에서 정답으로) */
    [...document.querySelectorAll('.dcbox2')].forEach(b=>{if(b.__dc&&!b.__dc.done&&b.__dc.n){const x=b.querySelector('.dcclr');x&&x.click()}});
    return 'click'}
   return 'wait'}}
 return base(wrong)};
})();
