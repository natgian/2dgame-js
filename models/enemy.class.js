class Enemy extends MovableObject {
  y = 305;
  frameRate = this.speed * 200;

  IMAGES_WALKING = [
    "img/enemies/enemy_1/walking/0_Golem_Walking_000.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_001.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_002.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_003.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_004.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_005.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_006.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_007.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_008.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_009.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_010.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_011.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_012.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_013.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_014.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_015.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_016.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_017.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_018.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_019.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_020.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_021.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_022.png",
    "img/enemies/enemy_1/walking/0_Golem_Walking_023.png",
  ];

  constructor() {
    super().loadImage("img/enemies/enemy_1/idle/0_Golem_Idle_000.png");
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.15 + Math.random() * 0.75;
    this.animate();
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      let index = this.currentImage % this.IMAGES_WALKING.length; // keeps the index inside the array length so the animation loops from start again
      let path = this.IMAGES_WALKING[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, this.frameRate);
  }
}
