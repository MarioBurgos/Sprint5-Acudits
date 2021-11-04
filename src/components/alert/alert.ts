class Alert{

    static show(message:string, cssClass:string) {
        const div = document.createElement('small');
        div.className = `alert alert-${cssClass} mt-3 w-75 mx-auto`;
        div.appendChild(document.createTextNode(message));
        // showing in DOM
        const container = document.querySelector('#container');
        const app = document.querySelector('#app-jokes');
        container!.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert')!.remove();
        }, 1500);
    }
}

export {Alert};