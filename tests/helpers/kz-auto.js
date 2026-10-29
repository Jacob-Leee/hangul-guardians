// in-page autoplayer for the case squad: one action per call. wrong=true taps a wrong answer when possible.
// reading missions (v29): read → 'I read it' → pick the right picture; wrong=true picks a wrong one first
window.RMAUTO=function(wrong){const o=document.getElementById('rmOv');if(!o||o.hidden)return 'none';const d=document.getElementById('rmDone');if(d&&!d.hidden){d.click();return 'click'}
 const all=[...o.querySelectorAll('.rmop')].filter(b=>!b.disabled);if(!all.length)return 'wait';
 if(o.querySelector('.rmword')){const w=o.querySelector('.rmword').textContent;const b=all.find(x=>wrong?x.dataset.t!==w:x.dataset.t===w)||all.find(x=>x.dataset.t===w);if(b){b.click();return 'click'}return 'wait'}
 const b=all.find(x=>wrong?x.dataset.ok!=='1':x.dataset.ok==='1')||all.find(x=>x.dataset.ok==='1');if(b){b.click();return 'click'}return 'wait'};
window.KZAUTO=function(wrong){{const r=RMAUTO(wrong);if(r!=='none')return r}if(!KZ)return 'none';if(KZ.done)return 'done';const P=$("kzPanel"),c=KZ.c,clk=e=>{e.click();return 'click'};
 const nx=P.querySelector(".kznext:not(:disabled)");if(nx&&!KZ.busy)return clk(nx);if(KZ.busy)return 'busy';
 const opt=(sel,ok)=>{const all=[...P.querySelectorAll(sel)].filter(b=>!b.disabled);const b=all.find(x=>wrong?!ok(x):ok(x));return b?clk(b):'none'};
 if(KZ.act===0)return opt(".kzop",b=>b.dataset.a===c.q.a[0]);
 if(KZ.act===1){const s=c.spots.find(x=>!x.decoy&&!KZ.found.includes(x.k));const d=c.spots.find(x=>x.decoy);const t=wrong&&d?d:s;if(!t)return 'wait';return clk($("kzSpots").querySelector(`[data-k="${t.k}"]`))}
 if(KZ.act===2){const S=KZ.ss;if(S.ph===0){const d=P.querySelector(".kzdone");if(d)return clk(d);const r=[...P.querySelectorAll(".kzw")].find((x,i)=>!S.heard.has(i));return r?clk(r):'wait'}
  if(S.ph===1)return opt(".kzw",b=>!!c.talk[+b.dataset.i].lie);const lie=c.talk.find(t=>t.lie);return opt(".kzop.ev",b=>lie.proof.includes(b.dataset.k))}
 if(KZ.act===3){const sk=c.sk;
  if(sk.type==="quiz"){const q=sk.qs[KZ.si];return q?opt(".kzq .kzop",b=>b.dataset.a===q.a[0]):'wait'}
  if(sk.type==="steps"){const s=sk.steps[KZ.si];return s?opt(".kzq .kzop",b=>b.dataset.a===s.a[0]):'wait'}
  if(sk.type==="fact")return opt(".kzop.st",b=>!!sk.st[+b.dataset.j][1]);
  if(sk.type==="fix"){const it=sk.items[KZ.si];if(!it)return 'wait';const S=KZ.ss;if(S.sub===0||S.k!==KZ.si){const toks=it.s.split(" ");return opt("[data-t]",b=>toks[+b.dataset.t]===it.bad)}return opt(".kzq [data-a]",b=>b.dataset.a===it.fix)}
  if(sk.type==="order"){const S=KZ.ss;return opt("[data-j]",b=>+b.dataset.j===(S.ord||[]).length)}
  if(sk.type==="who"){const q=sk.qs[KZ.si];return q?opt("[data-w]",b=>b.dataset.w===q.a):'wait'}}
 if(KZ.act===4){const d=c.ded[KZ.ss.d];return d?opt(".kzq [data-a]",b=>b.dataset.a===d.a):'wait'}
 return 'wait'};
