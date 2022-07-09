const cursor  = document.getElementById('cursor');
const hand    = document.getElementById('hand');
const pencile = document.getElementById('pencile');
const eraser  = document.getElementById('eraser');
const palette = document.getElementById('palette');

const toolInfoPanel = document.getElementById('tool-info-panel');
let toolInfoStatus  = null;

const pencileInfo              = document.getElementById('pencile-info');
const pencileWidthRange        = document.getElementById('pencile-width-range');
const pencileWidthIllustration = document.getElementById('pencile-width-illustration');
let   pencileWidthValue        = 25;

const eraserInfo  = document.getElementById('eraser-info');
const paletteInfo = document.getElementById('palette-info');

const svgPanel = document.getElementById('svg-panel');
const svgNS    = "http://www.w3.org/2000/svg";

let selectedTool = null;