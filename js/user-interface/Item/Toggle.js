// Toggle - класс переключателей видимости вкладок опций инструментов.

class Toggle extends Item {
    constructor(menu, inputRadio, label, span) {
        super(menu, inputRadio, label, span);

        this.options = null;

        this.enableToggleHandlers();
    }

    enableToggleHandlers() {
        this.inputRadio.addEventListener('click', () => {
            if (this.menu.item === this) {
                return;
            }

            this.menu.content.classList.add('disabled');
            this.options.classList.remove('disabled');

            this.menu.item = this;
            this.menu.content = this.options;
        })
    }
}