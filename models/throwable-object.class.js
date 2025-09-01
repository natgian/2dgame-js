class ThrowableObject extends MovableObject {
  width = 24;
  height = 80;
  collisionBoxOffsetX = -12;
  collisionBoxOffsetY = 25;
  collisionBoxWidth = 50;
  collisionBoxHeight = -50;
  speedX = 15;
  speedY = -15;
  acceleration = 1.2;

  constructor(x, y, world) {
    super();
    this.loadImage("img/misc/arrow.png");
    this.x = x;
    this.y = y;
    this.world = world;
  }

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
    this.applyGravity();
    this.world.sound.play("char_shooting");

    const maxDistance = 800;

    const step = !world.character.otherDirection ? this.speedX : -this.speedX;
    this.otherDirection = world.character.otherDirection;

    this.throwInterval = setInterval(() => {
      this.x += step;
      if (Math.abs(this.x - world.character.x) > maxDistance) {
        clearInterval(this.throwInterval);
        this.world.arrows = this.world.arrows.filter((arrow) => arrow !== this);
      }
    }, 10);
  }
}
