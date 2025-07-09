class Level {
  enemies;
  fireflies;
  background;
  midground;
  foreground;
  levelEndX = 2500;

  constructor(enemies, fireflies, background, midground, foreground) {
    this.enemies = enemies;
    this.fireflies = fireflies;
    this.background = background;
    this.midground = midground;
    this.foreground = foreground;
  }
}
