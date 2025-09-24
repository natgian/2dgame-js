/**
 * Represents a world in the game.
 *
 */
class World {
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  level = null;
  character = new Character();
  arrowCounter = new ArrowCounter(this.character);
  arrows = [];
  hintTextVisible = true;

  /**
   * Creates a world instance.
   *
   * @param {HTMLElement} canvas - The canvas element
   * @param {Keyboard} keyboard - The keyboard object
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.world = this;
    this.collisionManager = new CollisionManager(this);
    this.isGameOver = false;
    this.isGameWon = false;
    this.sound = new AudioManager();
    this.sound.loadAllSounds();

    this.backgroundLayers = generateRepeatingLayer({ count: 6, imagePath: "img/layers/repeating_layers/background_backdrop.png", y: 0 });

    this.firstMidgroundLayers = generateRepeatingLayer({ count: 6, imagePath: "img/layers/repeating_layers/background2_trees.png", y: 0 });

    this.secondMidgroundLayers = generateRepeatingLayer({ count: 6, imagePath: "img/layers/repeating_layers/background1_trees.png", y: 0 });

    this.foregroundLayers = generateRepeatingLayer({ count: 6, imagePath: "img/layers/repeating_layers/midground_grass.png", y: 200, height: 300 });

    this.draw();
  }

  /**
   * Starts the level.
   *
   * - links the enemies to the world
   * - plays background music
   * - runs the collision and cleanup intervals
   *
   * @param {Level} level - A level containing objects
   */
  startLevel(level) {
    this.level = level;
    this.linkEnemiesToWorld();
    this.sound.play("bg_music");
    this.runCollisionInterval();
    this.runArrowCollisionInterval();
    this.runCleanupEnemiesInterval();
  }

  /**
   * Links the enemies to the world.
   *
   */
  linkEnemiesToWorld() {
    this.level.enemies.forEach((enemy) => (enemy.world = this));
    if (this.level.endboss) {
      this.level.endboss.world = this;
    }
  }

  /**
   * Clears the canvas.
   *
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the different layers (background, fireflies, midground, foreground).
   *
   */
  drawLayers() {
    this.addObjectsToMap(this.backgroundLayers);
    if (this.level) {
      this.addObjectsToMap(this.level.fireflies);
    }
    this.addObjectsToMap(this.firstMidgroundLayers);
    this.addObjectsToMap(this.secondMidgroundLayers);
    this.addObjectsToMap(this.foregroundLayers);
  }

  /**
   * Draws fixed objects like status bars and arrow counter.
   *
   */
  drawFixedObjects() {
    this.ctx.translate(-this.cameraX, 0);
    if (this.level) {
      this.addObjectsToMap(this.level.statusBars);
    }
    this.addToMap(this.arrowCounter);
    this.drawCraftingHint(this.ctx);
    this.ctx.translate(this.cameraX, 0);
  }

  /**
   * Draws the enemies and endboss.
   *
   */
  drawEnemies() {
    if (this.level) {
      this.addObjectsToMap(this.level.enemies);
      this.addToMap(this.level.endboss);
    }
  }

  /**
   * Draws the collectibles (feathers and branches).
   *
   */
  drawCollectibleObjects() {
    if (this.level) {
      this.addObjectsToMap(this.level.feathers);
      this.addObjectsToMap(this.level.branches);
    }
  }

  /**
   * Draws all objects.
   *
   */
  draw() {
    this.clearCanvas();
    this.ctx.translate(this.cameraX, 0);
    this.drawLayers();
    this.drawFixedObjects();
    this.drawCollectibleObjects();
    this.drawEnemies();
    this.addToMap(this.character);
    this.addObjectsToMap(this.arrows);
    this.ctx.translate(-this.cameraX, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Runs the collision checks interval.
   *
   */
  runCollisionInterval() {
    setInterval(() => {
      this.collisionManager.checkCollisions();
    }, 200);
  }

  /**
   * Runs the arrow collision interval.
   *
   */
  runArrowCollisionInterval() {
    setInterval(() => {
      this.collisionManager.checkArrowEnemyCollision();
    }, 50);
  }

  /**
   * Runs the enemies cleanup interval.
   *
   */
  runCleanupEnemiesInterval() {
    setInterval(() => {
      this.removeDeadEnemies();
    }, 1000 / 60);
  }

  /**
   * Removes dead enemies from the level.
   *
   */
  removeDeadEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isReadyToRemove);
  }

  /**
   * Triggers the game over state by stopping the game.
   *
   */
  triggerGameEnd(status) {
    if (status === "won") {
      this.isGameWon = true;
    } else {
      this.isGameOver = true;
    }

    setTimeout(() => {
      this.sound.stopAllSounds();
      stopGame();
    }, 800);
  }

  /**
   * Clears the throwInterval and removes the arrow from the arrows array.
   *
   * @param {Object} arrow - The arrow object
   * @param {number} arrowIndex - The index of the arrow in the array
   */
  removeArrow(arrow, arrowIndex) {
    clearInterval(arrow.throwInterval);
    this.arrows.splice(arrowIndex, 1);
  }

  /**
   * Checks if an arrow can be shot. If "true" it creates an arrow, handles the arrow shot and
   * updates the characters crafted arrows counter.
   *
   * @returns - Returns immediately if the arrow can not be shot
   */
  checkThrowObjects() {
    if (!this.canShootArrow()) return;

    this.character.craftedArrows--;
    this.character.lastShoot = new Date().getTime();

    setTimeout(() => {
      const arrow = this.createArrow();
      this.handleArrowShot(arrow);
    }, 600);
  }

  /**
   * Checks if the arrow can be shot.
   *
   * @returns - "True" if the arrow can be shot, otherwise "false"
   */
  canShootArrow() {
    return this.character.lastArrowShot() && this.character.craftedArrows > 0;
  }

  /**
   * Creates an arrow and positions it depending where the character is facing.
   *
   * @returns - Returns the arrow object
   */
  createArrow() {
    let arrow;
    if (!this.character.otherDirection) {
      arrow = new ThrowableObject(this.character.x + 60, this.character.y + 50, this);
    } else {
      arrow = new ThrowableObject(this.character.x + -20, this.character.y + 50, this);
    }
    return arrow;
  }

  /**
   * Handles the arrow shot.
   *
   * @param {Object} arrow - The arrow object
   */
  handleArrowShot(arrow) {
    arrow.throw();
    this.arrows.push(arrow);
    this.character.isCurrentlyShooting = false;
  }

  /**
   * Draws a crafting hint message on the canvas when the character has collected enough branches
   * and feathers to craft new arrows.
   *
   */
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

  /**
   * Draws multiple objects to the canvas.
   *
   * @param {Objecdts[]} objects - The array of objects to draw
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Draws the a movable object to the canvas and flips it horizontally if it is facing left.
   * This creates a mirrored effect for characters walking to the left.
   *
   * @param {Object} movableObj - The movable object to draw
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

  /**
   * Flips the movable object.
   *
   * @param {Object} movableObj - The movable object to flip
   */
  flipImage(movableObj) {
    this.ctx.save();
    this.ctx.translate(movableObj.width, 0);
    this.ctx.scale(-1, 1);
    movableObj.x = movableObj.x * -1;
  }

  /**
   * Flips the movable object back to it original state.
   *
   * @param {Object} movableObj - The movable object to flip
   */
  flipImageBack(movableObj) {
    movableObj.x = movableObj.x * -1;
    this.ctx.restore();
  }
}
