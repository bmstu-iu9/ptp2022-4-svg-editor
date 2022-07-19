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

			let x1, y1;
			let stablePoint;

			if (this.cx == this.figure.x && this.cy == this.figure.y) {
				x1 = this.figure.x + this.figure.width;
				y1 = this.figure.y + this.figure.height;
			} else if (this.cx == this.figure.x + this.figure.width && this.cy == this.figure.y) {
				x1 = this.figure.x;
				y1 = this.figure.y + this.figure.height;
			} else if (this.cx == this.figure.x + this.figure.width && this.cy == this.figure.y + this.figure.height) {
				x1 = this.figure.x;
				y1 = this.figure.y;
			} else if (this.cx == this.figure.x && this.cy == this.figure.y + this.figure.height) {
				x1 = this.figure.x + this.figure.width;
				y1 = this.figure.y;
			}

			this.figure.points.forEach((point) => {
				if (point.cx == x1 && point.cy == y1) {
					stablePoint = point;
				}
			})

			this.fill = blue;
			this.figure.svg.setAttribute('opacity', 0.5);
			isSomeFigureCaptured = true;

			const doRectangleTransformation = ( (event) => {
				const x2 = event.offsetX;
				const y2 = event.offsetY;
				const shiftX = x2 - x1;
				const shiftY = y2 - y1;
				const m = Math.min(shiftX, shiftY);

				this.cx = x2;
				this.cy = y2;

				if (shiftX >= 0 && shiftY >= 0) {
					if (shiftDown) {
						this.figure.width = m;
						this.figure.height = m;
						this.cx = x1 + m;
						this.cy = y1 + m;
					} else {
						this.figure.width = shiftX;
						this.figure.height = shiftY;
					}

					this.figure.x = x1;
					this.figure.y = y1;

				} else if (shiftX >= 0 && shiftY <= 0) {
					if (shiftDown) {
						this.figure.width = -m;
						this.figure.height = -m;
						this.cx = x1 - m;
						this.cy = y1 + m;
					} else {
						this.figure.width = shiftX;
						this.figure.height = -shiftY;
					}

					this.figure.x = x1;
					this.figure.y = y1 - this.figure.height;

				} else if (shiftX <= 0 && shiftY >= 0) {
					if (shiftDown) {
						this.figure.width = -m;
						this.figure.height = -m;
						this.cx = x1 + m;
						this.cy = y1 - m;
					} else {
						this.figure.width = -shiftX;
						this.figure.height = shiftY;
					}

					this.figure.x = x1 - this.figure.width;
					this.figure.y = y1;
				} else if (shiftX <= 0 && shiftY <= 0) {
					if (shiftDown) {
						this.figure.width = -m;
						this.figure.height = -m;
						this.cx = x1 + m;
						this.cy = y1 + m;
					} else {
						this.figure.width = -shiftX;
						this.figure.height = -shiftY;
					}

					this.figure.x = x1 - this.figure.width;
					this.figure.y = y1 - this.figure.height;
				}

				let pickPoint = 0;

				for (let i = 0; i < 4; i++) {
					if (this.figure.points[i] != stablePoint && this.figure.points[i] != this) {
						if (pickPoint == 0) {
							this.figure.points[i].cx = x1;
							this.figure.points[i].cy = this.cy;
							pickPoint = 1;
						} else {
							this.figure.points[i].cx = this.cx;
							this.figure.points[i].cy = y1;
							pickPoint = 0;
						}
					}
				}

			} ).bind(this);

			const finishRectangleTransformation = ( (event) => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;
				this.figure.svg.setAttribute('opacity', 1);

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