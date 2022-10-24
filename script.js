'use strict';
//selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions

let currentScore, activePlayer, score, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');

  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//btn rolling functionallity

btnRoll.addEventListener('click', function () {
  //1.generate random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice roll
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next  player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //adding current score to total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //if player wins
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEL.classList.add('hidden');

      playing = false;
    } else {
      //switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);

