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
