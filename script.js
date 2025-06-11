// Compte à rebours pour le 12 juin 2025 à 10h
const countdown = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const launchDate = new Date("2025-06-12T10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  } else {
    countdown.style.display = "none";
    startButton.style.display = "inline-block";
  }
}
setInterval(updateCountdown, 1000);

// Mot de passe Checkpoint (accès rapide)
function checkCheckpoint() {
  const input = document.getElementById("checkpointPassword").value;
  if (input.toLowerCase() === "checkpoint") {
    alert("Accès autorisé. Vous pouvez cliquer sur 'Commencer l'aventure'.");
    countdown.style.display = "none";
    startButton.style.display = "inline-block";
  } else {
    alert("Mot de passe incorrect !");
  }
}
