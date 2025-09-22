/**
 * Represents a game level with enemies, endboss, collectibles and status bars.
 *
 */
class Level {
  enemies;
  endboss;
  statusBars;
  feathers;
  branches;

  levelEndX = 3800;

  /**
   * Creates new Level with the given objects.
   *
   * @param {Enemy[]} enemies - The enemies placed in the level
   * @param {Endboss} endboss - The endboss for this level
   * @param {StatusBar[]} statusBars - The displayed status bar elements
   * @param {Feather[]} feathers - The collectible feathers to craft arrows
   * @param {Branch[]} branches - The collectible branches to craft arrows
   */
  constructor(enemies, endboss, statusBars, feathers, branches) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.statusBars = statusBars;
    this.feathers = feathers;
    this.branches = branches;
  }

  /**
   * Retrieves the status bar of a given type
   *
   * @param {string} type - The type of status bar ("health", "feather", "branch", "endboss")
   * @returns - The found status bar object
   */
  getStatusBar(type) {
    return this.statusBars.find((bar) => bar.type === type);
  }
}
