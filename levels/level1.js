const level1 = new Level(
  generateObjects(Enemy, 3),
  generateObjects(Firefly, 12),
  generateRepeatingLayer(5, "img/layers/repeating_layers/background_backdrop.png", 720, 0, 720, 480),
  [
    new Layer("img/layers/repeating_layers/background2_trees.png", 0, 0, 720, 480),
    new Layer("img/layers/repeating_layers/background1_trees.png", 0, 0, 720, 480),
    new Layer("img/layers/repeating_layers/background2_trees.png", 720, 0, 720, 480),
    new Layer("img/layers/repeating_layers/background1_trees.png", 720, 0, 720, 480),
  ],
  generateRepeatingLayer(5, "img/layers/repeating_layers/midground_grass.png", 720, 300, 720, 200)
);
