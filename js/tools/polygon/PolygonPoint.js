class PolygonPoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);

		this.enablePolygonTransformation();
	}

	enablePolygonTransformation() {
		const preparePolygonTransformation = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.fill = blue;
			isSomeFigureCaptured = true;

			const doPolygonTransformation = ( (event) => {
				this.cx = event.offsetX;
				this.cy = event.offsetY;

				this.figure.updateSvgPoints();

			} ).bind(this);

			const finishPolygonTransformation = ( () => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove', doPolygonTransformation);
				svgPanel.removeEventListener('mouseup', finishPolygonTransformation);
				svgPanel.removeEventListener('mouseleave', finishPolygonTransformation);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doPolygonTransformation);
			svgPanel.addEventListener('mouseup', finishPolygonTransformation);
			svgPanel.addEventListener('mouseleave', finishPolygonTransformation);

		} ).bind(this);

		this.circle.addEventListener('mousedown', preparePolygonTransformation);
	}
}