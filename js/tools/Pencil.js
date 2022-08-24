// Скоро здесь будет располагаться класс Pencile,
// поэтому имя файла начинается с большой буквы.

svgPanel.addEventListener('mousedown', (event) => {
    if (selectedTool != PENCILE) {
        return;
    }

    let d = `M ${event.offsetX} ${event.offsetY}`;
    const path = (
        createSvgPath(d, pencileWidth, selectedColor, 'none', 1)
    );

    svgPanel.append(path);

    const doPencileDrawing = (event) => {
        d += ` L ${event.offsetX} ${event.offsetY}`;
        path.setAttribute('d', d);
    };   

    const finishPencileDrawing = () => {
        svgPanel.removeEventListener('mousemove', doPencileDrawing);
        svgPanel.removeEventListener('mouseup', finishPencileDrawing);
        svgPanel.removeEventListener('mouseleave', finishPencileDrawing);
    };

    svgPanel.addEventListener('mousemove', doPencileDrawing);
    svgPanel.addEventListener('mouseup', finishPencileDrawing);
    svgPanel.addEventListener('mouseleave', finishPencileDrawing);
});