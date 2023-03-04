const player1Score = document.querySelector('[data-id="player-score--1"]');
const player2Score = document.querySelector('[data-id="player-score--2"]');
const currentScore1 = document.querySelector('[data-id="current-score--1"]');
const currentScore2 = document.querySelector('[data-id="current-score--2"]');
const restartButton = document.querySelector('[data-id="button--restart"]');
const rollButton = document.querySelector('[data-id="button--roll"]');
const holdButton = document.querySelector('[data-id="button--hold"]');
const diceImg = document.querySelector(".dice");
const player1ContainerBackground = document.querySelector(
  ".player-1-container"
);
const player2ContainerBackground = document.querySelector(
  ".player-2-container"
);

player1Score.value = 0;
player2Score.value = 0;
currentScore1.value = 0;
currentScore2.value = 0;
diceImg.classList.add("hidden");

rollButton.addEventListener("click", handleRollTheDiceButtonClicked);
holdButton.addEventListener("click", handleHoldButtonClicked);
restartButton.addEventListener("click", handleRestartButtonClicked);

let dice = 0;
let currentScore = 0;
let activePlayer = "player1";

player1ContainerBackground.classList.add("active-player");

function handleRollTheDiceButtonClicked() {
  handleTheDiceRoll();
  handlePlayersCurrentScore();
}

function handleHoldButtonClicked() {
  handlePlayersScore();
  handleSwitchingPlayers();
}

function handleRestartButtonClicked() {
  player1Score.value = 0;
  currentScore1.value = 0;
  player2Score.value = 0;
  currentScore2.value = 0;
  diceImg.classList.add("hidden");
}

function handleTheDiceRoll() {
  dice = Math.floor(Math.random() * 6) + 1;
  diceImg.classList.remove("hidden");
  diceImg.src = `./dice-faces/dice-${dice}.png`;
  if (dice === 1) {
    handleSwitchingPlayers();
  }
}

function handlePlayersCurrentScore() {
  currentScore += dice;
  currentScore1.value = currentScore;
}

function handlePlayersScore() {
  player1Score.value = currentScore1.value;
  currentScore1.value = 0;
  currentScore = 0;
}

function handleSwitchingPlayers() {
  if (activePlayer === "player1") {
    activePlayer = "player2";
    handleActivePlayerStyles("player2");
  } else {
    activePlayer = "player1";
    handleActivePlayerStyles("player1");
  }
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
//when player1 is active player1's score is active, player1's current score is active, visually
// player1 has 70% opacity set on its css
// active-player and inactive-player classes
