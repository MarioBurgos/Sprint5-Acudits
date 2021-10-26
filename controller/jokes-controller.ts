class Joke {
    id: string;
    joke: string;
    status: number;

    constructor() {    }

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

class UI {
    showJoke(data: Joke) {
        const app:HTMLElement = document.querySelector('#app');
        const div:HTMLElement = document.createElement('div');
        if (app.hasChildNodes) {
            app.firstChild.remove();
        }
        div.innerHTML = `
        <div class="card w-75 m-auto px-3 py-2 shadow">
            <p class="text-start"> ${data.joke}</p>
        </div>
        `;
        app.appendChild(div);
    }
}

// DOM Events
document.querySelector('#action-button')
    .addEventListener('click', (e) => {
        const ui: UI = new UI();
        let joke: Joke = new Joke();
        
        joke.fetchAJoke()
            .then(response => {
                joke = response;
                console.log(joke);
                ui.showJoke(response)
            })
            .catch(error => console.error(error))
            .finally(() => console.log('Completed!'));
    });

