class Ellipse extends Figure {
	constructor(svg) {
		super(svg);

		this.enableEllipseMotion();
	}

	static prepareEllipseDrawing(event) {
		if (selectedTool != ELLIPSE) {
			return;
		}

		const x1 = event.offsetX;
		const y1 = event.offsetY;

		let ellipse = new Ellipse (
			createSvgEllipse(x1, y1, 0, 0, polygonWidth, lightBlue, selectedColor, 0.5)
		);

		svgPanel.append(ellipse.svg);

		const doEllipseDrawing = (event) => {
			const x2 = event.offsetX;
			const y2 = event.offsetY;

			const rx = Math.abs(x2 - x1);
			const ry = Math.abs(y2 - y1);

			if (shiftDown) {
				const m = Math.min(rx, ry);
				ellipse.rx = m;
				ellipse.ry = m;
			} else {
				ellipse.rx = rx;
				ellipse.ry = ry;
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

            let x1 = event.offsetX;
            let y1 = event.offsetY;

			const doEllipseMotion = ( (event) => {
				let x2 = event.offsetX;
				let y2 = event.offsetY;
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