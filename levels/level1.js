const level1 = new Level(
  generateObjects(Enemy, 3),
  generateObjects(Firefly, 12),
  generateRepeatingLayer({ count: 5, imagePath: "img/layers/repeating_layers/background_backdrop.png", y: 0 }),
  generateLayerSequence({ count: 5, imagePaths: ["img/layers/repeating_layers/background2_trees.png", "img/layers/repeating_layers/background1_trees.png"] }),
  generateRepeatingLayer({ count: 5, imagePath: "img/layers/repeating_layers/midground_grass.png", y: 300, height: 200 })
);
