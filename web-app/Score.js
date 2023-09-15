/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * It includes the score, the number of lines cleared,
 * whether the last line cleared was a Tetris, and a log message.
 * @typedef {Object} Score.Score
 * @property {number} score - The current score.
 * @property {number} lines_cleared - The number of lines cleared.
 * @property {boolean} lastLineWasTetris - Indicates if the last line cleared was a Tetris.
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game state object.
 */
Score.new_score = function () {
    return {
        score: 0,
        lines_cleared: 0,
        lastLineWasTetris: false,
    };
};

/**
 * Calculates and returns the current level based on the lines cleared.
 * You start at level 1 and advance a level every 10 lines cleared.
 * @function
 * @memberof Score
 * @param {Score.Score} scoreObj - The game state object containing lines_cleared.
 * @returns {number} The current level.
 */
Score.level = function (scoreObj) {
    return Math.floor(scoreObj.lines_cleared / 10) + 1;
};

/**
 * Adds the cleared lines and updates the score based on the number of lines cleared,
 * considering the scoring rules for different line clears.
 * @function
 * @memberof Score
 * @param {number} linesCleared - The number of lines cleared in the current move.
 * @param {Score.Score} scoreObj - The game state object containing score and lines_cleared.
 * @returns {Score.Score} The updated game state object.
 */
Score.cleared_lines = function (linesCleared, scoreObj) {
    const level = Score.level(scoreObj);

    // Calculate the score increment based on the number of lines cleared.
    let scoreIncrement = 0;

    if (linesCleared === 1) {
        scoreIncrement = 100 * level;
    } else if (linesCleared === 2) {
        scoreIncrement = 300 * level;
    } else if (linesCleared === 3) {
        scoreIncrement = 500 * level;
    } else if (linesCleared === 4) {
        scoreIncrement = 800 * level;
    }

    // Check if this line clear was a Tetris.
    const isTetris = linesCleared === 4;

    // Check if this line clear is a back-to-back Tetris.
    const isBackToBackTetris = isTetris && scoreObj.lastLineWasTetris;

    // Calculate the total score.
    let totalScore = scoreObj.score + scoreIncrement;

    // If it's a back-to-back Tetris, add an additional bonus.
    if (isBackToBackTetris) {
        totalScore += 400 * level;
        scoreObj.lastLineWasTetris = true;
    } else {
        scoreObj.lastLineWasTetris = isTetris;
    }

    // Update the game state object.
    scoreObj.score = totalScore;
    scoreObj.lines_cleared += linesCleared;

    return scoreObj;
};

Score.add_points = function (scoreObj, points) {
    const newScoreObj = Object.assign({}, scoreObj);
    newScoreObj.score += points;
    return newScoreObj;
};



export default Object.freeze(Score);