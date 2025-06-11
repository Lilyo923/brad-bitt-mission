// Date de lancement
const launchDate = new Date("June 12, 2025 10:00:00").getTime();
const countdownEl = document.getElementById("countdown");
const startContainer = document.getElementById("start-button-container");

// Compte à rebours
let countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        countdownEl.innerHTML = "Lancement terminé !";
        startContainer.classList.remove("hidden");
    } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownEl.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);

// Validation mot de passe Checkpoint
function checkCheckpoint() {
    const input = document.getElementById("checkpoint-password").value;
    if (input.toLowerCase() === "checkpoint") {
        document.getElementById("checkpoint-box").remove();
        startContainer.classList.remove("hidden");
    }
}

// Bouton Commencer
function showIntro() {
    document.getElementById("start-button-container").classList.add("hidden");
    document.getElementById("brad-animation").classList.remove("hidden");
    setTimeout(() => {
        document.getElementById("tondeuse-password-container").classList.remove("hidden");
    }, 2000);
}

// Mot de passe Tondeuse
function checkTondeuse() {
    const input = document.getElementById("tondeuse-password").value;
    if (input.toLowerCase() === "tondeuse") {
        document.getElementById("tondeuse-password-container").classList.add("hidden");
        document.getElementById("brad-message").classList.remove("hidden");
    }
}

// YouTube API
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('brad-video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Activer bouton quand vidéo terminée
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        const nextBtn = document.getElementById("next-button");
        nextBtn.disabled = false;
        nextBtn.classList.remove("disabled");
    }
}
