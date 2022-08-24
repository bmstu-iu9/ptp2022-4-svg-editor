// RadioOption - класс опций со всплывающим меню. Роль меню выполняет группа input'ов типа radio, содержащаяся в menuList,
// а отображение меню регулируется input'ом типа checkbox. Содержимое выбранного элемента меню отображается в inputText.

class RadioOption extends BaseOption {
    constructor(inputText, inputCheckbox, label, menuList, attribute = null) {
        super(attribute);

        this.inputText = inputText;
        this.inputCheckbox = inputCheckbox;
        this.label = label;
        this.menuList = menuList;

        this.enableRadioOptionHandlers();
    }

    enableRadioOptionHandlers() {
        this.label.addEventListener('mouseenter', () => {
            this.label.classList.add(this.labelHover);
        });

        this.label.addEventListener('mouseleave', () => {
            this.label.classList.remove(this.labelHover);
        });

        this.inputCheckbox.addEventListener('click', () => {
            this.label.classList.toggle(this.labelChecked);
            this.label.classList.toggle('rounded-bottom-right');
            this.inputText.classList.toggle('rounded-bottom-left');
            this.menuList.classList.toggle('disabled');
        })
    }

    enableLabelStyle(labelHover, labelChecked) {
        this.labelHover = labelHover;
        this.labelChecked = labelChecked;
    }

    // Геттеры и сеттеры для RadioOption будут реализованы позже (вместе с реализацией текста)
    set value(value) {}
    get value() {}
}