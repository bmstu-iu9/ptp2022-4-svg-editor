class Line extends Figure {
    constructor(svg) {
        super(svg);
    }

    static prepareLineDrawing(event) {
        if (selectedTool != lineTool) {
            return;
        }

        const createSvgLine = () => {
            let svgLine = document.createElementNS(svgNS, 'line');

            svgLine.setAttribute('x1', event.offsetX);
            svgLine.setAttribute('y1', event.offsetY);
            svgLine.setAttribute('x2', event.offsetX);
            svgLine.setAttribute('y2', event.offsetY);

            svgLine.setAttribute('stroke-width', lineWidthValue);
            svgLine.setAttribute('stroke', selectedColor);
            svgLine.setAttribute('opacity', 0.5);

            return svgLine;
        };

        const line = new Line( createSvgLine() );
        svgPanel.append(line.svg);

        const doLineDrawing = (event) => {
            line.x2 = event.offsetX;
            line.y2 = event.offsetY;
        };

        const finishLineDrawing = (event) => {
            svgPanel.removeEventListener('mousemove', doLineDrawing);
            svgPanel.removeEventListener('mouseup', finishLineDrawing);
            svgPanel.removeEventListener('mouseleave', finishLineDrawing);

            line.opacity = 1;

            line.addLinePoint(line.x1, line.y1);
            line.addLinePoint(line.x2, line.y2);

            line.enableCenterLinePoint();

            line.enableHighlight();
        };

        svgPanel.addEventListener('mousemove', doLineDrawing);
        svgPanel.addEventListener('mouseup', finishLineDrawing);
        svgPanel.addEventListener('mouseleave', finishLineDrawing);
    }

    addLinePoint(cx, cy) {
        this.points.push( new LinePoint(this, cx, cy) );
    }

    enableCenterLinePoint() {
        let cx = 0;
        let cy = 0;

        this.points.forEach( (point) => {
            cx += point.cx;
            cy += point.cy;
        });

        cx /= this.points.length;
        cy /= this.points.length;

        this.centerPoint = new LinePoint(this, cx, cy);
    }

    set x1(value) { this.svg.setAttribute('x1', +value); }
    set y1(value) { this.svg.setAttribute('y1', +value); }
    set x2(value) { this.svg.setAttribute('x2', +value); }
    set y2(value) { this.svg.setAttribute('y2', +value); }

    set opacity(value) { this.svg.setAttribute('opacity', +value); }

    get x1() { return +this.svg.getAttribute('x1'); }
    get y1() { return +this.svg.getAttribute('y1'); }
    get x2() { return +this.svg.getAttribute('x2'); }
    get y2() { return +this.svg.getAttribute('y2'); }
}

svgPanel.addEventListener('mousedown', Line.prepareLineDrawing);