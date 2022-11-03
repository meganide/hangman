//  För att toggla SVG:en

const figure = document.querySelector('figure');
const resetbutton = document.querySelector('button');
const mainContent = document.querySelector('main');
const popup = document.querySelector('.popup');
let countInterval;

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
  'flaggstång',
  'transkibera',
  'absorbera',
  'antagonist',
];

let currentWord = [];
let currentGuessed = [];

window.addEventListener('keypress', onKeyPress);

function onKeyPress(e) {
  if (!currentGuessed.includes(e.key)) {
    currentGuessed.push(e.key);
    if (currentGuessed.length === 1) {
      startCounter();
    }
    drawLetter(e.key);
    console.log(currentGuessed);

    if (currentWord.includes(e.key)) {
      currentWord.forEach((letter, index) => {
        if (letter === e.key) {
          document.querySelector(`[data-word-index='${index}']`).innerHTML =
            letter;

          let allCorrect = [];
          currentWord.forEach((char) => {
            const bool = currentGuessed.includes(char);
            allCorrect.push(bool);
          });
          if (!allCorrect.includes(false)) {
            popupScreen('Du vann!', 'darkgreen');
          }
        }
      });
    } else {
      const bodyPart = hangman.shift();
      figure.classList.add(bodyPart);
      if (hangman.length === 0) {
        popupScreen(
          `Du förlorade! </br> Korrekt ord var: ${currentWord.join('')}`,
          'darkred'
        );
      }
    }
  }
}

let time = 60;



function startCounter() {
  countInterval = setInterval(counter, 1000);
}

function counter() {
  time--;
  document.getElementById('counter').innerHTML = time;

  if (time === 0) {
    popupScreen(
      `Tiden gick ut! </br> Korrekt ord var: ${currentWord.join('')}`,
      'darkred'
    );
  }
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

function popupScreen(text, color) {
  document.getElementById('counter').innerHTML = "";
  clearInterval(countInterval);
  window.removeEventListener('keypress', onKeyPress);
  popup.querySelector('h2').innerHTML = text;
  mainContent.classList.toggle('hide');
  popup.classList.toggle('hide');
  popup.style.background = color;
}

resetbutton.addEventListener('click', () => {
  resetGame();
  window.addEventListener('keypress', onKeyPress);
  mainContent.classList.toggle('hide');
  popup.classList.toggle('hide');
  time = 60;
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

randomizeWord();
