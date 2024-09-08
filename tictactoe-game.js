
// Creating variables to contain the classses and IDs
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// Creating a variable to contain all win conditions
// This is a 2D array: an array of array
// The subarrays reps which 3 cells in the grid need to be occupied by the same player to win
const winConditions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


let options = ["", "", "", "", "", "", "", "", ""]; // this reps the state of each cell before the game starts //It holds the current state of the game board
let currentPlayer = "X"; // Keeps track of whose turn to play
let running = false; // To indicate whether the game is active or not

initializeGame();

function initializeGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked)); // Attaches an event listener to each cell
  restartBtn.addEventListener("click", restartGame); //Attaches an event listener to the restart button
  statusText.textContent = `${currentPlayer}'s turn`; //Updates the text inside the statusText DOM element
  running = true; //Game is running
} 
// he updateCell function is responsible for synchronizing the internal game state (options array) with the visual state of the game (what the player sees on the screen)
function cellClicked(){
  const cellIndex = this.getAttribute("cellIndex"); //Retrieves the index of the clicked cell and stores the index in the option array

  if(options[cellIndex] != "" || !running) { //This checks whether the clicked cell has already been marked by a player //This checks whether the game is running
    return; //If any of the above conditions are met the function returns without doing anything
  }
  updateCell(this, cellIndex); //Update function is called with 2 parameters. this is the clicked cell and cellIndex is the index of the clicked cell in the option array
  checkWinner(); //Determines whether game has been won of should be continued
}
function updateCell(cell, index){
  options[index] = currentPlayer; //This accesses the specific position in the options array corresponding to the clicked cell.
  cell.textContent = currentPlayer; //This property is used to update the visible text inside the clicked cell.
}

// Responsible for switching turns between the players 
function changePlayer(){
  currentPlayer = (currentPlayer === "X") ? "O" : "X"; 
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
  let roundWon = false;

// This loop iterates over each winning condition defined in the winConditions array to check if the current player's symbols match any of these conditions.
  for(i = 0; i < winConditions.length; i++){
    const condition = winConditions[i]; //This retrieves the current win condition from the winConditions array
    const cellA = options[condition[0]];
    const cellB = options[condition[1]]; //These lines retrieve the values from the options array corresponding to the three cells in the current win condition
    const cellC = options[condition[2]];

  //This condition checks if any of the cells in the current win condition are empty- this prevents unnecessary comparison of empty cells
    if(cellA === "" || cellB === "" || cellC === ""){
      continue;
    }

  //This condition checks if all three cells in the current win condition contain the same value
    if(cellA === cellB && cellB === cellC) { 
      roundWon = true;
      break;
    }
  }
 
  if(roundWon){
    statusText.textContent = `${currentPlayer} wins!`
    running = false;
  } 

  //This condition checks if there are no empty cells left in the options array, meaning the game board is full.
  else if(!options.includes("")){
    statusText.textContent = "Draw";
    running = false;
  }
  else {
    changePlayer();
  }
}

function restartGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}


