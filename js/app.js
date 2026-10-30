const W=16,H=11;
const MAP=[
"TTTTTTTT~RRRRRRR",
"T.......~R,,,,.R",
"T..TT...~R,,,,,R",
"T.......~RRRWRRR",
"TT......B......R",
"T,,,,...~,,,,TTR",
"T,,T,...~,,,,,,.",
"ss,,,...~,,,,,RR",
"sssss...~~...RRR",
"~~Dss..~~~~.ssss",
"~~~~~~~~~~~~~~~~"];

const CONS=[{j:"ㄱ",i:0,n:"기역"},{j:"ㄴ",i:2,n:"니은"},{j:"ㄷ",i:3,n:"디귿"},{j:"ㄹ",i:5,n:"리을"},{j:"ㅁ",i:6,n:"미음"}];
const VOWS=[{j:"ㅏ",i:0,n:"아",o:"vert"},{j:"ㅓ",i:4,n:"어",o:"vert"},{j:"ㅗ",i:8,n:"오",o:"horz"},{j:"ㅜ",i:13,n:"우",o:"horz"},{j:"ㅣ",i:20,n:"이",o:"vert"}];
const compose=(c,v)=>String.fromCharCode(0xAC00+(c.i*21+v.i)*28);
const decomp=s=>{const k=s.charCodeAt(0)-0xAC00;return{c:CONS.find(x=>x.i===Math.floor(k/588)),v:VOWS.find(x=>x.i===Math.floor((k%588)/28))}};
const POOL=CONS.flatMap(c=>VOWS.map(v=>compose(c,v)));
const WORDS=[{w:"나무",p:"🌳",en:"tree"},{w:"다리",p:"🌉",en:"bridge"},{w:"거미",p:"🕷️",en:"spider"},{w:"고기",p:"🍖",en:"meat"},{w:"머리",p:"🙆",en:"head"},{w:"모기",p:"🦟",en:"mosquito"},{w:"가구",p:"🪑",en:"furniture"},{w:"도로",p:"🛣️",en:"road"},{w:"구두",p:"👞",en:"shoes"},{w:"고구마",p:"🍠",en:"sweet potato"}];

const CHARS=[
 {id:"rat",n:{en:"Volt Rat",ko:"번개 쥐"},ab:{en:"Clever Whiskers",ko:"꾀돌이"},d:{en:"In every battle, the right letter orb glows for the first shield.",ko:"배틀마다 첫 방패의 정답 구슬이 빛나요."}},
 {id:"ox",n:{en:"Iron Ox",ko:"강철 소"},ab:{en:"Iron Body",ko:"강철 몸"},d:{en:"+1 battle heart.",ko:"배틀 하트가 1개 더 많아요."}},
 {id:"tiger",n:{en:"Captain Tiger",ko:"대장 호랑이"},ab:{en:"Power Strike",ko:"힘찬 일격"},d:{en:"Type moves hit 50% harder.",ko:"타입 기술 공격력이 50% 더 세요."}},
 {id:"rabbit",n:{en:"Moon Rabbit",ko:"달빛 토끼"},ab:{en:"Moon Leap",ko:"달빛 도약"},d:{en:"Jumps higher in courses and recharges Dash faster in battle.",ko:"코스에서 더 높이 뛰고, 배틀 대시가 더 빨리 충전돼요."}},
 {id:"dragon",n:{en:"Sky Dragon",ko:"하늘 용"},ab:{en:"Sky Power",ko:"하늘의 힘"},d:{en:"Each right letter fills 2 letter-power pips.",ko:"글자를 맞히면 글자 파워가 2칸 차요."},lock:"clear"},
 {id:"snake",n:{en:"Wind Snake",ko:"바람 뱀"},ab:{en:"Silent Hunter",ko:"조용한 사냥꾼"},d:{en:"Gremlins fall asleep more often, and sneak attacks last longer.",ko:"도깨비가 더 자주 잠들고, 기습이 더 오래가요."},lock:7},
 {id:"horse",n:{en:"Dash Horse",ko:"질주 말"},ab:{en:"Gallop",ko:"질주"},d:{en:"Moves faster on the island and in courses.",ko:"섬과 코스에서 더 빨리 달려요."}},
 {id:"sheep",n:{en:"Cloud Sheep",ko:"구름 양"},ab:{en:"Woolly Guard",ko:"포근한 양털"},d:{en:"Blocks the first hit in every battle.",ko:"배틀마다 첫 공격을 막아 줘요."}},
 {id:"monkey",n:{en:"Trick Monkey",ko:"재주 원숭이"},ab:{en:"Trickster",ko:"재주꾼"},d:{en:"+5 seconds in every mini-game.",ko:"미니게임 시간이 5초 늘어나요."},lock:3},
 {id:"rooster",n:{en:"Dawn Rooster",ko:"새벽 닭"},ab:{en:"Dawn Alarm",ko:"새벽 경보"},d:{en:"Gremlin attacks warn you longer, so they are easier to dodge.",ko:"도깨비 공격 예고가 길어서 피하기 쉬워요."},lock:5},
 {id:"dog",n:{en:"Brave Dog",ko:"용감한 개"},ab:{en:"Loyal Buddy",ko:"충직한 친구"},d:{en:"Gains 25% more hero EXP.",ko:"주인공 EXP를 25% 더 받아요."}},
 {id:"pig",n:{en:"Mighty Pig",ko:"든든 돼지"},ab:{en:"Lucky Pig",ko:"복돼지"},d:{en:"+25% coins.",ko:"코인을 25% 더 받아요."}}];
const heroLocked=c=>!!c.lock&&!(G.unl||[]).includes(c.id)&&!(c.lock==="clear"&&G.dragon);
const PT={
 fire:{b:"#FF7A3D",bl:"#FFE2B0",a:"#FFD23F",d:"#B8400F",shot:"#FF9A3C",t:{en:"Fire type",ko:"불꽃 타입"},n:[{en:"Embean",ko:"불콩"},{en:"Flaretail",ko:"불꼬리"},{en:"Blazelion",ko:"불사자"}]},
 water:{b:"#3FA4F0",bl:"#DDF3FF",a:"#8EE8FF",d:"#1C5CA6",shot:"#6FD3FF",t:{en:"Water type",ko:"물결 타입"},n:[{en:"Bubbo",ko:"몽글"},{en:"Finnip",ko:"물지느"},{en:"Tidedrake",ko:"해룡"}]},
 leaf:{b:"#58C46A",bl:"#E8F9CC",a:"#C2F56E",d:"#2B7A3A",shot:"#9BE36A",t:{en:"Forest type",ko:"숲 타입"},n:[{en:"Sprig",ko:"새싹이"},{en:"Leafkit",ko:"잎새"},{en:"Grovekeeper",ko:"숲지기"}]}};
const EVO=[0,0,50,150];
const MONN={1:{en:"Mini Gremlin",ko:"꼬마 도깨비"},2:{en:"Prank Gremlin",ko:"장난 도깨비"},3:{en:"Boss Gremlin",ko:"대장 도깨비"}};
const SPAWNS=[{x:2,y:5,lv:1},{x:4,y:6,lv:1},{x:3,y:7,lv:2},{x:10,y:5,lv:2},{x:12,y:6,lv:2},{x:11,y:7,lv:3},{x:11,y:1,lv:3},{x:13,y:2,lv:3}];

const NPCS={
 captain:{x:3,y:8,e:"🐢",n:{en:"Master Turtle",ko:"거북이 스승"}},
 squirrel:{x:6,y:2,e:"🐿️",n:{en:"Woody the Squirrel",ko:"나무꾼 다람쥐"}},
 beaver:{x:7,y:5,e:"🦫",n:{en:"Builder Beaver",ko:"목수 비버"}},
 spider:{x:12,y:3,e:"🕷️",n:{en:"Spinny the Spider",ko:"거미 스피니"}},
 mole:{x:14,y:1,e:"🦔",n:{en:"Miner Hedgehog",ko:"광부 고슴도치"}},
 gull:{x:13,y:9,e:"🐦",n:{en:"Hungry Seagull",ko:"배고픈 갈매기"}}};
const CHESTS=[{x:1,y:1,s:"모"},{x:5,y:7,s:"너"},{x:10,y:6,s:"두"},{x:15,y:6,s:"리"}];
const PARTS=[{id:"hull",e:"🪵",q:1,n:{en:"Hull",ko:"선체"}},{id:"rope",e:"🪢",q:3,n:{en:"Rope",ko:"밧줄"}},{id:"nails",e:"🔩",q:4,n:{en:"Copper nails",ko:"구리 못"}},{id:"sail",e:"🏳️",q:5,n:{en:"Sail",ko:"돛"}}];
const STATIONS={run:{x:5,y:4,e:"🌀",n:{en:"Adventure Gate",ko:"모험의 문"}},shop:{x:6,y:7,e:"🦝",n:{en:"Raccoon Shop",ko:"너구리 상점"}},fish:{x:1,y:8,e:"🎣",n:{en:"Letter Fishing",ko:"글자 낚시"}},whack:{x:2,y:3,e:"🎪",n:{en:"Gremlin Whack",ko:"도깨비 잡기"}}};
const ITEMS={
 potion:{e:"🧪",p:20,n:{en:"Potion",ko:"회복 물약"},d:{en:"Battle: restore 1 heart",ko:"배틀: 하트 1개 회복"}},
 lens:{e:"🔍",p:25,n:{en:"Magnifier",ko:"돋보기"},d:{en:"Battle: remove a wrong answer or light up the right blocks",ko:"배틀: 오답 1개 지우기, 또는 정답 블록 표시"}},
 shield:{e:"🛡️",p:30,n:{en:"Shield",ko:"방패"},d:{en:"Battle: block the next wrong-answer hit",ko:"배틀: 다음 오답 공격 1번 막기"}}};
const EQUIP={
 badge:{e:"🎖️",aura:"#FFD23F",lv:4,n:{en:"Lucky Badge",ko:"행운의 배지"},d:{en:"+25% coins",ko:"코인 +25%"}},
 cape:{e:"🧣",aura:"#7DD3FC",lv:5,p:150,shop:1,n:{en:"Wisdom Scarf",ko:"지혜의 스카프"},d:{en:"+25% hero EXP",ko:"주인공 EXP +25%"}},
 charm:{e:"🧿",aura:"#A78BFA",lv:8,n:{en:"Brave Charm",ko:"용기의 부적"},d:{en:"The first wrong answer in each battle does no harm",ko:"배틀마다 첫 오답은 피해 없음"}},
 crown:{e:"👑",aura:"#FF9F1C",lv:10,n:{en:"Hangul Crown",ko:"한글 왕관"},d:{en:"+25% coins and hero EXP",ko:"코인·주인공 EXP +25%"}}};
const LVREW={2:{items:{potion:2},coins:30},3:{heart:1,hero:"monkey"},4:{eq:"badge"},5:{items:{lens:2},shop:"cape",hero:"rooster"},6:{heart:1},7:{items:{shield:2,potion:1},hero:"snake"},8:{eq:"charm"},9:{items:{potion:2},coins:100},10:{eq:"crown"}};
const MAXLV=10,needEXP=lv=>30+(lv-1)*20;

const QUESTS=[
 {npc:"captain",intro:true,
  obj:{en:"Talk to Master Turtle on the beach",ko:"바닷가의 거북이 스승님과 이야기하기"},
  ask:{en:"Oh no, the storm smashed my ship! Collect 4 parts around the island so we can fix it and sail away. Watch out for letter gremlins in the tall grass. Battle them and your partner will grow stronger! Start with the squirrel up north.",ko:"앗, 폭풍 때문에 내 배가 부서졌어! 섬 곳곳에서 부품 4개를 모아 배를 고치자. 풀숲에는 글자를 훔친 도깨비들이 있어. 배틀에서 이기면 파트너가 강해질 거야! 먼저 북쪽의 다람쥐를 찾아가 봐."}},
 {npc:"squirrel",word:"나무",pic:"🌳",mean:{en:"tree",ko:"나무"},
  obj:{en:"Help the squirrel in the north forest",ko:"북쪽 숲의 다람쥐 돕기"},
  ask:{en:"You need wood for the ship? Build the word 나무 (tree) and I'll chop some for you!",ko:"배를 만들 나무가 필요하구나! '나무'를 만들어 주면 나무를 베어 줄게."},
  thx:{en:"Thanks! Take this sturdy wooden hull.",ko:"고마워! 튼튼한 나무 선체를 가져가."}},
 {npc:"beaver",word:"다리",pic:"🌉",mean:{en:"bridge (also means leg!)",ko:"다리 (건너는 다리)"},
  obj:{en:"Help the beaver fix the bridge over the river",ko:"강가의 비버를 도와 다리 고치기"},
  ask:{en:"The bridge fell down, so nobody can cross the river! Can you build 다리 (bridge)?",ko:"다리가 무너져서 강을 건널 수 없어! '다리'를 만들어 줄래?"},
  thx:{en:"Bridge fixed! Now you can cross to the east side.",ko:"다리 완성! 이제 강 건너 동쪽으로 갈 수 있어."}},
 {npc:"spider",word:"거미",pic:"🕷️",mean:{en:"spider",ko:"거미"},
  obj:{en:"Cross the bridge and meet the spider at the cave",ko:"다리를 건너 동굴 입구의 거미 만나기"},
  ask:{en:"My web is blocking the cave, isn't it? Build my name, 거미 (spider), and I'll open the way. I'll spin you a strong rope too!",ko:"내 거미줄이 동굴을 막고 있지? 내 이름 '거미'를 만들어 주면 길을 열어 줄게. 튼튼한 밧줄도 줄게!"},
  thx:{en:"Ta-da! A spider-silk rope. The cave is open now.",ko:"짠! 거미줄 밧줄이야. 이제 동굴로 들어갈 수 있어."}},
 {npc:"mole",word:"구리",pic:"🪙",mean:{en:"copper",ko:"구리"},
  obj:{en:"Find the hedgehog miner inside the cave",ko:"동굴 속 고슴도치 광부 찾기"},
  ask:{en:"You need copper nails to hold the ship together. Build 구리 (copper) and I'll dig some up!",ko:"배를 단단히 붙이려면 구리 못이 필요해. '구리'를 만들어 주면 캐 줄게!"},
  thx:{en:"Here are some shiny copper nails!",ko:"반짝반짝 구리 못이야!"}},
 {npc:"gull",word:"고기",pic:"🍖",mean:{en:"meat",ko:"고기"},
  obj:{en:"Help the hungry seagull on the south beach",ko:"남쪽 바닷가의 배고픈 갈매기 돕기"},
  ask:{en:"Grumble… I'm so hungry. Build 고기 (meat) and I'll give you the sail I found!",ko:"꼬르륵… 너무 배고파. '고기'를 만들어 주면 내가 주운 돛을 줄게!"},
  thx:{en:"Yum! Here's the sail, just like I promised.",ko:"냠냠! 약속대로 돛을 줄게."}},
 {npc:"captain",word:"고고",pic:"⛵",mean:{en:"\"go go!\"",ko:"고고! (출발!)"},
  obj:{en:"Evolve your partner, then return to Master Turtle",ko:"파트너를 진화시키고 거북이 스승님께 돌아가기"},
  ask:{en:"You found every part and the ship is fixed! Build 고고 (go go!) to give the signal to sail!",ko:"부품을 모두 모아서 배가 다 고쳐졌어! 출발 신호로 '고고'를 만들어 줘!"}}];

const UI={
 en:{quest:"Current quest",menu:"Menu",tip:"Tap to walk. Tap friends, chests or gremlins in the tall grass.",stars:n=>`⭐ ${n}`,lv:s=>`Stage ${s}`,
  story:"In Master Turtle's Library of Twelve Stories, the Cat Gang has torn up the storybooks: they flipped characters, mixed up events and erased important sentences. Pick a zodiac guardian, jump into the books, read the clues and win the stories back!",
  step1:"Choose your zodiac hero",step2:"2. Choose your partner",next:"Next",back:"Back",start:"Start adventure",cont:"Continue",
  help:"Let's build!",later:"Later",ok:"OK",go:"Let's go!",leave:"Leave",
  busy:g=>`I'm busy right now. Your quest: ${g}`,done:"Thanks again for your help!",capWait:n=>`Keep going! You have ${n} of 4 ship parts.`,
  gate:(x,n)=>`The ship is ready, but sea monsters guard the waters. Your partner must evolve first (${x} / ${n} XP). Battle gremlins in the tall grass!`,
  chest:s=>`A treasure chest! Build ${s} to open it.`,chestOk:"The chest opened: +1 star, +5 XP!",chestName:"Treasure chest",
  pickC:"Tap a red consonant and a blue vowel.",pickV:"Now add a blue vowel.",pickCo:"Now add a red consonant.",nice:s=>`${s}! Nice.`,wrong:"Not quite. Try another piece.",hint:"Look at the glowing pieces.",
  rule:"Tall vowels (ㅏ ㅓ ㅣ) click on the right. Flat vowels (ㅗ ㅜ) click underneath.",gc:"consonant",gv:"vowel",
  newPart:p=>`New ship part: ${p}!`,bridge:"The bridge is fixed!",web:"The cave is open!",xp:n=>`+${n} XP`,
  appear:(n,j)=>`A wild ${n} appeared! It stole the letter ${j}.`,lp:"Listen! Which one is it?",rp:"Read it! Which picture matches?",lb:"Listen, then build it!",
  hit:"Direct hit!",answer:s=>`It was ${s}.`,win:(j,xp)=>`You won and got back ${j}! +${xp} XP, +1 star`,lose:"Your partner is tired. Rest up and try again!",run:"Run away",
  partner:"Partner",xpTo:(a,b)=>`${a} / ${b} XP to the next evolution`,maxed:"Fully evolved!",gridT:"Letter mastery · for parents",
  legend:"Grey: not tried yet · Red: needs practice · Yellow: getting there · Green: mastered (3+ correct, 75%+)",
  sWins:"Battles won",sAcc:"Accuracy",sTried:"Letters tried",close:"Close",
  evolving:n=>`What's this? ${n} is evolving!`,evolved:(a,b)=>`${a} evolved into ${b}!`,
  clear:"Island 1 cleared!",clText:n=>`You fixed the ship and sailed away with Master Turtle. You earned ${n} stars.`,
  unlocked:"New hero unlocked",nextIsland:"Next: Island 2",soon:"Batchim Island · coming soon",again:"Play Island 1 again",change:"Change hero",
  resetSure:"Tap again to start over",cantGo:"You can't get there yet."},
 ko:{quest:"지금 할 일",menu:"메뉴",tip:"원하는 곳을 누르면 걸어가요. 친구, 상자, 풀숲의 도깨비를 눌러 보세요.",stars:n=>`⭐ ${n}`,lv:s=>`${s}단계`,
  story:"거북이 스승님이 지키는 열두 이야기 도서관에서 고양이 악당들이 동화책을 망가뜨렸어요! 인물을 뒤집고, 사건 순서를 섞고, 중요한 문장을 지워 버렸지요. 동물 수비대와 함께 책 속으로 들어가 단서를 읽고 이야기를 되찾아요.",
  step1:"십이지 영웅 고르기",step2:"2. 파트너 고르기",next:"다음",back:"뒤로",start:"모험 시작",cont:"이어서 하기",
  help:"만들어 볼게!",later:"나중에",ok:"좋아!",go:"가자!",leave:"나가기",
  busy:g=>`지금은 바빠! 할 일: ${g}`,done:"도와줘서 고마워!",capWait:n=>`힘내! 배 부품 ${n}/4개를 모았어.`,
  gate:(x,n)=>`배는 준비됐지만 바다에 괴물이 있어. 파트너가 먼저 진화해야 해 (${x} / ${n} XP). 풀숲의 도깨비와 배틀해 봐!`,
  chest:s=>`보물 상자다! '${s}'를 만들면 열려.`,chestOk:"상자가 열렸어: 별 +1, XP +5!",chestName:"보물 상자",
  pickC:"빨간 자음과 파란 모음을 눌러요.",pickV:"이제 파란 모음을 붙여요.",pickCo:"이제 빨간 자음을 붙여요.",nice:s=>`${s}! 잘했어!`,wrong:"앗, 다른 블록으로 해 볼까?",hint:"반짝이는 블록을 봐!",
  rule:"세로 모음(ㅏ ㅓ ㅣ)은 오른쪽, 가로 모음(ㅗ ㅜ)은 아래에 딸깍!",gc:"자음",gv:"모음",
  newPart:p=>`배 부품 획득: ${p}!`,bridge:"다리가 고쳐졌어!",web:"동굴이 열렸어!",xp:n=>`XP +${n}`,
  appear:(n,j)=>`야생의 ${n}이(가) 나타났다! 글자 ${j}을(를) 훔쳐 갔어.`,lp:"잘 듣고 맞는 글자를 골라!",rp:"읽어 봐! 어떤 그림일까?",lb:"잘 듣고 글자를 만들어!",
  hit:"명중!",answer:s=>`정답은 ${s}였어.`,win:(j,xp)=>`승리! 글자 ${j}을(를) 되찾았다! XP +${xp}, 별 +1`,lose:"파트너가 지쳤어. 쉬었다가 다시 도전하자!",run:"도망가기",
  partner:"파트너",xpTo:(a,b)=>`다음 진화까지 ${a} / ${b} XP`,maxed:"최종 진화 완료!",gridT:"글자 실력표 · 부모님용",
  legend:"회색: 아직 안 함 · 빨강: 연습 필요 · 노랑: 거의 다 왔어요 · 초록: 마스터 (3번 이상 정답, 정답률 75% 이상)",
  sWins:"배틀 승리",sAcc:"정답률",sTried:"연습한 글자",close:"닫기",
  evolving:n=>`어라? ${n}의 모습이…!`,evolved:(a,b)=>`${a}이(가) ${b}(으)로 진화했다!`,
  clear:"섬 1 클리어!",clText:n=>`배를 고치고 거북이 스승님과 함께 섬을 떠났어요. 모은 별: ${n}개`,
  unlocked:"새 주인공 잠금 해제",nextIsland:"다음 섬: 섬 2",soon:"받침 섬 · 준비 중",again:"섬 1 다시 하기",change:"주인공 바꾸기",
  resetSure:"한 번 더 누르면 처음부터 시작해요",cantGo:"아직 거기엔 갈 수 없어."}};

Object.assign(UI.en,{stars:n=>`🪙 ${n}`,hlv:(l,c)=>`Lv ${l} · 🪙 ${c}`,xp:n=>`Partner XP +${n}`,
 tip:"Tap to walk. Tap friends, chests, gremlins, the shop and the mini-games.",
 chestOk:"The chest opened!",win:j=>`You won and got back ${j}!`,
 clText:n=>`You beat the Cat Gang, fixed the ship and sailed away with Master Turtle. Coins: ${n}.`,
 rew:(c,e)=>`🪙 +${c} · EXP +${e}`,
 lvl:l=>`Level ${l}`,expTo:(a,b)=>`${a} / ${b} EXP to the next level`,maxLv:"Max level!",hearts:n=>`Battle hearts: ${n}`,
 track:"Level rewards",inv:"Bag",equip:"Gear",use:"Use",equipB:"Equip",unequip:"Take off",lockLv:l=>`Unlocks at Lv ${l}`,buy:"Buy",owned:n=>`You have ${n}`,ownedEq:"Owned",
 shopHi:"Welcome! Spend your coins on things that help in battle.",noCoins:"Not enough coins.",bought:n=>`Bought: ${n}!`,
 lvUp:"LEVEL UP!",rHeart:"+1 battle heart",rShop:n=>`New in shop: ${n}`,
 itUsed:n=>`Used: ${n}`,shieldOn:"Shield up! The next hit is blocked.",blocked:"Blocked!",
 fishT:"Letter Fishing",whackT:"Gremlin Whack",fishHow:"Listen to the sound, then tap the fish with that letter. Wrong fish cost 2 seconds.",
 whackHow:"Bonk only the gremlins whose letter has the block shown. Wrong bonks lose a point.",
 catchIt:"Catch this sound:",hitRule:"Bonk letters with",play:"Start",again:"Play again",doneB:"Done",quit:"Quit",
 score:n=>`Score ${n}`,best:n=>`Best ${n}`,mgEnd:n=>`Time's up! You scored ${n}.`,newBest:"New best!",bonusItem:n=>`Bonus item: ${n}`,needQ:"Talk to Master Turtle first."});
Object.assign(UI.ko,{stars:n=>`🪙 ${n}`,hlv:(l,c)=>`Lv ${l} · 🪙 ${c}`,xp:n=>`파트너 XP +${n}`,
 tip:"원하는 곳을 누르면 걸어가요. 친구, 상자, 도깨비, 상점, 미니게임을 눌러 보세요.",
 chestOk:"상자가 열렸어!",win:j=>`승리! 글자 ${j}을(를) 되찾았다!`,
 clText:n=>`고양이 악당들을 물리치고, 배를 고쳐 거북이 스승님과 함께 섬을 떠났어요. 코인: ${n}개`,
 rew:(c,e)=>`🪙 +${c} · EXP +${e}`,
 lvl:l=>`레벨 ${l}`,expTo:(a,b)=>`다음 레벨까지 ${a} / ${b} EXP`,maxLv:"최고 레벨!",hearts:n=>`배틀 하트: ${n}개`,
 track:"레벨 보상",inv:"가방",equip:"장비",use:"사용",equipB:"장착",unequip:"벗기",lockLv:l=>`Lv ${l}에 열림`,buy:"사기",owned:n=>`${n}개 있음`,ownedEq:"보유 중",
 shopHi:"어서 와! 코인으로 배틀에 도움이 되는 물건을 살 수 있어.",noCoins:"코인이 부족해.",bought:n=>`구매 완료: ${n}!`,
 lvUp:"레벨 업!",rHeart:"배틀 하트 +1",rShop:n=>`상점에 새 물건: ${n}`,
 itUsed:n=>`${n} 사용!`,shieldOn:"방패 준비! 다음 공격을 막아 줄게.",blocked:"막았다!",
 fishT:"글자 낚시",whackT:"도깨비 잡기",fishHow:"소리를 잘 듣고 그 글자가 적힌 물고기를 눌러요. 틀리면 2초가 줄어요.",
 whackHow:"보여 주는 블록이 들어간 글자의 도깨비만 잡아요. 잘못 잡으면 1점 빠져요.",
 catchIt:"이 소리를 잡아!",hitRule:"이 블록이 들어간 글자를 잡아!",play:"시작",again:"한 번 더",doneB:"끝내기",quit:"그만하기",
 score:n=>`점수 ${n}`,best:n=>`최고 ${n}`,mgEnd:n=>`시간 끝! ${n}점을 얻었어.`,newBest:"최고 기록!",bonusItem:n=>`보너스 아이템: ${n}`,needQ:"먼저 거북이 스승님과 이야기해 봐."});

Object.assign(UI.en,{tip:"Tap a stage to play. Clear them one by one to rescue the stolen letters!",
 tutT:"How to battle",tut1:"Tap the field to move your partner.",tut2:"Red circles are attacks. Move out before they fill up!",
 tut3:"The gremlin has a letter shield. Tap the gold orb with the matching letter. Your partner grabs it and the shield breaks. Then attack!",
 tut4:"Your partner attacks by itself when close. Use skills for big hits. Fill 3 letter-power pips for Letter Burst.",gotIt:"Got it!",
 shieldSee:"Shield letter",shieldHear:"Listen for the letter",shieldRead:"Find the word for",broken:"Shield broken! Attack!",brk:"BREAK!",
 sneak:"Sneak attack! The gremlin was asleep.",wrongOrb:s=>`That orb was ${s}. Find another one!`,skDash:"Dash",skSuper:"Letter Burst",power:"Letter power",
 lockClear:"Clear Island 1",rHero:n=>`New hero: ${n}`,abil:"Power",winB:"VICTORY!",loseB:"Retreat…",wild:"Wild Zone",sneakB:"SNEAK ATTACK!",
 runHow:"Run with ◀ ▶ and jump with ⤒ (or arrow keys and Space). Jump into the letter block that matches the sound to open each gate. Stomp gremlins from above!",
 gateMsg:"Listen! Jump into the block with that sound.",gateOpen:"Gate open!",wrongBlock:s=>`That was ${s}! A gremlin popped out.`,clearT:"Course clear!",failT:"Out of hearts!",retry:"Try again",backIsland:"Back to the island",nextCourse:"New course"});
Object.assign(UI.ko,{tip:"스테이지를 눌러 시작해요. 하나씩 깨면서 도깨비가 훔쳐 간 한글을 되찾아요!",
 tutT:"배틀 방법",tut1:"필드를 누르면 파트너가 그쪽으로 움직여요.",tut2:"빨간 원은 공격이에요. 원이 다 차기 전에 피하세요!",
 tut3:"도깨비는 글자 방패를 갖고 있어요. 같은 글자가 적힌 금색 구슬을 누르면 파트너가 가서 먹고, 방패가 깨져요. 그때 공격!",
 tut4:"가까이 가면 파트너가 알아서 공격해요. 기술로 큰 피해를 주고, 글자 파워 3칸을 모으면 '글자 폭발'!",gotIt:"알겠어!",
 shieldSee:"방패 글자",shieldHear:"소리를 듣고 찾아",shieldRead:"이 그림의 단어",broken:"방패 깨짐! 지금 공격!",brk:"방패 깨짐!",
 sneak:"기습 성공! 도깨비가 자고 있었어.",wrongOrb:s=>`그 구슬은 '${s}'였어. 다른 구슬을 찾아!`,skDash:"대시",skSuper:"글자 폭발",power:"글자 파워",
 lockClear:"섬 1 클리어",rHero:n=>`새 영웅: ${n}`,abil:"능력",winB:"승리!",loseB:"후퇴…",wild:"야생 구역",sneakB:"기습 공격!",
 runHow:"◀ ▶로 달리고 ⤒로 점프해요 (키보드는 화살표와 스페이스). 소리와 같은 글자 블록을 머리로 치면 문이 열려요. 도깨비는 위에서 밟아요!",
 gateMsg:"잘 들어 봐! 그 소리의 블록을 머리로 쳐!",gateOpen:"문이 열렸다!",wrongBlock:s=>`'${s}'였어! 도깨비가 튀어나왔다.`,clearT:"코스 클리어!",failT:"하트가 다 떨어졌어!",retry:"다시 도전",backIsland:"섬으로 돌아가기",nextCourse:"새 코스"});
ITEMS.lens.d={en:"Battle: makes the right letter orb glow",ko:"배틀: 정답 글자 구슬을 빛나게 함"};
ITEMS.shield.d={en:"Battle: blocks the next hit",ko:"배틀: 다음 공격 1번 막기"};
EQUIP.charm.d={en:"Blocks the first hit in each battle",ko:"배틀마다 첫 공격을 막아 줌"};

const fresh=()=>({char:"fox",ptype:"fire",xp:0,seen:1,q:0,chests:[],px:4,py:8,fx:5,fy:8,m:{},wins:0,lv:1,exp:0,coins:0,inv:{potion:1,lens:1,shield:0,snack:0},eqs:[],eq:null,best:{fish:0,whack:0},st:0,stars:{}});
let G=Object.assign(fresh(),{dragon:false,lang:"ko"});
try{const s=JSON.parse(localStorage.getItem("hiq2")||"null");if(s)G=Object.assign(G,s)}catch(e){}
if(typeof G.stars==="number"){G.coins=G.coins||G.stars*5;delete G.stars}
if(G.easy===undefined)G.easy=true;G.vrate=G.vrate||1;
(()=>{const obj=k=>{if(!G[k]||typeof G[k]!=="object"||Array.isArray(G[k]))G[k]={}};["books","cases","pg","pgm","m","wx","flu","stars","best","inv"].forEach(obj);
 if(!Array.isArray(G.unl))G.unl=[];if(!Array.isArray(G.eqs))G.eqs=[];if(!Array.isArray(G.chests))G.chests=[];
 const num=(k,d,lo,hi,int)=>{let v=typeof G[k]==="number"?G[k]:typeof G[k]==="string"&&G[k].trim()?+G[k]:NaN;if(!Number.isFinite(v))v=d;if(int)v=Math.round(v);if(lo!=null)v=Math.max(lo,v);if(hi!=null)v=Math.min(hi,v);G[k]=v};
 num("coins",0,0,1e9,1);num("exp",0,0,1e9);num("lv",1,1,99,1);num("st",0,0,99,1);num("xp",0,0,1e9);
 if(G.wl!=null)num("wl",1,1,5,1);if(G.vrate!=null)num("vrate",1,.5,1.6);if(G.vpause!=null)num("vpause",1000,500,2000,1);if(G.rl!=null)num("rl",2,1,2,1);
 if(G.lang!=="ko"&&G.lang!=="en")G.lang="ko";if(G.easy!==undefined)G.easy=!!G.easy&&G.easy!=="false";})();
(()=>{const isO=v=>v&&typeof v==="object"&&!Array.isArray(v),n03=v=>{v=+v;return Number.isFinite(v)?Math.max(0,Math.min(3,Math.round(v))):0};
 for(const k in G.cases){const v=n03(G.cases[k]);if(v)G.cases[k]=v;else delete G.cases[k]}
 for(const k in G.stars){const v=n03(G.stars[k]);if(v)G.stars[k]=v;else delete G.stars[k]}
 for(const k in G.books)if(!isO(G.books[k]))delete G.books[k];
 for(const k in G.pg){const g=G.pg[k];if(!isO(g)){delete G.pg[k];continue}if(!isO(g.s))g.s={};for(const l in g.s)g.s[l]=n03(g.s[l])}
 for(const k in G.pgm){const r=G.pgm[k];if(!isO(r)){delete G.pgm[k];continue}r.r=Math.max(0,+r.r||0);r.w=Math.max(0,+r.w||0)}
 for(const k in G.inv)G.inv[k]=Math.max(0,Math.round(+G.inv[k]||0))})();
G.inv=Object.assign({potion:0,lens:0,shield:0,snack:0},G.inv);G.unl=G.unl||[];G.stars=G.stars||{};G.st=G.st||0;G.rl=G.rl||2;G.flu=G.flu||{};if(!CHARS.some(c=>c.id===G.char))G.char="tiger";G.best=Object.assign({fish:0,whack:0},G.best);
const save=()=>{try{localStorage.setItem("hiq2",JSON.stringify(G))}catch(e){}};
const hasProgress=()=>!!((G.st||0)>0||Object.keys(G.books||{}).length||Object.keys(G.cases||{}).length||Object.keys(G.pg||{}).length||Object.keys(G.pgm||{}).length||(G.lv||1)>1||(G.exp||0)>0||(G.coins||0)>0);
const $=id=>document.getElementById(id);
const t=()=>UI[G.lang];
const L=o=>o[G.lang];
const stage=(xp=G.xp)=>xp>=EVO[3]?3:xp>=EVO[2]?2:1;
const pname=(st=stage(),ty=G.ptype)=>L(PT[ty].n[st-1]);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* sound */
let AC;
function sfx(k){if(G.sfxOff)return;const _m={ok:"correct",bad:"retry",tap:"select"}[k];if(_m&&sfxPlay(_m))return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const N={tap:[700],ok:[523,659,784],bad:[230,180],star:[784,988,1319,1568],hit:[330,660],evo:[392,523,659,784,1047,1319]}[k];const now=AC.currentTime,gap=k==="evo"?.14:.09;
 N.forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain(),s=now+i*gap;o.type=k==="bad"?"square":k==="hit"?"sawtooth":"triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime((k==="bad"||k==="hit"?.06:.16)*(window.speechSynthesis&&speechSynthesis.speaking?.3:1),s+.02);g.gain.exponentialRampToValueAtTime(.0001,s+.22);o.connect(g).connect(AC.destination);o.start(s);o.stop(s+.24)})}catch(e){}}
/* voice */
const hanN=s=>(String(s).match(/[가-힣]/g)||[]).length;
const VO={ko:[],en:[],tok:0};
function vRank(v){const n=(v.name||"").toLowerCase();let s=0;
 if(/natural|neural|wavenet/.test(n))s+=60;if(/premium|프리미엄/.test(n))s+=55;if(/enhanced|향상/.test(n))s+=45;if(/online/.test(n))s+=20;if(/google/.test(n))s+=30;
 if(/eddy|flo\b|grandma|grandpa|reed|rocko|sandy|shelley|bells|bubbles|boing|jester|organ|trinoids|whisper|zarvox|albert|bad news|good news|cellos|superstar|wobble/.test(n))s-=80;return s}
function loadVoices(){try{const vs=speechSynthesis.getVoices()||[],by=p=>vs.filter(v=>(v.lang||"").replace("_","-").toLowerCase().startsWith(p));
 VO.ko=by("ko").sort((a,b)=>vRank(b)-vRank(a));
 const au=v=>/-au$/i.test((v.lang||"").replace("_","-"))?15:0;VO.en=by("en").sort((a,b)=>vRank(b)+au(b)-vRank(a)-au(a))}catch(e){}}
loadVoices();try{speechSynthesis.addEventListener("voiceschanged",loadVoices)}catch(e){try{speechSynthesis.onvoiceschanged=loadVoices}catch(_){}}
const vPick=lang=>{const l=VO[lang]||[],w=lang==="ko"?G.vko:G.ven;return l.find(v=>v.name===w)||l[0]||null};
const ttsClean=x=>String(x).replace(/\[[^\]]*\]/g,"").replace(/\s\/\s/g,", ").replace(/["“”‘’]/g,"").replace(/_{2,}/g,"음").replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}️]/gu,"").replace(/\s+/g," ").trim();
/* voice profiles: p = pitch, r = rate, g = preferred device voice (m/f), gap = pause between one speaker's own sentences (ms) */
const VOX={narrator:{p:1,r:.9,g:"f"},learn:{p:1,r:.9,g:"f"},mentor:{p:.72,r:.8,g:"m",gap:1200},
 rat:{p:1.38,r:1.04,g:"f",gap:450},ox:{p:.78,r:.84,g:"m",gap:800},tiger:{p:1.12,r:1,g:"m",gap:500},rabbit:{p:1.3,r:.98,g:"f",gap:500},
 dragon:{p:1,r:.88,g:"m",gap:750},snake:{p:.88,r:.86,g:"f",gap:750},horse:{p:1.06,r:1.02,g:"m",gap:500},sheep:{p:1.15,r:.86,g:"f",gap:750},
 monkey:{p:1.28,r:1.06,g:"f",gap:450},rooster:{p:1.12,r:.95,g:"f",gap:550},dog:{p:1.18,r:1,g:"m",gap:500},pig:{p:.94,r:.9,g:"m",gap:650},
 v_black:{p:.86,r:.92,g:"m"},v_white:{p:1.05,r:.92,g:"f"},v_tiger:{p:.96,r:1,g:"m"},v_gray:{p:.94,r:1.04,g:"m"},v_fat:{p:.7,r:.86,g:"m"},v_purple:{p:1.08,r:.96,g:"f"},
 squirrel:{p:1.3,r:1,g:"f"},beaver:{p:.98,r:.95,g:"m"},spider:{p:1.12,r:.95,g:"f"},mole:{p:.86,r:.92,g:"m"},gull:{p:1.2,r:1,g:"f"}};
const MALE=/injoon|hyunsu|bongjin|gookmin|minsu|jian|male|남성|남자|david|mark|guy|ryan|william|james|daniel|\blee\b|alex|aaron|arthur|gordon|thomas|oliver|fred|\btom\b/i;
const vGap=()=>G.vpause||1000;
/* known natural voices by character type (Edge on PC/Mac has many Korean ones; Apple and Google devices usually have one or two) */
const VPREF={mentor:["bongjin","minsu","injoon"],boy:["hyunsu","gookmin","jian","injoon"],girl:["seohyeon","jimin","yujin","sora"],
 squirrel:["jimin","seohyeon"],spider:["yujin","jimin"],gull:["seohyeon","yujin"],beaver:["gookmin","hyunsu"],mole:["hyunsu","gookmin"],
 v_black:["injoon","gookmin"],v_gray:["gookmin","injoon"],v_tiger:["hyunsu","injoon"],v_fat:["bongjin","injoon"],v_white:["jimin","yujin"],v_purple:["yujin","sunhi"]};
function vFor(who,lang){const l=VO[lang]||[],base=vPick(lang);if(who==="narrator"||who==="learn"||l.length<2)return base;
 const P=VOX[who]||VOX.narrator,top=vRank(l[0])-25,ok=l.filter(v=>vRank(v)>=top),
  pref=VPREF[who]||(CHARS.some(c=>c.id===who)?VPREF[P.g==="m"?"boy":"girl"]:null);
 if(pref)for(const k of pref){const v=ok.find(v=>v.name.toLowerCase().includes(k)&&v!==base);if(v)return v}
 const pool=ok.filter(v=>MALE.test(v.name)===(P.g==="m")&&v!==base);
 if(!pool.length)return base;let h=0;for(const c of who)h=(h*31+c.charCodeAt(0))>>>0;return pool[h%pool.length]}
function utter(txt,o={}){const lang=o.lang||"ko",who=o.who||"narrator",P=VOX[who]||VOX.narrator,u=new SpeechSynthesisUtterance(ttsClean(txt)),v=vFor(who,lang);
 u.lang=lang==="ko"?"ko-KR":"en-AU";if(v){u.voice=v;u.lang=v.lang}
 const few=(VO[lang]||[]).length<3,pp=o.pitch||P.p;
 u.rate=Math.min(1.6,Math.max(.86,o.rate||P.r)*(G.vrate||1));u.pitch=1+(pp-1)*(few?.55:.7);u.volume=1;return u}
function vTalk(on){const b=document.getElementById("vSkip");if(!b)return;b.hidden=!on;if(on)b.textContent=G.lang==="ko"?"건너뛰기 ⏭":"Skip ⏭"}
let VA=null;const VAUD={};
const vKey=(w,t)=>(w==="learn"?"narrator":w)+"|"+ttsClean(t);
const lineVoice=(l,o)=>{const allQ=/^\s*["“][^"”]*["”]\s*$/.test(l);return o.voice||(allQ?(o.who||"narrator"):/["“”]/.test(l)?null:"narrator")};
/* how a narrate() call is spoken: whole single-voice lines, or sentence parts when a line mixes narrator and a quote */
function vPlan(lines,o){o=o||{};const out=[];(Array.isArray(lines)?lines:[lines]).forEach(l=>{l=String(l);if(!ttsClean(l))return;const parts=[];
 l.split(/(["“][^"”]*["”])/).forEach(p=>{p=p.trim();if(!p)return;const q=/^["“]/.test(p);sentSplit(p,1).forEach(x=>{x=x.trim();if(ttsClean(x))parts.push({t:x,w:o.voice||(q?(o.who||"narrator"):"narrator")})})});
 out.push({line:l,lw:lineVoice(l,o),parts})});return out}
/* recorded voice files listed in audio/voices.js: [voice, text, file] */
(window.VOICEFILES||[]).forEach(([w,t,f])=>{VAUD[vKey(w,t)]=f});
function hush(){VO.tok++;if(VA){try{VA.pause()}catch(e){}VA=null}try{speechSynthesis.cancel()}catch(e){}vTalk(false)}
function say(txt){try{VO.tok++;vTalk(false);const x=ttsClean(txt),tts=()=>{try{speechSynthesis.speak(utter(x,{who:"learn",rate:hanN(x)<=4?.85:.92}))}catch(e){}},f=VAUD[vKey("learn",txt)];speechSynthesis.cancel();if(VA){try{VA.pause()}catch(e){}VA=null}
 if(f){const a=new Audio(f);VA=a;a.onended=()=>{if(VA===a)VA=null};a.onerror=()=>{if(VA===a){VA=null;tts()}};a.play().catch(()=>{if(VA===a){VA=null;tts()}});return}tts()}catch(e){}}
/* narrate: the narrator reads plain text, "quoted" lines are spoken by o.who, and o.voice makes one speaker read everything */
function narrate(lines,done,lang,o){o=o||{};
 lang=lang||(G.lang==="ko"?"ko":"en");const tok=++VO.tok;VO.pend=done||null;try{speechSynthesis.cancel()}catch(e){}if(VA){try{VA.pause()}catch(e){}VA=null}
 const segs=[];vPlan(lines,o).forEach(L=>{const f=lang==="ko"&&L.lw&&VAUD[vKey(L.lw,L.line)];if(f)segs.push({t:L.line,w:L.lw,f});else L.parts.forEach(p=>segs.push({t:p.t,w:p.w,f:lang==="ko"&&VAUD[vKey(p.w,p.t)]}))});
 if(!segs.length){done&&done();return}vTalk(true);
 let i=0;const nx=()=>{if(tok!==VO.tok)return;if(i>=segs.length){VO.pend=null;vTalk(false);done&&done();return}
  const sg=segs[i++],P=VOX[sg.w]||VOX.narrator,nt=segs[i],gap=!nt?0:(nt.w!==sg.w||sg.w==="narrator")?vGap():(P.gap||600);
  let f=false;const go=()=>{if(f)return;f=true;setTimeout(nx,gap)};
  const tts=()=>{try{const u=utter(sg.t,{lang,who:sg.w});u.onend=go;u.onerror=go;speechSynthesis.speak(u)}catch(e){}
   setTimeout(go,2500+(lang==="ko"?hanN(sg.t)*430:sg.t.length*95)/((P.r||1)*(G.vrate||1)))};
  if(!sg.f)return tts();
  /* a recorded file: play it; if it is missing or blocked, fall back to the device voice */
  const bad=a=>{if(VA===a){VA=null;if(tok===VO.tok)tts()}};
  try{const a=new Audio(sg.f);VA=a;a.playbackRate=Math.min(1.2,Math.max(.85,G.vrate||1));
   a.onended=()=>{if(VA===a)VA=null;go()};a.onerror=()=>bad(a);
   a.onloadedmetadata=()=>{if(isFinite(a.duration))setTimeout(go,a.duration*1000/a.playbackRate+2500)};
   a.play().catch(()=>bad(a))}catch(e){tts()}};
 setTimeout(nx,60);
}
function sayUI(en,ko,done){narrate([G.lang==="ko"?ko:en],done)}

let toastT;function toast(m){const el=$("toast");el.textContent=m;el.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove("show"),2600)}

/* art */
let svgN=0;
const SK='stroke="#1B2233" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
const HERO={
 rat:{em:"쥐",f:"#9EA3B0",fs:"#6F7484",m:"#F3E8EC",ir:"#8C2F3A",s:"#5B3FA6",ss:"#3F2A7A",a:"#2B1F48",orb:"bolt"},
 ox:{em:"소",f:"#3B2A22",fs:"#24180F",m:"#C9A27A",ir:"#C9822A",s:"#2A2D36",ss:"#16181E",a:"#D4A23A",pad:1,hoof:1},
 tiger:{em:"호",f:"#F4F4F6",fs:"#C4C8D4",m:"#FFFFFF",ir:"#3B6FD6",s:"#2F5FD0",ss:"#1F3F9A",a:"#FFC23D",orb:"fire"},
 rabbit:{em:"토",f:"#FFFFFF",fs:"#E6D8DE",m:"#FFFFFF",ir:"#C2185B",s:"#F25CA8",ss:"#C93D86",a:"#FFE3F1",orb:"moon"},
 dragon:{em:"용",f:"#7ACB3E",fs:"#4E9A26",m:"#DDF5B8",ir:"#E3A33A",s:"#2E8B3A",ss:"#1E6328",a:"#E3B23C",orb:"fire"},
 snake:{em:"뱀",f:"#7B4FC8",fs:"#5636A0",m:"#E9DDFB",ir:"#6A2AB8",s:"#4B2A8A",ss:"#33196A",a:"#FFD23F",orb:"wind",coil:1},
 horse:{em:"말",f:"#A0592C",fs:"#743B17",m:"#E8C9A0",ir:"#4A2A16",s:"#D63A2F",ss:"#A3241C",a:"#2B2F3A",hoof:1},
 sheep:{em:"양",f:"#FFF4E6",fs:"#E6D3BC",m:"#FFF8EE",ir:"#6A3FC8",s:"#7B4FD0",ss:"#5A35A8",a:"#FFD23F",orb:"cloud"},
 monkey:{em:"원",f:"#9A6235",fs:"#6E4220",m:"#F2D3AE",ir:"#7A4A1E",s:"#F5C21B",ss:"#C99A00",a:"#2B2F3A",staff:1},
 rooster:{em:"닭",f:"#FFFFFF",fs:"#E2D6C6",m:"#FFFFFF",ir:"#3B8FD6",s:"#2F5FD0",ss:"#1F3F9A",a:"#FFC23D",orb:"sun",wing:1},
 dog:{em:"개",f:"#A8652F",fs:"#7A4520",m:"#FFF6EC",ir:"#5A3418",s:"#F07A1E",ss:"#C45A0A",a:"#2B2F3A",badge:1},
 pig:{em:"돼",f:"#F7B8C4",fs:"#E08A9C",m:"#FFD6DE",ir:"#2E6FB8",s:"#2BA3A3",ss:"#1C7A7A",a:"#1C5F66",hoof:1}};
const mixC=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),B=p(b);return "#"+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,"0")).join("")};
const HB={rat:{sx:.9,sy:.84,hs:.98,t:4},ox:{sx:1.24,sy:1.03,hs:1.06,t:-2},tiger:{sx:1.1,sy:1,hs:1.04,t:-5},rabbit:{sx:.9,sy:.94,hs:.98,t:6},dragon:{sx:1.06,sy:1.03,hs:1,t:-3},snake:{sx:.9,sy:1,hs:.96,t:4},
 horse:{sx:.98,sy:1.09,hs:1,t:-4},sheep:{sx:1.14,sy:.93,hs:1.02,t:5},monkey:{sx:.95,sy:.93,hs:1,t:-6},rooster:{sx:.96,sy:.95,hs:.96,t:3},dog:{sx:1.02,sy:.96,hs:1.02,t:6},pig:{sx:1.26,sy:.9,hs:1.06,t:-3}};
function heroEye(x,y,s,ir,st,z=1){
 const k="e"+(++svgN);
 const sh=st==="round"?"M-5 0 Q-5 -6.4 0 -6.4 Q5 -6.4 5 0 Q5 6 0 6 Q-5 6 -5 0Z":st==="soft"?"M-5.4 0.4 Q0 -3.4 5.4 -0.8 Q4.4 3.9 -0.4 4.1 Q-4.6 3.7 -5.4 0.4Z":"M-5.6 0.8 Q-1.4 -5.2 5.6 -2.2 Q4.4 3.9 -0.6 4.1 Q-4.8 3.7 -5.6 0.8Z";
 const rd=st==="round",sl=st==="slit";
 const lid=rd?"M-5.4 -.8 Q-5 -7 0 -7 Q4.8 -7 5.4 -1.6":st==="soft"?"M-6 .5 Q0 -3.8 6 -1":"M-6.3 1.1 Q-1.4 -5.8 6.4 -2.5";
 return `<g transform="translate(${x} ${y}) scale(${s*z} ${z})"><linearGradient id="${k}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mixC(ir,"#000000",.55)}"/><stop offset=".55" stop-color="${ir}"/><stop offset="1" stop-color="${mixC(ir,"#ffffff",.55)}"/></linearGradient><clipPath id="${k}"><path d="${sh}"/></clipPath><path d="${sh}" fill="#fff"/>
 <g clip-path="url(#${k})"><ellipse cx="${rd?.3:.8}" cy="${rd?.7:.9}" rx="${rd?4.4:3.9}" ry="${rd?5.4:4.5}" fill="url(#${k}g)"/><ellipse cx="${rd?.3:.8}" cy="${rd?1.2:1.4}" rx="${sl?.8:rd?2.3:2}" ry="${sl?3.8:rd?3.1:2.7}" fill="#0F1220"/><path d="M-3.2 ${rd?-3.4:-1.8} Q.8 ${rd?-5.2:-3.6} 4.6 ${rd?-3.4:-1.8}" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" fill="none"/></g>
 <circle cx="${rd?-1:-.4}" cy="${rd?-2:-.8}" r="${rd?1.8:1.3}" fill="#fff"/><circle cx="2.3" cy="${rd?2.8:2.4}" r=".75" fill="#fff"/><circle cx="-2.2" cy="${rd?2.6:2}" r=".45" fill="#fff" opacity=".8"/>
 <path d="${lid}" fill="none" stroke="#14182A" stroke-width="${rd?1.8:2}" stroke-linecap="round"/>${rd?`<path d="M5.1 -2 L6.6 -2.9" stroke="#14182A" stroke-width="1.2" stroke-linecap="round"/>`:st==="soft"?`<path d="M5.8 -1 L7.6 -2.2" stroke="#14182A" stroke-width="1.2" stroke-linecap="round"/>`:`<path d="M5.4 -2.6 L7.8 -3.8" stroke="#14182A" stroke-width="1.4" stroke-linecap="round"/>`}</g>`;
}
function charSVG(id,bust){
 const C=HERO[id]||HERO.tiger,B=HB[id]||HB.tiger,u="h"+(++svgN),O='stroke="#1B2233" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"';
 const defs=`<defs><linearGradient id="ms${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F7FB"/><stop offset=".5" stop-color="#B8C2D2"/><stop offset="1" stop-color="#7D889B"/></linearGradient>
 <linearGradient id="gd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A0"/><stop offset="1" stop-color="#D4972A"/></linearGradient>
 <linearGradient id="su${u}" x1="0" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="${mixC(C.s,"#ffffff",.32)}"/><stop offset=".42" stop-color="${C.s}"/><stop offset=".7" stop-color="${C.s}"/><stop offset="1" stop-color="${C.ss}"/></linearGradient>
 <linearGradient id="fu${u}" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="${mixC(C.f,"#ffffff",.25)}"/><stop offset=".5" stop-color="${C.f}"/><stop offset="1" stop-color="${C.fs}"/></linearGradient>
 <radialGradient id="rf${u}" cx=".4" cy=".34" r=".72" fx=".34" fy=".24"><stop offset="0" stop-color="${mixC(C.f,"#ffffff",.42)}"/><stop offset=".55" stop-color="${C.f}"/><stop offset="1" stop-color="${mixC(C.f,C.fs,.85)}"/></radialGradient>
 <radialGradient id="rm${u}" cx=".42" cy=".3" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="${C.m}"/><stop offset="1" stop-color="${mixC(C.m,C.fs,.35)}"/></radialGradient>
 <radialGradient id="rc${u}" cx=".35" cy=".25" r=".9"><stop offset="0" stop-color="${C.cape?mixC(C.cape,"#ffffff",.25):"#fff"}"/><stop offset=".5" stop-color="${C.cape||"#fff"}"/><stop offset="1" stop-color="${C.cape?mixC(C.cape,"#000000",.3):"#fff"}"/></radialGradient></defs>`;
 const TL=(d,col,w=3.2)=>`<path d="${d}" fill="none" stroke="#1B2233" stroke-width="${w+2.4}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 /* ---- body (drawn at base size, scaled per animal) ---- */
 const tail={
  rat:TL("M58 96 Q84 106 90 90 Q94 78 86 72","#E9B8C4",2.4),
  ox:TL("M60 96 Q76 104 80 92",C.f)+`<path ${O} d="M78 90 Q86 84 86 96 Q82 99 78 90Z" fill="#2B1A12"/>`,
  tiger:`${TL("M60 96 Q88 104 91 84 Q92 74 85 68",C.f,4.4)}<path d="M79 101 L82 95 M86 93 L91 91 M89 81 L94 80 M86 72 L90 70" stroke="#2B1A12" stroke-width="2.4"/>`,
  rabbit:`<circle ${O} cx="62" cy="99" r="6.4" fill="#fff"/>`,
  dragon:`<path ${O} d="M36 62 Q12 40 2 48 Q9 54 7 63 Q15 60 17 70 Q24 64 34 74Z" fill="${C.fs}"/><path ${O} d="M64 62 Q88 40 98 48 Q91 54 93 63 Q85 60 83 70 Q76 64 66 74Z" fill="${C.fs}"/><path d="M33 64 L9 51 M33 68 L13 63 M67 64 L91 51 M67 68 L87 63" stroke="#1E6A43" stroke-width="1.2"/>
   <path ${O} d="M56 96 Q84 102 94 90 Q92 104 76 110 Q62 110 54 102Z" fill="${C.f}"/><path ${O} d="M80 94 L84 87 L87 95 L91 89 L92 96Z" fill="#E3B23C"/>`,
  snake:"",
  horse:`<path ${O} d="M60 90 Q82 88 88 106 Q90 118 82 123 Q81 110 72 103 Q66 98 60 98Z" fill="#2B1A12"/><path d="M66 94 Q78 96 84 110" stroke="#4A3020" stroke-width="1.4" fill="none"/>`,
  sheep:`<circle ${O} cx="62" cy="97" r="6.6" fill="#fff"/>`,
  monkey:TL("M60 98 Q88 100 89 82 Q90 67 80 67 Q71 69 78 78",C.f,3.4),
  rooster:`<path ${O} d="M56 92 Q70 64 90 68 Q78 78 74 92Z" fill="#1F6E5A"/><path ${O} d="M57 95 Q78 78 96 86 Q82 90 75 100Z" fill="#E8373A"/><path ${O} d="M57 98 Q74 92 90 104 Q76 104 66 104Z" fill="#FF8A1F"/>`,
  dog:TL("M60 94 Q76 90 82 76",C.f,4),
  pig:TL("M60 96 Q68 93 68 99 Q68 106 62 104 Q58 102 62 99",C.fs,2.6)}[id]||"";
 const cape=C.cape?`<path ${O} d="M33 58 L67 58 L79 118 Q50 126 21 118Z" fill="url(#rc${u})"/>`:"";
 const foot=C.hoof?`<path ${O} d="M34.4 110 L46.4 110 L47.2 121.5 L33.6 121.5Z" fill="#3A2A20"/><path ${O} d="M53.6 110 L65.6 110 L66.4 121.5 L52.8 121.5Z" fill="#3A2A20"/><path d="M40.4 112 L40.4 121.5 M59.6 112 L59.6 121.5" stroke="#1B2233" stroke-width="1"/>`
  :id==="rooster"?`<path d="M41 104 L41 118 M59 104 L59 118" stroke="#1B2233" stroke-width="4.4" stroke-linecap="round"/><path d="M41 104 L41 118 M59 104 L59 118" stroke="#FFB52E" stroke-width="2.4" stroke-linecap="round"/><path d="M41 118 L35 122 M41 118 L41 123 M41 118 L47 122 M59 118 L53 122 M59 118 L59 123 M59 118 L65 122" stroke="#E39B00" stroke-width="2" stroke-linecap="round"/>`
  :`<path ${O} d="M34 104 L46 104 Q49 114 48.4 121.5 L34.6 121.5 Q31.6 119 34 104Z" fill="${C.a}"/><path ${O} d="M54 104 L66 104 Q68.4 119 65.4 121.5 L51.6 121.5 Q51 114 54 104Z" fill="${C.a}"/><path d="M35.4 107.4 L45.6 107.4 M54.4 107.4 L64.6 107.4" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/><path d="M35 120 L48 120 M52 120 L65 120" stroke="#000" stroke-opacity=".25" stroke-width="2"/>`;
 const legs=C.coil?`${TL("M42 90 Q26 98 32 110 Q40 122 58 120 Q72 117 70 106 Q68 97 56 98 Q46 100 48 108",C.f,11)}<path d="M36 104 Q44 114 58 113" stroke="${C.m}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M33 108 L36 106 M44 116 L46 113 M56 117 L57 114 M66 112 L64 110" stroke="${C.fs}" stroke-width="1.4"/>`
  :`${id==="rooster"?"":`<path ${O} d="M39 88 L35.4 110 L44.8 110 L48.6 91Z" fill="url(#fu${u})"/><path ${O} d="M51.4 91 L55.2 110 L64.6 110 L61 88Z" fill="url(#fu${u})"/>`}
   <path ${O} d="M33 84 Q50 89 67 84 L66.5 99 L53 99 L50 93.5 L47 99 L33.5 99Z" fill="url(#su${u})"/>${foot}`;
 const vest=`<path ${O} d="M34 60 Q50 55 66 60 L68 90 Q50 95 32 90Z" fill="url(#su${u})"/>
  <path ${O} d="M43 57.6 L50 67 L57 57.6 Q50 60 43 57.6Z" fill="${C.m}"/>
  <path d="M37.5 64 Q36.6 76 36.6 86" stroke="#fff" stroke-opacity=".25" stroke-width="1.8" fill="none"/>
  ${id==="sheep"?[[34,62],[38,58],[62,58],[66,62],[34,70],[66,70]].map(([x,y])=>`<circle ${O} cx="${x}" cy="${y}" r="4.6" fill="#fff"/>`).join(""):""}
  ${id==="rooster"?`<path ${O} d="M38 56 L42 63 L45 56 L48 64 L50 56 L52 64 L55 56 L58 63 L62 56 Q50 52 38 56Z" fill="#FF8A1F"/>`:""}
  ${id==="tiger"?`<path d="M35 72 L39 74 M35 80 L39 81 M65 72 L61 74 M65 80 L61 81" stroke="#7A1424" stroke-width="2"/>`:""}
  <path ${O} d="M32.5 85 Q50 90 67.5 85 L67.8 90 Q50 95 32.2 90Z" fill="${C.a}"/><rect ${O} x="46.6" y="86.4" width="6.8" height="5.4" rx="1.2" fill="url(#gd${u})"/>
  <circle ${O} cx="50" cy="74" r="8.2" fill="#fff"/><circle cx="50" cy="74" r="6.7" fill="none" stroke="${C.a==="#FFFFFF"?C.ss:C.a}" stroke-width="1.6"/>
  <text x="50" y="77.6" text-anchor="middle" font-family="Jua, 'Apple SD Gothic Neo', sans-serif" font-size="10.4" fill="${C.ss}">${C.em}</text>`;
 const orbs={
  bolt:`<circle cx="74" cy="75" r="8" fill="#FFF2A8" opacity=".55"/><path ${O} d="M75 66 L69 76 L74 76 L71 84 L79 73 L74 73Z" fill="#FFE45C"/>`,
  fire:`<circle cx="74" cy="76" r="7.5" fill="#FFB547" opacity=".45"/><path ${O} d="M74 66 Q69 72 71 78 Q74 82 77 78 Q79 72 74 66Z" fill="#FF8A2B"/><path d="M74 71 Q72 75 74 78 Q76 75 74 71Z" fill="#FFE08A"/>`,
  moon:`<circle cx="74" cy="75" r="8" fill="#E6DEFF" opacity=".6"/><path ${O} d="M77 68 Q68 69 69 77 Q70 84 78 83 Q72 80 72 76 Q72 71 77 68Z" fill="#FFF3B0"/>`,
  wind:`<circle cx="74" cy="75" r="8" fill="#C9FFE0" opacity=".5"/>${TL("M68 72 Q74 68 78 72 Q80 76 75 77 M67 77 Q73 75 77 78","#6FE3A0",2)}`,
  cloud:`<path ${O} d="M66 78 Q64 72 70 72 Q71 66 77 68 Q82 66 82 72 Q87 73 84 78Z" fill="#fff"/>`,
  sun:`<circle cx="74" cy="75" r="9" fill="#FFE08A" opacity=".5"/><circle ${O} cx="74" cy="75" r="5" fill="#FFC23D"/><path d="M74 66 L74 68.4 M74 81.6 L74 84 M65 75 L67.4 75 M80.6 75 L83 75 M67.6 68.6 L69.3 70.3 M78.7 79.7 L80.4 81.4 M80.4 68.6 L78.7 70.3 M69.3 79.7 L67.6 81.4" stroke="#E39B00" stroke-width="1.8" stroke-linecap="round"/>`}[C.orb]||"";
 const gear=(C.staff?`<path ${O} d="M66 120 L80 36 L83 36.5 L69 120.5Z" fill="#B3262A"/><path ${O} d="M78.4 36 L84.6 37 L84 42 L77.8 41Z M66.6 114 L72.4 115 L71.4 120.6 L65.8 119.6Z" fill="url(#gd${u})"/>`:"")+
  (C.badge?`<path ${O} d="M66 70 L82 70 L82 82 Q74 90 66 82Z" fill="url(#gd${u})"/><path d="M72 76 a1.6 1.6 0 1 0 .1 0 M76 76 a1.6 1.6 0 1 0 .1 0 M70 79 a1.4 1.4 0 1 0 .1 0 M78 79 a1.4 1.4 0 1 0 .1 0 M74 82 a2.4 2 0 1 0 .1 0" fill="#7A4E12"/>`:"")+orbs;
 const pads=C.pad?`<ellipse ${O} cx="33" cy="61.5" rx="8.6" ry="5.8" fill="url(#ms${u})"/><ellipse ${O} cx="67" cy="61.5" rx="8.6" ry="5.8" fill="url(#ms${u})"/>`:"";
 const hand=(x,y)=>C.hoof?`<path ${O} d="M${x-4.4} ${y-2} L${x+4.4} ${y-2} L${x+4} ${y+4.2} L${x-4} ${y+4.2}Z" fill="#3A2A20"/><path d="M${x} ${y-1} L${x} ${y+4.2}" stroke="#1B2233" stroke-width=".9"/>`
  :`<circle ${O} cx="${x}" cy="${y}" r="4.2" fill="${C.f}"/><circle cx="${x}" cy="${y+1}" r="1.6" fill="${C.m}"/>`;
 const arms=C.wing?`<path ${O} d="M35 61 Q22 66 20 84 Q26 82 28 86 Q31 80 34 84 Q35 76 39 67Z" fill="#fff"/><path d="M22 82 L27 78 M28 85 L31 79" stroke="#E2CFAF" stroke-width="1.4"/><path ${O} d="M20 84 Q26 82 28 86 Q31 80 34 84 L32 88 Q27 86 22 88Z" fill="#FF8A1F"/>
   <path ${O} d="M65 61 Q76 64 78 76 Q74 76 73 80 Q70 75 66 77 Q66 70 61 66.6Z" fill="#fff"/><path ${O} d="M78 76 Q74 76 73 80 Q70 75 66 77 L68 81 Q71 79 74 82 Q76 79 79 80Z" fill="#FF8A1F"/>${gear}`
  :`<path ${O} d="M34.5 61 Q27 65 26.5 80 L31.5 81.5 Q32.5 70 38.5 66Z" fill="${C.f}"/><path ${O} d="M26.3 75.6 L31.9 77 L31.7 80.2 L26.4 78.8Z" fill="${C.a==="#FFFFFF"?C.ss:C.a}"/>
   <path ${O} d="M65.5 61 Q73 65 75 76 L70.5 78.5 Q68 70 61.5 66.5Z" fill="${C.f}"/><path d="M66 63 Q71 66 73 74 L70.5 76 Q68.5 69 64 66Z" fill="${C.fs}"/><path ${O} d="M70.2 74.6 L74.9 73 L75.6 76 L71 77.8Z" fill="${C.a==="#FFFFFF"?C.ss:C.a}"/>
   <path ${O} d="M35 60 Q38 58.4 41 58.6 L39.6 64 Q36.6 63.6 33.6 64.6Z M65 60 Q62 58.4 59 58.6 L60.4 64 Q63.4 63.6 66.4 64.6Z" fill="url(#su${u})"/>
   ${pads}${gear}${hand(29,83.5)}${hand(73,79.5)}`;
 const bx=.84*B.sx,by=.76*B.sy;
 const body=`<g transform="translate(50 122) scale(${bx} ${by}) translate(-50 -122)">${cape}${tail}${legs}${vest}${arms}</g>`;
 /* ---- heads ---- */
 const E=(st,y=37.4,l=43.2,r=56.8)=>heroEye(50-(50-l)*1.12,y+1.2,1,C.ir,st)+heroEye(50+(r-50)*1.12,y+1.2,-1,C.ir,st);
 const brow=(d,w=1.8)=>`<path transform="translate(0 -2.2)" d="${d}" stroke="#14182A" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
 const nose=(fill="#1B2233")=>`<path d="M47.6 42.6 Q50 41.4 52.4 42.6 Q51.6 44.6 50 45 Q48.4 44.6 47.6 42.6Z" fill="${fill}"/>`;
 const smile="M47.2 47.3 Q50 49.4 52.8 47.3";
 const shade=`<path d="M58.5 23.5 Q68.5 30 67.6 40 Q66 50.5 55.5 54.3 Q63.4 46 63.2 38 Q63 30 58.5 23.5Z" fill="${C.fs}" opacity=".3"/><path d="M38.6 28.6 Q41.6 24.6 45.6 23.4" stroke="#fff" stroke-opacity=".3" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
 const heads={
  rat:`<circle ${O} cx="33.5" cy="24" r="10" fill="${C.f}"/><circle ${O} cx="66.5" cy="24" r="10" fill="${C.f}"/><circle cx="33.5" cy="24" r="6" fill="#F2A7B8"/><circle cx="66.5" cy="24" r="6" fill="#F2A7B8"/>
   <path ${O} d="M35 34 Q35 21 50 21 Q65 21 65 34 Q65 44 57 50 L50 55.5 L43 50 Q35 44 35 34Z" fill="${C.f}"/>${shade}
   <path d="M43 44 Q50 41 57 44 Q55.6 51 50 54.6 Q44.4 51 43 44Z" fill="${C.m}"/>
   <path d="M44 47.6 L30 45 M44 49.4 L31 51 M56 47.6 L70 45 M56 49.4 L69 51" stroke="#5E6474" stroke-width=".9"/>
   <circle ${O} cx="50" cy="53" r="2.5" fill="#E57A92"/><path d="M46.4 50.4 Q48.6 51.6 50 50.6" stroke="#1B2233" stroke-width="1" fill="none"/>
   <path ${O} d="M44 26 L46 21 L48 25.6 L50 20 L52 25.6 L54 21 L56 26Z" fill="${C.f}"/>${E("sharp",35.4,44,56)}${brow("M38.6 29 Q42 27.6 46 28.6 M61.4 29 Q58 27.6 54 28.6",1.5)}`,
  ox:`<path ${O} d="M34 28 Q20 28 16 12 Q24 19 36 21.6Z" fill="#F2E3B0"/><path ${O} d="M66 28 Q80 28 84 12 Q76 19 64 21.6Z" fill="#F2E3B0"/><path d="M16 12 Q18 16.4 21 17.6 M84 12 Q82 16.4 79 17.6" stroke="#8C7A50" stroke-width="2.2"/>
   <ellipse ${O} cx="27" cy="36" rx="7.6" ry="3.8" fill="${C.f}" transform="rotate(-16 27 36)"/><ellipse ${O} cx="73" cy="36" rx="7.6" ry="3.8" fill="${C.f}" transform="rotate(16 73 36)"/><ellipse cx="27.6" cy="36" rx="4" ry="1.8" fill="#E8A6A6" transform="rotate(-16 27.6 36)"/><ellipse cx="72.4" cy="36" rx="4" ry="1.8" fill="#E8A6A6" transform="rotate(16 72.4 36)"/>
   <path ${O} d="M32 30 Q33 19 50 19 Q67 19 68 30 L67 42 Q65 55 50 57 Q35 55 33 42Z" fill="${C.f}"/>${shade}
   <path d="M46.6 22 L53.4 22 L52.4 40 L47.6 40Z" fill="${C.m}" opacity=".9"/>
   <path ${O} d="M42 22 L45 15 L48 21 L51 14 L53 21 L57 15 L58 22Z" fill="#2B1A12"/>
   <ellipse ${O} cx="50" cy="48.6" rx="12.6" ry="8" fill="${C.m}"/><ellipse cx="45.4" cy="47.6" rx="2" ry="1.4" fill="#2B1A12"/><ellipse cx="54.6" cy="47.6" rx="2" ry="1.4" fill="#2B1A12"/><path ${O} d="M44.6 51.8 Q50 56.6 55.4 51.8 Q50 53.2 44.6 51.8Z" fill="#9E3D55"/>
   ${E("sharp",36.6,42.4,57.6)}${brow("M36 30.6 L46.4 32.6 M64 30.6 L53.6 32.6",2.6)}`,
  tiger:`<path ${O} d="M34 36 L24 40 L31 43 L24.6 48.6 L33 49 L30 54 L40 51Z" fill="${C.f}"/><path ${O} d="M66 36 L76 40 L69 43 L75.4 48.6 L67 49 L70 54 L60 51Z" fill="#fff"/>
   <circle ${O} cx="35" cy="24" r="6.8" fill="${C.f}"/><circle ${O} cx="65" cy="24" r="6.8" fill="${C.f}"/><circle cx="35" cy="24" r="3.8" fill="#2B1A12"/><circle cx="65" cy="24" r="3.8" fill="#2B1A12"/><circle cx="35" cy="24.4" r="1.4" fill="#fff"/><circle cx="65" cy="24.4" r="1.4" fill="#fff"/>
   <ellipse ${O} cx="50" cy="38" rx="18" ry="16.6" fill="${C.f}"/>${shade}
   <path d="M45.6 22 L48 28.4 M50 21 L50 28.4 M54.4 22 L52 28.4 M35 33 L40.4 34.6 M34 38 L39.6 38.6 M65 33 L59.6 34.6 M66 38 L60.4 38.6" stroke="#2B1A12" stroke-width="2.2" stroke-linecap="round"/>
   <path ${O} d="M38.6 44 Q41 39.4 50 41.4 Q59 39.4 61.4 44 Q60.6 53 50 53.4 Q39.4 53 38.6 44Z" fill="${C.m}"/>${nose("#C84A5A")}
   <path d="M50 45 L50 47 M45.6 47.6 Q50 51.4 54.4 47.6" stroke="#1B2233" stroke-width="1.1" fill="none" stroke-linecap="round"/><path d="M46.6 48.6 L47.4 51 L48.4 49.2 M53.4 48.6 L52.6 51 L51.6 49.2" fill="#fff" stroke="#1B2233" stroke-width=".7"/>
   ${E("sharp")}${brow("M37 30.6 L45.6 32.8 M63 30.6 L54.4 32.8",2.2)}`,
  rabbit:`<path ${O} d="M41.5 24 Q35.6 0 42.6 -11 Q50.6 2 48 24Z" fill="${C.f}"/><path ${O} d="M58.5 24 Q64 6 70 -2 Q74 4 66 12 Q60 18 52 24Z" fill="${C.f}"/><path d="M43.2 20 Q40 2 43 -6 Q46.6 4 46 20Z M55.4 20 Q61 9 67 2 Q69.6 5 64 11 Q59 16 55.4 20Z" fill="#F2A7B8"/>
   <path ${O} d="M34 38 Q33 22 50 21 Q67 22 66 38 Q65 54 50 55 Q35 54 34 38Z" fill="${C.f}"/>${shade}
   <ellipse cx="38.6" cy="45.4" rx="3.2" ry="2.2" fill="#F59AA8" opacity=".7"/><ellipse cx="61.4" cy="45.4" rx="3.2" ry="2.2" fill="#F59AA8" opacity=".7"/>
   <ellipse ${O} cx="50" cy="46.6" rx="7.4" ry="5.4" fill="${C.m}"/><path d="M48.2 43.6 Q50 42.6 51.8 43.6 Q51.2 45.4 50 45.6 Q48.8 45.4 48.2 43.6Z" fill="#E57A92"/>
   <path d="M50 45.6 L50 47.2 M47.4 47.8 Q50 49.6 52.6 47.8" stroke="#1B2233" stroke-width="1" fill="none" stroke-linecap="round"/><rect ${O} x="48.4" y="48.2" width="3.2" height="3.4" rx=".6" fill="#fff"/>
   ${E("round",36.4,43,57)}`,
  dragon:`<path ${O} d="M30 30 L22 26 L28 34 L20 36 L30 40 Z M70 30 L78 26 L72 34 L80 36 L70 40Z" fill="#2A8A58"/>
   ${TL("M41 24 L37 9 M38 14 L32 10 M37 9 L38 3","#F2E3B0",2.6)}${TL("M59 24 L63 9 M62 14 L68 10 M63 9 L62 3","#F2E3B0",2.6)}
   <path ${O} d="M34 34 Q33 20 50 20 Q67 20 66 34 L64 44 Q62 56 50 57 Q38 56 36 44Z" fill="${C.f}"/>${shade}
   <path d="M44 25 Q47 23 50 25 Q53 23 56 25 M46 29 Q48 27.6 50 29 Q52 27.6 54 29" stroke="${C.fs}" stroke-width="1.2" fill="none"/>
   <path ${O} d="M39 44 Q50 39 61 44 Q61 55 50 56.6 Q39 55 39 44Z" fill="${C.m}"/><ellipse ${O} cx="45.6" cy="45.4" rx="2.4" ry="1.8" fill="${C.fs}"/><ellipse ${O} cx="54.4" cy="45.4" rx="2.4" ry="1.8" fill="${C.fs}"/>
   <path d="M44 51.4 Q50 54.6 56 51.4" stroke="#1B2233" stroke-width="1.2" fill="none"/><path d="M45.4 52.2 L46.2 54.6 L47.2 52.8 M54.6 52.2 L53.8 54.6 L52.8 52.8" fill="#fff" stroke="#1B2233" stroke-width=".7"/>
   ${TL("M40 46 Q31 44 28 48.6 Q27 51.6 30 52","#FFE08A",1)}${TL("M60 46 Q69 44 72 48.6 Q73 51.6 70 52","#FFE08A",1)}
   ${E("sharp",36,43,57)}${brow("M37 30 L46 31.6 M63 30 L54 31.6",2.2)}`,
  snake:`<path ${O} d="M27 46 Q20 24 40 16 Q50 12 60 16 Q80 24 73 46 Q64 57 50 59 Q36 57 27 46Z" fill="${C.fs}"/><path d="M33 40 Q32 28 42 22 M67 40 Q68 28 58 22" stroke="${C.f}" stroke-width="2" fill="none"/>
   <path ${O} d="M32 40 Q28 22 50 18.6 Q72 22 68 40 Q63 54 50 56 Q37 54 32 40Z" fill="${C.f}"/>${shade}
   <path d="M44 23 L50 27 L56 23 L50 20Z" fill="${C.fs}"/><path d="M40 28 L44 30 M60 28 L56 30" stroke="${C.fs}" stroke-width="1.4"/>
   <path ${O} d="M41 45 Q50 41 59 45 Q57 53 50 54.4 Q43 53 41 45Z" fill="${C.m}"/><circle cx="47.6" cy="44.2" r=".9" fill="#1B2233"/><circle cx="52.4" cy="44.2" r=".9" fill="#1B2233"/>
   <path d="M45 48.6 Q49 51 55.6 47.4" stroke="#1B2233" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M50 50.4 L50 55 L48.4 57 M50 55 L51.6 57" stroke="#E8373A" stroke-width="1.2" fill="none" stroke-linecap="round"/>
   ${E("slit",36,43,57)}${brow("M37 30.4 L46 32 M63 30.4 L54 32",1.6)}`,
  horse:`<path ${O} d="M38.6 26 L35 7.6 L46 20Z" fill="${C.f}"/><path ${O} d="M61.4 26 L65 7.6 L54 20Z" fill="${C.f}"/><path d="M39.6 22 L37.4 12 L43 19Z M60.4 22 L62.6 12 L57 19Z" fill="${C.fs}"/>
   <path ${O} d="M44 18 Q60 10 68 22 Q76 34 72 52 Q68 46 66 40 Q66 50 62 56 L62 34 Q58 24 50 22Z" fill="#2B1A12"/>
   <path ${O} d="M37 30 Q37 17 50 17 Q63 17 63 30 L62.4 44 Q62.6 58 50 60 Q37.4 58 37.6 44Z" fill="${C.f}"/>${shade}
   <path d="M48 20 L52 20 L51.4 38 L48.6 38Z" fill="#fff" opacity=".85"/>
   <path ${O} d="M44 18 Q50 14 56 18 L53 27 L50 22 L47 27Z" fill="#2B1A12"/>
   <path ${O} d="M39.6 45 Q50 40.6 60.4 45 L60 53 Q57 60.4 50 60.4 Q43 60.4 40 53Z" fill="${C.m}"/><ellipse cx="45.4" cy="49.6" rx="2.5" ry="1.7" fill="#2B1A12" transform="rotate(-18 45.4 49.6)"/><ellipse cx="54.6" cy="49.6" rx="2.5" ry="1.7" fill="#2B1A12" transform="rotate(18 54.6 49.6)"/>
   <path ${O} d="M45 54.4 Q50 60 55 54.4 Q50 55.8 45 54.4Z" fill="#9E3D55"/>
   ${E("sharp",33.4,43.2,56.8)}${brow("M38 27.4 L46 29 M62 27.4 L54 29",1.8)}`,
  sheep:`${[[33,30],[36,22],[43,17],[50,15.6],[57,17],[64,22],[67,30],[31,39],[69,39]].map(([x,y])=>`<circle ${O} cx="${x}" cy="${y}" r="7.4" fill="#fff"/>`).join("")}
   <path ${O} d="M32 32 Q20 30 19 42 Q19 52 29 49 Q24 44 26 40 Q28 35 34 37Z" fill="#E3C79A"/><path ${O} d="M68 32 Q80 30 81 42 Q81 52 71 49 Q76 44 74 40 Q72 35 66 37Z" fill="#E3C79A"/><path d="M24 42 Q24 38 28 38 M76 42 Q76 38 72 38" stroke="#B89A66" stroke-width="1.2" fill="none"/>
   <ellipse ${O} cx="50" cy="40.6" rx="13.6" ry="14.6" fill="${C.f}"/><path d="M56 27.6 Q64 32 63.4 41 Q62 51 54 55 Q60 47 60 40 Q60 32 56 27.6Z" fill="${C.fs}" opacity=".55"/>
   ${[[42,26],[48,24],[54,24.6],[58,27]].map(([x,y])=>`<circle ${O} cx="${x}" cy="${y}" r="4.4" fill="#fff"/>`).join("")}
   <ellipse cx="41.4" cy="46.6" rx="2.8" ry="1.8" fill="#F59AA8" opacity=".7"/><ellipse cx="58.6" cy="46.6" rx="2.8" ry="1.8" fill="#F59AA8" opacity=".7"/>
   <path d="M47.8 45.6 Q50 44.6 52.2 45.6 Q51.4 47.4 50 47.6 Q48.6 47.4 47.8 45.6Z" fill="#6B4A36"/><path d="M50 47.6 L50 49" stroke="#1B2233" stroke-width="1" stroke-linecap="round"/><path ${O} d="M47 49.2 Q50 53.6 53 49.2 Q50 50.2 47 49.2Z" fill="#C2566A"/>
   ${E("soft",39.4,44,56)}`,
  monkey:`<circle ${O} cx="30.6" cy="38" r="7.8" fill="${C.f}"/><circle ${O} cx="69.4" cy="38" r="7.8" fill="${C.f}"/><circle cx="30.6" cy="38" r="4.4" fill="${C.m}"/><circle cx="69.4" cy="38" r="4.4" fill="${C.m}"/>
   <ellipse ${O} cx="50" cy="38" rx="17.5" ry="16.6" fill="${C.f}"/>${shade}
   <path ${O} d="M44 23 L46 15 L49 21 L52 13 L54 21 L58 16 L57 24Z" fill="${C.f}"/>
   <path ${O} d="M50 30.6 Q42.6 24.6 37.6 30.6 Q33.6 36.6 37.4 44.6 Q42 54.6 50 54.6 Q58 54.6 62.6 44.6 Q66.4 36.6 62.4 30.6 Q57.4 24.6 50 30.6Z" fill="${C.m}"/>
   <path ${O} d="M33.4 30 Q50 22.6 66.6 30 L66.2 33 Q50 25.8 33.8 33Z" fill="url(#gd${u})"/>
   <ellipse cx="47.6" cy="44" rx="1.1" ry="1.5" fill="#1B2233"/><ellipse cx="52.4" cy="44" rx="1.1" ry="1.5" fill="#1B2233"/>
   <path ${O} d="M43 47.6 Q50 54 57 47.6 Q50 50 43 47.6Z" fill="#fff"/>
   ${E("sharp",38,43.4,56.6)}${brow("M37.6 32.6 Q42 30.4 46.4 32.6 M62.4 32.6 Q58 30.4 53.6 32.6",1.6)}`,
  rooster:`<path ${O} d="M39 25 Q37 10 45 12 Q45.6 3 53 6.6 Q57 0 62 7.6 Q68.6 7.6 65 23Z" fill="#E8373A"/><path d="M45 12 Q48 18 50 22 M53 7 Q54 14 55 21 M62 8 Q60 15 59 22" stroke="#B8242A" stroke-width="1.2" fill="none"/>
   <path ${O} d="M36 46 L30 54 L38 52 L36 58 L44 54 L46 60 L50 55 L54 60 L56 54 L64 58 L62 52 L70 54 L64 46Z" fill="#FF8A1F"/>
   <ellipse ${O} cx="50" cy="38" rx="16.6" ry="16" fill="${C.f}"/>${shade}
   <ellipse cx="43.2" cy="38.6" rx="5.8" ry="5" fill="#F06A6A" opacity=".5"/><ellipse cx="56.8" cy="38.6" rx="5.8" ry="5" fill="#F06A6A" opacity=".5"/>
   <path ${O} d="M44 42.4 L56 42.4 L50 49.4Z" fill="#FFB52E"/><path ${O} d="M46 46 L54 46 L50 51Z" fill="#E39B00"/>
   <path ${O} d="M47.6 50 Q50 59 52.4 50Z" fill="#E8373A"/>
   ${E("sharp",36.4,43.4,56.6)}${brow("M38.4 30.8 L45.6 32.2 M61.6 30.8 L54.4 32.2",1.3)}`,
  dog:`<path ${O} d="M36.4 23 Q23 23 23 42 Q24 54 31 52 Q33 40 38 32Z" fill="${C.fs}"/><path ${O} d="M63.6 23 Q77 23 77 42 Q76 54 69 52 Q67 40 62 32Z" fill="${C.fs}"/>
   <ellipse ${O} cx="50" cy="38" rx="17" ry="16.4" fill="${C.f}"/>${shade}
   <ellipse cx="57" cy="35" rx="6.4" ry="5.6" fill="#8A5A2E" opacity=".75"/>
   <ellipse ${O} cx="50" cy="47" rx="10" ry="7.4" fill="${C.m}"/><ellipse ${O} cx="50" cy="43" rx="3.8" ry="2.6" fill="#1B2233"/><ellipse cx="49" cy="42.2" rx="1.2" ry=".7" fill="#fff" opacity=".7"/>
   <path d="M50 45.6 L50 47.6 M45.6 48 Q50 52 54.4 48" stroke="#1B2233" stroke-width="1.1" fill="none" stroke-linecap="round"/><path ${O} d="M47.6 49.6 Q47.6 55.6 50 55.6 Q52.4 55.6 52.4 49.6Z" fill="#F27C8E"/>
   ${E("round",35.4,43.2,56.8)}`,
  pig:`<path ${O} d="M35 28 L30 12 L46 21Z" fill="${C.f}"/><path ${O} d="M65 28 L70 12 L54 21Z" fill="${C.f}"/><path d="M36 25 L33 16 L42 21.6Z M64 25 L67 16 L58 21.6Z" fill="${C.fs}"/>
   <ellipse ${O} cx="50" cy="39" rx="19" ry="16.6" fill="${C.f}"/>${shade}
   <circle cx="37.6" cy="45" r="3.6" fill="#F27C8E" opacity=".6"/><circle cx="62.4" cy="45" r="3.6" fill="#F27C8E" opacity=".6"/>
   <ellipse ${O} cx="50" cy="45" rx="8.6" ry="6.2" fill="#F79AAE"/><ellipse cx="47.2" cy="45" rx="1.6" ry="2.3" fill="#9E3D55"/><ellipse cx="52.8" cy="45" rx="1.6" ry="2.3" fill="#9E3D55"/>
   <path ${O} d="M44 51.4 Q50 56.4 56 51.4 Q50 53.4 44 51.4Z" fill="#9E3D55"/>
   ${E("round",35,42.6,57.4)}`};
 const ny=122-67*by,dy=ny-55,hz=B.hs*1.32;
 const hs=(heads[id]||heads.tiger).split(`fill="${C.f}"`).join(`fill="url(#rf${u})"`).split(`fill="${C.m}"`).join(`fill="url(#rm${u})"`);
 const head=`<g transform="translate(0 ${dy.toFixed(2)}) translate(50 55) rotate(${B.t||0}) scale(${hz.toFixed(3)}) translate(-50 -55)"><path d="M45 50 L55 50 L55 58 L45 58Z" fill="${C.fs}"/>${hs}</g>`;
 const vb=bust?`14 ${(ny-61).toFixed(1)} 72 72`:"0 -14 100 144";
 return `<svg viewBox="${vb}" aria-hidden="true">${defs}<ellipse cx="50" cy="122.5" rx="${24*bx}" ry="4" fill="rgba(0,0,0,.22)"/>${body}<ellipse cx="50" cy="${(ny+3).toFixed(1)}" rx="${13*bx}" ry="3.4" fill="#000" opacity=".2"/>${head}</svg>`;
}
const eyes=(l,r,y,f,ir="#3B4C8C",glow)=>[l,r].map((x,i)=>{const s=i?-1:1,k="e"+(++svgN);
 const shape=f?"M-5.6 1 Q-1 -4.6 5.6 -2 Q4.2 3.7 -0.5 3.9 Q-4.7 3.5 -5.6 1Z":"M-5 0 Q-5 -6.6 0 -6.6 Q5 -6.6 5 0 Q5 6.6 0 6.6 Q-5 6.6 -5 0Z";
 return `<g transform="translate(${x} ${y}) scale(${s} 1)">${glow?`<path d="${shape}" fill="${ir}" opacity=".55" transform="scale(1.5)"/>`:""}<clipPath id="${k}"><path d="${shape}"/></clipPath><path d="${shape}" fill="${glow?"#FFF7D6":"#fff"}"/>
 <g clip-path="url(#${k})"><ellipse cx="${f?1:.4}" cy="${f?.8:.6}" rx="${f?3.4:3.9}" ry="${f?3.9:5.1}" fill="${ir}"/><ellipse cx="${f?1:.4}" cy="${f?1.6:1.6}" rx="${f?1.6:2.1}" ry="${f?2.4:3}" fill="#0F1220"/><path d="M-3.4 ${f?-1.8:-3.6} Q.6 ${f?-3.6:-5.6} 4.4 ${f?-1.8:-3.6}" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" fill="none"/></g>
 <circle cx="-1" cy="${f?-.8:-2.2}" r="${f?1.3:1.8}" fill="#fff"/><circle cx="2.2" cy="${f?2.2:3.2}" r=".75" fill="#fff"/>
 <path d="${f?"M-6.3 1.2 Q-1 -5.4 6.5 -2.4":"M-5.5 -.6 Q-5.2 -7.4 0 -7.4 Q4.8 -7.4 5.5 -1.6"}" fill="none" stroke="#14182A" stroke-width="${f?2.1:1.8}" stroke-linecap="round"/>
 ${f?`<path d="M-6.4 -6.8 L5.4 -4.2" stroke="#14182A" stroke-width="2.3" stroke-linecap="round"/>`:""}</g>`}).join("");
let HIMG={};try{HIMG=JSON.parse(localStorage.getItem("hiq2img")||"{}")||{}}catch(e){HIMG={}}
const PORT={"rat":"assets/img/portrait/rat.webp","ox":"assets/img/portrait/ox.webp","tiger":"assets/img/portrait/tiger.webp","rabbit":"assets/img/portrait/rabbit.webp","dragon":"assets/img/portrait/dragon.webp","snake":"assets/img/portrait/snake.webp","horse":"assets/img/portrait/horse.webp","sheep":"assets/img/portrait/sheep.webp","monkey":"assets/img/portrait/monkey.webp","rooster":"assets/img/portrait/rooster.webp","dog":"assets/img/portrait/dog.webp","pig":"assets/img/portrait/pig.webp","mentor":"assets/img/portrait/mentor.webp","v_black":"assets/img/portrait/v_black.webp","v_white":"assets/img/portrait/v_white.webp","v_tiger":"assets/img/portrait/v_tiger.webp","v_gray":"assets/img/portrait/v_gray.webp","v_fat":"assets/img/portrait/v_fat.webp","v_purple":"assets/img/portrait/v_purple.webp"};
const VIL={black:{n:{en:"Black Cat",ko:"흑묘"},tr:{en:"sly",ko:"교활함"},ab:{en:"hides important clues",ko:"중요한 단서를 숨겨요"}},
 white:{n:{en:"White Cat",ko:"백묘"},tr:{en:"wants to rule",ko:"지배욕"},ab:{en:"makes fake rules with 'always' and 'must'",ko:"'항상', '반드시'로 엉터리 규칙을 만들어요"}},
 tiger:{n:{en:"Tiger Cat",ko:"호랑이냥"},tr:{en:"show-off",ko:"거만함"},ab:{en:"insists made-up things are true",ko:"근거 없는 말을 사실처럼 우겨요"}},
 gray:{n:{en:"Grey Cat",ko:"회색냥"},tr:{en:"trickster",ko:"속임수"},ab:{en:"swaps the order of events",ko:"일의 순서를 뒤바꿔요"}},
 purple:{n:{en:"Purple Cat",ko:"보라냥"},tr:{en:"word-swapper",ko:"말 바꾸기"},ab:{en:"swaps in look-alike words",ko:"비슷하지만 뜻이 다른 낱말로 바꿔요"}},
 fat:{n:{en:"Chubby Cat",ko:"뚱냥"},tr:{en:"greedy",ko:"탐욕"},ab:{en:"mixes up friends' records",ko:"여러 친구의 기록을 뒤섞어요"}}};
const portImg=(src,cls="")=>`<img class="heroport ${cls}" src="${src}" alt="">`;
const heroArt=(id,bust)=>HIMG[id]?`<img class="heroimg${bust?" bust":""}" src="${HIMG[id]}" alt="">`:PORT[id]?portImg(PORT[id]):charSVG(id,bust);
const VFACE={black:"assets/img/npc/v_black_face.webp"};
const vilArt=k=>HIMG["v_"+k]?`<img class="heroimg" src="${HIMG["v_"+k]}" alt="">`:portImg(VFACE[k]||PORT["v_"+k]);
const mentorArt=()=>HIMG.mentor?`<img class="heroimg bust" src="${HIMG.mentor}" alt="">`:portImg(PORT.mentor);
/* islanders & props */
const OL='stroke="#1B2233" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"';
function artDefs(u){return `<defs><linearGradient id="ms${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F7FB"/><stop offset=".5" stop-color="#B8C2D2"/><stop offset="1" stop-color="#7D889B"/></linearGradient>
 <linearGradient id="gd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A0"/><stop offset="1" stop-color="#D4972A"/></linearGradient>
 <radialGradient id="gl${u}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#FFF2A8"/><stop offset="1" stop-color="#F2B230"/></radialGradient>
 <linearGradient id="wd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B07A48"/><stop offset="1" stop-color="#7A4E2C"/></linearGradient></defs>`}
function npcEye(x,y,ir,s,soft){
 const k="e"+(++svgN),sh=soft?"M-5.4 0.6 Q0 -2.6 5.4 -0.6 Q4.4 3.9 -0.4 4.1 Q-4.6 3.7 -5.4 0.6Z":"M-5.4 0.4 Q-1.2 -5.4 5.4 -2.4 Q4.4 3.9 -0.4 4.1 Q-4.6 3.7 -5.4 0.4Z";
 return `<g transform="translate(${x} ${y}) scale(${s} 1)"><clipPath id="${k}"><path d="${sh}"/></clipPath><path d="${sh}" fill="#fff"/>
 <g clip-path="url(#${k})"><ellipse cx=".8" cy="1" rx="3.3" ry="4" fill="${ir}"/><ellipse cx=".8" cy="1.8" rx="1.7" ry="2.4" fill="#0F1220"/></g>
 <circle cx="-.4" cy="${soft?.6:-.6}" r="1.2" fill="#fff"/><circle cx="2.3" cy="2.6" r=".55" fill="#fff"/>
 <path d="${soft?"M-6 .8 Q0 -3.2 6 -.8":"M-6.1 .7 Q-1.2 -6 6.2 -2.6"}" fill="none" stroke="#14182A" stroke-width="1.9" stroke-linecap="round"/>
 <path d="M-5.2 ${soft?-4.4:-6.6} Q0 ${soft?-6.6:-8.4} 5.4 ${soft?-4.8:-6.4}" fill="none" stroke="${soft?"#fff":"#14182A"}" stroke-width="${soft?2.6:1.4}" stroke-linecap="round"/></g>`;
}
function npcSVG(id,bust){
 const asset=KASSET.npc[id];
 if(asset)return `<img class="npc-premium${bust?" npc-premium-bust":""}" src="${asset}" alt="">`;
 const u="n"+(++svgN),O=OL,D=artDefs(u);
 if(id==="spider")return spiderSVG(u);
 if(id==="gull")return gullSVG(u);
 const C={
  captain:{f:"#73C27A",fs:"#4A9152",m:"#E3F4DC",ir:"#3B7BD6",j:"#22325E",js:"#16213F",p:"#2A2F3F",ps:"#1C202B",b:"#2A1F18",g:"#F4F4F4"},
  squirrel:{f:"#C9672C",fs:"#8E4519",m:"#FBE6CF",ir:"#3B9A4E",j:"#B8302A",js:"#8A1F1C",p:"#3D4A63",ps:"#2A3447",b:"#4A3020",g:"#C9672C"},
  beaver:{f:"#8A5A34",fs:"#5F3C20",m:"#D9B48A",ir:"#2E7BD6",j:"#FF8A1F",js:"#D9650A",p:"#3E5C8A",ps:"#2C4366",b:"#3A2A1E",g:"#E8C089"},
  mole:{f:"#C9AE8C",fs:"#9A8162",m:"#F3E7D6",ir:"#2E9BD6",j:"#4E6FAE",js:"#36518A",p:"#4E6FAE",ps:"#36518A",b:"#3A2A1E",g:"#C9AE8C"},
  shop:{f:"#9195A2",fs:"#62666F",m:"#ECEDF1",ir:"#E3A33A",j:"#F1E4C8",js:"#D6C49E",p:"#4A3A2E",ps:"#33281F",b:"#2A1F18",g:"#62666F"}}[id];
 const back={
  captain:`<ellipse ${O} cx="50" cy="76" rx="25" ry="27" fill="#8A5A2E"/><path d="M50 52 L60 60 L60 74 L50 82 L40 74 L40 60Z M40 60 L28 56 M60 60 L72 56 M40 74 L27 80 M60 74 L73 80 M50 82 L50 102" stroke="#5E3A1A" stroke-width="1.8" fill="none"/><path d="M62 52 Q76 62 74 84 Q70 98 58 102 Q70 88 68 72 Q66 60 62 52Z" fill="#6A4220"/>`,
  squirrel:`<path ${O} d="M60 96 Q92 98 95 66 Q97 38 76 28 Q68 26 64 33 Q83 40 83 62 Q83 81 61 87Z" fill="${C.f}"/><path d="M66 90 Q88 88 90 64 Q90 44 76 34 Q86 46 85 64 Q84 82 66 90Z" fill="#E89A5C"/><path d="M72 32 Q80 36 84 44" stroke="#fff" stroke-opacity=".4" stroke-width="2" fill="none"/>`,
  beaver:`<path ${O} d="M54 102 Q80 108 93 100 Q88 118 62 117 Q52 114 54 102Z" fill="#5A3A22"/><path d="M60 106 L88 104 M62 111 L86 110 M68 102 L66 116 M78 101 L76 116" stroke="#3E2814" stroke-width="1.2"/>`,
  mole:`<path ${O} d="M30 54 L19 47 L28 40 L16 32 L27 27 L20 16 L33 18 L31 7 L42 13 L46 2 L52 11 L58 2 L62 13 L73 7 L71 18 L84 16 L77 27 L88 32 L76 40 L85 47 L72 54Z" fill="#6A5642"/><path d="M40 14 L46 24 M52 11 L52 22 M62 13 L58 24 M73 18 L64 27 M27 27 L36 30" stroke="#8C765E" stroke-width="1.4"/>`,
  shop:`<rect ${O} x="58" y="58" width="22" height="30" rx="5" fill="#8A5A34"/><path d="M60 64 L78 64" stroke="#5E3A1A" stroke-width="2"/><rect ${O} x="62" y="50" width="14" height="9" rx="3" fill="#C8324A"/>
   <path ${O} d="M58 96 Q86 100 91 78 Q93 64 85 58 Q87 72 77 79 Q70 84 58 87Z" fill="${C.f}"/><path d="M70 86 Q76 82 79 77 M80 88 Q85 82 87 74 M88 82 Q91 76 91 68" stroke="#2B2F3A" stroke-width="4" stroke-linecap="round" fill="none"/>`}[id];
 const legs=`<path ${O} d="M40 89 L38 113 L46 113 L48.5 92Z" fill="${C.p}"/><path ${O} d="M51.5 92 L54 113 L62 113 L60 89Z" fill="${C.p}"/><path d="M56.5 92 L58.5 113 L62 113 L60 89.5Z" fill="${C.ps}"/>
  <path ${O} d="M36 110 Q35 120 38 121.5 L49 121.5 Q50 115.5 47 110Z" fill="${C.b}"/><path ${O} d="M53 110 Q52 120 55 121.5 L66 121.5 Q67 115.5 63 110Z" fill="${C.b}"/>`;
 const coat=`<path ${O} d="M34 60 Q50 55 66 60 L68 90 Q50 95 32 90Z" fill="${C.j}"/><path d="M55 57.6 Q62 58 66 60 L68 90 Q62 92.6 56 93.6Z" fill="${C.js}"/>`;
 const torso={
  captain:`${coat}<path ${O} d="M44.5 58 L50 68 L55.5 58Z" fill="#fff"/><path d="M47 60 L50 66 L53 60" stroke="#C8324A" stroke-width="2.4" fill="none"/>
   ${[66,73,80].map(y=>`<circle ${O} cx="44" cy="${y}" r="1.6" fill="url(#gd${u})"/><circle ${O} cx="56" cy="${y}" r="1.6" fill="url(#gd${u})"/>`).join("")}
   <path d="M32.5 85 Q50 90 67.5 85" stroke="#E3B23C" stroke-width="1.6" fill="none"/>`,
  squirrel:`${coat}<path d="M38 62 L38 90 M46 58 L46 93 M54 58 L54 93 M62 60 L62 91 M33 68 Q50 72 67 68 M33 78 Q50 82 67 78" stroke="#1B1B24" stroke-width="1.6" opacity=".55"/><path ${O} d="M44.5 58 L50 66 L55.5 58Z" fill="${C.m}"/>
   <path ${O} d="M32.5 85 Q50 90 67.5 85 L67.8 90 Q50 95 32.2 90Z" fill="#3A2A1E"/>`,
  beaver:`<path ${O} d="M34 60 Q50 55 66 60 L68 90 Q50 95 32 90Z" fill="#5C7FB8"/><path ${O} d="M35 60 Q42 58 45 58 L45 91 Q38 91 33 90Z M65 60 Q58 58 55 58 L55 91 Q62 91 67 90Z" fill="${C.j}"/>
   <path d="M34 72 L45 72 M55 72 L66 72 M34 78 L45 78 M55 78 L66 78" stroke="#E8EEF6" stroke-width="2.4"/><path d="M58 60 Q63 61 66 61 L67 90 Q62 91 58 91Z" fill="${C.js}" opacity=".6"/>`,
  mole:`<path ${O} d="M34 60 Q50 55 66 60 L68 90 Q50 95 32 90Z" fill="#E8DCC8"/><path ${O} d="M38 70 L62 70 L66 90 Q50 95 34 90Z" fill="${C.j}"/><path d="M40 70 L38 60 M60 70 L62 60" stroke="${C.j}" stroke-width="3.4"/>
   <circle ${O} cx="40" cy="72" r="1.4" fill="url(#gd${u})"/><circle ${O} cx="60" cy="72" r="1.4" fill="url(#gd${u})"/><rect ${O} x="45" y="76" width="10" height="7" rx="1.5" fill="${C.js}"/>`,
  shop:`<path ${O} d="M34 60 Q50 55 66 60 L68 90 Q50 95 32 90Z" fill="#2E7D5B"/><path d="M55 57.6 Q62 58 66 60 L68 90 Q62 92.6 56 93.6Z" fill="#1F5A40"/>
   <path ${O} d="M39 64 L61 64 L64 96 Q50 100 36 96Z" fill="${C.j}"/><path d="M54 64 L61 64 L64 96 Q58 98 55 98Z" fill="${C.js}"/><rect ${O} x="45" y="74" width="10" height="8" rx="2" fill="#D6C49E"/>
   <path d="M39 64 L36 58 M61 64 L64 58" stroke="${C.j}" stroke-width="2.6"/><circle ${O} cx="38" cy="90" r="4.2" fill="url(#gd${u})"/><path d="M36.4 90 L39.6 90" stroke="#8A5A12" stroke-width="1.2"/>`}[id];
 const hand={
  captain:`<rect ${O} x="69" y="70" width="16" height="5.4" rx="2" fill="url(#gd${u})" transform="rotate(-28 77 72.7)"/><circle ${O} cx="84.6" cy="67.4" r="3.4" fill="#9FE8FF"/>`,
  squirrel:`<path ${O} d="M71 84 L84 46 L87 47 L74 85Z" fill="url(#wd${u})"/><path ${O} d="M80 41 Q93 36 97 50 Q90 47 85.6 52 L82.4 49Z" fill="url(#ms${u})"/><path d="M90 40 Q95 44 96 49" stroke="#fff" stroke-width="1"/>`,
  beaver:`<path ${O} d="M72.5 80 L80 60 L83 61 L75.5 81Z" fill="url(#wd${u})"/><rect ${O} x="73" y="53" width="15" height="8" rx="2" fill="url(#ms${u})" transform="rotate(20 80.5 57)"/>`,
  mole:`<path ${O} d="M71 84 L82 50 L85 51 L74 85Z" fill="url(#wd${u})"/><path ${O} d="M70 50 Q83 40 97 50 Q84 46 83.5 51.5 Q82 46 70 50Z" fill="url(#ms${u})"/>`,
  shop:`<circle ${O} cx="78" cy="74" r="6" fill="url(#gd${u})"/><path d="M75.6 74 L80.4 74 M78 71.6 L78 76.4" stroke="#8A5A12" stroke-width="1.4"/>`}[id];
 const glove=C.g;
 const arms=`<path ${O} d="M34.5 61 Q27 65 26.5 80 L31.5 81.5 Q32.5 70 38.5 66Z" fill="${id==="beaver"||id==="mole"?C.f:id==="shop"?"#2E7D5B":C.j}"/>
  <path ${O} d="M65.5 61 Q73 65 75 76 L70.5 78.5 Q68 70 61.5 66.5Z" fill="${id==="beaver"||id==="mole"?C.f:id==="shop"?"#2E7D5B":C.j}"/>
  ${id==="captain"?`<path ${O} d="M26 60 Q33 55 40 59 L38 63 Q32 61 28 64Z" fill="url(#gd${u})"/><path ${O} d="M74 60 Q67 55 60 59 L62 63 Q68 61 72 64Z" fill="url(#gd${u})"/>`:""}
  ${hand}<circle ${O} cx="29" cy="83.5" r="4" fill="${glove}"/><circle ${O} cx="73" cy="79.5" r="4" fill="${glove}"/>`;
 const ears={
  captain:"",
  squirrel:`<path ${O} d="M36 29 L33 12 L46 23Z" fill="${C.f}"/><path ${O} d="M64 29 L67 12 L54 23Z" fill="${C.f}"/><path d="M33 12 L30 6 M33 12 L35 5 M67 12 L70 6 M67 12 L65 5" stroke="${C.fs}" stroke-width="2" stroke-linecap="round"/>`,
  beaver:`<circle ${O} cx="35.5" cy="27" r="4.6" fill="${C.f}"/><circle ${O} cx="64.5" cy="27" r="4.6" fill="${C.f}"/>`,
  mole:`<circle ${O} cx="35" cy="29" r="4" fill="${C.fs}"/><circle ${O} cx="65" cy="29" r="4" fill="${C.fs}"/>`,
  shop:`<path ${O} d="M36 29 L32 11 L47 23Z" fill="${C.f}"/><path ${O} d="M64 29 L68 11 L53 23Z" fill="${C.f}"/><path d="M37 25 L34.4 15 L43 22Z M63 25 L65.6 15 L57 22Z" fill="#2B2F3A"/>`}[id];
 const muz={
  captain:`<ellipse ${O} cx="50" cy="45" rx="10" ry="6.4" fill="${C.m}"/>`,
  beaver:`<ellipse ${O} cx="50" cy="45.6" rx="10" ry="7" fill="${C.m}"/><rect ${O} x="47.4" y="48.6" width="2.6" height="4.2" rx=".6" fill="#fff"/><rect ${O} x="50" y="48.6" width="2.6" height="4.2" rx=".6" fill="#fff"/>`,
  mole:`<path ${O} d="M41 44 Q50 56 59 44 Q56 40 50 40.4 Q44 40 41 44Z" fill="${C.m}"/>`,
  squirrel:`<ellipse ${O} cx="50" cy="45.6" rx="8.6" ry="6" fill="${C.m}"/>`,
  shop:`<path ${O} d="M40 44 Q50 55 60 44 Q57 40 50 40.4 Q43 40 40 44Z" fill="${C.m}"/>`}[id];
 const mask=id==="shop"?`<path d="M32 36 Q40 29.6 50 34.6 Q60 29.6 68 36 Q67 43 58.6 42.4 Q50 40 41.4 42.4 Q33 43 32 36Z" fill="#2B2F3A"/>`:"";
 const nose=id==="beaver"?`<path d="M47.4 42.4 Q50 41.2 52.6 42.4 Q51.6 44.4 50 44.8 Q48.4 44.4 47.4 42.4Z" fill="#1B2233"/>`:`<path d="M47.6 42.6 Q50 41.4 52.4 42.6 Q51.6 44.6 50 45 Q48.4 44.6 47.6 42.6Z" fill="#1B2233"/><path d="M47.4 47.3 Q50 49.2 52.6 47.3" stroke="#1B2233" stroke-width="1" fill="none" stroke-linecap="round"/>`;
 const soft=id==="captain";
 const top={
  captain:`<path ${O} d="M40 46.4 Q45 43 50 45.6 Q55 43 60 46.4 Q58 51 53 49 Q50 52 47 49 Q42 51 40 46.4Z" fill="#fff"/>
   <path ${O} d="M33 29 Q33 13 50 12 Q67 13 67 29Z" fill="${C.j}"/><path d="M58 13.6 Q66 17 67 29 L60 29 Q60 20 58 13.6Z" fill="${C.js}"/><path ${O} d="M33 26 Q50 22 67 26 L67 29.5 Q50 25.5 33 29.5Z" fill="#fff"/>
   <path ${O} d="M29.5 29 Q50 35 70.5 29 L70.5 32 Q50 38 29.5 32Z" fill="#14182A"/><path ${O} d="M50 15 L50 22.6 M47 17 L53 17 M46.4 21 Q50 25 53.6 21" fill="none" stroke="#E3B23C" stroke-width="1.6"/>`,
  squirrel:`<path ${O} d="M39.5 26 L44 31.5 L45.5 23.5 L50 30.5 L53 22.5 L55 30 L60.5 26 Q57 20 50 20 Q43 20 39.5 26Z" fill="${C.f}"/>`,
  beaver:`<path ${O} d="M32 30 Q32 13 50 12 Q68 13 68 30Z" fill="#FFC23D"/><path d="M59 14 Q68 18 68 30 L62 30 Q62 20 59 14Z" fill="#E0A000"/><path ${O} d="M47 12.6 L53 12.6 L53 30 L47 30Z" fill="#FFD866"/><path ${O} d="M28 29.5 L72 29.5 L72 33 L28 33Z" fill="#E0A000"/>`,
  mole:`<path ${O} d="M32 30 Q32 13 50 12 Q68 13 68 30Z" fill="#E8A13A"/><path d="M59 14 Q68 18 68 30 L62 30 Q62 20 59 14Z" fill="#C27F1E"/><path ${O} d="M29 29.5 L71 29.5 L71 33 L29 33Z" fill="#C27F1E"/>
   <path d="M50 18 L18 6 L18 30Z" fill="#FFF2A8" opacity=".35"/><circle ${O} cx="50" cy="19.6" r="5" fill="url(#gl${u})"/>`,
  shop:`<circle cx="56.8" cy="37.4" r="6.6" fill="none" stroke="url(#gd${u})" stroke-width="1.8"/><path d="M62.6 40 Q66 50 64 58" stroke="#C9A15A" stroke-width=".9" fill="none"/>`}[id];
 const head=`<path d="M45 51 L55 51 L55 58 L45 58Z" fill="${C.fs}"/>${ears}
  <ellipse ${O} cx="50" cy="38" rx="17.5" ry="16.5" fill="${C.f}"/>
  <path d="M58.5 23.5 Q68.5 30 67.6 40 Q66 50.5 55.5 54.3 Q63.4 46 63.2 38 Q63 30 58.5 23.5Z" fill="${C.fs}" opacity=".7"/>
  <path d="M37.6 29 Q41.6 23.4 48 22.2" stroke="#fff" stroke-opacity=".45" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${mask}${muz}${nose}${npcEye(43.2,37.4,C.ir,1,soft)}${npcEye(56.8,37.4,C.ir,-1,soft)}${top}`;
 return `<svg viewBox="${bust?"14 -4 72 72":"0 -14 100 144"}" aria-hidden="true">${D}${back}<ellipse cx="50" cy="122.5" rx="22" ry="4" fill="rgba(0,0,0,.22)"/>${legs}${torso}${arms}${head}</svg>`;
}
function spiderSVG(u){
 const O=OL,leg=(s)=>[[-1,30],[0,44],[1,58],[2,70]].map(([i,y])=>`<path ${O} d="M${50+s*14} ${y+4} Q${50+s*34} ${y-14+i*3} ${50+s*44} ${y+8+i*4}" fill="none" stroke-width="4.4"/><path d="M${50+s*14} ${y+4} Q${50+s*34} ${y-14+i*3} ${50+s*44} ${y+8+i*4}" fill="none" stroke="#5A3FA8" stroke-width="2.4" stroke-linecap="round"/>`).join("");
 return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0 L50 26" stroke="#fff" stroke-width="1.2" opacity=".9"/>${leg(-1)}${leg(1)}
 <ellipse cx="50" cy="94" rx="22" ry="4" fill="rgba(0,0,0,.2)"/>
 <ellipse ${O} cx="50" cy="66" rx="20" ry="18" fill="#6B4BC8"/><path d="M60 52 Q70 60 68 72 Q64 82 54 84 Q64 74 64 66 Q64 58 60 52Z" fill="#4E33A0"/><path d="M43 60 L50 70 L57 60 M45 74 L55 74" stroke="#FFC83D" stroke-width="2.4" fill="none" stroke-linecap="round"/>
 <circle ${O} cx="50" cy="40" r="15" fill="#7C5CDA"/><path d="M42 30 Q46 27 52 27" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/>
 ${npcEye(44,40,"#FF5C7A",1,false)}${npcEye(56,40,"#FF5C7A",-1,false)}<circle cx="44" cy="30.6" r="1.6" fill="#14182A"/><circle cx="50" cy="29" r="1.6" fill="#14182A"/><circle cx="56" cy="30.6" r="1.6" fill="#14182A"/>
 <path ${O} d="M46.6 48 L47.8 52 L49 48 M51 48 L52.2 52 L53.4 48" fill="#fff"/></svg>`;
}
function gullSVG(u){
 const O=OL;
 return `<svg viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="94" rx="22" ry="4" fill="rgba(0,0,0,.2)"/>
 <path ${O} d="M40 84 L36 93 L44 93Z M58 84 L56 93 L64 93Z" fill="#F2A33A"/>
 <path ${O} d="M66 62 L90 70 L70 74Z" fill="#B8C2D0"/>
 <ellipse ${O} cx="50" cy="66" rx="22" ry="20" fill="#FFFFFF"/><path d="M60 50 Q72 58 70 72 Q66 84 54 86 Q64 76 64 66 Q64 56 60 50Z" fill="#DDE3EC"/>
 <path ${O} d="M30 58 Q24 76 40 82 Q46 72 44 60Z" fill="#9AA6B8"/><path d="M33 66 L42 64 M34 72 L43 70" stroke="#6E7A8E" stroke-width="1.4"/>
 <path ${O} d="M36 50 Q50 58 64 50 L60 58 Q50 63 40 58Z" fill="#3D63D9"/><path ${O} d="M48 57 L44 68 L52 62 L56 70 L54 57Z" fill="#3D63D9"/>
 <circle ${O} cx="50" cy="34" r="16" fill="#FFFFFF"/><path d="M60 22 Q68 30 64 42 Q60 48 54 50 Q62 40 62 34 Q62 26 60 22Z" fill="#DDE3EC"/>
 <path ${O} d="M56 36 L76 39 L58 42Z" fill="#F7B32B"/><path ${O} d="M57 42 L72 42.6 L58 46Z" fill="#E08A12"/><circle cx="70" cy="40.6" r="1.6" fill="#C8324A"/>
 ${npcEye(46,32,"#3B7BD6",1,false)}<path d="M38 22 Q42 18 48 18" stroke="#9AA6B8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
}
function chestSVG(){
 const u="c"+(++svgN),O=OL;
 return `<svg viewBox="0 0 100 100" aria-hidden="true">${artDefs(u)}<ellipse cx="50" cy="88" rx="32" ry="5" fill="rgba(0,0,0,.22)"/>
 <path ${O} d="M18 50 L82 50 L80 86 L20 86Z" fill="url(#wd${u})"/><path d="M62 50 L82 50 L80 86 L64 86Z" fill="#5E3A1A" opacity=".5"/>
 <path ${O} d="M16 50 Q16 28 50 26 Q84 28 84 50Z" fill="url(#wd${u})"/><path d="M60 27 Q84 30 84 50 L68 50 Q68 34 60 27Z" fill="#5E3A1A" opacity=".45"/>
 <path ${O} d="M26 30 L28 86 M74 30 L72 86" stroke="url(#gd${u})" stroke-width="6" fill="none"/><path ${O} d="M16 48 L84 48 L84 54 L16 54Z" fill="url(#gd${u})"/>
 <rect ${O} x="43" y="46" width="14" height="16" rx="3" fill="url(#gd${u})"/><circle cx="50" cy="53" r="2.2" fill="#3A2A1E"/><path d="M50 54 L50 58" stroke="#3A2A1E" stroke-width="2"/>
 <path d="M24 36 Q30 30 38 29" stroke="#fff" stroke-opacity=".45" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
}
function webSVG(){
 const r=[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return `<path d="M50 50 L${(50+46*Math.cos(a)).toFixed(1)} ${(50+46*Math.sin(a)).toFixed(1)}"/>`}).join("");
 const ring=k=>"M"+[0,1,2,3,4,5,6,7,8].map(i=>{const a=i*Math.PI/4,rr=k*(i%2?.92:1);return `${(50+rr*Math.cos(a)).toFixed(1)} ${(50+rr*Math.sin(a)).toFixed(1)}`}).join(" L");
 return `<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#fff" stroke-width="1.6" fill="none" opacity=".92">${r}${[12,22,32,42].map(k=>`<path d="${ring(k)}"/>`).join("")}</g></svg>`;
}
function fishSpotSVG(){
 const u="f"+(++svgN),O=OL;
 return `<svg viewBox="0 -14 100 144" aria-hidden="true">${artDefs(u)}<ellipse cx="50" cy="122" rx="30" ry="4" fill="rgba(0,0,0,.22)"/>
 <path d="M70 18 Q92 40 90 92" stroke="#fff" stroke-width="1" fill="none" opacity=".9"/><circle ${O} cx="90" cy="94" r="4" fill="#E8573A"/><path d="M86 94 L94 94" stroke="#fff" stroke-width="1.4"/>
 <path ${O} d="M30 120 L66 16 L69.4 17.2 L34 121Z" fill="#3A3F55"/><circle ${O} cx="39" cy="96" r="5" fill="url(#ms${u})"/>
 <path ${O} d="M14 92 L52 92 L48 122 L18 122Z" fill="#3D7FC0"/><path d="M14 92 L52 92" stroke="#ECF3FB" stroke-width="3"/><path d="M38 92 L52 92 L48 122 L40 122Z" fill="#2B5F96"/>
 <path ${O} d="M10 40 L54 40 L54 66 L10 66Z" fill="url(#wd${u})"/><path ${O} d="M30 66 L34 66 L34 92 L30 92Z" fill="#7A4E2C"/>
 <path ${O} d="M18 53 Q26 45 36 53 Q26 61 18 53Z M36 53 L44 47 L44 59Z" fill="#7FD3EE"/><circle cx="23" cy="52" r="1.2" fill="#14182A"/></svg>`;
}
function boothSVG(){
 const u="b"+(++svgN),O=OL,st=[0,1,2,3,4].map(i=>`<path d="M${12+i*16} 46 L${20+i*16} 46 L${28+i*16} 46" />`).join("");
 return `<svg viewBox="0 -14 100 144" aria-hidden="true">${artDefs(u)}<ellipse cx="50" cy="122" rx="38" ry="4" fill="rgba(0,0,0,.22)"/>
 <path ${O} d="M50 -10 L50 14" stroke-width="2"/><path ${O} d="M50 -10 L66 -4 L50 2Z" fill="#FFC23D"/>
 <path ${O} d="M50 12 L90 46 L10 46Z" fill="#E8573A"/><path d="M50 12 L60 46 L40 46Z M50 12 L84 46 L74 46Z M50 12 L26 46 L16 46Z" fill="#fff"/><path d="M50 12 L90 46 L70 46Z" fill="#000" opacity=".12"/>
 <path ${O} d="M10 46 Q18 54 26 46 Q34 54 42 46 Q50 54 58 46 Q66 54 74 46 Q82 54 90 46" fill="#FFC23D"/>
 <path ${O} d="M16 50 L20 50 L20 116 L16 116Z M80 50 L84 50 L84 116 L80 116Z" fill="url(#wd${u})"/>
 <rect ${O} x="22" y="62" width="56" height="34" rx="4" fill="#2F3E63"/><circle ${O} cx="50" cy="79" r="12" fill="#fff"/><circle ${O} cx="50" cy="79" r="8" fill="#E8573A"/><circle ${O} cx="50" cy="79" r="3.6" fill="#fff"/>
 <path ${O} d="M14 96 L86 96 L86 116 L14 116Z" fill="url(#wd${u})"/><path d="M14 102 L86 102" stroke="#5E3A1A" stroke-width="1.4"/></svg>`;
}
const portrait=id=>id==="captain"?mentorArt():id&&id.startsWith("v_")?vilArt(id.slice(2)):npcSVG(id,1);

function partnerSVG(ty,st){
 const P=PT[ty],u="p"+(++svgN),S=SK;
 const sh=`<defs><radialGradient id="${u}" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></radialGradient></defs>`;
 const gl=`fill="url(#${u})"`;
 if(st===1){
  const tuft={fire:`<path ${S} d="M50 18 Q40 30 45 41 L55 41 Q61 31 56 26 Q55 32 52 33 Q54 25 50 18Z" fill="${P.a}"/>`,
   water:`<path ${S} d="M50 18 Q41 31 45 38 Q50 43 55 38 Q59 31 50 18Z" fill="${P.a}"/>`,
   leaf:`<path ${S} d="M50 42 L50 28" fill="none"/><path ${S} d="M50 30 Q38 18 32 26 Q40 34 50 30Z" fill="${P.a}"/><path ${S} d="M50 28 Q60 14 68 22 Q60 32 50 28Z" fill="${P.a}"/>`}[ty];
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${sh}${tuft}
  <ellipse ${S} cx="40" cy="87" rx="8" ry="4.5" fill="${P.d}"/><ellipse ${S} cx="60" cy="87" rx="8" ry="4.5" fill="${P.d}"/>
  <ellipse ${S} cx="50" cy="63" rx="27" ry="25" fill="${P.b}"/><ellipse cx="50" cy="63" rx="27" ry="25" ${gl}/>
  <ellipse cx="50" cy="72" rx="15" ry="11" fill="${P.bl}"/>${eyes(41,59,57,0,P.d)}
  <path ${S} d="M45 68 Q50 72 55 68" fill="none"/><circle cx="34" cy="66" r="3.5" fill="#FF8FA3" opacity=".6"/><circle cx="66" cy="66" r="3.5" fill="#FF8FA3" opacity=".6"/></svg>`;
 }
 if(st===2){
  const tail={fire:`<path ${S} d="M66 76 Q86 74 88 54 Q84 60 80 58 Q86 48 80 38 Q78 50 70 56 Q74 64 64 68Z" fill="${P.a}"/><path d="M80 44 Q82 52 76 58" stroke="${P.b}" stroke-width="3" fill="none"/>`,
   water:`<path ${S} d="M66 78 Q88 80 90 62 Q90 52 82 54 Q86 62 78 66 Q72 68 66 70Z" fill="${P.b}"/><path ${S} d="M84 54 L94 44 L92 58Z" fill="${P.a}"/>`,
   leaf:`<path ${S} d="M66 78 Q88 82 86 60" fill="none"/><path ${S} d="M86 60 Q78 46 90 40 Q96 52 86 60Z" fill="${P.a}"/>`}[ty];
  const ears={fire:`<path ${S} d="M34 34 L30 12 L46 26Z" fill="${P.b}"/><path ${S} d="M66 34 L70 12 L54 26Z" fill="${P.b}"/><path d="M34 28 L33 18 L41 25Z M66 28 L67 18 L59 25Z" fill="${P.a}"/>`,
   water:`<path ${S} d="M31 42 L12 34 L20 50Z" fill="${P.a}"/><path ${S} d="M69 42 L88 34 L80 50Z" fill="${P.a}"/><path ${S} d="M44 26 Q50 8 58 24Z" fill="${P.a}"/>`,
   leaf:`<path ${S} d="M36 32 Q20 14 30 6 Q42 18 42 28Z" fill="${P.a}"/><path ${S} d="M64 32 Q80 14 70 6 Q58 18 58 28Z" fill="${P.a}"/><path d="M33 12 L39 26 M67 12 L61 26" stroke="${P.d}" stroke-width="1.6"/>`}[ty];
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${sh}${tail}${ears}
  <ellipse ${S} cx="40" cy="90" rx="8" ry="4.5" fill="${P.d}"/><ellipse ${S} cx="60" cy="90" rx="8" ry="4.5" fill="${P.d}"/>
  <ellipse ${S} cx="50" cy="74" rx="20" ry="17" fill="${P.b}"/><ellipse cx="50" cy="74" rx="20" ry="17" ${gl}/><ellipse cx="50" cy="78" rx="11" ry="10" fill="${P.bl}"/>
  <ellipse ${S} cx="30" cy="74" rx="5" ry="8" fill="${P.b}" transform="rotate(25 30 74)"/><ellipse ${S} cx="70" cy="74" rx="5" ry="8" fill="${P.b}" transform="rotate(-25 70 74)"/>
  <circle ${S} cx="50" cy="45" r="21" fill="${P.b}"/><circle cx="50" cy="45" r="21" ${gl}/>
  <ellipse cx="50" cy="52" rx="11" ry="7" fill="${P.bl}"/>${eyes(42,58,43,0,P.d)}<path ${S} d="M46 53 Q50 56 54 53" fill="none"/>
  <circle cx="35" cy="50" r="3" fill="#FF8FA3" opacity=".55"/><circle cx="65" cy="50" r="3" fill="#FF8FA3" opacity=".55"/></svg>`;
 }
 const crest={fire:`<path ${S} d="M50 4 L57 16 L70 8 L68 22 L84 20 L76 32 L90 38 L76 44 L86 56 L70 54 L50 60 L30 54 L14 56 L24 44 L10 38 L24 32 L16 20 L32 22 L30 8 L43 16Z" fill="${P.a}"/><path d="M50 12 L55 22 L64 16 L62 26 L74 26 L66 34 L76 40 L64 44 M50 12 L45 22 L36 16 L38 26 L26 26 L34 34 L24 40 L36 44" stroke="${P.b}" stroke-width="3" fill="none"/>`,
  water:`<path ${S} d="M40 24 Q42 0 52 2 Q48 12 54 22Z" fill="${P.a}"/><path ${S} d="M52 24 Q62 2 70 8 Q60 14 62 26Z" fill="${P.a}"/><path ${S} d="M30 42 L4 26 L10 42 L2 54 L28 54Z" fill="${P.a}"/><path ${S} d="M70 42 L96 26 L90 42 L98 54 L72 54Z" fill="${P.a}"/><path d="M28 46 L10 36 M72 46 L90 36" stroke="#fff" stroke-width="2" opacity=".7"/>`,
  leaf:`<path ${S} d="M40 26 L30 10 L20 12 M30 10 L32 1 M38 22 L28 18" fill="none"/><path ${S} d="M60 26 L70 10 L80 12 M70 10 L68 1 M62 22 L72 18" fill="none"/><ellipse ${S} cx="19" cy="11" rx="5.5" ry="3.2" fill="${P.a}"/><ellipse ${S} cx="32" cy="1" rx="3.2" ry="5.5" fill="${P.a}"/><ellipse ${S} cx="81" cy="11" rx="5.5" ry="3.2" fill="${P.a}"/><ellipse ${S} cx="68" cy="1" rx="3.2" ry="5.5" fill="${P.a}"/><path ${S} d="M28 54 Q12 64 20 82 Q30 72 36 62Z M72 54 Q88 64 80 82 Q70 72 64 62Z" fill="${P.a}"/>`}[ty];
 const tail={fire:`<path ${S} d="M68 82 Q96 82 96 56 Q90 62 86 58 Q94 44 86 30 Q84 46 74 54 Q80 66 64 72Z" fill="${P.a}"/><path d="M88 40 Q88 54 78 62" stroke="${P.b}" stroke-width="3" fill="none"/>`,
  water:`<path ${S} d="M66 84 Q96 92 96 66 L90 70 Q90 78 68 74Z" fill="${P.b}"/><path ${S} d="M94 66 L100 52 L88 60Z" fill="${P.a}"/>`,
  leaf:`<path ${S} d="M66 84 Q94 90 92 64" fill="none"/><circle ${S} cx="92" cy="60" r="6.5" fill="#FF8FB8"/><circle cx="92" cy="60" r="2.6" fill="#FFE08A"/>`}[ty];
 return `<svg viewBox="0 0 100 100" aria-hidden="true">${sh}${tail}${ty==="fire"?crest:""}
  <rect ${S} x="35" y="80" width="11" height="14" rx="4" fill="${P.d}"/><rect ${S} x="54" y="80" width="11" height="14" rx="4" fill="${P.d}"/>
  <path ${S} d="M28 68 Q28 52 50 52 Q72 52 72 68 L70 84 Q50 92 30 84Z" fill="${P.b}"/><path d="M28 68 Q28 52 50 52 Q72 52 72 68 L70 84 Q50 92 30 84Z" ${gl}/>
  <path ${S} d="M40 60 L60 60 L57 78 L50 83 L43 78Z" fill="${P.bl}"/><circle ${S} cx="50" cy="69" r="5" fill="${P.a}"/><circle cx="48.5" cy="67.5" r="1.6" fill="#fff"/>
  <path ${S} d="M30 60 Q16 66 20 80 L27 78 Q27 70 34 66Z" fill="${P.b}"/><path ${S} d="M70 60 Q84 66 80 80 L73 78 Q73 70 66 66Z" fill="${P.b}"/>
  ${ty!=="fire"?crest:""}
  <circle ${S} cx="50" cy="38" r="18" fill="${P.b}"/><circle cx="50" cy="38" r="18" ${gl}/>
  <ellipse cx="50" cy="45" rx="10" ry="6" fill="${P.bl}"/>${eyes(43,57,36,1,P.d)}
  <path ${S} d="M50 22 L53 26 L50 30 L47 26Z" fill="${P.a}"/>
  <path ${S} d="M44 47 Q50 51 56 47" fill="none"/><path d="M53 48.5 L54.5 52 L56 48" fill="#fff" stroke="#22304A" stroke-width="1"/></svg>`;
}
function monSVG(lv,j,big){
 const C={1:{b:"#8F6EF2",d:"#4E2FB8"},2:{b:"#1FA9A1",d:"#0E6B66"},3:{b:"#C8324A",d:"#7E1530"}}[lv],S=SK,u="m"+(++svgN);
 const horns={1:`<path ${S} d="M50 10 L43 28 L57 28Z" fill="#FFE08A"/>`,2:`<path ${S} d="M34 26 L30 6 L46 22Z M66 26 L70 6 L54 22Z" fill="#FFE08A"/>`,3:`<path ${S} d="M30 28 L20 4 L42 20Z M70 28 L80 4 L58 20Z M50 20 L45 2 L55 2Z" fill="#FFD23F"/>`}[lv];
 return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="${u}" cx="35%" cy="25%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".4"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></radialGradient></defs>${horns}
 <path ${S} d="M18 60 Q4 56 8 44" fill="none"/><path ${S} d="M82 60 Q96 56 92 44" fill="none"/>
 <path ${S} d="M20 90 Q12 50 30 30 Q50 14 70 30 Q88 50 80 90 L70 83 L60 92 L50 83 L40 92 L30 83Z" fill="${C.b}"/>
 <path d="M20 90 Q12 50 30 30 Q50 14 70 30 Q88 50 80 90 L70 83 L60 92 L50 83 L40 92 L30 83Z" fill="url(#${u})"/>
 ${eyes(40,60,42,1,"#FFC83D",1)}
 <path ${S} d="M36 52 Q50 62 64 52 L60 56 L56 52 L52 57 L48 52 L44 57 L40 52Z" fill="#fff"/>
 ${big?`<rect ${S} x="28" y="58" width="44" height="32" rx="8" fill="#fff"/><text x="50" y="84" text-anchor="middle" font-family="Jua,sans-serif" font-size="30" fill="${C.d}">${j}</text>`:`<rect ${S} x="35" y="62" width="30" height="22" rx="6" fill="#fff"/><text x="50" y="80" text-anchor="middle" font-family="Jua,sans-serif" font-size="19" fill="${C.d}">${j}</text>`}</svg>`;
}
const hasPart=id=>(G.st||0)>PART_STAGE[id];
function shipSVG(){
 const S='stroke="#22304A" stroke-width="2.5" stroke-linejoin="round"',M='fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"';
 return `<svg viewBox="0 0 120 110" width="100%" height="100%" aria-hidden="true" style="overflow:visible">
 ${hasPart("rope")?`<rect ${S} x="57" y="8" width="6" height="66" fill="#6B4423"/><path d="M60 10 L12 72 M60 10 L108 72" stroke="#EADBB8" stroke-width="2"/>`:`<rect ${M} x="57" y="8" width="6" height="66"/>`}
 ${hasPart("sail")?`<path ${S} d="M64 14 L104 62 L64 62Z" fill="#fff"/><path ${S} d="M56 20 L22 62 L56 62Z" fill="#F1F5FA"/><path d="M66 36 L86 60" stroke="#E8573A" stroke-width="4"/>`:`<path ${M} d="M64 14 L104 62 L64 62Z"/>`}
 ${hasPart("hull")?`<path ${S} d="M4 70 L116 70 L100 102 L20 102Z" fill="#9A6234"/><path d="M10 80 L110 80" stroke="#73451F" stroke-width="3"/>`:`<path ${M} d="M4 70 L116 70 L100 102 L20 102Z"/>`}
 ${hasPart("nails")?[24,40,56,72,88].map(x=>`<circle cx="${x+4}" cy="91" r="3.2" fill="#E59447" stroke="#22304A" stroke-width="1.2"/>`).join(""):""}
 ${G.q>=7?`<path d="M60 8 L60 -6 L76 -1 L60 4" fill="#FFC23D" stroke="#22304A" stroke-width="1.5"/>`:""}</svg>`;
}

/* world */
let MONS=SPAWNS.map((s,i)=>({i,lv:s.lv,x:s.x,y:s.y,sx:s.x,sy:s.y,alive:true,back:0,j:CONS[i%5].j}));
const npcPos=id=>id==="spider"&&G.q>3?{x:13,y:4}:NPCS[id];
const npcAt=(x,y)=>Object.keys(NPCS).find(id=>{const p=npcPos(id);return p.x===x&&p.y===y});
const chestAt=(x,y)=>CHESTS.findIndex((c,i)=>c.x===x&&c.y===y&&!G.chests.includes(i));
const monAt=(x,y)=>MONS.find(m=>m.alive&&m.x===x&&m.y===y);
const ground=(x,y)=>{if(x<0||y<0||x>=W||y>=H)return false;const ch=MAP[y][x];return ".,sD".includes(ch)||(ch==="B"&&G.q>2)||(ch==="W"&&G.q>3)};
const stationAt=(x,y)=>Object.keys(STATIONS).find(k=>STATIONS[k].x===x&&STATIONS[k].y===y);
const walkable=(x,y)=>ground(x,y)&&!npcAt(x,y)&&chestAt(x,y)<0&&!monAt(x,y)&&!stationAt(x,y);
const hash=(x,y)=>((x*73856093)^(y*19349663))>>>0;
function tileClass(x,y){
 const ch=MAP[y][x],a=(x+y)%2?" a":"";
 if(ch==="~")return "w"+a; if(ch==="s")return "s"+a; if(ch==="T")return "T"; if(ch==="R")return "R"; if(ch==="D")return "D";
 if(ch===",")return "tg"+a; if(ch==="B")return "B"+(G.q>2?" fix":""); if(ch==="W")return "Wt";
 return "g"+a+(hash(x,y)%7===0?" f":"");
}
function renderTiles(){let h="";for(let y=0;y<H;y++)for(let x=0;x<W;x++)h+=`<div class="t ${tileClass(x,y)}"></div>`;$("tiles").innerHTML=h}
const pos=(x,y)=>`left:${x*6.25}%;top:${y*100/H}%`;
let plEl,ptEl;
function renderEnts(){
 const Q=QUESTS[G.q];let h=`<div class="ent ship" id="ship">${shipSVG()}</div>`;
 if(G.q<=3)h+=`<div class="ent" style="${pos(12,3)}"><div class="sp websp">${webSVG()}</div></div>`;
 for(const id in NPCS){const p=npcPos(id),active=Q&&Q.npc===id;h+=`<div class="ent npc${id==="spider"||id==="gull"?" sq":""}" style="${pos(p.x,p.y)}"><div class="sp">${npcSVG(id)}</div>${active?'<span class="mark">!</span>':""}</div>`}
 CHESTS.forEach((c,i)=>{if(!G.chests.includes(i))h+=`<div class="ent chest" style="${pos(c.x,c.y)}"><div class="sp">${chestSVG()}</div></div>`});
 for(const k in STATIONS){const s=STATIONS[k];h+=`<div class="ent npc station" style="${pos(s.x,s.y)}"><div class="sp">${k==="shop"?npcSVG("shop"):k==="fish"?fishSpotSVG():k==="run"?portalSVG():boothSVG()}</div><span class="tag">${L(s.n)}</span></div>`}
 h+=`<div class="ent zone" style="${pos(1,5)}"><span class="tag">${t().wild}</span></div><div class="ent zone" style="${pos(9,5)}"><span class="tag">${t().wild}</span></div>`;
 MONS.forEach(m=>{if(m.alive)h+=`<div class="ent mon${m.sleep?" sleep":""}" id="mon${m.i}" style="${pos(m.x,m.y)}"><div class="sp">${monSVG(m.lv,m.j)}</div></div>`});
 h+=`<div class="ent pt" id="pt" style="${pos(G.fx,G.fy)}"><div class="sp"><div class="flip"><div class="bob">${partnerSVG(G.ptype,stage())}</div></div></div></div>`;
 h+=`<div class="ent pl${G.eq?" aura":""}" id="pl" style="${pos(G.px,G.py)}${G.eq?`;--aura:${EQUIP[G.eq].aura}`:""}"><div class="sp"><div class="flip"><div class="bob">${heroArt(G.char)}</div></div></div></div>`;
 $("ents").innerHTML=h;plEl=$("pl");ptEl=$("pt");
}
function renderHUD(){
 const c=CHARS.find(x=>x.id===G.char),st=stage();
 $("hAva").innerHTML=heroArt(G.char,1);$("hName").textContent=L(c.n);$("hStars").textContent=t().hlv(G.lv,G.coins);$("hExp").style.width=(G.lv>=MAXLV?100:G.exp/needEXP(G.lv)*100)+"%";
 const cs=Math.min(G.st||0,STAGES.length-1);$("hObjL").textContent=t().quest;$("hObj").textContent=(G.st||0)>=STAGES.length?t().clear:`${K("Stage","스테이지")} ${cs+1} · ${L(STAGES[cs].place)} — ${L(STAGES[cs].goal)}`;
 $("hParts").innerHTML=PARTS.map(p=>`<div class="pslot ${hasPart(p.id)?"got":""}" title="${L(p.n)}">${p.e}</div>`).join("");
 $("menuBtn").textContent=t().menu;$("tip").textContent=t().tip;
 if(G.view!=="island"&&typeof BOOKS!=="undefined"){const nb=BOOKS.find(b=>b.ready&&!bookDone(b.id));$("hObj").textContent=nb?K(`Fix the broken book: ${nb.te}`,`망가진 책 고치기: 〈${nb.t}〉`):K("Make your own endings for the restored books","되찾은 책에 내 결말 만들기");$("hParts").style.display="none";$("tip").textContent=nb?K("Tap the broken book on the desk to jump into the story.","책상 위의 망가진 책을 눌러 이야기 속으로 들어가요."):K("Tap a fixed book to read it again or write a new ending. The Case Squad has new cases too!","고친 책을 눌러 다시 읽거나 새 결말을 만들어요. 사건 수사대에도 새 사건이 있어요!")}else $("hParts").style.display="";
 $("lEn").setAttribute("aria-pressed",G.lang==="en");$("lKo").setAttribute("aria-pressed",G.lang==="ko");
 document.documentElement.lang=G.lang;
}
function renderAll(){renderTiles();renderEnts();renderHUD();renderStages();renderExtras()}

/* monsters wander + respawn */
setInterval(()=>{
 if(moving||$("map").hidden)return;let respawned=false;
 MONS.forEach(m=>{
  if(!m.alive){if(Date.now()>m.back&&walkable(m.sx,m.sy)&&!(G.px===m.sx&&G.py===m.sy)&&!(G.fx===m.sx&&G.fy===m.sy)){m.alive=true;m.x=m.sx;m.y=m.sy;respawned=true}return}
  if(overlayOpen())return;
  if(Math.random()<(G.char==="snake"?.15:.07)){m.sleep=!m.sleep;const el=$("mon"+m.i);if(el)el.classList.toggle("sleep",m.sleep)}
  if(m.sleep||Math.random()<.45)return;
  const d=shuffle([[1,0],[-1,0],[0,1],[0,-1]]).find(([dx,dy])=>{const nx=m.x+dx,ny=m.y+dy;return ground(nx,ny)&&MAP[ny][nx]===","&&walkable(nx,ny)&&!(nx===G.px&&ny===G.py)&&!(nx===G.fx&&ny===G.fy)});
  if(d){m.x+=d[0];m.y+=d[1];const el=$("mon"+m.i);if(el){el.style.left=m.x*6.25+"%";el.style.top=m.y*100/H+"%"}}
 });
 if(respawned&&!overlayOpen())renderEnts();
},1500);

/* movement */
let moving=false;
function bfs(sx,sy,goal){
 const prev=new Map(),key=(x,y)=>x+","+y,q=[[sx,sy]];prev.set(key(sx,sy),null);
 while(q.length){const [x,y]=q.shift();if(goal(x,y)){const path=[];let k=key(x,y);while(prev.get(k)!==null){const [a,b]=k.split(",").map(Number);path.unshift([a,b]);k=prev.get(k)}return path}
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(!prev.has(k)&&walkable(nx,ny)){prev.set(k,key(x,y));q.push([nx,ny])}}}
 return null;
}
function face(el,nx,ox){if(nx<ox)el.classList.add("left");else if(nx>ox)el.classList.remove("left")}
function walk(path,done){
 if(!path||!path.length){done&&done();return}
 moving=true;plEl.classList.add("walk");ptEl.classList.add("walk");let i=0;
 const end=ok=>setTimeout(()=>{moving=false;plEl.classList.remove("walk");ptEl.classList.remove("walk");save();ok&&done&&done()},170);
 const step=()=>{const [x,y]=path[i];
  if(!walkable(x,y)){end(false);return}
  face(ptEl,G.px,G.fx);G.fx=G.px;G.fy=G.py;ptEl.style.left=G.fx*6.25+"%";ptEl.style.top=G.fy*100/H+"%";
  face(plEl,x,G.px);G.px=x;G.py=y;plEl.style.left=x*6.25+"%";plEl.style.top=y*100/H+"%";i++;
  if(i<path.length)setTimeout(step,G.char==="horse"?120:170);else end(true)};
 step();
}
function interactAt(x,y){
 const m=monAt(x,y);if(m)return()=>battle(m);
 const n=npcAt(x,y);if(n)return()=>talk(n);
 const c=chestAt(x,y);if(c>=0)return()=>openChest(c);
 const st=stationAt(x,y);if(st)return()=>station(st);
 if(MAP[y][x]==="B"&&G.q<=2)return()=>talk("beaver");
 if(MAP[y][x]==="W"&&G.q<=3)return()=>talk("spider");
 return null;
}
function goTo(x,y){
 if(moving||overlayOpen())return;
 const act=interactAt(x,y);
 if(act){
  const adj=(a,b)=>Math.abs(a-x)+Math.abs(b-y)===1;
  if(adj(G.px,G.py)){act();return}
  const p=bfs(G.px,G.py,adj);
  if(p){ping(x,y);walk(p,()=>{const again=interactAt(x,y);if(again&&adj(G.px,G.py))again()})}else toast(t().cantGo);
  return;
 }
 if(!walkable(x,y))return;
 const p=bfs(G.px,G.py,(a,b)=>a===x&&b===y);if(p){ping(x,y);walk(p)}
}
function ping(x,y){const d=document.createElement("div");d.className="dest";d.style.cssText=pos(x,y);d.innerHTML="<i></i>";$("ents").appendChild(d);setTimeout(()=>d.remove(),650)}
$("map").addEventListener("click",e=>{const r=$("map").getBoundingClientRect();goTo(Math.floor((e.clientX-r.left)/r.width*W),Math.floor((e.clientY-r.top)/r.height*H))});
document.addEventListener("keydown",e=>{
 const d={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(!d||moving||overlayOpen()||$("map").hidden)return;e.preventDefault();
 const nx=G.px+d[0],ny=G.py+d[1];if(nx<0||ny<0||nx>=W||ny>=H)return;const act=interactAt(nx,ny);if(act){act();return}
 if(walkable(nx,ny))walk([[nx,ny]]);
});
const overlayOpen=()=>["libOv","stOv","dlgOv","chalOv","batOv","parOv","evoOv","titleOv","clearOv","heroOv","shopOv","lvOv","runOv","setOv","splashOv","duelOv","caseOv","bookOv","pgOv","tdOv","rmOv","gateOv"].some(id=>!$(id).hidden);

/* progress */
function rec(s,ok){const r=G.m[s]||(G.m[s]={r:0,w:0});ok?r.r++:r.w++}
const mastery=s=>{const r=G.m[s];if(!r)return 0;const n=r.r+r.w,acc=r.r/n;return r.r>=3&&acc>=.75?3:acc>=.5?2:1};
function pickSyl(){const ws=POOL.map(s=>{const r=G.m[s]||{r:0,w:0};return 1+r.w*2+(r.r<3?2:0)});let x=Math.random()*ws.reduce((a,b)=>a+b,0);for(let i=0;i<POOL.length;i++){x-=ws[i];if(x<=0)return POOL[i]}return POOL[0]}
function distract(s,n){const d=decomp(s);const near=shuffle(POOL.filter(p=>p!==s&&(decomp(p).c===d.c||decomp(p).v===d.v)));return near.slice(0,n)}
const later=[];
function queue(fn){later.push(fn);pump()}
function pump(){if(!later.length)return;if(overlayOpen()||moving){setTimeout(pump,350);return}later.shift()();if(later.length)setTimeout(pump,350)}
function gainXP(n,quiet){
 G.xp=(G.xp||0)+n;save();return false
}
const maxHearts=()=>3+(G.lv>=3?1:0)+(G.lv>=6?1:0)+(G.char==="ox"?1:0);
const coinMul=()=>1+(G.eq==="badge"||G.eq==="crown"?.25:0)+(G.char==="pig"?.25:0);
const expMul=()=>1+(G.eq==="cape"||G.eq==="crown"?.25:0)+(G.char==="dog"?.25:0);
function reward(c,e,p){
 c=Math.round(c*coinMul());e=Math.round(e*expMul());G.coins+=c;G.exp+=e;
 const ups=[];while(G.lv<MAXLV&&G.exp>=needEXP(G.lv)){G.exp-=needEXP(G.lv);G.lv++;ups.push(G.lv)}
 if(G.lv>=MAXLV)G.exp=0;
 ups.forEach(l=>{applyLv(l);queue(()=>showLv(l))});
 save();renderHUD();toast(t().rew(c,e,p));sfx("star");
 if(p)gainXP(p,true);
}
function applyLv(l){const R=LVREW[l];if(R.items)for(const k in R.items)G.inv[k]+=R.items[k];if(R.coins)G.coins+=R.coins;if(R.eq&&!G.eqs.includes(R.eq)){G.eqs.push(R.eq);if(!G.eq)G.eq=R.eq}if(R.hero&&!G.unl.includes(R.hero))G.unl.push(R.hero)}
function rewList(R){const u=t(),out=[];
 if(R.items)for(const k in R.items)out.push({ic:ITEMS[k].e,txt:`${L(ITEMS[k].n)} ×${R.items[k]}`});
 if(R.coins)out.push({ic:"🪙",txt:`+${R.coins}`});
 if(R.heart)out.push({ic:"❤️",txt:u.rHeart});
 if(R.eq)out.push({ic:EQUIP[R.eq].e,txt:L(EQUIP[R.eq].n)});
 if(R.shop)out.push({ic:EQUIP[R.shop].e,txt:u.rShop(L(EQUIP[R.shop].n))});
 if(R.hero)out.push({ic:{monkey:"🐵",rooster:"🐓",snake:"🐍"}[R.hero],txt:u.rHero(L(CHARS.find(c=>c.id===R.hero).n))});
 return out}
function showLv(l){$("lvLabel").textContent=t().lvUp;$("lvNum").textContent="Lv "+l;$("lvRew").innerHTML=rewList(LVREW[l]).map(r=>`<span>${r.ic} ${r.txt}</span>`).join("");$("lvOk").textContent=t().ok;$("lvOv").hidden=false;sfx("evo");$("lvOk").focus()}
$("lvOk").onclick=()=>{$("lvOv").hidden=true;renderAll()};

/* dialogue */
function dialog(por,name,text,btns){
 sfx("tap");$("dPor").innerHTML=por;$("dName").textContent=name;$("dText").textContent=text;
 $("dBtns").innerHTML="";btns.forEach(b=>{const el=document.createElement("button");el.className="btn"+(b.pri?" pri":"");el.textContent=b.label;el.onclick=()=>{$("dlgOv").hidden=true;b.fn&&b.fn()};$("dBtns").appendChild(el)});
 $("dlgOv").hidden=false;$("dBtns").lastChild.focus();
}
function talk(id){
 const N=NPCS[id],Q=QUESTS[G.q],nm=L(N.n);
 if(Q&&Q.npc===id){
  if(Q.intro)return dialog(portrait(id),nm,L(Q.ask),[{label:t().go,pri:1,fn:()=>{G.q=1;save();renderAll()}}]);
  if(G.q===6&&stage()<2)return dialog(portrait(id),nm,t().gate(G.xp,EVO[2]),[{label:t().ok,pri:1}]);
  return dialog(portrait(id),nm,L(Q.ask),[{label:t().later},{label:t().help,pri:1,fn:()=>challenge({por:portrait(id),line:L(Q.ask),word:Q.word,pic:Q.pic,mean:L(Q.mean)},()=>complete(G.q))}]);
 }
 if(id==="captain"&&G.q>0&&G.q<6){const n=PARTS.filter(p=>hasPart(p.id)).length;return dialog(portrait(id),nm,t().capWait(n),[{label:t().ok}])}
 const done=QUESTS.some((q,i)=>i<G.q&&q.npc===id);
 dialog(portrait(id),nm,done?t().done:t().busy(Q?L(Q.obj):""),[{label:t().ok}]);
}
function complete(qi){
 const Q=QUESTS[qi];G.q=qi+1;save();renderAll();sfx("star");
 if(qi===6)return launch();
 const part=PARTS.find(p=>p.q===qi);
 if(part)toast(t().newPart(L(part.n)));else if(qi===2)toast(t().bridge);
 if(qi===3)setTimeout(()=>toast(t().web),2700);
 dialog(portrait(Q.npc),L(NPCS[Q.npc].n),L(Q.thx)+(part?`  ${part.e} +1`:""),[{label:t().ok,pri:1,fn:()=>reward(20,25,10)}]);
}
function openChest(i){
 const s=CHESTS[i].s;
 dialog(chestSVG(),t().chestName,t().chest(s),[{label:t().later},{label:t().help,pri:1,fn:()=>challenge({por:chestSVG(),line:t().chest(s),word:s,pic:"✨",mean:""},()=>{G.chests.push(i);save();renderAll();toast(t().chestOk);setTimeout(()=>reward(10,10,5),900)})}]);
}
function launch(){
 reward(50,40,0);
 const sh=$("ship");plEl.style.opacity="0";ptEl.style.opacity="0";setTimeout(()=>sh.classList.add("away"),300);
 setTimeout(()=>{G.dragon=true;save();showClear()},3400);
}

/* shared builder */
function builder(host,target,o){
 host.innerHTML=`<div class="cbody"><div class="frame"><div class="slot c"></div><div class="slot v"></div><div class="res"></div></div><div class="tray"><div class="row rc"></div><div class="row rv"></div><p class="rule"></p></div></div>`;
 const fr=host.querySelector(".frame"),sc=host.querySelector(".slot.c"),sv=host.querySelector(".slot.v"),res=host.querySelector(".res");
 host.querySelector(".rule").textContent=t().rule;
 let c=null,v=null,busy=false,miss=0;
 const btns=[];
 const mk=(row,list,kind)=>list.forEach(p=>{const b=document.createElement("button");b.className="pc "+kind;b.innerHTML=`<b>${p.j}</b><small>${p.n}</small>`;b.setAttribute("aria-pressed","false");b.dataset.j=p.j;b.onclick=()=>pick(kind,p);row.appendChild(b);btns.push(b)});
 mk(host.querySelector(".rc"),CONS,"c");mk(host.querySelector(".rv"),VOWS,"v");
 const marks=()=>btns.forEach(b=>b.setAttribute("aria-pressed",String((c&&b.dataset.j===c.j)||(v&&b.dataset.j===v.j))));
 const reset=()=>{c=v=null;busy=false;fr.className="frame";sc.className="slot c";sv.className="slot v";sc.innerHTML=`<span class="gh">${t().gc}</span>`;sv.innerHTML=`<span class="gh">${t().gv}</span>`;res.textContent="";marks();o.msg(t().pickC)};
 function pick(kind,p){
  if(busy)return;sfx("tap");say(p.n);
  if(kind==="c"){c=p;sc.className="slot c on";sc.textContent=p.j}else{v=p;sv.className="slot v on";sv.textContent=p.j;fr.className="frame "+p.o}
  marks();if(c&&v)check();else o.msg(c?t().pickV:t().pickCo);
 }
 function check(){
  busy=true;const s=compose(c,v);
  if(s===target){setTimeout(()=>{fr.classList.add("snap");res.textContent=s;setTimeout(()=>{fr.classList.add("done");say(s);sfx("ok")},160)},120);o.msg(t().nice(s));setTimeout(()=>o.done(true,s),1000);return}
  sfx("bad");fr.classList.add("wrong");
  if(o.retry){miss++;rec(target,false);o.msg(t().wrong);setTimeout(()=>{reset();if(miss>=2){o.msg(t().hint);const d=decomp(target);btns.forEach(b=>b.classList.toggle("hint",b.dataset.j===d.c.j||b.dataset.j===d.v.j))}else o.msg(t().wrong)},500)}
  else setTimeout(()=>o.done(false,s),500);
 }
 reset();
 return {hint:()=>{const d=decomp(target);btns.forEach(b=>b.classList.toggle("hint",b.dataset.j===d.c.j||b.dataset.j===d.v.j))}};
}

/* quest challenge */
let CH=null;
function challenge(o,onDone){
 CH={...o,k:0,first:true};
 $("cPor").innerHTML=o.por;$("cLine").textContent=o.line;$("cPic").textContent=o.pic;$("cMean").textContent=o.mean;$("cLeave").textContent=t().leave;
 $("chalOv").hidden=false;say(o.word);
 const next=()=>{
  $("cWord").innerHTML=[...CH.word].map((s,i)=>`<div class="cs ${i<CH.k?"ok":i===CH.k?"now":""}">${s}</div>`).join("");
  if(CH.k>=CH.word.length){say(CH.word);setTimeout(()=>{$("chalOv").hidden=true;CH=null;onDone()},900);return}
  builder($("cHost"),CH.word[CH.k],{retry:true,msg:m=>$("cMsg").textContent=m,done:(ok,s)=>{rec(s,true);CH.k++;next()}});
 };
 next();
}
$("cSay").onclick=()=>CH&&say(CH.word);
$("cLeave").onclick=()=>{$("chalOv").hidden=true;CH=null};

/* battle (real-time action) */
let BT=null;
const TYPEMOVE={fire:{e:"🔥",n:{en:"Fireball",ko:"불꽃탄"}},water:{e:"💧",n:{en:"Water Jet",ko:"물대포"}},leaf:{e:"🍃",n:{en:"Leaf Blade",ko:"잎날개"}}};
const FOE={1:{hp:40,spd:55,every:3.4,fill:1.3,r:68},2:{hp:60,spd:70,every:2.8,fill:1.15,r:72},3:{hp:80,spd:85,every:2.4,fill:1,r:76}};
const SKILLS=["skill","dash","super","potion","lens","shield"];
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const ar=()=>$("arena");
function aEl(cls,html){const e=document.createElement("div");e.className="ae "+cls;if(html)e.innerHTML=html;ar().appendChild(e);return e}
function place(e,x,y){e.style.left=x+"px";e.style.top=y+"px"}
function popTxt(txt,x,y){const e=aEl("dmg");e.textContent=txt;place(e,x,y);setTimeout(()=>e.remove(),800)}
function banner(txt){const e=document.createElement("div");e.className="banner";e.textContent=txt;ar().appendChild(e);setTimeout(()=>e.remove(),1300)}
const recT=(s,ok)=>[...s].forEach(c=>POOL.includes(c)&&rec(c,ok));
function bHearts(){$("bHearts").textContent="❤️".repeat(Math.max(0,BT.hearts))+"🤍".repeat(Math.max(0,maxHearts()-BT.hearts))+(BT.guard?" 🛡️":"")}

function battle(m){
 const F=Object.assign({},FOE[m.lv]),u=t();if(m.boss){F.hp=130;F.every=2.2}
 $("bFoeN").textContent=(m.vil?L(VIL[m.vil].n):L(MONN[m.lv]))+(m.boss?" 👑":"");$("bFoeL").textContent=`Lv ${m.lv}`;$("bFoeHp").style.width="100%";
 $("bAllyN").textContent=pname();$("bAllyL").textContent=`${L(PT[G.ptype].t)} · ${u.lv(stage())}`;
 $("bRun").textContent=u.run;$("bMsg").textContent="";
 const A=ar();A.innerHTML="";$("batOv").hidden=false;$("batOv").classList.toggle("easy",!!G.easy);
 const w=A.clientWidth,h=A.clientHeight;
 BT={m,F,wt:0,wcur:0,upT:0,hintd:false,easyHit:Math.ceil(F.hp/(m.boss?4:3)),hp:F.hp,hearts:maxHearts(),guard:G.eq==="charm"||G.char==="sheep",power:0,cd:{skill:0,dash:0},auto:0,
  ally:{x:w*.25,y:h*.68,tx:w*.25,ty:h*.68,stun:0,inv:0,dash:0,dx:0,dy:0},
  foe:{x:w*.72,y:h*.35,tx:w*.72,ty:h*.35,re:0,tele:F.every},
  sh:{up:true,t:0},orbs:[],teles:[],projs:[],last:0,raf:0,paused:false};
 BT.cmdEl=aEl("cmd",heroArt(G.char));place(BT.cmdEl,62,h-72);
 BT.allyEl=aEl("ally",partnerSVG(G.ptype,stage()));
 BT.foeEl=aEl("foe",`${m.vil?vilArt(m.vil):monSVG(m.lv,m.j)}<div class="sh"></div><div class="zz">💫</div>`);
 if(m.boss){BT.foeEl.style.width=BT.foeEl.style.height="146px"}place(BT.allyEl,BT.ally.x,BT.ally.y);place(BT.foeEl,BT.foe.x,BT.foe.y);
 renderSkills();
 if(!G.tut&&!G.easy)BT.paused=true;
 if(m.sleep){m.sleep=false;newShield();openShield(G.char==="snake"?6:4);banner(u.sneakB);$("bMsg").textContent=u.sneak}else newShield();
 sfx("bad");
 if(BT.paused)showTut();
 if(G.easy)sayUI("Look at the picture, listen, and tap the matching word!","그림을 보고 잘 들어 봐. 맞는 낱말을 콕 눌러!",()=>speakTarget());
 BT.last=performance.now();BT.raf=requestAnimationFrame(loop);
}
function showTut(){
 const u=t(),d=document.createElement("div");d.className="tut";
 d.innerHTML=`<h3>${u.tutT}</h3><ol><li>${u.tut1}</li><li>${u.tut2}</li><li>${u.tut3}</li><li>${u.tut4}</li></ol><button class="btn pri">${u.gotIt}</button>`;
 ar().appendChild(d);
 d.addEventListener("pointerdown",e=>e.stopPropagation());
 d.querySelector("button").onclick=()=>{d.remove();G.tut=1;save();BT.paused=false;BT.last=performance.now();speakTarget()};
}
function newShield(){
 const S=BT.sh,lv=BT.m.lv;S.up=true;S.t=0;BT.foeEl.classList.remove("open");
 const WP=G.rl>=2?WORDS2:WORDS;BT.upT=0;BT.hintd=false;BT.wcur=0;
 if(G.easy){const w=WP[Math.floor(Math.random()*WP.length)];S.mode="easy";S.target=w.w;S.pic=w.p;S.opts=shuffle([w.w,...wordDistract(w,WP).map(x=>x.w)])}
 else if(lv===3||G.rl>=2){const w=WP[Math.floor(Math.random()*WP.length)];S.mode=lv===3?"read":lv===1?"seeW":"hear";S.target=w.w;S.pic=w.p;S.opts=shuffle([w.w,...wordDistract(w,WP).map(x=>x.w)])}
 else{const s=pickSyl();S.mode=lv===1?"see":"hear";S.target=s;S.opts=shuffle([s,...distract(s,2)])}
 spawnOrbs();targetUI();if(!BT.paused)speakTarget();
 if(G.char==="rat"&&!BT.ratUsed){BT.ratUsed=1;const o=BT.orbs.find(x=>x.s===S.target);if(o)o.el.classList.add("glow")}
}
function speakTarget(){const S=BT.sh;if(S.up&&S.mode!=="read")say(S.target)}
function spawnOrbs(){
 BT.orbs.forEach(o=>o.el.remove());BT.orbs=[];
 const A=ar(),w=A.clientWidth,h=A.clientHeight;
 BT.sh.opts.forEach(s=>{
  let x,y,k=0;
  do{x=70+Math.random()*(w-140);y=55+Math.random()*(h-110);k++}while(k<60&&(dist({x,y},BT.foe)<130||dist({x,y},BT.ally)<100||BT.orbs.some(o=>dist(o,{x,y})<110)));
  const el=aEl("orb"+(s.length>1?" word":""));el.textContent=s;place(el,x,y);BT.orbs.push({x,y,s,el});
 });
}
function targetUI(){
 const S=BT.sh,u=t(),box=$("bTarget");box.classList.toggle("brk",!S.up);
 if(!S.up)box.innerHTML=`<span class="lb">${u.broken}</span><span class="tv" id="bBrk">${Math.ceil(S.t)}</span>`;
 else if(S.mode==="see"||S.mode==="seeW")box.innerHTML=`<span class="lb">${u.shieldSee}</span><span class="tv">${S.target}</span><button class="spk" id="bSay" aria-label="Hear it">🔊</button>`;
 else if(S.mode==="hear")box.innerHTML=`<span class="lb">${u.shieldHear}</span><span class="tv">?</span><button class="spk" id="bSay" aria-label="Hear it">🔊</button>`;
 else if(S.mode==="easy")box.innerHTML=`<span class="lb">${K("Find this word","이 낱말을 찾아")}</span><span class="tv" style="font-size:48px">${S.pic}</span><button class="spk" id="bSay" aria-label="Hear it">🔊</button>`;
 else box.innerHTML=`<span class="lb">${u.shieldRead}</span><span class="tv" style="font-size:48px">${S.pic}</span>`;
 const b=$("bSay");if(b)b.onclick=()=>say(S.target);
}
function openShield(sec){
 const S=BT.sh;S.up=false;S.t=sec;
 BT.orbs.forEach(o=>o.el.remove());BT.orbs=[];BT.teles.forEach(x=>x.el.remove());BT.teles=[];
 BT.foeEl.classList.add("open");targetUI();
}
function grab(o){
 const S=BT.sh,u=t();o.el.remove();BT.orbs=BT.orbs.filter(x=>x!==o);
 if(o.s===S.target){
  recT(S.target,true);sfx("star");say(S.target);BT.power=Math.min(3,BT.power+(G.char==="dragon"?2:1));
  openShield(G.easy?3.4:6);banner(G.easy?K("Correct! Attack!","맞았어! 공격!"):u.brk);$("bMsg").textContent=G.easy?K("Tap the gremlin to attack more!","도깨비를 콕콕 눌러서 더 공격해!"):u.broken;renderSkills();
  if(G.easy){const n=3,d=Math.ceil(BT.easyHit/n);BT.ally.tx=Math.max(40,BT.foe.x-80);BT.ally.ty=BT.foe.y+30;for(let k=0;k<n;k++)setTimeout(()=>{if(BT&&BT.done===undefined)shoot(d,d,"big",true)},420+k*360)}
 }else{
  recT(S.target,false);sfx("bad");BT.wt++;BT.wcur++;
  if(G.easy){say(o.s);setTimeout(()=>{if(BT&&BT.sh.up&&BT.done===undefined)say(BT.sh.target)},1100);$("bMsg").textContent=K(`That was '${o.s}'. Listen again!`,`그건 '${o.s}'(이)야. 다시 들어 봐!`);const c=BT.orbs.find(x=>x.s===S.target);if(c)c.el.classList.add("glow","hand")}
  else{say(o.s);BT.ally.stun=1;$("bMsg").textContent=u.wrongOrb(o.s);popTxt("💫",BT.ally.x,BT.ally.y-50)}
 }
}
function tele(x,y){
 const A=ar(),r=BT.F.r;x=Math.max(40,Math.min(A.clientWidth-40,x));y=Math.max(40,Math.min(A.clientHeight-40,y));
 const el=aEl("tele","<i></i>");el.style.width=el.style.height=r*2+"px";place(el,x,y);BT.teles.push({x,y,r,t:0,dur:BT.F.fill*(G.char==="rooster"?1.35:1),el});
}
function shoot(dmg,low,cls,ignore){
 const p={x:BT.ally.x,y:BT.ally.y,dmg,low,ignore,v:cls?540:720};
 p.el=aEl("proj "+cls);p.el.style.background=PT[G.ptype].shot;place(p.el,p.x,p.y);BT.projs.push(p);
}
function hitFoe(p){
 if(BT.done!==undefined)return;
 const d=(BT.sh.up&&!p.ignore)?p.low:p.dmg;BT.hp=Math.max(0,BT.hp-d);popTxt("-"+d,BT.foe.x,BT.foe.y-62);
 BT.foeEl.classList.remove("hurt");void BT.foeEl.offsetWidth;BT.foeEl.classList.add("hurt");sfx(d>=8?"hit":"tap");
 $("bFoeHp").style.width=(BT.hp/BT.F.hp*100)+"%";if(BT.hp<=0)win();
}
function hurt(){
 const a=BT.ally;if(a.inv>0||BT.done!==undefined)return;
 if(BT.guard){BT.guard=false;popTxt(t().blocked,a.x,a.y-60);sfx("tap");bHearts();a.inv=.6;return}
 BT.hearts--;a.inv=1;bHearts();popTxt("-1",a.x,a.y-60);sfx("bad");
 BT.allyEl.classList.remove("hurt");void BT.allyEl.offsetWidth;BT.allyEl.classList.add("hurt");
 if(BT.hearts<=0)lose();
}
function loop(now){
 if(!BT||BT.done!==undefined)return;
 const dt=Math.min(.05,(now-BT.last)/1000);BT.last=now;BT.raf=requestAnimationFrame(loop);
 if(BT.paused)return;
 const A=ar(),w=A.clientWidth,h=A.clientHeight,a=BT.ally,f=BT.foe,S=BT.sh;
 for(const k in BT.cd)BT.cd[k]=Math.max(0,BT.cd[k]-dt);
 a.stun=Math.max(0,a.stun-dt);a.inv=Math.max(0,a.inv-dt);BT.auto=Math.max(0,BT.auto-dt);
 if(a.dash>0){a.dash-=dt;a.x+=a.dx*dt;a.y+=a.dy*dt}
 else if(a.stun<=0){const dx=a.tx-a.x,dy=a.ty-a.y,d=Math.hypot(dx,dy);if(d>3){const s=Math.min(d,250*dt);a.x+=dx/d*s;a.y+=dy/d*s;if(Math.abs(dx)>2)BT.allyEl.classList.toggle("left",dx<0)}}
 a.x=Math.max(32,Math.min(w-32,a.x));a.y=Math.max(32,Math.min(h-32,a.y));
 if(S.up){
  f.re-=dt;if(f.re<=0){f.re=2;const ang=Math.random()*Math.PI*2;f.tx=Math.max(60,Math.min(w-60,a.x+Math.cos(ang)*160));f.ty=Math.max(60,Math.min(h-60,a.y+Math.sin(ang)*120))}
  const dx=f.tx-f.x,dy=f.ty-f.y,d=Math.hypot(dx,dy);if(d>3){const s=Math.min(d,BT.F.spd*dt);f.x+=dx/d*s;f.y+=dy/d*s}
  f.tele-=dt;if(G.easy){BT.upT+=dt;if(BT.upT>8&&!BT.hintd){BT.hintd=true;const c=BT.orbs.find(x=>x.s===S.target);if(c)c.el.classList.add("glow","hand");speakTarget()}}else if(f.tele<=0){f.tele=BT.F.every;tele(a.x,a.y);if(BT.m.lv===3)tele(a.x+(Math.random()<.5?-1:1)*120,a.y+(Math.random()-.5)*90)}
 }else{S.t-=dt;const e=$("bBrk");if(e)e.textContent=Math.max(0,Math.ceil(S.t));if(S.t<=0)newShield()}
 BT.teles=BT.teles.filter(x=>{x.t+=dt;x.el.firstChild.style.transform=`scale(${Math.min(1,x.t/x.dur)})`;if(x.t>=x.dur){x.el.remove();if(dist(a,x)<x.r)hurt();return false}return true});
 if(BT.done!==undefined)return;
 if(S.up&&a.stun<=0&&a.dash<=0&&BT.pick&&BT.orbs.includes(BT.pick)&&dist(a,BT.pick)<50){const o=BT.pick;BT.pick=null;grab(o)}
 if(a.stun<=0&&BT.auto<=0&&dist(a,f)<150){BT.auto=.8;shoot(4,1,"")}
 BT.projs=BT.projs.filter(p=>{const dx=f.x-p.x,dy=f.y-p.y,d=Math.hypot(dx,dy);if(d<26){p.el.remove();hitFoe(p);return false}const s=Math.min(d,p.v*dt);p.x+=dx/d*s;p.y+=dy/d*s;place(p.el,p.x,p.y);return true});
 if(!BT||BT.done!==undefined)return;
 place(BT.allyEl,a.x,a.y);place(BT.foeEl,f.x,f.y);
 BT.allyEl.classList.toggle("stun",a.stun>0);BT.allyEl.classList.toggle("invul",a.inv>0);
 skillCD();
}
function renderSkills(){
 const u=t(),tm=TYPEMOVE[G.ptype];
 const def={skill:{ic:tm.e,n:L(tm.n)},dash:{ic:"💨",n:u.skDash},super:{ic:"✨",n:u.skSuper},
  potion:{ic:ITEMS.potion.e,n:`${L(ITEMS.potion.n)} ×${G.inv.potion}`},lens:{ic:ITEMS.lens.e,n:`${L(ITEMS.lens.n)} ×${G.inv.lens}`},shield:{ic:ITEMS.shield.e,n:`${L(ITEMS.shield.n)} ×${G.inv.shield}`}};
 $("bSkills").innerHTML=SKILLS.map(k=>`<button class="sk" data-k="${k}"><span class="ic">${def[k].ic}</span><span class="n">${def[k].n}</span><i></i></button>`).join("");
 $("bSkills").querySelectorAll(".sk").forEach(b=>b.onclick=()=>useSkill(b.dataset.k));
 $("bPowL").textContent=u.power;$("bPow").innerHTML=[0,1,2].map(i=>`<i class="${i<BT.power?"on":""}"></i>`).join("");
 bHearts();skillCD();
}
function skillCD(){
 const S=BT.sh,over=BT.done!==undefined;
 $("bSkills").querySelectorAll(".sk").forEach(b=>{
  const k=b.dataset.k;let dis=false,pct=0;
  if(k==="skill")pct=BT.cd.skill/3.5;else if(k==="dash")pct=BT.cd.dash/2.5;
  else if(k==="super")dis=BT.power<3;else if(k==="potion")dis=!G.inv.potion||BT.hearts>=maxHearts();
  else if(k==="lens")dis=!G.inv.lens||!S.up||!BT.orbs.length;else if(k==="shield")dis=!G.inv.shield||BT.guard;
  b.disabled=over||dis||pct>0;b.querySelector("i").style.height=(pct*100)+"%";b.classList.toggle("ready",!over&&k==="super"&&BT.power>=3);
 });
}
function useSkill(k){
 if(!BT||BT.paused||BT.done!==undefined)return;const a=BT.ally,u=t();
 if(k==="skill"){if(BT.cd.skill>0||a.stun>0)return;BT.cd.skill=3.5;shoot(G.char==="tiger"?15:10,G.char==="tiger"?3:2,"big");sfx("hit")}
 else if(k==="dash"){if(BT.cd.dash>0)return;BT.cd.dash=G.char==="rabbit"?1.6:2.5;let dx=a.tx-a.x,dy=a.ty-a.y,d=Math.hypot(dx,dy);if(d<5){dx=a.x<BT.foe.x?-1:1;dy=0;d=1}
  a.dx=dx/d*760;a.dy=dy/d*760;a.dash=.18;a.inv=Math.max(a.inv,.45);a.stun=0;a.tx=a.x+a.dx*.18;a.ty=a.y+a.dy*.18;sfx("tap")}
 else if(k==="super"){if(BT.power<3)return;BT.power=0;shoot(25,25,"sup",true);banner(u.skSuper);sfx("evo");renderSkills()}
 else if(k==="potion"){if(!G.inv.potion||BT.hearts>=maxHearts())return;G.inv.potion--;BT.hearts++;save();toast(u.itUsed(L(ITEMS.potion.n)));renderSkills()}
 else if(k==="lens"){if(!G.inv.lens||!BT.sh.up)return;const o=BT.orbs.find(x=>x.s===BT.sh.target);if(!o)return;o.el.classList.add("glow");G.inv.lens--;save();toast(u.itUsed(L(ITEMS.lens.n)));renderSkills()}
 else if(k==="shield"){if(!G.inv.shield||BT.guard)return;G.inv.shield--;BT.guard=true;save();toast(u.shieldOn);renderSkills()}
}
$("arena").addEventListener("pointerdown",e=>{
 if(!BT||BT.paused||BT.done!==undefined)return;
 const r=$("arena").getBoundingClientRect();let x=e.clientX-r.left,y=e.clientY-r.top;BT.pick=BT.sh.up?BT.orbs.find(o=>Math.abs(o.x-x)<(o.s.length>1?(G.easy?90:70):42)&&Math.abs(o.y-y)<(G.easy?48:40))||null:null;if(BT.pick){x=BT.pick.x;y=BT.pick.y}BT.ally.tx=x;BT.ally.ty=y;
 if(G.easy){if(BT.pick){const o=BT.pick;BT.pick=null;grab(o)}else if(!BT.sh.up&&dist({x,y},BT.foe)<95){const n=performance.now();if(!BT.tapT||n-BT.tapT>220){BT.tapT=n;shoot(3,3,"",true)}}}
 const m=aEl("tap");place(m,x,y);setTimeout(()=>m.remove(),500);
});
document.addEventListener("keydown",e=>{
 if(!BT||$("batOv").hidden||BT.done!==undefined)return;
 const d={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];
 if(d){e.preventDefault();BT.ally.tx=BT.ally.x+d[0]*80;BT.ally.ty=BT.ally.y+d[1]*80}
 else if(e.key===" "){e.preventDefault();useSkill("skill")}
 else if(e.key==="Shift")useSkill("dash");
});
function endBattle(){cancelAnimationFrame(BT.raf);[...BT.teles,...BT.orbs,...BT.projs].forEach(x=>x.el.remove());BT.teles=[];BT.orbs=[];BT.projs=[]}
function win(){
 const m=BT.m,xp={1:12,2:18,3:25}[m.lv],u=t();BT.done=xp;endBattle();
 BT.foeEl.classList.add("fade");sfx("star");banner(u.winB);
 m.alive=false;m.back=Date.now()+40000;G.wins++;save();BT.rw={c:m.lv*6,e:{1:10,2:15,3:20}[m.lv]};
 const box=$("bTarget");box.classList.add("brk");box.innerHTML=`<span class="tv">🏆 ${m.j}</span>`;
 $("bMsg").textContent=`${u.win(m.j)} ${u.rew(BT.rw.c,BT.rw.e,xp)}`;$("bRun").textContent=u.ok;skillCD();
}
function lose(){BT.done=0;endBattle();$("bMsg").textContent=t().lose;$("bRun").textContent=t().ok;banner(t().loseB);skillCD()}
$("bRun").onclick=()=>{
 if(!BT){$("batOv").hidden=true;return}
 const xp=BT.done,rw=BT.rw;if(BT.done===undefined)endBattle();
 const hl=BT.hearts,wt=BT.wt||0;$("batOv").hidden=true;BT=null;renderEnts();renderHUD();
 if(STAGE&&STAGE.kind==="battle"){if(xp)stageFinish(true,G.easy?(wt===0?3:wt<=2?2:1):hl>=maxHearts()?3:hl>=Math.ceil(maxHearts()/2)?2:1);else stageFinish(false);return}
 if(xp)reward(rw.c,rw.e,xp);
};

/* evolution */
function evolve(from,to){
 const sp=$("eSprite");$("eOk").hidden=true;$("evoOv").hidden=false;
 sp.innerHTML=partnerSVG(G.ptype,from);sp.classList.add("flash");$("eText").textContent=t().evolving(pname(from));sfx("evo");
 let n=0;const iv=setInterval(()=>{n++;sp.innerHTML=partnerSVG(G.ptype,n%2?to:from)},260);
 setTimeout(()=>{clearInterval(iv);sp.classList.remove("flash");sp.innerHTML=partnerSVG(G.ptype,to);sfx("star");
  $("eText").textContent=t().evolved(pname(from),pname(to));$("eOk").textContent=t().ok;$("eOk").hidden=false;$("eOk").focus()},2800);
}
$("eOk").onclick=()=>{$("evoOv").hidden=true;renderAll()};

/* partner panel */
function showPartner(){
 const u=t();
 $("pGridT").textContent=u.gridT;$("pLegend").textContent=u.legend;
 $("pGrid").innerHTML="<tr><th></th>"+VOWS.map(v=>`<th style="color:var(--vow)">${v.j}</th>`).join("")+"</tr>"+CONS.map(c=>`<tr><th style="color:var(--cons)">${c.j}</th>`+VOWS.map(v=>{const s=compose(c,v);return `<td class="m${mastery(s)}">${s}</td>`}).join("")+"</tr>").join("");
 let r=0,w=0;Object.values(G.m).forEach(x=>{r+=x.r;w+=x.w});
 $("pStats").innerHTML=`<div><b>${G.wins}</b>${u.sWins}</div><div><b>${r+w?Math.round(r/(r+w)*100):0}%</b>${u.sAcc}</div><div><b>${Object.keys(G.m).filter(k=>POOL.includes(k)).length}/25</b>${u.sTried}</div>`;
 $("pClose").textContent=u.close;$("parOv").hidden=false;
}
$("pClose").onclick=()=>$("parOv").hidden=true;

/* adventure course (side-scroller) */
const T=48,ROWS=9,SOLID="#B?LU";
let RUN=null;
function svgImg(svg,w,h){const im=new Image();im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg.replace("<svg ",`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `));return im}
function portalSVG(){
 const u="p"+(++svgN),O=OL;
 return `<svg viewBox="0 -14 100 144" aria-hidden="true">${artDefs(u)}<defs><radialGradient id="pv${u}" cx="50%" cy="55%" r="60%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".35" stop-color="#C9A8FF"/><stop offset="1" stop-color="#4E2FB8"/></radialGradient></defs>
 <ellipse cx="50" cy="122" rx="36" ry="4" fill="rgba(0,0,0,.22)"/>
 <path d="M28 121 L28 52 Q28 28 50 28 Q72 28 72 52 L72 121Z" fill="url(#pv${u})"/>
 <path d="M50 78 m-13 0 a13 13 0 1 1 13 13 a9 9 0 1 1 -9 -9 a5 5 0 1 1 5 5" stroke="#fff" stroke-width="2.4" fill="none" opacity=".85"/>
 <path ${O} d="M14 121 L14 50 Q14 13 50 13 Q86 13 86 50 L86 121 L72 121 L72 52 Q72 28 50 28 Q28 28 28 52 L28 121Z" fill="#8C96A8"/>
 <path d="M72 121 L72 52 Q72 28 50 28 L50 13 Q86 13 86 50 L86 121Z" fill="#6C7486"/>
 <path d="M14 70 L28 70 M72 70 L86 70 M14 96 L28 96 M72 96 L86 96 M20 34 L30 42 M80 34 L70 42" stroke="#5A6274" stroke-width="1.6"/>
 <path ${O} d="M43 8 L57 8 L55 22 L45 22Z" fill="url(#gd${u})"/>
 <circle cx="36" cy="58" r="2" fill="#fff"/><circle cx="64" cy="66" r="1.6" fill="#fff"/><circle cx="58" cy="44" r="1.4" fill="#fff"/></svg>`;
}
function buildLevel(word){
 const syl=[...word.w],cols=[],ents=[],gates=[];
 const col=(g=true)=>{const c=Array(ROWS).fill(".");if(g){c[7]="#";c[8]="#"}cols.push(c)};
 const flat=n=>{for(let i=0;i<n;i++)col()};const pit=n=>{for(let i=0;i<n;i++)col(!!G.easy)};
 const set=(x,y,ch)=>{cols[x][y]=ch};const coin=(x,y)=>ents.push({k:"coin",x:x*T+T/2,y:y*T+T/2});
 flat(12);[6,7,8].forEach(x=>coin(x,5));set(9,4,"?");
 pit(2);
 let s=cols.length;flat(10);set(s+3,4,"B");set(s+4,4,"?");set(s+5,4,"B");ents.push({k:"mob",x:(s+7)*T});
 s=cols.length;flat(6);set(s+1,6,"#");set(s+2,6,"#");set(s+2,5,"#");set(s+3,6,"#");set(s+3,5,"#");set(s+3,4,"#");coin(s+3,3);
 pit(2);
 syl.forEach((tg,g)=>{
  s=cols.length;flat(14);
  ents.push({k:"sign",x:(s+2)*T+T/2,g});
  const opts=shuffle([tg,...distract(tg,2)]);
  [4,6,8].forEach((dx,i)=>{set(s+dx,4,"L");ents.push({k:"lb",cx:s+dx,cy:4,s:opts[i],g})});
  gates.push({g,cx:s+11,target:tg,opened:false,anim:0,hint:false});
  if(g<syl.length-1){
   s=cols.length;flat(4);ents.push({k:"mob",x:(s+2)*T});
   pit(g===0?2:3);
   s=cols.length;flat(7);set(s+2,4,"#");set(s+3,4,"#");set(s+4,4,"#");[s+2,s+3,s+4].forEach(x=>coin(x,3));ents.push({k:"mob",x:(s+6)*T});
  }
 });
 s=cols.length;flat(16);for(let i=0;i<4;i++)for(let y=6-i;y<=6;y++)set(s+3+i,y,"#");
 ents.push({k:"flag",x:(s+11)*T+T/2});
 return {cols,ents,gates,w:cols.length*T};
}
const tileAt=(cx,cy)=>{if(cy<0||cy>=ROWS)return ".";const c=RUN.cols[cx];return c?c[cy]:"#"};
const tileDraw=(cx,cy)=>{const c=RUN.cols[cx];return c&&cy>=0&&cy<ROWS?c[cy]:"."};
const gateAt=cx=>RUN.gates.find(g=>g.cx===cx&&!g.opened);
const solid=(cx,cy)=>SOLID.includes(tileAt(cx,cy))||(cy>=0&&cy<=6&&!!gateAt(cx));
const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const mkMob=(x,y)=>({x,y,w:34,h:36,vx:-60,vy:0,on:false,alive:true,sq:0,bounce:true,lv:1+Math.floor(Math.random()*3)});
function startRun(word){
 try{document.fonts&&document.fonts.load('28px "Jua"')}catch(e){}
 const pool=WORDS.filter(x=>x.w.length>=2&&x.w.length<=3&&[...x.w].every(c=>POOL.includes(c)));
 const w=word||pool[Math.floor(Math.random()*pool.length)],lv=buildLevel(w);
 const st=$("rStage").querySelector(".rres");if(st)st.remove();
 if(RUN)cancelAnimationFrame(RUN.raf);
 RUN={word:w,lv,cols:lv.cols,gates:lv.gates,p:{x:2*T,y:5*T,vx:0,vy:0,w:28,h:46,on:false,face:1,coy:0,buf:0,inv:0,sq:0},
  hearts:maxHearts(),coins:0,cam:0,keys:{l:0,r:0,j:0},jPrev:0,trail:[],mobs:[],coinE:[],parts:[],bumps:{},meta:{},signs:[],flag:null,cur:0,check:{x:2*T,y:5*T},said:{},done:null,t:0,last:performance.now(),
  img:{hero:(HIMG[G.char]||DA.hs[G.char])?Object.assign(new Image(),{src:HIMG[G.char]||DA.hs[G.char]}):svgImg(charSVG(G.char),200,288),pt:new Image(),mob:[1,2,3].map(l=>svgImg(monSVG(l,CONS[l].j),160,160))}};
 lv.ents.forEach(e=>{
  if(e.k==="coin")RUN.coinE.push({x:e.x,y:e.y,taken:false});
  else if(e.k==="mob")RUN.mobs.push(mkMob(e.x,7*T-36));
  else if(e.k==="lb")RUN.meta[e.cx+","+e.cy]={s:e.s,g:e.g};
  else if(e.k==="sign")RUN.signs.push(e);
  else if(e.k==="flag")RUN.flag=e;
 });
 $("rQuit").textContent=t().quit;$("rTip").textContent=G.easy?K("Your hero runs by itself. Tap the screen to jump! At a gate, tap the letter block that makes the sound.","영웅이 알아서 달려요. 화면을 톡 누르면 점프! 문 앞에서는 소리에 맞는 글자 블록을 콕 눌러요."):t().runHow;
 $("runOv").hidden=false;$("runOv").classList.toggle("easy",!!G.easy);runHUD();msgRun("");if(G.easy)sayUI("Tap the screen to jump!","화면을 톡 누르면 점프해!");
 RUN.raf=requestAnimationFrame(runLoop);
}
function runHUD(){
 if(!RUN)return;const syl=[...RUN.word.w];
 $("rHearts").textContent="❤️".repeat(Math.max(0,RUN.hearts))+"🤍".repeat(Math.max(0,maxHearts()-RUN.hearts));
 $("rCoins").textContent=`🪙 ${RUN.coins}`;
 $("rWord").innerHTML=`<span class="pic">${RUN.word.p}</span>`+syl.map((s,i)=>{const g=RUN.gates[i];
  return i<RUN.cur?`<span class="rslot ok">${s}</span>`:i===RUN.cur?`<span class="rslot now">${g.hint?`<span class="faint">${s}</span>`:"?"}</span>`:`<span class="rslot"></span>`}).join("")+
  (RUN.cur<syl.length?`<button class="spk" id="rSay" aria-label="Hear it again">🔊</button>`:"");
 const b=$("rSay");if(b)b.onclick=()=>RUN&&say(RUN.gates[RUN.cur].target);
}
function msgRun(m){$("rMsg").textContent=m}
function part(o){RUN.parts.push(Object.assign({vx:0,vy:-120,life:.8,t:0},o))}
function hitBlock(cx,cy){
 const ch=tileAt(cx,cy),key=cx+","+cy,u=t();RUN.bumps[key]=.16;
 if(ch==="?"){RUN.cols[cx][cy]="U";RUN.coins++;sfx("ok");part({x:cx*T+T/2,y:cy*T-8,vy:-320,coin:1,life:.55});runHUD();return}
 if(ch!=="L"){sfx("tap");return}
 const m=RUN.meta[key],gate=m&&RUN.gates[m.g];if(!m||gate.opened)return;
 if(m.g!==RUN.cur){say(m.s);return}
 if(m.s===gate.target){
  RUN.cols[cx][cy]="U";rec(m.s,true);say(m.s);sfx("star");gate.opened=true;RUN.cur++;
  Object.keys(RUN.meta).forEach(k=>{if(RUN.meta[k].g===m.g){const [a,b]=k.split(",").map(Number);if(RUN.cols[a][b]==="L")RUN.cols[a][b]="U"}});
  RUN.check={x:(gate.cx+1)*T,y:5*T};part({x:cx*T+T/2,y:cy*T-10,vy:-220,txt:m.s,life:1.1,big:1});msgRun(u.gateOpen);
 }else{
  RUN.cols[cx][cy]="U";rec(gate.target,false);say(m.s);sfx("bad");gate.hint=true;
  if(G.easy){RUN.wrong=(RUN.wrong||0)+1;msgRun(K(`That was '${m.s}'. Listen again!`,`그건 '${m.s}'(이)야. 다시 들어 봐!`));const tg=gate.target;setTimeout(()=>{if(RUN&&!RUN.done)say(tg)},1000)}
  else{const mb=mkMob(cx*T+7,cy*T-36);mb.vy=-320;mb.vx=RUN.p.x>cx*T?70:-70;RUN.mobs.push(mb);msgRun(u.wrongBlock(m.s))}
 }
 runHUD();
}
function moveBody(b,dt,onHead){
 b.x+=b.vx*dt;
 let x0=Math.floor(b.x/T),x1=Math.floor((b.x+b.w-1)/T),y0=Math.floor(b.y/T),y1=Math.floor((b.y+b.h-1)/T);
 for(let cy=y0;cy<=y1;cy++){
  if(b.vx>0&&solid(x1,cy)){b.x=x1*T-b.w;b.vx=b.bounce?-Math.abs(b.vx):0;break}
  if(b.vx<0&&solid(x0,cy)){b.x=(x0+1)*T;b.vx=b.bounce?Math.abs(b.vx):0;break}
 }
 b.vy=Math.min(b.vy+2200*dt,1100);b.y+=b.vy*dt;b.on=false;
 x0=Math.floor(b.x/T);x1=Math.floor((b.x+b.w-1)/T);y0=Math.floor(b.y/T);y1=Math.floor((b.y+b.h-1)/T);
 if(b.vy>0){for(let cx=x0;cx<=x1;cx++)if(solid(cx,y1)){b.y=y1*T-b.h;b.vy=0;b.on=true;break}}
 else if(b.vy<0){const hits=[];for(let cx=x0;cx<=x1;cx++)if(solid(cx,y0))hits.push(cx);
  if(hits.length){const mid=Math.floor((b.x+b.w/2)/T);b.y=(y0+1)*T;b.vy=0;onHead&&onHead(hits.includes(mid)?mid:hits[0],y0)}}
}
function hurtP(dir){
 const p=RUN.p;if(p.inv>0||RUN.done)return;
 RUN.hearts--;p.inv=1.5;p.vx=dir*260;p.vy=-420;sfx("bad");runHUD();if(RUN.hearts<=0)failRun();
}
function runUpdate(dt){
 const p=RUN.p,k=RUN.keys;RUN.t+=dt;
 const acc=p.on?2400:1500,max=G.char==="horse"?325:(G.easy?220:260);let KR=k.r,KL=k.l;
 if(G.easy&&(RUN.auto||RUN.goal!=null)){const g=RUN.gates[RUN.cur],sg=g&&RUN.signs.find(q=>q.g===RUN.cur),stopX=sg?sg.x+T/2:1e9;
  if(RUN.goal!=null){const tx=RUN.goal*T+T/2-p.w/2;if(Math.abs(tx-p.x)>5){KR=tx>p.x;KL=tx<p.x}else{KR=KL=false;p.vx=0;if(p.on){k.j=1;RUN.jPrev=0;setTimeout(()=>{if(RUN)RUN.keys.j=0},340);RUN.goal=null}}}
  else if(!KL&&p.x+p.w<stopX)KR=true;}
 if(KL&&!KR){p.vx=Math.max(p.vx-acc*dt,-max);p.face=-1}
 else if(KR&&!KL){p.vx=Math.min(p.vx+acc*dt,max);p.face=1}
 else{const f=(p.on?2200:600)*dt;p.vx=Math.abs(p.vx)<=f?0:p.vx-Math.sign(p.vx)*f}
 if(k.j&&!RUN.jPrev)p.buf=.14;RUN.jPrev=k.j;
 p.buf=Math.max(0,p.buf-dt);p.coy=p.on?.1:Math.max(0,p.coy-dt);p.inv=Math.max(0,p.inv-dt);p.sq=Math.max(0,p.sq-dt);
 if(p.buf>0&&p.coy>0){p.vy=G.char==="rabbit"?-900:-820;p.buf=0;p.coy=0;sfx("tap")}
 if(!k.j&&p.vy<-320)p.vy=-320;
 const was=p.on;moveBody(p,dt,hitBlock);if(p.on&&!was)p.sq=.12;
 const prog=G.easy&&KR&&RUN.goal==null&&p.x<=(RUN.progX==null?-1e9:RUN.progX)+3;if(!prog)RUN.progX=p.x;
 if(prog){RUN.stuck=(RUN.stuck||0)+dt;if(RUN.stuck>1){msgRun(K("Tap the screen to jump!","화면을 톡 눌러서 점프!"));document.querySelector('.pbtn2.big').classList.add("nudge");}}else if(RUN.stuck){RUN.stuck=0;document.querySelector('.pbtn2.big').classList.remove("nudge")}
 if(RUN.done)return;
 if(p.y>ROWS*T+60){RUN.hearts--;runHUD();if(RUN.hearts<=0){failRun();return}p.x=RUN.check.x;p.y=RUN.check.y;p.vx=p.vy=0;p.inv=1.5;sfx("bad")}
 RUN.trail.push({x:p.x,y:p.y,f:p.face});if(RUN.trail.length>16)RUN.trail.shift();
 const g=RUN.gates[RUN.cur];
 RUN.signs.forEach(sg=>{if(g&&sg.g===RUN.cur&&!RUN.said[sg.g]&&p.x>sg.x-4*T){RUN.said[sg.g]=1;if(G.easy){msgRun(K("Listen! Tap the letter block that makes this sound.","잘 들어 봐! 이 소리 나는 글자 블록을 콕 눌러."));const tg=g.target;sayUI("Which block makes this sound?","어떤 글자일까?",()=>say(tg))}else{say(g.target);msgRun(t().gateMsg)}}});
 RUN.gates.forEach(gt=>{if(gt.opened&&gt.anim<1)gt.anim=Math.min(1,gt.anim+dt*1.6)});
 for(const key in RUN.bumps){RUN.bumps[key]-=dt;if(RUN.bumps[key]<=0)delete RUN.bumps[key]}
 RUN.coinE.forEach(c=>{if(!c.taken&&Math.abs(p.x+p.w/2-c.x)<24&&Math.abs(p.y+p.h/2-c.y)<34){c.taken=true;RUN.coins++;sfx("tap");runHUD()}});
 RUN.mobs.forEach(m=>{
  if(!m.alive){m.sq-=dt;return}
  if(Math.abs(m.x-p.x)>15*T)return;
  if(m.on){const ax=m.vx>0?Math.floor((m.x+m.w+2)/T):Math.floor((m.x-2)/T),by=Math.floor((m.y+m.h+2)/T);if(!solid(ax,by))m.vx=-m.vx}
  moveBody(m,dt);if(m.y>ROWS*T+80){m.alive=false;m.sq=0;return}
  if(overlap(p,m)){
   if(G.easy||(p.vy>60&&p.y+p.h-m.y<22)){m.alive=false;m.sq=.35;p.vy=G.easy&&p.on?-300:-540;RUN.coins+=2;sfx("hit");part({x:m.x+17,y:m.y-6,txt:"+2",life:.7});runHUD()}
   else hurtP(m.x<p.x?1:-1);
  }
 });
 RUN.mobs=RUN.mobs.filter(m=>m.alive||m.sq>0);
 RUN.parts=RUN.parts.filter(q=>{q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.coin)q.vy+=900*dt;return q.t<q.life});
 if(RUN.flag&&p.x+p.w>=RUN.flag.x-4){if(!RUN.reviewed)courseReview();else clearRun();}
}
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h)}
function drawTile(c,ch,cx,cy){
 const x=cx*T,b=RUN.bumps[cx+","+cy]||0,y=cy*T-(b>0?Math.sin((1-b/.16)*Math.PI)*8:0);
 if(ch==="#"){
  c.fillStyle="#9A6B3E";c.fillRect(x,y,T,T);const h=(cx*31+cy*17)%5;c.fillStyle="#86582F";c.fillRect(x+8+h*4,y+20+h*2,6,4);c.fillRect(x+30-h*2,y+36,5,4);
  if(tileDraw(cx,cy-1)!=="#"){c.fillStyle="#5DBB46";c.fillRect(x,y,T,14);c.fillStyle="#7ED65F";c.fillRect(x,y,T,4);c.fillStyle="#3E9A33";c.fillRect(x,y+12,T,3)}
 }else if(ch==="B"){
  c.fillStyle="#C8632E";c.fillRect(x,y,T,T);c.strokeStyle="#7E3712";c.lineWidth=2;c.beginPath();
  [16,32].forEach(dy=>{c.moveTo(x,y+dy);c.lineTo(x+T,y+dy)});[[24,0,16],[12,16,32],[36,16,32],[24,32,48]].forEach(([dx,a,z])=>{c.moveTo(x+dx,y+a);c.lineTo(x+dx,y+z)});c.stroke();c.strokeRect(x+1,y+1,T-2,T-2);
 }else if(ch==="?"||ch==="L"||ch==="U"){
  const gr=c.createLinearGradient(x,y,x,y+T);
  if(ch==="?"){gr.addColorStop(0,"#FFD966");gr.addColorStop(1,"#E39B00")}else if(ch==="L"){gr.addColorStop(0,"#6C8BF0");gr.addColorStop(1,"#3550B8")}else{gr.addColorStop(0,"#A8978A");gr.addColorStop(1,"#7A6A5E")}
  rr(c,x+1,y+1,T-2,T-2,7);c.fillStyle=gr;c.fill();c.lineWidth=2.5;c.strokeStyle="#1B2233";c.stroke();
  c.fillStyle="rgba(255,255,255,.35)";c.fillRect(x+6,y+5,T-12,3);
  c.fillStyle="#1B2233";[[6,6],[T-8,6],[6,T-8],[T-8,T-8]].forEach(([a,z])=>c.fillRect(x+a,y+z,2.5,2.5));
  if(ch==="?"){c.font='700 30px Fredoka, sans-serif';c.textAlign="center";c.textBaseline="middle";c.lineWidth=4;c.strokeStyle="#8A5A00";c.strokeText("?",x+T/2,y+T/2+1);c.fillStyle="#fff";c.fillText("?",x+T/2,y+T/2+1)}
  if(ch==="L"){const m=RUN.meta[cx+","+cy];c.font='30px Jua, "Apple SD Gothic Neo", sans-serif';c.textAlign="center";c.textBaseline="middle";c.lineWidth=4;c.strokeStyle="#1B2A6B";c.strokeText(m.s,x+T/2,y+T/2+2);c.fillStyle="#fff";c.fillText(m.s,x+T/2,y+T/2+2)}
 }
}
function drawGate(c,g){
 if(g.anim>=1)return;const x=g.cx*T,dy=g.anim*7*T;
 c.save();c.beginPath();c.rect(x-4,0,T+8,7*T);c.clip();c.translate(0,dy);
 const gr=c.createLinearGradient(x,0,x+T,0);gr.addColorStop(0,"#8F9CB0");gr.addColorStop(1,"#5E6A7E");c.fillStyle=gr;c.fillRect(x+4,0,T-8,7*T);
 c.strokeStyle="#1B2233";c.lineWidth=2.5;c.strokeRect(x+4,-2,T-8,7*T+2);c.strokeStyle="rgba(0,0,0,.25)";c.lineWidth=2;
 for(let yy=T;yy<7*T;yy+=T){c.beginPath();c.moveTo(x+4,yy);c.lineTo(x+T-4,yy);c.stroke()}
 const cy=4.5*T,cur=g.g===RUN.cur;c.beginPath();c.arc(x+T/2,cy,17,0,Math.PI*2);c.fillStyle=cur?"#FFC23D":"#B9C2D0";c.fill();c.lineWidth=2.5;c.strokeStyle="#1B2233";c.stroke();
 c.font=g.hint&&cur?'24px Jua, sans-serif':'700 22px Fredoka, sans-serif';c.textAlign="center";c.textBaseline="middle";c.fillStyle="#1B2233";c.fillText(cur?(g.hint?g.target:"?"):"🔒",x+T/2,cy+1);
 c.restore();
}
function drawCloud(c,x,y){c.beginPath();c.arc(x,y,20,0,7);c.arc(x+22,y-10,24,0,7);c.arc(x+48,y,20,0,7);c.rect(x,y,48,20);c.fill()}
function runDraw(){
 const cv=$("runCv"),dpr=window.devicePixelRatio||1,cw=cv.clientWidth,ch=cv.clientHeight;if(!cw||!ch)return;
 if(cv.width!==Math.round(cw*dpr)||cv.height!==Math.round(ch*dpr)){cv.width=Math.round(cw*dpr);cv.height=Math.round(ch*dpr)}
 const c=cv.getContext("2d"),sc=ch/(ROWS*T),vw=cw/sc,p=RUN.p;c.setTransform(dpr*sc,0,0,dpr*sc,0,0);
 RUN.cam=Math.max(0,Math.min(RUN.lv.w-vw,p.x-vw*.35));const cam=RUN.cam;
 const sky=c.createLinearGradient(0,0,0,ROWS*T);sky.addColorStop(0,"#79C8FF");sky.addColorStop(1,"#DDF3FF");c.fillStyle=sky;c.fillRect(0,0,vw,ROWS*T);
 const bg=RUN.img.land;if(bg&&bg.complete&&bg.naturalWidth){const bw=ROWS*T*bg.naturalWidth/bg.naturalHeight;const shift=(cam*.28)%bw;for(let x=-shift;x<vw;x+=bw)c.drawImage(bg,x,0,bw,ROWS*T)}
 else{c.fillStyle="rgba(255,255,255,.9)";for(let i=0;i<10;i++){const span=vw+320,x=((i*270-cam*.2)%span+span)%span-160;drawCloud(c,x,36+(i*47)%90)}
 for(let i=0;i<8;i++){const span=vw+700,x=((i*380-cam*.45)%span+span)%span-350;c.fillStyle=i%2?"#8FD27A":"#A4DC8C";c.beginPath();c.ellipse(x,ROWS*T-60,260,150,0,Math.PI,0);c.fill()}}
 c.fillStyle="rgba(255,255,255,.35)";for(let i=0;i<5;i++){const span=vw+320,x=((i*270-cam*.12+RUN.t*4)%span+span)%span-160;drawCloud(c,x,36+(i*47)%65)}
 for(let i=0;i<18;i++){const x=((i*137-cam*.65+RUN.t*12)%(vw+40)+vw+40)%(vw+40);c.fillStyle="rgba(255,244,171,.65)";c.beginPath();c.arc(x,80+(i*57)%230+Math.sin(RUN.t+i)*12,2,0,7);c.fill()}
 c.save();c.translate(-cam,0);
 const c0=Math.max(0,Math.floor(cam/T)-1),c1=Math.min(RUN.cols.length-1,Math.ceil((cam+vw)/T)+1);
 for(let cx=c0;cx<=c1;cx++)for(let cy=0;cy<ROWS;cy++){const chh=tileDraw(cx,cy);if(chh!==".")drawTile(c,chh,cx,cy)}
 RUN.gates.forEach(g=>drawGate(c,g));
 RUN.signs.forEach(sg=>{const x=sg.x,y=7*T;c.fillStyle="#7A4E2C";c.fillRect(x-3,y-56,6,56);rr(c,x-30,y-92,60,40,6);c.fillStyle="#F3E2C7";c.fill();c.lineWidth=2.5;c.strokeStyle="#1B2233";c.stroke();
  c.font="22px sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillText(RUN.word.p,x-12,y-72);c.fillText("🔊",x+14,y-72)});
 if(RUN.flag&&drawGoal(c,RUN.flag.x)){}else if(RUN.flag){const x=RUN.flag.x;c.fillStyle="#C9D2DE";c.fillRect(x-3,2*T,6,5*T);c.strokeStyle="#1B2233";c.lineWidth=2;c.strokeRect(x-3,2*T,6,5*T);
  c.beginPath();c.arc(x,2*T-6,8,0,7);c.fillStyle="#FFC23D";c.fill();c.stroke();
  const wave=Math.sin(RUN.t*5)*4;c.beginPath();c.moveTo(x+3,2*T+6);c.quadraticCurveTo(x+30,2*T+10+wave,x+56,2*T+18);c.lineTo(x+3,2*T+40);c.closePath();c.fillStyle="#E8573A";c.fill();c.stroke();
  c.font='22px Jua, sans-serif';c.fillStyle="#fff";c.textAlign="center";c.textBaseline="middle";c.fillText("한",x+22,2*T+22)}
 RUN.coinE.forEach(o=>{if(o.taken)return;const s=Math.abs(Math.cos(RUN.t*4+o.x));c.save();c.translate(o.x,o.y);c.scale(Math.max(.15,s),1);c.beginPath();c.arc(0,0,11,0,7);
  const gg=c.createRadialGradient(-3,-4,1,0,0,12);gg.addColorStop(0,"#FFF6C8");gg.addColorStop(1,"#E5A100");c.fillStyle=gg;c.fill();c.lineWidth=2;c.strokeStyle="#8A5A00";c.stroke();c.restore()});
 RUN.mobs.forEach(m=>{const im=RUN.img.mob[m.lv-1];c.save();c.translate(m.x+m.w/2,m.y+m.h);if(!m.alive)c.scale(1.2,.35);if(m.vx>0)c.scale(-1,1);
  if(im.complete&&im.naturalWidth)c.drawImage(im,-24,-46,48,48);else{c.fillStyle="#8F6EF2";c.fillRect(-16,-34,32,34)}c.restore()});
 const tr=RUN.trail[0]||{x:p.x,y:p.y,f:p.face};if(false){c.save();c.translate(tr.x+p.w/2-tr.f*26,tr.y+p.h);if(tr.f<0)c.scale(-1,1);c.drawImage(RUN.img.pt,-21,-40,42,42);c.restore()}
 c.save();if(p.inv>0&&Math.floor(RUN.t*12)%2)c.globalAlpha=.4;
 const bob=p.on&&Math.abs(p.vx)>20?Math.abs(Math.sin(RUN.t*16))*3:0;c.translate(p.x+p.w/2,p.y+p.h-bob);if(p.face<0)c.scale(-1,1);if(p.sq>0)c.scale(1.1,.88);if(!p.on)c.scale(.96,1.05);
 const sheet=RUN.img.cycle;if(sheet&&sheet.complete&&sheet.naturalWidth&&Math.abs(p.vx)>20){const f=p.on?Math.floor(RUN.t*12)%8:3,sw=sheet.naturalWidth/4,sh=sheet.naturalHeight/2;c.drawImage(sheet,(f%4)*sw,Math.floor(f/4)*sh,sw,sh,-42,-82,84,84)}else {const hI=RUN.img.hero;if(hI.complete&&hI.naturalWidth){const hh=78,ww=Math.min(80,hh*(hI.naturalWidth/hI.naturalHeight));c.drawImage(hI,-ww/2,-74,ww,hh)}else{c.fillStyle="#E8573A";c.fillRect(-14,-46,28,46)}}
 c.restore();
 RUN.parts.forEach(q=>{c.save();c.globalAlpha=Math.max(0,1-q.t/q.life);
  if(q.coin){c.beginPath();c.arc(q.x,q.y,10,0,7);c.fillStyle="#FFC23D";c.fill();c.lineWidth=2;c.strokeStyle="#8A5A00";c.stroke()}
  else{c.font=q.big?'42px Jua, sans-serif':'700 22px Fredoka, sans-serif';c.textAlign="center";c.textBaseline="middle";c.lineWidth=5;c.strokeStyle="#1B2233";c.strokeText(q.txt,q.x,q.y);c.fillStyle=q.big?"#FFC23D":"#fff";c.fillText(q.txt,q.x,q.y)}
  c.restore()});
 c.restore();
}
function runLoop(now){
 if(!RUN)return;RUN.raf=requestAnimationFrame(runLoop);
 const dt=Math.min(1/30,(now-RUN.last)/1000);RUN.last=now;
 if(!RUN.done&&!RUN.learning)runUpdate(dt);if(RUN)runDraw();
}
function runResult(html,btns){
 const d=document.createElement("div");d.className="rres";d.innerHTML=html;const row=document.createElement("div");row.className="tbtns";
 btns.forEach(([l,pri,fn])=>{const b=document.createElement("button");b.className="btn"+(pri?" pri":"");b.textContent=l;b.onclick=fn;row.appendChild(b)});
 d.appendChild(row);$("rStage").appendChild(d);
}
function clearRun(){
 if(RUN.done)return;RUN.done="clear";RUN.keys={l:0,r:0,j:0};
 const w=RUN.word,c=RUN.coins+15,u=t();say(w.w);sfx("star");
 const hl=RUN.hearts,wr=RUN.wrong||0;
 if(STAGE){runResult(`<div class="big">${w.p}</div><h3>${u.clearT}</h3><p class="rw">${w.w}</p>`,[[K("Continue","계속")+" →",1,()=>{closeRun();stageFinish(true,G.easy?(wr===0?3:wr<=2?2:1):hl>=maxHearts()?3:hl>=2?2:1)}]]);return}
 runResult(`<div class="big">${w.p}</div><h3>${u.clearT}</h3><p class="rw">${w.w}</p><p>${u.rew(c,30,12)}</p>`,
  [[u.backIsland,0,()=>{closeRun();reward(c,30,12)}],[u.nextCourse,1,()=>{reward(c,30,12);startRun()}]]);
}
function failRun(){
 if(RUN.done)return;RUN.done="fail";RUN.keys={l:0,r:0,j:0};
 const c=RUN.coins,w=RUN.word,u=t();
 if(STAGE){runResult(`<div class="big">💫</div><h3>${u.failT}</h3>`,[[K("Map","지도"),0,()=>{closeRun();stageFinish(false,0,true)}],[u.retry,1,()=>startRun(w)]]);return}
 runResult(`<div class="big">💫</div><h3>${u.failT}</h3><p>${u.rew(c,5,0)}</p>`,
  [[u.backIsland,0,()=>{closeRun();reward(c,5,0)}],[u.retry,1,()=>{reward(c,5,0);startRun(w)}]]);
}
function closeRun(){if(RUN)cancelAnimationFrame(RUN.raf);RUN=null;$("runOv").hidden=true;const st=$("rStage").querySelector(".rres");if(st)st.remove();renderAll()}
$("rQuit").onclick=()=>{closeRun();if(STAGE)stageFinish(false,0,true)};
$("runCv").addEventListener("pointerdown",e=>{
 if(!RUN||RUN.done||!G.easy)return;e.preventDefault();
 const r=$("runCv").getBoundingClientRect(),sc=r.height/(ROWS*T),wx=(e.clientX-r.left)/sc+RUN.cam,wy=(e.clientY-r.top)/sc,cx=Math.floor(wx/T);
 const pickB=[cx,cx-1,cx+1].find(x=>tileAt(x,4)==="L"&&RUN.meta[x+",4"]&&RUN.meta[x+",4"].g===RUN.cur&&Math.abs((x+.5)*T-wx)<T*.8);
 if(pickB!==undefined&&wy<6.2*T){RUN.goal=pickB;return}
 RUN.keys.j=1;setTimeout(()=>{if(RUN)RUN.keys.j=0},320);
});
document.querySelectorAll(".pbtn2").forEach(b=>{
 const k=b.dataset.k,on=v=>{if(RUN&&!RUN.done)RUN.keys[k]=v;b.classList.toggle("on",!!v)};
 b.addEventListener("pointerdown",e=>{e.preventDefault();try{b.setPointerCapture(e.pointerId)}catch(_){}on(1)});
 ["pointerup","pointercancel","lostpointercapture"].forEach(ev=>b.addEventListener(ev,()=>on(0)));
 b.addEventListener("contextmenu",e=>e.preventDefault());
});
const RK={ArrowLeft:"l",a:"l",A:"l",ArrowRight:"r",d:"r",D:"r",ArrowUp:"j",w:"j",W:"j"," ":"j"};
document.addEventListener("keydown",e=>{if(!RUN||$("runOv").hidden||RUN.done)return;const k=RK[e.key];if(k){e.preventDefault();RUN.keys[k]=1}});
document.addEventListener("keyup",e=>{if(!RUN)return;const k=RK[e.key];if(k)RUN.keys[k]=0});

/* Hangul library: fluency games */
const K=(en,ko)=>G.lang==="ko"?ko:en;
const WORDS2=[{w:"사과",p:"🍎"},{w:"바나나",p:"🍌"},{w:"포도",p:"🍇"},{w:"딸기",p:"🍓"},{w:"수박",p:"🍉"},{w:"당근",p:"🥕"},{w:"우유",p:"🥛"},{w:"김밥",p:"🍙"},{w:"계란",p:"🥚"},{w:"케이크",p:"🎂"},
 {w:"고양이",p:"🐱"},{w:"강아지",p:"🐶"},{w:"토끼",p:"🐰"},{w:"호랑이",p:"🐯"},{w:"거북이",p:"🐢"},{w:"코끼리",p:"🐘"},{w:"기린",p:"🦒"},{w:"원숭이",p:"🐵"},{w:"병아리",p:"🐤"},{w:"나비",p:"🦋"},
 {w:"꽃",p:"🌸"},{w:"나무",p:"🌳"},{w:"바다",p:"🌊"},{w:"우산",p:"☂️"},{w:"눈사람",p:"⛄"},{w:"별",p:"⭐"},{w:"달",p:"🌙"},{w:"해",p:"☀️"},{w:"무지개",p:"🌈"},{w:"구름",p:"☁️"},
 {w:"자동차",p:"🚗"},{w:"기차",p:"🚂"},{w:"비행기",p:"✈️"},{w:"자전거",p:"🚲"},{w:"집",p:"🏠"},{w:"학교",p:"🏫"},{w:"책",p:"📚"},{w:"연필",p:"✏️"},{w:"가방",p:"🎒"},{w:"신발",p:"👟"},
 {w:"모자",p:"🧢"},{w:"안경",p:"👓"},{w:"시계",p:"⏰"},{w:"공",p:"⚽"},{w:"풍선",p:"🎈"},{w:"선물",p:"🎁"},{w:"음악",p:"🎵"},{w:"편지",p:"✉️"},{w:"열쇠",p:"🔑"},{w:"양말",p:"🧦"}];
const FILLS=[
 {s:"토끼가 당근을 ___.",a:"먹어요",o:["마셔요","입어요"]},{s:"하늘___ 별이 반짝여요.",a:"에",o:["을","가"]},{s:"강아지___ 멍멍 짖어요.",a:"가",o:["를","에"]},
 {s:"나는 우유___ 마셔요.",a:"를",o:["가","에"]},{s:"비가 와서 ___을 써요.",a:"우산",o:["양말","연필"]},{s:"아침에 일어나서 이를 ___.",a:"닦아요",o:["먹어요","읽어요"]},
 {s:"도서관에서 책을 ___.",a:"읽어요",o:["던져요","마셔요"]},{s:"물고기는 물속에서 ___.",a:"헤엄쳐요",o:["날아요","걸어요"]},{s:"새는 하늘을 ___.",a:"날아요",o:["헤엄쳐요","굴러요"]},
 {s:"밤이 되면 하늘에 ___이 떠요.",a:"달",o:["해","비"]},{s:"엄마___ 함께 시장에 가요.",a:"와",o:["를","가"]},{s:"친구에게 선물___ 주었어요.",a:"을",o:["이","에"]},
 {s:"날씨가 추워서 ___을 껴요.",a:"장갑",o:["우산","안경"]},{s:"동생___ 울어서 안아 주었어요.",a:"이",o:["을","에"]},{s:"꽃에서 좋은 냄새___ 나요.",a:"가",o:["를","에"]},
 {s:"공원에서 자전거를 ___.",a:"타요",o:["먹어요","입어요"]},{s:"배가 고파서 밥을 ___.",a:"먹어요",o:["자요","씻어요"]},{s:"밖에서 놀고 와서 손을 ___.",a:"씻어요",o:["먹어요","읽어요"]},
 {s:"호랑이는 ___ 소리로 어흥 울어요.",a:"큰",o:["작은","조용한"]},{s:"학교에 가려고 ___을 메요.",a:"가방",o:["모자","양말"]}];
const PASSAGES=[
 {id:"p1",lv:1,hero:"rat",t:{en:"Volt Rat Sets Off",ko:"번개 쥐의 출발"},s:["번개 쥐는 / 아주 빨라요.","숲으로 / 쌩쌩 달려가요.","도깨비가 / 글자를 / 가져갔어요.","번개 쥐가 / 찾으러 가요!"],
  n:{"숲으로":"수프로","가져갔어요":"가저가써요","찾으러":"차즈러"}},
 {id:"p2",lv:1,hero:"sheep",t:{en:"Cloud Sheep's Nap",ko:"구름 양의 낮잠"},s:["구름 양은 / 하늘을 / 좋아해요.","폭신폭신한 / 구름 위에서 / 낮잠을 자요.","그때 / 바람이 / 휙 불었어요.","\"어? / 내 글자가 / 날아가요!\""],
  n:{"하늘을":"하느를","좋아해요":"조아해요","낮잠을":"낟짜믈","불었어요":"부러써요","날아가요":"나라가요"}},
 {id:"p3",lv:2,hero:"ox",t:{en:"Iron Ox Finds a Letter",ko:"강철 소와 반짝이는 글자"},s:["강철 소는 / 힘이 / 아주 세요.","커다란 바위도 / 번쩍 들어요.","바위 밑에서 / 반짝이는 글자를 / 찾았어요.","\"와, / 기역이다!\"","강철 소는 / 글자를 / 주머니에 / 쏙 넣었어요."],
  n:{"힘이":"히미","들어요":"드러요","밑에서":"미테서","반짝이는":"반짜기는","찾았어요":"차자써요","기역이다":"기여기다","넣었어요":"너어써요"}},
 {id:"p4",lv:2,hero:"rabbit",t:{en:"Moon Rabbit Listens",ko:"달빛 토끼의 큰 귀"},s:["달빛 토끼는 / 밤에 / 깡충깡충 뛰어요.","동그란 달이 / 길을 / 비춰 줘요.","토끼는 / 귀가 커서 / 작은 소리도 / 잘 들어요.","\"쉿! / 저기 / 도깨비가 / 있어요.\""],
  n:{"밤에":"바메","달이":"다리","길을":"기를","작은":"자근","들어요":"드러요","있어요":"이써요"}},
 {id:"p5",lv:3,hero:"tiger",t:{en:"Captain Tiger's Party",ko:"대장 호랑이의 잔치"},s:["대장 호랑이가 / 맛있는 국물을 / 먹고 있었어요.","그때 / 친구들이 / 같이 놀자고 / 불렀어요.","호랑이는 / 신나는 음악을 / 틀었어요.","모두 함께 / 춤을 추며 / 웃었어요."],
  n:{"맛있는":"마신는","국물을":"궁무를","있었어요":"이써써요","같이":"가치","불렀어요":"불러써요","음악을":"으마글","틀었어요":"트러써요","웃었어요":"우서써요","춤을":"추믈"}},
 {id:"p6",lv:3,hero:"rooster",t:{en:"Dawn Rooster's Call",ko:"새벽 닭의 외침"},s:["새벽 닭이 / 꼬끼오 하고 / 울었어요.","해님이 / 산 너머로 / 얼굴을 내밀었어요.","\"일어나요, / 친구들! / 오늘은 / 글자를 / 모두 되찾는 날이에요!\"","열두 영웅이 / 힘차게 / 출발했어요."],
  n:{"닭이":"달기","울었어요":"우러써요","얼굴을":"얼구를","내밀었어요":"내미러써요","되찾는":"되찬는","날이에요":"나리에요","영웅이":"영웅이","출발했어요":"출발해써요"}}];
const ZOD=["rat","ox","tiger","rabbit","dragon","snake","horse","sheep","monkey","rooster","dog","pig"];
const ZODK={rat:"쥐",ox:"소",tiger:"호랑이",rabbit:"토끼",dragon:"용",snake:"뱀",horse:"말",sheep:"양",monkey:"원숭이",rooster:"닭",dog:"개",pig:"돼지"};
const sylCount=s=>(s.match(/[가-힣]/g)||[]).length;
const clean=w=>w.replace(/[.,!?"“”'‘’]/g,"");
function wordDistract(w,pool){const near=shuffle(pool.filter(x=>x!==w&&(x.w[0]===w.w[0]||x.w.length===w.w.length)));const rest=shuffle(pool.filter(x=>x!==w&&!near.includes(x)));return [...near,...rest].slice(0,2)}
let LIB=null;
function librarySVG(){
 const u="l"+(++svgN),O=OL;
 return `<svg viewBox="0 -14 100 144" aria-hidden="true">${artDefs(u)}<ellipse cx="50" cy="122" rx="38" ry="4" fill="rgba(0,0,0,.22)"/>
 <path ${O} d="M14 60 L86 60 L86 120 L14 120Z" fill="#F3E2C7"/><path d="M62 60 L86 60 L86 120 L62 120Z" fill="#D9C3A0"/>
 <path ${O} d="M8 62 L50 26 L92 62Z" fill="#3D63D9"/><path d="M50 26 L92 62 L70 62Z" fill="#2B4AB0"/>
 <rect ${O} x="40" y="88" width="20" height="32" rx="2" fill="url(#wd${u})"/><circle cx="56" cy="104" r="1.6" fill="#FFC23D"/>
 <rect ${O} x="20" y="74" width="14" height="14" fill="#9FE8FF"/><rect ${O} x="66" y="74" width="14" height="14" fill="#9FE8FF"/>
 <path ${O} d="M32 38 L50 44 L68 38 L68 56 L50 62 L32 56Z" fill="#fff"/><path d="M50 44 L50 62" stroke="#1B2233" stroke-width="1.3"/>
 <text x="41" y="54" text-anchor="middle" font-family="Jua, sans-serif" font-size="9" fill="#E8573A">가</text><text x="59" y="54" text-anchor="middle" font-family="Jua, sans-serif" font-size="9" fill="#3D63D9">나</text></svg>`;
}
function libStop(){if(!LIB)return;LIB.dead=true;clearInterval(LIB.timer);cancelAnimationFrame(LIB.raf);try{speechSynthesis.cancel()}catch(e){}}
function openLib(){pgHub()}
function closeLib(){libStop();LIB=null;$("libOv").hidden=true;renderAll()}
function libHead(title,back){
 return `<div class="libhead">${back?`<button class="btn" id="libBack">← ${K("Playground","놀이터")}</button>`:""}<h2>${title}</h2><button class="btn" id="libClose">${K("Close","닫기")}</button></div>`;
}
function libWire(){const ex=()=>{libStop();LIB=null;$("libOv").hidden=true;stageFinish(false,0,true)};const b=$("libBack");if(b)b.onclick=()=>{if(STAGE)return ex();libStop();LIB=null;libMenu()};$("libClose").onclick=()=>{if(STAGE)return ex();closeLib()}}
function libMenu(){libStop();LIB=null;$("libOv").hidden=true;pgHub()}
/* --- read-along theatre (repeated reading) --- */
function rrList(){
 G.flu=G.flu||{};
 $("libCard").innerHTML=libHead(K("Read-Along Theatre","따라 읽기 극장"),1)+
  `<p class="rule">${K("How it works: 1) listen to the story, 2) read it together phrase by phrase, 3) read it alone three times. A grown-up taps any word the reader stumbles on.","방법: ① 이야기를 들어요 ② 한 부분씩 같이 읽어요 ③ 혼자 세 번 읽어요. 어른이 옆에서 더듬은 낱말을 눌러 표시해 주세요.")}</p>
  <div class="libgrid">${PASSAGES.map(p=>{const f=G.flu[p.id];return `<button class="libcard" data-id="${p.id}"><span class="sp" style="width:54px;height:72px;flex:none">${heroArt(p.hero)}</span><span><b>${L(p.t)}</b><small>${K("Level","단계")} ${p.lv} · ${sylCount(p.s.join(""))} ${K("syllables","음절")}</small>${f?`<span class="ltag">${K("Best","최고")} ${f.best} ${K("syl/min","음절/분")}</span>`:""}</span></button>`}).join("")}</div>`;
 libWire();
 $("libCard").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>rrStart(b.dataset.id));
}
function rrStart(id){libStop();const P=PASSAGES.find(p=>p.id===id);LIB={mode:"rr",P,step:0,ph:0,reads:[],miss:new Set(),hint:false,running:false};rrRender();if(G.easy)sayUI("First, let's listen to the story. Press play!","먼저 이야기를 들어 보자. 재생 버튼을 눌러 봐!")}
function rrPhrases(){return LIB.P.s.flatMap(x=>x.split(" / "))}
function rrSentPh(){let k=0;return LIB.P.s.map(x=>{const n=x.split(" / ").length,a=Array.from({length:n},(_,j)=>k+j);k+=n;return a})}
function rrPassageHTML(){
 let pi=0,wi=0;
 return `<div class="psg${LIB.hint?" hint":""}">${LIB.P.s.map(sent=>`<span class="sent">${sent.split(" / ").map(ph=>{const i=pi++;return `<span class="ph" data-p="${i}">${ph.split(" ").map(w=>{const k=wi++,n=LIB.P.n[clean(w)];return `<span class="wd${LIB.miss.has(k)?" miss":""}" data-w="${k}">${w}${n&&LIB.hint?`<small class="pron">[${n}]</small>`:""}</span>`}).join(" ")}</span>`}).join('<span class="sep">/</span>')}</span>`).join("")}</div>`;
}
function speakSeq(list,each,done,gap){
 let i=0;const run=LIB;
 const nx=()=>{if(LIB!==run||run.dead)return;if(i>=list.length){done&&done();return}each&&each(i);const txt=list[i++];let fired=false;
  const go=()=>{if(fired)return;fired=true;setTimeout(nx,gap||280)};
  try{const ut=utter(txt,{who:"learn",rate:.9});ut.onend=go;ut.onerror=go;speechSynthesis.speak(ut)}catch(e){}
  setTimeout(go,1200+sylCount(txt)*420)};
 VO.tok++;vTalk(false);try{speechSynthesis.cancel()}catch(e){}nx();
}
function rrRender(){
 const S=LIB,P=S.P,names=[K("Listen","듣기"),K("Together","같이 읽기"),K("Alone 1","혼자 1"),K("Alone 2","혼자 2"),K("Alone 3","혼자 3"),K("Results","결과")];
 let ctl="",tip="";
 if(S.step===0){tip=K("Listen first. Follow the yellow highlight with your finger.","먼저 들어요. 노란색으로 빛나는 부분을 손가락으로 따라가요.");ctl=`<button class="btn pri" id="rrPlay">▶ ${K("Play the story","이야기 듣기")}</button><button class="btn" id="rrNext">${K("Next: read together","다음: 같이 읽기")} →</button>`}
 else if(S.step===1){tip=K("Tap 🔊 to hear the yellow part, then say it back. Then go to the next part.","🔊를 눌러 노란 부분을 듣고 똑같이 따라 읽어요. 그다음 부분으로 넘어가요.");const last=S.ph>=rrPhrases().length-1;
  ctl=`<button class="btn" id="rrSay">🔊 ${K("Hear this part","이 부분 듣기")}</button>${last?`<button class="btn pri" id="rrNext">${K("Start reading alone","혼자 읽기 시작")} →</button>`:`<button class="btn pri" id="rrPh">${K("Next part","다음 부분")} →</button>`}`}
 else if(S.step<=4){const n=S.step-1;tip=S.running?K("Reading… Grown-up: tap any word they stumble on.","읽는 중… 어른은 더듬은 낱말을 눌러 표시해 주세요."):K(`Read the whole story aloud by yourself (read ${n} of 3). Press Start, then read.`,`혼자 소리 내어 끝까지 읽어요 (${n}/3번째). 시작을 누르고 읽어요.`);
  ctl=S.running?`<span class="rrtime" id="rrTime">0.0s</span><button class="btn pri" id="rrStop">${K("Finished!","다 읽었어요!")}</button>`:`<button class="btn pri" id="rrGo">▶ ${K("Start","시작")}</button>`}
 else{ctl=`<button class="btn" id="rrAgain">${K("Read again","다시 읽기")}</button><button class="btn pri" id="rrDone">${K("Collect reward","보상 받기")}</button>`}
 let res="";
 if(S.reads.length){const max=Math.max(...S.reads.map(r=>r.spm),1);
  res=`<div><div class="bars">${S.reads.map(r=>`<div style="height:${Math.max(8,r.spm/max*110)}px"><span>${r.spm}</span></div>`).join("")}</div><div class="barl">${S.reads.map((r,i)=>`<span>${K(["1st","2nd","3rd"][i],(i+1)+"번째")}<br>${r.sec.toFixed(1)}s · ${r.miss}${K(" slips","개")}</span>`).join("")}</div><p class="rule">${K("Bars show syllables per minute (higher = smoother).","막대는 1분당 읽은 음절 수예요 (높을수록 매끄러워요).")}</p></div>`;
  if(S.step===5){const a=S.reads[0].spm,b=S.reads[S.reads.length-1].spm,gain=a?Math.round((b-a)/a*100):0;const missW=[...new Set([...S.missWords])];
   res+=`<p class="cmsg">${gain>0?K(`${gain}% faster than the first read! 🎉`,`첫 번째보다 ${gain}% 빨라졌어요! 🎉`):K("Great reading! Try again tomorrow to get smoother.","잘 읽었어요! 내일 다시 읽으면 더 매끄러워져요.")}</p>`+
    (missW.length?`<p class="rule">${K("Practise these words (tap to hear):","이 낱말들을 연습해요 (누르면 들려요):")}</p><div class="fopts">${missW.map(w=>`<button class="fo sm" data-say="${clean(w)}">${clean(w)}</button>`).join("")}</div>`:"")}}
 $("libCard").innerHTML=libHead(L(P.t),1)+`<div class="steps">${names.map((n,i)=>`<span class="${i===S.step?"on":i<S.step?"ok":""}">${n}</span>`).join("")}</div>
  <div class="rrtools"><label class="rule"><input type="checkbox" id="rrHint" ${S.hint?"checked":""}> ${K("Show how words sound [ ]","소리 나는 대로 보기 [ ]")}</label></div>
  ${rrPassageHTML()}<p class="cmsg">${tip}</p><div class="rrbar">${ctl}</div>${res}`;
 libWire();
 const hl=i=>{document.querySelectorAll(".psg .ph").forEach(e=>e.classList.toggle("on",+e.dataset.p===i))};
 const sp=rrSentPh(),hlS=si=>{const a=sp[si]||[];document.querySelectorAll(".psg .ph").forEach(e=>e.classList.toggle("on",a.includes(+e.dataset.p)))},whole=si=>P.s[si].replace(/ \/ /g," ");
 if(S.step===1)hl(S.ph);
 $("rrHint").onchange=e=>{S.hint=e.target.checked;rrRender()};
 const q=id=>$(id);
 if(q("rrPlay"))q("rrPlay").onclick=()=>speakSeq(P.s.map((x,i)=>whole(i)),hlS,()=>hl(-1),vGap());
 if(q("rrSay"))q("rrSay").onclick=()=>speakSeq([rrPhrases()[S.ph]],()=>hl(S.ph));
 if(q("rrPh"))q("rrPh").onclick=()=>{const si=sp.findIndex(a=>a.includes(S.ph)),end=sp[si]&&sp[si].length>1&&sp[si][sp[si].length-1]===S.ph;S.ph++;rrRender();
  if(end)speakSeq([whole(si),rrPhrases()[S.ph]],k=>{const a=sp[si];document.querySelectorAll(".psg .ph").forEach(e=>e.classList.toggle("on",k===0?a.includes(+e.dataset.p):+e.dataset.p===S.ph))},null,vGap());else speakSeq([rrPhrases()[S.ph]],()=>hl(S.ph))};
 if(q("rrNext"))q("rrNext").onclick=()=>{hush();const was=S.step;S.step++;S.ph=0;rrRender();if(S.step===1)speakSeq([rrPhrases()[0]],()=>hl(0));else if(was===1){const li=P.s.length-1;if(P.s[li].includes(" / "))speakSeq([whole(li)],null,null,vGap())}};
 if(q("rrGo"))q("rrGo").onclick=()=>{S.running=true;S.miss=new Set();S.t0=performance.now();rrRender();S.timer=setInterval(()=>{const e=$("rrTime");if(e)e.textContent=((performance.now()-S.t0)/1000).toFixed(1)+"s"},100)};
 if(q("rrStop"))q("rrStop").onclick=()=>{clearInterval(S.timer);S.running=false;const sec=Math.max(1,(performance.now()-S.t0)/1000),syl=sylCount(P.s.join(""));
  const words=P.s.join(" ").replace(/ \/ /g," ").split(" ");S.missWords=S.missWords||[];S.miss.forEach(k=>S.missWords.push(words[k]));
  S.reads.push({sec,spm:Math.round(syl/sec*60),miss:S.miss.size});S.step++;sfx("ok");if(S.step===5)rrSave();rrRender()};
 if(S.running)document.querySelectorAll(".psg .wd").forEach(e=>e.onclick=()=>{const k=+e.dataset.w;S.miss.has(k)?S.miss.delete(k):S.miss.add(k);e.classList.toggle("miss")});
 document.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
 if(q("rrAgain"))q("rrAgain").onclick=()=>rrStart(P.id);
 if(q("rrDone"))q("rrDone").onclick=()=>{const n=S.reads.length;if(STAGE){const a=S.reads[0].spm,b=S.reads[n-1].spm,g=a?(b-a)/a*100:0;libStop();LIB=null;$("libOv").hidden=true;stageFinish(true,g>=10?3:g>0?2:1);return}libStop();LIB=null;rrList();reward(10+n*8,10+n*6,n*4)};
}
function rrSave(){const S=LIB,f=G.flu[S.P.id]||{best:0,sessions:0,log:[]};const best=Math.max(...S.reads.map(r=>r.spm));f.best=Math.max(f.best,best);f.sessions++;f.log.push({d:new Date().toISOString().slice(0,10),spm:best});f.log=f.log.slice(-20);G.flu[S.P.id]=f;save()}
const FILLS_E=[{s:"🐶 강아지가 ___ 짖어요.",a:"멍멍",o:["야옹"]},{s:"🐱 고양이가 ___ 울어요.",a:"야옹",o:["꼬끼오"]},{s:"🐔 닭이 ___ 울어요.",a:"꼬끼오",o:["멍멍"]},
 {s:"🐯 호랑이가 ___ 소리쳐요.",a:"어흥",o:["음매"]},{s:"🐮 소가 ___ 울어요.",a:"음매",o:["꿀꿀"]},{s:"🐷 돼지가 ___ 울어요.",a:"꿀꿀",o:["어흥"]},
 {s:"🍎 빨간 ___를 먹어요.",a:"사과",o:["우유"]},{s:"🥛 하얀 ___를 마셔요.",a:"우유",o:["사과"]},{s:"☂️ 비가 와서 ___을 써요.",a:"우산",o:["양말"]},
 {s:"🚲 공원에서 ___를 타요.",a:"자전거",o:["연필"]},{s:"🌙 밤하늘에 ___이 떠요.",a:"달",o:["해"]},{s:"🐟 물고기는 물에서 ___.",a:"헤엄쳐요",o:["날아요"]},
 {s:"🐦 새는 하늘을 ___.",a:"날아요",o:["헤엄쳐요"]},{s:"📚 도서관에서 책을 ___.",a:"읽어요",o:["마셔요"]},{s:"🧼 밥 먹기 전에 손을 ___.",a:"씻어요",o:["읽어요"]},
 {s:"⛄ 겨울에 ___을 만들어요.",a:"눈사람",o:["수박"]},{s:"🍉 여름에 시원한 ___을 먹어요.",a:"수박",o:["눈사람"]},{s:"😴 밤이 되면 침대에서 ___.",a:"자요",o:["달려요"]}];
/* --- zodiac puzzle --- */
function pzStart(hide){libStop();LIB={mode:"pz",placed:{},sel:null,order:shuffle(ZOD.slice()),hide:!!hide,miss:0};pzRender();sayUI("Tap a hero, then tap its name!","영웅을 누르고, 그 이름 칸을 눌러 봐!")}
function pzRender(){
 const S=LIB,doneAll=ZOD.every(z=>S.placed[z]);
 $("libCard").innerHTML=libHead(K("Zodiac Puzzle","십이지 퍼즐"),1)+
  `<p class="rule">${S.hide?K("Hard mode: names are hidden. Put the heroes in zodiac order from 1 to 12.","어려움: 이름이 숨겨져 있어요. 1번부터 12번까지 십이지 순서대로 놓아요."):K("Tap a hero below, then tap the box with that animal's name.","아래에서 영웅을 누르고, 그 동물 이름이 적힌 칸을 눌러요.")}</p>
  <div class="zgrid">${ZOD.map((z,i)=>`<button class="zslot${S.placed[z]?" done":""}" data-z="${z}"><span class="num">${i+1}</span>${S.placed[z]?`<span class="sp">${heroArt(z)}</span>`:""}<span class="nm">${S.hide&&!S.placed[z]?"?":ZODK[z]}</span></button>`).join("")}</div>
  ${doneAll?`<div class="tbtns"><p class="cmsg">${K("Zodiac complete! 🎉","십이지 완성! 🎉")}</p><button class="btn" id="pzSay">🔊 ${K("Hear the order","순서 들어 보기")}</button>${STAGE?"":`<button class="btn" id="pzHard">${K("Hard mode","어려움 모드")}</button>`}<button class="btn pri" id="pzDone">${K("Collect reward","보상 받기")}</button></div>`
   :`<div class="ztray">${S.order.filter(z=>!S.placed[z]).map(z=>`<button class="ztile" data-t="${z}" aria-pressed="${S.sel===z}" aria-label="hero">${heroArt(z)}</button>`).join("")}</div>`}`;
 libWire();
 document.querySelectorAll(".ztile").forEach(b=>b.onclick=()=>{S.sel=b.dataset.t;sfx("tap");pzRender();if(G.easy)say(ZODK[S.sel])});
 document.querySelectorAll(".zslot").forEach(b=>b.onclick=()=>{
  const z=b.dataset.z;if(S.placed[z]||!S.sel)return;
  if(S.sel===z){S.placed[z]=1;S.sel=null;sfx("ok");say(ZODK[z]);pzRender();if(ZOD.every(q=>S.placed[q]))setTimeout(()=>speakSeq(ZOD.map(q=>ZODK[q])),500)}
  else{S.miss++;sfx("bad");say(ZODK[z]);b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);if(G.easy){const c=document.querySelector(`.zslot[data-z="${S.sel}"]`);if(c)c.classList.add("hintp");const sn=S.sel;setTimeout(()=>{if(LIB===S&&S.sel===sn)say(ZODK[sn])},1000)}}
 });
 if(doneAll){$("pzSay").onclick=()=>speakSeq(ZOD.map(q=>ZODK[q]));if($("pzHard"))$("pzHard").onclick=()=>pzStart(true);$("pzDone").onclick=()=>{const c=S.hide?40:25,m=S.miss;libStop();LIB=null;if(STAGE){$("libOv").hidden=true;stageFinish(true,m===0?3:m<=3?2:1);return}libMenu();reward(c,20,8)}}
}

const VLINES={narrator:["안녕, 친구들. 오늘도 한글 섬으로 가 볼까요?","그림을 잘 보세요. 그리고 맞는 글자를 골라 보세요.","잘했어요. 한 글자씩, 천천히 읽었어요."],
 mentor:["어서 오렴. 기다리고 있었단다.","먼저 듣고. 그다음에 고르렴.","괜찮단다. 다시 해 보면 된단다."],
 rat:["안녕! 나는 쥐야. 저기 반짝이는 거 봤어?","어? 이 소리는 뭘까? 잘 들어 봐!","찾았다! 너 정말 빠르다!"],
 ox:["음~ 안녕. 나는 소야. 천천히 가자.","서두르지 않아도 돼. 한 글자씩 읽어 볼까?","든든하다! 아주 잘했어."],
 tiger:["안녕, 친구! 나는 대장 호랑이야!","그림을 보고, 맞는 낱말을 찾아보자!","좋았어! 우리 같이 해냈어!"],
 rabbit:["안녕~ 나는 토끼야. 만나서 반가워!","하트 화살로 맞는 글자를 맞혀 보자~","깡충! 정말 잘했어~"],
 dragon:["반가워. 나는 용이란다. 여의주가 반짝이는구나.","두 소리를 모으면, 새 글자가 태어난단다.","멋져. 꿈을 향해 한 걸음 더 갔어."],
 snake:["안녕. 나는 뱀이야. 수수께끼 좋아해?","잘 생각해 보면 보여. 어떤 글자가 진짜일까?","정답이야. 차분하게 잘 찾았어."],
 horse:["안녕! 나는 말이야. 다그닥, 출발 준비 됐어?","천천히 보자. 이 낱말의 빈칸은 뭘까?","히힝! 끝까지 달렸어!"],
 sheep:["안녕. 나는 양이야. 같이 있으면 포근해.","괜찮아. 천천히 읽고 골라 보자.","정말 잘했어. 내가 옆에서 다 봤어."],
 monkey:["짠! 나는 원숭이야. 같이 놀자!","우끼! 이 글자를 소리 내어 읽어 볼까?","우끼끼! 한 번 더 해 볼까?"],
 rooster:["안녕! 나는 닭이야. 아침을 여는 친구지.","하나, 둘, 셋. 이 문장을 처음부터 읽어 보자.","정확해! 아주 또렷하게 읽었어."],
 dog:["안녕! 나는 개야. 너를 만나서 정말 반가워!","같이 찾아보자! 이 그림은 무슨 낱말일까?","와! 우리가 같이 찾았다!"],
 pig:["꿀꿀~ 안녕! 나는 돼지야.","편하게 해 보자~ 맞는 글자를 콕!","꿀꿀! 해냈다! 정말 기분 좋다~"]};
const VL=(who,i)=>(VLINES[who]||VLINES.narrator)[i];
function charSay(who,i,done){narrate([VL(who,i)],done,"ko",{voice:who})}
/* duel battle v2: weapons + Hangul energy */
const DA={"hs":{"rat":"assets/img/hero/rat.webp","ox":"assets/img/hero/ox.webp","tiger":"assets/img/hero/tiger.webp","rabbit":"assets/img/hero/rabbit.webp","dragon":"assets/img/hero/dragon.webp","snake":"assets/img/hero/snake.webp","horse":"assets/img/hero/horse.webp","sheep":"assets/img/hero/sheep.webp","monkey":"assets/img/hero/monkey.webp","rooster":"assets/img/hero/rooster.webp","dog":"assets/img/hero/dog.webp","pig":"assets/img/hero/pig.webp"},"vh":{"black":"assets/img/villain/black_head.webp"},"mentor":"assets/img/hero/mentor.webp","card":{"rat_atk":"assets/img/card/rat_atk.webp","rat_def":"assets/img/card/rat_def.webp","ox_atk":"assets/img/card/ox_atk.webp","ox_def":"assets/img/card/ox_def.webp","tiger_atk":"assets/img/card/tiger_atk.webp","tiger_def":"assets/img/card/tiger_def.webp","rabbit_atk":"assets/img/card/rabbit_atk.webp","rabbit_def":"assets/img/card/rabbit_def.webp","dragon_atk":"assets/img/card/dragon_atk.webp","dragon_def":"assets/img/card/dragon_def.webp","snake_atk":"assets/img/card/snake_atk.webp","snake_def":"assets/img/card/snake_def.webp","horse_atk":"assets/img/card/horse_atk.webp","horse_def":"assets/img/card/horse_def.webp","sheep_atk":"assets/img/card/sheep_atk.webp","sheep_def":"assets/img/card/sheep_def.webp","monkey_atk":"assets/img/card/monkey_atk.webp","monkey_def":"assets/img/card/monkey_def.webp","dog_atk":"assets/img/card/dog_atk.webp","dog_def":"assets/img/card/dog_def.webp","pig_atk":"assets/img/card/pig_atk.webp","pig_def":"assets/img/card/pig_def.webp","mentor_atk":"assets/img/card/mentor_atk.webp","mentor_def":"assets/img/card/mentor_def.webp","v_black_atk":"assets/img/card/v_black_atk.webp","v_black_def":"assets/img/card/v_black_def.webp","v_white_atk":"assets/img/card/v_white_atk.webp","v_white_def":"assets/img/card/v_white_def.webp","v_tiger_atk":"assets/img/card/v_tiger_atk.webp","v_tiger_def":"assets/img/card/v_tiger_def.webp","v_gray_atk":"assets/img/card/v_gray_atk.webp","v_gray_def":"assets/img/card/v_gray_def.webp","v_fat_atk":"assets/img/card/v_fat_atk.webp","v_fat_def":"assets/img/card/v_fat_def.webp","v_purple_atk":"assets/img/card/v_purple_atk.webp","v_purple_def":"assets/img/card/v_purple_def.webp"},"vb":{"white":"assets/img/villain/white.webp","tiger":"assets/img/villain/tiger.webp","gray":"assets/img/villain/gray.webp","purple":"assets/img/villain/purple.webp","fat":"assets/img/villain/fat.webp"}};
const WEAP={
 rat:{w:{en:"Lightning Dagger",ko:"번개 단검"},e:"🗡️",how:{en:"quick combo strikes",ko:"빠른 연속 공격"},atk:{en:"Energy Bolt",ko:"에너지 볼트"},def:{en:"Speed Shield",ko:"스피드 실드"}},
 ox:{w:{en:"Earth Hammer",ko:"대지의 망치"},e:"🔨",how:{en:"ground-shaking shockwaves",ko:"땅을 울리는 충격파"},atk:{en:"Power Punch",ko:"파워 펀치"},def:{en:"Iron Guard",ko:"철벽 가드"}},
 tiger:{w:{en:"Tiger Claw Gauntlets",ko:"호랑이 발톱 건틀릿"},e:"🥊",how:{en:"mighty close-up punches",ko:"강력한 근접 펀치"},atk:{en:"Tiger Strike",ko:"타이거 스트라이크"},def:{en:"Guard Barrier",ko:"보호막"}},
 rabbit:{w:{en:"Heart Bow",ko:"하트 활"},e:"🏹",how:{en:"arrows of light from afar",ko:"멀리서 쏘는 빛 화살"},atk:{en:"Pink Heart Beam",ko:"핑크 하트 빔"},def:{en:"Healing Shield",ko:"치유 실드"}},
 dragon:{w:{en:"Dragon Pearl Staff",ko:"여의주 지팡이"},e:"🪄",how:{en:"dragon-energy magic",ko:"용의 기운으로 쓰는 마법"},atk:{en:"Dragon Flame",ko:"드래곤 플레임"},def:{en:"Dragon Scale Guard",ko:"용의 비늘 방어"}},
 snake:{w:{en:"Illusion Orb",ko:"환영 구슬"},e:"🔮",how:{en:"illusions that confuse",ko:"적을 헷갈리게 하는 환영"},atk:{en:"Venom Spike",ko:"독 스파이크"},def:{en:"Mirror Double",ko:"환영 분신"}},
 horse:{w:{en:"Flame Spear",ko:"화염 창"},e:"🔱",how:{en:"charging attacks",ko:"힘차게 돌진하는 공격"},atk:{en:"Dash Kick",ko:"질주 킥"},def:{en:"Dash Guard",ko:"질주 가드"}},
 sheep:{w:{en:"Crystal Shield",ko:"수정 방패"},e:"🛡️",how:{en:"shields that protect friends",ko:"친구를 지키는 보호막"},atk:{en:"Healing Breeze",ko:"힐링 바람"},def:{en:"Guard Aura",ko:"보호 오라"}},
 monkey:{w:{en:"Golden Nunchucks",ko:"황금 쌍절곤"},e:"🌀",how:{en:"fast combo hits",ko:"빠른 콤보 타격"},atk:{en:"Banana Spin",ko:"바나나 스핀"},def:{en:"Quick Dodge",ko:"기민한 회피"}},
 rooster:{w:{en:"Light Feather Sword",ko:"빛의 깃털 검"},e:"🪶",how:{en:"precise slashes of light",ko:"정확한 빛의 참격"},atk:{en:"Light Slash",ko:"빛의 참격"},def:{en:"Feather Shield",ko:"깃털 방패"}},
 dog:{w:{en:"Guardian Boomerang",ko:"수호 부메랑"},e:"🪃",how:{en:"chases and comes back",ko:"쫓아가서 돌아오는 공격"},atk:{en:"Loyal Charge",ko:"충성의 돌진"},def:{en:"Guardian Barricade",ko:"수호의 바리케이드"}},
 pig:{w:{en:"Bubble Cannon",ko:"거품 대포"},e:"🫧",how:{en:"hits many targets at once",ko:"여러 적을 한꺼번에"},atk:{en:"Water Cannon",ko:"물대포"},def:{en:"Bubble Shield",ko:"거품 방어막"}}};
const VSK={black:{atk:{en:"Shadow Pounce",ko:"그림자 습격"},def:{en:"Shadow Double",ko:"그림자 분신"}},white:{atk:{en:"Frost Claw",ko:"빙결의 발톱"},def:{en:"Ice Shield",ko:"얼음 방패"}},
 tiger:{atk:{en:"Flame Claw",ko:"화염의 발톱"},def:{en:"Flame Guard",ko:"불꽃 방어"}},gray:{atk:{en:"Stink Cloud",ko:"독 가스"},def:{en:"Smoke Screen",ko:"연막 방어"}},fat:{atk:{en:"Quake Slam",ko:"지진 강타"},def:{en:"Rock Shield",ko:"바위 보호막"}},purple:{atk:{en:"Word Swap",ko:"낱말 바꿔치기"},def:{en:"Magic Shield",ko:"마법 보호막"}}};
const TIERS={1:{en:"Beginner · find the letter",ko:"초급 · 자음·모음 찾기"},2:{en:"Middle · build letters & words",ko:"중급 · 글자 조합·낱말 완성"},3:{en:"Advanced · sentences",ko:"고급 · 문장 완성"},4:{en:"Boss battle",ko:"보스전"}};
const JC=[["ㄱ","기역"],["ㄴ","니은"],["ㄷ","디귿"],["ㄹ","리을"],["ㅁ","미음"],["ㅂ","비읍"],["ㅅ","시옷"],["ㅇ","이응"],["ㅈ","지읒"],["ㅊ","치읓"],["ㅋ","키읔"],["ㅌ","티읕"],["ㅍ","피읖"],["ㅎ","히읗"]];
const JV=[["ㅏ","아"],["ㅑ","야"],["ㅓ","어"],["ㅕ","여"],["ㅗ","오"],["ㅛ","요"],["ㅜ","우"],["ㅠ","유"],["ㅡ","으"],["ㅣ","이"]];
const JSIM={"ㄱ":"ㅋㄴ","ㅋ":"ㄱㅌ","ㄴ":"ㄷㄱ","ㄷ":"ㅌㄹ","ㅌ":"ㄷㅋ","ㄹ":"ㄷㅁ","ㅁ":"ㅂㅇ","ㅂ":"ㅍㅁ","ㅍ":"ㅂㅎ","ㅅ":"ㅈㅊ","ㅈ":"ㅊㅅ","ㅊ":"ㅈㅎ","ㅇ":"ㅎㅁ","ㅎ":"ㅇㅊ",
 "ㅏ":"ㅑㅓ","ㅑ":"ㅏㅕ","ㅓ":"ㅕㅏ","ㅕ":"ㅓㅑ","ㅗ":"ㅛㅜ","ㅛ":"ㅗㅠ","ㅜ":"ㅠㅗ","ㅠ":"ㅜㅛ","ㅡ":"ㅣㅜ","ㅣ":"ㅡㅏ"};
const LEADS="ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",MEDS="ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const sylOf=(c,v,tl=0)=>String.fromCharCode(0xAC00+(LEADS.indexOf(c)*21+MEDS.indexOf(v))*28+tl);
const sylParts=x=>{const n=x.charCodeAt(0)-0xAC00;return n<0||n>11171?null:{l:LEADS[Math.floor(n/588)],v:MEDS[Math.floor(n%588/28)],t:n%28}};
const batchim=w=>{const p=sylParts(w.slice(-1));return !!(p&&p.t)};
const eul=w=>w+(batchim(w)?"을":"를");
const iga=w=>w+(batchim(w)?"이":"가");
const eunn=w=>w+(batchim(w)?"은":"는");
const pick=a=>a[Math.floor(Math.random()*a.length)];
const WXL=[0,6,16,32];
const wXP=id=>((G.wx=G.wx||{})[id]||0);
const wLv=id=>{const x=wXP(id);let l=1;WXL.forEach((t,i)=>{if(x>=t)l=i+1});return l};
const heroBody=id=>HIMG[id]||DA.hs[id]||PORT[id];
const heroBodyHTML=id=>(HIMG[id]||DA.hs[id])?`<img class="heroimg" src="${heroBody(id)}" alt="">`:heroArt(id);
const foeHTML=(v,id)=>DA.vb[v]?`<img class="dfoe body" id="${id}" src="${DA.vb[v]}" alt="">`:DA.vh[v]?`<img class="dfoe" id="${id}" src="${DA.vh[v]}" alt="">`:`<img class="dfoe port" id="${id}" src="${PORT["v_"+v]}" alt="">`;
let DU=null;
function duel(m){
 G.wx=G.wx||{};hush();
 const id=G.char,vil=m.vil||pick(["black","gray","tiger","fat"]);
 const tier=m.tier||(m.boss?4:Math.max(1,Math.min(3,m.lv||1)));
 DU={m,id,vil,tier,boss:!!m.boss,practice:!!m.practice,need:m.boss?6:tier===1?4:5,hp:100,hearts:maxHearts(),combo:0,wrongs:0,qw:0,defUsed:false,qi:0,used:new Set(),busy:false,done:false,started:false,gain:0,lv0:wLv(id)};
 const W=WEAP[id],c=CHARS.find(x=>x.id===id),u=t();
 $("dMeFace").innerHTML=heroArt(id,1);$("dMeN").textContent=L(c.n);
 $("dFoeFace").innerHTML=vilArt(vil);$("dFoeN").textContent=L(VIL[vil].n)+(DU.boss?" 👑":"");$("dFoeL").textContent=L(VIL[vil].tr);
 $("dQuit").textContent=u.run||K("Run away","도망가기");$("dMsg").textContent="";
 $("dStage").innerHTML=`<div class="dbg" style="background-image:url(${SPLASH})"></div><div class="dground"></div><div class="daura"></div><div class="dfloor"></div>
  ${foeHTML(vil,"dFoe")}<img class="dhero" id="dHero" src="${heroBody(id)}" alt="">
  <div class="dwpn" id="dWpn" style="--wc:${HERO[id].s}"><span class="ic">${W.e}</span><span><b>${L(W.w)}</b><small id="dWLv"></small><span class="pips" id="dPips"></span></span></div>`;
 $("duelOv").hidden=false;$("dQuit").hidden=false;$("dHelp").hidden=true;$("dHelp").textContent=K("🐢 Help","🐢 도움");$("dHelp").onclick=()=>{if(DU&&DU.started&&!DU.done&&!DU.busy&&DU.q){$("dHelp").classList.remove("pulse");duMentor(true)}};duHUD();duIntro();
}
function duThr(){return wLv(DU.id)>=2?2:3}
function duHUD(){
 const l=wLv(DU.id);$("dMeL").textContent=K("Missed? Just read again","틀려도 다시 읽으면 돼요");
 $("dMeHp").style.width="100%";$("dFoeHp").style.width=Math.max(0,DU.hp)+"%";
 $("dTier").textContent=L(TIERS[DU.tier]);
 const e=$("dWLv");if(e)e.textContent=`Lv ${l}${l<4?` · ${wXP(DU.id)}/${WXL[l]}`:" MAX"}`;
 const p=$("dPips");if(p)p.innerHTML=Array.from({length:duThr()},(_,i)=>`<i class="${i<DU.combo?"on":""}"></i>`).join("");
}
function duIntro(){
 const W=WEAP[DU.id],l=wLv(DU.id);
 const unl=[K("Lv2: special move after 2 in a row","Lv2: 2번 연속 정답이면 필살기"),K("Lv3: attack power up","Lv3: 공격력 강화"),K("Lv4: full Hangul energy","Lv4: 한글 에너지 최대")];
 $("dQ").innerHTML=`<div class="dintro"><div class="wcard"><span class="ic">${W.e}</span><div><b>${L(W.w)} · Lv ${l}</b>
  <p>${K(`Attack: ${L(W.atk)} · ${L(W.how)}. Get Hangul right to charge your weapon!`,`공격: ${L(W.atk)} · ${L(W.how)}. 한글을 맞히면 무기에 한글 에너지가 모여요!`)}</p><p>${unl.map((x,i)=>i+2<=l?`✅ ${x}`:`🔒 ${x}`).join("<br>")}</p></div></div>
  ${DU.practice?`<div class="box seg" role="group">${[1,2,3,4].map(n=>`<button data-tier="${n}" aria-pressed="${DU.tier===n}">${L(TIERS[n]).split(" · ")[0]}</button>`).join("")}</div>`:""}
  <button class="btn pri sp-go" id="dGo">⚔️ ${K("Battle start!","배틀 시작!")}</button></div>`;
 document.querySelectorAll("[data-tier]").forEach(b=>b.onclick=()=>{DU.tier=+b.dataset.tier;DU.boss=DU.tier===4;DU.need=DU.boss?6:DU.tier===1?4:5;duHUD();duIntro()});
 $("dGo").onclick=()=>{DU.started=true;hush();sfx("tap");$("dHelp").hidden=false;duNext()};
 narrate([K(`${L(VIL[DU.vil].n)} appeared! Your weapon is the ${L(W.w)}. Get the Hangul right to attack!`,`${iga(L(VIL[DU.vil].n))} 나타났다! 내 무기는 ${L(W.w)}! 한글을 맞히면 공격할 수 있어!`)],()=>{if(DU&&!DU.started)setTimeout(()=>{if(DU&&!DU.started)charSay(DU.id,0)},vGap())});
}
function duType(){const T=DU.tier,i=DU.qi;
 if(T===1)return "jamo";if(T===2)return i%2?"word":"combo";if(T===3)return i%2?"sent":"word";
 return ["combo","word","sent","word","sent","sent","word","sent"][i%8]}
function duGen(type){
 if(type==="jamo"){const pool=Math.random()<.6?JC:JV;let it;do{it=pick(pool)}while(DU.used.has(it[0])&&DU.used.size<20);DU.used.add(it[0]);
  const sim=[...(JSIM[it[0]]||"")];const rest=shuffle(pool.map(x=>x[0]).filter(x=>x!==it[0]&&!sim.includes(x)));const d=[...sim,...rest].slice(0,2);
  return {type,ans:it[0],name:it[1],opts:shuffle([it[0],...d])}}
 if(type==="combo"){let c,v,a;do{c=pick(JC);v=pick(JV);a=sylOf(c[0],v[0])}while(DU.used.has(a));DU.used.add(a);
  const v2=pick([...(JSIM[v[0]]||"ㅓ")].concat(JV.map(x=>x[0])).filter(x=>x!==v[0])),c2=pick([...(JSIM[c[0]]||"ㄴ")].filter(x=>LEADS.includes(x)&&x!==c[0]));
  const opts=[...new Set([a,sylOf(c[0],v2),sylOf(c2,v[0])])];while(opts.length<3){const x=sylOf(pick(JC)[0],pick(JV)[0]);if(!opts.includes(x))opts.push(x)}
  return {type,ans:a,c:c[0],v:v[0],cs:sylOf(c[0],"ㅡ"),vs:sylOf("ㅇ",v[0]),opts:shuffle(opts)}}
 if(type==="word"){const pool=WORDS2.filter(w=>w.w.length>=2&&[...w.w].every(x=>sylParts(x))&&!DU.used.has(w.w));const w=pick(pool.length?pool:WORDS2);DU.used.add(w.w);
  const sy=[...w.w],i=Math.floor(Math.random()*sy.length),a=sy[i],p=sylParts(a);
  const cand=[];JV.forEach(v=>{if(v[0]!==p.v)cand.push(sylOf(p.l,v[0],p.t))});const other=WORDS2.flatMap(x=>[...x.w]).filter(x=>x!==a&&sylParts(x));
  const opts=[a,pick(cand)];while(opts.length<3){const x=pick(other);if(!opts.includes(x))opts.push(x)}
  return {type,ans:a,w:w.w,pic:w.p,idx:i,opts:shuffle(opts)}}
 const pool=(G.easy?FILLS_E:FILLS).filter(q=>!DU.used.has(q.s));const q=pick(pool.length?pool:(G.easy?FILLS_E:FILLS));DU.used.add(q.s);
 return {type:"sent",ans:q.a,s:q.s,full:q.s.replace("___",q.a),opts:shuffle([q.a,...q.o])};
}
function duNext(){
 if(!DU||DU.done)return;DU.busy=false;DU.qw=0;const Q=DU.q=duGen(duType());DU.qi++;duHUD();
 let p="";
 if(Q.type==="jamo")p=`<div class="dqp"><button class="spk" id="dSay" aria-label="Hear it">🔊</button><span class="big">${Q.name}</span><span>${K("— find this letter!",(batchim(Q.name)?"을":"를")+" 찾아!")}</span></div>`;
 else if(Q.type==="combo")p=`<div class="deq"><span class="jt c">${Q.c}</span>+<span class="jt v">${Q.v}</span>=<span class="jt q">?</span><button class="spk" id="dSay" aria-label="Hear it">🔊</button></div>`;
 else if(Q.type==="word")p=`<div class="dword"><span class="pic">${Q.pic}</span>${[...Q.w].map((x,i)=>`<span class="sl${i===Q.idx?" q":""}">${i===Q.idx?"?":x}</span>`).join("")}</div>`;
 else p=`<div class="fsent">${Q.s.replace("___",'<span class="blank">?</span>')}</div>`;
 $("dQ").innerHTML=p+`<div class="dopts">${Q.opts.map(o=>`<button class="dop" data-o="${o}">${o}</button>`).join("")}</div>`;
 document.querySelectorAll(".dop").forEach(b=>b.onclick=()=>duAnswer(b));
 const sp=duSpeak;if($("dSay"))$("dSay").onclick=sp;
 $("dMsg").textContent=Q.type==="jamo"?K("Which letter is it?","어떤 글자일까?"):Q.type==="combo"?K("Put the two sounds together!","두 소리를 합치면?"):Q.type==="word"?K("Finish the word for the picture!","그림에 맞게 낱말을 완성해!"):K("Pick the word that fits!","빈칸에 맞는 말을 골라!");
 setTimeout(()=>{if(DU&&DU.q===Q)sp()},900);
}
function duSpeak(){const Q=DU&&DU.q;if(!Q)return;
 if(Q.type==="jamo")narrate([eul(Q.name)+" 찾아!"],null,"ko");
 else if(Q.type==="combo")narrate([`${Q.cs} 더하기 ${Q.vs}는?`],null,"ko");
 else if(Q.type==="word")narrate([K("What's this? Finish the word!","이게 뭘까? 낱말을 완성해 봐!")]);
 else say(Q.s);
}
function duAnswerText(Q){return Q.type==="jamo"?Q.name:Q.type==="combo"?Q.ans:Q.type==="word"?Q.w:Q.full}
function stageRect(el){const r=el.getBoundingClientRect(),s=$("dStage").getBoundingClientRect();return {x:r.left-s.left+r.width/2,y:r.top-s.top+r.height/2}}
function dAdd(cls,html){const e=document.createElement("div");e.className=cls;if(html)e.innerHTML=html;$("dStage").appendChild(e);return e}
function dCut(side,card,txt,extra){const img=DA.card[card]||(side==="me"?(DA.card[DU.id+"_atk"]||PORT[DU.id]):PORT["v_"+DU.vil]);const e=dAdd(`dcut ${side==="me"?"cl":"cr"} ${extra||""}`,`<img class="cimg" src="${img}" alt=""><b>${txt}</b>`);setTimeout(()=>e.remove(),1200)}
function dBan(txt){const e=dAdd("dban");e.textContent=txt;setTimeout(()=>e.remove(),1600)}
function duAnswer(b){
 if(!DU||DU.busy||DU.done||b.disabled)return;const Q=DU.q,o=b.dataset.o;
 if(o===Q.ans){
  DU.busy=true;b.classList.add("right");sfx("ok");recT(Q.ans,true);duMentor(false);
  const before=wLv(DU.id);G.wx[DU.id]=wXP(DU.id)+(DU.qw?1:2);DU.gain+=(DU.qw?1:2);save();const after=wLv(DU.id);
  DU.combo++;say(duAnswerText(Q));
  const r=b.getBoundingClientRect(),w=$("dWpn").querySelector(".ic").getBoundingClientRect();
  const f=document.createElement("div");f.className="dfly";f.textContent=Q.ans;f.style.left=r.left+r.width/2+"px";f.style.top=r.top+r.height/2+"px";document.body.appendChild(f);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.left=w.left+w.width/2+"px";f.style.top=w.top+w.height/2+"px";f.style.transform="translate(-50%,-50%) scale(.4)"}));
  setTimeout(()=>{f.remove();if(!DU||DU.done)return;const ic=$("dWpn").querySelector(".ic");ic.classList.remove("charge");void ic.offsetWidth;ic.classList.add("charge");duHUD();
   if(after>before){dBan(K(`Weapon up! Lv ${after}`,`무기 강화! Lv ${after}`));sfx("evo");toast(after===2?K("Special move charges faster!","필살기가 더 빨리 모여요!"):after===3?K("Attack power up!","공격력이 강해졌어요!"):K("Hangul energy is full!","한글 에너지가 가득!"))}
   setTimeout(duAttack,after>before?700:150)},470);
 }else{
  b.classList.add("wrong");b.disabled=true;sfx("bad");recT(Q.ans,false);DU.wrongs++;DU.qw++;DU.combo=0;duHUD();say(Q.type==="jamo"?((JC.concat(JV).find(x=>x[0]===o)||[0,o])[1]):o);
  DU.busy=true;setTimeout(duFoeAttack,500);
 }
}
function duAttack(){
 if(!DU||DU.done)return;const D0=DU;const W=WEAP[DU.id],sup=DU.combo>=duThr();let dmg=Math.ceil(100/DU.need)*(wLv(DU.id)>=3?1.5:1);if(sup){dmg*=2;DU.combo=0}
 const H=$("dHero");H.classList.remove("lunge");void H.offsetWidth;H.classList.add("lunge");sfx("hit");
 dCut("me",DU.id+"_atk",sup?K("Special! ","필살기! ")+L(W.atk)+"!":L(W.atk)+"!",sup?"sup":"");
 setTimeout(()=>{if(DU!==D0)return;const a=stageRect($("dWpn").querySelector(".ic")),z=stageRect($("dFoe"));const p=dAdd("dproj"+(sup?" big":""));p.textContent=DU.q?DU.q.ans:"";p.style.setProperty("--wc",HERO[DU.id].s);p.style.left=a.x+"px";p.style.top=a.y+"px";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{p.style.left=z.x+"px";p.style.top=z.y+"px"}));
  setTimeout(()=>{p.remove();if(DU!==D0)return;const F=$("dFoe");F.classList.remove("hit");void F.offsetWidth;F.classList.add("hit");sfx("hit");
   DU.hp=Math.max(0,DU.hp-dmg);const d=dAdd("ddmg");d.textContent="-"+Math.round(dmg);d.style.left=z.x+"px";d.style.top=(z.y-60)+"px";setTimeout(()=>d.remove(),900);duHUD();
   if(DU.hp<=0)setTimeout(duWin,500);else setTimeout(duNext,700)},400)},650);
}
function duFoeAttack(){
 if(!DU||DU.done)return;
 const a=stageRect($("dWpn").querySelector(".ic")),z=stageRect($("dFoe")),mx=a.x+(z.x-a.x)*.45,my=a.y+(z.y-a.y)*.45;
 const H=$("dHero");H.classList.remove("lunge");void H.offsetWidth;H.classList.add("lunge");
 const p=dAdd("dproj weak");p.style.setProperty("--wc",HERO[DU.id].s);p.style.left=a.x+"px";p.style.top=a.y+"px";
 requestAnimationFrame(()=>requestAnimationFrame(()=>{p.style.left=mx+"px";p.style.top=my+"px"}));
 setTimeout(()=>{p.classList.add("fizz");const d=dAdd("ddmg weak");d.textContent=K("Too weak…","약해…");d.style.left=mx+"px";d.style.top=(my-40)+"px";setTimeout(()=>{p.remove();d.remove()},900)},420);
 $("dMsg").textContent=K("The skill fizzled. Read it again!","기술이 약하게 나갔어. 다시 읽어 보자!");
 setTimeout(()=>{if(!DU||DU.done)return;DU.busy=false;duMentor(true)},1100);
}function duHint(Q){
 if(Q.type==="jamo"){const isC=JC.some(x=>x[0]===Q.ans),sd=isC?sylOf(Q.ans,"ㅡ"):Q.name;
  return isC?{t:K(`'${Q.name}' makes the '${sd}' sound.`,`'${Q.name}'${batchim(Q.name)?"은":"는"} '${sd}' 소리가 나는 글자란다.`),v:K(`${Q.name} makes the ${sd} sound.`,`${Q.name}${batchim(Q.name)?"은":"는"}, ${sd}, 소리가 나는 글자란다.`)}
   :{t:K(`Say '${Q.name}' and look where the short stick goes.`,`'${Q.name}' 하고 소리 내 보렴. 짧은 막대가 어느 쪽에 붙었을까?`),v:K(`Say ${Q.name}, and look at the short stick.`,`${Q.name}, 하고 소리 내 보렴. 짧은 막대가 어느 쪽에 붙었을까?`)}}
 if(Q.type==="combo")return {t:K(`${Q.c} says '${Q.cs}', ${Q.v} says '${Q.vs}'. Say them fast together!`,`${Q.c}은 '${Q.cs}', ${Q.v}는 '${Q.vs}' 소리란다. 빠르게 붙여 읽어 보렴!`),v:K(`${Q.cs}, ${Q.vs}. Say them fast together.`,`${Q.cs}. ${Q.vs}. 두 소리를 빠르게 붙여 읽어 보렴.`)};
 if(Q.type==="word")return {t:K("Look at the picture and say the whole word out loud.","그림을 보고 낱말 전체를 소리 내어 말해 보렴."),v:K("Look at the picture and say the whole word.","그림을 보고 낱말 전체를 소리 내어 말해 보렴.")};
 const x=K("Read the sentence from the start, out loud.","문장을 처음부터 소리 내어 읽어 보렴.");return {t:x,v:x};
}function duMentor(on){
 const old=$("dStage").querySelector(".dment");if(old)old.remove();if(!on||!DU||!DU.q)return;
 const Q=DU.q,h=duHint(Q),e=dAdd("dment",`<img src="${DA.mentor||PORT.mentor}" alt=""><div class="bub"><b>${K("Master Turtle","거북이 스승님")}</b>${h.t}</div>`);
 narrate([h.v],null,null,{voice:"mentor"});
}
function duStars(){return DU.wrongs===0?3:DU.wrongs<=2?2:1}
function duWin(){
 if(!DU||DU.done)return;DU.done=true;$("dQuit").hidden=true;$("dHelp").hidden=true;const F=$("dFoe");F.classList.add("ko");dBan(K("Victory!","승리!"));sfx("star");duMentor(false);
 const st=duStars(),l=wLv(DU.id),W=WEAP[DU.id];
 const hid=DU.id;narrate([K(`You beat ${L(VIL[DU.vil].n)}!`,`${eul(L(VIL[DU.vil].n))} 물리쳤어!`)],()=>setTimeout(()=>{if(!$("duelOv").hidden)charSay(hid,2)},vGap()));
 $("dMsg").textContent="";
 $("dQ").innerHTML=`<div class="dres"><div class="stars">${"⭐".repeat(st)}${"☆".repeat(3-st)}</div><b>${K(`${L(VIL[DU.vil].n)} ran away!`,`${iga(L(VIL[DU.vil].n))} 도망쳤어요!`)}</b>
  <span>${W.e} ${L(W.w)} · Lv ${l} · ${K("weapon XP","무기 경험치")} +${DU.gain}</span><button class="btn pri" id="dDone">${K("Continue","계속")} →</button></div>`;
 $("dDone").onclick=()=>{const p=DU.practice,g=DU.gain;duClose();if(STAGE&&STAGE.kind==="battle")stageFinish(true,st);else if(p)reward(8+g*2,10+g*2,6+g)};
}
function duLose(){
 if(!DU)return;DU.done=true;$("dQuit").hidden=true;$("dHelp").hidden=true;duMentor(false);dBan(K("Retreat…","후퇴…"));
 $("dQ").innerHTML=`<div class="dres"><b>${K("So close! Master Turtle healed you.","아깝다! 거북이 스승님이 힘을 채워 주셨어.")}</b><div class="tbtns"><button class="btn" id="dLeave">${K("Leave","나가기")}</button><button class="btn pri" id="dRetry">${K("Try again","다시 도전")}</button></div></div>`;
 $("dLeave").onclick=()=>{duClose();if(STAGE&&STAGE.kind==="battle")stageFinish(false,0,true)};
 $("dRetry").onclick=()=>{const m=DU.m;duClose();duel(m)};
}
function duClose(){hush();$("duelOv").hidden=true;document.querySelectorAll(".dfly").forEach(e=>e.remove());DU=null;renderAll()}
$("dQuit").onclick=()=>{const st=!!STAGE&&STAGE.kind==="battle";duClose();if(st)stageFinish(false,0,true)};
/* reading cases: what the child reads drives the skill effect */
const EMO={"슬퍼요":"😢","신나요":"🤩","기뻐요":"😄","무서워요":"😨","화나요":"😠","졸려요":"😴","걱정돼요":"😟","속상해요":"😞"};
const FRN={squirrel:"다람쥐",beaver:"비버",spider:"거미",mole:"고슴도치",gull:"갈매기"};
const SKL={tiger:{e:"🐯",n:{en:"Break the fake shield",ko:"거짓 방패 깨기"},line:"거짓 문장 방패, 내가 깨 줄게!"},
 rabbit:{e:"🐰",n:{en:"Read feelings",ko:"마음 읽기"},line:"친구 마음을 읽어 볼게~"},
 dragon:{e:"🐲",n:{en:"Fix the sentence",ko:"문장 고치기"},line:"단서대로 문장을 고쳐 보자."},
 horse:{e:"🐴",n:{en:"Path of time",ko:"시간의 길"},line:"시간의 길을 다시 달려 보자!"},
 sheep:{e:"🐑",n:{en:"Crystal shield",ko:"수정 방패"},line:"누구를 지켜야 할지 잘 읽어 보자."}};
const CB={
 tiger:[
  {v:"tiger",rec:"달리기 시합에서 말이 일 등을 했어요.",s:["말이 일 등을 했어.","호랑이냥이 일 등을 했어!"],f:1,clue:"말이 일 등을"},
  {v:"tiger",rec:"비버가 혼자서 다리를 고쳤어요.",s:["호랑이냥이 다리를 고쳤어!","비버가 다리를 고쳤어."],f:0,clue:"비버가 혼자서"},
  {v:"tiger",rec:"다람쥐는 도토리를 세 개 모았어요.",s:["다람쥐는 도토리를 세 개 모았어.","다람쥐는 도토리를 하나도 못 모았어!"],f:1,clue:"세 개"},
  {v:"tiger",rec:"갈매기는 빨간 모자를 썼어요.",s:["갈매기는 파란 모자를 썼어!","갈매기는 빨간 모자를 썼어."],f:0,clue:"빨간 모자"},
  {v:"tiger",rec:"거미는 동굴 안에서 잠을 잤어요.",s:["거미는 동굴 안에서 잤어.","거미는 동굴 밖에서 잤어!"],f:1,clue:"동굴 안에서"},
  {v:"white",rec:"어제는 비가 와서 토끼가 우산을 썼어요.",s:["토끼는 항상 우산을 써!","토끼는 어제 우산을 썼어."],f:0,clue:"어제는 비가 와서"},
  {v:"white",rec:"오늘 아침 고슴도치는 사과를 먹었어요.",s:["고슴도치는 오늘 아침 사과를 먹었어.","고슴도치는 반드시 사과만 먹어!"],f:1,clue:"오늘 아침"},
  {v:"white",rec:"오늘은 바람이 불어서 배가 늦게 떠났어요.",s:["배는 항상 늦게 떠나!","오늘은 배가 늦게 떠났어."],f:0,clue:"오늘은 바람이 불어서"},
  {v:"white",rec:"원숭이는 가끔 바나나를 친구에게 나눠 줘요.",s:["원숭이는 반드시 바나나를 혼자 먹어!","원숭이는 가끔 바나나를 나눠 줘."],f:0,clue:"가끔"},
  {v:"white",rec:"이번 주에 개는 공원에 두 번 갔어요.",s:["개는 이번 주에 공원에 두 번 갔어.","개는 날마다 반드시 공원에 가!"],f:1,clue:"두 번"}],
 rabbit:[
  {who:"squirrel",txt:"다람쥐가 도토리를 잃어버렸어요. 다람쥐는 고개를 푹 숙였어요.",a:"슬퍼요",o:["신나요"],clue:"고개를 푹 숙였어요",help:"다람쥐가 숲속 지름길을 알려 줬어요!"},
  {who:"beaver",txt:"다리가 무너지자 비버는 \"이제 어떡하지?\" 하며 발을 동동 굴렀어요.",a:"걱정돼요",o:["졸려요"],clue:"이제 어떡하지?",help:"비버가 튼튼한 나무를 빌려줬어요!"},
  {who:"gull",txt:"천둥이 치자 갈매기는 날개로 눈을 가리고 몸을 떨었어요.",a:"무서워요",o:["기뻐요"],clue:"몸을 떨었어요",help:"갈매기가 하늘에서 본 길을 알려 줬어요!"},
  {who:"mole",txt:"뚱냥이 사과를 빼앗자 고슴도치는 발을 쾅쾅 구르며 \"돌려줘!\" 했어요.",a:"화나요",o:["졸려요"],clue:"발을 쾅쾅 구르며",help:"고슴도치가 반짝이는 단서 돌을 줬어요!"},
  {who:"spider",txt:"아기 거미는 늦게까지 놀다가 하품을 하며 눈을 비볐어요.",a:"졸려요",o:["화나요"],clue:"하품을 하며",help:"아기 거미가 거미줄 사다리를 만들어 줬어요!"},
  {who:"squirrel",txt:"잃어버린 도토리를 찾자 다람쥐는 깡충깡충 뛰며 \"야호!\" 했어요.",a:"기뻐요",o:["슬퍼요"],clue:"깡충깡충 뛰며",help:"다람쥐가 고맙다며 단서를 하나 더 줬어요!"},
  {who:"beaver",txt:"호랑이냥이 \"너는 못 해!\" 하고 놀리자 비버는 눈물을 글썽였어요.",a:"속상해요",o:["신나요"],clue:"눈물을 글썽였어요",help:"비버가 용기를 내서 다리 그림을 보여 줬어요!"},
  {who:"gull",txt:"처음 보는 섬에 도착하자 갈매기는 눈을 반짝이며 \"우아, 멋지다!\" 했어요.",a:"신나요",o:["무서워요"],clue:"눈을 반짝이며",help:"갈매기가 섬 지도를 그려 줬어요!"}],
 dragon:[
  {v:"purple",k:"swap",clue:"빨간 돌을 밟으면 다리가 생겨요.",s:"파란 돌을 밟으면 다리가 생겨요.",bad:"파란",fix:"빨간",alt:["노란"]},
  {v:"purple",k:"swap",clue:"문을 두 번 두드리면 길이 열려요.",s:"문을 세 번 두드리면 길이 열려요.",bad:"세",fix:"두",alt:["네"]},
  {v:"purple",k:"swap",clue:"해가 지면 동굴 문이 열려요.",s:"해가 뜨면 동굴 문이 열려요.",bad:"뜨면",fix:"지면",alt:["나면"]},
  {v:"purple",k:"swap",clue:"큰 나무 옆에 숨은 길이 있어요.",s:"작은 나무 옆에 숨은 길이 있어요.",bad:"작은",fix:"큰",alt:["새"]},
  {v:"purple",k:"swap",clue:"노래를 부르면 다리가 내려와요.",s:"노래를 멈추면 다리가 내려와요.",bad:"멈추면",fix:"부르면",alt:["들으면"]},
  {v:"purple",k:"swap",clue:"별 세 개를 모으면 배가 움직여요.",s:"별 세 개를 버리면 배가 움직여요.",bad:"버리면",fix:"모으면",alt:["세면"]},
  {v:"black",k:"hide",clue:"초록 열쇠로 문을 열어요.",s:"□ 열쇠로 문을 열어요.",fix:"초록",alt:["파란","빨간"]},
  {v:"black",k:"hide",clue:"다리는 밤에만 나타나요.",s:"다리는 □에만 나타나요.",fix:"밤",alt:["낮"]},
  {v:"black",k:"hide",clue:"종을 세 번 울리면 길이 열려요.",s:"종을 □ 번 울리면 길이 열려요.",fix:"세",alt:["한","다섯"]},
  {v:"black",k:"hide",clue:"바위 뒤에 숨은 길이 있어요.",s:"□ 뒤에 숨은 길이 있어요.",fix:"바위",alt:["나무"]}],
 horse:[
  {ev:["씨앗을 심었어요.","물을 주었어요.","꽃이 피었어요."],e:["🌱","💧","🌻"],k:["씨앗","물","꽃"]},
  {ev:["알이 있었어요.","알이 톡 깨졌어요.","병아리가 걸어 나왔어요."],e:["🥚","🐣","🐥"],k:["알이 있었어요","깨졌어요","걸어 나왔어요"]},
  {ev:["눈이 펑펑 왔어요.","눈사람을 만들었어요.","해가 나서 눈사람이 녹았어요."],e:["🌨️","⛄","☀️"],k:["눈이 펑펑","만들었어요","녹았어요"]},
  {ev:["가방을 멨어요.","버스를 탔어요.","학교에 도착했어요."],e:["🎒","🚌","🏫"],k:["가방","버스","도착"]},
  {ev:["밤이 되었어요.","잠을 잤어요.","아침에 일어났어요."],e:["🌙","😴","🌅"],k:["밤","잠","아침"]},
  {ev:["밀가루를 섞었어요.","오븐에 구웠어요.","빵을 먹었어요."],e:["🥣","🔥","🍞"],k:["섞었어요","구웠어요","먹었어요"]},
  {ev:["손을 씻었어요.","밥을 먹었어요.","이를 닦았어요."],e:["🧼","🍚","🪥"],k:["손","밥","이를"]},
  {ev:["공을 뻥 찼어요.","공이 날아갔어요.","골대에 쏙 들어갔어요."],e:["🦶","⚽","🥅"],k:["찼어요","날아갔어요","들어갔어요"]}],
 sheep:[
  {ins:"풍선을 든 다람쥐를 지켜 줘!",c:[["squirrel","🎈"],["squirrel","🍎"],["mole","🎈"]],clue:["풍선","다람쥐"]},
  {ins:"사과를 든 고슴도치를 지켜 줘!",c:[["mole","🍎"],["mole","⭐"],["squirrel","🍎"]],clue:["사과","고슴도치"]},
  {ins:"별을 든 비버를 지켜 줘!",c:[["beaver","⭐"],["beaver","🎈"],["gull","⭐"]],clue:["별","비버"]},
  {ins:"우산을 쓴 거미를 지켜 줘!",c:[["spider","☂️"],["spider","🎈"],["squirrel","☂️"]],clue:["우산","거미"]},
  {ins:"꽃을 든 갈매기를 지켜 줘!",c:[["gull","🌸"],["gull","🍎"],["beaver","🌸"]],clue:["꽃","갈매기"]},
  {ins:"책을 든 비버를 지켜 줘!",c:[["beaver","📚"],["beaver","🌸"],["mole","📚"]],clue:["책","비버"]},
  {ins:"모자를 쓴 다람쥐를 지켜 줘!",c:[["squirrel","🎩"],["squirrel","☂️"],["spider","🎩"]],clue:["모자","다람쥐"]},
  {ins:"공을 든 거미를 지켜 줘!",c:[["spider","⚽"],["spider","⭐"],["gull","⚽"]],clue:["공","거미"]}]};
/* ===== sound files: music, ambience, effects =====
   AASSET lists files published next to the page. Empty = silent music and the synthesized effects.
   bgm: case · tension · reveal · solved · title · explore    amb: forest · river · sea · indoor · village
   sfx: clue · notclue · note · select · correct · retry · stamp · hero · run · restore
   Music and ambience get quieter on their own while narration or a character is talking. */
const AASSET={bgm:{},amb:{},sfx:{}};
["title","explore","play","book","duel","course","case","tension","reveal","solved"].forEach(n=>{AASSET.bgm[n]="assets/audio/bgm/"+n+".mp3"});
const AU={buf:{},cur:null,amb:null,tok:0,atok:0,mus:null,ambG:null,fx:null,duck:false};
function auCtx(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();return AC}catch(e){return null}}
function auBus(){const c=auCtx();if(!c)return null;if(!AU.mus){AU.mus=c.createGain();AU.mus.gain.value=.32;AU.mus.connect(c.destination);AU.ambG=c.createGain();AU.ambG.gain.value=.4;AU.ambG.connect(c.destination);AU.fx=c.createGain();AU.fx.gain.value=.9;AU.fx.connect(c.destination);
  setInterval(()=>{let talk=false;try{talk=!!(VA&&!VA.paused)||!!(window.speechSynthesis&&speechSynthesis.speaking)||!($("vSkip")||{hidden:true}).hidden}catch(e){}
   if(talk===AU.duck)return;AU.duck=talk;const t=c.currentTime;AU.mus.gain.setTargetAtTime(talk?.08:.32,t,talk?.08:.25);AU.ambG.gain.setTargetAtTime(talk?.2:.4,t,talk?.08:.3)},120)}return c}
/* loop points skip the silence that encoders add at the start and end of a file */
function auTrim(b){const d=b.getChannelData(0),n=d.length,th=.002;let a=0,z=n-1;while(a<n&&Math.abs(d[a])<th)a++;while(z>a&&Math.abs(d[z])<th)z--;b._ls=a/b.sampleRate;b._le=(z+1)/b.sampleRate;if(b._le-b._ls<.2){b._ls=0;b._le=b.duration}return b}
function auLoad(url){const c=auBus();if(!c||location.protocol==="file:")return Promise.reject();if(!AU.buf[url])AU.buf[url]=fetch(url).then(r=>{if(!r.ok)throw new Error("missing "+url);return r.arrayBuffer()}).then(a=>new Promise((res,rej)=>c.decodeAudioData(a,res,rej))).then(auTrim).catch(e=>{delete AU.buf[url];throw e});return AU.buf[url]}
function auStart(buf,bus,loop,fade){const c=auCtx(),src=c.createBufferSource(),g=c.createGain();src.buffer=buf;if(loop){src.loop=true;src.loopStart=buf._ls;src.loopEnd=buf._le}
 g.gain.value=0;src.connect(g).connect(bus);src.start(0,buf._ls||0);g.gain.setTargetAtTime(1,c.currentTime,Math.max(.01,fade/3));return {src,g}}
function auFadeOut(o,fade){if(!o)return;const c=auCtx();try{o.g.gain.setTargetAtTime(0,c.currentTime,Math.max(.01,fade/3));setTimeout(()=>{try{o.src.stop()}catch(e){}},fade*1500+60)}catch(e){}}
function bgmPlay(name,o){o=o||{};const loop=o.loop!==false,fade=o.fade==null?1:o.fade,url=AASSET.bgm[name];if(G.bgm===false||!url)return;
 if(loop&&AU.cur&&AU.cur.name===name)return;const tok=++AU.tok;
 auLoad(url).then(buf=>{if(tok!==AU.tok)return;const old=AU.cur,n=auStart(buf,AU.mus,loop,fade);auFadeOut(old,fade);AU.cur={name,src:n.src,g:n.g};if(!loop)n.src.onended=()=>{if(AU.cur&&AU.cur.src===n.src)AU.cur=null}}).catch(()=>{})}
function bgmStop(fade){AU.tok++;auFadeOut(AU.cur,fade==null?.5:fade);AU.cur=null}
function ambPlay(name){const url=AASSET.amb[name];if(G.sfxOff||!url){ambStop(.5);return}if(AU.amb&&AU.amb.name===name)return;const tok=++AU.atok;
 auLoad(url).then(buf=>{if(tok!==AU.atok)return;const old=AU.amb,n=auStart(buf,AU.ambG,true,1.5);auFadeOut(old,1);AU.amb={name,src:n.src,g:n.g}}).catch(()=>{})}
function ambStop(fade){AU.atok++;auFadeOut(AU.amb,fade==null?.5:fade);AU.amb=null}
/* plays the file if there is one and returns true; otherwise the caller uses its synthesized sound */
function sfxPlay(name){if(G.sfxOff)return true;const url=AASSET.sfx[name];if(!url)return false;const c=auBus();if(!c)return false;
 auLoad(url).then(buf=>{const s=c.createBufferSource();s.buffer=buf;s.connect(AU.fx);s.start(0,buf._ls||0)}).catch(()=>{});return true}
function auPreload(){Object.values(AASSET.sfx).forEach(u=>auLoad(u).catch(()=>{}))}
document.addEventListener("pointerdown",()=>{const c=auBus();if(c&&c.state==="suspended")c.resume();auPreload();AU.go=true;musicTick();setTimeout(()=>imgWarm([...Object.values(DA.hs),...Object.values(DA.vb),DA.mentor,...Object.keys(DA.card).filter(k=>k.startsWith(G.char+"_")||k.startsWith("v_")).map(k=>DA.card[k])]),1500)},{once:true});
/* iPad/iPhone: keep music audible like the voice (Safari 17+); the sound context can also be suspended by the system, so every tap wakes it */
try{if(navigator.audioSession)navigator.audioSession.type="playback"}catch(e){}
document.addEventListener("pointerdown",()=>{try{if(AC&&AC.state!=="running")AC.resume()}catch(e){}},true);
/* which music fits the screen that is open; the Case Squad picks its own music */
function musicWant(){const open=id=>{const e=$(id);return !!e&&!e.hidden};if(open("caseOv"))return null;
 if(open("duelOv"))return "duel";if(open("runOv"))return "course";if(open("bookOv"))return "book";if(open("pgOv"))return "play";
 if(open("stOv"))return "explore";if(open("titleOv")||open("splashOv"))return "title";return G.view==="island"?"explore":"title"}
function musicTick(){if(!AU.go||G.bgm===false)return;const w=musicWant();if(w&&!(AU.cur&&AU.cur.name===w))bgmPlay(w)}
setInterval(musicTick,700);
/* ===== 사건 수사대 v2: 12 cases, one per zodiac hero. Each case is one story:
   brief (의뢰) → search (현장 조사) → talk (증언, 거짓말 + 증거) → skill (그 영웅의 읽기 기술) → deduce (추리) → solve → report.
   Coordinates x,y are % of the 3:2 scene (1200×800). Keep spots within x 14–86, y 46–86 so phones and tablets both show them. */
const KFN={squirrel:"다람쥐",beaver:"비버",spider:"스피니",mole:"고슴도치",gull:"갈매기",captain:"거북이 스승님"};
const KSK={
 rat:{n:"꼼꼼 찾기",d:"글 속에서 누가·어디서·무엇을 꼼꼼히 찾아요",line:"작은 단서도 놓치지 않아! 번개처럼 찾아볼게!"},
 ox:{n:"차근차근 따라 하기",d:"설명을 한 줄씩 읽고 그대로 해요",line:"서두르지 말고, 한 줄씩 차근차근!"},
 tiger:{n:"거짓 방패 깨기",d:"기록과 다른 말을 찾아 깨뜨려요",line:"기록과 다른 말은 거짓 방패야. 내가 깨 줄게!"},
 rabbit:{n:"마음 읽기",d:"행동을 읽고 친구의 마음을 알아내요",line:"친구의 행동을 잘 읽으면 마음이 보여~"},
 dragon:{n:"문장 고치기",d:"진짜 기록과 다른 낱말을 찾아 고쳐요",line:"진짜 기록과 한 낱말씩 맞춰 보자."},
 snake:{n:"수수께끼 풀기",d:"설명을 읽고 무엇인지 알아맞혀요",line:"쉿, 설명을 끝까지 읽으면 답이 보여."},
 horse:{n:"시간의 길",d:"일이 일어난 순서를 맞춰요",line:"무엇이 먼저일까? 시간의 길을 달려 보자!"},
 sheep:{n:"수정 방패",d:"설명을 읽고 누구인지 찾아 지켜요",line:"설명에 꼭 맞는 친구를 찾아 지켜 줄게."},
 monkey:{n:"왜 그럴까?",d:"무엇 때문에 그런 일이 생겼는지 알아내요",line:"왜 그렇게 됐을까? 까닭을 찾으면 고칠 수 있어!"},
 rooster:{n:"안내문 읽기",d:"안내문에서 언제·어디서·누가·무엇을 찾아요",line:"꼬끼오! 안내문은 언제, 어디서, 누가, 무엇을 잘 봐야 해!"},
 dog:{n:"냄새 추적",d:"길 안내를 읽고 그대로 따라가요",line:"킁킁! 길 안내대로 가면 꼭 찾을 수 있어!"},
 pig:{n:"제목 붙이기",d:"글 전체를 읽고 가장 알맞은 제목을 골라요",line:"글을 끝까지 읽고 가장 중요한 말을 찾아보자."}};
const KC=[
{id:"k1",h:"rat",vil:"black",cl:"squirrel",sc:"store",t:{ko:"사라진 창고 열쇠",en:"The Missing Storehouse Key"},
 brief:["다람쥐는 가을 내내 도토리를 모아 나무 창고에 넣어 두었어요.","그런데 오늘 아침, 창고 열쇠가 감쪽같이 사라졌어요!","\"열쇠가 없으면 겨울에 먹을 도토리를 꺼낼 수 없어요.\" 다람쥐가 발을 동동 굴렀어요.","창고 문 앞에는 작은 발자국이 찍혀 있었어요."],
 q:{ask:"다람쥐가 잃어버린 것은 무엇일까?",a:["창고 열쇠","🔑"],o:[["도토리 바구니","🧺"],["나무 도끼","🪓"]],clue:"창고 열쇠",note:"다람쥐의 창고 열쇠가 사라졌어요."},
 spots:[{k:"a",ic:"🐾",x:46,y:82,n:"까만 발자국",t:"창고 문 앞에 까만 고양이 발자국이 있어요. 발자국은 덤불 쪽으로 이어져요."},
  {k:"b",ic:"🧶",x:70,y:64,n:"까만 털",t:"덤불 가시에 까만 털이 걸려 있어요."},
  {k:"c",ic:"📝",x:28,y:78,n:"흑묘의 쪽지",t:"바위 밑에 쪽지가 있어요. '열쇠는 내가 숨겼다냥. 찾아볼 테면 찾아봐라냥!'"},
  {k:"d",ic:"🍂",x:62,y:86,decoy:1,t:"바스락바스락 낙엽이에요. 단서는 아니에요."}],
 talk:[{w:"spider",t:"\"어젯밤에 까만 고양이가 창고 앞을 살금살금 걸어갔어.\""},
  {w:"v",t:"\"나는 어젯밤에 창고 근처에도 안 갔다냥!\"",lie:1,proof:["a","b","c"]},
  {w:"mole",t:"\"열쇠는 어제 저녁까지 창고 문에 걸려 있었어.\""}],
 sk:{type:"quiz",skin:"memo",title:"흑묘가 떨어뜨린 비밀 메모",lines:["열쇠는 아무도 못 찾게 숨겼다냥.","키 큰 소나무 꼭대기, 새 둥지 옆에 상자가 있다냥.","빨간 리본이 달린 상자 안에 열쇠가 있다냥."],
  qs:[{ask:"열쇠는 어느 나무에 있을까?",a:["키 큰 소나무","🌲"],o:[["작은 사과나무","🍎"],["단풍나무","🍁"]],clue:"키 큰 소나무"},
   {ask:"열쇠는 어떤 상자 안에 있을까?",a:["빨간 리본 상자","🎁"],o:[["파란 리본 상자","🎁"],["노란 리본 상자","🎁"]],clue:"빨간 리본"}]},
 ded:[{s:"범인은 바로 ___!",a:"흑묘",o:["스피니","고슴도치"]},{s:"창고 앞에 까만 ___ 발자국이 있었어요.",a:"고양이",o:["오리","토끼"]}],
 hl:"찾았다! 열쇠는 키 큰 소나무 위 빨간 리본 상자 안에 있었어!",vl:"칫, 들켰다냥! 그림자 속으로 숨어야지!",
 story:["흑묘가 밤에 몰래 다람쥐의 창고 열쇠를 숨겼어요.","수비대는 창고 앞에서 까만 고양이 발자국을 찾았어요.","번개 쥐는 비밀 메모를 꼼꼼히 읽고 키 큰 소나무 위에서 열쇠를 찾았어요.","다람쥐는 창고 문을 열고 \"고마워!\" 하고 활짝 웃었어요."]},

{id:"k2",h:"ox",vil:"white",cl:"beaver",sc:"build",t:{ko:"엉터리 설명서",en:"The Wrong Instructions"},
 brief:["비버는 친구들이 쉴 수 있는 강가 오두막을 짓고 있어요.","그런데 설명서대로 지었더니 오두막이 와르르 무너졌어요!","\"설명서에 '지붕을 반드시 먼저 올려요.'라고 쓰여 있었어요.\" 비버가 고개를 갸웃했어요.","기둥도 없이 지붕부터 올리면 무너질 수밖에 없어요."],
 q:{ask:"비버는 무엇을 짓고 있었을까?",a:["강가 오두막","🛖"],o:[["나무다리","🌉"],["돛단배","⛵"]],clue:"강가 오두막",note:"비버의 오두막이 무너졌어요."},
 spots:[{k:"a",ic:"📄",x:30,y:70,n:"덧칠한 설명서",t:"설명서 글씨 위에 하얀 물감이 덧칠되어 있어요. 그 위에 '반드시'라고 새로 쓰여 있어요."},
  {k:"b",ic:"🖌️",x:72,y:78,n:"하얀 붓",t:"통나무 더미 뒤에 하얀 물감이 묻은 붓이 숨겨져 있어요."},
  {k:"c",ic:"📒",x:52,y:84,n:"비버의 공책",t:"비버의 공책에 진짜 순서가 적혀 있어요. '기둥, 벽, 지붕 순서로 지어요.'"},
  {k:"d",ic:"🐟",x:80,y:58,decoy:1,t:"물고기가 퐁당 뛰어올랐어요. 단서는 아니에요."}],
 talk:[{w:"squirrel",t:"\"어제 하얀 고양이가 붓을 들고 공사장에 왔어.\""},
  {w:"v",t:"\"설명서는 처음부터 그렇게 쓰여 있었다냥. 내 규칙이 맞다냥!\"",lie:1,proof:["a","b"]},
  {w:"gull",t:"\"비버는 늘 공책을 보면서 꼼꼼하게 일해.\""}],
 sk:{type:"steps",skin:"build",title:"비버의 진짜 설명서",
  steps:[{t:"먼저 굵은 기둥 네 개를 땅에 세워요.",a:["굵은 기둥 네 개","🪵"],o:[["얇은 막대 두 개","🥢"],["빨간 지붕","🔺"]],clue:"굵은 기둥 네 개"},
   {t:"그다음 나무판자로 벽을 만들어요.",a:["나무판자","🟫"],o:[["나뭇잎","🍃"],["돌멩이","🪨"]],clue:"나무판자"},
   {t:"마지막으로 빨간 지붕을 올려요.",a:["빨간 지붕","🔺"],o:[["파란 지붕","🔷"],["천막","⛺"]],clue:"빨간 지붕"}]},
 ded:[{s:"범인은 바로 ___!",a:"백묘",o:["다람쥐","갈매기"]},{s:"설명서에 ___ 물감이 덧칠되어 있었어요.",a:"하얀",o:["까만","초록"]}],
 hl:"차근차근, 한 줄씩! 튼튼한 오두막 완성!",vl:"흥! 내 규칙을 안 따르다니, 두고 보라냥!",
 story:["백묘가 비버의 설명서에 엉터리 순서를 써 넣었어요.","수비대는 하얀 물감이 묻은 붓을 찾았어요.","강철 소는 진짜 설명서를 차근차근 읽고 기둥, 벽, 지붕 순서로 오두막을 지었어요.","이제 친구들은 튼튼한 오두막에서 쉴 수 있어요."]},

{id:"k3",h:"tiger",vil:"tiger",cl:"mole",sc:"race",t:{ko:"가짜 우승자",en:"The Fake Winner"},
 brief:["어제 숲속 달리기 대회가 열렸어요.","고슴도치는 열심히 달려서 일 등으로 결승선에 들어왔어요.","그런데 오늘 호랑이냥이 금메달을 목에 걸고 \"내가 일 등이다냥!\" 하고 우겨요.","고슴도치는 너무 속상해서 눈물이 났어요."],
 q:{ask:"어제 달리기 대회에서 일 등은 누구였을까?",a:["고슴도치","🦔"],o:[["호랑이냥","🐯"],["다람쥐","🐿️"]],clue:"일 등으로",note:"호랑이냥이 고슴도치의 금메달을 가져갔어요."},
 spots:[{k:"a",ic:"📸",x:55,y:70,n:"결승선 사진",t:"결승선 사진이 있어요. 고슴도치가 맨 앞에서 결승선을 지나고 있어요."},
  {k:"b",ic:"📋",x:41,y:78,n:"기록판",t:"기록판에 '일 등 고슴도치, 이 등 다람쥐'라고 쓰여 있어요."},
  {k:"c",ic:"🧡",x:72,y:80,n:"줄무늬 털",t:"결승선 옆 바위에 주황색 줄무늬 털이 끼어 있어요."},
  {k:"d",ic:"🥤",x:86,y:86,decoy:1,t:"누가 마시다 남긴 물병이에요. 단서는 아니에요."}],
 talk:[{w:"squirrel",t:"\"나는 고슴도치 바로 뒤에서 달렸어. 정말 아깝게 졌지.\""},
  {w:"v",t:"\"나는 어제 제일 먼저 결승선에 들어왔다냥!\"",lie:1,proof:["a","b"]},
  {w:"gull",t:"\"밤에 줄무늬 고양이가 시상대에서 금메달을 가져갔어.\""}],
 sk:{type:"fact",title:"달리기 대회 기록",lines:["일 등은 고슴도치예요.","이 등은 다람쥐예요.","호랑이냥은 늦잠을 자서 대회에 오지 않았어요."],
  st:[["고슴도치가 일 등을 했어요.",0],["호랑이냥이 이 등을 했어요.",1],["호랑이냥은 대회에 오지 않았어요.",0],["다람쥐가 꼴찌를 했어요.",1]],clue:["일 등은 고슴도치","이 등은 다람쥐","오지 않았어요"]},
 ded:[{s:"범인은 바로 ___!",a:"호랑이냥",o:["다람쥐","갈매기"]},{s:"호랑이냥은 늦잠을 자서 대회에 ___.",a:"오지 않았어요",o:["일 등을 했어요","이 등을 했어요"]}],
 hl:"거짓 방패, 모두 깨졌다! 진짜 일 등은 고슴도치야!",vl:"으으, 메달 돌려줄게냥… 다음엔 진짜로 달릴 거다냥!",
 story:["호랑이냥이 고슴도치의 금메달을 가져가서 자기가 일 등이라고 우겼어요.","수비대는 결승선 사진과 기록판을 찾았어요.","대장 호랑이는 기록과 다른 거짓말을 모두 깨뜨렸어요.","고슴도치는 다시 금메달을 목에 걸고 활짝 웃었어요."]},

{id:"k4",h:"rabbit",vil:"fat",cl:"spider",sc:"party",t:{ko:"사라진 생일 케이크",en:"The Missing Birthday Cake"},
 brief:["오늘은 거미 스피니의 생일이에요.","친구들이 정원에 모여 생일 파티를 준비했어요.","그런데 식탁 위에 있던 딸기 케이크가 사라졌어요!","빈 접시를 본 스피니는 아무 말도 못 했어요."],
 q:{ask:"식탁 위에서 사라진 것은 무엇일까?",a:["딸기 케이크","🍰"],o:[["선물 상자","🎁"],["풍선","🎈"]],clue:"딸기 케이크",note:"스피니의 생일 케이크가 사라졌어요."},
 spots:[{k:"a",ic:"🍦",x:58,y:82,n:"크림 자국",t:"잔디 위에 하얀 크림이 뚝뚝 떨어져 있어요. 크림 자국은 울타리 쪽으로 이어져요."},
  {k:"b",ic:"🐾",x:80,y:68,n:"큰 발자국",t:"울타리 앞에 동글동글한 큰 고양이 발자국이 있어요."},
  {k:"c",ic:"🍴",x:34,y:80,n:"'뚱' 포크",t:"식탁 밑에 크림이 묻은 포크가 떨어져 있어요. 손잡이에 '뚱'이라고 쓰여 있어요."},
  {k:"d",ic:"🎈",x:20,y:60,decoy:1,t:"알록달록 풍선이에요. 단서는 아니에요."}],
 talk:[{w:"beaver",t:"\"아까 배가 볼록한 고양이가 접시를 들고 울타리를 넘어갔어.\""},
  {w:"v",t:"\"나는 케이크 냄새도 못 맡았다냥! 냠… 아니, 진짜다냥!\"",lie:1,proof:["c","b"]},
  {w:"gull",t:"\"케이크가 없어져서 스피니가 많이 시무룩해.\""}],
 sk:{type:"quiz",skin:"feel",title:"친구의 마음 읽기",
  qs:[{lines:["스피니는 빈 접시를 보고 고개를 푹 숙였어요.","눈물이 또르르 흘렀어요."],ask:"스피니의 마음은 어떨까?",a:["슬퍼요","😢"],o:[["신나요","🤩"],["졸려요","😴"]],clue:"눈물이 또르르",who:"spider"},
   {lines:["뚱냥은 입가에 크림을 묻힌 채 눈을 이리저리 굴렸어요.","친구들과 눈이 마주치자 깜짝 놀라 뒤로 숨었어요."],ask:"뚱냥의 마음은 어떨까?",a:["걱정돼요","😟"],o:[["기뻐요","😄"],["졸려요","😴"]],clue:"깜짝 놀라 뒤로 숨었어요",who:"v"}]},
 ded:[{s:"범인은 바로 ___!",a:"뚱냥",o:["비버","갈매기"]},{s:"포크 손잡이에 '___'이라고 쓰여 있었어요.",a:"뚱",o:["냥","별"]}],
 hl:"마음을 읽으면 진짜 이야기가 보여! 우리 같이 새 케이크를 만들자!",vl:"미안하다냥… 너무 맛있어 보여서 그랬다냥.",
 story:["뚱냥이 스피니의 생일 케이크를 몰래 먹어 버렸어요.","수비대는 크림 자국과 '뚱' 포크를 찾았어요.","달빛 토끼는 친구들의 마음을 읽고 스피니를 따뜻하게 위로했어요.","친구들은 새 케이크를 함께 만들어 신나는 생일 파티를 했어요."]},

{id:"k5",h:"dragon",vil:"purple",cl:"gull",sc:"harbor",t:{ko:"바뀐 초대장",en:"The Changed Invitation"},
 brief:["갈매기는 바닷가 마을 친구들에게 초대장을 보냈어요.","\"토요일에 등대 앞에서 조개 잔치를 해요!\"","그런데 토요일이 되자 친구들이 모두 깜깜한 동굴 앞으로 갔어요.","\"내가 분명히 등대라고 썼는데…….\" 갈매기가 고개를 갸웃했어요."],
 q:{ask:"갈매기는 어디에서 잔치를 하자고 썼을까?",a:["등대 앞","🗼"],o:[["동굴 앞","🕳️"],["학교 앞","🏫"]],clue:"등대 앞에서",note:"초대장의 장소가 바뀌었어요."},
 spots:[{k:"a",ic:"💌",x:40,y:84,n:"바뀐 초대장",t:"친구가 받은 초대장이에요. '토요일에 동굴 앞에서 조개 잔치를 해요!'라고 쓰여 있어요."},
  {k:"b",ic:"🟣",x:62,y:66,n:"보라색 잉크",t:"우체통 위에 보라색 잉크 방울이 떨어져 있어요."},
  {k:"c",ic:"📒",x:24,y:70,n:"갈매기의 수첩",t:"갈매기의 수첩에 '토요일에 등대 앞에서 조개 잔치를 해요!'라고 적혀 있어요."},
  {k:"d",ic:"🐚",x:76,y:84,decoy:1,t:"반짝이는 조개껍데기예요. 단서는 아니에요."}],
 talk:[{w:"mole",t:"\"밤에 보라색 고양이가 우체통을 열고 무언가 쓰고 있었어.\""},
  {w:"v",t:"\"나는 초대장에 손도 안 댔다냥!\"",lie:1,proof:["b"]},
  {w:"beaver",t:"\"내 초대장에도 '동굴 앞'이라고 쓰여 있었어.\""}],
 sk:{type:"fix",title:"초대장 고치기",items:[{clue:"토요일에 등대 앞에서 조개 잔치를 해요!",s:"토요일에 동굴 앞에서 조개 잔치를 해요!",bad:"동굴",fix:"등대",alt:["바다"]},
  {clue:"조개 잔치는 해가 질 때 시작해요.",s:"조개 잔치는 해가 뜰 때 시작해요.",bad:"뜰",fix:"질",alt:["밝을"]}]},
 ded:[{s:"범인은 바로 ___!",a:"보라냥",o:["고슴도치","비버"]},{s:"우체통 위에 ___ 잉크가 떨어져 있었어요.",a:"보라색",o:["파란색","노란색"]}],
 hl:"단서대로 고치면 문장이 제자리로 돌아와!",vl:"낱말 하나만 바꿨을 뿐인데… 들켰다냥!",
 story:["보라냥이 초대장의 '등대'를 '동굴'로 몰래 바꿨어요.","수비대는 우체통에서 보라색 잉크를 찾았어요.","하늘 용은 갈매기의 수첩과 똑같이 초대장을 고쳤어요.","친구들은 등대 앞에 모여 맛있는 조개 잔치를 했어요."]},

{id:"k6",h:"snake",vil:"purple",cl:"captain",sc:"storeroom",t:{ko:"바뀐 이름표",en:"The Swapped Labels"},
 brief:["거북이 스승님의 창고에는 신기한 물건이 든 상자가 많아요.","상자마다 무엇이 들었는지 알려 주는 이름표가 붙어 있어요.","그런데 보라냥이 이름표를 몽땅 비슷한 낱말로 바꿔 붙였어요!","\"'모래시계' 상자에 '모래성' 이름표가 붙어 있구나.\" 스승님이 한숨을 쉬었어요."],
 q:{ask:"보라냥이 바꿔 붙인 것은 무엇일까?",a:["이름표","🏷️"],o:[["열쇠","🔑"],["지도","🗺️"]],clue:"이름표",note:"창고 상자의 이름표가 바뀌었어요."},
 spots:[{k:"a",ic:"🏷️",x:30,y:58,n:"보라색 이름표",t:"'모래성' 이름표 글씨가 보라색이에요. 다른 이름표는 모두 까만 글씨예요."},
  {k:"b",ic:"🖊️",x:58,y:86,n:"보라색 펜",t:"선반 밑에 뚜껑이 열린 보라색 펜이 굴러다녀요."},
  {k:"c",ic:"📜",x:74,y:70,n:"물건 목록",t:"스승님의 물건 목록이에요. 상자마다 무엇이 들었는지 설명이 적혀 있어요."},
  {k:"d",ic:"🕸️",x:18,y:48,decoy:1,t:"구석에 거미줄이 있어요. 단서는 아니에요."}],
 talk:[{w:"spider",t:"\"어젯밤 창고 창문으로 보라색 고양이가 들어가는 걸 봤어.\""},
  {w:"v",t:"\"나는 펜 같은 건 가져 본 적도 없다냥!\"",lie:1,proof:["b","a"]},
  {w:"squirrel",t:"\"스승님은 상자마다 설명을 꼼꼼히 적어 두셨어.\""}],
 sk:{type:"quiz",skin:"riddle",title:"물건 목록의 수수께끼",
  qs:[{lines:["모래가 위에서 아래로 사르르 떨어져요.","모래가 다 떨어지면 시간이 다 된 거예요."],ask:"이것은 무엇일까요?",a:["모래시계","⏳"],o:[["모래성","🏰"],["시계탑","🕰️"]],clue:"시간이 다 된"},
   {lines:["동그란 유리로 되어 있어요.","작은 것을 크게 보여 줘요.","탐정이 단서를 찾을 때 써요."],ask:"이것은 무엇일까요?",a:["돋보기","🔍"],o:[["안경","👓"],["거울","🪞"]],clue:"크게 보여 줘요"},
   {lines:["어두운 밤에 불을 켜면 환해져요.","손에 들고 깜깜한 길을 비춰요."],ask:"이것은 무엇일까요?",a:["손전등","🔦"],o:[["우산","☂️"],["부채","🪭"]],clue:"길을 비춰요"}]},
 ded:[{s:"범인은 바로 ___!",a:"보라냥",o:["스피니","다람쥐"]},{s:"바뀐 이름표는 ___ 글씨였어요.",a:"보라색",o:["까만","하얀"]}],
 hl:"바람처럼 조용히, 수수께끼를 모두 풀었어!",vl:"비슷한 낱말이면 헷갈릴 줄 알았는데… 칫!",
 story:["보라냥이 스승님 창고의 이름표를 비슷한 낱말로 바꿔 붙였어요.","수비대는 보라색 펜과 보라색 글씨 이름표를 찾았어요.","바람 뱀은 물건 설명을 읽고 수수께끼를 하나씩 풀었어요.","이제 모든 상자에 바른 이름표가 붙어 있어요."]},

{id:"k7",h:"horse",vil:"gray",cl:"squirrel",sc:"bakery",t:{ko:"뒤섞인 순서표",en:"The Mixed-up Recipe"},
 brief:["다람쥐는 친구들에게 줄 도토리 쿠키를 굽기로 했어요.","빵집 벽에는 쿠키 만드는 순서표가 붙어 있어요.","그런데 순서표 그림이 뒤죽박죽 섞여 있었어요!","\"순서가 엉망이면 쿠키도 엉망이 될 거예요.\" 다람쥐가 울상을 지었어요."],
 q:{ask:"다람쥐는 무엇을 만들려고 할까?",a:["도토리 쿠키","🍪"],o:[["딸기 케이크","🍰"],["김밥","🍙"]],clue:"도토리 쿠키",note:"쿠키 순서표가 뒤섞였어요."},
 spots:[{k:"a",ic:"📋",x:24,y:56,n:"잘린 순서표",t:"순서표 그림이 가위로 잘려서 아무렇게나 붙어 있어요."},
  {k:"b",ic:"✂️",x:48,y:86,n:"회색 털 가위",t:"식탁 밑에 가위가 떨어져 있어요. 가위에 회색 털이 붙어 있어요."},
  {k:"c",ic:"🐾",x:76,y:80,n:"밀가루 발자국",t:"바닥 밀가루 위에 고양이 발자국이 찍혀 있어요. 발자국은 뒷문으로 이어져요."},
  {k:"d",ic:"🥛",x:64,y:62,decoy:1,t:"우유가 가득 든 병이에요. 쿠키에 넣을 거예요."}],
 talk:[{w:"beaver",t:"\"아침에 회색 고양이가 가위를 들고 빵집 뒷문으로 나왔어.\""},
  {w:"v",t:"\"나는 가위를 만진 적도 없다냥!\"",lie:1,proof:["b"]},
  {w:"spider",t:"\"어제까지 순서표는 멀쩡했어.\""}],
 sk:{type:"order",title:"쿠키 만드는 순서",items:[{ev:["밀가루와 버터를 섞어요.","반죽을 동글동글 빚어요.","오븐에 노릇노릇 구워요."],e:["🥣","👐","🔥"],k:["섞어요","빚어요","구워요"]},
  {ev:["따끈한 쿠키를 식혀요.","쿠키를 상자에 담아요.","친구들에게 나눠 줘요."],e:["❄️","📦","🎁"],k:["식혀요","담아요","나눠 줘요"]}]},
 ded:[{s:"범인은 바로 ___!",a:"회색냥",o:["비버","스피니"]},{s:"가위에 ___ 털이 붙어 있었어요.",a:"회색",o:["하얀","노란"]}],
 hl:"시간의 길을 달려라! 순서대로 하니까 맛있는 쿠키 완성!",vl:"순서를 섞으면 재밌을 줄 알았는데… 살금살금 도망가야지냥.",
 story:["회색냥이 다람쥐의 쿠키 순서표를 가위로 잘라 뒤섞었어요.","수비대는 회색 털이 붙은 가위와 밀가루 발자국을 찾았어요.","질주 말은 일이 일어나는 순서를 차례차례 맞췄어요.","다람쥐는 고소한 도토리 쿠키를 친구들에게 나눠 주었어요."]},

{id:"k8",h:"sheep",vil:"fat",cl:"beaver",sc:"library",t:{ko:"뒤섞인 친구 카드",en:"The Mixed-up Friend Cards"},
 brief:["비버는 마을 도서관 벽에 친구 소개 카드를 붙였어요.","카드에는 친구 그림과 좋아하는 것이 쓰여 있어요.","그런데 밤사이 카드가 몽땅 뒤섞였어요!","\"다람쥐 그림 아래에 '바다에서 헤엄쳐요.'라고 쓰여 있어요.\" 비버가 깜짝 놀랐어요."],
 q:{ask:"밤사이 뒤섞인 것은 무엇일까?",a:["친구 소개 카드","🪪"],o:[["그림책","📚"],["연필","✏️"]],clue:"친구 소개 카드",note:"친구 소개 카드가 뒤섞였어요."},
 spots:[{k:"a",ic:"🍪",x:34,y:84,n:"과자 부스러기",t:"책장 앞에 과자 부스러기가 잔뜩 떨어져 있어요."},
  {k:"b",ic:"🐾",x:72,y:76,n:"큰 발자국",t:"창문 아래에 동글동글한 큰 고양이 발자국이 있어요."},
  {k:"c",ic:"📘",x:54,y:66,n:"'친구 소개' 책",t:"'친구 소개' 책이에요. 친구들이 좋아하는 것이 바르게 적혀 있어요."},
  {k:"d",ic:"💡",x:20,y:52,decoy:1,t:"램프가 따뜻하게 빛나요. 단서는 아니에요."}],
 talk:[{w:"squirrel",t:"\"어젯밤 도서관에서 냠냠 과자 먹는 소리가 들렸어.\""},
  {w:"v",t:"\"나는 도서관에 간 적도 없다냥! 과자도 안 먹었다냥!\"",lie:1,proof:["a","b"]},
  {w:"gull",t:"\"배가 볼록한 고양이가 카드를 한 아름 안고 나가는 걸 봤어.\""}],
 sk:{type:"who",title:"'친구 소개' 책",
  qs:[{lines:["나는 강에서 헤엄치는 걸 좋아해요.","나무를 갉아서 집을 지어요."],a:"beaver",o:["squirrel","gull"],clue:"집을 지어요"},
   {lines:["나는 나무를 잘 타요.","겨울이 오기 전에 도토리를 모아요."],a:"squirrel",o:["mole","spider"],clue:"도토리를 모아요"},
   {lines:["내 몸에는 뾰족한 가시가 있어요.","땅속 광산에서 반짝이는 수정을 캐요."],a:"mole",o:["beaver","gull"],clue:"수정을 캐요"}]},
 ded:[{s:"범인은 바로 ___!",a:"뚱냥",o:["다람쥐","갈매기"]},{s:"책장 앞에 ___ 부스러기가 떨어져 있었어요.",a:"과자",o:["빵","나뭇잎"]}],
 hl:"포근한 구름 방패! 친구 카드는 내가 지켜 줄게.",vl:"과자만 먹으려고 했는데… 카드는 실수였다냥!",
 story:["뚱냥이 과자를 먹으며 도서관의 친구 카드를 뒤섞었어요.","수비대는 과자 부스러기와 큰 발자국을 찾았어요.","구름 양은 '친구 소개' 책을 읽고 카드를 제자리에 붙였어요.","이제 누구나 친구들이 좋아하는 것을 바르게 알 수 있어요."]},

{id:"k9",h:"monkey",vil:"gray",cl:"spider",sc:"mill",t:{ko:"멈춘 물레방아",en:"The Stopped Waterwheel"},
 brief:["마을 개울가에는 커다란 물레방아가 있어요.","물레방아가 돌아야 밀을 빻아서 빵을 만들 수 있어요.","그런데 오늘 아침 물레방아가 멈춰 버렸어요!","\"물레방아가 왜 멈췄는지 모르겠어요.\" 스피니가 걱정했어요."],
 q:{ask:"멈춰 버린 것은 무엇일까?",a:["물레방아","🎡"],o:[["시계탑","🕰️"],["자전거","🚲"]],clue:"물레방아",note:"물레방아가 멈췄어요."},
 spots:[{k:"a",ic:"🪨",x:30,y:66,n:"막힌 개울",t:"개울 위쪽이 커다란 돌로 꽉 막혀 있어요. 그래서 물이 흐르지 않아요."},
  {k:"b",ic:"🐾",x:56,y:84,n:"회색 발자국",t:"개울가 진흙에 회색 고양이 발자국이 있어요."},
  {k:"c",ic:"🧤",x:42,y:76,n:"회색 장갑",t:"돌 옆에 회색 장갑이 떨어져 있어요. 장갑에 진흙이 잔뜩 묻어 있어요."},
  {k:"d",ic:"🐸",x:78,y:82,decoy:1,t:"개구리가 개굴개굴 울어요. 단서는 아니에요."}],
 talk:[{w:"beaver",t:"\"새벽에 회색 고양이가 돌을 낑낑 굴리고 있었어.\""},
  {w:"v",t:"\"물레방아는 원래 혼자 멈추는 거다냥! 나랑은 상관없다냥!\"",lie:1,proof:["a","c","b"]},
  {w:"mole",t:"\"어제 저녁까지 물레방아는 빙글빙글 잘 돌았어.\""}],
 sk:{type:"quiz",skin:"why",title:"왜 그럴까?",
  qs:[{lines:["물레방아가 멈췄어요."],ask:"왜 그럴까?",a:["개울이 돌로 막혀서 물이 흐르지 않았기 때문이에요.","🪨"],o:[["바람이 많이 불었기 때문이에요.","🌬️"],["물레방아가 졸렸기 때문이에요.","😴"]],clue:"물레방아가 멈췄어요",hint:"현장에서 찾은 단서를 떠올려 보렴. 개울 위쪽이 어떻게 되어 있었지?"},
   {lines:["마을 친구들이 밀을 빻을 수 없었어요."],ask:"왜 그럴까?",a:["물레방아가 멈췄기 때문이에요.","🎡"],o:[["밀이 너무 많았기 때문이에요.","🌾"],["비가 왔기 때문이에요.","🌧️"]],clue:"밀을 빻을 수 없었어요",hint:"물레방아가 돌아야 밀을 빻을 수 있다고 했지?"},
   {lines:["재주 원숭이가 개울을 막은 돌을 치웠어요."],ask:"그러면 어떻게 될까?",a:["물이 다시 흘러서 물레방아가 돌아요.","💧"],o:[["물레방아가 더 느려져요.","🐢"],["개울이 사라져요.","🏜️"]],clue:"돌을 치웠어요",hint:"물이 흐르지 않아서 물레방아가 멈췄었지. 돌을 치우면 물은 어떻게 될까?"}]},
 ded:[{s:"범인은 바로 ___!",a:"회색냥",o:["비버","고슴도치"]},{s:"개울이 커다란 ___로 막혀 있었어요.",a:"돌",o:["나무","얼음"]}],
 hl:"까닭을 알면 고칠 수 있지! 물레방아야, 다시 돌아라!",vl:"물레방아가 돌면 심심하단 말이다냥…!",
 story:["회색냥이 커다란 돌로 개울을 막아서 물레방아가 멈췄어요.","수비대는 막힌 개울과 회색 장갑을 찾았어요.","재주 원숭이는 무엇 때문에 무슨 일이 생겼는지 차근차근 알아냈어요.","돌을 치우자 물이 흐르고 물레방아가 다시 빙글빙글 돌았어요."]},

{id:"k10",h:"rooster",vil:"white",cl:"gull",sc:"square",t:{ko:"엉터리 축제 안내문",en:"The Fake Festival Notice"},
 brief:["이번 주말에 마을 광장에서 별빛 축제가 열려요.","그런데 광장 게시판의 축제 안내문이 이상하게 바뀌었어요.","\"축제에는 반드시 백묘만 들어올 수 있어요.\"","안내문을 읽은 갈매기와 친구들은 축제에 못 갈까 봐 걱정했어요."],
 q:{ask:"마을 광장에서 열리는 축제는 무엇일까?",a:["별빛 축제","✨"],o:[["눈꽃 축제","❄️"],["꽃 축제","🌸"]],clue:"별빛 축제",note:"축제 안내문이 바뀌었어요."},
 spots:[{k:"a",ic:"📄",x:32,y:58,n:"덧붙인 종이",t:"진짜 안내문 위에 새 종이가 덧붙어 있어요. 종이 가장자리에 하얀 털이 붙어 있어요."},
  {k:"b",ic:"🧴",x:62,y:84,n:"'백' 풀통",t:"나무통 옆에 하얀 풀통이 있어요. 뚜껑에 '백'이라고 쓰여 있어요."},
  {k:"c",ic:"📰",x:44,y:76,n:"진짜 안내문",t:"덧붙인 종이를 살짝 들추니 그 밑에 진짜 안내문이 보여요."},
  {k:"d",ic:"🚩",x:80,y:62,decoy:1,t:"축제에 쓸 알록달록 깃발이에요. 단서는 아니에요."}],
 talk:[{w:"spider",t:"\"어젯밤 하얀 고양이가 풀통을 들고 게시판 앞에 서 있었어.\""},
  {w:"v",t:"\"내 안내문이 진짜다냥! 풀 같은 건 쓴 적도 없다냥!\"",lie:1,proof:["b","a"]},
  {w:"squirrel",t:"\"작년 축제에는 누구나 갈 수 있었어.\""}],
 sk:{type:"quiz",skin:"notice",title:"별빛 축제 안내",poster:[["언제","토요일 저녁 일곱 시"],["어디서","마을 광장"],["누가","누구나 올 수 있어요"],["준비물","작은 손전등"]],
  qs:[{ask:"축제는 언제 열릴까?",a:["토요일 저녁 일곱 시","🌙"],o:[["일요일 아침 아홉 시","🌅"],["토요일 낮 열두 시","☀️"]],clue:"토요일 저녁 일곱 시"},
   {ask:"누가 축제에 갈 수 있을까?",a:["누구나","🤗"],o:[["백묘만","🐱"],["아기들만","👶"]],clue:"누구나"},
   {ask:"무엇을 가져가야 할까?",a:["작은 손전등","🔦"],o:[["우산","☂️"],["수영복","🩱"]],clue:"작은 손전등"}]},
 ded:[{s:"범인은 바로 ___!",a:"백묘",o:["스피니","다람쥐"]},{s:"풀통 뚜껑에 '___'이라고 쓰여 있었어요.",a:"백",o:["흑","뚱"]}],
 hl:"꼬끼오! 진짜 안내문이 돌아왔어. 모두 함께 축제에 가자!",vl:"내 규칙대로 하는 축제가 더 멋질 텐데… 흥!",
 story:["백묘가 축제 안내문 위에 엉터리 종이를 덧붙였어요.","수비대는 '백'이라고 쓰인 풀통을 찾았어요.","새벽 닭은 진짜 안내문을 읽고 언제, 어디서, 누가 오는지 알려 주었어요.","토요일 저녁, 친구들은 모두 함께 별빛 축제를 즐겼어요."]},

{id:"k11",h:"dog",vil:"black",cl:"mole",sc:"mine",t:{ko:"사라진 등불",en:"The Missing Lantern"},
 brief:["고슴도치는 광산에서 반짝이는 수정을 캐요.","어두운 광산에서는 고슴도치의 등불이 꼭 필요해요.","그런데 오늘 아침 등불이 사라지고, 쪽지 한 장만 남아 있었어요.","\"등불이 없으면 깜깜해서 일을 할 수 없어요.\" 고슴도치가 한숨을 쉬었어요."],
 q:{ask:"고슴도치에게 꼭 필요한 것은 무엇일까?",a:["등불","🏮"],o:[["우산","☂️"],["모자","🎩"]],clue:"등불이 꼭 필요해요",note:"고슴도치의 등불이 사라졌어요."},
 spots:[{k:"a",ic:"📝",x:62,y:70,n:"흑묘의 쪽지",t:"수레 위에 쪽지가 있어요. '등불은 내가 가져간다냥. 찾을 테면 찾아봐라냥!'"},
  {k:"b",ic:"🐾",x:40,y:84,n:"까만 발자국",t:"광산 입구에 까만 고양이 발자국이 있어요. 발자국은 숲속 길로 이어져요."},
  {k:"c",ic:"🧭",x:22,y:74,n:"길 안내 메모",t:"길에 메모가 떨어져 있어요. 등불을 숨긴 곳으로 가는 길이 적혀 있어요."},
  {k:"d",ic:"🪨",x:80,y:56,decoy:1,t:"커다란 바위예요. 단서는 아니에요."}],
 talk:[{w:"gull",t:"\"새벽에 까만 고양이가 불빛을 들고 숲으로 들어갔어.\""},
  {w:"v",t:"\"나는 등불이 뭔지도 모른다냥!\"",lie:1,proof:["a","b"]},
  {w:"beaver",t:"\"고슴도치는 어제 등불을 광산 입구에 걸어 두었어.\""}],
 sk:{type:"steps",skin:"path",title:"길 안내 메모",lines:["광산에서 나와 왼쪽 길로 가요.","통나무 다리를 건너요.","큰 바위가 나오면 바위 뒤를 살펴봐요."],
  steps:[{t:"광산에서 나와 왼쪽 길로 가요.",a:["왼쪽 길","⬅️"],o:[["오른쪽 길","➡️"]],clue:"왼쪽 길"},
   {t:"통나무 다리를 건너요.",a:["통나무 다리","🪵"],o:[["돌다리","🪨"]],clue:"통나무 다리"},
   {t:"큰 바위가 나오면 바위 뒤를 살펴봐요.",a:["바위 뒤","🪨"],o:[["바위 위","⬆️"],["나무 옆","🌳"]],clue:"바위 뒤"}]},
 ded:[{s:"범인은 바로 ___!",a:"흑묘",o:["갈매기","비버"]},{s:"등불은 큰 바위 ___에 숨겨져 있었어요.",a:"뒤",o:["위","앞"]}],
 hl:"킁킁! 메모대로 따라갔더니 등불을 찾았어!",vl:"어둠 속이 좋은데… 불빛은 싫다냥!",
 story:["흑묘가 고슴도치의 등불을 가져가 바위 뒤에 숨겼어요.","수비대는 흑묘의 쪽지와 길 안내 메모를 찾았어요.","용감한 개는 메모에 적힌 길을 그대로 따라가 등불을 찾았어요.","고슴도치는 환한 등불을 들고 다시 광산에 들어갔어요."]},

{id:"k12",h:"pig",vil:"tiger",cl:"squirrel",sc:"news",t:{ko:"엉터리 신문 제목",en:"The Fake Headline"},
 brief:["다람쥐는 일주일에 한 번 '숲속 신문'을 만들어요.","이번 주 신문에는 비버가 낡은 다리를 고친 이야기가 실렸어요.","그런데 신문 제목이 '호랑이냥, 혼자서 다리를 고치다!'로 바뀌어 있었어요!","\"다리를 고친 건 비버인데…….\" 다람쥐가 속상해했어요."],
 q:{ask:"다람쥐가 만드는 것은 무엇일까?",a:["숲속 신문","📰"],o:[["그림책","📚"],["편지","✉️"]],clue:"숲속 신문",note:"신문 제목이 바뀌었어요."},
 spots:[{k:"a",ic:"🖋️",x:46,y:70,n:"주황색 잉크",t:"책상 위에 주황색 잉크가 엎질러져 있어요. 바뀐 제목도 주황색 글씨예요."},
  {k:"b",ic:"🧡",x:76,y:62,n:"줄무늬 털",t:"창문 틈에 주황색 줄무늬 털이 끼어 있어요."},
  {k:"c",ic:"📷",x:24,y:58,n:"다리 사진",t:"벽에 붙은 사진에는 비버가 망치로 다리를 고치는 모습이 찍혀 있어요."},
  {k:"d",ic:"☕",x:62,y:84,decoy:1,t:"따뜻한 코코아 잔이에요. 단서는 아니에요."}],
 talk:[{w:"spider",t:"\"밤에 줄무늬 고양이가 신문사 창문으로 들어갔어.\""},
  {w:"v",t:"\"다리는 내가 혼자 고쳤다냥! 내가 최고다냥!\"",lie:1,proof:["c"]},
  {w:"beaver",t:"\"나는 사흘 동안 다리를 고쳤어. 판자를 하나하나 바꿨지.\""}],
 sk:{type:"quiz",skin:"news",title:"숲속 신문 기사",lines:["비버가 강의 낡은 다리를 고쳤어요.","비버는 사흘 동안 썩은 판자를 하나하나 바꿨어요.","이제 친구들은 튼튼한 다리를 건너 학교에 가요.","친구들은 비버에게 고맙다고 말했어요."],
  qs:[{ask:"이 글에 가장 알맞은 제목은 무엇일까?",a:["비버, 낡은 다리를 고치다","🦫"],o:[["호랑이냥, 혼자서 다리를 고치다","🐯"],["친구들, 학교에 가다","🏫"]],clue:"비버가 강의 낡은 다리를 고쳤어요"},
   {ask:"비버는 며칠 동안 다리를 고쳤을까?",a:["사흘","3️⃣"],o:[["하루","1️⃣"],["열흘","🔟"]],clue:"사흘 동안"}]},
 ded:[{s:"범인은 바로 ___!",a:"호랑이냥",o:["스피니","비버"]},{s:"바뀐 제목은 ___ 글씨였어요.",a:"주황색",o:["보라색","까만"]}],
 hl:"든든하게 정리 끝! 진짜 제목은 '비버, 낡은 다리를 고치다'야!",vl:"나도 칭찬받고 싶었단 말이다냥…!",
 story:["호랑이냥이 숲속 신문의 제목을 자기 자랑으로 바꿨어요.","수비대는 주황색 잉크와 다리 사진을 찾았어요.","든든 돼지는 신문 기사를 끝까지 읽고 가장 알맞은 제목을 골랐어요.","새 신문에는 '비버, 낡은 다리를 고치다'라는 제목이 크게 실렸어요."]}];

/* drawn fallback scenes for the 12 cases (1200×800). Used until a painted background is listed in KASSET.bg.
   .brk = only while broken, .fix = only after the case is solved (the world gets class "fixed"). */
const KZO='stroke="#3B2A1E" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"';
const kzDefs=`<defs>
 <linearGradient id="kzSkyD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CC8F8"/><stop offset="1" stop-color="#DDF3FF"/></linearGradient>
 <linearGradient id="kzSkyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC98A"/><stop offset="1" stop-color="#FFF1D6"/></linearGradient>
 <linearGradient id="kzSkyE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4B3A86"/><stop offset=".6" stop-color="#C86F8C"/><stop offset="1" stop-color="#F7B27A"/></linearGradient>
 <linearGradient id="kzSkyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161E45"/><stop offset="1" stop-color="#34437E"/></linearGradient>
 <linearGradient id="kzSkyM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A7D8F0"/><stop offset="1" stop-color="#F4F1E1"/></linearGradient>
 <linearGradient id="kzGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A6DB72"/><stop offset="1" stop-color="#5E9E3E"/></linearGradient>
 <linearGradient id="kzGrassA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9C46A"/><stop offset="1" stop-color="#8D8A3E"/></linearGradient>
 <linearGradient id="kzSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8E3AE"/><stop offset="1" stop-color="#E2BD78"/></linearGradient>
 <linearGradient id="kzFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98E55"/><stop offset="1" stop-color="#8E5A30"/></linearGradient>
 <linearGradient id="kzWallW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6DDB6"/><stop offset="1" stop-color="#E7C08E"/></linearGradient>
 <linearGradient id="kzWallB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A4A7A"/><stop offset="1" stop-color="#3E3360"/></linearGradient>
 <linearGradient id="kzSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CC6EE"/><stop offset="1" stop-color="#2A7FB8"/></linearGradient>
 <linearGradient id="kzRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A39A8E"/><stop offset="1" stop-color="#6E655C"/></linearGradient>
 <radialGradient id="kzGlow"><stop offset="0" stop-color="#FFF6B0" stop-opacity=".95"/><stop offset="1" stop-color="#FFD34D" stop-opacity="0"/></radialGradient>
 <pattern id="kzPlank" width="160" height="40" patternUnits="userSpaceOnUse"><rect width="160" height="40" fill="url(#kzFloor)"/><path d="M0 39.5 H160 M80 0 V40" stroke="#7A4A26" stroke-width="3" opacity=".55"/></pattern>
 <pattern id="kzCobble" width="80" height="44" patternUnits="userSpaceOnUse"><rect width="80" height="44" fill="#B9A58C"/><rect x="4" y="4" width="34" height="16" rx="7" fill="#CDBB9F"/><rect x="44" y="4" width="32" height="16" rx="7" fill="#C6B396"/><rect x="-16" y="25" width="34" height="16" rx="7" fill="#C6B396"/><rect x="24" y="25" width="34" height="16" rx="7" fill="#CDBB9F"/><rect x="64" y="25" width="34" height="16" rx="7" fill="#CDBB9F"/></pattern>
 <pattern id="kzBrick" width="60" height="30" patternUnits="userSpaceOnUse"><rect width="60" height="30" fill="#B5513A"/><path d="M0 0.5 H60 M0 15 H60 M30 0 V15 M0 15 V30 M60 15 V30" stroke="#7E3423" stroke-width="2.5"/></pattern></defs>`;
const kzCloud=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".92"><ellipse cx="0" cy="0" rx="60" ry="26"/><ellipse cx="-38" cy="8" rx="38" ry="20"/><ellipse cx="40" cy="8" rx="42" ry="20"/><ellipse cx="6" cy="-18" rx="36" ry="24"/></g>`;
const kzTree=(x,y,s,c1,c2)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect ${KZO} x="-14" y="-90" width="28" height="100" rx="8" fill="#8A5A2E"/><circle ${KZO} cx="0" cy="-130" r="70" fill="${c1}"/><circle cx="-26" cy="-150" r="28" fill="${c2}" opacity=".7"/><circle cx="24" cy="-118" r="20" fill="${c2}" opacity=".55"/></g>`;
const kzPine=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect ${KZO} x="-11" y="-40" width="22" height="50" rx="6" fill="#7A4E26"/><path ${KZO} d="M0 -250 L70 -140 L40 -140 L90 -60 L-90 -60 L-40 -140 L-70 -140Z" fill="${c||"#3E8E5A"}"/><path d="M0 -230 L36 -170 M0 -160 L50 -90" stroke="#fff" stroke-opacity=".25" stroke-width="6" fill="none"/></g>`;
const kzBush=(x,y,s,c,berry)=>`<g transform="translate(${x} ${y}) scale(${s})"><path ${KZO} d="M-80 0 Q-90 -50 -45 -60 Q-30 -95 10 -80 Q50 -100 70 -55 Q100 -40 85 0Z" fill="${c||"#4F9B4A"}"/>${berry?`<g fill="#E8473A" stroke="#3B2A1E" stroke-width="2"><circle cx="-30" cy="-40" r="8"/><circle cx="12" cy="-56" r="8"/><circle cx="44" cy="-30" r="8"/><circle cx="-6" cy="-24" r="7"/></g>`:""}</g>`;
const kzRockS=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path ${KZO} d="M-70 0 Q-80 -40 -40 -55 Q0 -78 40 -56 Q78 -40 72 0Z" fill="url(#kzRock)"/><path d="M-30 -40 Q0 -58 30 -42" stroke="#fff" stroke-opacity=".3" stroke-width="6" fill="none"/></g>`;
const kzHills=(c1,c2,y)=>`<path d="M0 ${y} Q200 ${y-120} 420 ${y-40} T860 ${y-60} T1200 ${y-30} V800 H0Z" fill="${c1}"/><path d="M0 ${y+40} Q260 ${y-50} 560 ${y+20} T1200 ${y} V800 H0Z" fill="${c2}"/>`;
const kzTufts=(pts,c)=>pts.map(([x,y])=>`<path d="M${x} ${y} l-10 -22 M${x} ${y} l2 -26 M${x} ${y} l12 -20" stroke="${c||"#4E8A34"}" stroke-width="5" stroke-linecap="round"/>`).join("");
const kzHouse=(x,y,s,wall,roof)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect ${KZO} x="-80" y="-120" width="160" height="120" rx="6" fill="${wall}"/><path ${KZO} d="M-100 -116 L0 -200 L100 -116Z" fill="${roof}"/><rect ${KZO} x="-22" y="-62" width="44" height="62" rx="8" fill="#7A4E26"/><rect ${KZO} x="-66" y="-94" width="34" height="30" rx="4" fill="#FFE9A8"/><rect ${KZO} x="32" y="-94" width="34" height="30" rx="4" fill="#FFE9A8"/></g>`;
function kzScene(sc){const S={
 store:`<rect width="1200" height="800" fill="url(#kzSkyA)"/>${kzCloud(900,170,1)}${kzHills("#E7A55A","#C98B46",460)}
  <rect y="480" width="1200" height="320" fill="url(#kzGrassA)"/><path d="M420 800 Q520 640 560 560 Q600 520 700 560 Q760 640 900 800Z" fill="#D9B27A"/>
  ${kzPine(1060,610,1.15,"#4E8B4E")}${kzBush(840,560,1,"#5C9A44",1)}
  <g><path ${KZO} d="M250 720 Q270 520 300 380 Q320 300 280 220 L560 220 Q520 300 540 380 Q570 520 600 720Z" fill="#9A6234"/><path d="M330 300 Q360 500 340 700 M500 300 Q480 520 520 700" stroke="#6E4220" stroke-width="6" fill="none" opacity=".6"/>
   <circle ${KZO} cx="300" cy="190" r="110" fill="#E9822F"/><circle ${KZO} cx="470" cy="160" r="130" fill="#F2A541"/><circle ${KZO} cx="590" cy="220" r="90" fill="#D9622B"/><circle cx="420" cy="120" r="50" fill="#FFC56B" opacity=".6"/>
   <path ${KZO} d="M350 700 V560 A75 75 0 0 1 500 560 V700Z" fill="#6B3E1C"/><g class="brk"><path d="M362 696 V562 A63 63 0 0 1 488 562 V696Z" fill="#8A5428"/><path d="M425 520 V696" stroke="#5A3214" stroke-width="5"/><circle cx="470" cy="620" r="9" fill="#2B2B2B"/><rect x="466" y="624" width="8" height="18" fill="#2B2B2B"/></g>
   <g class="fix"><path d="M362 696 V562 A63 63 0 0 1 488 562 V696Z" fill="#2A160A"/><text x="380" y="670" font-size="44">🌰🌰</text><circle cx="425" cy="620" r="80" fill="url(#kzGlow)"/></g></g>
  ${kzRockS(330,668,.85)}${kzTufts([[150,700],[640,760],[780,690],[1000,740],[330,770]],"#7C7A2E")}
  <g fill="#E07B2C" opacity=".85"><ellipse cx="700" cy="740" rx="14" ry="7"/><ellipse cx="820" cy="770" rx="12" ry="6" fill="#C9541E"/><ellipse cx="180" cy="760" rx="12" ry="6"/></g>`,
 build:`<rect width="1200" height="800" fill="url(#kzSkyD)"/>${kzCloud(260,180,1.1)}${kzCloud(980,140,.8)}${kzHills("#8CCB6A","#74B85A",400)}
  <path d="M0 420 Q300 400 600 430 T1200 420 V490 Q900 470 600 495 T0 480Z" fill="url(#kzSea)"/><path d="M80 450 h60 M400 462 h80 M760 455 h70 M1040 450 h60" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>
  <rect y="486" width="1200" height="314" fill="url(#kzGrass)"/>${kzTufts([[60,500],[180,505],[1100,505],[1160,498]],"#3F7E3A")}
  <g ${KZO}><rect x="880" y="560" width="230" height="38" rx="18" fill="#B57A44"/><rect x="900" y="522" width="200" height="38" rx="18" fill="#C98A4B"/><rect x="930" y="484" width="150" height="38" rx="18" fill="#B57A44"/></g><g fill="#7A4E26"><circle cx="890" cy="579" r="10"/><circle cx="912" cy="541" r="10"/><circle cx="942" cy="503" r="10"/></g>
  <g ${KZO}><path d="M300 640 L320 600 H420 L440 640Z" fill="#9A6234"/><ellipse cx="370" cy="600" rx="62" ry="16" fill="#D9A066"/></g>
  <g fill="#9A9184" ${KZO}><rect x="600" y="690" width="60" height="26" rx="6"/><rect x="780" y="690" width="60" height="26" rx="6"/></g>
  <g ${KZO}><rect x="500" y="700" width="90" height="46" rx="6" fill="#C0392B"/><path d="M520 700 v-16 h50 v16" fill="none"/></g>${kzTufts([[140,720],[260,770],[1000,740],[700,780]])}`,
 race:`<rect width="1200" height="800" fill="url(#kzSkyD)"/>${kzCloud(600,150,1)}${kzHills("#9AD27A","#7CC060",420)}${kzTree(90,520,.9,"#4FA35A","#7CCB72")}${kzTree(1130,500,.8,"#4FA35A","#7CCB72")}
  <rect y="470" width="1200" height="330" fill="url(#kzGrass)"/><path d="M-40 800 Q300 560 700 560 Q1000 560 1260 640 L1260 720 Q1000 640 700 640 Q380 640 140 800Z" fill="#D9A86A" stroke="#B9874A" stroke-width="4"/>
  <path d="M120 790 Q380 600 700 600 Q980 600 1240 680" stroke="#fff" stroke-width="5" stroke-dasharray="26 22" fill="none" opacity=".8"/>
  <g ${KZO}><rect x="520" y="300" width="18" height="320" fill="#EDEDED"/><rect x="782" y="300" width="18" height="320" fill="#EDEDED"/><path d="M538 320 H782 V380 H538Z" fill="#FF7A59"/><path d="M538 320 l30 0 0 30 -30 0Z M598 320 h30 v30 h-30Z M658 320 h30 v30 h-30Z M718 320 h30 v30 h-30Z M568 350 h30 v30 h-30Z M628 350 h30 v30 h-30Z M688 350 h30 v30 h-30Z M748 350 h30 v30 h-30Z" fill="#fff" stroke="none"/></g>
  <path d="M0 250 Q300 300 600 260 T1200 250" stroke="#7A5A3A" stroke-width="3" fill="none"/><g>${[60,180,300,420,660,780,900,1020,1140].map((x,i)=>`<path d="M${x-18} ${262+Math.sin(i)*10} l18 34 l18 -34Z" fill="${["#FF5D73","#FFC93C","#4D9DFF","#3DDC97"][i%4]}"/>`).join("")}</g>
  <g ${KZO}><rect x="840" y="560" width="90" height="70" fill="#C0C7D6"/><rect x="930" y="520" width="90" height="110" fill="#FFD34D"/><rect x="1020" y="580" width="90" height="50" fill="#E5A15A"/></g>
  <g ${KZO}><rect x="250" y="560" width="170" height="20" rx="6" fill="#8A5A2E"/><path d="M265 580 V640 M405 580 V640" /></g>
  <g ${KZO}><rect x="620" y="420" width="110" height="80" rx="8" fill="#2F4858"/><path d="M675 500 V560" /></g>`,
 party:`<rect width="1200" height="800" fill="url(#kzSkyD)"/>${kzCloud(820,160,.9)}${kzTree(1080,470,1,"#54A84F","#86D07A")}${kzTree(140,450,.9,"#54A84F","#86D07A")}
  <rect y="440" width="1200" height="360" fill="url(#kzGrass)"/>
  <g>${Array.from({length:22},(_,i)=>`<rect ${KZO} x="${i*56}" y="430" width="34" height="96" rx="12" fill="#FFFFFF"/>`).join("")}<rect y="460" width="1200" height="12" fill="#fff" stroke="#3B2A1E" stroke-width="3"/></g>
  <g>${[80,200,980,1100].map((x,i)=>`<circle cx="${x}" cy="560" r="16" fill="${["#FF7EB6","#FFD34D","#B26BFF","#FF7EB6"][i]}"/><circle cx="${x+30}" cy="574" r="12" fill="${["#FFD34D","#FF7EB6","#FFD34D","#B26BFF"][i]}"/>`).join("")}</g>
  <g ${KZO}><rect x="380" y="540" width="440" height="40" rx="8" fill="#FFFFFF"/><path d="M380 580 Q420 640 460 580 Q500 640 540 580 Q580 640 620 580 Q660 640 700 580 Q740 640 780 580 Q800 620 820 580" fill="#F4F4F4"/><path d="M420 600 V700 M780 600 V700"/>
   <ellipse cx="600" cy="540" rx="70" ry="12" fill="#E0E0E0"/><rect x="590" y="500" width="20" height="40" fill="#E0E0E0"/><ellipse cx="600" cy="500" rx="60" ry="10" fill="#F2F2F2"/>
   <g class="fix"><rect x="552" y="430" width="96" height="66" rx="14" fill="#FFB6C8"/><rect x="552" y="430" width="96" height="22" rx="10" fill="#FFF"/><circle cx="580" cy="426" r="10" fill="#E8473A"/><circle cx="620" cy="426" r="10" fill="#E8473A"/></g>
   <circle cx="450" cy="532" r="14" fill="#7FD3F7"/><circle cx="750" cy="532" r="14" fill="#FFD34D"/></g>
  <g ${KZO}><path d="M220 470 V300" fill="none"/><ellipse cx="220" cy="270" rx="40" ry="50" fill="#FF5D73"/><path d="M260 470 V330" fill="none"/><ellipse cx="270" cy="300" rx="36" ry="46" fill="#4D9DFF"/><path d="M180 470 V340" fill="none"/><ellipse cx="172" cy="312" rx="34" ry="44" fill="#FFC93C"/></g>
  <path d="M0 230 Q300 290 600 240 T1200 230" stroke="#7A5A3A" stroke-width="3" fill="none"/>${[100,260,420,780,940,1100].map((x,i)=>`<path d="M${x-18} 252 l18 34 l18 -34Z" fill="${["#FF5D73","#FFC93C","#4D9DFF"][i%3]}"/>`).join("")}`,
 harbor:`<rect width="1200" height="800" fill="url(#kzSkyA)"/><circle cx="640" cy="320" r="60" fill="#FFE9A8"/>${kzCloud(400,180,.9)}
  <rect y="380" width="1200" height="120" fill="url(#kzSea)"/><path d="M60 420 h80 M300 450 h90 M560 430 h70 M820 455 h80" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>
  <path ${KZO} d="M940 500 Q960 300 1060 240 Q1160 210 1240 230 V500Z" fill="#A08C78"/><path ${KZO} d="M1010 500 Q1030 400 1090 390 Q1150 395 1160 500Z" fill="#1E1A2E"/>
  <rect y="480" width="1200" height="320" fill="url(#kzSand)"/>
  <g ${KZO}><path d="M150 560 L175 250 H245 L270 560Z" fill="#fff"/><path d="M160 460 H260 L255 400 H165Z M170 340 H250 L246 290 H174Z" fill="#E8473A"/><rect x="168" y="200" width="84" height="54" rx="8" fill="#FFE9A8"/><path d="M160 200 L210 150 L260 200Z" fill="#E8473A"/>
   <g class="fix"><path d="M210 226 L-40 120 L-40 330Z" fill="#FFF6B0" opacity=".55" stroke="none"/><circle cx="210" cy="226" r="70" fill="url(#kzGlow)" stroke="none"/></g></g>
  <g ${KZO}><rect x="300" y="520" width="520" height="40" fill="#B57A44"/>${[320,420,520,620,720,800].map(x=>`<rect x="${x}" y="560" width="18" height="70" fill="#8A5A2E"/>`).join("")}</g>
  <g ${KZO}><rect x="736" y="470" width="16" height="110" fill="#6B4A2A"/><rect x="700" y="420" width="88" height="60" rx="14" fill="#E8473A"/><rect x="716" y="440" width="56" height="10" rx="4" fill="#3B2A1E"/></g>
  <g fill="#F7C6C6" stroke="#3B2A1E" stroke-width="3"><path d="M900 740 q14 -24 28 0z"/><path d="M120 720 q12 -20 24 0z"/></g>${kzTufts([[1000,620],[60,640]],"#9C8B3E")}`,
 storeroom:`<rect width="1200" height="800" fill="url(#kzWallW)"/><rect y="540" width="1200" height="40" fill="#B98552" stroke="#3B2A1E" stroke-width="3"/><rect y="580" width="1200" height="220" fill="url(#kzPlank)"/>
  <g ${KZO}><circle cx="640" cy="330" r="92" fill="#BFE7FF"/><path d="M640 238 V422 M548 330 H732" stroke-width="8"/></g>
  <g ${KZO}><rect x="100" y="230" width="380" height="330" fill="#8A5A2E"/>${[300,400,500].map(y=>`<rect x="100" y="${y}" width="380" height="14" fill="#6E4220"/>`).join("")}
   ${[[120,250,"#C98A4B"],[200,262,"#B57A44"],[300,248,"#D9A066"],[390,256,"#C98A4B"],[130,350,"#B57A44"],[240,344,"#D9A066"],[350,352,"#C98A4B"],[140,448,"#D9A066"],[260,452,"#C98A4B"],[380,444,"#B57A44"]].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="70" height="${300-(y%100)-2>0?48:48}" rx="6" fill="${c}"/><rect x="${x+14}" y="${y+16}" width="42" height="14" rx="3" fill="#FFF6DC" class="lbl"/>`).join("")}</g>
  <g class="fix">${[[134,266],[214,278],[314,264],[404,272],[144,366],[254,360],[364,368],[154,464],[274,468],[394,460]].map(([x,y])=>`<rect x="${x}" y="${y}" width="42" height="14" rx="3" fill="#B6F5C8"/>`).join("")}</g>
  <g ${KZO}><rect x="760" y="520" width="300" height="30" rx="6" fill="#8A5A2E"/><path d="M780 550 V680 M1040 550 V680"/><rect x="820" y="490" width="110" height="34" rx="8" fill="#F6E7C1"/><rect x="980" y="470" width="16" height="50" fill="#FFF"/><path d="M988 470 q-8 -20 0 -30 q8 10 0 30" fill="#FFB347"/></g>
  <path d="M100 160 Q140 200 100 240 M100 160 Q150 170 170 150 M100 200 Q130 190 150 210" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`,
 bakery:`<rect width="1200" height="800" fill="url(#kzWallW)"/><rect y="560" width="1200" height="240" fill="url(#kzPlank)"/>
  <g ${KZO}><rect x="40" y="250" width="230" height="330" rx="20" fill="url(#kzBrick)"/><path d="M80 560 V450 A75 75 0 0 1 230 450 V560Z" fill="#2A160A"/><ellipse cx="155" cy="530" rx="60" ry="22" fill="#FF8A3D" class="fire"/><ellipse cx="155" cy="530" rx="34" ry="12" fill="#FFD34D"/></g>
  <g ${KZO}><rect x="290" y="330" width="150" height="190" rx="6" fill="#FFFDF4"/><g class="brk"><rect x="306" y="352" width="56" height="44" fill="#FFE0B2" transform="rotate(-8 334 374)"/><rect x="368" y="350" width="56" height="44" fill="#C8E6C9" transform="rotate(10 396 372)"/><rect x="310" y="420" width="56" height="44" fill="#BBDEFB" transform="rotate(6 338 442)"/><rect x="372" y="426" width="56" height="44" fill="#F8BBD0" transform="rotate(-12 400 448)"/></g>
   <g class="fix"><rect x="306" y="350" width="56" height="44" fill="#FFE0B2"/><rect x="370" y="350" width="56" height="44" fill="#C8E6C9"/><rect x="306" y="420" width="56" height="44" fill="#BBDEFB"/><rect x="370" y="420" width="56" height="44" fill="#F8BBD0"/></g></g>
  <g ${KZO}><rect x="460" y="520" width="400" height="34" rx="6" fill="#B57A44"/><path d="M490 554 V690 M830 554 V690"/><ellipse cx="560" cy="510" rx="56" ry="18" fill="#FFF"/><ellipse cx="560" cy="500" rx="40" ry="12" fill="#F4EDE0"/><rect x="660" y="500" width="120" height="16" rx="8" fill="#D9A066"/><circle cx="740" cy="500" r="5" fill="#FFF" opacity=".8"/></g>
  <g ${KZO}><rect x="880" y="300" width="200" height="16" fill="#8A5A2E"/><rect x="900" y="250" width="40" height="50" rx="8" fill="#FFE9A8"/><rect x="960" y="256" width="40" height="44" rx="8" fill="#E8F4FF"/><rect x="1020" y="250" width="40" height="50" rx="8" fill="#FFD3B4"/></g>
  <g ${KZO}><rect x="930" y="360" width="170" height="270" rx="8" fill="#5E3A1E"/><path d="M930 360 L1010 380 V650 L930 630Z" fill="#8A5A2E"/><circle cx="996" cy="510" r="6" fill="#FFD34D"/></g>
  <g fill="#fff" opacity=".7"><ellipse cx="700" cy="720" rx="90" ry="14"/><ellipse cx="900" cy="680" rx="60" ry="10"/></g>`,
 library:`<rect width="1200" height="800" fill="url(#kzWallB)"/><rect y="580" width="1200" height="220" fill="url(#kzPlank)"/>
  <g ${KZO}><path d="M420 560 V300 A90 90 0 0 1 600 300 V560Z" fill="url(#kzSkyN)"/><path d="M510 210 V560 M420 400 H600" stroke-width="7"/></g><g fill="#FFF6B0">${[[450,280],[560,250],[470,360],[580,330],[530,470],[455,500]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4"/>`).join("")}</g>
  ${[[40,"#8A5A2E"],[930,"#7A4E26"]].map(([x,c])=>`<g ${KZO}><rect x="${x}" y="220" width="230" height="360" fill="${c}"/>${[300,380,460].map(y=>`<rect x="${x}" y="${y}" width="230" height="12" fill="#5A3818"/>`).join("")}${Array.from({length:18},(_,i)=>`<rect x="${x+10+(i%6)*36}" y="${232+Math.floor(i/6)*80}" width="${24+(i%3)*4}" height="${64-(i%4)*6}" y2="0" rx="3" fill="${["#E8473A","#4D9DFF","#FFC93C","#3DDC97","#B26BFF","#FF8A3D"][i%6]}" transform="translate(0 ${(i%4)*6})"/>`).join("")}</g>`).join("")}
  <g ${KZO}><rect x="640" y="300" width="250" height="190" rx="8" fill="#C9935E"/><g class="brk">${[[660,320,-10],[730,330,8],[810,318,-6],[670,400,12],[750,410,-8],[820,404,6]].map(([x,y,r])=>`<rect x="${x}" y="${y}" width="56" height="64" rx="4" fill="#FFFDF4" transform="rotate(${r} ${x+28} ${y+32})"/>`).join("")}</g>
   <g class="fix">${[[660,318],[738,318],[816,318],[660,404],[738,404],[816,404]].map(([x,y])=>`<rect x="${x}" y="${y}" width="56" height="64" rx="4" fill="#FFFDF4"/><circle cx="${x+28}" cy="${y+24}" r="12" fill="#FFD9A0"/>`).join("")}</g></g>
  <g ${KZO}><rect x="520" y="560" width="260" height="30" rx="6" fill="#8A5A2E"/><path d="M540 590 V700 M760 590 V700"/><path d="M710 560 V500 L690 470 H750 L730 500" fill="#FFD34D"/><circle cx="720" cy="500" r="60" fill="url(#kzGlow)" stroke="none"/></g>
  <ellipse cx="400" cy="720" rx="200" ry="40" fill="#B04B5A" opacity=".7"/>`,
 mill:`<rect width="1200" height="800" fill="url(#kzSkyM)"/>${kzCloud(300,170,.9)}${kzHills("#9FD08A","#86BF72",420)}${kzTree(110,500,.9,"#5BA85A","#86D07A")}
  <rect y="460" width="1200" height="340" fill="url(#kzGrass)"/>
  <path d="M0 540 Q300 520 600 560 T1200 560 V630 Q900 610 600 640 T0 620Z" fill="#9C7B55"/>
  <path class="fix" d="M0 548 Q300 528 600 568 T1200 568 V622 Q900 604 600 632 T0 612Z" fill="url(#kzSea)"/>
  <path class="brk" d="M0 575 Q300 568 600 590 T1200 592" stroke="#5CC6EE" stroke-width="6" fill="none" opacity=".8"/>
  <g class="brk">${kzRockS(330,580,.9)}${kzRockS(410,590,.75)}${kzRockS(370,548,.6)}</g>
  <g ${KZO}><rect x="900" y="280" width="260" height="320" fill="#C9C0B4"/><path d="M880 290 L1030 190 L1180 290Z" fill="#B5513A"/><rect x="980" y="460" width="70" height="140" rx="8" fill="#7A4E26"/>${[[920,320],[1000,300],[1080,330],[940,400],[1100,410]].map(([x,y])=>`<rect x="${x}" y="${y}" width="40" height="24" rx="4" fill="#B3A99C"/>`).join("")}</g>
  <g transform="translate(830 460)"><g class="wheel"><circle ${KZO} r="140" fill="none" stroke-width="18" stroke="#8A5A2E"/><circle r="140" fill="none" stroke="#3B2A1E" stroke-width="4"/>${Array.from({length:8},(_,i)=>`<path d="M0 0 L${Math.cos(i*Math.PI/4)*140} ${Math.sin(i*Math.PI/4)*140}" stroke="#7A4E26" stroke-width="12"/><rect x="${Math.cos(i*Math.PI/4)*140-18}" y="${Math.sin(i*Math.PI/4)*140-12}" width="36" height="24" rx="4" fill="#A86A33" stroke="#3B2A1E" stroke-width="3" transform="rotate(${i*45} ${Math.cos(i*Math.PI/4)*140} ${Math.sin(i*Math.PI/4)*140})"/>`).join("")}<circle ${KZO} r="26" fill="#6E4220"/></g></g>
  <g ${KZO}><path d="M560 560 Q620 520 680 560" fill="none" stroke="#8A5A2E" stroke-width="16"/><path d="M560 560 Q620 520 680 560" fill="none" stroke="#3B2A1E" stroke-width="3"/></g>${kzTufts([[120,680],[240,720],[700,700],[1000,720],[1140,690]])}`,
 square:`<rect width="1200" height="800" fill="url(#kzSkyE)"/><circle cx="980" cy="200" r="40" fill="#FFE9C2" opacity=".9"/>
  ${kzHouse(140,470,1.2,"#F3D9B1","#B5513A")}${kzHouse(640,460,1,"#E8E1F5","#5B6EAE")}${kzHouse(880,470,1.15,"#FFE0C2","#3F8E6A")}${kzHouse(1120,470,1,"#F6E7C1","#B5513A")}
  <rect y="470" width="1200" height="330" fill="url(#kzCobble)"/>
  <path d="M200 300 Q420 380 640 320 Q860 380 1100 300" stroke="#3B2A1E" stroke-width="3" fill="none"/>${[260,340,420,500,580,700,780,860,940,1020].map((x,i)=>`<g><circle cx="${x}" cy="${330+Math.sin(i*1.3)*16}" r="13" fill="#7D6B5A" stroke="#3B2A1E" stroke-width="3"/><circle class="fix" cx="${x}" cy="${330+Math.sin(i*1.3)*16}" r="13" fill="#FFD34D"/><circle class="fix" cx="${x}" cy="${330+Math.sin(i*1.3)*16}" r="30" fill="url(#kzGlow)"/></g>`).join("")}
  <g ${KZO}><rect x="290" y="380" width="190" height="150" rx="8" fill="#8A5A2E"/><rect x="306" y="396" width="158" height="118" rx="4" fill="#C9935E"/><path d="M310 530 V620 M460 530 V620" stroke-width="10"/><rect x="322" y="406" width="126" height="96" rx="3" fill="#FFFDF4"/>
   <g class="brk"><rect x="330" y="412" width="108" height="80" fill="#F2F2F2" transform="rotate(-4 384 452)"/><path d="M344 432 h70 M344 452 h80 M344 472 h60" stroke="#B0B0B0" stroke-width="5"/></g><g class="fix"><text x="330" y="440" font-size="20" font-weight="700" fill="#5B3F8C">★ 별빛 축제 ★</text><path d="M340 460 h80 M340 480 h60" stroke="#C59A5B" stroke-width="5"/></g></g>
  <g ${KZO}><ellipse cx="1000" cy="610" rx="110" ry="30" fill="#A8BFD6"/><rect x="980" y="520" width="40" height="80" fill="#C9D6E3"/><ellipse cx="1000" cy="520" rx="50" ry="14" fill="#BFE7FF"/><path d="M1000 470 q-30 20 -40 50 M1000 470 q30 20 40 50" stroke="#7CC8F8" stroke-width="6" fill="none"/></g>
  <g ${KZO}><rect x="680" y="610" width="140" height="18" rx="6" fill="#8A5A2E"/><path d="M695 628 V670 M805 628 V670"/></g>`,
 mine:`<rect width="1200" height="800" fill="url(#kzSkyM)"/>${kzCloud(240,160,.8)}
  <path ${KZO} d="M380 640 Q420 300 640 220 Q860 160 1040 230 Q1220 300 1240 640Z" fill="url(#kzRock)"/><path d="M520 380 Q640 300 760 320 M900 300 Q1000 320 1060 380" stroke="#fff" stroke-opacity=".2" stroke-width="10" fill="none"/>
  <rect y="560" width="1200" height="240" fill="url(#kzGrassA)"/>${kzPine(120,600,.9)}${kzPine(250,620,.75)}<path d="M0 720 Q200 650 380 640" stroke="#C9A46A" stroke-width="40" fill="none" stroke-linecap="round"/>
  <g ${KZO}><path d="M690 620 V470 A90 90 0 0 1 870 470 V620Z" fill="#14101E"/><path d="M676 620 V460 M884 620 V460 M664 450 H896" stroke="#8A5A2E" stroke-width="22"/><path d="M676 620 V460 M884 620 V460 M664 450 H896" stroke="#3B2A1E" stroke-width="3" fill="none"/>
   <g class="fix"><circle cx="780" cy="540" r="110" fill="url(#kzGlow)" stroke="none"/><text x="752" y="566" font-size="52">🏮</text></g></g>
  <g stroke="#6E4220" stroke-width="8"><path d="M720 620 L560 800 M840 620 L760 800"/></g><g stroke="#8A5A2E" stroke-width="10">${[640,670,700,730,760].map((y,i)=>`<path d="M${700-i*28} ${y} H${840-i*16}"/>`).join("")}</g>
  <g ${KZO}><path d="M690 560 L800 560 L786 610 L704 610Z" fill="#7D8794"/><circle cx="716" cy="616" r="12" fill="#3B2A1E"/><circle cx="774" cy="616" r="12" fill="#3B2A1E"/></g>
  <g stroke="#3B2A1E" stroke-width="3">${[[960,440,"#7FD3F7"],[1000,470,"#B26BFF"],[600,420,"#7FD3F7"],[1080,500,"#7FD3F7"]].map(([x,y,c])=>`<path d="M${x} ${y} l14 -30 l14 30 l-14 18Z" fill="${c}"/>`).join("")}</g>`,
 news:`<rect width="1200" height="800" fill="url(#kzWallW)"/><rect y="580" width="1200" height="220" fill="url(#kzPlank)"/>
  <g ${KZO}><rect x="140" y="280" width="300" height="230" rx="6" fill="#C9935E"/>${[[160,300,-6],[260,296,5],[350,306,-3],[170,400,4],[280,404,-5]].map(([x,y,r])=>`<rect x="${x}" y="${y}" width="80" height="70" rx="3" fill="#FFFDF4" transform="rotate(${r} ${x+40} ${y+35})"/><rect x="${x+8}" y="${y+8}" width="64" height="40" fill="#BFD8E8" transform="rotate(${r} ${x+40} ${y+35})"/>`).join("")}</g>
  <g ${KZO}><rect x="840" y="250" width="240" height="220" rx="8" fill="#BFE7FF"/><path d="M960 250 V470 M840 360 H1080" stroke-width="8"/><rect x="826" y="466" width="268" height="18" rx="6" fill="#8A5A2E"/></g>
  <g ${KZO}><rect x="380" y="540" width="460" height="34" rx="6" fill="#8A5A2E"/><path d="M400 574 V700 M820 574 V700"/><rect x="430" y="440" width="190" height="100" rx="14" fill="#5E6B7A"/><circle cx="470" cy="490" r="26" fill="#8C99A8"/><rect x="520" y="470" width="80" height="40" rx="6" fill="#FFFDF4"/>
   <rect x="660" y="500" width="130" height="40" rx="4" fill="#FFFDF4"/><rect x="668" y="490" width="130" height="40" rx="4" fill="#F4EDE0"/><ellipse cx="560" cy="548" rx="40" ry="8" fill="#FF8A3D" opacity=".9"/></g>
  <g class="brk" ${KZO}><rect x="460" y="190" width="300" height="70" rx="6" fill="#FFFDF4"/><text x="486" y="236" font-size="28" font-weight="700" fill="#E07B2C">호랑이냥 최고!?</text></g>
  <g class="fix" ${KZO}><rect x="430" y="190" width="360" height="70" rx="6" fill="#FFFDF4"/><text x="452" y="236" font-size="26" font-weight="700" fill="#2E4A7A">비버, 낡은 다리를 고치다</text></g>`};
 return `<svg class="kzsvg" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">${kzDefs}${S[sc]||S.store}</svg>`}

/* ===== 사건 수사대 v2 engine =====
   KASSET lists art and music files published next to the page (empty = use the drawn fallbacks).
   bg.k1 = "case/k1.webp" · npc.squirrel / npc.squirrel_worried / npc.squirrel_happy · npc.v_black · det.rat · office · bgm.case|reveal|solved */
const KASSET={bg:{},npc:{},det:{},item:{},fix:{},office:"",bgm:{}};
/* friends: base · worried · happy · face (round avatar). Files: assets/img/npc/<id>[_worried|_happy|_face].webp */
(()=>{const P="assets/img/npc/";["squirrel","beaver","spider","mole","gull"].forEach(n=>["","_worried","_happy","_face"].forEach(m=>{KASSET.npc[n+m]=P+n+m+".webp"}));KASSET.npc.v_black=P+"v_black.webp";KASSET.npc.shop=P+"raccoon.webp"})();
/* painted backgrounds that already exist: case 3 runs on the same forest race track as book 1 */
KASSET.bg.k3="assets/img/scene/case03_race.webp";
if(KASSET.npc.v_black)DA.vb.black=KASSET.npc.v_black;
const KACTS=[["brief","📁","의뢰"],["search","🔍","조사"],["talk","💬","증언"],["skill","✨","기술"],["deduce","🧠","추리"],["solve","✅","해결"]];
let KZ=null,KBGM=null;
const markClue=(txt,cl)=>{let h=escH(txt);(Array.isArray(cl)?cl:[cl]).filter(Boolean).forEach(c=>{const e=escH(c);h=h.split(e).join(`<mark class="clue">${e}</mark>`)});return h};
const kzUnlocked=i=>i<3||!!(G.cases||{})[KC[i-1].id];
const kzStars=()=>KC.reduce((n,c)=>n+((G.cases||{})[c.id]||0),0);
const kzRank=n=>n>=30?["🏆","전설의 탐정"]:n>=18?["🕵️","명탐정"]:n>=6?["🔎","탐정"]:["🔰","견습 탐정"];
const kzHN=h=>L(CHARS.find(x=>x.id===h).n);
const kzName=w=>w==="v"?L(VIL[KZ.c.vil].n):KFN[w]||w;
const kzVoice=w=>w==="v"?"v_"+KZ.c.vil:w==="captain"?"mentor":w;
const kzNpcSrc=(id,mood)=>KASSET.npc[id+"_"+mood]||KASSET.npc[id]||"";
const kzIco=(key,emo)=>KASSET.item[key]?`<img class="kzico" src="${KASSET.item[key]}" alt="">`:emo;
function kzFace(w){
 if(w==="v")return `<span class="kzface vil">${vilArt(KZ.c.vil)}</span>`;
 if(w==="captain")return `<span class="kzface">${mentorArt()}</span>`;
 if(CHARS.some(c=>c.id===w))return `<span class="kzface">${heroArt(w,1)}</span>`;
 const f=KASSET.npc[w+"_face"];if(f)return `<span class="kzface"><img class="npf" src="${f}" alt=""></span>`;
 const s=kzNpcSrc(w,"");return `<span class="kzface">${s?`<img class="np" src="${s}" alt="">`:npcSVG(w,1)}</span>`}
function kzBody(w,mood){
 if(w==="v"){const v=KZ.c.vil,s=KASSET.npc["v_"+v]||DA.vb[v];return s?`<img class="kzimg" src="${s}" alt="">`:`<img class="kzimg head" src="${DA.vh[v]||PORT["v_"+v]}" alt="">`}
 if(w==="captain")return `<img class="kzimg" src="${DA.mentor||PORT.mentor}" alt="">`;
 if(CHARS.some(c=>c.id===w))return `<img class="kzimg" src="${KASSET.det[w]||heroBody(w)}" alt="">`;
 const s=kzNpcSrc(w,mood);return s?`<img class="kzimg np-${w}" src="${s}" alt="">`:`<span class="kzbadge">${npcSVG(w,1)}</span>`}
function kzActor(slot,w,mood,extra){const box=$("kzActors");if(!box)return null;let a=$("kzA"+slot);
 if(!a){a=document.createElement("div");a.id="kzA"+slot;box.appendChild(a)}
 a.className="kzact kz-"+slot+(extra?" "+extra:"");if(a.dataset.w!==(w||"")+"|"+(mood||"")){a.dataset.w=(w||"")+"|"+(mood||"");a.innerHTML=w?kzBody(w,mood)+`<span class="kzbub" hidden></span>`:""}return a}
function kzBubble(slot,txt,ms){const a=$("kzA"+slot),b=a&&a.querySelector(".kzbub");if(!b)return;b.textContent=txt;b.hidden=false;clearTimeout(b._t);b._t=setTimeout(()=>{b.hidden=true},ms||3200)}
function kzFx(cls,html,ms){const f=$("kzFx");if(!f)return null;const e=document.createElement("div");e.className=cls;e.innerHTML=html;f.appendChild(e);if(ms)setTimeout(()=>e.remove(),ms);return e}
const kzBanner=(ic,t,sub)=>kzFx("kzban",`<b>${ic} ${t}</b>${sub?`<small>${escH(sub)}</small>`:""}`,1800);
const kzStamp=(t,cls)=>{sfxPlay("stamp");return kzFx("kzstamp "+(cls||""),escH(t),1900)};
const kzPop=html=>kzFx("kzpop",html,1500);
function kzCutin(h){const K=KSK[h];kzFx("kzcut",`<img src="${KASSET.det[h]||heroBody(h)}" alt=""><div><small>${kzHN(h)}</small><b>${K.n}!</b><span>${K.d}</span></div>`,2200);sfxPlay("hero")||sfx2("whistle")}
function kzLunge(){const a=$("kzAL");if(!a)return;a.classList.remove("kz-lunge");void a.offsetWidth;a.classList.add("kz-lunge")}
function kzHit(){const a=$("kzAR");if(!a)return;a.classList.remove("kz-hit");void a.offsetWidth;a.classList.add("kz-hit");sfx("hit")}
function kzHearts(){const L=$("kzAL"),R=$("kzAR"),st=$("kzStage");if(!L||!R||!st)return;const s=st.getBoundingClientRect(),a=L.getBoundingClientRect(),z=R.getBoundingClientRect();
 for(let n=0;n<3;n++)setTimeout(()=>{const h=document.createElement("div");h.className="cheart";h.textContent="💗";h.style.left=(a.right-s.left-20)+"px";h.style.top=(a.top-s.top+a.height*.3)+"px";$("kzFx").appendChild(h);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{h.style.left=(z.left-s.left+z.width*.4)+"px";h.style.top=(z.top-s.top+z.height*.3)+"px"}));setTimeout(()=>h.remove(),850)},n*170)}
function kzConfetti(){const f=$("kzFx");if(!f)return;const C=["#FF5D73","#FFC93C","#3DDC97","#4D9DFF","#B26BFF"];for(let i=0;i<34;i++){const c=document.createElement("i");c.className="kzconf";c.style.left=Math.random()*100+"%";c.style.background=C[i%5];c.style.animationDelay=(Math.random()*.5)+"s";c.style.setProperty("--r",(Math.random()*720-360)+"deg");f.appendChild(c);setTimeout(()=>c.remove(),2600)}}
/* music: plays only when files are listed in KASSET.bgm; quieter while someone is talking */
function kzBgm(name,loop){bgmPlay(name,{loop:!!loop,fade:loop?1:.05})}
function kzBgmStop(){bgmStop(.5)}
const KAMB={store:"forest",race:"forest",party:"forest",mine:"forest",build:"river",mill:"river",harbor:"sea",square:"village",storeroom:"indoor",bakery:"indoor",library:"indoor",news:"indoor"};
/* reading: narrate line by line and light up the line being read */
function kzRead(lines,o){o=o||{};const els=o.els||[],tok=++KZ.rt;let i=0;
 const nx=()=>{if(!KZ||tok!==KZ.rt)return;els.forEach(e=>e&&e.classList.remove("rd"));if(i>=lines.length){o.done&&o.done();return}
  const e=els[i];if(e){e.classList.add("rd");e.scrollIntoView({block:"nearest",behavior:"smooth"})}
  narrate([lines[i]],()=>{i++;nx()},"ko",o.voice?{voice:o.voice}:o.who?{who:o.who}:{})};nx()}
function kzSay(text,voice,next,max){const K0=KZ;let done=false;const go=()=>{if(done)return;done=true;if(KZ!==K0)return;next&&next()};narrate([text],go,"ko",{voice});setTimeout(go,max||Math.max(2600,text.length*190))}
const kzLinesH=(lines,cls)=>lines.map(l=>`<p class="kzl ${cls||""}">${escH(l)}</p>`).join("");
function kzP(h){const p=$("kzPanel");p.innerHTML=h;p.scrollTop=0;p.querySelectorAll(".kzl").forEach(e=>e._t=e.textContent)}
function kzMark(words){if(!words||!words.length)return;$("kzPanel").querySelectorAll(".kzl").forEach(e=>{if(e._t!=null)e.innerHTML=markClue(e._t,words)})}
const kzMsg=t=>{const m=$("kzMsg");if(m)m.textContent=t||""};
function kzOK(el){sfx("ok");if(el){burstAt(el);el.classList.add("right")}KZ.miss=0;kzLunge()}
function kzNo(el,msg){sfx("bad");KZ.wrong++;KZ.miss++;if(el){el.classList.remove("pgno");void el.offsetWidth;el.classList.add("pgno","wrong");el.disabled=true}kzMsg(msg||"다시 읽어 보자!");
 if(KZ.miss>=2)setTimeout(()=>{if(KZ&&!KZ.busy)kzHelp()},700)}
function kzNextBtn(label,fn){const p=$("kzPanel"),b=document.createElement("button");b.className="btn pri kznext";b.innerHTML=label;b.onclick=()=>{if(b.disabled)return;b.disabled=true;hush();sfx("tap");fn()};p.appendChild(b);b.scrollIntoView({block:"nearest",behavior:"smooth"})}
function kzFlyNB(from,ic){flyTo(ic,from,$("kzNB"),"kzflyic").then(()=>{const b=$("kzNB");if(!b)return;$("kzNBn").textContent=KZ.nb.clues.length;b.classList.remove("got");void b.offsetWidth;b.classList.add("got");sfxPlay("note")||sfx2("plop")})}
function kzSteps(n){const ol=$("kzSteps");if(!ol)return;const cur=n==null?KZ.act:n;[...ol.children].forEach((li,i)=>{li.className=i<cur?"done":i===cur?"now":""})}
/* ---------- list ---------- */
function openCases(){hush();G.cases=G.cases||{};$("caseOv").hidden=false;caseList()}
function caseClose(){hush();kzBgmStop();ambStop();setTimeout(()=>{if(!KZ)bgmPlay("title")},700);$("caseOv").hidden=true;KZ=null;renderAll()}
function caseList(){KZ=null;kzBgmStop();ambStop();setTimeout(()=>{if(!KZ)bgmPlay("title")},700);const card=$("caseCard");card.className="card kzc";const n=kzStars(),R=kzRank(n),done=G.cases||{};
 card.innerHTML=`<div class="kzlist"${KASSET.office?` style="--office:url(${KASSET.office})"`:""}>
  <div class="kzlhead"><h2>🔎 ${K("Case Squad","사건 수사대")}</h2><span class="kzrank">${R[0]} ${R[1]} · ⭐ ${n}/36</span><button class="btn" id="cClose">${K("Close","닫기")}</button></div>
  <p class="kzrule">${K("Twelve heroes, twelve cases. Read the request, collect clues, catch the liar and name the culprit!","열두 영웅이 저마다의 읽기 기술로 사건을 풀어요. 의뢰를 읽고, 단서를 모으고, 거짓말을 밝혀 범인을 찾아라!")}</p>
  <div class="kzgrid">${KC.map((c,i)=>{const lock=!kzUnlocked(i),st=done[c.id]||0;return `<button class="kzfile${lock?" lock":""}${st?" solved":""}" data-k="${i}" ${lock?"disabled":""}>
   <span class="kzfno">${K("Case","사건")} ${i+1}</span><span class="kzfh">${heroArt(c.h,1)}</span><b>${L(c.t)}</b><small>${kzHN(c.h)} · ${KSK[c.h].n}</small><span class="kzfcl">${kzFace(c.cl)}<em>${K("Client","의뢰")}: ${kzName(c.cl)}</em></span>
   <span class="kzfv">${vilArt(c.vil)}</span><span class="kzfs">${lock?"🔒":st?"⭐".repeat(st)+"☆".repeat(3-st):"NEW"}</span>${st?`<span class="kzsolved">${K("SOLVED","해결")}</span>`:""}</button>`}).join("")}</div></div>`;
 $("cClose").onclick=caseClose;
 card.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{sfx("tap");caseStart(+b.dataset.k)});
}
/* ---------- case ---------- */
function caseStart(i){const c=KC[i];hush();
 KZ={c,i,act:0,wrong:0,miss:0,busy:false,rt:0,found:[],nb:{what:"",clues:[],lie:"",culprit:""},si:0,ss:{},hint:null,say:null};
 const card=$("caseCard");card.className="card kzc play";
 card.innerHTML=`<div class="kzwrap">
  <div class="kzhead"><button class="btn kzback" id="kzBack" aria-label="${K("Cases","사건 목록")}">←</button>
   <div class="kztitle"><small>${K("Case","사건")} ${i+1} · ${kzHN(c.h)}</small><b>${L(c.t)}</b></div>
   <ol class="kzsteps" id="kzSteps">${KACTS.map(a=>`<li><i>${a[1]}</i><span>${a[2]}</span></li>`).join("")}</ol>
   <button class="btn kznb" id="kzNB" aria-label="${K("Notebook","수첩")}">📒 <span id="kzNBn">0</span></button></div>
  <div class="kzstage" id="kzStage"><div class="kzworld gloom" id="kzWorld"><div class="kzscene">${KASSET.bg[c.id]?`<img class="kzbg" src="${KASSET.bg[c.id]}" alt="">`:kzScene(c.sc)}</div><div class="kzover" id="kzOver"></div><div class="kzspots" id="kzSpots"></div></div>
   <div class="kzactors" id="kzActors"></div><div class="kzfx" id="kzFx"></div><div class="kzlens" id="kzLens" hidden></div></div>
  <div class="kzpanel" id="kzPanel"></div>
  <div class="kzfoot"><p id="kzMsg"></p><div class="acts"><button class="btn" id="kzSay">🔊 ${K("Read","읽어 주기")}</button><button class="btn" id="kzHelp">🐢 ${K("Help","도움")}</button></div></div>
  <div class="kznote" id="kzNote" hidden></div></div>`;
 $("kzBack").onclick=()=>{hush();caseList()};$("kzNB").onclick=kzNote;$("kzHelp").onclick=()=>{if(KZ&&!KZ.busy)kzHelp()};$("kzSay").onclick=()=>{if(KZ&&KZ.say)KZ.say()};
 const st=$("kzStage"),lens=$("kzLens");st.onpointermove=st.onpointerdown=e=>{if(!KZ||KZ.act!==1){lens.hidden=true;return}const r=st.getBoundingClientRect();lens.hidden=false;lens.style.left=(e.clientX-r.left)+"px";lens.style.top=(e.clientY-r.top)+"px"};
 st.onpointerleave=()=>{lens.hidden=true};
 if(c.sk.skin==="build")$("kzOver").innerHTML=kzHut();
 const fxo=KASSET.fix[c.id];if(fxo)$("kzOver").insertAdjacentHTML("beforeend",`<img class="kzfixov" src="${fxo.src}" alt="" style="left:${fxo.x}%;top:${fxo.y}%;width:${fxo.w}%">`);
 kzFit();requestAnimationFrame(kzFit);kzBgm("case",true);ambPlay(KAMB[c.sc]);auPreload();kzGo(0);
}
function kzFit(){const st=$("kzStage"),w=$("kzWorld");if(!st||!w)return;const W=st.clientWidth,H=st.clientHeight;if(!W||!H)return;const s=Math.max(W/1200,H/800),ww=1200*s,wh=800*s;
 w.style.width=ww+"px";w.style.height=wh+"px";w.style.left=(W-ww)/2+"px";w.style.top=(H-wh)*.8+"px";w.style.setProperty("--u",(ww/100)+"px")}
window.addEventListener("resize",()=>{if(KZ)kzFit()});
function kzGo(n){KZ.act=n;KZ.miss=0;KZ.busy=false;KZ.si=0;KZ.ss={};KZ.hint=null;kzSteps();hush();kzMsg("");$("kzFx").querySelectorAll("#kzMap,#kzPath,#kzShields,.kzbox").forEach(e=>e.remove());const m=$("kzStage").querySelector(".dment");if(m)m.remove();
 [kzBrief,kzSearch,kzTalk,kzSkill,kzDeduce,kzSolve][n]()}
function kzHelp(){if(!KZ||!KZ.hint)return;const h=KZ.hint();if(!h)return;const old=$("kzStage").querySelector(".dment");if(old)old.remove();
 const d=document.createElement("div");d.className="dment";d.innerHTML=`<img src="${DA.mentor||PORT.mentor}" alt=""><div class="bub"><b>${K("Master Turtle","거북이 스승님")}</b>${escH(h.t)}</div>`;$("kzStage").appendChild(d);
 if(h.mark)kzMark(h.mark);narrate([h.t],null,"ko",{voice:"mentor"});setTimeout(()=>{if(d.isConnected)d.remove()},9000)}
function kzNote(){const n=$("kzNote");if(!n)return;if(!n.hidden){n.hidden=true;return}const N=KZ.nb;
 n.innerHTML=`<div class="kznh"><b>📒 ${K("Detective notebook","탐정 수첩")}</b><button class="btn" id="kzNX">✕</button></div>
  <div class="kzns"><em>📁 ${K("Case","사건")}</em><p>${N.what?escH(N.what):"…"}</p></div>
  <div class="kzns"><em>🔍 ${K("Clues","단서")} ${N.clues.length}/3</em>${N.clues.length?N.clues.map(s=>`<p><span class="ic">${kzIco(KZ.c.id+"_"+s.k,s.ic)}</span><b>${escH(s.n)}</b> ${escH(s.t)}</p>`).join(""):"<p>…</p>"}</div>
  <div class="kzns"><em>💬 ${K("Statements","증언")}</em><p>${N.lie?escH(N.lie):"…"}</p></div>
  <div class="kzns"><em>🕵️ ${K("Culprit","범인")}</em><p>${N.culprit?escH(N.culprit):"?"}</p></div>`;
 n.hidden=false;$("kzNX").onclick=()=>{n.hidden=true}}
/* 1 brief */
function kzBrief(){const c=KZ.c,q=c.q;kzActor("L",c.h);kzActor("R",c.cl,"worried",c.cl==="captain"?"":"kz-npc");kzActor("C",null);
 kzBanner("📁",K("Case request","사건 의뢰"),L(c.t));
 const opts=shuffle([q.a,...q.o]);
 kzP(`<div class="kzcard brief"><div class="kzch">${kzFace(c.cl)}<b>${kzName(c.cl)}${K("'s request","의 의뢰")}</b></div>${kzLinesH(c.brief)}</div>
  <div class="kzq" id="kzQ"><p class="kzask">❓ ${escH(q.ask)}</p><div class="kzopts">${opts.map(o=>`<button class="kzop" data-a="${escH(o[0])}"><span class="emo">${o[1]}</span>${escH(o[0])}</button>`).join("")}</div></div>`);
 const els=[...$("kzPanel").querySelectorAll(".kzcard .kzl")],toQ=()=>{const q2=$("kzQ");if(q2&&KZ&&KZ.act===0)q2.scrollIntoView({block:"nearest",behavior:"smooth"})};KZ.say=()=>kzRead(c.brief,{els,who:kzVoice(c.cl),done:toQ});
 if(autoNar())setTimeout(()=>{if(KZ&&KZ.act===0&&!KZ.busy)KZ.say()},1100);else setTimeout(toQ,2500);
 $("kzQ").querySelectorAll(".kzop").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;
  if(b.dataset.a===q.a[0]){kzOK(b);KZ.busy=true;KZ.nb.what=q.note;kzFlyNB(b,"📁");kzMsg("📒 "+q.note);$("kzQ").querySelectorAll(".kzop").forEach(x=>x.disabled=true);
   kzSay(q.note,"narrator",()=>{if(!KZ||KZ.act!==0)return;KZ.busy=false;kzBubble("L",K("Leave it to us!","우리가 해결할게!"),2600);kzNextBtn("🔍 "+K("Search the scene","현장 조사하러 가기"),()=>kzGo(1))},3200)}
  else kzNo(b,K("Read the request again!","의뢰를 다시 읽어 보자!"))});
 KZ.hint=()=>({t:`'${q.clue}'… 글에서 이 말을 찾아보렴.`,mark:[q.clue]});
}
/* 2 search */
function kzSearch(){const c=KZ.c,need=c.spots.filter(s=>!s.decoy).length;kzActor("R",null);kzActor("L",c.h,"","kz-small");
 kzBanner("🔍",K("Search the scene","현장 조사"),K("Tap the sparkles to find clues","반짝이는 곳을 눌러 단서를 찾아요"));
 const sp=$("kzSpots");sp.innerHTML=c.spots.map(s=>`<button class="kzspot" data-k="${s.k}" style="left:${s.x}%;top:${s.y}%" aria-label="${K("Look here","살펴보기")}"><i></i><span class="q">✨</span></button>`).join("");
 kzP(`<div class="kzcard"><div class="kzch"><b>🔍 ${K(`Find ${need} clues`,`단서 ${need}개를 찾아요`)}</b><span class="kzdots" id="kzDots">${"<i></i>".repeat(need)}</span></div><div id="kzClue"><p class="kzl dim">${K("Tap the sparkling spots in the picture.","그림 속 반짝이는 곳을 하나씩 눌러 보세요.")}</p></div></div>`);
 KZ.say=null;sp.querySelectorAll(".kzspot").forEach(b=>b.onclick=()=>kzSpot(b,need));
 KZ.hint=()=>{const left=c.spots.filter(s=>!s.decoy&&!KZ.found.includes(s.k));if(left[0]){const b=sp.querySelector(`[data-k="${left[0].k}"]`);b.classList.remove("hot");void b.offsetWidth;b.classList.add("hot")}return {t:`반짝이는 곳을 하나씩 눌러 보렴. 단서가 ${left.length}개 남았단다.`}};
}
function kzSpot(b,need){if(!KZ||KZ.act!==1)return;const s=KZ.c.spots.find(x=>x.k===b.dataset.k);if(!s)return;hush();const ico=kzIco(KZ.c.id+"_"+s.k,s.ic),sp=b.querySelector("span");sp.innerHTML=ico;sp.className=ico.startsWith("<img")?"img":"";
 const box=$("kzClue"),fresh=!s.decoy&&!KZ.found.includes(s.k);
 box.innerHTML=`<div class="kzcl${s.decoy?" decoy":""}"><span class="ic">${ico}</span><div><b>${s.decoy?K("Not a clue","단서가 아니에요"):escH(s.n)}</b><p class="kzl">${escH(s.t)}</p>${s.decoy?"":`<small>📒 ${K("Added to the notebook","수첩에 적었어요")}</small>`}</div></div>`;
 box.querySelectorAll(".kzl").forEach(e=>e._t=e.textContent);const p=box.querySelector(".kzl");KZ.say=()=>kzRead([s.t],{els:[p]});
 if(s.decoy){b.classList.add("seen","decoy");sfxPlay("notclue")||sfx2("pop");kzBubble("L",K("Hmm, not this one.","음, 이건 아니야."),1800)}
 else{b.classList.add("seen","got");if(fresh){KZ.found.push(s.k);KZ.nb.clues.push(s);sfxPlay("clue")||sfx("ok");burstAt(b);kzFlyNB(b,ico);kzBubble("L",K("A clue!","단서 발견!"),1800);
  const d=$("kzDots");if(d)d.children[KZ.found.length-1].classList.add("on")}}
 if(autoNar())KZ.say();
 if(fresh&&KZ.found.length>=need){KZ.busy=true;setTimeout(()=>{if(!KZ||KZ.act!==1)return;KZ.busy=false;kzMsg(K("All clues found!","단서를 모두 찾았어요!"));kzNextBtn("💬 "+K("Hear the witnesses","증언 들으러 가기"),()=>kzGo(2))},700)}
}
/* 3 talk: hear three statements, find the lie, show the clue that proves it */
function kzTalk(){const c=KZ.c;$("kzSpots").innerHTML="";kzBgm("tension",true);kzActor("L",c.h);kzActor("R","v","","kz-foe");
 kzBanner("💬",K("Witnesses","증언 듣기"),K("Listen to all three","세 명의 말을 잘 들어 봐요"));KZ.ss={ph:0,heard:new Set()};
 kzP(`<div class="kzcard"><div class="kzch"><b>💬 ${K("Statements","증언")}</b><small>${K("Tap a speech bubble to hear it","말풍선을 누르면 들을 수 있어요")}</small></div>
  <div class="kzwit">${c.talk.map((t,i)=>`<button class="kzw" data-i="${i}">${kzFace(t.w)}<span class="kzwb"><span class="kzwn">${kzName(t.w)}</span><span class="kzwt kzl">${escH(t.t)}</span></span></button>`).join("")}</div></div><div class="kzq" id="kzQ"></div>`);
 const rows=[...$("kzPanel").querySelectorAll(".kzw")];
 const hear=(i,done)=>{const t=c.talk[i];rows.forEach(r=>r.classList.remove("rd"));rows[i].classList.add("rd");KZ.ss.heard.add(i);if(t.w==="v")kzBubble("R",t.t.replace(/["“”]/g,""),3500);
  narrate([t.t],()=>{rows[i].classList.remove("rd");done&&done()},"ko",{voice:kzVoice(t.w)})};
 const ask=()=>{if(KZ.ss.ph)return;KZ.ss.ph=1;rows.forEach(r=>r.classList.add("pick"));$("kzQ").innerHTML=`<p class="kzask">❓ ${K("Whose words don't match the clues? Tap the liar.","누구의 말이 단서와 맞지 않을까? 거짓말한 사람을 눌러요.")}</p>`;$("kzQ").scrollIntoView({block:"nearest",behavior:"smooth"})};
 const all=(i,fin)=>{if(!KZ||KZ.act!==2)return;if(i>=rows.length){fin&&fin();return}hear(i,()=>setTimeout(()=>all(i+1,fin),350))};
 KZ.say=()=>{hush();all(0,()=>{if(!KZ.ss.ph)ask()})};{const S0=KZ.ss,wd=setInterval(()=>{if(!KZ||KZ.ss!==S0||S0.ph){clearInterval(wd);return}if(S0.heard.size>=rows.length&&($("vSkip")||{hidden:true}).hidden)ask()},800)}
 rows.forEach((r,i)=>r.onclick=()=>{if(KZ.busy)return;const t=c.talk[i];
  if(KZ.ss.ph===0){hush();const rest=()=>{if(!KZ||KZ.act!==2||KZ.ss.ph)return;const j=rows.findIndex((x,k)=>!KZ.ss.heard.has(k));if(j<0)return ask();hear(j,()=>setTimeout(rest,350))};hear(i,()=>setTimeout(rest,350));return}
  if(KZ.ss.ph!==1||r.disabled)return;
  if(t.lie){kzOK(r);r.classList.add("liar");KZ.ss.ph=2;kzHit();kzBubble("R",K("W-what?!","뜨, 뜨끔!"),2000);
   $("kzQ").innerHTML=`<p class="kzask">❓ ${K(`Which clue proves ${kzName("v")} is lying?`,`${kzName("v")}의 말이 거짓말이라는 증거는 무엇일까?`)}</p><div class="kzopts ev">${KZ.nb.clues.map(s=>`<button class="kzop ev" data-k="${s.k}"><span class="emo">${kzIco(KZ.c.id+"_"+s.k,s.ic)}</span><span><b>${escH(s.n)}</b><small>${escH(s.t)}</small></span></button>`).join("")}</div>`;
   $("kzQ").scrollIntoView({block:"nearest",behavior:"smooth"});
   $("kzQ").querySelectorAll(".kzop").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;
    if(t.proof.includes(b.dataset.k)){kzOK(b);KZ.busy=true;const s=KZ.c.spots.find(x=>x.k===b.dataset.k);KZ.nb.lie=`${kzName("v")}의 말은 거짓말! 증거: ${s.n}`;
     kzBgm("case",true);kzStamp(K("Lie found!","거짓말 발견!"),"lie");kzHit();$("kzQ").querySelectorAll(".kzop").forEach(x=>x.disabled=true);kzMsg("📒 "+KZ.nb.lie);
     kzSay(`${s.n}! 이게 바로 증거야!`,KZ.c.h,()=>{if(!KZ||KZ.act!==2)return;KZ.busy=false;kzNextBtn(`✨ ${kzHN(KZ.c.h)} ${K("go!","출동!")}`,()=>kzGo(3))},3200)}
    else kzNo(b,K("That clue can't prove the lie. Think again!","그 단서로는 거짓말을 밝힐 수 없어요. 다시 생각해 봐요!"))});
  }else kzNo(r,K("That matches the clues. Read again!","그 말은 단서와 맞아요. 다시 읽어 봐요!"))});
 if(autoNar())setTimeout(()=>{if(KZ&&KZ.act===2&&!KZ.ss.ph&&!KZ.ss.heard.size)all(0,ask)},1300);
 else setTimeout(()=>{if(!KZ||KZ.act!==2||KZ.ss.ph)return;const b=document.createElement("button");b.className="btn kzdone";b.textContent=K("I read them all ▶","다 읽었어요 ▶");b.onclick=()=>{b.remove();ask()};$("kzQ").appendChild(b)},1500);
 KZ.hint=()=>KZ.ss.ph===2?{t:"그 말이 틀렸다는 걸 보여 주는 단서는 무엇일까? 수첩에 적은 단서를 읽어 보렴."}:{t:"찾은 단서와 반대로 말하는 사람이 있단다. 단서를 하나씩 떠올려 보렴."};
}
/* 4 skill: the hero's own reading skill */
function kzSkill(){const c=KZ.c;kzActor("L",c.h);kzActor("R",null);kzP(`<div class="kzcard center"><p class="kzl dim">${kzHN(c.h)}: ${escH(KSK[c.h].line)}</p></div>`);
 kzCutin(c.h);narrate([KSK[c.h].line],null,"ko",{voice:c.h});
 setTimeout(()=>{if(!KZ||KZ.act!==3)return;({quiz:kzSkQuiz,steps:kzSkSteps,fact:kzSkFact,fix:kzSkFix,order:kzSkOrder,who:kzSkWho})[c.sk.type]()},1900)}
function kzSkDone(){if(!KZ)return;const c=KZ.c;KZ.busy=true;kzLunge();kzStamp(KSK[c.h].n+" "+K("success!","성공!"),"ok");kzBubble("L",c.hl,4200);
 kzSay(c.hl,c.h,()=>{if(!KZ||KZ.act!==3)return;KZ.busy=false;kzNextBtn("🧠 "+K("Solve it","추리하러 가기"),()=>kzGo(4))},4200)}
function kzOpts(list,cls){return `<div class="kzopts ${cls||""}">${list.map(o=>`<button class="kzop${o[0].length>14?" long":""}" data-a="${escH(o[0])}"><span class="emo">${o[1]}</span>${escH(o[0])}</button>`).join("")}</div>`}
const kzSkinIc={memo:"📜",feel:"💗",riddle:"🌀",why:"❔",notice:"📢",news:"📰"};
function kzSkQuiz(){const c=KZ.c,sk=c.sk,qi=KZ.si,q=sk.qs[qi];if(!q)return kzSkDone();
 const lines=q.lines||sk.lines,opts=shuffle([q.a,...q.o]),long=opts.some(o=>o[0].length>14);let pass="";
 if(sk.skin==="notice")pass=`<div class="kzposter"><b>★ ${escH(sk.title)} ★</b>${sk.poster.map(r=>`<p class="kzl" data-v="${escH(r[1])}"><em>${escH(r[0])}</em>${escH(r[1])}</p>`).join("")}</div>`;
 else if(lines)pass=`<div class="kzpass ${sk.skin}"><div class="kzph"><b>${kzSkinIc[sk.skin]||"📜"} ${escH(sk.skin==="riddle"?`${sk.title} ${qi+1}`:sk.title)}</b>${q.who?kzFace(q.who):""}</div>${kzLinesH(lines)}</div>`;
 kzP(`${pass}<div class="kzq"><p class="kzask">❓ ${escH(q.ask)} <small>${qi+1}/${sk.qs.length}</small></p>${kzOpts(opts,long?"col":"")}</div>`);
 if(sk.skin==="feel"&&q.who)kzActor("R",q.who,q.who==="v"?"":"worried",q.who==="v"?"kz-foe":"kz-npc");
 if(sk.skin==="riddle")kzActor("C",null),kzFx("kzbox","❓");
 const els=[...$("kzPanel").querySelectorAll(".kzposter .kzl,.kzpass .kzl")],readL=sk.skin==="notice"?sk.poster.map(r=>r[0]+", "+r[1]+"."):lines||[];
 KZ.say=()=>kzRead([...readL,q.ask],{els,voice:"narrator"});if(autoNar()&&(qi===0||q.lines))setTimeout(()=>{if(KZ&&KZ.act===3&&KZ.si===qi)KZ.say()},600);
 $("kzPanel").querySelectorAll(".kzq .kzop").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;
  if(b.dataset.a!==q.a[0])return kzNo(b,K("Read it once more!","한 번 더 읽어 보자!"));
  kzOK(b);KZ.busy=true;hush();$("kzPanel").querySelectorAll(".kzq .kzop").forEach(x=>x.disabled=true);$("kzFx").querySelectorAll(".kzbox").forEach(x=>x.remove());
  if(sk.skin==="feel"){kzHearts();setTimeout(()=>kzBubble("R",q.a[1]+" "+q.a[0],2400),500)}
  else if(sk.skin==="notice"){const r=[...$("kzPanel").querySelectorAll(".kzposter .kzl")].find(e=>e.dataset.v&&e.dataset.v.includes(q.a[0]));if(r)r.classList.add("ok");kzBubble("L",K("Cock-a-doodle-doo!","꼬끼오!"),1600)}
  else if(sk.skin==="news"&&qi===0)kzFx("kznews",`<b>${K("FOREST NEWS","숲속 신문")}</b><i>${escH(q.a[0])}</i>`,2600);
  else kzPop(`<span>${sk.skin==="memo"&&qi===sk.qs.length-1?kzIco(c.id+"_box",q.a[1]):q.a[1]}</span>`);
  if(sk.skin==="memo"&&qi===sk.qs.length-1)setTimeout(()=>kzPop(`<span>${kzIco(c.id+"_key","🔑")}</span>`),900);
  kzMsg(q.a[1]+" "+q.a[0]);
  setTimeout(()=>{if(!KZ||KZ.act!==3)return;KZ.busy=false;KZ.si++;KZ.miss=0;if(KZ.si<sk.qs.length)kzSkQuiz();else kzSkDone()},1600)});
 KZ.hint=()=>({t:q.hint||`'${q.clue}'… 이 부분을 다시 읽어 보렴.`,mark:[q.clue]});
}
function kzSkSteps(){const c=KZ.c,sk=c.sk,i=KZ.si,s=sk.steps[i];if(!s)return kzSkDone();const path=sk.skin==="path";
 if(path&&!$("kzMap"))kzFx("kzmap",kzMapSVG(),0).id="kzMap";
 const list=path?sk.lines:sk.steps.map((x,j)=>`${j+1}. ${x.t}`);
 kzP(`<div class="kzpass ${path?"memo":"manual"}"><div class="kzph"><b>${path?"🧭":"📄"} ${escH(sk.title)}</b></div>${list.map((l,j)=>`<p class="kzl ${j===i?"now":j<i?"done":""}">${j<i?"✔ ":""}${escH(l)}</p>`).join("")}</div>
  <div class="kzq"><p class="kzask">❓ ${path?K("Which way?","어디로 갈까?"):K("Pick what this line says.","이 줄에 쓰인 대로 골라요.")} <small>${i+1}/${sk.steps.length}</small></p>${kzOpts(shuffle([s.a,...s.o]))}</div>`);
 const now=$("kzPanel").querySelector(".kzl.now");KZ.say=()=>kzRead([path?sk.lines[i]:s.t],{els:[now],voice:"narrator"});if(autoNar())setTimeout(()=>{if(KZ&&KZ.act===3&&KZ.si===i)KZ.say()},500);
 $("kzPanel").querySelectorAll(".kzq .kzop").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;
  if(b.dataset.a!==s.a[0]){if(path)kzMapMove(-1);return kzNo(b,K("Check the words in the note!","메모에 쓰인 말을 다시 봐요!"))}
  kzOK(b);KZ.busy=true;hush();$("kzPanel").querySelectorAll(".kzq .kzop").forEach(x=>x.disabled=true);
  if(path)kzMapMove(i+1);else{$("kzWorld").classList.add("s"+(i+1));sfx2("bonk")}
  setTimeout(()=>{if(!KZ||KZ.act!==3)return;KZ.busy=false;KZ.si++;KZ.miss=0;if(KZ.si<sk.steps.length)kzSkSteps();else{if(path)kzPop("<span>🏮</span>");kzSkDone()}},1300)});
 KZ.hint=()=>({t:`'${s.clue}'… 쓰인 말과 똑같은 것을 고르렴.`,mark:[s.clue]});
}
function kzSkFact(){const c=KZ.c,sk=c.sk,fakes=sk.st.filter(x=>x[1]).length;KZ.ss.br=0;kzActor("R","v","","kz-foe");
 kzFx("kzshields",`${"<i>🛡️</i>".repeat(fakes)}`,0).id="kzShields";
 const order=shuffle(sk.st.map((x,j)=>j));
 kzP(`<div class="kzpass record"><div class="kzph"><b>📜 ${escH(sk.title)}</b></div>${kzLinesH(sk.lines)}</div>
  <div class="kzq"><p class="kzask">❓ ${K(`Break the ${fakes} fake shields: tap the sentences that don't match the record!`,`기록과 다른 말 ${fakes}개를 찾아 거짓 방패를 깨요!`)}</p><div class="kzopts col">${order.map(j=>`<button class="kzop st" data-j="${j}">🛡️ ${escH(sk.st[j][0])}</button>`).join("")}</div></div>`);
 const els=[...$("kzPanel").querySelectorAll(".kzpass .kzl")];KZ.say=()=>kzRead(sk.lines,{els,voice:"narrator"});if(autoNar())setTimeout(()=>{if(KZ&&KZ.act===3)KZ.say()},500);
 $("kzPanel").querySelectorAll(".kzop.st").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;const x=sk.st[+b.dataset.j];
  if(!x[1]){b.classList.add("true");return kzNo(b,K("That one matches the record. It's true!","그 말은 기록과 같아요. 진짜 말이에요!"))}
  kzOK(b);b.disabled=true;b.classList.add("shatter");const sh=$("kzShields"),it=sh&&sh.children[KZ.ss.br];if(it)it.classList.add("break");KZ.ss.br++;kzHit();
  if(KZ.ss.br>=fakes){KZ.busy=true;$("kzPanel").querySelectorAll(".kzop.st").forEach(y=>y.disabled=true);setTimeout(()=>{if(sh)sh.remove();kzSkDone()},900)}});
 KZ.hint=()=>({t:"기록을 한 줄씩 읽고, 기록과 다른 말을 찾아보렴.",mark:sk.clue});
}
function kzSkFix(){const c=KZ.c,sk=c.sk,it=sk.items[KZ.si];if(!it)return kzSkDone();const S=KZ.ss;if(S.k!==KZ.si){S.k=KZ.si;S.sub=0;S.opts=shuffle([it.fix,...it.alt])}
 const vn=kzName("v"),toks=it.s.split(" ");
 const tk=toks.map((t,j)=>t===it.bad?(S.sub>1?`<span class="tok fixed">${escH(it.fix)}</span>`:S.sub===1?`<span class="tok found">${escH(t)}</span>`:`<button class="tok" data-t="${j}">${escH(t)}</button>`):S.sub===0?`<button class="tok" data-t="${j}">${escH(t)}</button>`:`<span class="tok">${escH(t)}</span>`).join("");
 kzP(`<div class="kzpass record"><div class="kzph"><b>📜 ${K("Real record","진짜 기록")}</b></div><p class="kzl">${escH(it.clue)}</p></div>
  <div class="kzpass bad"><div class="kzph"><b>🟣 ${vn}${batchim(vn)?"이":"가"} ${K("changed","바꾼 문장")}</b></div><p class="toks">${tk}</p></div>
  <div class="kzq"><p class="kzask">❓ ${S.sub===0?K("Tap the word that's different from the real record!","진짜 기록과 다른 낱말을 콕 눌러요!"):S.sub===1?K("Which word fixes it?","어떤 낱말로 고칠까?"):K("Fixed!","고쳤다!")} <small>${KZ.si+1}/${sk.items.length}</small></p>
  ${S.sub===1?`<div class="kzopts">${S.opts.map(o=>`<button class="kzop big" data-a="${escH(o)}">${escH(o)}</button>`).join("")}</div>`:""}</div>`);
 KZ.say=()=>kzRead([it.clue,it.s],{els:[$("kzPanel").querySelector(".kzpass .kzl")],voice:"narrator"});if(autoNar()&&S.sub===0)setTimeout(()=>{if(KZ&&KZ.act===3)KZ.say()},500);
 $("kzPanel").querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;if(toks[+b.dataset.t]===it.bad){kzOK(b);S.sub=1;KZ.miss=0;kzMsg(K("Found it! Now fix it.","찾았다! 이제 고쳐 보자."));kzSkFix()}else kzNo(b,K("Compare word by word!","진짜 기록과 한 낱말씩 맞춰 봐요!"))});
 $("kzPanel").querySelectorAll(".kzq [data-a]").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;if(b.dataset.a!==it.fix)return kzNo(b,K("What does the real record say?","진짜 기록에는 뭐라고 쓰여 있니?"));
  kzOK(b);S.sub=2;KZ.busy=true;kzSkFix();kzPop("<span>✨</span>");setTimeout(()=>{if(!KZ||KZ.act!==3)return;KZ.busy=false;KZ.si++;KZ.miss=0;if(KZ.si<sk.items.length)kzSkFix();else kzSkDone()},1400)});
 KZ.hint=()=>S.sub===0?{t:"진짜 기록과 한 낱말씩 맞춰 읽어 보렴.",mark:[it.fix]}:{t:"진짜 기록에는 뭐라고 적혀 있니?",mark:[it.fix]};
}
function kzSkOrder(){const c=KZ.c,sk=c.sk,it=sk.items[KZ.si];if(!it)return kzSkDone();const S=KZ.ss;if(S.k!==KZ.si){S.k=KZ.si;S.ord=[];S.perm=shuffle([0,1,2])}
 if(!$("kzPath"))kzFx("cpath",[0,1,2].map(i=>`<span class="slot">${i+1}</span>`).join(""),0).id="kzPath";
 const P=$("kzPath");[...P.children].forEach((sl,j)=>{sl.className="slot"+(S.ord[j]!=null?" on":"");sl.textContent=S.ord[j]!=null?it.e[S.ord[j]]:j+1});P.classList.remove("done");
 const lab=[K("First","먼저"),K("Next","그다음"),K("Last","마지막")];
 kzP(`<div class="kzq"><p class="kzask">❓ ${K("Tap what happens, in order!","일어나는 순서대로 눌러요!")} <small>${KZ.si+1}/${sk.items.length}</small></p>
  <div class="cord">${lab.map((l,j)=>`<span class="oslot ${S.ord[j]!=null?"on":""}"><small>${l}</small>${S.ord[j]!=null?it.e[S.ord[j]]:"?"}</span>`).join("→")}</div>
  <div class="kzopts col">${S.perm.map(j=>`<button class="kzop" data-j="${j}" ${S.ord.includes(j)?"disabled":""}><span class="emo">${it.e[j]}</span><span class="kzl">${escH(it.ev[j])}</span></button>`).join("")}</div></div>`);
 KZ.say=()=>kzRead(S.perm.map(j=>it.ev[j]),{els:S.perm.map(j=>$("kzPanel").querySelector(`[data-j="${j}"] .kzl`)),voice:"narrator"});if(autoNar()&&!S.ord.length)setTimeout(()=>{if(KZ&&KZ.act===3)KZ.say()},500);
 $("kzPanel").querySelectorAll("[data-j]").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;const j=+b.dataset.j;
  if(j!==S.ord.length){const sl=P.children[S.ord.length];sl.classList.remove("bad");void sl.offsetWidth;sl.classList.add("bad");return kzNo(b,K("What has to happen first?","무엇을 먼저 해야 할까?"))}
  kzOK(b);S.ord.push(j);KZ.miss=0;if(S.ord.length<3)return kzSkOrder();
  KZ.busy=true;kzSkOrder();P.classList.add("done");setTimeout(()=>{if(!KZ||KZ.act!==3)return;KZ.busy=false;KZ.si++;if(KZ.si<sk.items.length)kzSkOrder();else{P.remove();kzSkDone()}},1400)});
 KZ.hint=()=>({t:"무엇을 먼저 해야 다음 일이 생길까? 표시한 낱말을 보렴.",mark:[it.k[S.ord.length]]});
}
function kzSkWho(){const c=KZ.c,sk=c.sk,q=sk.qs[KZ.si];if(!q)return kzSkDone();const opts=shuffle([q.a,...q.o]);
 kzP(`<div class="kzpass who"><div class="kzph"><b>📘 ${escH(sk.title)} ${KZ.si+1}</b></div>${kzLinesH(q.lines)}</div>
  <div class="kzq"><p class="kzask">❓ ${K("Who is this? Protect them with the crystal shield!","누구일까요? 찾아서 수정 방패로 지켜 줘요!")} <small>${KZ.si+1}/${sk.qs.length}</small></p>
  <div class="kzopts">${opts.map(w=>`<button class="kzop fr" data-w="${w}">${kzFace(w)}<span>${kzName(w)}</span></button>`).join("")}</div></div>`);
 const els=[...$("kzPanel").querySelectorAll(".kzpass .kzl")];KZ.say=()=>kzRead(q.lines,{els,voice:"narrator"});if(autoNar())setTimeout(()=>{if(KZ&&KZ.act===3)KZ.say()},500);
 $("kzPanel").querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;if(b.dataset.w!==q.a)return kzNo(b,K("Read the description again!","설명을 다시 읽어 봐요!"));
  kzOK(b);KZ.busy=true;kzActor("R",q.a,"happy","kz-npc kz-shield");kzBubble("R",K("Thank you!","고마워!"),1800);
  setTimeout(()=>{if(!KZ||KZ.act!==3)return;KZ.busy=false;KZ.si++;KZ.miss=0;if(KZ.si<sk.qs.length)kzSkWho();else kzSkDone()},1500)});
 KZ.hint=()=>({t:`'${q.clue}'… 이런 친구는 누구일까?`,mark:[q.clue]});
}
/* 5 deduce */
function kzDeduce(){const c=KZ.c;kzActor("L",c.h);kzActor("R","v","","kz-foe kz-shadow");kzActor("C",null);
 kzBanner("🧠",K("Put it together","추리 정리"),K("Use your notebook to fill the gaps","수첩을 보고 빈칸을 채워요"));KZ.ss={d:0,opts:c.ded.map(d=>shuffle([d.a,...d.o]))};kzDed();
}
function kzDed(){const c=KZ.c,S=KZ.ss,d=c.ded[S.d];
 const sent=c.ded.map((x,j)=>`<p class="kzded ${j===S.d?"now":""}">${escH(x.s).replace("___",j<S.d?`<b class="blank2 in">${escH(x.a)}</b>`:`<b class="blank2" ${j===S.d?'id="kzBlank"':""}>?</b>`)}</p>`).join("");
 kzP(`<div class="kzcard"><div class="kzch"><b>🧠 ${K("Case board","사건 정리")}</b><button class="btn kzmini" id="kzNB2">📒 ${K("Notebook","수첩 보기")}</button></div>
  <div class="kzclues">${KZ.nb.clues.map(s=>`<span>${kzIco(KZ.c.id+"_"+s.k,s.ic)} ${escH(s.n)}</span>`).join("")}</div>${sent}</div>
  ${d?`<div class="kzq"><div class="kzopts">${S.opts[S.d].map(o=>`<button class="kzop big" data-a="${escH(o)}">${escH(o)}</button>`).join("")}</div></div>`:""}`);
 $("kzNB2").onclick=kzNote;
 if(!d){kzNextBtn(`👉 ${K("The culprit is you!","범인은 바로 너야!")}`,()=>kzGo(5));const nb=$("kzPanel").querySelector(".kznext");if(nb)nb.classList.add("gotcha");KZ.say=()=>kzRead(c.ded.map(x=>x.s.replace("___",x.a)),{els:[...$("kzPanel").querySelectorAll(".kzded")],voice:"narrator"});return}
 KZ.say=()=>narrate([blankRead(d.s)],null,"ko",{voice:"narrator"});if(autoNar())setTimeout(()=>{if(KZ&&KZ.act===4&&KZ.ss.d===S.d)KZ.say()},500);
 $("kzPanel").querySelectorAll(".kzq [data-a]").forEach(b=>b.onclick=()=>{if(KZ.busy||b.disabled)return;if(b.dataset.a!==d.a)return kzNo(b,K("Check your notebook!","수첩을 다시 봐요!"));
  kzOK(b);KZ.busy=true;flyTo(escH(d.a),b,$("kzBlank"),"blk2").then(()=>{if(!KZ||KZ.act!==4)return;KZ.busy=false;S.d++;KZ.miss=0;kzDed();narrate([d.s.replace("___",d.a)],null,"ko",{voice:"narrator"})})});
 KZ.hint=()=>{const nb=$("kzNB");if(nb){nb.classList.remove("got");void nb.offsetWidth;nb.classList.add("got")}return {t:"수첩을 다시 보렴. 찾은 단서 속에 답이 있단다."}};
}
/* 6 solve: reveal, villain runs, the place is restored, then the report */
function kzSolve(){const c=KZ.c,vn=kzName("v");KZ.busy=true;KZ.hint=null;KZ.say=null;
 kzP(`<div class="kzcard center"><p class="kzbigt">🕵️ ${K("The culprit is…","범인은…")}</p></div>`);
 bgmStop(.3);kzBgm("reveal");$("kzWorld").classList.add("flash");setTimeout(()=>{const w=$("kzWorld");if(w)w.classList.remove("flash")},600);
 kzActor("R","v","","kz-foe kz-reveal");kzLunge();setTimeout(kzHit,300);kzFx("kzgotcha",`<b>${K("It's you,","범인은 바로 너야,")} ${vn}!</b>`,2600);
 KZ.nb.culprit=vn;
 const step3=()=>{if(!KZ||KZ.act!==5)return;const A=$("kzAR");if(A)A.classList.add("kz-run");sfxPlay("run")||sfx2("cast");
  setTimeout(()=>{if(!KZ||KZ.act!==5)return;const w=$("kzWorld");w.classList.remove("gloom");w.classList.add("fixed","s1","s2","s3");kzConfetti();sfxPlay("restore")||sfx("star");kzStamp(K("Case solved!","사건 해결!"),"ok");
   kzActor("R",c.cl,"happy",c.cl==="captain"?"":"kz-npc");setTimeout(()=>{if(!KZ||KZ.act!==5)return;kzBubble("R",K("Thank you, Guardians!","고마워, 수비대!"),3000);kzSay("고마워, 수비대!",kzVoice(c.cl),()=>kzReport(),2600)},700)},1100)};
 setTimeout(()=>{if(!KZ||KZ.act!==5)return;kzSay(`범인은 바로 너야, ${vn}!`,c.h,()=>{if(!KZ||KZ.act!==5)return;kzBubble("R",c.vl.replace(/["“”]/g,""),3600);kzSay(c.vl,"v_"+c.vil,step3,4200)},3000)},900);
}
function kzReport(){if(!KZ||KZ.done)return;const c=KZ.c,i=KZ.i,st=KZ.wrong<=1?3:KZ.wrong<=4?2:1;KZ.done=true;KZ.busy=false;KZ.act=6;kzSteps(6);
 G.cases=G.cases||{};const first=!G.cases[c.id];G.cases[c.id]=Math.max(G.cases[c.id]||0,st);G.wx=G.wx||{};G.wx[c.h]=(G.wx[c.h]||0)+1;save();kzBgm("solved");
 const nx=i+1<KC.length?i+1:null;
 kzP(`<div class="kzrep"><div class="kzfile2"><span class="kzst2">${K("SOLVED","사건 해결")}</span><small>${K("Case","사건")} ${i+1}</small><b>${L(c.t)}</b><div class="kzstars">${[0,1,2].map(j=>`<i class="${j<st?"on":""}">⭐</i>`).join("")}</div><p>${kzHN(c.h)} · ${KSK[c.h].n}</p></div>
  <div class="kzcard"><div class="kzch"><b>📖 ${K("The case story","사건 이야기")}</b><small>${K("Read the whole story!","이야기를 처음부터 끝까지 읽어 봐요!")}</small></div>${kzLinesH(c.story)}</div>
  <div class="kzclues">${KZ.nb.clues.map(s=>`<span>${kzIco(KZ.c.id+"_"+s.k,s.ic)} ${escH(s.n)}</span>`).join("")}</div>
  <div class="kzacts"><button class="btn" id="kzList">📂 ${K("Cases","사건 목록")}</button>${nx!=null?`<button class="btn pri" id="kzNextC">${K("Next case","다음 사건")} ▶</button>`:""}</div></div>`);
 const els=[...$("kzPanel").querySelectorAll(".kzcard .kzl")];KZ.say=()=>kzRead(c.story,{els,voice:"narrator"});if(autoNar())setTimeout(()=>{if(KZ&&KZ.done)KZ.say()},900);
 $("kzList").onclick=()=>{hush();caseList()};if($("kzNextC"))$("kzNextC").onclick=()=>{hush();caseStart(nx)};
 if(first)reward(20+st*10,25+st*5,8);else reward(st*5,10,0);
}
/* overlays drawn on top of any background (painted or fallback) */
function kzHut(){const O='stroke="#4A2E14" stroke-width="5" stroke-linejoin="round"';return `<svg class="kzhut" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
 <g class="ruin"><rect ${O} x="560" y="640" width="190" height="22" rx="6" fill="#C98A4B" transform="rotate(-12 650 650)"/><rect ${O} x="640" y="660" width="170" height="20" rx="6" fill="#B87A3E" transform="rotate(9 720 670)"/><path ${O} d="M600 690 L700 610 L800 690Z" fill="#D9534F" transform="rotate(18 700 650)"/><rect ${O} x="700" y="684" width="120" height="18" rx="6" fill="#A86A33"/></g>
 <g class="p1"><rect ${O} x="590" y="430" width="26" height="270" rx="6" fill="#8A5A2E"/><rect ${O} x="814" y="430" width="26" height="270" rx="6" fill="#8A5A2E"/><rect ${O} x="640" y="460" width="22" height="240" rx="6" fill="#7A4E26"/><rect ${O} x="768" y="460" width="22" height="240" rx="6" fill="#7A4E26"/></g>
 <g class="p2"><rect ${O} x="600" y="500" width="230" height="200" rx="8" fill="#D9A066"/><path d="M600 540 H830 M600 580 H830 M600 620 H830 M600 660 H830" stroke="#A8743E" stroke-width="4"/><rect ${O} x="680" y="590" width="70" height="110" rx="10" fill="#7A4E26"/><circle cx="738" cy="648" r="5" fill="#FFD34D"/></g>
 <g class="p3"><path ${O} d="M570 510 L715 390 L860 510Z" fill="#E2503F"/><path d="M600 486 L715 410 L830 486" stroke="#FF8A7A" stroke-width="6" fill="none" stroke-linecap="round"/></g></svg>`}
function kzMapSVG(){const T=(x,y,t,f,c)=>`<text x="${x}" y="${y}" font-size="${f}" ${c?`font-weight="700" fill="#6B4A1E"`:""}>${t}</text>`;return `<svg viewBox="0 0 400 220" aria-hidden="true"><rect x="4" y="4" width="392" height="212" rx="18" fill="#F6E7C1" stroke="#8A6A3A" stroke-width="5"/>
 <path d="M200 168 C 250 160 300 168 360 176" fill="none" stroke="#C59A5B" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 14"/>
 <path d="M118 100 C 96 90 76 84 50 82" fill="none" stroke="#C59A5B" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 14"/>
 <path d="M200 190 C 200 168 182 152 150 146 C 118 140 104 120 122 98 C 138 80 160 74 180 72 C 222 66 262 60 300 56" fill="none" stroke="#C59A5B" stroke-width="12" stroke-linecap="round"/>
 ${T(186,214,"⛏️",24)}${T(70,170,"왼쪽 길",13,1)}${T(292,198,"오른쪽 길",13,1)}${T(146,84,"🪵",22)}${T(136,104,"통나무 다리",11,1)}${T(28,80,"🪨",16)}${T(22,98,"돌다리",11,1)}${T(300,62,"🪨",30)}${T(298,84,"큰 바위",12,1)}
 <g class="kzdog" style="transform:translate(184px,182px)"><text class="dg" font-size="28">🐕</text></g></svg>`}
function kzMapMove(n){const d=$("kzMap")&&$("kzMap").querySelector(".kzdog");if(!d)return;const t=d.querySelector(".dg");if(n<0){t.classList.remove("no");void t.getBBox();t.classList.add("no");return}
 const P=[[184,182],[100,142],[146,96],[292,52]][Math.min(3,n)];d.style.transform=`translate(${P[0]}px,${P[1]}px)`;sfx2("pop")}

const BOOKART={"p1":"assets/img/scene/storyboard_p1.webp","p2":"assets/img/scene/storyboard_p2.webp"};
/* ===== 열두 이야기 도서관: story books (shared engine) ===== */
VOX.sb_rabbit={p:1.25,r:1.04,g:"f",gap:500};VOX.sb_turtle={p:.86,r:.82,g:"m",gap:700};
const BOOKS=[
 {id:"b1",owner:"rabbit",t:"토끼와 거북이",te:"The Hare and the Tortoise",sub:"사라진 경주 기록",vil:"gray",c:["#F25CA8","#7B3FB8"]},
 {id:"b2",owner:"rat",t:"시골 쥐와 도시 쥐",te:"Town Mouse, Country Mouse",sub:"뒤섞인 두 집",vil:"fat",c:["#7B5FD0","#3F2A7A"]},
 {id:"b3",owner:"ox",t:"소가 된 게으름뱅이",te:"The Lazy Boy Who Became an Ox",sub:"뒤바뀐 원인과 결과",vil:"gray",c:["#3A3F4A","#16181E"]},
 {id:"b4",owner:"tiger",t:"해와 달이 된 오누이",te:"The Sun and the Moon",sub:"섞여 버린 말",vil:"tiger",c:["#2F5FD0","#1F3F9A"]},
 {id:"b5",owner:"dragon",t:"비를 잃어버린 꼬마 용",te:"The Little Dragon Who Lost the Rain",sub:"바뀐 주문",vil:"purple",c:["#3FA34D","#1E6328"]},
 {id:"b6",owner:"snake",t:"뱀의 숲속 우체국",te:"Snake's Forest Post Office",sub:"지워진 받는 사람",vil:"black",c:["#7B4FC8","#33196A"]},
 {id:"b7",owner:"horse",t:"바람을 배달하는 말",te:"The Horse Who Delivers the Wind",sub:"바뀐 배달 길",vil:"gray",c:["#D63A2F","#8A1F18"]},
 {id:"b8",owner:"sheep",t:"양치기 소년",te:"The Boy Who Cried Wolf",sub:"사실과 주장",vil:"tiger",c:["#8A6AD8","#4A2F8A"]},
 {id:"b9",owner:"monkey",t:"원숭이의 뒤죽박죽 도서관",te:"Monkey's Muddled Library",sub:"섞인 문장",vil:"fat",c:["#E8A800","#8A5A00"]},
 {id:"b10",owner:"rooster",t:"빨간 암탉",te:"The Little Red Hen",sub:"섞인 빵 만들기",vil:"white",c:["#2F5FD0","#C99A00"]},
 {id:"b11",owner:"dog",t:"개와 그림자",te:"The Dog and His Shadow",sub:"사실과 착각",vil:"purple",c:["#F07A1E","#8A3F0A"]},
 {id:"b12",owner:"pig",t:"아기 돼지 삼 형제",te:"The Three Little Pigs",sub:"뒤섞인 집과 사건",vil:"black",c:["#2BA3A3","#1C5F66"]}];
/* Each book is pure data: books/<id>/book.js + its images. index.html loads book.js before this file. */
const BD=window.BOOKDATA||{};  /* filled by books/<id>/book.js */
BOOKS.forEach(b=>b.ready=!!BD[b.id]);

const bookDone=id=>!!((G.books||{})[id]||{}).done;
const ownerImg=id=>DA.hs[id]||PORT[id];
const bkCover=id=>BD[id]&&BD[id].cover?BD[id].dir+BD[id].cover:null;
let SHELF_NEW=null;
function renderLibrary(){
 const box=$("stageMap");box.classList.add("lib");G.books=G.books||{};
 const n=BOOKS.filter(b=>bookDone(b.id)).length,next=BOOKS.find(b=>BD[b.id]&&!bookDone(b.id));
 box.innerHTML=`<div class="libv"><div class="lhead"><b>📚 ${K("The Library of Twelve Stories","열두 이야기 도서관")}</b><small>${K(`Books restored ${n} / 12`,`되찾은 책 ${n} / 12`)}</small></div>
 <div class="shelfg">${BOOKS.map(b=>{const d=bookDone(b.id),bs=(G.books[b.id]||{}),cv=d&&bkCover(b.id);return `<div class="bcell"><button class="bslot${d?" done":""}${cv?" cov":""}${SHELF_NEW===b.id?" new":""}" data-bk="${b.id}" style="--bc:${b.c[0]};--bc2:${b.c[1]};${cv?`background-image:url(${cv})`:""}"><span class="ow"><img src="${ownerImg(b.owner)}" alt=""></span><span class="tt">${G.lang==="ko"?b.t:b.te}</span><span class="st">${d?"⭐".repeat(bs.stars||1)+(bs.end?" ✏️":""):(BD[b.id]?K("broken","망가짐"):"")}</span></button></div>`}).join("")}</div>
 <div class="desk"><img class="mt" src="${DA.mentor||PORT.mentor}" alt="">
  ${next?`<button class="bbook${bkCover(next.id)?" cov":""}" id="deskBook" ${bkCover(next.id)?`style="background-image:url(${bkCover(next.id)})"`:""}><span class="lbl">${G.lang==="ko"?next.t:next.te}<small>${K("Torn by the Cat Gang","고양이 악당이 망가뜨린 책")}</small></span></button>
   <div class="dcall"><b>${K("Master Turtle","거북이 스승님")}</b>${K("Someone changed this story! Tap the book to find out what happened.","누군가 이 이야기를 바꿨구나! 책을 눌러 무슨 일이 있었는지 알아보렴.")}</div>`
  :`<div class="bbook none"><span>📖</span>${K("Next book","다음 책")}<small>${K("Coming soon","준비 중이에요")}</small></div>
   <div class="dcall"><b>${K("Master Turtle","거북이 스승님")}</b>${K("Well done! Tap a restored book to read it again or make your own ending.","잘했구나! 되찾은 책을 누르면 다시 읽거나 너만의 결말을 만들 수 있단다.")}</div>`}
 </div></div>`;
 SHELF_NEW=null;
 if($("deskBook"))$("deskBook").onclick=()=>{if(overlayOpen())return;sfx("tap");openBook(next.id)};
 box.querySelectorAll("[data-bk]").forEach(b=>b.onclick=()=>{if(overlayOpen())return;sfx("tap");const B=BOOKS.find(x=>x.id===b.dataset.bk);
  if(bookDone(B.id))bookMenu(B.id);else if(BD[B.id])openBook(B.id);else{toast(K(`${B.te}: coming soon`,`〈${B.t}〉 — ${B.sub}: 준비 중이에요`));narrate([`${B.t}. 이 책은 곧 열린단다.`],null,"ko",{voice:"mentor"})}});
}
function libIntro(){
 if(G.libIntro)return;G.libIntro=1;save();
 setTimeout(()=>narrate(["여기는 열두 이야기 도서관이란다.","고양이 악당들이 동화책을 망가뜨렸어.","책을 눌러 무슨 일이 있었는지 읽어 보렴."],null,"ko",{voice:"mentor"}),700);
}

/* --- engine state & helpers --- */
let BK=null;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function bAlive(b){return !!b&&BK===b&&!$("bookOv").hidden}
const bVoice=who=>{const A=BK&&BK.D.actors[who];return A?A.voice:who};
/* speak one line: a recorded file if one exists (VAUD), otherwise the device voice */
function bSpeak(text,who,full){return new Promise(r=>{let fin=false,iv=null;const end=()=>{if(fin)return;fin=true;if(iv)clearInterval(iv);r()};
 const v=!who||who==="narrator"?null:who[0]==="@"?who.slice(1):bVoice(who),allQ=/^["“].*["”]$/.test(String(text).trim());
 narrate([text],end,"ko",v?(full||allQ?{voice:v}:{who:v}):{});if(fin)return;const tk=VO.tok;iv=setInterval(()=>{if(VO.tok!==tk)end()},250)})}
function bFiles(D){return [...new Set(JSON.stringify(D).match(/[\w-]+\.webp/g)||[])].map(f=>D.dir+f)}
function bPreload(D){return Promise.all(bFiles(D).map(src=>new Promise(r=>{const i=new Image();i.onload=i.onerror=()=>r();i.src=src;setTimeout(r,9000)})))}
function bookHead(){const B=BK.B,own=B.owner,cmp=G.char;
 return `<div class="dhud"><div class="dside my"><span class="face">${heroArt(own,1)}</span>${cmp!==own?`<span class="face">${heroArt(cmp,1)}</span>`:""}<div class="info"><b>${K("Guardians","수비대")}</b><small>${L(CHARS.find(c=>c.id===own).n)}${cmp!==own?" · "+L(CHARS.find(c=>c.id===cmp).n):""}</small></div></div>
  <div class="dtier">📖 ${G.lang==="ko"?B.t:B.te}</div>
  <div class="dside vs"><span class="face">${vilArt(B.vil)}</span><div class="info"><b>${L(VIL[B.vil].n)}</b><small>${L(VIL[B.vil].ab)}</small></div></div></div>`}
function bookShell(){
 $("bookCard").innerHTML=bookHead()+`<div class="bsteps" id="bSteps"></div>
  <div class="bstage" id="bStage"><div class="bworld" id="bWorld"></div><div class="bpov" id="bPov" hidden></div><div class="bcapt" id="bCapt" hidden></div><div class="bbars"></div></div>
  <div class="bq" id="bQ"></div>
  <div class="dfoot"><p id="bkMsg"></p><div class="acts"><button class="btn" id="bSayB" aria-label="Hear it">🔊</button><button class="btn" id="bHelp">🐢 ${K("Help","도움")}</button><button class="btn" id="bQuit">${K("Leave","나가기")}</button></div></div>`;
 $("bQuit").onclick=()=>bookClose();$("bHelp").onclick=()=>bHelp();$("bSayB").onclick=()=>{if(BK&&BK.replay&&!BK.busy)BK.replay()};
}
function bStepsUpd(){const b=BK,S=b.D.steps;$("bSteps").innerHTML=S.map((s,i)=>`<span class="${i===b.si?"on":i<b.si?"ok":""}">${i+1} ${s.name}</span>`).join("")}
/* --- the world: spread background + actors, viewed through a camera --- */
function worldBuild(){const b=BK,D=b.D;
 $("bWorld").innerHTML=`<img class="bbg" src="${D.dir+D.bg}" alt=""><div class="bfold"></div><div id="bProps"></div>`+Object.keys(D.actors).map(id=>`<div class="bact" id="ba_${id}"><div class="fl"><img alt=""></div><div class="bbub" hidden></div><div class="bmark" hidden></div></div>`).join("")+`<div id="bHots"></div>`;
 b.act={};Object.keys(D.actors).forEach(id=>b.act[id]={x:50,y:80,pose:"stand",flip:false});}
const spotXY=s=>Array.isArray(s)?s:BK.D.at[s];
const persp=y=>.5+.5*Math.max(0,Math.min(1,(y-55)/45));
function actDraw(id,ms){const b=BK,a=b.act[id],A=b.D.actors[id],el=$("ba_"+id);if(!el)return;const p=A.poses[a.pose]||A.poses.stand;
 el.style.transition=ms?`left ${ms}ms linear,top ${ms}ms linear,height ${ms}ms linear`:"none";
 el.style.left=a.x+"%";el.style.top=a.y+"%";el.style.height=(A.h*p[1]*persp(a.y)).toFixed(2)+"%";el.style.zIndex=Math.round(a.y*10);
 const img=el.querySelector("img"),src=b.D.dir+p[0];if(img.getAttribute("src")!==src){img.setAttribute("src",src);el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop")}
 el.querySelector(".fl").classList.toggle("flip",!!a.flip);el.classList.toggle("moving",!!a.mv);el.dataset.pose=a.pose}
function setState(st){const b=BK,D=b.D;st=st==="broken"?D.broken:st==="end"?D.endState:st;
 Object.keys(st).forEach(id=>{const a=b.act[id],[s,p]=st[id],[x,y]=spotXY(s);Object.assign(a,{x,y,pose:p,flip:false,mv:false});actDraw(id,0);actBub(id,null);actMark(id,null)});
 b.claimOn=false;$("bProps").innerHTML=""}
function actBub(id,text,cls){const el=$("ba_"+id);if(!el)return;const bb=el.querySelector(".bbub");if(!text){bb.hidden=true;return}
 bb.textContent=text;bb.className="bbub "+(cls||"")+(BK.act[id].x>60?" right":"");bb.hidden=false}
function actMark(id,txt){const el=$("ba_"+id);if(!el)return;const m=el.querySelector(".bmark");if(!txt){m.hidden=true;return}m.textContent=txt;m.className="bmark "+(txt==="?"?"q":"zz");m.hidden=false}
function claimShow(mode){const b=BK,c=b.D.claim;if(!c)return;if(mode===false){b.claimOn=false;actBub(c.who,null);return}b.claimOn=mode;actBub(c.who,c.t,mode==="x"?"x":"")}
const actH=id=>{const b=BK,a=b.act[id],A=b.D.actors[id],p=A.poses[a.pose]||A.poses.stand;return A.h*p[1]*persp(a.y)};
function camOf(c){if(!c)return null;if(typeof c[0]==="string"){const id=c[0],a=BK.act[id],sp=c[2]?spotXY(c[2]):[a.x,a.y];return {x:sp[0],y:sp[1]-actH(id)*.5,z:c[1]||1.3}}return {x:c[0],y:c[1],z:c[2]}}
function camSet(c,ms){if(!BK)return;BK.cam=c||{x:50,y:100,z:1};camApply(ms)}
function camApply(ms){const st=$("bStage"),w=$("bWorld");if(!st||!w||!BK)return;const W=st.clientWidth,H=st.clientHeight;if(!W)return;const WH=W*9/16,c=BK.cam||{x:50,y:100,z:1},z=Math.max(Math.min(c.z||1,H/(WH*.42)),H/WH,1);
 w.style.height=WH+"px";let tx=W/2-z*c.x/100*W,ty=H/2-z*c.y/100*WH;tx=Math.min(0,Math.max(W-z*W,tx));ty=Math.min(0,Math.max(H-z*WH,ty));
 w.style.transition=ms?`transform ${ms}ms cubic-bezier(.45,0,.25,1)`:"none";w.style.transform=`translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${z.toFixed(3)})`}
window.addEventListener("resize",()=>{if(BK&&!$("bookOv").hidden)camApply(0)});
function dustPuff(id){const a=BK.act[id],d=document.createElement("div");d.className="dust";d.style.left=(a.x-(a.flip?-2:2))+"%";d.style.top=(a.y-1)+"%";d.style.zIndex=Math.round(a.y*10)-1;$("bWorld").appendChild(d);setTimeout(()=>d.remove(),700)}
async function moveActor(s){const b=BK,vt=b.vt,id=s.move,a=b.act[id],[x,y]=spotXY(s.to),ms=s.ms||1500;
 a.flip=x<a.x-1;if(s.pose)a.pose=s.pose;a.mv=true;actMark(id,null);actDraw(id,0);await wait(30);if(b.vt!==vt)return;
 a.x=x;a.y=y;actDraw(id,ms);const dust=a.pose==="run"?setInterval(()=>{if(BK===b)dustPuff(id)},150):null;
 await wait(ms);clearInterval(dust);if(!bAlive(b)||b.vt!==vt)return;a.flip=false;a.mv=false;if(s.end)a.pose=s.end;actDraw(id,0)}
function fx(kind,at){const st=$("bStage");if(!st)return;
 if(kind==="confetti"){for(let i=0;i<26;i++){const c=document.createElement("span");c.className="conf";c.textContent=["🎉","✨","⭐","🎊","💛"][i%5];c.style.left=Math.random()*100+"%";c.style.animationDuration=(1.6+Math.random()*1.6)+"s";c.style.animationDelay=(Math.random()*.6)+"s";st.appendChild(c);setTimeout(()=>c.remove(),3600)}sfx("star");return}
 if(kind==="burst"){const w=$("bWorld"),[x,y]=at||[50,60];for(let i=0;i<12;i++){const s=document.createElement("span");s.className="spark";s.textContent=i%2?"✨":"⭐";const an=i/12*Math.PI*2;s.style.left=x+"%";s.style.top=y+"%";s.style.setProperty("--dx",Math.cos(an)*90+"px");s.style.setProperty("--dy",Math.sin(an)*60+"px");w.appendChild(s);setTimeout(()=>s.remove(),950)}sfx("star")}}
function burstAt(el){const r=el.getBoundingClientRect();for(let i=0;i<10;i++){const s=document.createElement("span");s.className="spark fixedp";s.textContent=i%2?"✨":"⭐";const an=i/10*Math.PI*2;s.style.left=r.left+r.width/2+"px";s.style.top=r.top+r.height/2+"px";s.style.setProperty("--dx",Math.cos(an)*70+"px");s.style.setProperty("--dy",Math.sin(an)*50+"px");document.body.appendChild(s);setTimeout(()=>s.remove(),950)}}
function flyTo(html,fromEl,toEl,cls){return new Promise(r=>{if(!fromEl||!toEl)return r();const a=fromEl.getBoundingClientRect(),z=toEl.getBoundingClientRect(),f=document.createElement("div");f.className="dfly "+(cls||"");f.innerHTML=html;f.style.left=a.left+a.width/2+"px";f.style.top=a.top+a.height/2+"px";document.body.appendChild(f);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.left=z.left+z.width/2+"px";f.style.top=z.top+z.height/2+"px";f.style.transform="translate(-50%,-50%) scale(.8)"}));setTimeout(()=>{f.remove();r()},480)})}
function capt(t){const c=$("bCapt");if(!c)return;if(!t){c.hidden=true;return}c.textContent=t;c.hidden=false}
function pageTurn(mid){return new Promise(r=>{const st=$("bStage");if(!st)return r();sfx("tap");const t=document.createElement("div");t.className="pturn";st.appendChild(t);setTimeout(()=>{try{mid&&mid()}catch(e){}},320);setTimeout(()=>{t.remove();r()},720)})}
async function showPov(pv){const b=BK,B=b.B,src=f=>f==="@lib"?(typeof POSTER2!=="undefined"?POSTER2:BOOKART.p1):b.D.dir+f,bg=pv.bg||pv.img;
 let h=`<img class="pbg" src="${src(bg)}" alt="">`+(pv.img?`<img class="pimg ${pv.fit==="contain"?"contain":""} kb-${pv.kb||"in"}" src="${src(pv.img)}" alt="">`:"");
 if(pv.vil)h+=`<img class="pvil" src="${(DA.vb&&DA.vb[B.vil])||PORT["v_"+B.vil]}" alt=""><span class="ptear">📄</span><span class="ptear t2">📃</span>`;
 if(pv.mentor)h+=`<img class="pment" src="${DA.mentor||PORT.mentor}" alt="">`;
 if(pv.team){const t=[B.owner,...(G.char!==B.owner?[G.char]:[])];h+=t.map((id,i)=>`<img class="pteam" src="${ownerImg(id)}" alt="" style="right:${4+i*20}%;animation-delay:${.2+i*.15}s">`).join("")}
 if(pv.deco)h+=pv.deco.map((e,i)=>`<span class="pdeco" style="right:${10+i*14}%;top:${14+(i%2)*26}%;animation-delay:${i*.5}s">${e}</span>`).join("");
 await pageTurn(()=>{const p=$("bPov");p.innerHTML=h;p.hidden=false})}
async function hidePov(){if($("bPov").hidden)return;await pageTurn(()=>{const p=$("bPov");p.hidden=true;p.innerHTML=""})}
/* --- script runner: every animated moment is a list of small steps --- */
async function runScript(list,silent){const b=BK,vt=b.vt;b.capt=!silent;for(const s of list){if(!bAlive(b)||b.vt!==vt||b.skip)break;await doStep(s)}b.capt=false;return bAlive(b)}
async function doStep(s){const b=BK,D=b.D,T=[];
 if(s.state){setState(s.state)}
 if(s.cam!==undefined)camSet(camOf(s.cam),s.cms!=null?s.cms:900);
 const st=$("bStage");
 if(s.bars!==undefined)st.classList.toggle("cine",!!s.bars);
 if(s.slow!==undefined)st.classList.toggle("slow",!!s.slow);
 if(s.gloom!==undefined)st.classList.toggle("gloom",!!s.gloom);
 if(Array.isArray(s.pose)){const a=b.act[s.pose[0]];a.pose=s.pose[1];actDraw(s.pose[0],0)}
 if(s.zz)actMark(s.zz,"Z z");
 if(s.mark)actMark(s.mark[0],s.mark[1]);
 if(s.claim!==undefined)claimShow(s.claim);
 if(s.prop){const p=document.createElement("div");p.className="bprop";p.textContent=s.prop[0];p.style.left=s.prop[1]+"%";p.style.top=s.prop[2]+"%";p.style.zIndex=Math.round(s.prop[2]*10);$("bProps").appendChild(p)}
 if(s.fx)fx(s.fx,s.at);
 if(s.move)T.push(moveActor(s));
 if(s.say)T.push(sayLine(s.say,s.who));
 if(s.wait)T.push(wait(s.wait));
 if(!s.par)await Promise.all(T)}
async function sayLine(text,who){const b=BK,A=b.D.actors[who],clean=String(text).replace(/^["“]|["”]$/g,"");
 if(A&&$("bPov").hidden)actBub(who,clean);else if(b.capt)capt((A?A.n+": ":who==="mentor"?K("Master Turtle: ","거북이 스승님: "):"")+clean);
 await bSpeak(text,who);if(!bAlive(b))return;
 if(A){const c=b.D.claim;if(c&&c.who===who&&b.claimOn)claimShow(b.claimOn);else actBub(who,null)}capt(null)}
/* --- storybook reader: big readable text, sentence highlight, voice, page turns --- */
function splitSegs(text){const out=[];String(text).split(/(["“][^"”]*["”])/).forEach(p=>{p=p.trim();if(!p)return;if(/^["“]/.test(p)){out.push({t:p,q:1});return}sentSplit(p,0).forEach(x=>{x=x.trim();if(x)out.push({t:x,q:0})})});return out}
async function readSegs(segs,who){const b=BK,tok=b.rt=(b.rt||0)+1;
 const hl=k=>document.querySelectorAll("#sbText .sg").forEach(e=>e.classList.toggle("on",+e.dataset.k===k));
 const A=who&&b.D.actors[who];
 for(let k=0;k<segs.length;k++){if(!bAlive(b)||b.rt!==tok)return;hl(k);const bub=A&&segs[k].q&&$("bPov").hidden;if(bub)actBub(who,segs[k].t.replace(/^["“]|["”]$/g,""));
  await bSpeak(segs[k].t,segs[k].q?(who||"narrator"):"narrator",!!segs[k].q);if(bub&&BK===b){const c=b.D.claim;if(c&&c.who===who&&b.claimOn)claimShow(b.claimOn);else actBub(who,null)}if(!bAlive(b)||b.rt!==tok)return;if(k<segs.length-1)await wait(Math.round(vGap()*.55))}
 if(b.rt===tok)hl(-1)}
async function readBook(pages,o){const b=BK;o=o||{};let i=o.start||0;
 while(bAlive(b)&&i<pages.length){const r=await readPage(pages,i,o);if(!bAlive(b))return false;i=r==="prev"?Math.max(0,i-1):i+1}
 return bAlive(b)}
function readPage(pages,i,o){const b=BK,p=pages[i],segs=splitSegs(p.text);b.vt=(b.vt||0)+1;
 return new Promise(res=>{
  const auto=G.autoRead!==false;
  $("bQ").innerHTML=`<div class="sbook"><div class="sbtext" id="sbText">${segs.map((s,k)=>`<span class="sg${s.q?" q":""}" data-k="${k}">${escH(s.t)}</span>`).join(" ")}</div>
   <div class="sbnav"><span class="pn">📖 ${i+1} / ${pages.length}</span><button class="btn" id="sbAuto" aria-pressed="${auto}">${auto?"🔈 "+K("Auto read on","자동 읽기 켜짐"):"🔇 "+K("Auto read off","자동 읽기 꺼짐")}</button><button class="btn" id="sbPrev" ${i?"":"disabled"}>◀</button><button class="btn" id="sbSay">🔊 ${K("Read to me","읽어 주기")}</button><button class="btn pri" id="sbNext">${i===pages.length-1?(o.last||K("Done ✓","다 읽었어요 ✓")):K("Next ▶","다음 ▶")}</button></div></div>`;
  $("bkMsg").textContent="";
  const go=r=>{b.rt=(b.rt||0)+1;hush();res(r)};
  $("sbNext").onclick=()=>{sfx("tap");go("next")};$("sbPrev").onclick=()=>go("prev");
  const read=()=>readSegs(segs,p.who);$("sbSay").onclick=read;b.replay=read;
  $("sbAuto").onclick=()=>{G.autoRead=G.autoRead===false;save();const a=G.autoRead!==false,e=$("sbAuto");e.setAttribute("aria-pressed",a);e.textContent=a?"🔈 "+K("Auto read on","자동 읽기 켜짐"):"🔇 "+K("Auto read off","자동 읽기 꺼짐");if(a)read();else{b.rt++;hush()}};
  const vt=b.vt;
  const first=p.pov?showPov(p.pov).then(()=>{if(p.fx&&b.vt===vt)fx(p.fx)}):Promise.resolve(b.ready).then(()=>hidePov()).then(()=>{if(bAlive(b)&&b.vt===vt)runScript(p.scene||[],true)});
  first.then(()=>wait(p.pov?250:500)).then(()=>{if(bAlive(b)&&b.vt===vt&&G.autoRead!==false)read()});
 })}
/* --- open / close --- */
function openBook(id){
 hush();const B=BOOKS.find(b=>b.id===id),D=BD[id];if(!D)return;
 BK={B,D,si:-1,ss:{},found:{},wrong:0,clue:null,fixed:false,cam:null,vt:0};$("bookOv").hidden=false;
 bookShell();worldBuild();setState("broken");camSet(null,0);BK.ready=bPreload(D);
 const p=$("bPov");p.innerHTML=`<img class="pbg" src="${BOOKART.p1}" alt="">`;p.hidden=false;
 $("bSteps").innerHTML=`<span class="on">📖 ${K("What happened?","무슨 일이 있었을까?")}</span>`;
 bookPrologue();
}
function bookClose(){if(BK)BK.skip=true;hush();$("bookOv").hidden=true;BK=null;document.querySelectorAll(".dfly").forEach(e=>e.remove());renderAll()}
async function bookPrologue(){const b=BK;const ok=await readBook(b.D.prologue.filter(pg=>!pg.onlyFor||pg.onlyFor.includes(G.char)),{last:"✨ "+K("Jump into the book!","책 속으로 들어가기!")});if(ok)bookEnter()}
async function bookEnter(){const b=BK,B=b.B,D=b.D;capt(null);hush();sfx("evo");
 const art=D.enterArt&&(G.char===B.owner||(D.enterWith||[]).includes(G.char));
 await pageTurn(()=>{const p=$("bPov");p.hidden=false;p.innerHTML=art?`<img class="pimg kb-in enterart" src="${D.dir+D.enterArt}" alt=""><span class="pdeco" style="right:12%;top:18%">✨</span><span class="pdeco" style="right:30%;top:40%;animation-delay:.5s">✨</span>`:`<div class="portal"><img src="${ownerImg(B.owner)}" alt="">${G.char!==B.owner?`<img src="${ownerImg(G.char)}" alt="">`:""}</div>`});
 $("bQ").innerHTML=`<p class="endq">✨ ${K("Into the book…","책 속으로…")}</p>`;$("bkMsg").textContent="";
 await Promise.all([bSpeak(D.enterLine,"@"+B.owner,true),b.ready,wait(1700)]);if(!bAlive(b))return;
 b.vt++;$("bStage").classList.remove("gloom","cine","slow");setState("broken");actMark("turtle","?");claimShow(true);camSet({x:30,y:100,z:1.3},0);
 await hidePov();if(!bAlive(b))return;camSet(null,1600);
 await runScript(D.enter||[]);if(!bAlive(b))return;goStep(0)}
function goStep(i){const b=BK;hush();b.si=i;b.ss={};b.clue=null;b.busy=false;bMentorOff();capt(null);bStepsUpd();const S=b.D.steps[i];if(!S)return bFinish();
 ({explore:stExplore,choose:stChoose,fix:stFix,script:stScript,order:stOrder,story:stStory,match:stMatch})[S.type](S)}
/* --- shared panel pieces --- */
function recHTML(mode){const b=BK;return `<div class="recs">${b.D.records.map(r=>{const f=b.found[r.k],dis=mode==="ev"&&(b.ss.evDis||[]).includes(r.k);
 return `<button class="rec${f?" found":""}${dis?" wrong":""}" id="rec_${r.k}" data-rec="${r.k}" ${dis?"disabled":""}><span class="ic">${f?r.ic:"❔"}</span><span><small>${r.place}</small>${f?(b.clue?markClue(r.t,b.clue):escH(r.t)):K("Find the glowing scroll!","반짝이는 두루마리를 찾아봐!")}</span></button>`}).join("")}</div>`}
function sentHTML(){const b=BK,Sn=b.D.sentence;if(!Sn)return "";const toks=Sn.tokens.map((t,i)=>i===Sn.bad&&b.fixed?`<span class="tok fixed">${escH(Sn.fix)}</span>`:escH(t)).join(" ");
 return `<div class="bpage ${b.fixed?"":"broken"}"><b>📖 ${K("In the book","책 속 문장")}</b><span class="toks" style="font-size:22px">${toks}</span></div>`}
function bWeak(){const s=$("bStage");if(!s)return;s.classList.remove("shake","flash");void s.offsetWidth;s.classList.add("shake","flash");sfx("bad");setTimeout(()=>s.classList.remove("shake","flash"),600)}
function bCheer(){const b=BK,st=$("bStage");if(!st)return;sfx("star");const t=[b.B.owner,...(G.char!==b.B.owner?[G.char]:[])];
 t.forEach((id,i)=>{const g=document.createElement("img");g.className="bgd2";g.src=ownerImg(id);g.style.left=(2+i*13)+"%";g.style.animationDelay=(i*.12)+"s";st.appendChild(g);setTimeout(()=>g.remove(),1900)})}
function bMentor(text,clue){const st=$("bStage");if(!st)return;bMentorOff();if(clue)BK.clue=clue;
 st.insertAdjacentHTML("beforeend",`<div class="dment"><img src="${DA.mentor||PORT.mentor}" alt=""><div class="bub"><b>${K("Master Turtle","거북이 스승님")}</b>${escH(text)}</div></div>`);
 bSpeak(text,"mentor",true)}
function bMentorOff(){const st=$("bStage"),m=st&&st.querySelector(".dment");if(m)m.remove()}
function bHelp(){const b=BK;if(!b||b.busy||b.si<0)return;const S=b.D.steps[b.si];if(!S)return;
 if(S.type==="explore")return bMentor(S.hint);
 if(S.type==="choose"){const Q=S.qs[b.ss.qi];bMentor(b.ss.ph==="who"?Q.hint:Q.evHint,Q.cl);chPanel();return}
 if(S.type==="fix"){bMentor(b.ss.sub===1?S.hint2:S.hint1,S.cl);fxPanel();return}
 if(S.type==="order"){b.clue=1;bMentor(S.hint);orPanel();return}
 if(S.type==="match")return bMentor(S.hint)}
/* --- step: explore (find the records hidden in the picture) --- */
function stExplore(S){const b=BK,D=b.D;
 $("bHots").innerHTML=D.records.map(r=>`<button class="bhot${b.found[r.k]?" found":""}" data-h="${r.k}" style="left:${r.at[0]}%;top:${r.at[1]}%"><span class="ring"></span><span class="sc">📜</span><b>${r.place}</b></button>`).join("");
 $("bHots").querySelectorAll(".bhot").forEach(h=>h.onclick=e=>{e.stopPropagation();exFind(h.dataset.h)});
 exPanel();b.replay=()=>bSpeak(S.ask);const si=b.si;setTimeout(()=>{if(bAlive(b)&&b.si===si&&!b.busy)b.replay()},500)}
function exPanel(){const b=BK,D=b.D,S=D.steps[b.si],n=Object.keys(b.found).length,all=n>=D.records.length;
 $("bQ").innerHTML=sentHTML()+`<p class="cq">${S.ask} (${n}/${D.records.length})</p>`+recHTML()+(all?`<button class="btn pri" id="bNext">${K("Next: solve it","다음: 추리하기")} →</button>`:"");
 $("bkMsg").textContent=all?"":K("Tap the glowing scrolls in the picture.","그림 속 반짝이는 두루마리를 눌러 봐.");
 document.querySelectorAll("#bQ [data-rec]").forEach(e=>e.onclick=()=>{if(b.busy)return;const r=D.records.find(x=>x.k===e.dataset.rec);if(b.found[r.k])bSpeak(r.t,"learn",true)});
 if($("bNext"))$("bNext").onclick=()=>{hush();$("bHots").innerHTML="";goStep(b.si+1)}}
async function exFind(k){const b=BK;if(!b||b.busy||b.found[k])return;const D=b.D,r=D.records.find(x=>x.k===k);b.busy=true;b.found[k]=1;sfx("ok");
 const h=document.querySelector(`.bhot[data-h="${k}"]`);if(h)h.classList.add("found");
 const prev=b.cam;camSet({x:r.at[0],y:r.at[1],z:1.7},650);await wait(600);if(!bAlive(b))return;
 const sc=document.createElement("div");sc.className="bscroll";sc.innerHTML=`<small>${r.ic} ${r.place} ${K("record","기록")}</small>${escH(r.t)}`;$("bStage").appendChild(sc);
 await Promise.race([bSpeak(r.t,"learn",true).then(()=>wait(500)),new Promise(res=>sc.onclick=()=>{hush();res()})]);if(!bAlive(b))return;
 sc.classList.add("away");camSet(prev,650);setTimeout(()=>sc.remove(),450);
 exPanel();const el=$("rec_"+k);if(el){await flyTo("📜",sc,el);el.classList.add("flash")}
 b.busy=false;if(Object.keys(b.found).length>=D.records.length){bCheer();bSpeak(K("You found every record!","기록을 모두 찾았어요!"))}}
/* --- step: choose (who/what + which record proves it) --- */
function stChoose(S){const b=BK;b.ss={qi:0,ph:"who",dis:[],evDis:[]};chPanel();const Q=S.qs[0];b.replay=()=>bSpeak(Q.ask);const si=b.si;setTimeout(()=>{if(bAlive(b)&&b.si===si)b.replay()},500)}
function chPanel(){const b=BK,D=b.D,S=D.steps[b.si],Q=S.qs[b.ss.qi];let h=sentHTML();
 if(b.ss.ph==="who")h+=`<p class="cq">${Q.ask}</p><div class="bopts">${Q.opts.map(([k,l,p])=>`<button class="bop who" data-who="${k}" ${b.ss.dis.includes(k)?"disabled":""}><img src="${D.dir+D.actors[k].poses[p||"stand"][0]}" alt="">${l}</button>`).join("")}</div>`+recHTML();
 else h+=`<p class="cq">${Q.evAsk}</p>`+recHTML("ev");
 $("bQ").innerHTML=h;$("bkMsg").textContent=K("Use the records as evidence.","기록을 근거로 골라요.");
 document.querySelectorAll("#bQ [data-who]").forEach(e=>e.onclick=()=>chWho(e.dataset.who,e));
 document.querySelectorAll("#bQ [data-rec]").forEach(e=>e.onclick=()=>chRec(e.dataset.rec,e))}
function chWho(k,el){const b=BK,S=b.D.steps[b.si],Q=S.qs[b.ss.qi];if(b.busy||b.ss.ph!=="who")return;
 if(k===Q.a){b.busy=true;el.classList.add("right");sfx("ok");bMentorOff();b.clue=null;const a=b.act[k],e=$("ba_"+k);if(e)e.classList.add("spot");camSet(camOf([k,1.45]),700);
  setTimeout(()=>{if(!bAlive(b))return;b.busy=false;b.ss.ph="ev";b.ss.evDis=[];chPanel();b.replay=()=>bSpeak(Q.evAsk);b.replay()},750)}
 else{b.wrong++;b.ss.dis.push(k);bWeak();chPanel();setTimeout(()=>{if(bAlive(b))bMentor(Q.hint,Q.cl)},450)}}
async function chRec(k,el){const b=BK,D=b.D,S=D.steps[b.si],Q=S.qs[b.ss.qi];if(b.busy)return;
 if(b.ss.ph!=="ev"){const r=D.records.find(x=>x.k===k);if(b.found[k])bSpeak(r.t,"learn",true);return}
 if(Q.ev.includes(k)){b.busy=true;el.classList.add("right");sfx("ok");bMentorOff();b.clue=null;bCheer();document.querySelectorAll(".bact.spot").forEach(e=>e.classList.remove("spot"));
  await bSpeak(K("Right! The record says so.","맞아요! 기록에 그렇게 적혀 있어요."));if(!bAlive(b))return;camSet(null,700);
  if(b.ss.qi+1<S.qs.length){b.busy=false;b.ss={qi:b.ss.qi+1,ph:"who",dis:[],evDis:[]};chPanel();const Q2=S.qs[b.ss.qi];b.replay=()=>bSpeak(Q2.ask);b.replay()}
  else{await runScript(S.after||[]);if(bAlive(b))goStep(b.si+1)}}
 else{b.wrong++;b.ss.evDis.push(k);bWeak();chPanel();setTimeout(()=>{if(bAlive(b))bMentor(Q.evHint,Q.cl)},450)}}
/* --- step: fix (find the changed word, put the right one back) --- */
function stFix(S){const b=BK,Sn=b.D.sentence;b.ss={sub:0,tkDis:[],fixDis:[],opts:shuffle([Sn.fix,...S.alts.slice(0,G.easy?1:S.alts.length)])};fxPanel();b.replay=()=>bSpeak(S.ask1);const si=b.si;setTimeout(()=>{if(bAlive(b)&&b.si===si)b.replay()},500)}
function fxPanel(){const b=BK,D=b.D,S=D.steps[b.si],Sn=D.sentence;
 const T=Sn.tokens.map((t,i)=>b.ss.sub===1&&i===Sn.bad?`<span class="tok found" id="tk_bad">${escH(t)}</span>`:b.ss.sub===1?`<span class="tok">${escH(t)}</span>`:`<button class="tok" data-tk="${i}" ${b.ss.tkDis.includes(i)?"disabled":""}>${escH(t)}</button>`).join("");
 $("bQ").innerHTML=`<div class="bpage broken"><b>📖 ${K("In the book","책 속 문장")}</b><span class="toks">${T}</span></div>`+(b.ss.sub===1?`<p class="cq">${S.ask2}</p><div class="bopts">${b.ss.opts.map(o=>`<button class="bop" data-fix="${o}" ${b.ss.fixDis.includes(o)?"disabled":""}>${o}</button>`).join("")}</div>`:`<p class="cq">${S.ask1}</p>`)+recHTML();
 $("bkMsg").textContent="";
 document.querySelectorAll("#bQ [data-tk]").forEach(e=>e.onclick=()=>fxTok(+e.dataset.tk));
 document.querySelectorAll("#bQ [data-fix]").forEach(e=>e.onclick=()=>fxFix(e.dataset.fix,e))}
function fxTok(i){const b=BK,S=b.D.steps[b.si];if(b.busy||b.ss.sub!==0)return;
 if(i===b.D.sentence.bad){sfx("ok");bMentorOff();b.clue=null;b.ss.sub=1;fxPanel();b.replay=()=>bSpeak(S.ask2);bSpeak(K("Found it! What should it be?","찾았다! 무엇으로 고칠까?"))}
 else{b.wrong++;b.ss.tkDis.push(i);bWeak();fxPanel();setTimeout(()=>{if(bAlive(b))bMentor(S.hint1,S.cl)},450)}}
async function fxFix(o,el){const b=BK,D=b.D,S=D.steps[b.si],Sn=D.sentence;if(b.busy||b.ss.sub!==1)return;
 if(o!==Sn.fix){b.wrong++;b.ss.fixDis.push(o);bWeak();fxPanel();setTimeout(()=>{if(bAlive(b))bMentor(S.hint2,S.cl)},450);return}
 b.busy=true;sfx("star");bMentorOff();b.clue=null;await flyTo(escH(o),el,$("tk_bad"),"bk");if(!bAlive(b))return;
 b.fixed=true;$("bQ").innerHTML=sentHTML()+`<p class="endq">✨ ${K("Fixed!","고쳤다!")}</p>`;const tk=document.querySelector("#bQ .tok.fixed");if(tk){tk.classList.add("land");burstAt(tk)}
 await bSpeak(Sn.tokens.map((t,i)=>i===Sn.bad?Sn.fix:t).join(" "),"learn",true);if(!bAlive(b))return;goStep(b.si+1)}
/* --- step: script (the story changes in front of the child) --- */
async function stScript(S){const b=BK;b.replay=()=>{};$("bQ").innerHTML=sentHTML()+`<p class="endq">✨ ${S.intro||""}</p>`;
 await runScript(S.script);if(!bAlive(b))return;
 $("bQ").insertAdjacentHTML("beforeend",`<button class="btn pri" id="bNext">${S.next||K("Next","다음")} →</button>`);
 $("bNext").onclick=()=>{hush();goStep(b.si+1)}}
/* --- step: order (put the story pages in order) --- */
function stOrder(S){const b=BK;b.ss={ord:[],perm:shuffle(S.pages.map((_,i)=>i))};if(b.ss.perm.every((v,i)=>v===i))b.ss.perm.reverse();orPanel();b.replay=()=>bSpeak(S.ask);const si=b.si;setTimeout(()=>{if(bAlive(b)&&b.si===si)b.replay()},500)}
function orPanel(){const b=BK,D=b.D,S=D.steps[b.si],o=b.ss.ord;
 $("bQ").innerHTML=`<p class="cq">${S.ask}</p><div class="pslots">${S.pages.map((_,i)=>`<span class="pslot2 ${o[i]!=null?"on":""}" id="ps_${i}">${o[i]!=null?`<img src="${D.dir+S.pages[o[i]].img}" alt="">`:""}${i+1}${K("p","쪽")}</span>`).join("→")}</div>
  <div class="pgs">${b.ss.perm.map(j=>`<button class="pg" data-pg="${j}" ${o.includes(j)?"disabled":""}><img src="${D.dir+S.pages[j].img}" alt=""><span>${b.clue&&j===o.length?markClue(S.pages[j].t,S.pages[j].cl):escH(S.pages[j].t)}</span></button>`).join("")}</div>`;
 $("bkMsg").textContent="";document.querySelectorAll("#bQ [data-pg]").forEach(e=>e.onclick=()=>orPick(+e.dataset.pg,e))}
async function orPick(j,el){const b=BK,D=b.D,S=D.steps[b.si];if(b.busy)return;
 if(j===b.ss.ord.length){b.busy=true;sfx("ok");bMentorOff();b.clue=null;await flyTo(`<img src="${D.dir+S.pages[j].img}" alt="">`,el.querySelector("img"),$("ps_"+b.ss.ord.length),"card");if(!bAlive(b))return;
  b.ss.ord.push(j);orPanel();bSpeak(S.pages[j].t,"learn",true);b.busy=false;
  if(b.ss.ord.length===S.pages.length){b.busy=true;bCheer();await wait(1900);if(bAlive(b))goStep(b.si+1)}}
 else{b.wrong++;el.classList.remove("wrong");void el.offsetWidth;el.classList.add("wrong");bWeak();setTimeout(()=>{if(bAlive(b)){b.clue=1;bMentor(S.hint);orPanel()}},450)}}
/* --- step: match (put each card where it belongs) — for books 2–12 --- */
function stMatch(S){const b=BK;b.ss={sel:null,done:{},dis:[]};maPanel();b.replay=()=>bSpeak(S.ask);b.replay()}
function maPanel(){const b=BK,S=b.D.steps[b.si];
 $("bQ").innerHTML=`<p class="cq">${S.ask}</p><div class="copts">${S.items.filter(it=>!b.ss.done[it.id]).map(it=>`<button class="cop st" data-it="${it.id}" aria-pressed="${b.ss.sel===it.id}">${it.ic||""} ${escH(it.t)}</button>`).join("")}</div>
  <div class="bopts">${S.targets.map(tg=>`<button class="bop" data-tg="${tg.id}" style="flex-direction:column;font-size:20px">${tg.ic||""} ${escH(tg.t)}<small style="font-size:13px">${S.items.filter(it=>b.ss.done[it.id]===tg.id).map(it=>"✔ "+escH(it.t)).join("<br>")}</small></button>`).join("")}</div>`;
 document.querySelectorAll("#bQ [data-it]").forEach(e=>e.onclick=()=>{b.ss.sel=e.dataset.it;sfx("tap");maPanel();const it=S.items.find(x=>x.id===b.ss.sel);bSpeak(it.t,"learn",true)});
 document.querySelectorAll("#bQ [data-tg]").forEach(e=>e.onclick=()=>maPut(e.dataset.tg))}
function maPut(tg){const b=BK,S=b.D.steps[b.si];if(!b.ss.sel)return;
 if(S.ans[b.ss.sel]===tg){b.ss.done[b.ss.sel]=tg;b.ss.sel=null;sfx("ok");maPanel();if(S.items.every(it=>b.ss.done[it.id])){bCheer();setTimeout(()=>{if(bAlive(b))goStep(b.si+1)},1600)}}
 else{b.wrong++;bWeak();setTimeout(()=>{if(bAlive(b))bMentor(S.hint)},450)}}
/* --- step: story (read the restored story) --- */
async function stStory(S){const b=BK;$("bHots").innerHTML="";const ok=await readBook(b.D[S.pages],{last:"✨ "+K("Story restored!","이야기 완성!")});if(!ok)return;$("bStage").classList.remove("cine","slow");if(b.menu){bookMenu(b.B.id);return}bFinish()}
/* --- finish, replay menu, bonus ending --- */
function bFinish(){const b=BK,B=b.B,D=b.D,st=b.wrong===0?3:b.wrong<=3?2:1;b.si=D.steps.length;G.books=G.books||{};const first=!bookDone(B.id);
 G.books[B.id]=Object.assign(G.books[B.id]||{},{done:1,stars:Math.max(st,(G.books[B.id]||{}).stars||0)});save();
 bStepsUpd();b.vt++;$("bPov").hidden=true;$("bStage").classList.remove("cine","slow","gloom");setState("end");camSet(null,600);bCheer();fx("confetti");
 $("bQ").innerHTML=`<div class="bfin row"><div class="cover cv" style="background-image:url(${D.dir+D.cover})"><span>${B.t}</span></div>
  <div class="col"><div class="stars">${"⭐".repeat(st)}${"☆".repeat(3-st)}</div><b>${K("You won the story back!","이야기를 되찾았어요!")}</b>
  <div class="tbtns"><button class="btn" id="bEnd">✏️ ${K("Make my own ending","내 결말 만들기")}</button><button class="btn pri" id="bShelf">📚 ${K("Put it on the shelf","도서관에 꽂기")}</button></div></div></div>`;
 $("bkMsg").textContent="";b.replay=()=>{};
 narrate(D.fin.map(x=>x.replace("{vil}",iga(VIL[B.vil].n.ko))),null,"ko",{who:"mentor"});
 const pay=()=>{if(first&&!b.paid){b.paid=1;reward(40+st*10,40,15)}};
 $("bShelf").onclick=()=>{SHELF_NEW=first?B.id:null;bookClose();pay();setTimeout(()=>narrate(["되찾은 책이 도서관에 꽂혔어요!"],null,"ko"),900)};
 $("bEnd").onclick=()=>{if(first)SHELF_NEW=B.id;pay();bEnding()}}
function bookMenu(id){
 const B=BOOKS.find(b=>b.id===id),D=BD[id],bs=G.books[id]||{};hush();
 BK={B,D,si:D.steps.length,ss:{},found:{},wrong:0,clue:null,fixed:true,cam:null,vt:0,menu:1};$("bookOv").hidden=false;
 bookShell();worldBuild();setState("end");camSet(null,0);BK.ready=bPreload(D);bStepsUpd();
 $("bQ").innerHTML=`<div class="bfin"><b>📖 ${B.t} · ${"⭐".repeat(bs.stars||1)}</b>${bs.end?`<div class="myend">✏️ ${K("My ending","내 결말")}: ${escH(bs.end)}</div>`:""}
  <div class="tbtns"><button class="btn" id="bRead">📖 ${K("Read the story","이야기 다시 읽기")}</button><button class="btn" id="bEnd">✏️ ${K("Make my own ending","내 결말 만들기")}</button><button class="btn" id="bAgain">🔁 ${K("Restore it again","다시 복구하기")}</button></div></div>`;
 $("bkMsg").textContent="";
 $("bRead").onclick=async()=>{const b=BK;const ok=await readBook(D.restored,{last:K("Done ✓","다 읽었어요 ✓")});if(ok&&BK===b){$("bStage").classList.remove("cine","slow");bookMenu(id)}};
 $("bEnd").onclick=()=>bEnding();$("bAgain").onclick=()=>openBook(id)}
function bEnding(){const b=BK,E=b.D.ending;b.ea=null;b.vt++;bMentorOff();hush();$("bPov").hidden=true;$("bStage").classList.remove("cine","slow","gloom");
 setState(E.start);camSet(null,600);
 $("bQ").innerHTML=`<p class="endq">✏️ ${E.title}</p><p class="cq">${E.lead}</p><div class="bopts">${E.A.map((x,i)=>`<button class="bop" data-ea="${i}" style="font-size:20px">${x.e} ${x.t}</button>`).join("")}</div>`;
 $("bkMsg").textContent=K("There is no wrong answer here. Make your own story!","여기는 정답이 없어요. 내 마음대로 만들어 봐요!");
 b.replay=()=>bSpeak(E.ask);b.replay();
 document.querySelectorAll("[data-ea]").forEach(e=>e.onclick=()=>bEndA(+e.dataset.ea))}
async function bEndA(i){const b=BK,E=b.D.ending;if(b.busy)return;b.busy=true;b.ea=i;hush();sfx("tap");
 $("bQ").innerHTML=`<p class="endq">✏️ ${E.lead} ${E.A[i].t}</p>`;await runScript(E.A[i].s,true);if(!bAlive(b))return;b.busy=false;
 $("bQ").innerHTML=`<p class="endq">✏️ ${E.lead} ${E.A[i].t}</p><p class="cq">${E.lead2}</p><div class="bopts">${E.B.map((x,j)=>`<button class="bop" data-eb="${j}" style="font-size:20px">${x.e} ${x.t}</button>`).join("")}</div>`;
 b.replay=()=>bSpeak(E.ask2);b.replay();
 document.querySelectorAll("[data-eb]").forEach(e=>e.onclick=()=>bEndB(+e.dataset.eb))}
async function bEndB(j){const b=BK,B=b.B,E=b.D.ending;if(b.busy)return;b.busy=true;hush();sfx("star");
 $("bQ").innerHTML=`<p class="endq">✏️ …</p>`;await runScript(E.B[j].s,true);if(!bAlive(b))return;b.busy=false;
 const text=E.tpl.replace("{A}",E.A[b.ea].t).replace("{B}",E.B[j].t);G.books[B.id]=Object.assign(G.books[B.id]||{},{end:text});save();
 $("bQ").innerHTML=`<div class="sbook"><div class="sbtext"><span class="sg on">✏️ ${escH(text)}</span></div><div class="sbnav"><span class="pn">${K("My ending","내 결말")}</span><button class="btn" id="bEnd2">🔁 ${K("Make another","다른 결말 만들기")}</button><button class="btn pri" id="bShelf2">📚 ${K("Back to the library","도서관으로")}</button></div></div>`;
 $("bEnd2").onclick=()=>bEnding();$("bShelf2").onclick=()=>bookClose();b.replay=()=>bSpeak(text);bSpeak(text)}

/* story stages */
let STAGE=null;
const STAGES=[
 {kind:"fill",npc:"captain",vp:.84,x:14,y:80,place:{en:"Turtle Beach",ko:"거북 해변"},
  story:{en:["The Cat Gang whipped up a storm, stole every Hangul letter on the island and smashed Master Turtle's ship.","\"Oh dear, children. Black Cat even pulled the letters out of my letter. Can you fill in the gaps?\""],ko:["고양이 악당들이 폭풍을 일으켜 섬의 한글을 몽땅 훔쳐 가고, 거북이 스승님의 배까지 부숴 버렸어요.","\"얘들아, 큰일이구나. 흑묘가 내 편지 글자까지 숭숭 빼 갔단다. 빈칸을 채워 주겠니?\""]},
  tip:{en:"Read new words slowly, out loud.",ko:"모르는 낱말은 천천히 소리 내어 읽어 보렴."},
  goal:{en:"Fill 4 sentences",ko:"문장 4개 채우기"},win:{en:"\"Thank you! Now I can read my letter. The squirrel in the forest needs your help.\"",ko:"\"고맙구나! 이제 편지를 읽을 수 있겠어. 숲속 다람쥐가 도움을 청하고 있단다.\""}},
 {kind:"battle",lv:1,vil:"gray",npc:"squirrel",vp:1.3,part:"hull",x:26,y:58,place:{en:"Squirrel Forest",ko:"다람쥐 숲"},
  story:{en:["Deep in the forest, Woody the Squirrel was shaking.","\"Grey Cat tricked me and stole the letters off my axe! Beat him and I'll give you strong wood for the ship.\""],ko:["숲에 들어서자 나무꾼 다람쥐가 떨고 있었어요.","\"회색냥이 날 속이고 도끼 글자를 훔쳐 갔어! 물리쳐 주면 배를 만들 튼튼한 나무를 줄게.\""]},
  tip:{en:"Listen, look at the picture, then tap.",ko:"잘 듣고, 그림을 보고, 그다음에 콕 누르렴."},
  goal:{en:"Beat Grey Cat",ko:"회색냥 물리치기"},win:{en:"\"You did it! Here's the wooden hull I promised.\"",ko:"\"해냈구나! 약속한 나무 선체야.\""}},
 {kind:"shower",npc:"beaver",vp:1.15,x:42,y:68,place:{en:"Beaver River",ko:"비버 강"},
  story:{en:["At the river, the bridge had fallen down.","\"Chubby Cat gobbled up the bridge's letters and sent them flying into the sky! Catch 6 right words for me.\""],ko:["강에 도착하니 다리가 무너져 있었어요.","\"뚱냥이 다리 글자를 먹어 치우다가 하늘로 흩뿌렸어! 맞는 낱말 6개를 모아 줘.\""]},
  tip:{en:"Try to read the whole word at a glance.",ko:"한 글자씩 말고, 낱말을 한눈에 통째로 읽어 보렴."},
  goal:{en:"Pop 6 right words",ko:"맞는 낱말 6개 터뜨리기"},win:{en:"\"The bridge is back! Now you can cross the river.\"",ko:"\"다리 완성! 이제 강을 건널 수 있어.\""}},
 {kind:"read",pid:"p1",npc:null,hero:"rat",vp:.84,x:38,y:38,place:{en:"Story Hill",ko:"이야기 언덕"},
  story:{en:["On top of the hill, an old story was carved into a big rock.","\"Read it aloud three times and a hidden path will open,\" said Master Turtle."],ko:["언덕 위 커다란 바위에 옛이야기가 새겨져 있었어요.","\"이 이야기를 소리 내어 세 번 읽으면 숨겨진 길이 열린단다.\" 거북이 스승님이 말했어요."]},
  tip:{en:"Every time you reread a story, it gets smoother.",ko:"같은 이야기를 여러 번 읽을수록 점점 매끄러워진단다."},
  goal:{en:"Read the story aloud 3 times",ko:"이야기를 소리 내어 3번 읽기"},win:{en:"The rock rumbled and a path opened. A cave appeared in the distance!",ko:"바위가 우르릉 움직이며 길이 열렸어요. 저 멀리 동굴이 보여요!"}},
 {kind:"course",npc:"spider",vp:1.2,part:"rope",x:56,y:24,place:{en:"Spider Cave",ko:"거미 동굴"},
  story:{en:["Spider webs blocked the cave entrance.","\"The Cat Gang's gremlins are blocking the path. Run all the way to the end and I'll spin you a strong rope!\""],ko:["동굴 입구는 거미줄로 막혀 있었어요.","\"고양이 악당들의 부하 도깨비들이 길을 막고 있어. 끝까지 달려가면 튼튼한 밧줄을 줄게!\""]},
  tip:{en:"Remember the letter sounds. They're the keys to the gates.",ko:"글자 소리를 잘 기억해 두렴. 문을 여는 열쇠란다."},
  goal:{en:"Reach the flag",ko:"깃발까지 달리기"},win:{en:"\"Amazing! Here's the spider-silk rope I promised.\"",ko:"\"대단해! 약속한 거미줄 밧줄이야.\""}},
 {kind:"battle",lv:2,vil:"tiger",npc:"mole",vp:1.1,part:"nails",x:74,y:34,place:{en:"Shiny Mine",ko:"반짝 광산"},
  story:{en:["Deep in the cave, the Miner Hedgehog shouted for help.","\"Tiger Cat showed off and took all my copper! Listen carefully and beat him.\""],ko:["동굴 깊은 곳 광산에서 고슴도치 광부가 소리쳤어요.","\"호랑이냥이 잘난 척하며 구리를 몽땅 가져갔어! 소리를 잘 듣고 물리쳐 줘.\""]},
  tip:{en:"Say the last sound of each letter clearly.",ko:"받침이 있는 글자는 끝소리까지 또박또박 읽으렴."},
  goal:{en:"Beat Tiger Cat",ko:"호랑이냥 물리치기"},win:{en:"\"Shiny copper nails! Now the ship will hold together.\"",ko:"\"반짝반짝 구리 못이야! 배를 단단히 고칠 수 있겠어.\""}},
 {kind:"puzzle",npc:"gull",vp:1.25,part:"sail",x:85,y:60,place:{en:"Seagull Cliff",ko:"갈매기 절벽"},
  story:{en:["A hungry seagull sat on the cliff by the sea.","\"Black Cat mixed up the twelve heroes painted on my sail. Can you read their names and put them back in order?\""],ko:["바닷가 절벽에 배고픈 갈매기가 앉아 있었어요.","\"흑묘가 내 돛에 그려진 열두 영웅 그림을 다 흩어 놓았어. 이름을 읽고 순서대로 맞춰 줄래?\""]},
  tip:{en:"Rat, ox, tiger, rabbit… do you remember the zodiac order?",ko:"쥐, 소, 호랑이, 토끼… 열두 띠 순서 기억나니?"},
  goal:{en:"Finish the zodiac puzzle",ko:"십이지 퍼즐 완성하기"},win:{en:"\"Perfect! Here's the sail I promised.\"",ko:"\"완벽해! 약속한 돛이야.\""}},
 {kind:"battle",lv:3,boss:1,vil:"white",npc:"v_white",vp:1.12,x:66,y:84,place:{en:"Set Sail",ko:"출항"},
  story:{en:["The ship is fixed! But just then, White Cat, leader of the Cat Gang, appeared!","\"You left us cats out of the zodiac! You'll never get the Hangul back, meow!\""],ko:["배가 다 고쳐졌어요! 그런데 그때, 고양이 악당들의 우두머리 백묘가 나타났어요!","\"열두 띠에 우리 고양이만 빼놓다니! 한글은 절대 못 돌려줘, 냐옹!\""]},
  tip:{en:"Don't be scared. Read clearly and you can beat any villain.",ko:"겁내지 마라. 또박또박 읽으면 어떤 악당도 이길 수 있단다."},
  goal:{en:"Beat White Cat",ko:"백묘 물리치기"},win:{en:"White Cat gave back every stolen letter and ran off with the Cat Gang. Time to sail to the next island with Master Turtle!",ko:"백묘는 훔친 한글을 모두 돌려주고 고양이 악당들과 함께 도망쳤어요. 이제 거북이 스승님과 함께 다음 섬으로 출발!"}}];
STAGES[3].who="mentor";
const speakerOf=S=>S.who||(S.npc==="captain"?"mentor":S.npc||S.hero||"narrator");
const PART_STAGE={hull:1,rope:4,nails:5,sail:6};
const stagePor=S=>S.npc?portrait(S.npc):heroArt(S.hero,1);
function stagePath(){
 const pts=STAGES.map(s=>[s.x*1.6,s.y*1.1]);let d=`M${pts[0][0]} ${pts[0][1]}`;
 for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i];d+=` Q${(x0+x1)/2+(i%2?6:-6)} ${(y0+y1)/2+(i%2?-6:6)} ${x1} ${y1}`}return d;
}
function stageBg(){
 return `<svg class="bg" viewBox="0 0 160 110" preserveAspectRatio="none" aria-hidden="true">
 <defs><linearGradient id="sea0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4CC3E6"/><stop offset="1" stop-color="#2B98C4"/></linearGradient>
 <radialGradient id="isl0" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#98D86A"/><stop offset="1" stop-color="#6BBE4E"/></radialGradient></defs>
 <rect width="160" height="110" fill="url(#sea0)"/>
 ${[[20,10],[120,8],[140,96],[8,52],[100,104]].map(([x,y])=>`<path d="M${x} ${y} q3 -2 6 0 q3 2 6 0" stroke="#fff" stroke-opacity=".5" stroke-width=".8" fill="none"/>`).join("")}
 <path d="M14 92 Q4 70 14 50 Q20 30 40 22 Q60 8 90 12 Q122 14 140 32 Q156 50 148 74 Q142 98 112 102 Q80 108 50 102 Q22 102 14 92Z" fill="#F2DAA4" stroke="#1B2233" stroke-width=".8"/>
 <path d="M20 88 Q12 70 20 52 Q26 34 44 27 Q62 15 90 18 Q118 20 134 36 Q148 52 141 72 Q136 92 110 96 Q80 101 52 96 Q28 96 20 88Z" fill="url(#isl0)"/>
 <path d="M62 18 Q70 40 64 56 Q60 70 72 84 Q78 94 76 104" stroke="#3BA8D8" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M64 70 L74 66" stroke="#8A5A34" stroke-width="3"/>
 ${[[24,56],[30,62],[22,64],[34,54],[28,48]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.4" fill="#3E9A45" stroke="#1B2233" stroke-width=".5"/>`).join("")}
 <path d="M104 30 L114 16 L124 30Z M114 30 L124 14 L134 30Z" fill="#9AA3B2" stroke="#1B2233" stroke-width=".6"/><path d="M111 20 L114 16 L117 20Z M121 18 L124 14 L127 18Z" fill="#fff"/>
 <path d="M84 30 Q90 20 96 30Z" fill="#3B3046" stroke="#1B2233" stroke-width=".6"/>
 <path d="M130 70 L146 64 L148 74Z" fill="#B8A78E" stroke="#1B2233" stroke-width=".5"/>
 <path d="${stagePath()}" fill="none" stroke="#1B2233" stroke-width="2.6" stroke-linecap="round"/><path d="${stagePath()}" fill="none" stroke="#FFF7DC" stroke-width="1.6" stroke-dasharray="2.4 2" stroke-linecap="round"/>
 </svg>`;
}
function renderStages(){
 const box=$("stageMap");if(!box)return;if(G.view!=="island"){renderLibrary();return}box.classList.remove("lib");const cur=Math.min(G.st||0,STAGES.length-1);
 let h=`<img class="bg island-render" src="assets/img/scene/island_map.webp" alt="${K("Hangul Island map","한글 섬 모험 지도")}">`;
 STAGES.forEach((S,i)=>{const lock=i>(G.st||0),done=i<(G.st||0),st=G.stars[i]||0;
  if(S.npc||S.hero)h+=`<div class="snpc" style="left:${S.x+3}%;top:${S.y}%">${stagePor(S)}</div>`;
  h+=`<button class="snode${lock?" lock":done?" done":" cur"}" data-i="${i}" style="left:${S.x}%;top:${S.y}%" ${lock?"disabled":""} aria-label="Stage ${i+1}"><span class="pl2">${L(S.place)}</span>${lock?"🔒":i+1}${done?`<span class="st">${"⭐".repeat(st)}${"☆".repeat(3-st)}</span>`:""}</button>`});
 const C=STAGES[cur];h+=`<div class="sship" style="left:72%;top:86%">${shipSVG()}</div>`;
 h+=`<div class="shero" style="left:${C.x-5}%;top:${C.y+2}%">${heroBodyHTML(G.char)}</div>`;
 box.innerHTML=h;
 box.querySelectorAll(".snode:not(:disabled)").forEach(b=>b.onclick=()=>{sfx("tap");openStage(+b.dataset.i)});
}
function stageCard(html){$("stCard").innerHTML=html;$("stOv").hidden=false}
function openStage(i){
 const S=STAGES[i],u=t(),part=S.part&&PARTS.find(p=>p.id===S.part);
 stageCard(`<div class="sthead"><div class="portrait">${stagePor(S)}</div><div><small>${K("Stage","스테이지")} ${i+1} / ${STAGES.length}</small><h2>${L(S.place)}</h2></div></div>
  <div class="story">${L(S.story).map(p=>`<p>${p}</p>`).join("")}</div>
  ${S.tip?`<div class="mtip"><span class="mp">${mentorArt()}</span><p><b>${K("Master Turtle says","거북이 스승님의 한마디")}</b>${L(S.tip)}</p></div>`:""}
  <div class="goal"><span>🎯 ${L(S.goal)}</span>${part?`<span>${part.e} ${L(part.n)}</span>`:""}<span>⭐ ${G.stars[i]||0} / 3</span></div>
  <div class="btns"><button class="btn" id="stX">${K("Not now","나중에")}</button><button class="btn" id="stHear">🔊</button><button class="btn pri" id="stGo">${K("Start!","시작!")}</button></div>`);
 const tell=()=>narrate(L(S.story),()=>{if(S.tip&&!$("stOv").hidden)setTimeout(()=>{if(!$("stOv").hidden)narrate([L(S.tip)],null,null,{voice:"mentor"})},vGap())},null,{who:speakerOf(S)});
 $("stX").onclick=()=>{hush();$("stOv").hidden=true};$("stHear").onclick=tell;
 if(autoNar())setTimeout(()=>{if(!$("stOv").hidden)tell()},900);
 $("stGo").onclick=()=>{$("stOv").hidden=true;stageStart(i)};
}
function stageStart(i){
 const S=STAGES[i];STAGE={i,kind:S.kind};sfx("tap");hush();
 if(S.kind==="fill")pgPlay("fill",G.easy?1:3,{stage:true,goal:4});
 else if(S.kind==="shower")pgPlay("rain",G.easy?3:4,{stage:true,goal:6});
 else if(S.kind==="read"){$("libOv").hidden=false;rrStart(S.pid)}
 else if(S.kind==="puzzle"){$("libOv").hidden=false;pzStart(false)}
 else if(S.kind==="course")startRun();
 else duel({lv:S.lv,boss:!!S.boss,vil:S.vil});
}
function stageFinish(ok,stars,quiet){
 const S=STAGE;STAGE=null;if(!S)return;renderAll();
 if(!ok){if(!quiet)stageFail(S.i);return}
 const i=S.i,D=STAGES[i],first=(G.st||0)<=i;stars=Math.max(1,Math.min(3,stars||1));
 G.stars[i]=Math.max(G.stars[i]||0,stars);if(first)G.st=i+1;save();renderAll();
 const part=first&&D.part&&PARTS.find(p=>p.id===D.part),last=i===STAGES.length-1;
 stageCard(`<div class="sthead"><div class="portrait">${stagePor(D)}</div><div><small>${K("Stage","스테이지")} ${i+1}</small><h2>${K("Stage clear!","스테이지 클리어!")}</h2></div></div>
  <div class="bigstars">${[1,2,3].map(n=>`<span class="${n<=stars?"":"off"}">⭐</span>`).join("")}</div>
  <div class="story"><p>${L(D.win)}</p></div>${part?`<div class="goal"><span>${part.e} ${t().newPart(L(part.n))}</span></div>`:""}
  <div class="btns">${last?`<button class="btn pri" id="stNext">🏝️ ${K("Island 1 clear!","섬 1 클리어!")}</button>`:`<button class="btn" id="stMap">${K("Map","지도")}</button><button class="btn pri" id="stNext">${K("Next stage","다음 스테이지")} →</button>`}</div>`);
 sfx("star");narrate([L(D.win)],null,null,{who:speakerOf(D)});
 if(first)reward(30+stars*10,30,12);else reward(stars*5,10,0);
 if($("stMap"))$("stMap").onclick=()=>{hush();$("stOv").hidden=true};
 $("stNext").onclick=()=>{hush();$("stOv").hidden=true;if(last){G.dragon=true;save();showClear()}else openStage(i+1)};
}
function stageFail(i){
 stageCard(`<div class="sthead"><div class="portrait">${stagePor(STAGES[i])}</div><div><small>${K("Stage","스테이지")} ${i+1}</small><h2>${K("So close!","아깝다!")}</h2></div></div>
  <div class="story"><p>${K("Let's try again. You can do it!","다시 해 보자. 할 수 있어!")}</p></div>
  <div class="btns"><button class="btn" id="stMap">${K("Map","지도")}</button><button class="btn pri" id="stRe">${K("Try again","다시 도전")}</button></div>`);
 $("stMap").onclick=()=>{hush();$("stOv").hidden=true};$("stRe").onclick=()=>{$("stOv").hidden=true;stageStart(i)};narrate([K("So close! Let's try again. You can do it!","아깝다! 다시 해 보자. 할 수 있어!")]);
}
function practiceBattle(){duel({practice:true,tier:G.easy?1:2})}

function renderExtras(){
 const X=[["today","☀️",K("Today's adventure","오늘의 모험"),()=>tdOpen()],[G.view==="island"?"lib2":"island",G.view==="island"?"📚":"🏝️",G.view==="island"?K("Story Library","이야기 도서관"):K("Hangul Island","한글 섬 모험"),()=>{G.view=G.view==="island"?"library":"island";save();renderAll()}],["play","🎪",K("Playground","한글 놀이터"),()=>pgHub()],["case","🔎",K("Case Squad","사건 수사대"),()=>openCases()],["course","🌀",K("Free course","모험 코스"),()=>startRun()],["battle","⚔️",K("Practice battle","연습 배틀"),()=>practiceBattle()],["shop","🦝",K("Shop","상점"),()=>showShop()]];
 $("extras").innerHTML=X.map(([k,ic,n])=>`<button class="xbtn" data-x="${k}"><span class="ic">${ic}</span>${n}${k==="today"?tdChip():""}${(k==="case"&&!(G.cases&&G.cases.k1))||(k==="play"&&!G.pgIntro)?'<span class="new">NEW</span>':""}</button>`).join("");
 $("extras").querySelectorAll(".xbtn").forEach((b,i)=>b.onclick=()=>{if(overlayOpen())return;sfx("tap");X[i][3]()});tdHudSet();
}
/* stations */
function station(k){
 if(G.q<1){toast(t().needQ);return}
 sfx("tap");if(k==="shop")showShop();else if(k==="run")startRun();else pgHub();
}

/* hero panel */
function showHero(){
 const u=t(),c=CHARS.find(x=>x.id===G.char);
 let h=`<div class="parhead"><div class="parsprite">${heroArt(G.char)}</div><div><h2>${L(c.n)}</h2><p>${u.lvl(G.lv)} · <span class="coins">🪙 ${G.coins}</span></p><p class="rule"><b>${L(c.ab)}</b> · ${L(c.d)}</p>
 <div class="xpbar"><i style="width:${G.lv>=MAXLV?100:G.exp/needEXP(G.lv)*100}%"></i></div><p class="rule">${G.lv>=MAXLV?u.maxLv:u.expTo(G.exp,needEXP(G.lv))}</p>
 <p class="rule">${u.hearts(maxHearts())} ${"❤️".repeat(maxHearts())}</p></div></div>`;
 h+=`<h3>${u.track}</h3><div class="lvtrack">`+Object.keys(LVREW).map(Number).map(l=>{const R=rewList(LVREW[l]);return `<div class="lvc ${G.lv>=l?"got":l===G.lv+1?"next":""}"><b>Lv ${l}</b><span class="ic">${R.map(r=>r.ic).join("")}</span>${R[0].txt}</div>`}).join("")+`</div>`;
 h+=`<h3>${u.equip}</h3><div class="inv">`+Object.keys(EQUIP).map(k=>{const E=EQUIP[k],own=G.eqs.includes(k),on=G.eq===k;
  return `<div class="icard ${on?"eq":""} ${own?"":"lock"}"><div class="top"><span class="ic">${E.e}</span><b>${L(E.n)}</b></div><small>${L(E.d)}</small>${own?`<button class="btn${on?"":" pri"}" data-eq="${k}">${on?u.unequip:u.equipB}</button>`:`<small>🔒 ${u.lockLv(E.lv)}${E.shop?` · 🪙 ${E.p}`:""}</small>`}</div>`}).join("")+`</div>`;
 h+=`<h3>${u.inv}</h3><div class="inv">`+Object.keys(ITEMS).map(k=>{const I=ITEMS[k];
  return `<div class="icard"><div class="top"><span class="ic">${I.e}</span><b>${L(I.n)} ×${G.inv[k]}</b></div><small>${L(I.d)}</small>${k==="snack"&&G.inv.snack>0?`<button class="btn pri" data-use="snack">${u.use}</button>`:""}</div>`}).join("")+`</div>`;
 h+=`<div class="btns"><button class="btn pri" id="heroClose">${u.close}</button></div>`;
 $("heroCard").innerHTML=h;$("heroOv").hidden=false;
 $("heroClose").onclick=()=>$("heroOv").hidden=true;
 $("heroCard").querySelectorAll("[data-eq]").forEach(b=>b.onclick=()=>{const k=b.dataset.eq;G.eq=G.eq===k?null:k;save();sfx("tap");renderEnts();showHero()});
 $("heroCard").querySelectorAll("[data-use]").forEach(b=>b.onclick=()=>{G.inv.snack--;save();$("heroOv").hidden=true;gainXP(15)});
}
$("hHero").onclick=()=>{if(!overlayOpen())showHero()};

/* shop */
function showShop(){
 const u=t();
 let h=`<div class="chead shophead"><div class="portrait shopkeep"><img src="assets/img/npc/raccoon.webp" alt="" onerror="this.parentNode.innerHTML=portrait('shop')"></div><div><h2>${L(STATIONS.shop.n)}</h2><p>${u.shopHi}</p></div></div><p class="coins" style="font-size:22px">🪙 ${G.coins}</p>`;
 h+=`<h3>${u.inv}</h3><div class="inv">`+Object.keys(ITEMS).map(k=>{const I=ITEMS[k];
  return `<div class="icard"><div class="top"><span class="ic">${I.e}</span><b>${L(I.n)}</b></div><small>${L(I.d)}</small><small>${u.owned(G.inv[k])}</small><button class="btn pri" data-buy="${k}" ${G.coins<I.p?"disabled":""}>${u.buy} · 🪙 ${I.p}</button></div>`}).join("")+`</div>`;
 h+=`<h3>${u.equip}</h3><div class="inv">`+Object.keys(EQUIP).filter(k=>EQUIP[k].shop).map(k=>{const E=EQUIP[k],own=G.eqs.includes(k),lock=G.lv<E.lv;
  return `<div class="icard ${lock?"lock":""}"><div class="top"><span class="ic">${E.e}</span><b>${L(E.n)}</b></div><small>${L(E.d)}</small>${own?`<small>${u.ownedEq}</small>`:lock?`<small>🔒 ${u.lockLv(E.lv)}</small>`:`<button class="btn pri" data-beq="${k}" ${G.coins<E.p?"disabled":""}>${u.buy} · 🪙 ${E.p}</button>`}</div>`}).join("")+`</div>`;
 h+=`<div class="btns"><button class="btn pri" id="shopClose">${u.close}</button></div>`;
 $("shopCard").innerHTML=h;$("shopOv").hidden=false;
 $("shopClose").onclick=()=>$("shopOv").hidden=true;
 $("shopCard").querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{const k=b.dataset.buy,p=ITEMS[k].p;if(G.coins<p){toast(u.noCoins);return}G.coins-=p;G.inv[k]++;save();sfx("star");toast(u.bought(L(ITEMS[k].n)));renderHUD();showShop()});
 $("shopCard").querySelectorAll("[data-beq]").forEach(b=>b.onclick=()=>{const k=b.dataset.beq,p=EQUIP[k].p;if(G.coins<p){toast(u.noCoins);return}G.coins-=p;G.eqs.push(k);G.eq=k;save();sfx("star");toast(u.bought(L(EQUIP[k].n)));renderHUD();renderEnts();showShop()});
}

/* ===== 한글 놀이터 (Hangul Playground): one system for every mini-game =====
   Every game shares the same rules:
   - 5 levels on one content ladder (letters → more letters → easy words → words with 받침 → long words/sentences)
   - a round is a fixed number of items (no clock), first-try accuracy gives 1–3 stars, 2 stars opens the next level
   - items the child got wrong come back more often (G.pgm), two misses in a row → hint + slower, three right → a little faster
   - every game uses the same shell: intro → play → result (stars, practised items, next level) */
G.pg=G.pg||{};G.pgm=G.pgm||{};
/* sylOf / sylParts / LEADS come from the battle code above */
const jamoOf=x=>{const p=sylParts(String(x));return p&&{c:p.l,v:p.v,b:p.t}};
const SYL2=[..."ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ"].flatMap(c=>[..."ㅏㅓㅗㅜㅡㅣ"].map(v=>sylOf(c,v)));
/* ===== 낱말 은행: about 380 words from every part of a child's world, each with a picture =====
   The difficulty tier (1–5) is not typed by hand: wbTier() reads each word's spelling.
   1 받침 없음 · 기본 모음(ㅏㅓㅗㅜㅡㅣ) · 1–2글자                 나비, 기차, 사자
   2 받침 없음 · 이중 모음(ㅐㅔㅚㅟㅢ…) 또는 3–4글자                개미, 의자, 바나나
   3 쉬운 받침(ㄱㄴㄹㅁㅂㅇ) 1개 · 1–3글자 · 소리 변화 없음          곰, 수박, 비행기
   4 받침 2개 · 어려운 받침(ㅅㅈㅊㅌㅍㅎㄷㄲㅆ·겹받침) · 이어 읽기 · 4글자 이상   당근, 꽃, 음악, 해바라기
   5 소리가 바뀌는 낱말(비음화·유음화) · 어려운 받침+이어 읽기 · 6글자 이상   얼룩말, 공룡, 나뭇잎 */
const WB_CATS=[
 ["animal","🐾","동물","사자🦁 호랑이🐯 코끼리🐘 기린🦒 얼룩말🦓 하마🦛 코뿔소🦏 곰🐻 판다🐼 북극곰🐻‍❄️ 여우🦊 늑대🐺 토끼🐰 다람쥐🐿️ 고슴도치🦔 원숭이🐵 고릴라🦍 캥거루🦘 코알라🐨 낙타🐫 사슴🦌 너구리🦝 박쥐🦇 쥐🐭 소🐮 말🐴 돼지🐷 양🐑 염소🐐 강아지🐶 고양이🐱 표범🐆 햄스터🐹 나무늘보🦥 스컹크🦨 수달🦦 들소🦬"],
 ["bird","🐦","새","새🐦 닭🐔 병아리🐤 오리🦆 부엉이🦉 독수리🦅 펭귄🐧 앵무새🦜 공작🦚 백조🦢 홍학🦩 칠면조🦃 비둘기🕊️"],
 ["sea","🐳","바다 생물","물고기🐟 고래🐳 돌고래🐬 상어🦈 문어🐙 오징어🦑 게🦀 새우🦐 거북이🐢 소라🐚 바닷가재🦞 열대어🐠 복어🐡 물개🦭"],
 ["bug","🐞","곤충","나비🦋 꿀벌🐝 개미🐜 무당벌레🐞 거미🕷️ 달팽이🐌 메뚜기🦗 모기🦟 애벌레🐛 전갈🦂 지렁이🪱 파리🪰 딱정벌레🪲 거미줄🕸️"],
 ["dino","🦖","파충류·공룡","악어🐊 뱀🐍 개구리🐸 도마뱀🦎 공룡🦕 티라노사우루스🦖"],
 ["fruit","🍎","과일","사과🍎 배🍐 포도🍇 딸기🍓 수박🍉 바나나🍌 귤🍊 레몬🍋 복숭아🍑 체리🍒 파인애플🍍 망고🥭 키위🥝 멜론🍈 코코넛🥥 블루베리🫐"],
 ["veg","🥕","채소","당근🥕 오이🥒 토마토🍅 감자🥔 고구마🍠 옥수수🌽 가지🍆 브로콜리🥦 버섯🍄 마늘🧄 양파🧅 고추🌶️ 피망🫑 땅콩🥜 밤🌰 배추🥬 아보카도🥑"],
 ["food","🍚","음식","밥🍚 빵🍞 주먹밥🍙 라면🍜 피자🍕 햄버거🍔 감자튀김🍟 핫도그🌭 샌드위치🥪 카레🍛 스파게티🍝 만두🥟 달걀🥚 치즈🧀 고기🍖 치킨🍗 새우튀김🍤 초밥🍣 시리얼🥣 팬케이크🥞 와플🧇 베이글🥯 타코🌮 도시락🍱 찌개🍲 샐러드🥗 팝콘🍿"],
 ["snack","🍪","간식·음료","과자🍪 사탕🍬 막대사탕🍭 초콜릿🍫 케이크🍰 아이스크림🍦 도넛🍩 꿀🍯 우유🥛 주스🧃 커피☕ 녹차🍵 빙수🍧 푸딩🍮"],
 ["body","👀","몸","눈👀 코👃 입👄 귀👂 손✋ 발🦶 이빨🦷 다리🦵 팔💪 혀👅 뼈🦴 뇌🧠 엄지👍 콧물🤧 손톱💅 박수👏 악수🤝"],
 ["people","🧑","사람","아기👶 할머니👵 할아버지👴 공주👸 왕자🤴 산타🎅 요정🧚 마법사🧙 인어🧜 천사👼 유령👻 외계인👽 로봇🤖 광대🤡 닌자🥷 경찰관👮 소방관🧑‍🚒 의사🧑‍⚕️ 요리사🧑‍🍳 농부🧑‍🌾 선생님🧑‍🏫 우주비행사🧑‍🚀 화가🧑‍🎨 가수🧑‍🎤 신랑🤵 신부👰"],
 ["home","🏠","집","집🏠 문🚪 창문🪟 침대🛏️ 의자🪑 소파🛋️ 시계⏰ 거울🪞 열쇠🔑 전구💡 양초🕯️ 텔레비전📺 컴퓨터💻 전화기☎️ 휴대폰📱 우산☂️ 가위✂️ 빗자루🧹 휴지🧻 비누🧼 칫솔🪥 욕조🛁 변기🚽 바구니🧺 상자📦 자물쇠🔒 망치🔨 사다리🪜 돋보기🔍 건전지🔋 카메라📷"],
 ["kitchen","🍽️","부엌","컵🥤 접시🍽️ 숟가락🥄 젓가락🥢 포크🍴 프라이팬🍳 주전자🫖 젖병🍼 칼🔪"],
 ["clothes","👕","옷·물건","옷👕 바지👖 치마👗 양말🧦 모자🧢 장갑🧤 목도리🧣 신발👟 구두👞 장화👢 안경👓 선글라스🕶️ 가방🎒 반지💍 넥타이👔 외투🧥 수영복🩱 리본🎀 왕관👑 지갑👛 실🧵"],
 ["school","🏫","학교","학교🏫 책📚 공책📓 연필✏️ 크레파스🖍️ 자📏 편지✉️ 물감🎨 지구본🌐 클립📎 압정📌 달력📅 주판🧮"],
 ["ride","🚗","탈것","자동차🚗 버스🚌 기차🚂 지하철🚇 택시🚕 트럭🚚 자전거🚲 오토바이🏍️ 비행기✈️ 헬리콥터🚁 돛단배⛵ 로켓🚀 소방차🚒 구급차🚑 경찰차🚓 트랙터🚜 킥보드🛴 썰매🛷 유람선🛳️ 케이블카🚡 낙하산🪂 인공위성🛰️"],
 ["nature","🌈","자연·날씨","해☀️ 달🌙 별⭐ 구름☁️ 비🌧️ 눈사람⛄ 무지개🌈 번개⚡ 바람🌬️ 산⛰️ 화산🌋 바다🌊 섬🏝️ 나무🌳 꽃🌸 숲🌲 나뭇잎🍃 단풍잎🍁 선인장🌵 해바라기🌻 장미🌹 튤립🌷 불🔥 물💧 돌🪨 지구🌍 은하수🌌 눈송이❄️ 태풍🌀 새싹🌱 해돋이🌅 식물🪴 얼음🧊 낙엽🍂 빗물☔ 무궁화🌺"],
 ["place","🏰","장소","병원🏥 성🏰 텐트⛺ 관람차🎡 은행🏦 교회⛪ 공장🏭 경기장🏟️ 탑🗼 분수⛲ 호텔🏨 우체국🏤 박물관🏛️ 정류장🚏"],
 ["sport","⚽","운동","축구⚽ 야구⚾ 농구🏀 배구🏐 테니스🎾 볼링🎳 골프⛳ 수영🏊 스키⛷️ 탁구🏓 권투🥊 럭비🏉 스케이트⛸️ 낚시🎣 인라인스케이트🛼"],
 ["play","🎵","음악·놀이","피아노🎹 기타🎸 북🥁 트럼펫🎺 바이올린🎻 마이크🎤 음악🎵 곰인형🧸 벽돌🧱 연🪁 요요🪀 퍼즐🧩 주사위🎲 카드🃏 풍선🎈 선물🎁 폭죽🎉 불꽃놀이🎆 회전목마🎠 물놀이🏖️ 롤러코스터🎢"],
 ["color","🎨","색·모양","빨강🔴 주황🟠 노랑🟡 초록🟢 파랑🔵 보라🟣 하트❤️ 세모🔺 동그라미⭕ 네모🟦"],
 ["time","🎂","날·때","생일🎂 크리스마스🎄 모래시계⏳"]];
/* read a word's spelling and give it a difficulty tier */
const WB_SIMPLEV="ㅏㅓㅗㅜㅡㅣ",WB_EASYB=[1,4,8,16,17,21];/* 받침 ㄱ ㄴ ㄹ ㅁ ㅂ ㅇ */
function wbTier(w){const s=[...w].map(ch=>{const k=ch.charCodeAt(0)-0xAC00;return k<0||k>11171?null:{l:Math.floor(k/588),v:MEDS[Math.floor(k%588/28)],b:k%28}}).filter(Boolean);
 const n=s.length,nb=s.filter(x=>x.b).length,cplx=s.some(x=>!WB_SIMPLEV.includes(x.v)),nHard=s.filter(x=>x.b&&!WB_EASYB.includes(x.b)).length;
 let link=false,change=false;
 for(let i=0;i<n-1;i++){const b=s[i].b,l2=s[i+1].l;if(!b)continue;
  if(l2===11)link=true;                                               /* 받침 + ㅇ: 소리 이어 읽기 (음악 → 으막) */
  if([1,2,3,7,9,11,14,17,18,19,20,22,23,24,25,26,27].includes(b)&&(l2===2||l2===6))change=true;/* ㄱ·ㄷ·ㅂ 계열 + ㄴ/ㅁ: 비음화 (국물 → 궁물) */
  if((b===4&&l2===5)||(b===8&&l2===2)||(b===21&&l2===5)||(b===16&&l2===5))change=true;}/* 유음화·비음화 (신라 → 실라, 종로 → 종노) */
 if(!nb)return n>=5?4:!cplx&&n<=2?1:2;
 if(change||n>=6||(nHard&&link)||nHard>=2)return 5;
 if(nb>=2||nHard||link||n>=4)return 4;
 return 3}
const WB=WB_CATS.flatMap(([c,ic,cn,list])=>[...list.matchAll(/([가-힣]+)(\S+)/g)].map(m=>({t:m[1],p:m[2],c,lv:wbTier(m[1])})));
const WB_NAMES=["","받침 없는 낱말","어려운 모음·긴 낱말","쉬운 받침 낱말","어려운 받침·이어 읽기","소리가 바뀌는 낱말"];
/* --- the child's word level (G.wl): every word game draws from it; it rises by itself as words are learned --- */
G.wl=G.wl||1;
const wbStat=t=>G.pgm[t]||{r:0,w:0,box:0,last:0};
const wbKnown=t=>{const s=wbStat(t);return (s.box||0)>=2&&s.r>=2};/* learned = right twice in a row, at least 2 times in all */
const WB_DUE=[0,4*36e5,864e5,3*864e5,7*864e5,14*864e5];/* when a word is due again, by box: now, 4 h, 1 d, 3 d, 7 d, 14 d */
function wbProgress(L){L=L||G.wl||1;const all=WB.filter(w=>w.lv===L);return {known:all.filter(w=>wbKnown(w.t)).length,total:all.length,need:Math.min(20,Math.ceil(all.length*.3))}}
function wbCheckUp(){const L=G.wl||1;if(L>=5)return false;const P=wbProgress(L);if(P.known>=P.need){G.wl=L+1;save();return true}return false}
/* 16 words for one round: current level first (not yet learned, often wrong, due), 4 review words from lower levels, a few from the next level */
function wbRound(prev){const L=G.wl||1,now=Date.now();
 const score=w=>{const s=wbStat(w.t),due=!s.last||now-s.last>=WB_DUE[Math.min(5,s.box||0)];return (wbKnown(w.t)?0:2)+(s.w>s.r?1.5:0)+(due?1:0)+(s.last?0:.5)+Math.random()*1.6};
 const top=(a,n)=>a.map(w=>[w,score(w)]).sort((x,y)=>y[1]-x[1]).slice(0,n).map(x=>x[0]);
 const cur=WB.filter(w=>w.lv===L),low=WB.filter(w=>w.lv<L),nxt=WB.filter(w=>w.lv===L+1);
 const nN=nxt.length?Math.round(16*prev):0,nR=low.length?4:0;
 return shuffle([...top(cur,16-nN-nR),...top(low,nR),...top(nxt,nN)])}
const wbDistract=()=>{const L=G.wl||1;return WB.filter(w=>Math.abs(w.lv-L)<=1)};
const SENT5=[[["토끼가","당근을","먹어요"],"🐰"],[["강아지가","멍멍","짖어요"],"🐶"],[["새가","하늘을","날아요"],"🐦"],[["물고기가","물에서","헤엄쳐요"],"🐟"],[["나는","우유를","마셔요"],"🥛"],[["비가","와서","우산을","써요"],"☂️"],[["도서관에서","책을","읽어요"],"📚"],[["밤하늘에","별이","반짝여요"],"⭐"],
 [["고래가","바다에서","헤엄쳐요"],"🐳"],[["소방차가","빨리","달려요"],"🚒"],[["나비가","꽃에","앉아요"],"🦋"],[["눈이","펑펑","내려요"],"❄️"],[["아기가","쌔근쌔근","자요"],"👶"],[["로켓이","하늘로","날아가요"],"🚀"],[["나는","피아노를","쳐요"],"🎹"],[["원숭이가","바나나를","먹어요"],"🐵"],[["우리는","축구를","해요"],"⚽"],[["할머니가","옛날이야기를","들려줘요"],"👵"]].map(([s,p])=>({t:s.join(" "),p,parts:s}));
const LADDER={syl1:{n:"글자 소리",items:()=>POOL.map(t=>({t}))},syl2:{n:"더 많은 글자",items:()=>SYL2.map(t=>({t}))},
 wpic:{n:"내 낱말 · 그림 보고",word:1,items:()=>wbRound(.1)},
 wnear:{n:"내 낱말 · 헷갈리는 보기",word:1,near:1,items:()=>wbRound(.1)},
 wsound:{n:"내 낱말 · 소리만 듣고",word:1,near:1,sound:1,items:()=>wbRound(.2)},
 wmix:{n:"내 낱말 · 다음 레벨 섞기",word:1,items:()=>wbRound(.3)},
 sent:{n:"문장 만들기",items:()=>SENT5}};
const isPart=a=>/^(에|가|를|와|과|을|이|은|는|도|에서|에게|로|으로|께)$/.test(a);
const fillIt=q=>({t:q.a,q});
const FILLS2=[{s:"의사 선생님은 ___에서 일해요.",a:"병원",o:["바다","숲"]},{s:"날씨가 더워서 시원한 ___를 먹어요.",a:"빙수",o:["찌개","커피"]},{s:"펭귄은 추운 ___에 살아요.",a:"남극",o:["사막","정글"]},
 {s:"기린은 목이 아주 ___.",a:"길어요",o:["짧아요","작아요"]},{s:"거북이는 아주 ___ 걸어요.",a:"느리게",o:["빠르게","높이"]},{s:"비가 오면 ___를 신어요.",a:"장화",o:["모자","치마"]},
 {s:"로켓을 타고 ___로 날아가요.",a:"우주",o:["바다","학교"]},{s:"벌이 꽃에서 ___을 모아요.",a:"꿀",o:["돌","빵"]},{s:"가위로 종이를 ___.",a:"잘라요",o:["마셔요","불어요"]},
 {s:"생일 케이크의 촛불을 ___.",a:"불어요",o:["먹어요","입어요"]},{s:"아침이 되면 해가 ___.",a:"떠요",o:["울어요","짖어요"]},{s:"강아지가 꼬리를 ___.",a:"흔들어요",o:["읽어요","그려요"]},
 {s:"크레파스로 그림을 ___.",a:"그려요",o:["먹어요","타요"]},{s:"버스를 타려고 줄을 ___.",a:"서요",o:["먹어요","그려요"]},{s:"소방관이 ___을 꺼요.",a:"불",o:["꽃","물"]},
 {s:"토끼___ 깡충깡충 뛰어요.",a:"가",o:["를","에"]},{s:"나는 사과___ 좋아해요.",a:"를",o:["가","에"]},{s:"공원___ 친구를 만났어요.",a:"에서",o:["를","가"]},
 {s:"친구___ 선물을 주었어요.",a:"에게",o:["를","가"]},{s:"물고기___ 물속에서 헤엄쳐요.",a:"가",o:["를","에"]},{s:"나는 연필___ 글씨를 써요.",a:"로",o:["를","가"]}];
const FILLS_ALL=()=>[...FILLS,...FILLS2];
const FILL_LV={fa:{n:"동물 소리",items:()=>FILLS_E.slice(0,6).map(fillIt)},fb:{n:"쉬운 문장",items:()=>FILLS_E.slice(6).map(fillIt)},fc:{n:"낱말 고르기",items:()=>FILLS_ALL().filter(f=>!isPart(f.a)).map(fillIt)},fd:{n:"조사 고르기",items:()=>FILLS_ALL().filter(f=>isPart(f.a)).map(fillIt)},fe:{n:"모두 섞어서",items:()=>FILLS_ALL().map(fillIt)}};
const PGAMES={
 fish:{ic:"🎣",n:{en:"Letter Fishing",ko:"글자 낚시"},tag:{en:"Listen & find",ko:"듣고 찾기"},how:{en:"Listen, then catch the fish with that letter.",ko:"소리를 잘 듣고, 그 글자가 적힌 물고기를 잡아요."},lv:["syl1","syl2","wpic","wnear","wsound"],goal:8},
 mole:{ic:"🔨",n:{en:"Mole Bop",ko:"두더지 콩콩"},tag:{en:"Spot it fast",ko:"빨리 알아보기"},how:{en:"Bop only the moles holding what you heard.",ko:"들은 글자를 든 두더지만 콩! 다른 두더지는 그냥 두어요."},lv:["syl1","syl2","wpic","wnear","wsound"],goal:8},
 pair:{ic:"🃏",n:{en:"Memory Match",ko:"짝꿍 카드"},tag:{en:"Picture & word",ko:"그림과 낱말"},how:{en:"Flip two cards. Find each picture's word.",ko:"카드 두 장을 뒤집어서 그림과 낱말 짝을 찾아요."},lv:["wpic","wpic","wpic","wpic","wmix"],pairs:[3,4,5,6,6]},
 rain:{ic:"🌧️",n:{en:"Word Shower",ko:"글자 소나기"},tag:{en:"Read at a glance",ko:"한눈에 읽기"},how:{en:"Pop the falling drop that matches.",ko:"떨어지는 물방울 중 맞는 것을 톡 터뜨려요."},lv:["syl1","syl2","wpic","wnear","wsound"],goal:8},
 train:{ic:"🚂",n:{en:"Letter Train",ko:"글자 기차"},tag:{en:"Build it",ko:"글자 만들기"},how:{en:"Tap the blocks in order to fill the train.",ko:"블록을 순서대로 눌러서 기차 칸을 채워요."},lv:["syl1","syl2","wpic","wnear","sent"],goal:6},
 fill:{ic:"🧩",n:{en:"Fill the Gap",ko:"빈칸 채우기"},tag:{en:"Sentences",ko:"문장 이해"},how:{en:"Pick the word that fits the sentence.",ko:"문장에 꼭 맞는 낱말을 골라요."},lv:["fa","fb","fc","fd","fe"],goal:6}};
const PGCOL={fish:["#4FC3F7","#1E88E5"],mole:["#9CCC65","#558B2F"],pair:["#FFB74D","#EF6C00"],rain:["#90CAF9","#5C6BC0"],train:["#EF9A9A","#D32F2F"],fill:["#CE93D8","#8E24AA"]};
const pgSrc=(g,lv)=>{const k=PGAMES[g].lv[lv-1];return LADDER[k]||FILL_LV[k]};
const pgStars=(g,lv)=>((G.pg[g]||{}).s||{})[lv]||0;
const pgSum=g=>[1,2,3,4,5].reduce((a,l)=>a+pgStars(g,l),0);
const pgOpenLv=g=>{let n=1;while(n<5&&pgStars(g,n)>=2)n++;return n};
const pgRecLv=g=>{const top=pgOpenLv(g);for(let l=1;l<=top;l++)if(pgStars(g,l)<3)return l;return top};
function pgRec(t,ok){const r=G.pgm[t]||(G.pgm[t]={r:0,w:0});ok?r.r++:r.w++;r.box=ok?Math.min(5,(r.box||0)+1):0;r.last=Date.now();recT(t,ok)}
/* weak items come back more often; the last few targets are skipped so nothing repeats back to back */
function pgPick(pool,avoid){const P=pool.filter(x=>!avoid.includes(x.t)),L=P.length?P:pool;const ws=L.map(x=>{const r=G.pgm[x.t]||{r:0,w:0};return 1+r.w*2+(r.r<2?1.5:0)});
 let s=Math.random()*ws.reduce((a,b)=>a+b,0);for(let i=0;i<L.length;i++){s-=ws[i];if(s<=0)return L[i]}return L[L.length-1]}
/* look-alike distractors: same consonant or vowel for letters, same first letter or length for words */
function pgNear(it,pool,n){const S=PGS,lad=(S&&S.lad)||{},src=(S&&S.dpool)||pool,j=it.t.length===1&&jamoOf(it.t);
 const o=src.filter(x=>x.t!==it.t&&!(it.p&&x.p===it.p));
 if(lad.word&&!lad.near)return shuffle(o).slice(0,n);
 const sim=x=>{if(j){const k=jamoOf(x.t);return !!k&&(k.c===j.c||k.v===j.v)}return x.t[0]===it.t[0]||x.t.length===it.t.length};
 const near=shuffle(o.filter(sim)),rest=shuffle(o.filter(x=>!sim(x))),m=Math.ceil(n*.67),out=[];
 for(const x of [...near.slice(0,m),...rest,...near.slice(m)]){if(out.length>=n)break;if(!out.some(y=>y.t===x.t))out.push(x)}return out}

let PGS=null;
const pgT=(fn,ms)=>{const S=PGS;const id=setTimeout(()=>{if(PGS===S&&!S.dead)fn()},ms);S.timers.push(id);return id};
function pgStop(){if(!PGS)return;PGS.dead=true;PGS.timers.forEach(clearTimeout);cancelAnimationFrame(PGS.raf);PGS=null;hush()}
function pgClose(){pgStop();$("pgOv").hidden=true;renderAll()}
function pgHub(){
 pgStop();$("pgOv").hidden=false;const gs=Object.keys(PGAMES);
 const rg=gs.slice().sort((a,b)=>pgSum(a)-pgSum(b)||(G.pgLast===a)-(G.pgLast===b))[0],rl=pgRecLv(rg),RP=PGAMES[rg],rc=PGCOL[rg],tot=gs.reduce((a,g)=>a+pgSum(g),0);
 $("pgCard").innerHTML=`<div class="pghub">
  <div class="pghtop"><div><h2>🎪 ${K("Hangul Playground","한글 놀이터")}</h2><small>⭐ ${tot} / ${gs.length*15} · ${K("2 stars opens the next level","별 2개를 받으면 다음 단계가 열려요")}</small></div><button class="btn" id="pgX">${K("Close","닫기")}</button></div>
  <button class="pgrec" id="pgRecB" style="--c1:${rc[0]};--c2:${rc[1]}"><span class="bud">${heroArt(G.char,1)}</span><span class="tx"><small>${K("Today's pick","오늘의 추천")}</small><b>${RP.ic} ${L(RP.n)} · ${K("Level ","")}${rl}${K("","단계")}</b><small>${pgSrc(rg,rl).n}</small></span><span class="go">▶</span></button>
  ${(()=>{const P=wbProgress(),Lw=G.wl;return `<div class="wlpanel"><div class="wlt"><b>📖 ${K("My word level","내 낱말 레벨")} ${Lw}</b><small>${WB_NAMES[Lw]}</small></div><div class="wlbar"><i style="width:${Lw>=5?100:Math.min(100,P.known/P.need*100)}%"></i></div><small class="wln">${Lw>=5?K("Top level! Keep collecting words.","최고 레벨! 낱말을 계속 모아요."):K(`Learned ${P.known} / ${P.need} words to level up`,`익힌 낱말 ${P.known} / ${P.need} · 다 모으면 레벨 업`)}</small><div class="wlbtns"><button class="btn" id="wlBook">📒 ${K("Word book","낱말 도감")} <small>${WB.filter(w=>wbKnown(w.t)).length}/${WB.length}</small></button><button class="btn" id="wlTest">🧪 ${K("Level test","레벨 테스트")}</button></div></div>`})()}
  <div class="pggrid">${gs.map(g=>{const P=PGAMES[g],c=PGCOL[g],open=pgOpenLv(g),cur=pgRecLv(g);
   return `<div class="pgcard" style="--c1:${c[0]};--c2:${c[1]}"><button class="pgplay" data-g="${g}"><span class="ic">${P.ic}</span><b>${L(P.n)}</b><small>${L(P.tag)}</small></button>
    <div class="pglvs">${[1,2,3,4,5].map(l=>l>open?`<span class="lv lock" title="${K("Get 2 stars on the level before","앞 단계에서 별 2개")}">🔒</span>`:`<button class="lv${l===cur?" cur":""}" data-g="${g}" data-l="${l}" aria-label="${K("Level","단계")} ${l}">${l}<i>${"★".repeat(pgStars(g,l))}${"☆".repeat(3-pgStars(g,l))}</i></button>`).join("")}</div></div>`}).join("")}</div>
  <div class="pgspecial"><b>${K("Special","특별 활동")}</b><button class="btn" data-sp="rr">🎭 ${K("Read-Along Theatre","따라 읽기 극장")} <small>${K("with a grown-up","어른과 함께")}</small></button><button class="btn" data-sp="pz">🐉 ${K("Zodiac Puzzle","십이지 퍼즐")}</button></div>
 </div>`;
 $("pgX").onclick=()=>{sfx("tap");pgClose()};
 $("wlBook").onclick=()=>{sfx("tap");wbBook(0)};$("wlTest").onclick=()=>{sfx("tap");wbTest()};
 $("pgRecB").onclick=()=>{sfx("tap");pgPlay(rg,rl)};
 $("pgCard").querySelectorAll(".pgplay").forEach(b=>b.onclick=()=>{sfx("tap");pgPlay(b.dataset.g,pgRecLv(b.dataset.g))});
 $("pgCard").querySelectorAll(".lv[data-l]").forEach(b=>b.onclick=()=>{sfx("tap");pgPlay(b.dataset.g,+b.dataset.l)});
 $("pgCard").querySelectorAll("[data-sp]").forEach(b=>b.onclick=()=>{sfx("tap");hush();$("pgOv").hidden=true;$("libOv").hidden=false;b.dataset.sp==="rr"?rrList():pzStart()});
 if(!G.pgIntro){G.pgIntro=1;save();renderExtras();setTimeout(()=>{if(!$("pgOv").hidden&&!PGS)narrate(["여기는 한글 놀이터야.","놀이를 골라 봐. 별 두 개를 받으면 다음 단계가 열려!"],null,"ko",{voice:G.char})},500)}
}
function pgPlay(g,lv,o){
 pgStop();o=o||{};const P=PGAMES[g];lv=Math.max(1,Math.min(5,lv||1));const src=pgSrc(g,lv),c=PGCOL[g];
 PGS={g,lv,P,o,lad:src,dpool:src.word?wbDistract():null,pool:src.items(),goal:o.goal||(g==="pair"?P.pairs[lv-1]:P.goal),done:0,firstOK:0,first:true,miss:0,streak:0,tries:0,
  spd:(G.easy?.85:1)+(lv-1)*.05,recent:[],log:{},timers:[],raf:0,lock:true,hint:false,target:null};
 $("pgOv").hidden=false;
 $("pgCard").innerHTML=`<div class="pgwrap pg-${g}" style="--c1:${c[0]};--c2:${c[1]}">
  <div class="pghead"><button class="btn" id="pgBack" aria-label="${K("Back","뒤로")}">←</button><div class="pgt"><b>${P.ic} ${L(P.n)}</b><small>${K("Level "+lv,lv+"단계")} · ${src.n}${src.word?K(" (word level "+G.wl+")"," (낱말 레벨 "+G.wl+")"):""}</small></div><div class="pgdots" id="pgDots"></div></div>
  <div class="pgprompt" id="pgPrompt"></div>
  <div class="pgarea" id="pgArea"></div>
  <div class="pgfoot"><span class="pgbud" id="pgBud">${heroArt(G.char,1)}</span><p id="pgMsg"></p><button class="btn" id="pgSay" aria-label="${K("Hear again","다시 듣기")}">🔊</button><button class="btn" id="pgHelp">🐢 ${K("Help","도움")}</button></div></div>`;
 $("pgBack").onclick=()=>{sfx("tap");if(PGS&&PGS.o.stage){pgStop();$("pgOv").hidden=true;stageFinish(false,0,true)}else pgHub()};
 $("pgSay").onclick=()=>{const S=PGS;if(!S||!S.target)return;S.mod.say?S.mod.say():say(S.target.t)};
 $("pgHelp").onclick=()=>pgHint(true);
 PGS.mod=PGM[g]();pgDots();PGS.mod.setup();pgIntro();
}
function pgIntro(){const S=PGS,P=S.P,d=document.createElement("div");d.className="pgintro";
 d.innerHTML=`<div class="pgibox"><span class="bud">${heroArt(G.char)}</span><div><b>${P.ic} ${L(P.n)}</b><p>${L(P.how)}</p><button class="btn pri big" id="pgGo">▶ ${K("Start!","시작!")}</button></div></div>`;
 $("pgArea").appendChild(d);pgT(()=>{const g=$("pgGo");if(g){const r=g.getBoundingClientRect();if(r.bottom>innerHeight-4)g.scrollIntoView({block:"nearest",behavior:"smooth"})}},350);pgT(()=>narrate([L(P.how)],null,G.lang==="ko"?"ko":"en",{voice:G.char}),300);
 $("pgGo").onclick=()=>{hush();sfx("tap");d.remove();pgBanner(K("Ready… go!","준비… 시작!"));pgT(pgNext,950)};
}
function pgBanner(t,cls){const A=$("pgArea");if(!A)return;const b=document.createElement("div");b.className="pgbanner "+(cls||"");b.textContent=t;A.appendChild(b);setTimeout(()=>b.remove(),1150)}
function pgDots(){const S=PGS,el=$("pgDots");if(!S||!el)return;el.innerHTML=Array.from({length:S.goal},(_,i)=>`<i class="${i<S.done?"on":i===S.done?"cur":""}"></i>`).join("")}
function pgBuddy(){const b=$("pgBud");if(!b)return;b.classList.remove("yay");void b.offsetWidth;b.classList.add("yay")}
function pgMsg(t,bad){const m=$("pgMsg");if(!m)return;m.textContent=t||"";m.classList.toggle("bad",!!bad)}
function pgNext(){const S=PGS;if(!S||S.dead)return;S.lock=false;pgMsg("");
 if(S.done>=S.goal)return pgResult();
 if(S.mod.next)return S.mod.next();
 const it=pgPick(S.pool,S.recent);S.recent=[it.t,...S.recent].slice(0,Math.max(0,Math.min(3,S.pool.length-3)));
 S.target=it;S.first=true;S.miss=0;S.hint=false;pgPrompt(it);S.mod.target(it);pgDots();
 pgT(()=>S.mod.say?S.mod.say():say(it.t),300);
}
function pgPrompt(it){const p=$("pgPrompt"),S=PGS;
 p.innerHTML=S.mod.prompt?S.mod.prompt(it):`<span class="lab">${K("Find","찾아요")}</span>${it.p&&!(PGS.lad&&PGS.lad.sound)?`<span class="pic">${it.p}</span>`:`<span class="ear">👂</span>`}<button class="spk big" id="pgSpk" aria-label="${K("Hear it","듣기")}">🔊</button>`;
 const b=$("pgSpk");if(b)b.onclick=()=>S.mod.say?S.mod.say():say(it.t)}
const PGYAY=[["Great!","잘했어!"],["Yes!","맞았어!"],["Super!","최고야!"],["Spot on!","정확해!"]];
function pgLog(t,ok){const S=PGS;S.log[t]=S.log[t]===false?false:ok}
function pgRight(el,o){const S=PGS;if(!S||S.lock)return;S.lock=true;o=o||{};
 const ok1=S.first&&!S.hint;if(ok1)S.firstOK++;pgLog(S.target.t,ok1);if(ok1)pgRec(S.target.t,true);
 S.done++;S.streak++;S.miss=0;
 if(S.streak>=3&&S.streak%3===0){S.spd=Math.min(1.5,S.spd*1.08);pgBanner(`${S.streak}${K(" in a row!","번 연속!")} 🔥`,"combo")}
 sfx("ok");if(el)burstAt(el);pgBuddy();pgDots();const y=PGYAY[Math.floor(Math.random()*PGYAY.length)];pgMsg(K(y[0],y[1]));
 const txt=o.say||S.target.t;say(txt);
 pgT(pgNext,o.wait||(850+hanN(txt)*130));
}
function pgWrong(el,it){const S=PGS;if(!S||S.lock)return;S.first=false;S.streak=0;S.miss++;S.tries++;pgRec(S.target.t,false);
 sfx("bad");if(el){el.classList.remove("pgno");void el.offsetWidth;el.classList.add("pgno")}
 pgMsg(K("Not that one. Listen again!","그건 아니야. 다시 들어 봐!"),1);
 if(it)say(it.t);pgT(()=>{if(!S.lock)S.mod.say?S.mod.say():say(S.target.t)},1150);
 if(S.miss>=2&&!S.hint){S.spd=Math.max(.6,S.spd*.85);pgHint(false)}
}
function pgHint(byUser){const S=PGS;if(!S||S.lock||!S.mod.hint)return;if(!S.target&&S.g!=="pair")return;S.hint=true;S.first=false;S.mod.hint();pgMsg(K("Look for the glowing one!","반짝이는 걸 찾아봐!"));if(byUser)sfx("tap")}
function pgConfetti(){const A=$("pgArea");if(!A)return;for(let i=0;i<24;i++){const c=document.createElement("span");c.className="conf";c.textContent=["🎉","✨","⭐","🎊","💛"][i%5];c.style.left=Math.random()*100+"%";c.style.animationDuration=(1.6+Math.random()*1.6)+"s";c.style.animationDelay=(Math.random()*.5)+"s";A.appendChild(c);setTimeout(()=>c.remove(),3600)}}
function pgResult(){const S=PGS;S.lock=true;if(S.mod.stop)S.mod.stop();
 const acc=S.mod.acc?S.mod.acc():S.firstOK/S.goal,stars=acc>=.9?3:acc>=.65?2:1;
 const g=S.g,lv=S.lv,prev=pgStars(g,lv),gp=G.pg[g]||(G.pg[g]={});gp.s=gp.s||{};gp.s[lv]=Math.max(prev,stars);G.pgLast=g;save();
 const wup=!!(S.lad&&S.lad.word)&&wbCheckUp();const opened=prev<2&&stars>=2&&lv<5,coins=prev===0?10+stars*5:2+stars*2,exp=prev===0?10+stars*4:4,items=Object.entries(S.log);
 const d=document.createElement("div");d.className="pgres";
 d.innerHTML=`<div class="pgrbox"><div class="stars3">${[1,2,3].map(n=>`<span class="${n<=stars?"on":""}" style="animation-delay:${.15+n*.25}s">★</span>`).join("")}</div>
  <b>${stars===3?K("Perfect!","완벽해!"):stars===2?K("Great job!","잘했어!"):K("Good try!","좋은 시도야!")}</b>
  ${wup?`<p class="open wl">📖 ${K("Word level up! Now level "+G.wl+" words","낱말 레벨 업! 이제 "+G.wl+"단계 낱말을 배워요")}</p>`:""}
  ${opened?`<p class="open">🔓 ${K("Level "+(lv+1)+" is open!",(lv+1)+"단계가 열렸어요!")}</p>`:stars<2&&lv<5&&pgOpenLv(g)<=lv?`<p class="need">${K("Get 2 stars to open the next level.","별 2개를 받으면 다음 단계가 열려요.")}</p>`:""}
  <div class="chips">${items.map(([t,ok])=>`<button class="chip${ok?"":" again"}" data-say="${escH(t)}">${escH(t)}</button>`).join("")}</div>
  ${items.some(([,ok])=>!ok)?`<small>${K("Orange ones need a little more practice. Tap to hear.","주황색은 조금 더 연습해요. 누르면 들려요.")}</small>`:""}
  ${S.o.stage?"":`<p class="rw">🪙 +${coins}</p>`}
  <div class="tbtns">${S.o.stage?`<button class="btn pri" id="pgCont">${K("Continue","계속")} →</button>`:`<button class="btn" id="pgHubB">🎪 ${K("Playground","놀이터")}</button><button class="btn" id="pgAgain">🔁 ${K("Again","다시")}</button>${lv<5&&pgOpenLv(g)>lv?`<button class="btn pri" id="pgUp">${K("Next level","다음 단계")} →</button>`:""}`}</div></div>`;
 $("pgArea").appendChild(d);sfx("star");pgConfetti();pgBuddy();
 setTimeout(()=>{if(PGS===S)narrate([...(wup?["낱말 레벨이 올라갔어! 이제 "+G.wl+"단계 낱말을 배워 보자!"]:[]),stars===3?"완벽해! 별 세 개야!":stars===2?"잘했어! 별 두 개야!":"좋아! 다음엔 별을 더 받아 보자!"],null,"ko",{voice:G.char})},700);
 if(!S.o.stage)reward(coins,exp);
 d.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
 if(S.o.stage)$("pgCont").onclick=()=>{pgStop();$("pgOv").hidden=true;stageFinish(true,stars)};
 else{$("pgHubB").onclick=()=>{sfx("tap");pgHub()};$("pgAgain").onclick=()=>{sfx("tap");pgPlay(g,lv)};if($("pgUp"))$("pgUp").onclick=()=>{sfx("tap");pgPlay(g,lv+1)}}
}

/* --- 낱말 도감: every word in the bank by topic; learned words shine gold --- */
function wbBook(tier){pgStop();$("pgOv").hidden=false;tier=tier||0;const kn=WB.filter(w=>wbKnown(w.t)).length;
 const rows=WB_CATS.map(([c,ic,cn])=>{const ws=WB.filter(w=>w.c===c&&(!tier||w.lv===tier));if(!ws.length)return "";const k=ws.filter(w=>wbKnown(w.t)).length;
  return `<div class="wbcat"><h3>${ic} ${cn} <small>${k} / ${ws.length}</small></h3><div class="wbgrid">${ws.map(w=>{const st=wbKnown(w.t)?"got":wbStat(w.t).last?"seen":"new";return `<button class="wbw ${st}" data-say="${w.t}"><span class="p">${w.p}</span><span class="t">${w.t}</span><i>${w.lv}</i></button>`}).join("")}</div></div>`}).join("");
 $("pgCard").innerHTML=`<div class="wbbook"><div class="pghtop"><button class="btn" id="wbBack" aria-label="${K("Back","뒤로")}">←</button><div><h2>📒 ${K("Word Book","낱말 도감")}</h2><small>${K(`Learned ${kn} of ${WB.length} words · gold = learned`,`익힌 낱말 ${kn} / ${WB.length} · 금색은 익힌 낱말`)}</small></div></div>
  <div class="wbtabs">${[0,1,2,3,4,5].map(l=>`<button class="btn${l===tier?" on":""}" data-tier="${l}">${l?K("Level "+l,l+"단계"):K("All","전체")}</button>`).join("")}</div>
  ${tier?`<p class="wbdesc">${K("Level "+tier,tier+"단계")} · ${WB_NAMES[tier]} · ${WB.filter(w=>w.lv===tier).length}${K(" words","개")}</p>`:""}
  <div class="wbcats">${rows}</div></div>`;
 $("wbBack").onclick=()=>{sfx("tap");pgHub()};
 $("pgCard").querySelectorAll("[data-tier]").forEach(b=>b.onclick=()=>{sfx("tap");wbBook(+b.dataset.tier)});
 $("pgCard").querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
}
/* --- 레벨 테스트: read a word, tap its picture; 3 words per level, keep climbing while 2 of 3 are right --- */
function wbTest(){pgStop();$("pgOv").hidden=false;const T={tier:1,i:0,ok:0,set:null,busy:false,tok:{}};PGS={dead:false,timers:[],raf:0,tok:T};
 const done=lv=>{G.wl=lv;save();sfx("star");
  $("pgCard").innerHTML=`<div class="wbtest"><div class="wtres"><div class="bigic">📖</div><h2>${K("Start at word level "+lv,"낱말 레벨 "+lv+"에서 시작해요!")}</h2><p>${K("Level "+lv,lv+"단계")} · ${WB_NAMES[lv]}</p><small>${K("The level rises by itself as words are learned in the playground.","놀이터에서 낱말을 익히면 레벨이 저절로 올라가요.")}</small><div class="tbtns"><button class="btn pri big" id="wtDone">🎪 ${K("To the playground","놀이터로")}</button></div></div></div>`;
  $("wtDone").onclick=()=>{sfx("tap");pgHub()};narrate(["낱말 레벨 "+lv+"에서 시작해 보자!"],null,"ko",{voice:G.char})};
 const show=()=>{if(!T.set)T.set=shuffle(WB.filter(w=>w.lv===T.tier)).slice(0,3);const w=T.set[T.i];
  const opts=shuffle([w,...shuffle(WB.filter(x=>x.t!==w.t&&x.p!==w.p&&x.c!==w.c)).slice(0,2)]);T.busy=false;
  $("pgCard").innerHTML=`<div class="wbtest"><div class="pghtop"><button class="btn" id="wtBack" aria-label="${K("Back","뒤로")}">←</button><div><h2>🧪 ${K("Level test","레벨 테스트")}</h2><small>${K("Read the word, then tap its picture.","낱말을 읽고 맞는 그림을 골라요.")}</small></div><div class="pgdots">${[1,2,3,4,5].map(l=>`<i class="${l<T.tier?"on":l===T.tier?"cur":""}"></i>`).join("")}</div></div>
   <div class="wtword">${w.t}</div><div class="wtopts">${opts.map(o=>`<button class="wtopt" data-t="${o.t}" aria-label="${K("picture","그림")}">${o.p}</button>`).join("")}</div><p class="wtmsg" id="wtMsg">${K("Level "+T.tier,T.tier+"단계")} · ${T.i+1} / 3</p></div>`;
  $("wtBack").onclick=()=>{sfx("tap");pgHub()};
  $("pgCard").querySelectorAll(".wtopt").forEach(b=>b.onclick=()=>{if(T.busy)return;T.busy=true;const ok=b.dataset.t===w.t;pgRec(w.t,ok);
   b.classList.add(ok?"right":"wrong");if(!ok){const c=$("pgCard").querySelector(`.wtopt[data-t="${w.t}"]`);if(c)c.classList.add("right")}
   sfx(ok?"ok":"bad");say(w.t);if(ok)T.ok++;
   setTimeout(()=>{if($("pgOv").hidden||!PGS||PGS.tok!==T)return;T.i++;
    if(T.i<3)return show();
    if(T.ok>=2&&T.tier<5){T.tier++;T.i=0;T.ok=0;T.set=null;return show()}
    done(T.ok>=2?5:T.tier)},ok?800:1400)})};
 show();narrate(["낱말을 소리 내어 읽고, 맞는 그림을 골라 봐."],null,"ko",{voice:G.char});
}

/* --- each game is a small module: setup / target / hint (+ optional prompt, say, next, acc, stop) --- */
/* game sounds made with WebAudio: splash, reel, bonk, flip, pop, plop, whistle, chug, cast */
function sfx2(k){if(G.sfxOff)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime,quiet=window.speechSynthesis&&speechSynthesis.speaking?.45:1;
 if(k==="splash"||k==="flip"){const len=k==="splash"?.5:.16,buf=AC.createBuffer(1,Math.floor(AC.sampleRate*len),AC.sampleRate),d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,k==="splash"?2.5:4);
  const src=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();src.buffer=buf;f.type=k==="splash"?"lowpass":"bandpass";f.frequency.value=k==="splash"?1200:3000;g.gain.value=(k==="splash"?.5:.22)*quiet;src.connect(f).connect(g).connect(AC.destination);src.start(t);return}
 const tone=(fr,st,du,type,vol,to)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(fr,t+st);if(to)o.frequency.exponentialRampToValueAtTime(to,t+st+du);g.gain.setValueAtTime(.0001,t+st);g.gain.exponentialRampToValueAtTime(vol*quiet,t+st+.012);g.gain.exponentialRampToValueAtTime(.0001,t+st+du);o.connect(g).connect(AC.destination);o.start(t+st);o.stop(t+st+du+.03)};
 if(k==="reel")for(let i=0;i<12;i++)tone(1500+i*35,i*.055,.022,"square",.025);
 else if(k==="cast")tone(2200,0,.28,"sine",.05,500);
 else if(k==="bonk"){tone(190,0,.14,"sine",.4,70);tone(1100,0,.05,"triangle",.07)}
 else if(k==="pop")tone(620,0,.11,"sine",.22,1500);
 else if(k==="plop")tone(460,0,.16,"sine",.28,150);
 else if(k==="whistle"){[[0,.3],[.36,.55]].forEach(([st,du])=>{tone(784,st,du,"sine",.11);tone(988,st,du,"sine",.07)})}
 else if(k==="chug")for(let i=0;i<4;i++)tone(110,i*.15,.08,"sawtooth",.045,80);
}catch(e){}}
const PGM={};
const FC2=["#FF8A65","#FFD54F","#81C784","#BA68C8","#F06292","#4DD0E1"];
const fishBody=c=>`<svg viewBox="0 0 110 64" preserveAspectRatio="none" aria-hidden="true"><path ${SK} d="M86 32 L108 10 L103 32 L108 54Z" fill="${c}"/><path ${SK} d="M44 10 Q56 0 68 12Z" fill="${c}"/><ellipse ${SK} cx="50" cy="33" rx="42" ry="25" fill="${c}"/><ellipse cx="44" cy="44" rx="26" ry="9" fill="#fff" opacity=".35"/><circle cx="18" cy="27" r="5" fill="#22304A"/><circle cx="19.6" cy="25.4" r="1.7" fill="#fff"/><path d="M10 38 Q14 41 18 38" stroke="#22304A" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
/* fishing: the hero stands on a dock with a rod. Tap the right fish → the hook flies to it, the rod bends,
   the fish is reeled up through a splash and flipped into the bucket. A wrong fish nibbles and darts away. */
PGM.fish=()=>{let F=[],A,svg,last=0,busy=false,caught=0,phase=0,hook=null,bend=0,vb="";const n=()=>PGS.lv===1?3:4;
 const geo=()=>{const W=A.clientWidth,H=A.clientHeight;return {W,H,S0:H*.24,B:[W*.118,H*.135],T0:[W*.33,H*.035]}};
 const tip=g=>[g.T0[0]+bend*g.W*.045,g.T0[1]+bend*g.H*.14];
 const idleHook=g=>{const t=tip(g);return [t[0]+g.W*.012,g.S0+g.H*.09+Math.sin(phase*1.7)*3]};
 const draw=()=>{const g=geo(),t=tip(g),B=g.B,vv=`0 0 ${g.W} ${g.H}`;if(vv!==vb){vb=vv;svg.setAttribute("viewBox",vv)}
  const mx=(B[0]+t[0])/2+bend*g.W*.02,my=(B[1]+t[1])/2-(1-bend)*g.H*.04+bend*g.H*.06;
  const rp=`M${B[0].toFixed(1)} ${B[1].toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${t[0].toFixed(1)} ${t[1].toFixed(1)}`;svg.querySelector(".rod").setAttribute("d",rp);svg.querySelector(".rodh").setAttribute("d",rp);
  const h=hook||idleHook(g),by=g.S0-2+Math.sin(phase*1.7)*3;
  svg.querySelector(".fl").setAttribute("d",hook?`M${t[0]} ${t[1]} Q${(t[0]+h[0])/2} ${(t[1]+h[1])/2+(busy?6:24)} ${h[0]} ${h[1]}`:`M${t[0]} ${t[1]} Q${t[0]+4} ${(t[1]+by)/2} ${h[0]} ${by} L${h[0]} ${h[1]}`);
  const bb=svg.querySelector(".bob");bb.style.display=hook?"none":"";bb.setAttribute("transform",`translate(${h[0]} ${by})`);
  svg.querySelector(".hk").setAttribute("transform",`translate(${h[0]} ${h[1]})`)};
 const tw=(ms,fn)=>new Promise(res=>{const S=PGS,t0=performance.now();const st=now=>{if(PGS!==S||S.dead)return res(false);const k=Math.min(1,(now-t0)/ms);fn(k);k<1?requestAnimationFrame(st):res(true)};requestAnimationFrame(st)});
 const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
 const splash=(x,y,big)=>{const s=document.createElement("div");s.className="pgsplash"+(big?" big":"");s.style.left=x+"px";s.style.top=y+"px";s.innerHTML="<b></b><i></i><i></i><i></i><i></i><i></i>";A.appendChild(s);setTimeout(()=>s.remove(),900)};
 const mouth=f=>{const fw=f.el.offsetWidth,fh=f.el.offsetHeight,r=f.el.classList.contains("r");return [f.x+(r?fw*.94:fw*.06),f.y+fh*.56]};
 const mk=()=>{const el=document.createElement("button");el.className="pgfish";el.innerHTML=`<span class="in">${fishBody(FC2[F.length%FC2.length])}<span class="tag"></span></span>`;A.appendChild(el);
  const f={el,x:Math.random()*Math.max(10,A.clientWidth-200)+40,y:0,vx:(F.length%2?-1:1)*(34+Math.random()*22),ph:Math.random()*6,item:null};el.onclick=()=>tap(f);return f};
 const cast=async f=>{const g=geo(),from=hook||idleHook(g),to=mouth(f);sfx2("cast");hook=from.slice();
  await tw(330,k=>{const e=ease(k);hook=[from[0]+(to[0]-from[0])*e,from[1]+(to[1]-from[1])*e-Math.sin(k*Math.PI)*g.H*.1];bend=.15*k});
  splash(to[0],to[1],false)};
 const reelIn=async f=>{busy=true;const S=PGS;await cast(f);if(PGS!==S)return;
  const fw=f.el.offsetWidth,fh=f.el.offsetHeight,r=f.el.classList.contains("r");f.gone=1;f.el.style.visibility="hidden";
  const c=document.createElement("div");c.className="pgfish catch"+(r?" r":"")+(f.el.classList.contains("wide")?" wide":"");c.style.cssText=f.el.style.cssText;c.style.visibility="visible";c.style.width=fw+"px";c.style.height=fh+"px";c.innerHTML=f.el.innerHTML;A.appendChild(c);
  const off=[r?fw*.94:fw*.06,fh*.56];c.style.transformOrigin=`${off[0]}px ${off[1]}px`;
  const g=geo(),p0=hook.slice(),p1=[tip(g)[0]+g.W*.06,g.S0-g.H*.02];let wet=false;sfx2("reel");
  await tw(820,k=>{const e=ease(k);bend=.15+Math.sin(Math.min(1,k*1.1)*Math.PI)*.8;hook=[p0[0]+(p1[0]-p0[0])*e,p0[1]+(p1[1]-p0[1])*e];
   const wig=Math.sin(k*40)*(1-k)*14;c.style.transform=`translate(${(hook[0]-off[0]).toFixed(1)}px,${(hook[1]-off[1]).toFixed(1)}px) rotate(${((r?1:-1)*58*e+wig).toFixed(1)}deg)`;
   if(!wet&&hook[1]<=g.S0+6){wet=true;splash(hook[0],g.S0,true);sfx2("splash")}});
  if(PGS!==S)return c.remove();
  const bk=A.querySelector(".bucket"),br=bk.getBoundingClientRect(),ar=A.getBoundingClientRect(),d=[br.left-ar.left+br.width/2,br.top-ar.top+br.height*.25],q=hook.slice();
  hook=null;const b0=bend;
  await tw(560,k=>{bend=b0*(1-k);const x=q[0]+(d[0]-q[0])*k,y=q[1]+(d[1]-q[1])*k-Math.sin(k*Math.PI)*g.H*.07;c.style.transform=`translate(${(x-off[0]).toFixed(1)}px,${(y-off[1]).toFixed(1)}px) rotate(${((r?1:-1)*(58+300*k)).toFixed(1)}deg) scale(${(1-.65*k).toFixed(3)})`});
  c.remove();if(PGS!==S)return;caught++;bk.querySelector("b").textContent=caught;bk.classList.remove("got");void bk.offsetWidth;bk.classList.add("got");sfx2("plop");
  bk.querySelector(".in").insertAdjacentHTML("beforeend",`<i style="left:${8+(caught*31)%64}%;--h:${(caught*57)%360}deg;rotate:${(caught*23)%40-20}deg"></i>`);bend=0;busy=false};
 const nibble=async f=>{busy=true;const S=PGS;await cast(f);if(PGS!==S)return;f.vx=-f.vx*2.4;
  const g=geo(),from=hook.slice();await tw(320,k=>{const to=idleHook(g);hook=[from[0]+(to[0]-from[0])*k,from[1]+(to[1]-from[1])*k];bend=.15*(1-k)});hook=null;bend=0;busy=false};
 const tap=f=>{const S=PGS;if(!S||S.lock||busy||!f.item||f.gone)return;
  if(f.item.t===S.target.t){pgRight(f.el,{wait:2100});reelIn(f)}else{pgWrong(f.el,f.item);nibble(f)}};
 const loop=t=>{const S=PGS;if(!S||S.dead)return;S.raf=requestAnimationFrame(loop);const dt=Math.min(.05,(t-(last||t))/1000);last=t;phase+=dt;const g=geo();
  const top=g.S0+g.H*.07,bot=g.H*.9;
  F.forEach((f,i)=>{if(f.gone)return;const tg=S.target&&f.item&&f.item.t===S.target.t,sp=S.hint&&tg?.4:1,fw=f.el.offsetWidth||150,fh=f.el.offsetHeight||80;
   f.x+=f.vx*dt*S.spd*sp*(G.easy?.8:1.15);if(Math.abs(f.vx)>60)f.vx*=.985;
   if(f.x<4&&f.vx<0)f.vx=Math.abs(f.vx);if(f.x>g.W-fw-4&&f.vx>0)f.vx=-Math.abs(f.vx);
   f.ph+=dt*2.2;f.y=top+(i+.5)/F.length*(bot-top)-fh/2+Math.sin(f.ph)*6;
   f.el.style.transform=`translate(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px)`;f.el.classList.toggle("r",f.vx>0)});
  draw()};
 const M={
  setup(){A=document.createElement("div");A.className="pond3";
   A.innerHTML=`<div class="shore"><i class="far f1"></i><i class="far f2"></i><i class="reed r1"></i><i class="reed r2"></i><i class="reed r3"></i></div>
    <div class="water"><i class="wv w1"></i><i class="wv w2"></i><i class="rays"></i><i class="weed a"></i><i class="weed b"></i><i class="weed c"></i><i class="sand"></i><i class="peb p1"></i><i class="peb p2"></i><i class="bub b1"></i><i class="bub b2"></i><i class="bub b3"></i></div>
    <div class="dock"><i class="post a"></i><i class="post b"></i></div><span class="angler">${(HIMG[G.char]||DA.hs[G.char])?`<img class="heroimg" src="${HIMG[G.char]||DA.hs[G.char]}" alt="">`:heroArt(G.char)}</span>
    <div class="bucket"><span class="in"></span><span class="pail"></span><b>0</b></div>
    <svg class="fsvg" aria-hidden="true"><path class="rod" fill="none" stroke="#5D3B1E" stroke-width="8" stroke-linecap="round"/><path class="rodh" fill="none" stroke="#B9814A" stroke-width="3" stroke-linecap="round"/><path class="fl" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="2"/>
     <g class="bob"><circle r="9" fill="#fff" stroke="#22304A" stroke-width="2.5"/><path d="M-9 0 A9 9 0 0 1 9 0Z" fill="#E8473A" stroke="#22304A" stroke-width="2.5"/><line x1="0" y1="-9" x2="0" y2="-15" stroke="#22304A" stroke-width="2.5"/></g>
     <g class="hk"><path d="M0 -9 L0 4 Q0 11 -6 10 Q-10 8 -9 3" fill="none" stroke="#C3CCD6" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="-9" r="2.5" fill="#C3CCD6"/></g></svg>`;
   $("pgArea").appendChild(A);svg=A.querySelector(".fsvg");PGS.raf=requestAnimationFrame(loop)},
  target(it){while(F.length<n())F.push(mk());const opts=shuffle([it,...pgNear(it,PGS.pool,n()-1)]),W=A.clientWidth;
   F.forEach((f,i)=>{if(f.gone){f.el.style.visibility="";const fw=f.el.offsetWidth||150;if(Math.random()<.5){f.x=-fw-10;f.vx=Math.abs(f.vx)||40}else{f.x=W+10;f.vx=-(Math.abs(f.vx)||40)}}
    f.gone=0;f.item=opts[i];f.el.classList.remove("caught","pghint","pgno","swap");f.el.querySelector(".tag").textContent=f.item.t;f.el.classList.toggle("wide",f.item.t.length>1);f.el.style.setProperty("--n",f.item.t.length);void f.el.offsetWidth;f.el.classList.add("swap")})},
  hint(){F.forEach(f=>f.el.classList.toggle("pghint",!!f.item&&f.item.t===PGS.target.t))}};
 return M};
/* mole bop: moles pop up holding signs; bop the ones that match what you heard */
PGM.mole=()=>{let H=[],since=1;
 const hide=h=>{h.up=false;h.el.classList.remove("up","pghint")};
 const show=(h,it)=>{const S=PGS;h.item=it;h.up=true;const tk=++h.tok;h.el.querySelector(".sign").textContent=it.t;h.el.classList.toggle("wide",it.t.length>1);h.el.classList.toggle("xl",it.t.length>=4);h.el.classList.remove("bonk","laugh","pghint");h.el.classList.add("up");const hl=h.el.closest(".hole3");hl.classList.remove("pop");void hl.offsetWidth;hl.classList.add("pop");
  const tg=it.t===S.target.t;if(S.hint&&tg)h.el.classList.add("pghint");pgT(()=>{if(h.tok===tk)hide(h)},(G.easy?2800:1800)/S.spd*(S.hint&&tg?1.7:1))};
 const pop=()=>{const S=PGS;if(!S||S.dead)return;pgT(pop,(G.easy?1150:850)/S.spd);if(S.lock||!S.target)return;
  const free=H.filter(h=>!h.up);if(!free.length||H.length-free.length>=(G.easy?2:3))return;
  const tUp=H.some(h=>h.up&&h.item.t===S.target.t),useT=!tUp&&(since>=2||Math.random()<(G.easy?.55:.42));
  const it=useT?S.target:(pgNear(S.target,S.pool,3)[Math.floor(Math.random()*3)]||S.target);since=it.t===S.target.t?0:since+1;
  show(free[Math.floor(Math.random()*free.length)],it)};
 const mallet=(h,txt)=>{const A=$("pgArea").querySelector(".meadow");if(!A)return;const sg=h.el.querySelector(".sign").getBoundingClientRect(),ar=A.getBoundingClientRect(),k=A.clientWidth<520?.7:1,m=document.createElement("div");
  m.className="mallet";m.style.left=(sg.left-ar.left+sg.width/2+82*k)+"px";m.style.top=(sg.top-ar.top+sg.height/2)+"px";m.innerHTML=`<i class="mw"><i class="hd"></i><i class="hn"></i></i>${txt?`<b>${txt}</b>`:""}`;A.appendChild(m);setTimeout(()=>m.remove(),800)};
 const tap=h=>{const S=PGS;if(!S||S.lock||!h.up)return;h.tok++;mallet(h,h.item.t===S.target.t?"콩!":"");
  if(h.item.t===S.target.t){setTimeout(()=>{sfx2("bonk");h.el.classList.add("bonk")},190);pgRight(h.el.querySelector(".sign"),{wait:1300});pgT(()=>H.forEach(hide),800)}
  else{setTimeout(()=>h.el.classList.add("laugh"),180);pgWrong(h.el.querySelector(".sign"),h.item);pgT(()=>hide(h),1000)}};
 const M={
  setup(){const A=document.createElement("div");A.className="meadow";A.innerHTML=`<i class="sun"></i><i class="cl c1"></i><i class="cl c2"></i><i class="fence"></i><i class="tuft t1"></i><i class="tuft t2"></i><i class="tuft t3"></i><i class="flw a">🌼</i><i class="flw b">🌷</i><i class="flw c">🌼</i><div class="holes">${Array.from({length:6},()=>`<div class="hole3"><i class="pit"></i><div class="mwin"><button class="mole3"><span class="face"><i class="ear l"></i><i class="ear r"></i><i class="e l"></i><i class="e r"></i><i class="n"></i><i class="tg"></i><i class="cheek l"></i><i class="cheek r"></i></span><span class="sign"></span><span class="mr">메롱~</span></button></div><i class="lip"></i></div>`).join("")}</div>`;
   $("pgArea").appendChild(A);H=[...A.querySelectorAll(".mole3")].map(el=>({el,up:false,item:null,tok:0}));H.forEach(h=>h.el.onclick=()=>tap(h))},
  target(){H.forEach(hide);since=2;if(!PGS.popping){PGS.popping=1;pgT(pop,450)}},
  hint(){H.forEach(h=>{if(h.up&&h.item.t===PGS.target.t)h.el.classList.add("pghint")})},
  stop(){H.forEach(hide)}};
 return M};
/* memory match: picture cards and word cards; words are only read aloud once matched, so the child reads them */
PGM.pair=()=>{let C=[],open=[],busy=false,N=0;
 const fit=A=>{const n=C.length,W=A.clientWidth*.94,Hh=A.clientHeight*.92,gap=10;let best=0,bc=3;
  [2,3,4,6].forEach(cols=>{const rows=Math.ceil(n/cols),w=Math.min((W-gap*(cols-1))/cols,(Hh-gap*(rows-1))/rows*.75);if(w>best){best=w;bc=cols}});
  const g=A.querySelector(".cgrid");g.style.setProperty("--cols",bc);g.style.setProperty("--cw",Math.floor(Math.min(best,170))+"px")};
 const flip=i=>{const S=PGS,c=C[i];if(!S||busy||S.lock||!S.started||c.done||open.includes(c))return;sfx2("flip");c.el.classList.add("up");open.push(c);if(open.length<2)return;
  S.tries++;const [a,b]=open;busy=true;
  if(a.k===b.k&&!!a.pic!==!!b.pic)pgT(()=>{a.done=b.done=true;a.el.classList.add("done");b.el.classList.add("done");open=[];busy=false;burstAt(b.el);sfx("ok");say(a.k);
   pgLog(a.k,!a.miss);pgRec(a.k,!a.miss);S.done++;pgDots();pgBuddy();pgMsg(K("A match!","짝을 찾았어!"));if(S.done>=S.goal)pgT(pgResult,1200)},420);
  else{C.filter(x=>x.k===a.k||x.k===b.k).forEach(x=>x.miss=true);pgT(()=>[a,b].forEach(x=>{x.el.classList.remove("pgno");void x.el.offsetWidth;x.el.classList.add("pgno")}),550);pgT(()=>{sfx2("flip");a.el.classList.remove("up");b.el.classList.remove("up");open=[];busy=false},1150)}};
 const M={
  setup(){const S=PGS;N=S.goal;const picks=[];let guard=0;while(picks.length<N&&guard++<200){const it=pgPick(S.pool,picks.map(x=>x.t));if(!picks.some(p=>p.t===it.t))picks.push(it)}
   C=shuffle(picks.flatMap(it=>[{k:it.t,pic:it.p},{k:it.t,word:it.t}]));
   const A=document.createElement("div");A.className="table";A.innerHTML=`<div class="cgrid">${C.map((c,i)=>`<button class="pcard" data-i="${i}" aria-label="${K("card","카드")}"><span class="cin"><span class="cb"><i>🐢</i></span><span class="cf">${c.pic?`<span class="cpic">${c.pic}</span>`:`<span class="cw${c.word.length>=4?" l4":""}${c.word.length>=6?" l6":""}">${escH(c.word)}</span>`}</span></span></button>`).join("")}</div>`;
   $("pgArea").appendChild(A);C.forEach((c,i)=>{c.el=A.querySelector(`.pcard[data-i="${i}"]`);c.el.onclick=()=>flip(i);c.el.style.setProperty("--tilt",(Math.random()*4-2).toFixed(1)+"deg")});fit(A);M.rs=()=>fit(A);window.addEventListener("resize",M.rs)},
  next(){const S=PGS;if(S.started)return;S.started=1;$("pgPrompt").innerHTML=`<span class="lab">${K("Match each picture with its word","그림과 낱말 짝을 찾아요")}</span>`;
   if(G.easy&&S.lv<=2){busy=true;C.forEach(c=>c.el.classList.add("up"));pgMsg(K("Look carefully!","잘 봐 두세요!"));pgT(()=>{C.forEach(c=>c.el.classList.remove("up"));busy=false;pgMsg("")},2800)}},
  hint(){const S=PGS;const c=C.find(x=>!x.done&&!open.includes(x));if(!c)return;S.hints=(S.hints||0)+1;C.filter(x=>x.k===c.k).forEach(x=>{x.miss=true;x.el.classList.add("pghint");pgT(()=>x.el.classList.remove("pghint"),1700)})},
  acc(){const S=PGS,extra=S.tries-N+(S.hints||0)*2;return extra<=1?1:extra<=Math.ceil(N*.8)?.75:.5},
  stop(){window.removeEventListener("resize",M.rs)}};
 return M};
/* word shower: drops fall in lanes (never on top of each other) */
PGM.rain=()=>{let D=[],A,last=0,spawnT=0,lanes=4;
 const spawn=()=>{const S=PGS,Hh=A.clientHeight,busyL=new Set(D.filter(d=>d.y<Hh*.4).map(d=>d.l)),free=[...Array(lanes).keys()].filter(l=>!busyL.has(l));if(!free.length)return;
  const on=D.some(d=>d.item.t===S.target.t),it=(!on&&Math.random()<.75)?S.target:(pgNear(S.target,S.pool,3)[Math.floor(Math.random()*3)]||S.target);
  const l=free[Math.floor(Math.random()*free.length)],el=document.createElement("button");el.className="rdrop2"+(it.t.length>1?" wide":"")+(it.t.length>=4?" xl":"");el.innerHTML=`<span>${escH(it.t)}</span>`;el.style.left=((l+.5)/lanes*100)+"%";A.appendChild(el);
  const d={el,l,y:-90,item:it};el.onclick=()=>tap(d);D.push(d)};
 const tap=d=>{const S=PGS;if(!S||S.lock||d.gone)return;if(d.item.t===S.target.t){d.gone=1;d.el.classList.add("pop");sfx2("pop");const sp=document.createElement("div");sp.className="pgsplash big";sp.style.left=((d.l+.5)/lanes*100)+"%";sp.style.top=(d.y+(d.el.offsetHeight||80)/2)+"px";sp.innerHTML="<b></b><i></i><i></i><i></i><i></i><i></i>";A.appendChild(sp);setTimeout(()=>sp.remove(),900);pgRight(d.el);setTimeout(()=>d.el.remove(),380)}else pgWrong(d.el,d.item)};
 const loop=t=>{const S=PGS;if(!S||S.dead)return;S.raf=requestAnimationFrame(loop);const dt=Math.min(.05,(t-(last||t))/1000);last=t;if(S.lock||!S.target)return;const Hh=A.clientHeight;
  spawnT-=dt;if(spawnT<=0){spawn();spawnT=(G.easy?1.55:1.05)/S.spd}
  const v=Hh*(G.easy?.12:.19)*S.spd;
  D=D.filter(d=>{if(d.gone)return false;const tg=d.item.t===S.target.t;d.y+=v*dt*(S.hint&&tg?.45:1);d.el.style.transform=`translate(-50%,${d.y.toFixed(1)}px)`;d.el.classList.toggle("pghint",S.hint&&tg);
   if(d.y>Hh-(d.el.offsetHeight||80)*.6){d.el.classList.add("splash");const rp=document.createElement("i");rp.className="ripple";rp.style.left=((d.l+.5)/lanes*100)+"%";A.appendChild(rp);setTimeout(()=>rp.remove(),850);const e=d.el;setTimeout(()=>e.remove(),420);if(tg&&!G.easy){S.first=false;S.streak=0}return false}return true})};
 const M={
  setup(){A=document.createElement("div");A.className="sky2";A.innerHTML=`<i class="rbow"></i><i class="streaks"></i><i class="cl c1"></i><i class="cl c2"></i><i class="cl c3"></i><i class="puddle"></i>`;$("pgArea").appendChild(A);lanes=A.clientWidth<520?3:4;PGS.raf=requestAnimationFrame(loop)},
  target(){D.forEach(d=>{d.gone=1;d.el.classList.add("fade");const e=d.el;setTimeout(()=>e.remove(),320)});D=[];spawnT=.15;A.querySelector(".rbow").style.opacity=(PGS.done/PGS.goal*.9).toFixed(2)},
  hint(){}};
 return M};
/* letter train: put the pieces in order — jamo into a letter, letters into a word, word blocks into a sentence */
PGM.train=()=>{let parts=[],k=0,B=[],cars=[];
 const syl=()=>PGS.lv<=2,sent=()=>!!(PGS.target&&PGS.target.parts);
 const tap=b=>{const S=PGS;if(!S||S.lock||b.used)return;
  if(b.t!==parts[k])return pgWrong(b.el,{t:b.t});
  b.used=true;sfx2("pop");const car=cars[k],slot=car.querySelector(".slot");b.el.classList.remove("pghint");
  flyTo(escH(b.t),b.el,slot,"blk2").then(()=>{if(PGS!==S)return;slot.textContent=b.t;car.classList.add("full")});b.el.classList.add("used");k++;
  if(k>=parts.length){S.lock=true;pgT(()=>{if(syl()){const pl=$("pgPlate");pl.textContent=S.target.t;pl.classList.add("lit")}},500);pgT(()=>{S.lock=false;$("pgTrain").classList.add("go");$("pgArea").querySelector(".yard").classList.add("go");sfx2("whistle");pgRight($("pgTrain").querySelector(".loco"),{wait:1900})},800)}
  else if(S.hint)M.hint()};
 const M={
  setup(){const A=document.createElement("div");A.className="yard";A.innerHTML=`<i class="sun"></i><i class="hill h1"></i><i class="hill h2"></i><i class="cl c1"></i><div class="track"><div class="train2" id="pgTrain"></div><i class="rail"></i></div><div class="blocks2" id="pgBlocks"></div>`;$("pgArea").appendChild(A)},
  prompt(it){return `<span class="lab">${syl()?K("Build the letter you hear","들은 글자를 만들어요"):it.parts?K("Build the sentence","문장을 만들어요"):K("Build the word","낱말을 만들어요")}</span>${it.p&&!(PGS.lad&&PGS.lad.sound)?`<span class="pic">${it.p}</span>`:`<span class="ear">👂</span>`}<button class="spk big" id="pgSpk" aria-label="${K("Hear it","듣기")}">🔊</button>`},
  target(it){const S=PGS;let extra;
   if(syl()){const j=jamoOf(it.t);parts=[j.c,j.v];const cs=[..."ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅎ"].filter(x=>x!==j.c),vs=[..."ㅏㅓㅗㅜㅡㅣ"].filter(x=>x!==j.v);extra=[cs[Math.floor(Math.random()*cs.length)],vs[Math.floor(Math.random()*vs.length)]]}
   else if(it.parts){parts=it.parts.slice();const o=shuffle(S.pool.filter(x=>x.t!==it.t))[0];extra=o?o.parts.slice(-1).filter(x=>!parts.includes(x)):[]}
   else{parts=[...it.t];extra=shuffle([...new Set(pgNear(it,S.pool,6).flatMap(x=>[...x.t]).filter(c=>!parts.includes(c)))]).slice(0,(parts.length>=3?2:1)+(S.lad.near?1:0))}
   k=0;const all=shuffle([...parts,...extra]);
   const tr=$("pgTrain");tr.style.transition="none";tr.classList.remove("go");tr.style.scale="";tr.style.transform="translateX(-110cqw)";
   tr.innerHTML=parts.map((p,i)=>`<div class="car c${i%4}"><span class="slot"></span><i class="wh a"></i><i class="wh b"></i></div>`).join("")+`<div class="loco"><i class="chim"></i><i class="cab"></i><span class="plate" id="pgPlate">${syl()?"?":"♪"}</span><i class="wh a"></i><i class="wh b"></i><i class="bump"></i></div>`;
   cars=[...tr.querySelectorAll(".car")];
   $("pgBlocks").innerHTML=all.map((b,i)=>`<button class="blk${syl()?(LEADS.includes(b)?" cons":" vow"):""}${b.length>2?" long":""}" data-b="${i}">${escH(b)}</button>`).join("");
   B=[...$("pgBlocks").querySelectorAll(".blk")].map((el,i)=>({el,t:all[i]}));B.forEach(b=>b.el.onclick=()=>tap(b));
   void tr.offsetWidth;tr.style.transition="";tr.style.transform="";$("pgArea").querySelector(".yard").classList.remove("go");sfx2("chug");
   requestAnimationFrame(()=>{const W=$("pgArea").clientWidth*.92,w=tr.scrollWidth;if(w>W)tr.style.scale=(W/w).toFixed(3)})},
  hint(){const b=B.find(x=>!x.used&&x.t===parts[k]);if(b)b.el.classList.add("pghint")}};
 return M};
/* fill the gap: read the sentence, pick the word; the finished sentence is read back */
PGM.fill=()=>{let Q=[];
 const full=q=>q.s.replace("___",q.a);
 const M={pages:0,
  setup(){Q=shuffle(PGS.pool.slice());const A=document.createElement("div");A.className="fpage2";A.innerHTML=`<div class="fbook"><div class="fs" id="pgFs"></div><div class="fo2" id="pgFo"></div><span class="fpn" id="pgFpn"></span></div>`;$("pgArea").appendChild(A)},
  next(){const S=PGS;if(!Q.length)Q=shuffle(S.pool.slice());const it=Q.shift(),q=it.q;S.target=it;S.first=true;S.miss=0;S.hint=false;pgDots();
   const pic=(q.s.match(/^\p{Extended_Pictographic}️?/u)||[""])[0],body=q.s.slice(pic.length).trim();
   $("pgPrompt").innerHTML=`<span class="lab">${K("Which word fits?","어떤 낱말이 들어갈까?")}</span><button class="spk big" id="pgSpk" aria-label="${K("Hear it","듣기")}">🔊</button>`;$("pgSpk").onclick=()=>M.say();
   const render=()=>{$("pgFs").innerHTML=`${pic&&S.lv<5?`<span class="fpic">${pic}</span>`:""}<span class="ftx">${escH(body).replace("___",'<span class="blank2" id="pgBlank">?</span>')}</span>`;
    $("pgFpn").textContent=`${S.done+1} / ${S.goal}`;
    const opts=shuffle([q.a,...q.o]);$("pgFo").innerHTML=opts.map(o=>`<button class="fopt" data-o="${escH(o)}">${escH(o)}</button>`).join("");
    $("pgFo").querySelectorAll(".fopt").forEach(b=>b.onclick=()=>{const T=PGS;if(!T||T.lock)return;
     if(b.dataset.o===q.a){const bl=$("pgBlank");b.classList.add("right");pgRight(b,{say:full(q),wait:1400+hanN(full(q))*160});flyTo(escH(q.a),b,bl,"blk2").then(()=>{if(!bl.isConnected)return;bl.textContent=q.a;bl.classList.add("in")})}
     else{b.disabled=true;pgWrong(b,{t:b.dataset.o})}});
    pgT(()=>M.say(),350)};
   if(M.pages++){const pg=$("pgArea").querySelector(".fpage2"),pt=document.createElement("div");pt.className="pturn";pg.appendChild(pt);sfx2("flip");setTimeout(()=>pt.remove(),740);pgT(render,330)}else render()},
  say(){say(PGS.target.q.s)},
  hint(){const b=[...$("pgFo").querySelectorAll(".fopt")].find(x=>x.dataset.o===PGS.target.q.a);if(b)b.classList.add("pghint")}};
 return M};

/* title / clear */
let selChar=G.char,selType=G.ptype,step=1;
function showTitle(){
 const u=t(),inProg=hasProgress();$("tStory").textContent=u.story;
 $("tCast").innerHTML=step===1?`<span class="grp"><span class="face">${mentorArt()}</span>${K("Master Turtle · mentor","거북이 스승 · 스승님")}</span><span class="grp bad">${Object.keys(VIL).map(k=>`<span class="face">${vilArt(k)}</span>`).join("")}${K("The Cat Gang","고양이 악당들")}</span>`:"";$("tStep").textContent=step===1?u.step1:u.step2;
 const box=$("chars");box.className="chars"+(step===2?" three":"");
 if(step===1){
  if(heroLocked(CHARS.find(c=>c.id===selChar)))selChar="tiger";
  box.innerHTML=CHARS.map(c=>{const lock=heroLocked(c);return `<button class="cc" data-id="${c.id}" aria-pressed="${c.id===selChar}" ${lock?"disabled":""}><span class="sp" style="background:radial-gradient(ellipse 46% 40% at 50% 58%,${HERO[c.id].s}55 0 70%,transparent 100%)">${heroArt(c.id)}</span><b>${L(c.n)}</b><span>${lock?"🔒 "+(c.lock==="clear"?u.lockClear:u.lockLv(c.lock)):L(c.ab)}</span></button>`}).join("");
  const sc=CHARS.find(c=>c.id===selChar);$("tAbil").innerHTML=`<b>${L(sc.n)} · ${L(sc.ab)}</b> ${L(sc.d)}<br>${WEAP[sc.id].e} <b>${K("Weapon","전용 무기")}: ${L(WEAP[sc.id].w)}</b> — ${L(WEAP[sc.id].how)} (Lv ${wLv(sc.id)})`;$("tAbil").hidden=false;
  box.querySelectorAll(".cc:not(:disabled)").forEach(b=>b.onclick=()=>{selChar=b.dataset.id;sfx("tap");showTitle();charSay(selChar,0)});
 }else{
  box.innerHTML=Object.keys(PT).map(k=>`<button class="cc" data-id="${k}" aria-pressed="${k===selType}"><span class="sp">${partnerSVG(k,1)}</span><b>${L(PT[k].n[0])}</b><span>${L(PT[k].t)}</span><div class="evoline"><span>${partnerSVG(k,1)}</span><span class="unk">${partnerSVG(k,2)}</span><span class="unk">${partnerSVG(k,3)}</span></div></button>`).join("");
  box.querySelectorAll(".cc").forEach(b=>b.onclick=()=>{selType=b.dataset.id;sfx("tap");showTitle()});$("tAbil").hidden=true;
 }
 const newGame=()=>{Object.assign(G,fresh(),{char:selChar,ptype:selType,view:"library",books:{},libIntro:0});MONS.forEach(m=>{m.alive=true;m.x=m.sx;m.y=m.sy});save();step=1;$("titleOv").hidden=true;renderAll();libIntro()};
 $("tBtns").innerHTML="";let armed=false;
 const add=(label,pri,fn)=>{const b=document.createElement("button");b.className="btn"+(pri?" pri":"");b.textContent=label;b.onclick=()=>fn(b);$("tBtns").appendChild(b)};
 if(step===1){
  if(inProg)add(u.cont,1,()=>{G.char=selChar;save();$("titleOv").hidden=true;renderAll()});
  add(inProg?K("Start over","처음부터 하기"):u.start,!inProg,b=>{if(inProg&&!armed){armed=true;b.textContent=u.resetSure;b.classList.add("warn");return}newGame()});
 }else{
  add(u.back,0,()=>{step=1;showTitle()});
  add(u.start,1,()=>{Object.assign(G,fresh(),{char:selChar,ptype:selType,view:"library",books:{},libIntro:0});MONS.forEach(m=>{m.alive=true;m.x=m.sx;m.y=m.sy});save();step=1;$("titleOv").hidden=true;renderAll();libIntro()});
 }
 $("titleOv").hidden=false;
}
function showClear(){
 const u=t();$("clTitle").textContent=u.clear;$("clText").textContent=u.clText(G.coins);
 $("clReward").innerHTML=`<div class="rcard"><span class="sp">${heroArt("dragon")}</span><b>${u.unlocked}</b><span>${L(CHARS.find(c=>c.id==="dragon").n)}</span></div><div class="rcard lock"><span style="font-size:48px">🏝️</span><b>${u.nextIsland}</b><span>${u.soon}</span></div>`;
 $("clBtns").innerHTML="";
 [[u.change,0,()=>{$("clearOv").hidden=true;selChar="dragon";step=1;showTitle()}],[u.again,1,()=>{Object.assign(G,{q:0,st:0,chests:[],px:4,py:8,fx:5,fy:8});save();$("clearOv").hidden=true;renderAll();setTimeout(()=>openStage(0),400)}]]
 .forEach(([l,p,fn])=>{const b=document.createElement("button");b.className="btn"+(p?" pri":"");b.textContent=l;b.onclick=fn;$("clBtns").appendChild(b)});
 $("clearOv").hidden=false;
}

/* settings */
const escH=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
let setHero=null,setWho="narrator";
function saveImg(){try{localStorage.setItem("hiq2img",JSON.stringify(HIMG));return true}catch(e){return false}}
function knockBg(c,w,h){const d=c.getImageData(0,0,w,h),p=d.data,seen=new Uint8Array(w*h),st=[],ref=[p[0],p[1],p[2]];
 const near=i=>{const k=i*4;return Math.abs(p[k]-ref[0])+Math.abs(p[k+1]-ref[1])+Math.abs(p[k+2]-ref[2])<70};
 for(let x=0;x<w;x++)st.push(x,(h-1)*w+x);for(let y=0;y<h;y++)st.push(y*w,y*w+w-1);
 while(st.length){const i=st.pop();if(seen[i])continue;seen[i]=1;if(!near(i))continue;p[i*4+3]=0;const x=i%w;if(x>0)st.push(i-1);if(x<w-1)st.push(i+1);if(i>=w)st.push(i-w);if(i<w*(h-1))st.push(i+w)}
 c.putImageData(d,0,0)}
function trimAlpha(cv){const c=cv.getContext("2d"),w=cv.width,h=cv.height,p=c.getImageData(0,0,w,h).data;let x0=w,y0=h,x1=-1,y1=-1;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(p[(y*w+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
 if(x1<0)return cv;const o=document.createElement("canvas");o.width=x1-x0+1;o.height=y1-y0+1;o.getContext("2d").drawImage(cv,x0,y0,o.width,o.height,0,0,o.width,o.height);return o}
function loadHeroImg(file,id,bg){
 const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{
  const sc=Math.min(1,520/im.height,520/im.width),w=Math.max(1,Math.round(im.width*sc)),h=Math.max(1,Math.round(im.height*sc));
  let cv=document.createElement("canvas");cv.width=w;cv.height=h;const c=cv.getContext("2d",{willReadFrequently:true});c.drawImage(im,0,0,w,h);
  if(bg)knockBg(c,w,h);cv=trimAlpha(cv);
  let url=cv.toDataURL("image/webp",.86);if(!/^data:image\/webp/.test(url))url=cv.toDataURL("image/png");
  HIMG[id]=url;const ok=saveImg();
  renderAll();showSettings();toast(ok?K("Picture added!","그림을 넣었어요!"):K("Picture added for now (this device could not save it).","그림을 넣었어요 (이 기기에 저장은 안 돼서 지금만 보여요)."))};im.onerror=()=>toast(K("Couldn't read that picture.","그림을 읽지 못했어요."));im.src=fr.result};
 fr.readAsDataURL(file)}
function showSettings(){
 const seg=(nm,val,opts)=>`<div class="box seg" role="group">${opts.map(([v,l])=>`<button data-${nm}="${v}" aria-pressed="${String(val)===String(v)}">${l}</button>`).join("")}</div>`;
 const kv=VO.ko,ev=VO.en,ck=vPick("ko"),ce=vPick("en");setHero=setHero||G.char;
 $("setCard").innerHTML=`<div class="libhead"><h2>⚙️ ${K("Settings","설정")}</h2><button class="btn" id="setX">${K("Close","닫기")}</button></div>
 <div class="setrow"><b>${K("Play level","난이도")}</b>${seg("easy",G.easy?1:0,[[1,K("Easy · age 4–6","쉬움 · 4~6세")],[0,K("Normal","보통")]])}
  <small>${K("Easy: no losing, voice help, hints after a wrong answer, battles are tap-the-word, the course runs by itself and you only tap to jump.","쉬움: 지는 일이 없어요. 목소리로 안내하고, 틀리면 힌트를 줘요. 배틀은 맞는 낱말만 누르면 되고, 코스는 알아서 달려서 톡 눌러 점프만 하면 돼요.")}</small></div>
 <div class="setrow"><b>${K("Korean voice","한국어 목소리")}</b>${kv.length?`<select id="setVko">${kv.map(v=>`<option value="${escH(v.name)}" ${ck&&v.name===ck.name?"selected":""}>${escH(v.name)}</option>`).join("")}</select>`:`<small>${K("No Korean voice was found on this device yet.","이 기기에서 한국어 목소리를 아직 찾지 못했어요.")}</small>`}<button class="btn" id="setTko">▶ ${K("Test","들어 보기")}</button></div>
 ${ev.length?`<div class="setrow"><b>${K("English voice","영어 목소리")}</b><select id="setVen">${ev.slice(0,30).map(v=>`<option value="${escH(v.name)}" ${ce&&v.name===ce.name?"selected":""}>${escH(v.name)} (${escH(v.lang)})</option>`).join("")}</select><button class="btn" id="setTen">▶</button></div>`:""}
 <div class="setrow"><b>${K("Speaking speed","말 빠르기")}</b>${seg("vr",G.vrate,[[.85,K("Slow","천천히")],[1,K("Normal","보통")],[1.12,K("A bit faster","조금 빠르게")]])}
  <small>${K("For the most natural voice: on iPad/iPhone download an 'Enhanced' or 'Premium' Korean voice (Settings › Accessibility › Spoken Content › Voices › Korean). On a computer, Microsoft Edge has 'Natural' voices. On Android, use Google's speech engine.","가장 자연스러운 목소리: 아이패드·아이폰은 설정 › 손쉬운 사용 › 콘텐츠 말하기(Spoken Content) › 음성 › 한국어에서 '향상된' 또는 '프리미엄' 음성을 내려받으세요. 컴퓨터는 Microsoft Edge의 'Natural' 음성, 안드로이드는 Google 음성 엔진이 가장 자연스러워요.")}</small></div>
 <div class="setrow"><b>${K("Pause between sentences","문장 사이 쉼")}</b>${seg("vp",G.vpause||1000,[[800,"0.8s"],[1000,"1.0s"],[1200,"1.2s"]])}<small>${K("How long the storyteller waits between sentences. Start at 1.0 s and adjust to your child.","이야기꾼이 문장 사이에 쉬는 시간이에요. 1.0초로 시작해서 아이 반응에 맞춰 조정하세요.")}</small></div>
 <div class="setrow"><b>${K("Music & sounds","배경음악·효과음")}</b>${seg("bgm",G.bgm===false?0:1,[[1,K("Music on","음악 켜기")],[0,K("Music off","음악 끄기")]])}${seg("sfxo",G.sfxOff?0:1,[[1,K("Sounds on","효과음 켜기")],[0,K("Sounds off","효과음 끄기")]])}<button class="btn" id="auTest">🔊 ${K("Sound check","소리 확인")}</button><span class="austat" id="auStat"></span><small>${K("10 music tracks are built in. Music gets quieter by itself while someone is talking. If there is no sound, tap 'Sound check'.","배경음악 10곡이 들어 있어요. 목소리가 나오는 동안 음악은 저절로 작아져요. 소리가 안 나면 '소리 확인'을 눌러 보세요.")}</small></div>
 <div class="setrow"><b>${K("Compare voices","목소리 비교")}</b><div class="vcmp"><select id="setWho">${[["narrator",K("Narrator","나레이터")],["mentor",K("Master Turtle","거북이 스승")],...CHARS.map(c=>[c.id,L(c.n)])].map(([v,l])=>`<option value="${v}" ${v===setWho?"selected":""}>${escH(l)}</option>`).join("")}</select><button class="btn" data-vl="0">▶ ${K("Hello","인사")}</button><button class="btn" data-vl="1">▶ ${K("Guide","학습 안내")}</button><button class="btn" data-vl="2">▶ ${K("Cheer","격려")}</button></div>
  <small>${K(`This device has ${VO.ko.length} Korean voice(s), ${VO.ko.filter(v=>MALE.test(v.name)).length} of them male. With one voice, characters differ only by pitch and speed; truly distinct voices need real voice files.`,`이 기기의 한국어 목소리: ${VO.ko.length}개 (남성 ${VO.ko.filter(v=>MALE.test(v.name)).length}개). 목소리가 1개뿐이면 높낮이와 속도로만 구별돼요. 완전히 다른 목소리는 실제 음성 파일이 있어야 해요.`)}</small></div>
 <div class="setrow"><b>${K("Character pictures","캐릭터 그림")}</b>
  <small>${K("Try your own character art (PNG/WebP, transparent background is best). Pick a hero, then choose a file. Saved on this device only.","직접 만든 캐릭터 그림을 넣어 볼 수 있어요 (투명 배경 PNG/WebP가 가장 좋아요). 영웅을 고르고 파일을 선택하세요. 이 기기에만 저장돼요.")}</small>
  <div class="imgs">${[...CHARS.map(c=>({id:c.id,nm:L(c.n).split(" ").pop(),art:heroArt(c.id)})),{id:"mentor",nm:K("Turtle","거북이"),art:mentorArt()},...Object.keys(VIL).map(k=>({id:"v_"+k,nm:L(VIL[k].n),art:vilArt(k)}))].map(c=>`<button class="it${c.id===setHero?" on":""}" data-h="${c.id}"><span>${c.art}</span>${HIMG[c.id]?"🖼️ ":""}${escH(c.nm)}</button>`).join("")}</div>
  <label class="btn" style="cursor:pointer">📁 ${K("Choose picture","그림 고르기")}<input type="file" id="setFile" accept="image/*" hidden></label>
  <label class="rule"><input type="checkbox" id="setBg" checked> ${K("Remove plain background","단색 배경 지우기")}</label>
  ${HIMG[setHero]?`<button class="btn" id="setDel">↩️ ${K("Use original art","원래 그림으로")}</button>`:""}</div>
 <div class="setrow"><b>${K("Reading help","읽기 도움")}</b>${seg("rd",rdLv(),[[1,K("Listen & repeat","듣고 따라 읽기")],[2,K("Read first","먼저 읽기")],[3,K("Read alone","혼자 읽기")]])}<small>${rdHelpText()}</small></div>
 <div class="setrow"><b>${K("Reading missions","읽기 미션")}</b>${seg("rmo",G.rmOff?0:1,[[1,K("On","켜기")],[0,K("Off","끄기")]])}<small>${K("Three times in each case and in the storybook, your child reads a sentence out loud and answers one quick picture question.","사건마다 3번, 동화책에서 3번, 아이가 문장을 소리 내어 읽고 그림 고르기 문제 1개를 풀어요.")}</small></div>
 <div class="setrow"><b>☀️ ${K("Today's adventure","오늘의 모험")}</b>${seg("tdl",G.tdLen==="short"?0:1,[[1,K("One lap (8 games)","한 바퀴 (게임 8개)")],[0,K("Short (1 game)","짧게 (게임 1개)")]])}<small>${K("One lap: the 6 playground games, the free course and a practice battle, plus 3 reading missions and 5 words (about 25–35 minutes; it can be split up during the day). Short: one game instead of the lap (about 10–15 minutes). The story modes (storybooks, Hangul Island, cases) are not part of the lap.","한 바퀴: 놀이터 6종 + 모험 코스 + 연습 배틀, 그리고 읽기 미션 3개와 낱말 5개(약 25~35분, 하루 중에 나눠서 해도 돼요). 짧게: 게임 1개만(약 10~15분). 이야기 모드(동화책·한글 섬 모험·사건 수사대)는 한 바퀴에 넣지 않아요.")}</small></div>
 ${micSR()?`<div class="setrow"><b>🎤 ${K("Read-aloud check (test)","소리 내어 읽기 확인 (실험)")}</b>${seg("mic",micOK()?1:0,[[1,K("On","켜기")],[0,K("Off","끄기")]])}<small>${K("Uses the browser's speech recognition to check the mission sentence. It can be wrong, and the voice may be sent to the browser maker's servers (Apple/Google). If the microphone is blocked, the button hides itself.","미션 문장을 읽으면 브라우저의 음성 인식으로 비슷하게 읽었는지 확인해요. 틀리게 판단할 수 있고, 목소리가 브라우저 회사(애플·구글) 서버로 보내질 수 있어요. 마이크가 막혀 있으면 버튼이 저절로 사라져요.")}</small></div>`:""}
 <div class="setrow"><b>${K("Word level","낱말 레벨")}</b>${seg("wl",G.wl||1,[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"]])}<small>${WB_NAMES[G.wl||1]} · ${K("Rises by itself as words are learned in the playground. The level test can set it too.","놀이터에서 낱말을 익히면 저절로 올라가요. 레벨 테스트로 다시 정할 수도 있어요.")}</small></div>
 <div class="setrow"><b>${K("Battle questions","배틀 문제 수준")}</b>${seg("rl",G.rl,[[1,K("Letters","글자")],[2,K("Words","낱말")]])}<small>${K("Words: battles use real words with 받침.","낱말: 배틀에서 받침 있는 실제 낱말이 나와요.")}</small></div>
 <div class="setrow"><b>${K("Letter report","글자 실력표")}</b><button class="btn" id="setRep">📊 ${K("Open","열기")}</button><small>${K("For parents: which letters your child has mastered and which need practice.","부모님용: 아이가 익힌 글자와 연습이 더 필요한 글자를 한눈에 봐요.")}</small></div>
 <div class="setrow"><b>🛠 ${K("Move picture spots (parents)","그림 위치 고치기 (부모용)")}</b>${seg("lay",G.layEdit?1:0,[[1,K("On","켜기")],[0,K("Off","끄기")]])}<small>${K("When a sparkle or scroll is not on its object (for example after a new picture), turn this on, open the case's search step or the book's explore step and drag it. Saved on this device; 'Copy layout code' gives the code to send to the developer.","반짝이나 두루마리가 그림 속 물건과 어긋나 있으면(새 그림을 넣은 뒤 등) 켜고, 사건의 '현장 조사'나 동화책의 '탐색' 단계에서 끌어서 옮기세요. 이 기기에 저장되고, '배치 코드 복사'로 개발 담당에게 보낼 수 있어요.")}</small></div>
 <div class="setrow"><b>${K("Progress backup","진행 백업")}</b><button class="btn" id="bkMake">📋 ${K("Make a backup code","백업 코드 만들기")}</button><button class="btn" id="bkLoad">📥 ${K("Restore from a code","코드로 불러오기")}</button><small>${K("Progress is saved only on this device and in this browser (the home-screen app keeps its own copy). Keep a backup code in your notes before changing devices or clearing the browser.","진행 기록은 이 기기, 이 브라우저에만 저장돼요 (홈 화면 앱은 따로 저장돼요). 기기를 바꾸거나 브라우저 기록을 지우기 전에 백업 코드를 메모장에 보관하세요.")}</small><div class="bkbox" id="bkBox"></div></div>
 <div class="setrow"><b>📲 ${K("App","앱")}</b><small id="appSt">${appStatusText()}</small>${APP.waiting?`<button class="btn pri" id="appUpd">✨ ${K("Update now","지금 업데이트")}</button>`:""}${APP.prompt&&!appStandalone()?`<button class="btn" id="appIns">📲 ${K("Install","설치")}</button>`:""}</div>
 <div class="tbtns"><button class="btn" id="setHeroB">${K("Change hero","영웅 바꾸기")}</button><button class="btn pri" id="setOk">${K("Done","완료")}</button></div>`;
 $("setOv").hidden=false;
 const close=()=>{$("setOv").hidden=true};$("setX").onclick=close;$("setOk").onclick=close;
 $("setCard").querySelectorAll("[data-easy]").forEach(b=>b.onclick=()=>{G.easy=b.dataset.easy==="1";save();document.body.classList.toggle("easy",G.easy);showSettings()});
 $("setCard").querySelectorAll("[data-vr]").forEach(b=>b.onclick=()=>{G.vrate=+b.dataset.vr;save();showSettings();sayUI("This is how fast I talk.","이 정도 빠르기로 말할게요.")});
 if($("setVko"))$("setVko").onchange=e=>{G.vko=e.target.value;save()};if($("setVen"))$("setVen").onchange=e=>{G.ven=e.target.value;save()};
 $("setTko").onclick=()=>narrate(["안녕, 친구들. 오늘도 한글 섬으로 가 볼까요?","그림을 잘 보세요."],null,"ko");
 $("setCard").querySelectorAll("[data-vp]").forEach(b=>b.onclick=()=>{G.vpause=+b.dataset.vp;save();showSettings();narrate(["첫 번째 문장이에요.","두 번째 문장이에요."],null,"ko")});
 $("setCard").querySelectorAll("[data-vl]").forEach(b=>b.onclick=()=>{const w=$("setWho").value;setWho=w;if(w==="narrator")narrate([VL(w,+b.dataset.vl)],null,"ko");else charSay(w,+b.dataset.vl)});
 if($("setTen"))$("setTen").onclick=()=>narrate(["Hi! I'm the storyteller of Hangul Island."],null,"en");
 $("setCard").querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{setHero=b.dataset.h;showSettings()});
 $("setFile").onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)loadHeroImg(f,setHero,$("setBg").checked)};
 if($("setDel"))$("setDel").onclick=()=>{delete HIMG[setHero];saveImg();renderAll();showSettings()};
 $("setHeroB").onclick=()=>{close();selChar=G.char;selType=G.ptype;step=1;showTitle()};
 $("setRep").onclick=()=>{close();showPartner()};
 $("setCard").querySelectorAll("[data-wl]").forEach(b=>b.onclick=()=>{G.wl=+b.dataset.wl;save();showSettings()});
 $("setCard").querySelectorAll("[data-rl]").forEach(b=>b.onclick=()=>{G.rl=+b.dataset.rl;save();showSettings()});
 $("setCard").querySelectorAll("[data-bgm]").forEach(b=>b.onclick=()=>{G.bgm=b.dataset.bgm==="1";save();if(!G.bgm)bgmStop(.3);else if(!KZ)bgmPlay("title");showSettings()});
 $("setCard").querySelectorAll("[data-sfxo]").forEach(b=>b.onclick=()=>{G.sfxOff=b.dataset.sfxo==="0";save();if(G.sfxOff)ambStop(.3);showSettings()});
 $("setCard").querySelectorAll("[data-rd]").forEach(b=>b.onclick=()=>{G.rd=+b.dataset.rd;G.autoRead=G.rd===1;save();showSettings()});
 $("setCard").querySelectorAll("[data-rmo]").forEach(b=>b.onclick=()=>{G.rmOff=b.dataset.rmo==="0";save();showSettings()});
 $("setCard").querySelectorAll("[data-tdl]").forEach(b=>b.onclick=()=>{G.tdLen=b.dataset.tdl==="0"?"short":"lap";save();tdHudSet();try{renderExtras()}catch(e){}if(tdDone()&&!tdFresh().paid){dayLog(D=>{D.td=1});save();queue(tdCelebrate)}showSettings()});
 if($("auTest"))$("auTest").onclick=()=>{auWake();auBeep();setTimeout(auStatus,450)};auStatus();
 $("setCard").querySelectorAll("[data-mic]").forEach(b=>b.onclick=()=>{G.mic=b.dataset.mic==="1";if(G.mic)G.micDead=0;save();showSettings()});
 $("bkMake").onclick=bkMakeUI;$("bkLoad").onclick=bkLoadUI;
 $("setCard").querySelectorAll("[data-lay]").forEach(b=>b.onclick=()=>{G.layEdit=b.dataset.lay==="1";save();showSettings();if(G.layEdit)toast(K("Open a case's search step or the book's explore step.","사건의 '현장 조사'나 동화책 '탐색' 단계를 열어 보세요."))});if($("appUpd"))$("appUpd").onclick=appApplyUpdate;if($("appIns"))$("appIns").onclick=appInstall;
}
$("menuBtn").onclick=()=>{if(overlayOpen())return;showSettings()};
document.body.classList.toggle("easy",!!G.easy);
const setLang=l=>{G.lang=l;save();renderHUD();if(!$("titleOv").hidden)showTitle();if(!$("parOv").hidden)showPartner()};
$("lEn").onclick=()=>setLang("en");$("lKo").onclick=()=>setLang("ko");

renderAll();
const SPLASH="assets/img/scene/island.webp";
document.getElementById("vSkip").onclick=()=>{const d=VO.pend;VO.pend=null;hush();if(d)setTimeout(d,60)};
const POSTER2="assets/img/scene/start_poster.webp";
function showSplash(){
 $("titleOv").hidden=true;$("spImg").src=POSTER2;$("spBg").src=POSTER2;const prog=hasProgress();splashLang();
 const go=()=>{$("splashOv").hidden=true;narrate(["열두 동물 한글 수비대!"],null,"ko")};
 $("spGo").setAttribute("aria-label",prog?K("Continue the adventure","모험 이어하기"):K("Start the adventure","모험 시작"));$("spGo").innerHTML="";
 $("spGo").onclick=()=>{sfx("star");go();if(prog)renderAll();else{step=1;showTitle()}};$("spGo2").onclick=()=>$("spGo").click();$("spGo2").textContent=prog?K("▶ Continue","▶ 모험 이어하기"):K("▶ Start the adventure","▶ 모험 시작");
 $("spNew").hidden=!prog;$("spNew").textContent=K("New game","처음부터");
 $("spNew").onclick=()=>{go();selChar=G.char;selType=G.ptype;step=1;showTitle()};
 $("splashOv").hidden=false;
}
function splashLang(){let box=document.querySelector(".splang");if(!box){box=document.createElement("div");box.className="splang";$("splashOv").appendChild(box)}
 box.innerHTML=[["ko","한국어"],["en","English"]].map(([l,n])=>`<button data-l="${l}" aria-pressed="${G.lang===l}">${n}</button>`).join("");
 box.querySelectorAll("button").forEach(b=>b.onclick=e=>{e.stopPropagation();G.lang=b.dataset.l;save();sfx("tap");showSplash();try{renderAll()}catch(err){}})}
function imgWarm(list){list=[...new Set(list.filter(Boolean))];let i=0;const step=()=>{for(let k=0;k<3&&i<list.length;k++,i++){const im=new Image();im.decoding="async";im.src=list[i]}if(i<list.length)setTimeout(step,150)};step()}
showSplash();imgWarm([POSTER2,...Object.values(PORT)]);

/* ===== adventure course upgrade (from the user's v25 ZIP): parallax forest, auto-run switch, untimed letter questions ===== */
const courseStartOriginal=startRun,courseHitOriginal=hitBlock,courseCloseOriginal=closeRun;
const courseAutoLabel=on=>K("Auto run: ","자동 달리기: ")+(on?K("on","켜짐"):K("off","꺼짐"));
startRun=function(word){
 courseStartOriginal(word);if(!RUN)return;RUN.auto=false;RUN.reviewed=false;RUN.learning=false;
 RUN.img.land=Object.assign(new Image(),{src:"assets/img/scene/course_forest.webp"});
 if(G.char==="rabbit")RUN.img.cycle=Object.assign(new Image(),{src:"assets/img/hero/rabbit_run_sheet.webp"});
 document.getElementById("rAuto")?.remove();
 const b=document.createElement("button");b.id="rAuto";b.className="btn";b.textContent=courseAutoLabel(false);
 b.onclick=()=>{if(!RUN)return;RUN.auto=!RUN.auto;b.textContent=courseAutoLabel(RUN.auto)};document.querySelector(".runfoot")?.prepend(b);
 const tip=$("rTip");if(tip)tip.textContent=K("◀ ▶ move · ⤒ jump · listen and find the letter block. At each door, build the letter too!","◀ ▶ 이동 · ⤒ 점프 · 글자를 듣고 블록을 찾아요. 문을 열 때 글자 조합도 연습해요!");
};
function courseQuestion(title,answer,options,spoken,done){
 if(!RUN)return;const r=RUN;r.learning=true;r.keys={l:0,r:0,j:0};r.p.vx=0;
 document.getElementById("courseLesson")?.remove();
 const d=document.createElement("section");d.id="courseLesson";d.className="course-lesson";d.setAttribute("role","dialog");d.setAttribute("aria-label",K("Hangul practice","한글 연습"));
 d.innerHTML=`<h3></h3><button class="btn hear">🔊 ${K("Hear again","다시 듣기")}</button><div class="answers"></div><p aria-live="polite">${K("Take your time.","천천히 골라도 괜찮아요.")}</p>`;
 d.querySelector("h3").textContent=title;d.querySelector(".hear").onclick=()=>say(spoken);
 shuffle([...new Set([answer,...options])]).forEach(x=>{const b=document.createElement("button");b.className="btn";b.textContent=x;b.onclick=()=>{
  if(RUN!==r)return;
  if(x!==answer){r.wrong=(r.wrong||0)+1;recT(answer,false);sfx("bad");b.disabled=true;d.querySelector("p").textContent=K("Listen again and choose.","다시 들어 보고 골라 보세요.");say(spoken);return}
  recT(answer,true);sfx("star");say(answer);d.remove();done()};d.querySelector(".answers").appendChild(b)});
 $("rStage").appendChild(d);say(spoken);d.querySelector(".hear").focus();
}
hitBlock=function(cx,cy){
 if(!RUN||RUN.learning)return;const m=RUN.meta[cx+","+cy],g=m&&RUN.gates[m.g];
 if(tileAt(cx,cy)==="L"&&g&&!g.opened&&m.g===RUN.cur&&m.s===g.target){
  const r=RUN,parts=sylParts(m.s),tails=" ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
  const formula=parts?[parts.l,parts.v,...(parts.t?[tails[parts.t]]:[])].join(" + "):m.s;
  courseQuestion(formula+" = ?",m.s,distract(m.s,2),m.s,()=>{if(RUN!==r)return;r.learning=false;courseHitOriginal(cx,cy)});
 }else courseHitOriginal(cx,cy);
};
/* at the flag: read the whole word, fill the last letter, find the word by sound */
function courseReview(){
 if(!RUN||RUN.learning)return;const r=RUN,w=r.word.w,others=shuffle(WORDS2.filter(x=>x.w!==w)).map(x=>x.w);
 courseQuestion(K("Read the letters you collected","모은 글자를 이어서 읽어요"),w,others.slice(0,2),w,()=>{
  courseQuestion(K("Fill the missing letter: ","빠진 글자를 채워요: ")+w.slice(0,-1)+" □",w.slice(-1),distract(w.slice(-1),2),w,()=>{
   courseQuestion(K("Listen and find the word","소리를 듣고 낱말을 찾아요"),w,others.slice(2,4),w,()=>{if(RUN!==r)return;r.learning=false;r.reviewed=true;save();clearRun()})})});
}
closeRun=function(){document.getElementById("courseLesson")?.remove();hush();courseCloseOriginal()};
window.addEventListener("blur",()=>{if(RUN){RUN.keys={l:0,r:0,j:0};RUN.auto=false;const b=$("rAuto");if(b)b.textContent=courseAutoLabel(false)}});
document.addEventListener("visibilitychange",()=>{if(document.hidden&&RUN){RUN.keys={l:0,r:0,j:0};RUN.auto=false}});


/* ===== v29: reading help levels, reading missions, today's adventure, weekly parent summary, backup code, read-aloud check =====
   Everything below is function declarations and var, so the first renderAll() (which runs before this block) can call tdChip()/tdHudSet() safely. */
var RMS={"k1":[{"a":"다람쥐의 창고 열쇠가 사라졌어요.","b":"다람쥐는 가을 내내 도토리를 창고에 모아 두었어요. 그런데 창고 열쇠가 감쪽같이 사라졌어요.","q":"무엇이 사라졌나요?","ans":["열쇠","🔑"],"o":[["도토리","🌰"],["모자","🧢"]]},{"a":"창고 앞에 까만 발자국이 있었어요.","b":"흑묘는 창고 근처에도 안 갔다고 했어요. 하지만 창고 앞에 까만 고양이 발자국이 있었어요.","q":"창고 앞에 무엇이 있었나요?","ans":["발자국","🐾"],"o":[["꽃","🌸"],["우산","☂️"]]},{"a":"열쇠는 키 큰 소나무 위에 있었어요.","b":"번개 쥐는 비밀 메모를 꼼꼼히 읽었어요. 그리고 키 큰 소나무 위에서 열쇠를 찾았어요.","q":"열쇠는 어디에 있었나요?","ans":["소나무 위","🌲"],"o":[["강물 속","🌊"],["모래 밑","🏖️"]]}],"k2":[{"a":"비버의 오두막이 와르르 무너졌어요.","b":"비버는 설명서대로 강가에 오두막을 지었어요. 그런데 오두막이 와르르 무너졌어요.","q":"무엇이 무너졌나요?","ans":["오두막","🛖"],"o":[["다리","🌉"],["탑","🗼"]]},{"a":"설명서에 하얀 물감이 덧칠되어 있었어요.","b":"백묘는 설명서가 처음부터 그랬다고 했어요. 하지만 설명서 글씨 위에 하얀 물감이 덧칠되어 있었어요.","q":"설명서에 무엇이 덧칠되어 있었나요?","ans":["하얀 물감","🎨"],"o":[["빨간 잼","🍓"],["까만 먹물","🖋️"]]},{"a":"기둥, 벽, 지붕 순서로 지어요.","b":"강철 소는 진짜 설명서를 차근차근 읽었어요. 그리고 기둥, 벽, 지붕 순서로 오두막을 지었어요.","q":"맨 먼저 무엇을 세우나요?","ans":["기둥","🪵"],"o":[["지붕","🔺"],["창문","🪟"]]}],"k3":[{"a":"호랑이냥이 금메달을 가져갔어요.","b":"고슴도치는 달리기 대회에서 일 등을 했어요. 그런데 호랑이냥이 금메달을 가져가 버렸어요.","q":"호랑이냥이 무엇을 가져갔나요?","ans":["금메달","🥇"],"o":[["모자","🎩"],["사과","🍎"]]},{"a":"호랑이냥은 늦잠을 자서 대회에 못 왔어요.","b":"호랑이냥은 제일 먼저 결승선에 들어왔다고 했어요. 하지만 호랑이냥은 늦잠을 자서 대회에 오지 않았어요.","q":"호랑이냥은 왜 대회에 못 왔나요?","ans":["늦잠을 자서","😴"],"o":[["비가 와서","🌧️"],["길을 잃어서","🧭"]]},{"a":"고슴도치가 다시 금메달을 목에 걸었어요.","b":"대장 호랑이는 기록과 다른 거짓말을 모두 깨뜨렸어요. 고슴도치는 다시 금메달을 목에 걸고 활짝 웃었어요.","q":"금메달은 누가 목에 걸었나요?","ans":["고슴도치","🦔"],"o":[["호랑이냥","🐯"],["다람쥐","🐿️"]]}],"k4":[{"a":"스피니의 생일 케이크가 사라졌어요.","b":"오늘은 거미 스피니의 생일이에요. 그런데 식탁 위에 있던 딸기 케이크가 사라졌어요.","q":"무엇이 사라졌나요?","ans":["케이크","🎂"],"o":[["풍선","🎈"],["선물","🎁"]]},{"a":"포크 손잡이에 '뚱'이라고 쓰여 있었어요.","b":"뚱냥은 케이크 냄새도 못 맡았다고 했어요. 하지만 크림이 묻은 포크 손잡이에 '뚱'이라고 쓰여 있었어요.","q":"포크 손잡이에 무슨 글자가 있었나요?","ans":["뚱",""],"o":[["백",""],["흑",""]]},{"a":"친구들은 새 케이크를 함께 만들었어요.","b":"달빛 토끼는 스피니를 따뜻하게 위로했어요. 친구들은 새 케이크를 함께 만들어 생일 파티를 했어요.","q":"친구들은 함께 무엇을 만들었나요?","ans":["새 케이크","🎂"],"o":[["모래성","🏰"],["종이배","⛵"]]}],"k5":[{"a":"친구들이 모두 동굴 앞으로 갔어요.","b":"갈매기는 초대장에 등대 앞에서 조개 잔치를 한다고 썼어요. 그런데 친구들은 모두 깜깜한 동굴 앞으로 갔어요.","q":"친구들은 어디로 갔나요?","ans":["동굴 앞","🕳️"],"o":[["등대 앞","🗼"],["학교 앞","🏫"]]},{"a":"우체통 위에 보라색 잉크가 있었어요.","b":"보라냥은 초대장에 손도 안 댔다고 했어요. 하지만 우체통 위에 보라색 잉크 방울이 떨어져 있었어요.","q":"우체통 위에 무엇이 있었나요?","ans":["보라색 잉크","🟣"],"o":[["하얀 깃털","🪶"],["노란 모래","🟡"]]},{"a":"친구들은 등대 앞에서 조개 잔치를 했어요.","b":"하늘 용은 갈매기의 수첩과 똑같이 초대장을 고쳤어요. 친구들은 등대 앞에 모여 조개 잔치를 했어요.","q":"친구들은 어디에서 잔치를 했나요?","ans":["등대 앞","🗼"],"o":[["동굴 앞","🕳️"],["학교 앞","🏫"]]}],"k6":[{"a":"창고 상자의 이름표가 모두 바뀌었어요.","b":"스승님의 창고에는 신기한 상자가 많아요. 그런데 보라냥이 이름표를 몽땅 비슷한 낱말로 바꿔 붙였어요.","q":"무엇이 바뀌었나요?","ans":["이름표","🏷️"],"o":[["상자 색깔","🎨"],["창고 문","🚪"]]},{"a":"바뀐 이름표는 보라색 글씨였어요.","b":"보라냥은 펜 같은 건 가져 본 적도 없다고 했어요. 하지만 바뀐 이름표는 모두 보라색 글씨였어요.","q":"바뀐 이름표는 무슨 색 글씨였나요?","ans":["보라색","🟣"],"o":[["까만색","⚫"],["초록색","🟢"]]},{"a":"모든 상자에 바른 이름표를 붙였어요.","b":"바람 뱀은 물건 설명을 읽고 수수께끼를 하나씩 풀었어요. 그리고 모든 상자에 바른 이름표를 붙였어요.","q":"이제 상자에는 어떤 이름표가 붙어 있나요?","ans":["바른 이름표","✅"],"o":[["엉터리 이름표","❌"],["빈 이름표","⬜"]]}],"k7":[{"a":"쿠키 순서표가 뒤죽박죽 섞였어요.","b":"다람쥐는 친구들에게 줄 도토리 쿠키를 굽기로 했어요. 그런데 빵집 벽의 순서표가 뒤죽박죽 섞여 있었어요.","q":"무엇이 뒤죽박죽 섞였나요?","ans":["순서표","📋"],"o":[["도토리","🌰"],["밀가루","🌾"]]},{"a":"가위에 회색 털이 붙어 있었어요.","b":"회색냥은 가위를 만진 적도 없다고 했어요. 하지만 식탁 밑 가위에 회색 털이 붙어 있었어요.","q":"가위에 무엇이 붙어 있었나요?","ans":["회색 털","🐈"],"o":[["초콜릿","🍫"],["반창고","🩹"]]},{"a":"다람쥐는 쿠키를 친구들에게 나눠 주었어요.","b":"질주 말은 쿠키 만드는 순서를 차례차례 맞췄어요. 다람쥐는 고소한 쿠키를 구워 친구들에게 나눠 주었어요.","q":"다람쥐는 쿠키를 어떻게 했나요?","ans":["나눠 주었어요","🤲"],"o":[["혼자 먹었어요","😋"],["버렸어요","🗑️"]]}],"k8":[{"a":"도서관의 친구 카드가 뒤섞였어요.","b":"비버는 도서관 벽에 친구 소개 카드를 붙였어요. 그런데 밤사이 카드가 몽땅 뒤섞였어요.","q":"무엇이 뒤섞였나요?","ans":["친구 카드","🃏"],"o":[["책장","📚"],["의자","🪑"]]},{"a":"책장 앞에 과자 부스러기가 있었어요.","b":"뚱냥은 도서관에 간 적도 없다고 했어요. 하지만 책장 앞에 과자 부스러기가 잔뜩 떨어져 있었어요.","q":"책장 앞에 무엇이 떨어져 있었나요?","ans":["과자 부스러기","🍪"],"o":[["나뭇잎","🍂"],["단추","🔘"]]},{"a":"구름 양이 카드를 제자리에 붙였어요.","b":"구름 양은 '친구 소개' 책을 꼼꼼히 읽었어요. 그리고 카드를 하나씩 제자리에 붙였어요.","q":"카드를 제자리에 붙인 친구는 누구인가요?","ans":["구름 양","🐑"],"o":[["뚱냥","🐱"],["비버","🦫"]]}],"k9":[{"a":"개울가의 물레방아가 멈췄어요.","b":"물레방아가 돌아야 밀을 빻아 빵을 만들 수 있어요. 그런데 오늘 아침 물레방아가 멈춰 버렸어요.","q":"무엇이 멈췄나요?","ans":["물레방아","🎡"],"o":[["시계","⏰"],["자동차","🚗"]]},{"a":"개울이 커다란 돌로 막혀 있었어요.","b":"회색냥은 물레방아가 원래 혼자 멈춘다고 했어요. 하지만 개울 위쪽이 커다란 돌로 꽉 막혀 있었어요.","q":"개울은 무엇으로 막혀 있었나요?","ans":["돌","🪨"],"o":[["나무","🌳"],["얼음","🧊"]]},{"a":"돌을 치우자 물레방아가 다시 돌았어요.","b":"재주 원숭이는 물레방아가 멈춘 까닭을 알아냈어요. 돌을 치우자 물이 흐르고 물레방아가 다시 빙글빙글 돌았어요.","q":"무엇을 치우니 물레방아가 다시 돌았나요?","ans":["돌","🪨"],"o":[["눈","❄️"],["모래","🏖️"]]}],"k10":[{"a":"별빛 축제 안내문이 이상하게 바뀌었어요.","b":"이번 주말에 마을 광장에서 별빛 축제가 열려요. 그런데 축제 안내문이 이상하게 바뀌어 있었어요.","q":"무슨 축제가 열리나요?","ans":["별빛 축제","🌟"],"o":[["눈꽃 축제","❄️"],["꽃 축제","🌸"]]},{"a":"풀통 뚜껑에 '백'이라고 쓰여 있었어요.","b":"백묘는 풀 같은 건 쓴 적도 없다고 했어요. 하지만 나무통 옆 풀통 뚜껑에 '백'이라고 쓰여 있었어요.","q":"풀통 뚜껑에 무슨 글자가 있었나요?","ans":["백",""],"o":[["뚱",""],["흑",""]]},{"a":"친구들은 모두 함께 축제를 즐겼어요.","b":"새벽 닭은 진짜 안내문을 친구들에게 읽어 주었어요. 토요일 저녁, 친구들은 모두 함께 축제를 즐겼어요.","q":"축제에는 누가 왔나요?","ans":["친구들 모두","👫"],"o":[["백묘만","🐱"],["아무도 안 왔어요","🚫"]]}],"k11":[{"a":"고슴도치의 등불이 사라졌어요.","b":"어두운 광산에서는 등불이 꼭 필요해요. 그런데 오늘 아침 고슴도치의 등불이 사라졌어요.","q":"무엇이 사라졌나요?","ans":["등불","🏮"],"o":[["망치","🔨"],["수정","💎"]]},{"a":"수레 위에 흑묘의 쪽지가 있었어요.","b":"흑묘는 등불이 뭔지도 모른다고 했어요. 하지만 수레 위에 흑묘가 쓴 쪽지가 남아 있었어요.","q":"수레 위에 무엇이 있었나요?","ans":["쪽지","📝"],"o":[["등불","🏮"],["수정","💎"]]},{"a":"등불은 큰 바위 뒤에 숨겨져 있었어요.","b":"용감한 개는 메모에 적힌 길을 그대로 따라갔어요. 등불은 큰 바위 뒤에 숨겨져 있었어요.","q":"등불은 어디에 있었나요?","ans":["바위 뒤","🪨"],"o":[["나무 위","🌳"],["다리 밑","🌉"]]}],"k12":[{"a":"숲속 신문의 제목이 바뀌었어요.","b":"다람쥐는 '숲속 신문'을 만들어요. 그런데 이번 주 신문 제목이 '호랑이냥, 혼자서 다리를 고치다!'로 바뀌었어요.","q":"무엇이 바뀌었나요?","ans":["신문 제목","📰"],"o":[["다리 색깔","🌉"],["숲 이름","🌲"]]},{"a":"다리를 고친 건 비버였어요.","b":"호랑이냥은 다리를 혼자 고쳤다고 했어요. 하지만 사진에는 비버가 망치로 다리를 고치는 모습이 있었어요.","q":"다리를 고친 건 누구인가요?","ans":["비버","🦫"],"o":[["호랑이냥","🐯"],["다람쥐","🐿️"]]},{"a":"새 신문에 바른 제목이 실렸어요.","b":"든든 돼지는 신문 기사를 끝까지 읽고 바른 제목을 골랐어요. 새 신문에는 '비버, 낡은 다리를 고치다'라는 제목이 실렸어요.","q":"새 신문에는 어떤 제목이 실렸나요?","ans":["바른 제목","✅"],"o":[["엉터리 제목","❌"],["제목 없음","⬜"]]}],"b1":[{"a":"회색냥이 동화책의 문장을 바꿨어요.","b":"어느 밤, 회색냥이 몰래 도서관에 들어왔어요. 그리고 〈토끼와 거북이〉의 문장을 바꿔 버렸어요.","q":"누가 문장을 바꿨나요?","ans":["회색냥","🐈"],"o":[["거북이 스승님","🐢"],["토끼","🐰"]]},{"a":"나무 아래에서 잠든 동물은 토끼예요.","b":"기록에는 토끼가 나무 아래에서 쿨쿨 잤다고 쓰여 있어요. 그래서 책 속 문장을 바르게 고쳤어요.","q":"나무 아래에서 잠든 동물은 누구인가요?","ans":["토끼","🐰"],"o":[["거북이","🐢"],["다람쥐","🐿️"]]},{"a":"거북이가 먼저 결승점에 도착했어요.","b":"거북이는 쉬지 않고 엉금엉금 걸었어요. 그래서 토끼보다 먼저 결승점에 도착했어요.","q":"누가 먼저 결승점에 도착했나요?","ans":["거북이","🐢"],"o":[["토끼","🐰"],["회색냥","🐈"]]}]};
var RDN={1:["Listen & repeat","듣고 따라 읽기"],2:["Read first","먼저 읽기"],3:["Read alone","혼자 읽기"]};
var RM=null,lastAct=Date.now();
function dkey(d){d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function rdLv(){const v=+G.rd;return v===1||v===2||v===3?v:3}
function autoNar(){return rdLv()===1}
function rmOn(){return !G.rmOff}
function isObj(v){return !!v&&typeof v==="object"&&!Array.isArray(v)}
/* ---- daily log: one small record per day, kept 35 days ---- */
function dayRec(){if(!isObj(G.days))G.days={};const k=dkey();if(!isObj(G.days[k]))G.days[k]={};const D=G.days[k];
 ["min","rm","solo","qn","qok","skip","help","games","words","mic"].forEach(f=>{const v=+D[f];D[f]=Number.isFinite(v)&&v>0?v:0});if(!isObj(D.wrong))D.wrong={};return D}
function dayLog(fn){try{fn(dayRec())}catch(e){}}
function dayPrune(){if(!isObj(G.days)){G.days={};return}const keep=new Date();keep.setDate(keep.getDate()-35);const lim=dkey(keep);for(const k in G.days)if(!/^\d{4}-\d\d-\d\d$/.test(k)||k<lim||!isObj(G.days[k]))delete G.days[k]}
/* ---- reading help (G.rd): 1 listen & repeat (auto narration), 2 read first (nudge after 12 s), 3 read alone (sound only on tap) ---- */
function rdNudge(id,alive){if(rdLv()!==2)return;setTimeout(()=>{const e=$(id);if(e&&alive())e.classList.add("nudge")},12000)}
function rdHelpText(){return [,K("Reads the case and storybook text aloud first; your child repeats it.","사건과 동화책 글을 먼저 읽어 주고, 아이가 따라 읽어요."),
 K("Your child reads first. Nothing is read aloud by itself; after about 12 seconds the 🔊 button glows. Missions use one short sentence.","아이가 먼저 읽어요. 저절로 읽어 주지 않고, 12초쯤 지나면 🔊 버튼이 반짝여요. 미션은 한 문장이에요."),
 K("Your child reads alone; the text is read only when 🔊 is tapped. Missions use two longer sentences. Short character lines still play.","아이가 혼자 읽어요. 🔊를 누를 때만 읽어 줘요. 미션은 두 문장짜리 긴 글이에요. 캐릭터의 짧은 대사는 그대로 들려요.")][rdLv()]}
/* ---- reading mission: read aloud, then one quick picture question ---- */
function rmText(m){return rdLv()===3&&m.b?m.b:m.a}
function rmMsg(t){const e=$("rmMsg");if(e)e.textContent=t||""}
function rmClose(){$("rmOv").hidden=true;$("rmCard").innerHTML="";RM=null}
function rmLog(S,skip){const m=S.m;if(!isObj(G.rmlog))G.rmlog={};const R=G.rmlog[m.id]||(G.rmlog[m.id]={n:0,ok:0,solo:0,skip:0});
 dayLog(D=>{if(skip){D.skip++;R.skip++;return}D.rm++;R.n++;if(!S.help){D.solo++;R.solo++}D.qn++;if(!S.miss){D.qok++;R.ok++}if(S.mic)D.mic++});
 save();if(!skip){const T=tdFresh();T.rm=(T.rm||0)+1;save();if(T.rm>=3)tdMark("story")}}
function rmShow(m,o,done){
 if(!m){done&&done();return}
 o=o||{};hush();const lv=rdLv(),txt=rmText(m),S={m,o,done,help:0,miss:0,mic:0,ph:0};RM=S;
 const words=txt.split(/\s+/).filter(Boolean),mic=micOK();
 $("rmCard").innerHTML=`<div class="rmhead"><b>📜 ${K("Reading mission","읽기 미션")}</b><span class="rmlv">${K(RDN[lv][0],RDN[lv][1])}</span><button class="rmskip" id="rmSkip">${K("Skip","건너뛰기")}</button></div>
  <p class="rmtip" id="rmTip">${lv===1?K("Listen first, then read it out loud.","먼저 듣고, 소리 내어 따라 읽어요."):K("Read it out loud by yourself.","소리 내어 혼자 읽어 봐요.")}</p>
  <div class="rmtext" id="rmText" lang="ko">${words.map(w=>`<button class="rw">${escH(w)}</button>`).join(" ")}</div>
  <div class="rmacts" id="rmActs"><button class="btn" id="rmSay">🔊 ${K("Read to me","읽어 주기")}</button>${mic?`<button class="btn" id="rmMic">🎤 ${K("Check my reading","읽기 확인")}</button>`:""}<button class="btn pri" id="rmDone">✓ ${K("I read it!","다 읽었어요")}</button></div>
  <p class="rmmsg" id="rmMsg" aria-live="polite"></p>
  <div class="rmq" id="rmQ" hidden></div>`;
 $("rmOv").hidden=false;
 const box=$("rmText"),live=()=>RM===S;
 const readAll=(cb)=>{box.classList.add("reading");narrate([txt],()=>{if(!live())return;box.classList.remove("reading");cb&&cb()},"ko",{voice:"narrator"})};
 box.querySelectorAll(".rw").forEach(b=>b.onclick=()=>{if(!live())return;S.help++;dayLog(D=>D.help++);box.querySelectorAll(".rw").forEach(x=>x.classList.remove("on"));b.classList.add("on");say(b.textContent.replace(/[^가-힣0-9]/g,"")||b.textContent);setTimeout(()=>b.classList.remove("on"),1200)});
 $("rmSay").onclick=()=>{if(!live())return;$("rmSay").classList.remove("nudge");S.help++;dayLog(D=>D.help++);readAll()};
 $("rmSkip").onclick=()=>{if(!live())return;hush();rmLog(S,true);rmClose();done&&done()};
 $("rmDone").onclick=()=>{if(!live()||S.ph)return;S.ph=1;hush();$("rmDone").hidden=true;$("rmSay").classList.remove("nudge");rmAsk(S)};
 if($("rmMic"))$("rmMic").onclick=()=>{const b=$("rmMic");if(!live()||b.disabled)return;b.disabled=true;b.textContent="🎤 "+K("Listening…","듣고 있어요…");rmMsg(K("Read it out loud now!","지금 소리 내어 읽어요!"));
  micListen(txt,(sc,why)=>{if(!live())return;b.disabled=false;b.textContent="🎤 "+K("Check my reading","읽기 확인");
   if(sc==null){b.remove();rmMsg(K("The microphone can't be used here. Tap 'I read it!' instead.","여기서는 마이크를 쓸 수 없어요. '다 읽었어요'를 눌러 주세요."));return}
   if(sc>=.6){S.mic=1;sfx("star");rmMsg(K("I heard you read it! 🎉","잘 읽었어요! 🎉"));const d=$("rmDone");if(d)d.classList.add("nudge")}
   else rmMsg(why==="ok"?K("That sounded a little different. Try once more?","조금 다르게 들렸어요. 한 번 더 읽어 볼까요?"):K("I couldn't hear you. Try a little louder?","잘 안 들렸어요. 조금 더 크게 읽어 볼까요?"))})};
 if(lv===1)setTimeout(()=>{if(live()&&!S.ph)readAll(()=>{if(!S.ph){$("rmTip").textContent=K("Now you read it out loud!","이제 소리 내어 따라 읽어요!");sfx("tap")}})},450);
 if(lv===2)setTimeout(()=>{if(live()&&!S.ph&&!S.help){const b=$("rmSay");if(b)b.classList.add("nudge")}},12000);
}
function rmAsk(S){const m=S.m,q=$("rmQ"),live=()=>RM===S;
 const opts=shuffle([[m.ans[0],m.ans[1],1],...m.o.map(x=>[x[0],x[1],0])]);
 q.innerHTML=`<p class="rmask">❓ ${escH(m.q)}</p><div class="rmopts">${opts.map(([l,e,ok])=>`<button class="rmop" data-ok="${ok}">${e?`<span class="emo" aria-hidden="true">${e}</span>`:""}<b>${escH(l)}</b></button>`).join("")}</div>`;
 q.hidden=false;q.scrollIntoView({block:"nearest",behavior:"smooth"});
 if(rdLv()===1)narrate([m.q],null,"ko",{voice:"narrator"});
 q.querySelectorAll(".rmop").forEach(b=>b.onclick=()=>{if(!live()||b.disabled||S.ph===2)return;
  if(b.dataset.ok==="1"){S.ph=2;sfx("ok");burstAt(b);b.classList.add("right");q.querySelectorAll(".rmop").forEach(x=>x.disabled=true);
   rmMsg(S.miss?K("Yes! That's it.","맞아요!"):K("Right on the first try!","한 번에 맞혔어요!"));rmLog(S,false);
   setTimeout(()=>{if(!live())return;rmClose();reward(S.help||S.miss?3:5,4);S.done&&S.done()},1000)}
  else{S.miss++;sfx("bad");b.disabled=true;b.classList.add("wrong");rmMsg(K("Read the sentence again and choose.","문장을 다시 읽고 골라 봐요."));const t=$("rmText");if(t){t.classList.remove("pulse");void t.offsetWidth;t.classList.add("pulse")}}})}
/* ---- word review (today's adventure): read the word, tap its picture ---- */
function rmWords(done){let list=[];try{list=wbRound(.1).filter(w=>w.p).slice(0,5)}catch(e){}
 if(!list.length){done&&done();return}
 hush();let i=0,ok=0;const S={words:1};RM=S;const live=()=>RM===S;
 const next=()=>{if(!live())return;
  if(i>=list.length){rmClose();dayLog(D=>{D.words+=list.length});save();tdMark("words");done&&done(ok,list.length);return}
  const w=list[i],ds=[];for(const x of shuffle(wbDistract().filter(x=>x.t!==w.t&&x.p&&x.p!==w.p))){if(ds.length>=2)break;if(!ds.some(y=>y.p===x.p))ds.push(x)}
  const opts=shuffle([w,...ds]);let first=true,helped=false;
  $("rmCard").innerHTML=`<div class="rmhead"><b>🔤 ${K("Word review","낱말 복습")}</b><span class="rmlv">${i+1} / ${list.length}</span><button class="rmskip" id="rmSkip">${K("Stop","그만하기")}</button></div>
   <p class="rmtip">${K("Read the word, then tap its picture.","낱말을 읽고, 알맞은 그림을 눌러요.")}</p>
   <div class="rmword" lang="ko">${escH(w.t)}</div>
   <div class="rmopts pics">${opts.map(x=>`<button class="rmop pic" data-t="${escH(x.t)}" aria-label="${escH(x.t)}"><span class="emo">${x.p}</span></button>`).join("")}</div>
   <div class="rmacts"><button class="btn" id="rmSay">🔊 ${K("Hear it","들어 보기")}</button></div>
   <p class="rmmsg" id="rmMsg" aria-live="polite"></p>`;
  $("rmOv").hidden=false;
  $("rmSay").onclick=()=>{if(!live())return;helped=true;dayLog(D=>D.help++);say(w.t)};
  $("rmSkip").onclick=()=>{if(!live())return;hush();rmClose();done&&done(ok,i)};
  $("rmCard").querySelectorAll(".rmop").forEach(b=>b.onclick=()=>{if(!live()||b.disabled)return;
   if(b.dataset.t===w.t){if(first&&!helped){pgRec(w.t,true);ok++}sfx("ok");burstAt(b);b.classList.add("right");$("rmCard").querySelectorAll(".rmop").forEach(x=>x.disabled=true);say(w.t);i++;setTimeout(next,1100)}
   else{if(first)pgRec(w.t,false);first=false;sfx("bad");b.disabled=true;b.classList.add("wrong");rmMsg(K("Read the word again.","낱말을 다시 읽어 봐요."))}})};
 next()}
/* ---- read-aloud check (experimental): the browser's own speech recognition, if it has one ---- */
function micSR(){return window.SpeechRecognition||window.webkitSpeechRecognition||null}
function micOK(){return !!micSR()&&!!G.mic&&!G.micDead}
function micLev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=[];for(let j=0;j<=n;j++)p[j]=j;
 for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function micSim(heard,target){const n=s=>[...String(s).replace(/[^가-힣0-9]/g,"")];const x=n(heard),y=n(target);if(!y.length)return 0;return Math.max(0,1-micLev(x,y)/Math.max(x.length,y.length))}
function micListen(target,cb){const SR=micSR();let r=null,fin=false;const end=(sc,why)=>{if(fin)return;fin=true;try{r&&r.abort()}catch(e){}cb(sc,why)};
 try{r=new SR()}catch(e){end(null,"nosr");return}
 r.lang="ko-KR";r.interimResults=false;r.maxAlternatives=3;r.continuous=false;
 r.onresult=e=>{let best=0;const res=e.results&&e.results[0];if(res)for(let k=0;k<res.length;k++)best=Math.max(best,micSim(res[k].transcript,target));end(best,"ok")};
 r.onerror=e=>{const er=e&&e.error;if(er==="not-allowed"||er==="service-not-allowed"||er==="audio-capture"){G.micDead=1;save();end(null,er)}else end(0,er||"err")};
 r.onend=()=>setTimeout(()=>end(0,"end"),300);
 try{hush();r.start()}catch(e){end(null,"start")}
 setTimeout(()=>end(0,"timeout"),15000)}
/* ---- today's adventure (v29.2): one lap of every game except the story modes (or just one game, parent setting),
   three reading missions (or one story), five words. Everything here is a function declaration (the first renderAll runs before this block). ---- */
function tdLap(){return ["fish","mole","course","pair","rain","battle","train","fill"]}
function tdIsLap(){return G.tdLen!=="short"}
function tdFresh(){const k=dkey();if(!isObj(G.today)||G.today.d!==k)G.today={d:k,play:0,story:0,words:0,rm:0,paid:0,lap:{}};if(!isObj(G.today.lap))G.today.lap={};return G.today}
function tdLapN(T){return T&&isObj(T.lap)?tdLap().filter(g=>T.lap[g]).length:0}
function tdTotal(){return tdIsLap()?tdLap().length+2:3}
function tdCount(){const T=isObj(G.today)&&G.today.d===dkey()?G.today:null;return T?(tdIsLap()?tdLapN(T):(T.play?1:0))+(T.story?1:0)+(T.words?1:0):0}
function tdDone(){return tdCount()>=tdTotal()}
function tdChip(){const n=tdCount(),t=tdTotal();return `<span class="tdp${n>=t?" ok":""}">${n>=t?"✓":n+"/"+t}</span>`}
function tdHudSet(){const b=$("tdHud");if(!b)return;const n=tdCount(),t=tdTotal();b.textContent=n>=t?"☀️ ✓":"☀️ "+n+"/"+t;b.classList.toggle("ok",n>=t);b.setAttribute("aria-label",K("Today's adventure","오늘의 모험")+" "+n+"/"+t)}
function tdName(g){return g==="course"?K("Free course","모험 코스"):g==="battle"?K("Practice battle","연습 배틀"):L(PGAMES[g].n)}
function tdIc(g){return g==="course"?"🌀":g==="battle"?"⚔️":PGAMES[g].ic}
/* k = "play" | "story" | "words"; g = which game finished (lap mode counts each game once) */
function tdMark(k,g){const T=tdFresh(),before=tdCount(),lapB=tdLapN(T);
 if(k==="play"&&g&&tdLap().includes(g))T.lap[g]=1;
 T[k]=1;save();const n=tdCount(),t=tdTotal();if(n===before)return;
 try{renderExtras()}catch(e){}tdHudSet();
 const nm=k==="play"?(g?tdName(g):K("one game","놀이 한 판")):{story:K("story reading","이야기 읽기"),words:K("word review","낱말 복습")}[k];
 if(n>=t){dayLog(D=>{D.td=1});save();queue(tdCelebrate);return}
 toast("☀️ "+K("Today's adventure: ","오늘의 모험: ")+nm+" ✓ ("+n+"/"+t+")");
 if(tdIsLap()&&lapB<4&&tdLapN(T)>=4)setTimeout(()=>toast("🙆 "+K("Halfway through the games! A sip of water and a big stretch.","게임 절반 왔어요! 물 한 모금 마시고 기지개 쭉!")),2800)}
function tdPgLv(g){let lv=pgRecLv(g);if(rdLv()===3){const j=PGAMES[g].lv.findIndex(k=>(LADDER[k]&&LADDER[k].word)||FILL_LV[k]);if(j>=0)lv=Math.max(lv,j+1)}return lv}
function tdGame(){const gs=Object.keys(PGAMES),g=gs.slice().sort((a,b)=>pgSum(a)-pgSum(b)||(G.pgLast===a)-(G.pgLast===b))[0];return {g,lv:tdPgLv(g)}}
function tdNext(){const T=tdFresh();return tdLap().find(g=>!T.lap[g])||null}
function tdStory(){const b1=typeof BOOKS!=="undefined"&&BOOKS.find(b=>b.id==="b1");
 if(b1&&BD.b1&&!bookDone("b1"))return {kind:"book",name:"📖 〈"+(G.lang==="ko"?b1.t:(b1.te||b1.t))+"〉"};
 const cs=G.cases||{};let i=KC.findIndex((c,j)=>kzUnlocked(j)&&!cs[c.id]);
 if(i<0){let bs=9;KC.forEach((c,j)=>{if(kzUnlocked(j)&&(cs[c.id]||0)<bs){bs=cs[c.id]||0;i=j}});if(i<0)i=0}
 return {kind:"case",i,name:"🔎 "+K("Case ","사건 ")+(i+1)+" · "+L(KC[i].t)}}
/* a game started from the card comes back to the card when it closes */
var TDR=null;
function tdStart(g){$("tdOv").hidden=true;TDR=g;if(g==="course")startRun();else if(g==="battle")practiceBattle();else pgPlay(g,tdPgLv(g),{td:true})}
function tdBack(g){const open=id=>{const e=$(id);return !!e&&!e.hidden};
 if(["duelOv","runOv","pgOv","caseOv","bookOv","rmOv"].some(open)){if(g)TDR=g;return}
 /* a level-up screen came up first: open the card after it is closed (never two screens at once) */
 if(open("lvOv")||open("evoOv")){queue(()=>tdBack());return}
 /* all done: the queued celebration shows by itself; never cover it with the card */
 if(tdDone()){const w=$("tdCard").querySelector(".tdwin");if(!tdFresh().paid||(w&&open("tdOv")))return}tdOpen()}
function tdOpen(){const T=tdFresh(),st=tdStory(),n=tdCount(),t=tdTotal(),lap=tdIsLap();
 const row=(k,ic,title,sub,done,extra)=>`<li class="${done?"done":""}"><span class="ic" aria-hidden="true">${ic}</span><div><b>${title}</b><small>${sub}</small>${extra||""}</div><button class="btn${done?"":" pri"}" data-td="${k}">${done?"✓ "+K("Again","다시"):K("Go","시작")}</button></li>`;
 let playRow;
 if(lap){const ln=tdLapN(T),nx=tdNext();
  const dots=`<div class="tdlap">${tdLap().map(g=>`<button class="tdg${T.lap[g]?" on":""}${g===nx?" nx":""}" data-tg="${g}" aria-label="${escH(tdName(g))}${T.lap[g]?" ✓":""}"><span>${tdIc(g)}</span>${T.lap[g]?"<i>✓</i>":""}</button>`).join("")}</div>`;
  playRow=`<li class="lap${ln>=tdLap().length?" done":""}"><span class="ic" aria-hidden="true">🎮</span><div><b>${K("One lap of the games","게임 한 바퀴")} <span class="tdn">${ln}/${tdLap().length}</span></b><small>${nx?K("Next: ","다음: ")+tdIc(nx)+" "+tdName(nx):K("Every game done!","게임을 모두 했어요!")}</small>${dots}${ln>=4&&ln<tdLap().length?`<p class="tdrest">🙆 ${K("Halfway! Rest your eyes for a moment, then carry on.","절반 왔어요! 잠깐 눈을 쉬고 이어서 해요.")}</p>`:""}</div><button class="btn${nx?" pri":""}" data-td="lap">${nx?K("Play","하기")+" ▶":"✓ "+K("Again","다시")}</button></li>`}
 else{const R=tdGame(),P=PGAMES[R.g];playRow=row("play",P.ic,K("One game","놀이 한 판"),L(P.n)+" · "+K("level ","")+R.lv+K("","단계"),T.play)}
 $("tdCard").innerHTML=`<div class="tdhead"><h2>☀️ ${K("Today's adventure","오늘의 모험")}</h2><button class="btn" id="tdX">${K("Close","닫기")}</button></div>
  <p class="tdsub">${lap?K("About 25–35 minutes. You can split it up during the day.","약 25~35분. 하루 중에 나눠서 해도 괜찮아요."):K("About 10–15 minutes. Do three things and you're done for today!","10~15분이면 끝! 세 가지를 하면 오늘 모험 완료예요.")} · <b>${n}/${t}</b></p>
  <ol class="tdlist">
   ${playRow}
   ${row("story","📖",G.rmOff?K("Read one story","이야기 한 편 읽기"):K("3 reading missions","읽기 미션 3개"),st.name+(G.rmOff?"":" · "+Math.min(3,T.rm||0)+"/3"),T.story)}
   ${row("words","🔤",K("Review 5 words","낱말 5개 복습"),K("Word level ","낱말 레벨 ")+(G.wl||1),T.words)}
  </ol>
  ${n>=t?`<p class="tddone">🎉 ${K("All done for today. Great reading!","오늘 모험 완료! 정말 잘 읽었어요.")}</p>`:""}`;
 $("tdOv").hidden=false;
 $("tdX").onclick=()=>{sfx("tap");TDR=null;$("tdOv").hidden=true;renderAll()};
 $("tdCard").querySelectorAll("[data-tg]").forEach(b=>b.onclick=()=>{sfx("tap");tdStart(b.dataset.tg)});
 $("tdCard").querySelectorAll("[data-td]").forEach(b=>b.onclick=()=>{sfx("tap");const k=b.dataset.td;
  if(k==="lap"){tdStart(tdNext()||tdLap()[0]);return}
  $("tdOv").hidden=true;
  if(k==="play"){const R=tdGame();TDR="pg";pgPlay(R.g,R.lv,{td:true})}
  else if(k==="story"){if(st.kind==="book")openBook("b1");else{openCases();caseStart(st.i)}}
  else rmWords(()=>{if(!tdDone())tdOpen()})})}
function tdCelebrate(){const T=tdFresh();if(!tdDone())return;const first=!T.paid;T.paid=1;save();
 $("tdCard").innerHTML=`<div class="tdwin"><div class="tdsun" aria-hidden="true">☀️</div><h2>${K("Today's adventure complete!","오늘의 모험 완료!")}</h2>
  <p>${K("Great reading today. That's enough for now: rest your eyes and come back tomorrow!","오늘도 멋지게 읽었어요. 오늘은 여기까지! 눈도 쉬고, 내일 또 만나요.")}</p><button class="btn pri" id="tdX">${K("OK","좋아요")}</button></div>`;
 $("tdOv").hidden=false;$("tdX").onclick=()=>{sfx("tap");hush();$("tdOv").hidden=true;renderAll()};sfx("evo");
 if(first)reward(30,30,10);narrate([K("Today's adventure is complete! Great job.","오늘의 모험 완료! 정말 잘했어요.")],null,null,{voice:"mentor"})}
/* ---- parent page: this week ---- */
function weekTips(s){const lv=rdLv(),out=[];
 if(s.rm<6){out.push(K("After 6 or more reading missions in a week, suggestions appear here.","한 주에 읽기 미션을 6개 이상 하면 여기에 맞춤 제안이 나와요."));return out}
 const solo=s.solo/s.rm,q=s.qn?s.qok/s.qn:1;
 if(q<.6)out.push(K("The quick questions are often missed: reading aloud may be fine while the meaning slips. After a mission, ask 'What happened?'"+(lv===3?" Reading help 2 gives shorter sentences.":""),"내용 확인 문제를 자주 틀려요. 소리 내어 읽기는 되는데 뜻을 놓치고 있을 수 있어요. 미션 뒤에 '무슨 일이 있었어?' 하고 물어봐 주세요."+(lv===3?" 읽기 도움을 2단계로 바꾸면 짧은 문장이 나와요.":"")));
 if(solo<.5)out.push(K("'Read to me' is used a lot, so the sentences may feel long right now."+(lv===3?" Try reading help 2.":""),"'읽어 주기'를 자주 눌러요. 지금은 문장이 길게 느껴질 수 있어요."+(lv===3?" 읽기 도움 2단계를 추천해요.":"")));
 if(q>=.9&&solo>=.8)out.push(lv<3?K("Reading well without help. Try reading help 3 (read alone).","도움 없이 잘 읽고 있어요. 읽기 도움을 3단계 '혼자 읽기'로 올려 보세요."):K("Reading long sentences alone and understanding them. Try the level test in the playground to raise the word level.","긴 문장도 혼자 읽고 이해하고 있어요. 놀이터의 레벨 테스트로 낱말 레벨을 올려 보세요."));
 if(s.skip>s.rm*.3)out.push(K("Missions are often skipped. Read one together, or turn missions off for a while in settings.","미션을 자주 건너뛰어요. 한두 번은 함께 읽어 주거나, 설정에서 잠시 꺼 두세요."));
 if(!out.length)out.push(K("Steady progress. Keep the same settings this week.","꾸준히 잘하고 있어요. 이번 주는 지금 설정 그대로 두세요."));
 return out}
function renderWeek(){const box=$("pWeek");if(!box)return;dayRec();
 const days=[];for(let k=6;k>=0;k--){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-k);const key=dkey(d);days.push({d,key,D:isObj(G.days[key])?G.days[key]:{}})}
 const sum=f=>days.reduce((a,x)=>a+(+f(x.D)||0),0);
 const s={min:Math.round(sum(D=>D.min)),rm:sum(D=>D.rm),solo:sum(D=>D.solo),qn:sum(D=>D.qn),qok:sum(D=>D.qok),skip:sum(D=>D.skip),games:sum(D=>D.games),td:days.filter(x=>x.D.td).length};
 const wrong={};days.forEach(x=>{const w=isObj(x.D.wrong)?x.D.wrong:{};for(const t in w)wrong[t]=(wrong[t]||0)+(+w[t]||0)});
 const top=Object.entries(wrong).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,8),ks=new Set(days.map(x=>x.key)),fresh=Object.keys(isObj(G.mdate)?G.mdate:{}).filter(t=>ks.has(G.mdate[t]));
 const mx=Math.max(15,...days.map(x=>+x.D.min||0)),WD=G.lang==="ko"?["일","월","화","수","목","금","토"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],pct=(a,b)=>b?Math.round(a/b*100)+"%":"–";
 box.innerHTML=`<h2>📅 ${K("This week (last 7 days)","이번 주 (최근 7일)")}</h2>
  <div class="wkchart" role="img" aria-label="${K("Minutes played per day: ","하루 놀이 시간: ")+days.map(x=>WD[x.d.getDay()]+" "+Math.round(+x.D.min||0)).join(", ")}">${days.map((x,j)=>{const v=+x.D.min||0;
   return `<div class="wkcol${j===6?" today":""}"><span class="wkv">${v>=1?Math.round(v):""}</span><i style="height:${v?Math.max(3,v/mx*78):0}%"></i><span class="wkd">${WD[x.d.getDay()]}</span></div>`}).join("")}</div>
  <p class="wkcap">${K(`Minutes played each day · ${s.min} min in total`,`하루 놀이 시간(분) · 합계 ${s.min}분`)}</p>
  <div class="pstats wk">
   <div><b>${s.td}/7</b>${K("days of today's adventure","오늘의 모험 완료")}</div>
   <div><b>${s.rm}</b>${K("reading missions","읽기 미션")}</div>
   <div><b>${pct(s.solo,s.rm)}</b>${K("read without help","도움 없이 읽음")}</div>
   <div><b>${pct(s.qok,s.qn)}</b>${K("right on first try","내용 확인 첫 번에 맞힘")}</div>
   <div><b>${s.games}</b>${K("games","놀이")}</div></div>
  ${s.skip?`<p class="wkline">⏭️ ${K(`Skipped missions: ${s.skip}`,`건너뛴 미션: ${s.skip}개`)}</p>`:""}
  <p class="wkline">🌱 ${K("Newly learned","새로 익힌 글자·낱말")}: ${fresh.length?fresh.slice(0,12).map(escH).join(", ")+(fresh.length>12?` +${fresh.length-12}`:""):K("none yet","아직 없음")}</p>
  <p class="wkline">🔁 ${K("Needs practice","더 연습할 것")}: ${top.length?top.map(([t,n])=>`${escH(t)} (${n})`).join(", "):K("nothing missed this week","이번 주에 틀린 것 없음")}</p>
  <div class="wktips">${weekTips(s).map(t=>`<p>💡 ${t}</p>`).join("")}</div>
  <p class="rule">${K("Reading help now: ","지금 읽기 도움: ")}${K(RDN[rdLv()][0],RDN[rdLv()][1])}${G.rmOff?K(" · missions off"," · 읽기 미션 꺼짐"):""}</p>`}
/* ---- backup code: the whole saved game as text the parent can keep in their notes ---- */
function b64e(u8){let s="";for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s)}
function b64d(str){const s=atob(str),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
async function bkEncode(){const raw=new TextEncoder().encode(JSON.stringify(G));
 if(window.CompressionStream){try{const st=new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw"));return "HG2."+b64e(new Uint8Array(await new Response(st).arrayBuffer()))}catch(e){}}
 return "HG1."+b64e(raw)}
async function bkDecode(code){code=String(code||"").replace(/\s+/g,"");const tag=code.slice(0,4);let bytes;
 if(tag==="HG1.")bytes=b64d(code.slice(4));
 else if(tag==="HG2."){if(!window.DecompressionStream)throw new Error("old");const st=new Blob([b64d(code.slice(4))]).stream().pipeThrough(new DecompressionStream("deflate-raw"));bytes=new Uint8Array(await new Response(st).arrayBuffer())}
 else throw new Error("tag");
 const o=JSON.parse(new TextDecoder().decode(bytes));if(!isObj(o)||!("char" in o||"lv" in o||"coins" in o))throw new Error("shape");return o}
async function bkMakeUI(){const box=$("bkBox");if(!box)return;box.innerHTML=`<small>${K("Making the code…","코드를 만드는 중…")}</small>`;let code;
 try{code=await bkEncode()}catch(e){box.innerHTML=`<small>${K("Could not make the code.","코드를 만들지 못했어요.")}</small>`;return}
 if(!$("bkBox"))return;
 box.innerHTML=`<textarea id="bkTxt" readonly rows="3" spellcheck="false" aria-label="${K("Backup code","백업 코드")}"></textarea><div class="tbtns"><button class="btn pri" id="bkCopy">📋 ${K("Copy","복사하기")}</button></div><small id="bkNote">${K(`${code.length} characters`,`${code.length}자`)} · ${new Date().toLocaleDateString(G.lang==="ko"?"ko-KR":"en-AU")}</small>`;
 const ta=$("bkTxt");ta.value=code;
 $("bkCopy").onclick=async()=>{let ok=false;try{await navigator.clipboard.writeText(code);ok=true}catch(e){}if(!ok){ta.focus();ta.select();try{ok=document.execCommand("copy")}catch(e){}}
  $("bkNote").textContent=ok?K("Copied! Paste it into your notes to keep it.","복사했어요! 메모장에 붙여 넣어 보관하세요."):K("Select all the text above and copy it.","위 글자를 길게 눌러 전체 선택한 뒤 복사하세요.")}}
function bkLoadUI(){const box=$("bkBox");if(!box)return;let armed=null;
 box.innerHTML=`<textarea id="bkIn" rows="3" spellcheck="false" placeholder="HG2.…" aria-label="${K("Paste the backup code","백업 코드 붙여 넣기")}"></textarea><div class="tbtns"><button class="btn pri" id="bkGo">📥 ${K("Restore","불러오기")}</button></div><small id="bkNote">${K("This replaces the progress on this device.","지금 이 기기의 기록이 코드 속 기록으로 바뀌어요.")}</small>`;
 $("bkGo").onclick=async()=>{const note=$("bkNote"),raw=$("bkIn").value.trim();let o;
  try{o=await bkDecode(raw)}catch(e){note.textContent=e&&e.message==="old"?K("This browser can't open this code. Please update the browser.","이 브라우저는 이 코드를 열 수 없어요. 브라우저를 업데이트해 주세요."):K("That code doesn't look right. Copy the whole code again.","코드가 올바르지 않아요. 코드 전체를 다시 복사해 주세요.");return}
  const sum=K(`Level ${o.lv||1} · ${o.coins||0} coins · ${Object.keys(isObj(o.books)?o.books:{}).length} books · ${Object.keys(isObj(o.cases)?o.cases:{}).length} cases`,`레벨 ${o.lv||1} · 코인 ${o.coins||0} · 책 ${Object.keys(isObj(o.books)?o.books:{}).length}권 · 사건 ${Object.keys(isObj(o.cases)?o.cases:{}).length}개`);
  if(armed!==raw){armed=raw;$("bkGo").classList.add("warn");note.textContent=sum+" · "+K("Tap again to replace the current progress.","한 번 더 누르면 지금 기록을 이걸로 바꿔요.");return}
  try{localStorage.setItem("hiq2",JSON.stringify(o))}catch(e){note.textContent=K("Could not save on this device.","이 기기에 저장하지 못했어요.");return}
  G=o;note.textContent=K("Restored! Restarting…","불러왔어요! 다시 시작해요…");setTimeout(()=>location.reload(),700)}}
/* ---- hooks into the existing game ---- */
var _pgRec0=pgRec;pgRec=function(t,ok){let was=false;try{was=wbKnown(t)}catch(e){}_pgRec0(t,ok);
 if(!ok)dayLog(D=>{D.wrong[t]=(D.wrong[t]||0)+1});try{if(!was&&wbKnown(t)){if(!isObj(G.mdate))G.mdate={};if(!G.mdate[t])G.mdate[t]=dkey()}}catch(e){}};
var _pgResult0=pgResult;pgResult=function(){const S=PGS;_pgResult0.apply(this,arguments);dayLog(D=>{D.games++});save();
 if(S&&!S.o.stage)tdMark("play",S.g);
 if(S&&S.o.td){const hb=$("pgHubB"),g=S.g,lv=S.lv;if(hb){hb.className="btn pri";hb.textContent="☀️ "+K("Today's adventure","오늘의 모험");hb.onclick=()=>{sfx("tap");pgStop();$("pgOv").hidden=true;TDR=null;renderAll();tdBack()}}
  const ag=$("pgAgain");if(ag)ag.onclick=()=>{sfx("tap");pgPlay(g,lv,{td:true})};const up=$("pgUp");if(up){up.className="btn";up.onclick=()=>{sfx("tap");pgPlay(g,lv+1,{td:true})}}}};
var _kzGo0=kzGo;kzGo=function(n){const K0=KZ;if(!K0)return;const idx=n===1?0:n===3?1:-1,M=RMS[K0.c.id];
 if(idx>=0&&M&&rmOn()){K0.rmd=K0.rmd||{};if(!K0.rmd[idx]){K0.rmd[idx]=1;rmShow(M[idx],{src:"case"},()=>{if(KZ===K0)kzGo(n)});return}}
 const ks=$("kzSay");if(ks)ks.classList.remove("nudge");_kzGo0(n);const rt=K0.rt;rdNudge("kzSay",()=>KZ===K0&&KZ.act===n&&KZ.rt===rt&&!KZ.busy)};
var _kzReport0=kzReport;kzReport=function(){const K0=KZ;if(!K0||K0.done)return;const M=RMS[K0.c.id];
 if(M&&rmOn()){K0.rmd=K0.rmd||{};if(!K0.rmd[2]){K0.rmd[2]=1;rmShow(M[2],{src:"case"},()=>{if(KZ===K0)kzReport()});return}}
 _kzReport0();if(!rmOn())tdMark("story")};
var _caseStart0=caseStart;caseStart=function(i){_caseStart0(i);["kzSay","kzHelp"].forEach(id=>{const b=$(id);if(b)b.addEventListener("click",()=>{b.classList.remove("nudge");dayLog(D=>{D.help++})})})};
var _bookEnter0=bookEnter;bookEnter=async function(){const b=BK;if(!b)return;const M=RMS[b.B.id];
 if(M&&rmOn()&&!b.rm0){b.rm0=1;hush();await new Promise(r=>rmShow(M[0],{src:"book"},r));if(BK!==b||!bAlive(b))return}
 return _bookEnter0.apply(this,arguments)};
var _goStep0=goStep;goStep=function(i){const b=BK,S=b&&b.D.steps[i],M=b&&RMS[b.B.id];
 if(M&&S&&S.type==="script"&&!b.rm1&&rmOn()){b.rm1=1;hush();rmShow(M[1],{src:"book"},()=>{if(BK===b)goStep(i)});return}
 return _goStep0(i)};
var _bFinish0=bFinish;bFinish=function(){const b=BK,M=b&&RMS[b.B.id];
 if(M&&rmOn()&&!b.rm2){b.rm2=1;hush();rmShow(M[2],{src:"book"},()=>{if(BK===b)bFinish()});return}
 _bFinish0();if(!rmOn())tdMark("story")};
var _readPage0=readPage;readPage=function(pages,i,o){const pr=_readPage0(pages,i,o),b=$("sbSay");
 if(b){b.addEventListener("click",()=>{b.classList.remove("nudge");dayLog(D=>{D.help++})});rdNudge("sbSay",()=>b.isConnected)}return pr};
var _showPartner0=showPartner;showPartner=function(){_showPartner0();try{renderWeek()}catch(e){console.error(e)}};
/* ---- start-up: defaults for a child who already reads well, tidy the new save fields ---- */
(()=>{for(const k in RMS)RMS[k].forEach((m,i)=>{m.id=k+"_"+i});
 if(![1,2,3].includes(+G.rd)){G.rd=3;if(G.autoRead===undefined)G.autoRead=false}else G.rd=+G.rd;
 dayPrune();if(!isObj(G.mdate))G.mdate={};if(!isObj(G.rmlog))G.rmlog={};
 G.mic=G.mic===true;G.rmOff=G.rmOff===true;tdFresh();save();
 const h=$("tdHud");if(h)h.onclick=()=>{if(overlayOpen())return;sfx("tap");tdOpen()};tdHudSet();try{renderExtras()}catch(e){}
 document.addEventListener("pointerdown",()=>{lastAct=Date.now()},true);document.addEventListener("keydown",()=>{lastAct=Date.now()},true);
 setInterval(()=>{if(document.hidden||Date.now()-lastAct>90000)return;const sp=$("splashOv");if(sp&&!sp.hidden)return;dayLog(D=>{D.min=Math.round((D.min+.25)*100)/100});save()},15000);
})();
/* ---- app mode: only the installable build has a manifest; there the game registers its offline worker ---- */
var APP={reg:null,waiting:null,prompt:null,done:0,total:0,had:false};
function appMode(){return !!document.querySelector('link[rel="manifest"]')}
function appStandalone(){try{return (window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true}catch(e){return false}}
function appIOS(){const ua=navigator.userAgent||"";return /iPad|iPhone|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)}
function appBar(html,actions){let b=$("appBar");if(!b){b=document.createElement("div");b.id="appBar";b.className="appbar";b.setAttribute("role","status");document.body.appendChild(b)}
 b.innerHTML=html+`<button class="x" aria-label="${K("Close","닫기")}">✕</button>`;b.hidden=false;b.querySelector(".x").onclick=()=>{b.hidden=true;actions&&actions.close&&actions.close()};
 if(actions&&actions.go){const g=b.querySelector("[data-go]");if(g)g.onclick=()=>{b.hidden=true;actions.go()}}}
function appUpdateBar(){if(!APP.waiting)return;const show=()=>appBar(`<p>✨ ${K("A new version is ready.","새 버전이 준비됐어요.")}</p><button class="btn pri" data-go>${K("Update","업데이트")}</button>`,{go:appApplyUpdate});
 /* show it right away on the start screen or the menus; wait while a game, book, case or mission is open */
 const busy=["libOv","stOv","dlgOv","chalOv","batOv","runOv","duelOv","caseOv","bookOv","pgOv","rmOv","lvOv","evoOv"].some(id=>{const e=$(id);return e&&!e.hidden});
 if(busy)queue(show);else show()}
function appApplyUpdate(){const w=APP.waiting;if(!w)return;try{save()}catch(e){}w.postMessage({type:"skip"})}
function appInstallHint(){if(G.appHint||appStandalone())return;
 const txt=appIOS()?K("Use it like an app: tap Share (□↑) in Safari, then 'Add to Home Screen'.","앱처럼 쓰기: Safari의 공유 버튼(□↑)을 누르고 '홈 화면에 추가'를 고르세요."):APP.prompt?K("Install it as an app on this device.","이 기기에 앱으로 설치할 수 있어요."):"";
 if(!txt)return;appBar(`<p>📲 ${txt}</p>${!appIOS()&&APP.prompt?`<button class="btn pri" data-go>${K("Install","설치")}</button>`:""}`,{go:appInstall,close:()=>{G.appHint=1;save()}})}
function appInstall(){const p=APP.prompt;if(!p)return;APP.prompt=null;try{p.prompt();p.userChoice.then(()=>{G.appHint=1;save()}).catch(()=>{})}catch(e){}}
function appStatusText(){if(!appMode())return K("This copy runs inside claude.ai. The installable version is in the app package.","지금은 claude.ai 안에서 실행 중이에요. 설치용 앱은 앱 패키지로 따로 제공돼요.");
 const st=appStandalone()?K("Installed on the home screen ✓","홈 화면 앱으로 실행 중 ✓"):K("Running in the browser","브라우저에서 실행 중");
 const off=!("serviceWorker" in navigator)?K("offline not supported here","이 브라우저는 오프라인 미지원"):APP.total?(APP.done>=APP.total?K("ready to use offline ✓","오프라인 사용 준비 완료 ✓"):K(`saving for offline ${APP.done}/${APP.total}`,`오프라인 저장 중 ${APP.done}/${APP.total}`)):navigator.serviceWorker.controller?K("ready to use offline ✓","오프라인 사용 준비 완료 ✓"):K("preparing offline use…","오프라인 준비 중…");
 return st+" · "+off}
(()=>{document.documentElement.classList.toggle("standalone",appStandalone());
 if(!appMode())return;
 if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol)){
  APP.had=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.register("sw.js").then(reg=>{APP.reg=reg;
   const watch=w=>{if(!w)return;w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller){APP.waiting=w;appUpdateBar()}})};
   if(reg.waiting&&navigator.serviceWorker.controller){APP.waiting=reg.waiting;appUpdateBar()}
   reg.addEventListener("updatefound",()=>watch(reg.installing));
   document.addEventListener("visibilitychange",()=>{if(!document.hidden)reg.update().catch(()=>{})});
  }).catch(()=>{});
  navigator.serviceWorker.addEventListener("message",e=>{const d=e.data||{};if(d.type==="cache"){APP.done=d.done;APP.total=d.total;const el=$("appSt");if(el)el.textContent=appStatusText()}});
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!APP.had){APP.had=true;return}if(APP.reloading)return;APP.reloading=true;location.reload()});
 }
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();APP.prompt=e});
 try{if(navigator.storage&&navigator.storage.persist&&appStandalone())navigator.storage.persisted().then(p=>{if(!p)return navigator.storage.persist()}).catch(()=>{})}catch(e){}
 if(!appStandalone()&&!G.appHint)setTimeout(()=>{if(!overlayOpen()&&$("splashOv").hidden)appInstallHint();else queue(appInstallHint)},6000);
})();


/* ===== v29.1: clue spots always visible (kept inside the visible picture, never under the hero) + parent tool to move spots ===== */
var LAY={drag:null};
/* keep every sparkle inside the part of the picture this screen shows (wide screens crop the top and bottom) */
function kzSpotsFit(){if(!KZ)return;const st=$("kzStage"),w=$("kzWorld"),sp=$("kzSpots");if(!st||!w||!sp)return;
 const W=st.clientWidth,H=st.clientHeight,ww=w.offsetWidth,wh=w.offsetHeight,L=parseFloat(w.style.left)||0,T=parseFloat(w.style.top)||0;if(!ww||!wh)return;
 const vx0=-L/ww*100,vx1=(W-L)/ww*100,vy0=-T/wh*100,vy1=(H-T)/wh*100;
 sp.querySelectorAll(".kzspot").forEach(b=>{const s=KZ.c.spots.find(x=>x.k===b.dataset.k);if(!s)return;const r=b.offsetWidth/2+6,mx=r/ww*100,my=r/wh*100;
  const x=Math.min(Math.max(s.x,vx0+mx),vx1-mx),y=Math.min(Math.max(s.y,vy0+my),vy1-my);b.style.left=x.toFixed(2)+"%";b.style.top=y.toFixed(2)+"%"});
 kzHeroAvoid()}
/* during the search the hero steps aside: left corner, else right corner, else out of the picture.
   The hero is measured from its layout box (offsetLeft/Top), not getBoundingClientRect: while it is still sliding out
   (a .9s transform transition) the on-screen box is shifted, which made a re-check think the spot was free and bring it back. */
function kzHeroAvoid(){const a=$("kzAL"),box=$("kzActors");if(!a||!box||!KZ)return;
 if(KZ.act!==1){a.classList.remove("kz-side","kz-away");return}
 const im=a.querySelector(".kzimg");if(im&&!im.complete)im.addEventListener("load",()=>setTimeout(kzHeroAvoid,30),{once:true});
 const B=box.getBoundingClientRect(),spots=[...document.querySelectorAll("#kzSpots .kzspot")].map(b=>b.getBoundingClientRect());
 const at=side=>{a.classList.toggle("kz-side",side);const x=B.left+a.offsetLeft+(im?im.offsetLeft:0),y=B.top+a.offsetTop+(im?im.offsetTop:0);
  return {l:x,t:y,r:x+(im?im.offsetWidth:a.offsetWidth),b:y+(im?im.offsetHeight:a.offsetHeight)}};
 const hit=r=>r.r>r.l&&spots.some(q=>Math.min(r.r,q.right)-Math.max(r.l,q.left)>6&&Math.min(r.b,q.bottom)-Math.max(r.t,q.top)>6);
 const mode=!hit(at(false))?"":!hit(at(true))?"side":"away";
 a.classList.toggle("kz-side",mode==="side");a.classList.toggle("kz-away",mode==="away")}
var _kzFit0=kzFit;kzFit=function(){_kzFit0();kzSpotsFit()};
var _kzSearch0=kzSearch;kzSearch=function(){_kzSearch0();layDecorate();requestAnimationFrame(kzSpotsFit);setTimeout(kzSpotsFit,120);setTimeout(kzHeroAvoid,950)};
/* ---- 🛠 parent tool: drag sparkles / scrolls onto the right object in the picture; saved on this device, copyable as a code ---- */
function layApply(){if(!isObj(G.lay))G.lay={};
 KC.forEach(c=>c.spots.forEach(s=>{if(s._x0==null){s._x0=s.x;s._y0=s.y}const v=(G.lay[c.id]||{})[s.k];if(Array.isArray(v)){s.x=+v[0];s.y=+v[1]}else{s.x=s._x0;s.y=s._y0}}));
 if(typeof BD!=="undefined")for(const id in BD){(BD[id].records||[]).forEach(r=>{if(!r._at0)r._at0=r.at.slice();const v=(G.lay[id]||{})[r.k];r.at=Array.isArray(v)?[+v[0],+v[1]]:r._at0.slice()})}}
function layOn(){return !!G.layEdit}
function layScene(){if(KZ&&KZ.act===1&&!$("caseOv").hidden)return {id:KZ.c.id,kind:"case"};if(typeof BK!=="undefined"&&BK&&!$("bookOv").hidden&&BK.D.steps[BK.si]&&BK.D.steps[BK.si].type==="explore")return {id:BK.B.id,kind:"book"};return null}
function layBar(){let b=$("layBar");const sc=layScene();if(!layOn()||!sc){if(b)b.remove();return}
 if(!b){b=document.createElement("div");b.id="layBar";b.className="laybar";document.body.appendChild(b)}
 b.innerHTML=`<b>🛠 ${K("Move the sparkles","위치 고치기")}</b><small>${K("Drag each sparkle onto its object in the picture.","반짝이를 끌어서 그림 속 물건 위에 놓아요.")}</small><button class="btn" data-l="copy">📋 ${K("Copy layout code","배치 코드 복사")}</button><button class="btn" data-l="reset">↩️ ${K("Reset this scene","이 장면 원래대로")}</button><button class="btn pri" data-l="end">${K("Done","끝내기")}</button><span class="laynote" id="layNote"></span>`;
 b.querySelector('[data-l="copy"]').onclick=layCopy;
 b.querySelector('[data-l="reset"]').onclick=()=>{const s=layScene();if(!s)return;delete G.lay[s.id];save();layApply();layRefresh()};
 b.querySelector('[data-l="end"]').onclick=()=>{G.layEdit=false;save();layRefresh()}}
function layRefresh(){document.querySelectorAll(".kzspot,.bhot").forEach(e=>e.classList.toggle("layed",layOn()));
 if(KZ&&KZ.act===1){const sp=$("kzSpots");if(sp)KZ.c.spots.forEach(s=>{const b=sp.querySelector(`[data-k="${s.k}"]`);if(b){b.style.left=s.x+"%";b.style.top=s.y+"%"}});kzSpotsFit()}
 if(typeof BK!=="undefined"&&BK)document.querySelectorAll("#bHots .bhot").forEach(h=>{const r=BK.D.records.find(x=>x.k===h.dataset.h);if(r){h.style.left=r.at[0]+"%";h.style.top=r.at[1]+"%"}});
 layDecorate();layBar()}
function layDecorate(){if(!layOn())return;document.querySelectorAll("#kzSpots .kzspot").forEach(b=>{const s=KZ&&KZ.c.spots.find(x=>x.k===b.dataset.k);b.classList.add("layed");b.dataset.lab=s?(s.decoy?K("decoy","가짜"):s.n):b.dataset.k});
 document.querySelectorAll("#bHots .bhot").forEach(h=>h.classList.add("layed"))}
async function layCopy(){const code=JSON.stringify(G.lay||{});let ok=false;try{await navigator.clipboard.writeText(code);ok=true}catch(e){}
 const n=$("layNote");if(n)n.textContent=ok?K("Copied. Send it to the developer.","복사했어요. 개발 담당에게 보내 주세요."):code}
/* dragging: one pointer handler for both case sparkles and book scrolls; a tap is not counted as finding a clue while editing */
document.addEventListener("pointerdown",e=>{if(!layOn())return;const el=e.target.closest&&e.target.closest(".kzspot,.bhot");const sc=layScene();if(!el||!sc)return;
 e.preventDefault();e.stopPropagation();const world=el.classList.contains("kzspot")?$("kzWorld"):$("bWorld");LAY.drag={el,world,sc,k:el.dataset.k||el.dataset.h,moved:false};try{el.setPointerCapture(e.pointerId)}catch(x){}},true);
document.addEventListener("pointermove",e=>{const d=LAY.drag;if(!d)return;const r=d.world.getBoundingClientRect();if(!r.width)return;
 const x=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),y=Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100));d.el.style.left=x.toFixed(1)+"%";d.el.style.top=y.toFixed(1)+"%";d.x=x;d.y=y;d.moved=true},true);
document.addEventListener("pointerup",e=>{const d=LAY.drag;if(!d)return;LAY.drag=null;e.stopPropagation();if(!d.moved)return;
 if(!isObj(G.lay))G.lay={};const o=G.lay[d.sc.id]||(G.lay[d.sc.id]={});o[d.k]=[+d.x.toFixed(1),+d.y.toFixed(1)];save();layApply();
 const n=$("layNote");if(n)n.textContent=`${d.k}: ${o[d.k][0]}, ${o[d.k][1]}`;if(d.sc.kind==="case")kzSpotsFit()},true);
document.addEventListener("click",e=>{if(!layOn())return;const el=e.target.closest&&e.target.closest(".kzspot,.bhot");if(el&&layScene()){e.preventDefault();e.stopPropagation()}},true);
setInterval(()=>{if(layOn())layBar();else{const b=$("layBar");if(b)b.remove()}},700);
(()=>{if(!isObj(G.lay))G.lay={};G.layEdit=G.layEdit===true;layApply();
 window.addEventListener("resize",()=>{if(KZ)setTimeout(kzSpotsFit,60)})})();


/* ===== v29.2: sound wakes up on iPad/iPhone too; today's adventure lap (course + practice battle hooks); sound check in settings ===== */
/* iOS counts a touch as a user gesture only when the finger lifts (touchend / click), not on pointerdown / touchstart
   (WebKit bug 149367). The old code woke the sound only on pointerdown, so on iPad the music and sound effects could
   stay locked. Wake it on every tap's end too, and start a 1-sample silent sound once (needed on older iOS). */
function auWake(){const c=auBus();if(!c)return;
 try{if(c.state!=="running"){const pr=c.resume();if(pr&&pr.catch)pr.catch(()=>{})}}catch(e){}
 if(!AU.unlk){try{const b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0);AU.unlk=1}catch(e){}}
 if(!AU.go){AU.go=true;try{auPreload()}catch(e){}}
 if(G.bgm!==false)musicTick()}
["touchend","click","keydown"].forEach(t=>document.addEventListener(t,auWake,true));
/* coming back to the app (home screen, another app, locked screen): the system may have paused the sound */
document.addEventListener("visibilitychange",()=>{if(document.hidden||!AU.go||!AC||AC.state==="running")return;try{const pr=AC.resume();if(pr&&pr.catch)pr.catch(()=>{})}catch(e){}});
function auBeep(){const c=auBus();if(!c)return;try{const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.type="triangle";o.frequency.setValueAtTime(660,t);o.frequency.setValueAtTime(880,t+.12);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.3,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.38);o.connect(g).connect(c.destination);o.start(t);o.stop(t+.42)}catch(e){}}
function auStatus(){const el=$("auStat");if(!el)return;const has=!!(window.AudioContext||window.webkitAudioContext),st=AC?AC.state:"";
 el.textContent=!has?K("This browser has no sound engine.","이 브라우저는 소리 기능이 없어요.")
  :st==="running"?"✓ "+K("Sound is on","소리 켜짐")+(G.bgm===false?K(" · music off"," · 음악 꺼 둠"):AU.cur?K(" · music playing"," · 음악 재생 중"):"")
  :K("The device is holding the sound. Tap the screen once more, and check the volume and silent mode.","기기가 소리를 막고 있어요. 화면을 한 번 더 누르고, 볼륨과 무음 모드를 확인해 주세요.")}
/* free course and practice battle count toward today's game lap (story stages do not); games started from the card return to it */
var _clearRun0=clearRun;clearRun=function(){const fresh=!!RUN&&!RUN.done,stage=!!STAGE;_clearRun0();if(fresh&&!stage){dayLog(D=>{D.games++});save();tdMark("play","course");tdRunBtn()}};
var _failRun0=failRun;failRun=function(){const fresh=!!RUN&&!RUN.done,stage=!!STAGE;_failRun0();if(fresh&&!stage){dayLog(D=>{D.games++});save();tdMark("play","course");tdRunBtn()}};
function tdRunBtn(){if(TDR!=="course")return;const b=document.querySelector("#rStage .rres .tbtns .btn");if(b)b.textContent="☀️ "+K("Today's adventure","오늘의 모험")}
var _closeRun0=closeRun;closeRun=function(){_closeRun0();if(TDR==="course"){TDR=null;setTimeout(()=>tdBack("course"),250)}};
var _duWin0=duWin;duWin=function(){const D=DU,fresh=!!D&&!D.done,stage=!!STAGE&&STAGE.kind==="battle";_duWin0();
 if(fresh&&D.practice&&!stage){dayLog(x=>{x.games++});save();tdMark("play","battle")}
 if(TDR==="battle"){const b=$("dDone");if(b)b.textContent="☀️ "+K("Today's adventure","오늘의 모험")+" →"}};
var _duLose0=duLose;duLose=function(){const D=DU,fresh=!!D&&!D.done,stage=!!STAGE&&STAGE.kind==="battle";_duLose0();if(fresh&&D.practice&&!stage){dayLog(x=>{x.games++});save();tdMark("play","battle")}};
var _duClose0=duClose;duClose=function(){_duClose0();if(TDR==="battle"){TDR=null;setTimeout(()=>tdBack("battle"),250)}};
/* a playground game started from the card: its back arrow returns to the card instead of the playground menu */
var _pgPlay0=pgPlay;pgPlay=function(g,lv,o){_pgPlay0(g,lv,o);if(o&&o.td){const b=$("pgBack");if(b)b.onclick=()=>{sfx("tap");pgStop();$("pgOv").hidden=true;TDR=null;renderAll();tdBack()}}};


/* ===== v29.3: 3D pictures for every emoji, game-feel package (home menu, parent lock, bigger search picture, result effects) ===== */
/* -- 3D emoji: Microsoft Fluent Emoji 3D (MIT licence, assets/img/emoji/LICENSE-fluent-emoji.txt), packed in
   8×8 sheets (assets/img/emoji/e0.webp, e1.webp ..., 160px cells; rebuild with tools/build_emoji_sheets.py). Any emoji written into the page becomes a <span class="emj"> showing its
   picture, so every device shows the same 3D look. Canvas drawings, inputs, SVG and .noemj parts are left alone. -- */
var EMJ_MAP={"1f0cf":[0,0],"1f300":[0,1],"1f305":[0,2],"1f308":[0,3],"1f309":[0,4],"1f30a":[0,5],"1f30b":[0,6],"1f30c":[0,7],"1f30d":[0,8],"1f310":[0,9],"1f319":[0,10],"1f327":[0,11],"1f32c":[0,12],"1f32d":[0,13],"1f32e":[0,14],"1f330":[0,15],"1f331":[0,16],"1f332":[0,17],"1f333":[0,18],"1f335":[0,19],"1f336":[0,20],"1f337":[0,21],"1f338":[0,22],"1f339":[0,23],"1f33a":[0,24],"1f33b":[0,25],"1f33d":[0,26],"1f341":[0,27],"1f342":[0,28],"1f343":[0,29],"1f344":[0,30],"1f345":[0,31],"1f346":[0,32],"1f347":[0,33],"1f348":[0,34],"1f349":[0,35],"1f34a":[0,36],"1f34b":[0,37],"1f34c":[0,38],"1f34d":[0,39],"1f34e":[0,40],"1f350":[0,41],"1f351":[0,42],"1f352":[0,43],"1f353":[0,44],"1f354":[0,45],"1f355":[0,46],"1f356":[0,47],"1f357":[0,48],"1f359":[0,49],"1f35a":[0,50],"1f35b":[0,51],"1f35c":[0,52],"1f35d":[0,53],"1f35e":[0,54],"1f35f":[0,55],"1f360":[0,56],"1f363":[0,57],"1f364":[0,58],"1f366":[0,59],"1f367":[0,60],"1f369":[0,61],"1f36a":[0,62],"1f36b":[0,63],"1f36c":[1,0],"1f36d":[1,1],"1f36e":[1,2],"1f36f":[1,3],"1f370":[1,4],"1f371":[1,5],"1f372":[1,6],"1f373":[1,7],"1f374":[1,8],"1f375":[1,9],"1f37c":[1,10],"1f37d":[1,11],"1f37f":[1,12],"1f380":[1,13],"1f381":[1,14],"1f382":[1,15],"1f384":[1,16],"1f385":[1,17],"1f386":[1,18],"1f388":[1,19],"1f389":[1,20],"1f392":[1,21],"1f3a0":[1,22],"1f3a1":[1,23],"1f3a2":[1,24],"1f3a3":[1,25],"1f3a4":[1,26],"1f3a8":[1,27],"1f3b2":[1,28],"1f3b3":[1,29],"1f3b5":[1,30],"1f3b8":[1,31],"1f3b9":[1,32],"1f3ba":[1,33],"1f3bb":[1,34],"1f3be":[1,35],"1f3c0":[1,36],"1f3c9":[1,37],"1f3ca":[1,38],"1f3cd":[1,39],"1f3d0":[1,40],"1f3d3":[1,41],"1f3d6":[1,42],"1f3db":[1,43],"1f3dd":[1,44],"1f3df":[1,45],"1f3e0":[1,46],"1f3e4":[1,47],"1f3e5":[1,48],"1f3e6":[1,49],"1f3e8":[1,50],"1f3eb":[1,51],"1f3ed":[1,52],"1f3f0":[1,53],"1f406":[1,54],"1f40a":[1,55],"1f40c":[1,56],"1f40d":[1,57],"1f410":[1,58],"1f411":[1,59],"1f414":[1,60],"1f418":[1,61],"1f419":[1,62],"1f41a":[1,63],"1f41b":[2,0],"1f41c":[2,1],"1f41d":[2,2],"1f41e":[2,3],"1f41f":[2,4],"1f420":[2,5],"1f421":[2,6],"1f422":[2,7],"1f424":[2,8],"1f426":[2,9],"1f427":[2,10],"1f428":[2,11],"1f42b":[2,12],"1f42c":[2,13],"1f42d":[2,14],"1f42e":[2,15],"1f42f":[2,16],"1f430":[2,17],"1f431":[2,18],"1f433":[2,19],"1f434":[2,20],"1f435":[2,21],"1f436":[2,22],"1f437":[2,23],"1f438":[2,24],"1f439":[2,25],"1f43a":[2,26],"1f43b":[2,27],"1f43b 200d 2744":[2,28],"1f43c":[2,29],"1f43e":[2,30],"1f43f":[2,31],"1f440":[2,32],"1f442":[2,33],"1f443":[2,34],"1f444":[2,35],"1f445":[2,36],"1f44d":[2,37],"1f44f":[2,38],"1f451":[2,39],"1f453":[2,40],"1f454":[2,41],"1f455":[2,42],"1f456":[2,43],"1f457":[2,44],"1f45b":[2,45],"1f45e":[2,46],"1f45f":[2,47],"1f462":[2,48],"1f46e":[2,49],"1f470":[2,50],"1f474":[2,51],"1f475":[2,52],"1f476":[2,53],"1f478":[2,54],"1f47b":[2,55],"1f47c":[2,56],"1f47d":[2,57],"1f485":[2,58],"1f48d":[2,59],"1f4a1":[2,60],"1f4a7":[2,61],"1f4aa":[2,62],"1f4bb":[2,63],"1f4c5":[3,0],"1f4cc":[3,1],"1f4ce":[3,2],"1f4cf":[3,3],"1f4d3":[3,4],"1f4da":[3,5],"1f4e6":[3,6],"1f4f1":[3,7],"1f4f7":[3,8],"1f4fa":[3,9],"1f50b":[3,10],"1f50d":[3,11],"1f511":[3,12],"1f512":[3,13],"1f525":[3,14],"1f528":[3,15],"1f52a":[3,16],"1f534":[3,17],"1f535":[3,18],"1f53a":[3,19],"1f54a":[3,20],"1f56f":[3,21],"1f576":[3,22],"1f577":[3,23],"1f578":[3,24],"1f58d":[3,25],"1f5fc":[3,26],"1f646":[3,27],"1f680":[3,28],"1f681":[3,29],"1f682":[3,30],"1f687":[3,31],"1f68c":[3,32],"1f68f":[3,33],"1f691":[3,34],"1f692":[3,35],"1f693":[3,36],"1f695":[3,37],"1f697":[3,38],"1f69a":[3,39],"1f69c":[3,40],"1f6a1":[3,41],"1f6aa":[3,42],"1f6b2":[3,43],"1f6bd":[3,44],"1f6c1":[3,45],"1f6cb":[3,46],"1f6cf":[3,47],"1f6e3":[3,48],"1f6f0":[3,49],"1f6f3":[3,50],"1f6f4":[3,51],"1f6f7":[3,52],"1f6fc":[3,53],"1f7e0":[3,54],"1f7e1":[3,55],"1f7e2":[3,56],"1f7e3":[3,57],"1f7e6":[3,58],"1f916":[3,59],"1f91d":[3,60],"1f921":[3,61],"1f927":[3,62],"1f934":[3,63],"1f935":[4,0],"1f941":[4,1],"1f944":[4,2],"1f94a":[4,3],"1f951":[4,4],"1f952":[4,5],"1f954":[4,6],"1f955":[4,7],"1f957":[4,8],"1f95a":[4,9],"1f95b":[4,10],"1f95c":[4,11],"1f95d":[4,12],"1f95e":[4,13],"1f95f":[4,14],"1f962":[4,15],"1f963":[4,16],"1f964":[4,17],"1f965":[4,18],"1f966":[4,19],"1f96a":[4,20],"1f96c":[4,21],"1f96d":[4,22],"1f96f":[4,23],"1f977":[4,24],"1f980":[4,25],"1f981":[4,26],"1f982":[4,27],"1f983":[4,28],"1f985":[4,29],"1f986":[4,30],"1f987":[4,31],"1f988":[4,32],"1f989":[4,33],"1f98a":[4,34],"1f98b":[4,35],"1f98c":[4,36],"1f98d":[4,37],"1f98e":[4,38],"1f98f":[4,39],"1f990":[4,40],"1f991":[4,41],"1f992":[4,42],"1f993":[4,43],"1f994":[4,44],"1f995":[4,45],"1f996":[4,46],"1f997":[4,47],"1f998":[4,48],"1f99a":[4,49],"1f99b":[4,50],"1f99c":[4,51],"1f99d":[4,52],"1f99e":[4,53],"1f99f":[4,54],"1f9a2":[4,55],"1f9a5":[4,56],"1f9a6":[4,57],"1f9a8":[4,58],"1f9a9":[4,59],"1f9ac":[4,60],"1f9ad":[4,61],"1f9b4":[4,62],"1f9b5":[4,63],"1f9b6":[5,0],"1f9b7":[5,1],"1f9c0":[5,2],"1f9c3":[5,3],"1f9c4":[5,4],"1f9c5":[5,5],"1f9c7":[5,6],"1f9ca":[5,7],"1f9d1":[5,8],"1f9d1 200d 1f33e":[5,9],"1f9d1 200d 1f373":[5,10],"1f9d1 200d 1f3a4":[5,11],"1f9d1 200d 1f3a8":[5,12],"1f9d1 200d 1f3eb":[5,13],"1f9d1 200d 1f680":[5,14],"1f9d1 200d 1f692":[5,15],"1f9d1 200d 2695":[5,16],"1f9d9":[5,17],"1f9da":[5,18],"1f9dc":[5,19],"1f9e0":[5,20],"1f9e2":[5,21],"1f9e3":[5,22],"1f9e4":[5,23],"1f9e5":[5,24],"1f9e6":[5,25],"1f9e9":[5,26],"1f9ee":[5,27],"1f9f1":[5,28],"1f9f5":[5,29],"1f9f8":[5,30],"1f9f9":[5,31],"1f9fa":[5,32],"1f9fb":[5,33],"1f9fc":[5,34],"1fa71":[5,35],"1fa80":[5,36],"1fa81":[5,37],"1fa82":[5,38],"1fa91":[5,39],"1fa9c":[5,40],"1fa9e":[5,41],"1fa9f":[5,42],"1faa5":[5,43],"1faa8":[5,44],"1fab0":[5,45],"1fab1":[5,46],"1fab2":[5,47],"1fab4":[5,48],"1fad0":[5,49],"1fad1":[5,50],"1fad6":[5,51],"23f0":[5,52],"23f3":[5,53],"2600":[5,54],"2601":[5,55],"2602":[5,56],"260e":[5,57],"2614":[5,58],"2615":[5,59],"26a1":[5,60],"26bd":[5,61],"26be":[5,62],"26c4":[5,63],"26ea":[6,0],"26f0":[6,1],"26f2":[6,2],"26f3":[6,3],"26f5":[6,4],"26f7":[6,5],"26f8":[6,6],"26fa":[6,7],"2702":[6,8],"2708":[6,9],"2709":[6,10],"270b":[6,11],"270f":[6,12],"2744":[6,13],"2764":[6,14],"2b50":[6,15],"2b55":[6,16],"1f31f":[6,17],"1f328":[6,18],"1f33c":[6,19],"1f33e":[6,20],"1f38a":[6,21],"1f396":[6,22],"1f3a9":[6,23],"1f3aa":[6,24],"1f3ad":[6,25],"1f3ae":[6,26],"1f3af":[6,27],"1f3c1":[6,28],"1f3c3":[6,29],"1f3c6":[6,30],"1f3dc":[6,31],"1f3ee":[6,32],"1f3f3":[6,33],"1f3f7":[6,34],"1f3f9":[6,35],"1f408":[6,36],"1f409":[6,37],"1f413":[6,38],"1f415":[6,39],"1f423":[6,40],"1f425":[6,41],"1f432":[6,42],"1f446":[6,43],"1f449":[6,44],"1f450":[6,45],"1f48c":[6,46],"1f48e":[6,47],"1f497":[6,48],"1f49b":[6,49],"1f4a4":[6,50],"1f4a8":[6,51],"1f4ab":[6,52],"1f4ac":[6,53],"1f4c1":[6,54],"1f4c2":[6,55],"1f4c3":[6,56],"1f4c4":[6,57],"1f4ca":[6,58],"1f4cb":[6,59],"1f4d2":[6,60],"1f4d6":[6,61],"1f4d8":[6,62],"1f4dc":[6,63],"1f4dd":[7,0],"1f4e2":[7,1],"1f4e5":[7,2],"1f4f0":[7,3],"1f4f2":[7,4],"1f4f8":[7,5],"1f501":[7,6],"1f507":[7,7],"1f508":[7,8],"1f50a":[7,9],"1f50e":[7,10],"1f513":[7,11],"1f518":[7,12],"1f51f":[7,13],"1f524":[7,14],"1f526":[7,15],"1f529":[7,16],"1f52e":[7,17],"1f530":[7,18],"1f531":[7,19],"1f537":[7,20],"1f53c":[7,21],"1f570":[7,22],"1f573":[7,23],"1f575":[7,24],"1f58a":[7,25],"1f58b":[7,26],"1f58c":[7,27],"1f5bc":[7,28],"1f5d1":[7,29],"1f5e1":[7,30],"1f5fa":[7,31],"1f604":[7,32],"1f60b":[7,33],"1f61e":[7,34],"1f61f":[7,35],"1f620":[7,36],"1f622":[7,37],"1f628":[7,38],"1f634":[7,39],"1f6ab":[7,40],"1f6d6":[7,41],"1f6e0":[7,42],"1f6e1":[7,43],"1f6e4":[7,44],"1f7eb":[7,45],"1f90d":[7,46],"1f917":[7,47],"1f929":[7,48],"1f932":[7,49],"1f945":[7,50],"1f947":[7,51],"1f9ab":[7,52],"1f9e1":[7,53],"1f9ea":[7,54],"1f9ed":[7,55],"1f9f4":[7,56],"1f9f6":[7,57],"1f9ff":[7,58],"1fa79":[7,59],"1fa83":[7,60],"1fa84":[7,61],"1fa93":[7,62],"1fa99":[7,63],"1faa2":[8,0],"1faaa":[8,1],"1faad":[8,2],"1fab5":[8,3],"1fab6":[8,4],"1fae7":[8,5],"1faf1":[8,6],"21a9":[8,7],"23ed":[8,8],"2694":[8,9],"2699":[8,10],"26ab":[8,11],"26cf":[8,12],"2705":[8,13],"2714":[8,14],"2728":[8,15],"274c":[8,16],"2753":[8,17],"2754":[8,18],"2795":[8,19],"27a1":[8,20],"2b05":[8,21],"2b06":[8,22],"2b1c":[8,23],"1f3d9":[8,24],"1f3e1":[8,25],"1f6a9":[8,26]};
var EMJ={re:null,bad:{},on:true};
function emjKey(s){const k=[];for(const ch of s){const c=ch.codePointAt(0);if(c!==0xfe0f)k.push(c.toString(16))}return k.join(" ")}
function emjBuild(){const keys=Object.keys(EMJ_MAP).sort((a,b)=>b.split(" ").length-a.split(" ").length||b.length-a.length);
 EMJ.re=new RegExp("(?:"+keys.map(k=>k.split(" ").map(c=>"\\u{"+c+"}\\uFE0F?").join("")).join("|")+")","gu")}
function emjSpan(e,v){const s=document.createElement("span");s.className="emj s"+v[0];s.setAttribute("role","img");s.setAttribute("aria-label",e);s.dataset.e=e;
 s.style.backgroundImage="url(assets/img/emoji/e"+v[0]+".webp)";s.style.backgroundPosition=((v[1]%8)*100/7).toFixed(3)+"% "+(Math.floor(v[1]/8)*100/7).toFixed(3)+"%";return s}
function emjSwapText(t){const s=t.nodeValue;if(!s||s.length>4000)return;EMJ.re.lastIndex=0;let m,last=0,f=null;
 while((m=EMJ.re.exec(s))){const v=EMJ_MAP[emjKey(m[0])];if(!v||EMJ.bad[v[0]])continue;f=f||document.createDocumentFragment();
  if(m.index>last)f.appendChild(document.createTextNode(s.slice(last,m.index)));f.appendChild(emjSpan(m[0],v));last=m.index+m[0].length}
 if(!f)return;if(last<s.length)f.appendChild(document.createTextNode(s.slice(last)));t.parentNode.replaceChild(f,t)}
/* speech: split text into sentences, but a full stop right before a closing quote and "라고/하고..." does not end the sentence
   ("설명서에 '지붕을 먼저 올려요.'라고 쓰여 있었어요." stays one line instead of two broken halves) */
function sentSplit(p,q){const P={".":"\u0001","!":"\u0002","?":"\u0003"},B={"\u0001":".","\u0002":"!","\u0003":"?"};
 const s=String(p).replace(/[.!?](?=['’」』]+\s?(?:이?라(?:고|며|는|니)|하(?:고|며|는|면서)|고\s))/g,m=>P[m]);
 return (s.match(q?/[^.!?]+[.!?]*["”]?/g:/[^.!?]+[.!?]*/g)||[s]).map(x=>x.replace(/[\u0001-\u0003]/g,c=>B[c]))}
/* speech: how a blank (___) is read aloud in the case deduction step. The particle after the blank was written for the
   answer word, so it is fixed for "무엇": "커다란 ___로" → "커다란 무엇으로", "___ 글씨" → "무슨 글씨", "대회에 ___." → "대회에…" */
function blankRead(s){const P={"로":"으로","를":"을","는":"은","가":"이","와":"과","랑":"이랑","라고":"이라고","야":"이야","예요":"이에요"};
 return String(s).replace(/___(?=\s+[가-힣])/g,"무슨").replace(/___(라고|로|를|는|가|와|랑|야|예요)/g,(m,p)=>"무엇"+P[p]).replace(/___(?=['’]?\s*[.!?…]|$)/g,"…").replace(/___/g,"무엇").replace(/…\./g,"…")}
/* text of an element with the pictures turned back into emoji characters (for tests and any code that reads a label) */
function emjText(el){if(!el)return "";const c=el.cloneNode(true);c.querySelectorAll(".emj").forEach(x=>x.replaceWith(document.createTextNode(x.dataset.e||"")));return c.textContent}
var EMJ_SKIP=/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|SELECT|TITLE|CANVAS|CODE)$/;
function emjBlocked(el){for(let p=el;p&&p.nodeType===1;p=p.parentNode){if(EMJ_SKIP.test(p.nodeName)||p.namespaceURI==="http://www.w3.org/2000/svg"||p.classList.contains("noemj"))return true}return false}
function emjScan(root){if(!EMJ.on||!EMJ.re||!root||!root.parentNode)return;
 if(root.nodeType===3){if(!emjBlocked(root.parentNode))emjSwapText(root);return}
 if(root.nodeType!==1||emjBlocked(root))return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeType===3?NodeFilter.FILTER_ACCEPT:(EMJ_SKIP.test(n.nodeName)||n.namespaceURI==="http://www.w3.org/2000/svg"||n.classList.contains("noemj"))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP});
 const list=[];let n;while((n=w.nextNode()))list.push(n);list.forEach(t=>{if(t.parentNode)emjSwapText(t)})}
/* a sheet that cannot load (offline before it was saved): show the normal emoji for it instead */
function emjSheets(){const n=Math.max(...Object.values(EMJ_MAP).map(v=>v[0]))+1;for(let i=0;i<n;i++){const im=new Image();
 im.onerror=()=>{EMJ.bad[i]=1;document.querySelectorAll(".emj.s"+i).forEach(e=>e.replaceWith(document.createTextNode(e.dataset.e)))};im.src="assets/img/emoji/e"+i+".webp"}}
(()=>{try{emjBuild();emjSheets();emjScan(document.body);
 new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")emjScan(m.target);else m.addedNodes.forEach(emjScan)}}).observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){EMJ.on=false;console.error(e)}})();
/* -- home menu: one big "today's adventure" button first; course, practice battle and shop move under "More" -- */
var _renderExtras0=renderExtras;renderExtras=function(){_renderExtras0();const ex=$("extras");if(!ex)return;
 const t=ex.querySelector('[data-x="today"]');
 if(t){t.classList.add("big");const nx=tdIsLap()?tdNext():null,sub=document.createElement("small");sub.className="xsub";
  sub.textContent=tdDone()?K("All done for today!","오늘 모험 완료!"):nx?K("Next: ","다음: ")+tdIc(nx)+" "+tdName(nx):K("Tap to start","눌러서 시작");t.appendChild(sub)}
 ["course","battle","shop"].forEach(k=>{const b=ex.querySelector(`[data-x="${k}"]`);if(b)b.classList.add("xmore")});
 const m=document.createElement("button");m.className="xbtn xm";m.dataset.x="more";m.setAttribute("aria-expanded",ex.classList.contains("open")?"true":"false");
 m.innerHTML=`<span class="ic">${ex.classList.contains("open")?"🔼":"➕"}</span>${ex.classList.contains("open")?K("Less","접기"):K("More","더보기")}`;
 m.onclick=()=>{if(overlayOpen())return;sfx("tap");ex.classList.toggle("open");renderExtras()};ex.appendChild(m)};
/* -- parent lock in front of the settings: a sum a 5-year-old cannot do yet; unlocked for 10 minutes -- */
var GATE={until:0};
function pgate(go){if(Date.now()<GATE.until){go();return}
 const a=12+Math.floor(Math.random()*27),b=11+Math.floor(Math.random()*27),ans=a+b;let typed="";
 const ov=$("gateOv");if(!ov){go();return}
 const draw=()=>{$("gateCard").innerHTML=`<div class="libhead"><h2>🔒 ${K("For grown-ups","어른 확인")}</h2><button class="btn" id="gateX">${K("Close","닫기")}</button></div>
  <p class="gq">${K("Settings are for parents. Type the answer:","설정은 부모님용이에요. 답을 입력하세요:")}</p><p class="gsum noemj">${a} + ${b} = <span class="gin">${typed||"?"}</span></p>
  <div class="gpad">${[1,2,3,4,5,6,7,8,9,"del",0,"ok"].map(k=>`<button class="btn${k==="ok"?" pri":""}" data-g="${k}">${k==="del"?K("Del","지우기"):k==="ok"?K("OK","확인"):k}</button>`).join("")}</div>`;
  $("gateX").onclick=()=>{sfx("tap");ov.hidden=true};
  $("gateCard").querySelectorAll("[data-g]").forEach(x=>x.onclick=()=>{const k=x.dataset.g;sfx("tap");
   if(k==="del")typed=typed.slice(0,-1);
   else if(k==="ok"){if(typed!==""&&+typed===ans){GATE.until=Date.now()+600000;ov.hidden=true;go();return}typed="";toast(K("Not quite. Please ask a grown-up!","다시 해 보세요. 어른에게 부탁해요!"))}
   else if(typed.length<3)typed+=k;draw()})};
 draw();ov.hidden=false}
$("menuBtn").onclick=()=>{if(overlayOpen())return;pgate(showSettings)};
/* credit line for the 3D emoji (MIT licence asks for the notice; the full text ships in assets/img/emoji/) */
var _showSettings0=showSettings;showSettings=function(){_showSettings0();const c=$("setCard");if(c&&!c.querySelector(".credit")){const p=document.createElement("p");p.className="credit noemj";
 p.textContent=K("3D emoji pictures: Microsoft Fluent Emoji (MIT licence).","3D 그림 아이콘: Microsoft Fluent Emoji (MIT 라이선스)");c.appendChild(p)}};
/* -- case squad: during the search the picture grows into the empty space (tablets showed only half of the 3:2 picture) -- */
function kzStageSize(){const st=$("kzStage");if(!st||!KZ)return;if(KZ.act!==1){if(st.style.height)st.style.height="";return}
 st.style.height="";const cur=st.clientHeight,want=Math.min(innerHeight*.58,st.clientWidth/1.5);if(want>cur+8)st.style.height=Math.round(want)+"px"}
var _kzFit1=kzFit;kzFit=function(){kzStageSize();_kzFit1()};
var _kzGo1=kzGo;kzGo=function(n){_kzGo1(n);requestAnimationFrame(()=>{if(KZ)kzFit()})};
/* -- playground results: the hero cheers next to the stars and the coins fly into the wallet -- */
function coinBurst(from,n){const to=$("hHero");if(!from||!to)return;const a=from.getBoundingClientRect(),z=to.getBoundingClientRect();if(!a.width||!z.width)return;
 for(let i=0;i<(n||8);i++)setTimeout(()=>{const c=document.createElement("div");c.className="cfly";c.textContent="🪙";
  c.style.left=(a.left+a.width/2+Math.random()*90-45)+"px";c.style.top=(a.top+a.height*.6)+"px";document.body.appendChild(c);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.left=(z.left+z.width*.55)+"px";c.style.top=(z.top+z.height*.5)+"px";c.style.opacity=".15";c.style.transform="scale(.55)"}));
  setTimeout(()=>c.remove(),950)},i*70)}
var _pgResult1=pgResult;pgResult=function(){const S=PGS;_pgResult1.apply(this,arguments);if(!S)return;const box=document.querySelector("#pgArea .pgrbox");if(!box)return;
 const h=document.createElement("div");h.className="pgrhero";h.innerHTML=heroArt(G.char,1);box.appendChild(h);if(!S.o.stage)setTimeout(()=>coinBurst(box,8),500)};
(()=>{try{renderExtras()}catch(e){console.error(e)}})();


/* ===== v29.3 art: painted backgrounds for cases 1, 2, 4–11 (made with ChatGPT, 2026-10-30) =====
   Each case shows its picture instead of the drawn scene; the clue sparkles sit on the matching objects in the picture.
   Positions are % of the 3:2 picture and stay inside the part every screen shows (x 16–85, mostly y 25–90). */
(()=>{const P="assets/img/case/";
 const BG={k1:"case01_rat",k2:"case02_ox",k4:"case04_rabbit",k5:"case05_dragon",k6:"case06_snake",k7:"case07_horse",
  k8:"case08_sheep",k9:"case09_monkey",k10:"case10_rooster",k11:"case11_dog"};
 for(const k in BG)KASSET.bg[k]=P+BG[k]+".webp";
 const SP={
  k1:{a:[51,58],b:[76,44],c:[26,59],d:[62,80]},   /* door step · thorn bush · under the mossy rock · leaves on the path */
  k2:{a:[22,44],b:[72,48],c:[59,44],d:[83,30]},   /* work table · log pile · flat rock · river */
  k4:{a:[52,64],b:[72,52],c:[31,57],d:[13,27]},   /* grass · in front of the fence · under the table · balloons */
  k5:{a:[42,72],b:[75,40],c:[23,47],d:[66,84]},   /* pier planks · red mailbox · bench · deck */
  k6:{a:[40,41],b:[55,67],c:[73,55],d:[27,46]},   /* box label · floor under the shelf · lower shelf · corner */
  k7:{a:[22,31],b:[47,61],c:[79,63],d:[67,43]},   /* picture board · under the table · floor to the back door · jug */
  k8:{a:[40,59],b:[26,50],c:[55,44],d:[78,33]},   /* floor in front of the shelves · under the window · book on the table · lamp */
  k9:{a:[21,35],b:[50,62],c:[31,57],d:[80,63]},   /* sluice at the top of the stream · muddy bank · by the big rock · bank */
  k10:{a:[17,33],b:[74,47],c:[24,41],d:[64,25]},  /* notice board (paper) · by the barrel · notice board (under the paper) · bunting */
  k11:{a:[85,47],b:[60,55],c:[30,66],d:[39,46]}}; /* mine cart · mine entrance · path · big rock */
 KC.forEach(c=>{const s0=SP[c.id];if(s0)c.spots.forEach(s=>{const v=s0[s.k];if(v){s.x=s._x0=v[0];s.y=s._y0=v[1]}})});
 /* spot fixes a parent made with 🛠 were for the old drawn scenes: drop them once for the cases that now have a picture */
 if(!G.lay293){if(isObj(G.lay))for(const k in BG)delete G.lay[k];G.lay293=1;save()}
 layApply()})();

RMS.b2=[
 {a:"뚱냥이 동화책의 문장을 바꿨어요.",b:"맛있는 냄새를 따라온 뚱냥이 책을 펼쳤어요. 그리고 〈시골 쥐와 도시 쥐〉의 문장을 바꿔 버렸어요.",q:"누가 문장을 바꿨나요?",ans:["뚱냥","🐱"],o:[["회색냥","🐈"],["시골 쥐","🐭"]]},
 {a:"고양이는 도시 집에 나타났어요.",b:"기록에는 도시 집 식탁 밑에서 '야옹' 소리가 났다고 적혀 있어요. 그래서 책 속 문장을 바르게 고쳤어요.",q:"고양이는 어디에 나타났나요?",ans:["도시 집","🏙️"],o:[["시골 집","🏡"],["바닷가","🏖️"]]},
 {a:"시골 쥐는 시골 집으로 돌아갔어요.",b:"시골 쥐는 짐을 싸서 시골 집으로 돌아갔어요. 걱정 없이 먹는 보리밥이 제일 맛있었어요.",q:"시골 쥐는 어디로 돌아갔나요?",ans:["시골 집","🏡"],o:[["도시 집","🏙️"],["학교","🏫"]]}];
RMS.b2.forEach((m,i)=>{m.id="b2_"+i});


/* ===== v29.3 course props: the gold "?" block, the orange bricks and the flag pole looked like another famous game.
   Now: a glowing book orb (still hides a letter), stone blocks and a book gate at the finish (pictures made with ChatGPT,
   assets/img/course/). If a picture cannot load, the old drawing is used. ===== */
var CPROP={orb:new Image(),gate:new Image()};CPROP.orb.src="assets/img/course/book_orb.webp";CPROP.gate.src="assets/img/course/book_gate.webp";
function cpReady(im){return !!(im&&im.complete&&im.naturalWidth>0)}
var _drawTile0=drawTile;
drawTile=function(c,ch,cx,cy){
 const x=cx*T,b=RUN.bumps[cx+","+cy]||0,y=cy*T-(b>0?Math.sin((1-b/.16)*Math.PI)*8:0);
 if((ch==="?"||ch==="U")&&cpReady(CPROP.orb)){c.save();
  if(ch==="?"){const g=.5+.5*Math.sin(RUN.t*4+cx);c.shadowColor="rgba(255,226,120,"+(.35+.45*g).toFixed(2)+")";c.shadowBlur=8+10*g}else c.globalAlpha=.42;
  c.drawImage(CPROP.orb,x-3,y-5,T+6,T+6);c.restore();return}
 if(ch==="B"){const g=c.createLinearGradient(x,y,x,y+T);g.addColorStop(0,"#B9B1A6");g.addColorStop(1,"#7B7166");
  rr(c,x+1,y+1,T-2,T-2,9);c.fillStyle=g;c.fill();c.lineWidth=2.5;c.strokeStyle="#3D3630";c.stroke();
  const h=(cx*7+cy*3)%3;c.strokeStyle="rgba(45,35,25,.45)";c.lineWidth=2;c.beginPath();
  c.moveTo(x+T*(.25+h*.12),y+T*.28);c.lineTo(x+T*(.4+h*.1),y+T*.52);c.lineTo(x+T*(.33+h*.1),y+T*.74);c.stroke();
  c.fillStyle="rgba(255,255,255,.28)";c.fillRect(x+7,y+6,T-14,3);
  c.fillStyle="#6CB04F";c.beginPath();c.ellipse(x+T*.3,y+4,T*.2,4.5,0,0,7);c.ellipse(x+T*.68,y+3,T*.16,3.5,0,0,7);c.fill();return}
 return _drawTile0.apply(this,arguments)};
/* the finish: the hero walks into the book gate (the run ends at the same spot as the old flag) */
function drawGoal(c,x){if(!cpReady(CPROP.gate))return false;const h=5.3*T,w=h*CPROP.gate.naturalWidth/CPROP.gate.naturalHeight;
 c.save();c.shadowColor="rgba(150,255,200,.55)";c.shadowBlur=12+6*Math.sin(RUN.t*3);c.drawImage(CPROP.gate,x+T*.6-w/2,7*T-h+2,w,h);c.restore();return true}


/* ===== v29.4 entering a book (3D) — replaces the flat purple portal.
   bookDive(b,art) puts a full-screen layer over everything: a 3D book rises out of a starry sky, the cover opens,
   pages flip, Hangul letters fly out of the pages, the heroes jump in and the camera dives into the spread.
   peak resolves when the screen is covered by the gold flash (the stage is set up underneath), end() fades it away. ===== */
function bookDive(b,art){
 const B=b.B,D=b.D,team=[B.owner,...(G.char!==B.owner?[G.char]:[])];
 let calm=false;try{calm=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
 const u=f=>"url('"+String(f).replace(/'/g,"%27")+"')",spread=D.dir+D.bg,cover=D.dir+(D.cover||D.bg);
 const gl="가나다라마바사아자차카타파하한글ㄱㄴㅁㅇ".split("");
 const burst=gl.map((g,i)=>{const a=i/gl.length*Math.PI*2+Math.random()*.4,r=.22+Math.random()*.3;
  return `<span style="--dx:${(Math.cos(a)*r).toFixed(3)};--dy:${(Math.sin(a)*r*.7).toFixed(3)};--dz:${Math.round(160+Math.random()*260)}px;--r:${Math.round(Math.random()*120-60)}deg;--d:${(1.25+i*.045).toFixed(2)}s">${g}</span>`}).join("");
 const xs=team.length>1?[24,76]:[50];
 const el=document.createElement("div");el.className="bdive"+(calm?" calm":"");el.setAttribute("aria-hidden","true");
 el.innerHTML=`<div class="bd-sky"></div><div class="bd-sky2"></div><div class="bd-glow"></div>
  <div class="bd-cam"><div class="bd-book">
   <div class="bd-back"></div><div class="bd-edge"></div>
   <div class="bd-pg" style="background-image:${u(spread)}"></div>
   ${[0,1,2].map(i=>`<div class="bd-leaf" style="--i:${i}"><i class="f"></i><i class="b" style="background-image:${u(spread)}"></i></div>`).join("")}
   <div class="bd-cover"><i class="f" style="background-image:${u(cover)}"></i><i class="b"></i></div>
   <div class="bd-burst">${burst}</div>
  </div></div>
  <div class="bd-team">${team.map((id,i)=>`<img src="${ownerImg(id)}" alt="" style="--i:${i};--x0:${xs[i]}vw;--r0:${i?8:-8}deg;--r1:${i?320:-320}deg">`).join("")}</div>
  ${art?`<img class="bd-artbg" src="${D.dir+art}" alt=""><img class="bd-art" src="${D.dir+art}" alt="">`:""}
  <div class="bd-flash"></div><div class="bd-say">✨ ${K("Into the book…","책 속으로…")}</div>`;
 document.body.appendChild(el);
 const T=[];const at=(ms,f)=>T.push(setTimeout(f,ms));
 if(!calm){at(1000,()=>sfx("tap"));at(1170,()=>sfx("tap"));at(1340,()=>sfx("tap"));at(2380,()=>sfx("star"))}
 const peakMs=calm?850:2900;
 const peak=new Promise(r=>at(peakMs,()=>{if(!art)return r();el.classList.add("art");at(1500,r)}));
 let gone=false;
 return {el,peak,end(){if(gone)return;gone=true;T.forEach(clearTimeout);el.classList.add("out");setTimeout(()=>el.remove(),600)}}}
/* the v29 block wraps bookEnter (reading mission 1 first) and then calls the original kept in _bookEnter0,
   so the 3D entrance replaces that original, not the wrapper */
var bookEnter3D=async function(){const b=BK,B=b.B,D=b.D;capt(null);hush();sfx("evo");
 const art=D.enterArt&&(G.char===B.owner||(D.enterWith||[]).includes(G.char))?D.enterArt:null;
 const dv=bookDive(b,art);
 $("bQ").innerHTML=`<p class="endq">✨ ${K("Into the book…","책 속으로…")}</p>`;$("bkMsg").textContent="";
 try{await Promise.all([bSpeak(D.enterLine,"@"+B.owner,true),b.ready,dv.peak])}catch(e){}
 if(!bAlive(b)){dv.end();return}
 b.vt++;$("bStage").classList.remove("gloom","cine","slow");setState("broken");actMark("turtle","?");claimShow(true);camSet({x:30,y:100,z:1.3},0);
 const p=$("bPov");p.hidden=true;p.innerHTML="";
 dv.end();await wait(420);if(!bAlive(b))return;camSet(null,1600);
 await runScript(D.enter||[]);if(!bAlive(b))return;goStep(0)};
if(typeof _bookEnter0==="function")_bookEnter0=bookEnter3D;else bookEnter=bookEnter3D;

/* ===== v29.4 iPhone + iPad: in the explore step every glowing scroll is framed by the camera and scrolls that would
   cover each other (small phone screens) are pulled apart, so none is hidden or hard to tap. ===== */
function bFitCam(pts){const st=$("bStage");if(!st||!pts.length)return null;const W=st.clientWidth,H=st.clientHeight;if(!W||!H)return null;
 const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 return {x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)-14+Math.max(...ys)+8)/2,z:1}}
function bHotsFit(){const b=BK;if(!b||$("bookOv").hidden)return;const box=$("bHots"),st=$("bStage"),w=$("bWorld");if(!box||!st||!w)return;
 if(typeof layOn==="function"&&layOn())return;
 const hs=[...box.querySelectorAll(".bhot")];if(!hs.length)return;
 hs.forEach(h=>{const r=b.D.records.find(x=>x.k===h.dataset.h);if(r){h.style.left=r.at[0]+"%";h.style.top=r.at[1]+"%"}});
 const wr=w.getBoundingClientRect(),sr=st.getBoundingClientRect();if(!wr.width||!wr.height)return;
 const R=hs.map(h=>{const a=h.getBoundingClientRect(),g=h.querySelector(".ring"),c=g?g.getBoundingClientRect():a;
  const l=Math.min(a.left,c.left),t=Math.min(a.top,c.top),r=Math.max(a.right,c.right),bt=Math.max(a.bottom,c.bottom);
  const r0=b.D.records.find(x=>x.k===h.dataset.h);return {h,l,t,r,b:bt,x:r0.at[0],y:r0.at[1]}});
 const px2x=wr.width/100,px2y=wr.height/100,G=4;let moved=false;
 for(let it=0;it<40;it++){let any=false;
  for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const A=R[i],B=R[j];
   const ox=Math.min(A.r,B.r)-Math.max(A.l,B.l)+G,oy=Math.min(A.b,B.b)-Math.max(A.t,B.t)+G;if(ox<=0||oy<=0)continue;any=true;
   if(ox<oy){const s=(A.l+A.r<B.l+B.r)?-1:1,d=ox/2;[[A,s],[B,-s]].forEach(([Q,k])=>{Q.l+=k*d;Q.r+=k*d;Q.x+=k*d/px2x})}
   else{const s=(A.t+A.b<B.t+B.b)?-1:1,d=oy/2;[[A,s],[B,-s]].forEach(([Q,k])=>{Q.t+=k*d;Q.b+=k*d;Q.y+=k*d/px2y})}}
  // keep each scroll inside the visible picture
  R.forEach(Q=>{const m=3;let dx=0,dy=0;if(Q.l<sr.left+m)dx=sr.left+m-Q.l;else if(Q.r>sr.right-m)dx=sr.right-m-Q.r;if(Q.t<sr.top+m)dy=sr.top+m-Q.t;else if(Q.b>sr.bottom-m)dy=sr.bottom-m-Q.b;
   if(dx||dy){any=true;Q.l+=dx;Q.r+=dx;Q.t+=dy;Q.b+=dy;Q.x+=dx/px2x;Q.y+=dy/px2y}});
  if(!any)break;moved=true}
 if(moved)R.forEach(Q=>{Q.h.style.left=Q.x.toFixed(2)+"%";Q.h.style.top=Q.y.toFixed(2)+"%"})}
var _stExplore0=stExplore;
stExplore=function(S){_stExplore0.apply(this,arguments);const b=BK;if(!b)return;
 const c=bFitCam(b.D.records.map(r=>r.at));if(c){camSet(c,700);setTimeout(()=>{if(BK===b)bHotsFit()},760)}else bHotsFit()};
window.addEventListener("resize",()=>{clearTimeout(window.__bhf);window.__bhf=setTimeout(()=>{if(BK&&!$("bookOv").hidden&&$("bHots")&&$("bHots").children.length){
 const S=BK.D.steps[BK.si];if(S&&S.type==="explore"&&!BK.busy){const c=bFitCam(BK.D.records.map(r=>r.at));if(c)camSet(c,0)}bHotsFit()}},250)});
/* case squad on phones: sparkles that would overlap are pushed apart (still inside the visible picture) */
function kzSpotsApart(){if(!KZ||(typeof layOn==="function"&&layOn()))return;const st=$("kzStage"),w=$("kzWorld"),sp=$("kzSpots");if(!st||!w||!sp)return;
 const W=st.clientWidth,H=st.clientHeight,ww=w.offsetWidth,wh=w.offsetHeight,L=parseFloat(w.style.left)||0,T=parseFloat(w.style.top)||0;if(!ww||!wh)return;
 const vx0=-L/ww*100,vx1=(W-L)/ww*100,vy0=-T/wh*100,vy1=(H-T)/wh*100;
 const P=[...sp.querySelectorAll(".kzspot")].map(b=>({b,x:parseFloat(b.style.left),y:parseFloat(b.style.top),r:b.offsetWidth/2})).filter(q=>isFinite(q.x)&&isFinite(q.y)&&q.r>0);
 let moved=false;
 for(let it=0;it<40;it++){let any=false;
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const A=P[i],B=P[j],dx=(B.x-A.x)/100*ww,dy=(B.y-A.y)/100*wh,d=Math.hypot(dx,dy),need=A.r+B.r+8;if(d>=need)continue;any=true;
   const ux=d>.01?dx/d:1,uy=d>.01?dy/d:0,p=(need-d)/2;A.x-=ux*p/ww*100;A.y-=uy*p/wh*100;B.x+=ux*p/ww*100;B.y+=uy*p/wh*100}
  P.forEach(Q=>{const mx=(Q.r+6)/ww*100,my=(Q.r+6)/wh*100;Q.x=Math.min(Math.max(Q.x,vx0+mx),vx1-mx);Q.y=Math.min(Math.max(Q.y,vy0+my),vy1-my)});
  if(!any)break;moved=true}
 if(moved)P.forEach(Q=>{Q.b.style.left=Q.x.toFixed(2)+"%";Q.b.style.top=Q.y.toFixed(2)+"%"})}
var _kzSpotsFit1=kzSpotsFit;kzSpotsFit=function(){_kzSpotsFit1();kzSpotsApart();kzHeroAvoid()};
/* in the phone-landscape layout the grid sizes the picture, so the search-time stretch is not used */
var _kzStageSize1=kzStageSize;kzStageSize=function(){let land=false;try{land=matchMedia("(orientation:landscape) and (max-height:520px)").matches}catch(e){}
 if(land){const st=$("kzStage");if(st&&st.style.height)st.style.height="";return}return _kzStageSize1()};

/* ===== v29.4 case squad: one painted picture per case, a different look for every act (kzMood) =====
   The camera moves the whole world (picture, overlays, sparkles) so the hut / fixed-picture overlays stay in place.
   During the search the camera is always at rest, so the sparkles line up with the objects in the picture. */
var KZHC={rat:"155,92,255",ox:"78,139,217",tiger:"47,107,255",rabbit:"255,111,174",dragon:"47,197,155",snake:"95,209,232",horse:"255,90,78",sheep:"183,166,255",monkey:"255,201,61",rooster:"255,138,61",dog:"79,163,255",pig:"255,157,184"};
function kzMoodEnsure(){const w=$("kzWorld"),st=$("kzStage");if(!w||!st)return;
 if(!w.querySelector(".kzmood"))w.insertAdjacentHTML("beforeend",'<div class="kzmood"></div>');
 if(!$("kzBoard"))st.insertAdjacentHTML("afterbegin",'<div class="kzboard" id="kzBoard" aria-hidden="true"></div>')}
function kzFocus(n){if(!KZ)return null;const c=KZ.c,sp=c.spots||[],real=sp.filter(s=>!s.decoy),dec=sp.filter(s=>s.decoy);
 if(n===0)return {x:64,y:56,z:1.22};
 if(n===2){const s=dec[0]||sp[sp.length-1]||{x:40,y:50};return {x:s.x,y:s.y,z:1.6}}
 if(n===3){if(c.sk&&c.sk.skin==="build")return null;const k=(KZ.nb&&KZ.nb.clues&&KZ.nb.clues[0]||{}).k;const s=sp.find(q=>q.k===k)||real[0]||{x:50,y:55};return {x:s.x,y:s.y,z:1.38}}
 if(n===4)return {x:50,y:50,z:1.08};
 return null}
function kzCamApply(){const w=$("kzWorld"),st=$("kzStage");if(!w||!st||!KZ)return;const f=kzFocus(KZ.act);
 if(!f||f.z<=1){w.style.transform="";return}
 const W=st.clientWidth,H=st.clientHeight,ww=w.offsetWidth,wh=w.offsetHeight,L=parseFloat(w.style.left)||0,T=parseFloat(w.style.top)||0;if(!ww||!wh)return;
 let tx=W/2-L-f.z*f.x/100*ww,ty=H/2-T-f.z*f.y/100*wh;tx=Math.min(-L,Math.max(W-L-f.z*ww,tx));ty=Math.min(-T,Math.max(H-T-f.z*wh,ty));
 w.style.transform=`translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${f.z})`}
function kzBoard(on){const b=$("kzBoard");if(!b||!KZ)return;
 if(!on){b.classList.remove("on");clearTimeout(b._t);b._t=setTimeout(()=>{if(b.isConnected&&!b.classList.contains("on"))b.innerHTML=""},750);return}
 const c=KZ.c,src=KASSET.bg[c.id],cl=((KZ.nb&&KZ.nb.clues)||[]).slice(0,3),P=[[31,42,-7],[50,35,4],[69,43,-4]];
 const cw=.26,ch=cw*1.5*.75;   // the photo shows 26% of the picture width (photo 4:3, picture 3:2)
 const pol=cl.map((s,i)=>{const sp=(c.spots||[]).find(q=>q.k===s.k)||{x:50,y:50},[x,y,r]=P[i];let ph;
  if(src){const x0=Math.min(Math.max(sp.x/100-cw/2,0),1-cw),y0=Math.min(Math.max(sp.y/100-ch/2,0),1-ch);
   ph=`<i style="background-image:url('${src}');background-size:${(100/cw).toFixed(1)}% auto;background-position:${(x0/(1-cw)*100).toFixed(1)}% ${(y0/(1-ch)*100).toFixed(1)}%"></i>`}
  else ph=`<i>${kzIco(c.id+"_"+s.k,s.ic||"🔍")}</i>`;
  return `<figure class="kzpol" style="--px:${x}%;--py:${y}%;--r:${r}deg;--d:${(i*.2).toFixed(2)}s">${ph}<figcaption>${escH(s.n)}</figcaption></figure>`}).join("");
 b.innerHTML=(cl.length>1?`<svg class="kzstr"><polyline points=""/></svg>`:"")+pol;
 clearTimeout(b._t);requestAnimationFrame(()=>b.classList.add("on"));
 // red string through the pins, measured once the photos have landed
 clearTimeout(b._s);b._s=setTimeout(kzString,cl.length*200+650)}
function kzString(){const b=$("kzBoard"),sv=b&&b.querySelector(".kzstr");if(!sv||!b.classList.contains("on"))return;const R=b.getBoundingClientRect();if(!R.width)return;
 const pts=[...b.querySelectorAll(".kzpol")].map(f=>{const r=f.getBoundingClientRect();return (r.left+r.width/2-R.left).toFixed(1)+","+(r.top-R.top+6).toFixed(1)});
 sv.setAttribute("viewBox",`0 0 ${R.width.toFixed(1)} ${R.height.toFixed(1)}`);sv.querySelector("polyline").setAttribute("points",pts.join(" "));sv.classList.add("on")}
function kzMood(n){const w=$("kzWorld");if(!w||!KZ)return;kzMoodEnsure();
 w.classList.remove("a0","a1","a2","a3","a4","a5");w.classList.add("a"+n);const st=$("kzStage");if(st)st.classList.toggle("kzded4",n===4);w.style.setProperty("--hcA","rgba("+(KZHC[KZ.c.h]||"255,211,77")+",.55)");
 if(n===0){w.style.transition="none";w.style.transform="";void w.offsetWidth;w.style.transition=""}
 requestAnimationFrame(()=>requestAnimationFrame(kzCamApply));kzBoard(n===4)}
var _kzGo3=kzGo;kzGo=function(n){_kzGo3(n);if(KZ)kzMood(n)};
var _kzFit3=kzFit;kzFit=function(){_kzFit3();kzCamApply();if(KZ&&KZ.act===4)setTimeout(kzString,60)};
/* book 2 voices (VOX is defined above; books/b2/book.js holds the story) */
VOX.sb_country={p:1.08,r:.88,g:"m",gap:700};VOX.sb_city={p:1.18,r:1.06,g:"m",gap:450};
