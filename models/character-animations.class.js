/**
 * Manages all animations for the character.
 *
 */
class CharacterAnimations {
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

  /**
   * Creates a new CharacterAnimations instance.
   *
   * @param {Character} character - The character instance that uses these animations
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Gets all image paths used for the character's animations.
   *
   * @returns {string[]} - An array of image path strings for all character animations
   */
  getAllImages() {
    return [
      ...this.IMAGES_IDLE,
      ...this.IMAGES_IDLE_BLINKING,
      ...this.IMAGES_WALKING,
      ...this.IMAGES_WALK_AND_SHOOT,
      ...this.IMAGES_JUMP_START,
      ...this.IMAGES_JUMP_LOOP,
      ...this.IMAGES_FALLING,
      ...this.IMAGES_HURT,
      ...this.IMAGES_DYING,
      ...this.IMAGES_SHOOTING,
    ];
  }

  /**
   * Plays the death animation sequence.
   *
   */
  animateIsDead() {
    if (!this.character.isInDeathAnimation) {
      this.character.currentImage = 0;
      this.character.isInDeathAnimation = true;
    }
    this.character.playDeadAnimation(this.IMAGES_DYING);
  }

  /**
   * Plays the hurt animation sequence.
   *
   */
  animateIsHurt() {
    this.character.playAnimation(this.IMAGES_HURT, 16, true);
  }

  /**
   * Plays the jump animation sequences.
   *
   */
  animateIsInTheAir() {
    this.character.world.sound.stop("char_walking");
    if (this.speedY > 0) {
      this.character.playAnimation(this.IMAGES_JUMP_START, 50, false);
    } else if (this.character.speedY === 0) {
      this.character.playAnimation(this.IMAGES_JUMP_LOOP, 100, true);
    } else {
      this.character.playAnimation(this.IMAGES_FALLING, 50, false);
    }
  }

  /**
   * Plays the walking animation sequence.
   *
   */
  animateWalking() {
    this.character.playAnimation(this.IMAGES_WALKING, 16, true);
  }

  /**
   * Plays the shooting animation sequence.
   */
  animateShooting() {
    this.character.playAnimation(this.IMAGES_SHOOTING, 100, false);
    if (this.character.currentImage === this.IMAGES_SHOOTING.length - 1) {
      this.character.isCurrentlyShooting = false;
    }
  }

  /**
   * Plays the walking and shooting animation sequence.
   */
  animateWalkAndShoot() {
    this.character.playAnimation(this.IMAGES_WALK_AND_SHOOT, 66, true);

    if (this.character.currentImage === this.IMAGES_WALK_AND_SHOOT.length - 1) {
      this.character.isCurrentlyWalkingAndShooting = false;
    }
  }

  /**
   * Plays the blinking animation sequence.
   */
  animateBlinking() {
    this.character.playAnimation(this.IMAGES_IDLE_BLINKING, 83, false);
  }

  /**
   * Plays the idle animation sequence and manages blinking.
   *
   * - Initializes the idle timer if it's not set
   * - Checks if the character has been in idle for 10 seconds and starts the blinking animation
   *
   */
  animateIdle() {
    this.initializeIdleTimer();
    this.checkAndStartBlinking();

    if (this.character.isBlinking) {
      this.handleBlinking();
    } else {
      this.character.playAnimation(this.IMAGES_IDLE, 83, true);
    }
  }

  /**
   * Checks if the character has been in idle state more than 10 seconds and triggers the blinking
   * animation if "true".
   *
   */
  checkAndStartBlinking() {
    const elapsedTime = Date.now() - this.character.idleStartTime;
    if (elapsedTime > 10000 && this.character.currentImage % 12 === 0) {
      this.character.isBlinking = true;
      this.character.currentImage = 0;
    }
  }

  /**
   * Handles the blinking by playing the blinking animation and reseting the state once finished.
   *
   */
  handleBlinking() {
    this.animateBlinking();
    this.character.resetBlinking();
  }

  /**
   * Initializes the idle timer if it's not already set.
   *
   */
  initializeIdleTimer() {
    if (!this.character.idleStartTime) {
      this.character.idleStartTime = Date.now();
    }
  }
}
