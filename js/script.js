// Объявление констант

const pencileButton = document.getElementById("pencile");
const eraserButton  = document.getElementById("eraser");
const paletteButton = document.getElementById("palette");

// Объявление переменных


let ToolInfoPanel = {
  panel: document.getElementById("tool-info"),
  status: "not active"
}

pencileButton.addEventListener("click", () => {
  if (ToolInfoPanel.status == "pencil") {
    ToolInfoPanel.panel.style.display = "none";
    ToolInfoPanel.status = "not active";
  } else {
  	ToolInfoPanel.panel.style.display = "block";
  	ToolInfoPanel.panel.innerHTML = "pencil";
    ToolInfoPanel.status = "pencil";
  }
});

eraserButton.addEventListener("click", () => {
  if (ToolInfoPanel.status == "eraser") {
    ToolInfoPanel.panel.style.display = "none";
    ToolInfoPanel.status = "not active";
  } else {
  	ToolInfoPanel.panel.style.display = "block";
  	ToolInfoPanel.panel.innerHTML = "eraser";
    ToolInfoPanel.status = "eraser";
  }
});

paletteButton.addEventListener("click", () => {
  if (ToolInfoPanel.status == "palette") {
    ToolInfoPanel.panel.style.display = "none";
    ToolInfoPanel.status = "not active";
  } else {
  	ToolInfoPanel.panel.style.display = "block";
  	ToolInfoPanel.panel.innerHTML = "palette";
    ToolInfoPanel.status = "palette";
  }
});