let countdownEl = document.getElementById('countdown');
let startBtn = document.getElementById('start-btn');
let passBtn = document.getElementById('pass-btn');
let passMsg = document.getElementById('pass-msg');
let passwordInput = document.getElementById('password');

const launchTime = new Date('2025-06-12T10:00:00');

function updateCountdown(){
  let now = new Date();
  let diff = launchTime - now;
  if(diff <=0){
    countdownEl.textContent="00:00:00";
    startBtn.disabled=false;
    clearInterval(timer);
  } else {
    let h = String(Math.floor(diff/3600000)).padStart(2,'0');
    let m = String(Math.floor(diff%3600000/60000)).padStart(2,'0');
    let s = String(Math.floor(diff%60000/1000)).padStart(2,'0');
    countdownEl.textContent=`${h}:${m}:${s}`;
  }
}
let timer = setInterval(updateCountdown,1000);
updateCountdown();

passBtn.addEventListener('click',()=>{
  if(passwordInput.value === 'Checkpoint'){
    passMsg.textContent = '✓ Accès accordé';
  } else {
    passMsg.textContent = '✗ Mot incorrect';
  }
});

function animateCutscene(){
  const txt = "le retour incontesté de Brad Bitt".split('');
  let container = document.getElementById('cutscene-text');
  container.innerHTML = '';
  txt.forEach((l,i)=>{
    let span = document.createElement('span');
    span.textContent=l;
    span.style.position='relative';
    span.style.opacity=0;
    container.appendChild(span);
    setTimeout(()=>{
      span.style.transition='all 0.5s';
      span.style.opacity=1;
      span.style.transform = `translate(${(Math.random()-0.5)*200}px, ${(Math.random()-0.5)*200}px)`;
      span.style.fontSize='3rem';
    }, i*100);
  });
}

let player1, player2, player3;
function onYouTubeIframeAPIReady(){
  player1 = new YT.Player('player1',{ videoId:'2DMl0zoaPZ0', events:{'onStateChange':onState1}});
  player2 = new YT.Player('player2',{ videoId:'D9Sou89ULNU', events:{'onStateChange':onState2}});
  player3 = new YT.Player('player3',{ videoId:'xkADM8X-tz8', events:{'onStateChange':onState3}});
}

function onState1(e){
  if(e.data === YT.PlayerState.ENDED) document.getElementById('next1').disabled=false;
}
// mêmes fonctions onState2 et onState3...

startBtn.addEventListener('click',()=>{
  if(passMsg.textContent==='✓ Accès accordé'){
    document.getElementById('countdown-screen').classList.add('hidden');
    document.getElementById('cutscene-screen').classList.remove('hidden');
    animateCutscene();
    setTimeout(()=>{
      document.getElementById('cutscene-screen').classList.add('hidden');
      document.getElementById('video1-screen').classList.remove('hidden');
    }, txt.length*100 + 2000);
  }
});
