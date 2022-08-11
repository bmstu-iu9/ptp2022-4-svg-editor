class Polyline extends Figure {
    constructor(svg) {
        super(svg);

        this.enablePolylineMotion();
    }

    static preparePolylineDrawing(event) {
        if (selectedTool != POLYLINE) {
            return;
        }

        const coords = getMouseCoords(event);

        let previewLine = (
            createSvgLine(coords.x, coords.y, coords.x, coords.y,
                          polylineWidth, selectedColor, 0.5)
        );

        svgPanel.append(previewLine);

        const previewLineDrawing = (event) => {
            const coords = getMouseCoords(event);
            previewLine.setAttribute('x2', coords.x);
            previewLine.setAttribute('y2', coords.y);
        };

        const addFirstPolylineEdge = () => {
            const polyline = new Polyline(
                createSvgPolyline('', polylineWidth, selectedColor, 'none', 1)
            );

            svgPanel.append(polyline.svg);

            polyline.addPolylinePoint(previewLine.getAttribute('x1'), previewLine.getAttribute('y1'));
            polyline.addPolylinePoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

            polyline.updateSvgPoints();

            previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
            previewLine.setAttribute('y1', previewLine.getAttribute('y2'));

            const addPolylineEdge = (event) => {
                if (event.target.tagName == 'circle') {
                    return;
                }

                polyline.addPolylinePoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

                polyline.updateSvgPoints();

                previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
                previewLine.setAttribute('y1', previewLine.getAttribute('y2'));
            };

            const finishPolylineDrawing = (event) => {
                previewLine.remove();
                previewLine = null;

                polyline.enableHighlight();

                svgPanel.removeEventListener('click', addPolylineEdge);
                svgPanel.removeEventListener('mousemove', previewLineDrawing);
                svgPanel.removeEventListener('contextmenu', finishPolylineDrawing);
                svgPanel.removeEventListener('mouseleave', finishPolylineDrawing);

                svgPanel.addEventListener('click', Polyline.preparePolylineDrawing);

                event.preventDefault();
            };

            svgPanel.removeEventListener('click', addFirstPolylineEdge);
            svgPanel.removeEventListener('contextmenu', cancelPolylineDrawing);
            svgPanel.removeEventListener('mouseleave', cancelPolylineDrawing);

            svgPanel.addEventListener('click', addPolylineEdge);
            svgPanel.addEventListener('contextmenu', finishPolylineDrawing);
            svgPanel.addEventListener('mouseleave', finishPolylineDrawing);
        }

        const cancelPolylineDrawing = (event) => {
            previewLine.remove();
            previewLine = null;

            svgPanel.removeEventListener('click', addFirstPolylineEdge);
            svgPanel.removeEventListener('mousemove', previewLineDrawing);
            svgPanel.removeEventListener('contextmenu', cancelPolylineDrawing);
            svgPanel.removeEventListener('mouseleave', cancelPolylineDrawing);

            svgPanel.addEventListener('click', Polyline.preparePolylineDrawing);

            event.preventDefault();
        };

        svgPanel.removeEventListener('click', Polyline.preparePolylineDrawing);

        svgPanel.addEventListener('mousemove', previewLineDrawing);
        svgPanel.addEventListener('click', addFirstPolylineEdge);
        svgPanel.addEventListener('contextmenu', cancelPolylineDrawing);
        svgPanel.addEventListener('mouseleave', cancelPolylineDrawing);
    }

    enablePolylineMotion() {
        const preparePolylineMotion = ( () => {
            if (selectedTool != CURSOR) {
                return;
            }

            isSomeFigureCaptured = true;

            const coords = getMouseCoords(event);

            let offsetX = coords.x;
            let offsetY = coords.y;

            const doPolylineMotion = ( (event) => {
                const coords = getMouseCoords(event);
                const shiftX = coords.x - offsetX;
                const shiftY = coords.y - offsetY;

                this.points.forEach( (point) => {
                    point.cx += shiftX;
                    point.cy += shiftY;
                } );

                this.updateSvgPoints();

                offsetX += shiftX;
                offsetY += shiftY;

            } ).bind(this);

            const finishPolylineMotion = ( () => {
                isSomeFigureCaptured = false;

                svgPanel.removeEventListener('mousemove', doPolylineMotion);
                svgPanel.removeEventListener('mouseup', finishPolylineMotion);
                svgPanel.removeEventListener('mouseleave', finishPolylineMotion);

            } ).bind(this);

            svgPanel.addEventListener('mousemove', doPolylineMotion);
            svgPanel.addEventListener('mouseup', finishPolylineMotion);
            svgPanel.addEventListener('mouseleave', finishPolylineMotion);

        } ).bind(this);

        this.svg.addEventListener('mousedown', preparePolylineMotion);
    }

    addPolylinePoint(cx, cy) {
        this.points.push( new PolylinePoint(this, cx, cy) );
    }

    updateSvgPoints() {
        let newPoints = '';

        this.points.forEach( (point) => {
            newPoints += point.cx;
            newPoints += ',';
            newPoints += point.cy;
            newPoints += ' ';
        });

        this.svg.setAttribute('points', newPoints);
    }
}

svgPanel.addEventListener('click', Polyline.preparePolylineDrawing);
