// ===== Leaders (demo + localStorage) =====

// ---- helpers ----
const $ = (id) => document.getElementById(id);
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function rankFromXP(xp) {
  if (xp >= 5000) return { name: "S+", badge: "👑" };
  if (xp >= 3000) return { name: "S", badge: "🔥" };
  if (xp >= 2000) return { name: "A", badge: "⚡" };
  if (xp >= 1200) return { name: "B", badge: "🗡️" };
  if (xp >= 600) return { name: "C", badge: "⭐" };
  return { name: "D", badge: "🌱" };
}

function initials(nick) {
  return (nick || "??")
    .trim()
    .slice(0, 2)
    .toUpperCase();
}

function byXPDesc(a, b) {
  return (b.xp || 0) - (a.xp || 0);
}

// ---- storage keys ----
const KEY = "animeHub_leaderboard";

// ---- demo players ----
const DEMO_PLAYERS = [
  { nick: "Senku", xp: 5120, tests: 61, wins: 44 },
  { nick: "Gojo", xp: 3920, tests: 49, wins: 33 },
  { nick: "Aizen", xp: 2700, tests: 33, wins: 20 },
  { nick: "Kuragane", xp: 2680, tests: 34, wins: 22 },
  { nick: "Levi", xp: 2310, tests: 31, wins: 21 },
  { nick: "Itachi", xp: 1840, tests: 28, wins: 16 },
  { nick: "Naruto", xp: 1580, tests: 25, wins: 14 },
  { nick: "Luffy", xp: 1450, tests: 23, wins: 12 },
  { nick: "Saitama", xp: 980, tests: 17, wins: 9 },
  { nick: "Killua", xp: 880, tests: 14, wins: 8 },
];

// ---- load/save ----
function loadPlayers() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function savePlayers(players) {
  localStorage.setItem(KEY, JSON.stringify(players));
}

// ---- merge demo if empty ----
function ensureNotEmpty(players) {
  if (players.length > 0) return players;
  return [...DEMO_PLAYERS];
}

// ---- render top3 + list ----
function renderTop3(players) {
  const el = $("top3") || $("podium") || $("top");
  if (!el) return;

  const best = [...players].sort(byXPDesc).slice(0, 3);

  // if still empty
  while (best.length < 3) {
    best.push({ nick: "Немає гравця", xp: 0, tests: 0, wins: 0 });
  }

  const places = ["🥇 1 місце", "🥈 2 місце", "🥉 3 місце"];

  el.innerHTML = "";
  best.forEach((p, i) => {
    const r = rankFromXP(p.xp || 0);

    const card = document.createElement("div");
    card.className = "podium";
    card.innerHTML = `
      <div class="place">${places[i]}</div>
      <div class="avatar">${p.xp ? initials(p.nick) : "??"}</div>
      <div class="nick">${p.nick || "Немає гравця"}</div>
      <div class="meta">
        <span class="badge">${r.badge} <b>${r.name}</b></span>
        <span class="badge">XP: <b>${p.xp || 0}</b></span>
      </div>
    `;
    el.appendChild(card);
  });
}

function renderTable(players) {
  const rowsEl = $("rows") || $("list") || $("tbody");
  if (!rowsEl) return;

  const sorted = [...players].sort(byXPDesc);

  rowsEl.innerHTML = "";

  if (sorted.length === 0) {
    const empty = document.createElement("div");
    empty.className = "row";
    empty.innerHTML = `
      <div>—</div>
      <div class="player">
        <div class="pfp">🙂</div>
        <div class="pname">Поки порожньо</div>
      </div>
      <div class="rankchip right"><span class="rbadge">—</span></div>
      <div class="right">0</div>
      <div class="right">0</div>
      <div class="right">0</div>
    `;
    rowsEl.appendChild(empty);
    return;
  }

  sorted.forEach((p, idx) => {
    const r = rankFromXP(p.xp || 0);

    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div>${idx + 1}</div>

      <div class="player">
        <div class="pfp">${initials(p.nick)}</div>
        <div class="pname">${p.nick}</div>
      </div>

      <div class="rankchip right">
        <span class="rbadge">${r.badge} <b>${r.name}</b></span>
      </div>

      <div class="right">${p.xp ?? 0}</div>
      <div class="right">${p.tests ?? 0}</div>
      <div class="right">${p.wins ?? 0}</div>
    `;
    rowsEl.appendChild(row);
  });
}

function renderAll(players) {
  renderTop3(players);
  renderTable(players);
}

// ---- buttons ----
function wireButtons() {
  const fillBtn = $("fillDemo") || $("demoBtn") || document.querySelector("[data-fill-demo]");
  const clearBtn = $("clearAll") || $("clearBtn") || document.querySelector("[data-clear]");

  if (fillBtn) {
    fillBtn.addEventListener("click", () => {
      // add demo to whatever exists, then re-sort and save
      const current = loadPlayers();
      const merged = [...current];

      // avoid exact duplicates by nick
      DEMO_PLAYERS.forEach(dp => {
        if (!merged.some(p => (p.nick || "").toLowerCase() === dp.nick.toLowerCase())) {
          merged.push({ ...dp });
        }
      });

      savePlayers(merged);
      renderAll(ensureNotEmpty(merged));
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      // clear storage leaderboard
      localStorage.removeItem(KEY);

      // show demo anyway, so page isn't empty
      renderAll([...DEMO_PLAYERS]);
    });
  }
}

// ---- init ----
(function init() {
  const players = ensureNotEmpty(loadPlayers());
  renderAll(players);
  wireButtons();
})();
