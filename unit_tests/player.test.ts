// Player.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import Player from '../src/models/Player';

describe('Player Class', () => {
    let player: Player;

    beforeEach(() => {
        player = new Player('Alice');
    });

    it('should initialize with the correct name and default score', () => {
        expect(player.name).toBe('Alice');
        expect(player.score).toBe(0);
        expect(player.isCurrent).toBe(false);
    });

    it('should update the score correctly', () => {
        player.updateScore(10);
        expect(player.score).toBe(10);
        player.updateScore(5);
        expect(player.score).toBe(15);
    });

    it('should return the correct string representation', () => {
        player.updateScore(7);
        expect(player.toString()).toBe('Player: Alice - Score: 7');
    });

});
