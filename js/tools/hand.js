svgPanel.addEventListener('mouseover', () => {
	if (selectedTool != HAND) {
		return;
	}

	svgPanel.style.cursor = 'pointer';
});

svgPanel.addEventListener('mouseout', () => {
	if (selectedTool != HAND) {
		return;
	}
	
	svgPanel.style.cursor = 'default';
});

svgPanel.addEventListener('mousedown', (event) => {
	if (selectedTool != HAND) {
		return;
	}

	const svgPanelLocation = svgPanel.getBoundingClientRect();
	const offsetX = event.clientX - svgPanelLocation.left;
	const offsetY = event.clientY - svgPanelLocation.top;

	svgPanel.style.position = 'fixed';

	svgPanel.style.left = event.clientX - offsetX + 'px';
	svgPanel.style.top  = event.clientY - offsetY + 'px';

	const doSvgPanelMotion = (event) => {
		svgPanel.style.left = event.clientX - offsetX + 'px';
		svgPanel.style.top  = event.clientY - offsetY + 'px';
	};

	const finishSvgPanelMotion = () => {
		document.removeEventListener('mousemove', doSvgPanelMotion);
		document.removeEventListener('mouseup', finishSvgPanelMotion);
		document.removeEventListener('mouseleave', finishSvgPanelMotion);
	}

	document.addEventListener('mousemove', doSvgPanelMotion);
	document.addEventListener('mouseup', finishSvgPanelMotion);
	document.addEventListener('mouseleave', finishSvgPanelMotion);
});