/**
 * Creates an array of new objects from the given class
 *
 * @param {Function} ClassRef - The class constructor to create a new object
 * @param {number} count - The number of objects to create
 * @returns - An array of new objects
 */
function generateObjects(ClassRef, count, minDistance = 150, maxAttempts = 1000) {
  const objects = [];
  let attempts = 0;

  while (canGenerateMoreObjects(objects, count, attempts, maxAttempts)) {
    attempts++;
    const newObject = generateAndPositionObject(ClassRef);

    if (isFarEnough(objects, newObject, minDistance)) {
      objects.push(newObject);
      attempts = 0;
    }
  }
  return objects;
}

function generateAndPositionObject(ClassRef) {
  const newObject = new ClassRef();
  newObject.setRandomPosition?.();
  return newObject;
}

function canGenerateMoreObjects(objects, count, attempts, maxAttempts) {
  return objects.length < count && attempts < maxAttempts;
}

function isFarEnough(objects, newObject, minDistance) {
  return objects.every((existingObject) => {
    return Math.abs(newObject.x - existingObject.x) >= minDistance;
  });
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

/**
 * Generates a repeating sequence of layers using a set of image paths
 *
 * @param {Object} - Configuration params for generating the layers
 * @param {number} count - Number of times to repeat the full image sequence
 * @param {Array} imagePaths - Array of image paths to cycle through for each repetition
 * @param {number} startX - Starting x-position for the layers
 * @param {number} spacingX - Horizontal distance between each repeated sequence
 * @param {number} y - Vertical position for the layers
 * @param {number} width - Width of each layer image
 * @param {number} height - Height of each layer image
 * @returns {Array} Array of Layer instances representing the generated sequence
 */
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
