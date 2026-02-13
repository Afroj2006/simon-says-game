let buttonColors = ["red", "yellow", "green", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);

function startGame() {
  if (!started) {
    level = 0;
    gamePattern = [];
    started = true;
    nextSequence();
  }
}

function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("level-title").innerText = "Level " + level;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  flashButton(randomColor);
}

function flashButton(color) {
  let button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 200);
}

document.querySelectorAll(".btn").forEach(function (button) {
  button.addEventListener("click", function () {
    if (!started) return;
    let userColor = this.id;
    userPattern.push(userColor);
    flashButton(userColor);
    checkAnswer(userPattern.length - 1);
  });
});

function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    document.body.classList.add("game-over");
    document.getElementById("level-title").innerText = "Game Over, Tap To Restart";
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);
    started = false;
  }
}