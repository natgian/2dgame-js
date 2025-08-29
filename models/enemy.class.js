class Enemy extends MovableObject {
  world;
  y = 270;
  health = 20;
  damage = 20;
  isReadyToRemove = false;

  constructor(type = "enemy1") {
    super().loadImage("img/enemies/enemy_1/walking/0_Golem_Walking_000.png");

    this.x = 200 + Math.random() * 800;
    this.speed = 0.15 + Math.random() * 0.75;

    this.isSlashing = false;
    this.nextSlashTime = Date.now() + this.randomSlashInterval();

    this.collisionBoxOffsetX = 40;
    this.collisionBoxOffsetY = 25;
    this.collisionBoxWidth = -80;
    this.collisionBoxHeight = -40;

    if (type === "enemy1") {
      this.IMAGES_WALKING = [
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

      this.IMAGES_DYING = [
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

      this.IMAGES_SLASHING = [
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_000.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_001.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_002.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_003.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_004.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_005.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_006.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_007.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_008.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_009.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_010.png",
        "img/enemies/enemy_1/run_slashing/0_Golem_Run Slashing_011.png",
      ];
    } else if (type === "enemy2") {
      this.IMAGES_WALKING = [
        "img/enemies/enemy_2/walking/0_Golem_Walking_000.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_001.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_002.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_003.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_004.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_005.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_006.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_007.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_008.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_009.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_010.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_011.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_012.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_013.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_014.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_015.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_016.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_017.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_018.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_019.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_020.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_021.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_022.png",
        "img/enemies/enemy_2/walking/0_Golem_Walking_023.png",
      ];
      this.IMAGES_DYING = [
        "img/enemies/enemy_2/dying/0_Golem_Dying_000.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_001.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_002.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_003.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_004.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_005.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_006.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_007.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_008.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_009.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_010.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_011.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_012.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_013.png",
        "img/enemies/enemy_2/dying/0_Golem_Dying_014.png",
      ];
      this.IMAGES_SLASHING = [
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_000.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_001.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_002.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_003.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_004.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_005.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_006.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_007.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_008.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_009.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_010.png",
        "img/enemies/enemy_2/run_slashing/0_Golem_Run Slashing_011.png",
      ];
    }

    const allImages = [...this.IMAGES_WALKING, ...this.IMAGES_DYING, ...this.IMAGES_SLASHING];
    this.loadImages(allImages, () => this.animate());
  }

  hit() {
    super.hit();
    this.world.sound.play("enemy_hit");
  }

  animate() {
    setInterval(() => {
      this.handleEnemyActions();
      this.updateAnimation();
    }, 1000 / 60);
  }

  setRandomPosition() {
    this.x = 600 + Math.random() * 800;
  }

  startSlashing() {
    this.isSlashing = true;
    this.collisionBoxOffsetX = 10;
    this.collisionBoxWidth = -60;

    setTimeout(() => {
      this.isSlashing = false;
      this.collisionBoxOffsetX = 40;
      this.collisionBoxWidth = -80;
    }, 1000);
  }

  randomSlashInterval() {
    return Math.random() * 3000 + 2000; // 2–5 seconds
  }

  handleEnemyActions() {
    if (this.isDead()) return;
    this.moveLeft();
    this.handleSlashing();
  }

  handleSlashing() {
    const now = Date.now();
    if (!this.isSlashing && now >= this.nextSlashTime) {
      this.startSlashing();
      this.nextSlashTime = now + this.randomSlashInterval();
    }
  }

  updateAnimation() {
    if (this.isDead()) {
      if (!this.isInDeathAnimation) {
        this.currentImage = 0;
        this.isInDeathAnimation = true;
      }
      this.animateIsDead();
      return;
    }

    if (this.isSlashing) {
      this.animateSlashing();
    } else {
      this.animateWalking();
    }
  }

  animateIsDead() {
    this.playDeadAnimation(this.IMAGES_DYING);
  }

  animateWalking() {
    this.playAnimation(this.IMAGES_WALKING, 16, true);
  }

  animateSlashing() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_SLASHING, 33);
  }

  playDeadAnimation(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      let path = images[images.length - 1];
      this.img = this.imageCache[path];

      this.isReadyToRemove = true;
    }
  }
}
