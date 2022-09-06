// SuperOption - базовый класс для всех типов опций. Выбрано название SuperOption, а не Option, так как имя Option уже
// зарезервировано в языке.

class SuperOption {
    constructor(attribute) {
        this.attribute = attribute;
    }

    updateAttribute() {
        if (this.attribute && Figure.selected) {
            Figure.selected.svg.setAttribute(this.attribute, this.value);
        }
    }

    set value(value) { }
    get value() {}
}