class Endboss extends Enemy {
  width = 400;
  height = 400;
  y = 50;
  x = 480;
  health = 100;
  damage = 20;
  speed = 0.2;
  collisionBoxOffsetX = 80;
  collisionBoxOffsetY = 50;
  collisionBoxWidth = -60;
  collisionBoxHeight = -100;
  hadFirstContact = false;

  IMAGES_IDLE = Array.from({ length: 18 }, (_, i) => `img/enemies/endboss/idle/${String(i).padStart(3, "0")}.png`);

  IMAGES_WALKING = Array.from({ length: 18 }, (_, i) => `img/enemies/endboss/walking/${String(i).padStart(3, "0")}.png`);

  IMAGES_JUMP_START = Array.from({ length: 6 }, (_, i) => `img/enemies/endboss/jump_start/${String(i).padStart(3, "0")}.png`);

  IMAGES_JUMP_LOOP = Array.from({ length: 6 }, (_, i) => `img/enemies/endboss/jump_loop/${String(i).padStart(3, "0")}.png`);

  IMAGES_FALLING = Array.from({ length: 6 }, (_, i) => `img/enemies/endboss/falling_down/${String(i).padStart(3, "0")}.png`);

  IMAGES_SLASHING = Array.from({ length: 15 }, (_, i) => `img/enemies/endboss/run_smashing/${String(i).padStart(3, "0")}.png`);

  IMAGES_HURT = Array.from({ length: 12 }, (_, i) => `img/enemies/endboss/hurt/${String(i).padStart(3, "0")}.png`);

  IMAGES_DYING = Array.from({ length: 15 }, (_, i) => `img/enemies/endboss/dying/${String(i).padStart(3, "0")}.png`);

  constructor() {
    super();
    this.nextJumpTime = Date.now() + this.randomJumpInterval();
    this.applyGravity();

    this.loadImage("img/enemies/endboss/idle/000.png");

    const allImages = [
      ...this.IMAGES_IDLE,
      ...this.IMAGES_WALKING,
      ...this.IMAGES_JUMP_START,
      ...this.IMAGES_JUMP_LOOP,
      ...this.IMAGES_FALLING,
      ...this.IMAGES_SLASHING,
      ...this.IMAGES_HURT,
      ...this.IMAGES_DYING,
    ];

    this.loadImages(allImages, () => {
      this.animate();
    });
  }

  // animate() {
  //   let index = 0;

  //   setInterval(() => {
  //     if (world.character.x > 2500 && !this.hadFirstContact) {
  //       index = 0;
  //       this.hadFirstContact = true;
  //     }

  //     if (!this.hadFirstContact) {
  //       this.playAnimation(this.IMAGES_IDLE);
  //       return;
  //     }

  //     if (index < 10) {
  //       this.playAnimation(this.IMAGES_IDLE);
  //     } else {
  //       this.playAnimation(this.IMAGES_WALKING);
  //       this.moveLeft();
  //     }
  //     index++;
  //   }, this.frameRate);
  // }

  handleEnemyActions() {
    if (this.isDead()) return;
    this.followCharacter();
    this.handleSlashing();
    this.handleJumping();
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

    if (this.isHurt()) {
      this.isSlashing = false;
      this.animateIsHurt();
    } else if (this.isSlashing) {
      this.animateSlashing();
    } else if (this.isJumping) {
      this.animateIsInTheAir();
    } else {
      this.animateWalking();
    }
  }

  animateWalking() {
    this.playAnimation(this.IMAGES_WALKING, 66, true);
  }

  animateSlashing() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_SLASHING, 66);
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

  startSlashing() {
    this.isSlashing = true;
    this.collisionBoxOffsetX = 60;
    this.collisionBoxWidth = -90;

    setTimeout(() => {
      this.isSlashing = false;
      this.collisionBoxOffsetX = 80;
      this.collisionBoxWidth = -100;
    }, 1000);
  }

  randomJumpInterval() {
    return Math.random() * 3000 + 8000;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isJumping || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this.y >= 50) {
          this.y = 50;
          this.isJumping = false;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  handleJumping() {
    const now = Date.now();

    if (!this.isJumping && now >= this.nextJumpTime) {
      this.isJumping = true;
      this.speedY = 30;
      this.nextJumpTime = now + this.randomJumpInterval();
    }
  }

  isInTheAir() {
    return this.y < 50;
  }

  followCharacter() {
    if (!this.world.character) return;

    const distanceToCharacter = this.world.character.x - this.x;

    if (distanceToCharacter < 150) {
      if (this.otherDirection) {
        this.otherDirection = false;
      }
      this.moveLeft();
    } else if (distanceToCharacter > 150) {
      if (!this.otherDirection) {
        this.otherDirection = true;
      }
      this.moveRight();
    }
  }
}
