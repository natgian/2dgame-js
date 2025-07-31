class Endboss extends MovableObject {
  width = 400;
  height = 400;
  y = 50;
  frameRate = this.speed * 600;
  speed = 2;
  hadFirstContact = false;

  IMAGES_WALKING = [
    "img/enemies/endboss/walking/000.png",
    "img/enemies/endboss/walking/001.png",
    "img/enemies/endboss/walking/002.png",
    "img/enemies/endboss/walking/003.png",
    "img/enemies/endboss/walking/004.png",
    "img/enemies/endboss/walking/005.png",
    "img/enemies/endboss/walking/006.png",
    "img/enemies/endboss/walking/007.png",
    "img/enemies/endboss/walking/008.png",
    "img/enemies/endboss/walking/009.png",
    "img/enemies/endboss/walking/010.png",
    "img/enemies/endboss/walking/011.png",
    "img/enemies/endboss/walking/012.png",
    "img/enemies/endboss/walking/013.png",
    "img/enemies/endboss/walking/014.png",
    "img/enemies/endboss/walking/015.png",
    "img/enemies/endboss/walking/016.png",
    "img/enemies/endboss/walking/017.png",
  ];

  IMAGES_IDLE = [
    "img/enemies/endboss/idle/000.png",
    "img/enemies/endboss/idle/001.png",
    "img/enemies/endboss/idle/002.png",
    "img/enemies/endboss/idle/003.png",
    "img/enemies/endboss/idle/004.png",
    "img/enemies/endboss/idle/005.png",
    "img/enemies/endboss/idle/006.png",
    "img/enemies/endboss/idle/007.png",
    "img/enemies/endboss/idle/008.png",
    "img/enemies/endboss/idle/009.png",
    "img/enemies/endboss/idle/010.png",
    "img/enemies/endboss/idle/011.png",
    "img/enemies/endboss/idle/012.png",
    "img/enemies/endboss/idle/013.png",
    "img/enemies/endboss/idle/014.png",
    "img/enemies/endboss/idle/015.png",
    "img/enemies/endboss/idle/016.png",
    "img/enemies/endboss/idle/017.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 3000;
    this.animate();
    this.collisionBoxOffsetX = 80;
    this.collisionBoxOffsetY = 50;
    this.collisionBoxWidth = -100;
    this.collisionBoxHeight = -80;
  }

  animate() {
    let index = 0;

    setInterval(() => {
      if (world.character.x > 2500 && !this.hadFirstContact) {
        index = 0;
        this.hadFirstContact = true;
      }

      if (!this.hadFirstContact) {
        this.playAnimation(this.IMAGES_IDLE);
        return;
      }

      if (index < 10) {
        this.playAnimation(this.IMAGES_IDLE);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
      }
      index++;
    }, this.frameRate);
  }
}
