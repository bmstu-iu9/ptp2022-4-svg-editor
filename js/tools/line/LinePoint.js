class LinePoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);

		this.enableLineTransformation();
	}

	enableLineTransformation() {
		const prepareLineTransformation = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.fill = blue;
			isSomeFigureCaptured = true;

			const doLineTransformation = ( (event) => {
				const coords = getMouseCoords(event);
				if (this.cx == this.figure.x1 &&
					this.cy == this.figure.y1) {
					this.figure.x1 = coords.x;
					this.figure.y1 = coords.y;
				} else {
					this.figure.x2 = coords.x;
					this.figure.y2 = coords.y;
				}

				this.cx = coords.x;
				this.cy = coords.y;

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

		this.circle.addEventListener('mousedown', prepareLineTransformation);
	}
}
