/* ===== Leaders (demo/local) ===== */

const LS_KEY = "animehub_leaders_v1";

const rankFromXP = (xp) => {
  if (xp >= 5000) return { name: "S+", badge: "👑" };
  if (xp >= 3000) return { name: "S",  badge: "🔥" };
  if (xp >= 2000) return { name: "A",  badge: "⚡" };
  if (xp >= 1200) return { name: "B",  badge: "🗡️" };
  if (xp >= 600)  return { name: "C",  badge: "⭐" };
  return { name: "D", badge: "🐣" };
};

const makeInitials = (nick) => (nick || "??").trim().slice(0,2).toUpperCase();

const demoPlayers = [
  { nick: "Senku",    xp: 5120, tests: 61, wins: 44 },
  { nick: "Gojo",     xp: 3920, tests: 49, wins: 33 },
  { nick: "Aizen",    xp: 2700, tests: 33, wins: 20 },
  { nick: "Kuragane", xp: 2680, tests: 34, wins: 22 },
  { nick: "Levi",     xp: 2310, tests: 31, wins: 21 },
  { nick: "Itachi",   xp: 1840, tests: 28, wins: 16 },
  { nick: "Naruto",   xp: 1580, tests: 25, wins: 14 },
  { nick: "Luffy",    xp: 1450, tests: 23, wins: 12 },
  { nick: "Saitama",  xp: 980,  tests: 17, wins: 9  },
  { nick: "Killua",   xp: 880,  tests: 14, wins: 8  },
];

const els = {
  top3: document.getElementById("top3"),
  rows: document.getElementById("rows"),
  sort: document.getElementById("sort"),
  period: document.getElementById("period"),
  demoBtn: document.getElementById("demoBtn"),
  clearBtn: document.getElementById("clearBtn"),
};

function loadPlayers(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  }catch{
    return [];
  }
}

function savePlayers(players){
  localStorage.setItem(LS_KEY, JSON.stringify(players));
}

function sortPlayers(players){
  const sort = els.sort?.value || "xp";
  const arr = [...players];

  arr.sort((a,b) => {
    if(sort === "wins") return (b.wins||0) - (a.wins||0) || (b.xp||0)-(a.xp||0);
    if(sort === "tests") return (b.tests||0) - (a.tests||0) || (b.xp||0)-(a.xp||0);
    return (b.xp||0) - (a.xp||0) || (b.wins||0)-(a.wins||0);
  });

  return arr;
}

function renderTop3(players){
  els.top3.innerHTML = "";

  const top = players.slice(0,3);
  const labels = ["🥇 1 місце", "🥈 2 місце", "🥉 3 місце"];

  top.forEach((p, i) => {
    const r = rankFromXP(p.xp || 0);

    const el = document.createElement("div");
    el.className = "podium";
    el.innerHTML = `
      <div class="place">${labels[i]}</div>
      <div class="avatar">${makeInitials(p.nick)}</div>
      <div class="nick">${p.nick}</div>
      <div class="meta">
        <div class="badge">${r.badge} <b>${r.name}</b></div>
        <div class="badge">XP: <b>${p.xp || 0}</b></div>
      </div>
    `;
    els.top3.appendChild(el);
  });

  // якщо менше 3 — доб’ємо пустими карточками (щоб не ламалось)
  for(let i=top.length; i<3; i++){
    const el = document.createElement("div");
    el.className = "podium";
    el.innerHTML = `
      <div class="place">—</div>
      <div class="avatar" style="background: rgba(255,255,255,0.10); box-shadow:none;">??</div>
      <div class="nick" style="opacity:.6;">Немає гравця</div>
      <div class="meta">
        <div class="badge">—</div>
        <div class="badge">XP: <b>0</b></div>
      </div>
    `;
    els.top3.appendChild(el);
  }
}

function renderTable(players){
  els.rows.innerHTML = "";

  players.forEach((p, idx) => {
    const r = rankFromXP(p.xp || 0);

    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div>${idx+1}</div>

      <div class="player">
        <div class="pfp">${makeInitials(p.nick)}</div>
        <div class="pname">${p.nick}</div>
      </div>

      <div class="right rankchip">
        <span class="rbadge">${r.badge} <b>${r.name}</b></span>
      </div>

      <div class="right"><b>${p.xp || 0}</b></div>
      <div class="right">${p.tests || 0}</div>
      <div class="right">${p.wins || 0}</div>
    `;

    els.rows.appendChild(row);
  });

  if(players.length === 0){
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div>—</div>
      <div class="player"><div class="pfp">😶</div><div class="pname">Поки порожньо</div></div>
      <div class="right">—</div>
      <div class="right">0</div>
      <div class="right">0</div>
      <div class="right">0</div>
    `;
    els.rows.appendChild(row);
  }
}

function render(){
  const players = sortPlayers(loadPlayers());
  renderTop3(players);
  renderTable(players);
}

/* Actions */
els.demoBtn?.addEventListener("click", () => {
  savePlayers(demoPlayers);
  render();
});

els.clearBtn?.addEventListener("click", () => {
  savePlayers([]);
  render();
});

els.sort?.addEventListener("change", render);
els.period?.addEventListener("change", render); // поки демо, просто не ламає

render();
