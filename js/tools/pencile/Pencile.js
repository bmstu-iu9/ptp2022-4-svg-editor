class Pencile extends Figure {

    constructor(svg) {
        super(svg);
        this.anchorDots = [];

        this.enablePencileMotion();
    }

    syncDots() {
        let points = "";
        this.anchorDots.forEach( (dot) => {
            points += `${dot.x},${dot.y} `;
        } );
        this.dots = points;
    }

    static preparePencileDrawing(event) {
        if (selectedTool != PENCILE) {
            return;
        }

        let pencile = new Pencile(
            createSvgPencile(pencileWidth, selectedColor, 0.5)
        );

        svgPanel.append(pencile.svg);

        const doPencileDrawing = (event) => {
            pencile.anchorDots.push({x: event.offsetX, y: event.offsetY});
            pencile.syncDots();
        }

        const cancelPencileDrawing = (event) => {
            pencile.svg.remove();
            pencile = null;

            svgPanel.removeEventListener('mousemove',   doPencileDrawing);
            svgPanel.removeEventListener('mouseup',     finishPencileDrawing);
            svgPanel.removeEventListener('contextmenu', cancelPencileDrawing);
            svgPanel.removeEventListener('mouseleave',  cancelPencileDrawing);

            event.preventDefault();
        }

        const finishPencileDrawing = (event) => {
            if (pencile.anchorDots == []) {
                cancelPencileDrawing(event);
                return;
            }

            pencile.opacity = 1;

            pencile.addPencilePoint(pencile.x,                 pencile.y);
            pencile.addPencilePoint(pencile.x + pencile.width, pencile.y);
            pencile.addPencilePoint(pencile.x + pencile.width, pencile.y + pencile.height);
            pencile.addPencilePoint(pencile.x,                 pencile.y + pencile.height);
                        
            pencile.enableHighlight();

            svgPanel.removeEventListener('mousemove',   doPencileDrawing);
            svgPanel.removeEventListener('mouseup',     finishPencileDrawing);
            svgPanel.removeEventListener('contextmenu', cancelPencileDrawing);
            svgPanel.removeEventListener('mouseleave',  cancelPencileDrawing);
        }

        svgPanel.addEventListener('mousemove',   doPencileDrawing);
        svgPanel.addEventListener('contextmenu', cancelPencileDrawing);
        svgPanel.addEventListener('mouseleave',  cancelPencileDrawing);
        svgPanel.addEventListener('mouseup',     finishPencileDrawing);
    }

    enablePencileMotion() {
        const preparePencileMotion = ( (event) => {
            if (selectedTool != CURSOR) {
                return;
            }

            isSomeFigureCaptured = true;

            let x1 = event.offsetX;
            let y1 = event.offsetY;

            const doPencileMotion = ( (event) => {
                let x2 = event.offsetX;
                let y2 = event.offsetY;
                const shiftX = x2 - x1;
                const shiftY = y2 - y1;

                this.anchorDots.forEach( (dot) => {
                    dot.x += shiftX;
                    dot.y += shiftY;
                });

                this.points.forEach( (point) => {
                    point.cx += shiftX;
                    point.cy += shiftY;
                });

                this.syncDots();

                x1 = x2;
                y1 = y2;

            } ).bind(this);

            const finishPencileMotion = ( (event) => {
                isSomeFigureCaptured = false;

                svgPanel.removeEventListener('mousemove',  doPencileMotion);
                svgPanel.removeEventListener('mouseup',    finishPencileMotion);
                svgPanel.removeEventListener('mouseleave', finishPencileMotion);
            } ).bind(this);

            svgPanel.addEventListener('mousemove',  doPencileMotion);
            svgPanel.addEventListener('mouseup',    finishPencileMotion);
            svgPanel.addEventListener('mouseleave', finishPencileMotion);

        } ).bind(this);

        this.svg.addEventListener('mousedown', preparePencileMotion);
    }

    addPencilePoint(cx, cy) {
        this.points.push( new PencilePoint(this, cx, cy) );
    }

    set dots(value)    { this.svg.setAttribute('points', value);  }
    set opacity(value) { this.svg.setAttribute('opacity', value); }

    get x()      { return Math.round(this.svg.getBoundingClientRect().left   - svgPanel.getBoundingClientRect().left); }
    get y()      { return Math.round(this.svg.getBoundingClientRect().top    - svgPanel.getBoundingClientRect().top);  }
    get width()  { return Math.round(this.svg.getBoundingClientRect().right  - this.svg.getBoundingClientRect().left); }
    get height() { return Math.round(this.svg.getBoundingClientRect().bottom - this.svg.getBoundingClientRect().top);  }
}

svgPanel.addEventListener('mousedown', Pencile.preparePencileDrawing);