// ************************************* Variables *************************************
const figure = document.querySelector('figure');
const resetbutton = document.querySelector('button');
const mainContent = document.querySelector('main');
const popup = document.querySelector('.popup');

let time = 60;
let countInterval;

let hangman = ['scaffold', 'head', 'body', 'arms', 'legs'];

let currentWord = [];
let currentGuessed = [];

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

// ************************************* Functions *************************************
function randomizeWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = [...words[index]];
  words.splice(index, 1);
  drawLetterUnderLine();
}

// Skapas en ledigt plats
function drawLetterUnderLine() {
  const boxes = document.querySelector('#boxes');
  amountBoxes = currentWord.length;

  for (let index = 0; index < amountBoxes; index++) {
    let box = document.createElement('div');
    box.setAttribute('data-word-index', index);
    boxes.append(box);
  }
}

function startCounter() {
  countInterval = setInterval(counter, 1000);
}

// Räknar tiden
function counter() {
  time--;
  document.getElementById('counter').innerHTML = time;

  if (time === 0) {
    popupScreen(`Tiden gick ut! </br> Korrekt ord var: ${currentWord.join('')}`, 'darkred');
  }
}

// Kör spelet när nån knapp trycks
function onKeyPress(e) {
  let letterPressed = e.key;
  letterPressed = letterPressed.toLowerCase(); // Spara ned användarens tangentval och omvandla till en gemen

  if (!currentGuessed.includes(letterPressed) && /^[a-ö]+$/i.test(letterPressed)) {
    currentGuessed.push(letterPressed);
    if (currentGuessed.length === 1) {
      startCounter(); // Starta timern när användaren skriver första bokstaven
    }
    drawUsedLetter(letterPressed);
    drawCorrectLetter(letterPressed);
  }
}

// Rita ut alla bokstäver användaren gissat på hittills.
function drawUsedLetter(guessedLetter) {
  const letters = document.querySelector('#letters');
  const letter = document.createElement('span');
  letter.innerHTML = guessedLetter;
  letters.append(letter);
}

// Rita ut bokstaven på rätt plats om man gissat rätt
function drawCorrectLetter(letterPressed) {
  if (currentWord.includes(letterPressed)) {
    currentWord.forEach((letter, index) => {
      if (letter === letterPressed) {
        document.querySelector(`[data-word-index='${index}']`).innerHTML = letter; // Placera bokstaven på rätt plats
        checkIfPlayerWin();
      }
    });
  } else {
    const bodyPart = hangman.shift();
    figure.classList.add(bodyPart);
    if (hangman.length === 0) {
      popupScreen(`Du förlorade! </br> Korrekt ord var: ${currentWord.join('')}`, 'darkred');
    }
  }
}

// Kontrollera om spelaren vunnit
function checkIfPlayerWin() {
  let allCorrect = [];
  currentWord.forEach((char) => {
    const charIsInLetterField = currentGuessed.includes(char);
    allCorrect.push(charIsInLetterField);
  });

  if (!allCorrect.includes(false)) {
    popupScreen('Du vann!', 'darkgreen');
  }
}

// meddelande kommer om man har vunnit eller förlorat
function popupScreen(text, color) {
  document.getElementById('counter').innerHTML = '60';
  clearInterval(countInterval);
  window.removeEventListener('keypress', onKeyPress);
  popup.querySelector('h2').innerHTML = text;
  mainContent.classList.toggle('hide');
  popup.classList.toggle('hide');
  popup.style.background = color;
}

// Resetta alla variabler och hämta nytt random ord.
function resetGame() {
  hangman = ['scaffold', 'head', 'body', 'arms', 'legs'];
  figure.className = '';
  currentGuessed = [];
  currentWord = [];
  deleteElements('boxes', 'div');
  deleteElements('letters', 'span');
  randomizeWord();
}

//Används för att ta bort bokstäver som användare har matat in
function deleteElements(parent, child) {
  const elements = document.querySelectorAll(`#${parent} ${child}`);
  elements.forEach((element) => {
    element.remove();
  });
}

//************************************* Event Listeners *************************************
window.addEventListener('keypress', onKeyPress);

resetbutton.addEventListener('click', () => {
  resetGame();
  window.addEventListener('keypress', onKeyPress);
  mainContent.classList.toggle('hide');
  popup.classList.toggle('hide');
  time = 60;
});

// ************************************* Function Calls *************************************
randomizeWord();
