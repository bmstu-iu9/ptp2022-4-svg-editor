class Rectangle extends Figure {
	constructor(svg) {
		super(svg);

		this.enableRectangleMotion();
	}

	static prepareRectangleDrawing(event) {
		if (selectedTool != RECTANGLE) {
			return;
		}

		const x1 = event.offsetX;
		const y1 = event.offsetY;

		let rectangle = new Rectangle(
			createSvgRectangle(x1, y1, 0, 0, selectedColor, 0.5)
		);

		svgPanel.append(rectangle.svg);

		const doRectangleDrawing = (event) => {
			const x2 = event.offsetX;
			const y2 = event.offsetY;
			const shiftX = x2 - x1;
			const shiftY = y2 - y1;
			const m = Math.min(shiftX, shiftY);

			if (shiftX >= 0 && shiftY >= 0) {
				if (shiftDown) {
					rectangle.width = m;
					rectangle.height = m;
				} else {
					rectangle.width = shiftX;
					rectangle.height = shiftY;
				}

				rectangle.x = x1;
				rectangle.y = y1;
			} else if (shiftX >= 0 && shiftY <= 0) {
				if (shiftDown) {
					rectangle.width = -m;
					rectangle.height = -m;
				} else {
					rectangle.width = shiftX;
					rectangle.height = -shiftY;
				}

				rectangle.x = x1;
				rectangle.y = y1 - rectangle.height;
			} else if (shiftX <= 0 && shiftY >= 0) {
				if (shiftDown) {
					rectangle.width = -m;
					rectangle.height = -m;
				} else {
					rectangle.width = -shiftX;
					rectangle.height = shiftY;
				}

				rectangle.x = x1 - rectangle.width;
				rectangle.y = y1;
			} else if (shiftX <= 0 && shiftY <= 0) {
				if (shiftDown) {
					rectangle.width = -m;
					rectangle.height = -m;
				} else {
					rectangle.width = -shiftX;
					rectangle.height = -shiftY;
				}

				rectangle.x = x1 - rectangle.width;
				rectangle.y = y1 - rectangle.height;
			}
		}

		const cancelRectangleDrawing = (event) => {
			rectangle.svg.remove();
			rectangle = null;

			svgPanel.removeEventListener('mousemove', doRectangleDrawing);
			svgPanel.removeEventListener('mouseup', finishRectangleDrawing);
			svgPanel.removeEventListener('contextmenu', cancelRectangleDrawing);
			svgPanel.removeEventListener('mouseleave', cancelRectangleDrawing);

			event.preventDefault();
		}

		const finishRectangleDrawing = (event) => {
			if (rectangle.width == 0 && rectangle.height == 0) {
				cancelRectangleDrawing(event);
				return;
			}

			rectangle.opacity = 1;

			rectangle.addRectanglePoint(rectangle.x, rectangle.y);
			rectangle.addRectanglePoint(rectangle.x + rectangle.width, rectangle.y);
			rectangle.addRectanglePoint(rectangle.x + rectangle.width, rectangle.y + rectangle.height);
			rectangle.addRectanglePoint(rectangle.x, rectangle.y + rectangle.height);

			rectangle.enableHighlight();

			svgPanel.removeEventListener('mousemove', doRectangleDrawing);
			svgPanel.removeEventListener('mouseup', finishRectangleDrawing);
			svgPanel.removeEventListener('contextmenu', cancelRectangleDrawing);
			svgPanel.removeEventListener('mouseleave', cancelRectangleDrawing);
		}

		svgPanel.addEventListener('mousemove', doRectangleDrawing);
		svgPanel.addEventListener('contextmenu', cancelRectangleDrawing);
		svgPanel.addEventListener('mouseleave', cancelRectangleDrawing);
		svgPanel.addEventListener('mouseup', finishRectangleDrawing);
	}

	enableRectangleMotion() {
		const prepareRectangleMotion = ( (event) => {
			if (selectedTool != CURSOR) {
				return;
			}

			isSomeFigureCaptured = true;

            let offsetX = event.offsetX;
            let offsetY = event.offsetY;

			const doRectangleMotion = ( (event) => {
				const shiftX = event.offsetX - offsetX;
				const shiftY = event.offsetY - offsetY;

				this.points.forEach( (point) => {
					point.cx += shiftX;
					point.cy += shiftY;
				});

				this.x += shiftX;
				this.y += shiftY;

				offsetX += shiftX;
				offsetY += shiftY;

			} ).bind(this)

			const finishRectangleMotion = ( (event) => {
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove', doRectangleMotion);
				svgPanel.removeEventListener('mouseup', finishRectangleMotion);
				svgPanel.removeEventListener('mouseleave', finishRectangleMotion);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doRectangleMotion);
			svgPanel.addEventListener('mouseup', finishRectangleMotion);
			svgPanel.addEventListener('mouseleave', finishRectangleMotion);

		} ).bind(this)

		this.svg.addEventListener('mousedown', prepareRectangleMotion);
	}

	addRectanglePoint(cx, cy) {
		this.points.push( new RectanglePoint(this, cx, cy) );
	}

	set width(value) { this.svg.setAttribute('width', +value); }
	set height(value) { this.svg.setAttribute('height', +value); }
	set opacity(value) { this.svg.setAttribute('opacity', +value); }
	set x(value) { this.svg.setAttribute('x', +value); }
	set y(value) { this.svg.setAttribute('y', +value); }

	get x() { return +this.svg.getAttribute('x'); }
	get y() { return +this.svg.getAttribute('y'); }
	get width() { return +this.svg.getAttribute('width'); }
	get height() { return +this.svg.getAttribute('height'); }
}

svgPanel.addEventListener('mousedown', Rectangle.prepareRectangleDrawing);