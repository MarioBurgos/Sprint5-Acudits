// import type { IJoke } from "./interfaces/ijoke";
// import type { IScore } from "./interfaces/iscore";
import { Joke } from "./joke";

/** Esta classe representa las puntuaciones de los chistes */
class Score {
    joke: Joke;
    score: number;
    date: string;
    constructor(joke: Joke, score: number) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
}

export { Score };