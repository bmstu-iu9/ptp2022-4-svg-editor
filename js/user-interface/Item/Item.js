// Item - класс объектов меню.

class Item {
    constructor(menu, inputRadio, label, fill) {
        this.menu = menu;

        this.inputRadio = inputRadio;
        this.label = label;
        this.fill = fill;

        this.enableItemHandlers();
    }

    enableItemHandlers() {
        this.label.addEventListener('mouseenter', () => {
            this.label.classList.add(this.menu.labelHover);
        });

        this.label.addEventListener('mouseleave', () => {
            this.label.classList.remove(this.menu.labelHover);
        })

        this.inputRadio.addEventListener('click', () => {
            if (this.menu.item !== this) {
                this.menu.item.label.classList.remove(this.menu.labelChecked);
                this.menu.item.fill.classList.remove(this.menu.fillChecked);

                this.label.classList.add(this.menu.labelChecked);
                this.fill.classList.add(this.menu.fillChecked);
            }
        });
    }
}