(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var chuckjoke_1 = require("../model/chuckjoke");
var dadjoke_1 = require("../model/dadjoke");
var report_1 = require("../model/report");
var score_1 = require("../model/score");
var ui_1 = require("../model/ui");
var weather_1 = require("../model/weather");
//DOM Events Controller 
var ui = new ui_1.UI();
var joke = new dadjoke_1.DadJoke();
var report = new report_1.Report();
var weather;
/** Event onLoad */
window.addEventListener('load', function () {
    weather = new weather_1.Weather();
    weather.getCoords()
        .then(function (response) {
        console.log(response);
        weather.fetchWeather(response)
            .then(function (result) { return ui.showWeather((result)); });
    });
});
/** Events onClick */
document.addEventListener('click', function (evt) {
    switch (evt.target.id) {
        case "action-button":
            // show Dad or Chuck Jokes 50-50
            (Math.floor(Math.random() * 100) % 2) ? joke = new dadjoke_1.DadJoke() : joke = new chuckjoke_1.ChuckJoke();
            console.log("Dad: " + (joke instanceof dadjoke_1.DadJoke));
            joke.fetchAJoke()
                .then(function (response) {
                joke = response;
                ui.showJoke(response);
                ui.showRatingButtons();
            })["catch"](function (error) { return console.error(error); });
            break;
        case "score-button":
            var points = parseInt(evt.target.name);
            var score = new score_1.Score(joke, points);
            if (report.addScore(score)) {
                console.log(report);
                ui.showAlert("You voted " + points + " points", "success");
            }
            else {
                ui.showAlert("You can't vote twice, bro.", "danger");
            }
            break;
    }
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
});

},{"../model/chuckjoke":2,"../model/dadjoke":3,"../model/report":4,"../model/score":5,"../model/ui":6,"../model/weather":7}],2:[function(require,module,exports){
"use strict";
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
exports.__esModule = true;
exports.ChuckJoke = void 0;
var ChuckJoke = /** @class */ (function () {
    function ChuckJoke() {
        this.id = '';
        this.joke = '';
        this.value = '';
        this.status = -1;
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    ChuckJoke.prototype.fetchAJoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, joke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.chucknorris.io/jokes/random';
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
    return ChuckJoke;
}());
exports.ChuckJoke = ChuckJoke;

},{}],3:[function(require,module,exports){
"use strict";
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
exports.__esModule = true;
exports.DadJoke = void 0;
var DadJoke = /** @class */ (function () {
    function DadJoke() {
        this.id = '';
        this.joke = '';
        this.value = '';
        this.status = -1;
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    DadJoke.prototype.fetchAJoke = function () {
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
    return DadJoke;
}());
exports.DadJoke = DadJoke;

},{}],4:[function(require,module,exports){
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
    /**If the user had been scored that joke before, returns false */
    Report.prototype.addScore = function (score) {
        //una condición para evitar puntuar el mismo chiste 2 veces
        if (this.jokesReport.find(function (item) { return score.joke === item.joke; })) {
            //    console.log("Report, the score is already here")
            return false;
        }
        else {
            this.jokesReport.push(score);
            //    console.log("Report, the score has been added")
            return true;
        }
    };
    return Report;
}());
exports.Report = Report;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.UI = void 0;
/** Esta clase tiene métodos para gestionar la vista */
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.showAlert = function (message, cssClass) {
        var div = document.createElement('small');
        div.className = "alert alert-" + cssClass + " mt-3 w-50 ms-3 me-auto";
        div.appendChild(document.createTextNode(message));
        // showing in DOM
        var container = document.querySelector('#container');
        var app = document.querySelector('#app-jokes');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1500);
    };
    UI.prototype.showWeather = function (data) {
        var app = document.querySelector('#app-weather');
        var weatherDisplay = document.createElement('p');
        var span = document.createElement('p');
        weatherDisplay.className = "text-primary ms-3";
        span.className = "ms-3 text-info";
        weatherDisplay.textContent = "Today's weather:";
        span.textContent = "" + data.weather[0].main;
        app.appendChild(weatherDisplay);
        app.appendChild(span);
    };
    /** este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    UI.prototype.showJoke = function (data) {
        var _a;
        this.joke = data;
        this.joke.value === undefined ? this.joke.value = '' : this.joke.joke = '';
        var app = document.querySelector('#app-jokes');
        var div = document.createElement('div');
        if (app.hasChildNodes()) {
            (_a = app.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
        div.innerHTML = "\n        <div class=\"m-auto px-3 py-2\">\n            <p class=\"text-center pt-5\">" + data.value + data.joke + "</p>\n        </div>\n        ";
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
        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around fade-in";
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
exports.UI = UI;

},{}],7:[function(require,module,exports){
"use strict";
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
exports.__esModule = true;
exports.Weather = void 0;
var Weather = /** @class */ (function () {
    function Weather() {
        this.description = '';
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    Weather.prototype.fetchWeather = function (coords) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, units, url, options, response, weatherInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setTimeout(function () {
                            //gran parche que hace que la request del tiempo se espere medio segundo para que así le de tiempo de finalizarse a la otra request de coordenadas
                        }, 500);
                        appId = 'b0147f6411b11c4795a9f9e4bebc27a3';
                        units = 'metric';
                        url = "http://api.openweathermap.org/data/2.5/weather?appid=" + appId + "&units=" + units + "&lat=" + coords[0] + "&lon=" + coords[1];
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
                        weatherInfo = _a.sent();
                        console.log(weatherInfo);
                        return [2 /*return*/, weatherInfo];
                }
            });
        });
    };
    Weather.prototype.getCoords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var coords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coords = [];
                        if (!navigator.geolocation) return [3 /*break*/, 2];
                        return [4 /*yield*/, navigator.geolocation.getCurrentPosition(function (position) {
                                coords.push(position.coords.latitude.toString());
                                coords.push(position.coords.longitude.toString());
                                console.log("getCoords(): lat=" + coords[0] + " / long: " + coords[1]);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log("before return: lat=" + coords[0] + " / long: " + coords[1]); //no llegan las coords
                        return [2 /*return*/, coords];
                }
            });
        });
    };
    return Weather;
}());
exports.Weather = Weather;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRyb2xsZXIuanMiLCIuLi9tb2RlbC9jaHVja2pva2UuanMiLCIuLi9tb2RlbC9kYWRqb2tlLmpzIiwiLi4vbW9kZWwvcmVwb3J0LmpzIiwiLi4vbW9kZWwvc2NvcmUuanMiLCIuLi9tb2RlbC91aS5qcyIsIi4uL21vZGVsL3dlYXRoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGNodWNram9rZV8xID0gcmVxdWlyZShcIi4uL21vZGVsL2NodWNram9rZVwiKTtcclxudmFyIGRhZGpva2VfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9kYWRqb2tlXCIpO1xyXG52YXIgcmVwb3J0XzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvcmVwb3J0XCIpO1xyXG52YXIgc2NvcmVfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9zY29yZVwiKTtcclxudmFyIHVpXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvdWlcIik7XHJcbnZhciB3ZWF0aGVyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvd2VhdGhlclwiKTtcclxuLy9ET00gRXZlbnRzIENvbnRyb2xsZXIgXHJcbnZhciB1aSA9IG5ldyB1aV8xLlVJKCk7XHJcbnZhciBqb2tlID0gbmV3IGRhZGpva2VfMS5EYWRKb2tlKCk7XHJcbnZhciByZXBvcnQgPSBuZXcgcmVwb3J0XzEuUmVwb3J0KCk7XHJcbnZhciB3ZWF0aGVyO1xyXG4vKiogRXZlbnQgb25Mb2FkICovXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2VhdGhlciA9IG5ldyB3ZWF0aGVyXzEuV2VhdGhlcigpO1xyXG4gICAgd2VhdGhlci5nZXRDb29yZHMoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICB3ZWF0aGVyLmZldGNoV2VhdGhlcihyZXNwb25zZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkgeyByZXR1cm4gdWkuc2hvd1dlYXRoZXIoKHJlc3VsdCkpOyB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuLyoqIEV2ZW50cyBvbkNsaWNrICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgc3dpdGNoIChldnQudGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgY2FzZSBcImFjdGlvbi1idXR0b25cIjpcclxuICAgICAgICAgICAgLy8gc2hvdyBEYWQgb3IgQ2h1Y2sgSm9rZXMgNTAtNTBcclxuICAgICAgICAgICAgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAyKSA/IGpva2UgPSBuZXcgZGFkam9rZV8xLkRhZEpva2UoKSA6IGpva2UgPSBuZXcgY2h1Y2tqb2tlXzEuQ2h1Y2tKb2tlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGFkOiBcIiArIChqb2tlIGluc3RhbmNlb2YgZGFkam9rZV8xLkRhZEpva2UpKTtcclxuICAgICAgICAgICAgam9rZS5mZXRjaEFKb2tlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgam9rZSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0pva2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd1JhdGluZ0J1dHRvbnMoKTtcclxuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInNjb3JlLWJ1dHRvblwiOlxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gcGFyc2VJbnQoZXZ0LnRhcmdldC5uYW1lKTtcclxuICAgICAgICAgICAgdmFyIHNjb3JlID0gbmV3IHNjb3JlXzEuU2NvcmUoam9rZSwgcG9pbnRzKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydC5hZGRTY29yZShzY29yZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcG9ydCk7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93QWxlcnQoXCJZb3Ugdm90ZWQgXCIgKyBwb2ludHMgKyBcIiBwb2ludHNcIiwgXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdWkuc2hvd0FsZXJ0KFwiWW91IGNhbid0IHZvdGUgdHdpY2UsIGJyby5cIiwgXCJkYW5nZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICAvKiogSW50ZW50YW5kbyBzdXN0aXR1aXIgZWwgc3dpdGNoIHBvciB1biBhY3Rpb24gbWFwICovXHJcbiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgTWFwKClcclxuICAgIC8vICAgICAuc2V0KFwiYWN0aW9uLWJ1dHRvblwiLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHVpOiBVSSA9IG5ldyBVSSgpO1xyXG4gICAgLy8gICAgICAgICBqb2tlLmZldGNoQUpva2UoKVxyXG4gICAgLy8gICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGpva2UgPSByZXNwb25zZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1aS5zaG93Sm9rZShyZXNwb25zZSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdWkuc2hvd1JhdGluZ0J1dHRvbnMoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgLnNldChcInNjb3JlLWJ1dHRvblwiLCAoKT0+e1xyXG4gICAgLy8gICAgICAgICBsZXQgcG9pbnRzID0gcGFyc2VJbnQoKGV2dC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkubmFtZSk7XHJcbiAgICAvLyAgICAgICAgIGxldCBzY29yZSA9IG5ldyBTY29yZShqb2tlLCBwb2ludHMpO1xyXG4gICAgLy8gICAgICAgICByZXBvcnQuYWRkU2NvcmUoc2NvcmUpO1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXBvcnQpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgIHJlc3VsdC5nZXQoKGV2dC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuaWQpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuQ2h1Y2tKb2tlID0gdm9pZCAwO1xyXG52YXIgQ2h1Y2tKb2tlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ2h1Y2tKb2tlKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSAnJztcclxuICAgICAgICB0aGlzLmpva2UgPSAnJztcclxuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAtMTtcclxuICAgIH1cclxuICAgIC8vIExhIGZ1bmNpw7NuIHJlYWxpemEgdW5hIGxsYW1hZGEgYSBsYSBBUEkgeSBjb25zdHJ1eWUvZGV2dWVsdmUgdW4gb2JqZXRvIEpva2UgY29uIGxvcyBkYXRvcyBkZSBsYSByZXNwdWVzdGEgXHJcbiAgICBDaHVja0pva2UucHJvdG90eXBlLmZldGNoQUpva2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsLCBvcHRpb25zLCByZXNwb25zZSwgam9rZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vYXBpLmNodWNrbm9ycmlzLmlvL2pva2VzL3JhbmRvbSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHVybCwgb3B0aW9ucyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqb2tlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgam9rZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDaHVja0pva2U7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQ2h1Y2tKb2tlID0gQ2h1Y2tKb2tlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuRGFkSm9rZSA9IHZvaWQgMDtcclxudmFyIERhZEpva2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEYWRKb2tlKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSAnJztcclxuICAgICAgICB0aGlzLmpva2UgPSAnJztcclxuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAtMTtcclxuICAgIH1cclxuICAgIC8vIExhIGZ1bmNpw7NuIHJlYWxpemEgdW5hIGxsYW1hZGEgYSBsYSBBUEkgeSBjb25zdHJ1eWUvZGV2dWVsdmUgdW4gb2JqZXRvIEpva2UgY29uIGxvcyBkYXRvcyBkZSBsYSByZXNwdWVzdGEgXHJcbiAgICBEYWRKb2tlLnByb3RvdHlwZS5mZXRjaEFKb2tlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHVybCwgb3B0aW9ucywgcmVzcG9uc2UsIGpva2U7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2ljYW5oYXpkYWRqb2tlLmNvbS8nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh1cmwsIG9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgam9rZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGpva2VdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGFkSm9rZTtcclxufSgpKTtcclxuZXhwb3J0cy5EYWRKb2tlID0gRGFkSm9rZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuUmVwb3J0ID0gdm9pZCAwO1xyXG4vKiogRXN0YSBjbGFzcyByZWFsaXphIGVsIHNlZ3VpbWllbnRvIGRlIHVzbyBkZSBsYSB3ZWIuXHJcbiogVGllbmUgdW4gYXJyYXkgcXVlIGd1YXJkYSBvYmpldG9zIGRlbCB0aXBvIHsgam9rZTogc3RyaW5nLCBzY29yZTogbnVtYmVyLCBkYXRlOiBkYXRlIH1cclxuKiBUaWVuZSB1biBtw6l0b2RvIHF1ZSBtdWVzdHJhIHBvciBjb25zb2xhIGVsIHJlcG9ydFxyXG4qL1xyXG52YXIgUmVwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmVwb3J0KCkge1xyXG4gICAgICAgIHRoaXMuam9rZXNSZXBvcnQgPSBbXTtcclxuICAgIH1cclxuICAgIC8qKklmIHRoZSB1c2VyIGhhZCBiZWVuIHNjb3JlZCB0aGF0IGpva2UgYmVmb3JlLCByZXR1cm5zIGZhbHNlICovXHJcbiAgICBSZXBvcnQucHJvdG90eXBlLmFkZFNjb3JlID0gZnVuY3Rpb24gKHNjb3JlKSB7XHJcbiAgICAgICAgLy91bmEgY29uZGljacOzbiBwYXJhIGV2aXRhciBwdW50dWFyIGVsIG1pc21vIGNoaXN0ZSAyIHZlY2VzXHJcbiAgICAgICAgaWYgKHRoaXMuam9rZXNSZXBvcnQuZmluZChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gc2NvcmUuam9rZSA9PT0gaXRlbS5qb2tlOyB9KSkge1xyXG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIlJlcG9ydCwgdGhlIHNjb3JlIGlzIGFscmVhZHkgaGVyZVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmpva2VzUmVwb3J0LnB1c2goc2NvcmUpO1xyXG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIlJlcG9ydCwgdGhlIHNjb3JlIGhhcyBiZWVuIGFkZGVkXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVwb3J0O1xyXG59KCkpO1xyXG5leHBvcnRzLlJlcG9ydCA9IFJlcG9ydDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuU2NvcmUgPSB2b2lkIDA7XHJcbi8qKiBFc3RhIGNsYXNzZSByZXByZXNlbnRhIGxhcyBwdW50dWFjaW9uZXMgZGUgbG9zIGNoaXN0ZXMgKi9cclxudmFyIFNjb3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU2NvcmUoam9rZSwgc2NvcmUpIHtcclxuICAgICAgICB0aGlzLmpva2UgPSBqb2tlO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU2NvcmU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuU2NvcmUgPSBTY29yZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuVUkgPSB2b2lkIDA7XHJcbi8qKiBFc3RhIGNsYXNlIHRpZW5lIG3DqXRvZG9zIHBhcmEgZ2VzdGlvbmFyIGxhIHZpc3RhICovXHJcbnZhciBVSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFVJKCkge1xyXG4gICAgfVxyXG4gICAgVUkucHJvdG90eXBlLnNob3dBbGVydCA9IGZ1bmN0aW9uIChtZXNzYWdlLCBjc3NDbGFzcykge1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzbWFsbCcpO1xyXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImFsZXJ0IGFsZXJ0LVwiICsgY3NzQ2xhc3MgKyBcIiBtdC0zIHctNTAgbXMtMyBtZS1hdXRvXCI7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKTtcclxuICAgICAgICAvLyBzaG93aW5nIGluIERPTVxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgICAgICAgdmFyIGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtam9rZXMnKTtcclxuICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGRpdiwgYXBwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICB9O1xyXG4gICAgVUkucHJvdG90eXBlLnNob3dXZWF0aGVyID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC13ZWF0aGVyJyk7XHJcbiAgICAgICAgdmFyIHdlYXRoZXJEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHdlYXRoZXJEaXNwbGF5LmNsYXNzTmFtZSA9IFwidGV4dC1wcmltYXJ5IG1zLTNcIjtcclxuICAgICAgICBzcGFuLmNsYXNzTmFtZSA9IFwibXMtMyB0ZXh0LWluZm9cIjtcclxuICAgICAgICB3ZWF0aGVyRGlzcGxheS50ZXh0Q29udGVudCA9IFwiVG9kYXkncyB3ZWF0aGVyOlwiO1xyXG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBcIlwiICsgZGF0YS53ZWF0aGVyWzBdLm1haW47XHJcbiAgICAgICAgYXBwLmFwcGVuZENoaWxkKHdlYXRoZXJEaXNwbGF5KTtcclxuICAgICAgICBhcHAuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICB9O1xyXG4gICAgLyoqIGVzdGUgbcOpdG9kbyBjcmVhIHVuIDxkaXY+IHkgc3UgaGlqbyA8cD4geSBzZSBlbmNhcmdhIGRlIHBpbnRhciBlbCBwYXLDoW1ldHJvIHJlY2liaWRvIGVuIGRpY2hvIDxwPiAqL1xyXG4gICAgVUkucHJvdG90eXBlLnNob3dKb2tlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gZGF0YTtcclxuICAgICAgICB0aGlzLmpva2UudmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXMuam9rZS52YWx1ZSA9ICcnIDogdGhpcy5qb2tlLmpva2UgPSAnJztcclxuICAgICAgICB2YXIgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1qb2tlcycpO1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpZiAoYXBwLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAoX2EgPSBhcHAuZmlyc3RDaGlsZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm0tYXV0byBweC0zIHB5LTJcXFwiPlxcbiAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBwdC01XFxcIj5cIiArIGRhdGEudmFsdWUgKyBkYXRhLmpva2UgKyBcIjwvcD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCI7XHJcbiAgICAgICAgYXBwLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEVzdGUgbWV0b2RvIG11ZXN0cmEgbG9zIGJvdG9uZXMgZGUgcmF0aW5nIGEgbGEgdmV6IHF1ZSBzZSBtdWVzdHJhIGVsIGNoaXN0ZS4gKi9cclxuICAgIFVJLnByb3RvdHlwZS5zaG93UmF0aW5nQnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1qb2tlcycpO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidXR0b25Hcm91cCcpOyAvL2VzdGEgdmFyaWFibGUgY29udHJvbGEgc2kgZWwgZWxlbWVudG8geWEgZXhpc3RlIGVuIGVsIERPTVxyXG4gICAgICAgIHZhciBidXR0b25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHZhciBidG5CZyA9IFsnZGFuZ2VyJywgJ3dhcm5pbmcnLCAnc3VjY2VzcyddOyAvL3VuIGFycmF5IHBhcmEgcGludGFyIGxvcyBib3RvbmVzIGRlbnRybyBkZSB1biBidWNsZVxyXG4gICAgICAgIHZhciBidG5WYWx1ZSA9IFsnSnVzdC4uLiBOTycsICdIZSBoZScsICdJIGxvbGVkISddOyAvL3VuIGFycmF5IHBhcmEgcGludGFyIGxvcyBib3RvbmVzIGRlbnRybyBkZSB1biBidWNsZVxyXG4gICAgICAgIGJ1dHRvbkdyb3VwLmNsYXNzTmFtZSA9IFwiYnRuLWdyb3VwIGJ0bi1ncm91cC10b2dnbGUgcHQtNCBkLWZsZXggZmxleC1yb3cganVzdGlmeS1jb250ZW50LWFyb3VuZCBmYWRlLWluXCI7XHJcbiAgICAgICAgYnV0dG9uR3JvdXAuaWQgPSBcImJ1dHRvbkdyb3VwXCI7XHJcbiAgICAgICAgLy8gZXN0byBjcmVhIDMgYm90b25lcyBjb24gYXRyaWJ1dG8geSBoYWNlIGFwcGVuZENoaWxkIGVuIGJ1dHRvbkdyb3VwXHJcbiAgICAgICAgLy9uYW1lID0gXCIxLCAyIG8gM1wiIC8vdHlwZSA9IFwic3VibWl0XCIgLy92YWx1ZSA9IGRlIG1vbWVudG8gdW4gc3RyaW5nICAvL3kgbG9zIGljb25vczogIFRPRE86IGJ1c2NhcmxvcyB5IHBvbmVybG9zIGNvbW8gYnRuSW1nLlxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgYi5jbGFzc05hbWUgPSBcImJ0biBidG4tXCIgKyBidG5CZ1tpXSArIFwiIFwiO1xyXG4gICAgICAgICAgICBiLmlkID0gXCJzY29yZS1idXR0b25cIjtcclxuICAgICAgICAgICAgYi5uYW1lID0gXCJcIiArIChpICsgMSk7XHJcbiAgICAgICAgICAgIGIudHlwZSA9IFwic3VibWl0XCI7XHJcbiAgICAgICAgICAgIGIudmFsdWUgPSBcIlwiICsgYnRuVmFsdWVbaV07XHJcbiAgICAgICAgICAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29udGFpbmVyLmNoaWxkRWxlbWVudENvdW50ID49IDMpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRhaW5lciA9PT0gbnVsbCB8fCBjb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoYnV0dG9uR3JvdXAsIGFwcCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFVJO1xyXG59KCkpO1xyXG5leHBvcnRzLlVJID0gVUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5XZWF0aGVyID0gdm9pZCAwO1xyXG52YXIgV2VhdGhlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYXRoZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gTGEgZnVuY2nDs24gcmVhbGl6YSB1bmEgbGxhbWFkYSBhIGxhIEFQSSB5IGNvbnN0cnV5ZS9kZXZ1ZWx2ZSB1biBvYmpldG8gSm9rZSBjb24gbG9zIGRhdG9zIGRlIGxhIHJlc3B1ZXN0YSBcclxuICAgIFdlYXRoZXIucHJvdG90eXBlLmZldGNoV2VhdGhlciA9IGZ1bmN0aW9uIChjb29yZHMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcHBJZCwgdW5pdHMsIHVybCwgb3B0aW9ucywgcmVzcG9uc2UsIHdlYXRoZXJJbmZvO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JhbiBwYXJjaGUgcXVlIGhhY2UgcXVlIGxhIHJlcXVlc3QgZGVsIHRpZW1wbyBzZSBlc3BlcmUgbWVkaW8gc2VndW5kbyBwYXJhIHF1ZSBhc8OtIGxlIGRlIHRpZW1wbyBkZSBmaW5hbGl6YXJzZSBhIGxhIG90cmEgcmVxdWVzdCBkZSBjb29yZGVuYWRhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBJZCA9ICdiMDE0N2Y2NDExYjExYzQ3OTVhOWY5ZTRiZWJjMjdhMyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzID0gJ21ldHJpYyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9hcHBpZD1cIiArIGFwcElkICsgXCImdW5pdHM9XCIgKyB1bml0cyArIFwiJmxhdD1cIiArIGNvb3Jkc1swXSArIFwiJmxvbj1cIiArIGNvb3Jkc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godXJsLCBvcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYXRoZXJJbmZvID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVySW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB3ZWF0aGVySW5mb107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYXRoZXIucHJvdG90eXBlLmdldENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29yZHM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbikgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2gocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRDb29yZHMoKTogbGF0PVwiICsgY29vcmRzWzBdICsgXCIgLyBsb25nOiBcIiArIGNvb3Jkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmVmb3JlIHJldHVybjogbGF0PVwiICsgY29vcmRzWzBdICsgXCIgLyBsb25nOiBcIiArIGNvb3Jkc1sxXSk7IC8vbm8gbGxlZ2FuIGxhcyBjb29yZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNvb3Jkc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWF0aGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLldlYXRoZXIgPSBXZWF0aGVyO1xyXG4iXX0=
