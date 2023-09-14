/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * It includes the score, the number of lines cleared, and the last cleared line.
 * @typedef {Object} Score.Score
 * @property {number} score - The current score.
 * @property {number} lines_cleared - The number of lines cleared.
 * @property {number} lastLineCleared - The number of lines cleared in the last move.
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game state object with score, lines_cleared, and lastLineCleared properties.
 */
Score.new_score = function () {
    return {
        score: 0,
        lines_cleared: 0,
        lastLineCleared: 0,
    };
};

/**
 * Calculates the level based on the number of lines cleared.
 * You start at level 1 and advance a level every 10 lines cleared.
 * @function
 * @memberof Score
 * @param {Score.Score} scoreObj - The game state object containing score and lines_cleared properties.
 * @returns {number} The current level.
 */
Score.level = function (scoreObj) {
    if (!scoreObj || typeof scoreObj !== 'object') {
        throw new Error("Invalid or missing score object.");
    }

    return Math.floor(scoreObj.lines_cleared / 10) + 1;
};

/**
 * Calculate the score and update lines cleared based on the number of lines cleared.
 * Handles back-to-back Tetris scoring.
 * @function
 * @memberof Score
 * @param {number} linesCleared The number of lines cleared in this turn.
 * @param {Score.Score} score The current score object.
 * @returns {Score.Score} The updated score object.
 */
Score.cleared_lines = function (linesCleared, score) {
    const scoreTable = [0, 100, 300, 500, 800]; // Scoring for 0-4 lines cleared
    const level = Score.level(score);

    let lineScore = 0;
    let backToBack = false;

    if (linesCleared === 4) {
        // Tetris (four lines cleared)
        lineScore = scoreTable[4] * level;
        if (score.lastLineWasTetris) {
            // Back-to-back Tetris
            lineScore = 1200 * level;
            backToBack = true;
        }
    } else {
        lineScore = scoreTable[linesCleared] * level;
    }

    // Calculate the new total score
    const totalScore = score.score + lineScore;

    // Update lines cleared and lastLineWasTetris
    const newScore = {
        score: totalScore,
        lines_cleared: score.lines_cleared + linesCleared,
        lastLineWasTetris: backToBack && linesCleared === 4,
    };

    return newScore;
};


export default Object.freeze(Score);

