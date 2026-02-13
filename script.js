let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("click", function () {
    if (started === false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

document.addEventListener("touchstart", function () {
    if (started === false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}


function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 500);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    let delay = 0;
    for (let color of gameSeq) {
        let btn = document.querySelector(`.${color}`);
        setTimeout(() => {
            gameFlash(btn);
        }, delay);
        delay += 600;
    }
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `
            Game Over! <br>
            Your Score: <b>${level - 1}</b> <br>
            Tap anywhere to restart
        `;
        console.log("Game Over! Final Score:", level - 1);
        reset();
    }
}


function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log("User clicked:", userColor);

    userSeq.push(userColor);
    console.log("User Sequence:", userSeq);

    checkAns(userSeq.length - 1);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchstart", btnPress);
}