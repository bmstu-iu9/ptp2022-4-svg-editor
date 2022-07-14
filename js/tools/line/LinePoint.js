class LinePoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);
		this.enableLineMotion();
		this.enableLineTransformation();
	}

	enableLineMotion() {
		const prepareLineMotion = ( (event) => {
			if (selectedTool != cursorTool || this != this.figure.centerPoint) {
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

	enableLineTransformation() {
		const prepareLineTransformation = ( (event) => {
			if (selectedTool != cursorTool || this == this.figure.centerPoint) {
				return;
			}

			this.fill = blue;
			selectedPoint = this;

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

				this.figure.centerPoint.cx = (this.figure.x1 + this.figure.x2) / 2;
				this.figure.centerPoint.cy = (this.figure.y1 + this.figure.y2) / 2;
			}).bind(this);

			const finishLineTransformation = ( (event) => {
				svgPanel.removeEventListener('mousemove', doLineTransformation);
				svgPanel.removeEventListener('mouseup', finishLineTransformation);
				svgPanel.removeEventListener('mouseleave', finishLineTransformation);

				this.fill = white;
				selectedPoint = null;			
			}).bind(this);

			svgPanel.addEventListener('mousemove', doLineTransformation);
			svgPanel.addEventListener('mouseup', finishLineTransformation);
			svgPanel.addEventListener('mouseleave', finishLineTransformation);
		}).bind(this);

		this.circle.addEventListener('mousedown', prepareLineTransformation);
	}
}