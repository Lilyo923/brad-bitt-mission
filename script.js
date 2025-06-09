
let accessGranted = false;
const codeStart = "tondeuse";
const codeFinal = "epuisette";
const gages = [
  "Garder la couronne du Burger King toute la journée",
  "Demander s’il y a des burgers au serrano",
  "Aux toilettes, crier « Oulala, ce burger était vachement salé ! »",
  "Commander un burger en parlant uniquement en rimes"
];
const names = ["Nathanael", "Téo", "Edwin", "Hippolyte"];

function checkAccessCode() {
  const input = document.getElementById("access-code").value.toLowerCase();
  if (input === codeStart) {
    document.getElementById("intro-screen").classList.add("hidden");
    document.getElementById("video-screen").classList.remove("hidden");
    setupVideo("intro-video", "next-button");
  } else {
    document.getElementById("code-error").classList.remove("hidden");
  }
}

function setupVideo(videoId, buttonId) {
  const player = new YT.Player(videoId, {
    events: {
      'onStateChange': event => {
        if (event.data === YT.PlayerState.ENDED) {
          const btn = document.getElementById(buttonId);
          btn.disabled = false;
          btn.classList.remove("disabled");
        }
      }
    }
  });

  if (buttonId === "next-button") {
    document.getElementById(buttonId).addEventListener("click", () => {
      document.getElementById("video-screen").classList.add("hidden");
      document.getElementById("gage-screen").classList.remove("hidden");
      prepareGageList();
    });
  }
}

function drawName() {
  const name = names[Math.floor(Math.random() * names.length)];
  document.getElementById("selected-name").innerText = `🎉 ${name}`;
}

function drawGage() {
  const gage = gages[Math.floor(Math.random() * gages.length)];
  document.getElementById("selected-gage").innerText = `😈 ${gage}`;
  document.getElementById("gage-confirmation").classList.remove("hidden");
}

function prepareGageList() {
  const list = document.getElementById("gage-list");
  list.innerHTML = "";
  gages.forEach((gage, idx) => {
    const li = document.createElement("li");
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.id = "gage" + idx;
    chk.addEventListener("change", checkAllGages);
    li.appendChild(chk);
    li.appendChild(document.createTextNode(" " + gage));
    list.appendChild(li);
  });
}

function checkAllGages() {
  const checkboxes = document.querySelectorAll("#gage-list input[type='checkbox']");
  const allChecked = [...checkboxes].every(chk => chk.checked);
  const btn = document.getElementById("validate-gages");
  if (allChecked) {
    btn.disabled = false;
    btn.classList.remove("disabled");
  } else {
    btn.disabled = true;
    btn.classList.add("disabled");
  }
}

function showCongratsVideo() {
  document.getElementById("gage-screen").classList.add("hidden");
  document.getElementById("congrats-video-screen").classList.remove("hidden");

  const player = new YT.Player("congrats-video", {
    events: {
      'onStateChange': event => {
        if (event.data === YT.PlayerState.ENDED) {
          document.getElementById("final-code").classList.remove("hidden");
          document.getElementById("validate-final").classList.remove("hidden");
        }
      }
    }
  });
}

function checkFinalCode() {
  const val = document.getElementById("final-code").value.toLowerCase();
  if (val === codeFinal) {
    document.getElementById("final-message").classList.remove("hidden");
  }
}

// Charger API YouTube pour contrôle des vidéos
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
