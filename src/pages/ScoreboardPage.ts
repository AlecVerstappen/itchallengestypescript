import { getElementWrapper } from "../utils";
import { homePage, quiz } from "../globals.ts";

//language=HTML
const html: string = `
    <div class="row">
        <div class="col">
            <p data-testid="intro">The quiz has ended. Here are the final scores:</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <ol id="scoreboard" data-testid="scoreboard"></ol>
            <button id="btn-restart-game" class="btn btn-danger mt-5" data-testid="btn-restart-game">Restart Game
            </button>
        </div>
    </div>
`;

export class ScoreboardPage {
    public constructor() {
    }

    public init(contentElement: HTMLElement) {
        contentElement.innerHTML = html;
        this.showScoreboard();
        getElementWrapper<HTMLButtonElement>("#btn-restart-game").addEventListener("click", () => this.restartGame());
    }

    private restartGame() {
        quiz.resetGame();
        homePage.init(getElementWrapper<HTMLDivElement>('#content'));
    }

    private showScoreboard() {
        const scoreboardEl = getElementWrapper<HTMLOListElement>('#scoreboard');
        scoreboardEl.innerHTML = '';
        const sortedPlayers = quiz.sortPlayersByScore();

        sortedPlayers.forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player.name} - Score: ${player.score}`;
            scoreboardEl.appendChild(li);
        });
    }
}