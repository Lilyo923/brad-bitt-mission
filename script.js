// Variables globales
const countdownElem = document.getElementById('countdown');
const startBtn = document.getElementById('start-adventure');
const passwordInput = document.getElementById('password-input');
const passwordValidateBtn = document.getElementById('password-validate');
const passwordFeedback = document.getElementById('password-feedback');
const animationContainer = document.getElementById('animation-container');
const videoSection = document.getElementById('video-section');
const bradMessage = document.getElementById('brad-message');
const videoNextBtn = document.getElementById('video-next');
const videoInfo = document.getElementById('video-info');
const locationsSection = document.getElementById('locations-section');
const enterCodeBtn = document.getElementById('enter-code-btn');
const codeStatus = document.getElementById('code-status');
const tasksSection = document.getElementById('tasks-section');
const currentLocationElem = document.getElementById('current-location');
const tasksList = document.getElementById('tasks-list');
const confirmTasksBtn = document.getElementById('confirm-tasks');

const countdownTarget = new Date('June 12, 2025 10:00:00').getTime();

let player; // YouTube player
let videoDone = false;

// --- Compte à rebours ---
function updateCountdown() {
  const now = new Date().getTime();
  let diff = countdownTarget - now;

  if (diff <= 0) {
    countdownElem.textContent = '00:00:00:00';
    startBtn.style.display = 'inline-block';
    clearInterval(countdownInterval);
  } else {
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownElem.textContent = 
      `${String(days).padStart(2,'0')}:` + 
      `${String(hours).padStart(2,'0')}:` + 
      `${String(minutes).padStart(2,'0')}:` + 
      `${String(seconds).padStart(2,'0')}`;
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// --- Mot de passe Checkpoint ---
passwordValidateBtn.addEventListener('click', () => {
  const val = passwordInput.value.trim().toLowerCase();
  if(val === 'checkpoint') {
    passwordFeedback.style.color = 'lightgreen';
    passwordFeedback.textContent = 'Mot de passe correct, accès autorisé.';
  } else {
    passwordFeedback.style.color = '#f66';
    passwordFeedback.textContent = 'Mot de passe incorrect.';
  }
});

// --- Animation lettres qui volent et forment phrase ---
function animatePhrase(phrase, container, callback) {
  container.style.display = 'block';
  container.textContent = '';
  let letters = phrase.split('');
  letters.forEach((letter, i) => {
    let span = document.createElement('span');
    span.textContent = letter;
    span.style.position = 'relative';
    span.style.opacity = 0;
    span.style.transition = 'all 0.5s ease';
    container.appendChild(span);
    setTimeout(() => {
      span.style.opacity = 1;
      span.style.transform = `translate(${(Math.random()*200 - 100)}px, ${(Math.random()*200 - 100)}px)`;
    }, i * 100);
  });

  setTimeout(() => {
    // Réassemble
    Array.from(container.children).forEach((span, i) => {
      span.style.transform = 'translate(0,0)';
      span.style.opacity = 1;
    });
    if(callback) setTimeout(callback, 1000);
  }, letters.length * 100 + 1000);
}

// --- Gestion du bouton "Commencer l’aventure" ---
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  animationContainer.style.display = 'block';

  animatePhrase("le retour incontesté de Brad Bitt", animationContainer, () => {
    animationContainer.style.display = 'none';
    showPasswordForTondeuse();
  });
});

// --- Mot de passe "tondeuse" pour accès vidéo ---
function showPasswordForTondeuse() {
  passwordInput.value = '';
  passwordFeedback.textContent = '';
  passwordInput.placeholder = 'Mot de passe pour continuer';
  passwordValidateBtn.textContent = 'Valider';
  passwordValidateBtn.disabled = false;

  // On réutilise les mêmes éléments, mais avec ce mot de passe
  passwordValidateBtn.onclick = () => {
    if(passwordInput.value.trim().toLowerCase() === 'tondeuse') {
      passwordInput.style.display = 'none';
      passwordValidateBtn.style.display = 'none';
      passwordFeedback.textContent = '';
      startVideo();
    } else {
      passwordFeedback.style.color = '#f66';
      passwordFeedback.textContent = 'Mot de passe incorrect.';
    }
  };
}

// --- YouTube Player API ---
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '270',
    width: '480',
    videoId: '2DMl0zoaPZ0',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if(event.data === YT.PlayerState.ENDED) {
    videoDone = true;
    videoNextBtn.disabled = false;
    videoInfo.textContent = '';
  } else if(event.data === YT.PlayerState.PLAYING) {
    videoInfo.textContent = 'Regardez la vidéo jusqu\'à la fin pour continuer';
  }
}

function startVideo() {
  videoSection.style.display = 'block';
  bradMessage.textContent = 'Message de Brad Bitt : Préparez-vous pour l\'aventure !';
  videoNextBtn.disabled = true;
  videoInfo.textContent = 'Regardez la vidéo jusqu\'à la fin pour continuer';
  if(player && player.loadVideoById) {
    player.loadVideoById('2DMl0zoaPZ0');
  }
}

// --- Bouton suivant vidéo ---
videoNextBtn.addEventListener('click', () => {
  if(!videoDone) return;
  videoSection.style.display = 'none';
  showLocations();
});

// --- Affichage des lieux ---
function showLocations() {
  locationsSection.style.display = 'block';
}

// --- Au démarrage, on masque ce qui ne doit pas être visible ---
window.onload = () => {
  startBtn.style.display = 'none';
  animationContainer.style.display = 'none';
  videoSection.style.display = 'none';
  locationsSection.style.display = 'none';
  tasksSection.style.display = 'none';
  enterCodeBtn.disabled = true;
  codeStatus.textContent = 'Le code ne peut pas encore être entré';
};
