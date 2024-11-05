// CharacterTypeManager.js
export class CharacterTypeManager {
    constructor(checkboxSelectors, settingsContainerSelector) {
        // Store references to the checkboxes and the error message container
        this.checkboxes = checkboxSelectors.map(selector => document.querySelector(selector));
        this.settingsContainer = document.querySelector(settingsContainerSelector);
        this.errorMessageElement = this.settingsContainer.querySelector('.error-message');
        this.errorTimeout = null; // Timeout to automatically hide the error message
        this.init();
    }

    init() {
        // Add change event listeners to each checkbox to enforce at least one selection
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => this.ensureAtLeastOneSelected(event));
        });
    }

    ensureAtLeastOneSelected(event) {
        // Check how many checkboxes are currently selected
        const selectedCheckboxes = this.checkboxes.filter(checkbox => checkbox.checked);

        // If no checkboxes are selected, re-check the one that was just changed
        if (selectedCheckboxes.length === 0) {
            event.target.checked = true;
            this.showError("At least one character type must be selected.");
        }
    }

    showError(message) {
        // Display the error message and make it visible
        this.errorMessageElement.textContent = message;
        this.errorMessageElement.style.visibility = 'visible';

        // Automatically hide the error message after 2 seconds
        this.errorTimeout = setTimeout(() => {
            this.hideError();
        }, 2000);
    }

    hideError() {
        // Clear the error message and hide the element
        this.errorMessageElement.textContent = '';
        this.errorMessageElement.style.visibility = 'hidden';

        // Clear the timeout if it exists
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = null;
        }
    }
}
