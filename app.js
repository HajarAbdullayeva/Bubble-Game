let board = document.querySelector(".board");
let startBtn = document.querySelector(".start-btn");
let stopBtn = document.querySelector(".stop-btn");
let score = document.querySelector(".score");
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");
let easyLabel = document.querySelector(".easy-label");
let mediumLabel = document.querySelector(".medium-label");
let hardLabel = document.querySelector(".hard-label");
let scoreBoard = document.querySelector(".score-board");

let count = 0;
let username;
let gameContinue = false;
let myInterval;
let bubbleVoice = new Audio("./bubble-bursting-popping.mp3");
let players = JSON.parse(localStorage.getItem("players")) || [];
let gameModes = [
  { easy: { duration: 2000, incrementCount: 3 } },
  { medium: { duration: 1500, incrementCount: 2 } },
  { hard: { duration: 100, incrementCount: 1 } },
];
stopBtn.disabled = true;

//! Create bubble
let createBubble = (value) => {
  let bubble = document.createElement("div");
  bubble.classList.add("bubble");
  board.appendChild(bubble);
  bubble.classList.add("active");

  let activeBubble = document.querySelectorAll(".active").length;

  //! Get board width and height
  let winWidth = board.clientWidth; //--> width content-box
  let winHeight = board.clientHeight; //--> height content-box

  //! Random place in a board
  randomTop = getRandomNumber(0, winHeight);
  randomLeft = getRandomNumber(0, winWidth);
  bubble.style.top = randomTop + "px";
  bubble.style.left = randomLeft + "px";

  //! Random number function
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  bubble.addEventListener("click", () => {
    bubble.classList.remove("active");
    bubbleVoice.play();
    count += value.incrementCount;
    score.textContent = count;
  });

  if (activeBubble > 50) {
    stopGame();
  }
};

//! Start game
const startGame = () => {
  //! Game Continue
  gameContinue = true;

  //! When game is started disable start button
  startBtn.disabled = true;
  stopBtn.disabled = false;

  //! Get username
  while (!username || username.trim() == "") {
    username = prompt("Enter username");
  }

  if (easy.checked) {
    myInterval = setInterval(function () {
      createBubble(gameModes[0].easy);
    }, gameModes[0].easy.duration);
  }
  if (medium.checked) {
    myInterval = setInterval(function () {
      createBubble(gameModes[1].medium);
    }, gameModes[1].medium.duration);
  }
  if (hard.checked) {
    myInterval = setInterval(function () {
      createBubble(gameModes[2].hard);
    }, gameModes[2].hard.duration);
  }
};

//! Write Local Storage
const createUsers = () => {
  players.push({ username, count });
  localStorage.setItem("players", JSON.stringify(players));
};

//! Stop game
const stopGame = () => {
  gameContinue = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  board.innerHTML = "";
  createUsers();
  clearInterval(myInterval);
  // createTable();
};

//! Create Player Table
const createTable = () => {
  const scoreTable = document.createElement("div");
  scoreTable.classList.add("score-table");
  const name = document.createElement("p");
  let players = JSON.parse(localStorage.getItem("players")) || [];
  players.map((player) => {
    name.innerText = player.username;
    console.log(player.username);
    scoreTable.appendChild(name);
    const score = document.createElement("p");
    score.innerText = player.count;
    scoreTable.appendChild(score);
    scoreBoard.appendChild(scoreTable);
    // const border = document.createElement("div");
    // border.classList.add("border");
    // scoreBoard.appendChild(border);
  });
};

createTable();

// console.log(scoreBoard);

startBtn.addEventListener("click", () => startGame());
stopBtn.addEventListener("click", () => stopGame());
