class Text extends Figure {
	constructor(svg) {
		super(svg);

		this.enableFigureHandlers(
			this.addTextEditContent, this.adjustTextEditContent.bind(this), this.removeTextEditContent
		);
	}

	static doTextDrawing(event) {
		if (toolbar.item !== text) {
			return;
		}

		let figureText = new Text(
			createSvgText(
				event.offsetX, event.offsetY, text.create.fontSize.value, text.create.fontFamily.value,
				text.create.fontWeight.value, text.create.fontStyle.value, text.create.textDecoration.value,
				text.create.opacity.value, text.create.fill.value
			)
		);

		canvas.svg.append(figureText.svg);

		figureText.initialWidth = figureText.clientWidth;
		figureText.initialHeight = figureText.clientHeight;

		figureText.centerX = figureText.initialWidth * 0.5;
		figureText.centerY = figureText.initialHeight * 0.5;

		figureText.rotations.push({
			angle: 0,
			x: figureText.centerX,
			y: figureText.centerY
		})

		figureText.enableScalePoints();
		figureText.enableRotatePoints();

		figureText.translate(figureText.clientX - canvas.clientX, figureText.clientY - canvas.clientY);

		figureText.x -= figureText.translateX;
		figureText.y -= figureText.translateY;

		figureText.updateTransformation();

		figureText.enableTextEditing();
	}

	enableTextEditing() {
		this.svg.addEventListener('dblclick', () => {
			if (toolbar.item !== cursor) {
				return;
			}

			this.svg.remove();
			this.removeSelection();
			Figure.selected = null;

			let foreignObject = document.createElementNS(svgNS, 'foreignObject');

			foreignObject.setAttribute('x', '0');
			foreignObject.setAttribute('y', '0');

			foreignObject.setAttribute('width', '2000');
			foreignObject.setAttribute('height', '2000');

			foreignObject.setAttribute('transform', this.transform);

			let div = document.createElement('div');

			div.style.color = this.fill;
			div.style.opacity = `${this.opacity * 0.5}`;

			div.style.font = `${this.fontStyle} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
			div.style.textDecoration = this.textDecoration;
			div.style.outline = 'none';

			div.innerHTML = this.svg.innerHTML;
			div.contentEditable = 'true';

			foreignObject.appendChild(div);
			canvas.svg.appendChild(foreignObject);

			const finishTextEditing = (event) => {
				if (event.target === div && event.key !== 'Escape' && event.key !== 'Enter') {
					return;
				}

				if (div.innerHTML !== '') {
					let text = createSvgText(
						0, 0, this.fontSize, this.fontFamily, this.fontWeight, this.fontStyle, this.textDecoration, 1, black
					)
					text.innerHTML = div.innerHTML;
					canvas.svg.append(text);

					const bound = text.getBoundingClientRect();

					text.remove();
					text = null;

					const updatePoint = (point) => {
						point.initialX = point.initialX / this.initialWidth * bound.width;
						point.initialY = point.initialY / this.initialHeight * bound.height;
						Point.update(point);
					}

					this.scalePoints.forEach(updatePoint);
					this.rotatePoints.forEach(updatePoint);

					this.initialHeight = bound.height;
					this.initialWidth = bound.width;

					this.centerX = 0.5 * this.initialWidth;
					this.centerY = 0.5 * this.initialHeight;

					this.svg.innerHTML = div.innerHTML;
				}

				canvas.svg.append(this.svg);

				foreignObject.remove();
				foreignObject = null;
				div = null;

				document.removeEventListener('keydown', finishTextEditing);
				document.removeEventListener('mousedown', finishTextEditing);
			}

			document.addEventListener('keydown', finishTextEditing);
			document.addEventListener('mousedown', finishTextEditing);
		});
	}

	addTextEditContent() {
		text.edit.content.classList.remove('disabled');
		toolbar.content = text.edit.content;
	}

	removeTextEditContent() {
		text.edit.content.classList.add('disabled');
		toolbar.content = null;
	}

	adjustTextEditContent() {
		text.edit.fontWeight.value = this.fontWeight;
		text.edit.fontStyle.value = this.fontStyle;
		text.edit.textDecoration.value = this.textDecoration;

		text.edit.opacity.value = this.opacity;
		text.edit.fill.value = this.fill;
	}

	set x(value)        { this.svg.setAttribute('x', +value); }
	set y(value)        { this.svg.setAttribute('y', +value); }

	get x()          { return this.svg.getAttribute('x'); }
	get y()          { return this.svg.getAttribute('y'); }

	get fontSize()   {return this.svg.getAttribute('font-size'); }
	get fontFamily() {return this.svg.getAttribute('font-family'); }

	get fontWeight()     { return this.svg.getAttribute('font-weight'); }
	get fontStyle()      { return this.svg.getAttribute('font-style'); }
	get textDecoration() { return this.svg.getAttribute('text-decoration'); }

	get opacity() { return this.svg.getAttribute('opacity'); }
	get fill()    { return this.svg.getAttribute('fill'); }
}

canvas.svg.addEventListener('click', Text.doTextDrawing);