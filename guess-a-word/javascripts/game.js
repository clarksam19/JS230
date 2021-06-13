const wordList = ['smithy', 'generative', 'infrastructure', 'patience', 'dictation'];

class Game {
  constructor() {
    this.words = wordList.slice();
    this.currentWord = this.randomWord();
    this.guessCount = 0;
    this.guesses = [];
    this.guessLimit = 6;
    this.displayWord();
    this.bindEventHandlers();
  }
  randomWord() {
    let randIndex = Math.floor(Math.random() * this.words.length);
    let result = this.words[randIndex];
    this.words.splice(randIndex, 1);
    return result ? result : alert('Sorry, no words left');
  }
  displayWord() {
    this.clearWord();
    for (let index = 0; index < this.currentWord.length; index++) {
      let blank = document.createElement('input');
      let blanks = document.getElementById('spaces');
      blanks.appendChild(blank);
    }
  }
  clearWord() {
    let blanks = document.getElementById('spaces');
    blanks.innerHTML = '';
  }
  checkGuess(e) {
    if (this.guessCount < this.guessLimit) {
      if (e.key >= 'a' && e.key <= 'z') {
        if (this.currentWord.split('').includes(e.key)) {
          if (!this.guesses.includes(e.key)) {
            let index = this.currentWord.split('').indexOf(e.key);
            let blanks = document.getElementById('spaces').children;
            let indeces = this.getIndecesOf(e.key);
            indeces.forEach(idx => blanks[idx].value = e.key);
            if (Array.from(blanks).every(blank => blank.value)) {
              document.body.classList.add('win');
              document.getElementById('message').textContent = 'You Win!'
            }
          }
        } else {
          this.guesses.push(e.key);
          this.guessCount += 1;
          this.displayGuesses();
          this.removeApple();
          if (this.guesses.length === this.guessLimit) {
            this.gameOver();
          }
        }
      }
    } else {
      this.gameOver()
    }
  }
  getIndecesOf(key) {
    let indeces = [];
    this.currentWord.split('').forEach((letter, idx) => {
      if (key === letter) {
        indeces.push(idx);
      }
    });

    return indeces;
  }
  bindEventHandlers() {
    document.addEventListener('keydown', this.checkGuess.bind(this));
    document.getElementById('replay').addEventListener('click', this.newGame.bind(this));
  }
  displayGuesses() {
    let guess = document.createElement('span');
    guess.textContent = this.guesses[this.guesses.length - 1];
    let guesses = document.getElementById('guesses');
    guesses.appendChild(guess);
  }
  removeApple() {
    let apples = document.getElementById('apples');
    apples.classList.remove(`guess_${this.guessCount - 1}`);
    apples.classList.add(`guess_${this.guessCount}`);
  }
  gameOver() {
    document.getElementById('message').textContent = 'Game Over';
    document.body.classList.add('lose');
  }
  newGame(e) {
    e.preventDefault();
    this.words = wordList.slice();
    this.currentWord = this.randomWord();
    this.guessCount = 0;
    this.guesses = [];
    document.getElementById('guesses').innerHTML = '';
    document.getElementById('apples').classList = '';
    document.getElementById('message').textContent = '';
    document.body.classList = '';
    this.displayWord();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let game = new Game();
})