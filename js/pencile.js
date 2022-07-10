pencileWidthRange.onmousedown = function() {
  pencileWidthRange.onmousemove = function() {
    pencileWidthValue = pencileWidthRange.value;
    pencileWidthIllustration.setAttribute('r', pencileWidthValue);
  };
};


svgPanel.addEventListener('mousedown', (event) => {
  if (selectedTool != pencileTool) {
    return;
  }

  let curve = `M ${event.offsetX} ${event.offsetY}`;
  let path  = document.createElementNS(svgNS, 'path');
  
  path.setAttribute('d', curve);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-width', pencileWidthValue);
  path.setAttribute('stroke', selectedColor);

  svgPanel.append(path);

  svgPanel.onmousemove = function(event) {
    curve += ` L ${event.offsetX} ${event.offsetY}`;
    path.setAttribute('d', curve);
  };

  function deleteHandlers() {
    svgPanel.onmousemove = null;
    svgPanel.onmouseup   = null;
  }

  svgPanel.onmouseleave = deleteHandlers;
  svgPanel.onmouseup = deleteHandlers;
});