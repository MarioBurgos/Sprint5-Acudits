class Joke {
    id: string;
    string: string;
    status: number;

    constructor(id: string, string: string, status: number) {
        this.id = id;
        this.string = string;
        this.status = status;
    }

    async fetchAJoke() {
        // 
        const api = `https://icanhazdadjoke.com/`;
        const proxy = "https://api.allorigins.win/get?url=";  // https://allorigins.win/
        const url = `${proxy}${encodeURIComponent(api)}`;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        await fetch(url, { method: "GET", headers: headers })
            .then(response => console.log(response.text()))
            .then(data => console.log(data))
            .catch(error => console.error(error));

    }
}

class UI {
    showJoke(data: Joke) {
        const app = document.querySelector('#app');
        const div = document.createElement('div');
        if (app.hasChildNodes) {
            app.firstChild.remove();
        }
        div.innerHTML = `
        <div class="card w-75 m-auto px-3 py-2 shadow">
            <p class="text-start"> ${data.string}</p>
        </div>
        `;
        app.appendChild(div);
    }
}

// DOM Events
document.querySelector('#action-button')
    .addEventListener('click', (e) => {
        const ui = new UI();
        let joke = new Joke("id", "this is a joke", 0);
        // joke.fetchAJoke()
        const proxy = "https://api.allorigins.win/get?url=";  // https://allorigins.win/
        const api = `${proxy}https://icanhazdadjoke.com/`;


        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        fetch(api, { method: "GET", headers: headers})
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        // ui.showJoke(joke);
    });

