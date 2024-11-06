export class PasswordGenerator {
    constructor(salt = '9f1d1b9e0b2b573fdd45822cd2d4f7044c6f8962cfb87e912a221d3e2f88c828') {
        this.salt = salt;
        this.loadSalt();
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

    async generatePassword(options) {
        const { length, useLowercase, useUppercase, useNumbers, useSymbols } = options;
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        let availableCharacters = '';
        if (useLowercase) availableCharacters += lowercase;
        if (useUppercase) availableCharacters += uppercase;
        if (useNumbers) availableCharacters += numbers;
        if (useSymbols) availableCharacters += symbols;

        if (!availableCharacters) throw new Error('No character types selected');

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = await this.getSaltedRandomIndex(availableCharacters.length, i);
            password += availableCharacters[randomIndex];
        }

        return password;
    }

    async getSaltedRandomIndex(charSetLength, iteration) {
        const randomValue = Math.random();
        const saltedRandomValue = await this.applySaltToRandomValue(randomValue, iteration);

        return Math.floor(saltedRandomValue * charSetLength);
    }

    async applySaltToRandomValue(randomValue, iteration) {
        const saltedInput = this.salt + iteration;
        const hashBuffer = await this.hashString(saltedInput);

        let saltedInfluence = 0;
        for (let i = 0; i < hashBuffer.length; i++) {
            saltedInfluence += hashBuffer[i];
        }

        return (randomValue + (saltedInfluence % 1000) / 1000) % 1;
    }


    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return new Uint8Array(hashBuffer);
    }
}
