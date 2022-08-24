// List - класс элементов всплывающиего меню.

class List extends Item {
    constructor(menu, inputRadio, label, span) {
        super(menu, inputRadio, label, span);

        this.enableListHandlers();
    }

    enableListHandlers() {
        this.inputRadio.addEventListener('click', () => {
            this.menu.item = this;
            this.menu.content.value = this.fill.innerHTML;
        })
    }
}