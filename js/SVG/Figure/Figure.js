// Figure - базовый класс для всех фигур.

class Figure extends SVG {
	static selected = null
	static transformed = null;

	// Смещение центра точек преобразований (объектов класса Point). Всегда вдвое меньше длины и ширины таких точек.
	static pointShift = 6;

	constructor(svg) {
		super(svg);

		this.initialWidth = null;
		this.initialHeight = null;

		this.centerX = null;
		this.centerY = null;

		this.scalePoints = [];
		this.rotatePoints = [];

		this.areScalePointsShowing = false;
		this.areRotatePointsShowing = false;
	}

	enableScalePoints() {
		const translateX = this.clientX - canvas.clientX - Figure.pointShift;
		const translateY = this.clientY - canvas.clientY - Figure.pointShift;

		this.topLeftScalePoint = new ScalePoint(
			this,
			0,
			0
		);
		this.topLeftScalePoint.translate(translateX, translateY);
		this.topLeftScalePoint.updateTransformation();
		this.scalePoints.push(this.topLeftScalePoint);

		this.topScalePoint = new ScalePoint(
			this,
			this.initialWidth * 0.5,
			0
		);
		this.topScalePoint.translate(translateX, translateY);
		this.topScalePoint.updateTransformation();
		this.scalePoints.push(this.topScalePoint);

		this.topRightScalePoint = new ScalePoint(
			this,
			this.initialWidth,
			0
		);
		this.topRightScalePoint.translate(translateX, translateY);
		this.topRightScalePoint.updateTransformation();
		this.scalePoints.push(this.topRightScalePoint);

		this.rightScalePoint = new ScalePoint(
			this,
			this.initialWidth,
			this.initialHeight * 0.5
		);
		this.rightScalePoint.translate(translateX, translateY);
		this.rightScalePoint.updateTransformation();
		this.scalePoints.push(this.rightScalePoint);

		this.bottomRightScalePoint = new ScalePoint(
			this,
			this.initialWidth,
			this.initialHeight
		);
		this.bottomRightScalePoint.translate(translateX, translateY);
		this.bottomRightScalePoint.updateTransformation();
		this.scalePoints.push(this.bottomRightScalePoint);

		this.bottomScalePoint = new ScalePoint(
			this,
			this.initialWidth * 0.5,
			this.initialHeight
		);
		this.bottomScalePoint.translate(translateX, translateY);
		this.bottomScalePoint.updateTransformation();
		this.scalePoints.push(this.bottomScalePoint);

		this.bottomLeftScalePoint = new ScalePoint(
			this,
			0,
			this.initialHeight
		);
		this.bottomLeftScalePoint.translate(translateX, translateY);
		this.bottomLeftScalePoint.updateTransformation();
		this.scalePoints.push(this.bottomLeftScalePoint);

		this.leftScalePoint = new ScalePoint(
			this,
			0,
			this.initialHeight * 0.5
		);
		this.leftScalePoint.translate(translateX, translateY);
		this.leftScalePoint.updateTransformation();
		this.scalePoints.push(this.leftScalePoint);
	}

	appendScalePoints() {
		this.scalePoints.forEach( (point) => {
			canvas.svg.append(point.svg);
		})
		this.areScalePointsShowing = true;
	}

	removeScalePoints() {
		this.scalePoints.forEach( (point) => {
			point.svg.remove();
		})
		this.areScalePointsShowing = false;
	}

	enableRotatePoints() {
		const translateX = this.clientX - canvas.clientX - Figure.pointShift;
		const translateY = this.clientY - canvas.clientY - Figure.pointShift;

		this.topLeftRotatePoint = new RotatePoint(
			this,
			0,
			0
		);
		this.topLeftRotatePoint.translate(translateX, translateY);
		this.topLeftRotatePoint.updateTransformation();
		this.rotatePoints.push(this.topLeftRotatePoint);

		this.topRotatePoint = new RotatePoint(
			this,
			this.initialWidth * 0.5,
			0
		);
		this.topRotatePoint.translate(translateX, translateY);
		this.topRotatePoint.updateTransformation();
		this.rotatePoints.push(this.topRotatePoint);

		this.topRightRotatePoint = new RotatePoint(
			this,
			this.initialWidth,
			0
		);
		this.topRightRotatePoint.translate(translateX, translateY);
		this.topRightRotatePoint.updateTransformation();
		this.rotatePoints.push(this.topRightRotatePoint);

		this.rightRotatePoint = new RotatePoint(
			this,
			this.initialWidth,
			this.initialHeight * 0.5
		);
		this.rightRotatePoint.translate(translateX, translateY);
		this.rightRotatePoint.updateTransformation();
		this.rotatePoints.push(this.rightRotatePoint);

		this.bottomRightRotatePoint = new RotatePoint(
			this,
			this.initialWidth,
			this.initialHeight
		);
		this.bottomRightRotatePoint.translate(translateX, translateY);
		this.bottomRightRotatePoint.updateTransformation();
		this.rotatePoints.push(this.bottomRightRotatePoint);

		this.bottomRotatePoint = new RotatePoint(
			this,
			this.initialWidth * 0.5,
			this.initialHeight
		);
		this.bottomRotatePoint.translate(translateX, translateY);
		this.bottomRotatePoint.updateTransformation();
		this.rotatePoints.push(this.bottomRotatePoint);

		this.bottomLeftRotatePoint = new RotatePoint(
			this,
			0,
			this.initialHeight
		);
		this.bottomLeftRotatePoint.translate(translateX, translateY);
		this.bottomLeftRotatePoint.updateTransformation();
		this.rotatePoints.push(this.bottomLeftRotatePoint);

		this.leftRotatePoint = new RotatePoint(
			this,
			0,
			this.initialHeight * 0.5
		);
		this.leftRotatePoint.translate(translateX, translateY);
		this.leftRotatePoint.updateTransformation();
		this.rotatePoints.push(this.leftRotatePoint);
	}

	appendRotatePoints() {
		this.rotatePoints.forEach( (point) => {
			canvas.svg.append(point.svg);
		})
		this.areRotatePointsShowing = true;
	}

	removeRotatePoints() {
		this.rotatePoints.forEach( (point) => {
			point.svg.remove();
		})
		this.areRotatePointsShowing = false;
	}

	// Включение режима преобразования
	addSelection() {
		this.appendScalePoints();
	}

	// Переключение уже активного режима преобразования
	adjustSelection() {
		if (this.areScalePointsShowing) {
			this.removeScalePoints();
			this.appendRotatePoints();
		} else if (this.areRotatePointsShowing) {
			this.removeRotatePoints();
			this.appendScalePoints();
		}
	}

    // Выключение режима преобразования
	removeSelection() {
		if (this.areScalePointsShowing) {
			this.removeScalePoints();
		} else if (this.areRotatePointsShowing) {
			this.removeRotatePoints();
		}
	}

	// TODO: красиво переписать этот метод
	enableFigureHandlers(addFigureEditContent, adjustFigureEditContent, removeFigureEditContent) {
		this.svg.addEventListener('mousedown', (event) => {
			if (!cursor.inputRadio.checked) {
				return;
			}

			let offsetX = event.offsetX;
			let offsetY = event.offsetY;

			let shiftX = null;
			let shiftY = null;

			const figureOnMouseMove = (event) => {
				if (Figure.selected) {
					if (Figure.selected !== this) {
						Figure.selected.removeSelection();
						this.addSelection();
						Figure.selected = this;
					}
				} else {
					this.addSelection();
					Figure.selected = this;
				}

				shiftX = event.offsetX - offsetX;
				shiftY = event.offsetY - offsetY;

				this.translate(this.translateX + shiftX, this.translateY + shiftY);
				this.updateTransformation();

				const updatePoint = (point) => {
					point.translate(point.translateX + shiftX, point.translateY + shiftY);
					point.updateTransformation();
				}

				this.scalePoints.forEach(updatePoint);
				this.rotatePoints.forEach(updatePoint);

				offsetX += shiftX;
				offsetY += shiftY;
			};

			// event.button === 2 - это ПКМ
			const figureOnMouseUp = () => {
				if (shiftX == null && shiftY == null) {
					if (Figure.selected) {
						if (Figure.selected === this) {
							if (event.button !== 2) {
								this.adjustSelection();
							} else {
								if (toolbar.content) {
									removeFigureEditContent();
								} else {
									addFigureEditContent();
								}
							}
						} else {
							Figure.selected.removeSelection();
							this.addSelection();
							Figure.selected = this;
							adjustFigureEditContent();
							if (event.button === 2 && !toolbar.content) {
								addFigureEditContent();
							}
						}
					} else {
						this.addSelection();
						Figure.selected = this;
						adjustFigureEditContent();
						if (event.button === 2) {
							addFigureEditContent();
						}
					}
				}

				canvas.svg.removeEventListener('mouseup', figureOnMouseUp);
				canvas.svg.removeEventListener('mouseleave', figureOnMouseUp);

				if (event.button !== 2) {
					canvas.svg.removeEventListener('mousemove', figureOnMouseMove);
				}
			}

			canvas.svg.addEventListener('mouseup', figureOnMouseUp);
			canvas.svg.addEventListener('mouseleave', figureOnMouseUp);

			if (event.button !== 2) {
				canvas.svg.addEventListener('mousemove', figureOnMouseMove);
			}
		});

		canvas.svg.addEventListener('mouseup', (event) => {
			if (cursor.inputRadio.checked && Figure.selected && Figure.selected === this &&
				event.target !== this.svg && !Figure.transformed) {

				this.removeSelection();
				Figure.selected = null;

				if (toolbar.content) {
					toolbar.content.classList.add('disabled');
					toolbar.content = null;
				}
			}
		});
	}
}