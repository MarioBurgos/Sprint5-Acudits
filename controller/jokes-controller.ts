class Joke {
    id: string;
    joke: string;
    status: number;

    constructor(id: string, joke: string, status: number) {
        this.id = id;
        this.joke = joke;
        this.status = status;
    }
}

class UI {
    showRandomJoke(data: Joke) {
        const app = document.querySelector('#app');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-75 m-auto px-3 py-2 shadow">
            <p class="text-start">${data.joke}</p>
        </div>
        `;
        app.appendChild(div);

    }
}



// DOM Events
document.querySelector('#action-button')
    .addEventListener('click', (e) => {
        const ui = new UI();
        let joke = new Joke("ddd", "this is a joke", 400);

        // fetch("https://icanhazdadjoke.com/", { mode: 'no-cors', headers: { Accept: 'application/json' } })
        fetch("http://api.openweathermap.org/data/2.5/weather?appid=b0147f6411b11c4795a9f9e4bebc27a3&units=metric&q=copacabana", { mode: 'no-cors', headers: { 'Accept': 'application/json' } })
            .then(response => {
                console.log(response.json);
                ui.showRandomJoke(joke);
                return response.json
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
    });





