class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = "Playing";
  }
  get puzzle() {
    let puzzle = "";

    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === " ") {
        puzzle += letter;
      } else {
        puzzle += "*";
      }
    });

    return puzzle;
  }

  calculateStatus() {
    //Iterate each item in word array to see if it is included in the guesses. If one letter is missing return false
    const finished = this.word.every(
      (letter) => this.guessedLetters.includes(letter) || letter === " "
    );

    if (this.remainingGuesses === 0) {
      this.status = "Failed";
    } else if (finished === true) {
      this.status = "Finished";
    } else {
      this.status = "Playing";
    }
  }

  get statusMessage() {
    if (this.status === "Playing") {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === "Failed") {
      return `Nice try! The word was ${this.word.join("")}.`;
    } else {
      return `Great work! You guessed the word!`;
    }
  }

  makeGuess(guess) {
    guess = guess.toLowerCase();

    // verify that letter hasn't already been guessed
    const isUnique = !this.guessedLetters.includes(guess);
    // check if letter appears in word
    const isIncorrectGuess = !this.word.includes(guess);

    if (this.status !== "Playing") {
      return;
    }
    if (isUnique) {
      this.guessedLetters = [...this.guessedLetters, guess];
    }

    if (isUnique && isIncorrectGuess) {
      this.remainingGuesses--;
    }
    this.calculateStatus();
  }
}

export { Hangman as default };
