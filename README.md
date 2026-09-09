# jihongparker.github.io

박지홍 포트폴리오. macOS 데스크톱을 본뜬 정적 사이트, 빌드 없음.

- `index.html` 뼈대 · `style.css` 토큰과 창·독·메뉴바 · `data.js` 문구와 아이콘(수정은 여기서) · `app.js` 창 관리자와 앱
- 읽기 모드: `cv.html`(한국어) · `cv-en.html`(영어) — 정적 HTML, 크롤러·폰 기본 진입. 이력서 PDF는 `cv/`(읽기 페이지를 인쇄한 것, 페이지 수정 후 재생성)
- 논문 PDF는 `papers/`에 두되 화면은 jsDelivr(`cdn.jsdelivr.net/gh/JihongParker/JihongParker.github.io@main/papers/`)에서 읽는다. Pages 전송이 느려서(100~180KB/s). PDF 갱신 후 `curl https://purge.jsdelivr.net/gh/JihongParker/JihongParker.github.io@main/papers/<파일>` 로 캐시 비움. PDF는 pikepdf 로 linearize 해 둔다.
- 사진: `img/profile.jpg`
- 딥링크: `#papers` `#terminal` `#erp` `#obs` `#quant` `#desk`
- 단축키: ⌘K 검색 · ⌘W 창 닫기 · ⌘N Finder
