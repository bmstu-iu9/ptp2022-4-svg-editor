// RangeOption - класс опций, содержащий input типа range как основной и input типа number как побочный источники ввода.

class RangeOption extends BaseOption{
    constructor(inputRange, inputNumber, attribute = null) {
        super(attribute);

        this.inputRange = inputRange;
        this.inputNumber = inputNumber;

        this.enableRangeOptionHandlers();
    }

    enableRangeOptionHandlers() {
        this.inputRange.addEventListener('input', () => {
            this.inputNumber.value = this.inputRange.value;
            this.updateAttribute();
        });

        this.inputNumber.addEventListener('input', () => {
            this.inputRange.value = this.inputNumber.value;
            this.updateAttribute();
        });
    }

    set minRange(value) { this.inputRange.min = value; }
    set maxRange(value) { this.inputRange.max = value; }
    set stepRange(value) { this.inputRange.step = value; }

    set minNumber(value) { this.inputNumber.min = value; }
    set maxNumber(value) { this.inputNumber.max = value; }
    set stepNumber(value) { this.inputNumber.step = value; }

    set value(value) {
        this.inputNumber.value = value;
        this.inputRange.value = value;
    }

    get minRange() { return this.inputRange.min; }
    get maxRange() { return this.inputRange.max; }
    get stepRange() { return this.inputRange.step; }

    get minNumber() { return this.inputNumber.min; }
    get maxNumber() { return this.inputNumber.max; }
    get stepNumber() { return this.inputNumber.step; }

    get value() { return this.inputNumber.value; }
}