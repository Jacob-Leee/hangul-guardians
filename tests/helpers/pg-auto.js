// in-page autoplayer: one action per call
/* TX: text with the 3D emoji pictures turned back into emoji (v29.3) */
const TX=e=>!e?'':window.emjText?emjText(e):e.textContent;
window.PGAUTO=function(wrong){const S=PGS;if(document.querySelector('.pgres'))return 'done';if(document.querySelector('.pgintro')){document.querySelector('#pgGo').click();return 'start'}if(!S||S.lock||!document.querySelector('#pgArea'))return 'wait';
 const T=S.target&&S.target.t,clk=e=>{e.click();return 'click'};
 if(S.g==='fish'){const fs=[...document.querySelectorAll('.pgfish:not(.caught):not(.catch)')];const f=fs.find(e=>wrong?e.querySelector('.tag').textContent!==T:e.querySelector('.tag').textContent===T);return f?clk(f):'none'}
 if(S.g==='mole'){const ms=[...document.querySelectorAll('.mole3.up')];const m=ms.find(e=>wrong?e.querySelector('.sign').textContent!==T:e.querySelector('.sign').textContent===T);return m?clk(m):'none'}
 if(S.g==='rain'){const ds=[...document.querySelectorAll('.rdrop2:not(.fade):not(.pop)')];const d=ds.find(e=>wrong?e.textContent!==T:e.textContent===T);return d?clk(d):'none'}
 if(S.g==='fill'){const o=[...document.querySelectorAll('.fopt:not(:disabled)')].find(e=>wrong?e.dataset.o!==T:e.dataset.o===T);return o?clk(o):'none'}
 if(S.g==='train'){let parts;if(S.lv<=2){const j=jamoOf(T);parts=[j.c,j.v]}else if(S.target.parts)parts=S.target.parts;else parts=[...T];
  const filled=document.querySelectorAll('#pgTrain .car.full').length+document.querySelectorAll('.dfly').length;const used=document.querySelectorAll('.blk.used').length;const next=parts[used];
  const b=[...document.querySelectorAll('.blk:not(.used)')].find(e=>wrong?e.textContent!==next:e.textContent===next);return b?clk(b):'none'}
 if(S.g==='trace'){const bx=document.querySelector('.trbox:not(.done)');if(!bx)return 'wait';
  const gd=bx.querySelector('canvas.trguide'),ink=bx.querySelector('canvas.trink');if(!gd||!ink)return 'wait';
  const w=gd.width,h=gd.height,d=gd.getContext('2d').getImageData(0,0,w,h).data;
  const r=ink.getBoundingClientRect(),sx=r.width/w,sy=r.height/h;
  const ev=(t,x,y)=>ink.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:r.left+x*sx,clientY:r.top+y*sy,pointerId:7,pointerType:'touch',isPrimary:true}));
  const step=Math.max(4,Math.round(h*.05));
  for(let y=Math.round(step/2);y<h;y+=step){let run=false;
   for(let x=0;x<w;x+=3){const a=d[(y*w+x)*4+3]>60;
    if(a&&!run){run=true;ev('pointerdown',x,y)}
    else if(a&&run)ev('pointermove',x,y);
    else if(!a&&run){ev('pointerup',x-3,y);run=false}}
   if(run)ev('pointerup',w-2,y)}
  return 'click'}
 if(S.g==='opp'){const o=[...document.querySelectorAll('.opcard')].find(e=>wrong?e.dataset.t!==T:e.dataset.t===T);return o?clk(o):'none'}
 if(S.g==='pair'){if(!S.started)return 'wait';const open=[...document.querySelectorAll('.pcard.up:not(.done)')];if(open.length>=2)return 'wait';
  const cards=[...document.querySelectorAll('.pcard:not(.done)')];if(wrong&&!open.length){const w=cards.filter(c=>c.querySelector('.cw'));if(w.length>=2){w[0].click();setTimeout(()=>w[1].click(),50);return 'click'}}
  const pic2t=Object.fromEntries(S.pool.map(x=>[x.p,x.t]));
  if(open.length===1){const o=open[0],k=o.querySelector('.cw')?o.querySelector('.cw').textContent:pic2t[TX(o.querySelector('.cpic'))];const m=cards.find(c=>c!==o&&(c.querySelector('.cw')?c.querySelector('.cw').textContent===k&&!o.querySelector('.cw'):pic2t[TX(c.querySelector('.cpic'))]===k&&!!o.querySelector('.cw')));return m?clk(m):'none'}
  const pc=cards.find(c=>c.querySelector('.cpic')&&!c.classList.contains('up'));return pc?clk(pc):'none:'+cards.length+':'+open.length}
 return '?'};
