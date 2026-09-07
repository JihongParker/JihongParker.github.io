/* macOS 스타일 데스크톱: 창 관리자·독·메뉴바·스팟라이트·앱 */
(() => {
const $ = (s, r=document) => r.querySelector(s);
const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
const isMobile = () => matchMedia("(max-width:720px)").matches;
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ext = (u) => window.open(u, "_blank", "noopener");

/* ---------- theme ---------- */
const root = document.documentElement;
const sysDark = matchMedia("(prefers-color-scheme: dark)");
let theme = null;
try { theme = localStorage.getItem("theme"); } catch {}
const isDark = () => root.dataset.theme === "dark";
function applyTheme() {
  const dark = theme ? theme === "dark" : sysDark.matches;
  root.dataset.theme = dark ? "dark" : "light";
  $("#theme-ic").innerHTML = dark
    ? '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg>'
    : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
  document.dispatchEvent(new Event("themechange"));
}
sysDark.addEventListener("change", applyTheme);
$("#theme-btn").onclick = () => { theme = isDark() ? "light" : "dark"; try { localStorage.setItem("theme", theme); } catch {} applyTheme(); };
applyTheme();

/* ---------- clock ---------- */
const clock = $("#clock");
const fmtD = new Intl.DateTimeFormat("ko-KR", { month: "short", day: "numeric", weekday: "short" });
const fmtT = new Intl.DateTimeFormat("ko-KR", { hour: "numeric", minute: "2-digit" });
const tick = () => { const d = new Date(); clock.textContent = (isMobile() ? "" : fmtD.format(d) + "  ") + fmtT.format(d); };
tick(); setInterval(tick, 15000);

/* ---------- boot ---------- */
if (isMobile() && !location.hash) location.replace("cv.html");
const boot = $("#boot");
const endBoot = () => boot.classList.add("off");
let seen = false; try { seen = sessionStorage.getItem("booted") === "1"; sessionStorage.setItem("booted", "1"); } catch {}
setTimeout(endBoot, seen ? 200 : 1500);
boot.addEventListener("click", endBoot);

/* ---------- apps ---------- */
const APPS = {
  finder:   { title: "Finder",   icon: ICONS.finder,   w: 820,  h: 520, render: renderFinder },
  notes:    { title: "메모",      icon: ICONS.notes,    w: 760,  h: 540, render: renderNotes },
  preview:  { title: "미리보기",  icon: ICONS.preview,  w: 1100, h: 720, render: renderPreview },
  safari:   { title: "Safari",   icon: ICONS.safari,   w: 1100, h: 700, render: renderSafari },
  terminal: { title: "터미널",    icon: ICONS.terminal, w: 700,  h: 440, render: renderTerminal },
  mail:     { title: "연락",      icon: ICONS.mail,     w: 560,  h: 360, render: renderMail },
  about:    { title: "이 사람에 관하여", icon: ICONS.settings, w: 600, h: 380, render: renderAbout },
  desk:     { title: "트레이딩 데스크", icon: ICONS.desk, w: 1360, h: 800, render: renderDesk },
};
/* 위젯 → 바로 열기 */
const launch = (p) => p.live ? open("safari", p.id) : open(p.app);
const projectApp = (p) => p.live ? "safari" : p.app;

/* ---------- window manager ---------- */
const wins = new Map();
let z = 10, cascade = 0;
const desktop = $("#desktop");
function focusWin(w) {
  for (const o of wins.values()) o.el.classList.remove("focus");
  w.el.classList.add("focus"); w.el.style.zIndex = ++z;
  $("#menubar .app").textContent = APPS[w.appId].title;
  updateDock();
}
function open(appId, arg) {
  const app = APPS[appId]; if (!app) return;
  const existing = [...wins.values()].find(o => o.appId === appId);
  if (existing) { if (existing.min) restore(existing); focusWin(existing); if (arg !== undefined && existing.onArg) existing.onArg(arg); return existing; }
  const id = appId + ":" + Date.now();
  const W = Math.min(app.w, innerWidth - 40), H = Math.min(app.h, innerHeight - 120);
  const x = Math.max(20, (innerWidth - W) / 2 + (cascade % 6) * 26 - 60);
  const y = Math.max(40, (innerHeight - H) / 2 - 20 + (cascade % 6) * 22);
  cascade++;
  const w = { id, appId, min: false };
  w.el = el(`<div class="win" style="left:${x}px;top:${y}px;width:${W}px;height:${H}px">
    <div class="tb"><div class="tl">
      <b class="c" title="닫기"><svg viewBox="0 0 8 8"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5"/></svg></b>
      <b class="m" title="최소화"><svg viewBox="0 0 8 8"><path d="M1.5 4h5"/></svg></b>
      <b class="z" title="확대"><svg viewBox="0 0 8 8"><path d="M1.5 4.5v2h2M6.5 3.5v-2h-2"/></svg></b>
    </div><div class="title">${esc(app.title)}</div></div>
    <div class="body"></div><div class="rs"></div></div>`);
  desktop.appendChild(w.el); wins.set(id, w);
  app.render(w, arg);
  const tb = $(".tb", w.el);
  $(".c", tb).onclick = (e) => { e.stopPropagation(); close(w); };
  $(".m", tb).onclick = (e) => { e.stopPropagation(); minimize(w); };
  $(".z", tb).onclick = (e) => { e.stopPropagation(); toggleMax(w); };
  tb.ondblclick = (e) => { if (!e.target.closest(".tl")) toggleMax(w); };
  w.el.addEventListener("pointerdown", () => focusWin(w), true);
  drag(w, tb); resize(w); focusWin(w); bounceDock(appId);
  return w;
}
function close(w) {
  w.el.classList.add("closing");
  w.el.addEventListener("animationend", () => { w.el.remove(); wins.delete(w.id); const t = topWin(); if (t) focusWin(t); else { $("#menubar .app").textContent = "Finder"; updateDock(); } }, { once: true });
}
function minimize(w) {
  w.el.classList.add("minimizing"); w.min = true;
  w.el.addEventListener("animationend", () => { w.el.style.display = "none"; w.el.classList.remove("minimizing"); const t = topWin(); if (t) focusWin(t); updateDock(); }, { once: true });
}
function restore(w) { w.min = false; w.el.style.display = ""; }
function topWin() { return [...wins.values()].filter(o => !o.min).sort((a, b) => (+b.el.style.zIndex) - (+a.el.style.zIndex))[0]; }
function toggleMax(w) {
  if (isMobile()) return;
  const e = w.el;
  if (e.classList.toggle("max")) { w.saved = { left: e.style.left, top: e.style.top, width: e.style.width, height: e.style.height }; Object.assign(e.style, { left: "0px", top: "28px", width: innerWidth + "px", height: (innerHeight - 28 - 84) + "px" }); }
  else Object.assign(e.style, w.saved);
  e.dispatchEvent(new Event("winresize"));
}
function drag(w, handle) {
  handle.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".tl") || isMobile() || w.el.classList.contains("max")) return;
    const sx = e.clientX - w.el.offsetLeft, sy = e.clientY - w.el.offsetTop;
    handle.setPointerCapture(e.pointerId);
    const mv = (ev) => { w.el.style.left = Math.max(-w.el.offsetWidth + 80, ev.clientX - sx) + "px"; w.el.style.top = Math.max(28, ev.clientY - sy) + "px"; };
    const up = () => { handle.removeEventListener("pointermove", mv); handle.removeEventListener("pointerup", up); };
    handle.addEventListener("pointermove", mv); handle.addEventListener("pointerup", up);
  });
}
function resize(w) {
  const h = $(".rs", w.el);
  h.addEventListener("pointerdown", (e) => {
    e.stopPropagation(); h.setPointerCapture(e.pointerId);
    const sw = w.el.offsetWidth - e.clientX, sh = w.el.offsetHeight - e.clientY;
    const mv = (ev) => { w.el.style.width = Math.max(360, ev.clientX + sw) + "px"; w.el.style.height = Math.max(220, ev.clientY + sh) + "px"; w.el.dispatchEvent(new Event("winresize")); };
    const up = () => { h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); };
    h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
  });
}
function closeAll() { for (const w of [...wins.values()]) close(w); }

/* ---------- dock ---------- */
const dock = $("#dock");
const dockItem = (app, icon, title, run) => { const d = el(`<div class="dk" data-app="${app}">${icon}<span class="tip">${esc(title)}</span></div>`); d.onclick = run; dock.appendChild(d); };
for (const id of ["finder", "notes", "preview", "safari", "terminal", "mail", "about"]) dockItem(id, APPS[id].icon, APPS[id].title, () => open(id));
dock.appendChild(el('<div class="sep"></div>'));
for (const p of PROJECTS.filter(p => p.id !== "papers")) dockItem(projectApp(p) + "#" + p.id, ICONS[p.icon], p.name, () => launch(p));
dock.appendChild(el('<div class="sep"></div>'));
dockItem("trash", ICONS.trash, "휴지통 (열린 창 모두 닫기)", closeAll);
function updateDock() { for (const d of dock.querySelectorAll(".dk")) { const a = d.dataset.app.split("#")[0]; d.classList.toggle("run", [...wins.values()].some(o => o.appId === a)); } }
function bounceDock(appId) { const d = dock.querySelector(`[data-app="${appId}"]`) || dock.querySelector(`[data-app^="${appId}#"]`); if (d) { d.classList.remove("bounce"); void d.offsetWidth; d.classList.add("bounce"); } }
dock.addEventListener("pointermove", (e) => {
  if (isMobile() || e.pointerType === "touch") return;
  for (const d of dock.querySelectorAll(".dk")) { const r = d.getBoundingClientRect(), dist = Math.abs(e.clientX - (r.left + r.width / 2)); const s = Math.max(1, 1.55 - dist / 110); d.style.transform = `scale(${s.toFixed(3)})`; d.style.margin = `0 ${((s - 1) * 14).toFixed(1)}px`; }
});
dock.addEventListener("pointerleave", () => { for (const d of dock.querySelectorAll(".dk")) { d.style.transform = ""; d.style.margin = ""; } });

/* ---------- desktop icons ---------- */
const iconsBox = $("#icons");
const DESK_ITEMS = [
  ...PROJECTS.map(p => ({ label: p.name, icon: ICONS[p.icon], run: () => launch(p) })),
  { label: "메모.txt", icon: ICONS.doc("TXT"), run: () => open("notes") },
  { label: "GitHub", icon: ICONS.github, run: () => ext(PERSON.github) },
];
for (const it of DESK_ITEMS) {
  const d = el(`<div class="dicon" tabindex="0"><div class="ic">${it.icon}</div><span>${esc(it.label)}</span></div>`);
  d.onclick = () => { for (const o of iconsBox.children) o.classList.remove("sel"); d.classList.add("sel"); if (isMobile()) it.run(); };
  d.ondblclick = it.run; d.onkeydown = (e) => { if (e.key === "Enter") it.run(); };
  iconsBox.appendChild(d);
}
desktop.addEventListener("pointerdown", (e) => { if (e.target === desktop) for (const o of iconsBox.children) o.classList.remove("sel"); });

/* ---------- menus ---------- */
const MENUS = {
  logo: [["이 사람에 관하여", () => open("about")], ["읽기 모드 (한 장짜리)", () => location.href = "cv.html"], ["Reading mode (English)", () => location.href = "cv-en.html"], null, ["모든 창 닫기", closeAll, "⌘⇧W"], ["다크 모드 전환", () => $("#theme-btn").click()]],
  file: [["새 Finder 창", () => open("finder"), "⌘N"], ["메모 열기", () => open("notes")], null, ["창 닫기", () => { const t = topWin(); if (t) close(t); }, "⌘W"]],
  go: [...PROJECTS.map(p => [p.name, () => launch(p)]), null, ["터미널", () => open("terminal")], ["연락", () => open("mail")]],
  help: [["단축키: ⌘K 검색 · ⌘W 닫기 · 아이콘 두 번 클릭", () => open("terminal")], ["읽기 모드", () => location.href = "cv.html"], ["이력서 PDF", () => ext("cv/jihong-park-cv-ko.pdf")], ["GitHub", () => ext(PERSON.github)], ["SSRN", () => ext(PERSON.ssrn)], ["LinkedIn", () => ext(PERSON.linkedin)]],
};
let openMenu = null;
for (const item of document.querySelectorAll("#menubar .item[data-menu]")) {
  const m = el('<div class="menu"></div>');
  for (const row of MENUS[item.dataset.menu]) {
    if (!row) { m.appendChild(el("<hr>")); continue; }
    const b = el(`<button><span>${esc(row[0])}</span>${row[2] ? `<span class="k">${row[2]}</span>` : ""}</button>`);
    b.onclick = (e) => { e.stopPropagation(); hideMenus(); row[1](); }; m.appendChild(b);
  }
  item.appendChild(m);
  item.onclick = (e) => { e.stopPropagation(); const was = m.classList.contains("show"); hideMenus(); if (!was) { m.classList.add("show"); item.classList.add("open"); openMenu = m; } };
  item.onmouseenter = () => { if (openMenu && openMenu !== m) { hideMenus(); m.classList.add("show"); item.classList.add("open"); openMenu = m; } };
}
function hideMenus() { for (const m of document.querySelectorAll(".menu")) m.classList.remove("show"); for (const i of document.querySelectorAll("#menubar .item")) i.classList.remove("open"); openMenu = null; }
document.addEventListener("click", hideMenus);

/* ---------- spotlight ---------- */
const spot = $("#spot"), spotIn = $("#spot input"), spotList = $("#spot ul");
const INDEX = [
  ...Object.entries(APPS).map(([id, a]) => ({ t: a.title, s: "앱", icon: a.icon, run: () => open(id) })),
  ...PROJECTS.map(p => ({ t: p.name + " · " + p.sub, s: p.kind, icon: ICONS[p.icon], run: () => launch(p) })),
  ...PAPERS.map(p => ({ t: p.kr, s: "논문 " + p.n, icon: ICONS.pdf, run: () => open("preview", p.n) })),
  ...NOTES.map((n, i) => ({ t: n.t, s: "메모", icon: ICONS.notes, run: () => open("notes", i) })),
];
let spotSel = 0;
function showSpot() { spot.classList.add("show"); spotIn.value = ""; renderSpot(); spotIn.focus(); }
function hideSpot() { spot.classList.remove("show"); }
function renderSpot() {
  const q = spotIn.value.trim().toLowerCase();
  const hits = (q ? INDEX.filter(i => (i.t + i.s).toLowerCase().includes(q)) : INDEX).slice(0, 9);
  spotSel = Math.min(spotSel, Math.max(0, hits.length - 1)); spotList.innerHTML = "";
  hits.forEach((h, i) => { const li = el(`<li class="${i === spotSel ? "on" : ""}">${h.icon}<span>${esc(h.t)}</span><small>${esc(h.s)}</small></li>`); li.onclick = () => { hideSpot(); h.run(); }; li.onmouseenter = () => { spotSel = i; renderSpot(); }; spotList.appendChild(li); });
  spotList._hits = hits;
}
spotIn.oninput = () => { spotSel = 0; renderSpot(); };
spotIn.onkeydown = (e) => { const hits = spotList._hits || []; if (e.key === "ArrowDown") { spotSel = (spotSel + 1) % hits.length; renderSpot(); e.preventDefault(); } else if (e.key === "ArrowUp") { spotSel = (spotSel - 1 + hits.length) % hits.length; renderSpot(); e.preventDefault(); } else if (e.key === "Enter" && hits[spotSel]) { hideSpot(); hits[spotSel].run(); } else if (e.key === "Escape") hideSpot(); };
spot.onclick = (e) => { if (e.target === spot) hideSpot(); };
$("#spot-btn").onclick = (e) => { e.stopPropagation(); showSpot(); };
document.addEventListener("keydown", (e) => {
  const meta = e.metaKey || e.ctrlKey;
  if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); spot.classList.contains("show") ? hideSpot() : showSpot(); }
  else if (meta && e.key.toLowerCase() === "w") { e.preventDefault(); if (e.shiftKey) closeAll(); else { const t = topWin(); if (t) close(t); } }
  else if (meta && e.key.toLowerCase() === "n") { e.preventDefault(); open("finder"); }
  else if (e.key === "Escape") { hideSpot(); hideMenus(); }
});

/* ---------- Finder ---------- */
function renderFinder(w) {
  const body = $(".body", w.el);
  const groups = {
    "포트폴리오": PROJECTS.map(p => ({ label: p.name, icon: ICONS[p.icon], run: () => launch(p) })),
    "논문": PAPERS.map(p => ({ label: `${p.n}_${p.kr}.pdf`, icon: ICONS.pdf, run: () => open("preview", p.n) })),
    "메모": NOTES.map((n, i) => ({ label: n.t + ".txt", icon: ICONS.doc("TXT"), run: () => open("notes", i) })),
    "연락": [{ label: "메일", icon: ICONS.mail, run: () => open("mail") }, { label: "GitHub", icon: ICONS.github, run: () => ext(PERSON.github) }],
  };
  body.innerHTML = `<div class="side"><h6>즐겨찾기</h6>${Object.keys(groups).map((g, i) => `<button class="${i ? "" : "on"}" data-g="${esc(g)}"><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${esc(g)}</button>`).join("")}</div>
    <div style="flex:1;display:flex;flex-direction:column;min-width:0"><div class="pane fgrid"></div><div class="fpath"></div></div>`;
  const grid = $(".fgrid", body), path = $(".fpath", body);
  const show = (g) => {
    for (const b of body.querySelectorAll(".side button")) b.classList.toggle("on", b.dataset.g === g);
    grid.innerHTML = "";
    for (const it of groups[g]) { const d = el(`<div class="fitem">${it.icon}<span>${esc(it.label)}</span></div>`); d.onclick = () => { for (const o of grid.children) o.classList.remove("sel"); d.classList.add("sel"); if (isMobile()) it.run(); }; d.ondblclick = it.run; grid.appendChild(d); }
    path.innerHTML = `<span>${ICONS.finder.replace("<svg", '<svg style="width:14px;height:14px;vertical-align:-2px"')}</span> 박지홍 › ${esc(g)} <span style="margin-left:auto">${groups[g].length}개 항목</span>`;
  };
  for (const b of body.querySelectorAll(".side button")) b.onclick = () => show(b.dataset.g);
  show("포트폴리오");
}

/* ---------- Safari (라이브 사이트 + 소개 패널) ---------- */
function renderSafari(w, pid) {
  const body = $(".body", w.el);
  const tabs = PROJECTS.filter(p => p.live);
  body.innerHTML = `<div class="sf">
    <div class="bar"><button class="nb" data-back title="뒤로"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="nb" data-reload title="새로고침"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg></button><div class="url"></div><button class="nb" data-info title="이 사이트 소개"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg></button><a class="nb" data-ext target="_blank" rel="noopener" title="새 탭에서 열기"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a></div>
    <div class="tabs">${tabs.map(p => `<button data-t="${p.id}">${esc(p.name)}</button>`).join("")}</div>
    <div class="sfbody"><iframe title="live" loading="lazy" referrerpolicy="no-referrer"></iframe><aside class="info" hidden></aside></div></div>`;
  const fr = $("iframe", body), url = $(".url", body), extA = $("[data-ext]", body), info = $(".info", body);
  let cur = null;
  const show = (id) => {
    const p = tabs.find(t => t.id === id) || tabs[0]; cur = p;
    for (const b of body.querySelectorAll(".tabs button")) b.classList.toggle("on", b.dataset.t === p.id);
    if (fr.src !== p.live) fr.src = p.live;
    url.textContent = p.live.replace("https://", ""); extA.href = p.live;
    $(".title", w.el).textContent = p.name + " — Safari";
    info.innerHTML = `<h2>${esc(p.name)}</h2><p class="muted">${esc(p.sub)}</p><p>${esc(p.one)}</p><h3>어디를 보면 되나</h3><ul>${p.look.map(l => `<li>${esc(l)}</li>`).join("")}</ul><div class="btns">${p.links.map(l => `<a class="btn" href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])}</a>`).join("")}</div>`;
  };
  for (const b of body.querySelectorAll(".tabs button")) b.onclick = () => show(b.dataset.t);
  $("[data-reload]", body).onclick = () => { fr.src = fr.src; };
  $("[data-back]", body).onclick = () => { try { fr.contentWindow.history.back(); } catch {} };
  $("[data-info]", body).onclick = (e) => { info.hidden = !info.hidden; e.currentTarget.classList.toggle("on", !info.hidden); };
  w.onArg = show; show(pid);
}

/* ---------- 미리보기 (논문 PDF) ---------- */
function renderPreview(w, n) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="side pv-side"><h6>작업 논문 6편 <span class="wp">working papers · 심사 전</span></h6>${PAPERS.map(p => `<button data-n="${p.n}"><span class="pn">${p.n}</span><span>${esc(p.kr)}</span></button>`).join("")}<hr><a class="side-link" href="${PERSON.ssrn}" target="_blank" rel="noopener">SSRN 저자 페이지</a><a class="side-link" href="https://github.com/JihongParker/wti-fx-hedge-program" target="_blank" rel="noopener">코드와 원고</a><a class="side-link" href="cv.html">읽기 모드</a><a class="side-link" href="cv/jihong-park-cv-ko.pdf" target="_blank" rel="noopener">이력서 PDF</a></div>
    <div class="pv"><div class="pv-hd"><div><b></b><p></p></div><a class="btn" data-open target="_blank" rel="noopener">새 탭에서 열기</a></div><iframe title="pdf"></iframe></div>`;
  const fr = $("iframe", body), hd = $(".pv-hd", body);
  const show = (num) => {
    const p = PAPERS.find(x => x.n === num) || PAPERS[0];
    for (const b of body.querySelectorAll(".side button")) b.classList.toggle("on", b.dataset.n === p.n);
    const src = "papers/" + p.file;
    if (!fr.src.endsWith(src)) fr.src = src + "#view=FitH";
    $("b", hd).textContent = p.n + "  " + p.kr; $("p", hd).textContent = p.p; $("[data-open]", hd).href = src;
    $(".title", w.el).textContent = p.file + " — 미리보기";
  };
  for (const b of body.querySelectorAll(".side button")) b.onclick = () => show(b.dataset.n);
  w.onArg = show; show(n);
}

/* ---------- 트레이딩 데스크 (실제 데스크 화면 재현, 페이퍼 모드) ---------- */
const DESK_NAMES = { SPY: "S&P500 ETF", NVDA: "엔비디아", AAPL: "애플", TSLA: "테슬라", LLY: "일라이릴리", MO: "알트리아", C: "씨티그룹", GOOG: "알파벳", GOOGL: "알파벳A", QCOM: "퀄컴", GILD: "길리어드", CAT: "캐터필러", JPM: "JP모건" };
function renderDesk(w) {
  const body = $(".body", w.el); body.classList.add("tdbody");
  body.innerHTML = `<div class="td">
    <div class="td-top">
      <div class="td-logo"><i></i>trading-desk</div>
      <div class="td-tabs"><button class="on" data-v="desk">데스크</button><button data-v="struct">구조</button><button data-v="valid">검증</button></div>
      <div class="td-search"><input placeholder="종목 검색 ( / )" data-q></div>
      <div class="td-grid"><button data-g="1">1</button><button class="on" data-g="4">4</button></div>
      <div class="td-kv"><span>평가자산 <b>비공개</b></span><span>누적손익 <b>비공개</b></span><span>주문가능 <b>비공개</b></span></div>
      <div class="td-status"><span class="pill warn">페이퍼 모드</span><span class="dot">데스크</span><span class="dot">뉴스</span><span class="dot">봇</span><span class="pill">조회 전용</span></div>
    </div>
    <div class="td-banner">실계좌와 연결하지 않은 화면입니다. 봉은 2026년 4월부터 7월까지의 공개 5분 시세를 묶은 것이고, 보유 종목과 손익은 표시하지 않습니다.</div>
    <div class="td-view" data-view="desk">
      <aside class="td-left"><div class="td-h">추천 종목 <small>재무 감사</small></div><div class="td-recs"></div></aside>
      <main class="td-charts"></main>
      <aside class="td-right"><div class="td-h">보유 종목 · 근거 <small class="live">페이퍼</small></div><div class="td-pos"></div><div class="td-h" style="margin-top:14px">리스크 게이트</div><div class="td-gates">${DESK.gates.map(g => `<div><span>${esc(g[0])}</span><b>${esc(g[1])}</b></div>`).join("")}</div></aside>
    </div>
    <div class="td-view" data-view="struct" hidden><div class="pane">
      <h2>구조</h2><p class="flow">전략 → 신호 → 조정자 → 리스크 게이트 → 브로커 → 장부</p><p class="muted">전략은 주문을 직접 내지 않습니다. 모든 주문은 게이트를 지나고 장부에 남습니다. 데스크와 화면은 터미널 없이 상주하고, 재시작하면 장부에서 상태를 되살립니다.</p>
      <div class="two"><div><h2>전략 4종</h2><ul>${DESK.strategies.map(s => `<li><b>${esc(s[0])}</b> ${esc(s[1])}</li>`).join("")}</ul></div>
      <div><h2>층</h2><ul><li><b>시세</b> 5분 봉, 일봉, 장기 데이터</li><li><b>재무 감사</b> 저평가·우량·성장·모멘텀 점수, 부채 흐름</li><li><b>뉴스</b> 언어모델 판독, 검증 중 가설로 강등</li><li><b>장부</b> SQLite, 모든 주문과 거부 사유 기록</li></ul></div></div>
      <h2>결론</h2><p>모멘텀과 저변동을 섞은 첫 챔피언은 비용을 넣자 동일가중 매수보유를 못 이겼고, 표본외 우위는 장세 운이었습니다. 알파는 드물고, 남는 엣지는 낙폭 관리입니다.</p></div></div>
    <div class="td-view" data-view="valid" hidden><div class="pane desk">
      <div class="stats">${DESK.tests.map(s => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div>
      <h2>남은 엣지 하나: 변동성 목표로 낙폭 줄이기</h2>
      <div class="ctl"><label>목표 변동성 <output data-o="tv">10%</output><input type="range" data-tv min="5" max="20" value="10"></label><label>실현변동성 창 <output data-o="lb">12주</output><input type="range" data-lb min="4" max="26" value="12"></label><span class="muted">SPY 주간 종가 1993년부터. 레버리지 상한 1, 비용 0.</span></div>
      <div class="chart"><canvas></canvas><div class="tip" hidden></div><div class="legend"><span><i style="background:var(--s1)"></i>매수 후 보유</span><span><i style="background:var(--s2)"></i>변동성 목표</span></div></div>
      <table class="tbl2"><thead><tr><th>구간</th><th>매수 후 보유 최대낙폭</th><th>변동성 목표 최대낙폭</th><th>차이</th></tr></thead><tbody data-crisis></tbody></table></div></div>
    <div class="td-ticker"><div class="td-tk"></div></div>
  </div>`;
  /* 탭 */
  const views = body.querySelectorAll(".td-view");
  for (const b of body.querySelectorAll(".td-tabs button")) b.onclick = () => { for (const o of body.querySelectorAll(".td-tabs button")) o.classList.toggle("on", o === b); for (const v of views) v.hidden = v.dataset.view !== b.dataset.v; if (b.dataset.v === "valid") validation.draw(); else drawAll(); };
  /* 추천 종목 */
  fetch("desk_recs.json").then(r => r.json()).then(recs => {
    $(".td-recs", body).innerHTML = recs.map((r, i) => `<div class="rec"><div class="rec-h"><span class="rk">${i + 1}</span><b>${esc(r.symbol)}</b><span class="nm">${esc(DESK_NAMES[r.symbol] || "")} · ${esc(r.sector || "")}</span><span class="sc">+${(+r.composite).toFixed(2)}</span></div><div class="rec-s">${esc(r.summary || "")}</div><div class="rec-t">${r.deleveraging ? '<span class="tg r">채권환원</span>' : ""}${r.net_cash ? '<span class="tg g">순현금</span>' : ""}</div></div>`).join("");
  }).catch(() => {});
  /* 차트 */
  let CANDLES = null, grid = 4, filter = "";
  const charts = $(".td-charts", body);
  const symsAll = ["SPY", "NVDA", "AAPL", "TSLA"];
  const state = {}; for (const s of symsAll) state[s] = { tf: "30" };
  const sma = (a, n) => a.map((_, i) => i < n - 1 ? null : a.slice(i - n + 1, i + 1).reduce((x, y) => x + y, 0) / n);
  function buildCards() {
    const syms = symsAll.filter(s => !filter || s.includes(filter)).slice(0, grid);
    charts.className = "td-charts g" + (syms.length === 1 ? 1 : 4);
    charts.innerHTML = syms.map(s => `<section class="tdc" data-s="${s}"><div class="tdc-h"><b>${s}</b><span class="nm">${esc(DESK_NAMES[s] || "")}</span><span class="px"></span><span class="chg"></span></div><div class="tdc-l"><span class="ma5">MA5</span><span class="ma20">MA20</span><span class="bb">BB±2σ</span><span class="tfs">${["15", "30", "60"].map(t => `<button data-tf="${t}" class="${state[s].tf === t ? "on" : ""}">${t}분</button>`).join("")}</span></div><div class="tdc-c"><canvas></canvas><div class="tip" hidden></div></div></section>`).join("");
    for (const sec of charts.querySelectorAll(".tdc")) for (const b of sec.querySelectorAll("[data-tf]")) b.onclick = () => { state[sec.dataset.s].tf = b.dataset.tf; for (const o of sec.querySelectorAll("[data-tf]")) o.classList.toggle("on", o === b); drawCard(sec); };
    drawAll();
  }
  function drawAll() { if (!CANDLES) return; for (const sec of charts.querySelectorAll(".tdc")) drawCard(sec); }
  function drawCard(sec) {
    const s = sec.dataset.s, rows = CANDLES[s][state[s].tf]; if (!rows) return;
    const cv = $("canvas", sec), box = $(".tdc-c", sec), tip = $(".tip", sec);
    const W = box.clientWidth, H = box.clientHeight, dpr = devicePixelRatio || 1; if (W < 10 || H < 10) return;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
    const c = cv.getContext("2d"); c.scale(dpr, dpr);
    const cl = rows.map(r => r[4]), m5 = sma(cl, 5), m20 = sma(cl, 20);
    const bb = cl.map((_, i) => { if (i < 19) return null; const s20 = cl.slice(i - 19, i + 1), m = m20[i]; const sd = Math.sqrt(s20.reduce((a, b) => a + (b - m) ** 2, 0) / 20); return [m + 2 * sd, m - 2 * sd]; });
    const L = 8, R = 48, T = 10, B = 22, n = rows.length;
    let lo = Math.min(...rows.map(r => r[3])), hi = Math.max(...rows.map(r => r[2]));
    for (const b of bb) if (b) { lo = Math.min(lo, b[1]); hi = Math.max(hi, b[0]); }
    const pad = (hi - lo) * 0.06; lo -= pad; hi += pad;
    const X = (i) => L + (W - L - R) * (i + .5) / n, Y = (v) => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
    const cw = Math.max(2, (W - L - R) / n * 0.6);
    c.clearRect(0, 0, W, H); c.font = "10px " + getComputedStyle(body).fontFamily; c.fillStyle = "#7d8590"; c.strokeStyle = "rgba(255,255,255,.07)"; c.lineWidth = 1;
    const ticks = 5; for (let k = 0; k <= ticks; k++) { const v = lo + (hi - lo) * k / ticks; c.beginPath(); c.moveTo(L, Y(v)); c.lineTo(W - R, Y(v)); c.stroke(); c.textAlign = "left"; c.fillText(v.toFixed(v > 100 ? 0 : 2), W - R + 6, Y(v) + 3); }
    c.textAlign = "center"; const step = Math.ceil(n / 5); for (let i = 0; i < n; i += step) c.fillText(rows[i][0].slice(6), X(i), H - 7);
    const line = (arr, col, wd = 1.4) => { c.beginPath(); c.strokeStyle = col; c.lineWidth = wd; let started = false; arr.forEach((v, i) => { if (v == null) return; started ? c.lineTo(X(i), Y(v)) : c.moveTo(X(i), Y(v)); started = true; }); c.stroke(); };
    line(bb.map(b => b && b[0]), "rgba(255,255,255,.28)", 1); line(bb.map(b => b && b[1]), "rgba(255,255,255,.28)", 1);
    rows.forEach((r, i) => { const up = r[4] >= r[1], col = up ? "#e5484d" : "#3b82f6"; c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 1; c.beginPath(); c.moveTo(X(i), Y(r[2])); c.lineTo(X(i), Y(r[3])); c.stroke(); const y1 = Y(Math.max(r[1], r[4])), y2 = Y(Math.min(r[1], r[4])); c.fillRect(X(i) - cw / 2, y1, cw, Math.max(1, y2 - y1)); });
    line(m5, "#f5a524"); line(m20, "#2dd4bf");
    const last = rows[n - 1][4], first = rows[0][1], chg = (last / first - 1) * 100;
    $(".px", sec).textContent = "$" + last.toFixed(2); const ch = $(".chg", sec); ch.textContent = (chg >= 0 ? "▲ +" : "▼ ") + chg.toFixed(2) + "%"; ch.className = "chg " + (chg >= 0 ? "up" : "dn");
    box.onpointermove = (e) => { const r = cv.getBoundingClientRect(), i = Math.floor((e.clientX - r.left - L) / (W - L - R) * n); if (i < 0 || i >= n) { tip.hidden = true; return; } const q = rows[i]; tip.hidden = false; tip.style.left = Math.min(e.clientX - r.left + 10, W - 150) + "px"; tip.innerHTML = `<b>${q[0]}</b>시 ${q[1]} 고 ${q[2]}<br>저 ${q[3]} 종 ${q[4]}`; };
    box.onpointerleave = () => { tip.hidden = true; };
  }
  /* 신호(페이퍼 장부 근거) + 티커 */
  function signals() {
    const out = [];
    for (const s of symsAll) { const cl = CANDLES[s]["60"].map(r => r[4]); const m5 = sma(cl, 5), m20 = sma(cl, 20), n = cl.length; const cross = m5[n - 1] > m20[n - 1] ? "정배열" : "역배열"; const g = [], l = []; for (let i = n - 2; i < n; i++) { const d = cl[i] - cl[i - 1]; (d > 0 ? g : l).push(Math.abs(d)); } const ag = g.reduce((a, b) => a + b, 0) / 2, al = l.reduce((a, b) => a + b, 0) / 2; const rsi = al === 0 ? 100 : 100 - 100 / (1 + ag / al); const mom = cl[n - 1] / cl[Math.max(0, n - 60)] - 1; out.push({ s, cross, rsi, mom }); }
    return out;
  }
  function renderSignals() {
    const sg = signals();
    $(".td-pos", body).innerHTML = `<div class="td-note">실계좌 보유 종목은 표시하지 않습니다. 아래는 60분 봉으로 지금 계산한 전략 신호입니다.</div>` + sg.map(x => `<div class="pos"><b>${x.s}</b><span class="nm">${esc(DESK_NAMES[x.s] || "")}</span><div class="pos-r"><span>이동평균 <b class="${x.cross === "정배열" ? "up" : "dn"}">${x.cross}</b></span><span>RSI(2) <b>${x.rsi.toFixed(0)}</b></span><span>60봉 모멘텀 <b class="${x.mom >= 0 ? "up" : "dn"}">${(x.mom * 100).toFixed(1)}%</b></span></div><div class="pos-v">게이트 판정 <b>보류</b> · 거래 꺼짐</div></div>`).join("");
    const tk = sg.map(x => `<span><b>${x.s}</b> ${x.cross}, RSI(2) ${x.rsi.toFixed(0)}, 60봉 ${(x.mom * 100).toFixed(1)}% <small>strategy</small></span>`).join("");
    $(".td-tk", body).innerHTML = tk + tk;
  }
  fetch("desk_candles.json").then(r => r.json()).then(j => { CANDLES = j.symbols; buildCards(); renderSignals(); }).catch(() => { charts.innerHTML = '<p class="muted" style="padding:20px">시세 파일을 읽지 못했습니다.</p>'; });
  for (const b of body.querySelectorAll("[data-g]")) b.onclick = () => { grid = +b.dataset.g; for (const o of body.querySelectorAll("[data-g]")) o.classList.toggle("on", o === b); buildCards(); };
  $("[data-q]", body).oninput = (e) => { filter = e.target.value.trim().toUpperCase(); buildCards(); };
  /* 검증 탭(변동성 목표) */
  const validation = renderValidation($('[data-view="valid"]', body), w);
  w.el.addEventListener("winresize", () => { drawAll(); validation.draw(); }); new ResizeObserver(() => drawAll()).observe(charts);
}
function renderValidation(host, w) {
  const cv = $("canvas", host), tip = $(".tip", host), chart = $(".chart", host);
  let rows = null, series = null;
  fetch("spy_weekly.json").then(r => r.json()).then(j => { rows = j.rows; compute(); draw(); }).catch(() => {});
  function compute() {
    const tv = +$("[data-tv]", host).value / 100, lb = +$("[data-lb]", host).value;
    const px = rows.map(r => r[1]), n = px.length, bh = [1], vt = [1], wts = [1], rets = [0];
    for (let i = 1; i < n; i++) rets.push(px[i] / px[i - 1] - 1);
    for (let i = 1; i < n; i++) { let wgt = 1; if (i > lb) { const s = rets.slice(i - lb, i); const m = s.reduce((a, b) => a + b, 0) / lb; const v = Math.sqrt(s.reduce((a, b) => a + (b - m) ** 2, 0) / (lb - 1)) * Math.sqrt(52); wgt = Math.min(1, tv / Math.max(v, 1e-6)); } bh.push(bh[i - 1] * (1 + rets[i])); vt.push(vt[i - 1] * (1 + wgt * rets[i])); wts.push(wgt); }
    series = { bh, vt, wts };
    const mdd = (arr, a, b) => { let pk = arr[a], m = 0; for (let i = a; i <= b; i++) { pk = Math.max(pk, arr[i]); m = Math.min(m, arr[i] / pk - 1); } return m; };
    const idx = (d) => { let k = 0; while (k < n - 1 && rows[k][0] < d) k++; return k; };
    const pct = (x) => (x * 100).toFixed(1) + "%";
    $("[data-crisis]", host).innerHTML = DESK.crises.map(c => { const a = idx(c[1]), b = idx(c[2]); const x = mdd(bh, a, b), y = mdd(vt, a, b); return `<tr><td>${esc(c[0])} <span class="muted">${c[1].slice(0, 4)}~${c[2].slice(0, 4)}</span></td><td>${pct(x)}</td><td>${pct(y)}</td><td>${(y - x) >= 0 ? "+" : ""}${pct(y - x)}</td></tr>`; }).join("") + `<tr><td>전체 ${rows[0][0].slice(0, 4)}~${rows[n - 1][0].slice(0, 4)}</td><td>${pct(mdd(bh, 0, n - 1))}</td><td>${pct(mdd(vt, 0, n - 1))}</td><td>${pct(mdd(vt, 0, n - 1) - mdd(bh, 0, n - 1))}</td></tr>`;
  }
  function draw() {
    if (!series || host.hidden) return;
    const dpr = devicePixelRatio || 1, W = chart.clientWidth, H = 280; if (W < 10) return;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
    const c = cv.getContext("2d"); c.scale(dpr, dpr);
    const st = getComputedStyle(host), s1 = st.getPropertyValue("--s1").trim(), s2 = st.getPropertyValue("--s2").trim(), ink = "#7d8590", grid = "rgba(255,255,255,.08)";
    const L = 44, R = 70, T = 12, B = 26, n = rows.length;
    const ymax = Math.max(...series.bh, ...series.vt), lmax = Math.log10(ymax * 1.15);
    const X = (i) => L + (W - L - R) * i / (n - 1), Y = (v) => T + (H - T - B) * (1 - Math.log10(v) / lmax);
    c.clearRect(0, 0, W, H); c.font = "11px " + st.fontFamily; c.fillStyle = ink; c.strokeStyle = grid; c.lineWidth = 1;
    for (const t of [1, 2, 5, 10, 20, 50]) { if (t > ymax * 1.15) break; c.beginPath(); c.moveTo(L, Y(t)); c.lineTo(W - R, Y(t)); c.stroke(); c.textAlign = "right"; c.fillText(t + "배", L - 6, Y(t) + 4); }
    c.textAlign = "center"; for (let y = 1995; y <= 2030; y += 5) { const k = rows.findIndex(r => r[0] >= y + "-01-01"); if (k > 0) c.fillText(String(y), X(k), H - 8); }
    const line = (arr, col) => { c.beginPath(); c.strokeStyle = col; c.lineWidth = 2; c.lineJoin = "round"; arr.forEach((v, i) => i ? c.lineTo(X(i), Y(v)) : c.moveTo(X(i), Y(v))); c.stroke(); c.textAlign = "left"; c.fillStyle = "#e6edf3"; c.fillText(arr[n - 1].toFixed(1) + "배", W - R + 6, Y(arr[n - 1]) + 4); };
    line(series.bh, s1); line(series.vt, s2);
    chart.onpointermove = (e) => { const r = cv.getBoundingClientRect(), i = Math.round((e.clientX - r.left - L) / (W - L - R) * (n - 1)); if (i < 0 || i >= n) { tip.hidden = true; return; } tip.hidden = false; tip.style.left = Math.min(X(i) + 12, W - 190) + "px"; tip.style.top = "8px"; tip.innerHTML = `<b>${rows[i][0]}</b><div><i style="background:${s1}"></i>매수 후 보유 ${series.bh[i].toFixed(2)}배</div><div><i style="background:${s2}"></i>변동성 목표 ${series.vt[i].toFixed(2)}배 <span class="muted">비중 ${(series.wts[i] * 100).toFixed(0)}%</span></div>`; draw(); c.strokeStyle = ink; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(i), T); c.lineTo(X(i), H - B); c.stroke(); c.setLineDash([]); for (const [arr, col] of [[series.bh, s1], [series.vt, s2]]) { c.beginPath(); c.arc(X(i), Y(arr[i]), 4, 0, 7); c.fillStyle = col; c.fill(); c.strokeStyle = "#1a1d24"; c.lineWidth = 2; c.stroke(); } };
    chart.onpointerleave = () => { tip.hidden = true; draw(); };
  }
  for (const inp of host.querySelectorAll("input[type=range]")) inp.oninput = () => { $("[data-o=tv]", host).textContent = $("[data-tv]", host).value + "%"; $("[data-o=lb]", host).textContent = $("[data-lb]", host).value + "주"; if (rows) { compute(); draw(); } };
  return { draw };
}

/* ---------- 터미널 ---------- */
function renderTerminal(w) {
  const body = $(".body", w.el);
  const t = el('<div class="term"></div>'); body.appendChild(t);
  const line = el('<div><span class="p">jihong@portfolio</span> <span class="d">~</span> % <input autocomplete="off" spellcheck="false"></div>');
  const out = (h) => { const d = document.createElement("div"); d.innerHTML = h; t.insertBefore(d, line); t.scrollTop = t.scrollHeight; };
  t.appendChild(line);
  const inp = $("input", line); t.onclick = () => inp.focus();
  const CMDS = {
    help: () => out(`<span class="g">${esc(TERMINAL_HELP)}</span>`),
    ls: () => out(DESK_ITEMS.map(i => `<span class="d">${esc(i.label)}</span>`).join("   ")),
    about: () => out(esc(`${PERSON.name} · ${PERSON.school} · ${PERSON.grad}\n${PERSON.tag}`)),
    papers: () => out(PAPERS.map(p => `<span class="y">${p.n}</span>  ${esc(p.kr)}`).join("\n")),
    projects: () => out(PROJECTS.map(p => `<span class="y">${esc(p.id.padEnd(7))}</span> ${esc(p.name)}  <span class="g">${esc(p.sub)}</span>`).join("\n")),
    contact: () => out(`mail    <a href="mailto:${PERSON.email}">${PERSON.email}</a>\ngithub  <a href="${PERSON.github}" target="_blank" rel="noopener">${PERSON.github}</a>\nssrn    <a href="${PERSON.ssrn}" target="_blank" rel="noopener">${PERSON.ssrn}</a>`),
    open: (a) => { const p = PROJECTS.find(x => x.id === a); if (p) return launch(p); if (APPS[a]) return open(a); out(`<span class="y">open: ${esc(a || "")}: 없는 이름. help 참고</span>`); },
    neofetch: () => out(`<span class="d">     ██╗██████╗ </span>  <span class="y">${esc(PERSON.name)}</span>@portfolio
<span class="d">     ██║██╔══██╗</span>  ----------------
<span class="d">     ██║██████╔╝</span>  <span class="y">학교</span>    ${esc(PERSON.school)}
<span class="d">██   ██║██╔═══╝ </span>  <span class="y">졸업</span>    ${esc(PERSON.grad)}
<span class="d">╚█████╔╝██║     </span>  <span class="y">논문</span>    6편 (SSRN)
<span class="d"> ╚════╝ ╚═╝     </span>  <span class="y">웹앱</span>    HongERP · 헤지 관측소 · 퀀트 랩
                  <span class="y">데스크</span>  페이퍼 모드
                  <span class="y">도구</span>    ${PERSON.tools.map(esc).join(" · ")}`),
    clear: () => { for (const c of [...t.children]) if (c !== line) c.remove(); },
  };
  inp.onkeydown = (e) => {
    if (e.key !== "Enter") return;
    const raw = inp.value.trim(); inp.value = "";
    out(`<span class="p">jihong@portfolio</span> <span class="d">~</span> % ${esc(raw)}`);
    if (!raw) return;
    const [c, ...a] = raw.split(/\s+/);
    (CMDS[c] || (() => out(`<span class="y">zsh: command not found: ${esc(c)}</span>  <span class="g">(help)</span>`)))(a.join(" "));
  };
  out(`<span class="g">Last login: ${new Date().toDateString()} on ttys000</span>`);
  CMDS.neofetch(); out(`<span class="g">help 를 치면 명령 목록이 나옵니다.</span>`);
  setTimeout(() => inp.focus(), 100);
}

/* ---------- 메모 ---------- */
function renderNotes(w, idx = 0) {
  const body = $(".body", w.el); body.classList.add("notes");
  body.innerHTML = `<div class="side">${NOTES.map((n, i) => `<button data-i="${i}"><span>${esc(n.t)}<small>${esc(n.d)}</small></span></button>`).join("")}</div><div class="pane"></div>`;
  const pane = $(".pane", body);
  const show = (i) => {
    for (const b of body.querySelectorAll(".side button")) b.classList.toggle("on", +b.dataset.i === i);
    pane.innerHTML = NOTES[i].b;
    const tools = $("[data-tools]", pane); if (tools) tools.innerHTML = PERSON.tools.map(t => `<span class="chip">${esc(t)}</span>`).join("");
    $(".title", w.el).textContent = NOTES[i].t + " — 메모";
  };
  for (const b of body.querySelectorAll(".side button")) b.onclick = () => show(+b.dataset.i);
  w.onArg = show; show(idx);
}

/* ---------- 연락 ---------- */
function renderMail(w) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="pane mail"><h1>연락</h1><p class="muted">인턴, 리서치, 공동연구 제안은 메일로 주시면 됩니다.</p>
    <div class="row"><b>메일</b><a href="mailto:${PERSON.email}">${PERSON.email}</a></div>
    <div class="row"><b>GitHub</b><a href="${PERSON.github}" target="_blank" rel="noopener">${PERSON.github.replace("https://", "")}</a></div>
    <div class="row"><b>SSRN</b><a href="${PERSON.ssrn}" target="_blank" rel="noopener">${PERSON.ssrn.replace("https://", "")}</a></div>
    <div class="row"><b>LinkedIn</b><a href="${PERSON.linkedin}" target="_blank" rel="noopener">${PERSON.linkedin.replace("https://", "")}</a></div>
    <div class="btns"><a class="btn pri" href="mailto:${PERSON.email}?subject=${encodeURIComponent("[포트폴리오] 문의")}">메일 쓰기</a><a class="btn" href="cv/jihong-park-cv-ko.pdf" target="_blank" rel="noopener">이력서 PDF</a><a class="btn" href="cv/jihong-park-cv-en.pdf" target="_blank" rel="noopener">CV (English)</a></div></div>`;
}

/* ---------- 이 사람에 관하여 ---------- */
function renderAbout(w) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="pane"><div class="amac"><img class="pic" src="img/profile.jpg" alt="박지홍" width="150" height="150"><div>
    <h1 style="margin-bottom:0">${esc(PERSON.name)}</h1><p class="muted">${esc(PERSON.tag)}</p>
    <table>
      <tr><td>학교</td><td>${esc(PERSON.school)} · ${esc(PERSON.grad)}</td></tr>
      <tr><td>만든 것</td><td>논문 6편 · 웹앱 3개 · 트레이딩 데스크 1개</td></tr>
      <tr><td>도구</td><td>${PERSON.tools.map(esc).join(" · ")}</td></tr>
    </table>
    <div class="btns"><button class="btn" data-o="notes">자세히</button><button class="btn" data-o="mail">연락</button></div></div></div></div>`;
  for (const b of body.querySelectorAll("[data-o]")) b.onclick = () => open(b.dataset.o);
}

/* ---------- start ---------- */
const hash = location.hash.slice(1);
setTimeout(() => {
  const p = PROJECTS.find(x => x.id === hash);
  if (p) launch(p);
  else if (hash && APPS[hash]) open(hash);
  else { open("finder"); if (!isMobile()) setTimeout(() => { const a = open("about"); a.el.style.left = "auto"; a.el.style.right = "120px"; a.el.style.top = "60px"; }, 350); }
}, seen ? 250 : 1350);
window.addEventListener("resize", () => { for (const w of wins.values()) if (w.el.classList.contains("max")) { Object.assign(w.el.style, { width: innerWidth + "px", height: (innerHeight - 28 - 84) + "px" }); w.el.dispatchEvent(new Event("winresize")); } });
})();
