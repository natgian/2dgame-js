let canvas;
let world;
let keyboard = new Keyboard();
const fullscreen = document.getElementById("fullscreen");

const controlsBtn = document.getElementById("controls-btn");
const closeBtn = document.getElementById("close-overlay-btn");
const keyMap = {
  ArrowRight: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowDown: "DOWN",
  Space: "SPACE",
  KeyD: "D",
  KeyF: "F",
};

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

//TODO:
function initAllEventListeners() {
  initOrientationListener();
  initFullscreenListeners();
  initDialogEventListeners();
  initKeyDownListener();
  initKeyUpListener();

  if (isMobile()) {
    initMobileControls();
  }
}

async function enterFullscreen(element) {
  if (!world || world.isGameOver || world.isGameWon) return;
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen could not be activated", error);
  }
}

async function exitFullscreen() {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  }
}

function initOrientationListener() {
  window.addEventListener("resize", checkOrientation);
  checkOrientation();
}

function initKeyDownListener() {
  document.addEventListener("keydown", (event) => {
    const key = keyMap[event.code];

    if (key) {
      keyboard[key] = true;
    }

    if (event.code === "Escape") {
      exitFullscreen();
    }
  });
}

function initKeyUpListener() {
  document.addEventListener("keyup", (event) => {
    const key = keyMap[event.code];

    if (key) {
      keyboard[key] = false;
    }
  });
}

function initFullscreenListeners() {
  function onFullscreenChange() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      showExitFullscreenButton();
    } else {
      fullscreen.classList.remove("fullscreen-active");
      showEnterFullscreenButton();
    }
  }
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("webkitfullscreenchange", onFullscreenChange);
}

function showExitFullscreenButton() {
  document.getElementById("fullscreen-exit-btn").classList.remove("d-none");
  document.getElementById("fullscreen-btn").classList.add("d-none");
}

function showEnterFullscreenButton() {
  document.getElementById("fullscreen-exit-btn").classList.add("d-none");
  document.getElementById("fullscreen-btn").classList.remove("d-none");
}

function connectButtonToKeyboard(btn, key) {
  btn.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      keyboard[key] = true;
      btn.classList.add("active");
    },
    { passive: false }
  );

  btn.addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      keyboard[key] = false;
      btn.classList.remove("active");
    },
    { passive: false }
  );

  btn.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function initMobileControls() {
  const walkLeftBtn = document.getElementById("walk-left-btn");
  const walkRightBtn = document.getElementById("walk-right-btn");
  const jumpBtn = document.getElementById("jump-btn");
  const shootBtn = document.getElementById("shoot-btn");
  const craftBtn = document.getElementById("craft-btn");

  connectButtonToKeyboard(walkLeftBtn, "LEFT");
  connectButtonToKeyboard(walkRightBtn, "RIGHT");
  connectButtonToKeyboard(jumpBtn, "SPACE");
  connectButtonToKeyboard(shootBtn, "D");
  connectButtonToKeyboard(craftBtn, "F");
}

function isMobile() {
  return window.matchMedia("(max-width: 720px), (max-height: 480px)").matches;
}

function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    document.getElementById("mobile-portrait-blocker").classList.remove("d-none");
  } else {
    document.getElementById("mobile-portrait-blocker").classList.add("d-none");
  }
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function muteAudio() {
  document.getElementById("sound-off-btn").classList.add("d-none");
  document.getElementById("sound-on-btn").classList.remove("d-none");
  world.sound.muteAll();
  localStorage.setItem("soundState", "muted");
}

function unmuteAudio() {
  document.getElementById("sound-off-btn").classList.remove("d-none");
  document.getElementById("sound-on-btn").classList.add("d-none");
  world.sound.unmuteAll();
  localStorage.setItem("soundState", "unmuted");
}
