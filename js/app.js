/*-------------------------------- Constants --------------------------------*/
const cells = [];
const width = 20;

/*-------------------------------- Variables --------------------------------*/
let direction = "right"; // default setting to right
let food;
let snakeCell = [200, 201, 202]; // default position
let score = 0;
let intervalId;
let gameOver = false;
let leftWall = [];
let topWall = [];
let rightWall = [];
let bottomWall = [];
let speed = 300;
let bestScore = 0;
let isMuted = false;

/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector(".board");
const startEl = document.querySelector("#start");
const resetEl = document.querySelector("#reset");
const messageEl = document.querySelector("#message");
const bestScoreEl = document.querySelector("#bestscore");

// audio element
const musicBtnEl = document.querySelector("#muteBtn");
const audios = {
  click: document.querySelector("#btn"),
  food: document.querySelector("#getfood"),
  bgm: document.querySelector("#bgm"),
  levelUp: document.querySelector("#levelUpSound"),
  gameOver: document.querySelector("#gameOverSound"),
};

// const audios.click = document.querySelector("#btn");
// const audios.food = document.querySelector("#getfood");
// const bgmEl = document.querySelector("#bgm");
// const audio.levelUp = document.querySelector("#levelUpSound");

/*-------------------------------- Functions --------------------------------*/

// 1. render the game - reflect snake body and food and message to the Document
function render() {
  createCell();
  renderSnake();
  renderFood();
  updateMessage();
}
render();

// 2. check if the music is on or off
function toggleMute() {
  audios.click.play();
  isMuted = !isMuted;
  Object.values(audios).forEach((audio) => {
    audio.muted = isMuted;
  });
  musicBtnEl.textContent = isMuted ? "🔇 Music Off" : "🔊 Music On";
}

// initialing the game, stop the interval
function init() {
  score = 0;
  direction = "right";
  gameOver = false;
  resetSnakeBody();
  renderSnake();
  stopMoving();
  updateMessage();
  renderFood();
  audios.click.play();
}

//create 20 x 20 cells
function createCell() {
  if (cells.length > 0) return;
  for (let i = 0; i < 400; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    // cell.textContent = i;
    boardEl.appendChild(cell);
    cells.push(cell);
  }
}

//create wall bounday for later use.
function createWall() {}
for (let i = 0; i < cells.length; i++) {
  if (i % width === 0) {
    leftWall.push(i);
  }
  if (i < width) {
    topWall.push(i);
  }
  if (i >= cells.length - width) {
    bottomWall.push(i);
  }
  if ((i + 1) % width === 0) {
    rightWall.push(i);
  }
}
// console.log(leftWall);
// console.log(rightWall);
// console.log(topWall);
// console.log(bottomWall);
createWall();

//reflect snake body positon to the DOM, right now is [200, 201, 202]
function renderSnake() {
  snakeCell.forEach((snake) => {
    cells[snake].classList.add("snake");
  });
}

//reflect food whitin the cells which is ramdomly pops out,
function renderFood() {
  cells.forEach((cell) => cell.classList.remove("food"));
  do {
    food = Math.floor(Math.random() * 400);
  } while (snakeCell.includes(food)); // make sure the food is not pops on the snake body
  cells[food].classList.add("food");
}

// snake need to respond to different directions, wall collision, self collision, and grow once eat the food.
function movingOnce() {
  if (gameOver) return;
  const head = snakeCell[snakeCell.length - 1];
  let newHead;
  let oldtail;

  // check for moving direction
  if (direction === "right") {
    newHead = head + 1;
  }
  if (direction === "down") {
    newHead = head + 20;
  }
  if (direction === "up") {
    newHead = head - 20;
  }
  if (direction === "left") {
    newHead = head - 1;
  }

  // check for collison first before push newHead:
  if (
    (rightWall.includes(head) && direction === "right") || // right wall collision
    (leftWall.includes(head) && direction === "left") || // left wall collision
    newHead < 0 || // top wall collision
    newHead > cells.length || // bottom wall collision
    snakeCell.includes(newHead) // self collison
  ) {
    stopMoving();
    gameOver = true;
    updateMessage();
    audios.gameOver.play();
    return;
  }

  // check if the snake get the food.
  // If it gets the food, score plus 1, push new head and update the message.
  // If not getting it, push the newhead, delete old tail, keep the body as it is.
  if (newHead === food) {
    audios.food.play();
    snakeCell.push(newHead);
    cells[newHead].classList.add("snake");
    cells[food].classList.remove("food");
    renderFood();
    score++;
    updateMessage();
    if (score === 3) {
      // generate level up sound once score equals 3 and 6
      // audios.levelUp.currentTime = 0;
      audios.levelUp.play();
    }
    if (score === 6) {
      // audios.levelUp.currentTime = 0;
      audios.levelUp.play();
    }
  } else {
    snakeCell.push(newHead);
    oldtail = snakeCell.shift();
    cells[newHead].classList.add("snake");
    cells[oldtail].classList.remove("snake");
  }

  // change speed
  if (score >= 3) {
    changeMovingSpeed();
  }
  if (score >= 6) {
    changeMovingSpeed2();
  }

  // store the bestScore
  if (score > bestScore) {
    bestScore = score;
  }
}

// reset the snake body to default position.
function resetSnakeBody() {
  cells.forEach((cell) => {
    cell.classList.remove("snake");
  });
  snakeCell = [200, 201, 202];
}

// set up the intervals
function startMoving() {
  audios.click.play();
  audios.bgm.play();
  intervalId ??= setInterval(movingOnce, speed);
}

// change the moving speed;
function changeMovingSpeed() {
  clearInterval(intervalId);
  intervalId = setInterval(movingOnce, speed / 2);
}
// change the moving speed;
function changeMovingSpeed2() {
  clearInterval(intervalId);
  intervalId = setInterval(movingOnce, speed / 2 / 2);
}

// Stop the intervals
function stopMoving() {
  clearInterval(intervalId);
  intervalId = null;
}

//reflext updated message says score: 0,
function updateMessage() {
  if (gameOver) {
    messageEl.textContent = `Game Over! Score:${score}`;
    bestScoreEl.textContent = `Best Score: ${bestScore}`;
  } else {
    messageEl.textContent = `Score: ${score}`;
  }
}

function checkForDirection(event) {
  if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }
}

/*----------------------------- Event Listeners -----------------------------*/
// click start, snake move to the right
startEl.addEventListener("click", startMoving); // no need to include the parethesis

// click restart, reset the game, snake stopped move to the right
resetEl.addEventListener("click", init);

// add key listener to control directions
document.addEventListener("keydown", checkForDirection);

// click mute button
musicBtnEl.addEventListener("click", toggleMute);

/*----------------------------- Additonal Elements -----------------------------*/

// adjusting the audio
audios.bgm.loop = true;
audios.bgm.volume = 0.1;

audios.gameOver.loop = false;
audios.gameOver.volume = 0.1;

audios.levelUp.volume = 0.6;
audios.levelUp.loop = false;

// const audios.click = document.querySelector("#btn");
// const audios.food = document.querySelector("#getfood");
// const bgmEl = document.querySelector("#bgm");
// const audio.levelUp = document.querySelector("#levelUpSound");
// const GameOverSoundEl = document.querySelector("#gameOverSound");
// const musicBtnEl
