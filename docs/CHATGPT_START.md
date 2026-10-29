# ChatGPT(또는 Codex)에 처음 보낼 메시지

아래를 그대로 복사해서 붙여 넣으세요. 이 프로젝트는 GitHub 저장소 `Jacob-Leee/hangul-guardians`에 있습니다.

- ChatGPT·Codex에 GitHub를 연결했다면 저장소를 직접 고르게 하세요.
- 연결하지 않았다면 저장소의 Code → Download ZIP으로 받은 ZIP을 첨부하세요.

```
이 프로젝트는 5살 아이의 한글 읽기(유창성·이해)를 위한 웹 게임 "열두동물 한글 수비대"야.
순수 HTML/CSS/JS이고, GitHub Pages(https://jacob-leee.github.io/hangul-guardians/)에서 설치형 웹 앱(PWA)으로 돌아가.

작업 전에 꼭 docs/HANDOVER.md를 처음부터 끝까지 읽고, 특히 "7. 꼭 지킬 규칙"과 "4-6. 설치형 웹 앱"을 지켜 줘.

작업 방식:
1. 고치기 전에 무엇을 어떤 파일의 어디를 바꿀지 먼저 짧게 설명해 줘.
2. js/app.js는 크니까 통째로 다시 쓰지 말고, 필요한 부분만 찾아서 고쳐 줘.
3. 고친 뒤에는 꼭 `python tools/make_app.py`를 실행해서 sw.js(오프라인 목록·버전)를 새로 만들어 줘. 안 하면 설치된 앱이 새 그림·소리를 못 받아.
4. 가능하면 tests/book1-playthrough.js와 tests/v29-features.js를 돌려 줘.
5. GitHub에 올릴 때는 바뀐 파일과 sw.js를 함께 main에 커밋해 줘. GitHub에 직접 올릴 수 없으면 바뀐 파일 전체를 ZIP으로 돌려줘.
6. 확실하지 않은 건 추측하지 말고 "확인 필요"라고 말해 줘.

첫 작업: (여기에 원하는 작업을 적기. 예: "docs/dubbing_characters.md의 캐릭터 대사 음성 파일을 audio/에 넣었으니 tools/make_voice_manifest.py로 연결하고, 설정 화면에 'AI 생성 음성' 표기를 넣어 줘.")
```
