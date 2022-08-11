// TODO: реализовать класс Tool, экземплярами которого будут являться наблюдаемые ниже
// инструменты. В дальнейшем это поможет с систематизацей и сократит дублирование кода.

const hideAllInfoPanels = () => {
    pencileOptions.classList.add('hidden');
    lineOptions.classList.add('hidden');
    polylineOptions.classList.add('hidden');
    polygonOptions.classList.add('hidden');
    eraserOptions.classList.add('hidden');
    paletteOptions.classList.add('hidden');
    textOptions.classList.add('hidden');
};


CURSOR.addEventListener('click', () => {
    toolOptionsStatus = null;
    hideAllInfoPanels();
    selectedTool = CURSOR;
});

HAND.addEventListener('click', () => {
    toolOptionsStatus = null;
    hideAllInfoPanels();
    selectedTool = HAND;
});

PENCILE.addEventListener('click', () => {
    if (toolOptionsStatus == PENCILE) {
        toolOptionsStatus = null;
        pencileOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        pencileOptions.classList.remove('hidden');
        toolOptionsStatus = PENCILE;
        selectedTool = PENCILE;
    }
});

LINE.addEventListener('click', () => {
    if (toolOptionsStatus == LINE) {
        toolOptionsStatus = null;
        lineOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        lineOptions.classList.remove('hidden');
        toolOptionsStatus = LINE;
        selectedTool = LINE;
    }
});

POLYLINE.addEventListener('click', () => {
    if (toolOptionsStatus == POLYLINE) {
        toolOptionsStatus = null;
        polylineOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        polylineOptions.classList.remove('hidden');
        toolOptionsStatus = POLYLINE;
        selectedTool = POLYLINE;
    }
});

POLYGON.addEventListener('click', () => {
    if (toolOptionsStatus == POLYGON) {
        toolOptionsStatus = null;
        polygonOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        polygonOptions.classList.remove('hidden');
        toolOptionsStatus = POLYGON;
        selectedTool = POLYGON;
    }
});

RECTANGLE.addEventListener('click', () => {
    toolOptionsStatus = null;
    hideAllInfoPanels();
    selectedTool = RECTANGLE;
});

ELLIPSE.addEventListener('click', () => {
    toolOptionsStatus = null;
    hideAllInfoPanels();
    selectedTool = ELLIPSE;
});

PALETTE.addEventListener('click', () => {
    if (toolOptionsStatus == PALETTE) {
        toolOptionsStatus = null;
        paletteOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        paletteOptions.classList.remove('hidden');
        toolOptionsStatus = PALETTE;
        selectedTool = PALETTE;
    }
});

ERASER.addEventListener('click', () => {
    if (toolOptionsStatus == ERASER) {
        toolOptionsStatus = null;
        eraserOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        eraserOptions.classList.remove('hidden');
        toolOptionsStatus = ERASER;
        selectedTool = ERASER;
    }
});

TEXT.addEventListener('click', () => {
    if (toolOptionsStatus == TEXT) {
        toolOptionsStatus = null;
        textOptions.classList.add('hidden');
    } else {
        hideAllInfoPanels();
        textOptions.classList.remove('hidden');
        toolOptionsStatus = TEXT;
        selectedTool = TEXT;
    }
});
