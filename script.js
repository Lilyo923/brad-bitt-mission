function checkCode() {
    const input = document.getElementById('codeInput').value;
    if (input === "BRADBITT2025") {
        document.getElementById('codeSection').classList.add('hidden');
        document.getElementById('videoSection').classList.remove('hidden');
    } else {
        document.getElementById('errorMsg').textContent = "Mauvais code, essaie encore !";
    }
}

function goToMap() {
    hideAllSections();
    document.getElementById('mapSection').classList.remove('hidden');
}

function hideAllSections() {
    document.querySelectorAll('.hidden').forEach(e => e.classList.add('hidden'));
    document.getElementById('videoSection').classList.add('hidden');
    document.getElementById('mapSection').classList.add('hidden');
    document.getElementById('burgerKingSection').classList.add('hidden');
    document.getElementById('laserGameSection').classList.add('hidden');
}

function showBurgerKing() {
    hideAllSections();
    document.getElementById('burgerKingSection').classList.remove('hidden');
}

function showLaserGame() {
    hideAllSections();
    document.getElementById('laserGameSection').classList.remove('hidden');
}

function checkBKGages() {
    const gages = document.querySelectorAll('.bk-gage');
    let allChecked = true;
    gages.forEach(g => {
        if (!g.checked) allChecked = false;
    });
    if (allChecked) {
        document.getElementById('bkCodeReveal').classList.remove('hidden');
        document.getElementById('lgUnlock').classList.remove('hidden');
    } else {
        alert("Tous les gages doivent être cochés !");
    }
}

function unlockLaserGame() {
    const code = document.getElementById('laserCode').value;
    if (code.trim().toUpperCase() === "AST2025") {
        document.getElementById('lgBtn').disabled = false;
        document.getElementById('codeError').textContent = "";
    } else {
        document.getElementById('codeError').textContent = "Code incorrect. Essaye encore !";
    }
}

function tirage() {
    const prenoms = ["Nathanael", "Téo", "Edwin", "Hippolyte"];
    const gages = [
        "Garder la couronne toute la journée",
        "Demander s'ils ont des burgers au Serrano",
        "Aux toilettes, crier : 'Oulala, ce Burger était vachement salé !'",
        "Prendre une photo avec un panneau Burger King"
    ];

    const randomNom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const randomGage = gages[Math.floor(Math.random() * gages.length)];

    document.getElementById("resultatTirage").innerText = `${randomNom} doit : ${randomGage}`;
}

// YouTube API
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '100%',
        videoId: '2DMl0zoaPZ0', // ID de ta vidéo
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        document.getElementById('continueBtn').classList.remove('hidden');
    }
}
