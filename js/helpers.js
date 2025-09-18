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

/**
 * Clears all active intervals.
 *
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
