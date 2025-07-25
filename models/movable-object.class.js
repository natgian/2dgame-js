class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  health = 100;
  isInDeathAnimation = false;

  collisionBoxOffsetX = 0;
  collisionBoxOffsetY = 0;
  collisionBoxWidth = this.width;
  collisionBoxHeight = this.height;

  setRandomPosition() {
    this.x = 0;
    this.y = 0;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isInTheAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isInTheAir() {
    return this.y < 295;
  }

  getCollisionBox() {
    return {
      x: this.x + this.collisionBoxOffsetX,
      y: this.y + this.collisionBoxOffsetY,
      width: this.width + this.collisionBoxWidth,
      height: this.height + this.collisionBoxHeight,
    };
  }

  // z.B. character.isColliding(enemy);
  isColliding(movableObj) {
    const thisObj = this.getCollisionBox();
    const otherObj = movableObj.getCollisionBox();

    return thisObj.x + thisObj.width > otherObj.x && thisObj.y + thisObj.height > otherObj.y && thisObj.x < otherObj.x + otherObj.width && thisObj.y < otherObj.y + otherObj.height;
  }

  hit() {
    this.health -= 5;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in milliseconds
    timePassed = timePassed / 1000; // difference in seconds
    return timePassed < 0.2;
  }

  isDead() {
    return this.health === 0;
  }

  playAnimation(images) {
    let index = this.currentImage % images.length; // keeps the index inside the array length so the animation loops from start again
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

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

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 35;
  }
}
