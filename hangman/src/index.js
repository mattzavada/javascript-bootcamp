import Hangman from "./hangman";
import getPuzzle from "./requests";

const puzzleEl = document.querySelector("#puzzle");
const guessesEl = document.querySelector("#guesses");
const resetBtn = document.querySelector("#reset");
let game;

const startGame = async function () {
  let puzzle = await getPuzzle("2");
  game = new Hangman(puzzle, 6);
  renderGame();
};

const renderGame = function () {
  puzzleEl.textContent = game.puzzle;
  guessesEl.textContent = game.statusMessage;
};

window.addEventListener("keypress", (e) => {
  const guess = String.fromCharCode(e.charCode);
  game.makeGuess(guess);
  renderGame();
});

resetBtn.addEventListener("click", startGame);

startGame();

// getPuzzle("3")
//   .then((puzzle) => {
//     console.log(puzzle);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// getCurrentCountry()
//   .then((country) => {
//     console.log(country.name.common);
//   })
//   .then((error) => {
//     console.log(error);
//   });
