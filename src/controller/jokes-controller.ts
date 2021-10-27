/** Interfaces para definir los tipos complejos */
interface IJoke {
    id: string;
    joke: string;
    status: number;
}
interface IScore {
    joke: Joke;
    score: number;
    date: Date;
}
// import { IJoke } from '../interfaces/ijoke';
// import { IScore } from '../interfaces/iscore'

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
    async fetchAJoke(): Promise<Joke> {
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

/** Esta class realiza el seguimiento de uso de la web.  
 * Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
 * Tiene un método que muestra por consola el report
 */
class Report {
    jokesReport: Array<IScore>;

    constructor() {
        this.jokesReport = [];
    }

    addScore(score: IScore) {
        this.jokesReport.push(score);
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
            b.id = `button-${(i + 1)}`
            b.name = `${(i + 1)}`;
            b.type = "submit";
            b.value = `${btnValue[i]}`;
            buttonGroup.appendChild(b);
        }
        container?.insertBefore(buttonGroup, app);
    }


}

// DOM Events Controller

/**Este listener del action-button representa el botón principal que muestra DadJokes */
document.querySelector('#action-button')!
    .addEventListener('click', (e) => {
        const ui: UI = new UI();
        let joke: Joke = new Joke();

        joke.fetchAJoke()
            .then(response => {
                joke = response;
                ui.showJoke(response);
                ui.showRatingButtons();
            })
            .catch(error => console.error(error))
    });

/** Con este listener se apunta al buttonGroup, aunque en realidad va a tomar el valor de (e).target que serán los 3 botones de rating.
 * Cuando tome el valor del botón (su score), lo almacenará en un array de scores.
*/
document.querySelector('#buttonGroup')!
    .addEventListener('click', (e) => {
        // const report
    });

