/**
 * An object that can make movements, take damage and play animations.
 * Extends {@link DrawableObject}.
 *
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  health = 100;
  damage = 5;
  isInDeathAnimation = false;
  isReadyToRemove = false;

  /**
   * Sets the object to a random position.
   * Initial values are 0.
   *
   */
  setRandomPosition() {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Applies gravity so the object falls down if in the air.
   * Updates the vertical position 25 times per second.
   *
   * Special handling for Character instance:
   * - ensures the character does not fall below a fixed ground level of 260
   * - resets speedY to 0
   *
   */
  applyGravity() {
    setInterval(() => {
      if (this.isInTheAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this instanceof Character && this.y > 260) {
          this.y = 260;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground level.
   *
   * @returns {boolean} - "True" if the object is in the air, otherwise "false"
   */
  isInTheAir() {
    return this.y < 260;
  }

  /**
   *  Checks if the object is colliding with another movable object.
   *
   * @param {MovableObject} movableObj - The object to check if it's colliding with this object
   * @returns {boolean} - "True" if the objects overlap, otherwise "false"
   */
  isColliding(movableObj) {
    const thisObj = this.getCollisionBox();
    const otherObj = movableObj.getCollisionBox();

    const isRightOfOther = thisObj.x + thisObj.width > otherObj.x;
    const isBelowOther = thisObj.y + thisObj.height > otherObj.y;
    const isLeftOfOther = thisObj.x < otherObj.x + otherObj.width;
    const isAboveOther = thisObj.y < otherObj.y + otherObj.height;

    return isRightOfOther && isBelowOther && isLeftOfOther && isAboveOther;
  }

  /**
   * Checks if the object is colliding from above with another movable object.
   *
   * @param {MovableObject} movableObj - The object to check if it's colliding with this object
   */
  isCollidingFromAbove(movableObj) {
    const isFalling = this.isInTheAir();
    const isColliding = this.isColliding(movableObj);
    return isFalling && isColliding;
  }

  /**
   * Reduces the object's health by it's damage value.
   * The health is set to 0 if it goes below 0.
   * Also stores the time of the last hit.
   *
   */
  hit() {
    this.health -= this.damage;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was recently hit.
   *
   * @returns {boolean} - "True" if the hit was less than 0.2 seconds ago, otherwise "false"
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in milliseconds
    timePassed = timePassed / 1000; // difference in seconds
    return timePassed < 0.2;
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} - "True" if the health as reached 0, otherwise "false"
   */
  isDead() {
    return this.health === 0;
  }

  /**
   * Plays an animation by cycling through a list of images.
   *
   * @param {string[]} images - The images to cycle through
   * @param {number} frameDuration - How long each frame is shown in milliseconds
   * @param {boolean} loop - "True" if the animation should repeat, otherwise "false"
   */
  playAnimation(images, frameDuration = 100, loop = true) {
    const now = Date.now();

    if (now - this.lastFrameTime > frameDuration) {
      this.lastFrameTime = now;
      let index = this.currentImage % images.length;
      this.img = this.imageCache[images[index]];

      if (loop) {
        this.currentImage++;
      } else {
        if (this.currentImage < images.length - 1) {
          this.currentImage++;
        }
      }
    }
  }

  /**
   * Plays a death animation by showing each image only once.
   * When finish, the last image remains.
   *
   * @param {string[]} images - The images to cycle through
   */
  playDeadAnimation(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      let path = images[images.length - 1];
      this.img = this.imageCache[path];
    }
  }

  /**
   * Moves the object to the right.
   *
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   *
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting setting a vertical speed.
   *
   */
  jump(verticalSpeed = 30) {
    this.speedY = verticalSpeed;
  }
}
