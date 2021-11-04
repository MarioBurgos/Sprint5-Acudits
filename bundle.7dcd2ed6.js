// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"controller/bundle.js":[function(require,module,exports) {
(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.Alert = void 0;

    var Alert =
    /** @class */
    function () {
      function Alert() {}

      Alert.show = function (message, cssClass) {
        var div = document.createElement('small');
        div.className = "alert alert-" + cssClass + " mt-3 w-75 mx-auto";
        div.appendChild(document.createTextNode(message)); // showing in DOM

        var container = document.querySelector('#container');
        var app = document.querySelector('#app-jokes');
        container.insertBefore(div, app);
        setTimeout(function () {
          document.querySelector('.alert').remove();
        }, 1500);
      };

      return Alert;
    }();

    exports.Alert = Alert;
  }, {}],
  2: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.JokesComponent = void 0;

    var JokesComponent =
    /** @class */
    function () {
      function JokesComponent() {}
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
    }();

    exports.JokesComponent = JokesComponent;
  }, {}],
  3: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.RatingButtons = void 0;

    var RatingButtons =
    /** @class */
    function () {
      function RatingButtons() {}
      /** Este metodo muestra los botones de rating a la vez que se muestra el chiste. */


      RatingButtons.prototype.show = function () {
        var app = document.querySelector('#app-jokes');
        var container = document.querySelector('#container');
        var div = document.querySelector('#buttonGroup'); //esta variable controla si el elemento ya existe en el DOM

        var buttonGroup = document.createElement('div');
        var btnBg = ['danger', 'warning', 'success']; //un array para pintar los botones dentro de un bucle
        // const btnValue: Array<string> = ['Just... NO', 'He he', 'I loled!']; //un array para pintar los botones dentro de un bucle

        var btnIcons = ['<i class="bi bi-emoji-expressionless"></i>', '<i class="bi bi-emoji-smile"></i>', '<i class="bi bi-emoji-laughing"></i>']; //un array para pintar los botones dentro de un bucle

        buttonGroup.className = "btn-group btn-group-toggle pt-4 d-flex flex-row justify-content-around w-50 mx-auto";
        buttonGroup.id = "buttonGroup"; // esto crea 3 botones con atributo y hace appendChild en buttonGroup
        //name = "1, 2 o 3" //type = "submit" //value = de momento un string  //y los iconos:  TODO: buscarlos y ponerlos como btnImg.

        for (var i = 0; i < 3; i++) {
          var b = document.createElement('button');
          b.className = "btn btn-outline";
          b.id = "score-button";
          b.name = "" + (i + 1);
          b.type = "submit"; // b.value = `${btnValue[i]}`;

          b.innerHTML = "" + btnIcons[i];
          buttonGroup.appendChild(b);
        }

        if (container.childElementCount >= 3) {
          container.removeChild(div);
        }

        container === null || container === void 0 ? void 0 : container.insertBefore(buttonGroup, app);
      };

      return RatingButtons;
    }();

    exports.RatingButtons = RatingButtons;
  }, {}],
  4: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.WeatherComponent = void 0;

    var WeatherComponent =
    /** @class */
    function () {
      function WeatherComponent() {}

      WeatherComponent.prototype.showWeather = function (data) {
        var app = document.querySelector('#app-weather');
        var weatherDisplay = document.createElement('p');
        var span = document.createElement('p');
        weatherDisplay.className = "text-primary ms-3";
        span.className = "ms-3 text-info";
        weatherDisplay.textContent = "Today's weather:";
        span.textContent = "" + data.weather[0].main;
        app.appendChild(weatherDisplay);
        app.appendChild(span);
        console.log("weatherComponent is working");
      };

      return WeatherComponent;
    }();

    exports.WeatherComponent = WeatherComponent;
  }, {}],
  5: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;

    var alert_1 = require("../components/alert/alert");

    var jokes_component_1 = require("../components/jokes/jokes-component");

    var rating_buttons_1 = require("../components/jokes/rating-buttons/rating-buttons");

    var weather_component_1 = require("../components/weather/weather-component");

    var constants_1 = require("../data/constants");

    var chuckjoke_1 = require("../model/chuckjoke");

    var dadjoke_1 = require("../model/dadjoke");

    var report_1 = require("../model/report");

    var score_1 = require("../model/score");

    var weather_1 = require("../model/weather"); //DOM Events Controller 


    var joke = new dadjoke_1.DadJoke();
    var report = new report_1.Report();
    var weather;
    var weatherComponent = new weather_component_1.WeatherComponent();
    var jokesComponent = new jokes_component_1.JokesComponent();
    var ratingButtons = new rating_buttons_1.RatingButtons();
    /** Event onLoad */

    window.addEventListener('load', function () {
      weather = new weather_1.Weather();
      weatherComponent = new weather_component_1.WeatherComponent();
      weather.getCoords().then(function (response) {
        console.log(response);
        weather.fetchWeather(response).then(function (result) {
          return weatherComponent.showWeather(result);
        });
      });
    });
    /** Events onClick */

    document.addEventListener('click', function (evt) {
      switch (evt.target.id) {
        case "action-button":
          // show Dad or Chuck Jokes 50-50
          Math.floor(Math.random() * 100) % 2 ? joke = new dadjoke_1.DadJoke() : joke = new chuckjoke_1.ChuckJoke();
          console.log("isDad: " + (joke instanceof dadjoke_1.DadJoke));
          joke.fetchAJoke().then(function (response) {
            joke = response;
            jokesComponent.show(response);
            ratingButtons.show();
          })["catch"](function (error) {
            return console.error(error);
          });
          break;

        case "score-button":
          var points = parseInt(evt.target.name);
          var score = new score_1.Score(joke, points);

          if (report.addScore(score)) {
            console.log(report);
            alert_1.Alert.show(points + " POINTS!! " + constants_1.ALERT.SUCCESS, "success");
          } else {
            alert_1.Alert.show("" + constants_1.ALERT.ERROR, "danger");
          }

          break;
      }
      /** Intentando sustituir el switch por un action map */
      // const result = new Map()
      //     .set("action-button", () => {
      //         const ui: UI = new UI();
      //         joke.fetchAJoke()
      //             .then(response => {
      //                 joke = response;
      //                 ui.showJoke(response);
      //                 ui.showRatingButtons();
      //             })
      //             .catch(error => console.error(error));
      //     })
      //     .set("score-button", ()=>{
      //         let points = parseInt((evt.target as HTMLInputElement).name);
      //         let score = new Score(joke, points);
      //         report.addScore(score);
      //         console.log(report);
      //     });
      //     result.get((evt.target as HTMLInputElement).id);
      //     console.log(result);

    });
  }, {
    "../components/alert/alert": 1,
    "../components/jokes/jokes-component": 2,
    "../components/jokes/rating-buttons/rating-buttons": 3,
    "../components/weather/weather-component": 4,
    "../data/constants": 6,
    "../model/chuckjoke": 7,
    "../model/dadjoke": 8,
    "../model/report": 9,
    "../model/score": 10,
    "../model/weather": 11
  }],
  6: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.DEFAULT_BCN_COORDS = exports.ALERT = void 0;
    exports.ALERT = {
      SUCCESS: '(You voted successfully, but your vote is going to get lost.  Haha!)',
      ERROR: 'Bro... you can only vote once.'
    };
    exports.DEFAULT_BCN_COORDS = ["41.3879", "2.16992"];
  }, {}],
  7: [function (require, module, exports) {
    "use strict";

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    var __generator = this && this.__generator || function (thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };

    exports.__esModule = true;
    exports.ChuckJoke = void 0;

    var ChuckJoke =
    /** @class */
    function () {
      function ChuckJoke() {
        this.id = '';
        this.joke = '';
        this.value = '';
        this.status = -1;
      } // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 


      ChuckJoke.prototype.fetchAJoke = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url, options, response, joke;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = 'https://api.chucknorris.io/jokes/random';
                options = {
                  method: 'GET',
                  headers: {
                    "Accept": "application/json"
                  }
                };
                return [4
                /*yield*/
                , fetch(url, options)];

              case 1:
                response = _a.sent();
                return [4
                /*yield*/
                , response.json()];

              case 2:
                joke = _a.sent();
                return [2
                /*return*/
                , joke];
            }
          });
        });
      };

      return ChuckJoke;
    }();

    exports.ChuckJoke = ChuckJoke;
  }, {}],
  8: [function (require, module, exports) {
    "use strict";

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    var __generator = this && this.__generator || function (thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };

    exports.__esModule = true;
    exports.DadJoke = void 0;

    var DadJoke =
    /** @class */
    function () {
      function DadJoke() {
        this.id = '';
        this.joke = '';
        this.value = '';
        this.status = -1;
      } // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 


      DadJoke.prototype.fetchAJoke = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url, options, response, joke;
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
                return [4
                /*yield*/
                , fetch(url, options)];

              case 1:
                response = _a.sent();
                return [4
                /*yield*/
                , response.json()];

              case 2:
                joke = _a.sent();
                return [2
                /*return*/
                , joke];
            }
          });
        });
      };

      return DadJoke;
    }();

    exports.DadJoke = DadJoke;
  }, {}],
  9: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.Report = void 0;
    /** Esta class realiza el seguimiento de uso de la web.
    * Tiene un array que guarda objetos del tipo { joke: string, score: number, date: date }
    * Tiene un método que muestra por consola el report
    */

    var Report =
    /** @class */
    function () {
      function Report() {
        this.jokesReport = [];
      }
      /**If the user had been scored that joke before, returns false */


      Report.prototype.addScore = function (score) {
        //una condición para evitar puntuar el mismo chiste 2 veces
        if (this.jokesReport.find(function (item) {
          return score.joke === item.joke;
        })) {
          //    console.log("Report, the score is already here")
          return false;
        } else {
          this.jokesReport.push(score); //    console.log("Report, the score has been added")

          return true;
        }
      };

      return Report;
    }();

    exports.Report = Report;
  }, {}],
  10: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    exports.Score = void 0;
    /** Esta classe representa las puntuaciones de los chistes */

    var Score =
    /** @class */
    function () {
      function Score(joke, score) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
      }

      return Score;
    }();

    exports.Score = Score;
  }, {}],
  11: [function (require, module, exports) {
    "use strict";

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    var __generator = this && this.__generator || function (thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };

    exports.__esModule = true;
    exports.Weather = void 0;

    var Weather =
    /** @class */
    function () {
      function Weather() {
        this.description = '';
      } // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 


      Weather.prototype.fetchWeather = function (coords) {
        return __awaiter(this, void 0, void 0, function () {
          var appId, units, url, options, response, weatherInfo;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                setTimeout(function () {//gran parche que hace que la request del tiempo se espere medio segundo para que así le de tiempo de finalizarse a la otra request de coordenadas
                }, 500);
                appId = 'b0147f6411b11c4795a9f9e4bebc27a3';
                units = 'metric';
                url = "http://api.openweathermap.org/data/2.5/weather?appid=" + appId + "&units=" + units + "&lat=" + coords[0] + "&lon=" + coords[1];
                options = {
                  method: 'GET',
                  headers: {
                    "Accept": "application/json"
                  }
                };
                return [4
                /*yield*/
                , fetch(url, options)];

              case 1:
                response = _a.sent();
                return [4
                /*yield*/
                , response.json()];

              case 2:
                weatherInfo = _a.sent();
                console.log(weatherInfo);
                return [2
                /*return*/
                , weatherInfo];
            }
          });
        });
      };

      Weather.prototype.getCoords = function () {
        return __awaiter(this, void 0, void 0, function () {
          var coords;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                coords = [];
                if (!navigator.geolocation) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , navigator.geolocation.getCurrentPosition(function (position) {
                  coords.push(position.coords.latitude.toString());
                  coords.push(position.coords.longitude.toString());
                  console.log("getCoords(): lat=" + coords[0] + " / long: " + coords[1]);
                })];

              case 1:
                _a.sent();

                _a.label = 2;

              case 2:
                console.log("before return: lat=" + coords[0] + " / long: " + coords[1]); //no llegan las coords

                return [2
                /*return*/
                , coords];
            }
          });
        });
      };

      return Weather;
    }();

    exports.Weather = Weather;
  }, {}]
}, {}, [5]);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50137" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","controller/bundle.js"], null)
//# sourceMappingURL=/bundle.7dcd2ed6.js.map