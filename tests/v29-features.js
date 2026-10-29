// v29 feature test (today's adventure in 'short' mode; the lap is tests/today-lap.js): reading-help defaults, settings rows, missions inside a case, today's adventure end to end,
// weekly parent summary, backup code round trip + restore, read-aloud check with a fake recogniser, level-2 nudge, level-1 narration.
// node tests/v29-features.js [phone]     (screenshots in tests/out/)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const OUTD=path.join(__dirname,'out');fs.mkdirSync(OUTD,{recursive:true});const HELP=f=>fs.readFileSync(path.join(__dirname,'helpers',f),'utf8');
const phone=process.argv[2]==='phone',vw=phone?{width:390,height:844}:{width:1024,height:768};
const out=[];const ok=(name,cond,extra)=>{out.push((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+JSON.stringify(extra):''));};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:vw});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.SpeechSynthesisUtterance=class{constructor(t){this.text=t}};window.__said=[];
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Yuna',lang:'ko-KR'}],speaking:false,speak:u=>{window.__said.push(u.text);setTimeout(()=>u.onend&&u.onend(),40)},cancel:()=>{},addEventListener(){}}});
  // fake recogniser: hears exactly what window.__hear says (or fails with window.__micErr)
  window.SpeechRecognition=window.webkitSpeechRecognition=class{start(){setTimeout(()=>{if(window.__micErr){this.onerror&&this.onerror({error:window.__micErr});return}
    const t=window.__hear||'';this.onresult&&this.onresult({results:[[{transcript:t}]]});this.onend&&this.onend()},50)}abort(){}};});
 await p.goto('file://'+path.resolve(__dirname,'..','index.html'));await p.waitForTimeout(500);
 await p.addScriptTag({content:HELP('kz-auto.js')});await p.addScriptTag({content:HELP('pg-auto.js')});
 // 1. defaults for a fresh save
 let st=await p.evaluate(()=>({rd:G.rd,auto:G.autoRead,today:G.today&&G.today.d,days:typeof G.days,mic:G.mic,rmOff:G.rmOff,lap:tdIsLap(),hud:$("tdHud").textContent}));
 ok('fresh save → reading help 3, auto read off, today = one lap (0/10)',st.rd===3&&st.auto===false&&st.lap===true&&st.hud==='☀️ 0/10',st);
 // the rest of this test checks the short 3-step flow (the lap has its own test: today-lap.js)
 await p.evaluate(()=>{G.tdLen="short";save();tdHudSet()});
 await p.evaluate(()=>document.querySelector('#spGo').click());await p.waitForTimeout(300);
 await p.evaluate(()=>{const b=document.querySelector('#tBtns .btn.pri');b&&b.click()});await p.waitForTimeout(900);
 st=await p.evaluate(()=>({hud:$("tdHud").textContent,first:document.querySelector('#extras .xbtn').dataset.x,chip:(document.querySelector('#extras .xbtn .tdp')||{}).textContent}));
 ok('today button first + chip 0/3',st.first==='today'&&st.chip==='0/3'&&st.hud==='☀️ 0/3',st);
 await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_main.png`});
 // 2. settings rows
 await p.evaluate(()=>showSettings());await p.waitForTimeout(200);
 st=await p.evaluate(()=>({rd:[...document.querySelectorAll('[data-rd]')].map(b=>b.getAttribute('aria-pressed')),rmo:document.querySelectorAll('[data-rmo]').length,mic:document.querySelectorAll('[data-mic]').length,bk:!!$("bkMake"),app:($("appSt")||{}).textContent}));
 ok('settings: reading help (3 pressed), missions, mic, backup, app rows',JSON.stringify(st.rd)==='["false","false","true"]'&&st.rmo===2&&st.mic===2&&st.bk&&!!st.app,st);
 await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_settings.png`,fullPage:false});
 await p.evaluate(()=>document.querySelector('[data-rd="1"]').click());st=await p.evaluate(()=>({rd:G.rd,auto:G.autoRead}));ok('reading help 1 → auto read on',st.rd===1&&st.auto===true,st);
 await p.evaluate(()=>document.querySelector('[data-rd="2"]').click());st=await p.evaluate(()=>({rd:G.rd,auto:G.autoRead}));ok('reading help 2 → auto read off',st.rd===2&&st.auto===false,st);
 await p.evaluate(()=>{$("setOv").hidden=true});
 // 3. level-2 nudge on the case read button
 await p.evaluate(()=>{openCases();caseStart(0)});await p.waitForTimeout(12800);
 st=await p.evaluate(()=>({nudge:$("kzSay").classList.contains('nudge'),act:KZ.act}));ok('level 2: 🔊 glows after 12 s in the case',st.nudge&&st.act===0,st);
 // 4. level 3: play case 1 with missions; mission card text must be the long version
 await p.evaluate(()=>{G.rd=3;G.autoRead=false;window.__said=[];caseStart(0)});await p.waitForTimeout(1500);
 st=await p.evaluate(()=>window.__said.length);ok('level 3: nothing read aloud by itself at case start',st===0,{said:st});
 let seen=[],t0=Date.now(),wrongOnce=true;
 while(Date.now()-t0<90000){const s=await p.evaluate(()=>({done:!!(KZ&&KZ.done),rm:!$("rmOv").hidden,txt:$("rmOv").hidden?'':($("rmText")||{}).textContent}));
  if(s.done)break;if(s.rm&&s.txt&&!seen.includes(s.txt)){seen.push(s.txt);if(seen.length===1)await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_mission.png`})}
  const qv=await p.evaluate(()=>!$("rmOv").hidden&&!$("rmQ").hidden&&!!document.querySelector('#rmQ .rmop:not(:disabled)'));
  const w=wrongOnce&&qv&&seen.length===2;await p.evaluate(w=>KZAUTO(w),w);if(w)wrongOnce=false;await p.waitForTimeout(300)}
 const M=await p.evaluate(()=>RMS.k1.map(m=>m.b));
 st=await p.evaluate(()=>({done:!!(KZ&&KZ.done),D:G.days[dkey()],T:G.today,log:G.rmlog}));
 ok('case 1 solved with 3 missions (long versions)',st.done&&seen.length===3&&seen.every((x,i)=>x.replace(/\s+/g,' ').trim()===M[i]),{seen:seen.length,done:st.done});
 ok('day log: 3 missions, 2 right first try, story step done',st.D.rm===3&&st.D.qn===3&&st.D.qok===2&&st.T.story===1&&st.T.rm===3,{D:st.D,T:st.T});
 await p.evaluate(()=>{hush();caseClose()});await p.waitForTimeout(400);
 // 5. today's adventure: words then a game → celebration once
 await p.evaluate(()=>{const c=$("lvOk");if(c&&!$("lvOv").hidden)c.click()});await p.waitForTimeout(200);
 await p.evaluate(()=>tdOpen());await p.waitForTimeout(200);await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_today.png`});
 st=await p.evaluate(()=>[...document.querySelectorAll('.tdlist li')].map(li=>li.className+':'+li.querySelector('b').textContent));ok('today card: story done, play/words open',st.length===3&&st[1].startsWith('done')&&!st[0].startsWith('done'),st);
 await p.evaluate(()=>document.querySelector('[data-td="words"]').click());await p.waitForTimeout(300);
 await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_words.png`});
 for(let k=0;k<30;k++){const r=await p.evaluate(()=>RMAUTO(false));if(r==='none')break;await p.waitForTimeout(1250)}
 st=await p.evaluate(()=>({T:G.today,D:G.days[dkey()],td:!$("tdOv").hidden}));ok('5 words reviewed → words step done, card back',st.T.words===1&&st.D.words===5&&st.td,{T:st.T,words:st.D.words});
 await p.evaluate(()=>document.querySelector('[data-td="play"]').click());await p.waitForTimeout(500);
 for(let k=0;k<200;k++){const d=await p.evaluate(()=>!!document.querySelector('.pgres')||!PGS);if(d)break;await p.evaluate(()=>PGAUTO(false));await p.waitForTimeout(300)}
 await p.waitForTimeout(600);const coins0=await p.evaluate(()=>G.coins);
 await p.evaluate(()=>pgClose());await p.waitForTimeout(800);
 await p.evaluate(()=>{const c=$("lvOk");if(c&&!$("lvOv").hidden)c.click()});await p.waitForTimeout(800);
 st=await p.evaluate(()=>({T:G.today,win:!!document.querySelector('.tdwin'),D:G.days[dkey()],hud:$("tdHud").textContent}));
 await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_done.png`});
 ok('game → play step; all three → celebration + paid once',st.T.play===1&&st.win&&st.T.paid===1&&st.D.td===1&&st.hud==='☀️ ✓',{T:st.T,win:st.win,hud:st.hud});
 const coins1=await p.evaluate(()=>{$("tdX").click();tdCelebrate();const c=G.coins;$("tdOv").hidden=true;return c});ok('celebration pays only once',coins1>=coins0,{coins0,coins1});
 const coins2=await p.evaluate(()=>G.coins);ok('second celebration adds nothing',coins2===coins1,{coins1,coins2});
 // 6. weekly parent page
 await p.evaluate(()=>{G.days[dkey(new Date(Date.now()-864e5))]={min:12.5,rm:4,solo:3,qn:4,qok:4,skip:1,help:2,games:1,words:5,mic:0,wrong:{"사과":2},td:1};G.mdate={"사과":dkey()};showPartner()});await p.waitForTimeout(300);
 st=await p.evaluate(()=>({txt:$("pWeek").innerText,cols:document.querySelectorAll('.wkcol').length}));
 ok('parent page: 7 day bars + missions + tips',st.cols===7&&/읽기 미션/.test(st.txt)&&/💡/.test(st.txt)&&/사과/.test(st.txt),st.txt.slice(0,160));
 await p.screenshot({path:`${OUTD}/v29_${phone?'P':'T'}_parent.png`,fullPage:true});
 await p.evaluate(()=>{$("parOv").hidden=true});
 // 7. backup code: round trip, bad code, two-tap restore
 st=await p.evaluate(async()=>{const c=await bkEncode();const o=await bkDecode(c);return {tag:c.slice(0,4),len:c.length,same:JSON.stringify(o)===JSON.stringify(G)}});ok('backup code round trip',st.same,st);
 const code=await p.evaluate(async()=>{const o=JSON.parse(JSON.stringify(G));o.coins=4321;o.lv=7;G.__x=1;const raw=new TextEncoder().encode(JSON.stringify(o));return "HG1."+b64e(raw)});
 await p.evaluate(()=>showSettings());await p.evaluate(()=>$("bkLoad").click());
 await p.evaluate(()=>{$("bkIn").value="nonsense";$("bkGo").click()});await p.waitForTimeout(200);
 st=await p.evaluate(()=>$("bkNote").textContent);ok('bad code is refused',/올바르지|right/.test(st),st);
 await p.evaluate(c=>{$("bkIn").value=c;$("bkGo").click()},code);await p.waitForTimeout(300);
 st=await p.evaluate(()=>({note:$("bkNote").textContent,coins:G.coins}));ok('first tap only arms the restore',/한 번 더|again/.test(st.note)&&st.coins!==4321,st);
 await Promise.all([p.waitForNavigation({timeout:5000}).catch(()=>null),p.evaluate(()=>$("bkGo").click())]);await p.waitForTimeout(800);
 await p.addScriptTag({content:HELP('kz-auto.js')});
 st=await p.evaluate(()=>({coins:G.coins,lv:G.lv}));ok('second tap restores and reloads',st.coins===4321&&st.lv===7,st);
 // 8. read-aloud check with the fake recogniser
 await p.evaluate(()=>{$("splashOv").hidden=true;G.mic=true;G.micDead=0;G.rd=2;window.__hear=RMS.k2[0].a;rmShow(RMS.k2[0],{src:"test"},()=>{window.__rmdone=1})});await p.waitForTimeout(200);
 await p.evaluate(()=>$("rmMic").click());await p.waitForTimeout(500);
 st=await p.evaluate(()=>({msg:$("rmMsg").textContent,nud:$("rmDone").classList.contains('nudge')}));ok('mic: correct reading is recognised',/잘 읽었어요|heard/.test(st.msg)&&st.nud,st);
 await p.evaluate(()=>{window.__hear='바나나 우유';$("rmMic").click()});await p.waitForTimeout(500);
 st=await p.evaluate(()=>$("rmMsg").textContent);ok('mic: different reading asks to try again',/다르게|different/.test(st),st);
 await p.evaluate(()=>{window.__micErr='not-allowed';$("rmMic").click()});await p.waitForTimeout(500);
 st=await p.evaluate(()=>({btn:!!$("rmMic"),dead:G.micDead,msg:$("rmMsg").textContent}));ok('mic blocked → button hides, remembered',!st.btn&&st.dead===1,st);
 await p.evaluate(()=>$("rmSkip").click());st=await p.evaluate(()=>({done:window.__rmdone,skip:G.days[dkey()].skip,hidden:$("rmOv").hidden}));ok('skip closes and is logged',st.done===1&&st.skip>=1&&st.hidden,st);
 // 9. level 1 reads the brief and the mission by itself
 await p.evaluate(()=>{G.rd=1;window.__said=[];openCases();caseStart(1)});await p.waitForTimeout(2500);
 st=await p.evaluate(()=>window.__said.slice(0,3));ok('level 1: case brief is read aloud by itself',st.length>0,st);
 await p.evaluate(()=>{caseClose();window.__said=[];rmShow(RMS.k3[0],{src:"test"},()=>{})});await p.waitForTimeout(1200);
 st=await p.evaluate(()=>({said:window.__said,tip:$("rmTip").textContent,txt:$("rmText").textContent}));ok('level 1: mission short sentence read first, then "your turn"',st.said.includes(st.txt.replace(/\s+/g,' ').trim())&&/따라|Now/.test(st.tip),st);
 await p.evaluate(()=>$("rmSkip").click());
 console.log(out.join('\n'));console.log('errors',JSON.stringify(errs));await b.close();process.exit(out.some(x=>x.startsWith('FAIL'))||errs.length?1:0)})();
