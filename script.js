// Date cible : 12 juin 2025 à 10h
const targetDate = new Date("2025-06-12T10:00:00").getTime();
const countdownEl = document.getElementById("countdown");
const startBtn = document.getElementById("start-btn");

let passwordUnlocked = false;

// Lancer le compte à rebours
const timerInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(timerInterval);
    countdownEl.textContent = "Lancement !";
    if (passwordUnlocked) {
      startBtn.classList.remove("hidden");
    }
  } else {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Vérification du mot de passe
function checkPassword() {
  const input = document.getElementById("checkpoint-password").value;
  const errorMsg = document.getElementById("password-error");

  if (input === "Checkpoint") {
    passwordUnlocked = true;
    errorMsg.textContent = "";
    document.getElementById("password-container").style.display = "none";

    const now = new Date().getTime();
    if (now >= targetDate) {
      startBtn.classList.remove("hidden");
    }
  } else {
    errorMsg.textContent = "Mot de passe incorrect.";
  }
}

// Action au clic sur "Commencer l’aventure"
startBtn.addEventListener("click", () => {
  alert("Aventure lancée ! (étape suivante à intégrer ici)");
});
