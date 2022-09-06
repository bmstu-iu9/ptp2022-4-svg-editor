class Rectangle extends Figure {
	constructor(svg) {
		super(svg);

		this.enableFigureHandlers(
            this.addRectEditContent, this.adjustRectEditContent.bind(this), this.removeRectEditContent
        );
	}

	static prepareRectangleDrawing(event) {
		if (toolbar.item !== shapes || shapesCreateSubtool.item !== rect) {
			return;
		}

		const x1 = event.offsetX;
		const y1 = event.offsetY;

		let figureRectangle = new Rectangle(
			createSvgRect(x1, y1, 0, 0, rect.create.strokeWidth.value, 
				          rect.create.strokeOpacity.value, rect.create.stroke.value, rect.create.opacity.value * 0.5,
				          rect.create.fill.value)
		);

		canvas.svg.append(figureRectangle.svg);

		const doRectangleDrawing = (event) => {
			const x2 = event.offsetX;
			const y2 = event.offsetY;
			const shiftX = x2 - x1;
			const shiftY = y2 - y1;

			if (shiftX >= 0 && shiftY >= 0) {
				figureRectangle.width = shiftX;
				figureRectangle.height = shiftY;

				figureRectangle.x = x1;
				figureRectangle.y = y1;
			} else if (shiftX >= 0 && shiftY <= 0) {
				figureRectangle.width = shiftX;
				figureRectangle.height = -shiftY;

				figureRectangle.x = x1;
				figureRectangle.y = y1 - figureRectangle.height;
			} else if (shiftX <= 0 && shiftY >= 0) {
				figureRectangle.width = -shiftX;
				figureRectangle.height = shiftY;

				figureRectangle.x = x1 - figureRectangle.width;
				figureRectangle.y = y1;
			} else if (shiftX <= 0 && shiftY <= 0) {
				figureRectangle.width = -shiftX;
				figureRectangle.height = -shiftY;

				figureRectangle.x = x1 - figureRectangle.width;
				figureRectangle.y = y1 - figureRectangle.height;
			}
		}

		const finishRectangleDrawing = () => {
			figureRectangle.opacity = rect.create.opacity.value;

			figureRectangle.initialWidth = figureRectangle.clientWidth;
            figureRectangle.initialHeight = figureRectangle.clientHeight;

            figureRectangle.centerX = figureRectangle.initialWidth * 0.5;
            figureRectangle.centerY = figureRectangle.initialHeight * 0.5;

            figureRectangle.rotations.push({
                angle: 0,
                x: figureRectangle.centerX,
                y: figureRectangle.centerY
            })

            figureRectangle.enableScalePoints();
            figureRectangle.enableRotatePoints();

            figureRectangle.translate(figureRectangle.clientX - canvas.clientX, 
            	                      figureRectangle.clientY - canvas.clientY);

            figureRectangle.x -= figureRectangle.translateX;
            figureRectangle.y -= figureRectangle.translateY;

            figureRectangle.updateTransformation();

			canvas.svg.removeEventListener('mousemove', doRectangleDrawing);
			canvas.svg.removeEventListener('mouseup', finishRectangleDrawing);
			canvas.svg.removeEventListener('contextmenu', cancelRectangleDrawing);
			canvas.svg.removeEventListener('mouseleave', cancelRectangleDrawing);
		}

		const cancelRectangleDrawing = (event) => {
			figureRectangle.svg.remove();
			figureRectangle = null;

			canvas.svg.removeEventListener('mousemove', doRectangleDrawing);
			canvas.svg.removeEventListener('mouseup', finishRectangleDrawing);
			canvas.svg.removeEventListener('contextmenu', cancelRectangleDrawing);
			canvas.svg.removeEventListener('mouseleave', cancelRectangleDrawing);
		}

		canvas.svg.addEventListener('mousemove', doRectangleDrawing);
		canvas.svg.addEventListener('mouseup', finishRectangleDrawing);
		canvas.svg.addEventListener('contextmenu', cancelRectangleDrawing);
		canvas.svg.addEventListener('mouseleave', cancelRectangleDrawing);
	}

	addRectEditContent() {
        rect.edit.content.classList.remove('disabled');
        toolbar.content = rect.edit.content;
	}

	removeRectEditContent() {
		rect.edit.content.classList.add('disabled');
        toolbar.content = null;
	}

	adjustRectEditContent() {
		rect.edit.strokeWidth.value = this.strokeWidth;
        rect.edit.strokeOpacity.value = this.strokeOpacity;
        rect.edit.stroke.value = this.stroke;
        rect.edit.opacity.value = this.opacity;
        rect.edit.fill.value = this.fill;
	}

	set x(value) { this.svg.setAttribute('x', +value); }
	set y(value) { this.svg.setAttribute('y', +value); }
	set width(value) { this.svg.setAttribute('width', +value); }
	set height(value) { this.svg.setAttribute('height', +value); }

	set opacity(value) { this.svg.setAttribute('opacity', value); }

	get x() { return +this.svg.getAttribute('x'); }
	get y() { return +this.svg.getAttribute('y'); }
	get width() { return +this.svg.getAttribute('width'); }
	get height() { return +this.svg.getAttribute('height'); }

	get strokeWidth()   { return this.svg.getAttribute('stroke-width'); }
    get strokeOpacity() { return this.svg.getAttribute('stroke-opacity'); }
    get stroke()        { return this.svg.getAttribute('stroke'); }
    get opacity()       { return this.svg.getAttribute('opacity'); }
    get fill()          { return this.svg.getAttribute('fill'); }    
}

canvas.svg.addEventListener('mousedown', Rectangle.prepareRectangleDrawing);