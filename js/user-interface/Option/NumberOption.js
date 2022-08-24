// NumberOption - класс опций, содержащий input типа number как основной и единственный источник ввода.

class NumberOption extends BaseOption {
    constructor(inputNumber, attribute = null) {
        super(attribute);

        this.inputNumber = inputNumber;

        this.enableNumberOptionHandlers();
    }

    enableNumberOptionHandlers() {
        this.inputNumber.addEventListener('input', this.updateAttribute);
    }

    set min(value) { this.inputNumber.min = value; }
    set max(value) { this.inputNumber.max = value; }
    set step(value) { this.inputNumber.step = value; }
    set value(value) { this.inputNumber.value = value; }

    get min() { return this.inputNumber.min; }
    get max() { return this.inputNumber.max; }
    get step() { return this.inputNumber.step; }
    get value() { return this.inputNumber.value; }
}