lineWidthRange.onmousedown = function() {
    lineWidthRange.onmousemove = function() {
        lineWidthValue = lineWidthRange.value;
        lineWidthIllustration.setAttribute('r', lineWidthValue);
    };
};


class Line extends Figure {
    constructor(svg) {
        super(svg);
    }

    static draw(event) {
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

        const onMouseMove = (event) => {
            line.svg.setAttribute('x2', event.offsetX);
            line.svg.setAttribute('y2', event.offsetY);
        };

        const onMouseUp = (event) => {
            svgPanel.removeEventListener('mousemove', onMouseMove);
            svgPanel.removeEventListener('mouseup', onMouseUp);
            svgPanel.removeEventListener('mouseleave', onMouseUp);

            line.addPivotPoint(line.x1, line.y1);
            line.addPivotPoint(line.x2, line.y2);
    
            line.addCenterPivotPoint();

            line.svg.setAttribute('opacity', 1);
            line.adjustHighlighting();
        };

        svgPanel.addEventListener('mousemove', onMouseMove);
        svgPanel.addEventListener('mouseup', onMouseUp);
        svgPanel.addEventListener('mouseleave', onMouseUp);
    }

    set x1(value) { this.svg.setAttribute('x1', +value); }
    set y1(value) { this.svg.setAttribute('y1', +value); }
    set x2(value) { this.svg.setAttribute('x2', +value); }
    set y2(value) { this.svg.setAttribute('y2', +value); }

    get x1() { return +this.svg.getAttribute('x1'); }
    get y1() { return +this.svg.getAttribute('y1'); }
    get x2() { return +this.svg.getAttribute('x2'); }
    get y2() { return +this.svg.getAttribute('y2'); }
}

svgPanel.addEventListener('mousedown', Line.draw);