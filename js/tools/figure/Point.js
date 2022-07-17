class Point {
	constructor(figure, cx, cy) {
		this.figure = figure;

		this.circle = (
			createSvgCircle(cx, cy, 4, 1, black, white, 1)
		);
		svgPanel.append(this.circle);

		this.enableHover();
	}

	enableHover() {
		const addHover = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.fill = lightBlue;

		} ).bind(this);

		const removeHover = ( () => {
			if (selectedTool != CURSOR) {
				return;
			}

			this.fill = white;

		} ).bind(this);

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