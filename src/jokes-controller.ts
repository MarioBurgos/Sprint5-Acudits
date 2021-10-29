// import { Joke } from "./joke";
// import { Report } from "./report";
// import { Score } from "./score";
// import { UI } from "./ui";

/** Interfaces para definir los tipos complejos */
interface IJoke {
    id: string;
    joke: string;
    status: number;
}
interface IScore {
    joke: Joke;
    score: number;
    date: string;
}
/** Esta clase define la estructura de Joke.  Tiene un método que bebe de una API y devuelve nuevos Jokes. */
class Joke implements IJoke {
    id: string;
    joke: string;
    status: number;
    constructor() {
        this.id = '';
        this.joke = '';
        this.status = -1;
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    async fetchADadJoke(): Promise<Joke> {
        //settings API call
        const url: string = 'https://icanhazdadjoke.com/';
        let options: object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
        const response: Response = await fetch(url, options);
        const joke: Joke = await response.json();
        return joke;
    }
}
/** Esta classe representa las puntuaciones de los chistes */
class Score implements IScore {
    joke: Joke;
    score: number;
    date: string;
    constructor(joke: Joke, score: number) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
}
/** Esta class realiza el seguimiento de uso de la web.  
 * Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
 * Tiene un método que muestra por consola el report
 */
class Report {
    jokesReport: Array<Score>;
    constructor() {
        this.jokesReport = new Array<Score>();
    }
    addScore(score: Score) {
        //una condición para evitar puntuar el mismo chiste 2 veces
        if (this.jokesReport.find(item => score.joke === item.joke)) {
            //do nothing
        } else {
            this.jokesReport.push(score);
        }
    }
}
/** Esta clase tiene métodos para gestionar la vista */
class UI {
    joke!: Joke;
    /** Como su nombre indica, este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    showJoke(data: Joke) {
        this.joke = data;
        const app: HTMLDivElement = document.querySelector('#app-jokes')!;
        const div: HTMLDivElement = document.createElement('div');
        if (app.hasChildNodes()) {
            app.firstChild?.remove();
        }
        div.innerHTML = `
        <div class="m-auto px-3 py-2">
            <p class="text-center pt-5"> ${data.joke}</p>
        </div>
        `;
        app.appendChild(div);
    }
    /** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */
    showRatingButtons() {
        const app: HTMLDivElement = document.querySelector('#app-jokes')!;
        const container: HTMLDivElement = document.querySelector('#container')!;
        const div: HTMLDivElement = document.querySelector('#buttonGroup')!; //esta variable controla si el elemento ya existe en el DOM
        const buttonGroup: HTMLDivElement = document.createElement('div');
        const btnBg: Array<string> = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
        const btnValue: Array<string> = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle
        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around";
        buttonGroup.id = "buttonGroup";
        // esto crea 3 botones con atributo y hace appendChild en buttonGroup
        //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.
        for (let i = 0; i < 3; i++) {
            let b = document.createElement('input');
            b.className = `btn btn-${btnBg[i]} `;
            b.id = `score-button`
            b.name = `${(i + 1)}`;
            b.type = "submit";
            b.value = `${btnValue[i]}`;
            buttonGroup.appendChild(b);
        }
        if (container.childElementCount >= 3) {
            container.removeChild(div);
        }
        container?.insertBefore(buttonGroup, app);
    }
}
/**/
//DOM Events Controller
//una variable Joke que actuará de forma global para poder pasar el chiste al listener de score
let joke: Joke = new Joke();
let report: Report = new Report();

document.addEventListener('click', (evt) => {
  
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

    switch ((evt.target as HTMLInputElement).id) {
        case "action-button":
            const ui: UI = new UI();
            joke = new Joke();
            joke.fetchADadJoke()
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
            report.addScore(score);
            console.log(report);
            break;
    }
});