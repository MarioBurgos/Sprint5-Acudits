
//para definir los tipos complejos */
interface IWeather {
    description: string;
}

/** Esta clase define la estructura de Joke.  Tiene un método que bebe de una API y devuelve nuevos Jokes. */
class Weather implements IWeather {
    description: string;
    constructor() {
        this.description = '';
    }

    // La función realiza una llamada a la API y construye/devuelve un objeto Joke con los datos de la respuesta 
    async fetchWeather(coords: Array<string>): Promise<any> {
        setTimeout(() => {
            //gran parche que hace que la request del tiempo se espere medio segundo para que así le de tiempo de finalizarse a la otra request de coordenadas
        }, 500);
        //settings API call
        const appId: string = 'b0147f6411b11c4795a9f9e4bebc27a3';
        const units: string = 'metric';
        const url: string = `http://api.openweathermap.org/data/2.5/weather?appid=${appId}&units=${units}&lat=${coords[0]}&lon=${coords[1]}`;
        let options: object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
        const response: Response = await fetch(url, options);
        const weatherInfo: Weather = await response.json();
        console.log(weatherInfo);
        return weatherInfo;
    }

    async getCoords(): Promise<Array<string>> {
        let coords: Array<string> = [];

        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
                coords.push(position.coords.latitude.toString());
                coords.push(position.coords.longitude.toString());
                console.log(`getCoords(): lat=${coords[0]} / long: ${coords[1]}`);
            });

        }
        console.log(`before return: lat=${coords[0]} / long: ${coords[1]}`); //no llegan las coords
        return await coords;
    }
}


/** Esta clase tiene métodos para gestionar la vista */
class UI2 {
    weather!: Weather;

    showWeather(data: any) {
        const app: HTMLDivElement = document.querySelector('#app-weather')!;
        const weatherDisplay = document.createElement('p');
        const span = document.createElement('p');
        weatherDisplay.className = "text-primary ms-3";
        span.className = "ms-3 text-info";
        weatherDisplay.textContent = `Today's weather:`;
        span.textContent = `${data.weather[0].main}`;

        app.appendChild(weatherDisplay);
        app.appendChild(span);
    }
}


//DOM Events
window.addEventListener('load', () => {
    const ui: UI2 = new UI2();
    const weather: Weather = new Weather();
    weather.getCoords()
        .then(response => {
            console.log(response);
            weather.fetchWeather(response)
                .then(result => ui.showWeather((result)));
        });
});