//language=HTML
import { getElementWrapper } from "../utils";
import { homePage, quiz } from "../globals.ts";

const html: string = `
    <div class="row">
        <div class="col">
            <p data-testid="intro">The quiz has ended. Here are the final scores:</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <ol id="scoreboard" data-testid="scoreboard"></ol>
            <!-- restart quiz game -->
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
        // Add event listeners
        getElementWrapper<HTMLButtonElement>("#btn-restart-game").addEventListener("click", () => this.restartGame());
    }

    private restartGame() {
    }

    private showScoreboard() {
    }
}