/* 〈소가 된 게으름뱅이〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b3) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b3={dir:"books/b3/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  boy:{n:"게으른 소년 돌이",voice:"sb_boy",h:30,poses:{stand:["boy_stand.webp",1],walk:["boy_stand.webp",1],sleep:["boy_sleep.webp",.96],happy:["boy_happy.webp",1],ox:["oxboy_stand.webp",1.18],oxwalk:["oxboy_walk.webp",1.18]}},
  old:{n:"탈 할아버지",voice:"sb_old",h:32,poses:{stand:["old_stand.webp",1],walk:["old_stand.webp",1]}},
  cow:{n:"얼룩소",voice:"narrator",h:34,poses:{stand:["oxboy_walk.webp",1],walk:["oxboy_walk.webp",1]}}},
 at:{home:[10,86],bench:[22,84],yard:[30,88],gate:[40,90],field:[52,88],field2:[63,86],hill:[71,86],meal:[84,84],barn:[93,82]},
 broken:{boy:["bench","sleep"],old:["field","stand"],cow:["barn","stand"]},
 endState:{boy:["field","happy"],old:["meal","stand"],cow:["field2","stand"]},
 claim:{who:"boy",t:"모자를 써도 아무 일도 없었어! 일은 안 해도 돼!"},
 sentence:{tokens:["모자를","쓴","소년은","나비가","되었어요."],bad:3,fix:"소가"},
 records:[
  {k:"hat",ic:"🎩",place:"마당 평상",at:[22,64],t:"할아버지가 소년에게 신기한 소 모자를 주었어요. 소년이 모자를 쓰자 펑! 커다란 소가 되었어요.",clue:["펑!","소가 되었어요"]},
  {k:"field",ic:"🌾",place:"보리밭",at:[55,70],t:"소가 된 소년은 할아버지네 밭에서 하루 종일 일했어요. 땀이 났지만 마음이 뿌듯했어요.",clue:["하루 종일 일했어요"]},
  {k:"meal",ic:"🍚",place:"저녁 밥상",at:[84,60],t:"일을 마친 소년은 저녁밥을 제일 맛있게 먹었어요. '일하고 먹는 밥이 최고야!'",clue:["일하고 먹는 밥이 최고야"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","✨","🎩"]},text:"열두 이야기 도서관의 세 번째 책장에는 〈소가 된 게으름뱅이〉가 꽂혀 있어요. 땀 흘려 일하는 기쁨을 알려 주는 책이에요."},
  {pov:{bg:"@lib",vil:true},who:"v_gray",text:"그런데 꾀부리기 대장 회색냥이 책을 펼쳤어요. \"일은 지루한 거다냥! 놀기만 하는 이야기로 바꿔야지!\" 회색냥은 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["boy","?"]},{cam:[30,100,1],cms:0},{cam:["boy",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 소년은 모자를 써도 변하지 않고, 보리밭에는 일하는 사람이 아무도 없어요."},
  {scene:[{claim:true},{cam:["boy",1.6],cms:1600}],who:"boy",text:"소년은 평상에 누워 말했어요. \"모자를 써도 아무 일도 없었어! 일은 안 해도 돼!\" 이대로 두면 아무도 '일하고 먹는 밥의 맛'을 배울 수 없어요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"모자를 써도 아무 일도 없었어! 일은 안 해도 돼!\"",who:"boy"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"신기한 소 모자를 쓴 사람은 누구일까?",opts:[["boy","게으른 소년","sleep"],["old","탈 할아버지"]],a:"boy",ev:["hat"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"평상 기록을 다시 읽어 보렴. 누가 모자를 썼다고 적혀 있니?",evHint:"그 기록에는 모자 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["소가 되었어요"]},
    {ask:"저녁밥을 제일 맛있게 먹은 사람은 누구일까?",opts:[["old","탈 할아버지"],["boy","일을 마친 소년","happy"]],a:"boy",ev:["meal","field"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"밥상 기록을 읽어 보렴. 누가 밥을 제일 맛있게 먹었니?",evHint:"그 기록에는 저녁밥 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["일하고 먹는 밥이 최고야","하루 종일 일했어요"]}],
   after:[{claim:"x"},{say:"소년의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["공주가","바위가"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 모자를 쓴 소년이 무엇이 되었다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"평상 기록을 다시 읽어 보렴. 펑! 소리 뒤에 무엇이 되었지?",cl:["펑!","소가 되었어요"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["boy",null]},{cam:["boy",1.5]},
    {say:"소년이 신기한 소 모자를 머리에 꾹 눌러썼어요."},
    {fx:"burst",at:[22,78]},{pose:["boy","ox"]},
    {say:"펑! 소년은 커다란 소가 되었어요."},
    {move:"boy",to:"field",pose:"oxwalk",ms:2600},
    {say:"소가 된 소년은 할아버지와 함께 밭을 갈았어요. 땀이 또록또록 났어요."},
    {fx:"burst",at:[52,78]},{pose:["boy","happy"]},
    {say:"\"일하고 먹는 밥이 최고야!\"",who:"boy"},
    {cam:null},{move:"boy",to:"meal",pose:"walk",end:"happy",ms:3000}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"모자를 쓰기 전과 쓴 뒤를 생각해 봐. 일을 마친 다음에 무엇을 했을까?",
   pages:[{img:"page1.webp",t:"소년은 매일 평상에서 낮잠만 잤어요.",cl:["낮잠만"]},{img:"page2.webp",t:"소 모자를 쓴 소년은 소가 되어 밭에서 일했어요.",cl:["소가 되어"]},{img:"page3.webp",t:"소년은 일하고 먹는 저녁밥이 제일 맛있었어요.",cl:["제일 맛있었어요"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"옛날 어느 마을에 낮잠만 자는 게으른 소년이 살았어요. 밭일은 늘 할아버지 몫이었지요."},
  {scene:[{gloom:false},{state:{boy:["bench","stand"],old:["yard","stand"],cow:["barn","stand"]}},{cam:["old",1.5],cms:0}],who:"old",text:"탈 할아버지가 말했어요. \"이 소 모자를 써 보렴. 신기한 일이 생길 거란다.\""},
  {pov:{img:"page2.webp",kb:"pan"},text:"모자를 쓴 소년은 펑! 소리와 함께 커다란 소가 되었어요. 소가 된 소년은 밭에서 하루 종일 일했어요."},
  {scene:[{state:{boy:["field","ox"],old:["field2","stand"],cow:["hill","stand"]}},{cam:[55,80,1.2],cms:0},{move:"boy",to:"field2",pose:"oxwalk",ms:1800}],text:"쟁기를 끌고, 짐을 나르고… 땀이 났지만 마음은 이상하게 뿌듯했어요."},
  {pov:{img:"page3.webp",kb:"in"},who:"boy",text:"저녁이 되자 모자가 스르륵 벗겨졌어요. \"일하고 먹는 밥이 최고야!\""},
  {scene:[{state:"end"},{cam:["boy",1.4],cms:0}],text:"다음 날부터 소년은 아침 일찍 일어나 할아버지를 도왔어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 소년의 다음 날 아침은?",ask:"다시 아침이 밝았어요. 소년은 무엇을 할까?",lead:"소년은 아침에…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{boy:["home","stand"],old:["field","stand"],cow:["field2","stand"]},tpl:"소년은 아침에 {A}. 마지막에 {B}.",
  A:[{t:"할아버지보다 먼저 밭에 나갔어요",e:"🌾",s:[{move:"boy",to:"field",pose:"walk",end:"stand",ms:1600}]},
     {t:"얼룩소에게 싱싱한 풀을 가져다주었어요",e:"🐂",s:[{move:"boy",to:"field2",pose:"walk",end:"happy",ms:1400},{prop:["🌿",63,78]}]},
     {t:"평상을 반짝반짝 닦았어요",e:"✨",s:[{move:"boy",to:"bench",pose:"walk",end:"stand",ms:1200},{prop:["✨",22,76]}]}],
  B:[{t:"할아버지가 소년을 꼭 안아 주었어요",e:"💛",s:[{move:"old",to:"field",pose:"walk",ms:1200},{prop:["💛",52,70]},{fx:"confetti"}]},
     {t:"저녁밥을 두 그릇이나 먹었어요",e:"🍚",s:[{move:"boy",to:"meal",pose:"walk",end:"happy",ms:1600},{prop:["🍚",84,78]},{fx:"confetti"}]},
     {t:"소 모자는 벽에 잘 걸어 두기로 했어요",e:"🎩",s:[{move:"boy",to:"home",pose:"walk",end:"stand",ms:1500},{prop:["🎩",10,70]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 하품을 하며 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈해와 달이 된 오누이〉 — book 4. 주인 영웅: 대장 호랑이(tiger), 악당: 호랑이냥(tiger).
   무대: 왼쪽 초가집·문(0~30%), 가운데 큰 나무(위로 하늘 동아줄), 오른쪽 언덕·들판. 순한 판: 아무도 다치지 않고, 호랑이는 엉덩방아만 찧고 도망. */;
