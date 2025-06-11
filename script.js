const countdownEl = document.getElementById("countdown");
const startButton = document.getElementById("start-button");
const mainContent = document.getElementById("main-content");
const introAnim = document.getElementById("intro-animation");
const passwordSection = document.getElementById("password-section");
const videoSection = document.getElementById("video-section");
const nextButton = document.getElementById("next-button");

const launchDate = new Date("June 12, 2025 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance <= 0) {
    countdownEl.innerHTML = "C'est le moment !";
    startButton.classList.remove("hidden");
    clearInterval(interval);
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    countdownEl.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

startButton.addEventListener("click", () => {
  mainContent.classList.remove("hidden");
  document.getElementById("password-section").classList.remove("hidden");
});

function checkCheckpoint() {
  const value = document.getElementById("checkpoint-password").value;
  if (value.toLowerCase() === "checkpoint") {
    alert("Accès test autorisé !");
    mainContent.classList.remove("hidden");
    document.getElementById("password-section").classList.remove("hidden");
  } else {
    alert("Mot de passe incorrect.");
  }
}

function checkMainPassword() {
  const value = document.getElementById("main-password").value;
  if (value.toLowerCase() === "tondeuse") {
    introAnim.innerHTML = "Le retour incontesté de Brad Bitt";
    introAnim.classList.remove("hidden");
    setTimeout(() => {
      videoSection.classList.remove("hidden");
      passwordSection.classList.add("hidden");
    }, 2000);
  } else {
    alert("Mot de passe incorrect.");
  }
}

// YouTube API setup
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-frame', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextButton.disabled = false;
    nextButton.innerText = "Suivant";
  }
}
