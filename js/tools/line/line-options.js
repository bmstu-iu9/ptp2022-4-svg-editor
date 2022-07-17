lineRange.addEventListener('mousedown', () => {
    const doLineWidthChange = () => {
        lineWidth = lineRange.value;
        linePreview.setAttribute('r', lineWidth);
    };

    const finishLineWidthChange = () => {
        lineRange.removeEventListener('mousemove', doLineWidthChange);
        lineRange.removeEventListener('mouseup', finishLineWidthChange);
    }

    lineRange.addEventListener('mousemove', doLineWidthChange);
    lineRange.addEventListener('mouseup', finishLineWidthChange);
});