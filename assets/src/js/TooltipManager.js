export class TooltipManager {
    constructor(sliderElement, tooltipElement) {
        this.slider = sliderElement;
        this.tooltip = tooltipElement;
        this.init();
    }

    init() {
        this.updateTooltipPosition(); // Set initial tooltip position

        // Listen for slider input changes to update tooltip position
        this.slider.addEventListener('input', () => this.updateTooltipPosition());
    }

    // Public method to update tooltip position based on current slider value
    updateTooltipPosition() {
        const value = this.slider.value;
        this.tooltip.textContent = value;

        const max = this.slider.max;
        const min = this.slider.min;
        const percent = (value - min) / (max - min);
        const tooltipOffset = (this.slider.offsetWidth - 19) * percent;

        this.tooltip.style.left = `${tooltipOffset + 45}px`; // Adjust based on your layout
    }
}
