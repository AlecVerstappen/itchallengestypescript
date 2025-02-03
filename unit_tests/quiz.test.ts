// Quiz.test.ts
import {describe, it, expect, beforeEach} from 'vitest';
import {Quiz} from '../src/models/Quiz';
import Question from '../src/models/Question';
import {QuestionMode} from '../src/types/enum/QuestionMode';
import {GameMode} from "../src/types/enum/GameMode";


describe('Multiplayer Quiz Class', () => {
    let quiz: Quiz;

    beforeEach(() => {
        // Mock data
        const mockQuestions = [
            new Question('What is 2+2?').addAnswer({text: '4', isCorrect: true}).addAnswer({
                text: '3',
                isCorrect: false
            }),
            new Question('What is the capital of France?').addAnswer({
                text: 'Paris',
                isCorrect: true
            }).addAnswer({text: 'London', isCorrect: false})
        ];

        quiz = new Quiz(2);
        quiz.addPlayer('Alice');
        quiz.addPlayer('Bob');
        quiz.addQuestion(mockQuestions[0]);
        quiz.addQuestion(mockQuestions[1]);
    });

    it('should initialize with provided questions, players, and duration', () => {
        expect(quiz.questions.length).toBe(2);
        expect(quiz.players.length).toBe(2);
        expect(quiz.quizDuration).toBe(2);
        expect(quiz.isRunning).toBe(false);
        expect(quiz.getCurrentPlayerName()).toBe('Alice');
        expect(quiz.getCurrentQuestion().question).toBe('What is 2+2?');
    });

    it('should update the current player score correctly', () => {
        quiz.updateCurrentPlayerScore(10);
        expect(quiz.players[0].score).toBe(10);
    });

    it('should set question mode correctly', () => {
        quiz.setQuestionMode(QuestionMode.Custom);
        expect(quiz.questionMode).toBe(QuestionMode.Custom);
    });

    it('should set question mode correctly', () => {
        quiz.setQuestionMode(QuestionMode.Api);
        expect(quiz.questionMode).toBe(QuestionMode.Api);
    });

    it('should add a question correctly', () => {
        const newQuestion = new Question('What is the capital of Germany?');
        quiz.addQuestion(newQuestion);
        expect(quiz.questions.length).toBe(3);
    });

    it('should add a player correctly', () => {
        quiz.addPlayer('Charlie');
        expect(quiz.players.length).toBe(3);
        expect(quiz.players[2].name).toBe('Charlie');
    });

    it('should remove a player correctly', () => {
        quiz.removePlayer('Alice');
        expect(quiz.players.length).toBe(1);
        expect(quiz.players[0].name).toBe('Bob');
    });

    it('should start the quiz correctly', () => {
        quiz.startQuiz();
        expect(quiz.isRunning).toBe(true);
    });

    it('should test if an answer is correct', () => {
        expect(quiz.testIfAnswerIsCorrect('4')).toBe(true);
        expect(quiz.testIfAnswerIsCorrect( '3')).toBe(false);
    });

    it('should proceed to the next question correctly', () => {
        quiz.startQuiz();
        quiz.nextQuestion();
        expect(quiz.getCurrentPlayerName()).toBe('Alice');
        quiz.nextQuestion();
        expect(quiz.getCurrentPlayerName()).toBe('Bob');
        expect(quiz.getCurrentQuestion().question).toBe('What is 2+2?');
    });

    it('should end the quiz when all questions are asked', () => {
        quiz.startQuiz();
        // Simulate going through all questions
        for (let i = 0; i < quiz.questions.length * quiz.players.length; i++) {
            quiz.nextQuestion();
        }
        expect(quiz.isRunning).toBe(false);
    });

    it('should sort players by score correctly', () => {
        quiz.players[0].updateScore(5);
        quiz.players[1].updateScore(10);
        const sortedPlayers = quiz.sortPlayersByScore();
        expect(sortedPlayers[0].name).toBe('Bob');
        expect(sortedPlayers[1].name).toBe('Alice');
    });

    it('should return the default game mode', () => {
        expect(quiz.getGameMode()).toBe(GameMode.Single);
    });

    it('should return the updated game mode after setting it', () => {
        quiz.setGameMode(GameMode.Multi, 2);
        expect(quiz.getGameMode()).toBe(GameMode.Multi);
    });

    it('should return the default question mode', () => {
        expect(quiz.getQuestionMode()).toBe(QuestionMode.Custom);
    });

    it('should return the updated question mode after setting it', () => {
        quiz.setQuestionMode(QuestionMode.Custom);
        expect(quiz.getQuestionMode()).toBe(QuestionMode.Custom);
    });

    it('should return the default number of players', () => {
        expect(quiz.getNumberOfPlayers()).toBe(1);
    });

    it('should return the updated number of players after setting it', () => {
        quiz.setGameMode(GameMode.Multi, 3);
        expect(quiz.getNumberOfPlayers()).toBe(3);
    });

    it('should update the game mode and number of players', () => {
        quiz.setGameMode(GameMode.Multi, 4);
        expect(quiz.getGameMode()).toBe(GameMode.Multi);
        expect(quiz.getNumberOfPlayers()).toBe(4);
    });

    it('should reset the current player and question indices', () => {
        quiz.setGameMode(GameMode.Multi, 4);
        expect(quiz['currentPlayerIndex']).toBe(0);
        expect(quiz['currentQuestionIndex']).toBe(0);
    });

    it('should reset all quiz properties to their default values', () => {
        quiz.addQuestion(new Question('Sample question'));
        quiz.addPlayer('Player 1');
        quiz.setGameMode(GameMode.Multi, 2);
        quiz.setQuestionMode(QuestionMode.Custom);
        quiz.startQuiz();

        quiz.resetGame();

        expect(quiz.isRunning).toBe(false);
        expect(quiz.questions.length).toBe(0);
        expect(quiz.players.length).toBe(0);
        expect(quiz.getGameMode()).toBe(GameMode.Single);
        expect(quiz.getQuestionMode()).toBe(QuestionMode.Custom);
        expect(quiz.getNumberOfPlayers()).toBe(1);
        expect(quiz['currentQuestionIndex']).toBe(0);
        expect(quiz['currentPlayerIndex']).toBe(0);
        expect(quiz['totalAmountOfQuestionToBeAsked']).toBe(0);
        expect(quiz['amountOfQuestionsAlreadyAsked']).toBe(0);
    });
});