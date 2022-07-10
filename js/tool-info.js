function hideAllInfoPanels() {
  pencileInfoPanel.classList.add('hidden');
  lineInfoPanel.classList.add('hidden');
  polylineInfoPanel.classList.add('hidden');
  eraserInfoPanel.classList.add('hidden');
  paletteInfoPanel.classList.add('hidden');
}


cursor.addEventListener('click', () => {
  toolInfoStatus = null;
  hideAllInfoPanels();
  selectedTool = cursor;
});

hand.addEventListener('click', () => {
  toolInfoStatus = null;
  hideAllInfoPanels();
  selectedTool = hand;
});

pencile.addEventListener('click', () => {
  if (toolInfoStatus == pencile) {
    toolInfoStatus = null;
    pencileInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    pencileInfoPanel.classList.remove('hidden');
    toolInfoStatus = pencile;
    selectedTool = pencile;
  }
});

line.addEventListener('click', () => {
  if (toolInfoStatus == line) {
    toolInfoStatus = null;
    lineInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    lineInfoPanel.classList.remove('hidden');
    toolInfoStatus = line;
    selectedTool = line;
  }
});

polyline.addEventListener('click', () => {
  if (toolInfoStatus == polyline) {
    toolInfoStatus = null;
    polylineInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    polylineInfoPanel.classList.remove('hidden');
    toolInfoStatus = polyline;
    selectedTool = polyline;
  }
});

palette.addEventListener('click', () => {
  if (toolInfoStatus == palette) {
    toolInfoStatus = null;
    paletteInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    paletteInfoPanel.classList.remove('hidden');
    toolInfoStatus = palette;
    selectedTool = palette;
  }
});

eraser.addEventListener('click', () => {
  if (toolInfoStatus == eraser) {
    toolInfoStatus = null;
    eraserInfoPanel.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    eraserInfoPanel.classList.remove('hidden');
    toolInfoStatus = eraser;
    selectedTool = eraser;
  }
});