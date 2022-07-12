lineWidthRange.onmousedown = function() {
    lineWidthRange.onmousemove = function() {
        lineWidthValue = lineWidthRange.value;
        lineWidthIllustration.setAttribute('r', lineWidthValue);
    };
};