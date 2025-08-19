import Question from "./Question";
import Player from "./Player";
import { QuestionMode } from "../types/enum/QuestionMode";
import { GameMode } from "../types/enum/GameMode.ts";

export class Quiz {
    public isRunning: boolean = false;
    public questions: Question[] = [];
    public quizDuration: number = 0;
    public players: Player[] = [];
    private currentQuestionIndex: number = 0;
    private currentPlayerIndex: number = 0;
    private gameMode: GameMode = GameMode.Single;
    private questionMode: QuestionMode = QuestionMode.Custom;
    private numberOfPlayers: number = 1;
    private totalAmountOfQuestionToBeAsked: number = 0;
    private amountOfQuestionsAlreadyAsked: number = 0;

    public constructor(duration: number) {
        this.quizDuration = duration;
    }

    public getGameMode(): GameMode {
        return this.gameMode;
    }

    public getQuestionMode(): QuestionMode {
        return this.questionMode;
    }

    public getNumberOfPlayers(): number {
        return this.numberOfPlayers;
    }

    public getCurrentPlayerName(): string {
        if (this.players.length > 0) {
            return this.players[this.currentPlayerIndex].name;
        }
        return "";
    }

    public getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    }

    public updateCurrentPlayerScore(amount: number) {
        if (this.players.length > 0) {
            this.players[this.currentPlayerIndex].updateScore(amount);
        }
    }

    public setQuestionMode(mode: QuestionMode) {
        this.questionMode = mode;
    }

    private updateTotalAmountOfQuestionToBeAsked() {
        this.totalAmountOfQuestionToBeAsked = this.questions.length * this.players.length;
    }

    public addQuestion(q: Question) {
        this.questions.push(q);
        this.updateTotalAmountOfQuestionToBeAsked();
    }

    public addPlayer(name: string) {
        const player = new Player(name);
        this.players.push(player);
        this.updateTotalAmountOfQuestionToBeAsked();
    }

    public removePlayer(name: string) {
        this.players = this.players.filter(p => p.name !== name);
        this.updateTotalAmountOfQuestionToBeAsked();
    }

    public startQuiz() {
        this.isRunning = true;
        this.shuffleAnswersInQuestions();
    }

    public testIfAnswerIsCorrect(answer: string): boolean {
        const currentQuestion = this.getCurrentQuestion();
        const correctAnswer = currentQuestion.answers.find(a => a.isCorrect);
        return correctAnswer?.text === answer;
    }

    public nextQuestion() {
        this.amountOfQuestionsAlreadyAsked++;
        if (this.amountOfQuestionsAlreadyAsked >= this.totalAmountOfQuestionToBeAsked) {
            this.endQuiz();
            return;
        }

        if (this.gameMode === GameMode.Multi) {
            this.currentPlayerIndex++;
            if (this.currentPlayerIndex >= this.players.length) {
                this.currentPlayerIndex = 0;
                this.currentQuestionIndex++;
            }
        } else {
            this.currentQuestionIndex++;
        }

        if (this.currentQuestionIndex >= this.questions.length) {
             this.currentQuestionIndex = 0;
        }
    }

    private shuffleAnswersInQuestions() {
        this.questions.forEach(q => {
            q.answers.sort(() => Math.random() - 0.5);
        });
    }

    private endQuiz() {
        this.isRunning = false;
    }

    public setGameMode(gameMode: GameMode, amountOfPlayers: number) {
        this.gameMode = gameMode;
        this.numberOfPlayers = amountOfPlayers;
    }

    public sortPlayersByScore(): Player[] {
        return [...this.players].sort((a, b) => b.score - a.score);
    }

    public resetGame() {
        this.isRunning = false;
        this.questions = [];
        this.players = [];
        this.quizDuration = 0;
        this.currentQuestionIndex = 0;
        this.currentPlayerIndex = 0;
        this.gameMode = GameMode.Single;
        this.questionMode = QuestionMode.Custom;
        this.numberOfPlayers = 1;
        this.totalAmountOfQuestionToBeAsked = 0;
        this.amountOfQuestionsAlreadyAsked = 0;
    }
}