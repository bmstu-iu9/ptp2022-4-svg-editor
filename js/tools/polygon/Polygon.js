class Polygon extends Figure {
    constructor(svg) {
        super(svg);

        this.enablePolygonMotion();
    }

    static preparePolygonDrawing(event) {
        if (selectedTool != POLYGON) {
            return;
        }

        const coords = getMouseCoords(event);

        let previewLine = (
            createSvgLine(coords.x, coords.y, coords.x, coords.y,
                          polygonWidth, lightBlue, 0.5)
        );

        svgPanel.append(previewLine);

        const previewLineDrawing = (event) => {
            const coords = getMouseCoords(event);
            previewLine.setAttribute('x2', coords.x);
            previewLine.setAttribute('y2', coords.y);
        };

        const addFirstPolygonEdge = () => {
            const polygon = new Polygon(
                createSvgPolygon('', polygonWidth, lightBlue, selectedColor, 1)
            );

            svgPanel.append(polygon.svg);

            polygon.addPolygonPoint(previewLine.getAttribute('x1'), previewLine.getAttribute('y1'));
            polygon.addPolygonPoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

            polygon.updateSvgPoints();

            previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
            previewLine.setAttribute('y1', previewLine.getAttribute('y2'));

            const addPolygonEdge = (event) => {
                if (event.target.tagName == 'circle') {
                    return;
                }

                polygon.addPolygonPoint(previewLine.getAttribute('x2'), previewLine.getAttribute('y2'));

                polygon.updateSvgPoints();

                previewLine.setAttribute('x1', previewLine.getAttribute('x2'));
                previewLine.setAttribute('y1', previewLine.getAttribute('y2'));
            };

            const finishPolygonDrawing = (event) => {
                previewLine.remove();
                previewLine = null;

                polygon.enableHighlight();

                svgPanel.removeEventListener('click', addPolygonEdge);
                svgPanel.removeEventListener('mousemove', previewLineDrawing);
                svgPanel.removeEventListener('contextmenu', finishPolygonDrawing);
                svgPanel.removeEventListener('mouseleave', finishPolygonDrawing);

                svgPanel.addEventListener('click', Polygon.preparePolygonDrawing);

                event.preventDefault();
            };

            svgPanel.removeEventListener('click', addFirstPolygonEdge);
            svgPanel.removeEventListener('contextmenu', cancelPolygonDrawing);
            svgPanel.removeEventListener('mouseleave', cancelPolygonDrawing);

            svgPanel.addEventListener('click', addPolygonEdge);
            svgPanel.addEventListener('contextmenu', finishPolygonDrawing);
            svgPanel.addEventListener('mouseleave', finishPolygonDrawing);
        }

        const cancelPolygonDrawing = (event) => {
            previewLine.remove();
            previewLine = null;

            svgPanel.removeEventListener('click', addFirstPolygonEdge);
            svgPanel.removeEventListener('mousemove', previewLineDrawing);
            svgPanel.removeEventListener('contextmenu', cancelPolygonDrawing);
            svgPanel.removeEventListener('mouseleave', cancelPolygonDrawing);

            svgPanel.addEventListener('click', Polygon.preparePolygonDrawing);

            event.preventDefault();
        };

        svgPanel.removeEventListener('click', Polygon.preparePolygonDrawing);

        svgPanel.addEventListener('mousemove', previewLineDrawing);
        svgPanel.addEventListener('click', addFirstPolygonEdge);
        svgPanel.addEventListener('contextmenu', cancelPolygonDrawing);
        svgPanel.addEventListener('mouseleave', cancelPolygonDrawing);
    }

    enablePolygonMotion() {
        const preparePolygonMotion = ( () => {
            if (selectedTool != CURSOR) {
                return;
            }

            isSomeFigureCaptured = true;

            const coords = getMouseCoords(event);

            let offsetX = coords.x;
            let offsetY = coords.y;

            const doPolygonMotion = ( (event) => {
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

            const finishPolygonMotion = ( () => {
                isSomeFigureCaptured = false;

                svgPanel.removeEventListener('mousemove', doPolygonMotion);
                svgPanel.removeEventListener('mouseup', finishPolygonMotion);
                svgPanel.removeEventListener('mouseleave', finishPolygonMotion);

            } ).bind(this);

            svgPanel.addEventListener('mousemove', doPolygonMotion);
            svgPanel.addEventListener('mouseup', finishPolygonMotion);
            svgPanel.addEventListener('mouseleave', finishPolygonMotion);

        } ).bind(this);

        this.svg.addEventListener('mousedown', preparePolygonMotion);
    }

    addPolygonPoint(cx, cy) {
        this.points.push( new PolygonPoint(this, cx, cy) );
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

svgPanel.addEventListener('click', Polygon.preparePolygonDrawing);
