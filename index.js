let row = 3;
let col = 3;
let numbers = [5, 3, 7, 1, 9, 2, 8, 6, 4];
const box = document.getElementById("block");
let index = 0;
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.id = `${i}-${j}`;
    cell.textContent = numbers[index];
    index++;
    if (j === 2) {
      cell.classList.add("border-right");
    }
    if (i === 2) {
      cell.classList.add("border-bottom");
    }
    box.appendChild(cell);
  }
}

let play = document.getElementById("play");
let loading = document.getElementById("loading");
let text = document.getElementById("text");
let subtext = document.getElementById("subtext");
let divider = document.getElementById("divider");
let level = document.getElementById("level");

let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let difficult = document.getElementById("difficult");

let selectEasy = false;
let selectMedium = false;
let selectDifficult = false;

easy.addEventListener("click", function () {
  selectEasy = true;
  easy.style.background = "#56946e";
  medium.style.background = "#4eaa71";
  difficult.style.background = "#4eaa71";
});

medium.addEventListener("click", function () {
  selectMedium = true;
  medium.style.background = "#56946e";
  easy.style.background = "#4eaa71";
  difficult.style.background = "#4eaa71";
});

difficult.addEventListener("click", function () {
  selectDifficult = true;
  difficult.style.background = "#56946e";
  easy.style.background = "#4eaa71";
  medium.style.background = "#4eaa71";
});

play.addEventListener("click", function () {
  if (selectEasy) {
    loading.style.display = "flex";
    subtext.style.display = "none";
    box.style.display = "none";
    divider.style.display = "none";
    text.style.display = "none";
    play.style.display = "none";
    level.style.display = "none";
    setTimeout(() => {
      window.location.href = "../easy/easy.html";
    }, 1000);
  } else if (selectMedium) {
    loading.style.display = "flex";
    subtext.style.display = "none";
    box.style.display = "none";
    divider.style.display = "none";
    text.style.display = "none";
    play.style.display = "none";
    level.style.display = "none";
    setTimeout(() => {
      window.location.href = "../medium/medium.html";
    }, 1000);
  } else if (selectDifficult) {
    loading.style.display = "flex";
    subtext.style.display = "none";
    box.style.display = "none";
    divider.style.display = "none";
    text.style.display = "none";
    play.style.display = "none";
    level.style.display = "none";
    setTimeout(() => {
      window.location.href = "../difficult/difficult.html";
    }, 1000);
  }
});
