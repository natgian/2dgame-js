class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  lastFrameTime = 0;

  x = 100;
  y = 260;
  height = 150;
  width = 150;

  hasCollisionBox = true;
  collisionBoxOffsetX = 0;
  collisionBoxOffsetY = 0;
  collisionBoxWidth = this.width;
  collisionBoxHeight = this.height;

  loadImage(path, callback) {
    this.img = new Image();
    this.img.src = path;
    this.img.onload = () => {
      if (callback) callback();
    };
  }

  loadImages(arr, callback) {
    let loadedImages = 0;
    let totalImages = arr.length;

    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages && callback) {
          callback(); // only call if callback exists
        }
      };
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
    ctx.imageSmoothingEnabled = false;

    if (this.img && this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
