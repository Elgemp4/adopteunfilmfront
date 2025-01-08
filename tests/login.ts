import {expect, Locator, Page} from '@playwright/test';

export default class LoginPage {
    readonly page: Page;
    readonly input_email: Locator;
    readonly input_password: Locator;
    readonly button_login: Locator;
    readonly button_register: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input_email = page.locator('input[name="email"]');
        this.input_password = page.locator('input[name="password"]');
        this.button_login = page.locator('button[name="login"]');
        this.button_register = page.locator('button[name="register"]');
    }

    async goTo() {
        await this.page.goto('http://localhost:5173/login');
    }

    async login(email: string, password: string) {
        await this.input_email.fill(email);
        await this.input_password.fill(password);
        await this.button_login.click();
    }

    async register(email: string, password: string) {
        await this.input_email.fill(email);
        await this.input_password.fill(password);
        await this.button_register.click();
    }

    async checkCorrectLogin() {
        await expect(this.page).toHaveURL('http://localhost:5173/movies');
    }

    async checkIncorrectLogin() {
        this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Erreur de connexion. Vérifiez votre email et votre mot de passe.');
            await dialog.dismiss();
        });
    }
}