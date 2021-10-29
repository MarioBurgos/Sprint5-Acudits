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
                        return [4 /*yield*/, coords];
                    case 3: //no llegan las coords
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Weather;
}());
/** Esta clase tiene métodos para gestionar la vista */
var UI2 = /** @class */ (function () {
    function UI2() {
    }
    UI2.prototype.showWeather = function (data) {
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
    return UI2;
}());
//DOM Events
window.addEventListener('load', function () {
    var ui = new UI2();
    var weather = new Weather();
    weather.getCoords()
        .then(function (response) {
        console.log(response);
        weather.fetchWeather(response)
            .then(function (result) { return ui.showWeather((result)); });
    });
});
