/*--------- */
/* CLEARING */
/*--------- */

/**
 * Clears all active intervals.
 *
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/*------------ */
/* SHOW & HIDE */
/*------------ */

/**
 * Shows the game controls by removing the "d-none" class
 *
 */
function showGameControls() {
  document.querySelector(".controls").classList.remove("d-none");
}

/**
 * Hides the game controls
 *
 */
function hideGameControls() {
  document.querySelector(".controls").classList.add("d-none");
}

/**
 * Shows the start screen by removing "d-none" class
 *
 */
function showStartScreen() {
  document.getElementById("start-screen").classList.remove("d-none");
}

/**
 * Hides the start screen by adding "d-none" class
 *
 */
function hideStartScreen() {
  document.getElementById("start-screen").classList.add("d-none");
}

/**
 * Hides the win and lose end screens by adding the "d-none" class
 *
 */
function hideEndScreens() {
  document.getElementById("lose-end-screen").classList.add("d-none");
  document.getElementById("win-end-screen").classList.add("d-none");
}

/**
 * Shows the win screen by removing the "d-none" class
 *
 */
function showWinScreen() {
  document.getElementById("win-end-screen").classList.remove("d-none");
}

/**
 * Shows the game over screen by removing the "d-none" class
 *
 */
function showLoseScreen() {
  document.getElementById("lose-end-screen").classList.remove("d-none");
}

/*--------------------- */
/* ORIENTATION & DEVICE */
/*--------------------- */

/**
 * Checks if the current device supports touch input.
 *
 * @returns {boolean} - "True" if the device has touch support, otherwise "false"
 */
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Shows the mobile controls by adding an "active" class.
 *
 */
function toggleMobileControls() {
  document.querySelectorAll(".mobile-controls").forEach((element) => {
    element.classList.add("active");
  });
  document.querySelector(".controls").classList.add("active");
}

/**
 * Gets all mobile control button elements.
 *
 * @returns - An object containing all the button DOM elements
 */
function getMobileButtons() {
  const walkLeftBtn = document.getElementById("walk-left-btn");
  const walkRightBtn = document.getElementById("walk-right-btn");
  const jumpBtn = document.getElementById("jump-btn");
  const shootBtn = document.getElementById("shoot-btn");
  const craftBtn = document.getElementById("craft-btn");
  return { walkLeftBtn, walkRightBtn, jumpBtn, shootBtn, craftBtn };
}

/**
 * Checks the device orientation and toggles a screen blocker.
 *
 */
function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    document.getElementById("mobile-portrait-blocker").classList.remove("d-none");
  } else {
    document.getElementById("mobile-portrait-blocker").classList.add("d-none");
  }
}

/*------------*/
/* FULLSCREEN */
/*----------- */

/**
 * Displays the "exit fullscreen" button and hides the "enter fullscreen" button.
 *
 */
function showExitFullscreenButton() {
  document.getElementById("fullscreen-exit-btn").classList.remove("d-none");
  document.getElementById("fullscreen-btn").classList.add("d-none");
}

/**
 * Displays the "enter fullscreen" button and hides the "exit fullscreen" button.
 *
 */
function showEnterFullscreenButton() {
  document.getElementById("fullscreen-exit-btn").classList.add("d-none");
  document.getElementById("fullscreen-btn").classList.remove("d-none");
}

/*------ */
/* AUDIO */
/*------ */

/**
 * Retrieves and applies the audio state from the local storace
 *
 */
function applySavedAudioState() {
  const soundState = localStorage.getItem("soundState");
  if (soundState === null) {
    unmuteAudio();
  } else if (soundState === "muted") {
    muteAudio();
  }
}

/**
 * Mutes all sounds, updates the sound control button, and saves the "muted" state in local storage.
 *
 */
function muteAudio() {
  document.getElementById("sound-off-btn").classList.add("d-none");
  document.getElementById("sound-on-btn").classList.remove("d-none");
  world.sound.muteAll();
  localStorage.setItem("soundState", "muted");
}

/**
 * Unmutes all sounds, updates the sound control button, and saves the "unmuted" state in
 * local storage.
 *
 */
function unmuteAudio() {
  document.getElementById("sound-off-btn").classList.remove("d-none");
  document.getElementById("sound-on-btn").classList.add("d-none");
  world.sound.unmuteAll();
  localStorage.setItem("soundState", "unmuted");
}

/*----------------- */
/* LAYERS & OBJECTS */
/*----------------- */

/**
 * Generates repeating layers placed next to each other.
 *
 * @param {Object} - Configuration object for the layer generation
 * @param {number} count - The number of layers to generate
 * @param {string} imagePath - The path to the image used for the layer
 * @param {number} startX - The horizontal starting position of the first layer
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
 * Creates objects with a minimum distance between them.
 *
 * @param {Function} createObjectFunction - A function that creates a new object
 * @param {number} count - The number of objects to generate
 * @param {number} minDistance - The minimum distance between objects
 * @param {number} maxAttempts - The maximum number of attempts to place all objects
 * @returns - An array of generated objects
 */
function generateObjects(createObjectFunction, count, minDistance = 250, maxAttempts = 1000) {
  const objects = [];
  let attempts = 0;

  while (canGenerateMoreObjects(objects, count, attempts, maxAttempts)) {
    attempts++;
    const newObject = generateAndPositionObject(createObjectFunction);

    if (isFarEnough(objects, newObject, minDistance)) {
      objects.push(newObject);
      attempts = 0;
    }
  }
  return objects;
}

/**
 * Creates a new object and gives it a random position.
 *
 * @param {Function} createObjectFunction - A function that creates a new object
 * @returns - The created and positioned object
 */
function generateAndPositionObject(createObjectFunction) {
  const newObject = createObjectFunction();
  newObject.setRandomPosition?.();
  return newObject;
}

/**
 * Checks if more objects can be generated.
 *
 * @param {Object[]} objects - The already generated objects
 * @param {number} count - The number of objects to generate
 * @param {number} attempts - The number of attempts already made
 * @param {*} maxAttempts - The maximum number of attempts allowed
 * @returns {boolean} - "True" if it can still try to generate objects, otherwise "false"
 */
function canGenerateMoreObjects(objects, count, attempts, maxAttempts) {
  return objects.length < count && attempts < maxAttempts;
}

/**
 * Checks if a new generated object is far enough from existing ones.
 *
 * @param {Object[]} objects - The already generated objects
 * @param {Object} newObject - The new generated object
 * @param {number} minDistance - The minimum distance between objects
 * @returns {boolean} - "True" if the new object is far enough from other objects, otherwise "false"
 */
function isFarEnough(objects, newObject, minDistance) {
  return objects.every((existingObject) => {
    return Math.abs(newObject.x - existingObject.x) >= minDistance;
  });
}
