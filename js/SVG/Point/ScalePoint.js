// ScalePoint - класс точек масштабирования фигуры.

class ScalePoint extends Point{
    constructor(figure, x, y) {
        super(
            createSvgRect(x, y, 12, 12, 3, 1, darkBlue, 1, white),
            figure
        );

        this.initialX = x;
        this.initialY = y;

        this.enableScalePointHandlers();
    }

    enableScalePointHandlers() {
        this.svg.addEventListener('mousedown', () => {
            const originRotateAngleInRadians = this.figure.originRotateAngle * Math.PI / 180;

            const initialTranslate = {
                x: this.figure.translateX,
                y: this.figure.translateY
            }

            const initialScale = {
                x: this.figure.scaleX,
                y: this.figure.scaleY
            }

            const scaleCoefficient = (event) => {
                let translated = {
                    x: event.offsetX - initialTranslate.x,
                    y: event.offsetY - initialTranslate.y
                }

                this.figure.rotations.forEach( (rotation) => {
                    translated = rotate(- rotation.angle, translated.x, translated.y, rotation.x, rotation.y)
                })

                return {
                    x: translated.x / this.figure.initialWidth,
                    y: translated.y / this.figure.initialHeight
                };
            }

           if (this === this.figure.rightScalePoint) {
               const rightScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.scale(coefficient.x, initialScale.y);
                   this.figure.updateTransformation();

                   this.figure.scalePoints.forEach(Point.update);
                   this.figure.rotatePoints.forEach(Point.update);
               };

               const rightScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', rightScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', rightScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', rightScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', rightScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', rightScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', rightScalePointOnMouseUp);

           } else if (this === this.figure.bottomScalePoint) {
               const bottomScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.scale(initialScale.x, coefficient.y);
                   this.figure.updateTransformation();

                   this.figure.scalePoints.forEach(Point.update);
                   this.figure.rotatePoints.forEach(Point.update);
               };

               const bottomScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', bottomScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', bottomScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', bottomScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', bottomScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', bottomScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', bottomScalePointOnMouseUp);

           } else if (this === this.figure.bottomRightScalePoint) {
               const bottomRightScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.scale(coefficient.x, coefficient.y);
                   this.figure.updateTransformation();

                   this.figure.scalePoints.forEach(Point.update);
                   this.figure.rotatePoints.forEach(Point.update);
               };

               const bottomRightScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', bottomRightScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', bottomRightScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', bottomRightScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', bottomRightScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', bottomRightScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', bottomRightScalePointOnMouseUp);

           } else if (this === this.figure.leftScalePoint) {
               const leftScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.translate(
                       initialTranslate.x +
                       coefficient.x * Math.cos(originRotateAngleInRadians) * this.figure.initialWidth,
                       initialTranslate.y +
                       coefficient.x * Math.sin(originRotateAngleInRadians) * this.figure.initialWidth
                   );
                   this.figure.scale(
                       initialScale.x - coefficient.x,
                       initialScale.y
                   );
                   this.figure.updateTransformation();

                   const updatePoint = (point) => {
                       point.translate(
                           initialTranslate.x - Figure.pointShift +
                           coefficient.x * Math.cos(originRotateAngleInRadians) * this.figure.initialWidth,
                           initialTranslate.y - Figure.pointShift +
                           coefficient.x * Math.sin(originRotateAngleInRadians) * this.figure.initialWidth
                       );
                       point.updateTransformation();
                       Point.update(point);
                   };

                   this.figure.scalePoints.forEach(updatePoint);
                   this.figure.rotatePoints.forEach(updatePoint);
               };

               const leftScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', leftScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', leftScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', leftScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', leftScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', leftScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', leftScalePointOnMouseUp);

           } else if (this === this.figure.topScalePoint) {
               const topScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.translate(
                       initialTranslate.x -
                       coefficient.y * Math.sin(originRotateAngleInRadians) * this.figure.initialHeight,
                       initialTranslate.y +
                       coefficient.y * Math.cos(originRotateAngleInRadians) * this.figure.initialHeight
                   );
                   this.figure.scale(
                       initialScale.x,
                       initialScale.y - coefficient.y
                   );
                   this.figure.updateTransformation();

                   const updatePoint = (point) => {
                       point.translate(
                           initialTranslate.x - Figure.pointShift -
                           coefficient.y * Math.sin(originRotateAngleInRadians) * this.figure.initialHeight,
                           initialTranslate.y - Figure.pointShift +
                           coefficient.y * Math.cos(originRotateAngleInRadians) * this.figure.initialHeight
                       );
                       point.updateTransformation();
                       Point.update(point);
                   };

                   this.figure.scalePoints.forEach(updatePoint);
                   this.figure.rotatePoints.forEach(updatePoint);
               };

               const topScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', topScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', topScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', topScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', topScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', topScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', topScalePointOnMouseUp);

           } else if (this === this.figure.topLeftScalePoint) {
               const topLeftScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.translate(
                       initialTranslate.x +
                       coefficient.x * Math.cos(originRotateAngleInRadians) * this.figure.initialWidth -
                       coefficient.y * Math.sin(originRotateAngleInRadians) * this.figure.initialHeight,
                       initialTranslate.y +
                       coefficient.x * Math.sin(originRotateAngleInRadians) * this.figure.initialWidth +
                       coefficient.y * Math.cos(originRotateAngleInRadians) * this.figure.initialHeight
                   );
                   this.figure.scale(
                       initialScale.x - coefficient.x,
                       initialScale.y - coefficient.y
                   );
                   this.figure.updateTransformation();

                   const updatePoint = (point) => {
                       point.translate(
                           initialTranslate.x - Figure.pointShift +
                           coefficient.x * Math.cos(originRotateAngleInRadians) * this.figure.initialWidth -
                           coefficient.y * Math.sin(originRotateAngleInRadians) * this.figure.initialHeight,
                           initialTranslate.y - Figure.pointShift +
                           coefficient.x * Math.sin(originRotateAngleInRadians) * this.figure.initialWidth +
                           coefficient.y * Math.cos(originRotateAngleInRadians) * this.figure.initialHeight
                       );
                       point.updateTransformation();
                       Point.update(point);
                   };

                   this.figure.scalePoints.forEach(updatePoint);
                   this.figure.rotatePoints.forEach(updatePoint);
               };

               const topLeftScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', topLeftScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', topLeftScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', topLeftScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', topLeftScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', topLeftScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', topLeftScalePointOnMouseUp);

           } else if (this === this.figure.bottomLeftScalePoint) {
               const bottomLeftScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.translate(
                       initialTranslate.x +
                       coefficient.x * Math.cos(originRotateAngleInRadians) * this.figure.initialWidth,
                       initialTranslate.y +
                       coefficient.x * Math.sin(originRotateAngleInRadians) * this.figure.initialWidth
                   );
                   this.figure.scale(
                       initialScale.x - coefficient.x,
                       coefficient.y
                   );
                   this.figure.updateTransformation();

                   const updatePoint = (point) => {
                       point.translate(
                           initialTranslate.x - Figure.pointShift +
                           coefficient.x * Math.cos(originRotateAngleInRadians) * this.figure.initialWidth,
                           initialTranslate.y - Figure.pointShift +
                           coefficient.x * Math.sin(originRotateAngleInRadians) * this.figure.initialWidth
                       );
                       point.updateTransformation();
                       Point.update(point);
                   };

                   this.figure.scalePoints.forEach(updatePoint);
                   this.figure.rotatePoints.forEach(updatePoint);
               };

               const bottomLeftScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', bottomLeftScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', bottomLeftScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', bottomLeftScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', bottomLeftScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', bottomLeftScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', bottomLeftScalePointOnMouseUp);

           } else if (this === this.figure.topRightScalePoint) {
               const topRightScalePointOnMouseMove = (event) => {
                   const coefficient = scaleCoefficient(event);

                   this.figure.translate(
                       initialTranslate.x -
                       coefficient.y * Math.sin(originRotateAngleInRadians) * this.figure.initialHeight,
                       initialTranslate.y +
                       coefficient.y * Math.cos(originRotateAngleInRadians) * this.figure.initialHeight
                   );
                   this.figure.scale(
                       coefficient.x,
                       initialScale.y - coefficient.y
                   );
                   this.figure.updateTransformation();

                   const updatePoint = (point) => {
                       point.translate(
                           initialTranslate.x - Figure.pointShift -
                           coefficient.y * Math.sin(originRotateAngleInRadians) * this.figure.initialHeight,
                           initialTranslate.y - Figure.pointShift +
                           coefficient.y * Math.cos(originRotateAngleInRadians) * this.figure.initialHeight
                       );
                       point.updateTransformation();
                       Point.update(point);
                   };

                   this.figure.scalePoints.forEach(updatePoint);
                   this.figure.rotatePoints.forEach(updatePoint);
               };

               const topRightScalePointOnMouseUp = () => {
                   canvas.svg.removeEventListener('mousemove', topRightScalePointOnMouseMove);
                   canvas.svg.removeEventListener('mouseup', topRightScalePointOnMouseUp);
                   canvas.svg.removeEventListener('mouseleave', topRightScalePointOnMouseUp);
               };

               canvas.svg.addEventListener('mousemove', topRightScalePointOnMouseMove);
               canvas.svg.addEventListener('mouseup', topRightScalePointOnMouseUp);
               canvas.svg.addEventListener('mouseleave', topRightScalePointOnMouseUp);
           }
        });
    };
}