class World {
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  character = new Character();
  level = level1;
  arrowCounter = new ArrowCounter(this.character);
  arrows = [];
  hintTextVisible = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // The getContext(“2d”) method returns a so-called rendering context object. This contains all the methods and properties needed to draw on the canvas: Lines, shapes, images, text, etc.
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.sound = new AudioManager();

    // Character sounds
    this.sound.load("char_walking", "audio/running_in_grass.mp3", true);
    this.sound.load("char_collect_branch", "audio/collect_branch.mp3", false, 0.6);
    this.sound.load("char_collect_feather", "audio/collect_feather.mp3", false);
    this.sound.load("char_crafting", "audio/craft_item.wav", false);
    this.sound.load("char_shooting", "audio/wind_swoosh.mp3", false);
    this.sound.load("char_jumping", "audio/whoosh_jump.mp3", false, 0.1);
    this.sound.load("char_hurt", "audio/hurt.mp3", false);

    // Enemy sounds
    this.sound.load("enemy_hit", "audio/hit_enemy.mp3", false, 0.2);
    this.sound.load("endboss_growl", "audio/endboss_growl.mp3", false, 0.2);
    this.sound.load("endboss_hurt", "audio/endboss_hurt.mp3", false);
    this.sound.load("endboss_hit", "audio/endboss_hit.mp3", false);

    this.sound.load("bg_music", "audio/fairy_background_music.mp3", true);

    this.draw();
    this.setWorld();

    this.runCollisionInterval();
    this.runArrowCollisionInterval();
    this.runCleanupInterval();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => (enemy.world = this));
    if (this.level.endboss) {
      this.level.endboss.world = this;
    }
  }

  runCollisionInterval() {
    setInterval(() => {
      this.checkCollisions();
    }, 200);
  }
  runArrowCollisionInterval() {
    setInterval(() => {
      this.checkArrowEnemyCollision();
    }, 50);
  }

  runCleanupInterval() {
    setInterval(() => {
      this.removeDeadEnemies();
    }, 1000 / 60);
  }

  removeDeadEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isReadyToRemove);
  }

  checkCollisions() {
    this.checkCharacterEnemyCollision();
    this.checkCharacterCollectableCollision("feathers", "feather");
    this.checkCharacterCollectableCollision("branches", "branch");
  }

  checkCharacterEnemyCollision() {
    const allEnemies = [...this.level.enemies, this.level.endboss];

    allEnemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isDead()) {
          this.character.hit();
          this.level.statusBars[0].setValue(this.character.health);
        }
      }
    });
  }

  checkArrowEnemyCollision() {
    for (let arrowIndex = this.arrows.length - 1; arrowIndex >= 0; arrowIndex--) {
      const arrow = this.arrows[arrowIndex];
      let arrowHit = false;

      for (let enemyIndex = this.level.enemies.length - 1; enemyIndex >= 0; enemyIndex--) {
        const enemy = this.level.enemies[enemyIndex];
        if (arrow.isColliding(enemy)) {
          clearInterval(arrow.throwInterval);
          this.arrows.splice(arrowIndex, 1);
          enemy.hit();
          arrowHit = true;
          break;
        }
      }

      if (!arrowHit && this.level.endboss && arrow.isColliding(this.level.endboss)) {
        clearInterval(arrow.throwInterval);
        this.arrows.splice(arrowIndex, 1);
        this.level.endboss.hit();
      }
    }
  }

  checkCharacterCollectableCollision(collectableArray, collectableType) {
    const objects = this.level[collectableArray];

    for (let index = objects.length - 1; index >= 0; index--) {
      const obj = objects[index];
      if (this.character.isColliding(obj)) {
        const collected = this.character.handleCollectable(collectableType);
        if (collected) {
          objects.splice(index, 1);

          if (collectableType === "branch") {
            this.level.statusBars[1].setValue(this.character.collectedBranches);
          } else if (collectableType === "feather") {
            this.level.statusBars[2].setValue(this.character.collectedFeathers);
          }
        }
      }
    }
  }

  checkThrowObjects() {
    if (!this.character.lastArrowShot()) return;
    if (this.character.craftedArrows <= 0) return;

    this.character.craftedArrows--;
    this.character.lastShoot = new Date().getTime();

    setTimeout(() => {
      let arrow;
      if (!this.character.otherDirection) {
        arrow = new ThrowableObject(this.character.x + 60, this.character.y + 50, this);
      } else {
        arrow = new ThrowableObject(this.character.x + -20, this.character.y + 50, this);
      }

      arrow.throw();
      this.arrows.push(arrow);
      this.character.isCurrentlyShooting = false;
    }, 600);
  }

  drawCraftingHint() {
    if (this.character.collectedBranches === 3 && this.character.collectedFeathers === 3) {
      this.ctx.fillStyle = "rgba(0,0,0,0.5)";
      this.ctx.fillRect(195, 75, 400, 40);
      this.ctx.save();

      this.ctx.font = "20px Lora";
      this.ctx.fillStyle = "white";
      this.ctx.shadowColor = "black";
      this.ctx.shadowBlur = 5;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;
      this.ctx.fillText("Press F or crafting button to craft arrows!", 200, 100);

      this.ctx.restore();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Cleares the canvas by deleting the previous image before drawing again

    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.fireflies);
    this.addObjectsToMap(this.level.midground);
    this.addObjectsToMap(this.level.foreground);
    this.addObjectsToMap(this.level.feathers);
    this.addObjectsToMap(this.level.branches);

    // --- space for fixed objects ---
    this.ctx.translate(-this.cameraX, 0);
    this.addObjectsToMap(this.level.statusBars);
    this.addToMap(this.arrowCounter);
    this.ctx.translate(this.cameraX, 0);
    // --- space for fixed objects ---

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);

    this.addObjectsToMap(this.arrows);

    this.ctx.translate(-this.cameraX, 0);

    this.drawCraftingHint(this.ctx);

    requestAnimationFrame(() => {
      this.draw();
    });
    // “requestAnimationFrame” tells the browser that this function should be executed before the next screen update.
    // With an anonymous function, “this.draw()” would not work here because ‘this’ would no longer point to the object, but with the Arrow function it is possible because it retains the “this” context.
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Draws the object to the canvas, and flips it horizontally if it is facing left (otherDirection = true).
   * This creates a mirrored effect for characters walking to the left.
   */
  addToMap(movableObj) {
    if (movableObj.otherDirection) {
      this.flipImage(movableObj);
    }

    movableObj.draw(this.ctx);
    movableObj.drawBorder(this.ctx);

    if (movableObj.otherDirection) {
      this.flipImageBack(movableObj);
    }
  }

  flipImage(movableObj) {
    this.ctx.save(); // saves the current canvas state
    this.ctx.translate(movableObj.width, 0); // shifts the canvas origin to the right by the object's width. This is necessary before flipping horizontally to keep the object in the correct position.
    this.ctx.scale(-1, 1); // flips the canvas horizontally (mirror image effect on the x-axis)
    movableObj.x = movableObj.x * -1; // because the canvas is flipped horizontally with scale(-1, 1), the object's x-position must also be flipped (multiply by -1), so it appears at the correct mirrored position on screen.
  }

  flipImageBack(movableObj) {
    movableObj.x = movableObj.x * -1; // restores the original x position after drawing
    this.ctx.restore(); // restores the canvas state (undoes the translate and scale)
  }
}
