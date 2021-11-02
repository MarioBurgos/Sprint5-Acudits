(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Alert = void 0;
var Alert = /** @class */ (function () {
    function Alert() {
    }
    Alert.show = function (message, cssClass) {
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
        var div = document.createElement('div');
        if (app.hasChildNodes()) {
            (_a = app.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
        var i = Math.floor(Math.random() * 4 + 1);
        app.className = "card-svg mx-auto bg-" + i;
        app.style.overflow = "visible";
        div.innerHTML = "\n        <div class=\"m-auto px-3\">\n            <p class=\"text-center\">" + data.value + data.joke + "</p>            \n        </div>\n        ";
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
            console.log("Dad: " + (joke instanceof dadjoke_1.DadJoke));
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
                alert_1.Alert.show("" + points + constants_1.ALERT.ERROR, "danger");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanMiLCIuLi9jb21wb25lbnRzL2pva2VzL2pva2VzLWNvbXBvbmVudC5qcyIsIi4uL2NvbXBvbmVudHMvam9rZXMvcmF0aW5nLWJ1dHRvbnMvcmF0aW5nLWJ1dHRvbnMuanMiLCIuLi9jb21wb25lbnRzL3dlYXRoZXIvd2VhdGhlci1jb21wb25lbnQuanMiLCJjb250cm9sbGVyLmpzIiwiLi4vZGF0YS9jb25zdGFudHMuanMiLCIuLi9tb2RlbC9jaHVja2pva2UuanMiLCIuLi9tb2RlbC9kYWRqb2tlLmpzIiwiLi4vbW9kZWwvcmVwb3J0LmpzIiwiLi4vbW9kZWwvc2NvcmUuanMiLCIuLi9tb2RlbC93ZWF0aGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuQWxlcnQgPSB2b2lkIDA7XHJcbnZhciBBbGVydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFsZXJ0KCkge1xyXG4gICAgfVxyXG4gICAgQWxlcnQuc2hvdyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBjc3NDbGFzcykge1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzbWFsbCcpO1xyXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImFsZXJ0IGFsZXJ0LVwiICsgY3NzQ2xhc3MgKyBcIiBtdC0zIHctNTAgbXMtMyBtZS1hdXRvXCI7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKTtcclxuICAgICAgICAvLyBzaG93aW5nIGluIERPTVxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgICAgICAgdmFyIGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtam9rZXMnKTtcclxuICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGRpdiwgYXBwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFsZXJ0O1xyXG59KCkpO1xyXG5leHBvcnRzLkFsZXJ0ID0gQWxlcnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLkpva2VzQ29tcG9uZW50ID0gdm9pZCAwO1xyXG52YXIgSm9rZXNDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBKb2tlc0NvbXBvbmVudCgpIHtcclxuICAgIH1cclxuICAgIC8qKiBlc3RlIG3DqXRvZG8gY3JlYSB1biA8ZGl2PiB5IHN1IGhpam8gPHA+IHkgc2UgZW5jYXJnYSBkZSBwaW50YXIgZWwgcGFyw6FtZXRybyByZWNpYmlkbyBlbiBkaWNobyA8cD4gKi9cclxuICAgIEpva2VzQ29tcG9uZW50LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdGhpcy5qb2tlID0gZGF0YTtcclxuICAgICAgICB0aGlzLmpva2UudmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXMuam9rZS52YWx1ZSA9ICcnIDogdGhpcy5qb2tlLmpva2UgPSAnJztcclxuICAgICAgICB2YXIgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1qb2tlcycpO1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpZiAoYXBwLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAoX2EgPSBhcHAuZmlyc3RDaGlsZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQgKyAxKTtcclxuICAgICAgICBhcHAuY2xhc3NOYW1lID0gXCJjYXJkLXN2ZyBteC1hdXRvIGJnLVwiICsgaTtcclxuICAgICAgICBhcHAuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm0tYXV0byBweC0zXFxcIj5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPlwiICsgZGF0YS52YWx1ZSArIGRhdGEuam9rZSArIFwiPC9wPiAgICAgICAgICAgIFxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcclxuICAgICAgICBhcHAuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSm9rZXNDb21wb25lbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuSm9rZXNDb21wb25lbnQgPSBKb2tlc0NvbXBvbmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuUmF0aW5nQnV0dG9ucyA9IHZvaWQgMDtcclxudmFyIFJhdGluZ0J1dHRvbnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSYXRpbmdCdXR0b25zKCkge1xyXG4gICAgfVxyXG4gICAgLyoqIEVzdGUgbWV0b2RvIG11ZXN0cmEgbG9zIGJvdG9uZXMgZGUgcmF0aW5nIGEgbGEgdmV6IHF1ZSBzZSBtdWVzdHJhIGVsIGNoaXN0ZS4gKi9cclxuICAgIFJhdGluZ0J1dHRvbnMucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtam9rZXMnKTtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnV0dG9uR3JvdXAnKTsgLy9lc3RhIHZhcmlhYmxlIGNvbnRyb2xhIHNpIGVsIGVsZW1lbnRvIHlhIGV4aXN0ZSBlbiBlbCBET01cclxuICAgICAgICB2YXIgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB2YXIgYnRuQmcgPSBbJ2RhbmdlcicsICd3YXJuaW5nJywgJ3N1Y2Nlc3MnXTsgLy91biBhcnJheSBwYXJhIHBpbnRhciBsb3MgYm90b25lcyBkZW50cm8gZGUgdW4gYnVjbGVcclxuICAgICAgICB2YXIgYnRuVmFsdWUgPSBbJ0p1c3QuLi4gTk8nLCAnSGUgaGUnLCAnSSBsb2xlZCEnXTsgLy91biBhcnJheSBwYXJhIHBpbnRhciBsb3MgYm90b25lcyBkZW50cm8gZGUgdW4gYnVjbGVcclxuICAgICAgICBidXR0b25Hcm91cC5jbGFzc05hbWUgPSBcImJ0bi1ncm91cCBidG4tZ3JvdXAtdG9nZ2xlIHB0LTQgZC1mbGV4IGZsZXgtcm93IGp1c3RpZnktY29udGVudC1hcm91bmRcIjtcclxuICAgICAgICBidXR0b25Hcm91cC5pZCA9IFwiYnV0dG9uR3JvdXBcIjtcclxuICAgICAgICAvLyBlc3RvIGNyZWEgMyBib3RvbmVzIGNvbiBhdHJpYnV0byB5IGhhY2UgYXBwZW5kQ2hpbGQgZW4gYnV0dG9uR3JvdXBcclxuICAgICAgICAvL25hbWUgPSBcIjEsIDIgbyAzXCIgLy90eXBlID0gXCJzdWJtaXRcIiAvL3ZhbHVlID0gZGUgbW9tZW50byB1biBzdHJpbmcgIC8veSBsb3MgaWNvbm9zOiAgVE9ETzogYnVzY2FybG9zIHkgcG9uZXJsb3MgY29tbyBidG5JbWcuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBiLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1cIiArIGJ0bkJnW2ldICsgXCIgXCI7XHJcbiAgICAgICAgICAgIGIuaWQgPSBcInNjb3JlLWJ1dHRvblwiO1xyXG4gICAgICAgICAgICBiLm5hbWUgPSBcIlwiICsgKGkgKyAxKTtcclxuICAgICAgICAgICAgYi50eXBlID0gXCJzdWJtaXRcIjtcclxuICAgICAgICAgICAgYi52YWx1ZSA9IFwiXCIgKyBidG5WYWx1ZVtpXTtcclxuICAgICAgICAgICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250YWluZXIuY2hpbGRFbGVtZW50Q291bnQgPj0gMykge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGFpbmVyID09PSBudWxsIHx8IGNvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyLmluc2VydEJlZm9yZShidXR0b25Hcm91cCwgYXBwKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmF0aW5nQnV0dG9ucztcclxufSgpKTtcclxuZXhwb3J0cy5SYXRpbmdCdXR0b25zID0gUmF0aW5nQnV0dG9ucztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuV2VhdGhlckNvbXBvbmVudCA9IHZvaWQgMDtcclxudmFyIFdlYXRoZXJDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWF0aGVyQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgV2VhdGhlckNvbXBvbmVudC5wcm90b3R5cGUuc2hvd1dlYXRoZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLXdlYXRoZXInKTtcclxuICAgICAgICB2YXIgd2VhdGhlckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgd2VhdGhlckRpc3BsYXkuY2xhc3NOYW1lID0gXCJ0ZXh0LXByaW1hcnkgbXMtM1wiO1xyXG4gICAgICAgIHNwYW4uY2xhc3NOYW1lID0gXCJtcy0zIHRleHQtaW5mb1wiO1xyXG4gICAgICAgIHdlYXRoZXJEaXNwbGF5LnRleHRDb250ZW50ID0gXCJUb2RheSdzIHdlYXRoZXI6XCI7XHJcbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IFwiXCIgKyBkYXRhLndlYXRoZXJbMF0ubWFpbjtcclxuICAgICAgICBhcHAuYXBwZW5kQ2hpbGQod2VhdGhlckRpc3BsYXkpO1xyXG4gICAgICAgIGFwcC5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIndlYXRoZXJDb21wb25lbnQgaXMgd29ya2luZ1wiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2VhdGhlckNvbXBvbmVudDtcclxufSgpKTtcclxuZXhwb3J0cy5XZWF0aGVyQ29tcG9uZW50ID0gV2VhdGhlckNvbXBvbmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBhbGVydF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWxlcnQvYWxlcnRcIik7XHJcbnZhciBqb2tlc19jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2pva2VzL2pva2VzLWNvbXBvbmVudFwiKTtcclxudmFyIHJhdGluZ19idXR0b25zXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9qb2tlcy9yYXRpbmctYnV0dG9ucy9yYXRpbmctYnV0dG9uc1wiKTtcclxudmFyIHdlYXRoZXJfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy93ZWF0aGVyL3dlYXRoZXItY29tcG9uZW50XCIpO1xyXG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vZGF0YS9jb25zdGFudHNcIik7XHJcbnZhciBjaHVja2pva2VfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9jaHVja2pva2VcIik7XHJcbnZhciBkYWRqb2tlXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvZGFkam9rZVwiKTtcclxudmFyIHJlcG9ydF8xID0gcmVxdWlyZShcIi4uL21vZGVsL3JlcG9ydFwiKTtcclxudmFyIHNjb3JlXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvc2NvcmVcIik7XHJcbnZhciB3ZWF0aGVyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvd2VhdGhlclwiKTtcclxuLy9ET00gRXZlbnRzIENvbnRyb2xsZXIgXHJcbnZhciBqb2tlID0gbmV3IGRhZGpva2VfMS5EYWRKb2tlKCk7XHJcbnZhciByZXBvcnQgPSBuZXcgcmVwb3J0XzEuUmVwb3J0KCk7XHJcbnZhciB3ZWF0aGVyO1xyXG52YXIgd2VhdGhlckNvbXBvbmVudCA9IG5ldyB3ZWF0aGVyX2NvbXBvbmVudF8xLldlYXRoZXJDb21wb25lbnQoKTtcclxudmFyIGpva2VzQ29tcG9uZW50ID0gbmV3IGpva2VzX2NvbXBvbmVudF8xLkpva2VzQ29tcG9uZW50KCk7XHJcbnZhciByYXRpbmdCdXR0b25zID0gbmV3IHJhdGluZ19idXR0b25zXzEuUmF0aW5nQnV0dG9ucygpO1xyXG4vKiogRXZlbnQgb25Mb2FkICovXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2VhdGhlciA9IG5ldyB3ZWF0aGVyXzEuV2VhdGhlcigpO1xyXG4gICAgd2VhdGhlckNvbXBvbmVudCA9IG5ldyB3ZWF0aGVyX2NvbXBvbmVudF8xLldlYXRoZXJDb21wb25lbnQoKTtcclxuICAgIHdlYXRoZXIuZ2V0Q29vcmRzKClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgd2VhdGhlci5mZXRjaFdlYXRoZXIocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuIHdlYXRoZXJDb21wb25lbnQuc2hvd1dlYXRoZXIoKHJlc3VsdCkpOyB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuLyoqIEV2ZW50cyBvbkNsaWNrICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgc3dpdGNoIChldnQudGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgY2FzZSBcImFjdGlvbi1idXR0b25cIjpcclxuICAgICAgICAgICAgLy8gc2hvdyBEYWQgb3IgQ2h1Y2sgSm9rZXMgNTAtNTBcclxuICAgICAgICAgICAgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAyKSA/IGpva2UgPSBuZXcgZGFkam9rZV8xLkRhZEpva2UoKSA6IGpva2UgPSBuZXcgY2h1Y2tqb2tlXzEuQ2h1Y2tKb2tlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGFkOiBcIiArIChqb2tlIGluc3RhbmNlb2YgZGFkam9rZV8xLkRhZEpva2UpKTtcclxuICAgICAgICAgICAgam9rZS5mZXRjaEFKb2tlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgam9rZSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgam9rZXNDb21wb25lbnQuc2hvdyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICByYXRpbmdCdXR0b25zLnNob3coKTtcclxuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInNjb3JlLWJ1dHRvblwiOlxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gcGFyc2VJbnQoZXZ0LnRhcmdldC5uYW1lKTtcclxuICAgICAgICAgICAgdmFyIHNjb3JlID0gbmV3IHNjb3JlXzEuU2NvcmUoam9rZSwgcG9pbnRzKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydC5hZGRTY29yZShzY29yZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcG9ydCk7XHJcbiAgICAgICAgICAgICAgICBhbGVydF8xLkFsZXJ0LnNob3cocG9pbnRzICsgXCIgUE9JTlRTISEgXCIgKyBjb25zdGFudHNfMS5BTEVSVC5TVUNDRVNTLCBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydF8xLkFsZXJ0LnNob3coXCJcIiArIHBvaW50cyArIGNvbnN0YW50c18xLkFMRVJULkVSUk9SLCBcImRhbmdlclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIC8qKiBJbnRlbnRhbmRvIHN1c3RpdHVpciBlbCBzd2l0Y2ggcG9yIHVuIGFjdGlvbiBtYXAgKi9cclxuICAgIC8vIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXAoKVxyXG4gICAgLy8gICAgIC5zZXQoXCJhY3Rpb24tYnV0dG9uXCIsICgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc3QgdWk6IFVJID0gbmV3IFVJKCk7XHJcbiAgICAvLyAgICAgICAgIGpva2UuZmV0Y2hBSm9rZSgpXHJcbiAgICAvLyAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgam9rZSA9IHJlc3BvbnNlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVpLnNob3dKb2tlKHJlc3BvbnNlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1aS5zaG93UmF0aW5nQnV0dG9ucygpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICAuc2V0KFwic2NvcmUtYnV0dG9uXCIsICgpPT57XHJcbiAgICAvLyAgICAgICAgIGxldCBwb2ludHMgPSBwYXJzZUludCgoZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5uYW1lKTtcclxuICAgIC8vICAgICAgICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKGpva2UsIHBvaW50cyk7XHJcbiAgICAvLyAgICAgICAgIHJlcG9ydC5hZGRTY29yZShzY29yZSk7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcG9ydCk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgcmVzdWx0LmdldCgoZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5pZCk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxufSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLkRFRkFVTFRfQkNOX0NPT1JEUyA9IGV4cG9ydHMuQUxFUlQgPSB2b2lkIDA7XHJcbmV4cG9ydHMuQUxFUlQgPSB7XHJcbiAgICBTVUNDRVNTOiAnKFlvdSB2b3RlZCBzdWNjZXNzZnVsbHksIGJ1dCB5b3VyIHZvdGUgaXMgZ29pbmcgdG8gZ2V0IGxvc3QuICBIYWhhISknLFxyXG4gICAgRVJST1I6ICdCcm8uLi4geW91IGNhbiBvbmx5IHZvdGUgb25jZS4nXHJcbn07XHJcbmV4cG9ydHMuREVGQVVMVF9CQ05fQ09PUkRTID0gW1wiNDEuMzg3OVwiLCBcIjIuMTY5OTJcIl07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5DaHVja0pva2UgPSB2b2lkIDA7XHJcbnZhciBDaHVja0pva2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDaHVja0pva2UoKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9ICcnO1xyXG4gICAgICAgIHRoaXMuam9rZSA9ICcnO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAnJztcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IC0xO1xyXG4gICAgfVxyXG4gICAgLy8gTGEgZnVuY2nDs24gcmVhbGl6YSB1bmEgbGxhbWFkYSBhIGxhIEFQSSB5IGNvbnN0cnV5ZS9kZXZ1ZWx2ZSB1biBvYmpldG8gSm9rZSBjb24gbG9zIGRhdG9zIGRlIGxhIHJlc3B1ZXN0YSBcclxuICAgIENodWNrSm9rZS5wcm90b3R5cGUuZmV0Y2hBSm9rZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwsIG9wdGlvbnMsIHJlc3BvbnNlLCBqb2tlO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9hcGkuY2h1Y2tub3JyaXMuaW8vam9rZXMvcmFuZG9tJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godXJsLCBvcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpva2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBqb2tlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENodWNrSm9rZTtcclxufSgpKTtcclxuZXhwb3J0cy5DaHVja0pva2UgPSBDaHVja0pva2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5EYWRKb2tlID0gdm9pZCAwO1xyXG52YXIgRGFkSm9rZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERhZEpva2UoKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9ICcnO1xyXG4gICAgICAgIHRoaXMuam9rZSA9ICcnO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAnJztcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IC0xO1xyXG4gICAgfVxyXG4gICAgLy8gTGEgZnVuY2nDs24gcmVhbGl6YSB1bmEgbGxhbWFkYSBhIGxhIEFQSSB5IGNvbnN0cnV5ZS9kZXZ1ZWx2ZSB1biBvYmpldG8gSm9rZSBjb24gbG9zIGRhdG9zIGRlIGxhIHJlc3B1ZXN0YSBcclxuICAgIERhZEpva2UucHJvdG90eXBlLmZldGNoQUpva2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsLCBvcHRpb25zLCByZXNwb25zZSwgam9rZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vaWNhbmhhemRhZGpva2UuY29tLyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHVybCwgb3B0aW9ucyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqb2tlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgam9rZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEYWRKb2tlO1xyXG59KCkpO1xyXG5leHBvcnRzLkRhZEpva2UgPSBEYWRKb2tlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5SZXBvcnQgPSB2b2lkIDA7XHJcbi8qKiBFc3RhIGNsYXNzIHJlYWxpemEgZWwgc2VndWltaWVudG8gZGUgdXNvIGRlIGxhIHdlYi5cclxuKiBUaWVuZSB1biBhcnJheSBxdWUgZ3VhcmRhIG9iamV0b3MgZGVsIHRpcG8geyBqb2tlOiBzdHJpbmcsIHNjb3JlOiBudW1iZXIsIGRhdGU6IGRhdGUgfVxyXG4qIFRpZW5lIHVuIG3DqXRvZG8gcXVlIG11ZXN0cmEgcG9yIGNvbnNvbGEgZWwgcmVwb3J0XHJcbiovXHJcbnZhciBSZXBvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSZXBvcnQoKSB7XHJcbiAgICAgICAgdGhpcy5qb2tlc1JlcG9ydCA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoqSWYgdGhlIHVzZXIgaGFkIGJlZW4gc2NvcmVkIHRoYXQgam9rZSBiZWZvcmUsIHJldHVybnMgZmFsc2UgKi9cclxuICAgIFJlcG9ydC5wcm90b3R5cGUuYWRkU2NvcmUgPSBmdW5jdGlvbiAoc2NvcmUpIHtcclxuICAgICAgICAvL3VuYSBjb25kaWNpw7NuIHBhcmEgZXZpdGFyIHB1bnR1YXIgZWwgbWlzbW8gY2hpc3RlIDIgdmVjZXNcclxuICAgICAgICBpZiAodGhpcy5qb2tlc1JlcG9ydC5maW5kKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBzY29yZS5qb2tlID09PSBpdGVtLmpva2U7IH0pKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiUmVwb3J0LCB0aGUgc2NvcmUgaXMgYWxyZWFkeSBoZXJlXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9rZXNSZXBvcnQucHVzaChzY29yZSk7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiUmVwb3J0LCB0aGUgc2NvcmUgaGFzIGJlZW4gYWRkZWRcIilcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXBvcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUmVwb3J0ID0gUmVwb3J0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5TY29yZSA9IHZvaWQgMDtcclxuLyoqIEVzdGEgY2xhc3NlIHJlcHJlc2VudGEgbGFzIHB1bnR1YWNpb25lcyBkZSBsb3MgY2hpc3RlcyAqL1xyXG52YXIgU2NvcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTY29yZShqb2tlLCBzY29yZSkge1xyXG4gICAgICAgIHRoaXMuam9rZSA9IGpva2U7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTY29yZTtcclxufSgpKTtcclxuZXhwb3J0cy5TY29yZSA9IFNjb3JlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuV2VhdGhlciA9IHZvaWQgMDtcclxudmFyIFdlYXRoZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWF0aGVyKCkge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSAnJztcclxuICAgIH1cclxuICAgIC8vIExhIGZ1bmNpw7NuIHJlYWxpemEgdW5hIGxsYW1hZGEgYSBsYSBBUEkgeSBjb25zdHJ1eWUvZGV2dWVsdmUgdW4gb2JqZXRvIEpva2UgY29uIGxvcyBkYXRvcyBkZSBsYSByZXNwdWVzdGEgXHJcbiAgICBXZWF0aGVyLnByb3RvdHlwZS5mZXRjaFdlYXRoZXIgPSBmdW5jdGlvbiAoY29vcmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXBwSWQsIHVuaXRzLCB1cmwsIG9wdGlvbnMsIHJlc3BvbnNlLCB3ZWF0aGVySW5mbztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyYW4gcGFyY2hlIHF1ZSBoYWNlIHF1ZSBsYSByZXF1ZXN0IGRlbCB0aWVtcG8gc2UgZXNwZXJlIG1lZGlvIHNlZ3VuZG8gcGFyYSBxdWUgYXPDrSBsZSBkZSB0aWVtcG8gZGUgZmluYWxpemFyc2UgYSBsYSBvdHJhIHJlcXVlc3QgZGUgY29vcmRlbmFkYXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwSWQgPSAnYjAxNDdmNjQxMWIxMWM0Nzk1YTlmOWU0YmViYzI3YTMnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0cyA9ICdtZXRyaWMnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/YXBwaWQ9XCIgKyBhcHBJZCArIFwiJnVuaXRzPVwiICsgdW5pdHMgKyBcIiZsYXQ9XCIgKyBjb29yZHNbMF0gKyBcIiZsb249XCIgKyBjb29yZHNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHVybCwgb3B0aW9ucyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWF0aGVySW5mbyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgd2VhdGhlckluZm9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWF0aGVyLnByb3RvdHlwZS5nZXRDb29yZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY29vcmRzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0Q29vcmRzKCk6IGxhdD1cIiArIGNvb3Jkc1swXSArIFwiIC8gbG9uZzogXCIgKyBjb29yZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJlZm9yZSByZXR1cm46IGxhdD1cIiArIGNvb3Jkc1swXSArIFwiIC8gbG9uZzogXCIgKyBjb29yZHNbMV0pOyAvL25vIGxsZWdhbiBsYXMgY29vcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBjb29yZHNdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2VhdGhlcjtcclxufSgpKTtcclxuZXhwb3J0cy5XZWF0aGVyID0gV2VhdGhlcjtcclxuIl19
