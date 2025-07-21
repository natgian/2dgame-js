class World {
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  character = new Character();
  level = level1;
  statusbar = new Statusbar();
  arrows = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // The getContext(“2d”) method returns a so-called rendering context object. This contains all the methods and properties needed to draw on the canvas: Lines, shapes, images, text, etc.
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runInterval();
  }

  setWorld() {
    this.character.world = this;
  }

  runInterval() {
    setInterval(() => {
      this.checkCollisions();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isDead()) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.health);
        }
      }
    });

    if (this.character.isColliding(this.level.endboss)) {
    }
  }

  checkThrowObjects() {
    if (!this.character.lastArrowShot()) return;

    this.character.lastShoot = new Date().getTime();

    setTimeout(() => {
      let arrow;
      if (!this.character.otherDirection) {
        arrow = new ThrowableObject(this.character.x + 60, this.character.y + 50);
      } else {
        arrow = new ThrowableObject(this.character.x + -20, this.character.y + 50);
      }

      arrow.throw();
      this.arrows.push(arrow);
      this.character.isShooting = false;
    }, 600);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Cleares the canvas by deleting the previous image before drawing again

    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.fireflies);
    this.addObjectsToMap(this.level.midground);
    this.addObjectsToMap(this.level.foreground);
    this.addToMap(this.character);

    this.ctx.translate(-this.cameraX, 0);
    // --- space for fixed objects ---
    this.addToMap(this.statusbar);
    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);

    this.addObjectsToMap(this.arrows);

    this.ctx.translate(-this.cameraX, 0);

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

  /**
   * Draws the object to the canvas, and flips it horizontally if it is facing left (otherDirection = true).
   * This creates a mirrored effect for characters walking to the left.
   */
  addToMap(movableObj) {
    if (movableObj.otherDirection) {
      this.flipImage(movableObj);
    }

    movableObj.draw(this.ctx);
    movableObj.drawBorder(this.ctx);

    if (movableObj.otherDirection) {
      this.flipImageBack(movableObj);
    }
  }

  flipImage(movableObj) {
    this.ctx.save(); // saves the current canvas state
    this.ctx.translate(movableObj.width, 0); // shifts the canvas origin to the right by the object's width. This is necessary before flipping horizontally to keep the object in the correct position.
    this.ctx.scale(-1, 1); // flips the canvas horizontally (mirror image effect on the x-axis)
    movableObj.x = movableObj.x * -1; // because the canvas is flipped horizontally with scale(-1, 1), the object's x-position must also be flipped (multiply by -1), so it appears at the correct mirrored position on screen.
  }

  flipImageBack(movableObj) {
    movableObj.x = movableObj.x * -1; // restores the original x position after drawing
    this.ctx.restore(); // restores the canvas state (undoes the translate and scale)
  }
}
