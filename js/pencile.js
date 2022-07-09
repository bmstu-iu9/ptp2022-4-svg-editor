// Регулировка следа карандаша
pencileWidthRange.addEventListener('mousedown', () => {
  pencileWidthRange.onmousemove = () => {
    pencileWidthValue = pencileWidthRange.value;
    pencileWidthIllustration.setAttribute('r', pencileWidthValue);
  }
});

// Работа карандаша
svgPanel.addEventListener('mousedown', event => {
  if (selectedTool != pencile) {
    return;
  }

  let path  = document.createElementNS(svgNS, 'path');
  let curve = `M ${event.offsetX} ${event.offsetY}`;
  
  path.setAttribute('d', curve);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-width', pencileWidthValue);
  path.setAttribute('stroke', 'blue');

  svgPanel.append(path);

  svgPanel.onmousemove = event => {
    curve += ` L ${event.offsetX} ${event.offsetY}`;
    path.setAttribute('d', curve);
  }

  function breakeMouseMove() {
    svgPanel.onmousemove = null;
    svgPanel.onmouseup   = null;
  }

  svgPanel.onmouseleave = breakeMouseMove;
  svgPanel.onmouseup = breakeMouseMove;
});