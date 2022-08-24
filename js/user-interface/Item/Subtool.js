// Subtool - класс подынструментов меню toolbar.

class Subtool extends Item {
    constructor(menu, inputRadio, label, img) {
        super(menu, inputRadio, label, img);

        this.create = null;
        this.edit = null;

        this.enableSubtoolHandlers();
    }

    enableSubtoolHandlers() {
        this.inputRadio.addEventListener('click', () => {
            if (this.menu.item === this) {
                return;
            }

            this.menu.content.classList.add('disabled');
            this.create.content.classList.remove('disabled');
            this.menu.parent.fill.src = this.fill.src;

            this.menu.item = this;
            this.menu.content = this.create.content;
        });
    }
}