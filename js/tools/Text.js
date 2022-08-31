class Text extends Figure {
	constructor(svg) {
		super(svg);

		this.enableFigureHandlers(
			this.addTextEditContent, this.adjustTextEditContent.bind(this), this.removeTextEditContent
		);

		this.svg.addEventListener('dblclick', () => {
        	if (toolbar.item !== cursor) {
				return;
			}

			const foreignObject = document.createElementNS(svgNS, 'foreignObject');
			foreignObject.setAttribute('x', this.translateX);
			foreignObject.setAttribute('y', this.translateY);
			foreignObject.setAttribute('width', 2000);
			foreignObject.setAttribute('height', 2000);


        	const textarea = document.createElement('textarea');
        	textarea.cols = 40;
        	textarea.rows = 10;
        	textarea.value = this.svg.innerHTML;

			foreignObject.appendChild(textarea);
        	canvas.svg.appendChild(foreignObject);

        	document.addEventListener('click', (event) => {
        		if (event.target != textarea) {
        			this.svg.innerHTML = textarea.value;
        			foreignObject.remove();
        		}
        	});
        });
	}

	static doTextDrawing(event) {
		if (toolbar.item !== text) {
			return;
		}

		let figureText = new Text(
			createSvgText(event.offsetX, event.offsetY, text.create.font.value, text.create.size.value,
				          text.create.opacity.value, text.create.fill.value)
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

        figureText.translate(figureText.clientX - canvas.clientX, 
        	                 figureText.clientY - canvas.clientY);

        figureText.x -= figureText.translateX;
        figureText.y -= figureText.translateY;

        figureText.updateTransformation();
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
        text.edit.opacity.value = this.opacity;
        text.edit.fill.value = this.fill;
        text.edit.size.value = this.size;
        text.edit.font.value = this.font;
	}

	set x(value)        { this.svg.setAttribute('x', +value); }
	set y(value)        { this.svg.setAttribute('y', +value); }

	get x()             { return this.svg.getAttribute('x'); }
	get y()             { return this.svg.getAttribute('y'); }
    get opacity()       { return this.svg.getAttribute('opacity'); }
    get fill()          { return this.svg.getAttribute('fill'); }
    get size()          { return +this.svg.getAttribute('font-size'); }   
    get font()          { return this.svg.getAttribute('font-family'); }
}

canvas.svg.addEventListener('click', Text.doTextDrawing);
