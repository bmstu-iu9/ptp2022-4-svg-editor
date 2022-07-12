class Figure {
	constructor(svg) {
		this.svg = svg;
		this.points = [];
		this.centerPoint = null;

		this.isHighlighted = false;
	}

    showPoints() {
        this.points.forEach( (point) => {
            svgPanel.append(point.circle);
        });
        svgPanel.append(this.centerPoint.circle);
    }

    removePoints() {
        this.points.forEach( (point) => {
            point.circle.remove();
        });
        this.centerPoint.circle.remove();
    }

	enableHighlight() {
		this.showPoints();
		this.isHighlighted = true;

		const addHighlight = ( () => {
			if (selectedTool != cursorTool || this.isHighlighted == true) {
				return;
			}
			this.showPoints();
			this.isHighlighted = true;
		} ).bind(this);

		const removeHighlight = ( () => {
			if (this.isHighlighted == false || selectedPoint != null) {
				return;
			}
			this.removePoints();
			this.isHighlighted = false;
		} ).bind(this);

		this.svg.addEventListener('mousedown', addHighlight);
		svgPanel.addEventListener('mousedown', removeHighlight);

		this.svg.addEventListener('mouseover', () => {
			if (selectedTool != cursorTool || this.isHighlighted == true) {
				return;
			}
			svgPanel.removeEventListener('mousedown', removeHighlight);
		});

		this.svg.addEventListener('mouseout', () => {
			if (selectedTool != cursorTool || this.isHighlighted == false) {
				return;
			}
			svgPanel.addEventListener('mousedown', removeHighlight);
		});
	}
}