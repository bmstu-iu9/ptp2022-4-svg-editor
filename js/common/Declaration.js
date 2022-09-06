// В Declaration.js объявлены переменные, хранящие объекты с одноимённым id в файле index.html. Эти переменные не будут
// использоваться напрямую, а нужны лишь для инициализации опций инструментов в файле Initialization.js.

// Курсор
const cursorInputRadio = document.getElementById('cursor-input-radio');
const cursorLabel = document.getElementById('cursor-label');
const cursorImg = document.getElementById('cursor-img');


// Рука
const handInputRadio = document.getElementById('hand-input-radio');
const handLabel = document.getElementById('hand-label');
const handImg = document.getElementById('hand-img');


// Карандаш
const pencilInputRadio = document.getElementById('pencil-input-radio');
const pencilLabel = document.getElementById('pencil-label');
const pencilImg = document.getElementById('pencil-img');

// Создание карандаша
const pencilCreateContent = document.getElementById('pencil-create-content');

const pencilCreateStrokeWidthInputRange = document.getElementById('pencil-create-stroke-width-input-range');
const pencilCreateStrokeWidthInputNumber = document.getElementById('pencil-create-stroke-width-input-number');

const pencilCreateStrokeOpacityInputRange = document.getElementById('pencil-create-stroke-opacity-input-range');
const pencilCreateStrokeOpacityInputNumber = document.getElementById('pencil-create-stroke-opacity-input-number');

const pencilCreateStrokeInputColor = document.getElementById('pencil-create-stroke-input-color');

// Редактирование карандаша
const pencilEditContent = document.getElementById('pencil-edit-content');

const pencilEditStrokeWidthInputRange = document.getElementById('pencil-edit-stroke-width-input-range');
const pencilEditStrokeWidthInputNumber = document.getElementById('pencil-edit-stroke-width-input-number');

const pencilEditStrokeOpacityInputRange = document.getElementById('pencil-edit-stroke-opacity-input-range');
const pencilEditStrokeOpacityInputNumber = document.getElementById('pencil-edit-stroke-opacity-input-number');

const pencilEditStrokeInputColor = document.getElementById('pencil-edit-stroke-input-color');


// Кривые
const curvesInputRadio = document.getElementById('curves-input-radio');
const curvesLabel = document.getElementById('curves-label');
const curvesImg = document.getElementById('curves-img');

const curvesCreateContent = document.getElementById('curves-create-content');


// Прямая
const lineInputRadio = document.getElementById('line-input-radio');
const lineLabel = document.getElementById('line-label');
const lineImg = document.getElementById('line-img');

// Создание кривой
const lineCreateContent = document.getElementById('line-create-content');

const lineCreateStrokeWidthInputRange = document.getElementById('line-create-stroke-width-input-range');
const lineCreateStrokeWidthInputNumber = document.getElementById('line-create-stroke-width-input-number');

const lineCreateStrokeOpacityInputRange = document.getElementById('line-create-stroke-opacity-input-range');
const lineCreateStrokeOpacityInputNumber = document.getElementById('line-create-stroke-opacity-input-number');

const lineCreateStrokeInputColor = document.getElementById('line-create-stroke-input-color');

// Редактирование кривой
const lineEditContent = document.getElementById('line-edit-content');

const lineEditStrokeWidthInputRange = document.getElementById('line-edit-stroke-width-input-range');
const lineEditStrokeWidthInputNumber = document.getElementById('line-edit-stroke-width-input-number');

const lineEditStrokeOpacityInputRange = document.getElementById('line-edit-stroke-opacity-input-range');
const lineEditStrokeOpacityInputNumber = document.getElementById('line-edit-stroke-opacity-input-number');

const lineEditStrokeInputColor = document.getElementById('line-edit-stroke-input-color');


// Ломаная
const polylineInputRadio = document.getElementById('polyline-input-radio');
const polylineLabel = document.getElementById('polyline-label');
const polylineImg = document.getElementById('polyline-img');

// Создание ломаной
const polylineCreateContent = document.getElementById('polyline-create-content');

const polylineCreateStrokeWidthInputRange = document.getElementById('polyline-create-stroke-width-input-range');
const polylineCreateStrokeWidthInputNumber = document.getElementById('polyline-create-stroke-width-input-number');

const polylineCreateStrokeOpacityInputRange = document.getElementById('polyline-create-stroke-opacity-input-range');
const polylineCreateStrokeOpacityInputNumber = document.getElementById('polyline-create-stroke-opacity-input-number');

const polylineCreateStrokeInputColor = document.getElementById('polyline-create-stroke-input-color');

// Редактирование ломаной
const polylineEditContent = document.getElementById('polyline-edit-content');

const polylineEditStrokeWidthInputRange = document.getElementById('polyline-edit-stroke-width-input-range');
const polylineEditStrokeWidthInputNumber = document.getElementById('polyline-edit-stroke-width-input-number');

const polylineEditStrokeOpacityInputRange = document.getElementById('polyline-edit-stroke-opacity-input-range');
const polylineEditStrokeOpacityInputNumber = document.getElementById('polyline-edit-stroke-opacity-input-number');

const polylineEditStrokeInputColor = document.getElementById('polyline-edit-stroke-input-color');


// Формы
const shapesInputRadio = document.getElementById('shapes-input-radio');
const shapesLabel = document.getElementById('shapes-label');
const shapesImg = document.getElementById('shapes-img');

const shapesCreateContent = document.getElementById('shapes-create-content');


// Прямоугольник
const rectInputRadio = document.getElementById('rect-input-radio');
const rectLabel = document.getElementById('rect-label');
const rectImg = document.getElementById('rect-img');

// Создание прямоугольника
const rectCreateContent = document.getElementById('rect-create-content');

const rectCreateToggleFillInputRadio = document.getElementById('rect-create-toggle-fill-input-radio');
const rectCreateToggleFillLabel = document.getElementById('rect-create-toggle-fill-label');
const rectCreateToggleFillSpan = document.getElementById('rect-create-toggle-fill-span');

const rectCreateToggleStrokeInputRadio = document.getElementById('rect-create-toggle-stroke-input-radio');
const rectCreateToggleStrokeLabel = document.getElementById('rect-create-toggle-stroke-label');
const rectCreateToggleStrokeSpan = document.getElementById('rect-create-toggle-stroke-span');

const rectCreateFillOptions = document.getElementById('rect-create-fill-options');

const rectCreateOpacityInputRange = document.getElementById('rect-create-opacity-input-range');
const rectCreateOpacityInputNumber = document.getElementById('rect-create-opacity-input-number');

const rectCreateFillInputColor = document.getElementById('rect-create-fill-input-color');

const rectCreateStrokeOptions = document.getElementById('rect-create-stroke-options');

const rectCreateStrokeWidthInputRange = document.getElementById('rect-create-stroke-width-input-range');
const rectCreateStrokeWidthInputNumber = document.getElementById('rect-create-stroke-width-input-number');

const rectCreateStrokeOpacityInputRange = document.getElementById('rect-create-stroke-opacity-input-range');
const rectCreateStrokeOpacityInputNumber = document.getElementById('rect-create-stroke-opacity-input-number');

const rectCreateStrokeInputColor = document.getElementById('rect-create-stroke-input-color');

// Редактирование прямоугольника
const rectEditContent = document.getElementById('rect-edit-content');

const rectEditToggleFillInputRadio = document.getElementById('rect-edit-toggle-fill-input-radio');
const rectEditToggleFillLabel = document.getElementById('rect-edit-toggle-fill-label');
const rectEditToggleFillSpan = document.getElementById('rect-edit-toggle-fill-span');

const rectEditToggleStrokeInputRadio = document.getElementById('rect-edit-toggle-stroke-input-radio');
const rectEditToggleStrokeLabel = document.getElementById('rect-edit-toggle-stroke-label');
const rectEditToggleStrokeSpan = document.getElementById('rect-edit-toggle-stroke-span');

const rectEditFillOptions = document.getElementById('rect-edit-fill-options');

const rectEditOpacityInputRange = document.getElementById('rect-edit-opacity-input-range');
const rectEditOpacityInputNumber = document.getElementById('rect-edit-opacity-input-number');

const rectEditFillInputColor = document.getElementById('rect-edit-fill-input-color');

const rectEditStrokeOptions = document.getElementById('rect-edit-stroke-options');

const rectEditStrokeWidthInputRange = document.getElementById('rect-edit-stroke-width-input-range');
const rectEditStrokeWidthInputNumber = document.getElementById('rect-edit-stroke-width-input-number');

const rectEditStrokeOpacityInputRange = document.getElementById('rect-edit-stroke-opacity-input-range');
const rectEditStrokeOpacityInputNumber = document.getElementById('rect-edit-stroke-opacity-input-number');

const rectEditStrokeInputColor = document.getElementById('rect-edit-stroke-input-color');


// Многоугольник
const polygonInputRadio = document.getElementById('polygon-input-radio');
const polygonLabel = document.getElementById('polygon-label');
const polygonImg = document.getElementById('polygon-img');

// Создание многоугольника
const polygonCreateContent = document.getElementById('polygon-create-content');

const polygonCreateToggleFillInputRadio = document.getElementById('polygon-create-toggle-fill-input-radio');
const polygonCreateToggleFillLabel = document.getElementById('polygon-create-toggle-fill-label');
const polygonCreateToggleFillSpan = document.getElementById('polygon-create-toggle-fill-span');

const polygonCreateToggleStrokeInputRadio = document.getElementById('polygon-create-toggle-stroke-input-radio');
const polygonCreateToggleStrokeLabel = document.getElementById('polygon-create-toggle-stroke-label');
const polygonCreateToggleStrokeSpan = document.getElementById('polygon-create-toggle-stroke-span');

const polygonCreateFillOptions = document.getElementById('polygon-create-fill-options');

const polygonCreateOpacityInputRange = document.getElementById('polygon-create-opacity-input-range');
const polygonCreateOpacityInputNumber = document.getElementById('polygon-create-opacity-input-number');

const polygonCreateFillInputColor = document.getElementById('polygon-create-fill-input-color');

const polygonCreateStrokeOptions = document.getElementById('polygon-create-stroke-options');

const polygonCreateStrokeWidthInputRange = document.getElementById('polygon-create-stroke-width-input-range');
const polygonCreateStrokeWidthInputNumber = document.getElementById('polygon-create-stroke-width-input-number');

const polygonCreateStrokeOpacityInputRange = document.getElementById('polygon-create-stroke-opacity-input-range');
const polygonCreateStrokeOpacityInputNumber = document.getElementById('polygon-create-stroke-opacity-input-number');

const polygonCreateStrokeInputColor = document.getElementById('polygon-create-stroke-input-color');

// Редактирование многоугольника
const polygonEditContent = document.getElementById('polygon-edit-content');

const polygonEditToggleFillInputRadio = document.getElementById('polygon-edit-toggle-fill-input-radio');
const polygonEditToggleFillLabel = document.getElementById('polygon-edit-toggle-fill-label');
const polygonEditToggleFillSpan = document.getElementById('polygon-edit-toggle-fill-span');

const polygonEditToggleStrokeInputRadio = document.getElementById('polygon-edit-toggle-stroke-input-radio');
const polygonEditToggleStrokeLabel = document.getElementById('polygon-edit-toggle-stroke-label');
const polygonEditToggleStrokeSpan = document.getElementById('polygon-edit-toggle-stroke-span');

const polygonEditFillOptions = document.getElementById('polygon-edit-fill-options');

const polygonEditOpacityInputRange = document.getElementById('polygon-edit-opacity-input-range');
const polygonEditOpacityInputNumber = document.getElementById('polygon-edit-opacity-input-number');

const polygonEditFillInputColor = document.getElementById('polygon-edit-fill-input-color');

const polygonEditStrokeOptions = document.getElementById('polygon-edit-stroke-options');

const polygonEditStrokeWidthInputRange = document.getElementById('polygon-edit-stroke-width-input-range');
const polygonEditStrokeWidthInputNumber = document.getElementById('polygon-edit-stroke-width-input-number');

const polygonEditStrokeOpacityInputRange = document.getElementById('polygon-edit-stroke-opacity-input-range');
const polygonEditStrokeOpacityInputNumber = document.getElementById('polygon-edit-stroke-opacity-input-number');

const polygonEditStrokeInputColor = document.getElementById('polygon-edit-stroke-input-color');


// Эллипс
const ellipseInputRadio = document.getElementById('ellipse-input-radio');
const ellipseLabel = document.getElementById('ellipse-label');
const ellipseImg = document.getElementById('ellipse-img');

// Создание эллипса
const ellipseCreateContent = document.getElementById('ellipse-create-content');

const ellipseCreateToggleFillInputRadio = document.getElementById('ellipse-create-toggle-fill-input-radio');
const ellipseCreateToggleFillLabel = document.getElementById('ellipse-create-toggle-fill-label');
const ellipseCreateToggleFillSpan = document.getElementById('ellipse-create-toggle-fill-span');

const ellipseCreateToggleStrokeInputRadio = document.getElementById('ellipse-create-toggle-stroke-input-radio');
const ellipseCreateToggleStrokeLabel = document.getElementById('ellipse-create-toggle-stroke-label');
const ellipseCreateToggleStrokeSpan = document.getElementById('ellipse-create-toggle-stroke-span');

const ellipseCreateFillOptions = document.getElementById('ellipse-create-fill-options');

const ellipseCreateOpacityInputRange = document.getElementById('ellipse-create-opacity-input-range');
const ellipseCreateOpacityInputNumber = document.getElementById('ellipse-create-opacity-input-number');

const ellipseCreateFillInputColor = document.getElementById('ellipse-create-fill-input-color');

const ellipseCreateStrokeOptions = document.getElementById('ellipse-create-stroke-options');

const ellipseCreateStrokeWidthInputRange = document.getElementById('ellipse-create-stroke-width-input-range');
const ellipseCreateStrokeWidthInputNumber = document.getElementById('ellipse-create-stroke-width-input-number');

const ellipseCreateStrokeOpacityInputRange = document.getElementById('ellipse-create-stroke-opacity-input-range');
const ellipseCreateStrokeOpacityInputNumber = document.getElementById('ellipse-create-stroke-opacity-input-number');

const ellipseCreateStrokeInputColor = document.getElementById('ellipse-create-stroke-input-color');

// Редактирование эллипса
const ellipseEditContent = document.getElementById('ellipse-edit-content');

const ellipseEditToggleFillInputRadio = document.getElementById('ellipse-edit-toggle-fill-input-radio');
const ellipseEditToggleFillLabel = document.getElementById('ellipse-edit-toggle-fill-label');
const ellipseEditToggleFillSpan = document.getElementById('ellipse-edit-toggle-fill-span');

const ellipseEditToggleStrokeInputRadio = document.getElementById('ellipse-edit-toggle-stroke-input-radio');
const ellipseEditToggleStrokeLabel = document.getElementById('ellipse-edit-toggle-stroke-label');
const ellipseEditToggleStrokeSpan = document.getElementById('ellipse-edit-toggle-stroke-span');

const ellipseEditFillOptions = document.getElementById('ellipse-edit-fill-options');

const ellipseEditOpacityInputRange = document.getElementById('ellipse-edit-opacity-input-range');
const ellipseEditOpacityInputNumber = document.getElementById('ellipse-edit-opacity-input-number');

const ellipseEditFillInputColor = document.getElementById('ellipse-edit-fill-input-color');

const ellipseEditStrokeOptions = document.getElementById('ellipse-edit-stroke-options');

const ellipseEditStrokeWidthInputRange = document.getElementById('ellipse-edit-stroke-width-input-range');
const ellipseEditStrokeWidthInputNumber = document.getElementById('ellipse-edit-stroke-width-input-number');

const ellipseEditStrokeOpacityInputRange = document.getElementById('ellipse-edit-stroke-opacity-input-range');
const ellipseEditStrokeOpacityInputNumber = document.getElementById('ellipse-edit-stroke-opacity-input-number');

const ellipseEditStrokeInputColor = document.getElementById('ellipse-edit-stroke-input-color');


// Текст
const textInputRadio = document.getElementById('text-input-radio');
const textLabel = document.getElementById('text-label');
const textImg = document.getElementById('text-img');

// Создание текста
const textCreateContent = document.getElementById('text-create-content');

const textCreateFontSizeInputNumber = document.getElementById('text-create-font-size-input-number');

const textCreateFontFamilySelect = document.getElementById('text-create-font-family-select');

const textCreateFontWeightInputCheckbox = document.getElementById('text-create-font-weight-input-checkbox');
const textCreateFontWeightLabel = document.getElementById('text-create-font-weight-label');

const textCreateFontStyleInputCheckbox = document.getElementById('text-create-font-style-input-checkbox');
const textCreateFontStyleLabel = document.getElementById('text-create-font-style-label');

const textCreateTextDecorationInputCheckbox = document.getElementById('text-create-text-decoration-input-checkbox');
const textCreateTextDecorationLabel = document.getElementById('text-create-text-decoration-label');

const textCreateOpacityInputRange = document.getElementById('text-create-opacity-input-range');
const textCreateOpacityInputNumber = document.getElementById('text-create-opacity-input-number');

const textCreateFillInputColor = document.getElementById('text-create-fill-input-color');

// Редактирование текста
const textEditContent = document.getElementById('text-edit-content');

const textEditFontWeightInputCheckbox = document.getElementById('text-edit-font-weight-input-checkbox');
const textEditFontWeightLabel = document.getElementById('text-edit-font-weight-label');

const textEditFontStyleInputCheckbox = document.getElementById('text-edit-font-style-input-checkbox');
const textEditFontStyleLabel = document.getElementById('text-edit-font-style-label');

const textEditTextDecorationInputCheckbox = document.getElementById('text-edit-text-decoration-input-checkbox');
const textEditTextDecorationLabel = document.getElementById('text-edit-text-decoration-label');

const textEditOpacityInputRange = document.getElementById('text-edit-opacity-input-range');
const textEditOpacityInputNumber = document.getElementById('text-edit-opacity-input-number');

const textEditFillInputColor = document.getElementById('text-edit-fill-input-color');


// Ластик
const eraserInputRadio = document.getElementById('eraser-input-radio');
const eraserLabel = document.getElementById('eraser-label');
const eraserImg = document.getElementById('eraser-img');


// SVG-холст
const svg = document.getElementById('svg');