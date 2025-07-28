/**
 * Represents a layer in the game world such as background, midground or foreground.
 */
class Layer extends MovableObject {
  /**
   * Creates a new Layer instance
   *
   * @param {string} imagePath - Path to the image used for the layer
   * @param {number} x - x-coordinate of the layer on the canvas
   * @param {number} y - y-coordinate of the layer on the canvas
   * @param {number} width - Width of the layer
   * @param {number} height - Height of the layer
   */
  constructor(imagePath, x = 0, y = 0, width = 720, height = 480) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hasCollisionBox = false;
  }
}
