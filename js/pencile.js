const pencileInfoInnerHTML = `
<input type="range" id="pencileWidthRange" name="pencileWidthRange" min="1" max="50">
<svg id="pencileWidthIllustration" width="102" height="102"
  xmlns="http://www.w3.org/2000/svg">
</svg>`

let mousedown = false;
let path;
let curve = "";
let width = 25;

let pencileWidthIllustration;

pencile.addEventListener("click", () => {
  if (toolInfoStatus == pencile) {
    toolInfoPanel.style.display = "none";
    toolInfoStatus = null;
  } else {
    toolInfoPanel.style.display = "flex";
    toolInfoPanel.innerHTML = pencileInfoInnerHTML;
    toolInfoStatus = pencile;
    selectedTool = pencile;

    let pencileWidthRange = document.getElementById("pencileWidthRange");
    pencileWidthIllustration = document.getElementById("pencileWidthIllustration");

    let circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", 51);
    circle.setAttribute("cy", 51);
    circle.setAttribute("r", width);
    circle.setAttribute("fill", '#4287f5');
    pencileWidthIllustration.append(circle);

    pencileWidthRange.addEventListener("mousemove", () => {
      width = pencileWidthRange.value;
      circle.setAttribute("r", width);
    });
  }
});

svgPanel.addEventListener("mousedown", e => {
  if (selectedTool != pencile) {
    return;
  }

  path = document.createElementNS(svgNS, "path");
  curve += `M ${e.offsetX} ${e.offsetY}`;
  
  path.setAttribute('d', curve);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-width', width);
  path.setAttribute('stroke', '#4287f5');

  mousedown = true;
  svgPanel.append(path);
});

svgPanel.addEventListener("mousemove", e => {
  if (selectedTool == pencile && mousedown) {
    curve += ` L ${e.offsetX} ${e.offsetY}`;
    path.setAttribute('d', curve);
  }
});

svgPanel.addEventListener("mouseup", () => {
  mousedown = false;
  curve = "";
});

svgPanel.addEventListener("mouseleave", () => {
  if (mousedown) {
    mousedown = false;
    curve = "";
  }
});