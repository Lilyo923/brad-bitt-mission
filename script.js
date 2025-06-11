// Date cible pour le lancement (12 juin 2025 10:00)
const launchDate = new Date('2025-06-12T10:00:00');

const countdownEl = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
const launchSection = document.getElementById('launch-section');

const videoSection = document.getElementById('video-section');
const videoPlayer = document.getElementById('video-player');
const videoNextBtn = document.getElementById('video-next');

let player;
let videoEnded = false;

// Fonction mise à jour compte à rebours toutes les secondes
function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "00:00:00:00";
    startBtn.style.display = 'inline-block';
    clearInterval(countdownInterval);
  } else {
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `${String(days).padStart(2,'0')}:` +
      `${String(hours).padStart(2,'0')}:` +
      `${String(minutes).padStart(2,'0')}:` +
      `${String(seconds).padStart(2,'0')}`;
  }
}

let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Au clic sur "Commencer l'aventure"
startBtn.addEventListener('click', () => {
  launchSection.style.display = 'none';
  videoSection.style.display = 'block';
  loadYouTubeVideo("2DMl0zoaPZ0");
  videoNextBtn.disabled = true;
});

// Chargement de la vidéo Youtube via l’API Iframe
function loadYouTubeVideo(videoId) {
  videoPlayer.innerHTML = '';
  player = new YT.Player('video-player', {
    height: '315',
    width: '560',
    videoId: videoId,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// Gestion fin vidéo
function onPlayerStateChange(event) {
  if(event.data === YT.PlayerState.ENDED) {
    videoEnded = true;
    videoNextBtn.disabled = false;
  }
}

// Pour le moment, on ne fait rien au clic "Suivant" (tu pourras ajouter la suite après)
videoNextBtn.addEventListener('click', () => {
  if(videoEnded) {
    alert("Vidéo terminée, prochaine étape à implémenter !");
  }
});
