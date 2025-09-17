class Feather extends MovableObject {
  width = 30;
  height = 60;
  frameRate = 320;

  IMAGES = [
    "img/collectables/gold_feather/_01_gold_feather.png",
    "img/collectables/gold_feather/_02_gold_feather.png",
    "img/collectables/gold_feather/_03_gold_feather.png",
    "img/collectables/gold_feather/_04_gold_feather.png",
  ];

  constructor() {
    super().loadImage("img/collectables/gold_feather/_01_gold_feather.png");
    this.loadImages(this.IMAGES);
    this.animate();
    this.collisionBoxOffsetX = 0;
    this.collisionBoxOffsetY = 0;
    this.collisionBoxWidth = this.width - 30;
    this.collisionBoxHeight = this.height - 55;
  }

  /**
   * Animates the feather by cycling through the images.
   *
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, this.frameRate);
  }

  /**
   * Sets the feather at a random position.
   *
   * - x is randomized between 300 and (3200 - feather width)
   * - y is randomized between 100 and 200
   *
   */
  setRandomPosition() {
    this.x = 300 + Math.random() * (3200 - this.width);
    this.y = 100 + Math.random() * 100;
  }
}
