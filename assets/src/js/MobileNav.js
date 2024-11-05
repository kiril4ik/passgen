// MobileNav.js
export class MobileNav {
    constructor(toggleSelector, menuSelector, itemSelector) {
        this.navToggle = document.querySelector(toggleSelector);
        this.navMenu = document.querySelector(menuSelector);
        this.menuItems = document.querySelectorAll(itemSelector);

        if (this.navToggle && this.navMenu) {
            this.init();
        }
    }

    init() {
        // Add click event listener to the toggle button
        this.navToggle.addEventListener('click', () => this.toggleMenu());

        // Add click event listeners to each menu item to close the menu on click
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        // Toggle 'active' class on both the toggle and menu elements
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        // Remove 'active' class from both toggle and menu elements to close the menu
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}
