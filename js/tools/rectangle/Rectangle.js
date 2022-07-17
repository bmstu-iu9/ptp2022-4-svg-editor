class Rectangle extends Figure {
	constructor(svg) {
		super(svg);

		this.enableRectangleMotion();
	}

	static prepareRectangleDrawing(event) {
		if (selectedTool != RECTANGLE) {
			return;
		}

		let rectangle = new Rectangle(
			createSvgRectangle(event.offsetX, event.offsetY, 0, 0, selectedColor, 0.5)
		);

		svgPanel.append(rectangle.svg);

		const doRectangleDrawing = (event) => {
			if (shiftDown) {
				const m = Math.min(event.offsetX - rectangle.x, event.offsetY - rectangle.y);
				if (m > 0) {
					rectangle.width = m;
					rectangle.height = m;
				}
			} else {
				if (event.offsetX - rectangle.x > 0) {
					rectangle.width = event.offsetX - rectangle.x;
				}
				if (event.offsetY - rectangle.y > 0) {
					rectangle.height = event.offsetY - rectangle.y;
				}
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

			rectangle.addRectanglePoint(rectangle.x + rectangle.width, rectangle.y + rectangle.height);

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