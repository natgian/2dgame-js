/**
 * Opens an overlay by ID.
 *
 * @param {string} overlayId - The ID of the overlay element to open
 */
function openOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.showModal();
}

/**
 * Closes the overlay by ID.
 *
 * @param {string} overlayId - The ID of the overlay element to close
 */
function closeOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.close();
  document.activeElement.blur();
}

/**
 * Initiates the event listeners for all overlays.
 *
 */
function initOverlayEventListeners() {
  const overlays = document.querySelectorAll("dialog");

  overlays.forEach((overlay) => {
    const closeBtn = overlay.querySelector(".close-btn");

    overlay.addEventListener("click", handleOverlayClick(overlay, closeBtn));
    overlay.addEventListener("cancel", handleOverlayCancel(overlay, closeBtn));
  });
}

/**
 * Creates an event handler for overlay clicks.
 * If the click is outside the overlay content area, the overlay closes.
 *
 * @param {HTMLElement} overlay - The overlay element
 * @param {HTMLElement} closeBtn - The close button element inside the overlay
 * @returns - The event handler function
 */
function handleOverlayClick(overlay, closeBtn) {
  return function (event) {
    if (!isInOverlay(overlay, event)) {
      overlay.close();
      closeBtn.blur();
    }
  };
}

/**
 * Creates an event handler for overlay cancel events (by pressing ESC).
 *
 * @param {HTMLElement} overlay - The overlay element
 * @param {HTMLElement} closeBtn - The close button element inside the overlay
 * @returns - The event handler function
 */
function handleOverlayCancel(overlay, closeBtn) {
  return function (event) {
    event.preventDefault();
    overlay.close();
    closeBtn.blur();
  };
}

/**
 * Checks if the click occured inside the overlay content area.
 *
 * @param {HTMLElement} overlay - The overlay element
 * @param {Event} event - The click event
 * @returns {boolean} - "True" if click is inside the overlay, otherwise "false"
 */
function isInOverlay(overlay, event) {
  const rect = overlay.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}
