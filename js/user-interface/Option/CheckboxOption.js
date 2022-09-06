// CheckboxOption - класс опций, содержащий input типа checkbox как основной и единственный источник ввода.

class CheckboxOption extends SuperOption {
    constructor(inputCheckbox, label, attribute = null) {
        super(attribute);

        this.inputCheckbox = inputCheckbox;
        this.label = label;

        this.enableCheckboxOptionHandlers();
    }

    enableCheckboxOptionHandlers() {
        this.label.addEventListener('mouseenter', () => {
            this.label.classList.add(this.labelHover);
        });

        this.label.addEventListener('mouseleave', () => {
            this.label.classList.remove(this.labelHover)
        });

        this.inputCheckbox.addEventListener('change', () => {
            this.label.classList.toggle(this.labelChecked);
            this.updateAttribute();
        });
    }

    enableValue(valueDefault, valueChecked) {
        this.valueDefault = valueDefault;
        this.valueChecked = valueChecked;
    }

    enableLabelStyle(labelHover, labelChecked) {
        this.labelHover = labelHover;
        this.labelChecked = labelChecked;
    }

    set value(value) {
        if (value === this.valueDefault) {
            return;
        }

        this.inputCheckbox.checked = true;
        this.label.classList.add(this.labelChecked);
    }

    get value() { return this.inputCheckbox.checked ? this.valueChecked : this.valueDefault; }
}