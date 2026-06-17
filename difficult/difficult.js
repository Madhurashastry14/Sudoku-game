let row = 9;
let col = 9;

let timer = true;

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

const box = document.getElementById("block");

for (let i = 0; i < row; i++) {
  const currentrow = [];
  for (let j = 0; j < col; j++) {
    currentrow.push({
      placed: false,
      value: 0,
      temp: false,
    });
  }
  table.push(currentrow);
}

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

let initialCount = 5;
let choice = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let placedCount = 0;
placeElements();
function placeElements() {
  if (placedCount >= initialCount) return;
  while (placedCount < initialCount) {
    let r = Math.floor(Math.random() * row);
    let c = Math.floor(Math.random() * col);
    let num = choice[Math.floor(Math.random() * choice.length)];
    let cell = document.getElementById(`${r}-${c}`);
    if (!table[r][c].temp && validPosition(r, c, num)) {
      table[r][c].temp = true;
      table[r][c].value = num;
      placedCount++;
    }
  }
  //after placing 5 elements solves the whole board.
  solve(0, 0);
}

//to check valid cell
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

//solve function to solve the board recursively
function solve(row, col) {
  if (row == 9) {
    return true;
  }
  if (col == 9) {
    return solve(row + 1, 0);
  }
  if (table[row][col].temp) {
    return solve(row, col + 1);
  }
  let cell = document.getElementById(`${row}-${col}`);
  for (let i = 1; i <= choice.length; i++) {
    if (validPosition(row, col, i)) {
      table[row][col].temp = true;
      table[row][col].value = i;
      if (solve(row, col + 1)) {
        return true;
      }
      table[row][col].value = 0;
      table[row][col].temp = false;
    }
  }
  return false;
}

let result = document.getElementById("result");
let result_text = document.getElementById("result-text");
let result_subtext = document.getElementById("result-subtext");
let result_time_value = document.getElementById("result-time-value");
let result_moves_value = document.getElementById("result-moves-value");
let result_time = document.getElementById("result-time");
let result_moves = document.getElementById("result-moves");

// solve whole board
document.getElementById("solve").addEventListener("click", () => {
  if (lost) return;
  timer = false;
  displayAll();
});

//displays whole board
function displayAll() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.getElementById(`${i}-${j}`);
      if (table[i][j].temp) {
        cell.textContent = table[i][j].value;
        table[i][j].placed;
      }
    }
  }
}

let displayCount = 25;
let numberPlaced = 0;
let displayedCount = 0;

display();

//display some numbers
function display() {
  while (displayedCount < displayCount) {
    let r = Math.floor(Math.random() * row);
    let c = Math.floor(Math.random() * col);
    let cell = document.getElementById(`${r}-${c}`);
    if (table[r][c].placed) {
      return display();
    }
    if (table[r][c].temp) {
      cell.textContent = table[r][c].value;
      table[r][c].placed = true;
      cell.style.background = "#caccd0";
      displayedCount++;
    }
  }
}

//when clicked in the sudoku block
document.getElementById("block").addEventListener("click", function (event) {
  if (!timer) return;
  const cell = event.target;
  if (!cell.dataset.row) return;
  let r = Number(cell.dataset.row);
  let c = Number(cell.dataset.col);
  selectedCell = cell;
  selectedRow = r;
  selectedCol = c;
  if (table[r][c].placed) return;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let tempCell = document.getElementById(`${i}-${j}`);
      if (tempCell.style.background == "rgb(158, 195, 255)") {
        tempCell.style.background = "";
      }
    }
  }
  if (cell.style.background == "") cell.style.background = "#9EC3FF";
  else cell.style.background = "";
});

let move = document.getElementById("movenum");
let mistake = document.getElementById("mistakenum");
let mistakecount = 0;
//input number from keyboard
document.addEventListener("keydown", function (event) {
  if (!timer) return;
  let number = Number(event.key);
  if (number >= 1 && number <= 9) {
    if (!table[selectedRow][selectedCol].placed) {
      if (table[selectedRow][selectedCol].value == number) {
        table[selectedRow][selectedCol].placed = true;
        selectedCell.textContent = number;
        selectedCell.style.background = "";
        numberPlaced++;
        move.innerHTML = numberPlaced;
        mistake.innerHTML = mistakecount + "/3";
      } else {
        selectedCell.textContent = number;
        selectedCell.style.background = "#f36262";
        numberPlaced++;
        move.innerHTML = numberPlaced;
        mistakecount++;
        mistake.innerHTML = mistakecount + "/3";
      }
    }
  }
  win();
  lose();
});

//input number from the given button
document.getElementById("buttons").addEventListener("click", function (event) {
  if (!timer) return;
  if (lost) return;
  const temp = event.target;
  if (temp.tagName != "BUTTON") return;
  let numNow = Number(temp.textContent);

  if (!table[selectedRow][selectedCol].placed) {
    if (table[selectedRow][selectedCol].value == numNow) {
      table[selectedRow][selectedCol].placed = true;
      selectedCell.textContent = numNow;
      selectedCell.style.background = "";
      numberPlaced++;
      move.innerHTML = numberPlaced;
      mistake.innerHTML = mistakecount + "/3";
    } else {
      selectedCell.textContent = numNow;
      selectedCell.style.background = "#f36262";
      numberPlaced++;
      move.innerHTML = numberPlaced;
      mistakecount++;
      mistake.innerHTML = mistakecount + "/3";
    }
  }
  win();
  lose();
});

//win condition
function win() {
  if (isBoardComplete()) {
    result.style.display = "flex";
    result.style.flexDirection = "column";
    result_text.innerHTML = "You Won!";
    result_subtext.innerHTML = "Sudoku Solved";
    result_time_value.innerHTML =
      document.getElementById("minute").innerHTML +
      document.getElementById("second").innerHTML;
    result_moves_value.innerHTML = numberPlaced;
    timer = false;
  }
}
let lost = false;
function lose() {
  if (mistakecount >= 3) {
    result.style.display = "flex";
    result.style.flexDirection = "column";
    result_text.innerHTML = "You lost!";
    result_subtext.innerHTML = "Better luck next time";
    result_time_value.innerHTML =
      document.getElementById("minute").innerHTML +
      document.getElementById("second").innerHTML;
    result_moves_value.innerHTML = numberPlaced;
    lost = true;
    timer = false;
  }
}

//to check if the board is complete or not
function isBoardComplete() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!table[i][j].placed) {
        return false;
      }
    }
  }
  return true;
}

//reset logic
document.getElementById("reset").addEventListener("click", () => {
  if (lost) return;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.getElementById(`${i}-${j}`);
      table[i][j].temp = false;
      table[i][j].placed = false;
      table[i][j].value = 0;
      cell.textContent = "";
      cell.style.background = "";
    }
  }

  document.getElementById("minute").innerHTML = "00";
  document.getElementById("second").innerHTML = ":00";
  seconds = 0;
  minute = 0;
  mili = 0;
  result.textContent = "";
  numberPlaced = 0;
  placedCount = 0;
  placeElements();
  displayedCount = 0;

  result.style.display = "none";
  result_text.innerHTML = "none";
  result_subtext.innerHTML = "none";
  result_time_value.innerHTML =
    document.getElementById("minute").innerHTML +
    document.getElementById("second").innerHTML;
  result_moves_value.innerHTML = numberPlaced;
  result_time.style.display = "none";
  result_moves.style.display = "none";

  mistakecount = 0;
  lost = false;

  timer = true;
  watch();

  move.innerHTML = numberPlaced;
  display();
});

let pausenow = document.getElementById("pause");
document.getElementById("pause").addEventListener("click", () => {
  if (lost) return;
  if (pausenow.textContent == "Pause") {
    timer = false;
    pausenow.textContent = "Resume";
  } else {
    timer = true;
    pausenow.textContent = "Pause";
    watch();
  }
});

let playagain = document.getElementById("playagain");
let home = document.getElementById("home");

//playagain (same as reset)
playagain.addEventListener("click", () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.getElementById(`${i}-${j}`);
      table[i][j].temp = false;
      table[i][j].placed = false;
      table[i][j].value = 0;
      cell.textContent = "";
      cell.style.background = "";
    }
  }
  result.style.display = "none";
  document.getElementById("minute").innerHTML = "00";
  document.getElementById("second").innerHTML = ":00";
  seconds = 0;
  minute = 0;
  mili = 0;
  numberPlaced = 0;
  placedCount = 0;
  placeElements();
  displayedCount = 0;

  result_text.innerHTML = "none";
  result_subtext.innerHTML = "none";
  result_time.innerHTML =
    document.getElementById("minute").innerHTML +
    document.getElementById("second").innerHTML;
  result_moves.innerHTML = numberPlaced;
  move.innerHTML = numberPlaced;

  mistakecount = 0;
  lost = false;

  timer = true;
  watch();

  display();
});

//redirect to home
home.addEventListener("click", () => {
  window.location.href = "../index.html";
});

//timer logic
let stopwatch = document.getElementById("stopwatch");
let mili = 0;
let seconds = 0;
let minute = 0;
watch();

function watch() {
  if (timer) {
    mili++;
    if (mili >= 60) {
      seconds++;
      mili = 0;
    }
    if (seconds >= 60) {
      minute++;
      seconds = 0;
    }
    if (minute >= 60) {
      //over logic later
    }
    let min = minute;
    let sec = seconds;

    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min < 10) {
      min = "0" + min;
    }
    document.getElementById("minute").innerHTML = min;
    document.getElementById("second").innerHTML = ":" + sec;
    setTimeout(watch, 10);
  }
}
