let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector("h2");

let turnO = true;
let gameOver = false;

let click1 = new Audio("assets/click1.mp3");
let click2 = new Audio("assets/click2.mp3");
let mouseClick = new Audio("assets/mouseclick.mp3");
let win = new Audio("assets/win.mp3");
let draw = new Audio("assets/draw.wav");

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
        hover.play();
    });
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            click1.play();
            box.innerHTML = "O";
            box.style.color = "#7d1128"
            turnO = false;
            msg.innerHTML = "X's turn";
        } else {
            click2.play();
            box.innerHTML = "X";
            box.style.color = "#c41e3d"
            turnO = true;
            msg.innerHTML = "O's turn";
        }

        box.disabled = true;

        checkWinner();
    });
});

function setStyles(pos1,pos2,pos3){
    pos1.style.backgroundColor = "#20c0009d";
    pos2.style.backgroundColor = "#20c0009d";
    pos3.style.backgroundColor = "#20c0009d";
    pos1.style.color = "white";
    pos2.style.color = "white";
    pos3.style.color = "white";
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]];
        let pos2 = boxes[pattern[1]];
        let pos3 = boxes[pattern[2]];

        if (pos1.innerText != "" && pos2.innerText != "" && pos3.innerText != "") {
            if (pos1.innerText == pos2.innerText && pos2.innerText == pos3.innerText) {
                gameOver = true;
                msg.innerHTML = pos1.innerText + " Wins!";
                setStyles(pos1,pos2,pos3);
                msg.style.transform = "scale(1.3)";
                win.play();
                boxes.forEach((box) => {
                    box.disabled = true;
                });
                return;
            }
        }
    }

    let count = 0;
    boxes.forEach((box) => {
        if (box.innerText !== "" ) count++;
    });

    if (count === 9 && !gameOver) {
        gameOver = true;
        draw.play();
        msg.style.transform = "scale(1.3)";
        msg.style.color = "#694229";
        msg.innerHTML = "Draw!";
    }
}

reset.addEventListener("click", () => {
    gameOver = false;
    msg.style.transform = "scale(1)";
    msg.style.color = "#694229";
    mouseClick.play();
    msg.innerHTML = "Start Game!";
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
        box.style.backgroundColor = "#ddb892";
        box.style.color = "#8a3716"; 
    });
});
