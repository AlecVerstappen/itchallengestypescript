import {Quiz} from './models/Quiz';
import {QuestionsPage} from "./pages/QuestionsPage.ts";
import {QuizPage} from "./pages/QuizPage.ts";
import {ScoreboardPage} from "./pages/ScoreboardPage.ts";
import {HomePage} from "./pages/HomePage.ts";
import {PlayersPage} from "./pages/PlayersPage.ts";

export let quiz = new Quiz(0);
export const questionsPage = new QuestionsPage();

export const homePage = new HomePage();
export const playersPage = new PlayersPage();
export const quizPage = new QuizPage();
export const scoreboardPage = new ScoreboardPage();