const menuControlsBtn = document.getElementById("menu-controls-btn");

function openOverlay(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.showModal();
}

function closeOverlay(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.close();
  document.activeElement.blur();
}

function initDialogEventListeners() {
  const dialogs = document.querySelectorAll("dialog");

  dialogs.forEach((dialog) => {
    const closeBtn = dialog.querySelector(".close-btn");

    dialog.addEventListener("click", (event) => {
      if (!isInDialog(dialog, event)) {
        dialog.close();
        closeBtn.blur();
      }
    });

    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      dialog.close();
      closeBtn.blur();
    });
  });
}

function isInDialog(dialog, event) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}
