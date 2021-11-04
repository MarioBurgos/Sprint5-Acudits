class RatingButtons {
/** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */
public show() {
    const app: HTMLDivElement = document.querySelector('#app-jokes')!;
    const container: HTMLDivElement = document.querySelector('#container')!;
    const div: HTMLDivElement = document.querySelector('#buttonGroup')!; //esta variable controla si el elemento ya existe en el DOM
    const buttonGroup: HTMLDivElement = document.createElement('div');
    const btnBg: Array<string> = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
    // const btnValue: Array<string> = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle
    const btnIcons: Array<string> = ['<i class="bi bi-emoji-expressionless"></i>', '<i class="bi bi-emoji-smile"></i>', '<i class="bi bi-emoji-laughing"></i>']; //un array para pintar los botones dentro de un bucle
    buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around w-50 mx-auto";
    buttonGroup.id = "buttonGroup";

    // esto crea 3 botones con atributo y hace appendChild en buttonGroup
    //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.
    for (let i = 0; i < 3; i++) {
        let b = document.createElement('button');
        b.className = `btn btn-outline`;
        b.id = `score-button`
        b.name = `${(i + 1)}`;
        b.type = "submit";
        // b.value = `${btnValue[i]}`;
        b.innerHTML = `${btnIcons[i]}`;
        buttonGroup.appendChild(b);
    }
    if (container.childElementCount >= 3) {
        container.removeChild(div);
    }
    container?.insertBefore(buttonGroup, app);
}
}
export {RatingButtons};