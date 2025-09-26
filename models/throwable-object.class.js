/**
 * Represents a throwable object, like an arrow.
 * Extends {@link MovableObject}.
 *
 */
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

  /**
   * Creates a new throwable object a the given position in the given world.
   *
   *
   * @param {number} x - The horizontal position of the object
   * @param {number} y - The vertical position of the object
   * @param {World} world - The game world isntance the objects belongs to
   */
  constructor(x, y, world) {
    super();
    this.loadImage("img/misc/arrow.png");
    this.x = x;
    this.y = y;
    this.world = world;
  }

  /**
   * Draws the object on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  draw(ctx) {
    ctx.save();
    this.applyTranformations(ctx);
    this.renderImage(ctx);
    ctx.restore();
  }

  /**
   * Applies translation, rotation, and scaling based on facing direction.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  applyTranformations(ctx) {
    ctx.translate(this.x + this.width / 2 + 10, this.y + this.height / 2 + 5);

    if (this.facingLeft) {
      ctx.scale(-1, 1);
      ctx.rotate(-1.5);
    } else {
      ctx.rotate(1.5);
    }
  }

  /**
   * Renders the image at the transformed position.
   * The "imageSmoothingEnabled" property is set to "false" to retain the pixels sharpness.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  renderImage(ctx) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
  }

  /**
   * Shoots the object and plays a sound.
   * The shooting direction depends on the character's orientation.
   *
   */
  shoot() {
    this.applyGravity();
    this.world.sound.play("char_shooting");
    this.otherDirection = this.world.character.otherDirection;
    const maxDistance = 800;
    const step = this.calculateStep();
    this.handleShootMotion(step, maxDistance);
  }

  /**
   * Calculates the horizontal step size based on the character's direction.
   *
   * @returns {number} - The horizontal step size
   */
  calculateStep() {
    return !world.character.otherDirection ? this.speedX : -this.speedX;
  }

  /**
   * Handles the shoot motion of the object by updating its position at a fixed interval until the
   * maximum distance is reached.
   * Stops the shoot by clearing the interval and removing the object from the world.
   *
   * @param {number} step - The horizontal movement
   * @param {number} maxDistance - The maximum distance the object can go before being removed
   */
  handleShootMotion(step, maxDistance) {
    this.throwInterval = setInterval(() => {
      this.x += step;
      if (Math.abs(this.x - world.character.x) > maxDistance) {
        clearInterval(this.throwInterval);
        this.world.arrows = this.world.arrows.filter((arrow) => arrow !== this);
      }
    }, 10);
  }
}
