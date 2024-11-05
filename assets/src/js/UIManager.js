// UIManager.js
import { TooltipManager } from './TooltipManager.js';
import { FadeInOnLoad } from './FadeInOnLoad.js';
import { CopyButtonManager } from './CopyButtonManager.js';

export class UIManager {
    constructor(optionsManager, passwordGenerator) {
        this.optionsManager = optionsManager;
        this.passwordGenerator = passwordGenerator;

        // Initialize TooltipManager
        this.tooltipManager = new TooltipManager(
            document.getElementById('slider'),
            document.getElementById('tooltip')
        );

        // Initialize FadeInOnLoad
        new FadeInOnLoad('#password-generator .container');

        // Initialize CopyButtonManager
        this.copyButtonManager = new CopyButtonManager('#copy-btn', '#result');

        this.initEventListeners();
    }

    async updateUI() {
        const options = this.optionsManager.getOptions();

        // Update slider and checkbox values based on saved options
        const slider = document.getElementById('slider');
        slider.value = options.length;
        document.getElementById('lowercase').checked = options.useLowercase;
        document.getElementById('uppercase').checked = options.useUppercase;
        document.getElementById('number').checked = options.useNumbers;
        document.getElementById('symbol').checked = options.useSymbols;

        // Update tooltip position and slider fill
        this.tooltipManager.updateTooltipPosition();
        this.applyFill(slider);

        // Generate a password based on the loaded options and update the display
        const password = await this.passwordGenerator.generatePassword(options);
        document.getElementById('result').textContent = password;
        document.getElementById('popup-password').textContent = password;

        // Highlight and copy the password to the clipboard
        this.copyButtonManager.highlightButton();
        this.copyButtonManager.copyPassword();

        document.querySelector('.dots-wait-animate').classList.add('hidden');
    }

    initEventListeners() {
        const slider = document.getElementById('slider');
        slider.addEventListener('input', () => {
            this.updateSettings();
            this.applyFill(slider); // Apply fill styling on slider input change
        });

        document.getElementById('lowercase').addEventListener('change', () => this.updateSettings());
        document.getElementById('uppercase').addEventListener('change', () => this.updateSettings());
        document.getElementById('number').addEventListener('change', () => this.updateSettings());
        document.getElementById('symbol').addEventListener('change', () => this.updateSettings());
        document.getElementById('generate').addEventListener('click', () => this.updateSettings());
        document.getElementById('generate-another').addEventListener('click', () => this.updateSettings());

        this.initSliderStyling();
    }

    updateSettings() {
        const slider = document.getElementById('slider');
        const length = parseInt(slider.value);
        const useLowercase = document.getElementById('lowercase').checked;
        const useUppercase = document.getElementById('uppercase').checked;
        const useNumbers = document.getElementById('number').checked;
        const useSymbols = document.getElementById('symbol').checked;

        this.optionsManager.updateSettings({ length, useLowercase, useUppercase, useNumbers, useSymbols });
        this.updateUI(); // Trigger UI update, including password generation and copying
    }

    initSliderStyling() {
        const slider = document.querySelector('.range__slider');
        const sliderValue = document.querySelector('.length__title');

        // Event listener for updating fill on input change
        slider.querySelector('input').addEventListener('input', event => {
            sliderValue.setAttribute('data-length', event.target.value);
            this.applyFill(event.target);
        });

        // Initial fill application
        this.applyFill(slider.querySelector('input'));
    }

    applyFill(slider) {
        const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
        const bg = `linear-gradient(90deg, #0B1EDF ${percentage}%, rgba(255, 255, 255, 0.214) ${percentage + 0.1}%)`;
        slider.style.background = bg;
    }
}
