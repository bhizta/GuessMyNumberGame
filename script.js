'use strict';
let secretNumber;
//Life or score
let life = 20;
//Game state
let state = 1;
let highScore = 0;
function RNG() {
  //Random number generator
  let newSecretNumber = Math.trunc(Math.random() * 20) + 1;
  if (!secretNumber) {
    secretNumber = newSecretNumber;
  } else {
    while (secretNumber === newSecretNumber) {
      newSecretNumber = Math.trunc(Math.random() * 20) + 1;
    }
    secretNumber = newSecretNumber;
  }
}
function ChangeBackground(x) {
  document.querySelector('body').style.backgroundColor = x;
}
function DisplayMessage(x) {
  document.querySelector('.message').textContent = x;
}
function DisplayNumber(x) {
  document.querySelector('.number').textContent = x;
}
RNG();
document.querySelector('.check').addEventListener('click', function () {
  //Game state check
  if (state === 1) {
    const guess = Number(document.querySelector('.guess').value);
    //Check if no number is input
    if (!guess) {
      DisplayMessage('No number 😡');
    }
    //Check if the input number is out of range
    else if (guess > 20 || guess < 0) {
      DisplayMessage('Please input between 1-20!');
    }
    //When player wins the game
    else if (guess === secretNumber) {
      DisplayMessage('Correct! 🐴');
      ChangeBackground('#60b347');
      DisplayNumber(secretNumber);
      document.querySelector('.number').style.width = '30rem';
      state = 0;
      if (highScore < life) highScore = life;
      document.querySelector('.highscore').textContent = highScore;
    }
    //When guess is too low or too high
    else if (guess !== secretNumber) {
      DisplayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      life--;
    }
    document.querySelector('.score').textContent = life;
    //When player loses the game
    if (life < 1) {
      DisplayMessage('You Lose!');
      ChangeBackground('#e61515');
      DisplayNumber('LOSE');
      document.querySelector('.number').style.width = '30rem';
      state = 0;
    }
  } else {
    DisplayMessage('Press "Again!" button!');
  }
});
document.querySelector('.again').addEventListener('click', function () {
  //Again or reset button
  if (state === 0) {
    life = 20;
    RNG();
    DisplayMessage('Start guessing...');
    document.querySelector('.score').textContent = life;
    DisplayNumber('?');
    document.querySelector('.guess').value = '';
    ChangeBackground('#222');
    document.querySelector('.number').style.width = '15rem';
    state = 1;
  }
});
