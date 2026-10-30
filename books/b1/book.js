/* 〈토끼와 거북이〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b1) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b1={dir:"books/b1/",cover:"cover.webp",bg:"spread.webp",
 actors:{rabbit:{n:"토끼",voice:"sb_rabbit",h:46,poses:{stand:["rabbit_stand.webp",1],run:["rabbit_run.webp",.95],sleep:["rabbit_sleep.webp",.72],surprise:["rabbit_surprise.webp",1]}},
  turtle:{n:"거북이",voice:"sb_turtle",h:40,poses:{stand:["turtle_stand.webp",1],walk:["turtle_walk.webp",1],think:["turtle_think.webp",1],win:["turtle_win.webp",1.05]}}},
 at:{start1:[31,97],start2:[43,98],tree:[27,67],path1:[45,85],path1b:[54,86],mid:[62,80],near:[71,77],finish:[81,75],claim:[89,73]},
 broken:{rabbit:["claim","stand"],turtle:["tree","think"]},
 endState:{rabbit:["claim","surprise"],turtle:["finish","win"]},
 claim:{who:"rabbit",t:"내가 계속 달렸으니 내가 이겼어!"},
 sentence:{tokens:["거북이가","나무","아래에서","잠들었어요."],bad:0,fix:"토끼가"},
 records:[{k:"tree",ic:"🌳",place:"나무 아래",at:[12,46],t:"나무 아래에 긴 귀 자국이 있어요. '쿨쿨' 하는 소리도 적혀 있어요.",clue:["긴 귀","쿨쿨"]},
  {k:"path",ic:"🛤️",place:"경주 길",at:[58,90],t:"토끼가 잠든 동안 거북이는 쉬지 않고 걸었어요.",clue:["토끼가 잠든 동안","쉬지 않고 걸었어요"]},
  {k:"finish",ic:"🏁",place:"결승점",at:[70,52],t:"결승점 깃발 옆에 둥근 등껍질 자국이 먼저 찍혀 있어요.",clue:["등껍질 자국이 먼저"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","✨","📖"]},text:"열두 이야기 도서관에는 오래된 동화책이 가득해요. 거북이 스승님은 날마다 책을 펼쳐 이야기를 지켰어요."},
  {pov:{bg:"@lib",vil:true},who:"v_gray",text:"그런데 어느 밤, 회색냥이 몰래 들어왔어요. \"흥, 느린 거북이가 이기는 이야기는 재미없어!\" 회색냥은 〈토끼와 거북이〉의 문장을 몰래 바꿔 버렸어요."},
  {pov:{bg:"@lib",img:"scene_broken.webp",kb:"in"},onlyFor:["tiger","rabbit"],text:"그 순간 책이 보랏빛으로 번쩍였어요! 글자가 적힌 책장들이 휙휙 날아갔어요. 거북이 스승님과 수비대는 깜짝 놀랐어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["turtle","?"]},{cam:[45,100,1],cms:0},{cam:["turtle",1.45],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 열심히 걷던 거북이가 나무 아래에서 잠들어 버렸어요."},
  {scene:[{claim:true},{cam:["rabbit",1.5],cms:1600}],who:"rabbit",text:"토끼는 결승점에서 뽐냈어요. \"내가 계속 달렸으니 내가 이겼어!\" 이대로 두면 아무도 '천천히 해도 끝까지 하면 된다'는 걸 배울 수 없어요. 이것이 망가진 결말이에요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속에 남은 기록을 찾아 읽으렴. 기록과 다른 문장을 찾아 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"토끼와 거북이의 경주를 되찾자!\"",enterArt:"scene_enter.webp",enterWith:["tiger"],
 enter:[{say:"\"내가 계속 달렸으니 내가 이겼어!\"",who:"rabbit"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 나무, 경주 길, 결승점에 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"나무 아래에서 잠든 동물은 누구일까?",opts:[["rabbit","토끼"],["turtle","거북이"]],a:"rabbit",ev:["tree","path"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"기록을 다시 읽어 보렴. 긴 귀를 가진 동물은 누구지?",evHint:"그 기록에는 잠에 대한 말이 없단다. 다른 기록을 읽어 보렴.",cl:["긴 귀","쿨쿨","토끼가 잠든 동안"]},
    {ask:"쉬지 않고 걸은 동물은 누구일까?",opts:[["rabbit","토끼"],["turtle","거북이"]],a:"turtle",ev:["path","finish"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"쉬지 않고 걸은 동물이 기록에 적혀 있단다. 경주 길 기록을 읽어 보렴.",evHint:"그 기록에는 걸었다는 말이 없단다. 다른 기록을 읽어 보렴.",cl:["쉬지 않고 걸었어요","등껍질 자국이 먼저"]}],
   after:[{claim:"x"},{say:"토끼의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["다람쥐가","갈매기가"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 누가 잠들었다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"기록에는 누가 나무 아래에서 잠들었다고 적혀 있었니?",cl:["긴 귀","토끼가 잠든 동안"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["turtle",null]},{cam:[45,58,1.15]},
    {pose:["turtle","stand"]},{say:"\"어? 내가 왜 여기 있지? 다시 걸어야지!\"",who:"turtle"},
    {move:"turtle",to:"mid",pose:"walk",ms:2800,par:true},
    {move:"rabbit",to:"tree",pose:"run",end:"sleep",ms:1800},
    {zz:"rabbit"},
    {say:"토끼는 나무 아래로 돌아가 쿨쿨 잠들었어요."},
    {say:"거북이는 다시 엉금엉금 걷기 시작했어요."},
    {cam:null}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"무엇이 먼저 일어나야 다음 일이 생길까? 출발해야 달릴 수 있겠지?",
   pages:[{img:"card1.webp",t:"탕! 토끼와 거북이가 함께 출발했어요.",cl:["출발"]},{img:"card2.webp",t:"토끼가 나무 아래에서 쿨쿨 잠들었어요.",cl:["잠들었어요"]},{img:"card3.webp",t:"거북이가 먼저 결승점에 도착했어요.",cl:["도착"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",fit:"contain",kb:"in"},text:"토끼와 거북이가 달리기 시합을 했어요. 탕 하는 출발 소리에 둘은 함께 달리기 시작했어요."},
  {scene:[{gloom:false},{state:{rabbit:["start1","stand"],turtle:["start2","stand"]}},{cam:[38,80,1.2],cms:0},{move:"turtle",to:"path1",pose:"walk",ms:3800,par:true},{move:"rabbit",to:"tree",pose:"run",end:"stand",ms:1700,cam:["rabbit",1.35,"tree"],cms:1700}],who:"rabbit",text:"토끼는 깡충깡충 빠르게 달렸어요. \"나는 엄청 빠르지! 조금 쉬었다 가야지.\""},
  {pov:{img:"page2.webp",kb:"pan"},text:"토끼는 나무 아래에서 쿨쿨 잠들었어요. 그동안 거북이는 쉬지 않고 엉금엉금 걸었어요."},
  {scene:[{state:{rabbit:["tree","sleep"],turtle:["mid","walk"]}},{zz:"rabbit"},{cam:["turtle",1.3],cms:0},{bars:true},{slow:true},{move:"turtle",to:"finish",pose:"walk",end:"win",ms:3400,cam:["turtle",1.5,"finish"],cms:3400},{slow:false},{fx:"burst",at:[81,58]}],text:"거북이는 한 걸음, 한 걸음 결승점에 다가갔어요."},
  {pov:{img:"page3.webp",kb:"in"},fx:"confetti",who:"rabbit",text:"거북이가 먼저 결승점에 도착했어요! 토끼는 깜짝 놀랐어요. \"어? 벌써 도착했어?\""},
  {scene:[{bars:false},{state:"end"},{cam:[84,58,1.3],cms:0}],who:"turtle",text:"거북이가 웃으며 말했어요. \"천천히 가도, 쉬지 않으면 끝까지 갈 수 있어.\" 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 토끼가 잠들지 않았다면?",ask:"토끼가 잠들지 않았다면? 토끼는 어떻게 했을까?",lead:"토끼는 잠들지 않고…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{rabbit:["tree","stand"],turtle:["path1","walk"]},tpl:"토끼는 잠들지 않고 {A}. 마지막에 {B}.",
  A:[{t:"끝까지 쉬지 않고 달렸어요",e:"🏃",s:[{move:"rabbit",to:"near",pose:"run",end:"stand",ms:1600}]},
     {t:"거북이를 기다려 주었어요",e:"🤝",s:[{move:"rabbit",to:"path1b",pose:"run",end:"stand",ms:900},{pose:["turtle","stand"]}]},
     {t:"길에서 다친 새를 도와주었어요",e:"🐦",s:[{prop:["🐦",56,88]},{move:"rabbit",to:"path1b",pose:"run",end:"stand",ms:1100}]}],
  B:[{t:"토끼가 먼저 결승점에 도착했어요",e:"🥇",s:[{move:"turtle",to:"mid",pose:"walk",ms:2400,par:true},{move:"rabbit",to:"finish",pose:"run",end:"stand",ms:1700},{fx:"confetti"}]},
     {t:"둘이 함께 결승점에 도착했어요",e:"🫱",s:[{move:"turtle",to:"finish",pose:"walk",end:"win",ms:2600,par:true},{move:"rabbit",to:"claim",pose:"run",end:"stand",ms:2600},{fx:"confetti"}]},
     {t:"모두 함께 당근 파티를 했어요",e:"🥕",s:[{move:"turtle",to:"finish",pose:"walk",end:"win",ms:2400,par:true},{move:"rabbit",to:"claim",pose:"run",end:"stand",ms:2400},{prop:["🥕",75,70]},{prop:["🎉",92,64]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 꼬리를 감추고 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};
/* 〈시골 쥐와 도시 쥐〉 — book 2 data (v29.3: in the game, pictures made with ChatGPT on 2026-10-30).
   Pictures in books/b2/: spread, page1, page2, country_stand, country_scared, city_stand, city_scared, cat_prowl (.webp)
   and page3.webp, which for now is a stand-in made from the stage picture + country_stand (replace it with the painted one).
   The other poses and the cover reuse those pictures until the optional ones exist; then only the file name changes:
     walk/happy (country) -> country_walk / country_happy, walk/proud (city) -> city_walk / city_proud,
     pounce (cat) -> cat_pounce, cover -> cover.webp.
   Positions (at/records) follow the painted spread (1536×864): oak-root home with its round door at 10–16%, the path along
   the front at about 75% height, stone bridge 38–55%, the dining room from 57%: table top at about 36%, mouse hole at 94%.
   The dining room is drawn at a person's scale and the stage is short on wide screens (only about the lower 58% shows), so the
   mice stay on the floor by the table instead of on its top (like page2.webp), mice h 26, cat h 30.
   To load it in the project folder see docs/HANDOVER.md → "새 책 추가 체크리스트" (BD.b2 → BOOKDATA.b2; VOX/RMS lines go to app.js). */;
