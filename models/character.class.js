/**
 * Represents the main character controlled by the player in the game.
 * Extends {@link MovableObject}.
 *
 */
class Character extends MovableObject {
  world;
  y = 260;
  speed = 5;

  collisionBoxOffsetX = 40;
  collisionBoxOffsetY = 20;
  collisionBoxWidth = -60;
  collisionBoxHeight = -30;

  lastShoot = 0;
  isCurrentlyWalkingAndShooting = false;
  isCurrentlyShooting = false;

  collectedFeathers = 0;
  collectedBranches = 0;
  maxCollectibles = 3;
  craftedArrows = 9;

  idleStartTime = null;
  isBlinking = false;

  constructor() {
    super();
    this.animations = new CharacterAnimations(this);
    this.loadImage("img/character/idle/00_Idle.png");
    this.loadImages(this.animations.getAllImages(), () => {
      this.animate();
    });
    this.applyGravity();
  }

  /**
   * Reduces the character health by calling the inherited method and plays a hurt sound.
   *
   */
  hit() {
    super.hit();
    if (!this.world.sound.isPlaying("char_hurt")) {
      this.world.sound.play("char_hurt");
    }
  }

  /**
   * Starts the main update loop for the character.
   * Handles player input, camera movement, and animation state updates.
   *
   */
  animate() {
    setInterval(() => {
      this.handlePlayerActions();
      this.updateCamera();
      this.updateAnimation();
    }, 1000 / 60);
  }

  /**
   * Updates the camera position to follow the character, unless the level end has been reached.
   *
   */
  updateCamera() {
    if (this.x < 3300) {
      this.world.cameraX = -this.x + 60;
    }
  }

  /**
   * Handles all player actions like movements, jumping, shooting, crafting and death check.
   *
   * @returns - Exits immediately if the character is dead
   */
  handlePlayerActions() {
    if (this.isDead()) return;
    this.handleMovement();
    if (this.isJumping()) this.handleJump();
    if (this.isShooting()) this.handleShooting();
    if (this.isWalkingAndShooting()) this.handleWalkingAndShooting();
    if (this.isCrafting()) this.craftArrows();
  }

  /**
   * Checks if the player is moving right.
   *
   * @returns {boolean} - "True" if the RIGHT key is pressed and the level end has not been reached
   */
  isMovingRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
  }

  /**
   * Checks if the player is moving left.
   *
   * @returns {boolean} - "True" if the LEFT key is pressed and the beginning of the level has not
   * been reached
   */
  isMovingLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Checks if the character is walking.
   *
   * @returns {boolean} - "True" if the RIGHT or LEFT key is pressed
   */
  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character is jumping.
   *
   * @returns {boolean} - "True" if the SPACE key is pressed and the character is currently not
   * in the air
   */
  isJumping() {
    return this.world.keyboard.SPACE && !this.isInTheAir();
  }

  /**
   * Checks if the character is crafting.
   *
   * @returns {boolean} - "True" if the F key is pressed
   */
  isCrafting() {
    return this.world.keyboard.F;
  }

  /**
   * Checks if the character is shooting.
   *
   * @returns {boolean} - "True" if the D key is pressed and the character is not already shooting
   */
  isShooting() {
    return this.world.keyboard.D && !this.isCurrentlyShooting;
  }

  /**
   * Checks if the character is walking and shooting.
   *
   * @returns {boolean} - "True" if the RIGHT or LEFT key and the D key are pressed
   */
  isWalkingAndShooting() {
    return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.world.keyboard.D;
  }

  /**
   * Handles the character movements (left and right).
   *
   */
  handleMovement() {
    if (this.isMovingRight()) {
      this.handleMoveRight();
      this.handleWalkingSound();
    } else if (this.isMovingLeft()) {
      this.handleMoveLeft();
      this.handleWalkingSound();
    } else {
      this.world.sound.stop("char_walking");
    }
  }

  /**
   * Handles the characters left movement.
   *
   */
  handleMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
  }

  /**
   * Handles the characters right movement.
   *
   */
  handleMoveRight() {
    this.moveRight();
    this.otherDirection = false;
  }

  /**
   * Handles the characters walking sound.
   *
   */
  handleWalkingSound() {
    if (!this.world.sound.isPlaying("char_walking")) {
      this.world.sound.play("char_walking", false);
    }
  }

  /**
   * Handles the character jumping.
   *
   */
  handleJump() {
    this.jump();
    this.world.sound.play("char_jumping");
  }

  /**
   * Handles the character shooting.
   *
   */
  handleShooting() {
    this.isCurrentlyShooting = true;
    this.currentImage = 0;
    this.world.checkThrowObjects();
  }

  /**
   * Handles the character walking and shooting.
   *
   */
  handleWalkingAndShooting() {
    this.isCurrentlyWalkingAndShooting = true;
    this.isCurrentlyShooting = false;
    this.world.checkThrowObjects();
  }

  /**
   * Ends the blinking animation and resets the idle timer.
   *
   */
  resetBlinking() {
    if (this.currentImage >= this.animations.IMAGES_IDLE_BLINKING.length - 1) {
      this.isBlinking = false;
      this.idleStartTime = Date.now();
      this.currentImage = 0;
    }
    return;
  }

  /**
   * Increases the counter of the collected item (feather or branch) and plays a corresponding sound.
   *
   * @param {string} type - The type of collectible ("feather" or "branch")
   * @returns {boolean} - "True" if a collectible has been collected, otherwise "false"
   */
  handleCollectible(type) {
    if (type === "feather") {
      if (this.collectedFeathers >= this.maxCollectibles) return;
      this.collectedFeathers++;
      this.world.sound.play("char_collect_feather");
      return true;
    } else if (type === "branch") {
      if (this.collectedBranches >= this.maxCollectibles) return;
      this.collectedBranches++;
      this.world.sound.play("char_collect_branch");
      return true;
    }
  }

  /**
   * Handles the arrow crafting (only active if the player has collected 3 of each collectibles).
   * Updates the counters and status bars.
   *
   */
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

  /**
   * Checks if enough time has passed since the last arrow was shot.
   *
   * @returns {boolean} - "True" if more than 1 second has passed since the last shot,
   * otherwise "false"
   */
  lastArrowShot() {
    let timepassed = new Date().getTime() - this.lastShoot;
    timepassed = timepassed / 1000;
    return timepassed > 1;
  }

  /**
   * Updates the animation state based on character status (dead, hurt, shooting...).
   *
   */
  updateAnimation() {
    if (this.isDead()) {
      this.animations.animateIsDead();
    } else if (this.isHurt()) {
      this.animations.animateIsHurt();
    } else if (this.isCurrentlyShooting) {
      this.animations.animateShooting();
    } else if (this.isCurrentlyWalkingAndShooting) {
      this.animations.animateWalkAndShoot();
    } else if (this.isInTheAir()) {
      this.animations.animateIsInTheAir();
    } else if (this.isWalking()) {
      this.animations.animateWalking();
    } else {
      this.animations.animateIdle();
    }
  }
}
