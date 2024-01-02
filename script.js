const cards = document.querySelectorAll('.card');
console.log('cards', cards);
const buttonPopup = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const popupText = document.querySelector('.popup__text');
const inp = document.querySelector('.input');
const rule = document.querySelector('.text');
const menu = document.querySelector('.menu');
console.log(menu);
const popupWinner = document.querySelector('.popup-winner');

let hasFlippedCard = false;
let firstCard, secondCard;
let boardLock = false; //поле не заблокировано для клика

let count = 0;

// function flipCard(e) {
//   console.log(e.target.parentElement);
//   console.log(this);
//   // this.classList.add('flip');
//   e.target.parentElement.classList.add('flip');
// }

setTimeout(function () {
  rule.classList.add('hidden');
  document.querySelector('.cards').classList.remove('hidden');
  menu.classList.remove('hidden');
}, 10000);

// document.addEventListener('keydown', function (event) {
//   if (event.code == 'KeyQ') {
//     if (event.code == 'KeyQ') {
//       document.querySelector('.cards').classList.remove('hidden');
//       menu.classList.remove('hidden');
//       console.log('Q');
//     }
//   }
// });

const flipCard = (e) => {
  if (boardLock) return; //останавливаем функцию
  const target = e.target.parentElement;
  if (target === firstCard) return;
  console.log(e.target.parentElement);

  target.classList.add('flip');
  console.log(target.dataset.sign);
  popup.classList.add('hidden');
  inp.value = ' ';
  if (!hasFlippedCard) {
    //first click
    //есть одна перевернутая карточка. Первая карточка === target
    hasFlippedCard = true;
    firstCard = target;
    console.log('first click', hasFlippedCard);
  } else {
    //second click
    hasFlippedCard = false;
    secondCard = target;
    console.log('second click');
    checkForMatch();
  }
};

// document.querySelector('.button').addEventListener('click', function (e) {
//   const input = document.querySelector('.input').value.toLowerCase();
//   // const inputRepl = input.slice('1', input.lenght);
//   console.log('input', input === 'fff');
// });

const checkForMatch = () => {
  // const isEqual = firstCard.dataset.sign === secondCard.dataset.sign;
  // isEqual ? disableCards() : unflipCards();
  if (firstCard.dataset.sign === secondCard.dataset.sign) {
    disableCards();
    console.log('Карточки равны');
    const flipCards = [];
    flipCards.push(firstCard, secondCard);
    console.log('flipCards', flipCards);
    count += flipCards.length;
    console.log('count', count);

    boardLock = true;

    document.querySelector('.button').addEventListener('click', function (e) {
      const input = document
        .querySelector('.input')
        .value.toLowerCase()
        .replace(' ', '');
      console.log('input', input);

      if (input === 'диез' && firstCard.dataset.sign === 'sharp') {
        console.log('правило диез');
        popup.classList.remove('hidden');
        console.log('popup', popup);
        boardLock = false;
        popupText.textContent = 'ДИЕЗ - знак повышения ноты на полутон';
      } else if (input === 'фермата' && firstCard.dataset.sign === 'fermata') {
        console.log('правило фермата');

        popup.classList.remove('hidden');
        boardLock = false;

        popupText.textContent =
          'ФЕРМАТА - знак увеличения длительности по своему усмотрению';
      } else if (input === 'бемоль' && firstCard.dataset.sign === 'flat') {
        console.log('правило бемоль');
        popup.classList.remove('hidden');
        boardLock = false;

        popupText.textContent = 'БЕМОЛЬ - знак понижения ноты на полутон';
      } else if (input === 'форте' && firstCard.dataset.sign === 'forte') {
        console.log('правило форте');
        popup.classList.remove('hidden');
        boardLock = false;
        popupText.textContent =
          'ФОРТЕ - знак, обозначающий, что играть надо громко';
      } else if (input === 'реприза' && firstCard.dataset.sign === 'reprise') {
        console.log('правило реприза');
        popup.classList.remove('hidden');
        boardLock = false;

        popupText.textContent = 'РЕПРИЗА - знак, обозначающий повтор';
      } else if (input === 'пиано' && firstCard.dataset.sign === 'piano') {
        console.log('правило пиано');
        popup.classList.remove('hidden');
        boardLock = false;

        popupText.textContent =
          'ПИАНО - знак, обозначающий, что играть надо тихо';
      } else {
        console.log('НЕВЕРНЫЙ ТЕРМИН');

        popup.classList.remove('hidden');
        popupText.textContent =
          'Этот знак называется иначе. Попробуй ввести другой термин';
      }

      if (
        count === cards.length &&
        (input === 'реприза' ||
          input === 'форте' ||
          input === 'пиано' ||
          input === 'фермата' ||
          input === 'диез' ||
          input === 'бемоль')
      ) {
        console.log('Победитель');

        document.body.style.backgroundImage = "url('./img/sun.jpg')";
        cards.forEach((card) => (card.style.backgroundColor = '#ebd654ed'));

        setTimeout(function () {
          popup.classList.add('hidden');
          popupWinner.classList.remove('hidden');
        }, 4000);
      }
    });
  } else {
    unflipCards();
    console.log('Карточки не равны');
  }
};

const disableCards = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
};

const unflipCards = () => {
  boardLock = true; //поле заблокировано
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    // boardLock = false; //поле разблокировано
  }, 1000);
};

const resetBoard = () => {
  // [hasFlippedCard, boardLock] = [false, false];
  // [firstCard, secondCard] = [null, null];
  hasFlippedCard = boardLock = false;
  firstCard = secondCard = null;
};

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
  const randomIndex = Math.floor(Math.random() * cards.length);
  console.log('randomIndex', randomIndex);
  card.style.order = randomIndex;
});

buttonPopup.addEventListener('click', function (event) {
  popup.classList.add('hidden');
});
