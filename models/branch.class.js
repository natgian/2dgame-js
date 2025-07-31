class Branch extends DrawableObject {
  width = 120;
  height = 120;
  constructor() {
    super().loadImage("img/misc/branch.png");
    this.collisionBoxOffsetX = 10;
    this.collisionBoxOffsetY = 40;
    this.collisionBoxWidth = this.width - 140;
    this.collisionBoxHeight = this.height - 200;
  }

  setRandomPosition() {
    this.x = 300 + Math.random() * (2500 - this.width);
    this.y = 320;
  }
}
