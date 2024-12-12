import {expect, Locator, Page} from "@playwright/test";

export default class GroupsPage{
    readonly page: Page;
    readonly input_groupName: Locator;
    readonly input_groupCode: Locator;
    readonly button_createGroup: Locator;
    readonly button_joinGroup: Locator;


    constructor(page: Page) {
        this.page = page;
        this.input_groupName = page.locator('input[name="groupName"]');
        this.input_groupCode = page.locator('input[name="groupCode"]');
        this.button_createGroup = page.locator('button[name="createGroup"]');
        this.button_joinGroup = page.locator('button[name="joinGroup"]');
    }

    async goTo() {
        await this.page.waitForTimeout(1000);
        await this.page.goto('http://localhost:5173/groups');
    }


    async checkJoinGroup(groupCode: string) {
        await this.button_joinGroup.click();
        await this.input_groupCode.fill(groupCode);
        await this.button_joinGroup.click();
        this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Groupe rejoint avec succès');
            await dialog.dismiss();
        });
        await expect(this.page).toHaveURL('http://localhost:5173/groups');
    }

    async checkGroupCreation(groupName: string) {
        await this.button_createGroup.click();
        await this.input_groupName.fill(groupName);
        await this.button_createGroup.click();
        this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Groupe créé avec succès');
            await dialog.dismiss();
        });
        await expect(this.page).toHaveURL('http://localhost:5173/groups');
    }
}