class ArrowCounter extends DrawableObject {
  constructor(character) {
    super();
    this.loadImage("img/misc/arrow_status.png");
    this.character = character;
    this.x = 600;
    this.y = 0;
    this.width = 125;
    this.height = 125;
    this.hasCollisionBox = false;
    this.craftingAnimation = 0;
  }

  /**
   * Draws the arrow counter on the canvas, including the current arrow count
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  draw(ctx) {
    super.draw(ctx);
    this.fillText(ctx);
  }

  /**
   * Draws the number of crafted arrows, includes an animation
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  fillText(ctx) {
    ctx.save();
    ctx.font = "20px Lora";
    ctx.shadowColor = "#6d3103";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.fillStyle = this.getTextColor();
    const animationScale = this.getAnimationScale();
    ctx.translate(this.x + this.width - 64, this.y + 72);
    ctx.scale(animationScale, animationScale);
    ctx.fillText(`${this.character.craftedArrows}`, 0, 0);
    ctx.restore();
  }

  /**
   * Returns the text color for the arrow count
   *
   * @returns {string} - Returns "yellow" if it's animating, otherwise "white"
   */
  getTextColor() {
    return this.craftingAnimation > 0 ? "yellow" : "white";
  }

  /**
   * Calculates the animation scale for the arrow count text.
   *
   * Reduces the craftingAnimation counter each frame if active and returns
   * a scaling factor based on a sine wave to create a pulsating effect.
   *
   * @returns {number} - The scale factor to apply to the text
   */
  getAnimationScale() {
    if (this.craftingAnimation > 0) {
      this.craftingAnimation--;
      return 1 + Math.sin((this.craftingAnimation / 20) * Math.PI);
    }
    return 1;
  }
}
