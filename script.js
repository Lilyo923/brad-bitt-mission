const launchTime = new Date("2025-06-12T10:00:00").getTime();
const codes = { secret: "checkpoint", main: "tondeuse", bk: "bouilloire", lg: "epuisette" };
const G = {
  lille: [
    "Demander un Serrano très salé",
    "Dans un magasin Pokémon, demander des Aquali",
    "Imprimer photo d’Astérion et dire qu’on le cherche",
    "Dans l’Apple Store, afficher le site"
  ],
  bk: [
    "Garder la couronne BK toute la journée",
    "Demander un burger au Serrano",
    "Aux toilettes, crier « vachement salé »",
    "Se filmer en story dégustation"
  ],
  lg: [
    "Faire semblant quand on vous tire dessus",
    "Faire une emote toutes les 5 min",
    "Courir dans le labyrinthe toutes les 5 min",
    "Dire votre emplacement toutes les 5 min"
  ]
};
const N = ["Téo","Edwin","Hippolyte","Arthur"];
let used = { lille: [], bk: [], lg: [] }, current = "";

// 1. Timer et accès secret
setInterval(()=>{
  const d = launchTime - Date.now();
  if (d <= 0) { show("launch"); hide("intro"); } 
  else {
    const h = Math.floor(d/3600000), m = Math.floor((d%3600000)/60000), s = Math.floor((d%60000)/1000);
    query("#countdown").innerText = `${h}h ${m}m ${s}s`;
  }
},1000);

function checkSecret(){
  if (q("#secretCode").value.toLowerCase() === codes.secret) {
    show("launch"); hide("intro");
  }
}

// 2. Animation + mot de passe main
function startAnimation(){
  hide("launch");
  show("anim");
  const txt="Le retour incontesté de Brad Bitt";
  let i=0, el=q("#animText"), anim = setInterval(()=>{
    el.textContent += txt[i++] || (()=>{ clearInterval(anim); show("videoIntro"); initYT("player_int","btn_int"); })();
  }, 100);
}

function checkMain(){
  if (q("#mainCode").value.toLowerCase() === codes.main) {
    hide("anim");
    show("videoIntro");
    initYT("player_int","btn_int");
  } else q("#errorMain").innerText="❌";
}

// 3. Init YouTube
function initYT(playerId, btnId){
  new YT.Player(playerId, {
    videoId: "2DMl0zoaPZ0", events: { 'onStateChange': ev=>{
      if (ev.data===YT.PlayerState.ENDED) {
        q(`#${btnId}`).disabled=false;
        q(`#${btnId}`).classList.remove("locked");
      }
    }}
  });
}

// 4. Map
function goMap(){
  hide("videoIntro", "section","congrats");
  show("map");
}

function unlock(loc){
  const val = q(`#code_${loc}`).value.toLowerCase();
  if (val===codes[loc]) {
    q(`#btn_${loc}`).disabled=false;
    q(`#btn_${loc}`).classList.remove("locked");
  }
}

function enter(loc){
  current = loc;
  hide("map");
  show("section");
  q("#secTitle").innerText = `📍 ${loc.charAt(0).toUpperCase()+loc.slice(1)}`;
  q("#secNote").innerText = loc==="lg" ? "Changement de pseudo en rouge !" : "";
}

// 5. Roulette + gages
function spin(){
  const name = rnd(N.filter(n=>!used[current].includes(n)));
  used[current].push(name);
  q("#spinName").innerText = `🎉 ${name}`;
  
  const gage = rnd(G[current].filter(g=> !used[current].includes(g)));
  used[current].push(gage);
  q("#spinGage").innerText = `🎯 ${gage}`;
  
  const li = document.createElement("li"), cb=document.createElement("input");
  cb.type="checkbox"; cb.addEventListener("change",()=>confirmEnable());
  li.appendChild(cb); li.append(" "+gage);
  q("#gageList").appendChild(li);
}

function confirmEnable(){
  const chks = qAll("#gageList input");
  if (chks.every(c=>c.checked)) {
    unq("#btn_confirm");
    q("#btn_confirm").disabled=false;
  }
}

// 6. Validation
function confirm(){
  hide("section");
  show("congrats");
  initYT(`player_${current}`, "btn_" + (current==="lg"?"final":""));
}

// 7. Code final
function submitCode(){
  if (q("#finalCode").value.toLowerCase()===codes[current]) {
    hide("congrats");
    show("map");
    q(`#btn_${current}`).disabled=false;
    if (current==="lg") show("final");
  } else q("#errorFinal").innerText="❌";
}

// Utils
function q(s){ return document.querySelector(s); }
function qAll(s){ return [...document.querySelectorAll(s)]; }
function show(...ids){ ids.forEach(i=>q("#"+i).classList.remove("hidden")); }
function hide(...ids){ ids.forEach(i=>q("#"+i).classList.add("hidden")); }
function rnd(a){ return a[Math.floor(Math.random()*a.length)]; }

// Load YT API
let t=document.createElement("script"); t.src="https://www.youtube.com/iframe_api";
document.head.appendChild(t);
