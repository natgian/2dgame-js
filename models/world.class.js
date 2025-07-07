class World {
  canvas;
  ctx;
  keyboard;
  character = new Character();
  enemies = [new Enemy(), new Enemy(), new Enemy()];
  fireflies = [new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly(), new Firefly()];
  background = new Background("img/background/repeating_layers/background_backdrop.png", 0);
  backgroundObjects = [new Background("img/background/repeating_layers/background2_trees.png", 0), new Background("img/background/repeating_layers/background1_trees.png", 0)];
  midgroundObject = new Midground("img/midground/midground_grass.png", 0, 0);

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // The getContext(“2d”) method returns a so-called rendering context object. This contains all the methods and properties needed to draw on the canvas: Lines, shapes, images, text, etc.
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
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

  setWorld() {
    this.character.world = this;
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Draws the object to the canvas, and flips it horizontally if it is facing left (otherDirection = true).
   * This creates a mirrored effect for characters walking to the left.
   */
  addToMap(movableObj) {
    if (movableObj.otherDirection) {
      this.ctx.save(); // saves the current canvas state
      this.ctx.translate(movableObj.width, 0); // shifts the canvas origin to the right by the object's width. This is necessary before flipping horizontally to keep the object in the correct position.
      this.ctx.scale(-1, 1); // flips the canvas horizontally (mirror image effect on the x-axis)
      movableObj.x = movableObj.x * -1; // because the canvas is flipped horizontally with scale(-1, 1), the object's x-position must also be flipped (multiply by -1), so it appears at the correct mirrored position on screen.
    }
    this.ctx.drawImage(movableObj.img, movableObj.x, movableObj.y, movableObj.width, movableObj.height);
    if (movableObj.otherDirection) {
      movableObj.x = movableObj.x * -1; // restores the original x position after drawing
      this.ctx.restore(); // restores the canvas state (undoes the translate and scale)
    }
  }
}
