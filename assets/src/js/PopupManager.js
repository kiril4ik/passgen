import { CookieManager } from './CookieManager.js';

export class PopupManager {
    constructor(popupSelector, closeButtonsSelectors) {
        this.popup = document.querySelector(popupSelector);
        this.closeButtons = closeButtonsSelectors.map(selector => document.querySelector(selector));
        this.cookieName = 'popupClosed';

        // Check if the popup should be shown
        if (!this.isPopupClosed()) {
            this.showPopup();
        }

        this.initEventListeners();
        this.initEasyLinkListener();
    }

    initEventListeners() {
        // Add click listeners to all close buttons
        this.closeButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', () => this.closePopup());
            }
        });
    }

    initEasyLinkListener() {
        // Add click listener to #easy link to reset the popup cookie and show popup
        const easyLink = document.querySelector('a[href="#easy"]');
        if (easyLink) {
            easyLink.addEventListener('click', (event) => {
                event.preventDefault();
                this.resetPopup();
            });
        }
    }

    showPopup() {
        this.popup.classList.add('active');
    }

    closePopup() {
        this.popup.classList.remove('active');
        CookieManager.setCookie(this.cookieName, 'true', 365); // Store popup state for 1 year
    }

    resetPopup() {
        CookieManager.setCookie(this.cookieName, 'false', 365);
        this.showPopup();
    }

    isPopupClosed() {
        // Check cookie to determine if the popup has been closed
        return CookieManager.getCookie(this.cookieName) === 'true';
    }
}
