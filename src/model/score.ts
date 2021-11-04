import { IJoke } from "../interfaces/ijoke";

/** Esta classe representa las puntuaciones de los chistes */
class Score {
    joke: IJoke;
    score: number;
    date: string;
    constructor(joke: IJoke, score: number) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
}

export { Score };