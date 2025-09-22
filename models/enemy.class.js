/**
 * Represents an enemy in the game.
 * Extends {@link MovableObject}.
 *
 */
class Enemy extends MovableObject {
  world;
  y = 270;
  health = 20;
  damage = 20;
  isReadyToRemove = false;

  /**
   * Creates a new enemy instance.
   *
   * @param {string} type - The enemy type, used to determine image paths
   */
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

  /**
   * Reduces the enemy's health by calling the inherited method and plays a hit sound.
   *
   */
  hit() {
    super.hit();
    this.world.sound.play("enemy_hit");
  }

  /**
   * Starts the animation loop for the enemy.
   *
   */
  animate() {
    setInterval(() => {
      this.handleEnemyActions();
      this.updateAnimation();
    }, 1000 / 60);
  }

  /**
   * Sets a random horizontal position for the enemy.
   *
   */
  setRandomPosition() {
    this.x = 800 + Math.random() * 2000;
  }

  /**
   * Starts the slashing attack and temporarily adjusts the collision boxes.
   * Resets after 1 second.
   *
   */
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

  /**
   * Generates a random time interval for the next slash attack.
   *
   * @returns {number} - A random interval in miliseconds (between 2000-5000 ms)
   */
  randomSlashInterval() {
    return Math.random() * 3000 + 2000;
  }

  /**
   * Handles the enemy actions like moving and slashing.
   *
   * @returns - Exits immediately if the enemy is dead
   */
  handleEnemyActions() {
    if (this.isDead()) return;
    this.moveLeft();
    this.handleSlashing();
  }

  /**
   * Determines if the enemy should start slashing based on time and state.
   *
   */
  handleSlashing() {
    const now = Date.now();
    if (!this.isSlashing && now >= this.nextSlashTime) {
      this.startSlashing();
      this.nextSlashTime = now + this.randomSlashInterval();
    }
  }

  /**
   * Updates the animation state based on enemy status (dead, slashing or walking).
   *
   */
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

  /**
   * Plays the death animation sequence.
   *
   */
  animateIsDead() {
    this.playDeadAnimation(this.IMAGES_DYING);
  }

  /**
   * Plays the walking animation sequence.
   *
   */
  animateWalking() {
    this.playAnimation(this.IMAGES_WALKING, 16, true);
  }

  /**
   * Plays the slashing animation sequence.
   *
   */
  animateSlashing() {
    this.playAnimation(this.IMAGES_SLASHING, 33);
  }

  /**
   * Plays the death animation using the provided image sequence.
   * Marks the enemy as ready to remove after the animation ends.
   *
   * @param {string[]} images. - The array of image paths for the death animation
   */
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
