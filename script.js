// Compte à rebours jusqu'au 12 juin 2025 à 10h
const countdownEl = document.getElementById("countdown");
const startBtn = document.getElementById("startBtn");
const checkpointInput = document.getElementById("checkpointInput");
const validateCheckpoint = document.getElementById("validateCheckpoint");
const passwordContainer = document.getElementById("password-container");

const secondScreen = document.getElementById("second-screen");
const bradInput = document.getElementById("bradPassword");
const validateBrad = document.getElementById("validateBrad");

const thirdScreen = document.getElementById("third-screen");
const nextBtn = document.getElementById("nextBtn");
let player;

function updateCountdown() {
  const target = new Date("2025-06-12T10:00:00");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    countdownEl.textContent = "Lancement prêt !";
    startBtn.classList.remove("hidden");
  } else {
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
    requestAnimationFrame(updateCountdown);
  }
}

updateCountdown();

// Mot de passe checkpoint
validateCheckpoint.addEventListener("click", () => {
  if (checkpointInput.value === "Checkpoint") {
    passwordContainer.innerHTML = "✅ Accès autorisé";
    setTimeout(() => {
      document.getElementById("main-screen").classList.add("hidden");
      secondScreen.classList.remove("hidden");
    }, 5000);
  } else {
    passwordContainer.innerHTML = "❌ Mot de passe incorrect";
    setTimeout(() => location.reload(), 2000);
  }
});

// Bouton "Commencer l'aventure"
startBtn.addEventListener("click", () => {
  document.getElementById("main-screen").classList.add("hidden");
  secondScreen.classList.remove("hidden");
});

// Mot de passe Brad
validateBrad.addEventListener("click", () => {
  if (bradInput.value.toLowerCase() === "tondeuse") {
    secondScreen.classList.add("hidden");
    thirdScreen.classList.remove("hidden");
  } else {
    alert("Mot de passe incorrect !");
  }
});

// Gérer l’API YouTube (attendre la fin de la vidéo)
function onYouTubeIframeAPIReady() {
  player = new YT.Player('bradVideo', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextBtn.disabled = false;
  }
}

// Charger API YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);
// Prénoms et gages
const prenoms = ["Téo", "Edwin", "Hippolyte", "Arthur"];
const gages = [
    "Aller dans un supermarché et demander un Serrano très très salé",
    "Aller dans un magasin de cartes Pokémon et demander s’ils ont des Aquali avec un regard douteux",
    "Aller imprimer des photos d’Astérion et dire que vous cherchez cet homme",
    "Mettre le site de Brad Bitt sur tous les appareils d’un Apple Store"
];

// Fonction pour lancer la roulette
function lancerRoulette() {
    const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const gage = gages[Math.floor(Math.random() * gages.length)];

    document.getElementById("roulette-prenom").innerText = prenom;
    document.getElementById("roulette-gage").innerText = gage;
    document.getElementById("roulette-resultat").classList.remove("hidden");
    document.getElementById("valider-gages").classList.remove("hidden");
}

// Fonction de validation des gages
function validerTousLesGages() {
    // Passer à l’étape suivante (par ex. afficher mot de passe pour le prochain lieu)
    alert("Tous les gages de Lille ont été accomplis !");
    // Ici on peut afficher un champ pour entrer le code « bouilloire »
}
