document.addEventListener('keydown', (event) => {
	if (!event.shiftKey) {
		return;
	}
	shiftDown = true;

	const shiftUp = () => {
		shiftDown = false;
		document.removeEventListener('keyup', shiftUp)
	};

	document.addEventListener('keyup', shiftUp);
});