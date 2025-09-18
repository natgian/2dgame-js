const fullscreen = document.getElementById("fullscreen");

/**
 * Enters the fullscreen mode for the given element.
 * It will not activate if there is no world or the game is over (win or lose).
 *
 * @param {HTMLElement} element - The DOM element to display in fullscreen
 * @returns - Returns if the fullscreen can not be entered
 */
async function enterFullscreenMode(element) {
  if (!world || world.isGameOver || world.isGameWon) return;
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen could not be activated", error);
  }
}

/**
 * Exits fullscreen mode.
 *
 */
async function exitFullscreenMode() {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  }
}
