var Joke = /** @class */ (function () {
    function Joke(id, joke, status) {
        this.id = id;
        this.joke = joke;
        this.status = status;
    }
    return Joke;
}());
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.showRandomJoke = function (data) {
        var app = document.querySelector('#app');
        var div = document.createElement('div');
        div.innerHTML = "\n        <div class=\"card w-75 m-auto px-3 py-2 shadow\">\n            <p class=\"text-start\">" + data.joke + "</p>\n        </div>\n        ";
        app.appendChild(div);
    };
    return UI;
}());
// DOM Events
document.querySelector('#action-button')
    .addEventListener('click', function (e) {
    var ui = new UI();
    var joke = new Joke("ddd", "this is a joke", 400);
    // fetch("https://icanhazdadjoke.com/", { mode: 'no-cors', headers: { Accept: 'application/json' } })
    fetch("http://api.openweathermap.org/data/2.5/weather?appid=b0147f6411b11c4795a9f9e4bebc27a3&units=metric&q=copacabana", { mode: 'no-cors', headers: { 'Accept': 'application/json' } })
        .then(function (response) {
        console.log(response.json);
        ui.showRandomJoke(joke);
        return response.json;
    })
        .then(function (data) {
        console.log(data);
    })["catch"](function (error) { return console.error(error); });
});
