/**
 * @namespace Score
 * @author Caitlin Carlos
 * @version 2023
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score and lines cleared in the game.
 * @typedef {Object} ScoreObject
 * @property {number} score - The current score.
 * @property {number} lines_cleared - The number of lines cleared.
 * @property {boolean} last_lines_cleared_tetris - Indicates if the last line cleared was a Tetris.
 * @property {number} level - The current game level.
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.ScoreObject} The new game state.
 */
Score.new_score = function () {
    return {
        score: 0,
        lines_cleared: 0,
        last_lines_cleared_tetris: false, // Initialize to false
        level: 1,
    };
};

/**
 * Calculates the game level based on the number of lines cleared in the input game state.
 *
 * @function
 * @memberof Score
 * @param {Score} scoreObject - The game state containing score and lines cleared.
 * @returns {number} The game level based on the number of lines cleared.
 *   You start at level 1 and advance a level every 10 lines cleared.
 */
Score.level = function (scoreObject) {
    // Calculate the level based on the number of lines cleared.
    // You start at level 1 and advance a level every 10 lines cleared.
    const linesCleared = scoreObject.lines_cleared;
    const level = Math.floor(linesCleared / 10) + 1;
    return level;
};

/**
 * Calculates the points earned for clearing a certain number of lines based on the game's level.
 * @function
 * @memberof Score
 * @param {Score.Score} score - The current game score object.
 * @param {number} linesCleared - The number of lines cleared in the current turn.
 * @returns {Score.Score} The updated game score object.
 */
Score.cleared_lines = function (score, linesCleared) {
    const newScore = { ...score }; // Create a copy of the current score object

    // Calculate points earned based on the number of lines cleared and the current level
    let points = 0;
    if (linesCleared === 1) {
        points = 100 * score.level;
    } else if (linesCleared === 2) {
        points = 300 * score.level;
    } else if (linesCleared === 3) {
        points = 500 * score.level;
    } else if (linesCleared === 4) {
        points = 800 * score.level;
        newScore.last_lines_cleared_tetris = true; // Set to true for a Tetris
    } else {
        newScore.last_lines_cleared_tetris = false; // Reset to false for non-Tetris clears
    }

    // Check if it's a back-to-back Tetris
    if (linesCleared === 4 && score.last_lines_cleared === 4) {
        points = 1200 * score.level;
    }

    // Update the score and lines cleared in the newScore object
    newScore.score += points;
    newScore.lines_cleared += linesCleared;
    newScore.last_lines_cleared = linesCleared; // Update the last_lines_cleared property
    // Update the level based on the number of lines cleared
    newScore.level = Score.level(newScore);


    return newScore;
};


export default Object.freeze(Score);



