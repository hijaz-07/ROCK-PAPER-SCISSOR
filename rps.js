

let score = JSON.parse(localStorage.getItem('score')) || {
  Losses: 0,
  Wins: 0,
  Ties: 0
};


/*if (score === null) {
  score = {
    Losses: 0,
    Wins: 0,
    Ties: 0
  };
}*/

/*
addEventListener('keydown', (event) => {
  console.log(event.key);
});*/

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  if (score.Losses > 0 || score.Wins > 0 || score.Ties > 0) {
    resetScore();
  }
  else {
    alert(`Can't reset`);
  }
  
});

addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    if (score.Losses > 0 || score.Wins > 0 || score.Ties > 0) {
      resetScore();
    }
    else {
      alert(`Can't reset`);
    }
    //resetScore();
  }
});

function resetScore() {
  const innerValue = document.querySelector('.js-div');
  const html = `
  <div class="score-sentence">Are you sure you want to reset the score?</div>
  <button class="yes-button js-yes-button">Yes</button>
  <button class="no-button js-no-button">No</button>
  `;
  if (score.Losses > 0 || score.Wins > 0 || score.Ties > 0) {
     innerValue.innerHTML = html;
  }

  /*score.Losses = 0;
  score.Wins = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();*/

  const yesVar = document.querySelector('.js-yes-button');
  const noVar = document.querySelector('.js-no-button');

  yesVar.addEventListener('click', () => {
    localStorage.removeItem('score');
    innerValue.innerHTML = '';
    score.Losses = 0;
    score.Wins = 0;
    score.Ties = 0;
    updateScoreElement();
  });
  noVar.addEventListener('click', () => {
    innerValue.innerHTML = '';
  });
}


updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay(); 
});
 

addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay();
  }
});



function autoPlay () {
  if (!isAutoPlaying) {
    updateScoreElement();
    document.querySelector('.js-auto-play-button').innerText = 'Stop Play';
    intervalId = setInterval(function() {
      isAutoPlaying = true;
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
  } else {
    document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
}

function updateScoreElement() {
  document.querySelector('.js-score').innerText = 
    `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
};


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {

    
    if (computerMove === 'rock') {
      result = 'Tie';
    }
    else if (computerMove === 'paper') {
      result = 'You lose';
    }
    else if (computerMove === 'scissors') {
      result = 'You win';
    }
  }

  else if (playerMove === 'paper') {


    if (computerMove === 'paper') {
      result = 'Tie';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose';
    }
    else if (computerMove === 'rock') {
      result = 'You win';
    }
  }

  else if (playerMove === 'scissors') {


    if (computerMove === 'scissors') {
      result = 'Tie';
    }
    else if (computerMove === 'rock') {
      result = 'You lose';
    }
    else if (computerMove === 'paper') {
      result = 'You win';
    }
  }

  if (result === 'You win') {
    score.Wins += 1;
  }
  else if (result === 'You lose') {
    score.Losses += 1;
  }
  else if (result === 'Tie') {
    score.Ties += 1;
  }

 

  updateScoreElement();

  document.querySelector('.js-result').innerText = `${result}`
  document.querySelector('.js-moves').innerHTML = `
  <div class="js-html-main">
    <div class="player-div">
      <div class="player-profile-raw">
        <img class="player-profile-picture" src="Gigachad-Head-Smiling-PNG.png">
        <p class="player-profile-name">You</p>
      </div>
      <img src="../rps-project/${playerMove}-emoji.png" class="move-img">
    </div>
    <div class="player-div">
      <img src="../rps-project/${computerMove}-emoji.png" class="move-img">
      <div class="player-profile-raw">
        <img src="2RQXq9cJRmVou3sA6TNc--1--uem0i.webp" class="computer-profile-picture">
        <p class="computer-profile-name">Computer</p>
    </div>
  </div>`
  
  ;

  
  localStorage.setItem('score', JSON.stringify(score));
  


  

}