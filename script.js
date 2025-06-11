// Countdown to June 12, 2025, 10:00
const countdownElement = document.getElementById("countdown");
const launchDate = new Date("2025-06-12T10:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    countdownElement.innerText = "Lancement disponible !";
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerText = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Checkpoint logic
function validateCheckpoint() {
  const input = document.getElementById('checkpointInput');
  if (input.value === "Checkpoint") {
    alert("Accès autorisé !");
    setTimeout(() => {
      document.getElementById("checkpointAccess").style.display = "none";
    }, 5000);
    document.getElementById("startBtn").style.display = "inline-block";
  } else {
    alert("Mot de passe incorrect.");
  }
}

// Aller à page 2
function goToPage2() {
  document.getElementById("page-1").classList.add("hidden");
  document.getElementById("page-2").classList.remove("hidden");
}

// Valider mot de passe pour accéder à la vidéo
function validateSecondPassword() {
  const input = document.getElementById("secondPassword").value;
  if (input === "tondeuse") {
    document.getElementById("page-2").classList.add("hidden");
    document.getElementById("page-3").classList.remove("hidden");
    setupVideoEndListener();
  } else {
    alert("Mot de passe incorrect.");
  }
}

// Activation bouton suivant après vidéo
function setupVideoEndListener() {
  const iframe = document.getElementById('bradVideo');
  const player = new YT.Player(iframe, {
    events: {
      'onStateChange': function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          document.getElementById("nextBtn").disabled = false;
        }
      }
    }
  });
}

// Aller à la suite (tu ajouteras la suite ici)
function goToNextPart() {
  alert("Suite du projet ici...");
}

// Charger l'API YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
