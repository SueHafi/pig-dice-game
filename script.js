const instructionsBtn = document.querySelector('[data-id="instructions-button"]');

const player1ScoreElement = document.querySelector(
  '[data-id="player-score--1"]'
);
const player2ScoreElement = document.querySelector(
  '[data-id="player-score--2"]'
);
const currentScore1Element = document.querySelector(
  '[data-id="current-score--1"]'
);
const currentScore2Element = document.querySelector(
  '[data-id="current-score--2"]'
);
const restartButtonElement = document.querySelector(
  '[data-id="button--restart"]'
);
const rollButtonElement = document.querySelector('[data-id="button--roll"]');
const holdButtonElement = document.querySelector('[data-id="button--hold"]');
const diceImgElement = document.querySelector('[data-id="dice"]');
const player1ContainerBackgroundElement = document.querySelector(
  '[data-id="player-1-container"]'
);
const player2ContainerBackgroundElement = document.querySelector(
  '[data-id="player-2-container"]'
);
const player1CrownElement = document.querySelector(
  '[data-id="winner-crown--1"]'
);
const player2CrownElement = document.querySelector(
  '[data-id="winner-crown--2"]'
);
instructionsBtn.addEventListener("click", handleInstructionsBtnClicked);
rollButtonElement.addEventListener("click", handleRollTheDiceButtonClicked);
holdButtonElement.addEventListener("click", handleHoldButtonClicked);
restartButtonElement.addEventListener("click", handleRestartButtonClicked);

let dice = 0;
let currentScore = 0;
let activePlayer = "player1";
let player1Score = 0;
let player2Score = 0;

player1ContainerBackgroundElement.classList.add("active-player");

let instructionsShowing = false;
function handleInstructionsBtnClicked() {
  if(!instructionsShowing) {
    instructionsBtn.textContent='Click me to close';
    instructionsShowing = true;
  } else {
    instructionsBtn.textContent='How to play'
    instructionsShowing = false;
  }
}

function handleRestartButtonClicked() {
  activePlayer = "player1";
  dice = 0;
  currentScore = 0;
  player1Score = 0;
  player1ScoreElement.value = player1Score;
  currentScore1Element.value = 0;
  player2Score = 0;
  player2ScoreElement.value = player2Score;
  currentScore2Element.value = 0;
  diceImgElement.classList.add("hidden");
  handleActivePlayerStyles("player1");
  holdButtonElement.removeAttribute("disabled", true);
  rollButtonElement.removeAttribute("disabled", true);
  player1CrownElement.classList.add("winner-crown--invisible");
  player2CrownElement.classList.add("winner-crown--invisible");
}

function handleActivePlayerStyles(activePlayer) {
  if (activePlayer === "player1") {
    player1ContainerBackgroundElement.classList.add("active-player");
    player2ContainerBackgroundElement.classList.remove("active-player");
  } else {
    player1ContainerBackgroundElement.classList.remove("active-player");
    player2ContainerBackgroundElement.classList.add("active-player");
  }
}

function handleRollTheDiceButtonClicked() {
  rollDice();
  if (dice === 1) {
    switchPlayer();
    resetCurrentScores();
  } else {
    updateCurrentScore();
  }
}

function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;
  diceImgElement.classList.remove("hidden");
  diceImgElement.src = `./dice-faces/dice-${dice}.png`;
}

function switchPlayer() {
  if (activePlayer === "player1") {
    activePlayer = "player2";
  } else {
    activePlayer = "player1";
  }
  handleActivePlayerStyles(activePlayer);
}

function updateActivePlayerScore() {
  if (activePlayer === "player1") {
    player1Score = player1Score + currentScore;
    player1ScoreElement.value = player1Score;
  } else {
    player2Score = player2Score + currentScore;
    player2ScoreElement.value = player2Score;
  }
}

function handleHoldButtonClicked() {
  updateActivePlayerScore();
  const hasAnyoneWon = checkIfPlayerHasWon();
  if (!hasAnyoneWon) {
    switchPlayer();
  }
  resetCurrentScores();
}

function updateCurrentScore() {
  currentScore += dice;
  if (activePlayer === "player1") {
    currentScore1Element.value = currentScore;
  } else {
    currentScore2Element.value = currentScore;
  }
}

function resetCurrentScores() {
  currentScore = 0;
  currentScore1Element.value = 0;
  currentScore2Element.value = 0;
}

function checkIfPlayerHasWon() {
  if (player1Score >= 100) {
    console.log(`Congradulations Player one you have won!!`);
    player1CrownElement.classList.remove("winner-crown--invisible");
    setEndGameStyles();
    return true;
  } else if (player2Score >= 100) {
    console.log(`Congradulations Player two you have won!!`);
    player2CrownElement.classList.remove("winner-crown--invisible");
    setEndGameStyles();
    return true;
  }
  return false;
}

function setEndGameStyles() {
  holdButtonElement.setAttribute("disabled", true);
  rollButtonElement.setAttribute("disabled", true);
  diceImgElement.classList.add("hidden");
}
