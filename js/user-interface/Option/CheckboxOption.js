// CheckboxOption - класс опций, содержащий input типа checkbox как основной и единственный источник ввода.

class CheckboxOption extends BaseOption {
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

    enableLabelStyle(labelHover, labelChecked) {
        this.labelHover = labelHover;
        this.labelChecked = labelChecked;
    }

    set value(value) { this.inputCheckbox.checked = value; }
    get value() { return this.inputCheckbox.checked; }
}