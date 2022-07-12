class LineCenterPoint extends CenterPoint {
	constructor(figure) {
		super(figure);
		this.enableLineMotion();
	}

	enableLineMotion() {
		const prepareLineMotion = ( (event) => {
			if (selectedTool != cursorTool) {
				return;
			}

			this.fill = blue;
			selectedPoint = this;

			const doLineMotion = ( (event) => {
				const shiftX = event.offsetX - this.cx;
				const shiftY = event.offsetY - this.cy;

				this.figure.x1 += shiftX;
				this.figure.y1 += shiftY;
				this.figure.x2 += shiftX;
				this.figure.y2 += shiftY;

				this.figure.points.forEach( (point) => {
					point.cx += shiftX;
					point.cy += shiftY;
				});

				this.cx += shiftX;
				this.cy += shiftY;
			}).bind(this);

			const finishLineMotion = ( (event) => {
				svgPanel.removeEventListener('mousemove', doLineMotion);
				svgPanel.removeEventListener('mouseup', finishLineMotion);
				svgPanel.removeEventListener('mouseleave', finishLineMotion);

				this.fill = white;
				selectedPoint = null;			
			}).bind(this);

			svgPanel.addEventListener('mousemove', doLineMotion);
			svgPanel.addEventListener('mouseup', finishLineMotion);
			svgPanel.addEventListener('mouseleave', finishLineMotion);
		}).bind(this);

		this.circle.addEventListener('mousedown', prepareLineMotion);
	}
}