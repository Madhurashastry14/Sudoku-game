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

play.addEventListener("click", function () {
  loading.style.display = "flex";
  subtext.style.display = "none";
  box.style.display = "none";
  divider.style.display = "none";
  text.style.display = "none";
  play.style.display = "none";
  level.style.display = "none";
  setTimeout(() => {
    window.location.href = "../sudoku/sudoku.html";
  }, 1000);
});
