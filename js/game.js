let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game world.
 *
 * Checks the device orientation.
 * Initializes all event listeners.
 * Creates a new instance of the "World" class using the selectes canvas and the global keyboard
 * object to thandle input.
 *
 */
function init() {
  checkOrientation();
  initAllEventListeners();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * Starts the game.
 *
 * - Hides the start screen
 * - Shows the game controls
 * - Initializes the level
 * - Starts the game int the "world" instance with "level1"
 * - Retrieves and applies the audio state from the local storage
 *
 */
function startGame() {
  hideStartScreen();
  showGameControls();
  initLevel();
  world.startGame(level1);
  applySavedAudioState();
}

/**
 * Restarts the game.
 *
 * - Hides the win and lose end screens
 * - Frees the old "world" instance
 * - Recreates a new "world" instance
 * - Starts the game from the beginning
 *
 */
function restartGame() {
  hideEndScreens();
  world = new World(canvas, keyboard);
  startGame();
}

/**
 * Stops the game.
 *
 * - Clears all intervals
 * - Stops the background music and character walking sound
 * - Checks if the game is won or lost and triggers the corresponding handler
 *
 */
function stopGame() {
  clearAllIntervals();

  if (world.isGameOver) {
    handleGameOver();
  }

  if (world.isGameWon) {
    handleGameWon();
  }
}

/**
 * Handles the game won scenario.
 *
 * - Plays a "victory" sound
 * - Shows the win end screen
 * - Hides the game controls
 *
 */
function handleGameWon() {
  world.sound.play("victory");
  showWinScreen();
  hideGameControls();
}

/**
 * Handles the game over scenario.
 *
 * - Plays a "game over" sound
 * - Shows the lose end screen
 * - Hides the game controls
 *
 */
function handleGameOver() {
  world.sound.play("game_over");
  showLoseScreen();
  hideGameControls();
}

/**
 * Returns to the start screen.
 *
 * - Hides the end screens
 * - Shows the start screen
 * - Frees the old world instance
 * - Initiates a new "world" instance
 *
 */
function backToStartScreen() {
  hideEndScreens();
  showStartScreen();
  world = new World(canvas, keyboard);
}
