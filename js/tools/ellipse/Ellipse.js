class Ellipse extends Figure {
	constructor(svg) {
		super(svg);

		this.enableEllipseMotion();
	}

	static prepareEllipseDrawing(event) {
		if (selectedTool != ELLIPSE) {
			return;
		}

		const coords = getMouseCoords(event);
		const x1 = coords.x;
		const y1 = coords.y;

		let ellipse = new Ellipse (
			createSvgEllipse(x1, y1, 0, 0, polygonWidth, lightBlue, selectedColor, 0.5)
		);

		svgPanel.append(ellipse.svg);

		const doEllipseDrawing = (event) => {
			const coords = getMouseCoords(event);
			const x2 = coords.x;
			const y2 = coords.y;

			const rx = Math.abs(x2 - x1) / 2;
			const ry = Math.abs(y2 - y1) / 2;

			if (shiftDown) {
				const m = Math.min(rx, ry);
				ellipse.rx = m;
				ellipse.ry = m;
			} else {
				ellipse.rx = rx;
				ellipse.ry = ry;
			}

			if (x2 - x1 < 0) {
				ellipse.cx = x1 - ellipse.rx;
			} else {
				ellipse.cx = x1 + ellipse.rx;
			}

			if (y2 - y1 < 0) {
				ellipse.cy = y1 - ellipse.ry;
			} else {
				ellipse.cy = y1 + ellipse.ry;
			}
		}

		const cancelEllipseDrawing = (event) => {
			ellipse.svg.remove();
			ellipse = null;

			svgPanel.removeEventListener('mousemove', doEllipseDrawing);
			svgPanel.removeEventListener('mouseup', finishEllipseDrawing);
			svgPanel.removeEventListener('contextmenu', cancelEllipseDrawing);
			svgPanel.removeEventListener('mouseleave', cancelEllipseDrawing);

			event.preventDefault();
		}

		const finishEllipseDrawing = (event) => {
			if (ellipse.rx == 0 && ellipse.ry == 0) {
				cancelEllipseDrawing(event);
				return;
			}

			ellipse.opacity = 1;

			ellipse.addEllipsePoint(ellipse.cx + ellipse.rx, ellipse.cy + ellipse.ry);
			ellipse.addEllipsePoint(ellipse.cx + ellipse.rx, ellipse.cy - ellipse.ry);
			ellipse.addEllipsePoint(ellipse.cx - ellipse.rx, ellipse.cy + ellipse.ry);
			ellipse.addEllipsePoint(ellipse.cx - ellipse.rx, ellipse.cy - ellipse.ry);

			ellipse.enableHighlight();

			svgPanel.removeEventListener('mousemove', doEllipseDrawing);
			svgPanel.removeEventListener('mouseup', finishEllipseDrawing);
			svgPanel.removeEventListener('contextmenu', cancelEllipseDrawing);
			svgPanel.removeEventListener('mouseleave', cancelEllipseDrawing);
		}

		svgPanel.addEventListener('mousemove', doEllipseDrawing);
		svgPanel.addEventListener('contextmenu', cancelEllipseDrawing);
		svgPanel.addEventListener('mouseleave', cancelEllipseDrawing);
		svgPanel.addEventListener('mouseup', finishEllipseDrawing);

	}

	enableEllipseMotion() {
		const prepareEllipseMotion = ( (event) => {
			if (selectedTool != CURSOR) {
				return;
			}

			isSomeFigureCaptured = true;

			const coords = getMouseCoords(event);
			let x1 = coords.x;
			let y1 = coords.y;

			const doEllipseMotion = ( (event) => {

				const coords = getMouseCoords(event);
				let x2 = coords.x;
				let y2 = coords.y;
				const shiftX = x2 - x1;
				const shiftY = y2 - y1;

				this.points.forEach( (point) => {
					point.cx += shiftX;
					point.cy += shiftY;
				});

				this.cx += shiftX;
				this.cy += shiftY;

				x1 = x2;
				y1 = y2;

			} ).bind(this)

			const finishEllipseMotion = ( (event) => {
				isSomeFigureCaptured = false;

				svgPanel.removeEventListener('mousemove', doEllipseMotion);
				svgPanel.removeEventListener('mouseup', finishEllipseMotion);
				svgPanel.removeEventListener('mouseleave', finishEllipseMotion);

			} ).bind(this);

			svgPanel.addEventListener('mousemove', doEllipseMotion);
			svgPanel.addEventListener('mouseup', finishEllipseMotion);
			svgPanel.addEventListener('mouseleave', finishEllipseMotion);

		} ).bind(this);

		this.svg.addEventListener('mousedown', prepareEllipseMotion);
	}

	addEllipsePoint(cx, cy) {
		this.points.push( new EllipsePoint(this, cx, cy) );
	}



	get cx() { return +this.svg.getAttribute('cx'); }
	get cy() { return +this.svg.getAttribute('cy'); }
	get rx() { return +this.svg.getAttribute('rx'); }
	get ry() { return +this.svg.getAttribute('ry'); }


	set cx(value) { this.svg.setAttribute('cx', +value); }
	set cy(value) { this.svg.setAttribute('cy', +value); }
	set rx(value) { this.svg.setAttribute('rx', +value); }
	set ry(value) { this.svg.setAttribute('ry', +value); }
	set opacity(value) { this.svg.setAttribute('opacity', +value); }
}

svgPanel.addEventListener('mousedown', Ellipse.prepareEllipseDrawing);
