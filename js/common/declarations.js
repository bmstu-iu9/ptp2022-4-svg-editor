const CURSOR             = document.getElementById('cursor');
const HAND               = document.getElementById('hand');
const PENCILE            = document.getElementById('pencile');
const LINE               = document.getElementById('line');
const POLYLINE           = document.getElementById('polyline');
const ERASER             = document.getElementById('eraser');
const PALETTE            = document.getElementById('palette');
const RECTANGLE          = document.getElementById('rectangle');

const toolOptions        = document.getElementById('tool-options');
let toolOptionsStatus    = null;

const pencileOptions     = document.getElementById('pencile-options');
const pencileRange       = document.getElementById('pencile-range');
const pencilePreview     = document.getElementById('pencile-preview');
let   pencileWidth       = 5;

const lineOptions        = document.getElementById('line-options');
const lineRange          = document.getElementById('line-range');
const linePreview        = document.getElementById('line-preview');
let   lineWidth          = 5;

const polylineOptions    = document.getElementById('polyline-options');
const polylineRange      = document.getElementById('polyline-range');
const polylinePreview    = document.getElementById('polyline-preview');
let   polylineWidth      = 5;

const eraserOptions      = document.getElementById('eraser-options');
const paletteOptions     = document.getElementById('palette-options');

const svgPanel           = document.getElementById('svg-panel');
const svgNS              = "http://www.w3.org/2000/svg";

const white              = '#FFFFFF';
const black              = '#000000';

const gray               = '#E0E0E0';
const lightGray          = '#F8F8F8';

const lightBlue          = '#CCEEFF';
const blue               = '#00AAFF';

let selectedTool         = null;
let selectedFigure       = null;
let selectedColor        = blue;

let isSomeFigureCaptured = false;

let shiftDown            = false;