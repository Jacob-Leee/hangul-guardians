# 그림 요청서 (ChatGPT 담당)

2026-10-30부터 **그림은 ChatGPT, 게임 프로그램은 Claude**가 맡습니다. GitHub 저장소 `Jacob-Leee/hangul-guardians`가 둘 사이의 전달 창구입니다. 이 문서에는 지금 필요한 그림과 올리는 방법이 있습니다.

## 1. 그림을 올리는 방법 (ChatGPT)

1. 만든 그림은 **`incoming/` 폴더**에 올립니다. 파일 이름은 아래 표의 **저장 이름** 그대로, PNG 그대로 둡니다(크기 조정·압축은 하지 않아도 됩니다). 투명 배경 그림은 투명 PNG로 올립니다.
2. 커밋 메시지는 `img: `로 시작합니다. 예: `img: 사건 12 배경`
3. `js/`, `css/`, `index.html`, `sw.js`, `tests/`, `tools/`, 그리고 `assets/`·`books/` 안의 기존 파일은 고치지 않습니다. 이미 있는 그림을 다시 만든 것이면 같은 저장 이름으로 `incoming/`에 올리고 커밋 메시지에 "교체"라고 적습니다.
4. 그림 안에 글자·숫자·로고·워터마크를 넣지 않습니다. 꾸러기 수비대, LEGO, Marvel 같은 기존 캐릭터·로고를 흉내 내지 않습니다. 웹에서 찾은 사진은 참고 그림으로 쓰지 않습니다(참고 그림은 이 저장소 안의 그림만 씁니다).
5. GitHub에 직접 올릴 수 없으면 그림을 보호자에게 주고, 보호자가 Claude 대화에 올리거나 GitHub 웹에서 `incoming/`에 올립니다(Add file → Upload files).

## 2. Claude가 하는 일

프로그램을 올리기 전에 매번 GitHub의 새 커밋·브랜치·PR을 먼저 확인합니다. 새 그림이 있으면 웹용(WebP)으로 줄이고, 투명 여백과 발 위치를 맞추고, 제자리(`assets/img/...`, `books/...`)에 넣어 코드에 연결한 뒤 화면을 확인하고 올립니다. 처리한 원본은 `incoming/`에서 지웁니다(GitHub 기록에는 남습니다). `incoming/`의 그림은 앱에 저장되지 않으므로 아이패드 용량을 차지하지 않습니다.

## 3. 참고 그림 (저장소 안)

| 무엇 | 위치 |
|---|---|
| 영웅 12명 전신 · 초상 | `assets/img/hero/`, `assets/img/portrait/` |
| 사건 친구 5명 · 흑묘 · 너구리 | `assets/img/npc/` |
| 사건 배경 (그림체 기준) | `assets/img/case/case01_rat.webp` 등 |
| 1권 〈토끼와 거북이〉 | `books/b1/` |
| 2권 〈시골 쥐와 도시 쥐〉 | `books/b2/` (시골 쥐 `country_stand.webp`, 도시 쥐 `city_stand.webp`, 무대 `spread.webp`) |

## 4. 지금 필요한 그림 (만드는 순서)

| 순서 | 저장 이름 | 무엇 | 크기 | 첨부할 참고 그림 |
|---|---|---|---|---|
| 1 | `page3.png` | 2권 이야기 그림 3: 노을 진 시골길로 집에 돌아가는 시골 쥐 (지금은 임시 그림) | 1536×1024 가로 | `books/b2/country_stand.webp`, `books/b2/spread.webp` |
| 2 | `case12_pig.png` | 사건 12 배경: 나무집 숲속 신문사 (지금은 코드로 그린 장면) | 1536×1024 가로 | `assets/img/case/case01_rat.webp` |
| 3 | `case09_monkey_blocked.png` | 사건 9 배경 고친 그림: 큰 돌이 개울을 막아 물이 멈춘 모습. 지금 그림은 물이 흘러서 "물이 흐르지 않아요"라는 글과 다릅니다. 지금 그림은 해결 장면(물이 다시 흐름)에 씁니다 | 1536×1024 가로 | `assets/img/case/case09_monkey.webp` |
| 4 | `room_living.png` `room_case.png` `room_deck.png` `room_study.png` | **우리 본부(v29.5)** 방 배경 4장: 거실, 수사실, 옥상 관측대, 서재. 지금은 코드로 그린 방을 씁니다. 가구 없이 빈 방이어야 합니다(보물은 아이가 놓음) | 1536×1024 가로 | `assets/img/case/case01_rat.webp`(그림체), `assets/img/hero/tiger.webp` |
| 있으면 좋음 | `item_sofa.png` `item_plant.png` `item_lamp.png` `item_clock.png` `item_mirror.png` `item_piano.png` `item_scope.png` `item_books.png` `item_trophy.png` `item_shield.png` `item_orb.png` `item_star.png` | 본부 보물(가구) 12개, 투명 PNG. 지금은 3D 이모지를 씁니다 | 각 1024×1024 투명 | `assets/img/case/case01_rat.webp`(그림체) |
| 선택 | `country_walk.png`, `country_happy.png`, `city_walk.png`, `city_proud.png`, `cat_pounce.png`, `cover.png` | 2권 자세 5장과 표지. 없으면 기본 자세와 이야기 그림 1을 대신 씁니다 | 아래 표 | 아래 표 |

### ① 2권 이야기 그림 3 → `page3.png`

```
A full storybook illustration that fills the whole picture. At sunset the Country Mouse walks happily home along the country path, carrying a small cloth bundle on a stick over his shoulder. Ahead of him, on the left, is his cosy home in the roots of a big oak tree with a round green wooden door and glowing round windows; the stone footbridge over the little stream is behind him on the right. Wildflowers, long soft shadows. He looks relieved and content, with a gentle smile.
Character: the first attached image is the character reference; keep him exactly the same (face, tan fur, brass goggles on his head, purple vest, cream shirt, olive shorts, proportions). The second attached image is the story world; keep its art style, its oak-tree home, its path and its bridge.
Camera: at a small child's eye level, wide. The mouse walks towards the viewer's left, a little left of the centre, his face in the middle of the height.
Light: warm orange sunset from the left. Main colours: sunset orange, golden light, soft violet sky, leaf green.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### ② 사건 12 배경 → `case12_pig.png`

단서 자리(그림에는 단서 물건을 넣지 않고 자리만): 책상 위(가로 46%, 세로 70%) · 창문 틈(76, 62) · 벽의 빈 사진틀(24, 58) · 작은 탁자(62, 84).

```
A background for a cute 3D animated storybook game, matching the rendering of the attached reference image: soft, warm, slightly painterly 3D. Rich detail kept soft and low in contrast so characters and clue markers stand out.
Scene: inside a treehouse newspaper office in the forest, morning. A small hand-cranked printing press, stacks of blank paper, a wooden desk. Busy and cheerful.
Camera: at a small child's eye level, looking straight ahead, slightly wide.
Middle ground: a wooden desk at about 46% from the left, its top at about 70% of the image height, with blank paper and an empty pen tray. A round window with a slightly open shutter at about 76% from the left, 62% height. On the left wall, three empty photo frames pinned to a board at about 24% from the left, 58% height. A small stool used as a side table at about 62% from the left near the bottom.
Foreground: a wooden plank floor, open and low in contrast. The ground across the lower half is flat and open.
Background: the printing press, shelves of paper rolls, leafy branches outside the window.
Composition: the base of the back wall sits between 50% and 56% of the image height. The top 40% is only beams, hanging lamps and the window top (it may be cropped). Keep the far left and far right of the lower half free of large objects, because characters stand there.
Light: warm morning light from the window and the upper left. Main colours: warm wood, paper cream, leaf green, ink blue.
Do not include: characters, animals or people; any text, letters, numbers, headlines or signs with writing; ink spills, fur, photos with pictures, cups or any clue objects; logos, buttons or watermark.
Canvas 1536x1024 (landscape).
```

### ③ 사건 9 막힌 개울 → `case09_monkey_blocked.png`

```
Edit the attached image. Change only the stream: a big grey boulder now blocks the wooden sluice gate at the top left where the little waterfall was, so the water has stopped. No waterfall; the stream is low and still; the waterwheel stands still. Keep everything else exactly the same: framing, camera, lighting, colours, the mill house, the wheel, the grass and all other details. Same canvas 1536x1024. No characters, animals or people. No text.
```

### 선택: 2권 자세 5장과 표지

자세 5장은 그 캐릭터의 기본 자세 그림을 첨부하고, 아래 공통 문단 뒤에 그 자세 한 줄을 붙입니다.

```
Use the attached image as the character reference and keep the character exactly the same: the same face, fur, clothes, proportions and 3D rendering. Change only the pose. Keep the character the same size as in the reference image, with the feet on the bottom edge. Transparent background (alpha). No floor, no cast shadow, no scenery, no motion lines. No text, letters, numbers, logos or watermark. Same canvas size and direction as the reference image, nothing cropped.
```

| 저장 이름 | 첨부 | 공통 문단 뒤에 붙일 줄 |
|---|---|---|
| `country_walk.png` | `books/b2/country_stand.webp` | New pose: walking to the viewer's right, mid-stride, carrying a small cloth bundle on a stick over his shoulder, a calm smile. |
| `country_happy.png` | `books/b2/country_stand.webp` | New pose: holding a small bowl of barley rice in both paws, eyes closed in a big happy smile, a little steam rising from the bowl. |
| `city_walk.png` | `books/b2/city_stand.webp` | New pose: walking confidently to the viewer's right, mid-stride, chin up, tail swinging. |
| `city_proud.png` | `books/b2/city_stand.webp` | New pose: showing off, one paw on his chest and the other sweeping outward as if saying "look at all this!", chin up, a cheeky wink. |
| `cat_pounce.png` | `books/b2/cat_prowl.webp` | New pose: a playful pounce like a kitten at play: front paws stretched forward, back legs pushing off, tail up, a happy open-mouthed smile with no fangs. Side view, facing the viewer's right. |

표지 → `cover.png` (1024×1536 세로) · 첨부: `books/b2/country_stand.webp`, `books/b2/city_stand.webp`, `books/b2/spread.webp`

```
A storybook cover picture without any words. The Country Mouse and the City Mouse stand side by side on the country path, smiling at the viewer. Behind them on the left is the big oak tree with the small round green door; far behind on the right, small, is the grand town house. Wildflowers, soft blue sky.
Characters: the first two attached images are the character references; keep both exactly the same. The third attached image is the story world; keep its art style.
Composition: the top 25% is only sky, kept plain for the game's title. Both mice in the middle third of the width, their faces between 40% and 60% of the height.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, title, logos or watermark.
Canvas 1024x1536 (portrait).
```


### ④ 우리 본부 방 배경 4장 → `room_<id>.png` (v29.5)

본부는 **열두 이야기 도서관 큰 나무 속 비밀 기지**입니다. 방을 옆에서 본 모습(무대처럼 정면)이고, **가구는 넣지 않습니다** — 아이가 받은 보물을 빈 자리에 놓아 꾸밉니다. 바닥 아랫부분과 벽 가운데는 비워 두세요. 영웅 2명이 바닥 가운데에 서고, 8개의 보물 자리가 벽과 바닥에 흩어집니다.

공통 프롬프트 (방마다 Scene만 바꿔서):

```
A background for a cute 3D animated storybook game, matching the rendering of the attached reference image: soft, warm, slightly painterly 3D.
Scene: a secret clubhouse room INSIDE a giant hollow tree — curved wooden walls with visible grain, cosy and warm. NO furniture, NO objects on the floor or walls: the room must be empty, because the player decorates it in the game.
[방마다] living: a round window with soft sky light, a warm rug-less wooden floor, a doorway hint on one side. / case: a cork pin-board shaped empty wall panel and a long empty wooden shelf line on the wall, detective-office mood, warm lamp light. / deck: the tree-top lookout, open to the sky, wooden railing at the back, clouds and the island far away, daytime. / study: tall empty wooden bookshelf arches built into the walls (shelves empty), a round window, quiet evening light.
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: the floor takes the lower 30%. The middle of every wall stays plain and empty. Low contrast overall so small items placed on top stand out.
Light: warm and cosy. No text, letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1536x1024 (landscape).
```

저장: `incoming/room_living.png`처럼 올리면 Claude가 WebP로 줄여 `assets/img/hq/room_<id>.webp`로 넣습니다. 그림이 들어오면 코드로 그린 방 대신 자동으로 쓰입니다(파일 이름만 맞으면 됩니다).

### ⑤ 본부 보물(가구) 12개 → `item_<id>.png` (있으면 좋음)

하나씩, 투명 배경 PNG. 12개: sofa 소파 / plant 화분 / lamp 전등 / clock 벽시계 / mirror 거울 / piano 작은 피아노 / scope 망원경 / books 책 탑 / trophy 금 트로피 / shield 수비대 방패 / orb 책 구슬 램프 / star 별 전등.

```
A single cute toy-like [소파/화분/...] for a children's game, in the same soft 3D storybook style as the attached reference. Centered, facing slightly left, whole object visible.
Transparent background (PNG with alpha). No floor, no shadow outside the object, no text or watermark.
Canvas 1024x1024.
```

저장: `incoming/item_sofa.png` → Claude가 `assets/img/hq/item_sofa.webp`로 넣으면 그 보물만 이모지 대신 그림으로 바뀝니다.

## 5. 이미 받아서 넣은 그림 (2026-10-30)

- 사건 배경 10장: 1, 2, 4, 5, 6, 7, 8, 9, 10, 11 → `assets/img/case/`. 사건 3은 1권 결승선 그림을 씁니다.
- 2권 8장: 무대(spread), 이야기 그림 1·2, 시골 쥐·도시 쥐 기본·놀람, 집고양이 → `books/b2/`.
- 모험 코스 소품 2장: 책 구슬('?' 블록 대신), 책 문(깃발 대신) → `assets/img/course/`.
- 그림에 없는 물건을 가리키던 반짝이 문장은 그림에 맞게 고쳤습니다: 사건 8 벽시계 → 램프, 사건 10 의자 밑 → 나무통 옆, 풍선 → 깃발, 사건 11 수정 → 바위.

## 6. 아직 정하지 않은 것

- 한글 놀이터 게임(글자 낚시, 두더지 등)의 무대를 사건 배경처럼 그림으로 바꿀지: 보호자가 정하면 목록과 프롬프트를 여기에 적습니다.

## 6. 동화책 3~12권 그림 (v30 — 지금은 임시 그림으로 플레이 중)

열 권 모두 임시 그림(코드 생성)으로 이미 플레이됩니다. 아래 그림이 오면 같은 파일 이름으로 갈아끼워져요. **권마다**: 무대 1장(`spread.png`, 1536×1024), 이야기 그림 3장(`page1~3.png`, 1536×1024), 인물 포즈(투명 PNG 1024×1024). 올릴 때는 `incoming/<책id>_<파일명>` (예: `incoming/b3_spread.png`, `incoming/b3_boy_stand.png`).

공통 프롬프트 (모든 책 그림에 같은 틀):

```
A [spread: wide stage background / pageN: full storybook illustration / pose: single character, transparent background] for a cute 3D animated children's game, matching the attached reference art style (soft, warm, slightly painterly 3D; reference: assets/img/case/case01_rat.webp).
Scene: [아래 표의 장면 설명]
Spread only: straight-on doll-house stage view, floor on the lower 30%, left/middle/right zones as described, low contrast so characters placed on top stand out. No characters in the spread.
Pose only: whole body visible, facing slightly left, no floor or shadow outside the character, transparent PNG.
No text, letters, numbers, logos or watermark. Friendly for a 5-year-old. Canvas [1536x1024 / 1024x1024].
```

| 책 | spread 무대 | page1 / page2 / page3 | 포즈(파일 이름) |
|---|---|---|---|
| b3 소가 된 게으름뱅이 | 시골 마당(왼쪽 초가집·평상) + 가운데 보리밭 + 오른쪽 저녁 밥상·외양간 | 평상에서 낮잠 자는 소년 / 소 모자를 쓰고 펑! 소가 된 소년과 할아버지 / 땀 닦으며 저녁밥 먹는 소년 | boy_stand·boy_sleep·boy_happy(게으른 소년), oxboy_stand·oxboy_walk(소가 된 소년), old_stand(탈 할아버지) |
| b4 해와 달이 된 오누이 | 밤 산골(왼쪽 초가집 문) + 가운데 큰 나무(위로 하늘) + 오른쪽 언덕 | 문틈으로 보이는 호랑이 꼬리와 오누이 / 나무 위 오누이와 하늘에서 내려오는 동아줄 / 해와 달이 된 오누이 | sis_stand·sis_scared(누나), bro_stand·bro_scared(동생), tig_stand·tig_prowl(호랑이) |
| b5 비를 잃어버린 꼬마 용 | 하늘 마을(왼쪽 주문 책상) + 가운데 꽃밭 마을 + 오른쪽 구름 언덕 | 구름 할머니에게 주문 배우는 꼬마 용 / 시든 꽃밭과 풀 죽은 꼬마 용 / 단비와 무지개, 활짝 핀 꽃밭 | yong_stand·yong_sad·yong_fly(꼬마 용), cloud_stand(구름 할머니) |
| b6 뱀의 숲속 우체국 | 숲속(왼쪽 우체국·가방) + 가운데 우체통 숲길 + 오른쪽 부엉이네 큰 나무 | 우체통에 편지 넣는 숲 친구들 / 그림자에 가려 뒤죽박죽된 편지들 / 초대장 받고 기뻐하는 부엉이 | post_stand·post_slide(우체부 뱀), owl_stand·owl_happy(부엉이) |
| b7 바람을 배달하는 말 | 왼쪽 마구간·지도 + 가운데 들길 + 오른쪽 풍차 마을(산꼭대기는 멀리) | 수레에 바람 담는 말 / 멈춘 풍차와 더워하는 마을 / 바람 도착, 씽씽 도는 풍차 | dal_stand·dal_run(배달 말), mill_stand(풍차 아저씨) |
| b8 양치기 소년 | 푸른 언덕(왼쪽 약속 바위) + 가운데 양 떼 풀밭 + 오른쪽 마을·종 | 거짓말로 외치는 소년과 달려온 친구들 / 진짜 늑대와 숨은 아기 양 / 참말로 외쳐 친구들이 돌아온 장면 | shep_stand·shep_shout(소년), lamb_stand(아기 양), wolf_stand·wolf_run(늑대) |
| b9 원숭이의 뒤죽박죽 도서관 | 나무 속 도서관(왼쪽 ㄱㄴㄷ 책꽂이, 가운데 수레·사다리, 오른쪽 읽기 자리) | 가지런한 글자 칸 책꽂이 / 뒤죽박죽 책과 울상 판다 / 공룡책 찾고 기뻐하는 판다 | mon_stand·mon_hang(사서 원숭이), pand_stand·pand_happy(꼬마 판다) |
| b10 빨간 암탉 | 농장(왼쪽 밀밭, 가운데 마당·반죽대, 오른쪽 가마·식탁) | 혼자 밀 심는 암탉 / 빵 굽는 암탉과 침 흘리는 친구들 / 셋이 함께 빵 나눠 먹는 식탁 | hen_stand·hen_work(암탉), duck_stand(오리), bird_stand(참새) |
| b11 개와 그림자 | 왼쪽 산책길 + 가운데 개울·외나무다리 + 오른쪽 집 마당 | 뼈다귀 물고 다리 오르는 콩이 / 물속 그림자를 보는 콩이 / 뼈다귀 물고 집에서 행복한 콩이 | pup_stand·pup_look·pup_happy(강아지) |
| b12 아기 돼지 삼 형제 | 왼쪽 지푸라기 집 + 가운데 나무 집 + 오른쪽 벽돌집 | 집 짓는 삼 형제 / 후후 부는 늑대와 날아가는 집 / 벽돌집에 모인 삼 형제 | p1_stand·p2_stand·p3_stand·pig_scared(돼지들), wolf_stand·wolf_blow(늑대) |

표지(cover)는 page1을 그대로 씁니다(따로 만들지 않아도 됩니다).
