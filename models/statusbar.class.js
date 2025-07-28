class Statusbar extends DrawableObject {
  IMAGES = [
    "img/statusbars/health/0.png", // 0
    "img/statusbars/health/20.png",
    "img/statusbars/health/40.png",
    "img/statusbars/health/60.png",
    "img/statusbars/health/80.png",
    "img/statusbars/health/100.png", // 5
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 40;
    this.y = 20;
    this.width = 595 / 3;
    this.height = 158 / 3;
    this.hasCollisionBox = false;
  }

  // setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let imagePath = this.IMAGES[this.getImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  getImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20 || this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
