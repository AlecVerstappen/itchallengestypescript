import Question from "./Question";
import Player from "./Player";
import { QuestionMode } from "../types/enum/QuestionMode";
import { GameMode } from "../types/enum/GameMode.ts";

export class Quiz {
    public isRunning: boolean = false;
    public questions: Question[] = [];
    public quizDuration: number = 0;
    public players: Player[] = [];
    private currentQuestionIndex: number;
    private currentPlayerIndex: number;
    private gameMode: GameMode;
    private questionMode: QuestionMode;
    private numberOfPlayers: number = 1;
    private totalAmountOfQuestionToBeAsked: number = 0;
    private amountOfQuestionsAlreadyAsked: number = 0;

    public constructor(duration: number) { }

    public getGameMode() { }

    public getQuestionMode(): QuestionMode { return QuestionMode.Custom; }

    public getNumberOfPlayers(): number { return 0; }

    public getCurrentPlayerName(): string { return ""; }

    public getCurrentQuestion() { }

    public updateCurrentPlayerScore(amount: number) { }

    public setQuestionMode(mode: QuestionMode) { }

    private updateTotalAmountOfQuestionToBeAsked() { }

    public addQuestion(q: Question) { }

    public addPlayer(name: string) { }

    private getAmountOfPlayers() { }

    public removePlayer(name: string) { }

    public startQuiz() { }

    public testIfAnswerIsCorrect(answer: string) { }

    public nextQuestion() { }

    private shuffleAnswersInQuestions() { }

    private endQuiz() { }

    public setGameMode(gameMode: GameMode, amountOfPlayers: number) { }

    public sortPlayersByScore() { }

    public resetGame() { }
}
