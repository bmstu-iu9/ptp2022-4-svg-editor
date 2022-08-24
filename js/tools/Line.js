class Line extends Figure {
    constructor(svg) {
        super(svg);

        this.enableFigureHandlers(
            this.addLineEditContent, this.adjustLineEditContent.bind(this), this.removeLineEditContent
        );
    }

    static prepareLineDrawing(event) {
        if (toolbar.item !== curves || curvesCreateSubtool.item !== line) {
            return;
        }

        let figureLine = new Line(
            createSvgLine(
                event.offsetX, event.offsetY, event.offsetX, event.offsetY,
                line.create.strokeWidth.value, line.create.strokeOpacity.value * 0.5,
                line.create.stroke.value
            )
        );

        canvas.svg.append(figureLine.svg);

        const doLineDrawing = (event) => {
            figureLine.x2 = event.offsetX;
            figureLine.y2 = event.offsetY;
        };

        const finishLineDrawing = () => {
            figureLine.strokeOpacity = line.create.strokeOpacity.value;

            figureLine.initialWidth = figureLine.clientWidth;
            figureLine.initialHeight = figureLine.clientHeight;

            figureLine.centerX = figureLine.initialWidth * 0.5;
            figureLine.centerY = figureLine.initialHeight * 0.5;

            figureLine.rotations.push({
                angle: 0,
                x: figureLine.centerX,
                y: figureLine.centerY
            })

            figureLine.enableScalePoints();
            figureLine.enableRotatePoints();

            figureLine.translate(figureLine.clientX - canvas.clientX, figureLine.clientY - canvas.clientY);

            figureLine.x1 -= figureLine.translateX;
            figureLine.y1 -= figureLine.translateY;
            figureLine.x2 -= figureLine.translateX;
            figureLine.y2 -= figureLine.translateY;

            figureLine.updateTransformation();

            canvas.svg.removeEventListener('mousemove', doLineDrawing);
            canvas.svg.removeEventListener('click', finishLineDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelLineDrawing);
            canvas.svg.removeEventListener('mouseleave', cancelLineDrawing);

            canvas.svg.addEventListener('click', Line.prepareLineDrawing);
        };

        const cancelLineDrawing = () => {
            figureLine.svg.remove();
            figureLine = null;

            canvas.svg.removeEventListener('mousemove', doLineDrawing);
            canvas.svg.removeEventListener('click', finishLineDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelLineDrawing);
            canvas.svg.removeEventListener('mouseleave', cancelLineDrawing);

            canvas.svg.addEventListener('click', Line.prepareLineDrawing);
        };

        canvas.svg.removeEventListener('click', Line.prepareLineDrawing);

        canvas.svg.addEventListener('mousemove', doLineDrawing);
        canvas.svg.addEventListener('click', finishLineDrawing);
        canvas.svg.addEventListener('contextmenu', cancelLineDrawing);
        canvas.svg.addEventListener('mouseleave', cancelLineDrawing);
    }

    addLineEditContent() {
        line.edit.content.classList.remove('disabled');
        toolbar.content = line.edit.content;
    }

    removeLineEditContent() {
        line.edit.content.classList.add('disabled');
        toolbar.content = null;
    }

    adjustLineEditContent() {
        line.edit.strokeWidth.value = this.strokeWidth;
        line.edit.strokeOpacity.value = this.strokeOpacity;
        line.edit.stroke.value = this.stroke;
    }

    set x1(value) { this.svg.setAttribute('x1', value); }
    set y1(value) { this.svg.setAttribute('y1', value); }
    set x2(value) { this.svg.setAttribute('x2', value); }
    set y2(value) { this.svg.setAttribute('y2', value); }

    set strokeWidth(value) { this.svg.setAttribute('stroke-width', value); }
    set strokeOpacity(value) { this.svg.setAttribute('stroke-opacity', value); }
    set stroke(value) { this.svg.setAttribute('stroke', value); }

    get x1() { return this.svg.getAttribute('x1'); }
    get y1() { return this.svg.getAttribute('y1'); }
    get x2() { return this.svg.getAttribute('x2'); }
    get y2() { return this.svg.getAttribute('y2'); }

    get strokeWidth()   { return this.svg.getAttribute('stroke-width'); }
    get strokeOpacity() { return this.svg.getAttribute('stroke-opacity'); }
    get stroke()        { return this.svg.getAttribute('stroke'); }
}

canvas.svg.addEventListener('click', Line.prepareLineDrawing);