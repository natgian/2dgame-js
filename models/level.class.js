class Level {
  enemies;
  endboss;
  statusBars;
  fireflies;
  feathers;
  branches;

  levelEndX = 3800;

  constructor(enemies, endboss, statusBars, fireflies, feathers, branches) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.statusBars = statusBars;
    this.fireflies = fireflies;
    this.feathers = feathers;
    this.branches = branches;
  }

  getStatusBar(type) {
    return this.statusBars.find((bar) => bar.type === type);
  }
}
