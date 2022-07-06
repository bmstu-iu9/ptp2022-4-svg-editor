const canvas = document.getElementById("svg-panel");

let pencileMenuHTML = 
`
<input type="range" id="pencileWidthRange" name="pencileWidthRange" min="1" max="50">
<svg id="pencileWidthIllustration" width="102" height="102"
            xmlns="http://www.w3.org/2000/svg">

</svg>
`

let pencileActive = false;

let mousedown = false;
let path;
let curve = "";
let width = 25;

let pencileWidthIllustration;

pencileButton.addEventListener("click", () => {
  pencileActive = true;
  if (ToolInfoPanel.status == "pencil") {
    ToolInfoPanel.panel.style.display = "none";
    ToolInfoPanel.status = "not active";
  } else {
    ToolInfoPanel.panel.style.display = "flex";
    ToolInfoPanel.panel.innerHTML = pencileMenuHTML;
    let pencileWidthRange = document.getElementById("pencileWidthRange");
    pencileWidthIllustration = document.getElementById("pencileWidthIllustration");
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", 51);
    circle.setAttribute("cy", 51);
    circle.setAttribute("r", width);
    circle.setAttribute("fill", '#4287f5');
    pencileWidthIllustration.append(circle);
    pencileWidthRange.addEventListener("mousemove", () => {
      width = pencileWidthRange.value;
      circle.setAttribute("r", width);
    });
    ToolInfoPanel.status = "pencil";
  }
});

canvas.addEventListener("mousedown", e => {
  if (pencileActive) {
    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    curve += `M ${e.offsetX} ${e.offsetY}`;
    path.setAttribute('d', curve);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', width);
    path.setAttribute('stroke', '#4287f5');
    mousedown = true;
    canvas.append(path);
  }
});

canvas.addEventListener("mousemove", e => {
  if (pencileActive && mousedown) {
    curve += ` L ${e.offsetX} ${e.offsetY}`;
    path.setAttribute('d', curve);
  }
});

canvas.addEventListener("mouseup", () => {
  mousedown = false;
  curve = "";
});

canvas.addEventListener("mouseleave", () => {
  if (mousedown) {
    mousedown = false;
    curve = "";
  }
});