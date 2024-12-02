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
        return {
            title: await this.movie_title.textContent(),
            description: await this.movie_description.textContent(),
            date: await this.movie_date.textContent(),
            rating: await this.movie_rating.textContent(),
            votes: await this.movie_votes.textContent(),
            genre: await this.movie_genre.textContent(),
            image: await this.movie_image.textContent(),
        };
    }

    async checkChangesOnLike() {
        const initialDetails = await this.captureMovieDetails();
        await this.like();
        const newDetails = await this.captureMovieDetails();

        expect(initialDetails.title).not.toBe(newDetails.title);
        expect(initialDetails.description).not.toBe(newDetails.description);
        expect(initialDetails.date).not.toBe(newDetails.date);
        expect(initialDetails.rating).not.toBe(newDetails.rating);
        expect(initialDetails.votes).not.toBe(newDetails.votes);
        expect(initialDetails.genre).not.toBe(newDetails.genre);
        expect(initialDetails.image).not.toBe(newDetails.image);
    }

    async checkChangesOnDislike() {
        const initialDetails = await this.captureMovieDetails();
        await this.dislike();
        const newDetails = await this.captureMovieDetails();

        expect(initialDetails.title).not.toBe(newDetails.title);
        expect(initialDetails.description).not.toBe(newDetails.description);
        expect(initialDetails.date).not.toBe(newDetails.date);
        expect(initialDetails.rating).not.toBe(newDetails.rating);
        expect(initialDetails.votes).not.toBe(newDetails.votes);
        expect(initialDetails.genre).not.toBe(newDetails.genre);
        expect(initialDetails.image).not.toBe(newDetails.image);
    }
    
}