const questions = [
  {
    question: "Хто головний герой Naruto?",
    answers: ["Саске", "Наруто", "Какаші", "Ітачі"],
    correct: 1
  },
  {
    question: "З якого аніме Леві Акерман?",
    answers: ["Naruto", "Bleach", "Attack on Titan", "One Piece"],
    correct: 2
  },
  {
    question: "Хто автор зошита смерті?",
    answers: ["Лайт", "Рюк", "L", "Міса"],
    correct: 0
  },
  {
    question: "Сайтама — це?",
    answers: ["Ніндзя", "Пірат", "Герой", "Маг"],
    correct: 2
  },
  {
    question: "Tokyo Ghoul — це про?",
    answers: ["Магів", "Гулів", "Титанів", "Піратів"],
    correct: 1
  }
];

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

function updateProgressUI() {
  const total = questions.length;
  const currentNum = current + 1;

  progressText.textContent = `Питання ${currentNum}/${total}`;
  progressFill.style.width = `${(currentNum / total) * 100}%`;
  streakText.textContent = `🔥 Серія: ${streak}`;
  xpText.textContent = `⚡ XP: ${earnedXP}`;
}

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;

  timerEl.textContent = `⏱ ${timeLeft}`;
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  questionEl.textContent = questions[current].question;

  questions[current].answers.forEach((answer, index) => {
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

  const correctIndex = questions[current].correct;
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
  document.querySelectorAll(".answer").forEach(el => {
    el.classList.add("disabled");
  });
}

nextBtn.onclick = () => {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    // ✅ ЗБЕРІГАЄМО РЕЗУЛЬТАТИ ТІЛЬКИ В КІНЦІ
    localStorage.setItem("lastScore", score);
    localStorage.setItem("lastXP", earnedXP);

    const totalXP = Number(localStorage.getItem("totalXP") || 0);
    localStorage.setItem("totalXP", totalXP + earnedXP);

    const bestScore = Number(localStorage.getItem("bestScore") || 0);
    if (score > bestScore) localStorage.setItem("bestScore", score);

    location.href = "result.html";
  }
};

loadQuestion();
