class PivotPoint {
	constructor(cx, cy) {
		const createPoint = () => {
			let circle = document.createElementNS(svgNS, 'circle');

			circle.setAttribute('cx', cx);
			circle.setAttribute('cy', cy);
			circle.setAttribute('r', 4);

			circle.setAttribute('stroke', '#000000');
			circle.setAttribute('stroke-width', 1);
			circle.setAttribute('fill', '#FFFFFF');

			return circle;
		};

		this.circle = createPoint();
	}

    set cx(value) { this.circle.setAttribute('cx', value); }
    set cy(value) { this.circle.setAttribute('cy', value); }

    get cx() { return +this.circle.getAttribute('cx'); }
    get cy() { return +this.circle.getAttribute('cy'); }
}