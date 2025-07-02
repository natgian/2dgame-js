let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas); // neues World Object wird angelegt und geben das canvas als Variable mit

  console.log("My Character is", world.character);
}
