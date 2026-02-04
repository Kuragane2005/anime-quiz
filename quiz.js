const params = new URLSearchParams(location.search);
const mode = params.get("mode") || "naruto";
const diff = params.get("diff") || "easy";// ===== 5 Easy quizzes =====
const QUIZZES = {
  naruto: {
    title: "Naruto (Easy)",
    questions: [
      { q: "Хто головний герой Naruto?", a: ["Саске", "Наруто", "Какаші", "Ітачі"], c: 1 },
      { q: "Як звати суперника Наруто з команди 7?", a: ["Гаара", "Саске", "Недзі", "Кіба"], c: 1 },
      { q: "Хто сенсей команди 7?", a: ["Джирая", "Какаші", "Орочімару", "Цунаде"], c: 1 },
      { q: "Яка істота запечатана в Наруто?", a: ["Дев'ятихвостий лис", "Десятихвостий", "Дракон", "Вовк"], c: 0 },
      { q: "Як називається село Наруто?", a: ["Прихований Туман", "Прихований Пісок", "Прихований Лист", "Прихований Камінь"], c: 2 },
    ],
  },

  hunter: {
    title: "Hunter x Hunter (Easy)",
    questions: [
      { q: "Хто головний герой Hunter x Hunter?", a: ["Кілуа", "Гон", "Курапіка", "Леоріо"], c: 1 },
      { q: "Кілуа з якої родини?", a: ["Узумаки", "Золдік", "Учіха", "Хатаке"], c: 1 },
      { q: "Як називається енергія/система сил у HxH?", a: ["Рейацу", "Нен", "Чакра", "Кі"], c: 1 },
      { q: "Курапіка хоче помститися за клан…", a: ["Учіха", "Курата", "Курата (Scarlet Eyes)", "Золдік"], c: 2 },
      { q: "Леоріо мріє стати…", a: ["Хантером звірів", "Доктором", "Піратом", "Шаманом"], c: 1 },
    ],
  },

  bleach: {
    title: "Bleach (Easy)",
    questions: [
      { q: "Хто головний герой Bleach?", a: ["Ічіґо", "Айзен", "Ренджі", "Урю"], c: 0 },
      { q: "Рукія — це…", a: ["Ніндзя", "Шініґамі", "Пірат", "Маг"], c: 1 },
      { q: "Як називається меч шініґамі?", a: ["Кунай", "Занпакто", "Нодаті", "Клеймор"], c: 1 },
      { q: "Айзен — це…", a: ["Капітан", "Холлоу", "Учень", "Пірат"], c: 0 },
      { q: "Як називається світ шініґамі?", a: ["Soul Society", "Академія", "Марінфорд", "Коноха"], c: 0 },
    ],
  },

  sao: {
    title: "Sword Art Online (Easy)",
    questions: [
      { q: "Як звати головного героя SAO?", a: ["Кіріто", "Ерен", "Лайт", "Ічіґо"], c: 0 },
      { q: "Як звати головну героїню SAO?", a: ["Мікаса", "Асуна", "Міса", "Незуко"], c: 1 },
      { q: "SAO — це в першу чергу про…", a: ["Школу", "Гру VR", "Піратів", "Ніндзя"], c: 1 },
      { q: "У SAO гравці не можуть вийти, бо…", a: ["Немає інтернету", "Їх замкнули в грі", "Вони загубилися", "Забули пароль"], c: 1 },
      { q: "Зброя Кіріто відома тим, що він…", a: ["Лучник", "Дворукий мечник", "Два мечі (dual wield)", "Маг"], c: 2 },
    ],
  },

  mha: {
    title: "My Hero Academia (Easy)",
    questions: [
      { q: "Хто головний герой MHA?", a: ["Бакуґо", "Деку (Ізуку)", "Тодорокі", "Алл МайТ"], c: 1 },
      { q: "Як називаються здібності у MHA?", a: ["Причуди (Quirks)", "Нен", "Чакра", "Рейацу"], c: 0 },
      { q: "Хто символ миру в MHA?", a: ["Ендевор", "Алл МайТ", "Шіґаракі", "Стейн"], c: 1 },
      { q: "Бакуґо має причуду…", a: ["Лід", "Вибухи", "Тінь", "Телепорт"], c: 1 },
      { q: "Тодорокі відомий поєднанням…", a: ["Вогонь і лід", "Грім і вода", "Земля і вітер", "Світло і тінь"], c: 0 },
    ],
  },
};

// --- pick quiz from URL ---
const params = new URLSearchParams(location.search);
const mode = (params.get("mode") || "naruto").toLowerCase();
const quiz = QUIZZES[mode] || QUIZZES.naruto;
const questions = quiz.questions;

// ===== your quiz logic (same as before, but using questions above) =====
let current = 0;
let score = 0;
let streak = 0;
let earnedXP = 0;
let timeLeft = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const streakText = document.getElementById("streakText");
const xpText = document.getElementById("xpText");

// optional: show title somewhere if you add <div id="quizTitle"></div>
const quizTitleEl = document.getElementById("quizTitle");
if (quizTitleEl) quizTitleEl.textContent = quiz.title;

function updateProgressUI() {
  const total = questions.length;
  const currentNum = current + 1;

  if (progressText) progressText.textContent = `Питання ${currentNum}/${total}`;
  if (progressFill) progressFill.style.width = `${(currentNum / total) * 100}%`;
  if (streakText) streakText.textContent = `🔥 Серія: ${streak}`;
  if (xpText) xpText.textContent = `⚡ XP: ${earnedXP}`;
}

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;

  timerEl.textContent = `⏱ ${timeLeft}`;
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  questionEl.textContent = questions[current].q;

  questions[current].a.forEach((answer, index) => {
    const btn = document.createElement("div");
    btn.className = "answer";
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index);
    answersEl.appendChild(btn);
  });

  updateProgressUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱ ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableAnswers();
      nextBtn.classList.remove("hidden");
    }
  }, 1000);
}

function selectAnswer(index) {
  clearInterval(timerInterval);

  const correctIndex = questions[current].c;
  const allAnswers = document.querySelectorAll(".answer");

  allAnswers.forEach((el, i) => {
    el.classList.add("disabled");
    if (i === index) el.classList.add("selected");
  });

  if (index === correctIndex) {
    score++;
    streak++;
    earnedXP += 100 + Math.min(50, streak * 5);
  } else {
    streak = 0;
  }

  updateProgressUI();
  nextBtn.classList.remove("hidden");
}

function disableAnswers() {
  document.querySelectorAll(".answer").forEach(el => el.classList.add("disabled"));
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    // Save last results (for result.html later)
    localStorage.setItem("lastScore", score);
    localStorage.setItem("lastXP", earnedXP);
    localStorage.setItem("lastMode", mode);

    location.href = "result.html";
  }
};

loadQuestion();

