let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
const fullscreen = document.getElementById("fullscreen");

/**
 * Initializes the game world by selecting the canvas element
 * and creating a new World instance with that canvas.
 *
 * Called once at the start to set up the environment.
 */
function init() {
  initLevel();
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

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreen.classList.remove("fullscreen-active");
  }
});

document.addEventListener("webkitfullscreenchange", () => {
  if (!document.webkitFullscreenElement) {
    fullscreen.classList.remove("fullscreen-active");
  }
});

function resizeCanvasToFullscreen() {
  canvas.width = 720;
}

function resetCanvasSize() {
  canvas.width = 720;
}

function resizeCanvas() {
  if (document.fullscreenElement) {
    resizeCanvasToFullscreen();
  } else {
    resetCanvasSize();
  }
}

window.addEventListener("resize", resizeCanvas);

function stopGame() {
  clearAllIntervals();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (event.code === "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (event.code === "ArrowUp") {
    keyboard.UP = true;
  }

  if (event.code === "Space") {
    keyboard.SPACE = true;
  }

  if (event.code === "KeyD") {
    keyboard.D = true;
  }

  if (event.code === "Escape") {
    exitFullscreen();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (event.code === "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (event.code === "ArrowUp") {
    keyboard.UP = false;
  }

  if (event.code === "Space") {
    keyboard.SPACE = false;
  }

  if (event.code === "KeyD") {
    keyboard.D = false;
  }
});
