class Rectangle extends Figure {
	constructor(svg) {
		super(svg);
	}

	static prepareRectangleDrawing(event) {
		if (selectedTool != rectangleTool) {
			return;
		}

		const createSvgRectangle = () => {
			let svgRectangle = document.createElementNS(svgNS, 'rect');

			svgRectangle.setAttribute('x', event.offsetX);
			svgRectangle.setAttribute('y', event.offsetY);

			svgRectangle.setAttribute('width', 0);
			svgRectangle.setAttribute('height', 0);

			svgRectangle.setAttribute('fill', selectedColor);
			svgRectangle.setAttribute('opacity', 0.5);

			return svgRectangle;
		}

		const rectangle = new Rectangle( createSvgRectangle() );
		svgPanel.append(rectangle.svg);

		let shiftHold = false;

		const doRectangleDrawing = (event) => {
			if (shiftHold) {
				let m = Math.min(event.offsetX - rectangle.x, event.offsetY - rectangle.y);
				if (m > 0) {
					rectangle.width = m;
					rectangle.height = m;
				}
			} else {
				if ((event.offsetX - rectangle.x) > 0) {
					rectangle.width = event.offsetX - rectangle.x;
				}
				if ((event.offsetY - rectangle.y) > 0) {
					rectangle.height = event.offsetY - rectangle.y;
				}
			}
		}

		const finishRectangleDrawing = (event) => {
			svgPanel.removeEventListener('mousemove', doRectangleDrawing);
			svgPanel.removeEventListener('mouseup', finishRectangleDrawing);
			svgPanel.removeEventListener('mouseleave', finishRectangleDrawing);
			window.removeEventListener('keydown', enableShiftMode);
			window.removeEventListener('keyup', disableShiftMode);

			rectangle.opacity = 1;

			rectangle.addRectanglePoint(rectangle.x + rectangle.width, rectangle.y + rectangle.height);

			rectangle.enableCenterRectanglePoint();

			rectangle.enableHighlight();
		}

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

		svgPanel.addEventListener('mousemove', doRectangleDrawing);
		svgPanel.addEventListener('mouseup', finishRectangleDrawing);
		svgPanel.addEventListener('mouseleave', finishRectangleDrawing);
		window.addEventListener('keydown', enableShiftMode);
		window.addEventListener('keyup', disableShiftMode);
	}

	addRectanglePoint(cx, cy) {
		this.points.push( new RectanglePoint(this, cx, cy) );
	}

	enableCenterRectanglePoint() {
		this.centerPoint = new RectanglePoint(this, this.x + this.width / 2, this.y + this.height / 2);
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
