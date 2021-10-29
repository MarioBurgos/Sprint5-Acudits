"use strict";
exports.__esModule = true;
exports.Report = void 0;
/** Esta class realiza el seguimiento de uso de la web.
* Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
* Tiene un método que muestra por consola el report
*/
var Report = /** @class */ (function () {
    function Report() {
        this.jokesReport = [];
    }
    Report.prototype.addScore = function (score) {
        //una condición para evitar puntuar el mismo chiste 2 veces
        if (this.jokesReport.find(function (item) { return score.joke === item.joke; })) {
            //do nothing
        }
        else {
            this.jokesReport.push(score);
        }
    };
    return Report;
}());
exports.Report = Report;
