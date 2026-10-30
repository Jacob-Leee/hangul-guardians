# ChatGPT에 처음 보낼 메시지 (그림 담당)

2026-10-30부터 역할을 나눕니다. **그림은 ChatGPT, 게임 프로그램은 Claude**가 맡고, GitHub 저장소 `Jacob-Leee/hangul-guardians`로 주고받습니다.

- ChatGPT에 GitHub를 연결했다면 저장소를 직접 고르게 하세요.
- 연결하지 않았다면 저장소의 Code → Download ZIP으로 받은 ZIP을 첨부하세요.

아래를 그대로 복사해서 붙여 넣으세요.

```
이 프로젝트는 5살 아이의 한글 읽기(유창성·이해)를 위한 웹 게임 "열두동물 한글 수비대"야.
GitHub 저장소 Jacob-Leee/hangul-guardians에 있고, 게임 프로그램은 Claude가 맡아. 너는 그림만 맡아 줘.

작업 전에 docs/IMAGE_REQUESTS.md를 처음부터 끝까지 읽어 줘. 지금 필요한 그림, 저장 이름, 크기, 프롬프트, 첨부할 참고 그림이 다 적혀 있어.

지킬 것:
1. 그림은 docs/IMAGE_REQUESTS.md의 순서대로, 표에 적힌 저장 이름 그대로 PNG로 만들어 줘. 투명 배경 그림은 투명 PNG.
2. 참고 그림은 저장소 안의 그림만 써(영웅 assets/img/hero/, 사건 배경 assets/img/case/, 동화책 books/b1/, books/b2/). 웹에서 찾은 사진은 쓰지 마.
3. 그림 안에 글자·숫자·로고·워터마크를 넣지 마. 꾸러기 수비대, LEGO, Marvel 같은 기존 캐릭터를 흉내 내지 마.
4. 만든 그림은 incoming/ 폴더에 올리고, 커밋 메시지는 "img: "로 시작해 줘. 코드(js, css, index.html, sw.js, tests, tools)와 assets/, books/의 기존 파일은 고치지 마.
5. GitHub에 직접 올릴 수 없으면 그림 파일을 나에게 줘. 내가 올릴게.
6. 확실하지 않은 건 추측하지 말고 "확인 필요"라고 말해 줘.

첫 작업: docs/IMAGE_REQUESTS.md의 "지금 필요한 그림" 1번부터.
```

Claude는 프로그램을 올리기 전에 GitHub의 새 그림을 먼저 확인해 넣고, 처리한 원본은 `incoming/`에서 지웁니다.
