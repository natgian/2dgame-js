let level1;

function initLevel() {
  healthBar = new Statusbar("health", 0, 20);
  branchesBar = new Statusbar("branch", 200, 20);
  feathersBar = new Statusbar("feather", 400, 20);

  level1 = new Level(
    generateObjects(Enemy, 3),
    new Endboss(),
    generateObjects(Firefly, 50, 0),
    generateObjects(Feather, 10),
    generateObjects(Branch, 10),
    [healthBar, branchesBar, feathersBar],

    // Background Layers
    generateRepeatingLayer({ count: 5, imagePath: "img/layers/repeating_layers/background_backdrop.png", y: 0 }),

    // Midground Layers
    generateLayerSequence({ count: 5, imagePaths: ["img/layers/repeating_layers/background2_trees.png", "img/layers/repeating_layers/background1_trees.png"] }),

    // Foreground Layers
    generateRepeatingLayer({ count: 5, imagePath: "img/layers/repeating_layers/midground_grass.png", y: 200, height: 300 })
  );
}
