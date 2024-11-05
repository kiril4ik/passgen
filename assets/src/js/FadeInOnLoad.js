export class FadeInOnLoad {
    constructor(selector, transitionDuration = '1s', easing = 'ease-in') {
        this.element = document.querySelector(selector);
        this.transitionDuration = transitionDuration;
        this.easing = easing;

        if (this.element) {
            this.init();
        }
    }

    init() {
        // Set initial styles for the fade-in effect
        this.element.style.opacity = '0';
        this.element.style.transition = `opacity ${this.transitionDuration} ${this.easing}`;

        // Add event listener for DOMContentLoaded to trigger fade-in
        document.addEventListener("DOMContentLoaded", () => {
            this.element.classList.add('fade-in');
            this.element.style.opacity = '1'; // Trigger the fade-in effect
        });
    }
}
