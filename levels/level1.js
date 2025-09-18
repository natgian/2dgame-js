let level1;

/**
 * Initializes the level by creating enemies, status bars,
 * the endboss, and all level objects. The result is stored in the global variable "level1".
 *
 */
function initLevel() {
  const allEnemies = createEnemies();
  const { healthBar, branchesBar, feathersBar, endbossBar } = createStatusbars();
  const endboss = createEndboss(endbossBar);

  level1 = createLevel(allEnemies, endboss, [healthBar, branchesBar, feathersBar, endbossBar]);
}

/**
 * Creates two groups of enemies ("enemy_1" and "enemy_2").
 *
 * @returns {Enemy[]}- An array containing all created enemies
 */
function createEnemies() {
  const enemies1 = generateObjects(() => new Enemy("enemy_1"), 4, 400);
  const enemies2 = generateObjects(() => new Enemy("enemy_2"), 4, 400);
  return [...enemies1, ...enemies2];
}

/**
 * Creates the different status bars (health, branch, feather, endboss) for the level.
 *
 * @returns {{healthBar: Statusbar, branchesBar: Statusbar, feathersBar: Statusbar, endbossBar: Statusbar}} - An object with references to the created status bars
 */
function createStatusbars() {
  const healthBar = new Statusbar("health", 0, 20);
  const branchesBar = new Statusbar("branch", 200, 20);
  const feathersBar = new Statusbar("feather", 400, 20);
  const endbossBar = new Statusbar("endboss", 400, 80);
  return { healthBar, branchesBar, feathersBar, endbossBar };
}

/**
 * Creates the endboss for the level and sets the endboss status bar visibility to hidden
 * at the start.
 *
 * @param {Statusbar} endbossBar - The endboss status bar object
 * @returns {Endboss} - The endboss object
 */
function createEndboss(endbossBar) {
  const endboss = new Endboss(endbossBar);
  endbossBar.visible = false;
  return endboss;
}

/**
 * Creates a new level with all objects.
 *
 * @param {Enemy[]} allEnemies - Array of enemies
 * @param {Endboss} endboss - Endboss object
 * @param {Statusbar[]} statusBars - Array of status bars objects
 * @returns {Level} - A new level object
 */
function createLevel(allEnemies, endboss, statusBars) {
  const feathers = generateObjects(() => new Feather(), 12);
  const branches = generateObjects(() => new Branch(), 12);

  const level = new Level(allEnemies, endboss, statusBars, feathers, branches);
  level.fireflies = generateObjects(() => new Firefly(level), 50, 0);

  return level;
}
