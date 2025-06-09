
const codeStart = "tondeuse";
const secretCode = "checkpoint";

function checkAccessCode() {
  const input = document.getElementById("access-code").value.toLowerCase();
  if (input === codeStart) {
    document.getElementById("intro-screen").classList.add("hidden");
    document.getElementById("video-screen").classList.remove("hidden");
    setupVideo("intro-video", "next-button");
  } else {
    document.getElementById("code-error").classList.remove("hidden");
  }
}

function checkSecretCode() {
  const val = document.getElementById("secret-code").value.toLowerCase();
  if (val === secretCode) {
    clearInterval(countdownInterval);
    document.getElementById("countdown-container").classList.add("hidden");
    document.getElementById("intro-screen").classList.remove("hidden");
    document.getElementById("secret-access").style.display = "none";
  }
}

function setupVideo(videoId, buttonId) {
  const player = new YT.Player(videoId, {
    events: {
      'onStateChange': event => {
        if (event.data === YT.PlayerState.ENDED) {
          const btn = document.getElementById(buttonId);
          btn.disabled = false;
          btn.classList.remove("disabled");
        }
      }
    }
  });
}

// Countdown until June 12, 2025 10:45
const targetDate = new Date("2025-06-12T10:45:00").getTime();
let countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown-container").classList.add("hidden");
    document.getElementById("intro-screen").classList.remove("hidden");
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById("countdown").innerHTML =
    `${days}j ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Load YouTube Iframe API
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
function goToNextStep() {
  document.getElementById("video-screen").classList.add("hidden");
  document.getElementById("next-step").classList.remove("hidden");
}
