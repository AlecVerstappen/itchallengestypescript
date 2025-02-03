import { IAnswer } from "../types/interfaces/IAnswer";

class Question {

    question: string;
    answers: IAnswer[] = [];

    constructor(question: string) {
        this.question = question;
    }

    addAnswer = (answer: IAnswer) => {
        this.answers.push(answer);
        return this;
    }

    toString = () => {
        return `Question: ${this.question} | Answers: ${this.answers.map(a => a.text).join(", ")}`;
    }
}

export default Question;