import { Joke } from "./joke";

/** Esta clase tiene métodos para gestionar la vista */
class UI {
    joke!: Joke;
    /** Como su nombre indica, este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    public showJoke(data: Joke) {
        this.joke = data;
        const app: HTMLDivElement = document.querySelector('#app-jokes')!;
        const div: HTMLDivElement = document.createElement('div');
        if (app.hasChildNodes()) {
            app.firstChild?.remove();
        }
        div.innerHTML = `
        <div class="m-auto px-3 py-2">
            <p class="text-center pt-5"> ${data.joke}</p>
        </div>
        `;
        app.appendChild(div);
    }

    /** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */
    public showRatingButtons() {
        const app: HTMLDivElement = document.querySelector('#app-jokes')!;
        const container: HTMLDivElement = document.querySelector('#container')!;
        const div: HTMLDivElement = document.querySelector('#buttonGroup')!; //esta variable controla si el elemento ya existe en el DOM

        const buttonGroup: HTMLDivElement = document.createElement('div');
        const btnBg: Array<string> = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
        const btnValue: Array<string> = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle
        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around";
        buttonGroup.id = "buttonGroup";

        // esto crea 3 botones con atributo y hace appendChild en buttonGroup
        //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.
        for (let i = 0; i < 3; i++) {
            let b = document.createElement('input');
            b.className = `btn btn-${btnBg[i]} `;
            b.id = `score-button`
            b.name = `${(i + 1)}`;
            b.type = "submit";
            b.value = `${btnValue[i]}`;
            buttonGroup.appendChild(b);
        }
        if (container.childElementCount >= 3) {
            container.removeChild(div);
        }
        container?.insertBefore(buttonGroup, app);
    }
}

export { UI };