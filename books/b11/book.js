/* 〈개와 그림자〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b11) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b11={dir:"books/b11/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  pup:{n:"강아지 콩이",voice:"sb_pup",h:28,poses:{stand:["pup_stand.webp",1],walk:["pup_stand.webp",1],look:["pup_look.webp",1],happy:["pup_happy.webp",1]}},
  shadow:{n:"물속 그림자",voice:"narrator",h:22,poses:{stand:["pup_look.webp",.9],walk:["pup_look.webp",.9]}}},
 at:{path:[16,86],hill:[26,84],bridgeL:[40,74],bridge:[50,72],bridgeR:[60,74],waterSpot:[52,90],reed:[66,88],yard:[82,84],homeP:[92,82]},
 broken:{pup:["bridge","look"],shadow:["waterSpot","stand"]},
 endState:{pup:["yard","happy"],shadow:["waterSpot","stand"]},
 claim:{who:"pup",t:"물속 뼈다귀가 더 커! 멍멍 짖어서 뺏어야지!"},
 sentence:{tokens:["물속에","보이는","것은","커다란","뼈다귀예요."],bad:4,fix:"그림자예요."},
 records:[
  {k:"bridge",ic:"🪵",place:"외나무다리",at:[50,54],t:"콩이가 뼈다귀를 물고 외나무다리를 건넜어요. 다리 아래 개울물이 거울처럼 반짝였어요.",clue:["거울처럼"]},
  {k:"water",ic:"💧",place:"개울물",at:[52,78],t:"물속 강아지도 뼈다귀를 물고 있었어요. 콩이가 고개를 기울이면 물속 강아지도 똑같이 기울였어요.",clue:["똑같이 기울였어요"]},
  {k:"homeR",ic:"🦴",place:"저녁 마당",at:[84,62],t:"그림자인 걸 안 콩이는 뼈다귀를 꼭 물고 집으로 갔어요. '내 뼈다귀가 세상에서 제일 맛있어!'",clue:["꼭 물고","제일 맛있어"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","🦴","💧"]},text:"열두 이야기 도서관의 열한 번째 책장에는 〈개와 그림자〉가 꽂혀 있어요. 지금 가진 것이 얼마나 소중한지 알려 주는 책이에요."},
  {pov:{bg:"@lib",vil:true},who:"v_purple",text:"그런데 장난꾸러기 보라냥이 책을 펼쳤어요. \"물속 뼈다귀가 진짜라고 하면 재밌겠다냥!\" 보라냥은 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["pup","?"]},{cam:[50,100,1],cms:0},{cam:["pup",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 콩이는 물속만 노려보고, 입에 문 소중한 뼈다귀를 자꾸 잊어버려요."},
  {scene:[{claim:true},{cam:["pup",1.6],cms:1600}],who:"pup",text:"콩이가 으르렁대며 말했어요. \"물속 뼈다귀가 더 커! 멍멍 짖어서 뺏어야지!\" 이대로 두면 입에 문 뼈다귀가 퐁당 빠져 버려요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"물속 뼈다귀가 더 커! 멍멍 짖어서 뺏어야지!\"",who:"pup"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"물속에서 콩이를 똑같이 따라 한 것은 무엇일까?",opts:[["shadow","물속 그림자","stand"],["pup","다른 강아지"]],a:"shadow",ev:["water"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"개울물 기록을 다시 읽어 보렴. 물속 강아지는 어떻게 움직였니?",evHint:"그 기록에는 물속 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["똑같이 기울였어요"]},
    {ask:"뼈다귀를 꼭 물고 집으로 간 건 누구일까?",opts:[["pup","강아지 콩이","happy"],["shadow","물속 그림자"]],a:"pup",ev:["homeR","bridge"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"저녁 마당 기록을 읽어 보렴. 누가 뼈다귀를 꼭 물고 갔니?",evHint:"그 기록에는 그 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["꼭 물고"]}],
   after:[{claim:"x"},{say:"콩이의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["물고기예요.","보름달이에요."],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 물속에 보이는 것이 무엇이라고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"개울물 기록을 다시 읽어 보렴. 똑같이 따라 하는 건 무엇이지?",cl:["똑같이 기울였어요","거울처럼"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["pup",null]},{cam:[50,70,1.25]},
    {say:"콩이가 멍멍 짖는 대신, 고개를 왼쪽으로 갸웃해 봤어요."},
    {pose:["pup","look"]},
    {say:"물속 강아지도 왼쪽으로 갸웃! 오른쪽으로 갸웃하니 또 똑같이 갸웃!"},
    {say:"\"아하! 저건 내 그림자구나!\"",who:"pup"},
    {fx:"burst",at:[52,84]},
    {say:"콩이는 뼈다귀를 꼭 물고 다리를 사뿐사뿐 건넜어요."},
    {move:"pup",to:"yard",pose:"walk",end:"happy",ms:2600},
    {say:"\"내 뼈다귀가 세상에서 제일 맛있어!\"",who:"pup"},
    {cam:null},{fx:"confetti"}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"다리에 오른 다음 무엇을 봤을까? 그림자인 걸 안 다음에는 어떻게 했을까?",
   pages:[{img:"page1.webp",t:"콩이가 뼈다귀를 물고 외나무다리에 올랐어요.",cl:["외나무다리에"]},{img:"page2.webp",t:"물속 그림자를 보고 더 큰 뼈다귀인 줄 알았어요.",cl:["그림자를"]},{img:"page3.webp",t:"그림자인 걸 알고 뼈다귀를 꼭 물고 건넜어요.",cl:["꼭 물고"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"강아지 콩이가 맛있는 뼈다귀를 얻었어요. 신이 나서 개울 위 외나무다리를 건너는 길이었지요."},
  {scene:[{gloom:false},{state:{pup:["bridge","look"],shadow:["waterSpot","stand"]}},{cam:[50,74,1.25],cms:0}],text:"다리 한가운데에서 콩이는 물속을 보았어요. 어라? 물속 강아지도 뼈다귀를 물고 있잖아요!"},
  {pov:{img:"page2.webp",kb:"pan"},who:"pup",text:"\"저 뼈다귀가 더 커 보여…\" 콩이는 하마터면 멍! 하고 짖을 뻔했어요. 짖으면 입에 문 뼈다귀가 퐁당 빠지는데 말이에요."},
  {scene:[{state:{pup:["bridge","look"],shadow:["waterSpot","stand"]}},{cam:[50,74,1.2],cms:0}],text:"콩이는 꾹 참고 고개만 갸웃해 봤어요. 물속 강아지도 똑같이 갸웃! \"아하, 내 그림자였구나!\""},
  {pov:{img:"page3.webp",kb:"in"},text:"콩이는 뼈다귀를 꼭 물고 사뿐사뿐 다리를 건넜어요. 저녁 마당에서 먹는 내 뼈다귀가 세상에서 제일 맛있었답니다."},
  {scene:[{state:"end"},{cam:["pup",1.3],cms:0},{prop:["🦴",84,76]}],text:"지금 가진 것을 소중히 하는 콩이가 되었어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 콩이의 저녁 산책",ask:"저녁을 먹은 콩이는 무엇을 할까?",lead:"콩이는…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{pup:["yard","stand"],shadow:["waterSpot","stand"]},tpl:"콩이는 {A}. 마지막에 {B}.",
  A:[{t:"개울가에서 그림자 놀이를 했어요",e:"💧",s:[{move:"pup",to:"bridgeR",pose:"look",ms:1600},{prop:["💧",56,80]}]},
     {t:"반딧불이를 따라 산책했어요",e:"✨",s:[{move:"pup",to:"path",pose:"walk",ms:1800},{prop:["✨",20,70]}]},
     {t:"뼈다귀를 마당에 소중히 묻어 뒀어요",e:"🦴",s:[{prop:["🦴",86,78]}]}],
  B:[{t:"보름달 아래서 기분 좋게 꼬리를 흔들었어요",e:"🌕",s:[{prop:["🌕",70,18]},{fx:"confetti"}]},
     {t:"포근한 집에서 쿨쿨 잠들었어요",e:"💤",s:[{move:"pup",to:"homeP",pose:"stand",ms:1200},{prop:["💤",92,70]},{fx:"confetti"}]},
     {t:"내일은 친구와 나눠 먹기로 했어요",e:"💛",s:[{prop:["💛",82,70]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 물수제비를 맞고 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈아기 돼지 삼 형제〉 — book 12. 주인 영웅: 든든 돼지(pig), 악당: 흑묘(black).
   무대: 왼쪽 지푸라기 집(0~30%), 가운데 나무 집(30~60%), 오른쪽 벽돌집(60~100%). 순한 판: 아무도 다치지 않고, 늑대는 지쳐서 도망. */;
