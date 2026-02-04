// ===== LocalStorage keys =====
const KEY_LEADERS = "animehub_leaders";
const KEY_ME = "animehub_me"; // { name: "Bogdan", xp: 120, best: 4 }

function loadLeaders() {
  try {
    return JSON.parse(localStorage.getItem(KEY_LEADERS)) || [];
  } catch {
    return [];
  }
}
function saveLeaders(list) {
  localStorage.setItem(KEY_LEADERS, JSON.stringify(list));
}

function loadMe() {
  try {
    return JSON.parse(localStorage.getItem(KEY_ME)) || null;
  } catch {
    return null;
  }
}

function setMeFallback() {
  // якщо нік не збережений — зробимо базовий
  if (!localStorage.getItem(KEY_ME)) {
    localStorage.setItem(KEY_ME, JSON.stringify({ name: "Player", xp: 0, best: 0 }));
  }
}

function render() {
  setMeFallback();

  const me = loadMe();
  const leaders = loadLeaders()
    .slice()
    .sort((a, b) => (b.xp - a.xp) || (b.best - a.best));

  // stats
  document.getElementById("countPlayers").textContent = leaders.length;
  document.getElementById("meName").textContent = me?.name || "—";
  document.getElementById("meXp").textContent = me?.xp ?? 0;

  const rows = document.getElementById("rows");
  rows.innerHTML = "";

  const top = leaders.slice(0, 10);
  if (top.length === 0) {
    rows.innerHTML = `
      <div class="row">
        <div>—</div>
        <div class="badge"><b>Поки пусто</b> <span class="pill">зроби перший результат</span></div>
        <div class="right">0</div>
        <div class="right">0</div>
      </div>
    `;
    return;
  }

  top.forEach((p, idx) => {
    const isMe = me && p.id && me.id && p.id === me.id;
    const row = document.createElement("div");
    row.className = "row" + (isMe ? " me" : "");

    row.innerHTML = `
      <div><b>${idx + 1}</b></div>
      <div class="badge">
        <b>${escapeHtml(p.name || "Player")}</b>
        ${isMe ? `<span class="pill">Ти</span>` : ``}
      </div>
      <div class="right">${p.xp ?? 0}</div>
      <div class="right">${p.best ?? 0}</div>
    `;
    rows.appendChild(row);
  });
}

// basic escape to avoid html injection
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[s]));
}

// demo fill
function fillDemo() {
  const demo = [
    { id:"u1", name:"Kuragane", xp: 520, best: 5 },
    { id:"u2", name:"SasukeFan", xp: 410, best: 4 },
    { id:"u3", name:"Zoro", xp: 380, best: 4 },
    { id:"u4", name:"Mikasa", xp: 330, best: 3 },
    { id:"u5", name:"Gojo", xp: 300, best: 3 },
    { id:"u6", name:"Luffy", xp: 260, best: 3 },
    { id:"u7", name:"Senku", xp: 240, best: 3 },
    { id:"u8", name:"Itachi", xp: 220, best: 2 },
    { id:"u9", name:"Kakashi", xp: 200, best: 2 },
    { id:"u10", name:"Zenitsu", xp: 180, best: 2 },
  ];
  saveLeaders(demo);

  // зробимо “твій профіль”
  const me = { id:"me", name:"Player", xp: 120, best: 2 };
  localStorage.setItem(KEY_ME, JSON.stringify(me));

  render();
}

function clearAll() {
  localStorage.removeItem(KEY_LEADERS);
  // me можна залишити, але краще теж скинути
  localStorage.removeItem(KEY_ME);
  render();
}

document.getElementById("demoBtn").addEventListener("click", fillDemo);
document.getElementById("clearBtn").addEventListener("click", clearAll);

render();
