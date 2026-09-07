/* 콘텐츠·아이콘. 문구 수정은 여기서만. */
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
  erp: `<svg viewBox="0 0 64 64"><defs><linearGradient id="ea" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#1c5aa6"/><stop offset="1" stop-color="#104281"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#ea)"/><g fill="#fff"><rect x="14" y="34" width="8" height="16" rx="1.5"/><rect x="26" y="26" width="8" height="24" rx="1.5"/><rect x="38" y="18" width="8" height="32" rx="1.5"/></g><path d="M14 22c10 2 18-6 34-8" fill="none" stroke="#7fd0ff" stroke-width="3" stroke-linecap="round"/></svg>`,
  obs: `<svg viewBox="0 0 64 64"><defs><radialGradient id="oa" cx=".5" cy=".4"><stop offset="0" stop-color="#2b5f9e"/><stop offset="1" stop-color="#0b1f3a"/></radialGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#oa)"/><circle cx="32" cy="32" r="16" fill="none" stroke="#7fd0ff" stroke-width="2"/><circle cx="32" cy="32" r="8" fill="none" stroke="#7fd0ff" stroke-width="2" opacity=".7"/><circle cx="32" cy="32" r="2.5" fill="#fff"/><path d="M32 8v8M32 48v8M8 32h8M48 32h8" stroke="#7fd0ff" stroke-width="2"/><circle cx="43" cy="21" r="2" fill="#ffd60a"/></svg>`,
  quant: `<svg viewBox="0 0 64 64"><defs><linearGradient id="qa" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#6e4ff6"/><stop offset="1" stop-color="#2dd4bf"/></linearGradient></defs><rect x="4" y="4" width="56" height="56" rx="13" fill="url(#qa)"/><path d="M12 46c6 0 6-24 12-24s6 18 12 18 6-30 12-30" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><text x="46" y="50" font-size="14" fill="#fff" font-family="Georgia,serif" font-style="italic">σ</text></svg>`,
  desk: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#1f2937"/><g stroke-width="3" stroke-linecap="round"><path d="M14 40l10-12 8 8 8-16 10 6" fill="none" stroke="#34d399"/></g><rect x="14" y="46" width="36" height="4" rx="2" fill="#4b5563"/><circle cx="50" cy="26" r="3" fill="#f87171"/></svg>`,
  pdf: `<svg viewBox="0 0 64 64"><path d="M14 4h26l12 12v42a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#fff" stroke="#c8c8cc"/><path d="M40 4v12h12" fill="#e6e6ea"/><rect x="10" y="34" width="34" height="16" rx="3" fill="#e0342b"/><text x="27" y="46" font-size="10" text-anchor="middle" fill="#fff" font-family="-apple-system,sans-serif" font-weight="700">PDF</text></svg>`,
  github: `<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="13" fill="#24292f"/><path d="M32 14a18 18 0 0 0-5.7 35.1c.9.2 1.2-.4 1.2-.9v-3.1c-5 1.1-6.1-2.1-6.1-2.1-.8-2.1-2-2.6-2-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.3 2 5.3 1.5.2-1.2.6-2 1.2-2.4-4-.5-8.2-2-8.2-8.9 0-2 .7-3.6 1.9-4.8-.2-.5-.8-2.3.2-4.8 0 0 1.5-.5 5 1.8a17 17 0 0 1 9 0c3.4-2.3 5-1.8 5-1.8 1 2.5.4 4.3.2 4.8 1.2 1.2 1.9 2.8 1.9 4.8 0 6.9-4.2 8.4-8.2 8.9.6.6 1.2 1.7 1.2 3.4v5c0 .5.3 1.1 1.2.9A18 18 0 0 0 32 14z" fill="#fff"/></svg>`,
};

window.PERSON = {
  name: "박지홍", en: "Jihong Park",
  tag: "회계·금융 도메인을 이해하는 계량 설계",
  school: "부산대학교 경영학과", grad: "2027-08 졸업예정", gpa: "3.69 / 4.5",
  email: "adrianus026@gmail.com",
  github: "https://github.com/JihongParker",
  ssrn: "https://ssrn.com/author=12066228",
  linkedin: "", /* URL 확정 시 기입 */
  certs: [
    ["TOEIC 960", "2024-05, YBM"],
    ["전산회계 1급", "2025-10, 한국세무사회"],
    ["전산세무 2급", "2025-10, 한국세무사회"],
    ["ERP정보관리사 회계 1급", "2025-10, 한국생산성본부"],
    ["컴퓨터활용능력 2급", "2022-10, 대한상공회의소"],
  ],
  tools: ["Python (numpy·scipy·pandas)", "TypeScript·React", "LaTeX", "Excel VBA", "OpenDART API", "SQLite", "FnGuide", "SPSS"],
  exp: [
    ["2025-03 ~ 현재", "UK어학원 강사"],
    ["2024-04 ~ 2025-03", "한스어학원 강사"],
    ["2025-09 ~ 2025-12", "캠코 함께그리는미래 멘토링 이수 (복지시설 아동 영어 지도)"],
    ["2022-10 ~ 2024-04", "육군 병장 만기전역"],
  ],
};

window.PROJECTS = [
  {
    id: "papers", name: "헤지 논문 6편", en: "WTI–FX Hedge Program", icon: "papers", kind: "연구",
    one: "한국 정유수입사의 WTI × 원달러 결합 노출 하나를 예산·트레이딩·회계·공시 네 층으로 풀어낸 연작.",
    why: "교과서는 헤지비율 한 줄로 끝나지만 실무는 예산 한도, 배리어 상품, IFRS 9 지정, 공시 의무가 한 포지션 위에 겹친다. 그 겹침을 한 캘리브레이션으로 통째로 계산해 보고 싶었다.",
    look: [
      "P4: 코스피 380사 × 9년(2016~2024) OpenDART 패널로 공시 의무화가 헤지회계 채택·파생 사용에 준 효과를 정밀 null(±6pp)로 확정",
      "P1: 만기 정합 12슬라이스 스트립과 CVaR95 목적, 매칭만으로 연 95.3bn 절감",
      "P5·P6: KIKO 사태를 같은 프레임으로 재구성, 보호 레그 사망률 95~100%, 배리어 사망률은 대칭이지만 옵션성 방향과 제도가 비대칭",
    ],
    stack: ["Python", "LaTeX", "Excel VBA", "OpenDART"],
    stats: [["6", "논문 (SSRN·ResearchGate)"], ["380", "패널 기업 수"], ["3,420", "기업-연도 관측"]],
    links: [["SSRN 저자 페이지", "https://ssrn.com/author=12066228"], ["코드·TeX", "https://github.com/JihongParker/wti-fx-hedge-program"]],
  },
  {
    id: "erp", name: "HongERP", en: "ESG decision-layer ERP", icon: "erp", kind: "웹앱", live: "https://jihongparker.github.io/hong-erp/",
    one: "ESG 플랫폼들이 비워 둔 결정 층을 채운 ERP 프로토타입. 노출을 넣으면 얼마나 헤지하고 얼마나 공시할지를 동시에 계산한다.",
    why: "4대 법인의 ESG 솔루션을 벤치마크해 보니 전부 기록에서 멈춘다. 논문 4편의 엔진을 동결해 연산 코어로 두고 그 위에 역할·원장·결재·감사추적을 갖춘 ERP 셸을 얹었다.",
    look: [
      "Overview의 인과 흐름: 중대성 → 공시 → 예산 → 데스크 → 회계",
      "예산 화면의 생존 헤어컷 스위치 패널: 낙아웃 소멸 확률에 따라 장부가 바닐라로 넘어가는 손익분기(스트레스 14.5배)",
      "docs/ARCHITECTURE.md: 계층도·권한 매트릭스·원장 스키마·CI 수치 인증",
    ],
    stack: ["React 19", "TypeScript", "Vite", "GitHub Actions"],
    stats: [["4", "엔진 (논문 1편당 1개)"], ["5", "모듈"], ["CI", "엔진 수치 인증"]],
    links: [["라이브", "https://jihongparker.github.io/hong-erp/"], ["리포", "https://github.com/JihongParker/hong-erp"]],
  },
  {
    id: "obs", name: "Hedge Observatory", en: "헤지 관측소", icon: "obs", kind: "데이터", live: "https://jihongparker.github.io/hedge-observatory/",
    one: "코스피 상장사 파생상품 각주를 전수 판별·파싱·정규화해 공개 기업 헤지 패널로 만드는 진행 중 프로젝트.",
    why: "논문 P4가 스스로 인정한 공백이 각주 이질성이다. 13개사 파일럿에서 수치표 정합이 1곳뿐이었다. 그 공백을 실데이터 규모로 메우는 후속.",
    look: [
      "Coverage: 파일럿 실측만 표시, 예시 목업 없음",
      "Pipeline: 수집 → 판별 → 정규화 → 공개 4단계 배치. LLM은 모호 건에만 1회, 사이트는 정적 panel.json만 읽어 로드당 토큰 0",
      "KSSB: 공시 제도화 일정 추적",
    ],
    stack: ["Python", "React", "TypeScript", "OpenDART", "launchd"],
    stats: [["2,391", "코스피 모집단"], ["4", "배치 단계"], ["v0", "현재 상태"]],
    links: [["라이브", "https://jihongparker.github.io/hedge-observatory/"], ["리포", "https://github.com/JihongParker/hedge-observatory"]],
  },
  {
    id: "quant", name: "Quant Lab", en: "44 interactive models", icon: "quant", kind: "웹앱", live: "https://jihongparker.github.io/quant-lab/",
    one: "계량 모형 44종을 슬라이더로 만져 보는 정적 사이트. 외부 의존성 0, 캔버스 차트 직접 구현.",
    why: "수업과 논문에서 쓴 모형을 표와 수식으로만 두면 남이 못 만진다. 시트 발췌 106개와 동적 엔진 44개를 한 화면에서 이어 놓았다.",
    look: [
      "홈 히어로의 WebGL 유체 셰이더와 통계 칩",
      "동적 엔진 캐러셀: 촐레스키 산점, 변동성 표면 등 실시간 재계산",
      "시트 발췌: 값·수식·스타일을 그대로 옮긴 106개 표",
    ],
    stack: ["Vanilla JS", "Canvas", "WebGL"],
    stats: [["44", "동적 엔진"], ["106", "시트 발췌"], ["0", "외부 의존성"]],
    links: [["라이브", "https://jihongparker.github.io/quant-lab/"], ["리포", "https://github.com/JihongParker/quant-lab"]],
  },
  {
    id: "desk", name: "Trading Desk", en: "리스크 우선 자동 데스크", icon: "desk", kind: "시스템",
    one: "미국 주식 자동 트레이딩 데스크. 16전략 다중검정 결과 알파가 없다는 결론을 스스로 내고 리스크 관리로 방향을 바꿨다.",
    why: "처음 결론은 모멘텀·저변동 50:50이 알파라는 것이었다. 비용 후 동일가중 buy-hold를 못 이기고 대형주 베타(상관 0.86)일 뿐임을 반증했다. 남는 엣지는 변동성 목표 낙폭통제 하나였다.",
    look: [
      "Strategy → Signal → Orchestrator → RiskGate → Broker → Journal(SQLite) 구조. 전략은 주문을 직접 내지 않는다",
      "다중검정: DSR 0.07, PBO 5%. 관측 최고 Sharpe 1.09 < 탐색 운 기대 1.49",
      "launchd 상주, 뉴스 LLM 층은 검증 중 가설로 강등",
    ],
    stack: ["Python 3.12", "SQLite", "launchd", "Toss API"],
    stats: [["16", "전략 검정"], ["0.07", "DSR"], ["4", "위기 구간 MDD 반토막"]],
    links: [],
    note: "비공개 저장소. 연구 노트로 정리해 공개할 예정.",
  },
];

window.PAPERS = [
  { n: "01", en: "Optimal WTI–FX hedge ratios under a fixed budget", kr: "고정 예산 하 WTI·FX 최적 헤지비율 배분",
    p: "월 예산과 옵션 만기의 불일치를 12슬라이스 스트립으로 정합시키고 CVaR95 목적으로 재최적화.", kv: "연 권한 540bn · 매칭 절감 95.3bn · κ=2에서 권한 정확 소진" },
  { n: "02", en: "Covariance-aware delta hedging of a quanto knock-out", kr: "콴토 낙아웃의 공분산 인식 델타헤지",
    p: "WTI와 원달러 공분산을 델타에 반영한 더블 배리어 콴토 헤지. 칼라 대비 프레이밍.", kv: "사전계산 표면 · 배리어 리스크 모니터" },
  { n: "03", en: "IFRS 9 cash-flow hedge: combined vs split designation", kr: "IFRS 9 현금흐름위험회피, 통합 vs 분리 지정",
    p: "같은 포지션을 A/B 두 지정 구조로 회계처리했을 때 손익 변동성과 비효과 부분 차이.", kv: "구조 A/B · 옵션 기반 생산 엔진" },
  { n: "04", en: "Mandatory ESG disclosure and corporate hedging (Korea / KSSB)", kr: "의무 ESG 공시와 기업 헤지",
    p: "코스피 380사 × 2016~2024 OpenDART 패널. 지배구조보고서·환경정보 의무화가 헤지회계 채택과 파생 사용에 준 효과.", kv: "정밀 null ±6pp · 3,420 기업-연도 · 2030~31 단계적 시행 예측" },
  { n: "05", en: "KIKO through the program", kr: "KIKO 사태 응용 노트",
    p: "2008 KIKO(1풋 2콜)를 네 층 프레임으로 재구성. 배리어는 시장위험을 생존위험으로 바꾼다.", kv: "내재 이전 노셔널 5.0% · 보호 레그 사망률 95~100% · P(KI | +5%)=0.968" },
  { n: "06", en: "The benign and the lethal barrier", kr: "무해한 배리어와 치명적 배리어: 더블 KO 헤지 vs KIKO",
    p: "같은 캘리브레이션에서 두 상품을 비교. 사망률은 대칭, 옵션성 방향과 제도가 비대칭.", kv: "89.25% vs 90~100% · +25% 절하에서 바닐라 보험료의 20배 손실" },
];

window.NOTES = [
  { t: "자기소개", d: "한 문단", b: `<h1>박지홍</h1><p class="muted">부산대학교 경영학과 · 2027-08 졸업예정</p>
<p>파생상품 헤지비율을 계산하다가 예산 한도, IFRS 9 지정, ESG 공시가 같은 포지션 위에 겹친다는 것을 알게 됐고, 그 겹침을 한 캘리브레이션으로 계산하는 논문 여섯 편을 썼습니다. 그 엔진을 동결해 ERP 프로토타입에 넣었고, 논문이 남긴 공백을 상장사 각주 전수 파싱으로 메우는 중입니다.</p>
<p>회계 자격(전산회계 1급·전산세무 2급·ERP정보관리사 회계 1급)과 계량 도구(Python·VBA·TypeScript)를 같이 쓰는 것이 강점입니다. 학점은 2.70에서 시작해 3.25, 3.83, 4.14, 4.19로 올렸습니다.</p>` },
  { t: "작업 방식", d: "무엇을 직접 했나", b: `<h1>작업 방식</h1>
<p>아이디어, 검증 기준, 표본 검증은 제가 만들고 실행은 LLM 파이프라인에 맡깁니다. 예를 들어 파생상품 각주의 언어를 LLM이 판별·파싱하게 만들자는 설계와 그 판별 기준, 표본 대조는 제가 했고, 대량 처리는 파이프라인이 했습니다.</p>
<p>결과가 마음에 안 들면 반증합니다. 트레이딩 데스크의 첫 결론(모멘텀·저변동 알파)은 제 손으로 뒤집었고, 그 뒤 설계 원칙은 "알파는 희소하니 엣지는 리스크 관리"로 바뀌었습니다.</p>
<div class="note">모든 사이트는 정적 배포이고 로드당 토큰 0입니다. 계산은 사전에 하고 화면은 읽기만 합니다.</div>` },
  { t: "자격·도구", d: "표", b: `<h1>자격·어학</h1><table class="tbl"></table><h2>도구</h2><div class="chips" data-tools></div>` },
  { t: "경로", d: "가고 싶은 곳", b: `<h1>가고 싶은 곳</h1>
<ul><li><b>셀사이드 리서치</b>: 파생·헤지 각주를 읽는 눈과 패널 회귀를 돌리는 손을 같이 씁니다.</li>
<li><b>금융공기업(부산)</b>: 거래소·예탁원·캠코·주금공. 공시 제도와 파생 인프라를 다루는 자리.</li>
<li><b>해외 석사 → 퀀트</b>: SSRN 포트폴리오가 가장 높게 평가되는 시장.</li></ul>
<p class="muted">공통점은 하나입니다. 숫자를 계산하는 사람이 그 숫자가 어느 장부·어느 공시에 실리는지도 아는 자리.</p>` },
];

window.TERMINAL_HELP = `사용 가능한 명령
  help            이 목록
  ls              바탕화면 항목
  about           자기소개
  papers          논문 6편
  projects        프로젝트 목록
  skills          자격·도구
  contact         연락처
  open <이름>     창 열기 (예: open erp, open papers, open safari)
  neofetch        스펙 카드
  clear           화면 지우기`;
