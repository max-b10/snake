const leftSide = document.querySelector(".left-side");

const portfolioButton = document.querySelector(".return-button");
const title = document.querySelector(".title");
const gridSquares = document.querySelectorAll("#square");
const startButton = document.querySelector(".start");
const scoreSpan = document.querySelector("#score");
const gameContainer = document.querySelector(".game-container");
const snakeGrid = document.querySelector(".snake-grid");
// Arrow Keys:
const upArrow = document.querySelector(".up");
const downArrow = document.querySelector(".down");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

const gameOverDivLeft = document.querySelector(".game-over-signal-left");
const gameOverDivRight = document.querySelector(".game-over-signal-right");

let deviceWidth = document.documentElement.clientWidth || window.innerWidth;

// Width represents the longest the snake can be while in a straight line
// since the grid is 10x10.
const width = 10;
let currentIndex = 0; // snake starting position.
let foodIndex = 0;
// The snake itself is an array where 2=Headdiv 1=Bodydiv, 0=Taildiv:
let snake = [2, 1, 0];
// Direction means the snake will move 1 div along the gridSquares 'array':
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0; // in milliseconds used as a parameter in setInterval method.
let interval = 0;
let isGameOver = false;

portfolioButton.addEventListener("click", () => {
  window.location.replace("https://maxbungay.com");
});

// Start and restart a game:
function startGame() {
  isGameOver = false;
  gameOverDivLeft.style.display = "none";
  gameOverDivRight.style.display = "none";
  snakeGrid.style.background = "#9bba5a";
  startButton.innerHTML = "Start";
  // Remove previous snake:
  snake.forEach((index) => gridSquares[index].classList.remove("snake"));
  // Remove any food div:
  gridSquares[foodIndex].classList.remove("food");
  clearInterval(interval);
  score = 0;
  randomFood();

  // Reset everything:
  direction = 1;
  scoreSpan.innerHTML = `Score: ${score}`;
  intervalTime = 1000;
  snake = [2, 1, 0];
  currentIndex = 0;
  // Add snake class to the divs in new snake array:
  snake.forEach((index) => gridSquares[index].classList.add("snake"));
  interval = setInterval(movement, intervalTime);
  startButton.style.display = "none";
}

function movement() {
  if (
    // snake head hits bottom:
    (snake[0] + width >= width * width && direction === width) ||
    // snake head hits right wall:
    (snake[0] % width === width - 1 && direction === 1) ||
    // snake head hits left wall:
    (snake[0] % width === 0 && direction === -1) ||
    //snake head hits the top
    (snake[0] - width < 0 && direction === -width) ||
    // snake head hits a snake div:
    gridSquares[snake[0] + direction].classList.contains("snake")
  ) {
    gameOver();
    return clearInterval(interval);
  }

  const tail = snake.pop();
  gridSquares[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);

  // If food is 'eaten':
  if (gridSquares[snake[0]].classList.contains("food")) {
    //   Food square is replaced with snake square and added to end of snake array:
    gridSquares[snake[0]].classList.remove("food");
    gridSquares[tail].classList.add("snake");
    snake.push(tail);

    randomFood();
    score++;
    scoreSpan.innerHTML = `Score: ${score}`;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(movement, intervalTime);
  }
  gridSquares[snake[0]].classList.add("snake");
}
function gameOver() {
  isGameOver = true;
  // console.log("game over");
  if (deviceWidth < 769) {
    title.innerHTML = "GAME OVER!";
  }
  gameOverDivLeft.style.display = "block";
  gameOverDivRight.style.display = "block";
  startButton.style.display = "block";
  scoreSpan.innerHTML = `You scored: ${score}`;
  startButton.innerHTML = "Restart";
  gameOverDivLeft.innerHTML = "Game-Over!";
  gameOverDivRight.innerHTML = "Game-Over!";
  snakeGrid.style.background = "#829a50";
}
//generate new food each time previous food is 'eaten':
function randomFood() {
  do {
    foodIndex = Math.floor(Math.random() * gridSquares.length);
  } while (
    // Ensure food square won't be visible on the snake squares:
    gridSquares[foodIndex].classList.contains("snake")
  );
  gridSquares[foodIndex].classList.add("food");
}

function arrowControls(e) {
  if (e.code === "ArrowUp") {
    direction = -width;
    console.log("arrow up");
  } else if (e.code === "ArrowDown") {
    direction = +width;
    console.log("arrow down");
  } else if (e.code === "ArrowLeft") {
    direction = -1;
    console.log("arrow left");
  } else if (e.code === "ArrowRight") {
    direction = +1;
    console.log("arrow right");
  }
}
document.addEventListener("keyup", arrowControls);

upArrow.addEventListener("click", () => {
  direction = -width;
});
downArrow.addEventListener("click", () => {
  direction = +width;
});
leftArrow.addEventListener("click", () => {
  direction = -1;
});
rightArrow.addEventListener("click", () => {
  direction = +1;
});

startButton.addEventListener("click", startGame);

// window.addEventListener("keydown", function (event) {
//   const p = document.createElement("p");
//   p.textContent = `KeyboardEvent: key='${event.key}' | code='${event.code}'`;
//   document.getElementById("output").appendChild(p);
// });
