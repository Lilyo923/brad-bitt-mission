// ========== 🎯 COMPTE À REBOURS ==========
const countdownEl = document.getElementById("countdown");
const startSection = document.getElementById("start-section");

const targetDate = new Date("June 12, 2025 10:00:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(timer);
    countdownEl.textContent = "";
    startSection.style.display = "block";
  } else {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// ========== 🔐 ACCÈS SECRET (bas de page) ==========
function checkSecretAccess() {
  const pwd = document.getElementById("secret-password").value;
  if (pwd.toLowerCase() === "checkpoint") {
    clearInterval(timer);
    document.getElementById("intro").style.display = "none";
    startSection.style.display = "block";
  }
}

// ========== 🔓 MOT DE PASSE PRINCIPAL ==========
function checkMainPassword() {
  const mainPwd = document.getElementById("main-password").value;
  if (mainPwd.toLowerCase() === "tondeuse") {
    document.getElementById("start-section").style.display = "none";
    document.getElementById("video-section").style.display = "block";
  }
}

// ========== ▶️ API YOUTUBE ==========
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: '2DMl0zoaPZ0', // ID de la vidéo Brad Bitt
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    const nextBtn = document.getElementById("next-button");
    nextBtn.disabled = false;
    nextBtn.classList.remove("disabled");
    document.getElementById("next-hint").textContent = "";
  }
}
