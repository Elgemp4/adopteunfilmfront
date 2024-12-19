import { expect, Locator, Page } from "@playwright/test";

export default class ProvidersPage {
    readonly page: Page;
    readonly img_provider_disney: Locator;
    readonly provider_card_disney: Locator;
    readonly button_validate: Locator;

    constructor(page: Page) {
        this.page = page;

        // Sélecteur pour le logo Disney Plus
        this.img_provider_disney = page.locator('img[alt="Disney Plus logo"]');

        // Sélecteur pour le parent "provider-card" de Disney Plus
        this.provider_card_disney = page.locator('.provider-card', { has: this.img_provider_disney });

        // Sélecteur pour le bouton de validation
        this.button_validate = page.locator('button[name="validate"]');
    }

    async goTo() {
        // Naviguez vers la page des providers et attendez qu'elle se charge
        await this.page.waitForTimeout(1000);
        await this.page.goto('http://localhost:5173/providers');
        await this.page.waitForSelector('.provider-card', { state: 'visible' });
    }

    async getProviderState(): Promise<boolean> {
        // Vérifiez si la classe "selected" est présente sur le parent "provider-card"
        return await this.provider_card_disney.evaluate((element) =>
            element.classList.contains('selected')
        );
    }

    async chooseProvider() {
        // Cliquez sur le logo Disney Plus
        await this.img_provider_disney.waitFor({ state: 'visible' });
        await this.img_provider_disney.click({ force: true });

        // Cliquez sur le bouton de validation
        await this.button_validate.waitFor({ state: 'visible' });
        await this.button_validate.click();
    }
}
