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

async function enterFullscreen(element) {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    element.classList.add("fullscreen-active");
    resizeCanvasToFullscreen();
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

function resetCanvasSize() {
  canvas.classList.remove("fullscreen-canvas");
}

function resizeCanvas() {
  if (document.fullscreenElement) {
    resizeCanvasToFullscreen();
  } else {
    resetCanvasSize();
  }
}

function stopGame() {
  clearAllIntervals();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
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

function initFullscreenChangeListener() {
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fullscreen.classList.remove("fullscreen-active");
    }
  });
}

function initWebKitFullscreenChangeListener() {
  document.addEventListener("webkitfullscreenchange", () => {
    if (!document.webkitFullscreenElement) {
      fullscreen.classList.remove("fullscreen-active");
    }
  });
}

function initResizeListener() {
  window.addEventListener("resize", resizeCanvas);
}

function initAllEventListeners() {
  initResizeListener();
  initFullscreenChangeListener();
  initWebKitFullscreenChangeListener();
  initKeyDownListener();
  initKeyUpListener();
}
