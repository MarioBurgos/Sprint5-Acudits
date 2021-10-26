var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Joke = /** @class */ (function () {
    function Joke(id, string, status) {
        this.id = id;
        this.string = string;
        this.status = status;
    }
    Joke.prototype.fetchAJoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, joke, newJoke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://icanhazdadjoke.com/';
                        options = {
                            method: 'GET',
                            headers: {
                                "Accept": "application/json"
                            }
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        joke = _a.sent();
                        newJoke = joke.joke;
                        return [2 /*return*/, newJoke];
                }
            });
        });
    };
    return Joke;
}());
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.showJoke = function (data) {
        var app = document.querySelector('#app');
        var div = document.createElement('div');
        if (app.hasChildNodes) {
            app.firstChild.remove();
        }
        div.innerHTML = "\n        <div class=\"card w-75 m-auto px-3 py-2 shadow\">\n            <p class=\"text-start\"> " + data + "</p>\n        </div>\n        ";
        app.appendChild(div);
    };
    return UI;
}());
// DOM Events
document.querySelector('#action-button')
    .addEventListener('click', function (e) {
    var ui = new UI();
    var joke = new Joke("id", "this is a joke", 0);
    var fetchData = new Promise(function (res, err) {
        var value = joke.fetchAJoke();
        res(value);
    });
    fetchData
        .then(function (value) { return ui.showJoke(value); })["catch"](function (error) { return console.error(error); })["finally"](function () { return console.log('Completed!'); });
});
