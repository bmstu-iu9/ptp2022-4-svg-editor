class Pencil extends Figure {

    constructor(svg) {
        super(svg);
        this.anchorDots = [];

        this.enableFigureHandlers(
            this.addPencilEditContent, this.adjustPencilEditContent.bind(this), this.removePencilEditContent
        );
    }

    syncDots() {
        let points = "";
        this.anchorDots.forEach( (dot) => {
            points += `${dot.x},${dot.y} `;
        } );
        this.dots = points;
    }

    static preparePencilDrawing(event) {
        if (toolbar.item !== pencil) {
            return;
        }

        let figurePencil = new Pencil(
            createSvgPolyline("", pencil.create.strokeWidth.value, pencil.create.strokeOpacity.value,
                              pencil.create.stroke.value)
        );

        canvas.svg.append(figurePencil.svg);

        const doPencilDrawing = (event) => {
            figurePencil.anchorDots.push({x: event.offsetX, y: event.offsetY});
            figurePencil.syncDots();
        }

        const finishPencilDrawing = (event) => {
            figurePencil.initialWidth = figurePencil.clientWidth;
            figurePencil.initialHeight = figurePencil.clientHeight;

            figurePencil.centerX = figurePencil.initialWidth * 0.5;
            figurePencil.centerY = figurePencil.initialHeight * 0.5;

            figurePencil.rotations.push({
                angle: 0,
                x: figurePencil.centerX,
                y: figurePencil.centerY
            })

            figurePencil.enableScalePoints();
            figurePencil.enableRotatePoints();

            figurePencil.translate(figurePencil.clientX - canvas.clientX, 
                                    figurePencil.clientY - canvas.clientY);

            figurePencil.anchorDots.forEach((dot) => {
                dot.x -= figurePencil.translateX;
                dot.y -= figurePencil.translateY;
            });

            figurePencil.syncDots();

            figurePencil.updateTransformation();

            canvas.svg.removeEventListener('mousemove',   doPencilDrawing);
            canvas.svg.removeEventListener('mouseup',     finishPencilDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelPencilDrawing);
            canvas.svg.removeEventListener('mouseleave',  cancelPencilDrawing);
        }


        const cancelPencilDrawing = (event) => {
            figurePencil.svg.remove();
            figurePencil = null;

            canvas.svg.removeEventListener('mousemove',   doPencilDrawing);
            canvas.svg.removeEventListener('mouseup',     finishPencilDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelPencilDrawing);
            canvas.svg.removeEventListener('mouseleave',  cancelPencilDrawing);
        }

        canvas.svg.addEventListener('mousemove',   doPencilDrawing);
        canvas.svg.addEventListener('contextmenu', cancelPencilDrawing);
        canvas.svg.addEventListener('mouseleave',  cancelPencilDrawing);
        canvas.svg.addEventListener('mouseup',     finishPencilDrawing);
    }

    addPencilEditContent() {
        pencil.edit.content.classList.remove('disabled');
        toolbar.content = pencil.edit.content;
    }

    removePencilEditContent() {
        pencil.edit.content.classList.add('disabled');
        toolbar.content = null;
    }

    adjustPencilEditContent() {
        pencil.edit.strokeWidth.value = this.strokeWidth;
        pencil.edit.strokeOpacity.value = this.strokeOpacity;
        pencil.edit.stroke.value = this.stroke;
    }

    set dots(value) { this.svg.setAttribute('points', value);  }

    get strokeWidth()   { return this.svg.getAttribute('stroke-width'); }
    get strokeOpacity() { return this.svg.getAttribute('stroke-opacity'); }
    get stroke()        { return this.svg.getAttribute('stroke'); }
}

canvas.svg.addEventListener('mousedown', Pencil.preparePencilDrawing);