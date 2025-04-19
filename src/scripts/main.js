'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const table = document.querySelector('.game-field');
const btnGame = document.querySelector('.button');
const messageStart = document.querySelector('.message-start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const score = document.querySelector('.game-score');
let isLocked = true;

btnGame.addEventListener('click', function(e) {
  if (btnGame.classList.contains('start')) {
    if (game.getStatus() === 'idle') {
      isLocked = false;
      start();
      messageStart.classList.add('hidden');
    }
    btnGame.blur();
  }

  if (btnGame.classList.contains('restart')) {
    restartGame();
  }
});

document.addEventListener('keydown', function(e) {
  if (isLocked) {
    return;
  }

  const prevState = game.getState();

  if (e.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (e.key === 'ArrowRight') {
    game.moveRight();
  }

  if (e.key === 'ArrowUp') {
    game.moveUp();
  }

  if (e.key === 'ArrowDown') {
    game.moveDown();
  }

  drawState(prevState, game.getState());

  switch (game.getStatus()) {
    case 'playing':
      isLocked = false;
      btnGame.textContent = 'Restart';
      btnGame.classList.remove('start');
      btnGame.classList.add('restart');
      break;
    case 'win':
      messageWin.classList.remove('hidden');
      isLocked = true;
      break;
    case 'lose':
      messageLose.classList.remove('hidden');
      isLocked = true;
      break;
    case 'idle':
      isLocked = true;
      break;
  }
});

// Start the game
function start() {
  const prevState = game.getState();

  game.start();

  const state = game.getState();

  drawState(prevState, state);
}

function drawState(prevState, newState) {
  score.textContent = game.getScore();

  for (let i = 0; i < newState.length; i++) {
    for (let j = 0; j < newState[i].length; j++) {
      const cell = getCell(i, j);

      cell.className = 'field-cell';
      cell.textContent = '';

      if (newState[i][j] !== 0) {
        if (prevState[i][j] !== newState[i][j]) {
          cell.classList.add('field-cell--animation');
        }
        cell.classList.add('field-cell--' + newState[i][j]);
        cell.textContent = newState[i][j].toString();
      }
    }
  }
}

function getCell(numRow, numCol) {
  const rows = table.querySelectorAll('.field-row');

  return rows[numRow].querySelectorAll('.field-cell')[numCol];
}

function restartGame() {
  const prevState = game.getState();

  game.restart();
  drawState(prevState, game.getState());
  btnGame.textContent = 'Start';
  btnGame.classList.remove('restart');
  btnGame.classList.add('start');
  messageStart.classList.remove('hidden');
  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');
  btnGame.blur();
}
