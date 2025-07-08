class Layer extends MovableObject {
  constructor(imagePath, x = 0, y = 0, width = 720, height = 480) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
