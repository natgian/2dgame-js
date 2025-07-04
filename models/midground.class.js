class Midground extends MovableObject {
  width = 720;
  height = 200;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 300;
  }
}
