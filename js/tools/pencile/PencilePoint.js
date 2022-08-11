class PencilePoint extends Point {

	constructor(figure, cx, cy) {
		super(figure, cx, cy);

		this.enablePencileTransformation();
	}

	enablePencileTransformation() {
		const preparePencileTransformation = ( (event) => {
			if (selectedTool != CURSOR) {
				return;
			}

			// Pivot точка, которая будет оставаться на месте при преобразовании и её координаты
			let x1, y1;
			let stablePoint;

			if (this.cx == this.figure.x && this.cy == this.figure.y) {
				x1 = this.figure.x + this.figure.width;
				y1 = this.figure.y + this.figure.height;
			} else if ((this.cx == this.figure.x + this.figure.width) && (this.cy == this.figure.y)) {
				x1 = this.figure.x;
				y1 = this.figure.y + this.figure.height;
			} else if ((this.cx == this.figure.x + this.figure.width) && (this.cy == this.figure.y + this.figure.height)) {
				x1 = this.figure.x;
				y1 = this.figure.y;
			} else if ((this.cx == this.figure.x) && (this.cy == this.figure.y + this.figure.height)) {
				x1 = this.figure.x + this.figure.width;
				y1 = this.figure.y;
			}

			this.figure.points.forEach((point) => {
				if (point.cx == x1 && point.cy == y1) {
					stablePoint = point;
				}
			});

			this.fill = blue;

			isSomeFigureCaptured = true;

			const doPencileTransformation = ( (event) => {
				const coords = getMouseCoords(event);
				const x2 = coords.x;
				const y2 = coords.y;
				const shiftX = x2 - x1;
				const shiftY = y2 - y1;

				this.figure.anchorDots.forEach( (dot) => {
					if (shiftX != 0) {
						dot.x = x1 + (dot.x - x1) * shiftX / (this.cx - x1);
					}
					if (shiftY != 0) {
						dot.y = y1 + (dot.y - y1) * shiftY / (this.cy - y1);
					}
				});

				this.figure.syncDots();

				if (x2 != x1) {
					this.cx = x2;
				}
				if (y2 != y1) {
					this.cy = y2;
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

			const finishPencileTransformation = ( (event) => {
				this.fill = lightBlue;
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove',  doPencileTransformation);
				svgPanel.removeEventListener('mouseup',    finishPencileTransformation);
				svgPanel.removeEventListener('mouseleave', finishPencileTransformation);

			} ).bind(this);

			svgPanel.addEventListener('mousemove',  doPencileTransformation);
			svgPanel.addEventListener('mouseup',    finishPencileTransformation);
			svgPanel.addEventListener('mouseleave', finishPencileTransformation);

		} ).bind(this);

		this.circle.addEventListener('mousedown', preparePencileTransformation);
	}
}
