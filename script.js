document.addEventListener("DOMContentLoaded", function () {

    const colors = ["red", "yellow", "green", "purple"];
    let gameSeq = [];
    let userSeq = [];
    let level = 0;
    let started = false;
    let acceptingInput = false;

    const statusText = document.getElementById("status");
    const buttons = document.querySelectorAll(".btn");

    statusText.addEventListener("click", function () {
        console.log("Start Clicked");

        if (!started) {
            started = true;
            level = 0;
            gameSeq = [];
            nextLevel();
        }
    });

    function nextLevel() {
        userSeq = [];
        acceptingInput = false;
        level++;
        statusText.innerText = "Level " + level;

        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        gameSeq.push(randomColor);

        playSequence();
    }

    function playSequence() {
        let i = 0;

        let interval = setInterval(function () {

            let btn = document.getElementById(gameSeq[i]);
            flash(btn);

            i++;

            if (i >= gameSeq.length) {
                clearInterval(interval);
                acceptingInput = true;
            }

        }, 600);
    }

    function flash(btn) {
        btn.classList.add("flash");

        setTimeout(function () {
            btn.classList.remove("flash");
        }, 300);
    }

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {

            if (!started || !acceptingInput) return;

            let userColor = this.id;
            userSeq.push(userColor);

            flash(this);

            checkAnswer(userSeq.length - 1);
        });
    });

    function checkAnswer(index) {

        if (userSeq[index] === gameSeq[index]) {

            if (userSeq.length === gameSeq.length) {
                setTimeout(nextLevel, 1000);
            }

        } else {
            gameOver();
        }
    }

    function gameOver() {
        started = false;
        acceptingInput = false;

        statusText.innerHTML =
            "Game Over! <br> Score: " +
            (level - 1) +
            "<br> Click to Restart";
    }

});
