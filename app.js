const signup = document.querySelector(".signup");
const signupForm = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const signupEasy = document.querySelector("#signup-easy");
const signupMedium = document.querySelector("#signup-medium");
const signupHard = document.querySelector("#signup-hard");
const signupEasyLabel = document.querySelector("#signup-easy-label");
const signupMediumLabel = document.querySelector("#signup-medium-label");
const signupHardLabel = document.querySelector("#signup-hard-label");

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
const showTable = document.querySelector(".show-table");
const tableContainer = document.querySelector(".table-container");
const table = document.querySelector("table");
const resetTable = document.querySelector(".reset-table");
const myTbody = document.querySelector("tbody");

let count = 0;
let username;
let gameContinue = false;
let myInterval;
let bubbleVoice = new Audio("./bubble-bursting-popping.mp3");
let players = JSON.parse(localStorage.getItem("players")) || [];

let gameModes = [
    { easy: { duration: 500, incrementCount: 1 } },
    { medium: { duration: 400, incrementCount: 2 } },
    { hard: { duration: 200, incrementCount: 3 } },
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
    let winWidth = board.clientWidth - 40; //--> width content-box
    let winHeight = board.clientHeight - 40; //--> height content-box

    console.log(winHeight);
    console.log(winWidth);

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
    signupEasy.checked = "checked";
    signupEasyLabel.classList.add("active-btn");
});

//! Activate level
signupEasy.addEventListener("click", () => {
    signupEasyLabel.classList.add("active-btn");
    signupMediumLabel.classList.remove("active-btn");
    signupHardLabel.classList.remove("active-btn");
});
signupMedium.addEventListener("click", () => {
    signupMediumLabel.classList.add("active-btn");
    signupEasyLabel.classList.remove("active-btn");
    signupHardLabel.classList.remove("active-btn");
});
signupHard.addEventListener("click", () => {
    signupHardLabel.classList.add("active-btn");
    signupEasyLabel.classList.remove("active-btn");
    signupMediumLabel.classList.remove("active-btn");
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
    container.style.display = "block";

    //! When game is started disable start button
    startBtn.disabled = true;
    stopBtn.disabled = false;

    if (signupEasy.checked) {
        easyLabel.classList.add("active-btn");
        hardLabel.classList.remove("active-btn");
        mediumLabel.classList.remove("active-btn");
        myInterval = setInterval(function () {
            createBubble(gameModes[0].easy);
        }, gameModes[0].easy.duration);
    }
    if (signupMedium.checked) {
        mediumLabel.classList.add("active-btn");
        easyLabel.classList.remove("active-btn");
        hardLabel.classList.remove("active-btn");
        myInterval = setInterval(function () {
            createBubble(gameModes[1].medium);
        }, gameModes[1].medium.duration);
    }
    if (signupHard.checked) {
        hardLabel.classList.add("active-btn");
        easyLabel.classList.remove("active-btn");
        mediumLabel.classList.remove("active-btn");
        myInterval = setInterval(function () {
            createBubble(gameModes[2].hard);
        }, gameModes[2].hard.duration);
    }
};

//! Continue game
const continueGame = () => {
    score.innerHTML = "";
    count = 0;

    //! Game Continue
    gameContinue = true;

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

//! Write Local Storage
const createUsers = () => {
    players.push({ username, count });
    localStorage.setItem("players", JSON.stringify(players));
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

//! Stop game
const stopGame = () => {
    gameContinue = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    board.innerHTML = "";
    createUsers();
    clearInterval(myInterval);
    myTbody.innerHTML = "";
    createTable();
};

//! Show Table
showTable.addEventListener("click", () => {
    tableContainer.classList.toggle("active-table");
});

//! Reset LocalStorage
resetTable.addEventListener("click", () => {
    localStorage.clear();
    myTbody.innerHTML = "";
    createTable();
});

createTable();
signupForm.addEventListener("submit", (e) => startGame(e));
startBtn.addEventListener("click", () => continueGame());
stopBtn.addEventListener("click", () => stopGame());
