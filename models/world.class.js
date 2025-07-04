class World {
  character = new Character();
  enemies = [new Enemy(), new Enemy(), new Enemy()];
  fireflies = [new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly()];
  canvas;
  ctx;
  background = new Background("img/background/repeating_layers/background_backdrop.png", 0);
  backgroundObjects = [new Background("img/background/repeating_layers/background2_trees.png", 0), new Background("img/background/repeating_layers/background1_trees.png", 0)];
  midgroundObject = new Midground("img/midground/midground_grass.png", 0, 0);

  constructor(canvas) {
    this.ctx = canvas.getContext("2d"); // The getContext(“2d”) method returns a so-called rendering context object. This contains all the methods and properties needed to draw on the canvas: Lines, shapes, images, text, etc.
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Cleares the canvas by deleting the previous image before drawing again
    this.addToMap(this.background);
    this.addObjectsToMap(this.fireflies);
    this.addObjectsToMap(this.backgroundObjects);

    this.addToMap(this.midgroundObject);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    requestAnimationFrame(() => {
      this.draw();
    });
    // “requestAnimationFrame” tells the browser that this function should be executed before the next screen update.
    // With an anonymous function, “this.draw()” would not work here because ‘this’ would no longer point to the object, but with the Arrow function it is possible because it retains the “this” context.
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(movableObj) {
    this.ctx.drawImage(movableObj.img, movableObj.x, movableObj.y, movableObj.width, movableObj.height);
  }
}
