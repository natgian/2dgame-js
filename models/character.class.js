class Character extends MovableObject {
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

  constructor() {
    super().loadImage("img/character/idle/00_Idle.png"); // the loadImage function is called and executed from the MovableObject superclass
    this.loadImages(this.IMAGES_IDLE);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let index = this.currentImage % this.IMAGES_IDLE.length; // keeps the index inside the array length so the animation loops from start again
      let path = this.IMAGES_IDLE[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  jump() {}
}
