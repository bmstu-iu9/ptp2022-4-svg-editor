document.addEventListener('keydown', (event) => {
	if (event.key != 'Shift') {
		return;
	}
	shiftDown = true;
		console.log("shift")

	const shiftUp = () => {
		shiftDown = false;
		document.removeEventListener('keyup', shiftUp)
	};

	document.addEventListener('keyup', shiftUp);
});

document.addEventListener('keypress', (event) => {
	if (event.key != 'Delete' || selectedFigure == null) {
		return;
	}

	selectedFigure.points.forEach( (point) => {
		point.circle.remove();
		point = null;
	});

	selectedFigure.svg.remove();
	selectedFigure = null;
});