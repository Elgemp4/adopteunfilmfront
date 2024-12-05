import {test} from '@playwright/test';
import LoginPage from "./login";
import RegisterPage from "./register";
import MovieTinderPage from "./movies";
import SettingsPage from "./settings";

function generateRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

test('test-login', async ({page}) => {
const loginPage = new LoginPage(page);

await loginPage.goTo();
await loginPage.login("sebdek7@gmail.com", "0123");
await loginPage.checkCorrectLogin();
});

test('test-login-fail', async ({page}) => {
const loginPage = new LoginPage(page);

await loginPage.goTo();
await loginPage.login("sebdek7@gmail.com", "012");
await loginPage.checkIncorrectLogin();
});

test('test-register', async ({page}) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const email = `${generateRandomString(10)}@example.com`;
    const password = generateRandomString(10);

    await loginPage.goTo();
    await loginPage.register(email, password);
    await registerPage.registerForm("Seb", "Dek", "2000-01-01");
    await registerPage.checkCorrectRegister();
});

test('test-register-fail', async ({page}) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const email = `${generateRandomString(10)}@example.com`;
    const password = generateRandomString(10);

    await loginPage.goTo();
    await loginPage.register(email, password);
    await registerPage.registerForm("", "Dek", "2000-01-01");
    await registerPage.checkIncorrectRegister();
});

test('test-like-movie', async ({page}) => {
    const loginPage = new LoginPage(page);
    const movieTinderPage = new MovieTinderPage(page);

    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");
    await movieTinderPage.checkChangesOnLike();

});

test('test-dislike-movie', async ({page}) => {
    const loginPage = new LoginPage(page);
    const movieTinderPage = new MovieTinderPage(page);

    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");
    await movieTinderPage.checkChangesOnDislike();
});

test('test-disconnect', async ({page}) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");

    await settingsPage.GoTo();
    await settingsPage.checkDisconnect();

});

test('test-theme', async ({page}) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");

    await settingsPage.GoTo();
    await settingsPage.checkTheme();
});

test('test-details', async ({page}) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");

    await settingsPage.GoTo();
    await settingsPage.fillDetailsForm("Seb", "Dek", "2000-01-01");
    await settingsPage.GoTo();
    await settingsPage.checkDetailsChanges("Seb", "Dek", "2000-01-01");
});