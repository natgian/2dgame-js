let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
const fullscreen = document.getElementById("fullscreen");
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
  initLevel();
  initAllEventListeners();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function initAllEventListeners() {
  initResizeListener();
  initFullscreenListeners();
  initKeyDownListener();
  initKeyUpListener();
  initMobileControls();
}

async function enterFullscreen(element) {
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

function resizeCanvasToFullscreen() {
  canvas.classList.add("fullscreen-canvas");
}

function resizeCanvasToNormal() {
  canvas.classList.remove("fullscreen-canvas");
}

function resizeCanvas() {
  if (document.fullscreenElement) {
    resizeCanvasToFullscreen();
  } else {
    resizeCanvasToNormal();
  }
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
      fullscreen.classList.add("fullscreen-active");
      showExitFullscreenButton();
      resizeCanvasToFullscreen();
    } else {
      fullscreen.classList.remove("fullscreen-active");
      showEnterFullscreenButton();
    }
  }
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("webkitfullscreenchange", onFullscreenChange);
}

function initResizeListener() {
  window.addEventListener("resize", resizeCanvas);
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
  btn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard[key] = true;
    btn.classList.add("active");
  });

  btn.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard[key] = false;
    btn.classList.remove("active");
  });

  btn.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function initMobileControls() {
  const walkLeftBtn = document.getElementById("walk-left-btn");
  const walkRightBtn = document.getElementById("walk-right-btn");
  const jumpBtn = document.getElementById("jump-btn");
  const shootBtn = document.getElementById("shoot-btn");

  connectButtonToKeyboard(walkLeftBtn, "LEFT");
  connectButtonToKeyboard(walkRightBtn, "RIGHT");
  connectButtonToKeyboard(jumpBtn, "SPACE");
  connectButtonToKeyboard(shootBtn, "D");
}

function stopGame() {
  clearAllIntervals();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
