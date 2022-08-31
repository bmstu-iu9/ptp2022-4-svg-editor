class Polygon extends Figure {
    constructor(svg) {
        super(svg);

        this.svgPoints = [];

        this.enableFigureHandlers(
            this.addPolygonEditContent, this.adjustPolygonEditContent.bind(this), this.removePolygonEditContent
        );
    }

    static preparePolygonDrawing(event) {
        if (toolbar.item !== shapes || shapesCreateSubtool.item !== polygon) {
            return;
        }

        let previewLine = (
            createSvgLine(
                event.offsetX, event.offsetY, event.offsetX, event.offsetY,
                polygon.create.strokeWidth.value, polygon.create.strokeOpacity.value * 0.5,
                polygon.create.stroke.value
            )
        );

        canvas.svg.append(previewLine);

        const previewPolygonDrawing = (event) => {
            previewLine.setAttribute('x2', event.offsetX);
            previewLine.setAttribute('y2', event.offsetY);
        };

        const addFirstPolygonEdge = () => {
            const figurePolygon = new Polygon(
                createSvgPolygon(
                    '', polygon.create.strokeWidth.value, polygon.create.strokeOpacity.value,
                    polygon.create.stroke.value, polygon.create.opacity.value, polygon.create.fill.value
                )
            );

            canvas.svg.append(figurePolygon.svg);

            figurePolygon.addSvgPoint(previewLine.getAttribute('x1'), previewLine.getAttribute('y1'));
            figurePolygon.addSvgPoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

            figurePolygon.updateSvgPoints();

            previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
            previewLine.setAttribute('y1', previewLine.getAttribute('y2'));

            const addPolygonEdge = () => {
                figurePolygon.addSvgPoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

                figurePolygon.updateSvgPoints();

                previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
                previewLine.setAttribute('y1', previewLine.getAttribute('y2'));
            };

            const finishPolygonDrawing = () => {
                previewLine.remove();
                previewLine = null;

                figurePolygon.initialWidth = figurePolygon.clientWidth;
                figurePolygon.initialHeight = figurePolygon.clientHeight;

                figurePolygon.centerX = figurePolygon.initialWidth * 0.5;
                figurePolygon.centerY = figurePolygon.initialHeight * 0.5;

                figurePolygon.rotations.push({
                    angle: 0,
                    x: figurePolygon.centerX,
                    y: figurePolygon.centerY
                })

                figurePolygon.enableScalePoints();
                figurePolygon.enableRotatePoints();

                figurePolygon.translate(figurePolygon.clientX - canvas.clientX, figurePolygon.clientY - canvas.clientY);

                figurePolygon.svgPoints.forEach( (point) => {
                    point.x -= figurePolygon.translateX;
                    point.y -= figurePolygon.translateY;
                })

                figurePolygon.updateSvgPoints();
                figurePolygon.updateTransformation();

                canvas.svg.removeEventListener('click', addPolygonEdge);
                canvas.svg.removeEventListener('mousemove', previewPolygonDrawing);
                canvas.svg.removeEventListener('contextmenu', finishPolygonDrawing);
                canvas.svg.removeEventListener('mouseleave', finishPolygonDrawing);

                canvas.svg.addEventListener('click', Polygon.preparePolygonDrawing);
            };

            canvas.svg.removeEventListener('click', addFirstPolygonEdge);
            canvas.svg.removeEventListener('contextmenu', cancelPolygonDrawing);
            canvas.svg.removeEventListener('mouseleave', cancelPolygonDrawing);

            canvas.svg.addEventListener('click', addPolygonEdge);
            canvas.svg.addEventListener('contextmenu', finishPolygonDrawing);
            canvas.svg.addEventListener('mouseleave', finishPolygonDrawing);
        }

        const cancelPolygonDrawing = () => {
            previewLine.remove();
            previewLine = null;

            canvas.svg.removeEventListener('click', addFirstPolygonEdge);
            canvas.svg.removeEventListener('mousemove', previewPolygonDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelPolygonDrawing);
            canvas.svg.removeEventListener('mouseleave', cancelPolygonDrawing);

            canvas.svg.addEventListener('click', Polygon.preparePolygonDrawing);
        };

        canvas.svg.removeEventListener('click', Polygon.preparePolygonDrawing);

        canvas.svg.addEventListener('mousemove', previewPolygonDrawing);
        canvas.svg.addEventListener('click', addFirstPolygonEdge);
        canvas.svg.addEventListener('contextmenu', cancelPolygonDrawing);
        canvas.svg.addEventListener('mouseleave', cancelPolygonDrawing);
    }

    addSvgPoint(x, y) {
        this.svgPoints.push({
            x: x,
            y: y
        })
    }

    updateSvgPoints() {
        let points = '';

        this.svgPoints.forEach( (point) => {
            points += `${point.x},${point.y}\n`;
        });

        this.points = points;
    }

    addPolygonEditContent() {
        polygon.edit.content.classList.remove('disabled');
        toolbar.content = polygon.edit.content;
    }

    removePolygonEditContent() {
        polygon.edit.content.classList.add('disabled');
        toolbar.content = null;
    }

    adjustPolygonEditContent() {
        polygon.edit.opacity.value = this.opacity;
        polygon.edit.fill.value = this.fill;
        polygon.edit.strokeWidth.value = this.strokeWidth;
        polygon.edit.strokeOpacity.value = this.strokeOpacity;
        polygon.edit.stroke.value = this.stroke;
    }

    set points(value) { this.svg.setAttribute('points', value); }

    set opacity(value)       { this.svg.setAttribute('opacity', value); }
    set fill(value)          { this.svg.setAttribute('fill', value); }
    set strokeWidth(value)   { this.svg.setAttribute('stroke-width', value); }
    set strokeOpacity(value) { this.svg.setAttribute('stroke-opacity', value); }
    set stroke(value)        { this.svg.setAttribute('stroke', value); }

    get points() { return this.svg.getAttribute('points'); }

    get opacity()       { return this.svg.getAttribute('opacity'); }
    get fill()          { return this.svg.getAttribute('fill'); }
    get strokeWidth()   { return this.svg.getAttribute('stroke-width'); }
    get strokeOpacity() { return this.svg.getAttribute('stroke-opacity'); }
    get stroke()        { return this.svg.getAttribute('stroke'); }
}

canvas.svg.addEventListener('click', Polygon.preparePolygonDrawing);