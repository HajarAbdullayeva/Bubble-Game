const signup = document.querySelector(".signup");
// const startSignup = document.querySelector("#signup-start");
const signupForm = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const container = document.querySelector(".container");
const board = document.querySelector(".board");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const score = document.querySelector(".score");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
const easyLabel = document.querySelector("#easy-label");
const mediumLabel = document.querySelector("#medium-label");
const hardLabel = document.querySelector("#hard-label");
const scoreBoard = document.querySelector(".score-board");

let count = 0;
let username;
let gameContinue = false;
let myInterval;
let bubbleVoice = new Audio("./bubble-bursting-popping.mp3");
let players = JSON.parse(localStorage.getItem("players")) || [];

let gameModes = [
  { easy: { duration: 500, incrementCount: 3 } },
  { medium: { duration: 400, incrementCount: 2 } },
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
  bubble.style.top = `${Math.floor(Math.random() * winHeight)}px`;
  bubble.style.left = `${Math.floor(Math.random() * winWidth)}px`;

  bubble.addEventListener("click", () => {
    bubble.classList.remove("active");
    bubbleVoice.play();
    count += value.incrementCount;
    score.textContent = count;
  });

  if (activeBubble > 50) {
    alert("Game over, dude");
    stopGame();
  }
};

window.addEventListener("load", () => {
  easy.checked = "checked";
  easyLabel.classList.add("active-btn");
});

//! Activate level
easy.addEventListener("click", () => {
  easyLabel.classList.add("active-btn");
  mediumLabel.classList.remove("active-btn");
  hardLabel.classList.remove("active-btn");
});
medium.addEventListener("click", () => {
  mediumLabel.classList.add("active-btn");
  easyLabel.classList.remove("active-btn");
  hardLabel.classList.remove("active-btn");
});
hard.addEventListener("click", () => {
  hardLabel.classList.add("active-btn");
  easyLabel.classList.remove("active-btn");
  mediumLabel.classList.remove("active-btn");
});

//! Start game
const startGame = (e) => {
  e.preventDefault();

  //! Get username
  if (!nameInput.value || nameInput.value.trim() === "") return;

  username = nameInput.value;

  signup.style.display = "none";
  container.style.display = "flex";

  //! When game is started disable start button
  startBtn.disabled = true;
  stopBtn.disabled = false;

  if (easy.checked) {
    easyLabel.classList.add("active-btn");
    hardLabel.classList.remove("active-btn");
    mediumLabel.classList.remove("active-btn");
    myInterval = setInterval(function () {
      createBubble(gameModes[0].easy);
    }, gameModes[0].easy.duration);
  }
  if (medium.checked) {
    mediumLabel.classList.add("active-btn");
    easyLabel.classList.remove("active-btn");
    hardLabel.classList.remove("active-btn");
    myInterval = setInterval(function () {
      createBubble(gameModes[1].medium);
    }, gameModes[1].medium.duration);
  }
  if (hard.checked) {
    hardLabel.classList.add("active-btn");
    easyLabel.classList.remove("active-btn");
    mediumLabel.classList.remove("active-btn");
    myInterval = setInterval(function () {
      createBubble(gameModes[2].hard);
    }, gameModes[2].hard.duration);
  }
};

//! Continue game
// const continueGame = () => {
//   score.innerHTML = "";
//   count = 0;

//   //! Game Continue
//   gameContinue = true;

//   //! When game is started disable start button
//   startBtn.disabled = true;
//   stopBtn.disabled = false;

//   //! Get username
//   while (!username || username.trim() === "") {
//     username = prompt("Enter username");
//   }

//   if (easy.checked) {
//     easyLabel.classList.add("active-btn");
//     hardLabel.classList.remove("active-btn");
//     mediumLabel.classList.remove("active-btn");
//     myInterval = setInterval(function () {
//       createBubble(gameModes[0].easy);
//     }, gameModes[0].easy.duration);
//   }
//   if (medium.checked) {
//     mediumLabel.classList.add("active-btn");
//     easyLabel.classList.remove("active-btn");
//     hardLabel.classList.remove("active-btn");
//     myInterval = setInterval(function () {
//       createBubble(gameModes[1].medium);
//     }, gameModes[1].medium.duration);
//   }
//   if (hard.checked) {
//     hardLabel.classList.add("active-btn");
//     easyLabel.classList.remove("active-btn");
//     mediumLabel.classList.remove("active-btn");
//     myInterval = setInterval(function () {
//       createBubble(gameModes[2].hard);
//     }, gameModes[2].hard.duration);
//   }
// };

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
  scoreBoard.innerHTML = "";
  createTable();
};

//! Create Player Table
const createTable = () => {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  players.map((player) => {
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");
    const tname = document.createElement("td");
    const tscore = document.createElement("td");
    tname.innerText = player.username;
    tscore.innerText = player.count;
    tr.appendChild(tname);
    tr.appendChild(tscore);
    tbody.appendChild(tr);
  });
};

createTable();
// startBtn.addEventListener("click", () => continueGame());
// startSignup.addEventListener("click", () => startGame());
signupForm.addEventListener("submit", (e) => startGame(e));
stopBtn.addEventListener("click", () => stopGame());
