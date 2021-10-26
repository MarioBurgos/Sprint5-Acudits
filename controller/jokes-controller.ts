class Joke {
    id: string;
    string: string;
    status: number;

    constructor(id: string, string: string, status: number) {
        this.id = id;
        this.string = string;
        this.status = status;
    }

    async fetchAJoke():Promise<string> {
        //settings API call
        const url:string = 'https://icanhazdadjoke.com/';
        let options:object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
 
        const response:Response = await fetch(url, options);
        const joke = await response.json();
        let newJoke:string = joke.joke;
        return newJoke;
    }
}

class UI {
    showJoke(data: string) {
        const app = document.querySelector('#app');
        const div = document.createElement('div');
        if (app.hasChildNodes) {
            app.firstChild.remove();
        }
        div.innerHTML = `
        <div class="card w-75 m-auto px-3 py-2 shadow">
            <p class="text-start"> ${data}</p>
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

        joke.fetchAJoke()
            .then(value => ui.showJoke(value))
            .catch(error => console.error(error))
            .finally(() => console.log('Completed!'));
    });

