// Mood Tracker
const moodButtons = document.querySelectorAll('.mood-btn');
const moodResult = document.getElementById('mood-result');
let selectedMood = "";

moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    moodButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = btn.textContent;
    moodResult.textContent = `You feel: ${selectedMood}`;
  });
});

// Water Tracker
let waterCups = 0;
function addWater() {
  if (waterCups < 8) {
    waterCups++;
    updateWaterBar();
  }
}

function updateWaterBar() {
  const bar = document.getElementById('water-bar');
  bar.style.width = (waterCups / 8 * 100) + '%';
}

// Quotes
const quotes = [
  "Believe in yourself.",
  "You are enough.",
  "Small steps make big changes.",
  "Rest when you need it.",
  "You're doing great."
];

function generateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote').textContent = `"${quote}"`;
}

generateQuote(); // load one on start

// Journal Save
function saveJournal() {
  const text = document.getElementById('journal').value;
  localStorage.setItem('journalEntry', text);
  alert("Journal saved!");
}

// Recommendation Logic
function getRecommendation() {
  const userType = document.getElementById('user-type').value;
  const sleep = Number(document.getElementById('sleep-hours').value);
  const recommendation = document.getElementById('recommendation');

  if (!userType || !selectedMood || !sleep) {
    recommendation.textContent = "Please fill in mood, sleep, and user type first.";
    return;
  }

  let message = "";

  if (sleep < 5 || ["Sad", "Angry", "Tired"].includes(selectedMood)) {
    message += "⚠️ Your health indicators suggest rest today.\n";
  } else {
    message += "✅ You're doing okay today.\n";
  }

  switch (userType) {
    case "student":
      message += sleep < 6 ? "📚 Light revision only." : "📘 Study with focus today!";
      break;
    case "worker":
      message += sleep < 6 ? "🖥️ Take it slow at work." : "🚀 Great day to be productive!";
      break;
    case "home":
      message += sleep < 6 ? "🏠 Relax and recover." : "🌼 Try a creative activity!";
      break;
  }

  recommendation.textContent = message;
}
