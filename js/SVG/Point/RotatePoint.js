// RotatePoint - класс точек поворота фигуры. Поворот происходит относительно центра фигуры.

class RotatePoint extends Point{
    constructor(figure, x, y) {
        super(
            createSvgRect(x, y, 12, 12, 3, 1, violet, 1, white),
            figure
        );

        this.initialX = x;
        this.initialY = y;

        this.enableRotatePointHandlers();
    }

    enableRotatePointHandlers() {
        this.svg.addEventListener('mousedown', () => {

            if (this.figure.scaleX * this.figure.centerX !== this.figure.rotateX ||
                this.figure.scaleY * this.figure.centerY !== this.figure.rotateY) {

                this.figure.rotations.push({
                    angle: 0,
                    x: this.figure.scaleX * this.figure.centerX,
                    y: this.figure.scaleY * this.figure.centerY
                })
            }

            const initialRotateAngle = this.figure.rotateAngle;

            const center = {
                x: this.figure.centerX * this.figure.scaleX,
                y: this.figure.centerY * this.figure.scaleY
            }

            for (let i = this.figure.rotations.length - 1; i >= 0; i--) {
                const rotated = rotate(
                    this.figure.rotations[i].angle, center.x, center.y, this.figure.rotations[i].x, this.figure.rotations[i].y
                );

                center.x = rotated.x;
                center.y = rotated.y;
            }

            const direction = {
                x: this.x - center.x,
                y: this.y - center.y,
            }
            direction.modulus = modulus(direction);

            const normal = {
                x: - this.y + center.y,
                y: this.x - center.x
            }

            const RotatePointOnMouseMove = (event) => {
                const translate = {
                    x: event.offsetX - this.figure.translateX,
                    y: event.offsetY - this.figure.translateY
                }

                const vector = {
                    x: translate.x - center.x,
                    y: translate.y - center.y,
                }
                vector.modulus = modulus(vector);

                const newRotateAngleInRadians = Math.sign(scalarProduct(normal, vector)) *
                    Math.acos(scalarProduct(direction, vector) / direction.modulus / vector.modulus);
                const newRotateAngle = newRotateAngleInRadians * 180 / Math.PI;

                this.figure.rotateAngle = initialRotateAngle + newRotateAngle;
                this.figure.updateTransformation();

                this.figure.rotatePoints.forEach(Point.update);
                this.figure.scalePoints.forEach(Point.update);
            }

            const RotatePointOnMouseUp = () => {
                canvas.svg.removeEventListener('mousemove', RotatePointOnMouseMove);
                canvas.svg.removeEventListener('mouseup', RotatePointOnMouseUp);
                canvas.svg.removeEventListener('mouseleave', RotatePointOnMouseUp);
            }

            canvas.svg.addEventListener('mousemove', RotatePointOnMouseMove);
            canvas.svg.addEventListener('mouseup', RotatePointOnMouseUp);
            canvas.svg.addEventListener('mouseleave', RotatePointOnMouseUp);
        })
    }
}