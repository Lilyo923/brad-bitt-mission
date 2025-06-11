// Variables globales
const launchDate = new Date('2025-06-12T10:00:00');
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const launchSection = document.getElementById('launch-section');
const passwordCheckpoint = document.getElementById('password-checkpoint');
const checkpointInput = document.getElementById('checkpoint-input');
const checkpointValidate = document.getElementById('checkpoint-validate');
const checkpointStatus = document.getElementById('checkpoint-status');
const animationSection = document.getElementById('animation-section');
const animatedText = document.getElementById('animated-text');
const accessCodeInput = document.getElementById('access-code');
const accessValidate = document.getElementById('access-validate');
const accessStatus = document.getElementById('access-status');
const videoSection = document.getElementById('video-section');
const bradMessage = document.getElementById('brad-message');
const videoNextBtn = document.getElementById('video-next');
const locationsSection = document.getElementById('locations-section');
const locationsList = document.getElementById('locations-list');
const codeEntryContainer = document.getElementById('code-entry-container');
const locationCodeInput = document.getElementById('location-code');
const locationCodeBtn = document.getElementById('location-code-btn');
const locationCodeStatus = document.getElementById('location-code-status');
const tasksSection = document.getElementById('tasks-section');
const tasksLocationTitle = document.getElementById('tasks-location-title');
const rouletteNames = document.getElementById('roulette-names');
const rouletteTasks = document.getElementById('roulette-tasks');
const spinNamesBtn = document.getElementById('spin-names');
const spinTasksBtn = document.getElementById('spin-tasks');
const tasksList = document.getElementById('tasks-list');
const taskCompleteSection = document.getElementById('task-complete-section');
const confirmTasksYes = document.getElementById('confirm-tasks-yes');
const confirmTasksNo = document.getElementById('confirm-tasks-no');
const finalVideoSection = document.getElementById('final-video-section');
const finalBradMessage = document.getElementById('final-brad-message');
const finalPlayerContainer = document.getElementById('final-player');
const finalVideoNextBtn = document.getElementById('final-video-next');
const endSection = document.getElementById('end-section');

let player, finalPlayer;
let currentStep = 0;
let videoFinished = false;

const checkpointPassword = "Checkpoint";
const secretPassword = "tondeuse";

const tasksData = {
  Lille: [
    "Aller dans un supermarché et demander un Serrano très très salé.",
    "Aller dans un magasin de cartes Pokémon et demander des cartes Aquali avec un regard ma foi discutable.",
    "Aller imprimer quelques photos de asterion et dire que vous cherchez cet homme.",
    "Aller dans l’Apple Store, et mettre le site de Brad Bitt sur tous les appareils."
  ],
  "Burger King": [
    "Garder la couronne en carton durant la journée entière.",
    "Demander si ils sont des Burger au Serrano.",
    "Aux toilettes, crier 'oulala ce Burger était vachement salé'.",
    "Se filmer en train de faire une vidéo dégustation qui devra être mise en story."
  ],
  "Laser Games": [
    "Insister sur le fait que si quelqu’un vous tire dessus, faire semblant de souffrir durant toute la partie.",
    "Se taper une Emote devant un ennemi sans lui tirer dessus toutes les 5 mins.",
    "Cuire dans tout le labyrinthe tous les 5 mins.",
    "Dire notre emplacement à haute voix toutes les 5 mins.",
    "(Rouge) Chaque joueur doit utiliser le prénom d’un autre (ex: Hippolyte devient Edwin)."
  ]
};

const playerNames = ["Téo", "Edwin", "Hippolyte", "Arthur"];

let completedTasks = {
  Lille: [false, false, false, false],
  "Burger King": [false, false, false, false],
  "Laser Games": [false, false, false, false]
};

let currentLocation = null;

function updateTimer() {
  const now = new Date();
  let diff = launchDate - now;
  if (diff <= 0) {
    timerEl.textContent = "00:00:00";
    startBtn.disabled = false;
    return;
  }
  let hrs = Math.floor(diff / (1000 * 60 * 60));
  let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let secs = Math.floor((diff % (1000 * 60)) / 1000);
  timerEl.textContent = 
    `${hrs.toString().padStart(2,'0')}:` +
    `${mins.toString().padStart(2,'0')}:` +
    `${secs.toString().padStart(2,'0')}`;
}

function startTimer() {
  updateTimer();
  const intervalId = setInterval(() => {
    updateTimer();
    if (!startBtn.disabled) {
      clearInterval(intervalId);
    }
  }, 1000);
}

// Checkpoint password validation
checkpointValidate.addEventListener('click', () => {
  const val = checkpointInput.value.trim();
  if (val.toLowerCase() === checkpointPassword.toLowerCase()) {
    checkpointStatus.textContent = "Mot de passe Checkpoint correct.";
    passwordCheckpoint.style.display = "none";
  } else {
    checkpointStatus.textContent = "Mot de passe incorrect.";
  }
});

// When start button clicked
startBtn.addEventListener('click', () => {
  launchSection.classList.add('hidden');
  animationSection.classList.remove('hidden');
  animateText("LE RETOUR INCONTESTÉ DE BRAD BITT");
});

// Animate letters flying and colliding (simplified)
function animateText(text) {
  animatedText.textContent = '';
  let i = 0;
  let interval = setInterval(() => {
    animatedText.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
    }
  }, 100);
}

// Access code validation
accessValidate.addEventListener('click', () => {
  const val = accessCodeInput.value.trim();
  if (val.toLowerCase() === secretPassword.toLowerCase()) {
    accessStatus.textContent = "Accès autorisé.";
    animationSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
    loadVideo('player', '2DMl0zoaPZ0');
  } else {
    accessStatus.textContent = "Code incorrect.";
  }
});

// Load YouTube video using iframe API
function loadVideo(containerId, videoId) {
  if (player) {
    player.destroy();
  }
  player = new YT.Player(containerId, {
    videoId: videoId,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    videoNextBtn.disabled = false;
  }
}

videoNextBtn.addEventListener('click', () => {
  if (!videoNextBtn.disabled) {
    videoSection.classList.add('hidden');
    showLocations();
  }
});

function showLocations() {
  locationsSection.classList.remove('hidden');
  currentLocation = 'Lille';
  locationCodeInput.disabled = true;
  locationCodeBtn.disabled = true;
  locationCodeStatus.textContent = 'Le code ne peut pas encore être entré';
  setupTasks(currentLocation);
}

// Setup tasks interface for a location
function setupTasks(location) {
  tasksSection.classList.remove('hidden');
  tasksLocationTitle.textContent = `Gages à faire : ${location}`;
  tasksList.innerHTML = '';
  completedTasks[location].forEach((done, idx) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;
    checkbox.addEventListener('change', () => {
      completedTasks[location][idx] = checkbox.checked;
      checkAllTasksDone(location);
    });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(tasksData[location][idx]));
    tasksList.appendChild(li);
  });
  taskCompleteSection.classList.add('hidden');
  rouletteNames.textContent = '';
  rouletteTasks.textContent = '';
}

// Check if all tasks done
function checkAllTasksDone(location) {
  if (completedTasks[location].every(v => v)) {
    taskCompleteSection.classList.remove('hidden');
  } else {
    taskCompleteSection.classList.add('hidden');
  }
}

// Confirm tasks yes/no
confirmTasksYes.addEventListener('click', () => {
  tasksSection.classList.add('hidden');
  if (currentLocation === 'Lille') {
    loadFinalVideo('ZAHUIzGBiQ', 'bouilloire'); // (Short URL ID simplified)
  } else if (currentLocation === 'Burger King') {
    loadFinalVideo('D9Sou89ULNU', 'épuisette');
  } else if (currentLocation === 'Laser Games') {
    endAdventure();
  }
});

confirmTasksNo.addEventListener('click', () => {
  taskCompleteSection.classList.add('hidden');
});

// Roulette spins
spinNamesBtn.addEventListener('click', () => {
  rouletteNames.textContent = spinRoulette(playerNames);
});
spinTasksBtn.addEventListener('click', () => {
  rouletteTasks.textContent = spinRoulette(tasksData[currentLocation]);
});

function spinRoulette(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// Load final video for code input
function loadFinalVideo(videoId, nextCode) {
  finalBradMessage.textContent = "Message de Brad Bitt";
  locationsSection.classList.add('hidden');
  finalVideoSection.classList.remove('hidden');
  if (finalPlayer) {
    finalPlayer.destroy();
  }
  finalPlayer = new YT.Player('final-player', {
    videoId: videoId,
    events: {
      'onStateChange': (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          finalVideoNextBtn.disabled = false;
        }
      }
    }
  });

  finalVideoNextBtn.disabled = true;

  finalVideoNextBtn.onclick = () => {
    if (!finalVideoNextBtn.disabled) {
      finalVideoSection.classList.add('hidden');
      if (nextCode === 'bouilloire') {
        currentLocation = "Burger King";
      } else if (nextCode === 'épuisette') {
        currentLocation = "Laser Games";
      }
      showLocations();
      locationCodeInput.disabled = false;
      locationCodeBtn.disabled = false;
      locationCodeStatus.textContent = '';
    }
  };

  locationCodeBtn.onclick = () => {
    if (locationCodeInput.value.toLowerCase() === nextCode) {
      locationCodeStatus.textContent = "Code correct !";
      locationCodeInput.disabled = true;
      locationCodeBtn.disabled = true;
      tasksSection.classList.remove('hidden');
      setupTasks(currentLocation);
    } else {
      locationCodeStatus.textContent = "Code incorrect.";
    }
  };
}

function endAdventure() {
  finalVideoSection.classList.add('hidden');
  endSection.classList.remove('hidden');
}

// Démarrage
startTimer();
