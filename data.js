window.ICONS = {
  folder: (c1="#5ab0f7", c2="#2f8ce8") => `<svg viewBox="0 0 64 64"><defs><linearGradient id="f${c1.slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="M6 16a4 4 0 0 1 4-4h14l5 5h25a4 4 0 0 1 4 4v29a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="${c2}" opacity=".85"/><path d="M6 24a4 4 0 0 1 4-4h44a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="url(#f${c1.slice(1)})"/></svg>`,
  doc: (label="TXT") => `<svg viewBox="0 0 64 64"><path d="M14 4h26l12 12v42a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#fff" stroke="#c8c8cc"/><path d="M40 4v12h12" fill="#e6e6ea"/><g stroke="#9a9aa1" stroke-width="2"><path d="M20 30h24M20 37h24M20 44h16"/></g><text x="32" y="58" font-size="9" text-anchor="middle" fill="#6e6e73" font-family="-apple-system,sans-serif" font-weight="700">${label}</text></svg>`,
  finder: `<svg viewBox="0 0 64 64"><defs><linearGradient id="fa" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4fc3ff"/><stop offset="1" stop-color="#1877f2"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#fa)"/><path d="M4 17c0-7 6-13 13-13h15v56H17C10 60 4 54 4 47z" fill="#e9f5ff" opacity=".9"/><path d="M32 4h15c7 0 13 6 13 13v30c0 7-6 13-13 13H32z" fill="#1877f2"/><circle cx="20" cy="26" r="2.6" fill="#1d4f91"/><circle cx="44" cy="26" r="2.6" fill="#fff"/><path d="M14 40c8 8 28 8 36 0" stroke="#1d4f91" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M32 40c4 4 12 4 18 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  notes: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#fff"/><rect x="4" y="4" width="56" height="16" rx="13" fill="#ffd60a"/><rect x="4" y="12" width="56" height="8" fill="#ffd60a"/><g stroke="#c9c9cc" stroke-width="2"><path d="M14 30h36M14 38h36M14 46h24"/></g></svg>`,
  safari: `<svg viewBox="0 0 64 64"><defs><linearGradient id="sa" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3ec6ff"/><stop offset="1" stop-color="#1a73e8"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#sa)"/><circle cx="32" cy="32" r="22" fill="#fff"/><circle cx="32" cy="32" r="20" fill="none" stroke="#dfe6ee"/><g stroke="#8a97a8" stroke-width="1"><path d="M32 12v4M32 48v4M12 32h4M48 32h4"/></g><path d="M44 20 36 36l-8 8 8-16z" fill="#ff3b30"/><path d="M28 44l8-8-4-4z" fill="#3a3a3c"/></svg>`,
  terminal: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#1e1e22"/><rect x="4" y="4" width="56" height="12" rx="6" fill="#3a3a3f"/><text x="14" y="42" font-size="20" font-family="Menlo,monospace" fill="#fff" font-weight="700">&gt;_</text></svg>`,
  mail: `<svg viewBox="0 0 64 64"><defs><linearGradient id="ma" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5ac8fa"/><stop offset="1" stop-color="#0a84ff"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#ma)"/><rect x="12" y="18" width="40" height="28" rx="4" fill="#fff"/><path d="M12 22l20 14 20-14" fill="none" stroke="#0a84ff" stroke-width="2.5"/></svg>`,
  settings: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#8e8e93"/><circle cx="32" cy="32" r="14" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="6 4"/><circle cx="32" cy="32" r="6" fill="#fff"/></svg>`,
  trash: `<svg viewBox="0 0 64 64"><path d="M18 20h28l-3 34a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3z" fill="#d1d1d6"/><path d="M18 20h28l-3 34a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3z" fill="url(#tg)"/><defs><linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#e5e5ea"/><stop offset=".5" stop-color="#bdbdc2"/><stop offset="1" stop-color="#e5e5ea"/></linearGradient></defs><rect x="14" y="14" width="36" height="5" rx="2" fill="#aeaeb2"/><rect x="26" y="9" width="12" height="5" rx="2" fill="#aeaeb2"/><g stroke="#9a9aa1" stroke-width="2"><path d="M26 26v24M32 26v24M38 26v24"/></g></svg>`,
  papers: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#104281"/><path d="M18 14h20l8 8v28H18z" fill="#fff"/><path d="M38 14v8h8" fill="#d6dde8"/><g stroke="#104281" stroke-width="2"><path d="M23 30h16M23 36h16M23 42h10"/></g><text x="47" y="52" font-size="11" fill="#fff" font-family="-apple-system,sans-serif" font-weight="700" text-anchor="middle">6</text></svg>`,
  erp: `<svg viewBox="0 0 64 64"><defs><linearGradient id="ea" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#2f9e63"/><stop offset="1" stop-color="#166b43"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#ea)"/><g fill="#fff"><rect x="14" y="34" width="8" height="16" rx="1.5"/><rect x="26" y="26" width="8" height="24" rx="1.5"/><rect x="38" y="18" width="8" height="32" rx="1.5"/></g><path d="M14 22c10 2 18-6 34-8" fill="none" stroke="#b7f0cf" stroke-width="3" stroke-linecap="round"/></svg>`,
  obs: `<svg viewBox="0 0 64 64"><defs><radialGradient id="oa" cx=".5" cy=".4"><stop offset="0" stop-color="#2b5f9e"/><stop offset="1" stop-color="#0b1f3a"/></radialGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#oa)"/><circle cx="32" cy="32" r="16" fill="none" stroke="#7fd0ff" stroke-width="2"/><circle cx="32" cy="32" r="8" fill="none" stroke="#7fd0ff" stroke-width="2" opacity=".7"/><circle cx="32" cy="32" r="2.5" fill="#fff"/><path d="M32 8v8M32 48v8M8 32h8M48 32h8" stroke="#7fd0ff" stroke-width="2"/><circle cx="43" cy="21" r="2" fill="#ffd60a"/></svg>`,
  quant: `<svg viewBox="0 0 64 64"><defs><linearGradient id="qa" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#6e4ff6"/><stop offset="1" stop-color="#2dd4bf"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#qa)"/><path d="M12 46c6 0 6-24 12-24s6 18 12 18 6-30 12-30" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><text x="46" y="50" font-size="14" fill="#fff" font-family="Georgia,serif" font-style="italic">σ</text></svg>`,
  desk: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#1f2937"/><g stroke-width="3" stroke-linecap="round"><path d="M14 40l10-12 8 8 8-16 10 6" fill="none" stroke="#34d399"/></g><rect x="14" y="46" width="36" height="4" rx="2" fill="#4b5563"/><circle cx="50" cy="26" r="3" fill="#f87171"/></svg>`,
  pdf: `<svg viewBox="0 0 64 64"><path d="M14 4h26l12 12v42a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#fff" stroke="#c8c8cc"/><path d="M40 4v12h12" fill="#e6e6ea"/><rect x="10" y="34" width="34" height="16" rx="3" fill="#e0342b"/><text x="27" y="46" font-size="10" text-anchor="middle" fill="#fff" font-family="-apple-system,sans-serif" font-weight="700">PDF</text></svg>`,
  preview: `<svg viewBox="0 0 64 64"><defs><linearGradient id="pv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5ed3ff"/><stop offset="1" stop-color="#1b8ee0"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#pv)"/><rect x="14" y="14" width="36" height="36" rx="4" fill="#fff"/><path d="M14 40l10-10 8 8 6-6 12 12v6H14z" fill="#8fd3ff"/><circle cx="40" cy="24" r="4" fill="#ffd60a"/></svg>`,
  timeline: `<svg viewBox="0 0 64 64"><defs><linearGradient id="tla" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#tla)"/><path d="M22 15v34" stroke="rgba(255,255,255,.45)" stroke-width="2.5" stroke-linecap="round"/><g fill="#fff"><circle cx="22" cy="18" r="4.2"/><circle cx="22" cy="32" r="4.2"/><circle cx="22" cy="46" r="4.2"/></g><g fill="rgba(255,255,255,.92)"><rect x="31" y="15" width="19" height="6" rx="3"/><rect x="31" y="29" width="13" height="6" rx="3"/><rect x="31" y="43" width="16" height="6" rx="3"/></g></svg>`,
  github: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#24292f"/><path d="M32 14a18 18 0 0 0-5.7 35.1c.9.2 1.2-.4 1.2-.9v-3.1c-5 1.1-6.1-2.1-6.1-2.1-.8-2.1-2-2.6-2-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.3 2 5.3 1.5.2-1.2.6-2 1.2-2.4-4-.5-8.2-2-8.2-8.9 0-2 .7-3.6 1.9-4.8-.2-.5-.8-2.3.2-4.8 0 0 1.5-.5 5 1.8a17 17 0 0 1 9 0c3.4-2.3 5-1.8 5-1.8 1 2.5.4 4.3.2 4.8 1.2 1.2 1.9 2.8 1.9 4.8 0 6.9-4.2 8.4-8.2 8.9.6.6 1.2 1.7 1.2 3.4v5c0 .5.3 1.1 1.2.9A18 18 0 0 0 32 14z" fill="#fff"/></svg>`,
};

window.PERSON = {
  name: "박지홍", en: "Jihong Park",
  tag: "헤지 계산과 회계 처리, 공시까지 한 줄로 다루는 경영학과 학생",
  school: "부산대학교 경영학과", grad: "2027년 8월 졸업 예정",
  email: "adrianus026@gmail.com",
  github: "https://github.com/JihongParker",
  ssrn: "https://ssrn.com/author=12066228",
  linkedin: "https://www.linkedin.com/in/jihongparker",
  tools: ["Python", "TypeScript", "Excel VBA", "LaTeX", "OpenDART", "SQLite"],
};

/* 위젯 = 바로 여는 것. live 가 있으면 Safari, pdf 는 미리보기, app 은 내장 앱 */
window.PROJECTS = [
  {
    id: "papers", name: "헤지 논문 6편", sub: "한 포지션, 네 층", icon: "papers", kind: "연구", app: "preview",
    one: "한국 정유수입사가 지는 WTI와 원달러 결합 노출 하나를 예산, 트레이딩, 회계, 공시 네 층으로 나눠 푼 연작입니다.",
    look: ["4편: 코스피 380사 9년치 공시로 공시 의무화가 헤지에 준 효과를 정밀하게 0으로 확정", "1편: 만기를 맞춘 12조각 스트립만으로 연 951억 절감", "5편과 6편: KIKO 사태를 같은 틀로 다시 계산"],
    links: [["SSRN", "https://ssrn.com/author=12066228"], ["코드와 원고", "https://github.com/JihongParker/wti-fx-hedge-program"]],
  },
  {
    id: "erp", name: "HongERP", sub: "ESG 의사결정층 ERP", icon: "erp", kind: "웹앱", live: "https://jihongparker.github.io/hong-erp/",
    one: "ESG 소프트웨어들이 비워 둔 결정 층을 채운 시제품입니다. 노출을 넣으면 얼마나 헤지하고 얼마나 공시할지를 한 번에 계산합니다.",
    look: ["개요 화면의 인과 흐름: 중대성에서 공시, 예산, 데스크, 회계로", "예산 화면 아래 생존 헤어컷 패널: 낙아웃이 사라질 확률에 따라 장부가 바닐라로 넘어가는 지점", "역할별 권한, 결재 대기열, 감사 추적, 회계연도 마감까지 갖춘 셸"],
    links: [["저장소", "https://github.com/JihongParker/hong-erp"]],
  },
  {
    id: "obs", name: "헤지 관측소", sub: "상장사 파생 각주 전수 파싱", icon: "obs", kind: "데이터", live: "https://jihongparker.github.io/hedge-observatory/",
    one: "코스피 상장사의 파생상품 각주를 전부 읽어 판별하고 정규화해서 공개 헤지 패널로 만드는 중입니다.",
    look: ["커버리지: 실제로 읽은 것만 표시, 예시 화면 없음", "파이프라인: 수집, 판별, 정규화, 공개 네 단계. 화면은 미리 계산된 파일만 읽음", "KSSB 공시 제도화 일정 추적"],
    links: [["저장소", "https://github.com/JihongParker/hedge-observatory"]],
  },
  {
    id: "quant", name: "퀀트 랩", sub: "계량 모형 44종", icon: "quant", kind: "웹앱", live: "https://jihongparker.github.io/quant-lab/",
    one: "수업과 논문에서 쓴 계량 모형 44종을 슬라이더로 직접 만져 보는 곳입니다. 바깥 라이브러리 없이 전부 직접 그렸습니다.",
    look: ["첫 화면의 유체 셰이더", "동적 엔진 캐러셀: 촐레스키 산점, 변동성 표면", "시트 발췌 106개: 값과 수식을 그대로 옮김"],
    links: [["저장소", "https://github.com/JihongParker/quant-lab"]],
  },
  {
    id: "desk", name: "트레이딩 데스크", sub: "페이퍼 모드", icon: "desk", kind: "시스템", app: "desk",
    one: "개인용 미국 주식 자동 데스크입니다. 전략은 주문을 직접 내지 않고, 모든 주문이 리스크 게이트를 지나 장부에 남습니다.",
    look: [],
    links: [],
  },
];

window.PAPERS = [
  { n: "01", file: "Park_hedge_optimization.pdf", kr: "고정 예산 아래 WTI와 원달러 헤지비율 배분", p: "월 예산과 옵션 만기가 어긋나는 문제를 12조각 스트립으로 맞추고, 꼬리 손실 기준으로 다시 최적화했습니다." },
  { n: "02", file: "Park_Quanto.pdf", kr: "콴토 낙아웃의 공분산 인식 델타헤지", p: "WTI와 원달러의 공분산을 델타에 넣은 두 배리어 콴토 헤지입니다. 칼라와 견주어 어디서 갈라지는지 봅니다." },
  { n: "03", file: "Park_CFH.pdf", kr: "IFRS 9 현금흐름위험회피, 통합 지정과 분리 지정", p: "같은 포지션을 두 가지 지정 구조로 회계처리했을 때 손익 변동과 비효과 부분이 어떻게 달라지는지 계산했습니다." },
  { n: "04", file: "Park_ESG_disclosure.pdf", kr: "의무 ESG 공시와 기업 헤지", p: "코스피 380사의 2016년부터 2024년까지 공시로, 지배구조보고서와 환경정보 의무화가 헤지회계 채택과 파생 사용에 준 효과를 쟀습니다." },
  { n: "05", file: "Park_KIKO_note.pdf", kr: "KIKO 사태를 같은 틀로 다시 읽기", p: "2008년 KIKO를 네 층 틀로 다시 계산했습니다. 배리어는 시장위험을 생존위험으로 바꿉니다." },
  { n: "06", file: "Park_KIKO_comparison.pdf", kr: "무해한 배리어와 치명적 배리어", p: "같은 조건에서 두 배리어 헤지와 KIKO를 견줬습니다. 소멸 확률은 비슷한데 옵션의 방향과 제도가 갈랐습니다." },
];

window.NOTES = [
  { t: "일하는 방식", d: "무엇을 직접 하나", b: `<h1>일하는 방식</h1>
<p>설계와 기준은 제가 정하고, 반복 작업은 언어모델 파이프라인에 맡깁니다. 각주 문장을 모델이 읽고 분류하게 하는 방식, 분류 기준, 표본 대조는 제가 했고 수천 건 처리는 파이프라인이 했습니다.</p>
<div class="note">모든 사이트는 정적 배포입니다. 계산은 미리 하고 화면은 읽기만 합니다.</div>
<h2>쓰는 도구</h2><div class="chips" data-tools></div>` },
  { t: "가고 싶은 곳", d: "세 경로", b: `<h1>가고 싶은 곳</h1>
<p>증권사 리서치, 부산 소재 금융공기업(거래소, 예탁결제원, 캠코, 주택금융공사), 해외 석사 후 퀀트. 이 순서로 보고 있습니다.</p>
<p>리서치는 각주에서 파생상품과 헤지를 읽고 그것을 패널로 만들어 회귀를 돌리는 일이 제 작업과 겹칩니다. 금융공기업은 제 논문이 다루는 공시 제도를 직접 만드는 곳입니다. 석사는 논문 실적을 가장 인정해 주는 경로입니다.</p>` },
];

/* 트레이딩 데스크 (페이퍼 모드, 실계좌 수치 없음) */
window.DESK = {
  strategies: [["SmaCross", "이동평균 교차, 기준선"], ["RSI(2)", "평균회귀"], ["TSMOM", "시계열 모멘텀, 변동성 역가중"], ["News", "뉴스 언어모델 신호, 실험 중"]],
  gates: [["주문 한 건", "자본의 20% 이하"], ["종목 하나", "자본의 32% 이하"], ["하루 손실", "자본의 2%에서 서킷 발동"], ["거래", "전면 꺼짐, 페이퍼만"]],
};

window.TERMINAL_HELP = `쓸 수 있는 명령
  help            이 목록
  ls              바탕화면 항목
  about           자기소개
  papers          논문 6편
  projects        프로젝트 목록
  contact         연락처
  open <이름>     열기 (erp, obs, quant, desk, papers, notes, mail)
  neofetch        요약 카드
  clear           지우기`;

/* 경력 타임라인 (배열은 최신순, 화면은 오래된 것부터) */
window.TIMELINE = [
  { from: "2026.09", to: "진행 중", org: "헤지 관측소", items: [{ t: "코스피 상장사 파생상품 각주 전수 파싱 패널", b: ["수집, 판별, 정규화, 공개 4단계 배치 파이프라인 설계", "정적 패널 사이트 v0 배포 (React, TypeScript)", "OpenDART 수집 코드와 각주 파서를 논문 파이프라인에서 이식"] }] },
  { from: "2026.08", to: "", org: "퀀트 랩", items: [{ t: "계량 모형 44종 인터랙티브 사이트", b: ["시트 발췌 106개와 동적 엔진 44종을 한 화면에 구성", "외부 라이브러리 없이 캔버스 차트와 WebGL 히어로 구현"] }] },
  { from: "2026.07", to: "2026.08", org: "HongERP", items: [{ t: "ESG 의사결정층 ERP 시제품", b: ["논문 4편의 엔진을 동결해 연산 코어로 사용", "역할별 권한, 결재 대기열, 감사 추적, 회계연도 마감, CI 수치 검증", "4대 회계법인 ESG 솔루션 벤치마크 후 결정 층 설계", "GitHub Pages 배포 (React 19, TypeScript, Vite)"] }] },
  { from: "2026.07", to: "", org: "트레이딩 데스크 (개인)", items: [{ t: "미국 주식 자동 데스크", b: ["전략, 신호, 조정자, 리스크 게이트, 브로커, 장부 구조 설계", "Python, SQLite, launchd 상주, 페이퍼 모드 운용"] }] },
  { from: "2026", to: "2026.08", org: "WTI·원달러 헤지 연구 프로그램", items: [{ t: "작업 논문 6편 (SSRN, ResearchGate)", b: ["고정 예산 배분, 콴토 낙아웃 델타헤지, IFRS 9 지정 구조, ESG 공시 효과, KIKO 노트 2편", "코스피 380사 2016~2024 OpenDART 패널 구축과 회귀 분석", "Python 엔진과 Excel VBA 감사, LaTeX 원고"] }] },
  { from: "2025.09", to: "2025.12", org: "캠코 함께그리는미래 멘토링", items: [{ t: "복지시설 아동 영어 지도", b: [] }] },
  { from: "2025.03", to: "현재", org: "UK어학원", items: [{ t: "영어 강사", b: [] }] },
  { from: "2024.04", to: "2025.03", org: "한스어학원", items: [{ t: "영어 강사", b: [] }] },
  { from: "2022.10", to: "2024.04", org: "육군", items: [{ t: "병장 만기전역", b: [] }] },
  { from: "2021.03", to: "", org: "부산대학교 경영학과", items: [{ t: "입학, 2027년 8월 졸업 예정", b: [] }] },
];
