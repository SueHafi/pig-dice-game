const player1Score = document.querySelector('[data-id="player-score--1"]');
const player2Score = document.querySelector('[data-id="player-score--2"]');
const currentScore1 = document.querySelector('[data-id="current-score--1"]');
const currentScore2 = document.querySelector('[data-id="current-score--2"]');
const restartButton = document.querySelector('[data-id="button--restart"]');
const rollButton = document.querySelector('[data-id="button--roll"]');
const holdButton = document.querySelector('[data-id="button--hold"]');
const diceImg = document.querySelector('[data-id="dice"]');
const player1ContainerBackground = document.querySelector(
  ".player-1-container"
);
const player2ContainerBackground = document.querySelector(
  ".player-2-container"
);
const player1Crown = document.querySelector('[data-id="winner-crown--1"]');
const player2Crown = document.querySelector('[data-id="winner-crown--2"]');

player1Score.value = 0;
player2Score.value = 0;
currentScore1.value = 0;
currentScore2.value = 0;

rollButton.addEventListener("click", handleRollTheDiceButtonClicked);
holdButton.addEventListener("click", handleHoldButtonClicked);
restartButton.addEventListener("click", handleRestartButtonClicked);

let dice = 0;
let currentScore = 0;
let activePlayer = "player1";

player1ContainerBackground.classList.add("active-player");

function handleRestartButtonClicked() {
  activePlayer = "player1";
  dice = 0;
  currentScore = 0;
  player1Score.value = 0;
  currentScore1.value = 0;
  player2Score.value = 0;
  currentScore2.value = 0;
  diceImg.classList.add("hidden");
  handleActivePlayerStyles("player1");
  holdButton.removeAttribute("disabled", true);
  rollButton.removeAttribute("disabled", true);
  player1Crown.classList.add("winner-crown--invisible");
  player2Crown.classList.add("winner-crown--invisible");
}

function handleActivePlayerStyles(activePlayer) {
  if (activePlayer === "player1") {
    player1ContainerBackground.classList.add("active-player");
    player2ContainerBackground.classList.remove("active-player");
  } else {
    player1ContainerBackground.classList.remove("active-player");
    player2ContainerBackground.classList.add("active-player");
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
  diceImg.classList.remove("hidden");
  diceImg.src = `./dice-faces/dice-${dice}.png`;
}

function switchPlayer() {
  if (activePlayer === "player1") {
    activePlayer = "player2";
    handleActivePlayerStyles("player2");
  } else {
    activePlayer = "player1";
    handleActivePlayerStyles("player1");
  }
}

function updateActivePlayerScore() {
  if (activePlayer === "player1") {
    player1Score.value =
      Number(player1Score.value) + Number(currentScore1.value);
  } else {
    player2Score.value =
      Number(player2Score.value) + Number(currentScore2.value);
  }
}

function handleHoldButtonClicked() {
  updateActivePlayerScore();
  checkIfPlayerHasWon();
  switchPlayer();
  resetCurrentScores();
}

function updateCurrentScore() {
  if (activePlayer === "player1") {
    currentScore += dice;
    currentScore1.value = currentScore;
  } else {
    currentScore += dice;
    currentScore2.value = currentScore;
  }
}

function resetCurrentScores() {
  currentScore = 0;
  currentScore1.value = 0;
  currentScore2.value = 0;
}

function checkIfPlayerHasWon() {
  if (player1Score.value >= 10) {
    console.log(`Congradulations Player one you have won!!`);
    player1Crown.classList.remove("winner-crown--invisible");
    setEndGameStyles();
  } else if (player2Score.value >= 10) {
    console.log(`Congradulations Player two you have won!!`);
    player2Crown.classList.remove("winner-crown--invisible");
    setEndGameStyles();
  }
}

function setEndGameStyles() {
  holdButton.setAttribute("disabled", true);
  rollButton.setAttribute("disabled", true);
  diceImg.classList.add("hidden");
}
