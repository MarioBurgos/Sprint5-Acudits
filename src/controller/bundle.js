(function() {
    function r(e, n, t) {
        function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function(r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]); return o } return r })()({
    1: [function(require, module, exports) {
        "use strict";
        exports.__esModule = true;
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
        document.addEventListener('click', function(evt) {
            switch (evt.target.id) {
                case "action-button":
                    joke = new dadjoke_1.DadJoke();
                    joke.fetchAJoke()
                        .then(function(response) {
                            joke = response;
                            ui.showJoke(response);
                            ui.showRatingButtons();
                        })["catch"](function(error) { return console.error(error); });
                    break;
                case "score-button":
                    var points = parseInt(evt.target.name);
                    var score = new score_1.Score(joke, points);
                    report.addScore(score);
                    console.log(report);
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
        window.addEventListener('load', function() {
            weather = new weather_1.Weather();
            weather.getCoords()
                .then(function(response) {
                    console.log(response);
                    weather.fetchWeather(response)
                        .then(function(result) { return ui.showWeather((result)); });
                });
        });

    }, { "../model/dadjoke": 2, "../model/report": 3, "../model/score": 4, "../model/ui": 5, "../model/weather": 6 }],
    2: [function(require, module, exports) {
        "use strict";
        var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
            return new(P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        var __generator = (this && this.__generator) || function(thisArg, body) {
            var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
                f, y, t, g;
            return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

            function verb(n) { return function(v) { return step([n, v]); }; }

            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                            if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
                                t = op; break; }
                            if (t && _.label < t[2]) { _.label = t[2];
                                _.ops.push(op); break; }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) { op = [6, e];
                    y = 0; } finally { f = t = 0; }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
        exports.__esModule = true;
        exports.DadJoke = void 0;
        var DadJoke = /** @class */ (function() {
            function DadJoke() {
                this.id = '';
                this.joke = '';
                this.status = -1;
            }
            // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
            DadJoke.prototype.fetchAJoke = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var url, options, response, joke;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                url = 'https://icanhazdadjoke.com/';
                                options = {
                                    method: 'GET',
                                    headers: {
                                        "Accept": "application/json"
                                    }
                                };
                                return [4 /*yield*/ , fetch(url, options)];
                            case 1:
                                response = _a.sent();
                                return [4 /*yield*/ , response.json()];
                            case 2:
                                joke = _a.sent();
                                return [2 /*return*/ , joke];
                        }
                    });
                });
            };
            return DadJoke;
        }());
        exports.DadJoke = DadJoke;

    }, {}],
    3: [function(require, module, exports) {
        "use strict";
        exports.__esModule = true;
        exports.Report = void 0;
        /** Esta class realiza el seguimiento de uso de la web.
         * Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
         * Tiene un método que muestra por consola el report
         */
        var Report = /** @class */ (function() {
            function Report() {
                this.jokesReport = [];
            }
            Report.prototype.addScore = function(score) {
                //una condición para evitar puntuar el mismo chiste 2 veces
                if (this.jokesReport.find(function(item) { return score.joke === item.joke; })) {
                    //do nothing
                } else {
                    this.jokesReport.push(score);
                }
            };
            return Report;
        }());
        exports.Report = Report;

    }, {}],
    4: [function(require, module, exports) {
        "use strict";
        exports.__esModule = true;
        exports.Score = void 0;
        /** Esta classe representa las puntuaciones de los chistes */
        var Score = /** @class */ (function() {
            function Score(joke, score) {
                this.joke = joke;
                this.score = score;
                this.date = new Date().toISOString();
            }
            return Score;
        }());
        exports.Score = Score;

    }, {}],
    5: [function(require, module, exports) {
        "use strict";
        exports.__esModule = true;
        exports.UI = void 0;
        /** Esta clase tiene métodos para gestionar la vista */
        var UI = /** @class */ (function() {
            function UI() {}
            UI.prototype.showWeather = function(data) {
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
            UI.prototype.showJoke = function(data) {
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
            UI.prototype.showRatingButtons = function() {
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
        exports.UI = UI;

    }, {}],
    6: [function(require, module, exports) {
        "use strict";
        var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
            return new(P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        var __generator = (this && this.__generator) || function(thisArg, body) {
            var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
                f, y, t, g;
            return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

            function verb(n) { return function(v) { return step([n, v]); }; }

            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                            if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
                                t = op; break; }
                            if (t && _.label < t[2]) { _.label = t[2];
                                _.ops.push(op); break; }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) { op = [6, e];
                    y = 0; } finally { f = t = 0; }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
        exports.__esModule = true;
        exports.Weather = void 0;
        var Weather = /** @class */ (function() {
            function Weather() {
                this.description = '';
            }
            // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
            Weather.prototype.fetchWeather = function(coords) {
                return __awaiter(this, void 0, void 0, function() {
                    var appId, units, url, options, response, weatherInfo;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                setTimeout(function() {
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
                                return [4 /*yield*/ , fetch(url, options)];
                            case 1:
                                response = _a.sent();
                                return [4 /*yield*/ , response.json()];
                            case 2:
                                weatherInfo = _a.sent();
                                console.log(weatherInfo);
                                return [2 /*return*/ , weatherInfo];
                        }
                    });
                });
            };
            Weather.prototype.getCoords = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var coords;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                coords = [];
                                if (!navigator.geolocation) return [3 /*break*/ , 2];
                                return [4 /*yield*/ , navigator.geolocation.getCurrentPosition(function(position) {
                                    coords.push(position.coords.latitude.toString());
                                    coords.push(position.coords.longitude.toString());
                                    console.log("getCoords(): lat=" + coords[0] + " / long: " + coords[1]);
                                })];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                console.log("before return: lat=" + coords[0] + " / long: " + coords[1]); //no llegan las coords
                                return [2 /*return*/ , coords];
                        }
                    });
                });
            };
            return Weather;
        }());
        exports.Weather = Weather;

    }, {}]
}, {}, [1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRyb2xsZXIuanMiLCIuLi9tb2RlbC9kYWRqb2tlLmpzIiwiLi4vbW9kZWwvcmVwb3J0LmpzIiwiLi4vbW9kZWwvc2NvcmUuanMiLCIuLi9tb2RlbC91aS5qcyIsIi4uL21vZGVsL3dlYXRoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgZGFkam9rZV8xID0gcmVxdWlyZShcIi4uL21vZGVsL2RhZGpva2VcIik7XHJcbnZhciByZXBvcnRfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9yZXBvcnRcIik7XHJcbnZhciBzY29yZV8xID0gcmVxdWlyZShcIi4uL21vZGVsL3Njb3JlXCIpO1xyXG52YXIgdWlfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC91aVwiKTtcclxudmFyIHdlYXRoZXJfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC93ZWF0aGVyXCIpO1xyXG4vL0RPTSBFdmVudHMgQ29udHJvbGxlciBcclxudmFyIHVpID0gbmV3IHVpXzEuVUkoKTtcclxudmFyIGpva2UgPSBuZXcgZGFkam9rZV8xLkRhZEpva2UoKTtcclxudmFyIHJlcG9ydCA9IG5ldyByZXBvcnRfMS5SZXBvcnQoKTtcclxudmFyIHdlYXRoZXI7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgc3dpdGNoIChldnQudGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgY2FzZSBcImFjdGlvbi1idXR0b25cIjpcclxuICAgICAgICAgICAgam9rZSA9IG5ldyBkYWRqb2tlXzEuRGFkSm9rZSgpO1xyXG4gICAgICAgICAgICBqb2tlLmZldGNoQUpva2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBqb2tlID0gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93Sm9rZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB1aS5zaG93UmF0aW5nQnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gY29uc29sZS5lcnJvcihlcnJvcik7IH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic2NvcmUtYnV0dG9uXCI6XHJcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBwYXJzZUludChldnQudGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBuZXcgc2NvcmVfMS5TY29yZShqb2tlLCBwb2ludHMpO1xyXG4gICAgICAgICAgICByZXBvcnQuYWRkU2NvcmUoc2NvcmUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXBvcnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIC8qKiBJbnRlbnRhbmRvIHN1c3RpdHVpciBlbCBzd2l0Y2ggcG9yIHVuIGFjdGlvbiBtYXAgKi9cclxuICAgIC8vIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXAoKVxyXG4gICAgLy8gICAgIC5zZXQoXCJhY3Rpb24tYnV0dG9uXCIsICgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc3QgdWk6IFVJID0gbmV3IFVJKCk7XHJcbiAgICAvLyAgICAgICAgIGpva2UuZmV0Y2hBSm9rZSgpXHJcbiAgICAvLyAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgam9rZSA9IHJlc3BvbnNlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVpLnNob3dKb2tlKHJlc3BvbnNlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1aS5zaG93UmF0aW5nQnV0dG9ucygpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICAuc2V0KFwic2NvcmUtYnV0dG9uXCIsICgpPT57XHJcbiAgICAvLyAgICAgICAgIGxldCBwb2ludHMgPSBwYXJzZUludCgoZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5uYW1lKTtcclxuICAgIC8vICAgICAgICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKGpva2UsIHBvaW50cyk7XHJcbiAgICAvLyAgICAgICAgIHJlcG9ydC5hZGRTY29yZShzY29yZSk7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcG9ydCk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgcmVzdWx0LmdldCgoZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5pZCk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2VhdGhlciA9IG5ldyB3ZWF0aGVyXzEuV2VhdGhlcigpO1xyXG4gICAgd2VhdGhlci5nZXRDb29yZHMoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICB3ZWF0aGVyLmZldGNoV2VhdGhlcihyZXNwb25zZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkgeyByZXR1cm4gdWkuc2hvd1dlYXRoZXIoKHJlc3VsdCkpOyB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLkRhZEpva2UgPSB2b2lkIDA7XHJcbnZhciBEYWRKb2tlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRGFkSm9rZSgpIHtcclxuICAgICAgICB0aGlzLmlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAtMTtcclxuICAgIH1cclxuICAgIC8vIExhIGZ1bmNpw7NuIHJlYWxpemEgdW5hIGxsYW1hZGEgYSBsYSBBUEkgeSBjb25zdHJ1eWUvZGV2dWVsdmUgdW4gb2JqZXRvIEpva2UgY29uIGxvcyBkYXRvcyBkZSBsYSByZXNwdWVzdGEgXHJcbiAgICBEYWRKb2tlLnByb3RvdHlwZS5mZXRjaEFKb2tlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHVybCwgb3B0aW9ucywgcmVzcG9uc2UsIGpva2U7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2ljYW5oYXpkYWRqb2tlLmNvbS8nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh1cmwsIG9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgam9rZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGpva2VdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGFkSm9rZTtcclxufSgpKTtcclxuZXhwb3J0cy5EYWRKb2tlID0gRGFkSm9rZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuUmVwb3J0ID0gdm9pZCAwO1xyXG4vKiogRXN0YSBjbGFzcyByZWFsaXphIGVsIHNlZ3VpbWllbnRvIGRlIHVzbyBkZSBsYSB3ZWIuXHJcbiogVGllbmUgdW4gYXJyYXkgcXVlIGd1YXJkYSBvYmpldG9zIGRlbCB0aXBvIHsgam9rZTogc3RyaW5nLCBzY29yZTogbnVtYmVyLCBkYXRlOiBkYXRlIH1cclxuKiBUaWVuZSB1biBtw6l0b2RvIHF1ZSBtdWVzdHJhIHBvciBjb25zb2xhIGVsIHJlcG9ydFxyXG4qL1xyXG52YXIgUmVwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmVwb3J0KCkge1xyXG4gICAgICAgIHRoaXMuam9rZXNSZXBvcnQgPSBbXTtcclxuICAgIH1cclxuICAgIFJlcG9ydC5wcm90b3R5cGUuYWRkU2NvcmUgPSBmdW5jdGlvbiAoc2NvcmUpIHtcclxuICAgICAgICAvL3VuYSBjb25kaWNpw7NuIHBhcmEgZXZpdGFyIHB1bnR1YXIgZWwgbWlzbW8gY2hpc3RlIDIgdmVjZXNcclxuICAgICAgICBpZiAodGhpcy5qb2tlc1JlcG9ydC5maW5kKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBzY29yZS5qb2tlID09PSBpdGVtLmpva2U7IH0pKSB7XHJcbiAgICAgICAgICAgIC8vZG8gbm90aGluZ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5qb2tlc1JlcG9ydC5wdXNoKHNjb3JlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlcG9ydDtcclxufSgpKTtcclxuZXhwb3J0cy5SZXBvcnQgPSBSZXBvcnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLlNjb3JlID0gdm9pZCAwO1xyXG4vKiogRXN0YSBjbGFzc2UgcmVwcmVzZW50YSBsYXMgcHVudHVhY2lvbmVzIGRlIGxvcyBjaGlzdGVzICovXHJcbnZhciBTY29yZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNjb3JlKGpva2UsIHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gam9rZTtcclxuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNjb3JlO1xyXG59KCkpO1xyXG5leHBvcnRzLlNjb3JlID0gU2NvcmU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLlVJID0gdm9pZCAwO1xyXG4vKiogRXN0YSBjbGFzZSB0aWVuZSBtw6l0b2RvcyBwYXJhIGdlc3Rpb25hciBsYSB2aXN0YSAqL1xyXG52YXIgVUkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBVSSgpIHtcclxuICAgIH1cclxuICAgIFVJLnByb3RvdHlwZS5zaG93V2VhdGhlciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtd2VhdGhlcicpO1xyXG4gICAgICAgIHZhciB3ZWF0aGVyRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICB3ZWF0aGVyRGlzcGxheS5jbGFzc05hbWUgPSBcInRleHQtcHJpbWFyeSBtcy0zXCI7XHJcbiAgICAgICAgc3Bhbi5jbGFzc05hbWUgPSBcIm1zLTMgdGV4dC1pbmZvXCI7XHJcbiAgICAgICAgd2VhdGhlckRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlRvZGF5J3Mgd2VhdGhlcjpcIjtcclxuICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gXCJcIiArIGRhdGEud2VhdGhlclswXS5tYWluO1xyXG4gICAgICAgIGFwcC5hcHBlbmRDaGlsZCh3ZWF0aGVyRGlzcGxheSk7XHJcbiAgICAgICAgYXBwLmFwcGVuZENoaWxkKHNwYW4pO1xyXG4gICAgfTtcclxuICAgIC8qKiBlc3RlIG3DqXRvZG8gY3JlYSB1biA8ZGl2PiB5IHN1IGhpam8gPHA+IHkgc2UgZW5jYXJnYSBkZSBwaW50YXIgZWwgcGFyw6FtZXRybyByZWNpYmlkbyBlbiBkaWNobyA8cD4gKi9cclxuICAgIFVJLnByb3RvdHlwZS5zaG93Sm9rZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHRoaXMuam9rZSA9IGRhdGE7XHJcbiAgICAgICAgdmFyIGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtam9rZXMnKTtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaWYgKGFwcC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgKF9hID0gYXBwLmZpcnN0Q2hpbGQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtLWF1dG8gcHgtMyBweS0yXFxcIj5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwidGV4dC1jZW50ZXIgcHQtNVxcXCI+IFwiICsgZGF0YS5qb2tlICsgXCI8L3A+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiO1xyXG4gICAgICAgIGFwcC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfTtcclxuICAgIC8qKiBFc3RlIG1ldG9kbyBtdWVzdHJhIGxvcyBib3RvbmVzIGRlIHJhdGluZyBhIGxhIHZleiBxdWUgc2UgbXVlc3RyYSBlbCBjaGlzdGUuICovXHJcbiAgICBVSS5wcm90b3R5cGUuc2hvd1JhdGluZ0J1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtam9rZXMnKTtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnV0dG9uR3JvdXAnKTsgLy9lc3RhIHZhcmlhYmxlIGNvbnRyb2xhIHNpIGVsIGVsZW1lbnRvIHlhIGV4aXN0ZSBlbiBlbCBET01cclxuICAgICAgICB2YXIgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB2YXIgYnRuQmcgPSBbJ2RhbmdlcicsICd3YXJuaW5nJywgJ3N1Y2Nlc3MnXTsgLy91biBhcnJheSBwYXJhIHBpbnRhciBsb3MgYm90b25lcyBkZW50cm8gZGUgdW4gYnVjbGVcclxuICAgICAgICB2YXIgYnRuVmFsdWUgPSBbJ0p1c3QuLi4gTk8nLCAnSGUgaGUnLCAnSSBsb2xlZCEnXTsgLy91biBhcnJheSBwYXJhIHBpbnRhciBsb3MgYm90b25lcyBkZW50cm8gZGUgdW4gYnVjbGVcclxuICAgICAgICBidXR0b25Hcm91cC5jbGFzc05hbWUgPSBcImJ0bi1ncm91cCBidG4tZ3JvdXAtdG9nZ2xlIHB0LTQgZC1mbGV4IGZsZXgtcm93IGp1c3RpZnktY29udGVudC1hcm91bmRcIjtcclxuICAgICAgICBidXR0b25Hcm91cC5pZCA9IFwiYnV0dG9uR3JvdXBcIjtcclxuICAgICAgICAvLyBlc3RvIGNyZWEgMyBib3RvbmVzIGNvbiBhdHJpYnV0byB5IGhhY2UgYXBwZW5kQ2hpbGQgZW4gYnV0dG9uR3JvdXBcclxuICAgICAgICAvL25hbWUgPSBcIjEsIDIgbyAzXCIgLy90eXBlID0gXCJzdWJtaXRcIiAvL3ZhbHVlID0gZGUgbW9tZW50byB1biBzdHJpbmcgIC8veSBsb3MgaWNvbm9zOiAgVE9ETzogYnVzY2FybG9zIHkgcG9uZXJsb3MgY29tbyBidG5JbWcuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBiLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1cIiArIGJ0bkJnW2ldICsgXCIgXCI7XHJcbiAgICAgICAgICAgIGIuaWQgPSBcInNjb3JlLWJ1dHRvblwiO1xyXG4gICAgICAgICAgICBiLm5hbWUgPSBcIlwiICsgKGkgKyAxKTtcclxuICAgICAgICAgICAgYi50eXBlID0gXCJzdWJtaXRcIjtcclxuICAgICAgICAgICAgYi52YWx1ZSA9IFwiXCIgKyBidG5WYWx1ZVtpXTtcclxuICAgICAgICAgICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250YWluZXIuY2hpbGRFbGVtZW50Q291bnQgPj0gMykge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGFpbmVyID09PSBudWxsIHx8IGNvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyLmluc2VydEJlZm9yZShidXR0b25Hcm91cCwgYXBwKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVUk7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVUkgPSBVSTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLldlYXRoZXIgPSB2b2lkIDA7XHJcbnZhciBXZWF0aGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2VhdGhlcigpIHtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gJyc7XHJcbiAgICB9XHJcbiAgICAvLyBMYSBmdW5jacOzbiByZWFsaXphIHVuYSBsbGFtYWRhIGEgbGEgQVBJIHkgY29uc3RydXllL2RldnVlbHZlIHVuIG9iamV0byBKb2tlIGNvbiBsb3MgZGF0b3MgZGUgbGEgcmVzcHVlc3RhIFxyXG4gICAgV2VhdGhlci5wcm90b3R5cGUuZmV0Y2hXZWF0aGVyID0gZnVuY3Rpb24gKGNvb3Jkcykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFwcElkLCB1bml0cywgdXJsLCBvcHRpb25zLCByZXNwb25zZSwgd2VhdGhlckluZm87XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncmFuIHBhcmNoZSBxdWUgaGFjZSBxdWUgbGEgcmVxdWVzdCBkZWwgdGllbXBvIHNlIGVzcGVyZSBtZWRpbyBzZWd1bmRvIHBhcmEgcXVlIGFzw60gbGUgZGUgdGllbXBvIGRlIGZpbmFsaXphcnNlIGEgbGEgb3RyYSByZXF1ZXN0IGRlIGNvb3JkZW5hZGFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkID0gJ2IwMTQ3ZjY0MTFiMTFjNDc5NWE5ZjllNGJlYmMyN2EzJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHMgPSAnbWV0cmljJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gXCJodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2FwcGlkPVwiICsgYXBwSWQgKyBcIiZ1bml0cz1cIiArIHVuaXRzICsgXCImbGF0PVwiICsgY29vcmRzWzBdICsgXCImbG9uPVwiICsgY29vcmRzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh1cmwsIG9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VhdGhlckluZm8gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdlYXRoZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHdlYXRoZXJJbmZvXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2VhdGhlci5wcm90b3R5cGUuZ2V0Q29vcmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNvb3JkcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2gocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldENvb3JkcygpOiBsYXQ9XCIgKyBjb29yZHNbMF0gKyBcIiAvIGxvbmc6IFwiICsgY29vcmRzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiZWZvcmUgcmV0dXJuOiBsYXQ9XCIgKyBjb29yZHNbMF0gKyBcIiAvIGxvbmc6IFwiICsgY29vcmRzWzFdKTsgLy9ubyBsbGVnYW4gbGFzIGNvb3Jkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY29vcmRzXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYXRoZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuV2VhdGhlciA9IFdlYXRoZXI7XHJcbiJdfQ==