// SVG - базовый класс для всех svg-объектов

class SVG {
    constructor(svg) {
        this.svg = svg;

        this.translateX = 0;
        this.translateY = 0;

        this.scaleX = 1;
        this.scaleY = 1;

        this.rotations = [];
    }

    translate(x, y) {
        this.translateX = x;
        this.translateY = y;
    }

    scale(x, y) {
        this.scaleX = x;
        this.scaleY = y;
    }

    updateTransformation() {
        let transform = `translate(${this.translateX} ${this.translateY})\n`;
        this.rotations.forEach( (rotation) => {
            transform += `rotate(${rotation.angle} ${rotation.x} ${rotation.y})\n`;
        })
        transform += `scale(${this.scaleX} ${this.scaleY})`;

        this.transform = transform;
    }

    set rotateAngle(value) { this.rotations[this.rotations.length - 1].angle = value; }
    set rotateX(value) { this.rotations[this.rotations.length - 1].x = value; }
    set rotateY(value) { this.rotations[this.rotations.length - 1].y = value; }

    set transform(value) { this.svg.setAttribute('transform', value); }

    // Угол поворота rotateAngle в градусах вокруг точки (rotateX, rotateY) в актуальной системе координат
    get rotateAngle() { return this.rotations[this.rotations.length - 1].angle; }
    get rotateX() { return this.rotations[this.rotations.length - 1].x; }
    get rotateY() { return this.rotations[this.rotations.length - 1].y; }

    // Угол поворота относительно исходной системы координат originRotateAngle в градусах вокруг точки
    // (rotateX, rotateY) актуальной системы координат
    get originRotateAngle() {
        let originRotateAngle = 0;
        this.rotations.forEach( (rotation) => {
            originRotateAngle += rotation.angle;
        })
        return originRotateAngle;
    }

    get transform() { return this.svg.getAttribute('transform'); }

    get clientX() { return this.svg.getBoundingClientRect().x; }
    get clientY() { return this.svg.getBoundingClientRect().y; }
    get clientWidth() { return this.svg.getBoundingClientRect().width; }
    get clientHeight() { return this.svg.getBoundingClientRect().height; }
}