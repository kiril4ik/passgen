import { CookieManager } from './CookieManager.js';

export class OptionsManager {
    constructor() {
        this.length = parseInt(CookieManager.getCookie('passwordLength')) || 16;
        this.useLowercase = this.getBooleanCookie('useLowercase', true);
        this.useUppercase = this.getBooleanCookie('useUppercase', true);
        this.useNumbers = this.getBooleanCookie('useNumbers', true);
        this.useSymbols = this.getBooleanCookie('useSymbols', false);
    }

    getBooleanCookie(cookieName, defaultValue) {
        const cookieValue = CookieManager.getCookie(cookieName);
        return cookieValue === null ? defaultValue : cookieValue === 'true';
    }

    getOptions() {
        return {
            length: this.length,
            useLowercase: this.useLowercase,
            useUppercase: this.useUppercase,
            useNumbers: this.useNumbers,
            useSymbols: this.useSymbols
        };
    }

    updateSettings({ length, useLowercase, useUppercase, useNumbers, useSymbols }) {
        this.length = length;
        this.useLowercase = useLowercase;
        this.useUppercase = useUppercase;
        this.useNumbers = useNumbers;
        this.useSymbols = useSymbols;

        CookieManager.setCookie('passwordLength', this.length);
        CookieManager.setCookie('useLowercase', this.useLowercase);
        CookieManager.setCookie('useUppercase', this.useUppercase);
        CookieManager.setCookie('useNumbers', this.useNumbers);
        CookieManager.setCookie('useSymbols', this.useSymbols);
    }
}
