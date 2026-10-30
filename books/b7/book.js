/* 〈바람을 배달하는 말〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b7) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b7={dir:"books/b7/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  dal:{n:"배달 말 다그닥이",voice:"sb_dal",h:32,poses:{stand:["dal_stand.webp",1],walk:["dal_run.webp",1],run:["dal_run.webp",1],happy:["dal_stand.webp",1]}},
  mill:{n:"풍차 마을 아저씨",voice:"sb_mill",h:30,poses:{stand:["mill_stand.webp",1],walk:["mill_stand.webp",1]}}},
 at:{stable:[12,84],map:[20,78],cart:[32,82],road:[44,88],hill:[55,84],millSpot:[66,84],village:[78,86],square:[86,86],top:[88,38]},
 broken:{dal:["hill","stand"],mill:["millSpot","stand"]},
 endState:{dal:["village","happy"],mill:["millSpot","stand"]},
 claim:{who:"dal",t:"바람은 산꼭대기에 두고 오면 돼! 거기가 제일 높잖아!"},
 sentence:{tokens:["바람","수레는","산꼭대기에","두고","와요."],bad:2,fix:"풍차 마을에"},
 records:[
  {k:"map",ic:"🗺️",place:"배달 지도",at:[20,58],t:"배달 지도에는 '여름 바람은 풍차 마을로'라고 적혀 있어요. 풍차는 바람이 와야 돌아가요.",clue:["풍차 마을로"]},
  {k:"mill",ic:"🌀",place:"풍차 마을",at:[66,62],t:"바람이 오지 않아 풍차가 뚝 멈췄어요. 마을 친구들이 부채질을 하며 다그닥이를 기다려요.",clue:["풍차가 뚝 멈췄어요"]},
  {k:"cart",ic:"💨",place:"바람 수레",at:[32,62],t:"다그닥이의 수레에는 시원한 여름 바람이 가득 담겨 있어요. 뚜껑을 열면 슝 하고 나와요.",clue:["여름 바람이 가득"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","💨","🌀"]},text:"열두 이야기 도서관의 일곱 번째 책장에는 〈바람을 배달하는 말〉이 꽂혀 있어요. 더운 여름날, 시원한 바람을 배달하는 이야기예요."},
  {pov:{bg:"@lib",vil:true},who:"v_gray",text:"그런데 꾀부리기 대장 회색냥이 책을 펼쳤어요. \"배달은 귀찮다냥! 아무 데나 두는 이야기로 바꿔야지!\" 회색냥은 배달 길 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["dal","?"]},{cam:[50,100,1],cms:0},{cam:["mill",1.4],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 바람 수레는 엉뚱한 산꼭대기로 가고, 풍차 마을은 푹푹 찌기 시작했어요."},
  {scene:[{claim:true},{cam:["dal",1.6],cms:1600}],who:"dal",text:"다그닥이가 고개를 갸웃하며 말했어요. \"바람은 산꼭대기에 두고 오면 돼! 거기가 제일 높잖아!\" 이대로 두면 풍차는 다시 돌 수 없어요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"바람은 산꼭대기에 두고 오면 돼! 거기가 제일 높잖아!\"",who:"dal"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"부채질을 하며 바람 배달을 기다리는 건 누구일까?",opts:[["mill","풍차 마을 아저씨","stand"],["dal","배달 말"]],a:"mill",ev:["mill"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"풍차 마을 기록을 다시 읽어 보렴. 누가 기다리고 있니?",evHint:"그 기록에는 기다리는 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["풍차가 뚝 멈췄어요"]},
    {ask:"바람 수레를 끌고 배달하는 건 누구일까?",opts:[["dal","배달 말 다그닥이","run"],["mill","풍차 아저씨"]],a:"dal",ev:["cart","map"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"바람 수레 기록을 읽어 보렴. 수레는 누구 것이라고 적혀 있니?",evHint:"그 기록에는 수레 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["여름 바람이 가득"]}],
   after:[{claim:"x"},{say:"다그닥이의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["바닷속에","사막에"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 여름 바람이 어디로 간다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"배달 지도 기록을 다시 읽어 보렴. 여름 바람은 어디로 가야 하지?",cl:["풍차 마을로"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["dal",null]},{cam:["dal",1.4]},
    {say:"다그닥이가 배달 지도를 다시 읽었어요. \"여름 바람은 풍차 마을로!\"",who:"dal"},
    {move:"dal",to:"road",pose:"run",ms:1400},
    {say:"다그닥 다그닥! 바람 수레가 들길을 신나게 달렸어요."},
    {move:"dal",to:"millSpot",pose:"run",ms:2000},
    {say:"수레 뚜껑을 열자, 시원한 바람이 슝 쏟아져 나왔어요."},
    {fx:"burst",at:[66,70]},{prop:["💨",62,64]},{prop:["🌀",70,50]},
    {say:"멈췄던 풍차가 씽씽 돌고, 마을이 시원해졌어요."},
    {say:"\"고마워요, 다그닥! 올여름 최고의 배달이에요!\"",who:"mill"},
    {cam:null},{fx:"confetti"}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"바람을 담은 다음에 무슨 일이 생겼을까? 풍차가 돈 건 언제일까?",
   pages:[{img:"page1.webp",t:"다그닥이는 수레에 여름 바람을 가득 담았어요.",cl:["가득 담았어요"]},{img:"page2.webp",t:"배달 길이 바뀌어 바람이 산꼭대기로 갔어요.",cl:["산꼭대기로"]},{img:"page3.webp",t:"풍차 마을에 바람이 오자 풍차가 씽씽 돌았어요.",cl:["씽씽"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"바람 목장의 배달 말 다그닥이는 계절 바람을 배달해요. 오늘 짐은 제일 시원한 여름 바람이에요."},
  {scene:[{gloom:false},{state:{dal:["cart","stand"],mill:["millSpot","stand"]}},{cam:["dal",1.5],cms:0}],who:"dal",text:"\"배달 지도를 읽어 보자. 여름 바람은… 풍차 마을로!\""},
  {pov:{img:"page2.webp",kb:"pan"},text:"다그닥 다그닥! 들길을 지나고 언덕을 넘어, 바람 수레가 풍차 마을에 도착했어요."},
  {scene:[{state:{dal:["millSpot","stand"],mill:["village","stand"]}},{cam:[66,70,1.2],cms:0},{prop:["💨",62,64]}],text:"뚜껑을 열자 시원한 바람이 슝! 멈췄던 풍차가 천천히, 그리고 씽씽 돌기 시작했어요."},
  {pov:{img:"page3.webp",kb:"in"},who:"mill",text:"\"고마워요, 다그닥! 풍차가 돌면 밀가루도 빻고, 마을도 시원해진답니다.\""},
  {scene:[{state:"end"},{cam:["dal",1.3],cms:0},{prop:["🌀",70,48]}],text:"다그닥이는 다음 배달을 위해 가을 바람을 담으러 떠났어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 다음 배달은 어디로?",ask:"다그닥이의 다음 배달은 무엇일까?",lead:"다그닥이는…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{dal:["road","stand"],mill:["millSpot","stand"]},tpl:"다그닥이는 {A}. 마지막에 {B}.",
  A:[{t:"가을 바람을 담아 단풍 숲에 배달했어요",e:"🍂",s:[{move:"dal",to:"hill",pose:"run",ms:1400},{prop:["🍂",55,70]}]},
     {t:"겨울 바람을 담아 눈사람 마을에 배달했어요",e:"☃️",s:[{move:"dal",to:"square",pose:"run",ms:1600},{prop:["☃️",86,74]}]},
     {t:"봄바람을 담아 꽃씨를 날려 줬어요",e:"🌸",s:[{move:"dal",to:"road",pose:"run",ms:1200},{prop:["🌸",44,70]}]}],
  B:[{t:"마을마다 고맙다는 편지가 왔어요",e:"💌",s:[{prop:["💌",20,64]},{fx:"confetti"}]},
     {t:"'바람 배달왕' 깃발을 받았어요",e:"🎏",s:[{prop:["🎏",12,60]},{fx:"confetti"}]},
     {t:"풍차 마을에서 시원한 수박을 나눠 먹었어요",e:"🍉",s:[{move:"dal",to:"village",pose:"walk",end:"happy",ms:1400},{prop:["🍉",78,76]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 바람에 날려 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈양치기 소년〉 — book 8. 주인 영웅: 구름 양(sheep), 악당: 호랑이냥(tiger).
   무대: 왼쪽 약속 바위·언덕길(0~35%), 가운데 양 떼 풀밭(35~70%), 오른쪽 마을·종(70~100%). 순한 판: 아무도 다치지 않고, 늑대는 쫓겨 도망. */;
