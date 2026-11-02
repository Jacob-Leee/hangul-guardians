// 받아쓰기 채점기 보정 시험 (v31): 아이 글씨를 흉내(흔들림·비율·위치·펜 떼기·이어 쓰기·순서·방향) 내서
// 정답은 통과하고, 철자 실수(헷갈리는 자모)·받침 빠짐·획 빠짐·군더더기 줄은 걸러지는지 잰다.
// 채점기 코드는 js/app.js 안의 v30h 블록을 그대로 꺼내 쓴다(복사본 없음).
// 실행: node tests/dictation-calibrate.js            (전체 71글자 × 30번, 약 1분)
//       node tests/dictation-calibrate.js 꽃,곰,닭 50 (글자 골라서)
// 바꿔 보기: CFG='{"r":0.2}' node tests/dictation-calibrate.js
const fs0=require('fs'),path0=require('path');
(function(){const app=fs0.readFileSync(path0.join(__dirname,'..','js','app.js'),'utf8');
 const a=app.indexOf('/* ===== v30h(v31)'),b=app.indexOf('})(typeof window!=="undefined"?window:globalThis);',a);
 if(a<0||b<0)throw new Error('v30h block not found in js/app.js');
 new Function(app.slice(a,b)+'})(globalThis);')()})();
const H=globalThis.HSTK;
let seed=12345;const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff};
const U=(a,b)=>a+(b-a)*rnd();
function lerp(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]}
function densify(pl,step){const out=[pl[0]];for(let i=1;i<pl.length;i++){const a=pl[i-1],b=pl[i],d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(d/step));for(let k=1;k<=n;k++)out.push(lerp(a,b,k/n))}return out}
function len(pl){let L=0;for(let i=1;i<pl.length;i++)L+=Math.hypot(pl[i][0]-pl[i-1][0],pl[i][1]-pl[i-1][1]);return L}
// 한 획을 아이처럼: 끝 늘리기/줄이기, 꺾임 둥글게, 흔들림
function kidStroke(st,M){let pl=st.map(p=>p.slice());
 if(pl.length>=2&&rnd()<M.round){const out=[pl[0]];for(let i=1;i<pl.length-1;i++){const a=lerp(pl[i],pl[i-1],.18),b=lerp(pl[i],pl[i+1],.18);out.push(a,lerp(lerp(a,pl[i],.5),lerp(pl[i],b,.5),.5),b)}out.push(pl[pl.length-1]);pl=out}
 if(pl.length>=2){const e=U(-M.ext,M.ext),f=U(-M.ext,M.ext);const a=pl[0],b=pl[1],y=pl[pl.length-2],z=pl[pl.length-1];
  pl[0]=lerp(a,b,-e*0.5*Math.min(1,len(st)/Math.max(1,Math.hypot(b[0]-a[0],b[1]-a[1]))));pl[pl.length-1]=lerp(z,y,-f*0.5*Math.min(1,len(st)/Math.max(1,Math.hypot(z[0]-y[0],z[1]-y[1]))))}
 let d=densify(pl,1.2);const amp=U(.3,M.wob),fr=U(.6,2.2),ph=U(0,6.28),L=len(d)||1;let acc=0;
 d=d.map((p,i)=>{if(i)acc+=Math.hypot(p[0]-d[i-1][0],p[1]-d[i-1][1]);const t=acc/L;return [p[0]+amp*Math.sin(ph+t*fr*6.28)+U(-M.jit,M.jit),p[1]+amp*Math.cos(ph*1.3+t*fr*6.28)+U(-M.jit,M.jit)]});
 if(rnd()<.2)d.reverse();return d}
function tf(p,c,sx,sy,rot,sh,dx,dy){let x=(p[0]-c[0])*sx,y=(p[1]-c[1])*sy;x+=sh*y;const cs=Math.cos(rot),sn=Math.sin(rot);return [c[0]+x*cs-y*sn+dx,c[1]+x*sn+y*cs+dy]}
// 글자 하나 = 부분들(parts) → 아이 글씨
function kidChar(parts,M){let strokes=[];
 parts.forEach(p=>{const b=p.box,c=[b[0]+b[2]/2,b[1]+b[3]/2],sx=U(1-M.ps,1+M.ps),sy=U(1-M.ps,1+M.ps),dx=U(-M.po,M.po),dy=U(-M.po,M.po);
  let ss=p.strokes.map(s=>s.map(q=>tf(q,c,sx,sy,0,0,dx,dy)));
  // 펜 떼기(꺾인 획을 둘로) / 이어 쓰기(끝이 붙은 두 획을 하나로)
  const out=[];ss.forEach(s=>{if(s.length>=3&&rnd()<M.split){const k=1+Math.floor(rnd()*(s.length-2));out.push(s.slice(0,k+1),s.slice(k))}else out.push(s)});
  for(let i=0;i+1<out.length;i++){const a=out[i],b=out[i+1];if(rnd()<M.merge&&Math.hypot(a[a.length-1][0]-b[0][0],a[a.length-1][1]-b[0][1])<6){out.splice(i,2,a.concat(b.slice(1)))}}
  strokes=strokes.concat(out)});
 const G=[50,50],gs=U(M.gs0,M.gs1),rot=U(-M.rot,M.rot)*Math.PI/180,sh=U(-M.sh,M.sh),gx=U(-M.go,M.go),gy=U(-M.go,M.go);
 strokes=strokes.map(s=>kidStroke(s.map(q=>tf(q,G,gs,gs,rot,sh,gx,gy)),M));
 // 순서 섞기
 for(let i=strokes.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[strokes[i],strokes[j]]=[strokes[j],strokes[i]]}
 return strokes}
const MESSY={round:.6,ext:.14,wob:2.2,jit:.7,ps:.16,po:4,split:.15,merge:.12,gs0:.78,gs1:1.08,rot:5,sh:.08,go:7};
const VERY={round:.8,ext:.2,wob:3.2,jit:1,ps:.24,po:6,split:.25,merge:.2,gs0:.65,gs1:1.12,rot:8,sh:.12,go:10};
// 헷갈리는 자모(철자 실수)
const NEAR={"ㄱ":"ㅋㄲ","ㄴ":"ㄷㄹ","ㄷ":"ㅌㄴㄸ","ㄹ":"ㄷ","ㅁ":"ㅂㅇ","ㅂ":"ㅍㅁㅃ","ㅅ":"ㅈㅊㅆ","ㅇ":"ㅎㅁ","ㅈ":"ㅊㅅㅉ","ㅊ":"ㅈㅅ","ㅋ":"ㄱ","ㅌ":"ㄷ","ㅍ":"ㅂ","ㅎ":"ㅇ",
 "ㄲ":"ㄱㅋ","ㅆ":"ㅅ","ㄸ":"ㄷㅌ","ㅃ":"ㅂ","ㅉ":"ㅈ",
 "ㅏ":"ㅑㅓㅐ","ㅑ":"ㅏㅕ","ㅓ":"ㅏㅕㅔ","ㅕ":"ㅓㅑ","ㅗ":"ㅛㅜ","ㅛ":"ㅗㅠ","ㅜ":"ㅠㅗ","ㅠ":"ㅜㅛ","ㅡ":"ㅜㅗ","ㅣ":"ㅏㅓ",
 "ㅐ":"ㅔㅏ","ㅔ":"ㅐㅓ","ㅘ":"ㅝㅏ","ㅝ":"ㅘㅓ","ㅚ":"ㅟㅙ","ㅟ":"ㅚ","ㅢ":"ㅟㅡ",
 "ㄺ":"ㄹㄱㄻ","ㄳ":"ㄱㅅ","ㅄ":"ㅂㅅ","ㄵ":"ㄴㅈ","ㄶ":"ㄴㅎ","ㄼ":"ㄹㅂ","ㄻ":"ㄹㅁ"};
function variants(ch){const d=H.dcp(ch),out=[];
 (NEAR[d.c]||"").split("").forEach(x=>{const s=H.comp(x,d.v,d.f);if(s)out.push(["초성 "+d.c+"→"+x,s])});
 (NEAR[d.v]||"").split("").forEach(x=>{const s=H.comp(d.c,x,d.f);if(s)out.push(["모음 "+d.v+"→"+x,s])});
 if(d.f){(NEAR[d.f]||"").split("").forEach(x=>{const s=H.comp(d.c,d.v,x);if(s)out.push(["받침 "+d.f+"→"+x,s])});out.push(["받침 빠짐",H.comp(d.c,d.v,null)])}
 return out}
const WORDS=process.argv[2]?process.argv[2].split(","):
 ["곰","집","달","별","꽃","책","눈","손","발","문","컵","칼","산","섬","불","물","돌","성","탑","북","밤","귤","빵","밥","옷","숲","밖","낮","밭","닭","흙","값","앉","많","읽","삶","덟",
  "강","산","봄","길","잠","양","말","뱀","꿀","솥","팥","빛","맛","앞","끝","왕","관","원","권","쥐","귀","의","왜","괜","웬","횃","됐","했","갰","넷","깻","굉","꿩","쉼"];
function run(M,label,N){let pos=0,posOK=0,negs={},negOK={},fails=[],misses=[];
 WORDS.forEach(ch=>{const P=H.charParts(ch);
  for(let k=0;k<N;k++){const s=kidChar(P,M),r=H.match(ch,s);pos++;if(r.ok)posOK++;else if(fails.length<12)fails.push(ch+" "+r.why)}
  variants(ch).forEach(([why,v])=>{const PV=H.charParts(v);if(!PV)return;const t=why.split(" ")[0]+(why.includes("빠짐")?"빠짐":"");
   for(let k=0;k<Math.max(2,N/3|0);k++){const s=kidChar(PV,M),r=H.match(ch,s);negs[t]=(negs[t]||0)+1;if(!r.ok)negOK[t]=(negOK[t]||0)+1;else if(misses.length<16)misses.push(ch+"←"+v+" ("+why+")")}});
  // 획 하나 빠짐 / 군더더기 획
  const all=[];P.forEach(p=>p.strokes.forEach(s=>all.push(s)));
  for(let k=0;k<Math.max(2,N/3|0);k++){if(all.length<2)break;const drop=Math.floor(rnd()*all.length);
   const P2=P.map(p=>({box:p.box,strokes:p.strokes.filter(s=>s!==all[drop])})).filter(p=>p.strokes.length);
   const s=kidChar(P2,M),r=H.match(ch,s);negs["획빠짐"]=(negs["획빠짐"]||0)+1;if(!r.ok)negOK["획빠짐"]=(negOK["획빠짐"]||0)+1;else if(misses.length<16)misses.push(ch+" 획빠짐#"+drop)}
  for(let k=0;k<Math.max(2,N/4|0);k++){const s=kidChar(P,M);const x=U(15,85),y=U(15,85),a=U(0,6.28),l=U(14,30);s.push(densify([[x,y],[x+l*Math.cos(a),y+l*Math.sin(a)]],1.2));
   const r=H.match(ch,s);negs["군더더기"]=(negs["군더더기"]||0)+1;if(!r.ok)negOK["군더더기"]=(negOK["군더더기"]||0)+1}});
 const pct=(a,b)=>(100*a/Math.max(1,b)).toFixed(1)+"%";
 console.log(`\n[${label}] 정답 통과 ${pct(posOK,pos)} (${posOK}/${pos})`);
 Object.keys(negs).forEach(t=>console.log(`  실수 걸러냄 ${t}: ${pct(negOK[t]||0,negs[t])} (${negOK[t]||0}/${negs[t]})`));
 if(fails.length)console.log("  정답인데 탈락 예:",fails.join(" | "));
 if(misses.length)console.log("  실수인데 통과 예:",misses.join(" | "));
 return {tar:posOK/pos,negs,negOK}}
module.exports={kidChar,MESSY,VERY,variants,densify,run,H,U};
if(require.main===module){const N=+process.argv[3]||30;
if(process.env.CFG)Object.assign(H.CFG,JSON.parse(process.env.CFG));
console.log("CFG",JSON.stringify(H.CFG,(k,v)=>typeof v==="number"?+v.toFixed(3):v));
run(MESSY,"보통 아이 글씨",N);
run(VERY,"아주 삐뚤빼뚤",N);}
