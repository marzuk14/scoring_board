let timerInterval;
let isPaused = false;
let seconds = 0;

function changeScore(scoreId, delta) {
    let scoreElement = document.getElementById(scoreId);
    let currentScore = parseInt(scoreElement.innerText);
    let newScore = currentScore + delta;
    if (newScore >= 0) {
        scoreElement.innerText = newScore;
    }
}

function changeFoul(foulId, delta) {
    let foulElement = document.getElementById(foulId);
    let currentFoul = parseInt(foulElement.innerText);
    let newFoul = currentFoul + delta;
    if (newFoul >= 0) {
        foulElement.innerText = newFoul;
    }
}

function resetScores() {
    document.getElementById('score1').innerText = '0';
    document.getElementById('score2').innerText = '0';
    document.getElementById('foul1').innerText = '0';
    document.getElementById('foul2').innerText = '0';
}

// Fungsi untuk mengatur nama tim dan pindah ke halaman baru
function handleSetTeamNames() {
    let team1Name = encodeURIComponent(document.getElementById('team1-name').value);
    let team2Name = encodeURIComponent(document.getElementById('team2-name').value);

    // Simpan data ke localStorage
    saveData(team1Name, team2Name);

    // Pindah ke halaman baru
    window.location.href = 'beranda.html';
}

// Fungsi untuk menyimpan data ke localStorage
function saveData(team1, team2) {
    localStorage.setItem('team1', team1);
    localStorage.setItem('team2', team2);
}

// Fungsi untuk menampilkan nama tim dari localStorage
function displayTeamNames() {
    let team1Name = decodeURIComponent(localStorage.getItem('team1')) || 'Team 1';
    let team2Name = decodeURIComponent(localStorage.getItem('team2')) || 'Team 2';

    document.getElementById('team1-display').innerText = team1Name;
    document.getElementById('team2-display').innerText = team2Name;
}

// Jika halaman saat ini adalah beranda.html, panggil displayTeamNames
if (window.location.pathname.endsWith('beranda.html')) {
    displayTeamNames();
}

// scripts/scripts.js

function goBack() {
    window.history.back();
}

function updateTimerDisplay() {
    let timerElement = document.getElementById('timer');
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    timerElement.innerText = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (!isPaused) {
                seconds++;
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function pauseTimer() {
    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    isPaused = false;
    updateTimerDisplay();
}

let shotClockInterval;
let shotClockTime = 12;
let isShotClockPaused = false;

function startShotClock() {
    if (isShotClockPaused) {
        isShotClockPaused = false;
    } else {
        shotClockTime = 12;
        document.getElementById('shot-clock').textContent = shotClockTime;
    }

    clearInterval(shotClockInterval);
    shotClockInterval = setInterval(() => {
        if (!isShotClockPaused) {
            shotClockTime--;
            document.getElementById('shot-clock').textContent = shotClockTime;
            if (shotClockTime <= 0) {
                clearInterval(shotClockInterval);
            }
        }
    }, 1000);
}

function pauseShotClock() {
    isShotClockPaused = true;
}

function resetShotClock() {
    clearInterval(shotClockInterval);
    shotClockTime = 12;
    document.getElementById('shot-clock').textContent = shotClockTime;
    isShotClockPaused = false;
}

// Event listener untuk keyboard
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '1':
            document.getElementById('team1-score-increase').click();
            break;
        case '2':
            document.getElementById('team1-score-decrease').click();
            break;
        case '3':
            document.getElementById('team2-score-increase').click();
            break;
        case '4':
            document.getElementById('team2-score-decrease').click();
            break;
        case 'q':
            document.getElementById('team1-foul-increase').click();
            break;
        case 'w':
            document.getElementById('team1-foul-decrease').click();
            break;
        case 'e':
            document.getElementById('team2-foul-increase').click();
            break;
        case 'r':
            document.getElementById('team2-foul-decrease').click();
            break;
        case 'i':
            document.getElementById('start-timer').click();
            break;
        case 'o':
            document.getElementById('pause-timer').click();
            break;
        case 'p':
            document.getElementById('reset-timer').click();
            break;
        case 'l':
            document.getElementById('back-button').click();
            break;
        case 'n':
            document.getElementById('start-shot-clock').click();
            break;
        case 'b':
            document.getElementById('reset-shot-clock').click();
            break;
        case 'm':
            document.getElementById('pause-shot-clock').click();
            break;
    }
});
