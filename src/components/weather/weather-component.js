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
