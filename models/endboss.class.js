/**
 * Represents the endboss in the game.
 *
 */

class Endboss extends Enemy {
  width = 400;
  height = 400;
  y = 50;
  x = 3600;
  health = 100;
  damage = 20;
  speed = 1;
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

  /**
   * Creates a new Endboss instance.
   *
   * @param {Statusbar} statusbar - The status bar linked to the endboss health
   */
  constructor(statusbar) {
    super();
    this.type = "endboss";
    this.nextJumpTime = Date.now() + this.randomJumpInterval();
    this.applyGravity();
    this.statusbar = statusbar;

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

  /**
   * Reduces the endboss health by calling the inherited method and plays a hit and hurt sound.
   *
   */
  hit() {
    super.hit();
    this.world.sound.play("endboss_hit");
    this.world.sound.play("endboss_hurt");
  }

  /**
   * Handles the endboss behavior (movement, slashing, jumping).
   *
   * @returns - If the endboss is dead or there was no first conctact with the character yet
   */
  handleEnemyActions() {
    if (this.isDead()) return;
    if (!this.hadFirstContact) return;
    this.followCharacter();
    this.handleSlashing();
    this.handleJumping();
  }

  /**
   * Updates the animation state of the endboss.
   *
   */
  updateAnimation() {
    this.activateFirstContact();

    if (this.isDead()) return this.handleDeath();

    if (this.hadFirstContact) {
      this.animateMovements();
    } else {
      this.animateIdle();
    }
  }

  /**
   * Activates the first encounter with the endboss.
   * Makes the status bar visible, sets the first contact flag and plays a sound.
   *
   */
  activateFirstContact() {
    if (this.world.character.x >= 3200 && !this.hadFirstContact) {
      this.statusbar.visible = true;
      this.hadFirstContact = true;
      this.world.sound.play("endboss_growl");
    }
  }

  /**
   * Handles the death sequence for the endboss.
   * Resets the animation index if needed and plays the death animation.
   *
   * @returns
   */
  handleDeath() {
    if (!this.isInDeathAnimation) {
      this.currentImage = 0;
      this.isInDeathAnimation = true;
    }
    this.animateIsDead();
  }

  /**
   * Updates the animation state based the endboss state (hurt, slashing, jumping, walking).
   */
  animateMovements() {
    if (this.isHurt()) {
      this.isSlashing = false;
      this.animateIsHurt();
    } else if (this.isSlashing) {
      this.animateSlashing();
    } else if (this.isJumping) {
      this.animateJumping();
    } else {
      this.animateWalking();
    }
  }

  /**
   * Plays the idle animation sequence.
   *
   */
  animateIdle() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Plays the walking animation sequence.
   *
   */
  animateWalking() {
    this.playAnimation(this.IMAGES_WALKING, 33, true);
  }

  /**
   * Plays the slashing animation sequence.
   *
   */
  animateSlashing() {
    this.playAnimation(this.IMAGES_SLASHING, 66);
  }

  /**
   * Plays the hurt animation sequence.
   *
   */
  animateIsHurt() {
    this.playAnimation(this.IMAGES_HURT, 16, true);
  }

  /**
   * Plays the jumping animation sequence.
   *
   */
  animateJumping() {
    if (this.speedY > 0) {
      this.playAnimation(this.IMAGES_JUMP_START, 50, false);
    } else if (this.speedY === 0) {
      this.playAnimation(this.IMAGES_JUMP_LOOP, 100, true);
    } else {
      this.playAnimation(this.IMAGES_FALLING, 50, false);
    }
  }

  /**
   * Initiates a slashing attack and adjusts the collision box temporarily.
   *
   */
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

  /**
   * Applies gravity to the endboss if he is jumping or or falling.
   *
   */
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

  /**
   * Initiates a jump if he is not already jumping and the jump timer has passed.
   *
   */
  handleJumping() {
    const now = Date.now();

    if (!this.isJumping && now >= this.nextJumpTime) {
      this.isJumping = true;
      this.speedY = 30;
      this.nextJumpTime = now + this.randomJumpInterval();
    }
  }

  /**
   * Checks if the endboss is currently in the are.
   *
   * @returns {boolean} - "True" if is in the air, otherwise "false"
   */
  isInTheAir() {
    return this.y < 50;
  }

  /**
   * Returns a random jump interval in milliseconds.
   *
   * @returns {number} - Random interval between 5000-8000 ms
   */
  randomJumpInterval() {
    return Math.random() * 3000 + 5000;
  }

  /**
   * Moves the endboss toward the character depending on distance.
   * If the character changes direction the endboss follows.
   *
   */
  followCharacter() {
    if (!this.world.character) return;

    const distanceToCharacter = this.world.character.x - this.x;

    if (distanceToCharacter < 150) {
      this.otherDirection = false;
      this.moveLeft();
    } else if (distanceToCharacter > 150) {
      this.otherDirection = true;
      this.moveRight();
    }
  }
}
