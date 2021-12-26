let boardGame = ["","","","","","","","",""];
let WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
let boardElement = document.getElementsByClassName('board')[0];
let statusElement = document.getElementsByClassName('game-status')[0];
let gameOver=false;
let currentPlayer = "X";
let winningMsg = function () {
  return `Player ${currentPlayer} win!`;
}
let turnMsg = function () {
  return `Its ${currentPlayer} turn`;
}
let tieMsg = function () {
  return "It`s a tie";
}
statusElement.innerHTML = turnMsg();

function handleCellClick(clickedCellEvent){
      const clickedCell = clickedCellEvent.target; //div of the current cell
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //id of cell and change it to number
      if (boardGame[clickedCellIndex] != "" || gameOver) { //chack if the cell is not empty and the game isn't over
          return;
      } else {
          boardGame[clickedCellIndex]=currentPlayer;
          clickedCell.innerHTML = currentPlayer; //see the player on DOM board
          let isGameOver = handleValidation(); //check if game is over or not
          if(isGameOver == false){ //if the game isn't over we change the player
            changePlayer();
          }
        }
}

function handleValidation(){ //check the status of the game
  let thereIsAwinner = checkForWin(); //check if there is a winner
  if(thereIsAwinner == true){ //we change gameIsOver to true, and return true
    gameOver=true;
    return true;
  } else { // check if there is a tie
    for(let cell of boardGame){
      if(cell==""){ //if there is an empty cell we return false because the game is not over
        return false;
      }
    }
  }
  statusElement.innerHTML = tieMsg(); //there is a tie and we print a message
  gameOver=true; //change game over to true
  return true; //and return true
}

function checkForWin() { //check if there is a winner
  for(let item of WINNING_COMBINATIONS){
    //we check if a cell is not empty and there is row/column/diagonal [of 3 cells] in the same type.
      if((boardGame[item[0]]==boardGame[item[1]]) &&
          (boardGame[item[1]]==boardGame[item[2]]) &&
          (boardGame[item[2]]!="")){
          //if there is we change our status to win and return true
        statusElement.innerHTML = winningMsg();
        return true;
      }
  }
  return false; //if there is no winner we return false
}

function handleResetGame() { //should return the game to the beginning
  gameOver=false;
  boardGame = ["","","","","","","","",""];
  let cells = document.querySelectorAll('.cell');
  for(let cell of cells){
    cell.innerHTML="";
  }
  currentPlayer = "X";
  statusElement.innerHTML = turnMsg();
}

function changePlayer() { //should cahnge the palyer turn
    if (currentPlayer == "X") {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    statusElement.innerHTML = turnMsg(); //shows the player turn
}


let allCells = document.querySelectorAll('.cell');
for(let cell of allCells)
{
  cell.addEventListener('click',handleCellClick); //add click addEventListener and connect us to handleCellClick function
}
document.querySelector('.restart').addEventListener('click',handleResetGame);//add click addEventListener and connect us to handleResetGame function
