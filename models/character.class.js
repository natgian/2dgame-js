class Character extends MovableObject {
  world;
  y = 260;
  speed = 5;

  collisionBoxOffsetX = 40;
  collisionBoxOffsetY = 0;
  collisionBoxWidth = -60;
  collisionBoxHeight = 0;

  lastShoot = 0;
  isCurrentlyWalkingAndShooting = false;
  isCurrentlyShooting = false;

  collectedFeathers = 0;
  collectedBranches = 0;
  maxCollectables = 3;
  craftedArrows = 6;

  IMAGES_IDLE_BLINKING = Array.from({ length: 12 }, (_, i) => `img/character/idle_blinking/${String(i).padStart(2, "0")}_Idle_Blinking.png`);

  IMAGES_IDLE = Array.from({ length: 12 }, (_, i) => `img/character/idle/${String(i).padStart(2, "0")}_Idle.png`);

  IMAGES_WALKING = Array.from({ length: 24 }, (_, i) => `img/character/walking/${String(i).padStart(2, "0")}_Walking.png`);

  IMAGES_JUMP_START = Array.from({ length: 6 }, (_, i) => `img/character/jump_start/${String(i).padStart(2, "0")}_Jump_Start.png`);

  IMAGES_JUMP_LOOP = Array.from({ length: 6 }, (_, i) => `img/character/jump_loop/${String(i).padStart(2, "0")}_Jump_Loop.png`);

  IMAGES_FALLING = Array.from({ length: 6 }, (_, i) => `img/character/falling_down/${String(i).padStart(2, "0")}_Falling_Down.png`);

  IMAGES_HURT = Array.from({ length: 12 }, (_, i) => `img/character/hurt/${String(i).padStart(2, "0")}_Hurt.png`);

  IMAGES_DYING = Array.from({ length: 15 }, (_, i) => `img/character/dying/${String(i).padStart(2, "0")}_Dying.png`);

  IMAGES_SHOOTING = Array.from({ length: 10 }, (_, i) => `img/character/shooting/${String(i).padStart(2, "0")}_Shooting.png`);

  IMAGES_WALK_AND_SHOOT = Array.from({ length: 15 }, (_, i) => `img/character/run_shooting/${String(i).padStart(2, "0")}_Run_Shooting.png`);

  constructor() {
    super();
    this.loadImage("img/character/idle/00_Idle.png");

    const allImages = [
      ...this.IMAGES_IDLE,
      ...this.IMAGES_WALKING,
      ...this.IMAGES_WALK_AND_SHOOT,
      ...this.IMAGES_JUMP_START,
      ...this.IMAGES_JUMP_LOOP,
      ...this.IMAGES_FALLING,
      ...this.IMAGES_HURT,
      ...this.IMAGES_DYING,
      ...this.IMAGES_SHOOTING,
    ];

    this.loadImages(allImages, () => {
      this.animate();
    });

    this.applyGravity();
  }

  hit() {
    super.hit();
    if (!this.world.sound.isPlaying("char_hurt")) {
      this.world.sound.play("char_hurt");
    }
  }

  animate() {
    setInterval(() => {
      this.handlePlayerActions();
      this.updateCamera();
      this.updateAnimation();
    }, 1000 / 60);
  }

  updateCamera() {
    if (this.x < 3300) {
      this.world.cameraX = -this.x + 60;
    }
  }

  handlePlayerActions() {
    if (this.isMovingRight()) {
      this.handleMoveRight();
      this.handleWalkingSound();
    } else if (this.isMovingLeft()) {
      this.handleMoveLeft();
      this.handleWalkingSound();
    } else {
      this.world.sound.stop("char_walking");
    }
    if (this.isJumping()) {
      this.handleJump();
    }
    if (this.isShooting()) {
      this.handleShooting();
    }
    if (this.isWalkingAndShooting()) {
      this.handleWalkingAndShooting();
    }
    if (this.isCrafting()) {
      this.craftArrows();
    }
  }

  isMovingRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
  }

  isMovingLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  isJumping() {
    return this.world.keyboard.SPACE && !this.isInTheAir();
  }

  isCrafting() {
    return this.world.keyboard.F;
  }

  isShooting() {
    return this.world.keyboard.D && !this.isCurrentlyShooting;
  }

  isWalkingAndShooting() {
    return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.world.keyboard.D;
  }

  handleMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
  }

  handleMoveRight() {
    this.moveRight();
    this.otherDirection = false;
  }

  handleWalkingSound() {
    if (!this.world.sound.isPlaying("char_walking")) {
      this.world.sound.play("char_walking", false);
    }
  }

  handleJump() {
    this.jump();
    this.world.sound.play("char_jumping");
  }

  handleShooting() {
    this.isCurrentlyShooting = true;
    this.currentImage = 0;
    this.world.checkThrowObjects();
  }

  handleWalkingAndShooting() {
    this.isCurrentlyWalkingAndShooting = true;
    this.isCurrentlyShooting = false;
    this.world.checkThrowObjects();
  }

  handleCollectable(type) {
    if (type === "feather") {
      if (this.collectedFeathers >= this.maxCollectables) return;
      this.collectedFeathers++;
      this.world.sound.play("char_collect_feather");
      return true;
    } else if (type === "branch") {
      if (this.collectedBranches >= this.maxCollectables) return;
      this.collectedBranches++;
      this.world.sound.play("char_collect_branch");
      return true;
    }
  }

  craftArrows() {
    if (this.collectedBranches === 3 && this.collectedFeathers === 3) {
      this.world.sound.play("char_crafting");

      this.craftedArrows += 3;
      this.collectedBranches -= 3;
      this.collectedFeathers -= 3;

      this.world.level.getStatusBar("branch").setValue(this.collectedBranches);
      this.world.level.getStatusBar("feather").setValue(this.collectedFeathers);
      this.world.arrowCounter.craftingAnimation = 20;
    }
  }

  animateIsDead() {
    this.playDeadAnimation(this.IMAGES_DYING);
  }

  animateIsHurt() {
    this.playAnimation(this.IMAGES_HURT, 16, true);
  }

  animateIsInTheAir() {
    if (this.speedY > 0) {
      this.playAnimation(this.IMAGES_JUMP_START, 50, false);
    } else if (this.speedY === 0) {
      this.playAnimation(this.IMAGES_JUMP_LOOP, 100, true);
    } else {
      this.playAnimation(this.IMAGES_FALLING, 50, false);
    }
  }

  animateWalking() {
    this.playAnimation(this.IMAGES_WALKING, 16, true);
  }

  animateShooting() {
    this.playAnimation(this.IMAGES_SHOOTING, 100, false);
    if (this.currentImage === this.IMAGES_SHOOTING.length - 1) {
      this.isCurrentlyShooting = false;
    }
  }

  animateWalkAndShoot() {
    this.playAnimation(this.IMAGES_WALK_AND_SHOOT, 66, true);

    if (this.currentImage === this.IMAGES_WALK_AND_SHOOT.length - 1) {
      this.isCurrentlyWalkingAndShooting = false;
    }
  }

  animateIdle() {
    this.playAnimation(this.IMAGES_IDLE, 83, true);
  }

  lastArrowShot() {
    let timepassed = new Date().getTime() - this.lastShoot;
    timepassed = timepassed / 1000;
    return timepassed > 1;
  }

  updateAnimation() {
    if (this.isDead()) {
      if (!this.isInDeathAnimation) {
        this.currentImage = 0;
        this.isInDeathAnimation = true;
      }
      this.animateIsDead();
    } else if (this.isHurt()) {
      this.animateIsHurt();
    } else if (this.isCurrentlyShooting) {
      this.animateShooting();
    } else if (this.isCurrentlyWalkingAndShooting) {
      this.animateWalkAndShoot();
    } else if (this.isInTheAir()) {
      this.animateIsInTheAir();
    } else if (this.isWalking()) {
      this.animateWalking();
    } else {
      this.animateIdle();
    }
  }
}
