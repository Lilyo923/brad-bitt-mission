// Compte à rebours
const countdownElement = document.getElementById("countdown");
const countdownDate = new Date("2025-06-12T10:00:00").getTime();
const screenCountdown = document.getElementById("screen-countdown");
const screenIntro = document.getElementById("screen-intro");
const screenVideo = document.getElementById("screen-video");

const nextBtn = document.getElementById("nextBtn");
const videoIframe = document.getElementById("bradVideo");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    screenCountdown.classList.add("hidden");
    screenIntro.classList.remove("hidden");
  } else {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownElement.innerText = `${hours}h ${minutes}m ${seconds}s`;
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // initial

// Bypass par mot de passe
function bypassCountdown() {
  const input = document.getElementById("checkpointPassword").value;
  const errorText = document.getElementById("bypassError");

  if (input.toLowerCase() === "checkpoint") {
    screenCountdown.classList.add("hidden");
    screenIntro.classList.remove("hidden");
    errorText.classList.add("hidden");

    // Supprimer la zone mot de passe
    document.getElementById("passwordBypass").remove();
  } else {
    errorText.classList.remove("hidden");
  }
}

// Mot de passe intro
function validateIntroPassword() {
  const input = document.getElementById("introPassword").value;
  const error = document.getElementById("introError");

  if (input.toLowerCase() === "tondeuse") {
    screenIntro.classList.add("hidden");
    screenVideo.classList.remove("hidden");
    error.classList.add("hidden");

    waitForVideoToEnd(); // active le bouton suivant quand la vidéo finit
  } else {
    error.classList.remove("hidden");
  }
}

// Gérer fin vidéo pour bouton suivant
function waitForVideoToEnd() {
  const player = new YT.Player("bradVideo", {
    events: {
      'onStateChange': function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          nextBtn.disabled = false;
        }
      }
    }
  });
}

// Charger API YouTube
function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

loadYouTubeAPI();
