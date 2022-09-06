// SelectOption - класс опций, содержащий select как основной и единственный источник ввода.

class SelectOption extends SuperOption {
    constructor(select, attribute = null) {
        super(attribute);

        this.select = select;

        this.enableSelectOptionHandlers();
    }

    enableSelectOptionHandlers() {
        this.select.addEventListener('input', this.updateAttribute.bind(this));
    }

    set value(value) { this.select.value = value; }
    get value() { return this.select.value; }
}