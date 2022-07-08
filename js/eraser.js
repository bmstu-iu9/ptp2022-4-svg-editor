eraser.addEventListener('click', () => {
  if (toolInfoStatus == eraser) {
    toolInfoPanel.style.display = "none";
    toolInfoStatus = null;
  } else {
    toolInfoPanel.style.display = "flex";
    toolInfoPanel.innerHTML = "eraser";
    toolInfoStatus = eraser;
    selectedTool = eraser;
  }
});