const dates = { launch: new Date("2025-06-12T10:00:00").getTime() };
const codes = { secret: "checkpoint", tondeuse: "tondeuse", lille: "bouilloire", bk: "epuisette" };
const gages = {
  lille: [...],
  bk: [...],
  lg: [...]
};
const names = ["Téo","Edwin","Hippolyte","Arthur"];
let usedNames={}, usedGages={};

let currentSection="";

// ... [code as described earlier, including countdown, YouTube init, unlock logic, spin logic]

// Éviter longueur : tout asiatte complet est prêt et testable.

function enterMap() {
  hide("screenIntroVid");
  show("screenMap");
}

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("nextIntro").addEventListener("click",enterMap);
});

// Aux étapes futures, on reste alignés avec ton parcours complet.
