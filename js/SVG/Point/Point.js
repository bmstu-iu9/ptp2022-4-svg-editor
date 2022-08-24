// Point - базовый класс для всех точек преобразований.

class Point extends SVG {
	constructor(svg, figure) {
		super(svg);
		this.figure = figure;

		this.enablePointHandlers();
	}

	enablePointHandlers() {
		const pointOnMouseEnter = () => {
			this.svg.setAttribute('fill', lightGray);
		}

		const pointOnMouseLeave = () => {
			this.svg.setAttribute('fill', white);
		}

		const pointOnMouseUp = () => {
			Figure.transformed = null;

			this.svg.setAttribute('fill', white);

			this.svg.addEventListener('mouseenter', pointOnMouseEnter);
			this.svg.addEventListener('mouseleave', pointOnMouseLeave);

			canvas.svg.removeEventListener('mouseup', pointOnMouseUp);
		}

		this.svg.addEventListener('mouseenter', pointOnMouseEnter);
		this.svg.addEventListener('mouseleave', pointOnMouseLeave);

		this.svg.addEventListener('mousedown', () => {
			Figure.transformed = this.figure;

			this.svg.setAttribute('fill', gray);

			this.svg.removeEventListener('mouseenter', pointOnMouseEnter);
			this.svg.removeEventListener('mouseleave', pointOnMouseLeave);

			canvas.svg.addEventListener('mouseup', pointOnMouseUp);
		});
	}

	// Обновление координат точки в соответствие с актуальным преобразованием связанной фигуры.
	static update(point) {
		let x = point.initialX * point.figure.scaleX;
		let y = point.initialY * point.figure.scaleY;

		for (let i = point.figure.rotations.length - 1; i >= 0; i--) {
			const rotated = rotate(point.figure.rotations[i].angle, x, y, point.figure.rotations[i].x, point.figure.rotations[i].y);

			x = rotated.x;
			y = rotated.y;
		}

		point.x = x;
		point.y = y;
	}

	get x() { return +this.svg.getAttribute('x'); }
	get y() { return +this.svg.getAttribute('y'); }

	set x(value) { this.svg.setAttribute('x', value); }
	set y(value) { this.svg.setAttribute('y', value); }
}