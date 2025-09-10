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

  draw(ctx) {
    super.draw(ctx);
    this.fillText(ctx);
  }

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

  getTextColor() {
    return this.craftingAnimation > 0 ? "yellow" : "white";
  }

  getAnimationScale() {
    if (this.craftingAnimation > 0) {
      this.craftingAnimation--;
      return 1 + Math.sin((this.craftingAnimation / 20) * Math.PI) * 1;
    }
    return 1;
  }
}
