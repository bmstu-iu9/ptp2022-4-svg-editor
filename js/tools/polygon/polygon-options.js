polygonRange.addEventListener('mousedown', () => {
    const doPolygonWidthChange = () => {
        polygonWidth = polygonRange.value;
        polygonPreview.setAttribute('r', polygonWidth);
    };

    const finishPolygonWidthChange = () => {
        polygonRange.removeEventListener('mousemove', doPolygonWidthChange);
        polygonRange.removeEventListener('mouseup', finishPolygonWidthChange);
    }

    polygonRange.addEventListener('mousemove', doPolygonWidthChange);
    polygonRange.addEventListener('mouseup', finishPolygonWidthChange);
});