let seconds = 1500;
let countDown;
let isCountDown = false;
let breakTimer;
let startingDisplay = `${Math.floor(seconds / 60)}:${seconds % 60}0`;
let breakSeconds = 300;
let isMuted = false;
let alarmSound = new Audio('shortalarm.wav');
//The reset function stored in global variable to allow all timers access
let reset = function() {
    isCountDown = false;
    startTimer.disabled = false;
    clearInterval(countDown);
    clearInterval(breakTimer);
    countDown = undefined;
    breakTimer = undefined;
    seconds = 1500;
    breakSeconds = 300;
    displayStudyTime.textContent = startingDisplay;
    displayTotalTime.textContent = startingDisplay;
}

//Preselecting all the elements to use later
const displayTotalTime = document.querySelector(".mainTimeDisplay");
const displayStudyTime = document.querySelector(".displayStudy");
const displayBreakTime = document.querySelector('.displayBreak');
const addStudyTime = document.querySelector("#addStudy");
const minusStudyTime = document.querySelector("#minusStudy");
const addBreakTime = document.querySelector("#addBreak");
const minusBreakTime = document.querySelector("#minusBreak");
const startTimer = document.querySelector("#start");
const displayReset = document.querySelector("#reset");
const alarmButton = document.querySelector("#sound-btn");
const adjustButtons = document.querySelector(".adjust-btn");

//displays inital starting time for the timers
displayTotalTime.textContent = startingDisplay;
displayStudyTime.textContent = startingDisplay;
displayBreakTime.textContent = `${Math.floor(breakSeconds / 60)}:${breakSeconds % 60}0`;

function countDownTimer() {
    isCountDown = true;
    startTimer.disabled = true;
    //begins the countdown timer
    countDown = setInterval(() => {
        seconds--;
        const minutes = Math.floor(seconds / 60);
        const remainingSecs = seconds % 60;
        const displayTimer = `${minutes < 10 ? "0": ""}${minutes}:${remainingSecs < 10 ? "0": ""}${remainingSecs}`;
        displayTotalTime.textContent = displayTimer;
        //stop the timer once it reachs 00:00 and begin the break timer
        if (seconds <= 0) {
            clearInterval(countDown);
            if (isMuted === true) {
                alarmSound = "";
            } else {
                alarmSound.play();
            }
            breakTimer = setInterval(() => {
                breakSeconds--;
                const breakMinutes = Math.floor(breakSeconds / 60);
                const remainingBreakSeconds = breakSeconds % 60;
                const displayBreak = `${breakMinutes < 10 ? "0": ""}${breakMinutes}:${remainingBreakSeconds < 10 ? "0": ""}${remainingBreakSeconds}`;
                displayTotalTime.textContent = displayBreak;

                if (breakSeconds < 0) {
                    reset();
                }
            }, 1000);
        }
    }, 1000);

}

//used for disabling the incremental buttons in the functions below
function disableAdjusting() {
    adjustButtons.disabled = true;
}


//Mutes and unmutes the alarm 
function mute_Unmute() {

    if (isMuted === false) {
        isMuted = true;
        alarmButton.innerHTML = `<i class="fas fa-volume-mute fa-lg"></i>`;
        alarmSound = "";
    } else if (isMuted === true) {
        isMuted = false;
        alarmButton.innerHTML = `<i class="fas fa-volume-up fa-lg"></i>`
        alarmSound = new Audio('shortalarm.wav');
    }
}

addStudyTime.addEventListener("click", function() {
    if (isCountDown) {
        disableAdjusting()
    } else if (seconds < 3600) {
        seconds += 300;
        displayStudyTime.textContent = `${Math.floor(seconds / 60) < 10 ? "0": ""}${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0": ""}${seconds % 60}`;
    }
})

minusStudyTime.addEventListener("click", function() {
    if (isCountDown) {
        disableAdjusting()
    } else if (seconds > 300) {
        seconds -= 300;
        displayStudyTime.textContent = `${Math.floor(seconds / 60) < 10 ? "0": ""}${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0": ""}${seconds % 60}`;
    }
})


addBreakTime.addEventListener("click", function() {
    if (isCountDown) {
        disableAdjusting()
    } else if (breakSeconds < 3600) {
        breakSeconds += 300;
        displayBreakTime.textContent = `${Math.floor(breakSeconds / 60) < 10 ? "0": ""}${Math.floor(breakSeconds / 60)}:${breakSeconds % 60 < 10 ? "0": ""}${breakSeconds % 60}`;
    }
})


minusBreakTime.addEventListener("click", function() {
    if (isCountDown) {
        disableAdjusting()
    } else if (breakSeconds > 300) {
        breakSeconds -= 300;
        displayBreakTime.textContent = `${Math.floor(breakSeconds / 60) < 10 ? "0": ""}${Math.floor(breakSeconds / 60)}:${breakSeconds % 60 < 10 ? "0": ""}${breakSeconds % 60}`;
    }
})

displayReset.addEventListener("click", reset);
startTimer.addEventListener("click", countDownTimer);
alarmButton.addEventListener("click", mute_Unmute);