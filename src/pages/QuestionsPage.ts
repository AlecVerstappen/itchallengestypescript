import { quiz, quizPage } from "../globals.ts";
import { QuestionMode } from "../types/enum/QuestionMode.ts";
import { QuestionService } from "../services/QuestionService.ts";
import { ICategory } from "../types/interfaces/ICategory.ts";
import { Difficulty } from "../types/enum/Difficulty.ts";
import { disableEl, displayAlert, enableEl, getElementWrapper } from "../utils";
import Question from "../models/Question.ts";

const questionService = new QuestionService();

// language=HTML
const apiModeHtml: string = `
    <h2>API questions</h2>
    <p>Configure the API for retrieving questions</p>
    <select class="form-select" id="input-difficulty" data-testid="input-difficulty"></select>
    <select class="form-select mt-2" id="input-category" data-testid="input-category"></select>
    <button id="btn-fetch-questions" class="btn btn-primary mt-2" data-testid="btn-fetch-questions">Fetch questions</button>`;

// language=HTML
const customModeHtml: string = `
    <h2>Custom questions</h2>
    <div class="row mb-3">
        <label for="input-question" class="col-sm-2 col-form-label">Question</label>
        <div class="col-sm-10">
            <input class="form-control" id="input-question" data-testid="input-question">
        </div>
    </div>
    <div class="row mb-3">
        <label for="input-correct-answer" class="col-sm-2 col-form-label">Correct answer</label>
        <div class="col-sm-10">
            <input class="form-control" id="input-correct-answer" data-testid="input-correct-answer">
        </div>
    </div>
    <div class="row mb-3">
        <label for="input-incorrect-answer" class="col-sm-2 col-form-label">Incorrect answer</label>
        <div class="col-sm-10">
            <div class="input-group">
                <input id="input-incorrect-answer" type="text" class="form-control" aria-label="Recipient's username"
                       aria-describedby="button-addon2" data-testid="input-incorrect-answer">
                <button class="btn btn-outline-secondary" type="button" id="btn-add-incorrect-answer" data-testid="btn-add-incorrect-answer">Add</button>
            </div>
        </div>
    </div>
    <table class="table table-bordered">
        <thead>
        <tr>
            <th scope="col">Question</th>
            <th scope="col">Correct answer</th>
            <th scope="col">Incorrect answers</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td id="output-question" data-testid="output-question"></td>
            <td>
                <ul id="output-correct-answer" data-testid="output-correct-answer">
                </ul>
            </td>
            <td>
                <ul id="output-incorrect-answers" data-testid="output-incorrect-answers">
                </ul>
            </td>
        </tr>
        </tbody>
    </table>
    <button type="submit" class="btn btn-primary" id="btn-submit-question" data-testid="btn-submit-question">Submit question</button>
`;

//language=HTML
const questionsHtml: string = `
    <h2 class="mt-2">Confirmed questions <span id="question-counter" data-testid="question-counter">(0/0)</span></h2>
    <div id="questions" data-testid="questions">No questions to display</div>
`;

const fillCategories = async () => {
    const select = getElementWrapper<HTMLSelectElement>("#input-category");
    const categories = await questionService.getCategories();
    categories.forEach((c: ICategory) => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = c.name;
        select.appendChild(option);
    });
}

const fillDifficulty = async () => {
    const select = getElementWrapper<HTMLSelectElement>("#input-difficulty");
    Object.entries(Difficulty).forEach(([key, value]) => {
        const option = document.createElement("option");
        option.value = value;
        option.text = key;
        select.appendChild(option);
    });
};

export class QuestionsPage {
    private tempQuestion = new Question("");

    public constructor() {}

    public init(contentElement: HTMLElement) {
        let htmlToShow = quiz.getQuestionMode() === QuestionMode.Api ? apiModeHtml : customModeHtml;
        const fullHtml = `
            <div class="row">
                <div class="col">
                    <p data-testid="intro">A quiz can not start without questions. Add questions to the quiz by fetching them from an API or by adding them manually.</p>
                </div>
            </div>
            <div class="row">
                <div class="col">${htmlToShow}</div>
                <div class="col">${questionsHtml}</div>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <button class="btn btn-success w-100" id="btn-start-quiz" data-testid="btn-start-quiz" disabled>Start quiz</button>
                </div>
            </div>
        `;
        contentElement.innerHTML = fullHtml;

        this.updateQuestionCounter();
        this.updateQuestionsList();

        if (quiz.getQuestionMode() === QuestionMode.Api) {
            this.initApiMode();
        } else {
            this.initCustomMode();
        }

        getElementWrapper<HTMLButtonElement>("#btn-start-quiz").addEventListener("click", this.startQuiz);
    }

    private initApiMode = () => {
        fillCategories();
        fillDifficulty();
        getElementWrapper<HTMLButtonElement>("#btn-fetch-questions").addEventListener("click", this.fetchQuestions);
    }

    private initCustomMode = () => {
        getElementWrapper<HTMLButtonElement>("#btn-add-incorrect-answer").addEventListener("click", this.addIncorrectAnswer);
        getElementWrapper<HTMLButtonElement>("#btn-submit-question").addEventListener("click", this.submitQuestion);
    }

    private addIncorrectAnswer = () => {
        const inputEl = getElementWrapper<HTMLInputElement>("#input-incorrect-answer");
        const answerText = inputEl.value.trim();
        if (!answerText) {
            displayAlert("Incorrect answer can not be empty");
            return;
        }
        this.tempQuestion.addAnswer({ text: answerText, isCorrect: false });
        this.updateTempQuestionOutput();
        inputEl.value = "";
    }
    
    private submitQuestion = () => {
        this.tempQuestion.question = getElementWrapper<HTMLInputElement>("#input-question").value.trim();
        const correctAnswerText = getElementWrapper<HTMLInputElement>("#input-correct-answer").value.trim();
        
        // Verwijder eventuele vorige correcte antwoorden en voeg het huidige toe
        this.tempQuestion.answers = this.tempQuestion.answers.filter(a => !a.isCorrect);
        if (correctAnswerText) {
            this.tempQuestion.addAnswer({ text: correctAnswerText, isCorrect: true });
        }
        
        this.updateTempQuestionOutput();
        
        if (!this.validateTempQuestion()) {
            return;
        }

        quiz.addQuestion(this.tempQuestion);
        this.updateQuestionsList();
        this.updateQuestionCounter();
        this.checkIfQuizCanStart();
        
        this.tempQuestion = new Question("");
        this.resetCustomInputs();
        this.updateTempQuestionOutput();
    }

    private fetchQuestions = async () => {
        const amount = quiz.quizDuration;
        const category = parseInt(getElementWrapper<HTMLSelectElement>("#input-category").value);
        const difficulty = getElementWrapper<HTMLSelectElement>("#input-difficulty").value;
        const questions = await questionService.getQuestions(amount, category, difficulty);
        
        questions.forEach(q => quiz.addQuestion(q));
        this.updateQuestionsList();
        this.updateQuestionCounter();
        this.checkIfQuizCanStart();
    }

    private validateTempQuestion = (): boolean => {
        if (this.tempQuestion.question.split(/\s+/).length < 4) {
            displayAlert("Question should contain at least 4 words");
            return false;
        }
        const correctAnswer = this.tempQuestion.answers.find(a => a.isCorrect);
        if (!correctAnswer || !correctAnswer.text) {
             displayAlert("Question should contain at least 1 correct answer which can not be empty");
             return false;
        }
        if (this.tempQuestion.answers.filter(a => !a.isCorrect).length < 2) {
             displayAlert("Question should contain at least 2 incorrect answers");
             return false;
        }
        return true;
    }
    
    private updateTempQuestionOutput = () => {
        getElementWrapper<HTMLElement>("#output-question").textContent = this.tempQuestion.question;
        const correctList = getElementWrapper<HTMLUListElement>("#output-correct-answer");
        const incorrectList = getElementWrapper<HTMLUListElement>("#output-incorrect-answers");
        correctList.innerHTML = "";
        incorrectList.innerHTML = "";

        this.tempQuestion.answers.forEach(answer => {
            const li = document.createElement("li");
            li.textContent = answer.text;
            if (answer.isCorrect) {
                correctList.appendChild(li);
            } else {
                incorrectList.appendChild(li);
            }
        });
    }

    private updateQuestionsList = () => {
        const listEl = getElementWrapper<HTMLDivElement>("#questions");
        listEl.innerHTML = "";
        if (quiz.questions.length === 0) {
            listEl.textContent = "No questions to display";
            return;
        }
        quiz.questions.forEach((q, index) => {
            const p = document.createElement("p");
            p.textContent = `${index + 1}. ${q.question}`;
            listEl.appendChild(p);
        });
    }
    
    private updateQuestionCounter = () => {
        const counterEl = getElementWrapper<HTMLSpanElement>("#question-counter");
        counterEl.textContent = `(${quiz.questions.length}/${quiz.quizDuration})`;
    }
    
    private checkIfQuizCanStart = () => {
        if (quiz.questions.length >= quiz.quizDuration) {
            enableEl(getElementWrapper<HTMLButtonElement>("#btn-start-quiz"));
        }
    }
    
    private startQuiz = () => {
        quiz.startQuiz();
        quizPage.init(getElementWrapper<HTMLDivElement>("#content"));
    }
    
    private resetCustomInputs = () => {
         getElementWrapper<HTMLInputElement>("#input-question").value = "";
         getElementWrapper<HTMLInputElement>("#input-correct-answer").value = "";
    }
}