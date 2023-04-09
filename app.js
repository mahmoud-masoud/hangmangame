const svg = document.querySelector('svg');
let manParts = svg.querySelectorAll('*');
const container = document.querySelector('.container');
const wordInput = document.querySelector('.word__input');
const wrongLetters = document.querySelector('.wrong__letters');
const msg = document.querySelector('.msg');
const msgBtn = document.querySelector('.play__again');
const overlay = document.querySelector('.overlay');
const warningMsg = document.querySelector('.warning__msg');
const keyboard = document.querySelector('.keyboard');

manParts = [...manParts].splice(4);
const words = ['windows', 'development', 'react', 'nodejs', 'underthehood'];

let counter = 6;
let manPartsCounter = 0;
let letters = [];
let wordLetters;
let text = [];

let randomNum = Math.floor(Math.random() * words.length);
let randomWord = words[randomNum];

function starting() {
  spans();
  // Check if user is using a mobile browser
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    keyboard.style.display = 'flex';
    keyboard.addEventListener('click', (e) => {
      if (e.target.classList[0] == 'key') {
        let letter = e.target.innerText;
        if (!counter <= 0) {
          check(letter);
          win();
        } else {
          lost();
        }
      }
    });
  } else {
    document.addEventListener('keydown', (e) => {
      let letter = e.code[3].toLowerCase();
      if (!counter <= 0) {
        check(letter);
        win();
      } else {
        lost();
      }
    });
  }
}

starting();

function spans() {
  let nums = randomWord.length;
  for (let i = 0; i < nums; i++) {
    const span = document.createElement('span');
    span.classList.add('word__place');
    wordInput.appendChild(span);
  }
}

function domElms(letter) {
  wordLetters = wordInput.querySelectorAll('span');
  [...randomWord].forEach((item, index) => {
    if (letter == item) {
      Array.from((wordLetters[index].innerText = letter));
      letters = [...wordLetters]
        .map((item) => {
          return item.innerText;
        })
        .filter((item) => {
          return !item == '';
        });
    }
  });
}

function manBody() {
  manParts[manPartsCounter].style.display = 'block';
  manPartsCounter++;
}

msgBtn.addEventListener('click', () => {
  msg.style.display = 'none';
  overlay.style.display = 'none';
});

function win() {
  if (letters.length === randomWord.length) {
    msg.style.display = 'block';
    overlay.style.display = 'block';
    const p = msg.querySelector('p');
    p.innerText = 'Congratulations You won 🎉😎';
  }
}

function lost() {
  msg.style.display = 'block';
  overlay.style.display = 'block';
  const p = msg.querySelector('p');
  p.innerText = 'Unfortunately you lost. 😕';
}

function clear() {
  counter = 6;
  manPartsCounter = 0;
  letters = [];
  text = [];
  randomNum = Math.floor(Math.random() * words.length);
  randomWord = words[randomNum];
  wordInput.innerHTML = '';
  wrongLetters.innerText = '';
  manParts.forEach((part) => {
    part.style.display = 'none';
  });
  starting();
}

function check(letter) {
  text = [...wrongLetters.innerText];
  if (letters.includes(letter) || text.includes(letter)) {
    warningMsg.classList.add('show');
    warningMsg.addEventListener('animationend', () => {
      warningMsg.classList.remove('show');
    });
  } else if ([...randomWord].includes(letter)) {
    domElms(letter);
  } else if (
    ![...randomWord].includes(letter) &&
    letters.length !== randomWord.length
  ) {
    counter--;
    wrongLetters.innerText += letter;
    manBody();
  }
}

msgBtn.addEventListener('click', () => {
  clear();
});
