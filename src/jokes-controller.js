// import { Joke } from "./joke";
// import { Report } from "./report";
// import { Score } from "./score";
// import { UI } from "./ui";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** Esta clase define la estructura de Joke.  Tiene un método que bebe de una API y devuelve nuevos Jokes. */
var Joke = /** @class */ (function () {
    function Joke() {
        this.id = '';
        this.joke = '';
        this.status = -1;
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    Joke.prototype.fetchADadJoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, joke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://icanhazdadjoke.com/';
                        options = {
                            method: 'GET',
                            headers: {
                                "Accept": "application/json"
                            }
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        joke = _a.sent();
                        return [2 /*return*/, joke];
                }
            });
        });
    };
    return Joke;
}());
/** Esta classe representa las puntuaciones de los chistes */
var Score = /** @class */ (function () {
    function Score(joke, score) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
    return Score;
}());
/** Esta class realiza el seguimiento de uso de la web.
 * Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
 * Tiene un método que muestra por consola el report
 */
var Report = /** @class */ (function () {
    function Report() {
        this.jokesReport = new Array();
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
/** Esta clase tiene métodos para gestionar la vista */
var UI = /** @class */ (function () {
    function UI() {
    }
    /** Como su nombre indica, este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    UI.prototype.showJoke = function (data) {
        var _a;
        this.joke = data;
        var app = document.querySelector('#app-jokes');
        var div = document.createElement('div');
        if (app.hasChildNodes()) {
            (_a = app.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
        div.innerHTML = "\n        <div class=\"m-auto px-3 py-2\">\n            <p class=\"text-center pt-5\"> " + data.joke + "</p>\n        </div>\n        ";
        app.appendChild(div);
    };
    /** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */
    UI.prototype.showRatingButtons = function () {
        var app = document.querySelector('#app-jokes');
        var container = document.querySelector('#container');
        var div = document.querySelector('#buttonGroup'); //esta variable controla si el elemento ya existe en el DOM
        var buttonGroup = document.createElement('div');
        var btnBg = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
        var btnValue = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle
        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around";
        buttonGroup.id = "buttonGroup";
        // esto crea 3 botones con atributo y hace appendChild en buttonGroup
        //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.
        for (var i = 0; i < 3; i++) {
            var b = document.createElement('input');
            b.className = "btn btn-" + btnBg[i] + " ";
            b.id = "score-button";
            b.name = "" + (i + 1);
            b.type = "submit";
            b.value = "" + btnValue[i];
            buttonGroup.appendChild(b);
        }
        if (container.childElementCount >= 3) {
            container.removeChild(div);
        }
        container === null || container === void 0 ? void 0 : container.insertBefore(buttonGroup, app);
    };
    return UI;
}());
/**/
//DOM Events Controller
//una variable Joke que actuará de forma global para poder pasar el chiste al listener de score
var joke = new Joke();
var report = new Report();
document.addEventListener('click', function (evt) {
    /** Intentando sustituir el switch por un action map */
    // const result = new Map()
    //     .set("action-button", () => {
    //         const ui: UI = new UI();
    //         joke.fetchAJoke()
    //             .then(response => {
    //                 joke = response;
    //                 ui.showJoke(response);
    //                 ui.showRatingButtons();
    //             })
    //             .catch(error => console.error(error));
    //     })
    //     .set("score-button", ()=>{
    //         let points = parseInt((evt.target as HTMLInputElement).name);
    //         let score = new Score(joke, points);
    //         report.addScore(score);
    //         console.log(report);
    //     });
    //     result.get((evt.target as HTMLInputElement).id);
    //     console.log(result);
    switch (evt.target.id) {
        case "action-button":
            var ui_1 = new UI();
            joke = new Joke();
            joke.fetchADadJoke()
                .then(function (response) {
                joke = response;
                ui_1.showJoke(response);
                ui_1.showRatingButtons();
            })["catch"](function (error) { return console.error(error); });
            break;
        case "score-button":
            var points = parseInt(evt.target.name);
            var score = new Score(joke, points);
            report.addScore(score);
            console.log(report);
            break;
    }
});