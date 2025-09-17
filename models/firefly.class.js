class Firefly extends MovableObject {
  width = 70;
  height = 80;

  constructor(level) {
    super().loadImage("img/misc/firefly.png");
    this.level = level;
    this.resetPositionAndVelocity();
    this.animate();
    this.hasCollisionBox = false;
  }

  /**
   * Resets the firefly to a random position and velocity.
   *
   * - x is randomized across the level width
   * - y is randomized across the height (480px)
   * - velocityX is between 0.3 and 1.0
   * - velocityY is between -0.5 and 0.5
   *
   */
  resetPositionAndVelocity() {
    this.x = Math.random() * this.level.levelEndX;
    this.y = Math.random() * 480;
    this.velocityX = 0.3 + Math.random() * 0.7;
    this.velocityY = (Math.random() - 0.5) * 1;
  }

  /**
   * Animates the firefly.
   *
   * - x and y positions are updated every frame
   *
   */
  animate() {
    setInterval(() => {
      this.x += this.velocityX;
      this.y += this.velocityY;

      this.velocityY += (Math.random() - 0.5) * 0.1;
      this.velocityY = Math.max(Math.min(this.velocityY, 0.7), -0.7);

      if (this.x > this.level.levelEndX + 50) {
        this.x = -Math.random() * 200;
        this.y = Math.random() * 480;
      }
    }, 1000 / 60);
  }

  /**
   * Moves the firefly to a new random spot in the game.
   *
   * This method also gives the firefly a new random speed
   * (because it uses resetPositionAndVelocity inside).
   *
   */
  setRandomPosition() {
    this.resetPositionAndVelocity();
  }
}
