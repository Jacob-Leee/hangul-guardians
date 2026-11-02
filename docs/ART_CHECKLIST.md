# 🎨 고퀄 제작 체크리스트 (우선순위순)

하나 끝낼 때마다 ☐→☑ 표시하면서 진행하세요. **파일 이름만 지켜서 `incoming/`에 올리면** 제가 그때그때 게임에 연결합니다. 그림 프롬프트는 이제 **IMAGE_PROMPTS.md**에 그림마다 완성본으로 있어요(제작 체크리스트 페이지에도 복사 단추로 똑같이). IMAGE_REQUESTS.md의 §프롬프트는 옛 판이에요.

---

## 0순위 — 🕵️ 사건 그림 2장 (IMAGE_PROMPTS.md 1번 묶음)
- ☐ case09_monkey_blocked — 사건 9 "물이 흐르지 않아요"에 맞게 돌이 개울을 막은 그림 (지금 그림은 글과 반대)
- ☐ case12_pig — 사건 12 숲속 신문사 배경 (지금은 코드 그림)

## 0-1순위 — 🎁 보상 아이콘 58개 (보호자 샘플 그림체, 투명 PNG)
**어디에 쓰임**: 아이가 받는 보물 전부 — 선물 상자 연출과 본부 방 꾸미기 (지금은 3D 이모지)
- ☐ 사건 12 · ☐ 동화책 12 · ☐ 놀이터 12 · ☐ 배틀 4 · ☐ 모험 코스 3 · ☐ 오늘의 모험 15 — 이름·프롬프트는 IMAGE_PROMPTS.md 2번 묶음
- 파일명: `incoming/item_key.png` … **검은 배경 ❌, 진짜 투명 PNG**, 한 장에 한 개

## 1순위 — 🎙️ 녹음 1차: 책 3~7권 (약 8,500자)
**어디에 쓰임**: 3~7권 이야기 전체 — 프롤로그·기록·인물 대사·결말이 소리로 살아남 (지금은 글로만)
- ☐ b3 소가 된 게으름뱅이 (대본 zip `b3/` 폴더, 6명)
- ☐ b4 해와 달이 된 오누이 (`b4/`)
- ☐ b5 비를 잃어버린 꼬마 용 (`b5/`)
- ☐ b6 뱀의 숲속 우체국 (`b6/`)
- ☐ b7 바람을 배달하는 말 (`b7/`)
- 방법: 캐스팅표(00_캐스팅표_b3-b12.md)대로 기존 성우 속도·높낮이만 조절 → 한 줄씩 MP3+SRT → 올려 주시면 연결
- ☐ (같이) 2권 뚱냥 한 줄 `b2_004` 재녹음

## 2순위 — 🎙️ 녹음 2차: 책 8~12권 (약 8,400자)
- ☐ b8 양치기 소년 ☐ b9 뒤죽박죽 도서관 ☐ b10 빨간 암탉 ☐ b11 개와 그림자 ☐ b12 돼지 삼 형제

## 2-1순위 — 🎙️ 녹음 3차: 받아쓰기·조립 공장 낱말 263개 (v31)
**어디에 쓰임**: 받아쓰기·글자 조립 공장에서 낱말을 소리로 불러 줌 (지금은 32개만 소리, 나머지는 그림만)
- ☐ 1순위 105개 (받아쓰기 1~3단계) ☐ 2순위 46개 (받아쓰기 4~5단계) ☐ 3순위 112개 (조립 공장·어려운 단계)
- 대본: `docs/dubbing_extra.csv`의 `wd_060.mp3`~`wd_322.mp3` (내레이터, 낱말 한 개씩 또박또박 1초) → 같은 파일명으로 올리면 자동 연결

## 3순위 — 📚 책 그림 b3~b12 (§6 프롬프트) — 권당 5~11장
**어디에 쓰임**: ① spread=현장 조사 무대(반짝이 숨는 곳) ② page1~3=순서 맞추기 그림+이야기 장면 ③ 포즈=장면 연출에서 움직이는 인물 ④ **cover=도서관 책장 표지 + 책 속으로 뛰어드는 3D 입장(토끼와 거북이처럼!)**
표지는 `bN_cover.png`(세로 1024×1536 권장, 제목 글자 없이)로 — 지금은 page1을 임시로 쓰고 있어요.

- ☐ **b3** (11장): b3_spread, b3_page1~3, b3_cover + 포즈 b3_boy_stand/boy_sleep/boy_happy, b3_oxboy_stand/oxboy_walk, b3_old_stand
- ☐ **b4** (11장): spread, page1~3, cover + sis_stand/sis_scared, bro_stand/bro_scared, tig_stand/tig_prowl
- ☐ **b5** (9장): spread, page1~3, cover + yong_stand/yong_sad/yong_fly, cloud_stand
- ☐ **b6** (9장): spread, page1~3, cover + post_stand/post_slide, owl_stand/owl_happy
- ☐ **b7** (8장): spread, page1~3, cover + dal_stand/dal_run, mill_stand
- ☐ **b8** (10장): spread, page1~3, cover + shep_stand/shep_shout, lamb_stand, wolf_stand/wolf_run
- ☐ **b9** (9장): spread, page1~3, cover + mon_stand/mon_hang, pand_stand/pand_happy
- ☐ **b10** (9장): spread, page1~3, cover + hen_stand/hen_work, duck_stand, bird_stand
- ☐ **b11** (8장): spread, page1~3, cover + pup_stand/pup_look/pup_happy
- ☐ **b12** (11장): spread, page1~3, cover + p1_stand, p2_stand, p3_stand, pig_scared, wolf_stand/wolf_blow
- 파일명 예: `incoming/b3_spread.png`, `incoming/b3_boy_stand.png` (포즈는 투명 PNG)

## 4순위 — 🏰 본부: 영웅 '일하는 포즈' 12장 (§7-2 프롬프트)
**어디에 쓰임**: 본부 원형 기지에서 12영웅이 진짜 일하는 모습으로 (지금은 서 있는 그림+이모지 소품)
- ☐ work_rat 🔍 ☐ work_ox 🏋️ ☐ work_tiger 🗺️ ☐ work_rabbit 🥕 ☐ work_dragon 🔭 ☐ work_snake ✉️
- ☐ work_horse 📦 ☐ work_sheep 🧶 ☐ work_monkey 📚 ☐ work_rooster 📯 ☐ work_dog 🛡️ ☐ work_pig 🍪
- 파일명: `incoming/work_rat.png` … (1024×1024 투명, 각 영웅 기존 그림 첨부)

## 5순위 — 🎪 놀이터 배경 8장 (§8-1 프롬프트)
**어디에 쓰임**: 각 미니게임의 무대 배경 (지금은 코드로 그린 배경)
- ☐ pg_fish_bg 🎣 연못·부두 — 글자 낚시 배경
- ☐ pg_asm_bg 🏭 장난감 공장 — 글자 조립 공장 배경
- ☐ pg_dict_bg 📝 공책 책상 — 받아쓰기 배경
- ☐ pg_pair_bg 🃏 나무 탁자 — 짝꿍 카드 배경
- ☐ pg_train_bg 🚂 언덕·철길 — 글자 기차 배경
- ☐ pg_fill_bg 🧩 칠판 교실 — 빈칸 채우기 배경
- ☐ pg_trace_bg ✍️ 공책 책상 — 따라 쓰기 배경
- ☐ pg_opp_bg 🪞 거울 복도 — 거울 반대말 배경

## 6순위 — 🎪 놀이터 스프라이트 7장 (§8-2 프롬프트, 투명 PNG)
**어디에 쓰임**: 게임 속 움직이는 조각들 (지금은 코드 그림)
- ☐ pg_fish_1 / ☐ pg_fish_2 / ☐ pg_fish_3 — 물고기 3색 (글자 팻말은 게임이 붙임)
- ☐ pg_train_engine / ☐ pg_train_car — 기관차·글자 싣는 칸
- ☐ pg_pair_back — 카드 뒷면 무늬(정사각)
- ☐ pg_trace_pencil — 시범용 연필

## ~~7순위 — 🏠 본부 방 4곳 배경~~ ☑ 완료 (11/3)
- ☑ room_living ☑ room_case ☑ room_deck ☑ room_study — 보호자 그림 4장을 넣고, 그림 속 반짝이 자리에 보물 놓는 자리까지 맞췄어요. 가구(보물)는 위 0-1순위 아이콘 58개로.

---

### 참고
- **이미 완료**: 본부 기지 배경(room_base) ☑ · 조종실 본부 그림(room_pic, **11/3 원본으로 교체**) ☑ · **본부 방 4장(수사실·관측대·거실·서재) ☑ (11/3)** · **영웅 12명 출동 장면(launch_grid 4×3) ☑ (11/2)** · 쥐 일하는 포즈(work_rat) ☑ · 1~2권 그림 ☑ · 녹음 825줄 ☑ · 사건 수사대 배경 ☑ · 코스/배틀 무대 ☑
- 모든 그림 공통: 기존 참고 그림 첨부, 화면 속 글자 금지, 빈 무대(스프라이트 제외), 5살 친화
- 한 번에 다 할 필요 없어요 — **올라온 것부터 바로바로** 연결합니다.
