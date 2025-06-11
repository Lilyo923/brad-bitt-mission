// Date cible : 12 juin 2025, 10h
const targetDate = new Date('2025-06-12T10:00:00');

const countdownEl = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
const checkpointInput = document.getElementById('checkpoint-input');
const checkpointValidate = document.getElementById('checkpoint-validate');
const checkpointMsg = document.getElementById('checkpoint-msg');

const animationContainer = document.getElementById('animation-container');
const animatedText = document.getElementById('animated-text');
const adventurePass = document.getElementById('adventure-pass');
const adventureValidate = document.getElementById('adventure-validate');
const adventureMsg = document.getElementById('adventure-msg');

const videoSection = document.getElementById('video-section');
const nextBtn = document.getElementById('next-btn');
let player;

const locationsSection = document.getElementById('locations-section');
const codeBtn = document.getElementById('code-btn');
const locationCode = document.getElementById('location-code');
const codeMsg = document.getElementById('code-msg');

const tasksSection = document.getElementById('tasks-section');
const currentLocation = document.getElementById('current-location');
const nameRouletteSpan = document.querySelector('#name-roulette span');
const taskRouletteSpan = document.querySelector('#task-roulette span');
const spinBtn = document.getElementById('spin-btn');
const tasksList = document.getElementById('tasks-list');
const confirmTasksBtn = document.getElementById('confirm-tasks');

const finalSection = document.getElementById('final-section');

const checkpointPassword = 'Checkpoint';
const adventurePassword = 'tondeuse';

const names = ['Téo', 'Edwin', 'Hippolyte', 'Arthur'];

const locations = [
  {
    name: 'Lille',
    tasks: [
      'Demander un Serrano très très salé au supermarché',
      'Demander des cartes Aquali dans un magasin Pokémon avec un regard douteux',
      'Imprimer photos d’Asterion et dire que vous cherchez cet homme',
      "Mettre le site Brad Bitt sur tous les appareils à l'Apple Store"
    ],
    code: 'bouilloire'
  },
  {
    name: 'Burger King',
    tasks: [
      'Garder la couronne en carton toute la journée',
      'Demander s’ils ont des Burgers au Serrano',
      'Crier aux toilettes : oulala ce Burger était vachement salé',
      'Se filmer en vidéo dégustation à mettre en story'
    ],
    code: 'épuisette'
  },
  {
    name: 'Laser Games',
    tasks: [
      'Faire semblant de souffrir si quelqu’un vous tire dessus',
      'Faire une emote devant un ennemi sans tirer toutes les 5 mins',
      'Cuire dans tout le labyrinthe toutes les 5 mins',
      'Dire votre emplacement à haute voix toutes les 5 mins'
    ],
    code: ''
  }
];

let currentStage = 0;
let tasksDone = Array(locations.length).fill(null).map(() => Array(4).fill(false));
let rouletteState = { nameIndex: 0, taskIndex: 0 };

// Countdown
function updateCountdown() {
  const now = new Date();
  let diff = targetDate - now;
  if (diff <= 0) {
    countdownEl.textContent = 'Lancement terminé';
    startBtn.disabled = false;
    clearInterval(countdownInterval);
    return;
  }
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 24 * 60 * 60 * 1000;
  let hrs = Math.floor(diff / (1000 * 60 * 60));
  diff -= hrs * 60 * 60 * 1000;
  let mins = Math.floor(diff / (1000 * 60));
  diff -= mins * 60 * 1000;
  let secs = Math.floor(diff / 1000);

  countdownEl.textContent = `${days}j ${hrs}h ${mins}m ${secs}s`;
}

let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Checkpoint password validation
checkpointValidate.onclick = () => {
  if (checkpointInput.value === checkpointPassword) {
    checkpointMsg.textContent = 'Accès autorisé.';
  } else {
    checkpointMsg.textContent = 'Mot de passe incorrect.';
  }
};

// Start button click
startBtn.onclick = () => {
  animationContainer.classList.remove('hidden');
  startBtn.classList.add('hidden');
  runTextAnimation('le retour incontesté de Brad Bitt');
};

// Text animation (lettres qui volent et se percutent)
function runTextAnimation(text) {
  animatedText.textContent = '';
  let letters = text.split('');
  let container = animatedText;
  letters.forEach((l, i) => {
    let span = document.createElement('span');
    span.textContent = l;
    span.style.position = 'relative';
    span.style.display = 'inline-block';
    span.style.opacity = 0;
    container.appendChild(span);

    setTimeout(() => {
      span.style.transition = 'all 0.5s ease';
      span.style.opacity = 1;
      span.style.transform = `translate(${(Math.random() - 0.5)*100}px, ${(Math.random() - 0.5)*50}px)`;
    }, i * 100);

    setTimeout(() => {
      span.style.transform = 'translate(0,0)';
    }, 1500 + i * 100);
  });

  setTimeout(() => {
    adventurePass.focus();
  }, letters.length * 100 + 2000);
}

// Adventure password validation
adventureValidate.onclick = () => {
  if (adventurePass.value.toLowerCase() === adventurePassword) {
    animationContainer.classList.add('hidden');
    showVideo('2DMl0zoaPZ0');
  } else {
    adventureMsg.textContent = 'Mot de passe incorrect.';
  }
};

// YouTube API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '270',
    width: '480',
    videoId: '',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function showVideo(videoId) {
  videoSection.classList.remove('hidden');
  player.loadVideoById(videoId);
  nextBtn.disabled = true;
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    nextBtn.disabled = false;
  }
}

// Next button after video
nextBtn.onclick = () => {
  videoSection.classList.add('hidden');
  showLocations();
};

function showLocations() {
  locationsSection.classList.remove('hidden');
  currentStage = 0;
  updateLocationsUI();
  codeBtn.disabled = true;
  codeMsg.textContent = 'Le code ne peut pas encore être entré.';
}

// Update location UI
function updateLocationsUI() {
  document.getElementById('map').innerHTML = `
    <p>${locations[0].name}</p>
    <p>...</p>
    <p>??? (Burger King)</p>
    <p>...</p>
    <p>??? (Laser Games)</p>
  `;
}

// Code button
codeBtn.onclick = () => {
  let enteredCode = locationCode.value.toLowerCase();
  if (enteredCode === locations[currentStage].code) {
    currentStage++;
    codeMsg.textContent = 'Code correct !';
    if (currentStage >= locations.length) {
      showFinal();
      locationsSection.classList.add('hidden');
      return;
    }
    locationCode.value = '';
    codeBtn.disabled = true;
    tasksSection.classList.remove('hidden');
    currentLocation.textContent = locations[currentStage - 1].name;
    prepareTasks(currentStage - 1);
  } else {
    codeMsg.textContent = 'Code incorrect.';
  }
};

// Prepare tasks UI
function prepareTasks(stageIndex) {
  tasksList.innerHTML = '';
  locations[stageIndex].tasks.forEach((task, i) => {
    let label = document.createElement('label');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.index = i;
    checkbox.checked = tasksDone[stageIndex][i];
    checkbox.onchange = () => {
      tasksDone[stageIndex][i] = checkbox.checked;
      checkAllTasks(stageIndex);
    };
    label.appendChild(checkbox);
    label.append(` ${task}`);
    tasksList.appendChild(label);
  });
  confirmTasksBtn.disabled = true;
}

// Check if all tasks done
function checkAllTasks(stageIndex) {
  confirmTasksBtn.disabled = !tasksDone[stageIndex].every(Boolean);
}

// Confirm tasks done
confirmTasksBtn.onclick = () => {
  tasksSection.classList.add('hidden');
  showVideo(getVideoForStage(currentStage - 1));
};

// Video for each stage
function getVideoForStage(stageIndex) {
  if (stageIndex === 0) return 'ZAHUIzGBiQ'; // première vidéo (adaptée)
  if (stageIndex === 1) return 'D9Sou89ULNU';
  if (stageIndex === 2) return 'xkADM8X-tz8';
  return '';
}

function showFinal() {
  finalSection.classList.remove('hidden');
}

spinBtn.onclick = () => {
  rouletteState.nameIndex = Math.floor(Math.random() * names.length);
  rouletteState.taskIndex = Math.floor(Math.random() * locations[currentStage - 1].tasks.length);

  // Animation simple de roulette
  nameRouletteSpan.textContent = names[rouletteState.nameIndex];
  taskRouletteSpan.textContent = locations[currentStage - 1].tasks[rouletteState.taskIndex];
};
