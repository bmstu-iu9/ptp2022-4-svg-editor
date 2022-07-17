polylineRange.addEventListener('mousedown', () => {
    const doPolylineWidthChange = () => {
        polylineWidth = polylineRange.value;
        polylinePreview.setAttribute('r', polylineWidth);
    };

    const finishPolylineWidthChange = () => {
        polylineRange.removeEventListener('mousemove', doPolylineWidthChange);
        polylineRange.removeEventListener('mouseup', finishPolylineWidthChange);
    }

    polylineRange.addEventListener('mousemove', doPolylineWidthChange);
    polylineRange.addEventListener('mouseup', finishPolylineWidthChange);
});