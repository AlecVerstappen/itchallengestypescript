import { questionsPage, quiz } from "../globals.ts";
import { displayAlert, getElementWrapper, enableEl } from "../utils";

// language=HTML
const html = `
    <div class="row">
        <div class="col" data-testid="intro"><p>Enter all players that will participate in the quiz. You can continue
            when all players are added.</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p>Add a new player</p>
            <input type="text" class="form-control mb-2" id="input-player" data-testid="input-player" placeholder="Enter player name"
                   aria-label="Recipient's username" aria-describedby="btn-add-player">
            <button class="btn btn-primary" type="button" id="btn-add-player" data-testid="btn-add-player">Add player</button>
        </div>
        <div class="col">
            <p id="title-player-list" data-testid="title-player-list">Player list (0/0)</p>
            <ul id="player-list" data-testid="player-list"></ul>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col">
            <button id="btn-go-to-questions" data-testid="btn-go-to-questions" disabled class="btn btn-success w-100">Go to questions</button>
        </div>
    </div>
`;

export class PlayersPage {
    public constructor() {
    }

    public init(contentElement: HTMLElement) {
        contentElement.innerHTML = html;
        getElementWrapper<HTMLButtonElement>('#btn-add-player').addEventListener("click", () => this.addPlayer());
        getElementWrapper<HTMLButtonElement>("#btn-go-to-questions").addEventListener("click", () => questionsPage.init(getElementWrapper("#content")));
        this.updatePlayerList();
    }

    private updatePlayerList() {
        const playerList = getElementWrapper<HTMLUListElement>("#player-list");
        playerList.innerHTML = "";
        const title = getElementWrapper<HTMLHeadingElement>("#title-player-list");
        title.textContent = `Player list (${quiz.players.length}/${quiz.getNumberOfPlayers()})`;

        if (quiz.players.length > 0) {
            quiz.players.forEach(p => {
                const li = document.createElement("li");
                li.textContent = p.name;
                playerList.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No players added";
            playerList.appendChild(li);
        }

        if (quiz.players.length === quiz.getNumberOfPlayers()) {
            enableEl(getElementWrapper<HTMLButtonElement>("#btn-go-to-questions"));
        }
    }

    private validatePlayerName(name: string): boolean {
        if (!name) {
            displayAlert("Please enter a player name");
            return false;
        }
        if (quiz.players.some(p => p.name === name)) {
            displayAlert("Player name must be unique");
            return false;
        }
        return true;
    }

    private addPlayer() {
        const inputPlayer = getElementWrapper<HTMLInputElement>("#input-player");
        const playerName = inputPlayer.value.trim();
        if (this.validatePlayerName(playerName)) {
            quiz.addPlayer(playerName);
            this.updatePlayerList();
            inputPlayer.value = "";
        }
    }
}