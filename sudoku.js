// 2. implementations of erase,undo and hint options.
// 3. confirmation after clicking solve or reset.

let row = 9;
let col = 9;
let timer = true;

let table = []; // 9x9 box
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
    const cell = document.createElement("button"); // each cell of sudoku
    cell.dataset.row = i; // row number
    cell.dataset.col = j; // column number
    cell.id = `${i}-${j}`; // id(row-col)
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
  // place 5 ele initially in random row and column with random number
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
    // to check if same value appears in column
    if (table[r][j].value == numchoice) {
      return false;
    }
  }

  for (let i = 0; i < row; i++) {
    // to check if same value appears in row
    if (table[i][c].value == numchoice) {
      return false;
    }
  }

  let boxRow = Math.floor(r / 3) * 3;
  let boxCol = Math.floor(c / 3) * 3;

  // to check if same value appears in 3x3 box
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

let solvebutton = document.getElementById("solve");

solvebutton.addEventListener("click", () => {
  if (lost) return;
  const confirmsolve = confirm(
    "Are you sure you want to solve the whole sudoku board?",
  );
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
        table[i][j].placed = true;
      }
    }
  }
}

let displayCount = 45;
let numberPlaced = 0;
let displayedCount = 0;

display();

//display some numbers for sudoku problem
function display() {
  while (displayedCount < displayCount) {
    let r = Math.floor(Math.random() * row); // take random row
    let c = Math.floor(Math.random() * col); // take random column
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
box.addEventListener("click", function (event) {
  if (!timer) return;
  const cell = event.target;
  if (!cell.dataset.row) return; // if its not a row then return
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
  else if ((cell.style.background = "#f36262"))
    cell.style.background = "#f36262";
});

let move = document.getElementById("movenum");
let mistake = document.getElementById("mistakenum");
let mistakecount = 0;

//input number from keyboard
document.addEventListener("keydown", function (event) {
  if (!timer) return;
  let number = Number(event.key);
  if (number >= 1 && number <= 9) {
    table[selectedRow][selectedCol].value = 0;
    if (validPosition(selectedRow, selectedCol, number)) {
      table[selectedRow][selectedCol].value = number;
      table[selectedRow][selectedCol].placed = true;
      selectedCell.textContent = number;
      selectedCell.style.background = "";
      numberPlaced++;
      move.innerHTML = numberPlaced;
      mistake.innerHTML = mistakecount + "/3";
    } else {
      selectedCell.textContent = number;
      selectedCell.style.background = "#f36262";
      move.innerHTML = numberPlaced;
      mistakecount++;
      mistake.innerHTML = mistakecount + "/3";
    }
  }
  win();
  lose();
});

let buttons = document.getElementById("buttons");
//input number from the given button
buttons.addEventListener("click", function (event) {
  if (!timer) return;
  if (lost) return;
  const temp = event.target;
  if (temp.tagName != "BUTTON") return;
  let numNow = Number(temp.textContent);
  table[selectedRow][selectedCol].value = 0;
  if (validPosition(selectedRow, selectedCol, numNow)) {
    table[selectedRow][selectedCol].value = numNow;
    table[selectedRow][selectedCol].placed = true;
    selectedCell.textContent = numNow;
    selectedCell.style.background = "";
    numberPlaced++;
    move.innerHTML = numberPlaced;
    mistake.innerHTML = mistakecount + "/3";
  } else {
    selectedCell.textContent = numNow;
    selectedCell.style.background = "#f36262";
    move.innerHTML = numberPlaced;
    mistakecount++;
    mistake.innerHTML = mistakecount + "/3";
  }
  win();
  lose();
});

let result = document.getElementById("result");
let result_text = document.getElementById("result-text");
let result_subtext = document.getElementById("result-subtext");
let result_time_value = document.getElementById("result-time-value");
let result_moves_value = document.getElementById("result-moves-value");

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

//reset and playagain
function newGame() {
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
  totalsec = 0;
  numberPlaced = 0;
  placedCount = 0;
  placeElements();
  displayedCount = 0;

  result.style.display = "none";
  result_text.innerHTML = "none";
  result_subtext.innerHTML = "none";
  result_time_value.innerHTML = "none";
  result_moves_value.innerHTML = "none";

  mistakecount = 0;
  mistake.innerHTML = mistakecount + "/3";
  lost = false;
  timer = true;

  move.innerHTML = numberPlaced;
  display();
}
//reset
document.getElementById("reset").addEventListener("click", () => {
  const confirmreset = confirm("Are you sure you want to reset?");
  newGame();
});
let features = document.getElementById("features");
let pausenow = document.getElementById("pause");
let pausebox = document.getElementById("pausebox");

let timeroption = document.getElementById("timesection");
let mistakeoption = document.getElementById("mistakesection");
let movesoption = document.getElementById("movesection");
document.getElementById("pause").addEventListener("click", () => {
  if (lost) return;

  timer = false;
  box.style.display = "none";
  buttons.style.display = "none";
  features.style.display = "none";
  timeroption.style.display = "none";
  mistakeoption.style.display = "none";
  movesoption.style.display = "none";
  pausebox.style.display = "flex";
});

let resume = document.getElementById("resume");
resume.addEventListener("click", () => {
  timer = true;
  box.style.display = "grid";
  buttons.style.display = "flex";
  features.style.display = "flex";
  timeroption.style.display = "flex";
  mistakeoption.style.display = "flex";
  movesoption.style.display = "flex";
  pausebox.style.display = "none";
});

let playagain = document.getElementById("playagain");
let home = document.getElementById("home");

//playagain (same as reset)
document.getElementById("playagain").addEventListener("click", newGame);

//redirect to home
home.addEventListener("click", () => {
  window.location.href = "../index.html";
});

//timer logic
let totalsec = 0;

function watch() {
  if (!timer) return;

  totalsec++;
  const minutes = Math.floor(totalsec / 60);
  const seconds = totalsec % 60;
  document.getElementById("minute").innerHTML = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("second").innerHTML =
    ":" + String(seconds).padStart(2, "0");

  if (totalsec == 60 * 60) {
    timeup();
  }
}

function timeup() {
  timer = false;

  result.style.display = "flex";
  result.style.flexDirection = "column";
  result_text.innerHTML = "Time's Up!";
  result_subtext.innerHTML = "You ran out of time.";
  result_time_value.innerHTML =
    document.getElementById("minute").innerHTML +
    document.getElementById("second").innerHTML;
  result_moves_value.innerHTML = numberPlaced;
}

// runs watch every second
setInterval(watch, 1000);
