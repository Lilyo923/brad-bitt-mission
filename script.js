// --------- COMPTE À REBOURS ---------
const countdownEl = document.getElementById("countdown");
const startBtn = document.getElementById("start-adventure");
const passwordBtn = document.getElementById("password-btn");
const passwordSection = document.getElementById("password-section");
const passwordInput = document.getElementById("password-input");
const passwordValidate = document.getElementById("password-validate");
const passwordMessage = document.getElementById("password-message");

const launchDate = new Date("2025-06-12T10:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "C’est parti !";
    startBtn.style.display = "inline-block";
    clearInterval(intervalId);
  } else {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    countdownEl.textContent = `${hours.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
  }
}

const intervalId = setInterval(updateCountdown, 1000);
updateCountdown();

startBtn.addEventListener("click", () => {
  document.getElementById("page-1").classList.add("hidden");
  document.getElementById("page-2").classList.remove("hidden");
});

// --------- MOT DE PASSE CHECKPOINT ---------
passwordBtn.addEventListener("click", () => {
  passwordSection.classList.remove("hidden");
});

passwordValidate.addEventListener("click", () => {
  if (passwordInput.value.toLowerCase() === "checkpoint") {
    passwordMessage.textContent = "Accès autorisé";
    setTimeout(() => {
      passwordSection.classList.add("hidden");
      passwordMessage.textContent = "";
      passwordInput.value = "";
      document.getElementById("page-1").classList.add("hidden");
      document.getElementById("page-2").classList.remove("hidden");
    }, 5000);
  } else {
    passwordMessage.textContent = "Mot de passe incorrect";
  }
});

// --------- MOT DE PASSE TONDEUSE ---------
const validateTondeuse = document.getElementById("validate-tondeuse");
const pwTondeuse = document.getElementById("pw-tondeuse");
const msgTondeuse = document.getElementById("msg-tondeuse");

validateTondeuse.addEventListener("click", () => {
  if (pwTondeuse.value.toLowerCase() === "tondeuse") {
    msgTondeuse.textContent = "";
    document.getElementById("page-2").classList.add("hidden");
    document.getElementById("page-3").classList.remove("hidden");
  } else {
    msgTondeuse.textContent = "Mot de passe incorrect";
  }
});

// --------- VIDÉO ET BOUTON SUIVANT ---------
const video = document.getElementById("video");
const nextButton = document.getElementById("next-button");

window.onYouTubeIframeAPIReady = function() {
  // Just in case, if you want to use YouTube API for control, can be implemented here
};

video.addEventListener("ended", () => {
  nextButton.disabled = false;
});

nextButton.addEventListener("click", () => {
  if (!nextButton.disabled) {
    document.getElementById("page-3").classList.add("hidden");
    document.getElementById("page-4").classList.remove("hidden");
  }
});
