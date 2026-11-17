
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let ms = Math.floor((time % 1000) / 10);

    return {
        main:
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0"),
        ms: String(ms).padStart(2, "0")
    };
}

function updateDisplay() {
    const currentTime = elapsedTime +
        (running ? performance.now() - startTime : 0);

    const formatted = formatTime(currentTime);

    display.textContent = formatted.main;
    milliseconds.textContent = formatted.ms;
}

function startStopwatch() {
    if (running) return;

    startTime = performance.now();
    running = true;

    timerInterval = setInterval(updateDisplay, 10);
}

function pauseStopwatch() {
    if (!running) return;

    elapsedTime += performance.now() - startTime;
    running = false;

    clearInterval(timerInterval);
    updateDisplay();
}

function resetStopwatch() {
    clearInterval(timerInterval);

    running = false;
    elapsedTime = 0;
    startTime = 0;
    lapCount = 0;

    updateDisplay();

    lapList.innerHTML =
        '<li class="empty">No laps recorded yet</li>';
}

function recordLap() {
    if (!running) return;

    lapCount++;

    const currentTime =
        elapsedTime + performance.now() - startTime;

    const formatted = formatTime(currentTime);

    if (lapCount === 1) {
        lapList.innerHTML = "";
    }

    const li = document.createElement("li");

    const lapName = document.createElement("span");
    lapName.textContent = "Lap " + lapCount;

    const lapTime = document.createElement("span");
    lapTime.textContent =
        formatted.main + "." + formatted.ms;

    li.appendChild(lapName);
    li.appendChild(lapTime);

    lapList.prepend(li);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

updateDisplay();
