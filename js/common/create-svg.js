// TODO: написать функцию createSvg, в которую будут передаваться значения общих для 
// всех svg-фигур аттрибутов. Так во многом удастся избежать дублирования, наблюдаемого ниже,
// а уникальные аттрибуты svg-фигур будут устанавливаться "вручную".

const createSvgPath = (d, strokeWidth, stroke, fill, opacity) => {
    const svgPath = document.createElementNS(svgNS, 'path');

    svgPath.setAttribute('d', d);

    svgPath.setAttribute('stroke-width', strokeWidth);
    svgPath.setAttribute('stroke', stroke);
    svgPath.setAttribute('fill', fill);
    svgPath.setAttribute('opacity', opacity);

    return svgPath;
};

const createSvgLine = (x1, y1, x2, y2, strokeWidth, stroke, opacity) => {
    const svgLine = document.createElementNS(svgNS, 'line');

    svgLine.setAttribute('x1', x1);
    svgLine.setAttribute('y1', y1);
    svgLine.setAttribute('x2', x2);
    svgLine.setAttribute('y2', y2);

    svgLine.setAttribute('stroke-width', strokeWidth);
    svgLine.setAttribute('stroke', stroke);
    svgLine.setAttribute('opacity', opacity);

    return svgLine;
};

const createSvgPolyline = (points, strokeWidth, stroke, fill, opacity) => {
    const svgPolyline = document.createElementNS(svgNS, 'polyline');

    svgPolyline.setAttribute('points', points);
        
    svgPolyline.setAttribute('stroke-width', strokeWidth);
    svgPolyline.setAttribute('stroke', stroke);
    svgPolyline.setAttribute('fill', fill);
    svgPolyline.setAttribute('opacity', opacity);

    return svgPolyline;
};

const createSvgPolygon = (points, strokeWidth, stroke, fill, opacity) => {
    const svgPolygon = document.createElementNS(svgNS, 'polygon');

    svgPolygon.setAttribute('points', points);
        
    svgPolygon.setAttribute('stroke-width', strokeWidth);
    svgPolygon.setAttribute('stroke', stroke);
    svgPolygon.setAttribute('fill', fill);
    svgPolygon.setAttribute('opacity', opacity);

    return svgPolygon;
};

const createSvgRectangle = (x, y, width, height, strokeWidth, stroke, fill, opacity) => {
    const svgRectangle = document.createElementNS(svgNS, 'rect');

    svgRectangle.setAttribute('x', x);
    svgRectangle.setAttribute('y', y);

    svgRectangle.setAttribute('width', width);
    svgRectangle.setAttribute('height', height);

    svgRectangle.setAttribute('stroke-width', strokeWidth);
    svgRectangle.setAttribute('stroke', stroke);
    svgRectangle.setAttribute('fill', fill);
    svgRectangle.setAttribute('opacity', opacity);

    return svgRectangle;
}

const createSvgCircle = (cx, cy, r, strokeWidth, stroke, fill, opacity) => {
    const svgCircle = document.createElementNS(svgNS, 'circle');

    svgCircle.setAttribute('cx', cx);
    svgCircle.setAttribute('cy', cy);
    svgCircle.setAttribute('r', r);

    svgCircle.setAttribute('stroke-width', strokeWidth);
    svgCircle.setAttribute('stroke', stroke);
    svgCircle.setAttribute('fill', fill);
    svgCircle.setAttribute('opacity', opacity);

    return svgCircle;
};