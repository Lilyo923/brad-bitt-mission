// Countdown to June 12, 2025 10:00 AM
const countdownElement = document.getElementById('countdown');
const startBtn = document.getElementById('startBtn');
const secretSection = document.getElementById('secretSection');

function updateCountdown() {
  const launchDate = new Date("June 12, 2025 10:00:00").getTime();
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance <= 0) {
    countdownElement.textContent = "C'est l'heure !";
    startBtn.style.display = 'inline-block';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownElement.textContent = `${days}j ${hours}h ${minutes}m ${seconds}s`;

  setTimeout(updateCountdown, 1000);
}

function checkCheckpoint() {
  const pwd = document.getElementById('checkpointPassword').value;
  if (pwd.toLowerCase() === 'checkpoint') {
    startBtn.style.display = 'inline-block';
  } else {
    alert('Mot de passe incorrect');
  }
}

startBtn.addEventListener('click', () => {
  secretSection.style.display = 'block';
});

function validateSecret() {
  const secret = document.getElementById('secretPassword').value;
  if (secret.toLowerCase() === 'tondeuse') {
    document.getElementById('animationContainer').textContent = "Le retour incontesté de Brad Bitt";
  } else {
    alert('Mot de passe incorrect');
  }
}

updateCountdown();
