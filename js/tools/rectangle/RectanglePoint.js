class RectanglePoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);

		this.enableRectangleTransformation();
	}

	enableRectangleTransformation() {
		const prepareRectangleTransformation = ( (event) => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.fill = blue;
			isSomeFigureCaptured = true;

			const doRectangleTransformation = ( (event) => {
				const offsetX = event.offsetX - this.figure.x;
				const offsetY = event.offsetY - this.figure.y;

				if (shiftDown) {
					const m = Math.min(offsetX, offsetY);
					if (m > 0) {
						this.figure.width = m;
						this.figure.height = m;

						this.cx = this.figure.x + m;
						this.cy = this.figure.y + m;
					}
				} else {
					if (offsetX > 0) {
						this.figure.width = offsetX;
						this.cx = event.offsetX;
					}
					if (offsetY > 0) {
						this.figure.height = offsetY;
						this.cy = event.offsetY;
					}
				}

			} ).bind(this);

			const finishRectangleTransformation = ( (event) => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove', doRectangleTransformation);
				svgPanel.removeEventListener('mouseup', finishRectangleTransformation);
				svgPanel.removeEventListener('mouseleave', finishRectangleTransformation);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doRectangleTransformation);
			svgPanel.addEventListener('mouseup', finishRectangleTransformation);
			svgPanel.addEventListener('mouseleave', finishRectangleTransformation);

		} ).bind(this);

		this.circle.addEventListener('mousedown', prepareRectangleTransformation);
	}
}