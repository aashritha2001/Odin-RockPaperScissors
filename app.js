
// UI
const buttons = document.querySelectorAll("button");
const resultHeading = document.querySelector("#result");
const resultsub = document.querySelector("#subresult");
const scorePlayer = document.querySelector("#playerScore");
const scoreComp = document.querySelector("#computerScore");
const playerSide = document.querySelector("#player")
const computerSide = document.querySelector("#computer")
var audio = new Audio("./success.wav");
const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");
const replayButton = document.getElementById("replay-button");

var playerScore = 0;
var computerScore = 0;

buttons.forEach(button => {
    button.addEventListener("click", function(){
        computerSide.style.backgroundColor = "white";
        playerSide.style.backgroundColor = "white";

        audio.pause();
        audio.currentTime=0;
        playerSide.backgroundColor = "white";
        computerSide.backgroundColor = "white";

        const playerChoice = this.id;
        const computerChoice = getComputerChoice();
        const result = playRound(playerChoice.toUpperCase(), computerChoice)

        const resArray = result.split("!");
        
        resultHeading.textContent = resArray[0] + '!';
        resultsub.textContent = resArray[1];

        displayChoices(playerChoice.toUpperCase(), computerChoice);
        updateScoresUI();


    });
});

function updateScoresUI(){
    scorePlayer.textContent = "Player: " + playerScore;
    scoreComp.textContent = "computer: " + computerScore;

    if(playerScore == 5){
        dialogueText.textContent = "You won! Would you like to play again?";
        dialogueBox.style.display = "block";
    }
    else if(computerScore == 5){
        dialogueBox.style.backgroundColor = "#FFCCCB";
        dialogueText.textContent = "You lost! Would you like to play again?";
        dialogueBox.style.display = "block";
    }
}

replayButton.addEventListener("click", restartGame);

function restartGame(){
    playerScore = 0;
    computerScore = 0;
    resultHeading.textContent = "Choose your weapon";
    resultsub.textContent = "First to score 5 points wins the game"; 
    playerSide.textContent = "❓";
    computerSide.textContent = "❓";
    scorePlayer.textContent = "Player: 0";
    scoreComp.textContent = "Computer: 0";
    playerSide.style.backgroundColor = "white";
    computerSide.style.backgroundColor = "white";
    dialogueBox.style.display = "none";

}

function displayChoices(player, computer){
    playerSide.textContent = getCorrectEmoji(player);
    computerSide.textContent = getCorrectEmoji(computer);
}

function showEndGameDialogue() {
    dialogueText.textContent = "Game Over! Would you like to play again?";
    dialogueBox.style.display = "block";
}



function getCorrectEmoji(choice){
    if(choice == 'FIRE'){
        return '🔥';
    }
    else if(choice == 'WATER'){
        return '💧';
    }
    else{
        return '🌱';
    }
}

// GAME
let getComputerChoice = () => {
    let randInt = Math.round(Math.random() * 2);
    if(randInt == 0){
        return 'FIRE';
    }
    else if(randInt == 1){
        return 'WATER';
    }
    else{
        return 'NATURE';
    }
}

function changeColor(winner, loser){
    const delay = 200;

    winner.style.backgroundColor = "#D2E7D6";
    loser.style.backgroundColor = '#FFCCCB';
    setTimeout(() => {
        winner.style.backgroundColor = "white"; 
        loser.style.backgroundColor = "white";
    }, delay);

}

function playRound(playerSelection, computerSelection){
    let player = playerSelection.toUpperCase();
    console.log("Player: " + playerSelection );
    console.log("Computer: " + computerSelection + "\n");

    switch(true) {
        case player == computerSelection:
            return "Tie! " + capitalize(player) + " ties with " + capitalize(player);
        case player == 'FIRE' && computerSelection == 'WATER':
            changeColor(computerSide, playerSide);
            computerScore+=1;
            return "You lose! Water beats Fire"; 
        case player == 'FIRE' && computerSelection == 'NATURE':
            changeColor(playerSide, computerSide);
            audio.play();
            playerScore+=1;
            return "You won! Fire beats Nature"; 
        case player == 'WATER' && computerSelection == 'FIRE':
            changeColor(playerSide, computerSide);
            audio.play();
            playerScore+=1;
            return "You won! Water beats Fire";
        case player == 'WATER' && computerSelection == 'NATURE':
            changeColor(computerSide, playerSide);
            computerScore+=1;
            return "You lose! Nature beats Water";  
        case player == 'NATURE' && computerSelection == 'FIRE':
            changeColor(computerSide, playerSide);
            computerScore+=1;
            return "You lose! Fire beats Nature";
        case player == 'NATURE' && computerSelection == 'WATER':
            changeColor(playerSide, computerSide);
            audio.play();
            playerScore+=1;
            return "You won! Nature beats Water"; 
        default:
            return "Tie !";

    }
}

/* Capitalize the first letter */
function capitalize(s) {
    s = s.toLowerCase();
    return s[0].toUpperCase() + s.slice(1);
}

function game(){
    let playerScore = 0;
    let computerScore = 0;
    for(let i = 0 ;i<5; i++){
        let playerInput = prompt("Please enter: ", "Blah");
        let result = playRound(playerInput, getComputerChoice());

        while(result.includes('Tie')){
            let playerInput = prompt("Please enter: ", "Blah");
            result = playRound(playerInput, getComputerChoice()); 
        }
        if(result.includes('lose')){
            computerScore++;
        }
        else if(result.includes('won')){
            playerScore++;
        }
    }
    console.log(declareWinner(playerScore, computerScore));
}

function declareWinner(playerScore, computerScore){
    console.log("Player Score: " + playerScore + " Computer Score: " + computerScore);
    if(playerScore > computerScore){
        return "You Won!!";
    }
    return "You lose, better luck next time!";
}





