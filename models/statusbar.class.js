/**
 * Configuration object for different status bar types.
 * Defines the maximum value, starting value and image paths for each type.
 *
 */
const STATUSBAR_CONFIG = {
  health: {
    maxValue: 100,
    startValue: 100,
    images: [
      "img/statusbars/health/health_0.png",
      "img/statusbars/health/health_20.png",
      "img/statusbars/health/health_40.png",
      "img/statusbars/health/health_60.png",
      "img/statusbars/health/health_80.png",
      "img/statusbars/health/health_100.png",
    ],
  },
  branch: {
    maxValue: 3,
    startValue: 0,
    images: ["img/statusbars/branches/branch_0.png", "img/statusbars/branches/branch_1.png", "img/statusbars/branches/branch_2.png", "img/statusbars/branches/branch_3.png"],
  },
  feather: {
    maxValue: 3,
    startValue: 0,
    images: ["img/statusbars/feathers/feather_0.png", "img/statusbars/feathers/feather_1.png", "img/statusbars/feathers/feather_2.png", "img/statusbars/feathers/feather_3.png"],
  },
  endboss: {
    maxValue: 100,
    startValue: 100,
    images: [
      "img/statusbars/endboss_health/health_0.png",
      "img/statusbars/endboss_health/health_20.png",
      "img/statusbars/endboss_health/health_40.png",
      "img/statusbars/endboss_health/health_60.png",
      "img/statusbars/endboss_health/health_80.png",
      "img/statusbars/endboss_health/health_100.png",
    ],
  },
};

/**
 * Represents a status bar in the game (health, collectibles, or endboss).
 * Extends {@link DrawableObject}.
 *
 */
class Statusbar extends DrawableObject {
  hasCollisionBox = false;
  visible = true;
  width = 200;
  height = 50;

  /**
   * Creates a new status bar at the given position.
   *
   * @param {string} type - The status bar type (health, branch, feather, endboss)
   * @param {number} x - The horizontal position
   * @param {number} y - The vertical position
   */
  constructor(type, x, y) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;

    const config = STATUSBAR_CONFIG[type];
    if (!config) throw new Error(`Unknown statusbar type: ${type}`);

    this.maxValue = config.maxValue;
    this.startValue = config.startValue;
    this.IMAGES = config.images;

    this.loadImages(this.IMAGES);
    this.setValue(this.startValue);
  }

  /**
   * Draws the status bar on the canvas if it is visible.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   * @returns - Returns if "visible" is false
   */
  draw(ctx) {
    if (!this.visible) return;
    super.draw(ctx);
  }

  /**
   * Sets the current value of the status bar and updates the displayed image.
   *
   * @param {number} value - The new value to set
   */
  setValue(value) {
    this.value = Math.min(value, this.maxValue);
    this.img = this.imageCache[this.IMAGES[this.getImageIndex(this.value)]];
  }

  /**
   * Determines which image index to use based on the current value.
   *
   * @returns {number} - The index of the image to display
   */
  getImageIndex() {
    if (this.type === "health" || this.type === "endboss") {
      if (this.value === 100) return 5;
      if (this.value >= 80) return 4;
      if (this.value >= 60) return 3;
      if (this.value >= 40) return 2;
      if (this.value > 0) return 1;
      return 0;
    } else {
      if (this.value === 3) return 3;
      if (this.value === 2) return 2;
      if (this.value === 1) return 1;
      return 0;
    }
  }
}
