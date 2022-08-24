// Tool - класс основых инструментов, отображающихся в меню toolbar'а.

class Tool extends Item {
    constructor(menu, inputRadio, label, img) {
        super(menu, inputRadio, label, img);

        this.create = null;
        this.edit = null;

        this.enableToolHandlers();
    }

    enableToolHandlers() {
        this.inputRadio.addEventListener('click', () => {
            if (this.menu.item === this) {
                if (this.menu.content) {
                    this.menu.content.classList.add('disabled');
                    this.menu.content = null;
                } else if (this.create) {
                    this.create.content.classList.remove('disabled')
                    this.menu.content = this.create.content;
                }
            } else {
                if (this.menu.content) {
                    this.menu.content.classList.add('disabled');
                    this.menu.content = null;
                }

                if (this.create) {
                    this.create.content.classList.remove('disabled');
                    this.menu.content = this.create.content;
                }

                this.menu.item = this;
            }

            if (Figure.selected) {
                Figure.selected.removeSelection();
                Figure.selected = null;
            }
        });
    }
}