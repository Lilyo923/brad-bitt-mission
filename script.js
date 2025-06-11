// Date cible pour le lancement : 12 Juin 2025 10h00
const launchDate = new Date('2025-06-12T10:00:00');

// Références DOM
const countdownEl = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
const checkpointInput = document.getElementById('checkpoint-input');
const checkpointValidate = document.getElementById('checkpoint-validate');
const checkpointMsg = document.getElementById('checkpoint-msg');

const bradbittSection = document.getElementById('bradbitt-section');
const tondeuseInput = document.getElementById('tondeuse-input');
const tondeuseValidate = document.getElementById('tondeuse-validate');
const tondeuseMsg = document.getElementById('tondeuse-msg');
const animationContainer = document.getElementById('animation-container');

const videoSection = document.getElementById('video-section');
const videoPlayer = document.getElementById('video-player');
const videoNextBtn = document.getElementById('video-next');
const videoMessage = document.getElementById('video-message');

const locationsSection = document.getElementById('locations-section');
const enterCodeBtn = document.getElementById('enter-code-btn');
const codeInput = document.getElementById('code-input');
const codeMsg = document.getElementById('code-msg');

const rouletteSection = document.getElementById('roulette-section');
const roulettePrenoms = document.getElementById('roulette-prenoms');
const rouletteGages = document.getElementById('roulette-gages');
const rouletteSpinBtn = document.getElementById('roulette-spin');
const rouletteResult = document.getElementById('roulette-result');
const gageDoneCheckbox = document.getElementById('gage-done');
const nextChallengeBtn = document.getElementById('next-challenge');

const endSection = document.getElementById('end-section');

// Variables d’état
let countdownInterval;
let currentStep = 'launch';
let videoPlayerYT;
let videoEnded = false;

const prenoms = ['Téo', 'Edwin', 'Hippolyte', 'Arthur'];

const gagesLille = [
  "aller dans un supermarché et demander un Serrano très très salé",
  "aller dans un magasin de cartes Pokémon et demander si ils ont des cartes Aquali avec un regard ma foi discutable",
  "aller imprimer quelques photos de asterion et dire que vous cherchez cet homme",
  "aller dans l’Apple Store, et mettre le site de Brad Bitt sur tous les appareils"
];

const gagesBurgerKing = [
  "garder la couronne en carton durant la journée entière",
  "demander si ils sont des Burger au Serrano",
  "aux toilettes, crier, oulala ce Burger était vachement salé",
  "se filmer en train de faire une vidéo dégustation qui devra être mis en story"
];

const gagesLaserGames = [
  "insister sur le fait que si quelqu’un vous tire dessus, faire semblant de souffrir durant toute la partie",
  "se taper une Emote devant un ennemi sans lui tirer dessus toutes les 5 mins",
  "cuire dans tout le labyrinthe tous les 5mins",
  "dire notre emplacement à haute voix toute les 5mins"
];

// Décompte jusqu’à la date cible
function updateCountdown() {
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        countdownEl.textContent = "00:00:00:00";
        startBtn.style.display = 'block'; // Affiche le bouton commencer l’aventure
        document.getElementById('launch-section').style.display = 'none'; // Cache la section lancement
    } else {
        // Format Jours:Heures:Minutes:Secondes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        countdownEl.textContent =
          `${String(days).padStart(2,'0')}:${String(hours).padStart(2,'0')}:` +
          `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }
}

// Lancement du timer
countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Checkpoint mot de passe (checkpoint)
checkpointValidate.addEventListener('click', () => {
    const val = checkpointInput.value.trim().toLowerCase();
    if (val === 'checkpoint') {
        checkpointMsg.textContent = "Accès autorisé";
        checkpointMsg.classList.remove('error-msg');
        // On peut ajouter plus de logique si besoin
    } else {
        checkpointMsg.textContent = "Mot de passe incorrect";
        checkpointMsg.classList.add('error-msg');
    }
});

// Fonction animation lettres volantes et collision pour former la phrase
function startBradBittAnimation() {
    animationContainer.textContent = ''; // Reset

    const phrase = "le retour incontesté de Brad Bitt";
    const letters = phrase.split('');
    letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.position = 'relative';
        span.style.opacity = '0';
        span.style.fontFamily = 'Impact, Arial Black, sans-serif';
        span.style.fontSize = '2.5em';
        span.style.color = '#ff4500';
        span.style.display = 'inline-block';
        animationContainer.appendChild(span);

        // Animation entrée lettres
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.top = '0';
            span.style.transition = 'all 0.5s ease';
        }, i * 100);
    });
}

// Validation mot de passe pour commencer l’aventure
tondeuseValidate.addEventListener('click', () => {
    const val = tondeuseInput.value.trim().toLowerCase();
    if (val === 'tondeuse') {
        tondeuseMsg.textContent = "Mot de passe correct !";
        tondeuseMsg.classList.remove('error-msg');
        // Cache la section mot de passe et lance l’animation
        bradbittSection.style.display = 'none';

        // Affiche la section vidéo
        videoSection.style.display = 'block';
        videoMessage.textContent = "Message de Brad Bitt";

        // Intégration YouTube vidéo
        loadYouTubeVideo("2DMl0zoaPZ0"); // ID vidéo de la première URL

        // Active le bouton suivant seulement à la fin de la vidéo
        videoNextBtn.disabled = true;
        videoEnded = false;
    } else {
        tondeuseMsg.textContent = "Mot de passe incorrect";
        tondeuseMsg.classList.add('error-msg');
    }
});

// Fonction pour intégrer une vidéo YouTube avec l’API iframe
function loadYouTubeVideo(videoId) {
    videoPlayer.innerHTML = ''; // Reset

    // Créer iframe
    const iframe = document.createElement('iframe');
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.id = "ytplayer";

    videoPlayer.appendChild(iframe);

    // Setup API Player
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        // Load script if not loaded
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = function() {
            setupPlayer(videoId);
        };
    } else {
        setupPlayer(videoId);
    }
}

function setupPlayer(videoId) {
    videoPlayerYT = new YT.Player('ytplayer', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Gestion de l’état vidéo pour activer bouton suivant à la fin
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        videoEnded = true;
        videoNextBtn.disabled = false;
    }
}

// Au clic sur bouton suivant vidéo
videoNextBtn.addEventListener('click', () => {
    if (!videoEnded) return; // sécurité
    // Cache la section vidéo, affiche la section lieux
    videoSection.style.display = 'none';
    locationsSection.style.display = 'block';

    // Affiche roulette pour les gages Lille
    setupRoulette('Lille', gagesLille);
});

// Setup roulette des prénoms et gages
function setupRoulette(location, gages) {
    rouletteSection.style.display = 'block';
    roulettePrenoms.textContent = '';
    rouletteGages.textContent = '';
    rouletteResult.textContent = '';
    gageDoneCheckbox.checked = false;
    nextChallengeBtn.disabled = true;

    // Variables pour stocker état
    let selectedPrenom = null;
    let selectedGage = null;

    rouletteSpinBtn.onclick = () => {
        // Animation de roulette simple
        roulettePrenoms.textContent = '...';
        rouletteGages.textContent = '...';
        rouletteResult.textContent = '';

        setTimeout(() => {
            // Tirage aléatoire
            selectedPrenom = prenoms[Math.floor(Math.random() * prenoms.length)];
            selectedGage = gages[Math.floor(Math.random() * gages.length)];

            roulettePrenoms.textContent = `Prénom: ${selectedPrenom}`;
            rouletteGages.textContent = `Gage: ${selectedGage}`;
            rouletteResult.textContent = '';

            // Activation checkbox
            gageDoneCheckbox.checked = false;
            nextChallengeBtn.disabled = true;
        }, 1000);
    };

    // Checkbox gage accompli active bouton suivant
    gageDoneCheckbox.onchange = () => {
        nextChallengeBtn.disabled = !gageDoneCheckbox.checked;
    };

    // Au clic suivant challenge
    nextChallengeBtn.onclick = () => {
        alert(`Gage de ${selectedPrenom} validé : "${selectedGage}"`);
        // Ici tu peux ajouter la logique pour passer au prochain gage ou fin etc.
    };
}

// Au clic commencer l’aventure
startBtn.addEventListener('click', () => {
    document.getElementById('launch-section').style.display = 'none';
    bradbittSection.style.display = 'block';
    startBradBittAnimation();
});
