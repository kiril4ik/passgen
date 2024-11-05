// CopyButtonManager.js
export class CopyButtonManager {
    constructor(buttonSelector, passwordSelector, highlightDuration = 1000) {
        this.getPermissions();
        this.button = document.querySelector(buttonSelector);
        this.passwordElement = document.querySelector(passwordSelector);
        this.highlightDuration = highlightDuration;

        if (this.button && this.passwordElement) {
            this.copyPassword = this.debounce(this.copyPassword.bind(this), 400); // Adjust delay as needed
            this.init();
        }
    }

    init() {
        // Add click event listener to the button
        this.button.addEventListener('click', () => {
            this.highlightButton();
            this.copyPassword();
        });
    }

    highlightButton() {
        this.button.classList.add('highlight');
        setTimeout(() => this.button.classList.remove('highlight'), this.highlightDuration);
    }

    async copyPassword() {
        const password = this.passwordElement.textContent;

        try {
            // Try the modern Clipboard API
            await navigator.clipboard.writeText(password);
            console.log('Password copied to clipboard');
        } catch (err) {
            console.warn('Clipboard API failed. Falling back to execCommand:', err);
            this.fallbackCopy(password);
        }
    }

    fallbackCopy(password) {
        // Fallback copy using a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = password;

        // Append the textarea to the body, select its content, and copy
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Password copied to clipboard using fallback');
        } catch (error) {
            console.error('Fallback copy failed:', error);
        }

        // Remove the temporary textarea from the DOM
        document.body.removeChild(textarea);
    }

    debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async getPermissions() {
        try {
            // Check if permissions API is available and clipboard permission is granted or promptable
            if (navigator.permissions) {
                const readPermission = await navigator.permissions.query({ name: "clipboard-read" });
                if (readPermission.state !== "granted" && readPermission.state !== "prompt") {
                    await navigator.clipboard.readText();
                }
            }
        } catch {}
    }
}
