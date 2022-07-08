palette.addEventListener('click', () => {
  if (toolInfoStatus == palette) {
    toolInfoPanel.style.display = "none";
    toolInfoStatus = null;
  } else {
    toolInfoPanel.style.display = "flex";
    toolInfoPanel.innerHTML = "palette";
    toolInfoStatus = palette;
    selectedTool = palette;
  }
});