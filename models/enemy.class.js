class Enemy extends MovableObject {
  y = 270;
  frameRate = this.speed * 200;
  health = 20;
  isReadyToRemove = false;

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

  IMAGES_DYING = [
    "img/enemies/enemy_1/dying/0_Golem_Dying_000.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_001.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_002.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_003.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_004.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_005.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_006.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_007.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_008.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_009.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_010.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_011.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_012.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_013.png",
    "img/enemies/enemy_1/dying/0_Golem_Dying_014.png",
  ];

  SOUND_HIT = new Audio("audio/hit_enemy.mp3");

  constructor() {
    super().loadImage("img/enemies/enemy_1/walking/0_Golem_Walking_000.png");

    const allImages = [...this.IMAGES_WALKING, ...this.IMAGES_DYING];
    this.loadImages(allImages, () => this.animate());

    this.x = 200 + Math.random() * 800;
    this.speed = 0.15 + Math.random() * 0.75;

    this.collisionBoxOffsetX = 40;
    this.collisionBoxOffsetY = 25;
    this.collisionBoxWidth = -80;
    this.collisionBoxHeight = -40;
  }

  animate() {
    setInterval(() => {
      this.updateAnimation();
    }, 1000 / 60);
  }

  setRandomPosition() {
    this.x = 600 + Math.random() * 800;
  }

  updateAnimation() {
    this.animateWalking();
  }

  animateWalking() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING, 16, true);
  }
}
