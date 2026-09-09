# jihongparker.github.io

박지홍 포트폴리오. macOS 데스크톱을 본뜬 정적 사이트, 빌드 없음.

- `index.html` 뼈대 · `style.css` 토큰과 창·독·메뉴바 · `data.js` 문구와 아이콘(수정은 여기서) · `app.js` 창 관리자와 앱
- 읽기 모드: `cv.html`(한국어) · `cv-en.html`(영어) — 정적 HTML, 크롤러·폰 기본 진입. 이력서 PDF는 `cv/`(읽기 페이지를 인쇄한 것, 페이지 수정 후 재생성)
- 논문은 PDF 뷰어 대신 페이지 이미지로 보여 준다: `python3 tools/render_pages.py 1000 webp 0.5` → `pages/<논문>/pNNN.webp` + `pages/index.json`(Quartz 렌더 + Pillow WebP, 회색조, 쪽당 약 100KB). 화면은 jsDelivr(`cdn.jsdelivr.net/gh/…@main/pages/`)에서 읽는다. Pages 전송이 느려서(100~180KB/s). 이미지 갱신 후 `curl https://purge.jsdelivr.net/gh/JihongParker/JihongParker.github.io@main/pages/<논문>/pNNN.webp` 로 캐시 비움. `papers/*.pdf`는 내려받기용(pikepdf linearize).
- 사진: `img/profile.jpg`
- 딥링크: `#papers` `#terminal` `#erp` `#obs` `#quant` `#desk`
- 단축키: ⌘K 검색 · ⌘W 창 닫기 · ⌘N Finder
