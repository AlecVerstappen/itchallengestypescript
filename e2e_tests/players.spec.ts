import { test, expect } from '@playwright/test';
import { completeHomePage } from './utils';

test('Page has correct title', async ({ page }) => {
    await page.goto("/");
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/The happy coding quiz/);
});

test('Add player button is enabled by default', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const button = page.getByTestId('btn-add-player');
    await expect(button).toBeEnabled();
});

test('Player list is empty by default for single player', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const title = page.getByTestId('title-player-list');
    const list = page.getByTestId('player-list');
    await expect.soft(list).toContainText('No players added');
    await expect.soft(title).toContainText('Player list (0/1)');
});

test('Player list is empty by default for multiplayer', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 2);
    const title = page.getByTestId('title-player-list');
    const list = page.getByTestId('player-list');
    await expect.soft(list).toContainText('No players added');
    await expect.soft(title).toContainText('Player list (0/2)');
});

test('Adding an empty player name should not add a player', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const button = page.getByTestId('btn-add-player');
    await button.click();
    const list = page.getByTestId('player-list');
    await expect(list).toContainText('No players added');
});

test('Adding an empty player name should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const button = page.getByTestId('btn-add-player');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Please enter a player name');
});

test('Button to go to questions is disabled by default', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const button = page.getByTestId('btn-go-to-questions');
    await expect(button).toBeDisabled();
});

test('Adding a player should add the player to the list', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const input = page.getByTestId('input-player');
    await input.fill('John Doe');
    const button = page.getByTestId('btn-add-player');
    await button.click();
    const list = page.getByTestId('player-list');
    await expect(list).toContainText('John Doe');
});

test('Adding a player that already exists should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 2);
    const input = page.getByTestId('input-player');
    await input.fill('John Doe');
    const button = page.getByTestId('btn-add-player');
    await button.click();
    await input.fill('John Doe');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Player name must be unique');
});

test('Adding a player should update the title of the player list', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    const input = page.getByTestId('input-player');
    await input.fill('John Doe');
    const button = page.getByTestId('btn-add-player');
    await button.click();
    const title = page.getByTestId('title-player-list');
    await expect(title).toContainText('Player list (1/1)');
});

test('When player list is complete, button to go to questions is enabled', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 1);
    const input = page.getByTestId('input-player');
    await input.fill('John Doe');
    const button = page.getByTestId('btn-add-player');
    await button.click();
    const goToQuestions = page.getByTestId('btn-go-to-questions');
    await expect(goToQuestions).toBeEnabled();
});

test('When player list is complete, button to go to questions navigates to questions page', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 1);
    const input = page.getByTestId('input-player');
    await input.fill('John Doe');
    const button = page.getByTestId('btn-add-player');
    await button.click();
    const goToQuestions = page.getByTestId('btn-go-to-questions');
    await goToQuestions.click();
    const intro = page.getByTestId('intro');
    await expect(intro, 'Could not find intro text of questions page').toContainText('A quiz can not start without questions');
});