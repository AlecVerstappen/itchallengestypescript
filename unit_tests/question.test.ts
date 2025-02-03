// Player.test.ts
import {describe, it, expect, beforeEach} from 'vitest';
import Question from "../src/models/Question";

describe('Question Class', () => {
    let question: Question;

    beforeEach(() => {
        // Mock data
        question = new Question('What is 2+2?');
    });

    it('should initialize with the correct question', () => {
        question = new Question('What is 2+2?');
        expect(question.question).toBe('What is 2+2?');
    })

    it('should add an answer correctly', () => {
        question = new Question('What is 2+2?');
        question.addAnswer({text: '4', isCorrect: true});
        question.addAnswer({text: '3', isCorrect: false});
        expect(question.answers.length).toBe(2);
    });

    it('should return the correct string representation', () => {
        question = new Question('What is 2+2?');
        question.addAnswer({text: '4', isCorrect: true});
        question.addAnswer({text: '3', isCorrect: false});
        expect(question.toString()).toBe('Question: What is 2+2? | Answers: 4, 3');
    });

});
