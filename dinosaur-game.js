
// Variable declarations
let character = document.getElementById('character');
let block = document.getElementById('block');
let startBtn = document.getElementById('startBtn');
let scoreDisplay = document.getElementById('score');
let jumpNow = document.getElementById('jumpNow');
let resetBtn = document.getElementById('resetBtn');

// Initialize score variable to zero
let score = 0;

// A function in which event listeners are attached to buttons
function startGame() {
  startBtn.addEventListener("click", run);
  jumpNow.addEventListener("click", jump);
  resetBtn.addEventListener("click", resetGame);
 
}

// Add the block run animation if not already added
function run() {
  if(!block.classList.contains('js-block-run')){
   block.classList.add('js-block-run');
  }
}

// 
function jump(event) {
  event.preventDefault(); //this prevent any default behaviour that will trigger the event
  event.stopPropagation(); //this ensure that the jump event happens only here and does not propagate to any parent element
  if(!character.classList.contains('js-character-jump')) { //Adds the character jump animation if not added yet
  character.classList.add('js-character-jump');

}
  setTimeout (function() {
    character.classList.remove('js-character-jump'); //Ensures that after 200ms the animation is removed so that the character can return to initial position after jumping
  }, 200);
}

//Score updated 
function updateScore() {
  score += 10;
  scoreDisplay.innerHTML = `Score: ${score}`
}

// This sets up a loop that checks every 10 milliseconds to detect collisions and handle score updates.
let checkDead = setInterval(function() {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top')); //Retrieves the top position of the character
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left')) //Retrieves the left position of the block
  if(blockLeft < 10 && blockLeft > 0 && characterTop >= 130) { //This checks for closeness of both the character and the block to confirm that collision has occured
    block.style.animation = 'none';
    alert('Gameover!!!');
  }

  //This is how points are scored
  if (blockLeft < 0) {
    updateScore();
      block.classList.remove('js-block-run'); 
      void block.offsetWidth; //This forces a reflow of the block's layout, ensuring that the animation can be restarted.
      block.classList.add('js-block-run'); 
  };

}, 10);


function resetGame() {
  score = 0;
  scoreDisplay.innerHTML = `Score: ${score}`
  character.classList.remove('js-character-jump');
  block.classList.remove('js-block-run');
  block.style.display = 'block'; //This ensures the block is visible after resetting the game.
  location.reload();
};

startGame(); //Call to start game
