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

        this.button.addEventListener('mousedown', () => {
            this.button.classList.add(this.active);
            this.fuctionality();

            const buttonOnMouseUp = () => {
                this.button.classList.remove(this.active)
                document.removeEventListener('mouseup', buttonOnMouseUp);
            }

            document.addEventListener('mouseup', buttonOnMouseUp);
        })
    }

    enableButtonStyle(hover, active) {
        this.hover = hover;
        this.active = active;
    }
}