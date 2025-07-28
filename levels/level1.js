let level1;

function initLevel() {
  level1 = new Level(
    // Characters & Enemies
    generateObjects(Enemy, 3),
    new Endboss(),
    generateObjects(Firefly, 100, 0),
    generateObjects(Feather, 10),
    generateObjects(Branch, 5),

    // Background Layers
    generateRepeatingLayer({ count: 5, imagePath: "img/layers/repeating_layers/background_backdrop.png", y: 0 }),

    // Midground Layers
    generateLayerSequence({ count: 5, imagePaths: ["img/layers/repeating_layers/background2_trees.png", "img/layers/repeating_layers/background1_trees.png"] }),

    // Foreground Layers
    generateRepeatingLayer({ count: 5, imagePath: "img/layers/repeating_layers/midground_grass.png", y: 300, height: 200 })
  );
}
