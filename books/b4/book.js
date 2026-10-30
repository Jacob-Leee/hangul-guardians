/* 〈해와 달이 된 오누이〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b4) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b4={dir:"books/b4/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  sis:{n:"누나 해순이",voice:"sb_sis",h:30,poses:{stand:["sis_stand.webp",1],walk:["sis_stand.webp",1],scared:["sis_scared.webp",.95]}},
  bro:{n:"동생 달이",voice:"sb_bro",h:27,poses:{stand:["bro_stand.webp",1],walk:["bro_stand.webp",1],scared:["bro_scared.webp",.95]}},
  tig:{n:"떡 좋아하는 호랑이",voice:"sb_tig",h:40,poses:{stand:["tig_stand.webp",1],walk:["tig_prowl.webp",1],prowl:["tig_prowl.webp",1]}}},
 at:{house:[14,86],door:[24,86],yard:[33,88],tree:[52,82],treeMid:[52,60],treeTop:[52,40],rope:[52,26],hill:[72,86],field:[86,88],far:[94,88]},
 broken:{sis:["treeTop","scared"],bro:["treeMid","scared"],tig:["tree","prowl"]},
 endState:{sis:["rope","stand"],bro:["treeTop","stand"],tig:["far","stand"]},
 claim:{who:"tig",t:"동아줄은 내 거다! 하늘은 호랑이 차지다!"},
 sentence:{tokens:["튼튼한","동아줄이","호랑이에게","스르륵","내려왔어요."],bad:2,fix:"오누이에게"},
 records:[
  {k:"door",ic:"🚪",place:"문틈",at:[24,64],t:"문밖에서 '엄마란다, 문 열어라' 하는 굵은 목소리가 났어요. 문틈으로 보니 털북숭이 꼬리가 보였어요.",clue:["굵은 목소리","털북숭이 꼬리"]},
  {k:"tree",ic:"🌳",place:"큰 나무",at:[52,54],t:"오누이는 뒷마당 큰 나무 위로 올라갔어요. 그리고 하늘에 빌었어요. '저희를 도와주세요!'",clue:["나무 위로 올라갔어요"]},
  {k:"rope",ic:"🪢",place:"하늘 동아줄",at:[52,28],t:"하늘에서 튼튼한 동아줄이 오누이에게 스르륵 내려왔어요. 오누이는 줄을 잡고 올라가 해와 달이 되었어요.",clue:["오누이에게","해와 달이 되었어요"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","🌞","🌙"]},text:"열두 이야기 도서관의 네 번째 책장에는 〈해와 달이 된 오누이〉가 꽂혀 있어요. 밤하늘의 해와 달이 어떻게 생겼는지 알려 주는 책이에요."},
  {pov:{bg:"@lib",vil:true},who:"v_tiger",text:"그런데 힘자랑 대장 호랑이냥이 책을 펼쳤어요. \"어흥! 하늘은 호랑이가 차지해야 멋지다냥!\" 호랑이냥은 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["tig","?"]},{cam:[40,100,1],cms:0},{cam:["tig",1.4],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 동아줄이 엉뚱하게 호랑이에게 내려오고, 오누이는 나무 위에서 내려오지 못해요."},
  {scene:[{claim:true},{cam:["tig",1.5],cms:1600}],who:"tig",text:"호랑이가 동아줄을 흔들며 말했어요. \"동아줄은 내 거다! 하늘은 호랑이 차지다!\" 이대로 두면 밤하늘에 해와 달이 뜨지 못해요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"동아줄은 내 거다! 하늘은 호랑이 차지다!\"",who:"tig"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"문밖에서 엄마 흉내를 낸 것은 누구일까?",opts:[["tig","호랑이","prowl"],["bro","동생 달이"]],a:"tig",ev:["door"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"문틈 기록을 다시 읽어 보렴. 문밖에 무엇이 보였니?",evHint:"그 기록에는 문밖 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["털북숭이 꼬리"]},
    {ask:"튼튼한 동아줄을 잡고 하늘로 올라간 것은 누구일까?",opts:[["tig","호랑이"],["sis","오누이","stand"]],a:"sis",ev:["rope","tree"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"동아줄 기록을 읽어 보렴. 줄이 누구에게 내려왔다고 적혀 있니?",evHint:"그 기록에는 동아줄 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["오누이에게","나무 위로 올라갔어요"]}],
   after:[{claim:"x"},{say:"호랑이의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["다람쥐에게","구름에게"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 동아줄이 누구에게 내려왔다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"하늘 동아줄 기록을 다시 읽어 보렴. 줄을 잡은 건 누구였지?",cl:["오누이에게"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["tig",null]},{cam:[52,60,1.2]},
    {say:"오누이가 하늘에 빌자, 튼튼한 동아줄이 오누이에게 스르륵 내려왔어요."},
    {move:"sis",to:"treeTop",pose:"walk",ms:1400,par:true},{move:"bro",to:"treeMid",pose:"walk",ms:1400},
    {say:"오누이는 줄을 꼭 잡고 하늘로 올라갔어요."},
    {move:"sis",to:"rope",pose:"stand",ms:1600,par:true},{move:"bro",to:"treeTop",pose:"stand",ms:1600},
    {say:"\"내 것도 내려 다오!\" 호랑이에게는 뚝 끊어지는 줄이 내려왔어요.",who:"tig"},
    {fx:"burst",at:[72,80]},{move:"tig",to:"far",pose:"walk",ms:1800},
    {say:"호랑이는 엉덩방아를 찧고 멀리 도망갔어요."},
    {say:"\"우리는 해와 달이 되어 세상을 비출게!\"",who:"sis"},
    {cam:null},{fx:"confetti"}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"호랑이가 온 다음 오누이는 어디로 갔을까? 하늘에 빈 다음에는 무엇이 내려왔을까?",
   pages:[{img:"page1.webp",t:"문밖에서 호랑이가 엄마 흉내를 냈어요.",cl:["엄마 흉내를"]},{img:"page2.webp",t:"오누이는 큰 나무 위로 올라가 하늘에 빌었어요.",cl:["하늘에 빌었어요"]},{img:"page3.webp",t:"오누이는 동아줄을 타고 올라가 해와 달이 되었어요.",cl:["해와 달이"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"떡 장수 엄마가 늦는 밤, 오누이는 집을 지키고 있었어요. 그때 문밖에서 굵은 목소리가 들렸어요."},
  {scene:[{gloom:false},{state:{sis:["door","scared"],bro:["house","scared"],tig:["yard","prowl"]}},{cam:["tig",1.4],cms:0}],who:"tig",text:"\"엄마란다, 문 열어라.\" 하지만 문틈으로 털북숭이 꼬리가 보였어요. 호랑이였어요!"},
  {pov:{img:"page2.webp",kb:"pan"},text:"오누이는 살금살금 뒷마당으로 나가 큰 나무 위로 올라갔어요. 그리고 하늘에 빌었어요. \"저희를 도와주세요!\""},
  {scene:[{state:{sis:["treeTop","stand"],bro:["treeMid","stand"],tig:["tree","prowl"]}},{cam:[52,50,1.2],cms:0},{move:"sis",to:"rope",pose:"stand",ms:1500,par:true},{move:"bro",to:"treeTop",pose:"stand",ms:1500}],text:"하늘에서 튼튼한 동아줄이 오누이에게 스르륵 내려왔어요. 오누이는 줄을 꼭 잡고 올라갔어요."},
  {pov:{img:"page3.webp",kb:"in"},text:"호랑이에게는 뚝 끊어지는 줄이 내려와, 호랑이는 엉덩방아를 찧고 도망갔어요. 하늘로 올라간 오누이는 해와 달이 되었어요."},
  {scene:[{state:{sis:["rope","stand"],bro:["treeTop","stand"],tig:["far","stand"]}},{cam:[52,40,1.1],cms:0},{prop:["🌞",44,16]},{prop:["🌙",62,14]}],text:"누나는 따뜻한 해님, 동생은 포근한 달님이 되어 세상을 비추었어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 해님 달님의 하루",ask:"해님과 달님이 된 오누이는 무엇을 할까?",lead:"낮에 해님은…",lead2:"밤에 달님은…",ask2:"밤에 달님은 무엇을 할까?",
  start:{sis:["treeTop","stand"],bro:["treeMid","stand"],tig:["far","stand"]},tpl:"낮에 해님은 {A}. 밤에 달님은 {B}.",
  A:[{t:"꽃밭을 따뜻하게 데워 줬어요",e:"🌻",s:[{prop:["🌞",40,18]},{prop:["🌻",80,80]}]},
     {t:"빨래를 뽀송뽀송 말려 줬어요",e:"👕",s:[{prop:["🌞",40,18]},{prop:["👕",20,70]}]},
     {t:"무지개다리를 놓아 줬어요",e:"🌈",s:[{prop:["🌈",55,30]}]}],
  B:[{t:"별들에게 자장가를 들려줬어요",e:"⭐",s:[{prop:["🌙",60,16]},{prop:["⭐",30,24]},{fx:"confetti"}]},
     {t:"길 잃은 반딧불이를 집까지 비춰 줬어요",e:"✨",s:[{prop:["🌙",60,16]},{prop:["✨",76,60]},{fx:"confetti"}]},
     {t:"꿈나라 문을 살짝 열어 줬어요",e:"💤",s:[{prop:["🌙",60,16]},{prop:["💤",24,30]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 꼬리를 감추며 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈비를 잃어버린 꼬마 용〉 — book 5 (우리 창작 이야기). 주인 영웅: 하늘 용(dragon), 악당: 보라냥(purple).
   무대: 왼쪽 주문 책상(0~35%), 가운데 마을 꽃밭(35~70%), 오른쪽 구름 언덕(70~100%, 위쪽 구름). */;
