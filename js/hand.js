svgPanel.onmousedown = function(event) {
	if (selectedTool != hand) {
		return;
	}

	let svgPanelLocation = svgPanel.getBoundingClientRect();
	let offsetX = event.clientX - svgPanelLocation.left;
	let offsetY = event.clientY - svgPanelLocation.top;

	svgPanel.style.cursor = 'pointer';
	svgPanel.style.position = 'fixed';
	svgPanel.style.left = event.clientX - offsetX + 'px';
	svgPanel.style.top = event.clientY - offsetY + 'px';

	document.onmousemove = function(event) {
		svgPanel.style.left = event.clientX - offsetX + 'px';
		svgPanel.style.top = event.clientY - offsetY + 'px';
	}

	function breakeMouseMove() {
    document.onmousemove = null;
		svgPanel.onmouseup = null;
		svgPanel.style.cursor = 'default';
  }

	svgPanel.onmouseup = breakeMouseMove;
	svgPanel.onmouseleave = breakeMouseMove;
}