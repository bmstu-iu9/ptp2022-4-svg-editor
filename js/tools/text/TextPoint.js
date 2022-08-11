class TextPoint extends Point {

    constructor(figure, cx, cy) {
        super(figure, cx, cy);

        this.enableTextTransformation();
    }

    enableTextTransformation() {
        const prepareTextTransformation = ( (event) => {
            if (selectedTool != CURSOR) {
                return;
            }

            let x1, y1;
            let stablePoint;

            if (this.cx == this.figure.x && this.cy == this.figure.y) {
				x1 = this.figure.x + this.figure.width;
				y1 = this.figure.y + this.figure.height;
			} else if ((this.cx == this.figure.x + this.figure.width) && (this.cy == this.figure.y)) {
				x1 = this.figure.x;
				y1 = this.figure.y + this.figure.height;
			} else if ((this.cx == this.figure.x + this.figure.width) && (this.cy == this.figure.y + this.figure.height)) {
				x1 = this.figure.x;
				y1 = this.figure.y;
			} else if ((this.cx == this.figure.x) && (this.cy == this.figure.y + this.figure.height)) {
				x1 = this.figure.x + this.figure.width;
				y1 = this.figure.y;
			}

			this.figure.points.forEach((point) => {
				if (point.cx == x1 && point.cy == y1) {
					stablePoint = point;
				}
			});

            this.fill = blue;

            isSomeFigureCaptured = true;

            const doTextTransformation = ( (event) => {
                const coords = getMouseCoords(event);
				const x2 = coords.x;
				const y2 = coords.y;
				const shiftX = x2 - x1;
				const shiftY = y2 - y1;

                this.cx = x2;
                this.cy = y2;

                let pickPoint = 0;

				for (let i = 0; i < 4; i++) {
					if (this.figure.points[i] != stablePoint && this.figure.points[i] != this) {
						if (pickPoint == 0) {
							this.figure.points[i].cx = x1;
							this.figure.points[i].cy = this.cy;
							pickPoint = 1;
						} else {
							this.figure.points[i].cx = this.cx;
							this.figure.points[i].cy = y1;
							pickPoint = 0;
						}
					}
				}

                this.figure.x = Math.min(x2, x1);
                this.figure.y = Math.min(y2, y1);
                this.figure.width = Math.abs(x2 - x1);
                this.figure.height = Math.abs(y2 - y1);

            } ).bind(this);

            const finishTextTransformation = ( (event) => {
                this.fill = lightBlue;
                isSomeFigureCaptured = false;

                svgPanel.removeEventListener('mousemove',  doTextTransformation);
                svgPanel.removeEventListener('mouseup',    finishTextTransformation);
                svgPanel.removeEventListener('mouseleave', finishTextTransformation);
            } ).bind(this);

            svgPanel.addEventListener('mousemove',  doTextTransformation);
            svgPanel.addEventListener('mouseup',    finishTextTransformation);
            svgPanel.addEventListener('mouseleave', finishTextTransformation);

        } ).bind(this);

        this.circle.addEventListener('mousedown', prepareTextTransformation);
    }
}
