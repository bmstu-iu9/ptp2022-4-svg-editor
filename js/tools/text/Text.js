class Text extends Figure {

    constructor(svg) {
        super(svg);

        this.enableTextMotion();
    }

    static doTextDrawing(event) {
        if (selectedTool != TEXT) {
            return;
        }

        let rect = svgPanel.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let text = new Text(createSvgText(x, y));

        svgPanel.append(text.svg);

        text.addTextPoint(x, y);
        text.addTextPoint(x + 300, y);
        text.addTextPoint(x + 300, y + 200);
        text.addTextPoint(x, y + 200);
        text.enableHighlight();
    }

    enableTextMotion() {
        const prepareTextMotion = ( (event) => {
            if (selectedTool != CURSOR) {
                return;
            }

            isSomeFigureCaptured = true;

            let rect = svgPanel.getBoundingClientRect();

            let x1 = event.clientX - rect.left;
            let y1 = event.clientY - rect.top;

            const doTextMotion = ( (event) => {
                let rect = svgPanel.getBoundingClientRect();

                let x2 = event.clientX - rect.left;
                let y2 = event.clientY - rect.top;

                const shiftX = x2 - x1;
                const shiftY = y2 - y1;

                this.x += shiftX;
                this.y += shiftY;

                this.points.forEach( (point) => {
                    point.cx += shiftX;
                    point.cy += shiftY;
                });

                x1 = x2;
                y1 = y2;

            } ).bind(this);

            const finishTextMotion = ( (event) => {
                isSomeFigureCaptured = false;
                svgPanel.removeEventListener('mousemove',  doTextMotion);
                svgPanel.removeEventListener('mouseup',    finishTextMotion);
                svgPanel.removeEventListener('mouseleave', finishTextMotion);
            } ).bind(this);

            svgPanel.addEventListener('mousemove',  doTextMotion);
            svgPanel.addEventListener('mouseup',    finishTextMotion);
            svgPanel.addEventListener('mouseleave', finishTextMotion);

        } ).bind(this);

        this.svg.addEventListener('mousedown', prepareTextMotion);
    }

    addTextPoint(cx, cy) {
        this.points.push(new TextPoint(this, cx, cy))
    }

    get x() { return +this.svg.getAttribute('x'); }
    get y() { return +this.svg.getAttribute('y'); }
    get width() { return +this.svg.getAttribute('width'); }
    get height() { return +this.svg.getAttribute('height'); }

    set x(value) { this.svg.setAttribute('x', +value); }
    set y(value) { this.svg.setAttribute('y', +value); }
    set width(value) { this.svg.setAttribute('width', +value); }
    set height(value) { this.svg.setAttribute('height', +value); }
}

svgPanel.addEventListener('click', Text.doTextDrawing);
