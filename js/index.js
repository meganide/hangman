//  För att toggla SVG:en

const figure = document.querySelector('figure');
const resetbutton = document.querySelector('button');
const mainContent = document.querySelector('main');
const popup = document.querySelector('.popup');

let hangman = ['scaffold', 'head', 'body', 'arms', 'legs'];

let words = [
  'glad',
  'spel',
  'javascript',
  'programmering',
  'gubbe',
  'nintendo',
  'snoop',
  'rapp',
  'psytrance',
];

let currentWord = [];
let currentGuessed = [];

function keyboardInput() {
  window.addEventListener('keypress', (e) => {
    if (!currentGuessed.includes(e.key)) {
      currentGuessed.push(e.key);
      drawLetter(e.key);

      if (currentWord.includes(e.key)) {
        currentWord.forEach((letter, index) => {
          if (letter === e.key) {
            document.querySelector(`[data-word-index='${index}']`).innerHTML =
              letter;
          }
        });
      } else {
        const bodyPart = hangman.shift();
        figure.classList.add(bodyPart);
        if (hangman.length === 0) {
          setTimeout(() => {
            popup.querySelector('h2').innerHTML = 'Du förlorade!';
            mainContent.classList.toggle('hide');
            popup.classList.toggle('hide');
            popup.style.background = 'darkred';
          }, 2000);
        }
      }
    }
  });
}

function randomizeWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = [...words[index]];
  words.splice(index, 1);
  drawBoxes();
  console.log(currentWord);
}

function drawBoxes() {
  const boxes = document.querySelector('#boxes');
  amountBoxes = currentWord.length;

  for (let index = 0; index < amountBoxes; index++) {
    let box = document.createElement('div');
    box.setAttribute('data-word-index', index);
    boxes.append(box);
  }
}

function deleteElements(parent, child) {
  const elements = document.querySelectorAll(`#${parent} ${child}`);
  elements.forEach((element) => {
    element.remove();
  });
}

function drawLetter(guessedLetter) {
  const letters = document.querySelector('#letters');
  const letter = document.createElement('span');
  letter.innerHTML = guessedLetter;
  letters.append(letter);
}

resetbutton.addEventListener('click', () => {
  resetGame();
  mainContent.classList.toggle('hide');
  popup.classList.toggle('hide');
});

function resetGame() {
  console.log('du förlorade');
  hangman = ['scaffold', 'head', 'body', 'arms', 'legs'];
  figure.className = '';
  currentGuessed = [];
  currentWord = [];
  deleteElements('boxes', 'div');
  deleteElements('letters', 'span');
  randomizeWord();
}

function main() {
  randomizeWord();
  keyboardInput();
}

main();
