(function () {
  // score ти вже зберігаєш: localStorage.setItem("score", score);
  const score = Number(localStorage.getItem("score") || 0);

  // Постав тут правильну кількість питань
  // Якщо в quiz.js у тебе questions.length — то краще зберігати total теж.
  // Поки зробимо дефолт 5, але якщо у тебе інше — зміни.
  const total = Number(localStorage.getItem("total") || 5);
  window.location.href = "result.html";
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const ranks = [
    { minPct: 0,  name: "Genin",      badge: "🌱", next: "Chunin" },
    { minPct: 40, name: "Chunin",     badge: "⚡", next: "Jonin" },
    { minPct: 70, name: "Jonin",      badge: "🔥", next: "Kage" },
    { minPct: 90, name: "Kage",       badge: "👑", next: "Legend" },
    { minPct: 100,name: "Legend",     badge: "🌌", next: null }
  ];

  // Визначаємо ранг
  let currentRank = ranks[0];
  for (let i = 0; i < ranks.length; i++) {
    if (pct >= ranks[i].minPct) currentRank = ranks[i];
  }

  // Визначаємо наступний ранг і прогрес всередині рівня
  const currentIndex = ranks.findIndex(r => r.name === currentRank.name);
  const nextRank = ranks[currentIndex + 1] || null;

  const levelStart = currentRank.minPct;
  const levelEnd = nextRank ? nextRank.minPct : 100;

  const within = levelEnd > levelStart
    ? Math.round(((pct - levelStart) / (levelEnd - levelStart)) * 100)
    : 100;

  // Вивід
  document.getElementById("scoreBig").innerText = score;
  document.getElementById("scoreSmall").innerText = `${score} / ${total}`;

  document.getElementById("rankName").innerText = currentRank.name;
  document.getElementById("rankBadge").innerText = currentRank.badge;

  document.getElementById("progressPct").innerText = `${within}%`;
  document.getElementById("progressFill").style.width = `${within}%`;

  const nextHint = document.getElementById("nextHint");
  if (!nextRank) {
    nextHint.innerText = "Максимальний ранг! Ти легенда 😈";
  } else {
    const need = Math.max(0, nextRank.minPct - pct);
    nextHint.innerText = `До рангу ${nextRank.name} залишилось ${need}%`;
  }
})();
