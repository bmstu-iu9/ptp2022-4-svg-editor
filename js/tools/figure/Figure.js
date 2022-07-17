class Figure {
	constructor(svg) {
		this.svg = svg;
		this.points = [];

		this.enableCursorHover();
	}

    showPoints() {
        this.points.forEach( (point) => {
            svgPanel.append(point.circle);
        });
    }

    removePoints() {
        this.points.forEach( (point) => {
            point.circle.remove();
        });
    }

	enableHighlight() {
		selectedFigure = this;

		const addHighlight = ( () => {
			if (selectedTool != CURSOR || selectedFigure == this) {
				return;
			}

			if (selectedFigure != null) {
				selectedFigure.removePoints();
			}

			this.showPoints();
			selectedFigure = this;

		} ).bind(this);

		const removeHighlight = ( () => {
			if (isSomeFigureCaptured || selectedFigure != this) {
				return;
			}

			this.removePoints();
			selectedFigure = null;

		} ).bind(this);

		this.svg.addEventListener('mousedown', addHighlight);
		svgPanel.addEventListener('mousedown', removeHighlight);

		this.svg.addEventListener('mouseover', () => {
			if (selectedTool != CURSOR || selectedFigure == this) {
				return;
			}

			svgPanel.removeEventListener('mousedown', removeHighlight);
		});

		this.svg.addEventListener('mouseout', () => {
			if (selectedTool != CURSOR || selectedFigure != this) {
				return;
			}

			svgPanel.addEventListener('mousedown', removeHighlight);
		});
	}

	enableCursorHover() {
		const addHover = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.svg.style.cursor = 'move';

		} ).bind(this);

		const removeHover = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.svg.style.cursor = 'default';

		} ).bind(this);

		this.svg.addEventListener('mouseover', addHover);
		this.svg.addEventListener('mouseout', removeHover);

		this.svg.addEventListener('mousedown', () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.svg.removeEventListener('mouseover', addHover);
			this.svg.removeEventListener('mouseout', removeHover);

			svgPanel.style.cursor = 'move';
		});

		this.svg.addEventListener('mouseup', () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.svg.addEventListener('mouseover', addHover);
			this.svg.addEventListener('mouseout', removeHover);

			svgPanel.style.cursor = 'default';
		});
	}
}