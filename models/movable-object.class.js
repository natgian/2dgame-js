class MovableObject {
  x = 100;
  y = 295;
  height = 150;
  width = 150;

  img;
  imageCache = {};
  currentImage = 0;

  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  energy = 100;

  collisionBoxOffsetX = 0;
  collisionBoxOffsetY = 0;
  collisionBoxWidth = this.width;
  collisionBoxHeight = this.height;

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

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  getCollisionBox() {
    return {
      x: this.x + this.collisionBoxOffsetX,
      y: this.y + this.collisionBoxOffsetY,
      width: this.width + this.collisionBoxWidth,
      height: this.height + this.collisionBoxHeight,
    };
  }

  drawBorder(ctx) {
    if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
      const collisionBox = this.getCollisionBox();

      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";

      ctx.rect(collisionBox.x, collisionBox.y, collisionBox.width, collisionBox.height);
      ctx.stroke();
    }
  }

  // z.B. character.isColliding(enemy);
  isColliding(movableObj) {
    const thisObj = this.getCollisionBox();
    const otherObj = movableObj.getCollisionBox();

    return thisObj.x + thisObj.width > otherObj.x && thisObj.y + thisObj.height > otherObj.y && thisObj.x < otherObj.x + otherObj.width && thisObj.y < otherObj.y + otherObj.height;
  }

  damage() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in milliseconds
    timePassed = timePassed / 1000; // difference in seconds
    console.log(timePassed);
    return timePassed < 0.2;
  }

  isDead() {
    return this.energy === 0;
  }

  /**
   *
   * @param {Array} arr - ["img/image1.png", "img/image2.png", "img/image3.png"]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let index = this.currentImage % images.length; // keeps the index inside the array length so the animation loops from start again
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
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
