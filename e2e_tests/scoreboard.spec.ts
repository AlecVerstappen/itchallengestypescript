import { test, expect } from '@playwright/test';
import { completeHomePage, completePlayersPage, completeQuestionsPage, completeQuizPage } from './utils';

test('Page intro is visible when completing previous pages', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    await completeQuizPage(page);
    const intro = page.getByTestId('intro');
    await expect(intro).toContainText('The quiz has ended');
});

test('The restart button is visible when the quiz has ended', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    await completeQuizPage(page);
    const buttonRestart = page.getByTestId('btn-restart-game');
    await expect(buttonRestart).toBeEnabled();
});

test('The players are shown on the scoreboard', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 2, 2);
    await completePlayersPage(page, ['Player 1', 'Player 2']);
    await completeQuestionsPage(page, 2);
    await completeQuizPage(page, 2, 2);
    const scoreboard = page.getByTestId('scoreboard');
    await expect(scoreboard).toContainText('Player 1');
    await expect(scoreboard).toContainText('Player 2');
});

test('When clicking the restart button, the intro text of the homepage is visible', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    await completeQuizPage(page);
    const buttonRestart = page.getByTestId('btn-restart-game');
    await buttonRestart.click();
    const intro = page.getByTestId('intro');
    await expect(intro).toContainText('Welcome to the happy coding quiz');
});