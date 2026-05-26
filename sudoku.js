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

let countElements = 20;
let choice = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let placedCount = 0;
placeElements();
function placeElements() {
  if (placedCount >= countElements) return;
  while (placedCount < countElements) {
    let r = Math.floor(Math.random() * row);
    let c = Math.floor(Math.random() * col);
    let num = choice[Math.floor(Math.random() * choice.length)];
    let cell = document.getElementById(`${r}-${c}`);
    if (!table[r][c].placed && validPosition(r, c, num)) {
      table[r][c].placed = true;
      table[r][c].value = num;
      cell.textContent = num;
      placedCount++;
    }
  }
}

function validPosition(r, c, numchoice) {
  for (let j = 0; j < col; j++) {
    if (table[r][j].value == numchoice) {
      return false;
    }
  }

  for (let i = 0; i < row; i++) {
    if (table[i][c].value == numchoice) {
      return false;
    }
  }

  let boxRow = Math.floor(r / 3) * 3;
  let boxCol = Math.floor(c / 3) * 3;

  for (let k = 0; k < direction.length; k++) {
    let [a, b] = direction[k];
    if (table[boxRow + a][boxCol + b].value == numchoice) {
      return false;
    }
  }

  return true;
}
document.getElementById("solve").addEventListener("click", () => {
  solve(0, 0);
});

function solve(row, col) {
  if (row == 9) {
    return true;
  }
  if (col == 9) {
    return solve(row + 1, 0);
  }
  if (table[row][col].placed) {
    return solve(row, col + 1);
  }
  let cell = document.getElementById(`${row}-${col}`);
  for (let i = 1; i <= choice.length; i++) {
    if (validPosition(row, col, i)) {
      table[row][col].placed = true;
      table[row][col].value = i;
      cell.textContent = i;
      if (solve(row, col + 1)) {
        return true;
      }
      table[row][col].value = 0;
      cell.textContent = "";
      table[row][col].placed = false;
    }
  }
  return false;
}
// document.getElementById("block").addEventListener("click", function (event) {
//   const cell = event.target;
//   let r = Number(cell.dataset.row);
//   let c = Number(cell.dataset.col);
//   selectedCell = cell;
//   selectedRow = r;
//   selectedCol = c;
//   cell.style.background = "#9EC3FF";
// });

// document.getElementById("buttons").addEventListener("click", function (event) {
//   const temp = event.target;
//   if (!table[selectedRow][selectedCol].placed) {
//     table[selectedRow][selectedCol].value = temp.innerHTML;
//     selectedCell.textContent = temp.innerHTML;
//   }
// });
