import type { IJoke } from "../interfaces/ijoke";

export class ChuckJoke implements IJoke {
    id: string;
    joke: string;
    status: number;
    value: string;
    constructor() {
        this.id = '';
        this.joke = '';
        this.value = '';
        this.status = -1;
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    async fetchAJoke(): Promise<IJoke> {
        //settings API call
        const url: string = 'https://api.chucknorris.io/jokes/random';
        let options: object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
        const response: Response = await fetch(url, options);
        const joke: IJoke = await response.json();
        return joke;
    }
}
