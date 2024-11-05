import { OptionsManager } from './OptionsManager.js';
import { PasswordGenerator } from './PasswordGenerator.js';
import { UIManager } from './UIManager.js';
import { PopupManager } from './PopupManager.js';
import { CharacterTypeManager } from './CharacterTypeManager.js';
import { MobileNav } from './MobileNav.js';

class App {
    constructor() {
        new PopupManager('#popup', ['#modify-settings', '#close-popup']);
        new CharacterTypeManager(
            ['#uppercase', '#lowercase', '#number', '#symbol'],
            '.settings'
        );
        new MobileNav('#mobile-menu', '.nav-menu', '.nav-item');
        const optionsManager = new OptionsManager();
        const passwordGenerator = new PasswordGenerator();
        this.uiManager = new UIManager(optionsManager, passwordGenerator);

        this.uiManager.updateUI();
    }
}

new App();
