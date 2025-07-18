class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  x = 100;
  y = 295;
  height = 150;
  width = 150;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
}
