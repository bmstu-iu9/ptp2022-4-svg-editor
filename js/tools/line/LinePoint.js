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
				if (this.cx == this.figure.x1 &&
					this.cy == this.figure.y1) {

					this.figure.x1 = event.offsetX;
					this.figure.y1 = event.offsetY;
				} else {
					this.figure.x2 = event.offsetX;
					this.figure.y2 = event.offsetY;					
				}

				this.cx = event.offsetX;
				this.cy = event.offsetY;

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