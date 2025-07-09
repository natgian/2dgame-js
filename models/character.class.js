class Character extends MovableObject {
  world;
  speed = 5;
  IMAGES_IDLE_BLINKING = [
    "img/character/idle_blinking/00_Idle Blinking.png",
    "img/character/idle_blinking/01_Idle Blinking.png",
    "img/character/idle_blinking/02_Idle Blinking.png",
    "img/character/idle_blinking/03_Idle Blinking.png",
    "img/character/idle_blinking/04_Idle Blinking.png",
    "img/character/idle_blinking/05_Idle Blinking.png",
    "img/character/idle_blinking/06_Idle Blinking.png",
    "img/character/idle_blinking/07_Idle Blinking.png",
    "img/character/idle_blinking/08_Idle Blinking.png",
    "img/character/idle_blinking/09_Idle Blinking.png",
    "img/character/idle_blinking/10_Idle Blinking.png",
    "img/character/idle_blinking/11_Idle Blinking.png",
  ];

  IMAGES_IDLE = [
    "img/character/idle/00_Idle.png",
    "img/character/idle/01_Idle.png",
    "img/character/idle/02_Idle.png",
    "img/character/idle/03_Idle.png",
    "img/character/idle/04_Idle.png",
    "img/character/idle/05_Idle.png",
    "img/character/idle/06_Idle.png",
    "img/character/idle/07_Idle.png",
    "img/character/idle/08_Idle.png",
    "img/character/idle/09_Idle.png",
    "img/character/idle/10_Idle.png",
    "img/character/idle/11_Idle.png",
  ];

  IMAGES_WALKING = [
    "img/character/walking/00_Walking.png",
    "img/character/walking/01_Walking.png",
    "img/character/walking/02_Walking.png",
    "img/character/walking/03_Walking.png",
    "img/character/walking/04_Walking.png",
    "img/character/walking/05_Walking.png",
    "img/character/walking/06_Walking.png",
    "img/character/walking/07_Walking.png",
    "img/character/walking/08_Walking.png",
    "img/character/walking/09_Walking.png",
    "img/character/walking/10_Walking.png",
    "img/character/walking/11_Walking.png",
    "img/character/walking/12_Walking.png",
    "img/character/walking/13_Walking.png",
    "img/character/walking/14_Walking.png",
    "img/character/walking/15_Walking.png",
    "img/character/walking/16_Walking.png",
    "img/character/walking/17_Walking.png",
    "img/character/walking/18_Walking.png",
    "img/character/walking/19_Walking.png",
    "img/character/walking/20_Walking.png",
    "img/character/walking/21_Walking.png",
    "img/character/walking/22_Walking.png",
    "img/character/walking/23_Walking.png",
  ];

  constructor() {
    super().loadImage("img/character/idle/00_Idle.png"); // the loadImage function is called and executed from the MovableObject superclass
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // WALK animation
        let index = this.currentImage % this.IMAGES_WALKING.length; // keeps the index inside the array length so the animation loops from start again
        let path = this.IMAGES_WALKING[index];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 25);

    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        // IDLE animation
        let index = this.currentImage % this.IMAGES_IDLE.length;
        let path = this.IMAGES_IDLE[index];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 100);
  }

  jump() {}
}
