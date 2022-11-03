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

// Timers function som räknar tiden
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

// Körs spelet när nån knapp trycks
function onKeyPress(e) {
  // Spara ned användarens tangentval och omvandla till en gemen
  let letterPressed = e.key;
  letterPressed = letterPressed.toLowerCase();

  // Kontrollera om bokstaven användaren gissade på inte finns med i listan på bokstäverna som den redan gissat på
  // och tillåt enbart bokstäver
  if (
    !currentGuessed.includes(letterPressed) &&
    /^[a-ö]+$/i.test(letterPressed)
  ) {
    currentGuessed.push(letterPressed);

    // Starta timern när användaren skriver första bokstaven
    if (currentGuessed.length === 1) {
      startCounter();
    }

    drawLetter(letterPressed);

    // Om bokstaven användaren gissade på finns i det korrekta ordet
    if (currentWord.includes(letterPressed)) {
      // loopa igenom alla bokstäver i korrekt ord
      currentWord.forEach((letter, index) => {
        // Placera bokstaven på rätt plats
        if (letter === letterPressed) {
          document.querySelector(`[data-word-index='${index}']`).innerHTML =
            letter;

          // Kolla om man gissat rätt på alla bokstäver
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
      // Om man gissar på fel bokstav
    } else {
      // Hämta korrekt kroppsdel i rätt ordning
      const bodyPart = hangman.shift();
      figure.classList.add(bodyPart);

      // Om det inte finns några kroppsdelar kvar har man förlorat
      if (hangman.length === 0) {
        popupScreen(
          `Du förlorade! </br> Korrekt ord var: ${currentWord.join('')}`,
          'darkred'
        );
      }
    }
  }
}

// Rita ut alla bokstäver användaren gissat på hittills.
function drawLetter(guessedLetter) {
  const letters = document.querySelector('#letters');
  const letter = document.createElement('span');
  letter.innerHTML = guessedLetter;
  letters.append(letter);
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
