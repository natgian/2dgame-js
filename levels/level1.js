let level1;

function initLevel() {
  enemies1 = generateObjects(() => new Enemy("enemy_1"), 4, 400);
  enemies2 = generateObjects(() => new Enemy("enemy_2"), 4, 400);
  allEnemies = [...enemies1, ...enemies2];
  healthBar = new Statusbar("health", 0, 20);
  branchesBar = new Statusbar("branch", 200, 20);
  feathersBar = new Statusbar("feather", 400, 20);
  endbossBar = new Statusbar("endboss", 400, 80);
  endboss = new Endboss(endbossBar);
  endbossBar.visible = false;

  level1 = new Level(
    allEnemies,
    endboss,
    [healthBar, branchesBar, feathersBar, endbossBar],
    generateObjects(() => new Firefly(), 50, 0),
    generateObjects(() => new Feather(), 12),
    generateObjects(() => new Branch(), 12)
  );
}
