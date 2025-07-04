let canvas;
let world;

/**
 * Initializes the game world by selecting the canvas element
 * and creating a new World instance with that canvas.
 *
 * Called once at the start to set up the environment.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}
