import { expect, Locator, Page } from "@playwright/test";

export default class MovieSuggestion{
    readonly page: Page;
    readonly movieSuggestions : Locator;

    constructor(page : Page) {
        this.page = page;
        this.movieSuggestions = page.locator(".movie-suggestions");
    }

    async goTo(){
        await this.page.waitForTimeout(1000);
        await this.page.goto('http://localhost:5173/groups/1/suggestions/1,2');
    }

    async checkIfContainsCards(){
        await this.movieSuggestions.waitFor({state: 'visible'});
        const childrens = await this.movieSuggestions.locator(':scope > *').count();
        await this.page.waitForTimeout(500);
        expect(childrens).toBeGreaterThan(0);
    }

    async checkHasSeen() {
        const firstChild = this.movieSuggestions.locator(':scope > *').first();
        const seenButton = firstChild.locator('.button.seen');
        const initial_key = await firstChild.getAttribute('id');
        await seenButton.click();
        await this.page.waitForSelector( `#${initial_key}`, {state: 'detached'});
        const final_key = await firstChild.getAttribute('id');

        expect(initial_key).not.toBe(final_key);
    }
}