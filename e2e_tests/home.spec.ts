import { test, expect } from '@playwright/test';

test('Page has correct title', async ({ page }) => {
    await page.goto("/");
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/The happy coding quiz/);
});

test('Toggle game mode has correct default state', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-game-mode');
    await expect(checkbox).not.toBeChecked();
    const label = page.getByTestId('lbl-game-mode');
    await expect(label).toHaveText('Single player');
});

test('Toggle game mode changes label', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-game-mode');
    await checkbox.check();
    const label = page.getByTestId('lbl-game-mode');
    await expect(label).toHaveText('Multiplayer');
});

test('Question mode has correct default state', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-question-mode');
    await expect(checkbox).not.toBeChecked();
    const label = page.getByTestId('lbl-question-mode');
    await expect(label).toHaveText('Free input');
});

test('Question mode changes label', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-question-mode');
    await checkbox.check();
    const label = page.getByTestId('lbl-question-mode');
    await expect(label).toHaveText('API questions');
});

test('If game mode is single player, amount of players input is hidden', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-game-mode');
    await checkbox.uncheck();
    const input = page.getByTestId('input-amount-players');
    await expect(input).not.toBeVisible();
});

test('If game mode is multiplayer, amount of players input is visible', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-game-mode');
    await checkbox.check();
    const input = page.getByTestId('input-amount-players');
    await expect(input).toBeVisible();
});

test('If game mode is multiplayer, amount of players input is required', async ({ page }) => {
    await page.goto("/");
    const checkbox = page.getByTestId('input-game-mode');
    await checkbox.check();
    const button = page.getByTestId('btn-save-configuration');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Please enter the amount of players');
});

test('Amount of questions input is required', async ({ page }) => {
    await page.goto("/");
    const button = page.getByTestId('btn-save-configuration');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Please enter the amount of questions');
});

test('Save configuration navigates to players page', async ({ page }) => {
    await page.goto("/");
    const input = page.getByTestId('input-question-amount');
    await input.fill('5');
    const button = page.getByTestId('btn-save-configuration');
    await button.click();
    const intro = page.getByTestId('intro');
    await expect(intro, 'Could not find intro text of players page').toContainText('Enter all players that will participate in the quiz');
});
