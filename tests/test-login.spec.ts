import {test} from '@playwright/test';
import LoginPage from "./login";
import RegisterPage from "./register";

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