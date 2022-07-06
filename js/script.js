// Объявление констант

const pencileButton = document.getElementById("pencile");
const eraserButton  = document.getElementById("eraser");
const paletteButton = document.getElementById("palette");
const cursorButton  = document.getElementById("cursor");
const workspace     = document.getElementById('workspace');
const handButton    = document.getElementById('hand');

// Объявление переменных


let ToolInfoPanel = {
  panel: document.getElementById("tool-info"),
  status: "not active"
}

eraserButton.addEventListener("click", () => {
  pencileActive = false;
  if (ToolInfoPanel.status == "eraser") {
    ToolInfoPanel.panel.style.display = "none";
    ToolInfoPanel.status = "not active";
  } else {
  	ToolInfoPanel.panel.style.display = "flex";
  	ToolInfoPanel.panel.innerHTML = "eraser";
    ToolInfoPanel.status = "eraser";
  }
});

paletteButton.addEventListener("click", () => {
  pencileActive = false;
  if (ToolInfoPanel.status == "palette") {
    ToolInfoPanel.panel.style.display = "none";
    ToolInfoPanel.status = "not active";
  } else {
  	ToolInfoPanel.panel.style.display = "flex";
  	ToolInfoPanel.panel.innerHTML = "palette";
    ToolInfoPanel.status = "palette";
  }
});

cursorButton.addEventListener("click", () => {
  ToolInfoPanel.panel.style.display = "none";
  ToolInfoPanel.status = "cursor";
  pencileActive = false;
});

handButton.addEventListener("click", () => {
  ToolInfoPanel.panel.style.display = "none";
  ToolInfoPanel.status = "hand";
  pencileActive = false;
});