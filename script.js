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
let timeLeft = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const sClick = document.getElementById("sClick");
const sCorrect = document.getElementById("sCorrect");
const sWrong = document.getElementById("sWrong");
const containerEl = document.querySelector(".container");

function playSound(audioEl) {
  if (!audioEl) return;
  audioEl.currentTime = 0;
  audioEl.play().catch(() => {}); // на деяких браузерах може блокуватись
}

function vibrate(ms = 40) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

function shake() {
  if (!containerEl) return;
  containerEl.classList.remove("shake");
  // примусово перезапустити анімацію
  void containerEl.offsetWidth;
  containerEl.classList.add("shake");
}

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;

  timerEl.innerText = `⏱ ${timeLeft}`;
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  questionEl.innerText = questions[current].question;

  questions[current].answers.forEach((answer, index) => {
    const btn = document.createElement("div");
    btn.classList.add("answer");
    btn.innerText = answer;
    btn.onclick = () => selectAnswer(index);
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

function selectAnswer(index) {
  clearInterval(timerInterval);

  playSound(sClick);

  const allAnswers = document.querySelectorAll(".answer");
  const correctIndex = questions[current].correct;

  // блокуємо все і підсвічуємо вибір
  allAnswers.forEach((el, i) => {
    el.classList.add("disabled");
    if (i === index) el.classList.add("selected");
  });

  // перевірка
  const isCorrect = index === correctIndex;

  if (isCorrect) {
    score++;
    playSound(sCorrect);
    vibrate(60);
  } else {
    playSound(sWrong);
    vibrate(120);
    shake();
  }

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
    localStorage.setItem("score", score);
    location.href = "./index.html";
  }
};

loadQuestion();

