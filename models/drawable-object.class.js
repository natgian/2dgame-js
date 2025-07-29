class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  x = 100;
  y = 295;
  height = 150;
  width = 150;

  hasCollisionBox = true;
  collisionBoxOffsetX = 0;
  collisionBoxOffsetY = 0;
  collisionBoxWidth = this.width;
  collisionBoxHeight = this.height;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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

  getCollisionBox() {
    return {
      x: this.x + this.collisionBoxOffsetX,
      y: this.y + this.collisionBoxOffsetY,
      width: this.width + this.collisionBoxWidth,
      height: this.height + this.collisionBoxHeight,
    };
  }

  draw(ctx) {
    try {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn("Error loading image", error);
      console.log("Could not load image", this.img.src);
    }
  }

  drawBorder(ctx) {
    if (this.hasCollisionBox) {
      const collisionBox = this.getCollisionBox();

      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";

      ctx.rect(collisionBox.x, collisionBox.y, collisionBox.width, collisionBox.height);
      ctx.stroke();
    }
  }
}
