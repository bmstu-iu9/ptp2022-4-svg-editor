class Polyline extends Figure {
    constructor(svg) {
        super(svg);

        this.svgPoints = [];

        this.enableFigureHandlers(
            this.addPolylineEditContent, this.adjustPolylineEditContent.bind(this), this.removePolylineEditContent
        );
    }

    static preparePolylineDrawing(event) {
        if (toolbar.item !== curves || curvesCreateSubtool.item !== polyline) {
            return;
        }

        let previewLine = (
            createSvgLine(
                event.offsetX, event.offsetY, event.offsetX, event.offsetY,
                polyline.create.strokeWidth.value, polyline.create.strokeOpacity.value * 0.5,
                polyline.create.stroke.value
            )
        );

        canvas.svg.append(previewLine);

        const previewPolylineDrawing = (event) => {
            previewLine.setAttribute('x2', event.offsetX);
            previewLine.setAttribute('y2', event.offsetY);
        };

        const addFirstPolylineEdge = () => {
            const figurePolyline = new Polyline(
                createSvgPolyline(
                    '', polyline.create.strokeWidth.value, polyline.create.strokeOpacity.value,
                    polyline.create.stroke.value
                )
            );

            canvas.svg.append(figurePolyline.svg);

            figurePolyline.addSvgPoint(previewLine.getAttribute('x1'), previewLine.getAttribute('y1'));
            figurePolyline.addSvgPoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

            figurePolyline.updateSvgPoints();

            previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
            previewLine.setAttribute('y1', previewLine.getAttribute('y2'));

            const addPolylineEdge = () => {
                figurePolyline.addSvgPoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

                figurePolyline.updateSvgPoints();

                previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
                previewLine.setAttribute('y1', previewLine.getAttribute('y2'));
            };

            const finishPolylineDrawing = () => {
                previewLine.remove();
                previewLine = null;

                figurePolyline.initialWidth = figurePolyline.clientWidth;
                figurePolyline.initialHeight = figurePolyline.clientHeight;

                figurePolyline.centerX = figurePolyline.initialWidth * 0.5;
                figurePolyline.centerY = figurePolyline.initialHeight * 0.5;

                figurePolyline.rotations.push({
                    angle: 0,
                    x: figurePolyline.centerX,
                    y: figurePolyline.centerY
                })

                figurePolyline.enableScalePoints();
                figurePolyline.enableRotatePoints();

                figurePolyline.translate(figurePolyline.clientX - canvas.clientX, figurePolyline.clientY - canvas.clientY);

                figurePolyline.svgPoints.forEach( (point) => {
                    point.x -= figurePolyline.translateX;
                    point.y -= figurePolyline.translateY;
                })

                figurePolyline.updateSvgPoints();
                figurePolyline.updateTransformation();

                canvas.svg.removeEventListener('click', addPolylineEdge);
                canvas.svg.removeEventListener('mousemove', previewPolylineDrawing);
                canvas.svg.removeEventListener('contextmenu', finishPolylineDrawing);
                canvas.svg.removeEventListener('mouseleave', finishPolylineDrawing);

                canvas.svg.addEventListener('click', Polyline.preparePolylineDrawing);
            };

            canvas.svg.removeEventListener('click', addFirstPolylineEdge);
            canvas.svg.removeEventListener('contextmenu', cancelPolylineDrawing);
            canvas.svg.removeEventListener('mouseleave', cancelPolylineDrawing);

            canvas.svg.addEventListener('click', addPolylineEdge);
            canvas.svg.addEventListener('contextmenu', finishPolylineDrawing);
            canvas.svg.addEventListener('mouseleave', finishPolylineDrawing);
        }

        const cancelPolylineDrawing = () => {
            previewLine.remove();
            previewLine = null;

            canvas.svg.removeEventListener('click', addFirstPolylineEdge);
            canvas.svg.removeEventListener('mousemove', previewPolylineDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelPolylineDrawing);
            canvas.svg.removeEventListener('mouseleave', cancelPolylineDrawing);

            canvas.svg.addEventListener('click', Polyline.preparePolylineDrawing);
        };

        canvas.svg.removeEventListener('click', Polyline.preparePolylineDrawing);

        canvas.svg.addEventListener('mousemove', previewPolylineDrawing);
        canvas.svg.addEventListener('click', addFirstPolylineEdge);
        canvas.svg.addEventListener('contextmenu', cancelPolylineDrawing);
        canvas.svg.addEventListener('mouseleave', cancelPolylineDrawing);
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

    addPolylineEditContent() {
        polyline.edit.content.classList.remove('disabled');
        toolbar.content = polyline.edit.content;
    }

    removePolylineEditContent() {
        polyline.edit.content.classList.add('disabled');
        toolbar.content = null;
    }

    adjustPolylineEditContent() {
        polyline.edit.strokeWidth.value = this.strokeWidth;
        polyline.edit.strokeOpacity.value = this.strokeOpacity;
        polyline.edit.stroke.value = this.stroke;
    }

    set points(value) { this.svg.setAttribute('points', value); }

    set strokeWidth(value) { this.svg.setAttribute('stroke-width', value); }
    set strokeOpacity(value) { this.svg.setAttribute('stroke-opacity', value); }
    set stroke(value) { this.svg.setAttribute('stroke', value); }

    get points() { return this.svg.getAttribute('points'); }

    get strokeWidth()   { return this.svg.getAttribute('stroke-width'); }
    get strokeOpacity() { return this.svg.getAttribute('stroke-opacity'); }
    get stroke()        { return this.svg.getAttribute('stroke'); }
}

canvas.svg.addEventListener('click', Polyline.preparePolylineDrawing);