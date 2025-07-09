/**
 * Creates an array of new objects from the given class
 *
 * @param {Function} ClassRef - The class constructor to create a new object
 * @param {number} count - The number of objects to create
 * @returns - An array of new objects
 */
function generateObjects(ClassRef, count) {
  return Array.from({ length: count }, () => new ClassRef());
}

/**
 * Generates repeating layers for example for the background or foreground
 *
 * @param {Object} - Configuration object for the layer generation
 * @param {number} count - The number of layers to generate
 * @param {string} imagePath - The path to the image used for the layers
 * @param {number} startX - The horizontal starting position of the layers
 * @param {number} spacingX - The horizontal spacing between layers
 * @param {number} y - The vertical position of the layers
 * @param {number} width - The width of each layer
 * @param {number} height - The height of each layer
 * @returns - An array of Layer objects positioned one after another
 */
function generateRepeatingLayer({ count, imagePath, startX = -100, spacingX = 720, y = 0, width = 720, height = 480 }) {
  const layers = [];
  for (let i = 0; i < count; i++) {
    const x = startX + i * spacingX;
    layers.push(new Layer(imagePath, x, y, width, height));
  }
  return layers;
}

function generateLayerSequence({ count, imagePaths, startX = -100, spacingX = 720, y = 0, width = 720, height = 480 }) {
  const layers = [];

  for (let i = 0; i < count; i++) {
    const x = startX + i * spacingX;

    for (let j = 0; j < imagePaths.length; j++) {
      layers.push(new Layer(imagePaths[j], x, y, width, height));
    }
  }

  return layers;
}
