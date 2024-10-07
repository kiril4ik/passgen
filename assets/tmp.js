// // Password Generator Functions
// function getRandomLower() {
//     return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
// }
//
// function getRandomUpper() {
//     return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
// }
//
// function getRandomNumber() {
//     return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
// }
//
// function getRandomSymbol() {
//     const symbols = '!@#$%^&*()_+{}[]=<>/,.';
//     return symbols[Math.floor(Math.random() * symbols.length)];
// }
//
// // Generate Password Function
// function generatePassword(length, upper, lower, number, symbol) {
//     let generatedPassword = '';
//     const typesCount = upper + lower + number + symbol;
//     const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);
//
//     if (typesCount === 0) {
//         return 'Please select at least one option';
//     }
//
//     for (let i = 0; i < length; i += typesCount) {
//         typesArr.forEach(type => {
//             const funcName = Object.keys(type)[0];
//             generatedPassword += randomFunc[funcName]();
//         });
//     }
//
//     return generatedPassword.slice(0, length);
// }
//
// // Object of generator functions
// const randomFunc = {
//     upper: getRandomUpper,
//     lower: getRandomLower,
//     number: getRandomNumber,
//     symbol: getRandomSymbol,
// };
//
// // DOM Elements
// const resultEl = document.getElementById('result');
// const lengthEl = document.getElementById('length');
// const uppercaseEl = document.getElementById('uppercase');
// const lowercaseEl = document.getElementById('lowercase');
// const numbersEl = document.getElementById('numbers');
// const symbolsEl = document.getElementById('symbols');
// const generateBtn = document.getElementById('generate');
// const copyBtn = document.getElementById('copy-btn');
//
// // Event Listeners
// generateBtn.addEventListener('click', () => {
//     const length = +lengthEl.value;
//     const hasUpper = uppercaseEl.checked;
//     const hasLower = lowercaseEl.checked;
//     const hasNumber = numbersEl.checked;
//     const hasSymbol = symbolsEl.checked;
//
//     resultEl.value = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
// });
//
// copyBtn.addEventListener('click', () => {
//     const textarea = document.createElement('textarea');
//     const password = resultEl.value;
//
//     if (!password) {
//         return;
//     }
//
//     textarea.value = password;
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand('copy');
//     textarea.remove();
//     alert('Password copied to clipboard!');
// });
//
// // Popup Functionality
// window.addEventListener('load', () => {
//     const popup = document.getElementById('popup');
//     const popupPasswordEl = document.getElementById('popup-password');
//     const generateAnotherBtn = document.getElementById('generate-another');
//     const modifySettingsBtn = document.getElementById('modify-settings');
//
//     // Generate password on load
//     const length = +lengthEl.value;
//     const hasUpper = uppercaseEl.checked;
//     const hasLower = lowercaseEl.checked;
//     const hasNumber = numbersEl.checked;
//     const hasSymbol = symbolsEl.checked;
//
//     const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
//     popupPasswordEl.textContent = password;
//     copyToClipboard(password);
//
//     // Show popup
//     popup.style.display = 'block';
//
//     generateAnotherBtn.addEventListener('click', () => {
//         const newPassword = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
//         popupPasswordEl.textContent = newPassword;
//         copyToClipboard(newPassword);
//     });
//
//     modifySettingsBtn.addEventListener('click', () => {
//         popup.style.display = 'none';
//     });
// });
//
// // Function to copy password to clipboard
// function copyToClipboard(password) {
//     const textarea = document.createElement('textarea');
//
//     if (!password) {
//         return;
//     }
//
//     textarea.value = password;
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand('copy');
//     textarea.remove();
// }
//
// // Mobile Menu Toggle Functionality
// const mobileMenu = document.getElementById('mobile-menu');
// const navMenu = document.querySelector('.nav-menu');
//
// mobileMenu.addEventListener('click', () => {
//     mobileMenu.classList.toggle('active');
//     navMenu.classList.toggle('active');
// });
