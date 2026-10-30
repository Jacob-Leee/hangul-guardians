/* 〈원숭이의 뒤죽박죽 도서관〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b9) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b9={dir:"books/b9/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  mon:{n:"사서 원숭이 또로",voice:"sb_mon",h:30,poses:{stand:["mon_stand.webp",1],walk:["mon_stand.webp",1],hang:["mon_hang.webp",1],happy:["mon_stand.webp",1]}},
  pand:{n:"꼬마 판다 포포",voice:"sb_pand",h:26,poses:{stand:["pand_stand.webp",1],walk:["pand_stand.webp",1],happy:["pand_happy.webp",1],sad:["pand_stand.webp",.92]}}},
 at:{deskL:[12,82],shelfG:[24,80],shelfN:[34,80],cart:[48,80],ladder:[58,78],readSpot:[70,84],nook:[82,82],corner:[92,84],top:[52,46]},
 broken:{mon:["cart","stand"],pand:["readSpot","sad"]},
 endState:{mon:["shelfG","happy"],pand:["readSpot","happy"]},
 claim:{who:"mon",t:"아무 칸에나 꽂으면 더 빨라! 정리는 귀찮아!"},
 sentence:{tokens:["책은","아무","칸에나","꽂으면","돼요."],bad:2,fix:"제 칸에"},
 records:[
  {k:"shelf",ic:"📚",place:"책꽂이 이름표",at:[24,58],t:"책꽂이에는 ㄱ, ㄴ, ㄷ 이름표가 붙어 있어요. 책등의 첫 글자와 같은 칸이 그 책의 집이에요.",clue:["첫 글자와 같은 칸"]},
  {k:"panda",ic:"🐼",place:"읽기 자리",at:[70,64],t:"꼬마 판다 포포가 공룡책을 찾지 못해 울상이에요. '어제는 ㄱ 칸에 있었는데…'",clue:["공룡책","ㄱ 칸"]},
  {k:"cart",ic:"🧺",place:"반납 수레",at:[48,62],t:"반납 수레의 책들은 이름표 순서대로 다시 제자리로 돌아가요. 그래야 다음 친구가 바로 찾아요.",clue:["제자리로"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","🔖","✨"]},text:"열두 이야기 도서관의 아홉 번째 책장에는 〈원숭이의 뒤죽박죽 도서관〉이 꽂혀 있어요. 글자 순서대로 정리하는 멋진 사서 이야기예요."},
  {pov:{bg:"@lib",vil:true},who:"v_fat",text:"그런데 먹보 뚱냥이 과자를 먹으며 책을 펼쳤어요. \"정리는 귀찮다냥! 아무 데나 꽂는 이야기로 바꿔야지!\" 뚱냥은 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["mon","?"]},{cam:[45,100,1],cms:0},{cam:["pand",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 책들이 아무 칸에나 꽂히고, 꼬마 판다는 좋아하는 공룡책을 찾을 수 없어요."},
  {scene:[{claim:true},{cam:["mon",1.6],cms:1600}],who:"mon",text:"또로가 책을 휙휙 던져 꽂으며 말했어요. \"아무 칸에나 꽂으면 더 빨라! 정리는 귀찮아!\" 이대로 두면 아무도 책을 찾을 수 없어요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"아무 칸에나 꽂으면 더 빨라! 정리는 귀찮아!\"",who:"mon"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"공룡책을 찾지 못해 울상인 친구는 누구일까?",opts:[["pand","꼬마 판다 포포","sad"],["mon","사서 원숭이"]],a:"pand",ev:["panda"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"읽기 자리 기록을 다시 읽어 보렴. 누가 울상이라고 적혀 있니?",evHint:"그 기록에는 울상 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["공룡책"]},
    {ask:"책을 글자 칸에 맞게 꽂아 주는 건 누구일까?",opts:[["mon","사서 원숭이 또로","hang"],["pand","꼬마 판다"]],a:"mon",ev:["cart","shelf"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"반납 수레 기록을 읽어 보렴. 책은 어디로 돌아간다고 적혀 있니?",evHint:"그 기록에는 정리 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["제자리로","첫 글자와 같은 칸"]}],
   after:[{claim:"x"},{say:"또로의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["바닥에","창밖에"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 책을 어디에 꽂아야 한다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"책꽂이 기록을 다시 읽어 보렴. 책의 집은 어떤 칸이었지?",cl:["첫 글자와 같은 칸"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["mon",null]},{cam:["mon",1.5]},
    {say:"또로가 책등의 첫 글자를 또박또박 읽었어요."},
    {say:"\"고. 공룡책은 ㄱ 칸!\"",who:"mon"},
    {move:"mon",to:"shelfG",pose:"hang",ms:2000},{fx:"burst",at:[24,72]},
    {say:"휙휙 섞여 있던 책들이 글자 칸을 찾아 차곡차곡 돌아갔어요."},
    {move:"mon",to:"readSpot",pose:"walk",ms:1800},{prop:["📗",70,74]},
    {pose:["pand","happy"]},{say:"\"내 공룡책이다! 고마워, 또로!\"",who:"pand"},
    {cam:null},{fx:"confetti"}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"책이 섞인 건 언제일까? 글자 순서대로 꽂은 다음에는 무슨 일이 생겼을까?",
   pages:[{img:"page1.webp",t:"도서관 책들은 글자 칸에 가지런히 있었어요.",cl:["가지런히"]},{img:"page2.webp",t:"책이 뒤죽박죽 섞여 아무도 찾지 못했어요.",cl:["뒤죽박죽"]},{img:"page3.webp",t:"첫 글자 칸에 꽂자 포포가 공룡책을 찾았어요.",cl:["첫 글자 칸에"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"숲속 나무 도서관의 사서는 재주 많은 원숭이 또로예요. 책들은 ㄱ, ㄴ, ㄷ 글자 칸에 가지런히 살아요."},
  {scene:[{gloom:false},{state:{mon:["cart","stand"],pand:["readSpot","stand"]}},{cam:["mon",1.5],cms:0}],who:"mon",text:"\"책의 집은 첫 글자 칸! 고래책도 '고', 공룡책도 '고', 모두 ㄱ 칸이야.\""},
  {pov:{img:"page2.webp",kb:"pan"},text:"그런데 어느 날 책들이 뒤죽박죽 섞여 버렸어요. 포포는 공룡책을 찾지 못해 울상이 되었지요."},
  {scene:[{state:{mon:["ladder","hang"],pand:["readSpot","sad"]}},{cam:["mon",1.3],cms:0}],who:"mon",text:"\"걱정 마, 포포! 책등의 첫 글자를 읽으면 집을 찾을 수 있어.\""},
  {pov:{img:"page3.webp",kb:"in"},text:"고, 나, 다… 또로가 글자 순서대로 책을 꽂자, 공룡책이 ㄱ 칸에서 반짝 나타났어요."},
  {scene:[{state:"end"},{cam:[60,76,1.15],cms:0},{prop:["📗",70,72]}],text:"포포는 공룡책을 꼭 안고 활짝 웃었어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 도서관의 새 친구",ask:"정리가 끝난 도서관에서 무엇을 할까?",lead:"또로와 포포는…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{mon:["shelfG","stand"],pand:["readSpot","stand"]},tpl:"또로와 포포는 {A}. 마지막에 {B}.",
  A:[{t:"공룡책을 소리 내어 같이 읽었어요",e:"📗",s:[{move:"mon",to:"readSpot",pose:"walk",ms:1400},{prop:["📗",70,72]}]},
     {t:"새 책에 글자 이름표를 붙였어요",e:"🔖",s:[{move:"mon",to:"shelfN",pose:"hang",ms:1200},{prop:["🔖",34,64]}]},
     {t:"책 찾기 놀이를 했어요",e:"🔎",s:[{move:"pand",to:"shelfG",pose:"walk",ms:1400},{prop:["🔎",24,66]}]}],
  B:[{t:"포포가 '꼬마 사서' 배지를 받았어요",e:"🎖️",s:[{prop:["🎖️",70,66]},{fx:"confetti"}]},
     {t:"둘이 쿠션에서 나란히 책을 읽다 잠들었어요",e:"💤",s:[{move:"mon",to:"nook",pose:"stand",ms:1200},{prop:["💤",82,70]},{fx:"confetti"}]},
     {t:"도서관에 '글자 칸 지도'가 생겼어요",e:"🗺️",s:[{prop:["🗺️",12,64]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 과자 부스러기를 흘리며 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈빨간 암탉〉 — book 10. 주인 영웅: 새벽 닭(rooster), 악당: 백묘(white).
   무대: 왼쪽 밀밭(0~40%), 가운데 마당·반죽대(40~65%), 오른쪽 가마·나눔 식탁(65~100%). */;
