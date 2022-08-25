class Pencil extends Figure {

    constructor(svg) {
        super(svg);
        this.anchorDots = [];

        this.enableFigureHandlers(
            this.addPencileEditContent, this.adjustPencileEditContent.bind(this), this.removePencileEditContent
        );
    }

    syncDots() {
        let points = "";
        this.anchorDots.forEach( (dot) => {
            points += `${dot.x},${dot.y} `;
        } );
        this.dots = points;
    }

    static preparePencileDrawing(event) {
        if (toolbar.item !== pencil) {
            return;
        }

        let figurePencile = new Pencil(
            createSvgPolyline("", pencil.create.strokeWidth.value, pencil.create.strokeOpacity.value,
                              pencil.create.stroke.value)
        );

        canvas.svg.append(figurePencile.svg);

        const doPencileDrawing = (event) => {
            figurePencile.anchorDots.push({x: event.offsetX, y: event.offsetY});
            figurePencile.syncDots();
        }

        const finishPencileDrawing = (event) => {
            figurePencile.initialWidth = figurePencile.clientWidth;
            figurePencile.initialHeight = figurePencile.clientHeight;

            figurePencile.centerX = figurePencile.initialWidth * 0.5;
            figurePencile.centerY = figurePencile.initialHeight * 0.5;

            figurePencile.rotations.push({
                angle: 0,
                x: figurePencile.centerX,
                y: figurePencile.centerY
            })

            figurePencile.enableScalePoints();
            figurePencile.enableRotatePoints();

            figurePencile.translate(figurePencile.clientX - canvas.clientX, 
                                    figurePencile.clientY - canvas.clientY);

            figurePencile.anchorDots.forEach((dot) => {
                dot.x -= figurePencile.translateX;
                dot.y -= figurePencile.translateY;
            });

            figurePencile.syncDots();

            figurePencile.updateTransformation();

            canvas.svg.removeEventListener('mousemove',   doPencileDrawing);
            canvas.svg.removeEventListener('mouseup',     finishPencileDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelPencileDrawing);
            canvas.svg.removeEventListener('mouseleave',  cancelPencileDrawing);
        }


        const cancelPencileDrawing = (event) => {
            figurePencile.svg.remove();
            figurePencile = null;

            canvas.svg.removeEventListener('mousemove',   doPencileDrawing);
            canvas.svg.removeEventListener('mouseup',     finishPencileDrawing);
            canvas.svg.removeEventListener('contextmenu', cancelPencileDrawing);
            canvas.svg.removeEventListener('mouseleave',  cancelPencileDrawing);
        }

        canvas.svg.addEventListener('mousemove',   doPencileDrawing);
        canvas.svg.addEventListener('contextmenu', cancelPencileDrawing);
        canvas.svg.addEventListener('mouseleave',  cancelPencileDrawing);
        canvas.svg.addEventListener('mouseup',     finishPencileDrawing);
    }

    addPencileEditContent() {
        pencil.edit.content.classList.remove('disabled');
        toolbar.content = pencil.edit.content;
    }

    removePencileEditContent() {
        pencil.edit.content.classList.add('disabled');
        toolbar.content = null;
    }

    adjustPencileEditContent() {
        pencil.edit.strokeWidth.value = this.strokeWidth;
        pencil.edit.strokeOpacity.value = this.strokeOpacity;
        pencil.edit.stroke.value = this.stroke;
    }

    set dots(value) { this.svg.setAttribute('points', value);  }
}

canvas.svg.addEventListener('mousedown', Pencil.preparePencileDrawing);