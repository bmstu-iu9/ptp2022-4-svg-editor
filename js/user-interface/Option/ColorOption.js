// ColorOption - класс опций, содержащий input типа color как основной и единственный источник ввода.

class ColorOption extends BaseOption {
    constructor(inputColor, attribute = null) {
        super(attribute);

        this.inputColor = inputColor;

        this.enableColorOptionHandlers();
    }

    enableColorOptionHandlers() {
        this.inputColor.addEventListener('input', this.updateAttribute.bind(this));
    }

    set value(value) { this.inputColor.value = value; }
    get value() { return this.inputColor.value; }
}