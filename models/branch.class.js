/**
 * A collectible branch that can be placed in the world.
 * Extends {@link DrawableObject}.
 */
class Branch extends DrawableObject {
  width = 120;
  height = 120;
  constructor() {
    super();
    this.loadImage("img/misc/branch.png");
    this.collisionBoxOffsetX = 20;
    this.collisionBoxOffsetY = 40;
    this.collisionBoxWidth = this.width - 150;
    this.collisionBoxHeight = this.height - 200;
  }

  /**
   * Sets the branch at a random position
   *
   * - x is randomized between 300 and (3200 - branch width)
   * - y is fixed at 320
   *
   */
  setRandomPosition() {
    this.x = 300 + Math.random() * (3200 - this.width);
    this.y = 320;
  }
}
