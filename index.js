const grid = document.getElementById("grid");
let direction = "right";
let pointIndex = 0;
let currentIndex = 0;
let snakeLength = 3;
let snakeArray = [0, 1, 2, 3];
let endGame = false;
let timer = null;
let score = 0;
const result = document.getElementById("result");

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("DIV");
    cell.classList.add("cell");
    grid.append(cell);
  }
}

createGrid();

function renderPoint() {
  const cells = document.querySelectorAll(".cell");
  const random = Math.floor(Math.random() * cells.length);
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("point");
  }

  cells[random].classList.add("point");
  pointIndex = random;
}

function renderSnake() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("snake");
  }

  for (let i = 0; i < snakeArray.length; i++) {
    cells[snakeArray[i]].classList.add("snake");
  }
}

renderSnake();
renderPoint();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
  }

  console.log(direction);
});

function MoveTheSnake() {
  switch (direction) {
    case "up":
      if (snakeArray[snakeArray.length - 1] < 10 || direction === "down") {
        endGame = true;
        return;
      }
      direction = "up";
      snakeArray.push(snakeArray[snakeArray.length - 1] - 10);
      snakeArray.shift();
      renderSnake();
      console.log(snakeArray);
      break;
    case "right":
      if (
        snakeArray[snakeArray.length - 1] % 10 === 9 ||
        direction === "left"
      ) {
        endGame = true;
        return;
      }
      direction = "right";
      snakeArray.push(snakeArray[snakeArray.length - 1] + 1);
      snakeArray.shift();
      renderSnake();
      console.log(snakeArray);
      break;
    case "down":
      if (snakeArray[snakeArray.length - 1] > 89 || direction === "up") {
        endGame = true;
        return;
      }
      direction = "down";
      snakeArray.push(snakeArray[snakeArray.length - 1] + 10);
      snakeArray.shift();
      renderSnake();
      console.log(snakeArray);
      break;
    case "left":
      if (
        snakeArray[snakeArray.length - 1] % 10 === 0 ||
        direction === "right"
      ) {
        endGame = true;
        return;
      }
      direction = "left";
      snakeArray.shift();
      snakeArray.push(snakeArray[snakeArray.length - 1] - 1);
      renderSnake();
      console.log(snakeArray);

      break;
  }

  if (snakeArray.includes(pointIndex)) {
    score++;
    result.innerHTML = score;
    renderPoint();
  }

  if (endGame) {
    clearInterval(timer);
  }
  console.log(direction);
}

timer = setInterval(MoveTheSnake, 200);
