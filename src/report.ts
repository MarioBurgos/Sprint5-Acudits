import { Score } from "./score";

/** Esta class realiza el seguimiento de uso de la web.  
* Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
* Tiene un método que muestra por consola el report
*/
class Report {
   jokesReport: Array<Score>;
   constructor() {
       this.jokesReport = [];
   }
   public addScore(score: Score) {
       //una condición para evitar puntuar el mismo chiste 2 veces
       if (this.jokesReport.find(item => score.joke === item.joke)) {
           //do nothing
       } else {
           this.jokesReport.push(score);
       }
   }
}

export { Report };