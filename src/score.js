"use strict";
exports.__esModule = true;
exports.Score = void 0;
/** Esta classe representa las puntuaciones de los chistes */
var Score = /** @class */ (function () {
    function Score(joke, score) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
    return Score;
}());
exports.Score = Score;
