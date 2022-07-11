class Figure {
	constructor(svg) {
		this.svg = svg;
		this.pivotPoints = [];
		this.centerPivotPoint = null;

		this.isHighlighted = false;
	}

	addPivotPoint(cx, cy) {
		this.pivotPoints.push( new PivotPoint(cx, cy) );
	}

	addCenterPivotPoint() {
		let cx = 0;
		let cy = 0;

		this.pivotPoints.forEach( (point) => {
			cx += point.cx;
			cy += point.cy;
		});

		cx /= this.pivotPoints.length;
		cy /= this.pivotPoints.length;

		this.centerPivotPoint = new PivotPoint(cx, cy);
	}

	showPivotPoints() {
		this.pivotPoints.forEach( (point) => {
			svgPanel.append(point.circle);
		});
		svgPanel.append(this.centerPivotPoint.circle);
	}

	removePivotPoints() {
		this.pivotPoints.forEach( (point) => {
			point.circle.remove();
		});
		this.centerPivotPoint.circle.remove();
	}

	adjustHighlighting() {
		const setHighlight = ( () => {
			if (selectedTool != cursorTool || this.isHighlighted == true) {
				return;
			}
			this.showPivotPoints();
			this.isHighlighted = true;

		} ).bind(this);

		const removeHighlight = ( () => {
			if (selectedTool != cursorTool || this.isHighlighted == false) {
				return;
			}
			this.removePivotPoints();
			this.isHighlighted = false;
			
		} ).bind(this);

		this.svg.addEventListener('click', setHighlight);
		svgPanel.addEventListener('click', removeHighlight);

		this.svg.addEventListener('mouseover', () => {
			if (selectedTool != cursorTool || this.isHighlighted == true) {
				return;
			}
			svgPanel.removeEventListener('click', removeHighlight);
		});

		this.svg.addEventListener('mouseout', () => {
			if (selectedTool != cursorTool || this.isHighlighted == false) {
				return;
			}
			svgPanel.addEventListener('click', removeHighlight);
		});
	}
}