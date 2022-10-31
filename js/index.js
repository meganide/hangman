//  För att toggla SVG:en
/* document.querySelector('figure').classList.add('scaffold');
document.querySelector('figure').classList.add('head');
document.querySelector('figure').classList.add('body');
document.querySelector('figure').classList.add('arms');
document.querySelector('figure').classList.add('legs'); */

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

let currentWord = '';
let currentGuessed = [];


function keyboardInput() {
  console.log(currentWord);
  window.addEventListener('keypress', (e) => {
    if (!currentGuessed.includes(e.key)) {
      currentGuessed.push(e.key);
      drawLetter(e.key);
      if (currentWord.includes(e.key)) {
        let currentWordIndex = [...currentWord];
        currentWordIndex.forEach((letter, index) => {
          if(letter === e.key) {
            document.querySelector(`[data-word-index='${index}']`).innerHTML = letter
          }
        })

      }
    }
  });
}

function randomizeWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = words[index];
  words.splice(index, 1);
  drawBoxes();
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

function drawLetter(guessedLetter) {
  const letters = document.querySelector('#letters');
  const letter = document.createElement('span');
  letter.innerHTML = guessedLetter;
  letters.append(letter);
}

function main() {
  randomizeWord();
  keyboardInput();
}

main();
