// Menu - базовый класс всех типов меню, т.е. групп input'ов типа radio. Содержит информацию о текущем выбранном объекте
// (класса Item) и соответствующем этому объекту отображающемуся контенту, а также об изменении стиля label'a и его
// содержимого (fill) при наведении и нажатии на объект меню.

class Menu {
    constructor(labelHover, labelChecked, fillChecked) {
        this.labelHover = labelHover;
        this.labelChecked = labelChecked;
        this.fillChecked = fillChecked;

        this.item = null;
        this.content = null;
    }
}