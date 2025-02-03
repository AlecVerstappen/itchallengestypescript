import { test, expect } from '@playwright/test';
import { completeHomePage, completePlayersPage } from './utils';

test('Leaving question input empty should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Question should contain at least 4 words');
});

test('Question input filled with less than 4 words should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('My short question');
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Question should contain at least 4 words');
});

test('Correct question input should be displayed question output', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const question = page.getByTestId('output-question');
    await expect(question).toHaveText('This is a question with more than 4 words');
});

test('Correct answer input empty should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Question should contain at least 1 correct answer which can not be empty');
});

test('Correct answer input filled with correct answer should display the answer in the output', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const answer = page.getByTestId('output-correct-answer');
    await expect(answer).toContainText('correct answer');
});

test('Incorrect answer input empty should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-incorrect-answer');
    await input.fill('');
    const button = page.getByTestId('btn-add-incorrect-answer');
    await button.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Incorrect answer can not be empty');
});

test('Submitting question with less than 2 incorrect answers should display an alert', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const inputIncorrectAnswer = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer.fill('incorrect answer');
    const buttonIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer.click();
    const alert = page.getByTestId('alert');
    await expect(alert).toHaveText('Question should contain at least 2 incorrect answers');
});

test('Submitting question with 2 incorrect answers should display the answers in the output', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const inputIncorrectAnswer = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer.fill('incorrect answer');
    const buttonIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer.click();
    const inputIncorrectAnswer2 = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer2.fill('incorrect answer 2');
    const buttonIncorrectAnswer2 = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer2.click();
    const answers = page.getByTestId('output-incorrect-answers');
    await expect(answers).toContainText('incorrect answer');
    await expect(answers).toContainText('incorrect answer 2');
});

test('The amount of confirmed questions should be displayed in the header when configured for one question', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toContainText('0/1');
});

test('The amount of confirmed questions should be displayed in the header when configured for two question', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 2);
    await completePlayersPage(page, ['Player 1']);
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toContainText('0/2');
});

test('By default, the question list should be empty', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const questionList = page.getByTestId('questions');
    await expect(questionList).toContainText('No questions to display');
});

test('By default, Start quiz button should be disabled', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const button = page.getByTestId('btn-start-quiz');
    await expect(button).toBeDisabled();
});

test('Submitting a valid question should update the question counter', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const inputIncorrectAnswer = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer.fill('incorrect answer');
    const buttonIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer.click();
    await inputIncorrectAnswer.fill('incorrect answer 2');
    await buttonIncorrectAnswer.click();
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toContainText('1/1');
});

test('Submitting a valid question should update the question list', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const inputIncorrectAnswer = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer.fill('incorrect answer');
    const buttonIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer.click();
    await inputIncorrectAnswer.fill('incorrect answer 2');
    await buttonIncorrectAnswer.click();
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const questionList = page.getByTestId('questions');
    await expect(questionList).not.toContainText('No questions to display');
    await expect(questionList).toContainText('This is a question with more than 4 words');
});

test('When the maximum amount of questions is added, the Start quiz button should be enabled', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 1);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const inputIncorrectAnswer = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer.fill('incorrect answer');
    const buttonIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer.click();
    await inputIncorrectAnswer.fill('incorrect answer 2');
    await buttonIncorrectAnswer.click();
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const buttonStartQuiz = page.getByTestId('btn-start-quiz');
    await expect(buttonStartQuiz).toBeEnabled();
});

test('When configured for api questions, the fetch questions button should be visible and enabled', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 1, 'api');
    await completePlayersPage(page, ['Player 1']);
    const button = page.getByTestId('btn-fetch-questions');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
});

test('When clicking fetch questions, the question list should be updated with questions', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 1, 'api');
    await completePlayersPage(page, ['Player 1']);
    // Wait for the initial api call for categories to complete.
    const res1 = await page.waitForResponse('https://opentdb.com/api_category.php');
    expect(res1.status()).toBe(200);
    const button = page.getByTestId('btn-fetch-questions');
    await button.click();
    const res2 = await page.waitForResponse(resp => resp.url().includes('https://opentdb.com/api.php?amount=1'));
    expect(res2.status()).toBe(200);
    const questionList = page.getByTestId('questions');
    await expect(questionList).not.toContainText('No questions to display');
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toContainText('1/1');
});

test('When the maximum amount of questions is added, the Start quiz button should navigate to the quiz page', async ({ page }) => {
    await page.goto("/");
    await completeHomePage(page, 1, 1);
    await completePlayersPage(page, ['Player 1']);
    const input = page.getByTestId('input-question');
    await input.fill('This is a question with more than 4 words');
    const inputAnswer = page.getByTestId('input-correct-answer');
    await inputAnswer.fill('correct answer');
    const inputIncorrectAnswer = page.getByTestId('input-incorrect-answer');
    await inputIncorrectAnswer.fill('incorrect answer');
    const buttonIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
    await buttonIncorrectAnswer.click();
    await inputIncorrectAnswer.fill('incorrect answer 2');
    await buttonIncorrectAnswer.click();
    const button = page.getByTestId('btn-submit-question');
    await button.click();
    const buttonStartQuiz = page.getByTestId('btn-start-quiz');
    await buttonStartQuiz.click();
    const intro = page.getByTestId('intro');
    await expect(intro).toContainText('Try to score as many points as possible');
});
