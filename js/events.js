const keyMap = {
  ArrowRight: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowDown: "DOWN",
  Space: "SPACE",
  KeyD: "D",
  KeyF: "F",
};

/**
 * Initiates all event listeners.
 *
 * Sets up listeners for:
 * - orientation changes
 * - fullscreen handling
 * - overlay interactions
 *
 * If the device supports touch it also initializes the mobile controls.
 */
function initAllEventListeners() {
  initOrientationListener();
  initFullscreenListeners();
  initOverlayEventListeners();
  initKeyDownListener();
  initKeyUpListener();

  if (isTouchDevice()) {
    initMobileControls();
    toggleMobileControls();
  }
}

/**
 * Connects a button to a keyboard key. This allows mobile touch buttons to control the game.
 *
 * It sets up three event listeners: touchstart, touchend and contextmenu *
 *
 * @param {HTMLElement} btn - The button DOM element to connect
 * @param {string} key - The key in the "keyboard" object that this button controls
 */
function connectButtonToKeyboard(btn, key) {
  btn.addEventListener("touchstart", handleTouchStart(btn, key), { passive: false });
  btn.addEventListener("touchend", handleTouchEnd(btn, key), { passive: false });
  btn.addEventListener("contextmenu", handleContextMenu);
}

/**
 * Creates a "touchstart" event handler for a button.
 *
 * @param {HTMLElement} btn - The button DOM element to connect
 * @param {string} key - The key in the "keyboard" object that this button controls
 * @returns - The event handler function for "touchstart"
 */
function handleTouchStart(btn, key) {
  return function (event) {
    event.preventDefault();
    keyboard[key] = true;
    btn.classList.add("active");
  };
}

/**
 * Creates a "touchend" event handler for a button.
 *
 * @param {HTMLElement} btn - The button DOM element to connect
 * @param {string} key - The key in the "keyboard" object that this button controls
 * @returns - The event handler function for "touchend"
 */
function handleTouchEnd(btn, key) {
  return function (event) {
    event.preventDefault();
    keyboard[key] = false;
    btn.classList.remove("active");
  };
}

/**
 * Prevents the opening of the context menu.
 *
 * @param {Event} event - The contextmenu event object
 */
function handleContextMenu(event) {
  event.preventDefault();
}

/**
 * Initializes the mobile controls by connecting each button to the keyboard.
 *
 */
function initMobileControls() {
  const { walkLeftBtn, walkRightBtn, jumpBtn, shootBtn, craftBtn } = getMobileButtons();

  connectButtonToKeyboard(walkLeftBtn, "LEFT");
  connectButtonToKeyboard(walkRightBtn, "RIGHT");
  connectButtonToKeyboard(jumpBtn, "SPACE");
  connectButtonToKeyboard(shootBtn, "D");
  connectButtonToKeyboard(craftBtn, "F");
}

/**
 * Initiates the keyboard "keydown" event listeners.
 * Maps physical keys (from "event.code") to the "keyboard" object.
 *
 */
function initKeyDownListener() {
  document.addEventListener("keydown", (event) => {
    const key = keyMap[event.code];

    if (key) {
      keyboard[key] = true;
    }

    if (event.code === "Escape") {
      exitFullscreenMode();
    }
  });
}

/**
 * Initiates the keyboard "keyup" event listeners.
 * Resets the pressed key state in the "keyboard" object when the key is released.
 *
 */
function initKeyUpListener() {
  document.addEventListener("keyup", (event) => {
    const key = keyMap[event.code];

    if (key) {
      keyboard[key] = false;
    }
  });
}

/**
 * Initiates the fullscreen event listeners.
 *
 * - Detects when fullscreen mode is entered or exited
 * - Updates the UI to show the correct fullscreen button state
 *
 */
function initFullscreenListeners() {
  function onFullscreenChange() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      showExitFullscreenButton();
    } else {
      fullscreen.classList.remove("fullscreen-active");
      showEnterFullscreenButton();
    }
  }
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("webkitfullscreenchange", onFullscreenChange);
}

/**
 * Iinitiates the orientation event listener.
 *
 */
function initOrientationListener() {
  window.addEventListener("resize", checkOrientation);
  checkOrientation();
}
