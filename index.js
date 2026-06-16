let play = document.getElementById("play");
let loading = document.getElementById("loading");
let text = document.getElementById("text");
let container = document.getElementById("container");

play.addEventListener("click", function () {
  loading.style.display = "flex";
  text.style.display = "none";
  play.style.display = "none";
  setTimeout(() => {
    window.location.href = "../sudoku/sudoku.html";
  }, 1000);
});
