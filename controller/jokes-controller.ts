/** Esta clase define la estructura de Joke.  Tiene un método que bebe de una API y devuelve nuevos Jokes. */
class Joke {
    id: string;
    joke: string;
    status: number;

    /** La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta */
    async fetchAJoke():Promise<Joke> {
        //settings API call
        const url:string = 'https://icanhazdadjoke.com/';
        let options:object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
        const response:Response = await fetch(url, options);
        const joke: Joke = await response.json();
        return joke;
    }
}

/** Esta clase tiene métodos para gestionar la vista */
class UI {
    showJoke(data: Joke) {
        const app:HTMLElement = document.querySelector('#app-jokes');
        const div:HTMLElement = document.createElement('div');
        if (app.hasChildNodes) {
            app.firstChild.remove();
        }
        div.innerHTML = `
        <div class="m-auto px-3 py-2">
            <p class="text-start"> ${data.joke}</p>
        </div>
        `;
        app.appendChild(div);
    }


}

// DOM Events Controller
document.querySelector('#action-button')
    .addEventListener('click', (e) => {
        const ui: UI = new UI();
        let joke: Joke = new Joke();

        joke.fetchAJoke()
            .then(response => {
                joke = response;
                ui.showJoke(response)
            })
            .catch(error => console.error(error))
    });

