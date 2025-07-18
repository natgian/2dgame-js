class ThrowableObject extends MovableObject {
  rotation = 0;
  // Canvas uses radiant

  constructor(x, y) {
    super().loadImage("img/misc/arrow.png");
    this.x = x;
    this.y = y;
    this.width = 48 / 2;
    this.height = 160 / 2;
    this.throw();
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
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  throw() {
    this.speedX = 10;
    this.speedY = -15;
    this.acceleration = 1.2;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 10);
  }
}
