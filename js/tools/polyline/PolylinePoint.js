class PolylinePoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);

		this.enablePolylineTransformation();
	}

	enablePolylineTransformation() {
		const preparePolylineTransformation = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.fill = blue;
			isSomeFigureCaptured = true;

			const doPolylineTransformation = ( (event) => {
				this.cx = event.offsetX;
				this.cy = event.offsetY;

				this.figure.updateSvgPoints();

			} ).bind(this);

			const finishPolylineTransformation = ( () => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove', doPolylineTransformation);
				svgPanel.removeEventListener('mouseup', finishPolylineTransformation);
				svgPanel.removeEventListener('mouseleave', finishPolylineTransformation);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doPolylineTransformation);
			svgPanel.addEventListener('mouseup', finishPolylineTransformation);
			svgPanel.addEventListener('mouseleave', finishPolylineTransformation);

		} ).bind(this);

		this.circle.addEventListener('mousedown', preparePolylineTransformation);
	}
}