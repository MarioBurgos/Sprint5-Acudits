(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Alert = void 0;
var Alert = /** @class */ (function () {
    function Alert() {
    }
    Alert.show = function (message, cssClass) {
        var div = document.createElement('small');
        div.className = "alert alert-" + cssClass + " mt-3 w-75 mx-auto";
        div.appendChild(document.createTextNode(message));
        // showing in DOM
        var container = document.querySelector('#container');
        var app = document.querySelector('#app-jokes');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1500);
    };
    return Alert;
}());
exports.Alert = Alert;

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.JokesComponent = void 0;
var JokesComponent = /** @class */ (function () {
    function JokesComponent() {
    }
    /** este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    JokesComponent.prototype.show = function (data) {
        var _a;
        this.joke = data;
        this.joke.value === undefined ? this.joke.value = '' : this.joke.joke = '';
        var app = document.querySelector('#app-jokes');
        var container = document.querySelector('#container');
        var buttonGroup = document.querySelector('#buttonGroup');
        var div = document.createElement('div');
        div.id = "joke";
        if (container.children.length > 1) {
            container.replaceChild(app, app);
            container.removeChild(buttonGroup);
        }
        var i = Math.floor(Math.random() * 4 + 1);
        app.className = "card-svg mx-auto bg-" + i;
        app.style.overflow = "visible";
        div.className = "m-auto px-3";
        div.innerHTML = "<p class=\"text-center\">" + data.value + data.joke + "</p>";
        (_a = app.lastChild) === null || _a === void 0 ? void 0 : _a.remove();
        app.appendChild(div);
    };
    return JokesComponent;
}());
exports.JokesComponent = JokesComponent;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.RatingButtons = void 0;
var RatingButtons = /** @class */ (function () {
    function RatingButtons() {
    }
    /** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */
    RatingButtons.prototype.show = function () {
        var app = document.querySelector('#app-jokes');
        var container = document.querySelector('#container');
        var div = document.querySelector('#buttonGroup'); //esta variable controla si el elemento ya existe en el DOM
        var buttonGroup = document.createElement('div');
        var btnBg = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
        // const btnValue: Array<string> = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle
        var btnIcons = ['<i class="bi bi-emoji-expressionless"></i>', '<i class="bi bi-emoji-smile"></i>', '<i class="bi bi-emoji-laughing"></i>']; //un array para pintar los botones dentro de un bucle
        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around w-50 mx-auto";
        buttonGroup.id = "buttonGroup";
        // esto crea 3 botones con atributo y hace appendChild en buttonGroup
        //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.
        for (var i = 0; i < 3; i++) {
            var b = document.createElement('button');
            b.className = "btn btn-outline";
            b.id = "score-button";
            b.name = "" + (i + 1);
            b.type = "submit";
            // b.value = `${btnValue[i]}`;
            b.innerHTML = "" + btnIcons[i];
            buttonGroup.appendChild(b);
        }
        if (container.childElementCount >= 3) {
            container.removeChild(div);
        }
        container === null || container === void 0 ? void 0 : container.insertBefore(buttonGroup, app);
    };
    return RatingButtons;
}());
exports.RatingButtons = RatingButtons;

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.WeatherComponent = void 0;
var WeatherComponent = /** @class */ (function () {
    function WeatherComponent() {
    }
    WeatherComponent.prototype.showWeather = function (data) {
        var app = document.querySelector('#app-weather');
        var weatherDisplay = document.createElement('p');
        var span = document.createElement('p');
        weatherDisplay.className = "text-primary ms-3";
        span.className = "ms-3 text-info";
        weatherDisplay.textContent = "Today's weather:";
        span.textContent = "" + data.weather[0].main;
        app.appendChild(weatherDisplay);
        app.appendChild(span);
        console.log("weatherComponent is working");
    };
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;

},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var alert_1 = require("../components/alert/alert");
var jokes_component_1 = require("../components/jokes/jokes-component");
var rating_buttons_1 = require("../components/jokes/rating-buttons/rating-buttons");
var weather_component_1 = require("../components/weather/weather-component");
var constants_1 = require("../data/constants");
var chuckjoke_1 = require("../model/chuckjoke");
var dadjoke_1 = require("../model/dadjoke");
var report_1 = require("../model/report");
var score_1 = require("../model/score");
var weather_1 = require("../model/weather");
//DOM Events Controller 
var joke = new dadjoke_1.DadJoke();
var report = new report_1.Report();
var weather;
var weatherComponent = new weather_component_1.WeatherComponent();
var jokesComponent = new jokes_component_1.JokesComponent();
var ratingButtons = new rating_buttons_1.RatingButtons();
/** Event onLoad */
window.addEventListener('load', function () {
    weather = new weather_1.Weather();
    weatherComponent = new weather_component_1.WeatherComponent();
    weather.getCoords()
        .then(function (response) {
        console.log(response);
        weather.fetchWeather(response)
            .then(function (result) { return weatherComponent.showWeather((result)); });
    });
});
/** Events onClick */
document.addEventListener('click', function (evt) {
    switch (evt.target.id) {
        case "action-button":
            // show Dad or Chuck Jokes 50-50
            (Math.floor(Math.random() * 100) % 2) ? joke = new dadjoke_1.DadJoke() : joke = new chuckjoke_1.ChuckJoke();
            console.log("isDad: " + (joke instanceof dadjoke_1.DadJoke));
            joke.fetchAJoke()
                .then(function (response) {
                joke = response;
                jokesComponent.show(response);
                ratingButtons.show();
            })["catch"](function (error) { return console.error(error); });
            break;
        case "score-button":
            var points = parseInt(evt.target.name);
            var score = new score_1.Score(joke, points);
            if (report.addScore(score)) {
                console.log(report);
                alert_1.Alert.show(points + " POINTS!! " + constants_1.ALERT.SUCCESS, "success");
            }
            else {
                alert_1.Alert.show("" + constants_1.ALERT.ERROR, "danger");
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

},{"../components/alert/alert":1,"../components/jokes/jokes-component":2,"../components/jokes/rating-buttons/rating-buttons":3,"../components/weather/weather-component":4,"../data/constants":6,"../model/chuckjoke":7,"../model/dadjoke":8,"../model/report":9,"../model/score":10,"../model/weather":11}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.DEFAULT_BCN_COORDS = exports.ALERT = void 0;
exports.ALERT = {
    SUCCESS: '(You voted successfully, but your vote is going to get lost.  Haha!)',
    ERROR: 'Bro... you can only vote once.'
};
exports.DEFAULT_BCN_COORDS = ["41.3879", "2.16992"];

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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanMiLCIuLi9jb21wb25lbnRzL2pva2VzL2pva2VzLWNvbXBvbmVudC5qcyIsIi4uL2NvbXBvbmVudHMvam9rZXMvcmF0aW5nLWJ1dHRvbnMvcmF0aW5nLWJ1dHRvbnMuanMiLCIuLi9jb21wb25lbnRzL3dlYXRoZXIvd2VhdGhlci1jb21wb25lbnQuanMiLCJjb250cm9sbGVyLmpzIiwiLi4vZGF0YS9jb25zdGFudHMuanMiLCIuLi9tb2RlbC9jaHVja2pva2UuanMiLCIuLi9tb2RlbC9kYWRqb2tlLmpzIiwiLi4vbW9kZWwvcmVwb3J0LmpzIiwiLi4vbW9kZWwvc2NvcmUuanMiLCIuLi9tb2RlbC93ZWF0aGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLkFsZXJ0ID0gdm9pZCAwO1xyXG52YXIgQWxlcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBbGVydCgpIHtcclxuICAgIH1cclxuICAgIEFsZXJ0LnNob3cgPSBmdW5jdGlvbiAobWVzc2FnZSwgY3NzQ2xhc3MpIHtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc21hbGwnKTtcclxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJhbGVydCBhbGVydC1cIiArIGNzc0NsYXNzICsgXCIgbXQtMyB3LTc1IG14LWF1dG9cIjtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpO1xyXG4gICAgICAgIC8vIHNob3dpbmcgaW4gRE9NXHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcclxuICAgICAgICB2YXIgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1qb2tlcycpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZGl2LCBhcHApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQnKS5yZW1vdmUoKTtcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQWxlcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQWxlcnQgPSBBbGVydDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuSm9rZXNDb21wb25lbnQgPSB2b2lkIDA7XHJcbnZhciBKb2tlc0NvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEpva2VzQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgLyoqIGVzdGUgbcOpdG9kbyBjcmVhIHVuIDxkaXY+IHkgc3UgaGlqbyA8cD4geSBzZSBlbmNhcmdhIGRlIHBpbnRhciBlbCBwYXLDoW1ldHJvIHJlY2liaWRvIGVuIGRpY2hvIDxwPiAqL1xyXG4gICAgSm9rZXNDb21wb25lbnQucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB0aGlzLmpva2UgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuam9rZS52YWx1ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5qb2tlLnZhbHVlID0gJycgOiB0aGlzLmpva2Uuam9rZSA9ICcnO1xyXG4gICAgICAgIHZhciBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLWpva2VzJyk7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcclxuICAgICAgICB2YXIgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnV0dG9uR3JvdXAnKTtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZGl2LmlkID0gXCJqb2tlXCI7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQoYXBwLCBhcHApO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoYnV0dG9uR3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQgKyAxKTtcclxuICAgICAgICBhcHAuY2xhc3NOYW1lID0gXCJjYXJkLXN2ZyBteC1hdXRvIGJnLVwiICsgaTtcclxuICAgICAgICBhcHAuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcclxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJtLWF1dG8gcHgtM1wiO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxwIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCI+XCIgKyBkYXRhLnZhbHVlICsgZGF0YS5qb2tlICsgXCI8L3A+XCI7XHJcbiAgICAgICAgKF9hID0gYXBwLmxhc3RDaGlsZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xyXG4gICAgICAgIGFwcC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBKb2tlc0NvbXBvbmVudDtcclxufSgpKTtcclxuZXhwb3J0cy5Kb2tlc0NvbXBvbmVudCA9IEpva2VzQ29tcG9uZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5SYXRpbmdCdXR0b25zID0gdm9pZCAwO1xyXG52YXIgUmF0aW5nQnV0dG9ucyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJhdGluZ0J1dHRvbnMoKSB7XHJcbiAgICB9XHJcbiAgICAvKiogRXN0ZSBtZXRvZG8gbXVlc3RyYSBsb3MgYm90b25lcyBkZSByYXRpbmcgYSBsYSB2ZXogcXVlIHNlIG11ZXN0cmEgZWwgY2hpc3RlLiAqL1xyXG4gICAgUmF0aW5nQnV0dG9ucy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1qb2tlcycpO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidXR0b25Hcm91cCcpOyAvL2VzdGEgdmFyaWFibGUgY29udHJvbGEgc2kgZWwgZWxlbWVudG8geWEgZXhpc3RlIGVuIGVsIERPTVxyXG4gICAgICAgIHZhciBidXR0b25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHZhciBidG5CZyA9IFsnZGFuZ2VyJywgJ3dhcm5pbmcnLCAnc3VjY2VzcyddOyAvL3VuIGFycmF5IHBhcmEgcGludGFyIGxvcyBib3RvbmVzIGRlbnRybyBkZSB1biBidWNsZVxyXG4gICAgICAgIC8vIGNvbnN0IGJ0blZhbHVlOiBBcnJheTxzdHJpbmc+ID0gWydKdXN0Li4uIE5PJywgJ0hlIGhlJywgJ0kgbG9sZWQhJ107IC8vdW4gYXJyYXkgcGFyYSBwaW50YXIgbG9zIGJvdG9uZXMgZGVudHJvIGRlIHVuIGJ1Y2xlXHJcbiAgICAgICAgdmFyIGJ0bkljb25zID0gWyc8aSBjbGFzcz1cImJpIGJpLWVtb2ppLWV4cHJlc3Npb25sZXNzXCI+PC9pPicsICc8aSBjbGFzcz1cImJpIGJpLWVtb2ppLXNtaWxlXCI+PC9pPicsICc8aSBjbGFzcz1cImJpIGJpLWVtb2ppLWxhdWdoaW5nXCI+PC9pPiddOyAvL3VuIGFycmF5IHBhcmEgcGludGFyIGxvcyBib3RvbmVzIGRlbnRybyBkZSB1biBidWNsZVxyXG4gICAgICAgIGJ1dHRvbkdyb3VwLmNsYXNzTmFtZSA9IFwiYnRuLWdyb3VwIGJ0bi1ncm91cC10b2dnbGUgcHQtNCBkLWZsZXggZmxleC1yb3cganVzdGlmeS1jb250ZW50LWFyb3VuZCB3LTUwIG14LWF1dG9cIjtcclxuICAgICAgICBidXR0b25Hcm91cC5pZCA9IFwiYnV0dG9uR3JvdXBcIjtcclxuICAgICAgICAvLyBlc3RvIGNyZWEgMyBib3RvbmVzIGNvbiBhdHJpYnV0byB5IGhhY2UgYXBwZW5kQ2hpbGQgZW4gYnV0dG9uR3JvdXBcclxuICAgICAgICAvL25hbWUgPSBcIjEsIDIgbyAzXCIgLy90eXBlID0gXCJzdWJtaXRcIiAvL3ZhbHVlID0gZGUgbW9tZW50byB1biBzdHJpbmcgIC8veSBsb3MgaWNvbm9zOiAgVE9ETzogYnVzY2FybG9zIHkgcG9uZXJsb3MgY29tbyBidG5JbWcuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgYi5jbGFzc05hbWUgPSBcImJ0biBidG4tb3V0bGluZVwiO1xyXG4gICAgICAgICAgICBiLmlkID0gXCJzY29yZS1idXR0b25cIjtcclxuICAgICAgICAgICAgYi5uYW1lID0gXCJcIiArIChpICsgMSk7XHJcbiAgICAgICAgICAgIGIudHlwZSA9IFwic3VibWl0XCI7XHJcbiAgICAgICAgICAgIC8vIGIudmFsdWUgPSBgJHtidG5WYWx1ZVtpXX1gO1xyXG4gICAgICAgICAgICBiLmlubmVySFRNTCA9IFwiXCIgKyBidG5JY29uc1tpXTtcclxuICAgICAgICAgICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250YWluZXIuY2hpbGRFbGVtZW50Q291bnQgPj0gMykge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGFpbmVyID09PSBudWxsIHx8IGNvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyLmluc2VydEJlZm9yZShidXR0b25Hcm91cCwgYXBwKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmF0aW5nQnV0dG9ucztcclxufSgpKTtcclxuZXhwb3J0cy5SYXRpbmdCdXR0b25zID0gUmF0aW5nQnV0dG9ucztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuV2VhdGhlckNvbXBvbmVudCA9IHZvaWQgMDtcclxudmFyIFdlYXRoZXJDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWF0aGVyQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgV2VhdGhlckNvbXBvbmVudC5wcm90b3R5cGUuc2hvd1dlYXRoZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLXdlYXRoZXInKTtcclxuICAgICAgICB2YXIgd2VhdGhlckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgd2VhdGhlckRpc3BsYXkuY2xhc3NOYW1lID0gXCJ0ZXh0LXByaW1hcnkgbXMtM1wiO1xyXG4gICAgICAgIHNwYW4uY2xhc3NOYW1lID0gXCJtcy0zIHRleHQtaW5mb1wiO1xyXG4gICAgICAgIHdlYXRoZXJEaXNwbGF5LnRleHRDb250ZW50ID0gXCJUb2RheSdzIHdlYXRoZXI6XCI7XHJcbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IFwiXCIgKyBkYXRhLndlYXRoZXJbMF0ubWFpbjtcclxuICAgICAgICBhcHAuYXBwZW5kQ2hpbGQod2VhdGhlckRpc3BsYXkpO1xyXG4gICAgICAgIGFwcC5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIndlYXRoZXJDb21wb25lbnQgaXMgd29ya2luZ1wiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2VhdGhlckNvbXBvbmVudDtcclxufSgpKTtcclxuZXhwb3J0cy5XZWF0aGVyQ29tcG9uZW50ID0gV2VhdGhlckNvbXBvbmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBhbGVydF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWxlcnQvYWxlcnRcIik7XHJcbnZhciBqb2tlc19jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2pva2VzL2pva2VzLWNvbXBvbmVudFwiKTtcclxudmFyIHJhdGluZ19idXR0b25zXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9qb2tlcy9yYXRpbmctYnV0dG9ucy9yYXRpbmctYnV0dG9uc1wiKTtcclxudmFyIHdlYXRoZXJfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy93ZWF0aGVyL3dlYXRoZXItY29tcG9uZW50XCIpO1xyXG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vZGF0YS9jb25zdGFudHNcIik7XHJcbnZhciBjaHVja2pva2VfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9jaHVja2pva2VcIik7XHJcbnZhciBkYWRqb2tlXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvZGFkam9rZVwiKTtcclxudmFyIHJlcG9ydF8xID0gcmVxdWlyZShcIi4uL21vZGVsL3JlcG9ydFwiKTtcclxudmFyIHNjb3JlXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvc2NvcmVcIik7XHJcbnZhciB3ZWF0aGVyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvd2VhdGhlclwiKTtcclxuLy9ET00gRXZlbnRzIENvbnRyb2xsZXIgXHJcbnZhciBqb2tlID0gbmV3IGRhZGpva2VfMS5EYWRKb2tlKCk7XHJcbnZhciByZXBvcnQgPSBuZXcgcmVwb3J0XzEuUmVwb3J0KCk7XHJcbnZhciB3ZWF0aGVyO1xyXG52YXIgd2VhdGhlckNvbXBvbmVudCA9IG5ldyB3ZWF0aGVyX2NvbXBvbmVudF8xLldlYXRoZXJDb21wb25lbnQoKTtcclxudmFyIGpva2VzQ29tcG9uZW50ID0gbmV3IGpva2VzX2NvbXBvbmVudF8xLkpva2VzQ29tcG9uZW50KCk7XHJcbnZhciByYXRpbmdCdXR0b25zID0gbmV3IHJhdGluZ19idXR0b25zXzEuUmF0aW5nQnV0dG9ucygpO1xyXG4vKiogRXZlbnQgb25Mb2FkICovXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2VhdGhlciA9IG5ldyB3ZWF0aGVyXzEuV2VhdGhlcigpO1xyXG4gICAgd2VhdGhlckNvbXBvbmVudCA9IG5ldyB3ZWF0aGVyX2NvbXBvbmVudF8xLldlYXRoZXJDb21wb25lbnQoKTtcclxuICAgIHdlYXRoZXIuZ2V0Q29vcmRzKClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgd2VhdGhlci5mZXRjaFdlYXRoZXIocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuIHdlYXRoZXJDb21wb25lbnQuc2hvd1dlYXRoZXIoKHJlc3VsdCkpOyB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuLyoqIEV2ZW50cyBvbkNsaWNrICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgc3dpdGNoIChldnQudGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgY2FzZSBcImFjdGlvbi1idXR0b25cIjpcclxuICAgICAgICAgICAgLy8gc2hvdyBEYWQgb3IgQ2h1Y2sgSm9rZXMgNTAtNTBcclxuICAgICAgICAgICAgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAyKSA/IGpva2UgPSBuZXcgZGFkam9rZV8xLkRhZEpva2UoKSA6IGpva2UgPSBuZXcgY2h1Y2tqb2tlXzEuQ2h1Y2tKb2tlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXNEYWQ6IFwiICsgKGpva2UgaW5zdGFuY2VvZiBkYWRqb2tlXzEuRGFkSm9rZSkpO1xyXG4gICAgICAgICAgICBqb2tlLmZldGNoQUpva2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBqb2tlID0gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICBqb2tlc0NvbXBvbmVudC5zaG93KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJhdGluZ0J1dHRvbnMuc2hvdygpO1xyXG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gY29uc29sZS5lcnJvcihlcnJvcik7IH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic2NvcmUtYnV0dG9uXCI6XHJcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBwYXJzZUludChldnQudGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBuZXcgc2NvcmVfMS5TY29yZShqb2tlLCBwb2ludHMpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0LmFkZFNjb3JlKHNjb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVwb3J0KTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0XzEuQWxlcnQuc2hvdyhwb2ludHMgKyBcIiBQT0lOVFMhISBcIiArIGNvbnN0YW50c18xLkFMRVJULlNVQ0NFU1MsIFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0XzEuQWxlcnQuc2hvdyhcIlwiICsgY29uc3RhbnRzXzEuQUxFUlQuRVJST1IsIFwiZGFuZ2VyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgLyoqIEludGVudGFuZG8gc3VzdGl0dWlyIGVsIHN3aXRjaCBwb3IgdW4gYWN0aW9uIG1hcCAqL1xyXG4gICAgLy8gY29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpXHJcbiAgICAvLyAgICAgLnNldChcImFjdGlvbi1idXR0b25cIiwgKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zdCB1aTogVUkgPSBuZXcgVUkoKTtcclxuICAgIC8vICAgICAgICAgam9rZS5mZXRjaEFKb2tlKClcclxuICAgIC8vICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBqb2tlID0gcmVzcG9uc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdWkuc2hvd0pva2UocmVzcG9uc2UpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVpLnNob3dSYXRpbmdCdXR0b25zKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gICAgIC5zZXQoXCJzY29yZS1idXR0b25cIiwgKCk9PntcclxuICAgIC8vICAgICAgICAgbGV0IHBvaW50cyA9IHBhcnNlSW50KChldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLm5hbWUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgc2NvcmUgPSBuZXcgU2NvcmUoam9rZSwgcG9pbnRzKTtcclxuICAgIC8vICAgICAgICAgcmVwb3J0LmFkZFNjb3JlKHNjb3JlKTtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocmVwb3J0KTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICByZXN1bHQuZ2V0KChldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmlkKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG59KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuREVGQVVMVF9CQ05fQ09PUkRTID0gZXhwb3J0cy5BTEVSVCA9IHZvaWQgMDtcclxuZXhwb3J0cy5BTEVSVCA9IHtcclxuICAgIFNVQ0NFU1M6ICcoWW91IHZvdGVkIHN1Y2Nlc3NmdWxseSwgYnV0IHlvdXIgdm90ZSBpcyBnb2luZyB0byBnZXQgbG9zdC4gIEhhaGEhKScsXHJcbiAgICBFUlJPUjogJ0Jyby4uLiB5b3UgY2FuIG9ubHkgdm90ZSBvbmNlLidcclxufTtcclxuZXhwb3J0cy5ERUZBVUxUX0JDTl9DT09SRFMgPSBbXCI0MS4zODc5XCIsIFwiMi4xNjk5MlwiXTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLkNodWNrSm9rZSA9IHZvaWQgMDtcclxudmFyIENodWNrSm9rZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENodWNrSm9rZSgpIHtcclxuICAgICAgICB0aGlzLmlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gJyc7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gLTE7XHJcbiAgICB9XHJcbiAgICAvLyBMYSBmdW5jacOzbiByZWFsaXphIHVuYSBsbGFtYWRhIGEgbGEgQVBJIHkgY29uc3RydXllL2RldnVlbHZlIHVuIG9iamV0byBKb2tlIGNvbiBsb3MgZGF0b3MgZGUgbGEgcmVzcHVlc3RhIFxyXG4gICAgQ2h1Y2tKb2tlLnByb3RvdHlwZS5mZXRjaEFKb2tlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHVybCwgb3B0aW9ucywgcmVzcG9uc2UsIGpva2U7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL2FwaS5jaHVja25vcnJpcy5pby9qb2tlcy9yYW5kb20nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh1cmwsIG9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgam9rZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGpva2VdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2h1Y2tKb2tlO1xyXG59KCkpO1xyXG5leHBvcnRzLkNodWNrSm9rZSA9IENodWNrSm9rZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLkRhZEpva2UgPSB2b2lkIDA7XHJcbnZhciBEYWRKb2tlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRGFkSm9rZSgpIHtcclxuICAgICAgICB0aGlzLmlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gJyc7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gLTE7XHJcbiAgICB9XHJcbiAgICAvLyBMYSBmdW5jacOzbiByZWFsaXphIHVuYSBsbGFtYWRhIGEgbGEgQVBJIHkgY29uc3RydXllL2RldnVlbHZlIHVuIG9iamV0byBKb2tlIGNvbiBsb3MgZGF0b3MgZGUgbGEgcmVzcHVlc3RhIFxyXG4gICAgRGFkSm9rZS5wcm90b3R5cGUuZmV0Y2hBSm9rZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwsIG9wdGlvbnMsIHJlc3BvbnNlLCBqb2tlO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9pY2FuaGF6ZGFkam9rZS5jb20vJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godXJsLCBvcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpva2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBqb2tlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERhZEpva2U7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRGFkSm9rZSA9IERhZEpva2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLlJlcG9ydCA9IHZvaWQgMDtcclxuLyoqIEVzdGEgY2xhc3MgcmVhbGl6YSBlbCBzZWd1aW1pZW50byBkZSB1c28gZGUgbGEgd2ViLlxyXG4qIFRpZW5lIHVuIGFycmF5IHF1ZSBndWFyZGEgb2JqZXRvcyBkZWwgdGlwbyB7IGpva2U6IHN0cmluZywgc2NvcmU6IG51bWJlciwgZGF0ZTogZGF0ZSB9XHJcbiogVGllbmUgdW4gbcOpdG9kbyBxdWUgbXVlc3RyYSBwb3IgY29uc29sYSBlbCByZXBvcnRcclxuKi9cclxudmFyIFJlcG9ydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlcG9ydCgpIHtcclxuICAgICAgICB0aGlzLmpva2VzUmVwb3J0ID0gW107XHJcbiAgICB9XHJcbiAgICAvKipJZiB0aGUgdXNlciBoYWQgYmVlbiBzY29yZWQgdGhhdCBqb2tlIGJlZm9yZSwgcmV0dXJucyBmYWxzZSAqL1xyXG4gICAgUmVwb3J0LnByb3RvdHlwZS5hZGRTY29yZSA9IGZ1bmN0aW9uIChzY29yZSkge1xyXG4gICAgICAgIC8vdW5hIGNvbmRpY2nDs24gcGFyYSBldml0YXIgcHVudHVhciBlbCBtaXNtbyBjaGlzdGUgMiB2ZWNlc1xyXG4gICAgICAgIGlmICh0aGlzLmpva2VzUmVwb3J0LmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIHNjb3JlLmpva2UgPT09IGl0ZW0uam9rZTsgfSkpIHtcclxuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJSZXBvcnQsIHRoZSBzY29yZSBpcyBhbHJlYWR5IGhlcmVcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5qb2tlc1JlcG9ydC5wdXNoKHNjb3JlKTtcclxuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJSZXBvcnQsIHRoZSBzY29yZSBoYXMgYmVlbiBhZGRlZFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlcG9ydDtcclxufSgpKTtcclxuZXhwb3J0cy5SZXBvcnQgPSBSZXBvcnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLlNjb3JlID0gdm9pZCAwO1xyXG4vKiogRXN0YSBjbGFzc2UgcmVwcmVzZW50YSBsYXMgcHVudHVhY2lvbmVzIGRlIGxvcyBjaGlzdGVzICovXHJcbnZhciBTY29yZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNjb3JlKGpva2UsIHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gam9rZTtcclxuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNjb3JlO1xyXG59KCkpO1xyXG5leHBvcnRzLlNjb3JlID0gU2NvcmU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5XZWF0aGVyID0gdm9pZCAwO1xyXG52YXIgV2VhdGhlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYXRoZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gTGEgZnVuY2nDs24gcmVhbGl6YSB1bmEgbGxhbWFkYSBhIGxhIEFQSSB5IGNvbnN0cnV5ZS9kZXZ1ZWx2ZSB1biBvYmpldG8gSm9rZSBjb24gbG9zIGRhdG9zIGRlIGxhIHJlc3B1ZXN0YSBcclxuICAgIFdlYXRoZXIucHJvdG90eXBlLmZldGNoV2VhdGhlciA9IGZ1bmN0aW9uIChjb29yZHMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcHBJZCwgdW5pdHMsIHVybCwgb3B0aW9ucywgcmVzcG9uc2UsIHdlYXRoZXJJbmZvO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JhbiBwYXJjaGUgcXVlIGhhY2UgcXVlIGxhIHJlcXVlc3QgZGVsIHRpZW1wbyBzZSBlc3BlcmUgbWVkaW8gc2VndW5kbyBwYXJhIHF1ZSBhc8OtIGxlIGRlIHRpZW1wbyBkZSBmaW5hbGl6YXJzZSBhIGxhIG90cmEgcmVxdWVzdCBkZSBjb29yZGVuYWRhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBJZCA9ICdiMDE0N2Y2NDExYjExYzQ3OTVhOWY5ZTRiZWJjMjdhMyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzID0gJ21ldHJpYyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9hcHBpZD1cIiArIGFwcElkICsgXCImdW5pdHM9XCIgKyB1bml0cyArIFwiJmxhdD1cIiArIGNvb3Jkc1swXSArIFwiJmxvbj1cIiArIGNvb3Jkc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godXJsLCBvcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYXRoZXJJbmZvID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVySW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB3ZWF0aGVySW5mb107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYXRoZXIucHJvdG90eXBlLmdldENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29yZHM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbikgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2gocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRDb29yZHMoKTogbGF0PVwiICsgY29vcmRzWzBdICsgXCIgLyBsb25nOiBcIiArIGNvb3Jkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmVmb3JlIHJldHVybjogbGF0PVwiICsgY29vcmRzWzBdICsgXCIgLyBsb25nOiBcIiArIGNvb3Jkc1sxXSk7IC8vbm8gbGxlZ2FuIGxhcyBjb29yZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNvb3Jkc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWF0aGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLldlYXRoZXIgPSBXZWF0aGVyO1xyXG4iXX0=
