import {expect, Page} from "@playwright/test";

export const completeHomePage = async (page: Page, amountOfPlayers: number = 1, amountOfQuestions: number = 1, typeOfQuestions: string = 'custom') => {
    const inputQuestionAmount = page.getByTestId('input-question-amount');
    await inputQuestionAmount.fill(amountOfQuestions.toString());
    const inputGameMode = page.getByTestId('input-game-mode');
    if (amountOfPlayers > 1) {
        await inputGameMode.check();
        const inputAmountPlayers = page.getByTestId('input-amount-players');
        await inputAmountPlayers.fill(amountOfPlayers.toString());
    }
    if (typeOfQuestions === 'api') {
        const inputQuestionMode = page.getByTestId('input-question-mode');
        await inputQuestionMode.check();
    }
    const button = page.getByTestId('btn-save-configuration');
    await button.click();
    const intro = page.getByTestId('intro');
    await expect(intro, 'Could not find intro text of players page').toContainText('Enter all players that will participate in the quiz');
};

export const completePlayersPage = async (page: Page, players: string[]) => {
    for (let player of players) {
        const input = page.getByTestId('input-player');
        await input.fill(player);
        const button = page.getByTestId('btn-add-player');
        await button.click();
    }
    const button = page.getByTestId('btn-go-to-questions');
    await expect(button).toBeEnabled();
    await button.click();
};

export const completeQuestionsPage = async (page: Page, amountOfQuestions: number = 1) => {
    for (let i = 0; i < amountOfQuestions; i++) {
        const input = page.getByTestId('input-question');
        await input.fill(`This is question number ${i + 1}`);
        const inputCorrectAnswer = page.getByTestId('input-correct-answer');
        await inputCorrectAnswer.fill('Correct answer');
        const buttonAddIncorrectAnswer = page.getByTestId('btn-add-incorrect-answer');
        const inputWrongAnswer1 = page.getByTestId('input-incorrect-answer');
        await inputWrongAnswer1.fill('Wrong answer 1');
        await buttonAddIncorrectAnswer.click();
        const inputWrongAnswer2 = page.getByTestId('input-incorrect-answer');
        await inputWrongAnswer2.fill('Wrong answer 2');
        await buttonAddIncorrectAnswer.click();
        const inputWrongAnswer3 = page.getByTestId('input-incorrect-answer');
        await inputWrongAnswer3.fill('Wrong answer 3');
        await buttonAddIncorrectAnswer.click();
        const button = page.getByTestId('btn-submit-question');
        await button.click();
    }
    const button = page.getByTestId('btn-start-quiz');
    await expect(button).toBeEnabled();
    await button.click();
};

export const completeQuizPage = async (page: Page, amountOfPlayers: number = 1, amountOfQuestions: number = 1) => {
    const answerContainer = page.getByTestId('answer-container');
    const buttonSubmitAnswer = page.getByTestId('btn-submit-answer');
    for (let i = 0; i < amountOfPlayers; i++) {
        for (let j = 0; j < amountOfQuestions; j++) {
            const inputAnswer = await answerContainer.locator('input[type="radio"]').all();
            await inputAnswer[0].check();
            await buttonSubmitAnswer.click();
        }
    }
};