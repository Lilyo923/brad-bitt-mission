// ==== VARIABLES ====

const launchSection = document.getElementById('launch-section');
const countdownEl = document.getElementById('countdown');
const btnCommencer = document.getElementById('btn-commencer');

const checkpointContainer = document.getElementById('checkpoint-container');
const checkpointInput = document.getElementById('checkpoint-input');
const checkpointValider = document.getElementById('checkpoint-valider');

const bradbittSection = document.getElementById('bradbitt-section');
const bradbittPasswordInput = document.getElementById('bradbitt-password');
const bradbittValider = document.getElementById('bradbitt-valider');

const videoSection = document.getElementById('video-section');
const btnSuivant = document.getElementById('btn-suivant');
const infoText = document.getElementById('info');

const lieuxSection = document.getElementById('lieux-section');

const pages = document.querySelectorAll('.page');

const LAUNCH_DATE = new Date('2025-06-12T10:00:00');

let player; // YouTube player

// ==== FONCTIONS UTILITAIRES ====

function showPage(page) {
  pages.forEach(p => p.classList.remove('active'));
  page.classList.add('active');
}

// ==== COMPTE À REBOURS ====

function updateCountdown() {
  const now = new Date();
  const diff = LAUNCH_DATE - now;

  if (diff <= 0) {
    countdownEl.textContent = '00:00:00';
    btnCommencer.disabled = false;
    btnCommencer.classList.add('enabled');
    clearInterval(intervalCountdown);
  } else {
    let h = Math.floor(diff / 1000 / 3600);
    let m = Math.floor((diff / 1000 % 3600) / 60);
    let s = Math.floor((diff / 1000) % 60);

    h = h.toString().padStart(2, '0');
    m = m.toString().padStart(2, '0');
    s = s.toString().padStart(2, '0');

    countdownEl.textContent = `${h}:${m}:${s}`;
  }
}

const intervalCountdown = setInterval(updateCountdown, 1000);
updateCountdown();

// ==== MOT DE PASSE CHECKPOINT ====

checkpointValider.addEventListener('click', () => {
  const val = checkpointInput.value.trim();
  if (val.toLowerCase() === 'checkpoint') {
    alert('Accès Checkpoint autorisé !');
    checkpointContainer.style.display = 'none'; // disparait 5s plus tard ?
  } else {
    alert('Mot de passe Checkpoint incorrect');
  }
});

// ==== BOUTON COMMENCER ====

btnCommencer.addEventListener('click', () => {
  showPage(bradbittSection);
});

// ==== MOT DE PASSE LE RETOUR INCONTESTÉ DE BRAD BITT ====

bradbittValider.addEventListener('click', () => {
  if (bradbittPasswordInput.value.trim().toLowerCase() === 'tondeuse') {
    showPage(videoSection);
  } else {
    alert('Mot de passe incorrect');
  }
});

// ==== YOUTUBE IFRAME API ====

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    btnSuivant.disabled = false;
    btnSuivant.classList.add('enabled');
    infoText.style.display = 'none';
  }
}

// ==== BOUTON SUIVANT ====

btnSuivant.addEventListener('click', () => {
  if (!btnSuivant.disabled) {
    showPage(lieuxSection);
  }
});
