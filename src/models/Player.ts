class Player {
    name: string;
    score: number;
    isCurrent: boolean = false;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
    }

    updateScore = (score: number) => {
        this.score += score;
    }

    toString = () => {
        return `Player: ${this.name} - Score: ${this.score}`;
    }
}

export default Player;