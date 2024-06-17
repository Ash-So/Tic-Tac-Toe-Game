let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector("#reset-btn");

let turnO = true;
const winPat = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box is clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color ="#ffafcc";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color ="#cdb4db";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = `It's a tie. Play again?`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let c = 1;
    for(let pat of winPat){
        let pos1Val = boxes[pat[0]].innerText;
        let pos2Val = boxes[pat[1]].innerText;
        let pos3Val = boxes[pat[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos1Val == pos3Val){
                console.log("Winner ", pos1Val);
                disableBoxes();
                showWinner(pos1Val);
                
            }
            else{
                c++;
                if(c == 9){
                    disableBoxes();
                    showDraw();
                }
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);