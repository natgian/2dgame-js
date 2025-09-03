class Branch extends DrawableObject {
  width = 120;
  height = 120;
  constructor() {
    super();
    this.loadImage("img/misc/branch.png");
    this.collisionBoxOffsetX = 20;
    this.collisionBoxOffsetY = 40;
    this.collisionBoxWidth = this.width - 150;
    this.collisionBoxHeight = this.height - 200;
  }

  setRandomPosition() {
    this.x = 300 + Math.random() * (2500 - this.width);
    this.y = 320;
  }
}
