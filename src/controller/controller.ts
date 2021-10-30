import { IJoke} from "../interfaces/ijoke";
import { ChuckJoke } from "../model/chuckjoke";
import { DadJoke } from "../model/dadjoke";
import { Report } from "../model/report";
import { Score } from "../model/score";
import { UI } from "../model/ui";
import { Weather } from "../model/weather";

//DOM Events Controller 
const ui: UI = new UI();
let joke: IJoke = new DadJoke();
let report: Report = new Report();
let weather: Weather;

/** Event onLoad */
window.addEventListener('load', () => {
    weather = new Weather();
    weather.getCoords()
        .then(response => {
            console.log(response);
            weather.fetchWeather(response)
                .then(result => ui.showWeather((result)));
        });
});

/** Events onClick */
document.addEventListener('click', (evt) => {
    switch ((evt.target as HTMLInputElement).id) {
        case "action-button":
            // show Dad or Chuck Jokes 50-50
            (Math.floor(Math.random()*100)%2) ? joke = new DadJoke() : joke = new ChuckJoke();
            console.log(`Dad: ${joke instanceof DadJoke}`);
            joke.fetchAJoke() 
                .then(response => {
                    joke = response;
                    ui.showJoke(response);
                    ui.showRatingButtons();
                })
                .catch(error => console.error(error));
            break;
        case "score-button":
            let points = parseInt((evt.target as HTMLInputElement).name);
            let score = new Score(joke, points);
            
            if (report.addScore(score)) {
                 console.log(report);
                ui.showAlert(`You voted ${points} points`, "success");
            }else{
                ui.showAlert(`You can't vote twice, bro.`, "danger");
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
