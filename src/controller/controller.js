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
