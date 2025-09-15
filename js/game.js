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
 * Initializes the game world by selecting the canvas element
 * and creating a new World instance with that canvas.
 *
 * Called once at the start to set up the environment.
 */
function init() {
  checkOrientation();
  initAllEventListeners();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function startGame() {
  document.getElementById("start-screen").classList.add("d-none");
  document.querySelector(".controls").classList.remove("d-none");
  initLevel();
  world.startGame(level1);

  const soundState = localStorage.getItem("soundState");
  if (soundState === null) {
    unmuteAudio();
  } else if (soundState === "muted") {
    muteAudio();
  }
}

function restartGame() {
  document.getElementById("lose-end-screen").classList.add("d-none");
  document.getElementById("win-end-screen").classList.add("d-none");

  world = new World(canvas, keyboard);
  startGame();
}

function stopGame() {
  clearAllIntervals();
  world.sound.stop("bg_music");
  world.sound.stop("char_walking");

  if (world.isGameOver) {
    handleGameOver();
  }

  if (world.isGameWon) {
    handleGameWon();
  }
}

function handleGameWon() {
  setTimeout(() => {
    world.sound.play("victory");
    document.getElementById("win-end-screen").classList.remove("d-none");
    document.querySelector(".controls").classList.add("d-none");
  }, 500);
}

function handleGameOver() {
  setTimeout(() => {
    world.sound.play("game_over");
    document.getElementById("lose-end-screen").classList.remove("d-none");
    document.querySelector(".controls").classList.add("d-none");
  }, 500);
}

function backToStartScreen() {
  document.getElementById("lose-end-screen").classList.add("d-none");
  document.getElementById("win-end-screen").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none");
  world = new World(canvas, keyboard);
}

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
