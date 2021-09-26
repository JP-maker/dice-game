var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('.btn-hold').classList.remove('hide');
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying && roundScore > 0) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer-1] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer-1];
        
        // Check if player won the game
        if (scores[activePlayer-1] >= 100) {
            document.querySelector('#player-name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-roll').classList.add('hide');
            document.querySelector('.btn-hold').classList.add('hide');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    } else {
        
    }
});


function nextPlayer() {

    // Change the number of active PLayer
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    // Initialize roundscore
    roundScore = 0;
    document.querySelector('.btn-hold').classList.add('hide');
    document.querySelector('.btn-roll').classList.add('hide');
    setTimeout(() => {document.querySelector('.btn-roll').classList.remove('hide');}, 500);

    for (let index = 1; index <= 2; index++) {
        document.getElementById('current-'+index).textContent = '0';
        document.querySelector('.player-'+index+'-panel').classList.toggle('active');
        document.getElementById('player-name-'+index).innerHTML = 'Player '+index;
    }

    document.getElementById('player-name-'+activePlayer).innerHTML = '<i class="medium material-icons">arrow_forward</i>Player '+activePlayer;
    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    activePlayer = 1;
    roundScore = 0;
    // For knowing if a game is in mode playing
    gamePlaying = true;
    
    for (let index = 1; index <= 2; index++) {
        document.getElementById('score-'+index).textContent = '0';
        document.getElementById('current-'+index).textContent = '0';
        document.getElementById('player-name-'+index).textContent = 'Player '+index;
        document.querySelector('.player-'+index+'-panel').classList.remove('winner');
        document.querySelector('.player-'+index+'-panel').classList.remove('active');
    }

    document.querySelector('.btn-hold').classList.add('hide');
    document.querySelector('.btn-roll').classList.remove('hide')
    document.querySelector('.player-1-panel').classList.add('active');
    document.getElementById('player-name-1').innerHTML = '<i class="medium material-icons">arrow_forward</i>Player 1';
}








