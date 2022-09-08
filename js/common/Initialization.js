// Создание холста
const create = new Button(createButton, createFunctionality);
create.enableButtonStyle('button_hover');

function createFunctionality() {
    const height = prompt('Высота, px', '600');
    const width = prompt('Ширина, px', '600');

    if (Number(height) && Number(width)) {
        canvas.svg.style.height = height;
        canvas.svg.style.width = width;
        canvas.svg.innerHTML = '';
    } else {
        alert('Некорректный ввод!');
    }
}

// Сохранение холста
const save = new Button(saveButton, saveFunctionality);
save.enableButtonStyle('button_hover');

function saveFunctionality() {
    // TODO: написать код сохранения холста.
}


// Меню инструментов
const toolbar = new Menu(
    'label_hover-menu-tool', 'label_checked-menu-tool', 'img_checked'
);

const cursor = new Tool(toolbar, cursorInputRadio, cursorLabel, cursorImg);
const hand = new Tool(toolbar, handInputRadio, handLabel, handImg);
const pencil = new Tool(toolbar, pencilInputRadio, pencilLabel, pencilImg);
const curves = new Tool(toolbar, curvesInputRadio, curvesLabel, curvesImg);
const shapes = new Tool(toolbar, shapesInputRadio, shapesLabel, shapesImg);
const text = new Tool(toolbar, textInputRadio, textLabel, textImg);
const eraser = new Tool(toolbar, eraserInputRadio, eraserLabel, eraserImg);

toolbar.item = cursor;


// Карандаш. Создание карандаша
pencil.create = new Content(pencilCreateContent);

pencil.create.strokeWidth = new RangeOption(
    pencilCreateStrokeWidthInputRange, pencilCreateStrokeWidthInputNumber
);
pencil.create.strokeWidth.minRange = 1;
pencil.create.strokeWidth.maxRange = 100;
pencil.create.strokeWidth.stepRange = 1;
pencil.create.strokeWidth.minNumber = 1;
pencil.create.strokeWidth.stepNumber = 1;
pencil.create.strokeWidth.value = 10;

pencil.create.strokeOpacity = new RangeOption(
    pencilCreateStrokeOpacityInputRange, pencilCreateStrokeOpacityInputNumber
);
pencil.create.strokeOpacity.minRange = 0;
pencil.create.strokeOpacity.maxRange = 1;
pencil.create.strokeOpacity.stepRange = 0.05;
pencil.create.strokeOpacity.minNumber = 0;
pencil.create.strokeOpacity.maxNumber = 1;
pencil.create.strokeOpacity.stepNumber = 0.01;
pencil.create.strokeOpacity.value = 1;

pencil.create.stroke = new ColorOption(pencilCreateStrokeInputColor);
pencil.create.stroke.value = blue;

// Редактирование карандаша
pencil.edit = new Content(pencilEditContent);

pencil.edit.strokeWidth = new RangeOption(
    pencilEditStrokeWidthInputRange, pencilEditStrokeWidthInputNumber, 'stroke-width'
);
pencil.edit.strokeWidth.minRange = 1;
pencil.edit.strokeWidth.maxRange = 100;
pencil.edit.strokeWidth.stepRange = 1;
pencil.edit.strokeWidth.minNumber = 1;
pencil.edit.strokeWidth.stepNumber = 1;

pencil.edit.strokeOpacity = new RangeOption(
    pencilEditStrokeOpacityInputRange, pencilEditStrokeOpacityInputNumber, 'stroke-opacity'
);
pencil.edit.strokeOpacity.minRange = 0;
pencil.edit.strokeOpacity.maxRange = 1;
pencil.edit.strokeOpacity.stepRange = 0.05;
pencil.edit.strokeOpacity.minNumber = 0;
pencil.edit.strokeOpacity.maxNumber = 1;
pencil.edit.strokeOpacity.stepNumber = 0.01;

pencil.edit.stroke = new ColorOption(pencilEditStrokeInputColor, 'stroke');


// Кривые. Меню кривых
curves.create = new Content(curvesCreateContent);

const curvesCreateSubtool = new Submenu(
    curves, 'label_hover-menu-subtool', 'label_checked-menu-subtool', 'img_checked'
);

const line = new Subtool(curvesCreateSubtool, lineInputRadio, lineLabel, lineImg);
const polyline = new Subtool(curvesCreateSubtool, polylineInputRadio, polylineLabel, polylineImg);

curvesCreateSubtool.item = line;


// Линия. Создание линии
line.create = new Content(lineCreateContent);

curvesCreateSubtool.content = line.create.content;

line.create.strokeWidth = new RangeOption(
    lineCreateStrokeWidthInputRange, lineCreateStrokeWidthInputNumber
);
line.create.strokeWidth.minRange = 1;
line.create.strokeWidth.maxRange = 50;
line.create.strokeWidth.stepRange = 1;
line.create.strokeWidth.minNumber = 1;
line.create.strokeWidth.stepNumber = 1;
line.create.strokeWidth.value = 5;

line.create.strokeOpacity = new RangeOption(
    lineCreateStrokeOpacityInputRange, lineCreateStrokeOpacityInputNumber
);
line.create.strokeOpacity.minRange = 0;
line.create.strokeOpacity.maxRange = 1;
line.create.strokeOpacity.stepRange = 0.05;
line.create.strokeOpacity.minNumber = 0;
line.create.strokeOpacity.maxNumber = 1;
line.create.strokeOpacity.stepNumber = 0.01;
line.create.strokeOpacity.value = 1;

line.create.stroke = new ColorOption(lineCreateStrokeInputColor);
line.create.stroke.value = blue;

// Редактирование линии
line.edit = new Content(lineEditContent);

line.edit.strokeWidth = new RangeOption(
    lineEditStrokeWidthInputRange,  lineEditStrokeWidthInputNumber, 'stroke-width'
);
line.edit.strokeWidth.minRange = 1;
line.edit.strokeWidth.maxRange = 50;
line.edit.strokeWidth.stepRange = 1;
line.edit.strokeWidth.minNumber = 1;
line.edit.strokeWidth.stepNumber = 1;
line.edit.strokeWidth.value = 5;

line.edit.strokeOpacity = new RangeOption(
    lineEditStrokeOpacityInputRange, lineEditStrokeOpacityInputNumber, 'stroke-opacity'
);
line.edit.strokeOpacity.minRange = 0;
line.edit.strokeOpacity.maxRange = 1;
line.edit.strokeOpacity.stepRange = 0.05;
line.edit.strokeOpacity.minNumber = 0;
line.edit.strokeOpacity.maxNumber = 1;
line.edit.strokeOpacity.stepNumber = 0.01;
line.edit.strokeOpacity.value = 1;

line.edit.stroke = new ColorOption(lineEditStrokeInputColor, 'stroke');


// Ломаная. Создание ломаной.
polyline.create = new Content(polylineCreateContent);

polyline.create.strokeWidth = new RangeOption(
    polylineCreateStrokeWidthInputRange, polylineCreateStrokeWidthInputNumber
);
polyline.create.strokeWidth.minRange = 1;
polyline.create.strokeWidth.maxRange = 50;
polyline.create.strokeWidth.stepRange = 1;
polyline.create.strokeWidth.minNumber = 1;
polyline.create.strokeWidth.stepNumber = 1;
polyline.create.strokeWidth.value = 5;

polyline.create.strokeOpacity = new RangeOption(
    polylineCreateStrokeOpacityInputRange, polylineCreateStrokeOpacityInputNumber
);
polyline.create.strokeOpacity.minRange = 0;
polyline.create.strokeOpacity.maxRange = 1;
polyline.create.strokeOpacity.stepRange = 0.05;
polyline.create.strokeOpacity.minNumber = 0;
polyline.create.strokeOpacity.maxNumber = 1;
polyline.create.strokeOpacity.stepNumber = 0.01;
polyline.create.strokeOpacity.value = 1;

polyline.create.stroke = new ColorOption(polylineCreateStrokeInputColor);
polyline.create.stroke.value = blue;

// Редактирование ломаной
polyline.edit = new Content(polylineEditContent);

polyline.edit.strokeWidth = new RangeOption(
    polylineEditStrokeWidthInputRange, polylineEditStrokeWidthInputNumber, 'stroke-width'
);
polyline.edit.strokeWidth.minRange = 1;
polyline.edit.strokeWidth.maxRange = 50;
polyline.edit.strokeWidth.stepRange = 1;
polyline.edit.strokeWidth.minNumber = 1;
polyline.edit.strokeWidth.stepNumber = 1;

polyline.edit.strokeOpacity = new RangeOption(
    polylineEditStrokeOpacityInputRange, polylineEditStrokeOpacityInputNumber, 'stroke-opacity'
);
polyline.edit.strokeOpacity.minRange = 0;
polyline.edit.strokeOpacity.maxRange = 1;
polyline.edit.strokeOpacity.stepRange = 0.05;
polyline.edit.strokeOpacity.minNumber = 0;
polyline.edit.strokeOpacity.maxNumber = 1;
polyline.edit.strokeOpacity.stepNumber = 0.01;

polyline.edit.stroke = new ColorOption(polylineEditStrokeInputColor, 'stroke');


// Формы. Меню форм
shapes.create = new Content(shapesCreateContent);

const shapesCreateSubtool = new Submenu(
    shapes, 'label_hover-menu-subtool', 'label_checked-menu-subtool', 'img_checked'
);

const rect = new Subtool(shapesCreateSubtool, rectInputRadio, rectLabel, rectImg);
const polygon = new Subtool(shapesCreateSubtool, polygonInputRadio, polygonLabel, polygonImg);
const ellipse = new Subtool(shapesCreateSubtool, ellipseInputRadio, ellipseLabel, ellipseImg);

shapesCreateSubtool.item = rect;


// Прямоугольник. Создание прямоугольника
rect.create = new Content(rectCreateContent);

shapesCreateSubtool.content = rect.create.content;

const rectCreateToggle = new Menu(
    'label_hover-menu-toggle', 'label_checked-menu-toggle', 'span_checked-menu-toggle'
);

const rectCreateFill = new Toggle(
    rectCreateToggle, rectCreateToggleFillInputRadio, rectCreateToggleFillLabel, rectCreateToggleFillSpan
);
rectCreateFill.options = rectCreateFillOptions;

const rectCreateStroke = new Toggle(
    rectCreateToggle, rectCreateToggleStrokeInputRadio, rectCreateToggleStrokeLabel, rectCreateToggleStrokeSpan
);
rectCreateStroke.options = rectCreateStrokeOptions;

rectCreateToggle.item = rectCreateFill;
rectCreateToggle.content = rectCreateFillOptions;

rect.create.opacity = new RangeOption(
    rectCreateOpacityInputRange, rectCreateOpacityInputNumber
);
rect.create.opacity.minRange = 0;
rect.create.opacity.maxRange = 1;
rect.create.opacity.stepRange = 0.05;
rect.create.opacity.minNumber = 0;
rect.create.opacity.maxNumber = 1;
rect.create.opacity.stepNumber = 0.01;
rect.create.opacity.value = 1;

rect.create.fill = new ColorOption(rectCreateFillInputColor);
rect.create.fill.value = lightBlue;

rect.create.strokeWidth = new RangeOption(
    rectCreateStrokeWidthInputRange, rectCreateStrokeWidthInputNumber
);
rect.create.strokeWidth.minRange = 1;
rect.create.strokeWidth.maxRange = 50;
rect.create.strokeWidth.stepRange = 1;
rect.create.strokeWidth.minNumber = 1;
rect.create.strokeWidth.stepNumber = 1;
rect.create.strokeWidth.value = 5;

rect.create.strokeOpacity = new RangeOption(
    rectCreateStrokeOpacityInputRange, rectCreateStrokeOpacityInputNumber
);
rect.create.strokeOpacity.minRange = 0;
rect.create.strokeOpacity.maxRange = 1;
rect.create.strokeOpacity.stepRange = 0.05;
rect.create.strokeOpacity.minNumber = 0;
rect.create.strokeOpacity.maxNumber = 1;
rect.create.strokeOpacity.stepNumber = 0.01;
rect.create.strokeOpacity.value = 1;

rect.create.stroke = new ColorOption(rectCreateStrokeInputColor);
rect.create.stroke.value = blue;

// Редактирование прямоугольника
rect.edit = new Content(rectEditContent);

const rectEditToggle = new Menu(
    'label_hover-menu-toggle', 'label_checked-menu-toggle', 'span_checked-menu-toggle'
);

const rectEditFill = new Toggle(
    rectEditToggle, rectEditToggleFillInputRadio, rectEditToggleFillLabel, rectEditToggleFillSpan
);
rectEditFill.options = rectEditFillOptions;

const rectEditStroke = new Toggle(
    rectEditToggle, rectEditToggleStrokeInputRadio, rectEditToggleStrokeLabel, rectEditToggleStrokeSpan
);
rectEditStroke.options = rectEditStrokeOptions;

rectEditToggle.item = rectEditFill;
rectEditToggle.content = rectEditFillOptions;

rect.edit.opacity = new RangeOption(
    rectEditOpacityInputRange, rectEditOpacityInputNumber, 'opacity'
);
rect.edit.opacity.minRange = 0;
rect.edit.opacity.maxRange = 1;
rect.edit.opacity.stepRange = 0.05;
rect.edit.opacity.minNumber = 0;
rect.edit.opacity.maxNumber = 1;
rect.edit.opacity.stepNumber = 0.01;

rect.edit.fill = new ColorOption(rectEditFillInputColor, 'fill');

rect.edit.strokeWidth = new RangeOption(
    rectEditStrokeWidthInputRange, rectEditStrokeWidthInputNumber, 'stroke-width'
);
rect.edit.strokeWidth.minRange = 1;
rect.edit.strokeWidth.maxRange = 50;
rect.edit.strokeWidth.stepRange = 1;
rect.edit.strokeWidth.minNumber = 1;
rect.edit.strokeWidth.stepNumber = 1;

rect.edit.strokeOpacity = new RangeOption(
    rectEditStrokeOpacityInputRange, rectEditStrokeOpacityInputNumber, 'stroke-opacity'
);
rect.edit.strokeOpacity.minRange = 0;
rect.edit.strokeOpacity.maxRange = 1;
rect.edit.strokeOpacity.stepRange = 0.05;
rect.edit.strokeOpacity.minNumber = 0;
rect.edit.strokeOpacity.maxNumber = 1;
rect.edit.strokeOpacity.stepNumber = 0.01;

rect.edit.stroke = new ColorOption(rectEditStrokeInputColor, 'stroke');


// Многоугольник. Создание многоугольника
polygon.create = new Content(polygonCreateContent);

const polygonCreateToggle = new Menu(
    'label_hover-menu-toggle', 'label_checked-menu-toggle', 'span_checked-menu-toggle'
);

const polygonCreateFill = new Toggle(
    polygonCreateToggle, polygonCreateToggleFillInputRadio, polygonCreateToggleFillLabel, polygonCreateToggleFillSpan
);
polygonCreateFill.options = polygonCreateFillOptions;

const polygonCreateStroke = new Toggle(
    polygonCreateToggle, polygonCreateToggleStrokeInputRadio, polygonCreateToggleStrokeLabel,
    polygonCreateToggleStrokeSpan
);
polygonCreateStroke.options = polygonCreateStrokeOptions;

polygonCreateToggle.item = polygonCreateFill;
polygonCreateToggle.content = polygonCreateFillOptions;

polygon.create.opacity = new RangeOption(
    polygonCreateOpacityInputRange, polygonCreateOpacityInputNumber
);
polygon.create.opacity.minRange = 0;
polygon.create.opacity.maxRange = 1;
polygon.create.opacity.stepRange = 0.05;
polygon.create.opacity.minNumber = 0;
polygon.create.opacity.maxNumber = 1;
polygon.create.opacity.stepNumber = 0.01;
polygon.create.opacity.value = 1;

polygon.create.fill = new ColorOption(polygonCreateFillInputColor);
polygon.create.fill.value = lightBlue;

polygon.create.strokeWidth = new RangeOption(
    polygonCreateStrokeWidthInputRange, polygonCreateStrokeWidthInputNumber
);
polygon.create.strokeWidth.minRange = 1;
polygon.create.strokeWidth.maxRange = 50;
polygon.create.strokeWidth.stepRange = 1;
polygon.create.strokeWidth.minNumber = 1;
polygon.create.strokeWidth.stepNumber = 1;
polygon.create.strokeWidth.value = 5;

polygon.create.strokeOpacity = new RangeOption(
    polygonCreateStrokeOpacityInputRange, polygonCreateStrokeOpacityInputNumber
);
polygon.create.strokeOpacity.minRange = 0;
polygon.create.strokeOpacity.maxRange = 1;
polygon.create.strokeOpacity.stepRange = 0.05;
polygon.create.strokeOpacity.minNumber = 0;
polygon.create.strokeOpacity.maxNumber = 1;
polygon.create.strokeOpacity.stepNumber = 0.01;
polygon.create.strokeOpacity.value = 1;

polygon.create.stroke = new ColorOption(polygonCreateStrokeInputColor);
polygon.create.stroke.value = blue;

// Редактирование многоугольника
polygon.edit = new Content(polygonEditContent);

const polygonEditToggle = new Menu(
    'label_hover-menu-toggle', 'label_checked-menu-toggle', 'span_checked-menu-toggle'
);

const polygonEditFill = new Toggle(
    polygonEditToggle, polygonEditToggleFillInputRadio, polygonEditToggleFillLabel, polygonEditToggleFillSpan
);
polygonEditFill.options = polygonEditFillOptions;

const polygonEditStroke = new Toggle(
    polygonEditToggle, polygonEditToggleStrokeInputRadio, polygonEditToggleStrokeLabel, polygonEditToggleStrokeSpan
);
polygonEditStroke.options = polygonEditStrokeOptions;

polygonEditToggle.item = polygonEditFill;
polygonEditToggle.content = polygonEditFillOptions;

polygon.edit.opacity = new RangeOption(
    polygonEditOpacityInputRange, polygonEditOpacityInputNumber, 'opacity'
);
polygon.edit.opacity.minRange = 0;
polygon.edit.opacity.maxRange = 1;
polygon.edit.opacity.stepRange = 0.05;
polygon.edit.opacity.minNumber = 0;
polygon.edit.opacity.maxNumber = 1;
polygon.edit.opacity.stepNumber = 0.01;

polygon.edit.fill = new ColorOption(polygonEditFillInputColor, 'fill');

polygon.edit.strokeWidth = new RangeOption(
    polygonEditStrokeWidthInputRange, polygonEditStrokeWidthInputNumber, 'stroke-width'
);
polygon.edit.strokeWidth.minRange = 1;
polygon.edit.strokeWidth.maxRange = 50;
polygon.edit.strokeWidth.stepRange = 1;
polygon.edit.strokeWidth.minNumber = 1;
polygon.edit.strokeWidth.stepNumber = 1;

polygon.edit.strokeOpacity = new RangeOption(
    polygonEditStrokeOpacityInputRange, polygonEditStrokeOpacityInputNumber, 'stroke-opacity'
);
polygon.edit.strokeOpacity.minRange = 0;
polygon.edit.strokeOpacity.maxRange = 1;
polygon.edit.strokeOpacity.stepRange = 0.05;
polygon.edit.strokeOpacity.minNumber = 0;
polygon.edit.strokeOpacity.maxNumber = 1;
polygon.edit.strokeOpacity.stepNumber = 0.01;

polygon.edit.stroke = new ColorOption(polygonEditStrokeInputColor, 'stroke');


// Эллипс. Создание эллипса
ellipse.create = new Content(ellipseCreateContent);

const ellipseCreateToggle = new Menu(
    'label_hover-menu-toggle', 'label_checked-menu-toggle', 'span_checked-menu-toggle'
);

const ellipseCreateFill = new Toggle(
    ellipseCreateToggle, ellipseCreateToggleFillInputRadio, ellipseCreateToggleFillLabel, ellipseCreateToggleFillSpan
);
ellipseCreateFill.options = ellipseCreateFillOptions;

const ellipseCreateStroke = new Toggle(
    ellipseCreateToggle, ellipseCreateToggleStrokeInputRadio, ellipseCreateToggleStrokeLabel,
    ellipseCreateToggleStrokeSpan
);
ellipseCreateStroke.options = ellipseCreateStrokeOptions;

ellipseCreateToggle.item = ellipseCreateFill;
ellipseCreateToggle.content = ellipseCreateFillOptions;

ellipse.create.opacity = new RangeOption(
    ellipseCreateOpacityInputRange, ellipseCreateOpacityInputNumber
);
ellipse.create.opacity.minRange = 0;
ellipse.create.opacity.maxRange = 1;
ellipse.create.opacity.stepRange = 0.05;
ellipse.create.opacity.minNumber = 0;
ellipse.create.opacity.maxNumber = 1;
ellipse.create.opacity.stepNumber = 0.01;
ellipse.create.opacity.value = 1;

ellipse.create.fill = new ColorOption(ellipseCreateFillInputColor);
ellipse.create.fill.value = lightBlue;

ellipse.create.strokeWidth = new RangeOption(
    ellipseCreateStrokeWidthInputRange, ellipseCreateStrokeWidthInputNumber
);
ellipse.create.strokeWidth.minRange = 1;
ellipse.create.strokeWidth.maxRange = 50;
ellipse.create.strokeWidth.stepRange = 1;
ellipse.create.strokeWidth.minNumber = 1;
ellipse.create.strokeWidth.stepNumber = 1;
ellipse.create.strokeWidth.value = 5;

ellipse.create.strokeOpacity = new RangeOption(
    ellipseCreateStrokeOpacityInputRange, ellipseCreateStrokeOpacityInputNumber
);
ellipse.create.strokeOpacity.minRange = 0;
ellipse.create.strokeOpacity.maxRange = 1;
ellipse.create.strokeOpacity.stepRange = 0.05;
ellipse.create.strokeOpacity.minNumber = 0;
ellipse.create.strokeOpacity.maxNumber = 1;
ellipse.create.strokeOpacity.stepNumber = 0.01;
ellipse.create.strokeOpacity.value = 1;

ellipse.create.stroke = new ColorOption(ellipseCreateStrokeInputColor);
ellipse.create.stroke.value = blue;

// Редактирование эллипса
ellipse.edit = new Content(ellipseEditContent);

const ellipseEditToggle = new Menu(
    'label_hover-menu-toggle', 'label_checked-menu-toggle', 'span_checked-menu-toggle'
);

const ellipseEditFill = new Toggle(
    ellipseEditToggle, ellipseEditToggleFillInputRadio, ellipseEditToggleFillLabel, ellipseEditToggleFillSpan
);
ellipseEditFill.options = ellipseEditFillOptions;

const ellipseEditStroke = new Toggle(
    ellipseEditToggle, ellipseEditToggleStrokeInputRadio, ellipseEditToggleStrokeLabel, ellipseEditToggleStrokeSpan
);
ellipseEditStroke.options = ellipseEditStrokeOptions;

ellipseEditToggle.item = ellipseEditFill;
ellipseEditToggle.content = ellipseEditFillOptions;

ellipse.edit.opacity = new RangeOption(
    ellipseEditOpacityInputRange, ellipseEditOpacityInputNumber, 'opacity'
);
ellipse.edit.opacity.minRange = 0;
ellipse.edit.opacity.maxRange = 1;
ellipse.edit.opacity.stepRange = 0.05;
ellipse.edit.opacity.minNumber = 0;
ellipse.edit.opacity.maxNumber = 1;
ellipse.edit.opacity.stepNumber = 0.01;

ellipse.edit.fill = new ColorOption(ellipseEditFillInputColor, 'fill');

ellipse.edit.strokeWidth = new RangeOption(
    ellipseEditStrokeWidthInputRange, ellipseEditStrokeWidthInputNumber, 'stroke-width'
);
ellipse.edit.strokeWidth.minRange = 1;
ellipse.edit.strokeWidth.maxRange = 50;
ellipse.edit.strokeWidth.stepRange = 1;
ellipse.edit.strokeWidth.minNumber = 1;
ellipse.edit.strokeWidth.stepNumber = 1;

ellipse.edit.strokeOpacity = new RangeOption(
    ellipseEditStrokeOpacityInputRange, ellipseEditStrokeOpacityInputNumber, 'stroke-opacity'
);
ellipse.edit.strokeOpacity.minRange = 0;
ellipse.edit.strokeOpacity.maxRange = 1;
ellipse.edit.strokeOpacity.stepRange = 0.05;
ellipse.edit.strokeOpacity.minNumber = 0;
ellipse.edit.strokeOpacity.maxNumber = 1;
ellipse.edit.strokeOpacity.stepNumber = 0.01;

ellipse.edit.stroke = new ColorOption(ellipseEditStrokeInputColor, 'stroke');


// Текст. Создание текста
text.create = new Content(textCreateContent);

text.create.fontSize = new NumberOption(textCreateFontSizeInputNumber);
text.create.fontSize.min = 1;
text.create.fontSize.step = 1;
text.create.fontSize.value = 18;

text.create.fontFamily = new SelectOption(textCreateFontFamilySelect);

text.create.fontWeight = new CheckboxOption(textCreateFontWeightInputCheckbox, textCreateFontWeightLabel);
text.create.fontWeight.enableValue('normal', 'bold');
text.create.fontWeight.enableLabelStyle('label_hover-option-checkbox', 'label_checked-option-checkbox');

text.create.fontStyle = new CheckboxOption(textCreateFontStyleInputCheckbox, textCreateFontStyleLabel);
text.create.fontStyle.enableValue('normal', 'italic');
text.create.fontStyle.enableLabelStyle('label_hover-option-checkbox', 'label_checked-option-checkbox');

text.create.textDecoration = new CheckboxOption(textCreateTextDecorationInputCheckbox, textCreateTextDecorationLabel);
text.create.textDecoration.enableValue('none', 'underline');
text.create.textDecoration.enableLabelStyle('label_hover-option-checkbox', 'label_checked-option-checkbox');

text.create.opacity = new RangeOption(textCreateOpacityInputRange, textCreateOpacityInputNumber);
text.create.opacity.minRange = 0;
text.create.opacity.maxRange = 1;
text.create.opacity.stepRange = 0.05;
text.create.opacity.minNumber = 0;
text.create.opacity.maxNumber = 1;
text.create.opacity.stepNumber = 0.01;
text.create.opacity.value = 1;

text.create.fill = new ColorOption(textCreateFillInputColor);
text.create.fill.value = black;

// Редактирование текста
text.edit = new Content(textEditContent);

text.edit.fontWeight = new CheckboxOption(textEditFontWeightInputCheckbox, textEditFontWeightLabel, 'font-weight');
text.edit.fontWeight.enableValue('normal', 'bold');
text.edit.fontWeight.enableLabelStyle('label_hover-option-checkbox', 'label_checked-option-checkbox');

text.edit.fontStyle = new CheckboxOption(textEditFontStyleInputCheckbox, textEditFontStyleLabel, 'font-style');
text.edit.fontStyle.enableValue('normal', 'italic');
text.edit.fontStyle.enableLabelStyle('label_hover-option-checkbox', 'label_checked-option-checkbox');

text.edit.textDecoration = new CheckboxOption(textEditTextDecorationInputCheckbox, textEditTextDecorationLabel, 'text-decoration');
text.edit.textDecoration.enableValue('none', 'underline');
text.edit.textDecoration.enableLabelStyle('label_hover-option-checkbox', 'label_checked-option-checkbox');

text.edit.opacity = new RangeOption(textEditOpacityInputRange, textEditOpacityInputNumber, 'opacity');
text.edit.opacity.minRange = 0;
text.edit.opacity.maxRange = 1;
text.edit.opacity.stepRange = 0.05;
text.edit.opacity.minNumber = 0;
text.edit.opacity.maxNumber = 1;
text.edit.opacity.stepNumber = 0.01;

text.edit.fill = new ColorOption(textEditFillInputColor, 'fill');


// SVG-холст
const canvas = new Canvas(svg);