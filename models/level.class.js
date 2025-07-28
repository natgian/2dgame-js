class Level {
  enemies;
  endboss;
  fireflies;
  feathers;
  branches;
  background;
  midground;
  foreground;
  levelEndX = 2800;

  constructor(enemies, endboss, fireflies, feathers, branches, background, midground, foreground) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.fireflies = fireflies;
    this.feathers = feathers;
    this.branches = branches;
    this.background = background;
    this.midground = midground;
    this.foreground = foreground;
  }
}
