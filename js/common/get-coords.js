function getMouseCoords(event) {
    let rect = svgPanel.getBoundingClientRect();
    return {x: event.clientX - rect.left, y: event.clientY - rect.top};
}
