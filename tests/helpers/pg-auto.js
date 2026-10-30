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
 if(S.g==='trace'){const c=document.querySelector('.trbox:not(.done) canvas.trink');if(!c)return 'wait';
  const r=c.getBoundingClientRect(),ev=(t,x,y)=>c.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:r.left+x,clientY:r.top+y,pointerId:7,pointerType:'touch',isPrimary:true}));
  for(let y=r.height*.06;y<r.height*.97;y+=Math.max(5,r.height*.05)){ev('pointerdown',r.width*.04,y);
   for(let x=r.width*.04;x<=r.width*.97;x+=Math.max(5,r.width*.06))ev('pointermove',x,y);ev('pointerup',r.width*.96,y)}
  return 'click'}
 if(S.g==='pair'){if(!S.started)return 'wait';const open=[...document.querySelectorAll('.pcard.up:not(.done)')];if(open.length>=2)return 'wait';
  const cards=[...document.querySelectorAll('.pcard:not(.done)')];if(wrong&&!open.length){const w=cards.filter(c=>c.querySelector('.cw'));if(w.length>=2){w[0].click();setTimeout(()=>w[1].click(),50);return 'click'}}
  const pic2t=Object.fromEntries(S.pool.map(x=>[x.p,x.t]));
  if(open.length===1){const o=open[0],k=o.querySelector('.cw')?o.querySelector('.cw').textContent:pic2t[TX(o.querySelector('.cpic'))];const m=cards.find(c=>c!==o&&(c.querySelector('.cw')?c.querySelector('.cw').textContent===k&&!o.querySelector('.cw'):pic2t[TX(c.querySelector('.cpic'))]===k&&!!o.querySelector('.cw')));return m?clk(m):'none'}
  const pc=cards.find(c=>c.querySelector('.cpic')&&!c.classList.contains('up'));return pc?clk(pc):'none:'+cards.length+':'+open.length}
 return '?'};
