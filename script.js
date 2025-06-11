// ----------- Countdown -----------
const countdownTarget = new Date("2025-06-12T10:00:00").getTime();
const countdownEl = document.getElementById("countdown");
const screenCountdown = document.getElementById("screen-countdown");
const screenIntro = document.getElementById("screen-intro");

let countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownTarget - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    screenCountdown.classList.add("hidden");
    screenIntro.classList.remove("hidden");
    return;
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerText = `${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// ----------- Vidéo Intro -----------
let introPlayer, lillePlayer;

function onYouTubeIframeAPIReady() {
  introPlayer = new YT.Player("introVideo", {
    events: {
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          document.getElementById("btnToMenu").disabled = false;
        }
      }
    }
  });

  lillePlayer = new YT.Player("lilleVideo");
}

document.getElementById("btnToMenu").addEventListener("click", () => {
  document.getElementById("screen-intro").classList.add("hidden");
  document.getElementById("screen-menu").classList.remove("hidden");
});

// ----------- Menu vers Lille -----------
function goToLille() {
  document.getElementById("screen-menu").classList.add("hidden");
  document.getElementById("screen-lille").classList.remove("hidden");
}

// ----------- Roulette -----------
const names = ["Téo", "Edwin", "Hippolyte", "Arthur"];
const tasks = [
  "Aller dans un supermarché et demander un Serrano très très salé.",
  "Demander dans un magasin de cartes Pokémon s’ils ont des Aquali avec un regard douteux.",
  "Aller imprimer des photos d’Asterion et dire que vous cherchez cet homme.",
  "Aller dans un Apple Store et mettre le site sur tous les appareils."
];

function spin(type) {
  const target = document.getElementById(`result-${type}`);
  const items = type === "name" ? names : tasks;
  const result = items[Math.floor(Math.random() * items.length)];
  target.textContent = result;
}

// ----------- Validation des gages Lille -----------
function checkTasks() {
  const checkboxes = document.querySelectorAll("#taskList input[type='checkbox']");
  const allChecked = Array.from(checkboxes).every(box => box.checked);

  if (allChecked) {
    document.getElementById("validateLille").style.display = "none";
    document.getElementById("lilleVideoContainer").classList.remove("hidden");
  } else {
    alert("Tous les gages doivent être cochés !");
  }
}

// ----------- Suivant depuis Lille -----------
document.getElementById("btnToNextFromLille").addEventListener("click", () => {
  alert("La suite n’est pas encore codée, mais ça arrive !");
});
