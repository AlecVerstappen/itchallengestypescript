import Question from "../models/Question";
import { IApiQuestion } from "../types/interfaces/IApiQuestion.ts";
import { ICategory } from "../types/interfaces/ICategory.ts";
import { displayAlert } from "../utils";

export class QuestionService {
    baseUrl: string = 'https://opentdb.com/api.php?'
    categoryUrl: string = 'https://opentdb.com/api_category.php'

    constructor() {
    }

    getCategories = async (): Promise<ICategory[]> => {
        try {
            const response = await fetch(this.categoryUrl);
            const data = await response.json();
            return data.trivia_categories;
        } catch (error) {
            displayAlert("Could not fetch categories, please try again later.");
            return [];
        }
    }

    getQuestions = async (amount: number, category: number, difficulty: string): Promise<Question[]> => {
        try {
            const response = await fetch(`${this.baseUrl}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();
            return this.mapQuestionsToQuestionModel(data.results);
        } catch (error) {
            displayAlert("Could not fetch questions, please try again later.");
            return [];
        }
    }

    mapQuestionsToQuestionModel = (questions: IApiQuestion[]): Question[] => {
        let questionList: Question[] = [];
        for (const q of questions) {
            const question = new Question(q.question);
            question.addAnswer({ text: q.correct_answer, isCorrect: true });
            q.incorrect_answers.forEach(a => question.addAnswer({ text: a, isCorrect: false }));
            questionList.push(question);
        }
        return questionList;
    }
}