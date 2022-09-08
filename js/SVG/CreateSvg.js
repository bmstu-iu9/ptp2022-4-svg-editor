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
    svgPolyline.setAttribute('fill', 'none');
    svgPolyline.setAttribute('stroke-linecap', 'round');

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

const createSvgEllipse = (cx, cy, rx, ry, strokeWidth, strokeOpacity, stroke, opacity, fill) => {
    const svgEllipse = document.createElementNS(svgNS, 'ellipse');

    svgEllipse.setAttribute('stroke-width', strokeWidth);
    svgEllipse.setAttribute('stroke-opacity', strokeOpacity);
    svgEllipse.setAttribute('stroke', stroke);
    svgEllipse.setAttribute('opacity', opacity);
    svgEllipse.setAttribute('fill', fill);

    svgEllipse.setAttribute('cx', cx);
    svgEllipse.setAttribute('cy', cy);
    svgEllipse.setAttribute('rx', rx);
    svgEllipse.setAttribute('ry', ry);

    return svgEllipse;
}

const createSvgText = (x, y, fontSize, fontFamily, fontWeight, fontStyle, textDecoration, opacity, fill) => {
    const svgText = document.createElementNS(svgNS, 'text');

    svgText.setAttribute('x', x);
    svgText.setAttribute('y', y);

    svgText.setAttribute('font-size', fontSize);
    svgText.setAttribute('font-family', fontFamily);

    svgText.setAttribute('font-weight', fontWeight);
    svgText.setAttribute('font-style', fontStyle);
    svgText.setAttribute('text-decoration', textDecoration);

    svgText.setAttribute('opacity', opacity);
    svgText.setAttribute('fill', fill);

    svgText.innerHTML = "Щёлкните дважды курсором";

    return svgText;
}