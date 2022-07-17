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

			const doLineTransformation = ( (event) => {
				this.cx = event.offsetX;
				this.cy = event.offsetY;

				this.figure.updateSvgPoints();

			} ).bind(this);

			const finishLineTransformation = ( () => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove', doLineTransformation);
				svgPanel.removeEventListener('mouseup', finishLineTransformation);
				svgPanel.removeEventListener('mouseleave', finishLineTransformation);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doLineTransformation);
			svgPanel.addEventListener('mouseup', finishLineTransformation);
			svgPanel.addEventListener('mouseleave', finishLineTransformation);

		} ).bind(this);

		this.circle.addEventListener('mousedown', preparePolylineTransformation);
	}
}