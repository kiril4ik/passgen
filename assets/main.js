class CookieManager {
    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    static setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Default to 1 year
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    static deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

// OptionsManager class to manage password generation options and update the UI
class OptionsManager {
    constructor() {
        this.length = parseInt(CookieManager.getCookie('passwordLength')) || 16;
        this.useLowercase = this.getBooleanCookie('useLowercase', true); // Default to true if cookie doesn't exist
        this.useUppercase = this.getBooleanCookie('useUppercase', true);
        this.useNumbers = this.getBooleanCookie('useNumbers', true);
        this.useSymbols = this.getBooleanCookie('useSymbols', false); // Default to false
    }

    // Utility function to get a boolean cookie
    getBooleanCookie(cookieName, defaultValue) {
        const cookieValue = CookieManager.getCookie(cookieName);
        return cookieValue === null ? defaultValue : cookieValue === 'true';
    }

    // Get options
    getOptions() {
         return {
            length: this.length,
            useLowercase: this.useLowercase,
            useUppercase: this.useUppercase,
            useNumbers: this.useNumbers,
            useSymbols: this.useSymbols
        };
    }

    // Update and save options to cookies
    updateSettings() {
        this.length = parseInt(document.getElementById('slider').value);
        this.useLowercase = document.getElementById('lowercase').checked;
        this.useUppercase = document.getElementById('uppercase').checked;
        this.useNumbers = document.getElementById('number').checked;
        this.useSymbols = document.getElementById('symbol').checked;

        // Save the updated settings to cookies
        CookieManager.setCookie('passwordLength', this.length);
        CookieManager.setCookie('useLowercase', this.useLowercase);
        CookieManager.setCookie('useUppercase', this.useUppercase);
        CookieManager.setCookie('useNumbers', this.useNumbers);
        CookieManager.setCookie('useSymbols', this.useSymbols);
    }

    // Update the UI with saved settings
    updateUI(passwordGenerator) {
        const { length, useLowercase, useUppercase, useNumbers, useSymbols } = this.getOptions();

        document.getElementById('slider').value = length;
        document.getElementById('lowercase').checked = useLowercase;
        document.getElementById('uppercase').checked = useUppercase;
        document.getElementById('number').checked = useNumbers;
        document.getElementById('symbol').checked = useSymbols;

        // Generate an initial password based on these settings
        passwordGenerator.generatePassword().then((initialPassword) => {
            document.getElementById('result').textContent = initialPassword;
            document.getElementById('popup-password').textContent = initialPassword;
            document.querySelector('.dots-wait-animate').classList.add('hidden');
        });
    }
}

class PasswordGenerator {
    constructor() {
        this.salt = '9f1d1b9e0b2b573fdd45822cd2d4f7044c6f8962cfb87e912a221d3e2f88c828';

        // Initialize the options manager
        this.optionsManager = new OptionsManager();

        // Load salt from backend
        // this.loadSalt();

        // Load options and update the UI
        this.optionsManager.updateUI(this);
    }

    async loadSalt() {
        try {
            const response = await fetch('salt_generator.php');
            const data = await response.json();
            this.salt = data.salt;
        } catch (error) {
            console.error('Error fetching salt:', error);
        }
    }

    async generatePassword() {
        const { length, useLowercase, useUppercase, useNumbers, useSymbols } = this.optionsManager.getOptions();
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        let availableCharacters = '';

        if (useLowercase) availableCharacters += lowercase;
        if (useUppercase) availableCharacters += uppercase;
        if (useNumbers) availableCharacters += numbers;
        if (useSymbols) availableCharacters += symbols;

        if (!availableCharacters) {
            throw new Error('No character types selected');
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = await this.getSaltedRandomIndex(availableCharacters.length, i);
            password += availableCharacters[randomIndex];
        }

        return password;
    }

    // Get a random index influenced by the salt and iteration index
    async getSaltedRandomIndex(charSetLength, iteration) {
        const randomValue = Math.random();
        const saltedRandomValue = await this.applySaltToRandomValue(randomValue, iteration);

        return Math.floor(saltedRandomValue * charSetLength);;
    }

    // Use salt and iteration to influence the random value
    async applySaltToRandomValue(randomValue, iteration) {
        const saltedInput = this.salt + iteration; // Combine the salt and iteration for each loop
        const hashBuffer = await this.hashString(saltedInput);

        // Convert the hashBuffer to a number and use it to influence the random value
        let saltedInfluence = 0;
        for (let i = 0; i < hashBuffer.length; i++) {
            saltedInfluence += hashBuffer[i];
        }

        // Mix the randomValue with saltedInfluence and return a value between 0 and 1
        return (randomValue + (saltedInfluence % 1000) / 1000) % 1;
    }

    // Hash a string asynchronously using SHA-256 (for more complexity)
    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return new Uint8Array(hashBuffer); // Convert the buffer to a byte array
    }
}

// Initialize the password generator
const passwordGenerator = new PasswordGenerator();

// Event Listeners for settings changes
document.getElementById('slider').addEventListener('input', () => {
    passwordGenerator.optionsManager.updateSettings();
    passwordGenerator.optionsManager.updateUI(passwordGenerator);
});

document.getElementById('lowercase').addEventListener('change', () => {
    passwordGenerator.optionsManager.updateSettings();
    passwordGenerator.optionsManager.updateUI(passwordGenerator);
});

document.getElementById('uppercase').addEventListener('change', () => {
    passwordGenerator.optionsManager.updateSettings();
    passwordGenerator.optionsManager.updateUI(passwordGenerator);
});

document.getElementById('number').addEventListener('change', () => {
    passwordGenerator.optionsManager.updateSettings();
    passwordGenerator.optionsManager.updateUI(passwordGenerator);
});

document.getElementById('symbol').addEventListener('change', () => {
    passwordGenerator.optionsManager.updateSettings();
    passwordGenerator.optionsManager.updateUI(passwordGenerator);
});

document.getElementById('generate').addEventListener('click', () => {
    passwordGenerator.optionsManager.updateSettings();
    passwordGenerator.optionsManager.updateUI(passwordGenerator);
});

// Range Slider Properties.
// Fill : The trailing color that you see when you drag the slider.
// background : Default Range Slider Background
const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)",
};

// Selecting the Range Slider container which will effect the LENGTH property of the password.
const slider = document.querySelector(".range__slider");

// Text which will show the value of the range slider.
const sliderValue = document.querySelector(".length__title");

// Using Event Listener to apply the fill and also change the value of the text.
slider.querySelector("input").addEventListener("input", event => {
    sliderValue.setAttribute("data-length", event.target.value);
    applyFill(event.target);
});
// Selecting the range input and passing it in the applyFill func.
applyFill(slider.querySelector("input"));
// This function is responsible to create the trailing color and setting the fill.
function applyFill(slider) {
    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
    0.1}%)`;
    slider.style.background = bg;
    sliderValue.setAttribute("data-length", slider.value);
}

// Tooltip on length selector
const sliderInput = document.getElementById('slider');
const tooltip = document.getElementById('tooltip');
function updateTooltip() {
    const value = sliderInput.value;
    tooltip.textContent = value;
    const max = sliderInput.max;
    const min = sliderInput.min;
    const percent = (value - min) / (max - min);
    const tooltipOffset = (sliderInput.offsetWidth - 19) * percent;
    tooltip.style.left = `${tooltipOffset+45}px`;
}
sliderInput.addEventListener('input', updateTooltip);
updateTooltip();