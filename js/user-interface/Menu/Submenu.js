// Submenu - едва полезный тип меню. Представляет собой подменю, находящееся в контенте объекта другого меню, и имеет
// доступ к этому объекту.

class Submenu extends Menu {
    constructor(parent, labelHover, labelChecked, fillChecked) {
        super(labelHover, labelChecked, fillChecked);

        this.parent = parent;
    }
}