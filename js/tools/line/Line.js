class Line extends Figure {
    constructor(svg) {
        super(svg);

        this.enableLineMotion();
    }

    static prepareLineDrawing(event) {
        if (selectedTool != LINE) {
            return;
        }

        let line = new Line(
            createSvgLine(event.offsetX, event.offsetY, event.offsetX, event.offsetY, 
                          lineWidth, selectedColor, 0.5)
        );

        svgPanel.append(line.svg);

        const doLineDrawing = (event) => {
            line.x2 = event.offsetX;
            line.y2 = event.offsetY;
        };

        const finishLineDrawing = () => {
            line.opacity = 1;

            line.addLinePoint(line.x1, line.y1);
            line.addLinePoint(line.x2, line.y2);

            line.enableHighlight();

            svgPanel.removeEventListener('mousemove', doLineDrawing);
            svgPanel.removeEventListener('click', finishLineDrawing);
            svgPanel.removeEventListener('contextmenu', cancelLineDrawing);
            svgPanel.removeEventListener('mouseleave', cancelLineDrawing);

            svgPanel.addEventListener('click', Line.prepareLineDrawing);
        };

        const cancelLineDrawing = (event) => {
            line.svg.remove();
            line = null;

            svgPanel.removeEventListener('mousemove', doLineDrawing);
            svgPanel.removeEventListener('click', finishLineDrawing);
            svgPanel.removeEventListener('contextmenu', cancelLineDrawing);
            svgPanel.removeEventListener('mouseleave', cancelLineDrawing);

            svgPanel.addEventListener('click', Line.prepareLineDrawing);

            event.preventDefault();
        };

        svgPanel.removeEventListener('click', Line.prepareLineDrawing);

        svgPanel.addEventListener('mousemove', doLineDrawing);
        svgPanel.addEventListener('click', finishLineDrawing);
        svgPanel.addEventListener('contextmenu', cancelLineDrawing);
        svgPanel.addEventListener('mouseleave', cancelLineDrawing);
    }

    enableLineMotion() {
        const prepareLineMotion = ( (event) => {
            if (selectedTool != CURSOR) {
                return;
            }

            isSomeFigureCaptured = true;

            let offsetX = event.offsetX;
            let offsetY = event.offsetY;

            const doLineMotion = ( (event) => {
                const shiftX = event.offsetX - offsetX;
                const shiftY = event.offsetY - offsetY;

                this.points.forEach( (point) => {
                    point.cx += shiftX;
                    point.cy += shiftY;
                });

                this.x1 += shiftX;
                this.y1 += shiftY;
                this.x2 += shiftX;
                this.y2 += shiftY;

                offsetX += shiftX;
                offsetY += shiftY;

            } ).bind(this);

            const finishLineMotion = ( () => {
                isSomeFigureCaptured = false;

                svgPanel.removeEventListener('mousemove', doLineMotion);
                svgPanel.removeEventListener('mouseup', finishLineMotion);
                svgPanel.removeEventListener('mouseleave', finishLineMotion);

            } ).bind(this);

            svgPanel.addEventListener('mousemove', doLineMotion);
            svgPanel.addEventListener('mouseup', finishLineMotion);
            svgPanel.addEventListener('mouseleave', finishLineMotion);

        } ).bind(this);

        this.svg.addEventListener('mousedown', prepareLineMotion);
    }

    addLinePoint(cx, cy) {
        this.points.push( new LinePoint(this, cx, cy) );
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

svgPanel.addEventListener('click', Line.prepareLineDrawing);