class Enemy extends MovableObject {
  y = 305;
  IMAGES_IDLE = [
    "img/enemies/enemy_1/idle/0_Golem_Idle_000.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_001.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_002.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_003.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_004.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_005.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_006.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_007.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_008.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_009.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_010.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_011.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_012.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_013.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_014.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_015.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_016.png",
    "img/enemies/enemy_1/idle/0_Golem_Idle_017.png",
  ];

  constructor() {
    super().loadImage("img/enemies/enemy_1/idle/0_Golem_Idle_000.png");
    this.x = 200 + Math.random() * 500;
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
}
