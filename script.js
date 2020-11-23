const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const errors = document.querySelector(".error");
const popUp = document.querySelector(".text-to-time");
const wpm = document.querySelector("#wpm");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  return time < 10 ? "0" + time : time;
}
// Run a standard minute/second/hundredths timer:
function runtimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);

  theTimer.innerHTML = currentTime;
  timer[3]++;

  //define minutes, seconds and milliseconds
  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "green";

    // Error message styling
    errors.style.textDecoration = "underline";
    errors.style.fontWeight = "900";

    // Pop up styling

    popUp.style.backgroundColor = "#f3e1dd";
    popUp.style.color = "black";

    // Words per minute styling and logic

    let wordCount = originText.split(" ").length;
    wpm.innerHTML = Math.round(wordCount / (timer[0] + timer[1] / 60));
    wpm.style.color = "#89023e";
    wpm.style.textDecoration = "underline";
    wpm.style.fontWeight = "900";

    //prevent users from increasing the error count after completing the test
    testArea.readOnly = true;
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "blue";
    } else {
      testWrapper.style.borderColor = "orange";

      //error counter and styling
      errors.innerHTML++;
      errors.style.color = "#89023e";
    }
  }
}

// Start the timer:

function start() {
  let textEntered = testArea.value.length;
  if (textEntered === 0 && !timerRunning) {
    timerRunning = true;

    interval = setInterval(runtimer, 10);
  }

  console.log(textEntered);
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  errors.innerHTML = 0;
  errors.style.color = "black";
  testArea.readOnly = false;
  popUp.style.backgroundColor = "white";
  popUp.style.color = "white";
  wpm.style.color = "white";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
