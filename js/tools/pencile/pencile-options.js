pencileRange.addEventListener('change', () => {
    pencileWidth = pencileRange.value;
    pencilePreview.setAttribute('r', pencileWidth);
});