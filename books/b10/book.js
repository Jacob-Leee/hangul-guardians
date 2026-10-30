/* 〈빨간 암탉〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b10) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b10={dir:"books/b10/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  hen:{n:"빨간 암탉",voice:"sb_hen",h:28,poses:{stand:["hen_stand.webp",1],walk:["hen_stand.webp",1],work:["hen_work.webp",1],happy:["hen_stand.webp",1]}},
  duck:{n:"오리 둥둥",voice:"sb_duck",h:26,poses:{stand:["duck_stand.webp",1],walk:["duck_stand.webp",1]}},
  bird:{n:"참새 짹짹",voice:"sb_bird",h:20,poses:{stand:["bird_stand.webp",1],walk:["bird_stand.webp",1]}}},
 at:{field:[20,86],field2:[30,86],gate:[40,88],yard:[50,86],dough:[58,82],oven:[72,82],table:[84,84],porch:[92,84],pond:[10,88]},
 broken:{hen:["oven","work"],duck:["table","stand"],bird:["porch","stand"]},
 endState:{hen:["table","happy"],duck:["dough","stand"],bird:["yard","stand"]},
 claim:{who:"duck",t:"구경만 해도 갓 구운 빵을 먹을 수 있대! 신난다!"},
 sentence:{tokens:["빵은","구경만 한","친구와","나눠","먹어요."],bad:1,fix:"도와준"},
 records:[
  {k:"seed",ic:"🌾",place:"밀밭",at:[25,66],t:"암탉은 혼자 밀을 심고 거두었어요. '누가 도와줄래?' 물었지만 친구들은 '싫어' 했어요.",clue:["혼자 밀을","싫어"]},
  {k:"oven",ic:"🍞",place:"가마",at:[72,60],t:"암탉은 반죽을 치대고 가마에 빵을 구웠어요. 고소한 냄새가 마당 가득 퍼졌어요.",clue:["빵을 구웠어요"]},
  {k:"table",ic:"🧺",place:"나눔 식탁",at:[84,64],t:"암탉이 말했어요. '빵은 도와준 친구와 나눠 먹을 거야.' 오리는 부끄러워 고개를 숙였어요.",clue:["도와준 친구와"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","🍞","🌾"]},text:"열두 이야기 도서관의 열 번째 책장에는 〈빨간 암탉〉이 꽂혀 있어요. 함께 일하고 함께 나누는 기쁨을 알려 주는 책이에요."},
  {pov:{bg:"@lib",vil:true},who:"v_white",text:"그런데 새침한 백묘가 책을 펼쳤어요. \"일은 남이 하고, 빵은 내가 먹는 게 좋다냥!\" 백묘는 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["duck","?"]},{cam:[55,100,1],cms:0},{cam:["duck",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 아무도 암탉을 돕지 않는데, 빵은 구경만 해도 먹을 수 있게 되어 버렸어요."},
  {scene:[{claim:true},{cam:["duck",1.6],cms:1600}],who:"duck",text:"오리 둥둥이 신나서 말했어요. \"구경만 해도 갓 구운 빵을 먹을 수 있대! 신난다!\" 이대로 두면 아무도 '함께 일하는 기쁨'을 배울 수 없어요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"구경만 해도 갓 구운 빵을 먹을 수 있대! 신난다!\"",who:"duck"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"혼자 밀을 심고 빵을 구운 건 누구일까?",opts:[["hen","빨간 암탉","work"],["duck","오리 둥둥"]],a:"hen",ev:["seed","oven"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"밀밭 기록을 다시 읽어 보렴. 누가 혼자 일했다고 적혀 있니?",evHint:"그 기록에는 밀밭 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["혼자 밀을"]},
    {ask:"'싫어' 하고 돕지 않았던 친구는 누구일까?",opts:[["duck","오리 둥둥","stand"],["hen","빨간 암탉"]],a:"duck",ev:["seed","table"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"나눔 식탁 기록을 읽어 보렴. 누가 부끄러워 고개를 숙였니?",evHint:"그 기록에는 그 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["싫어","부끄러워"]}],
   after:[{claim:"x"},{say:"둥둥이의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["낮잠 잔","제일 큰"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 빵을 누구와 나눠 먹는다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"나눔 식탁 기록을 다시 읽어 보렴. 암탉은 누구와 나눈다고 했지?",cl:["도와준 친구와"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["duck",null]},{cam:["duck",1.4]},
    {say:"둥둥이와 짹짹이가 얼굴이 빨개져서 말했어요."},
    {say:"\"미안해, 암탉아. 다음 빵은 우리가 도울게!\"",who:"duck"},
    {move:"duck",to:"dough",pose:"walk",ms:1600,par:true},{move:"bird",to:"yard",pose:"walk",ms:1600},
    {say:"셋은 함께 반죽을 치대고, 새 빵을 가마에 넣었어요."},
    {fx:"burst",at:[72,74]},{prop:["🍞",78,70]},
    {say:"\"도와준 친구와 먹는 빵이 제일 맛있지!\"",who:"hen"},
    {move:"hen",to:"table",pose:"walk",end:"happy",ms:1600},
    {cam:null},{fx:"confetti"},
    {say:"고소한 빵 냄새 속에서 모두가 함께 웃었어요."}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"빵을 굽기 전에 무엇을 했을까? 나눠 먹은 건 언제일까?",
   pages:[{img:"page1.webp",t:"암탉이 혼자 밀을 심고 거두었어요.",cl:["혼자"]},{img:"page2.webp",t:"암탉이 반죽을 치대 가마에 빵을 구웠어요.",cl:["빵을 구웠어요"]},{img:"page3.webp",t:"도와준 친구와 빵을 나눠 먹기로 했어요.",cl:["도와준 친구와"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"빨간 암탉이 밀알 한 줌을 주웠어요. \"누가 밀 심는 걸 도와줄래?\" \"싫어!\" 둥둥이도 짹짹이도 고개를 저었어요."},
  {scene:[{gloom:false},{state:{hen:["field","work"],duck:["pond","stand"],bird:["porch","stand"]}},{cam:["hen",1.4],cms:0}],who:"hen",text:"\"그럼 나 혼자 할게.\" 암탉은 밀을 심고, 물을 주고, 황금빛 밀을 거두었어요."},
  {pov:{img:"page2.webp",kb:"pan"},text:"암탉은 밀을 빻아 반죽을 치대고, 가마에 빵을 구웠어요. 고소한 냄새가 마당 가득 퍼졌지요."},
  {scene:[{state:{hen:["oven","work"],duck:["gate","stand"],bird:["gate","stand"]}},{cam:[76,74,1.2],cms:0},{prop:["🍞",78,70]}],who:"duck",text:"\"냄새 좋다… 우리도 먹고 싶어.\" 둥둥이와 짹짹이가 꼴깍 침을 삼켰어요."},
  {pov:{img:"page3.webp",kb:"in"},who:"hen",text:"\"빵은 도와준 친구와 나눠 먹을 거야. 다음엔 같이 만들래?\" \"응! 꼭 도울게!\""},
  {scene:[{state:"end"},{cam:[70,78,1.1],cms:0}],text:"다음 빵은 셋이 함께 만들어, 셋이 나눠 먹었어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 다음 빵 굽는 날",ask:"이번에는 셋이 함께예요. 무엇부터 할까?",lead:"셋은 함께…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{hen:["field","stand"],duck:["field2","stand"],bird:["yard","stand"]},tpl:"셋은 함께 {A}. 마지막에 {B}.",
  A:[{t:"밀밭에 씨앗을 나란히 심었어요",e:"🌾",s:[{prop:["🌾",25,76]},{move:"hen",to:"field",pose:"work",ms:1200}]},
     {t:"반죽을 콩콩 치댔어요",e:"🥣",s:[{move:"duck",to:"dough",pose:"walk",ms:1200},{prop:["🥣",58,72]}]},
     {t:"꿀과 딸기를 얹을 준비를 했어요",e:"🍓",s:[{prop:["🍓",84,72]},{prop:["🍯",80,74]}]}],
  B:[{t:"세 가지 모양 빵이 나란히 나왔어요",e:"🍞",s:[{prop:["🍞",72,70]},{fx:"confetti"}]},
     {t:"암탉이 '최고의 일꾼' 모자를 나눠 줬어요",e:"👒",s:[{prop:["👒",50,70]},{fx:"confetti"}]},
     {t:"남은 빵은 이웃 생쥐네에 선물했어요",e:"🎁",s:[{prop:["🎁",92,74]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 코를 킁킁대며 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈개와 그림자〉 — book 11. 주인 영웅: 용감한 개(dog), 악당: 보라냥(purple).
   무대: 왼쪽 산책길(0~35%), 가운데 개울·외나무다리(35~65%), 오른쪽 집 마당(65~100%). 물속 그림자는 다리 아래. */;
