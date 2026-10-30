/* 〈양치기 소년〉 book data. Loaded before js/app.js. Format: docs/HANDOVER.md → "동화책 데이터 형식".
   Voices (VOX.sb_*) and reading missions (RMS.b8) are at the end of js/app.js. */
window.BOOKDATA=window.BOOKDATA||{};
BOOKDATA.b8={dir:"books/b8/",cover:"page1.webp",bg:"spread.webp",
 actors:{
  shep:{n:"양치기 소년 메에",voice:"sb_shep",h:30,poses:{stand:["shep_stand.webp",1],walk:["shep_stand.webp",1],shout:["shep_shout.webp",1],happy:["shep_stand.webp",1]}},
  lamb:{n:"아기 양 뭉게",voice:"sb_lamb",h:24,poses:{stand:["lamb_stand.webp",1],walk:["lamb_stand.webp",1],scared:["lamb_stand.webp",.92]}},
  wolf:{n:"늑대",voice:"sb_wolf",h:36,poses:{stand:["wolf_stand.webp",1],walk:["wolf_run.webp",1],run:["wolf_run.webp",1]}}},
 at:{rock:[20,82],hillL:[30,86],meadow:[44,88],flock:[54,86],bush:[64,84],gateV:[74,86],bell:[82,80],village:[90,86],far:[6,88]},
 broken:{shep:["meadow","shout"],lamb:["bush","scared"],wolf:["hillL","run"]},
 endState:{shep:["flock","happy"],lamb:["flock","stand"],wolf:["far","run"]},
 claim:{who:"shep",t:"거짓말로 '늑대다!' 해도 친구들은 자꾸 와 줘! 정말 재밌어!"},
 sentence:{tokens:["거짓말을","하면","친구들이","자꾸","믿어요."],bad:4,fix:"안 믿어요."},
 records:[
  {k:"bell",ic:"🔔",place:"마을 종",at:[82,58],t:"거짓말로 종을 두 번 울리자, 친구들은 소년의 말을 점점 믿지 않게 되었어요.",clue:["점점 믿지 않게"]},
  {k:"bush",ic:"🐑",place:"덤불 뒤",at:[64,66],t:"진짜 늑대가 나타나자, 아기 양 뭉게가 덜덜 떨며 덤불 뒤에 숨었어요.",clue:["진짜 늑대","덤불 뒤에 숨었어요"]},
  {k:"rock",ic:"🪨",place:"약속 바위",at:[20,62],t:"소년은 약속 바위 앞에서 다짐했어요. '이제부터 참말만 할게요.' 참말은 친구를 다시 불러 줘요.",clue:["참말만 할게요"]}],
 prologue:[
  {pov:{bg:"@lib",mentor:true,deco:["📚","🐑","🔔"]},text:"열두 이야기 도서관의 여덟 번째 책장에는 〈양치기 소년〉이 꽂혀 있어요. 참말이 왜 소중한지 알려 주는 책이에요."},
  {pov:{bg:"@lib",vil:true},who:"v_tiger",text:"그런데 힘자랑 대장 호랑이냥이 책을 펼쳤어요. \"어흥! 거짓말이 더 재밌다냥!\" 호랑이냥은 문장을 몰래 바꿔 버렸어요."},
  {scene:[{state:"broken"},{gloom:true},{mark:["shep","?"]},{cam:[50,100,1],cms:0},{cam:["shep",1.5],cms:2600}],text:"그러자 이야기가 뒤죽박죽이 되었어요. 소년은 신이 나서 거짓말만 하고, 진짜 늑대가 와도 아무도 모르게 되었어요."},
  {scene:[{claim:true},{cam:["shep",1.6],cms:1600}],who:"shep",text:"소년이 깔깔 웃으며 말했어요. \"거짓말로 '늑대다!' 해도 친구들은 자꾸 와 줘! 정말 재밌어!\" 이대로 두면 아기 양 뭉게가 큰일 나요."},
  {pov:{bg:"@lib",mentor:true,team:true},who:"mentor",text:"거북이 스승님이 말했어요. \"책 속 기록을 찾아 읽으렴. 기록과 다른 문장을 고치면 이야기가 돌아온단다.\" 이제 수비대가 책 속으로 들어갈 차례예요!"}],
 enterLine:"\"가자! 이야기를 되찾자!\"",
 enter:[{say:"\"거짓말로 '늑대다!' 해도 친구들은 자꾸 와 줘! 정말 재밌어!\"",who:"shep"},{say:"정말 그럴까요? 반짝이는 기록을 찾아 읽어 봐요."}],
 steps:[
  {type:"explore",name:"탐색",ask:"그림 속에 숨은 기록을 찾아봐!",hint:"반짝이는 두루마리를 눌러 보렴. 그림 곳곳에 숨어 있단다."},
  {type:"choose",name:"추리",qs:[
    {ask:"진짜 늑대가 왔을 때 덤불 뒤에 숨은 건 누구일까?",opts:[["lamb","아기 양 뭉게","scared"],["shep","양치기 소년"]],a:"lamb",ev:["bush"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"덤불 기록을 다시 읽어 보렴. 누가 숨었다고 적혀 있니?",evHint:"그 기록에는 숨은 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["덤불 뒤에 숨었어요"]},
    {ask:"'이제부터 참말만 할게요' 하고 다짐한 건 누구일까?",opts:[["shep","양치기 소년","shout"],["wolf","늑대"]],a:"shep",ev:["rock","bell"],evAsk:"어느 기록에서 알았니? 기록을 하나 골라 봐.",hint:"약속 바위 기록을 읽어 보렴. 누가 다짐했다고 적혀 있니?",evHint:"그 기록에는 다짐 이야기가 없단다. 다른 기록을 읽어 보렴.",cl:["참말만 할게요"]}],
   after:[{claim:"x"},{say:"소년의 말은 기록과 달랐어요."},{say:"이제 책 속 문장을 고쳐 볼까요?"}]},
  {type:"fix",name:"수정",alts:["춤춰요.","박수 쳐요."],ask1:"기록과 다른 낱말은 어디일까? 콕 눌러 봐!",ask2:"어떤 낱말로 고칠까?",hint1:"기록에는 거짓말을 하면 친구들이 어떻게 된다고 적혀 있었니? 책 속 문장과 비교해 보렴.",hint2:"마을 종 기록을 다시 읽어 보렴. 친구들이 점점 어떻게 되었지?",cl:["점점 믿지 않게"]},
  {type:"script",name:"변화",intro:"문장이 바로잡혔어요! 이야기가 바뀌는 걸 봐요.",script:[
    {claim:false},{mark:["shep",null]},{cam:[56,80,1.2]},
    {say:"그때, 언덕 너머에서 진짜 늑대가 어슬렁어슬렁 나타났어요."},
    {move:"wolf",to:"flock",pose:"run",ms:2200},
    {say:"소년은 숨을 크게 쉬고, 이번에는 참말로 외쳤어요."},
    {pose:["shep","shout"]},{say:"\"진짜 늑대예요! 도와주세요! 참말이에요!\"",who:"shep"},
    {fx:"burst",at:[82,74]},{prop:["🔔",82,70]},
    {say:"약속을 믿은 친구들이 우르르 달려왔어요. 늑대는 깜짝 놀라 꽁지 빠지게 도망갔어요."},
    {move:"wolf",to:"far",pose:"run",ms:1800},
    {pose:["lamb","stand"]},{say:"\"메에! 고마워, 형아!\"",who:"lamb"},
    {cam:null},{fx:"confetti"}],next:"다음: 책장 순서 맞추기"},
  {type:"order",name:"순서",ask:"일어난 순서대로 책장을 놓아 봐!",hint:"거짓말을 한 다음 친구들은 어떻게 되었을까? 참말로 외친 건 언제일까?",
   pages:[{img:"page1.webp",t:"심심한 소년이 거짓말로 '늑대다!' 하고 외쳤어요.",cl:["거짓말로"]},{img:"page2.webp",t:"진짜 늑대가 오자 친구들은 믿지 않았어요.",cl:["믿지 않았어요"]},{img:"page3.webp",t:"참말로 외치고 약속하자 친구들이 돌아왔어요.",cl:["참말로"]}]},
  {type:"story",name:"완성",pages:"restored"}],
 restored:[
  {pov:{img:"page1.webp",kb:"in"},text:"푸른 언덕의 양치기 소년 메에는 양 떼를 돌보다가 심심해졌어요. 그래서 장난으로 외쳤지요. \"늑대다!\""},
  {scene:[{gloom:false},{state:{shep:["meadow","shout"],lamb:["flock","stand"],wolf:["far","stand"]}},{cam:["shep",1.4],cms:0}],text:"마을 친구들이 헐레벌떡 달려왔지만, 늑대는 없었어요. 두 번째 장난에 친구들은 고개를 저었어요."},
  {pov:{img:"page2.webp",kb:"pan"},text:"그런데 이번에는 진짜 늑대가 나타났어요! \"늑대다!\" 소년이 외쳐도 아무도 오지 않았어요. 뭉게는 덤불 뒤에 숨었어요."},
  {scene:[{state:{shep:["rock","stand"],lamb:["bush","scared"],wolf:["hillL","stand"]}},{cam:["shep",1.4],cms:0}],who:"shep",text:"소년은 약속 바위 앞에서 눈물을 닦고 다짐했어요. \"이제부터 참말만 할게요.\""},
  {pov:{img:"page3.webp",kb:"in"},text:"참말로 외치자 친구들이 다시 달려와 주었어요. 늑대는 꽁지 빠지게 도망갔고, 뭉게도 폴짝 뛰어나왔어요."},
  {scene:[{state:"end"},{cam:[50,80,1.1],cms:0}],text:"그 뒤로 소년의 말이라면 모두가 믿어 주었어요. 이야기가 다시 제자리로 돌아왔어요."}],
 ending:{title:"보너스: 참말쟁이 메에의 하루",ask:"참말쟁이가 된 메에는 무엇을 할까?",lead:"메에는…",lead2:"마지막에는…",ask2:"마지막에는 어떻게 되었을까?",
  start:{shep:["meadow","stand"],lamb:["flock","stand"],wolf:["far","stand"]},tpl:"메에는 {A}. 마지막에 {B}.",
  A:[{t:"뭉게에게 풀피리를 만들어 줬어요",e:"🎶",s:[{move:"shep",to:"flock",pose:"walk",end:"happy",ms:1200},{prop:["🎶",54,70]}]},
     {t:"양 떼를 세며 참말 일기를 썼어요",e:"📖",s:[{prop:["📖",44,72]}]},
     {t:"마을 친구들에게 딸기를 나눠 줬어요",e:"🍓",s:[{move:"shep",to:"village",pose:"walk",ms:1600},{prop:["🍓",90,74]}]}],
  B:[{t:"친구들이 '참말쟁이 메에'라고 불러 줬어요",e:"💛",s:[{prop:["💛",54,64]},{fx:"confetti"}]},
     {t:"뭉게가 메에 옆에서 쿨쿨 잠들었어요",e:"💤",s:[{move:"lamb",to:"meadow",pose:"stand",ms:1000},{prop:["💤",46,70]},{fx:"confetti"}]},
     {t:"저녁 종이 '참말 종'이라는 새 이름을 얻었어요",e:"🔔",s:[{prop:["🔔",82,66]},{fx:"confetti"}]}]},
 fin:["이야기를 되찾았어요!","{vil} 머쓱해져서 도망쳤어요.","\"잘했구나. 이 책을 도서관에 꽂아 두자.\""]};

/* 〈원숭이의 뒤죽박죽 도서관〉 — book 9 (우리 창작 이야기). 주인 영웅: 재주 원숭이(monkey), 악당: 뚱냥(fat).
   무대: 나무 속 도서관 안 — 왼쪽 ㄱㄴㄷ 책꽂이(0~40%), 가운데 반납 수레·사다리(40~65%), 오른쪽 읽기 자리(65~100%). */;
