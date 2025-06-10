// —— CONFIG —— 
const dates = {
  launch: new Date("2025-06-12T10:45:00").getTime(),
};
const codes = {
  secret: "checkpoint",
  main:   "tondeuse",
  lille:  "bouilloire",
  bk:     "epuisette",
};
// gages par lieu
const G = {
  lille: [
    "Demander un Serrano très très salé en supermarché",
    "Dans un magasin Pokémon, demander des cartes Aquali 🔍",
    "Imprimer photo d’Astérion et dire qu’on le cherche",
    "Dans l’Apple Store, afficher le site de Brad Bitt",
  ],
  bk: [
    "Garder la couronne BK toute la journée",
    "Demander un burger au Serrano",
    "Aux toilettes, crier « ce Burger était vachement salé »",
    "Se filmer pour story en dégustation",
  ],
  lg: [
    "Faire semblant de souffrir si on est tiré",
    "Emote devant un ennemi toutes les 5 min",
    "Courir dans tout le labyrinthe toutes les 5 min",
    "Dire son emplacement à haute voix toutes les 5 min",
  ]
};
const NAMES = ["Téo","Edwin","Hippolyte","Arthur"];
// états
let timers = {}, used = { lille:[], bk:[], lg:[] };

// —— UTIL —— 
function $(id){ return document.getElementById(id); }
function show(...ids){ ids.forEach(i=>$(i).classList.remove("hidden")); }
function hide(...ids){ ids.forEach(i=>$(i).classList.add("hidden")); }

// —— 1. COUNTDOWN & SECRET —— 
timers.countdown = setInterval(()=>{
  let d=dates.launch - Date.now();
  if(d<=0){ clearInterval(timers.countdown); hide("intro"); show("start-btn-container"); return; }
  let h=Math.floor(d/3600000%24), m=Math.floor(d/60000%60), s=Math.floor(d/1000%60);
  $("countdown").textContent = `${h}h ${m}m ${s}s`;
},1000);
function checkSecret(){
  if($("secret-code").value.toLowerCase()===codes.secret){
    clearInterval(timers.countdown);
    hide("intro"); show("start-btn-container");
  }
}

// —— 2. INTRO ANIM + MAIN PASS —— 
function startAnimation(){
  hide("start-btn-container"); show("animation-section");
  const txt="Le retour incontesté de Brad Bitt", el=$("animated-text");
  el.textContent=""; let i=0;
  timers.anim = setInterval(()=>{
    el.textContent+=txt[i++];
    if(i>=txt.length){ clearInterval(timers.anim); show("main-password","main-password","animation-section"); }
  },100);
}
function checkMainPassword(){
  if($("main-password").value.toLowerCase()===codes.main){
    hide("animation-section"); show("video-intro"); initYouTube("intro", "player-intro","next-from-intro",showMap);
  } else { $("main-error").textContent="❌"; }
}

// —— 3. MAP & NAV —— 
function showMap(){ hide("video-intro"); show("map"); }
function cancelToMap(){ hide("section-lille","section-bk","section-lg"); show("map"); }

// débloquer BK et LG
function unlockBK(){
  if($("bk-code").value.toLowerCase()===codes.bk){ $("bk-lock").disabled=false; $("bk-lock").classList.remove("locked"); hide("bk-code-container"); }
}
function unlockLG(){
  if($("lg-code").value.toLowerCase()===codes.lille){ $("lg-lock").disabled=false; $("lg-lock").classList.remove("locked"); hide("lg-code-container"); }
}

// entrer sections
function enterLille(){ hide("map"); show("section-lille"); initSection("lille"); }
document.getElementById("bk-lock").addEventListener("click",()=>{ hide("map"); show("section-bk"); initSection("bk"); });
document.getElementById("lg-lock").addEventListener("click",()=>{ hide("map"); show("section-lg"); initSection("lg"); });

// —— 4. ROULETTES & GAGES —— 
function initSection(loc){
  used[loc]=[]; $(""+loc+"-name").textContent=""; $(""+loc+"-gage").textContent="";
  $(loc+"-list").innerHTML="";
  hide(loc+"-gage-btn", loc+"-confirm");
}
function drawName(loc){
  let arr=NAMES.filter(n=>!used[loc].includes(n));
  if(!arr.length) return;
  let name=arr[Math.floor(Math.random()*arr.length)];
  used[loc].push(name);
  $(loc+"-name").innerText=`🎉 ${name}`;
  $(`${loc}-gage-btn`).classList.remove("hidden");
}
function drawGage(loc){
  let arr=G[loc].filter(g=>!used[loc].includes(g));
  if(!arr.length) return;
  let g=arr[Math.floor(Math.random()*arr.length)];
  used[loc].push(g);
  $(`${loc}-gage`).innerText=`🎯 ${g}`;
  // ajouter à la liste
  let li=document.createElement("li"), cb=document.createElement("input");
  cb.type="checkbox"; cb.onchange=()=>checkAll(loc);
  li.appendChild(cb); li.append(" "+g);
  $(loc+"-list").appendChild(li);
}
function checkAll(loc){
  let chks=[...document.querySelectorAll(`#${loc}-list input`)];
  if(chks.every(c=>c.checked)) $(loc+"-confirm").disabled=false, $(loc+"-confirm").classList.remove("disabled");
  else $(loc+"-confirm").disabled=true, $(loc+"-confirm").classList.add("disabled");
}

// —— 5. CONFIRM & VIDÉO FÉLICITATIONS —— 
function confirmLille(){ hide("section-lille"); show("congrats-lille"); initYouTube("lille","player-lille",null,null,()=>$("lille-final-code").classList.remove("hidden")); }
function submitLilleCode(){
  if($("lille-final-code").value.toLowerCase()===codes.lille){ hide("congrats-lille"); show("map"); $("bk-code-container").classList.remove("hidden"); }
}
function confirmBK(){ hide("section-bk"); show("congrats-bk"); initYouTube("bk","player-bk",null,null,()=>$("bk-final-code").classList.remove("hidden")); }
function submitBKCode(){
  if($("bk-final-code").value.toLowerCase()===codes.bk){ hide("congrats-bk"); show("map"); $("lg-code-container").classList.remove("hidden"); }
}
function confirmLG(){ hide("section-lg"); show("congrats-lg"); initYouTube("lg","player-lg","final-thanks",null,()=>{}); }
function showFinal(){ hide("congrats-lg"); show("final"); }

// —— 6. YOUTUBE API UTILS —— 
function initYouTube(loc, playerId, buttonId, onEndShow, onVideoEndReveal){
  new YT.Player(playerId, {
    height:'315', width:'560',
    videoId: {
      intro: "2DMl0zoaPZ0",
      lille: "ZAHUIzGBiOQ",
      bk:    "D9Sou89ULNU",
      lg:    "xkADM8X-tz8"
    }[loc],
    events:{
      'onStateChange': ev=>{
        if(ev.data===YT.PlayerState.ENDED){
          if(buttonId) $(buttonId).disabled=false, $(buttonId).classList.remove("disabled");
          if(onVideoEndReveal) onVideoEndReveal();
        }
      }
    }
  });
  if(buttonId && onEndShow){
    $(buttonId).addEventListener("click", onEndShow);
  }
}
// charger l’API
let tag=document.createElement('script');
tag.src="https://www.youtube.com/iframe_api";
document.head.appendChild(tag);
