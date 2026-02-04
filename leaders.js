const rankFromXP = (xp) => {
  if (xp >= 5000) return { name: "S+", badge: "👑" };
  if (xp >= 3000) return { name: "S",  badge: "🔥" };
  if (xp >= 2000) return { name: "A",  badge: "⚡" };
  if (xp >= 1200) return { name: "B",  badge: "🗡️" };
  if (xp >= 600)  return { name: "C",  badge: "⭐" };
  return { name: "D", badge: "🌱" };
};

// demo data (потім замінимо на real)
let players = [
  { nick: "Kuragane", xp: 2680, tests: 34, wins: 22 },
  { nick: "Senku",   xp: 5120, tests: 61, wins: 44 },
  { nick: "Gojo",    xp: 3920, tests: 49, wins: 33 },
  { nick: "Itachi",  xp: 1840, tests: 28, wins: 16 },
  { nick: "Levi",    xp: 2310, tests: 31, wins: 21 },
  { nick: "Saitama", xp: 980,  tests: 17, wins: 9  },
  { nick: "Luffy",   xp: 1450, tests: 23, wins: 12 },
  { nick: "Killua",  xp: 880,  tests: 14, wins: 8  },
  { nick: "Aizen",   xp: 2700, tests: 33, wins: 20 },
  { nick: "Naruto",  xp: 1580, tests: 25, wins: 14 },
];

const makeInitials = (nick) => {
  return (nick || "?").trim().slice(0,2).toUpperCase();
};

const sortPlayers = () => {
  const sort = document.getElementById("sort").value;
  players.sort((a,b) => (b[sort] - a[sort]) || (b.xp - a.xp));
};

const renderTop3 = () => {
  const top3 = document.getElementById("top3");
  top3.innerHTML = "";

  const best = players.slice(0,3);
  const places = ["🥇 1 місце", "🥈 2 місце", "🥉 3 місце"];

  best.forEach((p, i) => {
    const r = rankFromXP(p.xp);
    const el = document.createElement("div");
    el.className = "podium";
    el.innerHTML = `
      <div class="place">${places[i]}</div>
      <div class="avatar">${makeInitials(p.nick)}</div>
      <div class="nick">${p.nick}</div>
      <div class="meta">
        <div class="badge">${r.badge} ${r.name}</div>
        <div class="badge">XP: ${p.xp}</div>
      </div>
    `;
    top3.appendChild(el);
  });
};

const renderList = () => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  players.forEach((p, idx) => {
    const r = rankFromXP(p.xp);

    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div>${idx+1}</div>

      <div class="player">
        <div class="pfp">${makeInitials(p.nick)}</div>
        <div class="name">${p.nick}</div>
      </div>

      <div class="right rank">
        <span class="rbadge">${r.badge}</span>
        <span class="rname">${r.name}</span>
      </div>

      <div class="right">${p.xp}</div>
      <div class="right">${p.tests}</div>
      <div class="right">${p.wins}</div>
    `;
    list.appendChild(row);
  });
};

const rerender = () => {
  sortPlayers();
  renderTop3();
  renderList();
};

// period — поки просто фейк (пізніше справжня логіка)
document.getElementById("period").addEventListener("change", () => rerender());
document.getElementById("sort").addEventListener("change", () => rerender());

rerender();
