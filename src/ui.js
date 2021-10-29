"use strict";
exports.__esModule = true;
exports.UI = void 0;
/** Esta clase tiene métodos para gestionar la vista */
var UI = /** @class */ (function () {
    function UI() {
    }
    /** Como su nombre indica, este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    UI.prototype.showJoke = function (data) {
        var _a;
        this.joke = data;
        var app = document.querySelector('#app-jokes');
        var div = document.createElement('div');
        if (app.hasChildNodes()) {
            (_a = app.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
        div.innerHTML = "\n        <div class=\"m-auto px-3 py-2\">\n            <p class=\"text-center pt-5\"> " + data.joke + "</p>\n        </div>\n        ";
        app.appendChild(div);
    };
    /** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */
    UI.prototype.showRatingButtons = function () {
        var app = document.querySelector('#app-jokes');
        var container = document.querySelector('#container');
        var div = document.querySelector('#buttonGroup'); //esta variable controla si el elemento ya existe en el DOM
        var buttonGroup = document.createElement('div');
        var btnBg = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
        var btnValue = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle
        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around";
        buttonGroup.id = "buttonGroup";
        // esto crea 3 botones con atributo y hace appendChild en buttonGroup
        //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.
        for (var i = 0; i < 3; i++) {
            var b = document.createElement('input');
            b.className = "btn btn-" + btnBg[i] + " ";
            b.id = "score-button";
            b.name = "" + (i + 1);
            b.type = "submit";
            b.value = "" + btnValue[i];
            buttonGroup.appendChild(b);
        }
        if (container.childElementCount >= 3) {
            container.removeChild(div);
        }
        container === null || container === void 0 ? void 0 : container.insertBefore(buttonGroup, app);
    };
    return UI;
}());
exports.UI = UI;
