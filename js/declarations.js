const cursorTool               = document.getElementById('cursor');
const handTool                 = document.getElementById('hand');
const pencileTool              = document.getElementById('pencile');
const lineTool                 = document.getElementById('line');
const polylineTool             = document.getElementById('polyline');
const eraserTool               = document.getElementById('eraser');
const paletteTool              = document.getElementById('palette');

const toolInfoPanel            = document.getElementById('tool-info-panel');
let toolInfoStatus             = null;

const pencileInfoPanel         = document.getElementById('pencile-info-panel');
const pencileWidthRange        = document.getElementById('pencile-width-range');
const pencileWidthIllustration = document.getElementById('pencile-width-illustration');
let   pencileWidthValue        = 5;

const lineInfoPanel            = document.getElementById('line-info-panel');
const lineWidthRange           = document.getElementById('line-width-range');
const lineWidthIllustration    = document.getElementById('line-width-illustration');
let   lineWidthValue           = 5;

const polylineInfoPanel        = document.getElementById('polyline-info-panel');
const eraserInfoPanel          = document.getElementById('eraser-info-panel');
const paletteInfoPanel         = document.getElementById('palette-info-panel');

const svgPanel                 = document.getElementById('svg-panel');
const svgNS                    = "http://www.w3.org/2000/svg";

let selectedTool               = null;
let selectedColor              = '#000000';