/* 〈비를 잃어버린 꼬마 용〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b5) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b5={dir:"books/b5/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  yong:{n:"꼬마 용 이슬이",voice:"sb_yong",h:32,poses:{stand:["yong_stand.webp",1],walk:["yong_fly.webp",1],sad:["yong_sad.webp",.96],fly:["yong_fly.webp",1],happy:["yong_stand.webp",1]}},
  cloud:{n:"구름 할머니",voice:"sb_cloud",h:30,poses:{stand:["cloud_stand.webp",1],walk:["cloud_stand.webp",1]}}},
 at:{desk:[16,80],book:[26,78],yard:[36,86],flower:[54,86],flower2:[63,86],well:[72,86],hillFoot:[80,80],cloudHill:[86,54],sky:[60,26]},
 broken:{yong:["flower","sad"],cloud:["cloudHill","stand"]},
 endState:{yong:["flower","happy"],cloud:["cloudHill","stand"]},
 claim:{who:"yong",t:"주문을 외워도 비가 안 와! 나는 비를 못 부르는 용인가 봐…"},
 sentence:{tokens:["꼬마","용은","구름에게","자장가를","불렀어요."],bad:3,fix:"비 주문을"},
 records:[
  {k:"book",ic:"📖",place:"주문 책",at:[26,58],t:"구름 할머니가 가르쳐 준 비 주문은 '주룩주룩 내려라'예요. 주문 책에 또박또박 적혀 있어요.",clue:["주룩주룩 내려라"]},
  {k:"flower",ic:"🌻",place:"마을 꽃밭",at:[57,68],t:"비가 오지 않아 꽃밭이 시들시들해졌어요. 마을 친구들이 꼬마 용만 바라보고 있어요.",clue:["시들시들"]},
  {k:"cloud",ic:"☁️",place:"구름 언덕",at:[86,38],t:"바른 주문을 외치면 구름은 주룩주룩 비를 내려 줘요. 구름 할머니가 꼭 약속했어요.",clue:["바른 주문","약속했어요"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","💧","🌈"]},text:"열두 이야기 도서관의 다섯 번째 책장에는 〈비를 잃어버린 꼬마 용〉이 꽂혀 있어요. 꼬마 용이 처음으로 비를 부르는 날의 이야기예요."},
  {pov:{bg:"@lib",vil:true},who:"v_purple",text:"그런데 장난꾸러기 보라냥이 책을 펼쳤어요. \"비 오는 날은 심심하다냥! 주문을 엉터리로 바꿔야지!\" 보라냥은 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["yong","?"]},{cam:[50,100,1],cms:0},{cam:["yong",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 꼬마 용이 아무리 외쳐도 비가 오지 않고, 꽃밭은 점점 시들어 가요."},
  {scene:[{claim:true},{cam:["yong",1.6],cms:1600}],who:"yong",text:"꼬마 용이 풀이 죽어 말했어요. \"주문을 외워도 비가 안 와! 나는 비를 못 부르는 용인가 봐…\" 이대로 두면 꽃밭도, 꼬마 용의 첫 비도 사라져요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"주문을 외워도 비가 안 와! 나는 비를 못 부르는 용인가 봐…\"",who:"yong"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"비 주문을 가르쳐 준 건 누구일까?",opts:[["cloud","구름 할머니","stand"],["yong","꼬마 용"]],a:"cloud",ev:["book"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"주문 책 기록을 다시 읽어 보렴. 누가 가르쳐 줬다고 적혀 있니?",evHint:"그 기록에는 주문 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["주룩주룩 내려라"]},
    {ask:"바른 주문을 외쳐서 비를 불러야 하는 건 누구일까?",opts:[["yong","꼬마 용 이슬이","fly"],["cloud","구름 할머니"]],a:"yong",ev:["cloud","book"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"구름 언덕 기록을 읽어 보렴. 누가 주문을 외치면 비가 온다고 했니?",evHint:"그 기록에는 주문 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["바른 주문"]}],
   after:[{claim:"x"},{say:"꼬마 용의 걱정은 기록과 달랐어요. 주문이 엉터리로 바뀐 거예요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["생일 노래를","숫자 세기를"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 꼬마 용이 구름에게 무엇을 외쳤다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"주문 책 기록을 다시 읽어 보렴. 바른 주문은 무엇이었지?",cl:["주룩주룩 내려라"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["yong",null]},{cam:["yong",1.5]},
    {say:"꼬마 용이 숨을 크게 들이쉬고 하늘을 올려다봤어요."},
    {say:"\"주룩주룩 내려라!\"",who:"yong"},
    {move:"yong",to:"sky",pose:"fly",ms:2000},{fx:"burst",at:[60,30]},
    {say:"구름이 몽글몽글 모여들더니, 주룩주룩 단비를 내렸어요."},
    {prop:["🌧️",54,40]},{prop:["💧",63,60]},
    {say:"시들시들하던 꽃밭이 다시 활짝 피어났어요."},
    {prop:["🌈",70,24]},{cam:null},
    {move:"yong",to:"flower",pose:"fly",end:"happy",ms:2400},
    {say:"\"내가 비를 불렀어! 할머니, 보셨어요?\"",who:"yong"}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"주문을 배운 다음에 무슨 일이 있었을까? 비가 온 건 언제일까?",
   pages:[{img:"page1.webp",t:"꼬마 용은 구름 할머니에게 비 주문을 배웠어요.",cl:["비 주문을"]},{img:"page2.webp",t:"주문이 엉터리로 바뀌어 비가 오지 않았어요.",cl:["비가 오지 않았어요"]},{img:"page3.webp",t:"바른 주문을 외치자 비가 내리고 무지개가 떴어요.",cl:["무지개가"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"하늘 마을의 꼬마 용 이슬이는 아직 비를 불러 본 적이 없어요. 오늘은 구름 할머니에게 비 주문을 배우는 날이에요."},
  {scene:[{gloom:false},{state:{yong:["desk","stand"],cloud:["book","stand"]}},{cam:["cloud",1.5],cms:0}],who:"cloud",text:"구름 할머니가 말했어요. \"비 주문은 '주룩주룩 내려라'란다. 마음을 담아 또박또박 외쳐 보렴.\""},
  {pov:{img:"page2.webp",kb:"pan"},text:"그런데 처음 외친 주문은 영 엉터리였어요. 비는 오지 않고, 마을 꽃밭만 시들시들해졌어요."},
  {scene:[{state:{yong:["flower","sad"],cloud:["cloudHill","stand"]}},{cam:["yong",1.4],cms:0}],who:"yong",text:"\"다시 해 볼래요. 주문 책을 한 글자씩 읽어 볼게요.\" 꼬마 용은 포기하지 않았어요."},
  {pov:{img:"page3.webp",kb:"in"},text:"\"주룩주룩 내려라!\" 바른 주문을 외치자 구름이 모여들고, 단비가 주룩주룩 내렸어요."},
  {scene:[{state:"end"},{cam:[60,60,1.1],cms:0},{prop:["🌈",68,26]}],text:"꽃밭이 활짝 피고 하늘에 무지개가 떴어요. 꼬마 용의 첫 비였어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 비 온 뒤 하늘 마을",ask:"비가 갠 뒤, 꼬마 용은 무엇을 할까?",lead:"꼬마 용은…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{yong:["flower","stand"],cloud:["cloudHill","stand"]},tpl:"꼬마 용은 {A}. 마지막에 {B}.",
  A:[{t:"무지개 미끄럼틀을 탔어요",e:"🌈",s:[{prop:["🌈",60,30]},{move:"yong",to:"sky",pose:"fly",ms:1600}]},
     {t:"물방울 구슬을 모았어요",e:"💧",s:[{move:"yong",to:"well",pose:"walk",end:"happy",ms:1400},{prop:["💧",72,74]}]},
     {t:"꽃밭 친구들과 빗물 발도장을 찍었어요",e:"🌻",s:[{move:"yong",to:"flower2",pose:"walk",end:"happy",ms:1200},{prop:["🌻",63,76]}]}],
  B:[{t:"구름 할머니가 머리를 쓰다듬어 줬어요",e:"💛",s:[{move:"cloud",to:"hillFoot",pose:"walk",ms:1400},{prop:["💛",80,66]},{fx:"confetti"}]},
     {t:"마을에 고운 저녁 무지개가 떴어요",e:"🌈",s:[{prop:["🌈",55,24]},{fx:"confetti"}]},
     {t:"이슬이는 '비 부르는 용' 배지를 받았어요",e:"🎖️",s:[{prop:["🎖️",54,60]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 비를 피해 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈뱀의 숲속 우체국〉 — book 6 (우리 창작 이야기). 주인 영웅: 바람 뱀(snake), 악당: 흑묘(black).
   무대: 왼쪽 우체국·배달 가방(0~35%), 가운데 우체통 숲길(35~70%), 오른쪽 부엉이네 나무(70~100%). */;
