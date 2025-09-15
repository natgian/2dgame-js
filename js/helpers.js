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
