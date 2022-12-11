//Elementos del DOM

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");

let winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let winningMessageElement = document.getElementById("winningMessage");

let restartButton = document.getElementById("restartButton");

let jugarButton = document.getElementById('jugar');

let player1Name = document.getElementById('name1');
let player2Name = document.getElementById('name2');


let startingMessageElement = document.getElementById('startingMessage');



let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);



//Event listener para las celdas

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);

    cell.addEventListener("click", handleClick, { once: true });
  });

  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentCLass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  // Poner marca
  placeMark(cell, currentCLass);
  //Chequear victoria

  if (checkWin(currentCLass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }

  //Chequear empate
  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = `Empate!`;
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} gana!`;
    }

    winningMessageElement.classList.add("show");
  }

  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
      );
    });
  }
}

let placeMark = (cell, currentCLass) => {
  let newImg = document.createElement("img");
  newImg.classList.add("mark");

  cell.classList.add(currentCLass);

  if (currentCLass == CIRCLE_CLASS) {
    newImg.setAttribute("src", "./imgs/circle.png");
    cell.append(newImg);
  } else {
    newImg.setAttribute("src", "./imgs/candy.png");
    cell.append(newImg);
  }
};

let swapTurns = () => {
  circleTurn = !circleTurn;
};

let checkWin = (currentCLass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentCLass);
    });
  });
};
