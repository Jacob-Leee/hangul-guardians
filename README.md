# 열두동물 한글 수비대 (Zodiac Hangul Guardians)

이미 글을 읽는 5세 아이의 **한글 읽기 유창성과 이해**를 위한 웹 게임입니다. 고양이 악당이 망가뜨린 동화책과 마을 사건 속 글을 아이가 직접 읽고, 기록과 다른 문장을 찾아 이야기를 되찾습니다.

- **앱 주소:** https://jacob-leee.github.io/hangul-guardians/
  - GitHub 저장소 Settings → Pages에서 배포를 켠 뒤에 열립니다.
- **설치형 웹 앱(PWA)입니다.** 홈 화면 아이콘으로 설치할 수 있고, 전체 화면으로 열리며, 처음 한 번 연 뒤에는 인터넷 없이도 실행됩니다.

## 아이패드에 앱처럼 설치하기

1. 아이패드 **Safari**에서 위 주소를 엽니다. Chrome 등 다른 브라우저는 iPad에서 홈 화면 앱 설치가 제한될 수 있습니다.
2. 첫 화면이 나오면 1~2분 기다립니다. 그림과 음악 22MB가 기기에 저장되는 시간입니다. 진행 상황은 설정 → 📲 앱에서 "오프라인 사용 준비 완료 ✓"가 뜨는지로 확인합니다.
3. 주소창 옆 **공유 버튼(□↑)** → **홈 화면에 추가** → 추가를 누릅니다.
4. 홈 화면의 **한글 수비대** 아이콘으로 실행합니다. 주소창 없이 전체 화면으로 열립니다.

**알아 둘 점**
- Safari 탭과 홈 화면 앱은 진행 기록을 따로 저장합니다. Safari에서 하던 기록을 옮기려면 설정 → 진행 백업 → **백업 코드 만들기**로 코드를 복사한 다음, 앱에서 **코드로 불러오기**를 하세요.
- 새 버전을 올리면 앱을 다음에 열 때 "새 버전이 준비됐어요" 안내가 나옵니다. **업데이트**를 누르면 바뀝니다.
- 진행 기록은 아이패드 안에만 있습니다. 서버로 보내지 않습니다.

## 새 버전 올리는 법

1. 파일을 고칩니다.
2. 프로젝트 폴더에서 `python tools/make_app.py`를 실행합니다. 오프라인 목록과 버전이 새로 써집니다.
3. `main` 브랜치에 커밋하고 푸시합니다. 1~2분 뒤 GitHub Pages에 반영됩니다.

## 문서

- 인수인계(개발자·AI용): `docs/HANDOVER.md` ← 먼저 읽기
- AI에게 처음 보낼 메시지: `docs/CHATGPT_START.md`
- 아이패드 실기기 점검표: `docs/IPAD_CHECKLIST.md`
- 더빙 대본: `docs/dubbing_characters.md`(녹음할 캐릭터 대사 157줄), 전체 대본 `docs/dubbing_b1.*`, `docs/dubbing_cases.*`

## 실행·테스트 (개발용)

- **로컬 실행:** `python -m http.server`를 실행한 뒤 http://localhost:8000 에서 엽니다. `index.html`을 파일로 바로 열어도 되지만, 이 경우 배경음악과 오프라인 기능은 동작하지 않습니다.
- **테스트:** `node tests/book1-playthrough.js`, `node tests/case-autoplay.js`, `node tests/playground-autoplay.js`, `node tests/v29-features.js`, `node tests/spot-overlap.js`, `node tests/chaos-sim.js`, `node tests/app-offline.js`(로컬 서버 필요). 모두 Playwright가 필요합니다.
