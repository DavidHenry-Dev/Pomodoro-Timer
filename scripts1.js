let seconds = 1500;
let countDown;
let breakTimer;
let startingDisplay = `${Math.floor(seconds / 60)}:${seconds % 60}0`;
let breakSeconds = 300;
//The reset function stored in global variable to allow all timers access
let reset = function() { 
    clearInterval(countDown);
    clearInterval(breakTimer);
    seconds= 1500;
    breakSeconds = 300;
    displayStudyTime.textContent = startingDisplay;
    displayTotalTime.textContent = startingDisplay;
    }
const alarmSound = new Audio('shortalarm.wav');

//Preselecting all the elements to use later
let displayTotalTime = document.querySelector(".mainTimeDisplay");
let displayStudyTime = document.querySelector(".displayStudy");
let displayBreak = document.querySelector('.displayBreak');
let addStudyTime = document.querySelector("#addStudy");
let minusStudyTime = document.querySelector("#minusStudy");
let addBreakTime = document.querySelector("#addBreak");
let minusBreakTime = document.querySelector("#minusBreak");
let startTimer = document.querySelector("#start");
let displayReset = document.querySelector("#reset");
let muteSounds = document.querySelector("#sound_btn");

displayTotalTime.textContent = startingDisplay;
displayStudyTime.textContent = startingDisplay;
displayBreak.textContent = `${Math.floor(breakSeconds / 60)}:${breakSeconds % 60}0`;

function countDownTimer() {
    
//begins the countdown timer
countDown = setInterval(() => {
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    const displayTimer  = `${minutes < 10 ? "0": ""}${minutes}:${remainingSecs < 10 ? "0": ""}${remainingSecs}`;
    displayTotalTime.textContent = displayTimer;
//stop the timer once it reachs 00:00 and begin the break timer
        if(seconds <= 0) {
           clearInterval(countDown);
           alarmSound.play();
           breakTimer = setInterval(() => {
                    breakSeconds--;
                    const breakMinutes = Math.floor(breakSeconds / 60);
                    const remainingBreakSeconds = breakSeconds % 60;
                    const displayBreakTimer = `${breakMinutes < 10 ? "0": ""}${breakMinutes}:${remainingBreakSeconds < 10 ? "0": ""}${remainingBreakSeconds}`;
                    displayTotalTime.textContent = displayBreakTimer;
                        if(breakSeconds < 0) {
                            reset();
                        }
                }, 1000);
            }   
    }, 1000);
    
}

addStudyTime.addEventListener("click", function() {
    seconds = seconds + 300;
    displayStudyTime.textContent = `${Math.floor(seconds / 60)}:${seconds % 60}0`;
    
})

minusStudyTime.addEventListener("click", function() {
    seconds = seconds - 300;
    displayStudyTime.textContent = `${Math.floor(seconds / 60)}:${seconds % 60}0`;
   
})


addBreakTime.addEventListener("click", function(){
    breakSeconds = breakSeconds + 300;
    displayBreak.textContent = `${Math.floor(breakSeconds / 60)}:${breakSeconds % 60}0`;
  
})


minusBreakTime.addEventListener("click", function(){
    breakSeconds = breakSeconds - 300;
    displayBreak.textContent = `${Math.floor(breakSeconds / 60)}:${breakSeconds % 60}0`;
    
})
displayReset.addEventListener("click", reset);
startTimer.addEventListener("click", countDownTimer);