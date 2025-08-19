import Question from "../models/Question";
import { IApiQuestion } from "../types/interfaces/IApiQuestion.ts";
import { displayAlert } from "../utils";
import { ICategory } from "../types/interfaces/ICategory.ts";

export class QuestionService {
    baseUrl: string = 'https://opentdb.com/api.php?'
    categoryUrl: string = 'https://opentdb.com/api_category.php'

    constructor() {
    }

    getCategories = async (): Promise<ICategory[]> => {
        try {
            const response = await fetch(this.categoryUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            return data.trivia_categories;
        } catch (error) {
            console.error("Could not fetch categories:", error);
            displayAlert("Could not fetch categories from the API.");
            return [];
        }
    }

    getQuestions = async (amount: number, category: number, difficulty: string): Promise<Question[]> => {
        try {
            const url = `${this.baseUrl}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            if (data.response_code !== 0) {
                 displayAlert("Could not retrieve questions for the selected criteria.");
                 return [];
            }
            return this.mapQuestionsToQuestionModel(data.results);
        } catch (error) {
            console.error("Could not fetch questions:", error);
            displayAlert("Could not fetch questions from the API.");
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