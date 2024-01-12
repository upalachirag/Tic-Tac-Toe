let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let winMsg = document.querySelector("#win-msg");
let msgContainer = document.querySelector(".msg-container");
let btnCount = 0;
let turnX = true; //Track PlayerX Turn

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]


const disableButtons = () => {
    for(let btn of btns){
        btn.disabled = true;
    }
}

const enableButtons = () => {
    for(let btn of btns){
        btn.disabled = false;
        btn.innerText = "";
    }
}

const resetGame = () => {
    turnX = true;
    btnCount = 0;
    enableButtons();
    msgContainer.classList.add("hide");
}

const showWinner = (winner) => {
    disableButtons();
    winMsg.innerHTML = `Congratulations! Winner Is <b>Player-${winner}</b>`;
    msgContainer.classList.remove("hide");
}

const drowGame = () => {
    disableButtons();
    winMsg.innerHTML = `Game Draw!`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = btns[pattern[0]].innerText;
        let pos2val = btns[pattern[1]].innerText;
        let pos3val = btns[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }

        if(btnCount == 9){
            drowGame();
        }

    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (turnX) {
            btn.style.color = "#e63946";
            btn.innerText = "X";
            turnX = false;
        } else {
            btn.style.color = "#5FA8D3";
            btn.innerText = "O";
            turnX = true;
        }
        btn.disabled = true;
        btnCount++;
        checkWinner();
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);