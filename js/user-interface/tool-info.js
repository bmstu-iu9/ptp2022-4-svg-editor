function hideAllInfoPanels() {
  pencileInfoPanel.classList.add('hidden');
  lineInfoPanel.classList.add('hidden');
  polylineInfoPanel.classList.add('hidden');
  eraserInfoPanel.classList.add('hidden');
  paletteInfoPanel.classList.add('hidden');
}


cursorTool.addEventListener('click', () => {
  toolInfoStatus = null;
  hideAllInfoPanels();
  selectedTool = cursorTool;
});

handTool.addEventListener('click', () => {
  toolInfoStatus = null;
  hideAllInfoPanels();
  selectedTool = handTool;
});

pencileTool.addEventListener('click', () => {
  if (toolInfoStatus == pencileTool) {
    toolInfoStatus = null;
    pencileInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    pencileInfoPanel.classList.remove('hidden');
    toolInfoStatus = pencileTool;
    selectedTool = pencileTool;
  }
});

lineTool.addEventListener('click', () => {
  if (toolInfoStatus == lineTool) {
    toolInfoStatus = null;
    lineInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    lineInfoPanel.classList.remove('hidden');
    toolInfoStatus = lineTool;
    selectedTool = lineTool;
  }
});

polylineTool.addEventListener('click', () => {
  if (toolInfoStatus == polylineTool) {
    toolInfoStatus = null;
    polylineInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    polylineInfoPanel.classList.remove('hidden');
    toolInfoStatus = polylineTool;
    selectedTool = polylineTool;
  }
});

paletteTool.addEventListener('click', () => {
  if (toolInfoStatus == paletteTool) {
    toolInfoStatus = null;
    paletteInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    paletteInfoPanel.classList.remove('hidden');
    toolInfoStatus = paletteTool;
    selectedTool = paletteTool;
  }
});

eraserTool.addEventListener('click', () => {
  if (toolInfoStatus == eraserTool) {
    toolInfoStatus = null;
    eraserInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    eraserInfoPanel.classList.remove('hidden');
    toolInfoStatus = eraserTool;
    selectedTool = eraserTool;
  }
});