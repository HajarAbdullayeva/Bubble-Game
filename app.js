let board = document.querySelector(".board");
let stratBtn = document.querySelector(".start-btn");
let score = document.querySelector(".score");
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");

let count = 0;

// Create bubble
let createBubble = () => {
  let bubble = document.createElement("div");
  bubble.classList.add("bubble");
  board.appendChild(bubble);
  bubble.classList.add("active");

  // get board width and height
  let winWidth = board.offsetWidth;
  let winHeight = board.offsetHeight;

  randomTop = getRandomNumber(0, winHeight);
  randomLeft = getRandomNumber(0, winWidth);

  bubble.style.top = randomTop + "px";
  bubble.style.left = randomLeft + "px";

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  bubble.addEventListener("click", () => {
    bubble.classList.remove("active");
    count += 3;
    score.innerHTML = `<h1 class="score">Score: ${count} </h1>`;
  });
};

stratBtn.addEventListener("click", () => {
  if (easy.checked) {
    setInterval(function () {
      createBubble();
    }, 2000);
  }
  if (medium.checked) {
    setInterval(function () {
      createBubble();
    }, 1500);
  }
  if (hard.checked) {
    setInterval(function () {
      createBubble();
    }, 1000);
  }
});
