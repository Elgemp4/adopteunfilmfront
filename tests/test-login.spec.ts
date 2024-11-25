import {test} from '@playwright/test';
import LoginPage from "./login";

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