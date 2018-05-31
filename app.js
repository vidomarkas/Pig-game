/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



let scores, roundScore, ctivePlayer, gamePlaying;
let dice1 = (Math.floor(Math.random() * 6)) + 1;
let dice2 = (Math.floor(Math.random() * 6)) + 1;
let player0panel = document.querySelector('.player-0-panel');
let player1panel = document.querySelector('.player-1-panel');
let current0 = document.getElementById('current-0');
let current1 = document.getElementById('current-1');
let btnRoll = document.querySelector(".btn-roll");
let btnHold = document.querySelector(".btn-hold");
let winningScore;



const init = ()=>{
    winningScore = document.getElementById("winningScore").value;
    gamePlaying = true;
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    player0panel.classList.remove("winner");
    player1panel.classList.remove("winner");
    player0panel.classList.remove("active");
    player1panel.classList.remove("active");
    player0panel.classList.add("active");
    btnRoll.style.display = "block";
    btnHold.style.display = "block";
   

    return (scores = [0, 0], roundScore = 0, activePlayer = 0)
}

init();

const switchPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    player0panel.classList.toggle('active');
    player1panel.classList.toggle('active');
    btnRoll.style.display = "none";
    btnHold.style.display = "none";
    window.setTimeout(()=>{
        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        btnRoll.style.display = "block";
        btnHold.style.display = "block";
    }
        ,500)
    
}
//roll the dice
btnRoll.addEventListener("click", ()=>{
    if(gamePlaying){

         //random number
        dice1 = (Math.floor(Math.random() * 6)) + 1;
        dice2 = (Math.floor(Math.random() * 6)) + 1;


        //display the result
        let diceDOM1 = document.querySelector(".dice1");
        let diceDOM2 = document.querySelector(".dice2");
        diceDOM1.style.display = "block";
        diceDOM2.style.display = "block";
        diceDOM1.src = 'dice-' + dice1 + '.png'
        diceDOM2.src = 'dice-' + dice2 + '.png'

        //update round score if the rolled number was not a 1
        if (dice1 === 6 && dice2 === 6){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            switchPlayer();

        }   else if(dice1 !== 1 && dice2 !==1){
            //add score
            roundScore += dice1 +dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //next player
            switchPlayer();
        }

    }
});
//hold the score
btnHold.addEventListener('click', ()=>{
    if(gamePlaying){
         //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector("#name-" + activePlayer).textContent = "WINNER!"
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            btnRoll.style.display = "none";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            btnHold.style.display = "none";
            gamePlaying = false;

        } else {
            switchPlayer();
        }
    }
});

//new game
document.querySelector('.btn-new').addEventListener('click', init);






    
