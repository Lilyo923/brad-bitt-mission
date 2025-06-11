console.log("Le fichier script.js est bien chargé !");
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
// Cache la zone checkpoint après 5 secondes
setTimeout(() => {
  const checkpointBox = document.querySelector('.password-box');
  if (checkpointBox) {
    checkpointBox.style.display = 'none';
  }
}, 5000);

// Gestion du bouton "Commencer l'aventure"
document.getElementById('startButton').addEventListener('click', () => {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('adventureSection').style.display = 'block';

  // Animation texte
  animateText("le retour incontesté de Brad Bitt", "animationContainer", () => {
    document.getElementById('tondeuseSection').style.display = 'block';
  });
});

// Animation style "lettres qui volent"
function animateText(text, containerId, callback) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const letters = text.split("");
  letters.forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = "translateY(-20px)";
    span.style.transition = `opacity 0.3s ${index * 0.05}s, transform 0.3s ${index * 0.05}s`;
    container.appendChild(span);
  });

  setTimeout(() => {
    container.querySelectorAll("span").forEach((span) => {
      span.style.opacity = 1;
      span.style.transform = "translateY(0)";
    });
  }, 100);

  setTimeout(() => {
    if (callback) callback();
  }, 1000 + letters.length * 50);
}

// Vérifie mot de passe "tondeuse"
function checkTondeuse() {
  const input = document.getElementById("tondeuseInput").value.trim().toLowerCase();
  if (input === "tondeuse") {
    document.getElementById('tondeuseSection').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'block';
    setupYouTubeAPI();
  } else {
    alert("Mot de passe incorrect.");
  }
}

// Gère le bouton suivant après la vidéo
function setupYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('bradVideo', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    const nextBtn = document.getElementById('nextButton');
    nextBtn.disabled = false;
    nextBtn.textContent = "Suivant";
    nextBtn.style.backgroundColor = "#0f0";
    nextBtn.style.color = "#000";
  }
}
