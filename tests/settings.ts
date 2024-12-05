import {expect, Locator, Page} from "@playwright/test";

export default class SettingsPage{
    readonly page: Page;
    readonly input_firstname: Locator;
    readonly input_lastname: Locator;
    readonly input_birthdate: Locator;
    readonly button_theme: Locator;
    readonly button_providers: Locator;
    readonly button_disconnect: Locator;
    readonly button_save: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input_firstname = page.locator('input[name="firstname"]');
        this.input_lastname = page.locator('input[name="lastname"]');
        this.input_birthdate = page.locator('input[name="birthdate"]');
        this.button_theme = page.locator('button[name="theme"]');
        this.button_providers = page.locator('button[name="provider"]');
        this.button_disconnect = page.locator('button[name="disconnect"]');
        this.button_save = page.locator('button[name="submit"]');
    }

    async fillDetailsForm(firstname: string, lastname: string, birthdate: string) {
        await this.input_firstname.fill('');
        await this.input_lastname.fill('');
        await this.input_birthdate.fill('');

        await this.input_firstname.fill(firstname);
        await this.input_lastname.fill(lastname);

        const formattedDate = new Date(birthdate).toISOString().split('T')[0];
        await this.input_birthdate.fill(formattedDate);
        await this.button_save.click();

    }

    async GoTo() {
        await this.page.waitForTimeout(1000);
        await this.page.goto('http://localhost:5173/settings');
    }

    async checkDisconnect() {
        await this.button_disconnect.click();
        await expect(this.page).toHaveURL('http://localhost:5173/login');
    }

    async checkTheme() {
        const buttonThemeBeforeClick = await this.button_theme.textContent();
        await this.button_theme.click();
        await this.page.waitForTimeout(1000);
        const buttonThemeAfterClick = await this.button_theme.textContent();
        if(await this.button_theme.textContent() === "Thème clair") {
            const htmlClass = await this.page.evaluate(() => document.documentElement.className);
            expect(htmlClass).toBe('dark');
        } else {
            const htmlClass = await this.page.evaluate(() => document.documentElement.className);
            expect(htmlClass).toBe('');
        }
        expect(buttonThemeBeforeClick).not.toBe(buttonThemeAfterClick);
    }

    async checkDetailsChanges(expectedFirstname: string, expectedLastname: string, expectedBirthdate: string) {
        await this.page.waitForTimeout(1000);
        const firstnameAfter = await this.input_firstname.inputValue();
        const lastnameAfter = await this.input_lastname.inputValue();
        const birthdateAfter = await this.input_birthdate.inputValue();

        expect(firstnameAfter).toBe(expectedFirstname);
        expect(lastnameAfter).toBe(expectedLastname);
        expect(birthdateAfter).toBe(expectedBirthdate);
    }
}