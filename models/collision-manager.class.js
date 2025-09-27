class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks the different collisions.
   *
   */
  checkCollisions() {
    this.checkCharacterEnemyCollision();
    this.checkCharacterCollectibleCollision("feathers", "feather");
    this.checkCharacterCollectibleCollision("branches", "branch");
  }

  /**
   * Checks the character with enemies collision.
   *
   * - If the character collides from above with an "enemy_1" it triggers a jump and
   *   damages the enemy
   * - If the character collides from any other side, the character takes damage
   *
   */
  checkCharacterEnemyCollision() {
    const allEnemies = [...this.world.level.enemies, this.world.level.endboss];

    allEnemies.forEach((enemy) => {
      if (this.world.character.isCollidingFromAbove(enemy) && enemy.type === "enemy_1") {
        this.world.character.jump();
        enemy.hit();
      } else if (this.world.character.isColliding(enemy)) {
        this.handleCharacterEnemyCollision();
      }
    });
  }

  /**
   * Handles the collision between the character and the enemies.
   * If the character is not dead it handles the damage, otherwise it triggers the game ending.
   *
   */
  handleCharacterEnemyCollision() {
    if (!this.world.character.isDead()) {
      this.handleCharacterDamage();
    } else {
      this.world.triggerGameEnd("game_over");
    }
  }

  /**
   * Handles the damage by decreasing the health and upates the status bar with the new value.
   *
   */
  handleCharacterDamage() {
    this.world.character.hit();
    this.world.level.statusBars[0].setValue(this.world.character.health);
  }

  /**
   * Handles the damage by decreasing the health and upates the status bar with the new value.
   *
   */
  handleEndbossDamage() {
    this.world.level.endboss.hit();
    this.world.level.statusBars[3].setValue(this.world.level.endboss.health);
  }

  /**
   * Iterates backwards through the arrows array and checks if the arrow hits an enemy or the endboss.
   *
   */
  checkArrowEnemyCollision() {
    for (let arrowIndex = this.world.arrows.length - 1; arrowIndex >= 0; arrowIndex--) {
      const arrow = this.world.arrows[arrowIndex];

      if (this.checkArrowHitsEnemy(arrow, arrowIndex)) {
        continue;
      }

      this.checkArrowHitsEndboss(arrow, arrowIndex);
    }
  }

  /**
   * Checks if the arrow is colliding with an enemy.
   *
   * @param {Object} arrow - The arrow object
   * @param {number} arrowIndex - The index of the arrow in the array
   * @returns {boolean} - "True" if the arrow collides with the enemy
   */
  checkArrowHitsEnemy(arrow, arrowIndex) {
    for (let enemyIndex = this.world.level.enemies.length - 1; enemyIndex >= 0; enemyIndex--) {
      const enemy = this.world.level.enemies[enemyIndex];

      if (arrow.isColliding(enemy)) {
        this.world.removeArrow(arrow, arrowIndex);
        enemy.hit();
        return true;
      }
    }
  }

  /**
   * Checks if the arrow is colliding with the endboss. If "true" it removes the arrow from the
   * array and handles endboss damage.
   *
   * If the endboss is dead it triggers the game end.
   *
   * @param {Object} arrow - The arrow object
   * @param {number} arrowIndex - The index of the arrow in the array
   * @returns - Returns immediately "false" if there is no endboss
   */
  checkArrowHitsEndboss(arrow, arrowIndex) {
    if (!this.world.level.endboss) return;

    if (arrow.isColliding(this.world.level.endboss)) {
      this.world.removeArrow(arrow, arrowIndex);
      this.handleEndbossDamage();

      if (this.world.level.endboss.isDead()) {
        this.world.triggerGameEnd("won");
      }
    }
  }

  /**
   * Checks if the character collides with a collectible (feather or branch) and handles the
   * collecting.
   *
   * @param {Object[]} collectibleArray - The given collectible array
   * @param {string} collectibleType - The given collectible type
   */
  checkCharacterCollectibleCollision(collectibleArray, collectibleType) {
    const objects = this.world.level[collectibleArray];

    for (let index = objects.length - 1; index >= 0; index--) {
      const obj = objects[index];

      if (this.world.character.isColliding(obj)) {
        if (this.world.character.handleCollectible(collectibleType)) {
          objects.splice(index, 1);
          this.updateCollectibleStatusBar(collectibleType);
        }
      }
    }
  }

  /**
   * Updates the collectible status bar by the given type.
   *
   * @param {string} collectibleType - Type of the collectible status bar (feather or branch)
   */
  updateCollectibleStatusBar(collectibleType) {
    if (collectibleType === "branch") {
      this.world.level.statusBars[1].setValue(this.world.character.collectedBranches);
    } else if (collectibleType === "feather") {
      this.world.level.statusBars[2].setValue(this.world.character.collectedFeathers);
    }
  }
}
