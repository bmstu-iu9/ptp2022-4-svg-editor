pencileRange.addEventListener('mousedown', () => {
    const doPencileWidthChange = () => {
        pencileWidth = pencileRange.value;
        pencilePreview.setAttribute('r', pencileWidth);
    };

    const finishPencileWidthChange = () => {
        pencileRange.removeEventListener('mousemove', doPencileWidthChange);
        pencileRange.removeEventListener('mouseup', finishPencileWidthChange);
    }

    pencileRange.addEventListener('mousemove', doPencileWidthChange);
    pencileRange.addEventListener('mouseup', finishPencileWidthChange);
});