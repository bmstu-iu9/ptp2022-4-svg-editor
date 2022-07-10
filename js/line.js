lineWidthRange.onmousedown = function() {
  lineWidthRange.onmousemove = function() {
    lineWidthValue = lineWidthRange.value;
    lineWidthIllustration.setAttribute('r', lineWidthValue);
  };
};

svgPanel.addEventListener('mousedown', (event) => {
  if (selectedTool != lineTool) {
    return;
  }

  let line = document.createElementNS(svgNS, 'line');

  line.setAttribute('x1', event.offsetX);
  line.setAttribute('y1', event.offsetY);
  setEndOfLine(event);

  line.setAttribute('stroke-width', lineWidthValue);
  line.setAttribute('stroke', selectedColor);
  line.setAttribute('opacity', 0.5);

  svgPanel.append(line);

  svgPanel.addEventListener('mousemove', setEndOfLine);
  svgPanel.addEventListener('mouseup', deleteHandlers);
  svgPanel.addEventListener('mouseleave', deleteHandlers);

  function setEndOfLine(event) {
    line.setAttribute('x2', event.offsetX);
    line.setAttribute('y2', event.offsetY);    
  }

  function deleteHandlers(event) {
    svgPanel.removeEventListener('mousemove', setEndOfLine);
    svgPanel.removeEventListener('mouseup', deleteHandlers);

    line.setAttribute('opacity', 1);
  }
});