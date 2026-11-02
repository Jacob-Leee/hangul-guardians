# 그림 프롬프트 전체 (v31.1, 2026-11-03)

필요한 그림 **190장**의 완성 프롬프트예요. 그림마다 **저장 이름 · 첨부할 참고 그림 · 프롬프트**가 있고, 프롬프트는 그대로 복사해 ChatGPT에 붙여 넣으면 됩니다. 제작 체크리스트 페이지에도 같은 내용이 그림마다 [프롬프트 복사] 단추로 있어요.

**오늘(11/3) 이미 끝난 것**: 본부 조종실 그림 원본 교체(room_pic) · 본부 방 4장(수사실·관측대·거실·서재, room_case/deck/living/study) — 그림 속 반짝이 자리에 보물 슬롯까지 맞춤. 이 그림들은 다시 만들 필요 없어요.

공통 규칙: 화면 속 글자·숫자·로고 금지 · 투명 그림은 **진짜 투명 PNG**(체크무늬·검은 배경 ❌) · 기존 캐릭터·브랜드 흉내 금지 · 웹에서 찾은 사진은 참고로 쓰지 않음(참고 그림은 이 저장소 그림이나 보호자가 만든 그림만). 올리는 곳: 깃허브 `incoming/` 폴더에 저장 이름 그대로 (예: `incoming/item_key.png`, `incoming/b3_boy_stand.png`). 첨부할 참고 그림은 깃허브 저장소에서 내려받으면 돼요(파일을 열고 Download).

동화책 무대(spread)는 1536×1024로 만들면 게임이 위아래 8%씩 잘라 씁니다. 프롬프트 속 위치(%)는 잘리기 전 그림 기준이에요.

## 1순위 · 사건 그림 2장 (내용 오류 수정 + 빠진 배경) (2장)

사건 9는 지금 그림이 글과 맞지 않아요(물이 흐름 ↔ "물이 흐르지 않아요"). 편집 한 번이면 끝나서 가장 먼저.

### 1. `case09_monkey_blocked.png` — 사건 9 막힌 개울 (고친 그림)

- 쓰임새: 사건 9 현장. 지금 그림은 물이 흘러서 "물이 흐르지 않아요"라는 글과 맞지 않아요. 지금 그림은 해결 장면(물이 다시 흐름)에 그대로 씁니다.
- 첨부: assets/img/case/case09_monkey.webp (지금 사건 9 그림 — 이걸 고쳐 달라고 첨부)

```
Edit the attached image. Change only the stream: a big grey boulder now blocks the wooden sluice gate at the top left where the little waterfall was, so the water has stopped. No waterfall; the stream is low and still; the waterwheel stands still. Keep everything else exactly the same: framing, camera, lighting, colours, the mill house, the wheel, the grass and all other details. Same canvas 1536x1024. No characters, animals or people. No text.
```

### 2. `case12_pig.png` — 사건 12 배경 — 숲속 나무집 신문사

- 쓰임새: 사건 12 현장 (지금은 코드로 그린 장면). 단서 자리(그림에는 단서 물건 없이 자리만): 책상 위(가로 46%, 세로 70%) · 창문 틈(76, 62) · 벽의 빈 사진틀(24, 58) · 작은 탁자(62, 84)
- 첨부: assets/img/case/case01_rat.webp (배경 그림체)

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

## 2순위 · 보상 아이콘 58개 (보호자 샘플 그림체, 투명 PNG) (58장)

아이가 받는 보물 전부. 한 장에 한 개, 꼭 투명 PNG(검은 배경 ❌ — 검으면 광택이 잘려요). 샘플 시트에 이미 그린 것(열쇠·모래시계·망원경·트로피 등)도 한 개씩 투명으로 다시 뽑아 주세요. 하루 몇 개씩 와도 그때그때 바꿔 끼웁니다.

### 1. `item_key.png` — 보상 아이콘 — 황금 열쇠 (사건)

- 쓰임새: 보물 '황금 열쇠'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a shiny golden vintage key with a soft glow.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `item_hut.png` — 보상 아이콘 — 작은 오두막 (사건)

- 쓰임새: 보물 '작은 오두막'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a tiny cosy thatched-roof hut, like a little toy house.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `item_gold.png` — 보상 아이콘 — 금메달 (사건)

- 쓰임새: 보물 '금메달'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a round gold medal on a red ribbon, with a star emboss (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `item_cake.png` — 보상 아이콘 — 생일 케이크 (사건)

- 쓰임새: 보물 '생일 케이크'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small birthday cake with three lit candles and cream swirls.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `item_invite.png` — 보상 아이콘 — 초대장 (사건)

- 쓰임새: 보물 '초대장'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a cream invitation card with a red wax heart seal, blank (no writing).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 6. `item_hourglass.png` — 보상 아이콘 — 모래시계 (사건)

- 쓰임새: 보물 '모래시계'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a brass hourglass with glowing golden sand.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 7. `item_cookies.png` — 보상 아이콘 — 쿠키 단지 (사건)

- 쓰임새: 보물 '쿠키 단지'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a glass cookie jar full of chocolate-chip cookies, lid slightly open.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 8. `item_cards.png` — 보상 아이콘 — 친구 카드 (사건)

- 쓰임새: 보물 '친구 카드'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a neat small stack of picture cards, the top card showing a golden paw print (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 9. `item_gear.png` — 보상 아이콘 — 물레방아 톱니 (사건)

- 쓰임새: 보물 '물레방아 톱니'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a wooden waterwheel gear with a brass centre.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 10. `item_fflag.png` — 보상 아이콘 — 축제 깃발 (사건)

- 쓰임새: 보물 '축제 깃발'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a short pole with a string of colourful triangle festival flags.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 11. `item_lantern.png` — 보상 아이콘 — 등불 (사건)

- 쓰임새: 보물 '등불'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a warm glowing red paper lantern with a gold tassel (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 12. `item_paper.png` — 보상 아이콘 — 숲속 신문 (사건)

- 쓰임새: 보물 '숲속 신문'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a rolled newspaper tied with twine, showing only tiny pictures, with a green leaf emblem (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 13. `item_finish.png` — 보상 아이콘 — 결승 깃발 (동화책)

- 쓰임새: 보물 '결승 깃발'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a checkered finish flag on a little golden pole.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 14. `item_meal.png` — 보상 아이콘 — 시골 밥상 (동화책)

- 쓰임새: 보물 '시골 밥상'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small wooden Korean meal tray with a steaming rice bowl and little side dishes.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 15. `item_sohat.png` — 보상 아이콘 — 신기한 소 모자 (동화책)

- 쓰임새: 보물 '신기한 소 모자'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a brown ox-head hat with small rounded horns and magical golden sparkles.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 16. `item_rope4.png` — 보상 아이콘 — 하늘 동아줄 (동화책)

- 쓰임새: 보물 '하늘 동아줄'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a neatly coiled thick golden rope glowing softly, one end rising toward the sky.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 17. `item_raindrop.png` — 보상 아이콘 — 비 구슬 (동화책)

- 쓰임새: 보물 '비 구슬'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a glowing blue water-drop shaped crystal bead.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 18. `item_mailbox.png` — 보상 아이콘 — 꼬마 우체통 (동화책)

- 쓰임새: 보물 '꼬마 우체통'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a tiny red round-topped mailbox with a brass flap (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 19. `item_windjar.png` — 보상 아이콘 — 바람 항아리 (동화책)

- 쓰임새: 보물 '바람 항아리'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a corked glass jar full of swirling pale-blue breeze and tiny leaves.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 20. `item_truthbell.png` — 보상 아이콘 — 참말 종 (동화책)

- 쓰임새: 보물 '참말 종'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small bright bronze bell with a wooden handle and an honest golden shine.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 21. `item_booktag.png` — 보상 아이콘 — 글자 이름표 (동화책)

- 쓰임새: 보물 '글자 이름표'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a blank bookmark tag on a little brass ring with a ribbon (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 22. `item_warmbread.png` — 보상 아이콘 — 갓 구운 빵 (동화책)

- 쓰임새: 보물 '갓 구운 빵'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a golden loaf of fresh bread with wisps of steam.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 23. `item_bone.png` — 보상 아이콘 — 콩이의 뼈다귀 (동화책)

- 쓰임새: 보물 '콩이의 뼈다귀'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a big cartoon dog bone tied with a small red ribbon.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 24. `item_goldbrick.png` — 보상 아이콘 — 황금 벽돌 (동화책)

- 쓰임새: 보물 '황금 벽돌'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a shiny golden brick with sparkles.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 25. `item_rod.png` — 보상 아이콘 — 낚싯대 (놀이터)

- 쓰임새: 보물 '낚싯대'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a toy fishing rod with a red-and-white bobber on the line.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 26. `item_tank.png` — 보상 아이콘 — 어항 (놀이터)

- 쓰임새: 보물 '어항'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a round glass fish tank with a happy orange fish and bubbles inside.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 27. `item_hammer.png` — 보상 아이콘 — 장난감 망치 (놀이터)

- 쓰임새: 보물 '장난감 망치'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a cute toy mallet with a red soft head and a wooden handle.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 28. `item_teddy.png` — 보상 아이콘 — 포근 인형 (놀이터)

- 쓰임새: 보물 '포근 인형'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a soft brown teddy bear plush with a stitched smile.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 29. `item_cardbox.png` — 보상 아이콘 — 카드 상자 (놀이터)

- 쓰임새: 보물 '카드 상자'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small open card box holding cards whose backs show stars and a paw print (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 30. `item_frame.png` — 보상 아이콘 — 짝꿍 액자 (놀이터)

- 쓰임새: 보물 '짝꿍 액자'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a wooden double picture frame decorated with a heart, photos left blank.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 31. `item_umbrella.png` — 보상 아이콘 — 우산 (놀이터)

- 쓰임새: 보물 '우산'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a cute open red umbrella with a curved handle.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 32. `item_rainbow.png` — 보상 아이콘 — 무지개 모빌 (놀이터)

- 쓰임새: 보물 '무지개 모빌'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a hanging mobile of a rainbow arch with little clouds on strings.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 33. `item_train.png` — 보상 아이콘 — 기차 모형 (놀이터)

- 쓰임새: 보물 '기차 모형'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a pastel-red toy steam engine model on a short piece of track.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 34. `item_station.png` — 보상 아이콘 — 기차역 표지판 (놀이터)

- 쓰임새: 보물 '기차역 표지판'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small wooden train-station signpost with a blank sign board (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 35. `item_puzzle.png` — 보상 아이콘 — 퍼즐 액자 (놀이터)

- 쓰임새: 보물 '퍼즐 액자'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a wooden frame holding four colourful jigsaw pieces that fit together.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 36. `item_books.png` — 보상 아이콘 — 책 탑 (놀이터)

- 쓰임새: 보물 '책 탑'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a wobbly stack of colourful books with blank spines.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 37. `item_bronze.png` — 보상 아이콘 — 동메달 (배틀)

- 쓰임새: 보물 '동메달'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small bronze trophy cup.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 38. `item_silver.png` — 보상 아이콘 — 은메달 (배틀)

- 쓰임새: 보물 '은메달'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a shiny silver trophy cup.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 39. `item_trophy.png` — 보상 아이콘 — 금 트로피 (배틀)

- 쓰임새: 보물 '금 트로피'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a big golden trophy cup with sparkles.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 40. `item_shield.png` — 보상 아이콘 — 수비대 방패 (배틀)

- 쓰임새: 보물 '수비대 방패'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a round hero shield with a golden paw-print emblem in the middle.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 41. `item_orb.png` — 보상 아이콘 — 책 구슬 램프 (모험 코스)

- 쓰임새: 보물 '책 구슬 램프'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a glowing crystal orb lamp on a brass stand, with a tiny open book shining inside.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 42. `item_door.png` — 보상 아이콘 — 작은 책 문 (모험 코스)

- 쓰임새: 보물 '작은 책 문'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a tiny arched storybook door, slightly open with warm light spilling out.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 43. `item_runmedal.png` — 보상 아이콘 — 완주 메달 (모험 코스)

- 쓰임새: 보물 '완주 메달'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a runner's medal with a star emboss on a striped ribbon (no letters).
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 44. `item_plant.png` — 보상 아이콘 — 화분 (오늘의 모험)

- 쓰임새: 보물 '화분'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a potted leafy green plant in a round clay pot.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 45. `item_sofa.png` — 보상 아이콘 — 소파 (오늘의 모험)

- 쓰임새: 보물 '소파'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small cosy two-seat sofa with round cushions.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 46. `item_lamp.png` — 보상 아이콘 — 전등 (오늘의 모험)

- 쓰임새: 보물 '전등'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a little standing lamp with a warm glowing shade.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 47. `item_yarn.png` — 보상 아이콘 — 털실 바구니 (오늘의 모험)

- 쓰임새: 보물 '털실 바구니'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a woven basket of pastel yarn balls with two knitting needles.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 48. `item_clock.png` — 보상 아이콘 — 벽시계 (오늘의 모험)

- 쓰임새: 보물 '벽시계'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a round wooden wall clock with simple dot markers instead of numbers.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 49. `item_sunflower.png` — 보상 아이콘 — 해바라기 (오늘의 모험)

- 쓰임새: 보물 '해바라기'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a bright sunflower in a small pot.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 50. `item_balloons.png` — 보상 아이콘 — 풍선 (오늘의 모험)

- 쓰임새: 보물 '풍선'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a bunch of colourful balloons tied with a ribbon.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 51. `item_kite.png` — 보상 아이콘 — 연 (오늘의 모험)

- 쓰임새: 보물 '연'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a diamond kite with a long tail of little bows.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 52. `item_star.png` — 보상 아이콘 — 별 전등 (오늘의 모험)

- 쓰임새: 보물 '별 전등'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a star-shaped glowing lamp.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 53. `item_mirror.png` — 보상 아이콘 — 거울 (오늘의 모험)

- 쓰임새: 보물 '거울'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: an oval wall mirror with a carved wooden frame.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 54. `item_basket.png` — 보상 아이콘 — 소풍 바구니 (오늘의 모험)

- 쓰임새: 보물 '소풍 바구니'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a woven picnic basket with a red-checked cloth peeking out.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 55. `item_candle.png` — 보상 아이콘 — 양초 (오늘의 모험)

- 쓰임새: 보물 '양초'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a lit candle in a small brass holder with a gentle flame.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 56. `item_paints.png` — 보상 아이콘 — 그림 도구 (오늘의 모험)

- 쓰임새: 보물 '그림 도구'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a wooden paint palette with brushes and colourful paint dabs.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 57. `item_piano.png` — 보상 아이콘 — 작은 피아노 (오늘의 모험)

- 쓰임새: 보물 '작은 피아노'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a small toy upright piano with an open lid.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 58. `item_scope.png` — 보상 아이콘 — 망원경 (오늘의 모험)

- 쓰임새: 보물 '망원경'. 지금은 3D 이모지 — 그림이 오면 선물 상자·본부 방에서 자동 교체
- 첨부: 보호자가 만든 보상 아이콘 샘플 시트 (열쇠·모래시계 등 — 그 그림체 그대로)

```
A single shiny game reward icon in the exact style of the attached sample sheet (glossy painterly 3D, warm golden light, gentle sparkles, soft rim glow).
Object: a brass telescope on a wooden tripod.
One object only, centred, filling most of the canvas, facing slightly left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

## 3순위 · 동화책 3권 〈소가 된 게으름뱅이〉 (11장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b3_boy_stand.png` — 게으른 소년 돌이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 소가 된 게으름뱅이: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Dori, a chubby little Korean boy about 7 years old: round face, rosy cheeks, a small messy black topknot of hair, sleepy half-closed eyes, a light straw-yellow hanbok jacket (jeogori) with a loose brown tie, baggy indigo trousers (baji) rolled at the ankles, simple straw sandals (from a Korean folk tale in an old (Joseon-era) countryside village).
Pose: standing relaxed with his hands behind his back, a lazy sleepy smile, a big yawn just starting.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b3_boy_sleep.png` — 게으른 소년 돌이 — sleep 포즈

- 쓰임새: 소가 된 게으름뱅이: 장면 연출용 포즈
- 첨부: b3_boy_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: lying curled on his side fast asleep, one arm under his head, mouth slightly open, a happy sleepy face.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b3_boy_happy.png` — 게으른 소년 돌이 — happy 포즈

- 쓰임새: 소가 된 게으름뱅이: 장면 연출용 포즈
- 첨부: b3_boy_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: cheering with both arms up, eyes closed in a big proud smile, a little sweat drop on his forehead.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b3_oxboy_stand.png` — 소가 된 돌이 — 기본 포즈

- 쓰임새: 소가 된 게으름뱅이: 소가 된 돌이 (돌이 그림을 첨부해서 같은 아이로 보이게)
- 첨부: b3_boy_stand.png (방금 만든 돌이) · books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: the same boy Dori turned into a friendly young brown ox: chestnut-brown fur, a cream muzzle, short rounded horns, Dori's messy black topknot still on top of his head between the horns, and Dori's straw-yellow jacket collar with the brown tie around the ox's neck, so you can tell it is him.
The first attached image is Dori before he turned into an ox — keep his hair tuft, his jacket collar and his friendly face so it is clearly the same boy. The second attached image is only the art-style reference.
Pose: standing on four legs facing slightly left, looking surprised and friendly.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b3_oxboy_walk.png` — 소가 된 돌이 — walk 포즈

- 쓰임새: 소가 된 게으름뱅이: 장면 연출용 포즈
- 첨부: b3_oxboy_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: walking forward mid-stride, head a little low as if working hard, a determined happy face.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 6. `b3_old_stand.png` — 탈 할아버지 — 기본 포즈 (먼저 만들기)

- 쓰임새: 소가 된 게으름뱅이: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: a kind, mysterious old Korean grandpa: a long white beard, bushy white eyebrows, twinkling eyes, a black wide-brimmed traditional gat hat, a pale grey hanbok overcoat (durumagi), a wooden A-frame carrier (jige) on his back hung with colourful wooden masks, including a brown ox-head mask (from a Korean folk tale in an old (Joseon-era) countryside village).
Pose: standing and holding up the brown ox-head mask in one hand as if offering it, the mask carrier on his back, a gentle smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 7. `b3_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 소가 된 게으름뱅이: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A Korean countryside farmyard in an old village, late afternoon. On the left, a thatched-roof cottage with a wood-and-paper door, and in front of it a low wooden platform bench (pyeongsang). In the middle, a golden barley field with a dirt path along the front. On the right, a low wooden dining table set outside under a persimmon tree, and behind it an empty ox shed with a wooden gate. Soft hills behind.
Objects the game points at — draw each one clearly at these positions: the wooden platform bench with a brown ox-head hat resting on it at 22% from the left and 62% from the top; the barley field at 55% from the left and 67% from the top; the outdoor dinner table with bowls of rice at 84% from the left and 58% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: a dirt yard and path running across the whole width at about 77–84% of the height, from the cottage door (10% from the left) to the ox-shed gate (93%).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: warm late-afternoon sunshine from the left; main colours straw gold, barley yellow, warm wood brown, soft green.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 8. `b3_page1.png` — 이야기 그림 1

- 쓰임새: 소가 된 게으름뱅이: 순서 맞추기 카드 + 이야기 장면
- 첨부: b3_boy_stand.png · b3_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: A sunny afternoon: Dori naps on the wooden platform bench in front of the thatched cottage, mouth open, a straw fan resting on his tummy. Around him lie chores left undone — a broom on the ground and an empty water jar. A butterfly rests on his toe.
Attached images, in this order: 1) Dori, the lazy boy; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright lazy afternoon sun.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b3_page2.png` — 이야기 그림 2

- 쓰임새: 소가 된 게으름뱅이: 순서 맞추기 카드 + 이야기 장면
- 첨부: b3_boy_stand.png · b3_old_stand.png · b3_oxboy_stand.png · b3_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: In the yard, the mask grandpa gently places the brown ox-head mask on Dori — POOF! a soft cloud of sparkles — and Dori becomes a friendly brown ox (Dori as an ox), staring at his own hooves in surprise while the grandpa smiles kindly.
Attached images, in this order: 1) Dori, the lazy boy; 2) the mask grandpa; 3) Dori as an ox; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: golden afternoon light with magical sparkles.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 10. `b3_page3.png` — 이야기 그림 3

- 쓰임새: 소가 된 게으름뱅이: 순서 맞추기 카드 + 이야기 장면
- 첨부: b3_boy_stand.png · b3_old_stand.png · b3_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Evening: Dori, a boy again, wipes the sweat from his forehead and happily eats a big bowl of rice at the outdoor dinner table, the harvested barley field glowing behind him. Far away on the path, the grandpa waves goodbye.
Attached images, in this order: 1) Dori, the lazy boy; 2) the mask grandpa; 3) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm orange sunset.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 11. `b3_cover.png` — 표지 (세로)

- 쓰임새: 소가 된 게으름뱅이: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b3_boy_stand.png · b3_oxboy_stand.png · b3_old_stand.png · b3_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Dori and Dori-as-an-ox stand side by side in the golden barley field, smiling at the viewer; the mask grandpa peeks out from behind the persimmon tree with his mask carrier.
Attached images, in this order: 1) Dori, the lazy boy; 2) Dori as an ox; 3) the mask grandpa; 4) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 4권 〈해와 달이 된 오누이〉 (11장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b4_sis_stand.png` — 누나 해순이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 해와 달이 된 오누이: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Haesun, a brave little Korean girl about 8: two black braids tied with red ribbons, bright determined eyes, a yellow hanbok jacket with a red ribbon tie and a red skirt (chima), white socks and little flower shoes (from a Korean folk tale in an old mountain village).
Pose: standing bravely with her hands on her hips, a confident smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b4_sis_scared.png` — 누나 해순이 — scared 포즈

- 쓰임새: 해와 달이 된 오누이: 장면 연출용 포즈
- 첨부: b4_sis_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: hugging herself with wide worried eyes, scared but brave.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b4_bro_stand.png` — 동생 달이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 해와 달이 된 오누이: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Dal, her little brother about 5: round cheeks, a neat bowl haircut, a pale sky-blue hanbok jacket and white trousers, a tiny silver crescent-moon charm on a string around his neck (from a Korean folk tale in an old mountain village).
Pose: standing shyly and holding a small round rice cake in both hands, a sweet smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b4_bro_scared.png` — 동생 달이 — scared 포즈

- 쓰임새: 해와 달이 된 오누이: 장면 연출용 포즈
- 첨부: b4_bro_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: crouching and covering his eyes with both hands, peeking through his fingers.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b4_tig_stand.png` — 떡 좋아하는 호랑이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 해와 달이 된 오누이: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: a big, round, silly orange tiger with black stripes: a white muzzle with rice-cake crumbs on it, big goofy eyes, a white cloth headscarf tied under his chin as a clumsy disguise; more funny than scary, no sharp fangs (from a Korean folk tale in an old mountain village).
Pose: standing on his hind legs with his paws together, a silly sneaky grin.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 6. `b4_tig_prowl.png` — 떡 좋아하는 호랑이 — prowl 포즈

- 쓰임새: 해와 달이 된 오누이: 장면 연출용 포즈
- 첨부: b4_tig_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: on all fours, tiptoeing sneakily with his tail up, a cheeky grin.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 7. `b4_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 해와 달이 된 오누이: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A cozy mountain village at night under a deep-blue starry sky (calm, not scary). On the left, a thatched cottage with a wooden door left open a crack and a softly glowing paper lantern beside it. In the middle, a huge old tree in the backyard, its trunk and wide branches reaching up into the starry sky. On the right, a gentle grassy hill with a winding path and rice fields far behind.
Objects the game points at — draw each one clearly at these positions: the cottage door with its narrow gap at 24% from the left and 62% from the top; the big tree's trunk and lower branches at 52% from the left and 53% from the top; a faint golden rope hanging down from the sky near the treetop at 52% from the left and 31% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the ground across the whole width at about 80–82% of the height (from 14% to 94% from the left); in the big tree, a sturdy wide branch at 52% from the left and 58% from the top and a higher wide branch at 52% / 42%, where the two children sit; the rope's end at 52% / 30%.
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: soft starlight and a warm lantern glow at the cottage; main colours deep blue, soft gold, warm brown, moss green.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 8. `b4_page1.png` — 이야기 그림 1

- 쓰임새: 해와 달이 된 오누이: 순서 맞추기 카드 + 이야기 장면
- 첨부: b4_sis_stand.png · b4_bro_stand.png · b4_tig_stand.png · b4_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Night inside the cottage: Haesun and Dal hold each other behind the wooden door and peek through the narrow gap. Through the gap you can see a fluffy orange striped tiger tail swishing outside. A small candle glows. A little suspense, but cute.
Attached images, in this order: 1) Haesun, the big sister; 2) Dal, the little brother; 3) the silly tiger; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm candlelight inside, cool blue night outside.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b4_page2.png` — 이야기 그림 2

- 쓰임새: 해와 달이 된 오누이: 순서 맞추기 카드 + 이야기 장면
- 첨부: b4_sis_stand.png · b4_bro_stand.png · b4_tig_stand.png · b4_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Haesun and Dal sit high in the branches of the big tree, hands together, making a wish. From the starry sky a thick golden rope slowly comes down towards them. At the bottom of the tree the tiger looks up, puzzled, scratching his head.
Attached images, in this order: 1) Haesun, the big sister; 2) Dal, the little brother; 3) the silly tiger; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: starlight with a golden glow from the rope.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 10. `b4_page3.png` — 이야기 그림 3

- 쓰임새: 해와 달이 된 오누이: 순서 맞추기 카드 + 이야기 장면
- 첨부: b4_sis_stand.png · b4_bro_stand.png · b4_tig_stand.png · b4_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: High in the sky: Haesun glows warmly as the sun, with a golden halo of light around her, and Dal glows gently as the moon, with a soft silver glow; both smile down at the sleeping village. Far below on the hill, the tiger sits sulking with a rice cake.
Attached images, in this order: 1) Haesun, the big sister; 2) Dal, the little brother; 3) the silly tiger; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: half golden sunrise, half silver moonlight.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 11. `b4_cover.png` — 표지 (세로)

- 쓰임새: 해와 달이 된 오누이: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b4_sis_stand.png · b4_bro_stand.png · b4_tig_stand.png · b4_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Haesun and Dal stand hand in hand in front of the big tree; the golden rope hangs from the starry sky behind them, a sun and a crescent moon glow softly above, and the silly tiger peeks out from behind the cottage.
Attached images, in this order: 1) Haesun, the big sister; 2) Dal, the little brother; 3) the silly tiger; 4) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 5권 〈비를 잃어버린 꼬마 용〉 (9장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b5_yong_stand.png` — 꼬마 용 이슬이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 비를 잃어버린 꼬마 용: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Iseul, a small baby dragon: pale sky-blue scales, a soft white belly, tiny fluffy cloud-shaped wings, two little rounded horns, big round shiny eyes, a short curly tail, a small water-drop pendant on a blue ribbon (from a gentle fantasy story in a village above the clouds).
Pose: standing on her hind legs with her tiny wings open, a cheerful eager smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b5_yong_sad.png` — 꼬마 용 이슬이 — sad 포즈

- 쓰임새: 비를 잃어버린 꼬마 용: 장면 연출용 포즈
- 첨부: b5_yong_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: sitting with her tail curled around her, head down, teary eyes.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b5_yong_fly.png` — 꼬마 용 이슬이 — fly 포즈

- 쓰임새: 비를 잃어버린 꼬마 용: 장면 연출용 포즈
- 첨부: b5_yong_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: flying with her wings spread wide and her arms stretched forward, joyful.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b5_cloud_stand.png` — 구름 할머니 — 기본 포즈 (먼저 만들기)

- 쓰임새: 비를 잃어버린 꼬마 용: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Grandma Cloud, a gentle grandmother made of soft white cloud: a round kind face with rosy cheeks, little round glasses, fluffy cloud hair in a bun, a light-grey misty shawl, holding a small wooden spell book (from a gentle fantasy story in a village above the clouds).
Pose: floating just above the bottom edge, holding her spell book open, smiling kindly.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b5_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 비를 잃어버린 꼬마 용: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A little village on a floating island above the clouds, daytime. On the left, a small round cloud-cottage with a wooden desk outside holding an open spell book (its pages show only little cloud-and-raindrop doodles). In the middle, a flower-field village with colourful flowers, a stone well and little cottages. On the right, soft rolling cloud hills rising up into the sky.
Objects the game points at — draw each one clearly at these positions: the open spell book on the desk at 26% from the left and 57% from the top; the village flower field at 57% from the left and 65% from the top; the top of the tallest cloud hill at 86% from the left and 40% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the grass across the picture at about 74–80% of the height (from 16% to 80% from the left); a flat walkable top on the right cloud hill at 86% from the left and 53% from the top; open sky around 60% / 30% (the dragon flies there).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: soft pastel daylight; main colours sky blue, cloud white, flower pink and yellow, grass green.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 6. `b5_page1.png` — 이야기 그림 1

- 쓰임새: 비를 잃어버린 꼬마 용: 순서 맞추기 카드 + 이야기 장면
- 첨부: b5_yong_stand.png · b5_cloud_stand.png · b5_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: At the wooden desk, Grandma Cloud teaches Iseul a rain spell, pointing at the open spell book (its pages show only little cloud-and-raindrop doodles, no writing). Iseul listens eagerly with sparkling eyes.
Attached images, in this order: 1) Iseul, the baby dragon; 2) Grandma Cloud; 3) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: soft morning light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 7. `b5_page2.png` — 이야기 그림 2

- 쓰임새: 비를 잃어버린 꼬마 용: 순서 맞추기 카드 + 이야기 장면
- 첨부: b5_yong_stand.png · b5_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: The flower field has wilted and drooped in the dry heat; the ground is cracked. Small village animal friends (a bunny and a duckling) hold empty watering cans and look up hopefully, while Iseul sits sadly with her head down.
Attached images, in this order: 1) Iseul, the baby dragon; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: hot, hazy, washed-out sunlight.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b5_page3.png` — 이야기 그림 3

- 쓰임새: 비를 잃어버린 꼬마 용: 순서 맞추기 카드 + 이야기 장면
- 첨부: b5_yong_stand.png · b5_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Happy grey clouds pour gentle rain, a big rainbow arches across the sky and the flower field bursts into bloom. Iseul flies joyfully with her arms spread while the village friends dance in the rain.
Attached images, in this order: 1) Iseul, the baby dragon; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: fresh light after rain with a bright rainbow.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b5_cover.png` — 표지 (세로)

- 쓰임새: 비를 잃어버린 꼬마 용: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b5_yong_stand.png · b5_cloud_stand.png · b5_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Iseul flies happily in front of a rainbow and gentle rain clouds; Grandma Cloud smiles down from a cloud above and the flower village sits below.
Attached images, in this order: 1) Iseul, the baby dragon; 2) Grandma Cloud; 3) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 6권 〈뱀의 숲속 우체국〉 (9장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b6_post_stand.png` — 우체부 뱀 슈룩이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 뱀의 숲속 우체국: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Shuruk, a friendly mail-carrier snake: bright leaf-green scales with a cream belly, big friendly eyes, a little navy-blue postman cap with a gold button (no writing), a brown leather mail satchel strapped across his body (from a cozy forest story).
Pose: coiled upright and smiling, holding one blank envelope in the tip of his tail.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b6_post_slide.png` — 우체부 뱀 슈룩이 — slide 포즈

- 쓰임새: 뱀의 숲속 우체국: 장면 연출용 포즈
- 첨부: b6_post_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: sliding forward fast in an S-curve, holding his cap on with his tail tip, blank envelopes fluttering out of the satchel.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b6_owl_stand.png` — 부엉이 부부장 — 기본 포즈 (먼저 만들기)

- 쓰임새: 뱀의 숲속 우체국: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Bubu, a round fluffy brown owl: big amber eyes, fluffy ear tufts, a cream chest, a small purple bow tie (from a cozy forest story).
Pose: standing calmly with her wings folded.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b6_owl_happy.png` — 부엉이 부부장 — happy 포즈

- 쓰임새: 뱀의 숲속 우체국: 장면 연출용 포즈
- 첨부: b6_owl_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: raising her wings in delight, holding a blank birthday invitation card with a balloon picture.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b6_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 뱀의 숲속 우체국: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A sunny forest. On the left, a small post office built into a big tree stump, with a round door and a mail satchel hanging on a peg outside. In the middle, a winding forest path with a red round-topped mailbox (blank, no writing). On the right, the owl's big old tree with a round hollow window on the trunk and branches spreading above.
Objects the game points at — draw each one clearly at these positions: the mail satchel by the post office at 22% from the left and 60% from the top; the red mailbox at 44% from the left and 64% from the top; the owl's hollow window at 86% from the left and 45% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the forest path across the picture at about 77–82% of the height (from 14% to 78% from the left); a small ledge in front of the owl's hollow at 86% from the left and 58% from the top, and a thick branch at 92% / 55% (the owl stands there).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: dappled morning sunlight through the leaves; main colours leaf green, warm brown, mailbox red, golden light.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 6. `b6_page1.png` — 이야기 그림 1

- 쓰임새: 뱀의 숲속 우체국: 순서 맞추기 카드 + 이야기 장면
- 첨부: b6_post_stand.png · b6_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Forest friends (a squirrel, a rabbit and a hedgehog) drop envelopes into the red mailbox while Shuruk smiles beside it with his satchel. The envelopes are blank, with only tiny heart or star stickers.
Attached images, in this order: 1) Shuruk, the mail snake; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright cheerful morning.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 7. `b6_page2.png` — 이야기 그림 2

- 쓰임새: 뱀의 숲속 우체국: 순서 맞추기 카드 + 이야기 장면
- 첨부: b6_post_stand.png · b6_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Inside the post office, a soft gloomy shadow with a sneaky cat-shaped silhouette falls over the desk; blank envelopes are scattered and mixed up everywhere, and Shuruk looks confused.
Attached images, in this order: 1) Shuruk, the mail snake; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: dim, shadowy light with one warm lamp.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b6_page3.png` — 이야기 그림 3

- 쓰임새: 뱀의 숲속 우체국: 순서 맞추기 카드 + 이야기 장면
- 첨부: b6_post_stand.png · b6_owl_stand.png · b6_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: At the big tree, Bubu the owl happily holds her birthday invitation (a blank card with a balloon picture) while Shuruk delivers it with a bow; balloons and little party lanterns hang on the branches.
Attached images, in this order: 1) Shuruk, the mail snake; 2) Bubu, the owl; 3) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm golden evening light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b6_cover.png` — 표지 (세로)

- 쓰임새: 뱀의 숲속 우체국: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b6_post_stand.png · b6_owl_stand.png · b6_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Shuruk with his satchel on the forest path, blank envelopes flying around him like butterflies, and Bubu the owl smiling from a branch above.
Attached images, in this order: 1) Shuruk, the mail snake; 2) Bubu, the owl; 3) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 7권 〈바람을 배달하는 말〉 (8장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b7_dal_stand.png` — 배달 말 다그닥이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 바람을 배달하는 말: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Dagdak, a young chestnut-brown horse: a cream mane and tail, a big friendly smile, a green delivery cap (no writing), a little brown neck scarf (from a summer countryside story).
Pose: standing proudly with one front hoof raised, cheerful.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b7_dal_run.png` — 배달 말 다그닥이 — run 포즈

- 쓰임새: 바람을 배달하는 말: 장면 연출용 포즈
- 첨부: b7_dal_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: galloping fast with his mane and tail flowing.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b7_mill_stand.png` — 풍차 마을 아저씨 — 기본 포즈 (먼저 만들기)

- 쓰임새: 바람을 배달하는 말: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Uncle Windmill, a jolly round brown bear: blue overalls, a straw sun hat, a red handkerchief in his pocket, a big kind smile (from a summer countryside story).
Pose: standing and waving one paw while fanning himself with his straw hat in the other.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b7_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 바람을 배달하는 말: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A summer countryside. On the left, a cozy wooden stable with a big picture map pinned to its outside wall (only drawn paths, hills and windmills — no writing) and a small wooden cart beside it carrying a big glass jar full of swirling pale-blue breeze. In the middle, a sunny dirt lane through green summer fields. On the right, a windmill village with three wooden windmills, and behind them, far away, a tall mountain.
Objects the game points at — draw each one clearly at these positions: the picture map on the stable wall at 20% from the left and 57% from the top; the cart with the breeze jar at 32% from the left and 60% from the top; the windmills at 66% from the left and 60% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the lane and village ground across the picture at about 74–82% of the height (from 12% to 86% from the left); the small flat top of the far mountain at 88% from the left and 40% from the top (a tiny cart can sit there).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: hot, bright summer sun; main colours sunny yellow, field green, warm wood, breeze blue.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 5. `b7_page1.png` — 이야기 그림 1

- 쓰임새: 바람을 배달하는 말: 순서 맞추기 카드 + 이야기 장면
- 첨부: b7_dal_stand.png · b7_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: At the stable, Dagdak scoops swirling pale-blue breeze into the big glass jar on his cart with a little net; the picture map hangs on the wall behind him.
Attached images, in this order: 1) Dagdak, the delivery horse; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright morning sun.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 6. `b7_page2.png` — 이야기 그림 2

- 쓰임새: 바람을 배달하는 말: 순서 맞추기 카드 + 이야기 장면
- 첨부: b7_mill_stand.png · b7_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: In the windmill village on a hot day the windmills stand completely still; Uncle Windmill and small village animals fan themselves, sweating, waiting by the lane. Heat shimmer and a blazing sun.
Attached images, in this order: 1) Uncle Windmill, the bear; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: hot, glaring midday sun.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 7. `b7_page3.png` — 이야기 그림 3

- 쓰임새: 바람을 배달하는 말: 순서 맞추기 카드 + 이야기 장면
- 첨부: b7_dal_stand.png · b7_mill_stand.png · b7_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Dagdak arrives and opens the jar — cool pale-blue breeze whooshes out in swirls, the windmills spin fast, Uncle Windmill's hat flies off and everyone cheers.
Attached images, in this order: 1) Dagdak, the delivery horse; 2) Uncle Windmill, the bear; 3) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: fresh breezy afternoon light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b7_cover.png` — 표지 (세로)

- 쓰임새: 바람을 배달하는 말: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b7_dal_stand.png · b7_mill_stand.png · b7_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Dagdak gallops along the lane pulling his cart with the glowing breeze jar, windmills turning behind him and swirls of breeze all around.
Attached images, in this order: 1) Dagdak, the delivery horse; 2) Uncle Windmill, the bear; 3) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 8권 〈양치기 소년〉 (10장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b8_shep_stand.png` — 양치기 소년 메에 — 기본 포즈 (먼저 만들기)

- 쓰임새: 양치기 소년: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Mee, a cheerful shepherd boy about 8: curly light-brown hair, freckles, a green tunic with a rope belt, brown shorts, a small brown cap, holding a wooden shepherd's crook (from a classic fable on green hills).
Pose: standing with his crook, a cheeky smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b8_shep_shout.png` — 양치기 소년 메에 — shout 포즈

- 쓰임새: 양치기 소년: 장면 연출용 포즈
- 첨부: b8_shep_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: on tiptoes with his hands cupped around his mouth, shouting.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b8_lamb_stand.png` — 아기 양 뭉게 — 기본 포즈 (먼저 만들기)

- 쓰임새: 양치기 소년: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Mungge, a tiny fluffy white lamb: a cloud-like fleece, a pink nose, a small blue bell on a ribbon (from a classic fable on green hills).
Pose: standing on four legs and looking up sweetly.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b8_wolf_stand.png` — 늑대 — 기본 포즈 (먼저 만들기)

- 쓰임새: 양치기 소년: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: a lanky grey wolf: big pointy ears, yellow eyes, a bushy tail, a sly mischievous grin with no sharp fangs — sneaky, not scary (from a classic fable on green hills).
Pose: standing on his hind legs rubbing his paws together, a sly grin.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b8_wolf_run.png` — 늑대 — run 포즈

- 쓰임새: 양치기 소년: 장면 연출용 포즈
- 첨부: b8_wolf_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: running fast on all fours with his ears back.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 6. `b8_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 양치기 소년: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: Green rolling hills on a sunny day. On the left, a big smooth grey "promise rock". In the middle, an open sheep meadow with soft grass and a few round bushes. On the right, a little village with a wooden post holding a bronze bell, and cottage roofs behind it.
Objects the game points at — draw each one clearly at these positions: the promise rock at 20% from the left and 60% from the top; a leafy bush at 64% from the left and 64% from the top; the village bell at 82% from the left and 57% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the meadow ground across the whole width at about 75–82% of the height (from 6% to 90% from the left).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: a fresh sunny morning; main colours grass green, sky blue, rock grey, warm roof red.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 7. `b8_page1.png` — 이야기 그림 1

- 쓰임새: 양치기 소년: 순서 맞추기 카드 + 이야기 장면
- 첨부: b8_shep_stand.png · b8_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: On the hill, Mee cups his hands and shouts while his friends from the village (a farmer goat, a baker pig and others) run up the path with brooms and buckets — then look around, puzzled, because there is no wolf. Mee giggles.
Attached images, in this order: 1) Mee, the shepherd boy; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright morning.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b8_page2.png` — 이야기 그림 2

- 쓰임새: 양치기 소년: 순서 맞추기 카드 + 이야기 장면
- 첨부: b8_shep_stand.png · b8_lamb_stand.png · b8_wolf_stand.png · b8_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: A real wolf appears at the edge of the meadow. Little Mungge trembles behind a bush. Mee shouts for help, but the friends in the distance shrug and do not come.
Attached images, in this order: 1) Mee, the shepherd boy; 2) Mungge, the baby lamb; 3) the wolf; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: a cloudy afternoon.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b8_page3.png` — 이야기 그림 3

- 쓰임새: 양치기 소년: 순서 맞추기 카드 + 이야기 장면
- 첨부: b8_shep_stand.png · b8_lamb_stand.png · b8_wolf_stand.png · b8_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: At the promise rock, Mee holds his hand on his heart and makes an honest promise, with Mungge safe in his arms; the friends walk back smiling and the wolf runs away over the hill.
Attached images, in this order: 1) Mee, the shepherd boy; 2) Mungge, the baby lamb; 3) the wolf; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm hopeful sunset.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 10. `b8_cover.png` — 표지 (세로)

- 쓰임새: 양치기 소년: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b8_shep_stand.png · b8_lamb_stand.png · b8_wolf_stand.png · b8_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Mee hugs Mungge on the green hill and smiles at the viewer, while the wolf peeks out from a bush far away.
Attached images, in this order: 1) Mee, the shepherd boy; 2) Mungge, the baby lamb; 3) the wolf; 4) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 9권 〈원숭이의 뒤죽박죽 도서관〉 (9장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b9_mon_stand.png` — 사서 원숭이 또로 — 기본 포즈 (먼저 만들기)

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Ttoro, a librarian monkey: light-brown fur, a cream face, round glasses, a mustard-yellow cardigan with elbow patches, a long curly tail (no goggles, no aviator clothes) (from a cozy library inside a giant tree).
Pose: standing and holding a tall stack of books, a proud smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b9_mon_hang.png` — 사서 원숭이 또로 — hang 포즈

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 장면 연출용 포즈
- 첨부: b9_mon_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: hanging from a ladder rung by his tail and one hand, reaching out with a book.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b9_pand_stand.png` — 꼬마 판다 포포 — 기본 포즈 (먼저 만들기)

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Popo, a small round baby panda: soft black-and-white fur, a little red backpack, holding a dinosaur picture book whose cover shows only a green dinosaur picture (no writing) (from a cozy library inside a giant tree).
Pose: standing with his backpack, looking up curiously.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b9_pand_happy.png` — 꼬마 판다 포포 — happy 포즈

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 장면 연출용 포즈
- 첨부: b9_pand_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: hugging the dinosaur book with his eyes closed in joy.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b9_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A cozy library inside a giant tree. On the left, tall wooden bookshelves whose sections are marked with blank coloured label tabs (no letters), and a librarian's desk. In the middle, a book return cart and a tall rolling ladder leaning on the shelves. On the right, a cozy reading nook with cushions under a round window.
Objects the game points at — draw each one clearly at these positions: the shelf section with the coloured label tabs at 24% from the left and 57% from the top; the book return cart at 48% from the left and 60% from the top; the reading nook at 70% from the left and 62% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the wooden floor across the picture at about 74–79% of the height (from 12% to 92% from the left); a ladder rung at 52% from the left and 47% from the top (the monkey hangs there).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: warm golden lamp light with soft daylight from the window; main colours honey wood, warm amber, soft green, book reds and blues.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 6. `b9_page1.png` — 이야기 그림 1

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 순서 맞추기 카드 + 이야기 장면
- 첨부: b9_mon_stand.png · b9_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Neat bookshelves with books lined up by colour sections; Ttoro proudly slides the last book into its place.
Attached images, in this order: 1) Ttoro, the librarian monkey; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: calm warm morning light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 7. `b9_page2.png` — 이야기 그림 2

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 순서 맞추기 카드 + 이야기 장면
- 첨부: b9_mon_stand.png · b9_pand_stand.png · b9_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Books are scattered everywhere in a big jumble. Popo stands teary-eyed beside an empty gap on the shelf while Ttoro hangs from the ladder, looking embarrassed.
Attached images, in this order: 1) Ttoro, the librarian monkey; 2) Popo, the baby panda; 3) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm lamp light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b9_page3.png` — 이야기 그림 3

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 순서 맞추기 카드 + 이야기 장면
- 첨부: b9_mon_stand.png · b9_pand_stand.png · b9_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Popo happily hugs the dinosaur picture book in the reading nook while Ttoro smiles beside a tidy shelf.
Attached images, in this order: 1) Ttoro, the librarian monkey; 2) Popo, the baby panda; 3) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: golden late-afternoon light from the window.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b9_cover.png` — 표지 (세로)

- 쓰임새: 원숭이의 뒤죽박죽 도서관: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b9_mon_stand.png · b9_pand_stand.png · b9_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Ttoro swings from the rolling ladder with a stack of books while Popo reads happily in the cozy nook below.
Attached images, in this order: 1) Ttoro, the librarian monkey; 2) Popo, the baby panda; 3) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 10권 〈빨간 암탉〉 (9장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b10_hen_stand.png` — 빨간 암탉 — 기본 포즈 (먼저 만들기)

- 쓰임새: 빨간 암탉: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: the Little Red Hen: glossy red-brown feathers, a small red comb, a white apron with a tiny wheat pattern, a straw headscarf — hardworking and kind (from a classic farm fable).
Pose: standing with her wings on her hips, a determined smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b10_hen_work.png` — 빨간 암탉 — work 포즈

- 쓰임새: 빨간 암탉: 장면 연출용 포즈
- 첨부: b10_hen_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: carrying a small sack of wheat on her back, working hard.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b10_duck_stand.png` — 오리 둥둥 — 기본 포즈 (먼저 만들기)

- 쓰임새: 빨간 암탉: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Dungdung, a lazy white duck: an orange beak and feet, a blue sailor collar, sleepy eyes (from a classic farm fable).
Pose: standing with a big lazy yawn.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b10_bird_stand.png` — 참새 짹짹 — 기본 포즈 (먼저 만들기)

- 쓰임새: 빨간 암탉: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Jjaekjjaek, a small brown sparrow: a round body, a tiny green scarf, playful (from a classic farm fable).
Pose: standing on tiny feet with its wings slightly open, chirpy.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b10_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 빨간 암탉: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A small farm on a sunny day. On the left, a golden wheat field. In the middle, a farmyard with a wooden table for kneading dough. On the right, a dome-shaped stone bread oven and a wooden dining table outside. A little pond at the far left edge.
Objects the game points at — draw each one clearly at these positions: the wheat field at 25% from the left and 64% from the top; the stone oven at 72% from the left and 58% from the top; the dining table at 84% from the left and 62% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the farmyard ground across the whole width at about 77–82% of the height (from 10% to 92% from the left).
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: a warm sunny afternoon; main colours wheat gold, barn red, stone grey, grass green.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 6. `b10_page1.png` — 이야기 그림 1

- 쓰임새: 빨간 암탉: 순서 맞추기 카드 + 이야기 장면
- 첨부: b10_hen_stand.png · b10_duck_stand.png · b10_bird_stand.png · b10_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: The Little Red Hen plants wheat seeds alone in the field, wiping her brow, while Dungdung naps under a tree and Jjaekjjaek plays on a fence.
Attached images, in this order: 1) the Little Red Hen; 2) Dungdung, the duck; 3) Jjaekjjaek, the sparrow; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright midday sun.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 7. `b10_page2.png` — 이야기 그림 2

- 쓰임새: 빨간 암탉: 순서 맞추기 카드 + 이야기 장면
- 첨부: b10_hen_stand.png · b10_duck_stand.png · b10_bird_stand.png · b10_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: The hen takes a golden loaf of bread out of the stone oven; Dungdung and Jjaekjjaek peek over the table, drooling.
Attached images, in this order: 1) the Little Red Hen; 2) Dungdung, the duck; 3) Jjaekjjaek, the sparrow; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm glow from the oven.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b10_page3.png` — 이야기 그림 3

- 쓰임새: 빨간 암탉: 순서 맞추기 카드 + 이야기 장면
- 첨부: b10_hen_stand.png · b10_duck_stand.png · b10_bird_stand.png · b10_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: All three sit together at the outdoor table sharing warm bread and smiling.
Attached images, in this order: 1) the Little Red Hen; 2) Dungdung, the duck; 3) Jjaekjjaek, the sparrow; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: soft golden evening light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b10_cover.png` — 표지 (세로)

- 쓰임새: 빨간 암탉: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b10_hen_stand.png · b10_duck_stand.png · b10_bird_stand.png · b10_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: The Little Red Hen holds a fresh golden loaf with Dungdung and Jjaekjjaek beside her and the wheat field behind.
Attached images, in this order: 1) the Little Red Hen; 2) Dungdung, the duck; 3) Jjaekjjaek, the sparrow; 4) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 11권 〈개와 그림자〉 (8장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b11_pup_stand.png` — 강아지 콩이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 개와 그림자: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Kongi, a small cream-and-brown puppy: floppy ears, a brown patch over one eye, a red collar with a round blank tag, a wagging tail (from a classic fable in the countryside).
Pose: standing proudly with a big bone in his mouth.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b11_pup_look.png` — 강아지 콩이 — look 포즈

- 쓰임새: 개와 그림자: 장면 연출용 포즈
- 첨부: b11_pup_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: leaning forward and looking down curiously, the bone in his mouth.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b11_pup_happy.png` — 강아지 콩이 — happy 포즈

- 쓰임새: 개와 그림자: 장면 연출용 포즈
- 첨부: b11_pup_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: sitting with his eyes closed in a happy smile, tail wagging, the bone between his front paws.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b11_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 개와 그림자: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A sunny countryside. On the left, a walking path lined with wildflowers. In the middle, a clear calm stream crossed by a single log bridge, with reeds along the banks. On the right, a home yard with a little red dog house and a low fence.
Objects the game points at — draw each one clearly at these positions: the log bridge at 50% from the left and 53% from the top; the calm, mirror-like stream water at 52% from the left and 74% from the top; the dog-house yard at 84% from the left and 60% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the path on the left (16–26% from the left) and the yard on the right (66–92%) at about 77–82% of the height; the top of the log bridge, a walkable log from 38% to 62% from the left at about 69% of the height; the stream fills the bottom middle below the bridge.
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: a clear sunny day; main colours grass green, water blue, warm wood, dog-house red.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 5. `b11_page1.png` — 이야기 그림 1

- 쓰임새: 개와 그림자: 순서 맞추기 카드 + 이야기 장면
- 첨부: b11_pup_stand.png · b11_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Kongi trots onto the log bridge carrying a big bone in his mouth, proud and happy.
Attached images, in this order: 1) Kongi, the puppy; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright sunny morning.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 6. `b11_page2.png` — 이야기 그림 2

- 쓰임새: 개와 그림자: 순서 맞추기 카드 + 이야기 장면
- 첨부: b11_pup_stand.png · b11_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: On the bridge, Kongi stares down at his reflection in the calm water — the reflection also holds a bone; Kongi looks curious and greedy.
Attached images, in this order: 1) Kongi, the puppy; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: clear midday light with a shiny water surface.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 7. `b11_page3.png` — 이야기 그림 3

- 쓰임새: 개와 그림자: 순서 맞추기 카드 + 이야기 장면
- 첨부: b11_pup_stand.png · b11_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Sunset in the home yard: Kongi happily chews his bone in front of his little red dog house.
Attached images, in this order: 1) Kongi, the puppy; 2) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm orange sunset.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 8. `b11_cover.png` — 표지 (세로)

- 쓰임새: 개와 그림자: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b11_pup_stand.png · b11_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: Kongi stands on the log bridge with his bone while his reflection shows in the water below, with flowers along the banks.
Attached images, in this order: 1) Kongi, the puppy; 2) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 3순위 · 동화책 12권 〈아기 돼지 삼 형제〉 (11장)

순서대로 만드세요: ① 인물 기본 포즈 → ② 다른 포즈(기본 포즈 첨부) → ③ 무대 → ④ 이야기 그림(인물+무대 첨부) → ⑤ 표지. 한 권은 ChatGPT 대화 하나에서 이어서 만들면 그림체가 잘 맞아요.

### 1. `b12_p1_stand.png` — 첫째 솔솔이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 아기 돼지 삼 형제: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Solsol, the first little piglet: soft pink, a yellow straw hat, a light-blue scarf, relaxed and dreamy (from a classic fairy tale on a sunny meadow).
Pose: standing and holding a bundle of straw, a relaxed smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `b12_p2_stand.png` — 둘째 뚝딱이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 아기 돼지 삼 형제: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Ttukttak, the second little piglet: soft pink, a green cap, red overalls, a small wooden hammer (from a classic fairy tale on a sunny meadow).
Pose: standing and holding his hammer up, cheerful.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `b12_p3_stand.png` — 셋째 차근이 — 기본 포즈 (먼저 만들기)

- 쓰임새: 아기 돼지 삼 형제: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: Chageun, the third little piglet: soft pink, round glasses, an orange hard hat, denim overalls, careful and clever (from a classic fairy tale on a sunny meadow).
Pose: standing and holding a red brick, a thoughtful smile.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `b12_pig_scared.png` — 첫째 솔솔이 — scared 포즈

- 쓰임새: 아기 돼지 삼 형제: 장면 연출용 포즈
- 첨부: b12_p1_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: running in fright with his arms up and his straw hat flying off.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `b12_wolf_stand.png` — 입김 센 늑대 — 기본 포즈 (먼저 만들기)

- 쓰임새: 아기 돼지 삼 형제: 장면에서 움직이는 인물. 이 그림이 이 인물의 기준이 돼요
- 첨부: books/b2/country_stand.webp (그림체 기준)

```
A single character for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D, rounded friendly shapes). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Character: a big grey wolf with a red neckerchief and big puffy cheeks, silly and clumsy, no sharp fangs (from a classic fairy tale on a sunny meadow).
Pose: standing with his paws on his belly, a sly grin.
Whole body visible, three-quarter view facing slightly to the viewer's left, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 6. `b12_wolf_blow.png` — 입김 센 늑대 — blow 포즈

- 쓰임새: 아기 돼지 삼 형제: 장면 연출용 포즈
- 첨부: b12_wolf_stand.png (이 인물의 기본 포즈)

```
Use the attached image as the character reference and keep the character EXACTLY the same: the same face, colours, clothes, accessories, proportions and 3D rendering. Change only the pose.
New pose: leaning forward and blowing hard with huge puffed cheeks.
Whole body visible, the same size as the reference, feet near the bottom edge, nothing cropped.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 7. `b12_spread.png` — 무대 (현장 조사 배경)

- 쓰임새: 아기 돼지 삼 형제: 현장 조사 무대. 반짝이 단서가 이 그림의 물건 위에 뜨고, 인물들이 정해진 자리에 서요
- 첨부: books/b2/spread.webp (무대 그림체·형식 기준)

```
A wide stage background for a cute 3D animated children's storybook game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: A sunny meadow with three little houses in a row. On the left, a straw house. In the middle, a wooden house. On the right, a red brick house with a chimney. All the doors are closed; flowers and a path connect the houses.
Objects the game points at — draw each one clearly at these positions: the straw house at 16% from the left and 60% from the top; the wooden house at 44% from the left and 58% from the top; the brick house at 74% from the left and 55% from the top.
Where characters will stand (their feet), so these must be open, walkable surfaces: the path and meadow across the whole width at about 75–84% of the height (from 6% to 92% from the left), passing in front of all three doors.
Camera: straight on, at a small child's eye level, like a doll-house stage.
Composition: low contrast overall so characters placed on top stand out. The game trims about 8% at the top and 8% at the bottom, so keep those strips plain (only sky, ceiling or ground). All positions above are measured in the full picture.
Light: a bright cheerful day; main colours straw yellow, warm wood, brick red, meadow green.
IMPORTANT: no characters, animals or people in this picture.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 8. `b12_page1.png` — 이야기 그림 1

- 쓰임새: 아기 돼지 삼 형제: 순서 맞추기 카드 + 이야기 장면
- 첨부: b12_p1_stand.png · b12_p2_stand.png · b12_p3_stand.png · b12_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: The three piglets build their houses: Solsol stacks straw, Ttukttak hammers wooden planks and Chageun carefully lays bricks.
Attached images, in this order: 1) Solsol, the first piglet; 2) Ttukttak, the second piglet; 3) Chageun, the third piglet; 4) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: bright morning sun.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 9. `b12_page2.png` — 이야기 그림 2

- 쓰임새: 아기 돼지 삼 형제: 순서 맞추기 카드 + 이야기 장면
- 첨부: b12_wolf_stand.png · b12_p1_stand.png · b12_p2_stand.png · b12_p3_stand.png · b12_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: The wolf blows hard with puffed cheeks and the straw house flies apart in a whoosh of straw; the piglets run towards the brick house.
Attached images, in this order: 1) the wolf; 2) Solsol, the first piglet; 3) Ttukttak, the second piglet; 4) Chageun, the third piglet; 5) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: windy afternoon light.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 10. `b12_page3.png` — 이야기 그림 3

- 쓰임새: 아기 돼지 삼 형제: 순서 맞추기 카드 + 이야기 장면
- 첨부: b12_p1_stand.png · b12_p2_stand.png · b12_p3_stand.png · b12_wolf_stand.png · b12_spread.png (무대)

```
A full storybook illustration that fills the whole picture, for a cute 3D animated children's game.
Scene: Inside the cozy brick house the three piglets sit safely by the fireplace, laughing; through the window, the wolf outside looks dizzy and gives up.
Attached images, in this order: 1) Solsol, the first piglet; 2) Ttukttak, the second piglet; 3) Chageun, the third piglet; 4) the wolf; 5) the stage. Keep every character EXACTLY the same as in its image (face, colours, clothes, proportions). The stage image is the story world — keep its places and its art style.
Camera: at a small child's eye level, slightly wide; the main characters in the middle of the height.
Light: warm firelight inside, cool evening outside.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape). The game may trim about 8% at the top and the bottom.
```

### 11. `b12_cover.png` — 표지 (세로)

- 쓰임새: 아기 돼지 삼 형제: 도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장
- 첨부: b12_p1_stand.png · b12_p2_stand.png · b12_p3_stand.png · b12_wolf_stand.png · b12_spread.png (무대)

```
A storybook cover picture without any words, for a cute 3D animated children's game.
Scene: The three piglets stand proudly in front of the brick house while the wolf peeks out from behind a bush.
Attached images, in this order: 1) Solsol, the first piglet; 2) Ttukttak, the second piglet; 3) Chageun, the third piglet; 4) the wolf; 5) the stage. Keep every character EXACTLY the same as in its image. The stage image is the story world; keep its art style.
Composition: the top 25% is only sky or a soft background, kept plain for the game's title. The main characters in the middle third of the width, their faces between 40% and 60% of the height. The game may trim about 6% at the top and the bottom.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
NO title, NO text, NO letters, numbers, logos or watermark. Friendly for a 5-year-old.
Canvas 1024x1536 (portrait).
```

## 4순위 · 놀이터 배경 8장 (선택) (8장)

지금도 코드로 그린 배경으로 잘 돌아가요. 오는 것부터 바로 바꿔 끼웁니다.

### 1. `pg_fish_bg.png` — 놀이터 배경 — 글자 낚시

- 쓰임새: 글자 낚시 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a calm blue pond seen from the shore: a small wooden dock on the left, reeds and lily pads at the edges, gentle ripples, underwater weeds faintly visible, a sandy bottom strip at the lower edge.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 2. `pg_asm_bg.png` — 놀이터 배경 — 글자 조립 공장

- 쓰임새: 글자 조립 공장 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a cheerful toy factory for a letter-building game: a warm wooden workbench at the bottom, cogs and pipes on a soft orange wall, a small conveyor belt along the front edge, an empty middle area for the game.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 3. `pg_dict_bg.png` — 놀이터 배경 — 받아쓰기

- 쓰임새: 받아쓰기 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a child's writing desk seen from above for a dictation game: a big open notebook with faint square grid pages filling the middle, a pencil cup and crayons at the edges, warm morning light.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 4. `pg_pair_bg.png` — 놀이터 배경 — 짝꿍 카드

- 쓰임새: 짝꿍 카드 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a warm wooden table seen from above, slightly textured, with soft vignette edges — a cozy card-game table.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 5. `pg_train_bg.png` — 놀이터 배경 — 글자 기차

- 쓰임새: 글자 기차 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: rolling green hills with a winding empty railway track along the lower third, a tunnel on the left, fluffy clouds.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 6. `pg_fill_bg.png` — 놀이터 배경 — 빈칸 채우기

- 쓰임새: 빈칸 채우기 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a cozy classroom wall with a large empty green chalkboard in the middle, a wooden frame, shelves with plants and books at the sides.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 7. `pg_trace_bg.png` — 놀이터 배경 — 따라 쓰기

- 쓰임새: 따라 쓰기 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a child's wooden desk seen from above with a large blank writing notebook page in the middle (empty grid paper), crayons at the edge.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

### 8. `pg_opp_bg.png` — 놀이터 배경 — 거울 반대말

- 쓰임새: 거울 반대말 게임의 무대 배경 (지금은 코드로 그린 배경)
- 첨부: assets/img/case/case01_rat.webp (그림체 기준)

```
A wide background for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm, slightly painterly 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Scene: a playful mirror hall: a large ornate oval mirror on the right wall, soft pastel wallpaper, light sparkles in the air.
Low contrast and soft lighting so game pieces placed on top stand out. Completely empty stage — no characters.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1536x1024 (landscape).
```

## 4순위 · 놀이터 조각 7장 (선택) (7장)

게임 속 움직이는 조각. 물고기 2·3과 기차 칸은 먼저 만든 그림을 첨부해 같은 세트로.

### 1. `pg_fish_1.png` — 놀이터 조각 — 글자 낚시 물고기 1

- 쓰임새: 게임 속 움직이는 조각 (투명 PNG)
- 첨부: assets/img/hero/tiger.webp (그림체 기준)

```
A single game sprite for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Object: a plump friendly orange fish facing left, mouth slightly open, a big round eye.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 2. `pg_fish_2.png` — 놀이터 조각 — 글자 낚시 물고기 2

- 쓰임새: 게임 속 움직이는 조각 (투명 PNG)
- 첨부: pg_fish_1.png (방금 만든 주황 물고기 — 같은 모양으로)

```
A single game sprite for a cute 3D animated children's game, matching the attached image.
Object: the SAME fish as the attached image — same shape, size, pose and 3D style — but coloured teal-green.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 3. `pg_fish_3.png` — 놀이터 조각 — 글자 낚시 물고기 3

- 쓰임새: 게임 속 움직이는 조각 (투명 PNG)
- 첨부: pg_fish_1.png (방금 만든 주황 물고기 — 같은 모양으로)

```
A single game sprite for a cute 3D animated children's game, matching the attached image.
Object: the SAME fish as the attached image — same shape, size, pose and 3D style — but coloured pink-purple.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 4. `pg_train_engine.png` — 놀이터 조각 — 글자 기차 기관차

- 쓰임새: 게임 속 움직이는 조각 (투명 PNG)
- 첨부: assets/img/hero/tiger.webp (그림체 기준)

```
A single game sprite for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Object: a cheerful toy steam engine facing left, a round boiler, a big round headlight plate (no face), pastel red.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 5. `pg_train_car.png` — 놀이터 조각 — 글자 기차 칸

- 쓰임새: 게임 속 움직이는 조각 (투명 PNG)
- 첨부: pg_train_engine.png (방금 만든 기관차 — 같은 장난감 세트로)

```
A single game sprite for a cute 3D animated children's game, matching the attached image.
Object: a simple toy train car that matches the attached engine (same toy style, same wheels and scale), with an empty flat top where a letter block can sit, pastel blue, facing left.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 6. `pg_pair_back.png` — 놀이터 조각 — 짝꿍 카드 뒷면

- 쓰임새: 게임 속 움직이는 조각
- 첨부: assets/img/hero/tiger.webp (그림체 기준)

```
A single game sprite for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Object: a square card-back design: soft navy with tiny stars and a paw-print in the middle, filling the whole square.
Fill the whole square canvas edge to edge (no transparency).
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

### 7. `pg_trace_pencil.png` — 놀이터 조각 — 따라 쓰기 연필

- 쓰임새: 게임 속 움직이는 조각 (투명 PNG)
- 첨부: assets/img/hero/tiger.webp (그림체 기준)

```
A single game sprite for a cute 3D animated children's game, in the art style of the attached reference image (soft, warm 3D). Use the attached reference only for its art style and rendering — do not copy its character, clothes, accessories or places.
Object: a small cute crayon-pencil at a 45-degree angle, red with a gold band.
REAL transparent PNG background with an alpha channel (not a checkerboard pattern and NOT a black background). No floor, no cast shadow, no scenery, no motion lines.
No text, letters, numbers, logos or watermark anywhere (no writing on signs, books, labels or screens). Friendly for a 5-year-old — nothing scary or violent.
Canvas 1024x1024.
```

## 5순위 · 2권 포즈 5장 + 표지 (선택) (6장)

없으면 기본 자세와 이야기 그림 1을 대신 써요.

### 1. `b2_country_walk.png` — 2권 포즈 — country_walk

- 쓰임새: 2권 〈시골 쥐와 도시 쥐〉 장면 연출용 (없으면 기본 자세로 대신)
- 첨부: books/b2/country_stand.webp

```
Use the attached image as the character reference and keep the character exactly the same: the same face, fur, clothes, proportions and 3D rendering. Change only the pose. Keep the character the same size as in the reference image, with the feet on the bottom edge. Transparent background (alpha). No floor, no cast shadow, no scenery, no motion lines. No text, letters, numbers, logos or watermark. Same canvas size and direction as the reference image, nothing cropped.
New pose: walking to the viewer's right, mid-stride, carrying a small cloth bundle on a stick over his shoulder, a calm smile.
```

### 2. `b2_country_happy.png` — 2권 포즈 — country_happy

- 쓰임새: 2권 〈시골 쥐와 도시 쥐〉 장면 연출용 (없으면 기본 자세로 대신)
- 첨부: books/b2/country_stand.webp

```
Use the attached image as the character reference and keep the character exactly the same: the same face, fur, clothes, proportions and 3D rendering. Change only the pose. Keep the character the same size as in the reference image, with the feet on the bottom edge. Transparent background (alpha). No floor, no cast shadow, no scenery, no motion lines. No text, letters, numbers, logos or watermark. Same canvas size and direction as the reference image, nothing cropped.
New pose: holding a small bowl of barley rice in both paws, eyes closed in a big happy smile, a little steam rising from the bowl.
```

### 3. `b2_city_walk.png` — 2권 포즈 — city_walk

- 쓰임새: 2권 〈시골 쥐와 도시 쥐〉 장면 연출용 (없으면 기본 자세로 대신)
- 첨부: books/b2/city_stand.webp

```
Use the attached image as the character reference and keep the character exactly the same: the same face, fur, clothes, proportions and 3D rendering. Change only the pose. Keep the character the same size as in the reference image, with the feet on the bottom edge. Transparent background (alpha). No floor, no cast shadow, no scenery, no motion lines. No text, letters, numbers, logos or watermark. Same canvas size and direction as the reference image, nothing cropped.
New pose: walking confidently to the viewer's right, mid-stride, chin up, tail swinging.
```

### 4. `b2_city_proud.png` — 2권 포즈 — city_proud

- 쓰임새: 2권 〈시골 쥐와 도시 쥐〉 장면 연출용 (없으면 기본 자세로 대신)
- 첨부: books/b2/city_stand.webp

```
Use the attached image as the character reference and keep the character exactly the same: the same face, fur, clothes, proportions and 3D rendering. Change only the pose. Keep the character the same size as in the reference image, with the feet on the bottom edge. Transparent background (alpha). No floor, no cast shadow, no scenery, no motion lines. No text, letters, numbers, logos or watermark. Same canvas size and direction as the reference image, nothing cropped.
New pose: showing off, one paw on his chest and the other sweeping outward as if saying "look at all this!", chin up, a cheeky wink.
```

### 5. `b2_cat_pounce.png` — 2권 포즈 — cat_pounce

- 쓰임새: 2권 〈시골 쥐와 도시 쥐〉 장면 연출용 (없으면 기본 자세로 대신)
- 첨부: books/b2/cat_prowl.webp

```
Use the attached image as the character reference and keep the character exactly the same: the same face, fur, clothes, proportions and 3D rendering. Change only the pose. Keep the character the same size as in the reference image, with the feet on the bottom edge. Transparent background (alpha). No floor, no cast shadow, no scenery, no motion lines. No text, letters, numbers, logos or watermark. Same canvas size and direction as the reference image, nothing cropped.
New pose: a playful pounce like a kitten at play: front paws stretched forward, back legs pushing off, tail up, a happy open-mouthed smile with no fangs. Side view, facing the viewer's right.
```

### 6. `b2_cover.png` — 2권 표지 (세로)

- 쓰임새: 2권 책장 표지 + 책 속 입장 (지금은 이야기 그림 1을 대신 씀)
- 첨부: books/b2/country_stand.webp · books/b2/city_stand.webp · books/b2/spread.webp

```
A storybook cover picture without any words. The Country Mouse and the City Mouse stand side by side on the country path, smiling at the viewer. Behind them on the left is the big oak tree with the small round green door; far behind on the right, small, is the grand town house. Wildflowers, soft blue sky.
Characters: the first two attached images are the character references; keep both exactly the same. The third attached image is the story world; keep its art style.
Composition: the top 25% is only sky, kept plain for the game's title. Both mice in the middle third of the width, their faces between 40% and 60% of the height.
Art style: the same cute, high-quality 3D animated storybook look as the attached images.
No text, letters, numbers, title, logos or watermark.
Canvas 1024x1536 (portrait).
```

## 6순위 · 본부 조종실 2겹 + 앉은 포즈 12장 (선택 — 함께 와야 보여요) (14장)

지금 본부는 보호자 조종실 그림(11/3 원본, 교체 완료)으로 돌아가요. 이 14장은 '창밖 구름이 흐르고 영웅이 하나씩 따로 움직이는' 버전을 원할 때만. 앉은 포즈는 hq_cabin이 있어야 화면에 나와요.

### 1. `hq_sky.png` — 조종실 창밖 하늘 (가로로 이어지는 그림)

- 쓰임새: 창밖 구름이 계속 흘러가는 효과 — hq_cabin과 함께 와야 쓰여요
- 첨부: assets/img/hq/room_pic.webp (지금 본부 조종실 그림 — 11/3 원본으로 교체됨)

```
A wide panoramic sky high above a sea of fluffy white clouds, bright daytime, soft blue gradient, a few distant cloud towers, gentle sunlight, matching the attached reference art style (soft painterly 3D). The image must tile SEAMLESSLY left-to-right (the left edge continues the right edge). No aircraft, no characters, no text. Canvas 2048x1024.
```

### 2. `hq_cabin.png` — 조종실 안 (창유리 투명, 빈 자리)

- 쓰임새: 빈 조종실 — 영웅들을 자리마다 하나씩 앉혀 따로따로 움직이게 해요
- 첨부: assets/img/hq/room_pic.webp (지금 본부 조종실 그림 — 11/3 원본으로 교체됨)

```
The SAME airship cockpit interior as the attached reference image (curved glass dome, metal ribs, glowing consoles with screens, cables, cosy seats), cute 3D animated children's game style, seen from the same angle. IMPORTANT: remove ALL characters — every seat and console is EMPTY.
The window glass areas must be fully TRANSPARENT (real PNG alpha channel, not a checkerboard) so a moving sky can be shown behind them. Keep screens glowing with simple shapes only — absolutely NO text, letters or numbers on screens or signs. Canvas 1536x1024.
```

### 3. `work_rat.png` — 조종실 앉은 자리 — 번개 쥐

- 쓰임새: 2겹 조종실에서 번개 쥐가 자기 자리에서 일하는 모습 (서 있는 버전은 이미 씀 — 앉은 버전으로 다시 만들면 교체)
- 첨부: assets/img/hero/rat.webp (번개 쥐 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting on a small swivel stool at a clue desk, holding a big magnifying glass over a clue card. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 4. `work_ox.png` — 조종실 앉은 자리 — 강철 소

- 쓰임새: 2겹 조종실에서 강철 소가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/ox.webp (강철 소 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting on a sturdy workout bench lifting a small dumbbell, a water bottle beside. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 5. `work_tiger.png` — 조종실 앉은 자리 — 대장 호랑이

- 쓰임새: 2겹 조종실에서 대장 호랑이가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/tiger.webp (대장 호랑이 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting in a captain's chair at a small table, pointing at a mission map spread on it. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 6. `work_rabbit.png` — 조종실 앉은 자리 — 달빛 토끼

- 쓰임새: 2겹 조종실에서 달빛 토끼가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/rabbit.webp (달빛 토끼 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), kneeling at a little window-box garden, watering carrots with a small watering can. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 7. `work_dragon.png` — 조종실 앉은 자리 — 하늘 용

- 쓰임새: 2겹 조종실에서 하늘 용가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/dragon.webp (하늘 용 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting on a stool looking through a brass telescope on a tripod. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 8. `work_snake.png` — 조종실 앉은 자리 — 바람 뱀

- 쓰임새: 2겹 조종실에서 바람 뱀가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/snake.webp (바람 뱀 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), coiled at a small mail-sorting counter with pigeonhole shelves, holding two envelopes. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 9. `work_horse.png` — 조종실 앉은 자리 — 질주 말

- 쓰임새: 2겹 조종실에서 질주 말가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/horse.webp (질주 말 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), standing beside a neat stack of parcel boxes, carrying one parcel, ready to deliver. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 10. `work_sheep.png` — 조종실 앉은 자리 — 구름 양

- 쓰임새: 2겹 조종실에서 구름 양가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/sheep.webp (구름 양 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting in a cosy armchair knitting cloud-white yarn, a yarn basket at her feet. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 11. `work_monkey.png` — 조종실 앉은 자리 — 재주 원숭이

- 쓰임새: 2겹 조종실에서 재주 원숭이가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/monkey.webp (재주 원숭이 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting on a library step-ladder by a small bookshelf, holding a stack of picture books. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 12. `work_rooster.png` — 조종실 앉은 자리 — 새벽 닭

- 쓰임새: 2겹 조종실에서 새벽 닭가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/rooster.webp (새벽 닭 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), sitting on a tall stool polishing a shiny brass horn on a little stand. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 13. `work_dog.png` — 조종실 앉은 자리 — 용감한 개

- 쓰임새: 2겹 조종실에서 용감한 개가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/dog.webp (용감한 개 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), standing guard beside a small watch-post with a lantern, holding a round shield. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```

### 14. `work_pig.png` — 조종실 앉은 자리 — 든든 돼지

- 쓰임새: 2겹 조종실에서 든든 돼지가 자기 자리에서 일하는 모습
- 첨부: assets/img/hero/pig.webp (든든 돼지 기존 그림)

```
The SAME character as the attached reference image (same outfit, same colours, same face), standing at a small cosy oven in an apron, holding a tray of fresh cookies. Three-quarter view turned slightly to the side so the face is clearly visible, cheerful and focused. The seat/workstation and the item are part of the picture and fit the character's size. Single character with its own seat and props only — no room, no floor, no wall.
REAL transparent PNG background with alpha channel (NOT a checkerboard pattern), no shadow outside the props, no text or watermark. Matching the reference 3D style exactly. Canvas 1024x1024.
```
