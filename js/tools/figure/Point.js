class Point {
	constructor(figure, cx, cy) {
		const createPoint = () => {
			let circle = document.createElementNS(svgNS, 'circle');

			circle.setAttribute('cx', cx);
			circle.setAttribute('cy', cy);
			circle.setAttribute('r', 4);

			circle.setAttribute('stroke', black);
			circle.setAttribute('stroke-width', 1);
			circle.setAttribute('fill', white);

			return circle;
		};

		this.figure = figure;
		this.circle = createPoint();
		this.enableHover();
	}

	enableHover() {
		const addHover = ( () => {
			if (selectedTool != cursorTool) {
				return;
			}
			this.fill = lightBlue;
		}).bind(this);

		const removeHover = ( () => {
			if (selectedTool != cursorTool) {
				return;
			}
			this.fill = white;
		}).bind(this);

		this.circle.addEventListener('mouseover', addHover);
		this.circle.addEventListener('mouseout', removeHover);

		const removeHoverHandlers = () => {
			this.circle.removeEventListener('mouseover', addHover);
			this.circle.removeEventListener('mouseout', removeHover);
		}

		const addHoverHandlers = () => {
			this.circle.addEventListener('mouseover', addHover);
			this.circle.addEventListener('mouseout', removeHover);
		}

		this.circle.addEventListener('mousedown', removeHoverHandlers);
		this.circle.addEventListener('mouseup', addHoverHandlers);
	}

    set cx(value) { this.circle.setAttribute('cx', value); }
    set cy(value) { this.circle.setAttribute('cy', value); }

    set fill(value) { this.circle.setAttribute('fill', value); }

    get cx() { return +this.circle.getAttribute('cx'); }
    get cy() { return +this.circle.getAttribute('cy'); }
}