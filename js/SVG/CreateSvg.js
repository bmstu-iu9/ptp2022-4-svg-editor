// В CreateSvg.js находятся функции для создания svg-объектов.

const svgNS = "http://www.w3.org/2000/svg";

const createSvgLine = (x1, y1, x2, y2, strokeWidth, strokeOpacity, stroke) => {
    const svgLine = document.createElementNS(svgNS, 'line');

    svgLine.setAttribute('stroke-width', strokeWidth);
    svgLine.setAttribute('stroke-opacity', strokeOpacity);
    svgLine.setAttribute('stroke', stroke);
    svgLine.setAttribute('stroke-linecap', 'round');

    svgLine.setAttribute('x1', x1);
    svgLine.setAttribute('y1', y1);
    svgLine.setAttribute('x2', x2);
    svgLine.setAttribute('y2', y2);

    return svgLine;
};

const createSvgPolyline = (points, strokeWidth, strokeOpacity, stroke) => {
    const svgPolyline = document.createElementNS(svgNS, 'polyline');

    svgPolyline.setAttribute('stroke-width', strokeWidth);
    svgPolyline.setAttribute('stroke-opacity', strokeOpacity);
    svgPolyline.setAttribute('stroke', stroke);

    svgPolyline.setAttribute('points', points);

    return svgPolyline;
};

const createSvgPolygon = (points, strokeWidth, strokeOpacity, stroke, opacity, fill) => {
    const svgPolygon = document.createElementNS(svgNS, 'polygon');

    svgPolygon.setAttribute('stroke-width', strokeWidth);
    svgPolygon.setAttribute('stroke-opacity', strokeOpacity);
    svgPolygon.setAttribute('stroke', stroke);
    svgPolygon.setAttribute('opacity', opacity);
    svgPolygon.setAttribute('fill', fill);

    svgPolygon.setAttribute('points', points);

    return svgPolygon;
};

const createSvgRect = (x, y, width, height, strokeWidth, strokeOpacity, stroke, opacity, fill) => {
    const svgRect = document.createElementNS(svgNS, 'rect');

    svgRect.setAttribute('stroke-width', strokeWidth);
    svgRect.setAttribute('stroke-opacity', strokeOpacity);
    svgRect.setAttribute('stroke', stroke);
    svgRect.setAttribute('opacity', opacity);
    svgRect.setAttribute('fill', fill);

    svgRect.setAttribute('x', x);
    svgRect.setAttribute('y', y);
    svgRect.setAttribute('width', width);
    svgRect.setAttribute('height', height);

    return svgRect;
};


const createSvgCircle = (cx, cy, r, strokeWidth, strokeOpacity, stroke, opacity, fill) => {
    const svgCircle = document.createElementNS(svgNS, 'circle');

    svgCircle.setAttribute('stroke-width', strokeWidth);
    svgCircle.setAttribute('stroke-opacity', strokeOpacity);
    svgCircle.setAttribute('stroke', stroke);
    svgCircle.setAttribute('opacity', opacity);
    svgCircle.setAttribute('fill', fill);

    svgCircle.setAttribute('cx', cx);
    svgCircle.setAttribute('cy', cy);
    svgCircle.setAttribute('r', r);

    return svgCircle;
};