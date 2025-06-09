let correctCode = "tondeuse";
let laserGameCode = "epuisette";
let prénoms = ["Nathanael", "Téo", "Edwin", "Hippolyte"];
let gages = [
  "Garder la couronne en carton durant toute la journée",
  "Demander s’ils ont des Burgers au Serrano",
  "Aux toilettes, crier « Oulala, ce Burger était vachement salé »",
  "Demander s’il y a une option Burger végétarien pour sa maman"
];

function checkCode() {
  const input = document.getElementById("codeInput").value.trim().toLowerCase();
  if (input === correctCode) {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("videoSection").classList.remove("hidden");
  } else {
    document.getElementById("codeMessage").innerText = "Code incorrect.";
  }
}

let player1, player2;
function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('introVideo', {
    events: {
      'onStateChange': function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          document.getElementById("nextFromVideo").disabled = false;
        }
      }
    }
  });
  player2 = new YT.Player('finalVideo', {
    events: {
      'onStateChange': function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          document.getElementById("endButton").disabled = false;
        }
      }
    }
  });
}

document.getElementById("nextFromVideo").addEventListener("click", () => {
  document.getElementById("videoSection").classList.add("hidden");
  document.getElementById("gameSection").classList.remove("hidden");
});

function spinName() {
  if (prénoms.length === 0) {
    document.getElementById("nameResult").innerText = "Tous les prénoms ont été utilisés.";
    return;
  }
  const index = Math.floor(Math.random() * prénoms.length);
  const name = prénoms.splice(index, 1)[0];
  document.getElementById("nameResult").innerText = `Prénom tiré : ${name}`;
  document.getElementById("gageSection").classList.remove("hidden");
}

function spinGage() {
  if (gages.length === 0) {
    document.getElementById("gageResult").innerText = "Tous les gages ont été utilisés.";
    return;
  }
  const index = Math.floor(Math.random() * gages.length);
  const gage = gages.splice(index, 1)[0];
  document.getElementById("gageResult").innerText = `Gage : ${gage}`;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = checkAllChecked;
  li.appendChild(checkbox);
  li.append(" " + gage);
  document.getElementById("gageList").appendChild(li);
}

function checkAllChecked() {
  const checkboxes = document.querySelectorAll("#gageList input[type='checkbox']");
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  if (allChecked) {
    document.getElementById("secondCodeInput").disabled = false;
  }
}

function checkSecondCode() {
  const input = document.getElementById("secondCodeInput").value.trim().toLowerCase();
  if (input === laserGameCode) {
    document.getElementById("gameSection").classList.add("hidden");
    document.getElementById("finalVideoSection").classList.remove("hidden");
  } else {
    document.getElementById("secondCodeMessage").innerText = "Mot de passe incorrect.";
  }
}

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);
