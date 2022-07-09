function hideAllInfoPanels() {
  pencileInfo.classList.add('hidden');
  eraserInfo.classList.add('hidden');
  paletteInfo.classList.add('hidden');
}

hideAllInfoPanels();


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
    pencileInfo.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    pencileInfo.classList.remove('hidden');
    toolInfoStatus = pencile;
    selectedTool = pencile;
  }
});

palette.addEventListener('click', () => {
  if (toolInfoStatus == palette) {
    toolInfoStatus = null;
    paletteInfo.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    paletteInfo.classList.remove('hidden');
    toolInfoStatus = palette;
    selectedTool = palette;
  }
});

eraser.addEventListener('click', () => {
  if (toolInfoStatus == eraser) {
    toolInfoStatus = null;
    eraserInfo.classList.add('hidden');
  } else {
    hideAllInfoPanels();
    eraserInfo.classList.remove('hidden');
    toolInfoStatus = eraser;
    selectedTool = eraser;
  }
});