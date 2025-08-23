class Character extends MovableObject {
  world;
  y = 260;
  speed = 5;

  lastShoot = 0;
  isCurrentlyWalkingAndShooting = false;
  isCurrentlyShooting = false;

  collectedFeathers = 0;
  collectedBranches = 0;
  maxCollectables = 3;
  craftedArrows = 3;

  IMAGES_IDLE_BLINKING = [
    "img/character/idle_blinking/00_Idle_Blinking.png",
    "img/character/idle_blinking/01_Idle_Blinking.png",
    "img/character/idle_blinking/02_Idle_Blinking.png",
    "img/character/idle_blinking/03_Idle_Blinking.png",
    "img/character/idle_blinking/04_Idle_Blinking.png",
    "img/character/idle_blinking/05_Idle_Blinking.png",
    "img/character/idle_blinking/06_Idle_Blinking.png",
    "img/character/idle_blinking/07_Idle_Blinking.png",
    "img/character/idle_blinking/08_Idle_Blinking.png",
    "img/character/idle_blinking/09_Idle_Blinking.png",
    "img/character/idle_blinking/10_Idle_Blinking.png",
    "img/character/idle_blinking/11_Idle_Blinking.png",
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
  IMAGES_JUMPING = [
    "img/character/jump_start/00_Jump_Start.png",
    "img/character/jump_start/01_Jump_Start.png",
    "img/character/jump_start/02_Jump_Start.png",
    "img/character/jump_start/03_Jump_Start.png",
    "img/character/jump_start/04_Jump_Start.png",
    "img/character/jump_start/05_Jump_Start.png",
    "img/character/jump_loop/00_Jump_Loop.png",
    "img/character/jump_loop/01_Jump_Loop.png",
    "img/character/jump_loop/02_Jump_Loop.png",
    "img/character/jump_loop/03_Jump_Loop.png",
    "img/character/jump_loop/04_Jump_Loop.png",
    "img/character/jump_loop/05_Jump_Loop.png",
    "img/character/falling_down/00_Falling_Down.png",
    "img/character/falling_down/01_Falling_Down.png",
    "img/character/falling_down/02_Falling_Down.png",
    "img/character/falling_down/03_Falling_Down.png",
    "img/character/falling_down/04_Falling_Down.png",
    "img/character/falling_down/05_Falling_Down.png",
  ];
  IMAGES_HURT = [
    "img/character/hurt/00_Hurt.png",
    "img/character/hurt/01_Hurt.png",
    "img/character/hurt/02_Hurt.png",
    "img/character/hurt/03_Hurt.png",
    "img/character/hurt/04_Hurt.png",
    "img/character/hurt/05_Hurt.png",
    "img/character/hurt/06_Hurt.png",
    "img/character/hurt/07_Hurt.png",
    "img/character/hurt/08_Hurt.png",
    "img/character/hurt/09_Hurt.png",
    "img/character/hurt/10_Hurt.png",
    "img/character/hurt/11_Hurt.png",
  ];
  IMAGES_DYING = [
    "img/character/dying/00_Dying.png",
    "img/character/dying/01_Dying.png",
    "img/character/dying/02_Dying.png",
    "img/character/dying/03_Dying.png",
    "img/character/dying/04_Dying.png",
    "img/character/dying/05_Dying.png",
    "img/character/dying/06_Dying.png",
    "img/character/dying/07_Dying.png",
    "img/character/dying/08_Dying.png",
    "img/character/dying/09_Dying.png",
    "img/character/dying/10_Dying.png",
    "img/character/dying/11_Dying.png",
    "img/character/dying/12_Dying.png",
    "img/character/dying/13_Dying.png",
    "img/character/dying/14_Dying.png",
  ];
  IMAGES_SHOOTING = [
    "img/character/shooting/00_Shooting.png",
    "img/character/shooting/01_Shooting.png",
    "img/character/shooting/02_Shooting.png",
    "img/character/shooting/03_Shooting.png",
    "img/character/shooting/04_Shooting.png",
    "img/character/shooting/05_Shooting.png",
    "img/character/shooting/06_Shooting.png",
    "img/character/shooting/07_Shooting.png",
    "img/character/shooting/08_Shooting.png",
    "img/character/shooting/09_Shooting.png",
  ];
  IMAGES_WALK_AND_SHOOT = [
    "img/character/run_shooting/00_Run_Shooting.png",
    "img/character/run_shooting/01_Run_Shooting.png",
    "img/character/run_shooting/02_Run_Shooting.png",
    "img/character/run_shooting/03_Run_Shooting.png",
    "img/character/run_shooting/04_Run_Shooting.png",
    "img/character/run_shooting/05_Run_Shooting.png",
    "img/character/run_shooting/06_Run_Shooting.png",
    "img/character/run_shooting/07_Run_Shooting.png",
    "img/character/run_shooting/08_Run_Shooting.png",
    "img/character/run_shooting/09_Run_Shooting.png",
    "img/character/run_shooting/10_Run_Shooting.png",
    "img/character/run_shooting/11_Run_Shooting.png",
    "img/character/run_shooting/12_Run_Shooting.png",
    "img/character/run_shooting/13_Run_Shooting.png",
    "img/character/run_shooting/14_Run_Shooting.png",
  ];

  constructor() {
    super().loadImage("img/character/idle/00_Idle.png");

    const allImages = [...this.IMAGES_IDLE, ...this.IMAGES_WALKING, ...this.IMAGES_JUMPING, ...this.IMAGES_HURT, ...this.IMAGES_DYING, ...this.IMAGES_SHOOTING, ...this.IMAGES_WALK_AND_SHOOT];

    this.loadImages(allImages, () => {
      this.animate();
    });

    this.collisionBoxOffsetX = 35;
    this.collisionBoxOffsetY = 0;
    this.collisionBoxWidth = -50;
    this.collisionBoxHeight = 0;

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
    this.world.cameraX = -this.x + 80;
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
    this.playAnimation(this.IMAGES_JUMPING, 83, true);
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
    this.playAnimation(this.IMAGES_WALK_AND_SHOOT, 83, true);

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
