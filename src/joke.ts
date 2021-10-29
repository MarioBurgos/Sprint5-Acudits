// import type { IJoke } from "./interfaces/ijoke";

/** Esta clase define la estructura de Joke.  Tiene un método que bebe de una API y devuelve nuevos Jokes. */
class Joke {
    id: string;
    joke: string;
    status: number;
    constructor() {
        this.id = '';
        this.joke = '';
        this.status = -1;
    }
    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    public async fetchAJoke(): Promise<Joke> {
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

export { Joke };
