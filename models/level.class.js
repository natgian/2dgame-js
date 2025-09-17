class Level {
  enemies;
  endboss;
  statusBars;
  feathers;
  branches;
  fireflies;

  levelEndX = 3800;

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
