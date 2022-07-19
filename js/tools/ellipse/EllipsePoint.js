class EllipsePoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);

		this.enableEllipseTransformation();
	}

	enableEllipseTransformation() {
		const prepareEllipseTransformation = ( (event) => {
			if (selectedTool != CURSOR) {
				return;
			}

			let x1, y1;
			let stablePoint;

			if (this.cx == this.figure.cx - this.figure.rx && this.cy == this.figure.cy - this.figure.ry) {
				x1 = this.figure.cx + this.figure.rx;
				y1 = this.figure.cy + this.figure.ry;
			} else if (this.cx == this.figure.cx - this.figure.rx && this.cy == this.figure.cy + this.figure.ry) {
				x1 = this.figure.cx + this.figure.rx;
				y1 = this.figure.cy - this.figure.ry;
			} else if (this.cx == this.figure.cx + this.figure.rx && this.cy == this.figure.cy - this.figure.ry) {
				x1 = this.figure.cx - this.figure.rx;
				y1 = this.figure.cy + this.figure.ry;
			} else if (this.cx == this.figure.cx + this.figure.rx && this.cy == this.figure.cy + this.figure.ry) {
				x1 = this.figure.cx - this.figure.rx;
				y1 = this.figure.cy - this.figure.ry;
			}

			this.figure.points.forEach((point) => {
				if (point.cx == x1 && point.cy == y1) {
					stablePoint = point;
				}
			})

			this.fill = blue;
			this.figure.svg.setAttribute('opacity', 0.5);
			isSomeFigureCaptured = true;

			const doEllipseTransformation = ( (event) => {
				const x2 = event.offsetX;
				const y2 = event.offsetY;
				const shiftX = (x2 - x1) / 2;
				const shiftY = (y2 - y1) / 2;
				const m = Math.min(shiftX, shiftY);

				this.cx = x2;
				this.cy = y2;

				if (shiftX >= 0 && shiftY >= 0) {
					if (shiftDown) {
						this.figure.rx = m;
						this.figure.ry = m;
						this.cx = x1 + 2 * m;
						this.cy = y1 + 2 * m;
					} else {
						this.figure.rx = shiftX;
						this.figure.ry = shiftY;
					}

					this.figure.cx = x1 + this.figure.rx;
					this.figure.cy = y1 + this.figure.ry;

				} else if (shiftX >= 0 && shiftY <= 0) {
					if (shiftDown) {
						this.figure.rx = -m;
						this.figure.ry = -m;
						this.cx = x1 - 2 * m;
						this.cy = y1 + 2 * m;
					} else {
						this.figure.rx = shiftX;
						this.figure.ry = -shiftY;
					}

					this.figure.cx = x1 + this.figure.rx;
					this.figure.cy = y1 - this.figure.ry;

				} else if (shiftX <= 0 && shiftY >= 0) {
					if (shiftDown) {
						this.figure.rx = -m;
						this.figure.ry = -m;
						this.cx = x1 + 2 * m;
						this.cy = y1 - 2 * m;
					} else {
						this.figure.rx = -shiftX;
						this.figure.ry = shiftY;
					}

					this.figure.cx = x1 - this.figure.rx;
					this.figure.cy = y1 + this.figure.ry;
				} else if (shiftX <= 0 && shiftY <= 0) {
					if (shiftDown) {
						this.figure.rx = -m;
						this.figure.ry = -m;
						this.cx = x1 + 2 * m;
						this.cy = y1 + 2 * m;
					} else {
						this.figure.rx = -shiftX;
						this.figure.ry = -shiftY;
					}

					this.figure.cx = x1 - this.figure.rx;
					this.figure.cy = y1 - this.figure.ry;
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

			const finishEllipseTransformation = ( (event) => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;
				this.figure.svg.setAttribute('opacity', 1);

				svgPanel.removeEventListener('mousemove', doEllipseTransformation);
				svgPanel.removeEventListener('mouseup', finishEllipseTransformation);
				svgPanel.removeEventListener('mouseleave', finishEllipseTransformation);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doEllipseTransformation);
			svgPanel.addEventListener('mouseup', finishEllipseTransformation);
			svgPanel.addEventListener('mouseleave', finishEllipseTransformation);

		} ).bind(this);

		this.circle.addEventListener('mousedown', prepareEllipseTransformation);
	}
}