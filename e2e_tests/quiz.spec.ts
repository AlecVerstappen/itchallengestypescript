import { test, expect } from '@playwright/test';
import { completeHomePage, completePlayersPage, completeQuestionsPage } from './utils';

test('Page intro is visible when completing previous pages', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    const intro = page.getByTestId('intro');
    await expect(intro).toContainText('Try to score as many points as possible');
});

test('Current player name is visible when quiz has started', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    const currentPlayerName = page.getByTestId('current-player-name');
    await expect(currentPlayerName).toContainText('Player 1');
});

test('Question is visible when quiz has started', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    const question = page.getByTestId('question');
    await expect(question).toContainText('This is question number 1');
});

test('All possible answers are visible when quiz has started', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page);
    const answerContainer = page.getByTestId('answer-container');
    await expect(answerContainer).toContainText('Correct answer');
    await expect(answerContainer).toContainText('Wrong answer 1');
    await expect(answerContainer).toContainText('Wrong answer 2');
    await expect(answerContainer).toContainText('Wrong answer 3');
});

test('When selecting an answer for the first question and submitting, the next question is displayed', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 2);
    await completePlayersPage(page, ['Player 1']);
    await completeQuestionsPage(page, 2);
    const answerContainer = page.getByTestId('answer-container');
    // Select any answer, which is an input type radio in the answer container
    const inputAnswer = await answerContainer.locator('input[type="radio"]').all();
    // Select the first answer
    await inputAnswer[0].check();
    const buttonSubmitAnswer = page.getByTestId('btn-submit-answer');
    await buttonSubmitAnswer.click();
    const question = page.getByTestId('question');
    await expect(question).toContainText('This is question number 2');
});

test('When playing a multiplayer game, the second player is displayed after completing all questions for the first player', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 2, 1);
    await completePlayersPage(page, ['Player 1', 'Player 2']);
    await completeQuestionsPage(page);
    const answerContainer = page.getByTestId('answer-container');
    const inputAnswer = await answerContainer.locator('input[type="radio"]').all();
    await inputAnswer[0].check();
    const buttonSubmitAnswer = page.getByTestId('btn-submit-answer');
    await buttonSubmitAnswer.click();
    const currentPlayerName = page.getByTestId('current-player-name');
    await expect(currentPlayerName).toContainText('Player 2');
});

test('When playing a multiplayer game, the first question is is displayed for the second player when the first player has finished all questions', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 2, 1);
    await completePlayersPage(page, ['Player 1', 'Player 2']);
    await completeQuestionsPage(page);
    const answerContainer = page.getByTestId('answer-container');
    const inputAnswer = await answerContainer.locator('input[type="radio"]').all();
    await inputAnswer[0].check();
    const buttonSubmitAnswer = page.getByTestId('btn-submit-answer');
    await buttonSubmitAnswer.click();
    const question = page.getByTestId('question');
    await expect(question).toContainText('This is question number 1');
});

test('When all questions and players have been completed, the scoreboard is displayed', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 2, 1);
    await completePlayersPage(page, ['Player 1', 'Player 2']);
    await completeQuestionsPage(page);
    const answerContainer = page.getByTestId('answer-container');
    const inputAnswer = await answerContainer.locator('input[type="radio"]').all();
    await inputAnswer[0].check();
    const buttonSubmitAnswer = page.getByTestId('btn-submit-answer');
    await buttonSubmitAnswer.click();
    await inputAnswer[0].check();
    await buttonSubmitAnswer.click();
    const scoreboard = page.getByTestId('scoreboard');
    await expect(scoreboard).toBeVisible();
});