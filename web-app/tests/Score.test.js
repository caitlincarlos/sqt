import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";

const example_game = Tetris.new_game();
const field_string1 = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string1.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

const example_game2 = Tetris.new_game();
const field_string2 = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
--S-------
-SSZ-I----
TSZZ-IIIII
TTZL-IOOOO
TLLL-IOOOO))`;
example_game2.field = field_string2.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

const example_game3 = Tetris.new_game();
const field_string3 = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
LLLI-IIIII
LOOI-IIIII
TOOI-IIIII
TTSI-IIIII
TSSZ-IIIII
TSZZ-IIIII
TTZL-IOOOO
TLLL-IOOOO))`;
example_game3.field = field_string3.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe("Score", function () {
    it(
        `A new tetris game
        * Starts on level one
        * With no lines cleared
        * With a score of zero`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it(
        `The score tracks the lines that get cleared`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game = Tetris.hard_drop(game);

            if (game.score.lines_cleared !== 4) {
                throw new Error("Expecting 4 lines to clear");
            }
        }
    );

    it(
        `A single line clear scores 100 × level`,
        function () {
            let game = example_game;
            // Slot a T tetromino into the hole and drop.
            // This can only go one deep.
            game.current_tetromino = Tetris.T_tetromino;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 100) {
                throw new Error("A single row cleared should score 100");
            }
        }
    );

    it(
        `A double line clear scores 300 × level`,
        function () {
            let game = example_game;
            // Slot a J tetromino into the hole and drop.
            game.current_tetromino = Tetris.J_tetromino;
            game = Tetris.rotate_ccw(game);

            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });
    
            if (game.score.score !== 300) {
                throw new Error("A double row clear should score 300");
            }
        }
    );
    
    

    it(
        `A triple line clear scores 500 × level`,
        function () {
            let game = example_game2;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            
                // Instead wait for it to drop 22 times.
                R.range(0, 22).forEach(function () {
                    game = Tetris.next_turn(game);
                });

            if (game.score.score !== 500) {
                throw new Error("A triple row clear should score 500");
            }
        }
    );

    it(
        `A tetris scores 800 × level`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 800) {
                throw new Error("A tetris should score 800");
            }
        }
    );

    it(
        `Back to back tetrises score 1200 × level`,
        function () {
            let game = example_game3;
            // Slot two I tetrominos into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
    
            // Rotate and drop the first I tetromino.
            game = Tetris.rotate_ccw(game);

            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });
    
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);

            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });
    
            if (game.score.score !== 1200) {
                throw new Error("Back-to-back tetrises should score 1200");
            }
        }
    );
    

    it(
        `A soft drop scores 1 point per cell descended`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and perform a soft drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.soft_drop(game);
    
            // The score should go up by one for each time a soft drop is performed.
            const expectedScore = 1;
    
            if (game.score.score !== expectedScore) {
                throw new Error("A soft drop should score 1 point per cell descended");
            }
        }
    );
    
    

    it(
        `A hard drop scores 2 points per cell descended`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and perform a hard drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.hard_drop(game);
    
            // Calculate the expected score based on the number of cells descended. 
            // In example_game the termino drops 17 cells till it stops
            const expectedScore = 2 * 17;
    
            if (game.score.score !== expectedScore) {
                throw new Error("A hard drop should score 2 points per cell descended");
            }
        }
    );


    it(
        `Advancing the turn without manually dropping scores nothing`,
        function () {
            let game = example_game;

            // Advance the turn without manually dropping.
            game = Tetris.next_turn(game);

            if (game.score.score !== 0) {
                throw new Error("Advancing the turn without manually dropping should score nothing");
            }
        }
    );
});
