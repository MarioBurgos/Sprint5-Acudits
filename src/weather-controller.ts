
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
        //settings API call
        const appId: string = 'b0147f6411b11c4795a9f9e4bebc27a3';
        const units: string = 'metric';
        const lang: string = 'en';
        const url: string = `http://api.openweathermap.org/data/2.5/weather?appid=${appId}&units=${units}&lat=${coords[0]}&lon=${coords[1]}`;
        let options: object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
        const response: Response = await fetch(url, options);
        const weatherInfo: Weather = await response.json();
        return weatherInfo;
    }

    async getCoords(): Promise<Array<string>> {
        let coords: Array<string> = [];
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
                coords.push(position.coords.latitude.toString());
                coords.push(position.coords.longitude.toString());
                // console.log(`getCoords(): lat=${coords[0]} / long: ${coords[1]}`);
                return coords;
            });
        }            
        return coords;
    }
}

/** Esta clase tiene métodos para gestionar la vista */
class UI2 {
    weather!: Weather;
    showWeather(data: string) {
        const app: HTMLDivElement = document.querySelector('#app-weather')!;
        const weatherDisplay = document.createElement('p');
        const span = document.createElement('p');
        weatherDisplay.className = "text-primary ms-3";
        span.className = " ms-3 text-info";
        weatherDisplay.textContent = `Today's weather:`;
        span.textContent = `${data}`;
        
        app.appendChild(weatherDisplay);
        app.appendChild(span);
    }
}

//DOM Events
window.addEventListener('load', (evt) => {
    const ui: UI2 = new UI2();
    const weather: Weather = new Weather();
    let coords: Array<string>;
    weather.getCoords()
        .then(response => {
            coords = response;
            weather.fetchWeather(coords)
                .then(result => ui.showWeather((result.weather[0].main)));
        });
});