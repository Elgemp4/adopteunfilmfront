import {expect, Locator, Page} from '@playwright/test';

export default class RegisterPage {
    readonly page: Page;
    readonly input_firstname: Locator;
    readonly input_lastname: Locator;
    readonly input_birthdate: Locator;
    readonly button_next: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input_firstname = page.locator('input[name="firstname"]');
        this.input_lastname = page.locator('input[name="lastname"]');
        this.input_birthdate = page.locator('input[name="birthdate"]');
        this.button_next = page.locator('button[name="next"]');
    }

    async registerForm(firstname: string, lastname: string, birthdate: string) {
        await this.input_firstname.fill(firstname);
        await this.input_lastname.fill(lastname);

        const formattedDate = new Date(birthdate).toISOString().split('T')[0];
        await this.input_birthdate.fill(formattedDate);
        await this.button_next.click();
    }

    async checkCorrectRegister() {
        await expect(this.page).toHaveURL('http://localhost:5173/providers');
    }

    async checkIncorrectRegister() {
        const isValid = await this.input_firstname.evaluate(input => (input as HTMLInputElement).checkValidity());
        expect(isValid).toBe(false);
        const validationMessage = await this.input_firstname.evaluate(input => (input as HTMLInputElement).validationMessage);
        expect(validationMessage === 'Please fill out this field.' || validationMessage === 'Fill out this field').toBe(true);
    }
}