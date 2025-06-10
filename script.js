// —— CONFIGURATION ——
const dates = { launch: new Date("2025-06-12T10:00:00").getTime() };
const codes = { secret: "checkpoint", main: "tondeuse", lille: "bouilloire", bk: "epuisette" };
const GAGES = {
  lille: [
    "Demander un Serrano très salé en supermarché",
    "Dans un magasin Pokémon, demander des Aquali",
    "Imprimer photo d’Astérion et dire qu’on le cherche",
    "Dans l’Apple Store, afficher le site de Brad Bitt"
  ],
  bk: [
    "Garder la couronne BK toute la journée",
    "Demander burger au Serrano",
    "Aux toilettes, crier « vachement salé »",
    "Se filmer en story dégustation"
  ],
  lg: [
    "Faire semblant de souffrir si on vous tire dessus",
    "Faire une emote toutes les 5 min",
    "Courir dans le labyrinthe toutes les 5 min",
    "Dire son emplacement haut et fort toutes les 5 min"
  ]
};
const NAMES = ["Téo","Edwin","Hippolyte","Arthur"];
let state = { usedNames: {}, usedGages: {} };

// —— UTILITAIRES ——
function $(id){ return document.getElementById(id); }
function show(...ids){ ids.forEach(i=>$(i).classList.remove("hidden")); }
function hide(...ids){ ids.forEach(i=>$(i).classList.add("hidden")); }

// —— 1. COMPTE À REBOURS & ACCÈS SECRET ——
let cd = setInterval(()=>{
  let d=dates.launch - Date.now();
  if(d<=0){ clearInterval(cd); hide("intro-screen"); show("start-screen"); return; }
  let h=Math.floor(d/3600000), m=Math.floor(d%3600000/60000), s=Math.floor(d%60000/1000);
  $("countdown").innerText = `${h}h ${m}m ${s}s`;
},1000);

function checkSecret(){
  if($("secret-code").value.toLowerCase()===codes.secret){
    clearInterval(cd);
    hide("intro-screen");
    show("start-screen");
  }
}

// —— 2. ANIMATION + MOT DE PASSE ——
function startAnimation(){
  hide("start-screen");
  show("animation-screen");
  let txt="Le retour incontesté de Brad Bitt", el=$("animated-text");
  el.innerText=""; let i=0;
  let anim=setInterval(()=>{
    el.innerText += txt[i++];
    if(i>=txt.length){ clearInterval(anim); hide("animation-screen"); show("video-intro-screen"); }
  },100);
}

function checkMainPassword(){
  if($("main-password").value.toLowerCase()===codes.main){
    hide("animation-screen");
    show("video-intro-screen");
    initYouTube("intro-video","next-from-intro",showMap);
  } else $("main-error").innerText="❌";
}

// —— 3. CARTE & NAVIGATION ——
function showMap(){
  hide("video-intro-screen");
  show("map-screen");
}

function unlock(loc){
  let inp=$(loc==="bk"?"code-bk":"code-lg");
  if(inp.value.toLowerCase()===codes[loc]) {
    $(loc==="bk"?"btn-bk":"btn-lg").disabled=false;
    $(loc==="bk"?"btn-bk":"btn-lg").classList.remove("locked");
    inp.parentNode.classList.add("hidden");
  }
}

function enterSection(loc){
  hide("map-screen");
  hide("section-lille","section-bk","section-lg",
       "congrats-lille","congrats-bk","congrats-lg","final-screen");
  show(`section-${loc}`);
  state.usedNames[loc]=[];
  state.usedGages[loc]=[];
}

// —— 4. ROULETTES & GAGES ——
function spin(loc){
  // tirer nom
  let names = NAMES.filter(n=>!state.usedNames[loc].includes(n));
  let name = names[Math.floor(Math.random()*names.length)];
  state.usedNames[loc].push(name);
  $(`name-${loc}`).innerText = "🎉 "+name;
  // tirer gage
  let gages = GAGES[loc].filter(g=>!state.usedGages[loc].includes(g));
  let g = gages[Math.floor(Math.random()*gages.length)];
  state.usedGages[loc].push(g);
  $(`gage-${loc}`).innerText = "🎯 "+g;
  // afficher case à cocher
  let li=document.createElement("li"), cb=document.createElement("input");
  cb.type="checkbox"; cb.onchange=()=>checkAll(loc);
  li.appendChild(cb); li.append(" "+g);
  $(`list-${loc}`).appendChild(li);
}

function checkAll(loc){
  let chks = [...document.querySelectorAll(`#list-${loc} input`)];
  if(chks.every(c=>c.checked)) {
    $(`confirm-${loc}`).disabled=false;
    $(`confirm-${loc}`).classList.remove("disabled");
  } else {
    $(`confirm-${loc}`).disabled=true;
    $(`confirm-${loc}`).classList.add("disabled");
  }
}

// —— 5. CONFIRM & VIDÉO FÉLICITATIONS ——
function confirmSection(loc){
  hide(`section-${loc}`);
  show(`congrats-${loc}`);
  let nextBtn = loc==="lg"?"final-next":"";
  initYouTube(`player-${loc}`, nextBtn, loc==="lille"?()=>$(`final-lille`).classList.remove("hidden"):
    loc==="bk"?()=>$(`final-bk`).classList.remove("hidden"):
    ()=>$(`final-next`).classList.remove("disabled"));
}

function submitCode(loc){
  let inp = $(`final-${loc}`);
  if(inp.value.toLowerCase()===codes[loc]){
    hide(`congrats-${loc}`);
    show("map-screen");
    if(loc==="lille") show("btn-bk");
    if(loc==="bk") show("btn-lg");
  } else $(`error-${loc}`).innerText="❌";
}

function showFinal(){
  hide("congrats-lg");
  show("final-screen");
}

// —— 6. YOUTUBE API UTILS ——
function initYouTube(playerId, btnId, onEndShow) {
  new YT.Player(playerId, {
    height:'315', width:'560',
    videoId: {intro:"2DMl0zoaPZ0", lille:"ZAHUIzGBiOQ", bk:"D9Sou89ULNU", lg:"xkADM8X-tz8"}[playerId.split('-')[1]],
    events:{ 'onStateChange':ev=>{
      if(ev.data===YT.PlayerState.ENDED){
        if(btnId) $(`#${btnId}`).disabled=false; 
        if(onEndShow) onEndShow();
      }
    }}
  });
}

// —— CHARGER API YT ——
let tag=document.createElement('script');
tag.src="https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

// —— EVENEMENTS CARTE ——
$("btn-bk").addEventListener("click",()=>enterSection('bk'));
$("btn-lg").addEventListener("click",()=>enterSection('lg'));
