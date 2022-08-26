class Ellipse extends Figure {
	constructor(svg) {
		super(svg);

		this.enableFigureHandlers(
            this.addEllipseEditContent, this.adjustEllipseEditContent.bind(this), this.removeEllipseEditContent
        );
	}

	static prepareEllipseDrawing(event) {
		if (toolbar.item !== shapes || shapesCreateSubtool.item != ellipse) {
			return;
		}

		const x1 = event.offsetX;
		const y1 = event.offsetY;

		let figureEllipse = new Ellipse(
			createSvgEllipse(x1, y1, 0, 0, ellipse.create.strokeWidth.value, 
				          ellipse.create.strokeOpacity.value, ellipse.create.stroke.value, 
				          ellipse.create.opacity.value, ellipse.create.fill.value)
		);

		canvas.svg.append(figureEllipse.svg);

		const doEllipseDrawing = (event) => {
			const x2 = event.offsetX;
			const y2 = event.offsetY;
			const shiftX = x2 - x1;
			const shiftY = y2 - y1;

			if (shiftX >= 0 && shiftY >= 0) {
				figureEllipse.rx = shiftX / 2;
				figureEllipse.ry = shiftY / 2;
			} else if (shiftX >= 0 && shiftY <= 0) {
				figureEllipse.rx = shiftX / 2;
				figureEllipse.ry = -shiftY / 2;
			}  else if (shiftX <= 0 && shiftY >= 0) {
				figureEllipse.rx = -shiftX / 2;
				figureEllipse.ry = shiftY / 2;
			}  else if (shiftX <= 0 && shiftY <= 0) {
				figureEllipse.rx = -shiftX / 2;
				figureEllipse.ry = -shiftY / 2;
			}

			figureEllipse.cx = x1 + shiftX / 2;
			figureEllipse.cy = y1 + shiftY / 2;
		}

		const finishEllipseDrawing = (event) => {
			figureEllipse.initialWidth = figureEllipse.clientWidth;
            figureEllipse.initialHeight = figureEllipse.clientHeight;

            figureEllipse.centerX = figureEllipse.initialWidth * 0.5;
            figureEllipse.centerY = figureEllipse.initialHeight * 0.5;

            figureEllipse.rotations.push({
                angle: 0,
                x: figureEllipse.centerX,
                y: figureEllipse.centerY
            })

            figureEllipse.enableScalePoints();
            figureEllipse.enableRotatePoints();

            figureEllipse.translate(figureEllipse.clientX - canvas.clientX, 
            	                    figureEllipse.clientY - canvas.clientY);

            figureEllipse.cx -= figureEllipse.translateX;
            figureEllipse.cy -= figureEllipse.translateY;

            figureEllipse.updateTransformation();

            canvas.svg.removeEventListener('mousemove', doEllipseDrawing);
			canvas.svg.removeEventListener('mouseup', finishEllipseDrawing);
			canvas.svg.removeEventListener('contextmenu', cancelEllipseDrawing);
			canvas.svg.removeEventListener('mouseleave', cancelEllipseDrawing);
		}

		const cancelEllipseDrawing = (event) => {
			figureEllipse.svg.remove();
			figureEllipse = null;

			canvas.svg.removeEventListener('mousemove', doEllipseDrawing);
			canvas.svg.removeEventListener('mouseup', finishEllipseDrawing);
			canvas.svg.removeEventListener('contextmenu', cancelEllipseDrawing);
			canvas.svg.removeEventListener('mouseleave', cancelEllipseDrawing);
		}

		canvas.svg.addEventListener('mousemove', doEllipseDrawing);
		canvas.svg.addEventListener('mouseup', finishEllipseDrawing);
		canvas.svg.addEventListener('contextmenu', cancelEllipseDrawing);
		canvas.svg.addEventListener('mouseleave', cancelEllipseDrawing);
	}

	addEllipseEditContent() {
        ellipse.edit.content.classList.remove('disabled');
        toolbar.content = ellipse.edit.content;
	}

	removeEllipseEditContent() {
		ellipse.edit.content.classList.add('disabled');
        toolbar.content = null;
	}

	adjustEllipseEditContent() {
		ellipse.edit.strokeWidth.value = this.strokeWidth;
        ellipse.edit.strokeOpacity.value = this.strokeOpacity;
        ellipse.edit.stroke.value = this.stroke;
        ellipse.edit.opacity.value = this.opacity;
        ellipse.edit.fill.value = this.fill;
	}

	set cx(value) { this.svg.setAttribute('cx', +value); }
	set cy(value) { this.svg.setAttribute('cy', +value); }
	set rx(value) { this.svg.setAttribute('rx', +value); }
	set ry(value) { this.svg.setAttribute('ry', +value); }

	get cx() { return +this.svg.getAttribute('cx'); }
	get cy() { return +this.svg.getAttribute('cy'); }
	get rx() { return +this.svg.getAttribute('rx'); }
	get ry() { return +this.svg.getAttribute('ry'); }

	get strokeWidth()   { return this.svg.getAttribute('stroke-width'); }
    get strokeOpacity() { return this.svg.getAttribute('stroke-opacity'); }
    get stroke()        { return this.svg.getAttribute('stroke'); }
    get opacity()       { return this.svg.getAttribute('opacity'); }
    get fill()          { return this.svg.getAttribute('fill'); }
}

canvas.svg.addEventListener('mousedown', Ellipse.prepareEllipseDrawing);