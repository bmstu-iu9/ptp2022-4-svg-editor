canvas.svg.addEventListener('mouseenter', () => {
	if (toolbar.item !== hand) {
		return;
	}

	canvas.svg.style.cursor = 'pointer';
});

canvas.svg.addEventListener('mouseleave', () => {
	if (toolbar.item !== hand) {
		return;
	}

	canvas.svg.style.cursor = 'default';
});

canvas.svg.addEventListener('mousedown', (event) => {
	if (toolbar.item !== hand) {
		return;
	}

	const location = canvas.svg.getBoundingClientRect();
	const offsetX = event.clientX - location.left;
	const offsetY = event.clientY - location.top;

	canvas.svg.style.position = 'fixed';

	canvas.svg.style.left = event.clientX - offsetX + 'px';
	canvas.svg.style.top  = event.clientY - offsetY + 'px';

	const doSvgPanelMotion = (event) => {
		canvas.svg.style.left = event.clientX - offsetX + 'px';
		canvas.svg.style.top  = event.clientY - offsetY + 'px';
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