/* macOS 스타일 데스크톱: 창 관리자·독·메뉴바·스팟라이트·앱 */
(() => {
const $ = (s, r=document) => r.querySelector(s);
const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
const isMobile = () => matchMedia("(max-width:720px)").matches;
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- theme ---------- */
const root = document.documentElement;
const sysDark = matchMedia("(prefers-color-scheme: dark)");
let theme = null;
try { theme = localStorage.getItem("theme"); } catch {}
function applyTheme() {
  const dark = theme ? theme === "dark" : sysDark.matches;
  root.dataset.theme = dark ? "dark" : "light";
  $("#theme-ic").innerHTML = dark
    ? '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg>'
    : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
}
sysDark.addEventListener("change", applyTheme);
$("#theme-btn").onclick = () => { theme = root.dataset.theme === "dark" ? "light" : "dark"; try { localStorage.setItem("theme", theme); } catch {} applyTheme(); };
applyTheme();

/* ---------- clock ---------- */
const clock = $("#clock");
const fmtD = new Intl.DateTimeFormat("ko-KR", { month: "short", day: "numeric", weekday: "short" });
const fmtT = new Intl.DateTimeFormat("ko-KR", { hour: "numeric", minute: "2-digit" });
const tick = () => { const d = new Date(); clock.textContent = (isMobile() ? "" : fmtD.format(d) + "  ") + fmtT.format(d); };
tick(); setInterval(tick, 15000);

/* ---------- boot ---------- */
const boot = $("#boot");
const endBoot = () => boot.classList.add("off");
setTimeout(endBoot, 1500);
boot.addEventListener("click", endBoot);

/* ---------- apps registry ---------- */
const APPS = {
  finder:   { title: "Finder",  icon: ICONS.finder,   w: 820, h: 520, render: renderFinder },
  notes:    { title: "메모",     icon: ICONS.notes,    w: 760, h: 520, render: renderNotes },
  papers:   { title: "논문",     icon: ICONS.papers,   w: 780, h: 560, render: renderPapers },
  safari:   { title: "Safari",  icon: ICONS.safari,   w: 1040, h: 680, render: renderSafari },
  terminal: { title: "터미널",   icon: ICONS.terminal, w: 700, h: 440, render: renderTerminal },
  mail:     { title: "연락",     icon: ICONS.mail,     w: 560, h: 380, render: renderMail },
  about:    { title: "이 사람에 관하여", icon: ICONS.settings, w: 620, h: 420, render: renderAbout },
};
for (const p of PROJECTS) APPS["p:" + p.id] = { title: p.name, icon: ICONS[p.icon], w: 760, h: 600, render: (w) => renderProject(w, p), dock: false };

/* ---------- window manager ---------- */
const wins = new Map();   // id -> {id, appId, el, min}
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
  if (existing) {
    if (existing.min) restore(existing);
    focusWin(existing);
    if (arg && existing.onArg) existing.onArg(arg);
    return existing;
  }
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
  desktop.appendChild(w.el);
  wins.set(id, w);
  app.render(w, arg);
  const tb = $(".tb", w.el);
  $(".c", tb).onclick = (e) => { e.stopPropagation(); close(w); };
  $(".m", tb).onclick = (e) => { e.stopPropagation(); minimize(w); };
  $(".z", tb).onclick = (e) => { e.stopPropagation(); toggleMax(w); };
  tb.ondblclick = (e) => { if (!e.target.closest(".tl")) toggleMax(w); };
  w.el.addEventListener("pointerdown", () => focusWin(w), true);
  drag(w, tb); resize(w);
  focusWin(w);
  bounceDock(appId);
  return w;
}
function close(w) {
  w.el.classList.add("closing");
  w.el.addEventListener("animationend", () => { w.el.remove(); wins.delete(w.id); const top = topWin(); if (top) focusWin(top); else { $("#menubar .app").textContent = "Finder"; updateDock(); } }, { once: true });
}
function minimize(w) {
  w.el.classList.add("minimizing"); w.min = true;
  w.el.addEventListener("animationend", () => { w.el.style.display = "none"; w.el.classList.remove("minimizing"); const top = topWin(); if (top) focusWin(top); updateDock(); }, { once: true });
}
function restore(w) { w.min = false; w.el.style.display = ""; }
function topWin() { return [...wins.values()].filter(o => !o.min).sort((a, b) => (+b.el.style.zIndex) - (+a.el.style.zIndex))[0]; }
function toggleMax(w) {
  if (isMobile()) return;
  const e = w.el;
  if (e.classList.toggle("max")) {
    w.saved = { left: e.style.left, top: e.style.top, width: e.style.width, height: e.style.height };
    Object.assign(e.style, { left: "0px", top: "28px", width: innerWidth + "px", height: (innerHeight - 28 - 84) + "px" });
  } else Object.assign(e.style, w.saved);
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
    const mv = (ev) => { w.el.style.width = Math.max(360, ev.clientX + sw) + "px"; w.el.style.height = Math.max(220, ev.clientY + sh) + "px"; };
    const up = () => { h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); };
    h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
  });
}
function closeAll() { for (const w of [...wins.values()]) close(w); }

/* ---------- dock ---------- */
const dock = $("#dock");
const DOCK = ["finder", "notes", "papers", "safari", "terminal", "mail", "about"];
for (const id of DOCK) {
  const d = el(`<div class="dk" data-app="${id}">${APPS[id].icon}<span class="tip">${esc(APPS[id].title)}</span></div>`);
  d.onclick = () => open(id);
  dock.appendChild(d);
}
dock.appendChild(el('<div class="sep"></div>'));
for (const p of PROJECTS.filter(p => p.live)) {
  const d = el(`<div class="dk" data-app="p:${p.id}">${ICONS[p.icon]}<span class="tip">${esc(p.name)}</span></div>`);
  d.onclick = () => open("p:" + p.id);
  dock.appendChild(d);
}
dock.appendChild(el('<div class="sep"></div>'));
const trash = el(`<div class="dk" data-app="trash">${ICONS.trash}<span class="tip">휴지통 (열린 창 모두 닫기)</span></div>`);
trash.onclick = closeAll; dock.appendChild(trash);
function updateDock() { for (const d of dock.querySelectorAll(".dk")) d.classList.toggle("run", [...wins.values()].some(o => o.appId === d.dataset.app)); }
function bounceDock(appId) { const d = dock.querySelector(`[data-app="${appId}"]`); if (d) { d.classList.remove("bounce"); void d.offsetWidth; d.classList.add("bounce"); } }
// 확대 효과
dock.addEventListener("pointermove", (e) => {
  if (isMobile() || e.pointerType === "touch") return;
  for (const d of dock.querySelectorAll(".dk")) {
    const r = d.getBoundingClientRect(), dist = Math.abs(e.clientX - (r.left + r.width / 2));
    const s = Math.max(1, 1.55 - dist / 110);
    d.style.transform = `scale(${s.toFixed(3)})`; d.style.margin = `0 ${((s - 1) * 14).toFixed(1)}px`;
  }
});
dock.addEventListener("pointerleave", () => { for (const d of dock.querySelectorAll(".dk")) { d.style.transform = ""; d.style.margin = ""; } });

/* ---------- desktop icons ---------- */
const iconsBox = $("#icons");
const DESK_ITEMS = [
  ...PROJECTS.map(p => ({ label: p.name, icon: ICONS[p.icon], app: "p:" + p.id })),
  { label: "자기소개.txt", icon: ICONS.doc("TXT"), app: "notes" },
  { label: "논문 6편", icon: ICONS.folder("#3b82f6", "#1d4ed8"), app: "papers" },
  { label: "GitHub", icon: ICONS.github, href: PERSON.github },
];
for (const it of DESK_ITEMS) {
  const d = el(`<div class="dicon" tabindex="0"><div class="ic">${it.icon}</div><span>${esc(it.label)}</span></div>`);
  const act = () => it.href ? window.open(it.href, "_blank", "noopener") : open(it.app);
  d.onclick = () => { for (const o of iconsBox.children) o.classList.remove("sel"); d.classList.add("sel"); if (isMobile()) act(); };
  d.ondblclick = act;
  d.onkeydown = (e) => { if (e.key === "Enter") act(); };
  iconsBox.appendChild(d);
}
desktop.addEventListener("pointerdown", (e) => { if (e.target === desktop) { for (const o of iconsBox.children) o.classList.remove("sel"); } });

/* ---------- menubar menus ---------- */
const MENUS = {
  logo: [["이 사람에 관하여", () => open("about")], null, ["모든 창 닫기", closeAll, "⌘⇧W"], ["다크 모드 전환", () => $("#theme-btn").click()]],
  file: [["새 Finder 창", () => open("finder"), "⌘N"], ["메모 열기", () => open("notes")], null, ["창 닫기", () => { const t = topWin(); if (t) close(t); }, "⌘W"]],
  go: [...PROJECTS.map(p => [p.name, () => open("p:" + p.id)]), null, ["논문", () => open("papers")], ["터미널", () => open("terminal")], ["연락", () => open("mail")]],
  help: [["단축키: ⌘K 검색 · ⌘W 닫기 · 아이콘 두 번 클릭", () => open("terminal")], ["GitHub 프로필", () => window.open(PERSON.github, "_blank", "noopener")], ["SSRN 저자 페이지", () => window.open(PERSON.ssrn, "_blank", "noopener")]],
};
let openMenu = null;
for (const item of document.querySelectorAll("#menubar .item[data-menu]")) {
  const m = el('<div class="menu"></div>');
  for (const row of MENUS[item.dataset.menu]) {
    if (!row) { m.appendChild(el("<hr>")); continue; }
    const b = el(`<button><span>${esc(row[0])}</span>${row[2] ? `<span class="k">${row[2]}</span>` : ""}</button>`);
    b.onclick = (e) => { e.stopPropagation(); hideMenus(); row[1](); };
    m.appendChild(b);
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
  ...Object.entries(APPS).filter(([id, a]) => !id.startsWith("p:")).map(([id, a]) => ({ t: a.title, s: "앱", icon: a.icon, run: () => open(id) })),
  ...PROJECTS.map(p => ({ t: p.name + " · " + p.en, s: p.kind, icon: ICONS[p.icon], run: () => open("p:" + p.id) })),
  ...PAPERS.map(p => ({ t: p.kr, s: "논문 " + p.n, icon: ICONS.doc("PDF"), run: () => open("papers", p.n) })),
  ...NOTES.map((n, i) => ({ t: n.t, s: "메모", icon: ICONS.notes, run: () => open("notes", i) })),
];
let spotSel = 0;
function showSpot() { spot.classList.add("show"); spotIn.value = ""; renderSpot(); spotIn.focus(); }
function hideSpot() { spot.classList.remove("show"); }
function renderSpot() {
  const q = spotIn.value.trim().toLowerCase();
  const hits = (q ? INDEX.filter(i => (i.t + i.s).toLowerCase().includes(q)) : INDEX).slice(0, 9);
  spotSel = Math.min(spotSel, Math.max(0, hits.length - 1));
  spotList.innerHTML = "";
  hits.forEach((h, i) => {
    const li = el(`<li class="${i === spotSel ? "on" : ""}">${h.icon}<span>${esc(h.t)}</span><small>${esc(h.s)}</small></li>`);
    li.onclick = () => { hideSpot(); h.run(); };
    li.onmouseenter = () => { spotSel = i; renderSpot(); };
    spotList.appendChild(li);
  });
  spotList._hits = hits;
}
spotIn.oninput = () => { spotSel = 0; renderSpot(); };
spotIn.onkeydown = (e) => {
  const hits = spotList._hits || [];
  if (e.key === "ArrowDown") { spotSel = (spotSel + 1) % hits.length; renderSpot(); e.preventDefault(); }
  else if (e.key === "ArrowUp") { spotSel = (spotSel - 1 + hits.length) % hits.length; renderSpot(); e.preventDefault(); }
  else if (e.key === "Enter" && hits[spotSel]) { hideSpot(); hits[spotSel].run(); }
  else if (e.key === "Escape") hideSpot();
};
spot.onclick = (e) => { if (e.target === spot) hideSpot(); };
$("#spot-btn").onclick = (e) => { e.stopPropagation(); showSpot(); };
document.addEventListener("keydown", (e) => {
  const meta = e.metaKey || e.ctrlKey;
  if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); spot.classList.contains("show") ? hideSpot() : showSpot(); }
  else if (meta && e.key.toLowerCase() === "w") { e.preventDefault(); if (e.shiftKey) closeAll(); else { const t = topWin(); if (t) close(t); } }
  else if (meta && e.key.toLowerCase() === "n") { e.preventDefault(); open("finder"); }
  else if (e.key === "Escape") { hideSpot(); hideMenus(); }
});

/* ---------- apps ---------- */
function renderFinder(w) {
  const body = $(".body", w.el);
  const groups = {
    "포트폴리오": PROJECTS.map(p => ({ label: p.name, icon: ICONS[p.icon], run: () => open("p:" + p.id) })),
    "논문": PAPERS.map(p => ({ label: `${p.n}_${p.kr}.pdf`, icon: ICONS.pdf, run: () => open("papers", p.n) })),
    "라이브 데모": PROJECTS.filter(p => p.live).map(p => ({ label: p.name, icon: ICONS.safari, run: () => open("safari", p.id) })),
    "자기소개": NOTES.map((n, i) => ({ label: n.t + ".txt", icon: ICONS.doc("TXT"), run: () => open("notes", i) })),
    "연락": [{ label: "메일", icon: ICONS.mail, run: () => open("mail") }, { label: "GitHub", icon: ICONS.github, run: () => window.open(PERSON.github, "_blank", "noopener") }],
  };
  body.innerHTML = `<div class="side"><h6>즐겨찾기</h6>${Object.keys(groups).map((g, i) => `<button class="${i ? "" : "on"}" data-g="${esc(g)}"><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${esc(g)}</button>`).join("")}</div>
    <div style="flex:1;display:flex;flex-direction:column;min-width:0"><div class="pane fgrid"></div><div class="fpath"></div></div>`;
  const grid = $(".fgrid", body), path = $(".fpath", body);
  const show = (g) => {
    for (const b of body.querySelectorAll(".side button")) b.classList.toggle("on", b.dataset.g === g);
    grid.innerHTML = "";
    for (const it of groups[g]) {
      const d = el(`<div class="fitem">${it.icon}<span>${esc(it.label)}</span></div>`);
      d.onclick = () => { for (const o of grid.children) o.classList.remove("sel"); d.classList.add("sel"); if (isMobile()) it.run(); };
      d.ondblclick = it.run; grid.appendChild(d);
    }
    path.innerHTML = `<span>${ICONS.finder.replace("<svg", '<svg style="width:14px;height:14px;vertical-align:-2px"')}</span> 박지홍 › ${esc(g)} <span style="margin-left:auto">${groups[g].length}개 항목</span>`;
  };
  for (const b of body.querySelectorAll(".side button")) b.onclick = () => show(b.dataset.g);
  show("포트폴리오");
}

function renderProject(w, p) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="pane">
    <div class="hd"><div class="ic">${ICONS[p.icon]}</div><div><h1>${esc(p.name)}</h1><div class="sub">${esc(p.en)} · ${esc(p.kind)}</div></div></div>
    <p>${esc(p.one)}</p>
    <div class="stats">${p.stats.map(s => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div>
    <h2>왜 만들었나</h2><p>${esc(p.why)}</p>
    <h2>어디를 보라</h2><ul>${p.look.map(l => `<li>${esc(l)}</li>`).join("")}</ul>
    <h2>스택</h2><div class="chips">${p.stack.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
    ${p.note ? `<div class="note">${esc(p.note)}</div>` : ""}
    <div class="btns">${p.live ? `<button class="btn pri" data-live>Safari로 열기</button>` : ""}${p.links.map(l => `<a class="btn" href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])}</a>`).join("")}</div>
  </div>`;
  const b = $("[data-live]", body); if (b) b.onclick = () => open("safari", p.id);
}

function renderPapers(w, focusN) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="pane"><h1>헤지 논문 6편</h1><p class="muted">한 포지션(한국 정유수입사의 WTI × 원달러) 위에 예산·트레이딩·회계·공시 네 층. 각 논문은 자립적으로 읽힌다.</p>
    <div class="btns" style="margin-top:6px"><a class="btn pri" href="${PERSON.ssrn}" target="_blank" rel="noopener">SSRN 저자 페이지</a><a class="btn" href="https://github.com/JihongParker/wti-fx-hedge-program" target="_blank" rel="noopener">코드·TeX 저장소</a></div>
    <div class="plist">${PAPERS.map(p => `<div class="paper" id="paper-${p.n}"><div class="n">${p.n}</div><div><b>${esc(p.kr)}</b><i>${esc(p.en)}</i><p>${esc(p.p)}</p><div class="kv">${esc(p.kv)}</div></div></div>`).join("")}</div></div>`;
  w.onArg = (n) => { const t = $("#paper-" + n, body); if (t) { t.scrollIntoView({ behavior: "smooth", block: "center" }); t.style.outline = "2px solid var(--accent)"; setTimeout(() => t.style.outline = "", 1200); } };
  if (focusN) setTimeout(() => w.onArg(focusN), 250);
}

function renderSafari(w, pid) {
  const body = $(".body", w.el);
  const tabs = PROJECTS.filter(p => p.live);
  body.innerHTML = `<div class="sf">
    <div class="bar"><button class="nb" data-back title="뒤로"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="nb" data-reload title="새로고침"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg></button><div class="url"></div><a class="nb" data-ext target="_blank" rel="noopener" title="새 탭에서 열기"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a></div>
    <div class="tabs">${tabs.map(p => `<button data-t="${p.id}">${esc(p.name)}</button>`).join("")}</div>
    <iframe title="live" loading="lazy" referrerpolicy="no-referrer"></iframe></div>`;
  const fr = $("iframe", body), url = $(".url", body), ext = $("[data-ext]", body);
  const show = (id) => {
    const p = tabs.find(t => t.id === id) || tabs[0];
    for (const b of body.querySelectorAll(".tabs button")) b.classList.toggle("on", b.dataset.t === p.id);
    fr.src = p.live; url.textContent = p.live.replace("https://", ""); ext.href = p.live;
    $(".title", w.el).textContent = p.name + " — Safari";
  };
  for (const b of body.querySelectorAll(".tabs button")) b.onclick = () => show(b.dataset.t);
  $("[data-reload]", body).onclick = () => { fr.src = fr.src; };
  $("[data-back]", body).onclick = () => { try { fr.contentWindow.history.back(); } catch {} };
  w.onArg = show; show(pid);
}

function renderTerminal(w) {
  const body = $(".body", w.el);
  const t = el('<div class="term"></div>'); body.appendChild(t);
  const out = (h) => { const d = document.createElement("div"); d.innerHTML = h; t.insertBefore(d, line); t.scrollTop = t.scrollHeight; };
  const line = el('<div><span class="p">jihong@portfolio</span> <span class="d">~</span> % <input autocomplete="off" spellcheck="false"></div>');
  t.appendChild(line);
  const inp = $("input", line);
  t.onclick = () => inp.focus();
  const CMDS = {
    help: () => out(`<span class="g">${esc(TERMINAL_HELP)}</span>`),
    ls: () => out(DESK_ITEMS.map(i => `<span class="d">${esc(i.label)}</span>`).join("   ")),
    about: () => out(esc(`${PERSON.name} (${PERSON.en}) · ${PERSON.school} · ${PERSON.grad}\n${PERSON.tag}`)),
    papers: () => out(PAPERS.map(p => `<span class="y">${p.n}</span>  ${esc(p.kr)}\n     <span class="g">${esc(p.kv)}</span>`).join("\n")),
    projects: () => out(PROJECTS.map(p => `<span class="y">${esc(p.id.padEnd(7))}</span> ${esc(p.name)}  <span class="g">${esc(p.one)}</span>`).join("\n")),
    skills: () => out(PERSON.certs.map(c => `<span class="y">${esc(c[0])}</span>  <span class="g">${esc(c[1])}</span>`).join("\n") + "\n" + PERSON.tools.map(esc).join(" · ")),
    contact: () => out(`mail    <a href="mailto:${PERSON.email}">${PERSON.email}</a>\ngithub  <a href="${PERSON.github}" target="_blank" rel="noopener">${PERSON.github}</a>\nssrn    <a href="${PERSON.ssrn}" target="_blank" rel="noopener">${PERSON.ssrn}</a>`),
    open: (a) => { const map = { erp: "p:erp", papers: "papers", obs: "p:obs", quant: "p:quant", desk: "p:desk", safari: "safari", notes: "notes", mail: "mail", finder: "finder", about: "about" }; if (map[a]) open(map[a]); else out(`<span class="y">open: ${esc(a || "")}: 없는 이름. help 참고</span>`); },
    neofetch: () => out(`<span class="d">        ___
       /   \\      </span><span class="y">${esc(PERSON.name)}</span>@portfolio
<span class="d">      | o o |     </span>----------------
<span class="d">       \\_-_/      </span><span class="y">School</span>  ${esc(PERSON.school)}
<span class="d">      /|   |\\     </span><span class="y">Grad</span>    ${esc(PERSON.grad)}
<span class="d">       |___|      </span><span class="y">GPA</span>     ${esc(PERSON.gpa)}
                  <span class="y">Papers</span>  6 (SSRN)
                  <span class="y">Apps</span>    HongERP · Observatory · QuantLab
                  <span class="y">Certs</span>   ${PERSON.certs.map(c => esc(c[0])).join(", ")}
                  <span class="y">Shell</span>   Python · TypeScript · VBA · LaTeX`),
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
  CMDS.neofetch(); out(`<span class="g">help 를 입력하면 명령 목록이 나옵니다.</span>`);
  setTimeout(() => inp.focus(), 100);
}

function renderNotes(w, idx = 0) {
  const body = $(".body", w.el); body.classList.add("notes");
  body.innerHTML = `<div class="side">${NOTES.map((n, i) => `<button data-i="${i}"><span>${esc(n.t)}<small>${esc(n.d)}</small></span></button>`).join("")}</div><div class="pane"></div>`;
  const pane = $(".pane", body);
  const show = (i) => {
    for (const b of body.querySelectorAll(".side button")) b.classList.toggle("on", +b.dataset.i === i);
    pane.innerHTML = NOTES[i].b;
    const tbl = $(".tbl", pane); if (tbl) tbl.innerHTML = PERSON.certs.map(c => `<tr><td style="padding:4px 14px 4px 0;font-weight:600">${esc(c[0])}</td><td class="muted">${esc(c[1])}</td></tr>`).join("");
    const tools = $("[data-tools]", pane); if (tools) tools.innerHTML = PERSON.tools.map(t => `<span class="chip">${esc(t)}</span>`).join("");
    $(".title", w.el).textContent = NOTES[i].t + " — 메모";
  };
  for (const b of body.querySelectorAll(".side button")) b.onclick = () => show(+b.dataset.i);
  w.onArg = show; show(idx);
}

function renderMail(w) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="pane mail"><h1>연락</h1><p class="muted">인턴·리서치·공동연구 제안은 메일로 주십시오.</p>
    <div class="row"><b>메일</b><a href="mailto:${PERSON.email}">${PERSON.email}</a></div>
    <div class="row"><b>GitHub</b><a href="${PERSON.github}" target="_blank" rel="noopener">${PERSON.github.replace("https://", "")}</a></div>
    <div class="row"><b>SSRN</b><a href="${PERSON.ssrn}" target="_blank" rel="noopener">${PERSON.ssrn.replace("https://", "")}</a></div>
    ${PERSON.linkedin ? `<div class="row"><b>LinkedIn</b><a href="${PERSON.linkedin}" target="_blank" rel="noopener">${PERSON.linkedin.replace("https://", "")}</a></div>` : ""}
    <div class="btns"><a class="btn pri" href="mailto:${PERSON.email}?subject=${encodeURIComponent("[포트폴리오] 문의")}">메일 쓰기</a></div></div>`;
}

function renderAbout(w) {
  const body = $(".body", w.el);
  body.innerHTML = `<div class="pane"><div class="amac"><div class="pic">JP</div><div>
    <h1 style="margin-bottom:0">${esc(PERSON.name)}</h1><p class="muted">${esc(PERSON.tag)}</p>
    <table>
      <tr><td>학교</td><td>${esc(PERSON.school)} · ${esc(PERSON.grad)}</td></tr>
      <tr><td>학점</td><td>${esc(PERSON.gpa)}</td></tr>
      <tr><td>연산</td><td>Python · TypeScript · VBA · LaTeX</td></tr>
      <tr><td>저장</td><td>논문 6편 · 웹앱 3개 · 데스크 1개</td></tr>
      <tr><td>자격</td><td>${PERSON.certs.map(c => esc(c[0])).join("<br>")}</td></tr>
      <tr><td>경력</td><td>${PERSON.exp.map(e => `<span class="muted">${esc(e[0])}</span> ${esc(e[1])}`).join("<br>")}</td></tr>
    </table>
    <div class="btns"><button class="btn" data-o="notes">자세히</button><button class="btn" data-o="mail">연락</button></div></div></div></div>`;
  for (const b of body.querySelectorAll("[data-o]")) b.onclick = () => open(b.dataset.o);
}

/* ---------- start ---------- */
const hash = location.hash.slice(1);
setTimeout(() => {
  if (hash && APPS[hash]) open(hash);
  else if (hash && APPS["p:" + hash]) open("p:" + hash);
  else { open("finder"); if (!isMobile()) setTimeout(() => { const a = open("about"); a.el.style.left = "auto"; a.el.style.right = "120px"; a.el.style.top = "60px"; }, 350); }
}, 1350);
window.addEventListener("resize", () => { for (const w of wins.values()) if (w.el.classList.contains("max")) Object.assign(w.el.style, { width: innerWidth + "px", height: (innerHeight - 28 - 84) + "px" }); });
})();
