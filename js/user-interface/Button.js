class Button {
    constructor(button, functionality) {
        this.button = button;
        this.fuctionality = functionality;

        this.enableHandlers();
    }

    enableHandlers() {
        this.button.addEventListener('mouseenter', () => {
            this.button.classList.add(this.hover);
        })

        this.button.addEventListener('mouseleave', () => {
            this.button.classList.remove(this.hover);
        })

        this.button.addEventListener('click', () => {
            this.fuctionality();
        })
    }

    enableButtonStyle(hover) {
        this.hover = hover;
    }
}