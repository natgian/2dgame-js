class ArrowCounter extends DrawableObject {
  constructor(character) {
    super().loadImage("img/misc/arrow_status.png");
    this.character = character;
    this.x = 600;
    this.y = 0;
    this.width = 125;
    this.height = 125;

    this.hasCollisionBox = false;
  }

  draw(ctx) {
    super.draw(ctx);
    this.fillText(ctx);
  }

  fillText(ctx) {
    ctx.save(); // saves the current state
    ctx.font = "20px Lora";
    ctx.fillStyle = "white";
    ctx.shadowColor = "#6d3103";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.fillText(`${this.character.craftedArrows}`, this.x + this.width - 60, this.y + 72);
    ctx.restore(); // restores the state before the text (so that it is not used on everything)
  }
}
