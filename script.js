// Rock Paper Scissors - Game Logic
function getComputerChoice() {
    // 1 = Rock, 2 = Paper, 3 = Scissors
    return (Math.floor(Math.random()*3) + 1);

}

function setPlayerBackground(playerChoice) {
    // Highlight the player's choice by changing the container's background to cyan
    switch(playerChoice) {
        case 1:
            document.getElementsByClassName("choice-one")[0].classList.add("playerChoice");
            break;
        case 2:
            document.getElementsByClassName("choice-two")[0].classList.add("playerChoice");
            break;
        case 3:
            document.getElementsByClassName("choice-three")[0].classList.add("playerChoice");
            break;
    }
}

function setPCBackground(pcChoice) {
    // Highlight the PC's choice by changing the container's background to orange
    switch(pcChoice) {
        case 1:
            document.getElementsByClassName("choice-one")[0].classList.add("pcChoice");
            break;
        case 2:
            document.getElementsByClassName("choice-two")[0].classList.add("pcChoice");
            break;
        case 3:
            document.getElementsByClassName("choice-three")[0].classList.add("pcChoice");
            break;
    }
}

function resetBackground() {
    // remove all background colors instead of finding what has one using conditionals
    document.getElementsByClassName("choice-one")[0].classList.remove("pcChoice");
    document.getElementsByClassName("choice-one")[0].classList.remove("playerChoice");
    document.getElementsByClassName("choice-two")[0].classList.remove("pcChoice");
    document.getElementsByClassName("choice-two")[0].classList.remove("playerChoice");
    document.getElementsByClassName("choice-three")[0].classList.remove("pcChoice");
    document.getElementsByClassName("choice-three")[0].classList.remove("playerChoice");
}

function checkWin(playerChoice, pcChoice) {
    // Tie condition
    if (playerChoice == pcChoice) {
        return "t";
    }
    // Player win - all possibilities: Rock vs. Scissors | Paper vs. Rock | Scissors vs. Paper
    else if ((playerChoice == 1 && pcChoice == 3) || (playerChoice == 2 && pcChoice == 1) || (playerChoice == 3 && pcChoice == 2)) {
        return "w";
    }
    // If it's not a tie or a player win, it must be a player loss
    else {
        return "l";
    }
}

function updateStats(result) {
    // Increment stats and change the respective indication in the header bar
    switch(result) {
        case "t":
            alert("It's a TIE!");
            tie += 1;
            document.getElementsByClassName("tie")[0].innerHTML = tie;
            console.log(`player: ${playerScore} | PC: ${pcScore} | tie ${tie}`);
            break;
        case "w":
            alert("You won the round!");
            playerScore += 1;
            document.getElementsByClassName("win")[0].innerHTML = playerScore;
            console.log(`player: ${playerScore} | PC: ${pcScore} | tie ${tie}`);
            break;
        case "l":
            alert("You lost the round!");
            pcScore += 1;
            document.getElementsByClassName("lose")[0].innerHTML = pcScore;
            console.log(`player: ${playerScore} | PC: ${pcScore} | tie ${tie}`);
            break;
    }
}

function showFinalStatus(state) {
    // Set body to show final result style

    if (state == "w") {
        document.getElementsByClassName("choices")[0].classList.add("hide");
        document.getElementsByClassName("choices")[1].classList.add("hide");
        document.getElementsByClassName("choices")[2].classList.add("hide");
        document.getElementsByClassName("choice-one")[0].classList.add("make-transparent");
        document.getElementsByClassName("choice-three")[0].classList.add("make-transparent");
        document.getElementById("win-img").classList.remove("hide");
    }
    if (state == "l") {
        document.getElementsByClassName("choices")[0].classList.add("hide");
        document.getElementsByClassName("choices")[1].classList.add("hide");
        document.getElementsByClassName("choices")[2].classList.add("hide");
        document.getElementsByClassName("choice-one")[0].classList.add("make-transparent");
        document.getElementsByClassName("choice-three")[0].classList.add("make-transparent");
        document.getElementById("lose-img").classList.remove("hide");
    }
    if (state == "t") {
        document.getElementsByClassName("choices")[0].classList.add("hide");
        document.getElementsByClassName("choices")[1].classList.add("hide");
        document.getElementsByClassName("choices")[2].classList.add("hide");
        document.getElementsByClassName("choice-one")[0].classList.add("make-transparent");
        document.getElementsByClassName("choice-three")[0].classList.add("make-transparent");
        document.getElementById("tie-img").classList.remove("hide");
    }
}


function declareGame() {
    //Check if 5 rounds were played => declare final results if 5 rounds were played and reload the page

    if ((playerScore + pcScore + tie) == 5){
        if (playerScore > pcScore) {
            alert("You WON the game!");
            showFinalStatus("w");
            setTimeout(function () { location.reload() }, 2000);
        }
        else if (playerScore == pcScore) {
            alert("The game ended with a TIE!");
            showFinalStatus("t");
            setTimeout(function () { location.reload() }, 1500);
        }
        else {
            alert("You LOST the game!");
            showFinalStatus("l");
            setTimeout(function () { location.reload() }, 1500);
        }
    }
}

function playRound(playerChoice) {
    // Full game logic: play rounds => show results => declare final status after 5 rounds
    let pcChoice = getComputerChoice();
    setPlayerBackground(playerChoice);
    setTimeout(function () { setPCBackground(pcChoice); }, 500);
    let result = checkWin(playerChoice, pcChoice);
    setTimeout(function () { updateStats(result); }, 1000);
    setTimeout(resetBackground, 1200);
    setTimeout(declareGame, 1500);
}

let playerScore = 0;
let pcScore = 0;
let tie = 0;

document.getElementsByClassName("choice-one")[0].onclick = function(){playRound(1)};
document.getElementsByClassName("choice-two")[0].onclick = function(){playRound(2)};
document.getElementsByClassName("choice-three")[0].onclick = function(){playRound(3)};