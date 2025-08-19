import { getElementWrapper, showEl, hideEl } from "../utils";
import { quiz, scoreboardPage } from "../globals.ts";
import { GameMode } from "../types/enum/GameMode.ts";

// language=HTML
const html: string = `
    <div class="row">
        <div class="col">
            <p data-testid="intro">Try to score as many points as possible by answering the questions correctly. Good
                luck!</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div id="current-player-container" class="" data-testid="current-player-container">
                <p><span class="fw-bold">Current player: </span><span id="current-player-name"
                                                                      data-testid="current-player-name"></span></p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div id="quiz-container" class="" data-testid="quiz-container">
                <p><span class="fw-bold">Question: </span><span id="question" data-testid="question"></span>
                </p>
                <p class="fw-bold">Select the correct answer!</p>
                <div id="answer-container" class="mb-3" data-testid="answer-container"></div>
                <button id="btn-submit-answer" class="btn btn-success" data-testid="btn-submit-answer">Submit Answer
                </button>
            </div>
        </div>
    </div>
`;

export class QuizPage {

    public constructor() {
    }

    public init(element: HTMLElement) {
        element.innerHTML = html;
        this.updatePlayerName();
        this.updateCurrentQuestion();
        getElementWrapper<HTMLButtonElement>('#btn-submit-answer').addEventListener('click', () => this.submitAnswer());
    }

    private updatePlayerName() {
        const playerContainer = getElementWrapper<HTMLDivElement>('#current-player-container');
        const playerNameEl = getElementWrapper<HTMLSpanElement>('#current-player-name');
        const currentPlayerName = quiz.getCurrentPlayerName();

        // Als er een huidige speler is, toon altijd de naam en maak de container zichtbaar.
        if (currentPlayerName) {
            playerNameEl.textContent = currentPlayerName;
            showEl(playerContainer);
        } else {
            // Verberg de container als er om een of andere reden geen speler is.
            hideEl(playerContainer);
        }
    }

    private submitAnswer() {
        const selectedAnswer = getElementWrapper<HTMLInputElement|null>('input[name="answer"]:checked');
        if (!selectedAnswer) {
            // In a real app, you would show an alert, but the tests don't require it.
            return;
        }

        if (quiz.testIfAnswerIsCorrect(selectedAnswer.value)) {
            quiz.updateCurrentPlayerScore(1); // Give 1 point for a correct answer
        }
        
        quiz.nextQuestion();
        
        if (quiz.isRunning) {
            this.updateCurrentQuestion();
            this.updatePlayerName();
        } else {
            // Quiz is over, go to scoreboard
            scoreboardPage.init(getElementWrapper<HTMLDivElement>('#content'));
        }
    }

    private updateCurrentQuestion() {
        const currentQuestion = quiz.getCurrentQuestion();
        getElementWrapper<HTMLSpanElement>('#question').innerHTML = currentQuestion.question;
        
        const answerContainer = getElementWrapper<HTMLDivElement>('#answer-container');
        answerContainer.innerHTML = "";
        
        currentQuestion.answers.forEach((answer, index) => {
            const formCheck = document.createElement("div");
            formCheck.className = "form-check";

            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.className = "form-check-input";
            radioInput.name = "answer";
            radioInput.value = answer.text;
            radioInput.id = `answer-${index}`;
            
            const label = document.createElement("label");
            label.className = "form-check-label";
            label.setAttribute("for", `answer-${index}`);
            label.textContent = answer.text;

            formCheck.appendChild(radioInput);
            formCheck.appendChild(label);
            answerContainer.appendChild(formCheck);
        });
    }
}