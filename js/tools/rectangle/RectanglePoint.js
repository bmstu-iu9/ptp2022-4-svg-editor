class RectanglePoint extends Point {
	constructor(figure, cx, cy) {
		super(figure, cx, cy);
		this.enableRectangleMotion();
		this.enableRectangleTransformation();
	}

	enableRectangleMotion() {
		const prepareRectangleMotion = ( (event) => {
			if (selectedTool != cursorTool || this != this.figure.centerPoint) {
				return;
			}

			this.fill = blue;
			selectedPoint = this;

			const doRectangleMotion = ( (event) => {
				const shiftX = event.offsetX - this.cx;
				const shiftY = event.offsetY - this.cy;

				this.figure.x += shiftX;
				this.figure.y += shiftY;

				this.figure.points.forEach( (point) => {
					point.cx += shiftX;
					point.cy += shiftY;
				});

				this.cx += shiftX;
				this.cy += shiftY;
			}).bind(this)

			const finishRectangleMotion = ( (event) => {
				svgPanel.removeEventListener('mousemove', doRectangleMotion);
				svgPanel.removeEventListener('mouseup', finishRectangleMotion);
				svgPanel.removeEventListener('mouseleave', finishRectangleMotion);

				this.fill = white;
				selectedPoint = null;
			}).bind(this);

			svgPanel.addEventListener('mousemove', doRectangleMotion);
			svgPanel.addEventListener('mouseup', finishRectangleMotion);
			svgPanel.addEventListener('mouseleave', finishRectangleMotion);
		}).bind(this)

		this.circle.addEventListener('mousedown', prepareRectangleMotion)
	}

	enableRectangleTransformation() {
		const prepareRectangleTransformation = ( (event) => {
			if (selectedTool != cursorTool || this == this.figure.centerPoint) {
				return;
			}

			this.fill = blue;
			selectedPoint = this;

			let shiftHold = false;

			const doRectangleTransformation = ( (event) => {
				let offsetX = event.offsetX - this.figure.x;
				let offsetY = event.offsetY - this.figure.y;

				if (shiftHold) {
					let m = Math.min(offsetX, offsetY);
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

				this.figure.centerPoint.cx = this.figure.x + this.figure.width / 2;
				this.figure.centerPoint.cy = this.figure.y + this.figure.height / 2;
			}).bind(this);

			const finishRectangleTransformation = ( (event) => {
				svgPanel.removeEventListener('mousemove', doRectangleTransformation);
				svgPanel.removeEventListener('mouseup', finishRectangleTransformation);
				svgPanel.removeEventListener('mouseleave', finishRectangleTransformation);
				window.removeEventListener('keydown', enableShiftMode);
				window.removeEventListener('keyup', disableShiftMode);

				this.fill = white;
				selectedPoint = null;	
			});

			const enableShiftMode = (event) => {
				if (event.keyCode == 16) {
					shiftHold = true;
				}
			}

			const disableShiftMode = (event) => {
				if (event.keyCode == 16) {
					shiftHold = false;
				}
			}

			svgPanel.addEventListener('mousemove', doRectangleTransformation);
			svgPanel.addEventListener('mouseup', finishRectangleTransformation);
			svgPanel.addEventListener('mouseleave', finishRectangleTransformation);
			window.addEventListener('keydown', enableShiftMode);
			window.addEventListener('keyup', disableShiftMode);
		}).bind(this);

		this.circle.addEventListener('mousedown', prepareRectangleTransformation);
	}
}