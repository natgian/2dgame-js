class Feather extends MovableObject {
  width = 30;
  height = 60;
  frameRate = 180;

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
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, this.frameRate);
  }

  setRandomPosition() {
    this.x = 300 + Math.random() * (2500 - this.width);
    this.y = 100 + Math.random() * 100;
  }
}
