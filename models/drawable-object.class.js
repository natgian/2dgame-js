/**
 * A drawable object thath can load images, display them on a canvas and optionally show a
 * collision box.
 *
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  lastFrameTime = 0;

  x = 100;
  y = 260;
  height = 150;
  width = 150;

  hasCollisionBox = false;
  collisionBoxOffsetX = 0;
  collisionBoxOffsetY = 0;
  collisionBoxWidth = this.width;
  collisionBoxHeight = this.height;

  /**
   * Loads a single image for this object.
   *
   * @param {string} path - The file path of the image
   * @param {Function} callback - The function to call when the image is loaded
   */
  loadImage(path, callback) {
    this.img = new Image();
    this.img.src = path;
    this.img.onload = () => {
      if (callback) callback();
    };
  }

  /**
   * Loads multiple images and stores them in the cache.
   *
   * @param {string[]} arr - An array of image paths to load
   * @param {Function} callback - The function to call wehn the images are loaded
   */
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

  /**
   * Gets the collisions box for the object.
   *
   * @returns - An object containing the collision box boundaries
   */
  getCollisionBox() {
    return {
      x: this.x + this.collisionBoxOffsetX,
      y: this.y + this.collisionBoxOffsetY,
      width: this.width + this.collisionBoxWidth,
      height: this.height + this.collisionBoxHeight,
    };
  }

  /**
   * Draws the object on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context
   */
  draw(ctx) {
    ctx.imageSmoothingEnabled = false;

    if (this.img && this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Draws the collision box.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context
   */
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
