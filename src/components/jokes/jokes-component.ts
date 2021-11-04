import { IJoke } from "../../interfaces/ijoke";

class JokesComponent {
    joke!: IJoke;

    /** este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    public show(data: IJoke) {
        this.joke = data;
        this.joke.value === undefined ? this.joke.value = '' : this.joke.joke = '';  
        const app: HTMLDivElement = document.querySelector('#app-jokes')!;
        const container: HTMLDivElement = document.querySelector('#container')!;
        const buttonGroup: HTMLDivElement = document.querySelector('#buttonGroup')!;
        const div: HTMLDivElement = document.createElement('div');
        div.id = "joke";
        if (container.children.length > 1) {
            container.replaceChild(app, app);
            container.removeChild(buttonGroup);
        }
        let i = Math.floor(Math.random()*4+1);
        container.className = `row d-flex flex-column justify-content-center text-center mx-auto bg-${i}`;
        app.style.overflow = "visible";
        div.className = "m-auto px-3";
        div.innerHTML = `<p class="text-center">${data.value}${data.joke}</p>`;
        app.lastChild?.remove();
        app.appendChild(div);
    }

    
}

export { JokesComponent};