import { Score } from "./score";

/** Esta class realiza el seguimiento de uso de la web.  
* Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
* Tiene un método que muestra por consola el report
*/
export class Report {
   jokesReport: Array<Score>;
   constructor() {
       this.jokesReport = [];
   }
   /**If the user had been scored that joke before, returns false */
   public addScore(score: Score): boolean {
       //una condición para evitar puntuar el mismo chiste 2 veces
       if (this.jokesReport.find(item => score.joke === item.joke)) {
        //    console.log("Report, the score is already here")
           return false;
       } else {
           this.jokesReport.push(score);
        //    console.log("Report, the score has been added")
           return true;
       }
   }
}
