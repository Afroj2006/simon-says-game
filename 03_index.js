let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// 🔑 Game start on keypress
document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

// 💡 Game flash
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// 💡 User flash
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// ⬆️ Level up logic
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    // 🔥 FULL SEQUENCE FLASH
    let delay = 0;
    for (let color of gameSeq) {
        let btn = document.querySelector(`.${color}`);
        setTimeout(() => {
            gameFlash(btn);
        }, delay);
        delay += 600;
    }
}

// ✅ Answer check
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `
            Game Over! <br>
            Your Score: <b>${level - 1}</b> <br>
            Press any key to restart
        `;
        console.log("Game Over! Final Score:", level - 1);
        reset();
    }
}

// 🖱️ Button press
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

// 🔄 Reset game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// 🔘 Add click listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
