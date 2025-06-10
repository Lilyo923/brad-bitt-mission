// Countdown until June 12, 2025 at 10:00
const countdownContainer = document.getElementById("countdown");
const startBtnContainer = document.getElementById("start-button-container");

const targetDate = new Date("2025-06-12T10:00:00").getTime();

const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    countdownContainer.innerHTML = "C'est l'heure !";
    startBtnContainer.style.display = "block";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownContainer.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Secret access
function checkSecret() {
  const input = document.getElementById("secret-code").value;
  const container = document.getElementById("secret-access");
  const msg = document.getElementById("secret-msg");

  if (input.toLowerCase() === "checkpoint") {
    msg.textContent = "✅ Accès débloqué pour test.";
    document.getElementById("start-button-container").style.display = "block";

    // Masquer le champ après 1 seconde
    setTimeout(() => {
      container.style.display = "none";
    }, 1000);
  } else {
    msg.textContent = "❌ Mot de passe incorrect.";
  }
}
// Animation intro
function launchIntro() {
  document.getElementById("countdown-container").style.display = "none";
  document.getElementById("start-button-container").style.display = "none";
  const container = document.getElementById("intro-animation");
  const text = document.getElementById("intro-text");
  container.style.display = "block";

  let fullText = "Le retour incontesté de Brad Bitt";
  let i = 0;
  text.textContent = "";

  const animInterval = setInterval(() => {
    text.textContent += fullText[i];
    i++;
    if (i >= fullText.length) {
      clearInterval(animInterval);
      document.getElementById("code-container").style.display = "block";
    }
  }, 100);
}

// Mot de passe pour démarrer
function validateAccessCode() {
  const code = document.getElementById("access-code").value;
  if (code.toLowerCase() === "tondeuse") {
    document.getElementById("code-container").style.display = "none";
    document.getElementById("video-section").style.display = "block";
    document.getElementById("access-code").value = ""; // Effacer le champ après validation
  } else {
    document.getElementById("code-error").textContent = "Mot de passe incorrect.";
  }
}

// Activer bouton "suivant" après la vidéo
const video = document.getElementById("intro-video");
const nextBtn = document.getElementById("next-button");

if (video) {
  video.addEventListener("ended", () => {
    nextBtn.disabled = false;
  });
}
