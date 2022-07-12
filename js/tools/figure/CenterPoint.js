class CenterPoint extends Point {
	constructor(figure) {
		let cx = 0;
		let cy = 0;

		const calculateCenterOfFigure = () => {
			figure.points.forEach( (point) => {
				cx += point.cx;
				cy += point.cy;
			});

			cx /= figure.points.length;
			cy /= figure.points.length;
		};

		calculateCenterOfFigure();
		super(figure, cx, cy);
	}
}