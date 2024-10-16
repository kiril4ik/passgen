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
//
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
