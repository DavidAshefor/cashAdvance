alert("pink")


window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay  = document.querySelector('.display-player');
    const resetButton  = document.querySelector('#reset');
    const announcer  = document.querySelector('.announcer');
   
    //empty strings for the board
   let board = ['', '', '', '', '', '', '', '', ''];
   let currentPlayer = 'X';
   let isGameActive = true;


   //end game state to announce who won

   const PLAYERX_WON = 'PLAYERX_WON';
   const PLAYERO_WON = 'PLAYERO_WON';
   const TIE = 'TIE';

   /*indexes within the board
   
   [0] [1] [2]
   [3] [4] [5]
   [6] [7] [8]
   */
    
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

function handleResultValidation() { //looping through win conditions array
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b == '' || c == '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }

    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return; //using announce function to announce who won
    }

    if (!board.includes(''))
    announce(TIE); ////when the board has no empty strins left and there's no winner, we announce a tie


}




const announce = (type) => { //announce result to the
    switch(type){
        case PLAYERO_WON:
            announcer.innerText = 'player <span class="playerO">O</span> Won';//player 0 won
            break; 
        case PLAYERX_WON:
            announcer.innerText = 'player <span class="playerX">X</span> Won'; //player x won
            break;
            case TIE:
            announcer.innerText = 'Tie'; //tie
        }
        announcer.classList.remove('hide'); //show the announcer to theuser

};






const isValidAction = (tile) => { //to check if the tile is empty so the players can only play on empty tiles
    if (tile.innerText === 'X' || tile.InnerText === 'O'){
        return false;
    }
    return true;
};

const updateBoard = (index) => { //sets the value of the element in the board array to be equals to the value of the current player
    board[index] = currentPlayer;
}


const changePlayer = () => { 
    playerDisplay.classList.remove(`player${currentPlayer}`); //remove the classlist of the current player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //change the current player to x if it was o or o if it was x
    playerDisplay.innerText = currentPlayer; //update the player display to display the current player
    playerDisplay.classList.add(`player${currentPlayer}`); //display the correct player with the player class
}



//check if the tile is a valid action to see if the game is active and to 
const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.InnerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);//assign the letter x or o
        updateBoard(index);//update the board array
        handleResultValidation();//check if we have a winner or not
        changePlayer();//change player
    }
}

const resetBoard = () => { //reset the game state and the board
    board = ['', '', '', '', '', '', '', '', '']; // set the board to contain 9 empty strings
    isGameActive = true; //set this variable to true
    announcer.classList.add('hide'); //adding the hide clause

    if (currentPlayer === 'O') {  //since player x starts the game, so if the current player is 0, then we call the change player function
        changePlayer();
    }

    tiles.forEach( tile  => {

        tile.innerText = ''; //[update the ui, and for every tile, we'd set the inner text to be an empty string]
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');

    });
}

//attach an event63 listener to evry tile 

tiles.forEach( ( tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index) );
});




   resetButton.addEventListener('click', resetBoard); 
    
    
});




//tell me why tf this code no dey run ffs 
