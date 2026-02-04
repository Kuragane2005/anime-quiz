// =====================
// QUIZ CONFIG
// =====================
const DIFF = {
  easy:      { time: 12, xpBase: 100, xpMult: 1.0 },
  medium:    { time: 10, xpBase: 120, xpMult: 1.2 },
  hard:      { time: 8,  xpBase: 150, xpMult: 1.5 },
  impossible:{ time: 6,  xpBase: 200, xpMult: 2.0 },
};

// 10 питань на кожне аніме (легкий рівень, але ми використовуємо для всіх складностей з різним таймером/XP)
const BANK = {
  naruto: [
    { q:"Хто головний герой Naruto?", a:["Саске","Наруто","Какаші","Ітачі"], c:1 },
    { q:"Як звати лиса всередині Наруто?", a:["Шукаку","Курама","Мататабі","Ісобу"], c:1 },
    { q:"Хто вчитель Наруто в команді 7?", a:["Какаші","Джирайя","Гай","Орочімару"], c:0 },
    { q:"Село Наруто — це…", a:["Суна","Кірі","Коноха","Кумо"], c:2 },
    { q:"Хто друг/суперник Наруто?", a:["Шикамару","Саске","Кіба","Неджі"], c:1 },
    { q:"Яка техніка Наруто найвідоміша?", a:["Чідорі","Расенган","Аматаерасу","Сусаноо"], c:1 },
    { q:"Клан Саске — це…", a:["Хьюга","Учіха","Акімічі","Нара"], c:1 },
    { q:"Хто такий Хокаге?", a:["Лідер села","Лідер Акацукі","Учитель","Медик"], c:0 },
    { q:"Яка стихія у Саске найчастіше?", a:["Вода","Земля","Блискавка","Вітер"], c:2 },
    { q:"Орочімару — це…", a:["Хокаге","Саннін","Дзінчурікі","Анбу"], c:1 },
  ],
  hxh: [
    { q:"Головний герой HxH?", a:["Кіллуа","Гон","Курапіка","Леоріо"], c:1 },
    { q:"Найкращий друг Гона?", a:["Хісока","Кіллуа","Чролло","Ілумі"], c:1 },
    { q:"Система сили в HxH називається…", a:["Чакра","Кі","Нен","Хакі"], c:2 },
    { q:"Курапіка полює на…", a:["Піратів","Павуків","Титанів","Демонів"], c:1 },
    { q:"Хісока — це…", a:["Мисливець","Клоун","Хокаге","Шінігамі"], c:1 },
    { q:"Клан Курапіки має очі…", a:["Сині","Червоні","Зелені","Фіолетові"], c:1 },
    { q:"Леоріо хоче стати…", a:["Лікарем","Королем","Магом","Ніндзя"], c:0 },
    { q:"Гон здає екзамен на…", a:["Мисливця","Шінігамі","Пірата","Героя"], c:0 },
    { q:"Чролло — лідер…", a:["Акацукі","Фантом Трупи","Готей 13","Віллеінів"], c:1 },
    { q:"Кіллуа родом з сім’ї…", a:["Учіха","Золдік","Хьюга","Ельдія"], c:1 },
  ],
  bleach: [
    { q:"Головний герой Bleach?", a:["Ічіго","Рукія","Айзен","Ренджі"], c:0 },
    { q:"Рукія — це…", a:["Ніндзя","Шінігамі","Пірат","Герой"], c:1 },
    { q:"Зброя шінігамі називається…", a:["Кунай","Занпакто","Катана Хокаге","Екскалібур"], c:1 },
    { q:"Айзен — це…", a:["Антагоніст","Хокаге","Дзінчурікі","Пірат"], c:0 },
    { q:"Суспільство душ — це…", a:["Сейрейтэй","Коноха","Маріінфорд","Айнкрад"], c:0 },
    { q:"Холлоу — це…", a:["Дух-монстр","Пірат","Титан","Маг"], c:0 },
    { q:"Ічіго отримав сили від…", a:["Рукії","Наруто","Гона","Кіріто"], c:0 },
    { q:"Готей 13 — це…", a:["Орден магів","Пірати","Загін шінігамі","Мисливці"], c:2 },
    { q:"Банкай — це…", a:["Рівень в Наруто","Форма Занпакто","Меч Кіріто","Техніка Нен"], c:1 },
    { q:"Ренджі — напарник…", a:["Ічіго","Саске","Гона","Еренa"], c:0 },
  ],
  sao: [
    { q:"Головний герой SAO?", a:["Кіріто","Асуна","Юджіо","Клейн"], c:0 },
    { q:"SAO — це…", a:["Гра VRMMO","Ніндзя-світ","Суспільство душ","Острів піратів"], c:0 },
    { q:"Ім’я Кіріто в грі?", a:["Казуто","Кіріто","Рукія","Гон"], c:1 },
    { q:"Асуна — це…", a:["Партнерка Кіріто","Холлоу","Хокаге","Титан"], c:0 },
    { q:"Перший світ SAO називався…", a:["Айнкрад","Коноха","Сейрейтэй","Йоркнью"], c:0 },
    { q:"Гільдія з Лісбет/Сілікою — це…", a:["Друзі Кіріто","Вороги Айзена","Павуки","Акацукі"], c:0 },
    { q:"Основна проблема SAO на старті?", a:["Не можна вийти з гри","Нема енергії","Пірати напали","Холлоу прийшли"], c:0 },
    { q:"“HP” в іграх означає…", a:["Здоров’я","Хакі","Холлоу Поінти","Хокаге Поінти"], c:0 },
    { q:"Кіріто відомий як…", a:["Чорний мечник","Шінігамі","Хокаге","Мисливець"], c:0 },
    { q:"Юі — це…", a:["AI-дитина","Занпакто","Титан","Нен-звір"], c:0 },
  ],
  mha: [
    { q:"Головний герой MHA?", a:["Бакуго","Деку","Тодорокі","All Might"], c:1 },
    { q:"Сила в MHA називається…", a:["Нен","Причуда","Чакра","Хакі"], c:1 },
    { q:"Справжнє ім’я Деку?", a:["Ізуку Мідорія","Кацкі Бакуго","Шото Тодорокі","Томура Шігаракі"], c:0 },
    { q:"All Might передав силу…", a:["Деку","Бакуго","Шото","Ічіго"], c:0 },
    { q:"Школа героїв — це…", a:["UA","Коноха","Готей","Айнкрад"], c:0 },
    { q:"Бакуго має причуду…", a:["Вибухи","Лід","Павутина","Грім"], c:0 },
    { q:"Тодорокі використовує…", a:["Вогонь і лід","Тільки воду","Тільки землю","Нен"], c:0 },
    { q:"Лиходій з руками на обличчі?", a:["Шігаракі","Айзен","Хісока","Кісаме"], c:0 },
    { q:"Герої в MHA носять…", a:["Костюми","Занпакто","Плащі Акацукі","Маски холлоу"], c:0 },
    { q:"One For All — це…", a:["Сила що накопичується","Занпакто","Нен-техніка","VR-гра"], c:0 },
  ],
};

// =====================
// ELEMENTS
// =====================
const screenSelect = document.getElementById("screenSelect");
const screenQuiz = document.getElementById("screenQuiz");
const startBtn = document.getElementById("startBtn");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const streakText = document.getElementById("streakText");
const xpText = document.getElementById("xpText");

const sClick = document.getElementById("sClick");
const sCorrect = document.getElementById("sCorrect");
const sWrong = document.getElementById("sWrong");
const containerEl = document.querySelector(".container");

// =====================
// STATE
// =====================
let selectedDiff = null;
let selectedAnime = null;

let questions = [];
let current = 0;
let score = 0;
let streak = 0;
let earnedXP = 0;

let timeLeft = 10;
let timerInterval = null;

// =====================
// HELPERS
// =====================
function playSound(audioEl) {
  if (!audioEl) return;
  audioEl.currentTime = 0;
  audioEl.play().catch(() => {});
}
function vibrate(ms = 40) {
  if (navigator.vibrate) navigator.vibrate(ms);
}
function shake() {
  if (!containerEl) return;
  containerEl.classList.remove("shake");
  void containerEl.offsetWidth;
  containerEl.classList.add("shake");
}

function updateProgressUI(){
  const total = questions.length || 1;
  const currentNum = Math.min(current + 1, total);

  if (progressText) progressText.textContent = `Питання ${currentNum}/${total}`;
  if (progressFill) progressFill.style.width = `${(currentNum / total) * 100}%`;

  if (streakText) streakText.textContent = `🔥 Серія: ${streak}`;
  if (xpText) xpText.textContent = `⚡ XP: ${earnedXP}`;
}

function setStartEnabled(){
  startBtn.disabled = !(selectedDiff && selectedAnime);
  startBtn.style.opacity = startBtn.disabled ? "0.6" : "1";
}

// =====================
// SELECT SCREEN LOGIC
// =====================
document.querySelectorAll("[data-diff]").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedDiff = btn.dataset.diff;
    document.querySelectorAll("[data-diff]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    setStartEnabled();
  });
});

document.querySelectorAll("[data-anime]").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedAnime = btn.dataset.anime;
    document.querySelectorAll("[data-anime]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    setStartEnabled();
  });
});

startBtn.addEventListener("click", () => {
  startGame();
});

// =====================
// GAME
// =====================
function startGame(){
  // reset
  current = 0;
  score = 0;
  streak = 0;
  earnedXP = 0;

  const cfg = DIFF[selectedDiff] || DIFF.easy;
  questions = (BANK[selectedAnime] || BANK.naruto).slice(); // копія

  screenSelect.classList.add("hidden");
  screenQuiz.classList.remove("hidden");

  loadQuestion(cfg);
}

function loadQuestion(cfg){
  clearInterval(timerInterval);

  timeLeft = cfg.time;
  timerEl.innerText = `⏱ ${timeLeft}`;

  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  updateProgressUI();
  questionEl.innerText = questions[current].q;

  questions[current].a.forEach((answer, index) => {
    const btn = document.createElement("div");
    btn.className = "answer";
    btn.innerText = answer;
    btn.onclick = () => selectAnswer(index, cfg);
    answersEl.appendChild(btn);
  });

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱ ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableAnswers();
      nextBtn.classList.remove("hidden");
    }
  }, 1000);
}

function disableAnswers(){
  document.querySelectorAll(".answer").forEach(el => el.classList.add("disabled"));
}

function selectAnswer(index, cfg){
  clearInterval(timerInterval);
  playSound(sClick);

  const allAnswers = document.querySelectorAll(".answer");
  const correctIndex = questions[current].c;

  allAnswers.forEach((el, i) => {
    el.classList.add("disabled");
    if (i === index) el.classList.add("selected");
  });

  const isCorrect = index === correctIndex;

  if (isCorrect){
    score++;
    streak++;
    const bonus = Math.min(60, streak * 6);
    const gained = Math.round((cfg.xpBase + bonus) * cfg.xpMult);
    earnedXP += gained;

    playSound(sCorrect);
    vibrate(60);
  } else {
    streak = 0;
    playSound(sWrong);
    vibrate(120);
    shake();
  }

  updateProgressUI();
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  current++;
  const cfg = DIFF[selectedDiff] || DIFF.easy;

  if (current < questions.length){
    loadQuestion(cfg);
  } else {
    // збереження
    localStorage.setItem("lastScore", String(score));
    localStorage.setItem("lastXP", String(earnedXP));

    const totalXP = Number(localStorage.getItem("totalXP") || 0);
    localStorage.setItem("totalXP", String(totalXP + earnedXP));

    const bestScore = Number(localStorage.getItem("bestScore") || 0);
    if (score > bestScore) localStorage.setItem("bestScore", String(score));

    // назад на головну (можеш змінити на result.html, якщо зробиш)
    location.href = "./index.html";
  }
});

// стартова кнопка неактивна поки не обрано все
setStartEnabled();
