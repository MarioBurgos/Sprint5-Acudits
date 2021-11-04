"use strict";
exports.__esModule = true;
exports.Alert = void 0;
var Alert = /** @class */ (function () {
    function Alert() {
    }
    Alert.show = function (message, cssClass) {
        var div = document.createElement('small');
        div.className = "alert alert-" + cssClass + " mt-3 w-75 mx-auto";
        div.appendChild(document.createTextNode(message));
        // showing in DOM
        var container = document.querySelector('#container');
        var app = document.querySelector('#app-jokes');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1500);
    };
    return Alert;
}());
exports.Alert = Alert;
