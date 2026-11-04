/* 〈뱀의 숲속 우체국〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b6) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b6={dir:"books/b6/",enterArt:"scene_enter.webp",cover:"cover.webp",bg:"spread.webp",
 actors:{
  post:{n:"우체부 뱀 슈룩이",voice:"sb_post",h:27,poses:{stand:["post_stand.webp",1],walk:["post_slide.webp",1],slide:["post_slide.webp",1],happy:["post_stand.webp",1]}},
  owl:{n:"부엉이 부부장",voice:"sb_owl",h:28,poses:{stand:["owl_stand.webp",1],walk:["owl_stand.webp",1],happy:["owl_happy.webp",1]}}},
 at:{office:[16,84],bag:[26,84],path:[33,88],mail:[46,86],wood:[56,88],mush:[66,88],treeFoot:[74,88],owlNest:[80,58],branch:[91,57]},
 broken:{post:["path","stand"],owl:["owlNest","stand"]},
 endState:{post:["treeFoot","happy"],owl:["owlNest","happy"]},
 claim:{who:"post",t:"이름은 안 읽어도 돼! 아무한테나 주면 더 빨라!"},
 sentence:{tokens:["우체부는","편지를","아무에게나","건네","줘요."],bad:2,fix:"받는 친구에게"},
 records:[
  {k:"mail",ic:"📮",place:"숲속 우체통",at:[38,60],t:"편지 봉투에는 받는 친구의 이름이 또박또박 적혀 있어요. 이름을 읽어야 편지가 제 주인을 찾아가요.",clue:["이름을 읽어야"]},
  {k:"invite",ic:"💌",place:"부엉이네 나무",at:[82,44],t:"부엉이의 생일 초대장이 아직도 도착하지 않았어요. 부엉이는 밤새 우체통만 바라봤어요.",clue:["생일 초대장"]},
  {k:"bag",ic:"🧺",place:"배달 가방",at:[27,64],t:"슈룩이는 편지 이름을 하나씩 읽고, 가는 길 순서대로 차곡차곡 가방에 넣어요.",clue:["하나씩 읽고","차곡차곡"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","💌","🌲"]},text:"열두 이야기 도서관의 여섯 번째 책장에는 〈뱀의 숲속 우체국〉이 꽂혀 있어요. 편지 이름을 읽는 일이 얼마나 소중한지 알려 주는 책이에요."},
  {pov:{bg:"@lib",vil:true},who:"v_black",text:"그런데 그림자 대장 흑묘가 책을 펼쳤어요. \"이름 읽기는 귀찮다냥! 아무한테나 주는 이야기로 바꿔야지!\" 흑묘는 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["post","?"]},{cam:[40,100,1],cms:0},{cam:["post",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 편지들이 엉뚱한 집으로 가고, 부엉이의 생일 초대장은 사라져 버렸어요."},
  {scene:[{claim:true},{cam:["post",1.6],cms:1600}],who:"post",text:"슈룩이가 편지를 마구 뿌리며 말했어요. \"이름은 안 읽어도 돼! 아무한테나 주면 더 빨라!\" 이대로 두면 부엉이는 생일잔치를 열 수 없어요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"이름은 안 읽어도 돼! 아무한테나 주면 더 빨라!\"",who:"post"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"생일 초대장을 밤새 기다린 친구는 누구일까?",opts:[["owl","부엉이","stand"],["post","우체부 뱀"]],a:"owl",ev:["invite"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"부엉이네 나무 기록을 다시 읽어 보렴. 누가 우체통만 바라봤니?",evHint:"그 기록에는 초대장 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["생일 초대장"]},
    {ask:"편지 이름을 하나씩 읽고 배달하는 건 누구일까?",opts:[["post","우체부 뱀 슈룩이","slide"],["owl","부엉이"]],a:"post",ev:["bag","mail"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"배달 가방 기록을 읽어 보렴. 누가 이름을 하나씩 읽는다고 적혀 있니?",evHint:"그 기록에는 배달 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["하나씩 읽고"]}],
   after:[{claim:"x"},{say:"슈룩이의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["고양이에게","바람에게"],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 편지를 누구에게 줘야 한다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"우체통 기록을 다시 읽어 보렴. 이름을 읽으면 편지가 누구를 찾아가지?",cl:["받는 친구","이름을 읽어야"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["post",null]},{cam:["post",1.5]},
    {say:"슈룩이가 흩어진 편지를 주워 이름을 또박또박 읽었어요."},
    {say:"\"부, 엉, 이. 이 초대장의 주인은 부엉이야!\"",who:"post"},
    {move:"post",to:"treeFoot",pose:"slide",ms:2600},
    {say:"슈룩이는 부엉이네 나무로 스르륵 달려갔어요."},
    {fx:"burst",at:[80,50]},{prop:["💌",70,52]},{pose:["owl","happy"]},
    {say:"\"내 생일 초대장이다! 고마워, 슈룩이!\"",who:"owl"},
    {say:"친구들이 몰래 준비한 깜짝 생일잔치 초대장이었어요!"},
    {cam:null},{fx:"confetti"},
    {say:"숲속 편지들이 모두 제 주인을 찾아갔어요."}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"편지가 뒤죽박죽이 된 건 언제일까? 이름을 읽은 다음에는 무슨 일이 생겼을까?",
   pages:[{img:"page1.webp",t:"바람 숲 우체국의 우체부는 뱀 슈룩이예요. 아침마다 숲속 친구들이 우체통에 편지를 넣어요.",cl:["아침마다"]},{img:"page2.webp",t:"그런데 어느 날, 봉투의 이름이 그림자에 가려 보이지 않았어요. 편지들이 엉뚱한 집으로 가 버렸어요.",cl:["엉뚱한 집으로 가 버렸어요"]},{img:"page3.webp",t:"슈룩이는 그림자를 걷어 내고 이름을 또박또박 읽었어요. 초대장이 드디어 주인을 찾았어요.",cl:["드디어"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"바람 숲 우체국의 우체부는 뱀 슈룩이예요. 아침마다 숲속 친구들이 우체통에 편지를 넣어요."},
  {scene:[{gloom:false},{state:{post:["bag","stand"],owl:["owlNest","stand"]}},{cam:["post",1.5],cms:0}],who:"post",text:"\"편지 이름을 하나씩 읽고, 가는 길 순서대로 가방에 넣자. 슈룩슈룩!\""},
  {pov:{img:"page2.webp",kb:"pan"},text:"그런데 어느 날, 봉투의 이름이 그림자에 가려 보이지 않았어요. 편지들이 엉뚱한 집으로 가 버렸어요."},
  {scene:[{state:{post:["mail","stand"],owl:["owlNest","stand"]}},{cam:["owl",1.4],cms:0}],who:"owl",text:"\"내 생일 초대장이 안 와… 아무도 내 생일을 모르면 어떡하지?\" 부엉이가 시무룩해졌어요."},
  {pov:{img:"page3.webp",kb:"in"},text:"슈룩이는 그림자를 걷어 내고 이름을 또박또박 읽었어요. \"부엉이네!\" 초대장이 드디어 주인을 찾았어요."},
  {scene:[{state:"end"},{cam:[78,62,1.15],cms:0},{prop:["💌",70,52]}],text:"친구들이 몰래 준비한 깜짝 생일잔치 초대장이었어요! 부엉이네 생일잔치에 숲속 친구들이 모두 모였어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 부엉이네 생일잔치",ask:"초대장을 받은 친구들이 모였어요. 잔치에서 무엇을 할까?",lead:"잔치에 모인 친구들은…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{post:["treeFoot","stand"],owl:["owlNest","happy"]},tpl:"잔치에 모인 친구들은 {A}. 마지막에 {B}.",
  A:[{t:"도토리 케이크에 촛불을 켰어요",e:"🎂",s:[{prop:["🎂",80,70]}]},
     {t:"달빛 아래에서 숨바꼭질을 했어요",e:"🌙",s:[{prop:["🌙",60,20]},{move:"post",to:"wood",pose:"slide",ms:1400}]},
     {t:"나뭇잎 피리를 불며 노래했어요",e:"🎶",s:[{prop:["🎶",74,50]}]}],
  B:[{t:"부엉이가 답장 편지를 썼어요",e:"✉️",s:[{prop:["✉️",70,52]},{fx:"confetti"}]},
     {t:"슈룩이가 '최고 우체부' 배지를 받았어요",e:"🎖️",s:[{prop:["🎖️",74,64]},{fx:"confetti"}]},
     {t:"다 같이 별을 보며 소원을 빌었어요",e:"⭐",s:[{prop:["⭐",66,24]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 그림자 속으로 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈바람을 배달하는 말〉 — book 7 (우리 창작 이야기). 주인 영웅: 질주 말(horse), 악당: 회색냥(gray).
   11/4 아이 혼자 점검: 산꼭대기에 💨(망가진 장면·책 들어갈 때 — "바람이 산꼭대기로 갔다"가 보이게, 변화 장면 첫 줄에서 지움), 순서 2쪽은 되찾은 이야기 문장(녹음 b7_037), 2번 추리 증거는 수레 기록만, 되찾은 4쪽 자리를 마지막 장면과 같게.
   무대(11/4 보호자 그림): 왼쪽 마구간 벽의 배달 지도(3~19%)·바람 병 수레(25~44%), 가운데 들길, 오른쪽 풍차 세 개(53~85%), 산꼭대기는 오른쪽 위. */;
