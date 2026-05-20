let row = 9;
let col = 9;
let table = [];

const direction = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

for (let i = 0; i < row; i++) {
  const currentrow = [];
  for (let j = 0; j < col; j++) {
    currentrow.push({
      placed: false,
      value: 0,
    });
  }
  table.push(currentrow);
}

const box = document.getElementById("block");
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    const cell = document.createElement("button");
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.id = `${i}-${j}`;
    cell.classList.add("cell");
    if (j == 2 || j == 5) {
      cell.classList.add("border-right");
    }
    if (i == 2 || i == 5) {
      cell.classList.add("border-bottom");
    }
    box.appendChild(cell);
  }
}
let countElements = Math.floor(Math.random() * 81);

for (let i = 0; i < countElements; i++) {
  let choice = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let numchoice = choice[Math.floor(Math.random() * choice.length)];
  placeElements(numchoice);
}

function placeElements(numchoice) {
  let r = Math.floor(Math.random() * row);
  let c = Math.floor(Math.random() * col);
  let cell = document.getElementById(`${r}-${c}`);

  if (validPosition(r, c, numchoice)) {
    table[r][c].placed = true;
    table[r][c].value = numchoice;
    cell.textContent = numchoice;
  }
}

function validPosition(r, c, numchoice) {
  let val = true;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i == r && table[i][j].value == numchoice) {
        val = false;
      }
      if (j == c && table[i][j].value == numchoice) {
        val = false;
      }
      for (let k = 0; k < direction.length; k++) {
        let a,
          b = direction[k];
        if (
          i + a <= 8 &&
          i + a > 0 &&
          j + b <= 8 &&
          j + b > 0 &&
          table[i + a][j + b].value == numchoice
        ) {
          val = false;
        }
      }
    }
  }
  return val;
}

// document.getElementById("box").addEventListener("click", function (event) {});
