svgPanel.onmouseover = function() {
	if (selectedTool != handTool) {
		return;
	}
	svgPanel.style.cursor = 'pointer';
};

svgPanel.onmouseout = function() {
	if (selectedTool != handTool) {
		return;
	}
	svgPanel.style.cursor = 'default';
};


svgPanel.addEventListener('mousedown', (event) => {
	if (selectedTool != handTool) {
		return;
	}

	let svgPanelLocation = svgPanel.getBoundingClientRect();
	let offsetX = event.clientX - svgPanelLocation.left;
	let offsetY = event.clientY - svgPanelLocation.top;

	svgPanel.style.position = 'fixed';
	moveAt(event.clientX, event.clientY);

	function moveAt(clientX, clientY) {
		svgPanel.style.left = clientX - offsetX + 'px';
		svgPanel.style.top  = clientY - offsetY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.clientX, event.clientY);
	}

	function deleteHandlers() {
		document.removeEventListener('mousemove', onMouseMove);
		svgPanel.onmouseup = null;
	}

	document.addEventListener('mousemove', onMouseMove);
	svgPanel.onmouseup = deleteHandlers;

	// На случай перетягивания svgPanel за пределы документа.
	document.onmouseleave = deleteHandlers;

	// Необходимо для исключения раздваивания.
	svgPanel.ondragstart = function() {
		return false;
	};	
});