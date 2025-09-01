class Enemy extends MovableObject {
  world;
  y = 270;
  health = 20;
  damage = 20;
  isReadyToRemove = false;

  constructor(type = "enemy_1") {
    super();
    this.loadImage(`img/enemies/${type}/walking/0_Golem_Walking_000.png`);

    this.type = type;

    this.speed = 0.15 + Math.random() * 0.25;

    this.isSlashing = false;
    this.nextSlashTime = Date.now() + this.randomSlashInterval();

    this.collisionBoxOffsetX = 40;
    this.collisionBoxOffsetY = 25;
    this.collisionBoxWidth = -80;
    this.collisionBoxHeight = -40;

    this.IMAGES_WALKING = Array.from({ length: 24 }, (_, i) => `img/enemies/${type}/walking/0_Golem_Walking_${String(i).padStart(3, "0")}.png`);

    this.IMAGES_DYING = Array.from({ length: 15 }, (_, i) => `img/enemies/${type}/dying/0_Golem_Dying_${String(i).padStart(3, "0")}.png`);

    this.IMAGES_SLASHING = Array.from({ length: 12 }, (_, i) => `img/enemies/${type}/run_slashing/0_Golem_Run_Slashing_${String(i).padStart(3, "0")}.png`);

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
    this.x = 800 + Math.random() * 2000;
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
