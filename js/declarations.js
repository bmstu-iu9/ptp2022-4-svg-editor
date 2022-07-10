const cursor   = document.getElementById('cursor');
const hand     = document.getElementById('hand');
const pencile  = document.getElementById('pencile');
const line     = document.getElementById('line');
const polyline = document.getElementById('polyline');
const eraser   = document.getElementById('eraser');
const palette  = document.getElementById('palette');

const toolInfoPanel = document.getElementById('tool-info-panel');
let toolInfoStatus  = null;

const pencileInfoPanel         = document.getElementById('pencile-info-panel');
const pencileWidthRange        = document.getElementById('pencile-width-range');
const pencileWidthIllustration = document.getElementById('pencile-width-illustration');
let   pencileWidthValue        = 25;

const lineInfoPanel     = document.getElementById('line-info-panel');
const polylineInfoPanel = document.getElementById('polyline-info-panel');
const eraserInfoPanel   = document.getElementById('eraser-info-panel');
const paletteInfoPanel  = document.getElementById('palette-info-panel');

const svgPanel = document.getElementById('svg-panel');
const svgNS    = "http://www.w3.org/2000/svg";

let selectedTool = null;