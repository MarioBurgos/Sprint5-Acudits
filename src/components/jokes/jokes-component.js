"use strict";
exports.__esModule = true;
exports.JokesComponent = void 0;
var JokesComponent = /** @class */ (function () {
    function JokesComponent() {
    }
    /** este método crea un <div> y su hijo <p> y se encarga de pintar el parámetro recibido en dicho <p> */
    JokesComponent.prototype.show = function (data) {
        var _a;
        this.joke = data;
        this.joke.value === undefined ? this.joke.value = '' : this.joke.joke = '';
        var app = document.querySelector('#app-jokes');
        var container = document.querySelector('#container');
        var buttonGroup = document.querySelector('#buttonGroup');
        var div = document.createElement('div');
        div.id = "joke";
        if (container.children.length > 1) {
            container.replaceChild(app, app);
            container.removeChild(buttonGroup);
        }
        var i = Math.floor(Math.random() * 4 + 1);
        container.className = "row d-flex flex-column justify-content-center text-center mx-auto bg-" + i;
        app.style.overflow = "visible";
        div.className = "m-auto px-3";
        div.innerHTML = "<p class=\"text-center\">" + data.value + data.joke + "</p>";
        (_a = app.lastChild) === null || _a === void 0 ? void 0 : _a.remove();
        app.appendChild(div);
    };
    return JokesComponent;
}());
exports.JokesComponent = JokesComponent;
