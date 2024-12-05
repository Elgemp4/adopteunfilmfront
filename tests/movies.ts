import {expect, Locator, Page} from '@playwright/test';

export default class MovieTinderPage {
    readonly page: Page;
    readonly like_button: Locator;
    readonly dislike_button: Locator;
    readonly seen_button: Locator;
    readonly movie_title: Locator;
    readonly movie_description: Locator;
    readonly movie_image: Locator;
    readonly movie_date: Locator;
    readonly movie_rating: Locator;
    readonly movie_votes: Locator;
    readonly movie_genre: Locator;

    constructor(page: Page) {
        this.page = page;
        this.like_button = page.locator('button[class*="button--like"]');
        this.dislike_button = page.locator('button[class*="button--dislike"]');
        this.seen_button = page.locator('button[class*="button--seen"]');
        this.movie_title = page.locator('h3[class="movie-info__title"]');
        this.movie_description = page.locator('p[class="movie-info__description"]');
        this.movie_date = page.locator('html > body > div > div > div > div > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(1) > p');
        this.movie_rating = page.locator('html > body > div > div > div > div > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(2) > p');
        this.movie_votes = page.locator('html > body > div > div > div > div > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(3) > p');
        this.movie_genre= page.locator('div[class="genre-tags"]');
        this.movie_image = page.locator('div[class="movie-image"]');
    }

    async goTo() {
        await this.page.goto('http://localhost:5173/movies');
    }

    async like() {
        await this.like_button.click();
    }

    async dislike() {
        await this.dislike_button.click();
    }

    async seen() {
        await this.seen_button.click();
    }

    async captureMovieDetails() {
        await this.movie_title.waitFor({ state: 'visible' });

        const isDescriptionVisible = await this.movie_description.isVisible();
        const description = isDescriptionVisible ? await this.movie_description.textContent() : 'No description available';

        await this.movie_date.waitFor({ state: 'visible' });
        await this.movie_rating.waitFor({ state: 'visible' });
        await this.movie_votes.waitFor({ state: 'visible' });
        await this.movie_genre.waitFor({ state: 'visible' });
        await this.movie_image.waitFor({ state: 'visible' });

        return {
            title: await this.movie_title.textContent(),
            description: description,
            date: await this.movie_date.textContent(),
            rating: await this.movie_rating.textContent(),
            votes: await this.movie_votes.textContent(),
            genre: await this.movie_genre.textContent(),
            image: await this.movie_image.getAttribute('src'),
        };
    }

    async checkChangesOnLike() {
        const initialDetails = await this.captureMovieDetails();
        await this.like();
        await this.page.waitForTimeout(1000);
        const newDetails = await this.captureMovieDetails();

        expect(initialDetails).not.toEqual(newDetails);
    }

    async checkChangesOnDislike() {
        const initialDetails = await this.captureMovieDetails();
        await this.dislike();
        await this.page.waitForTimeout(1000);
        const newDetails = await this.captureMovieDetails();

        expect(initialDetails).not.toEqual(newDetails);
    }

}