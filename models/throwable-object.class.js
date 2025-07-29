class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("img/misc/arrow.png");
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 48 / 2;
    this.height = 160 / 2;
    this.collisionBoxOffsetX = -12;
    this.collisionBoxOffsetY = 25;
    this.collisionBoxWidth = 50;
    this.collisionBoxHeight = -50;
  }

  /**
   * Canvas uses radians (not degrees) for all rotation operations.
   *
   * To convert degrees to radians:
   *    radians = degrees * (Math.PI / 180)
   *
   * Common degree-to-radian conversions:
   *    0°     = 0
   *    45°    = Math.PI / 4
   *    90°    = Math.PI / 2
   *    180°   = Math.PI
   *    270°   = (3 * Math.PI) / 2
   *    360°   = 2 * Math.PI
   *
   * Always rotate AFTER translating the canvas to the desired pivot point,
   * and use ctx.save() / ctx.restore() to isolate transformations.
   */
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2 + 10, this.y + this.height / 2 + 5);

    if (this.facingLeft) {
      ctx.scale(-1, 1);
      ctx.rotate(-1.5);
    } else {
      ctx.rotate(1.5);
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  throw() {
    this.speedY = -15;
    this.speedX = 10;
    this.acceleration = 1.2;
    this.applyGravity();

    if (!world.character.otherDirection) {
      this.throwInterval = setInterval(() => {
        this.x += this.speedX;
      }, 10);
    } else {
      this.throwInterval = setInterval(() => {
        this.otherDirection = true;
        this.x -= this.speedX;
      }, 10);
    }
  }
}
