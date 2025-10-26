/*-------------------------------- Constants --------------------------------*/
const cells = [];

/*-------------------------------- Variables --------------------------------*/
let direction = "right";
let food;
let snakeCell = [200, 201, 202];
// let snakeMoving = false;

/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector(".board");
const startEl = document.querySelector("#start");
const restartEl = document.querySelector("#restart");
const messageEl = document.querySelector("#message");

/*-------------------------------- Functions --------------------------------*/

// initialing the game, stop the interval
function init() {
  renderSnake();
  getFoodRandomly();
  snakeCell = [200, 201, 202];
}

//create 20 x 20 cells
function createCell() {
  for (let i = 0; i < 400; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    boardEl.appendChild(cell);
    cells.push(cell);
  }
}
createCell();

//reflect snake body positon to the DOM
function renderSnake() {
  snakeCell.forEach((snake) => {
    cells[snake].classList.add("snake");
  });
}

renderSnake();

// ramdomly pops the food whitin the cells
function getFoodRandomly() {
  const food = Math.floor(Math.random() * 400);
  cells[food].classList.add("food");
  return food;
}
getFoodRandomly();

// the snake moving to the right once hit start, need to respond to the up down right left
function movingOnce() {
  direction = "right"; //snakeCell = [200,201,202];
  const head = snakeCell[snakeCell.length - 1];
  const newHead = head + 1;
  const oldtail = snakeCell.shift();
  snakeCell.push(newHead);
  cells[newHead].classList.add("snake");
  cells[oldtail].classList.remove("snake");
  console.log(snakeCell);
  return snakeCell;
}

setInterval(movingOnce, 1000);

// GameOver, if hit the wall, the message pops 'Game Over! The score is ...'
function checkForGameOver() {}

// check for eating the food, if the head = food

function checkForFood() {
  if (snakeCell[snakeCell.length - 1] === food) {
    snakeCell.push(food);
  }
}

/*----------------------------- Event Listeners -----------------------------*/
// click start, snake move to the right
startEl.addEventListener("click", movingOnce());

// click restart, reset the game, snake stopped move to the right
restartEl.addEventListener("click", (e) => {
  init();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" && direction !== "down") {
    direction = "down";
  }
  if (e.key === "ArrowUp" && direction !== "up") {
    direction = "up";
  }
  if (e.key === "ArrowRight" && direction !== "right") {
    direction = "right";
  }
  if (e.key === "ArrowLeft" && direction !== "left") {
    direction = "left";
  }
});
