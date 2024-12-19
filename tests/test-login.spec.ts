import { devices, test, expect } from '@playwright/test';
import LoginPage from "./login";
import RegisterPage from "./register";
import MovieTinderPage from "./movies";
import SettingsPage from "./settings";
import GroupsPage from "./groups";
import ProvidersPage from "./providers";

async function loginDetails(loginPage: LoginPage) {
    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");
}

function generateRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Hook exécuté avant chaque test nécessitant une connexion
test.describe('Authenticated Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginDetails(loginPage); // Centralise la connexion
    });

    test('test-like-movie', async ({ page }) => {
        const movieTinderPage = new MovieTinderPage(page);
        await movieTinderPage.checkChangesOnLike();
    });

    test('test-dislike-movie', async ({ page }) => {
        const movieTinderPage = new MovieTinderPage(page);
        await movieTinderPage.checkChangesOnDislike();
    });

    test('test-disconnect', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.goTo();
        await settingsPage.checkDisconnect();
    });

    test('test-theme', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.goTo();
        await settingsPage.checkTheme();
    });

    test('test-details', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.goTo();
        await settingsPage.fillDetailsForm("Seb", "Dek", "2000-01-01");
        await settingsPage.goTo();
        await settingsPage.checkDetailsChanges("Seb", "Dek", "2000-01-01");
    });

    test('test-create-group', async ({ page }) => {
        const groupsPage = new GroupsPage(page);
        await groupsPage.goTo();
        await groupsPage.checkGroupCreation(generateRandomString(10));
    });

    test('test-join-group', async ({ page }) => {
        const groupsPage = new GroupsPage(page);
        await groupsPage.goTo();
        await groupsPage.checkJoinGroup("pkNm1H");
    });

    test('test-provider-selection', async ({ page }) => {
        const providersPage = new ProvidersPage(page);

        await providersPage.goTo();

        const isProviderSelectedInitially = await providersPage.getProviderState();
        console.log('Initial state of Disney Plus:', isProviderSelectedInitially);

        await providersPage.chooseProvider();

        await providersPage.goTo();

        const isProviderSelectedAfter = await providersPage.getProviderState();
        console.log('Final state of Disney Plus:', isProviderSelectedAfter);

        if (isProviderSelectedInitially) {
            expect(isProviderSelectedAfter).toBe(false);
        } else {
            expect(isProviderSelectedAfter).toBe(true);
        }
    });
});

// Tests sans connexion préalable
test('test-login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "0123");
    await loginPage.checkCorrectLogin();
});

test('test-login-fail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login("sebdek7@gmail.com", "012");
    await loginPage.checkIncorrectLogin();
});

test('test-register', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const email = `${generateRandomString(10)}@example.com`;
    const password = generateRandomString(10);

    await loginPage.goTo();
    await loginPage.register(email, password);
    await registerPage.registerForm("Seb", "Dek", "2000-01-01");
    await registerPage.checkCorrectRegister();
});

test('test-register-fail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const email = `${generateRandomString(10)}@example.com`;
    const password = generateRandomString(10);

    await loginPage.goTo();
    await loginPage.register(email, password);
    await registerPage.registerForm("", "Dek", "2000-01-01");
    await registerPage.checkIncorrectRegister();
});
