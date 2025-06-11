// --- Compte à rebours ---
const countdown = document.getElementById('countdown');
const startBtn = document.getElementById('startBtn');
const targetDate = new Date("June 12, 2025 10:00:00").getTime();

const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(interval);
    countdown.innerHTML = "C'est parti !";
    startBtn.style.display = "inline-block";
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// --- Mot de passe checkpoint ---
function validateCheckpoint() {
  const input = document.getElementById('checkpointInput');
  if (input.value === "Checkpoint") {
    alert("Accès autorisé !");
    setTimeout(() => {
      document.getElementById("checkpointAccess").style.display = "none";
    }, 5000);
  } else {
    alert("Mot de passe incorrect.");
  }
}

// --- Navigation ---
startBtn.addEventListener('click', () => {
  document.getElementById("page-1").classList.add("hidden");
  document.getElementById("page-2").classList.remove("hidden");
});

// --- Mot de passe étape 2 ---
function validateSecondPassword() {
  const pw = document.getElementById("secondPassword").value;
  if (pw === "tondeuse") {
    document.getElementById("page-2").classList.add("hidden");
    document.getElementById("page-3").classList.remove("hidden");
    checkVideoEnded();
  } else {
    alert("Mot de passe incorrect.");
  }
}

// --- Attente de fin de vidéo ---
function checkVideoEnded() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = function () {
    const player = new YT.Player('ytplayer', {
      events: {
        'onStateChange': function (event) {
          if (event.data === YT.PlayerState.ENDED) {
            document.getElementById("nextBtn").disabled = false;
          }
        }
      }
    });
  }
}
