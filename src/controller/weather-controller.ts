/** Interfaces para definir los tipos complejos */
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
    async fetchWeather(): Promise<Weather> {
        //settings API call
        const appId: string = 'b0147f6411b11c4795a9f9e4bebc27a3';
        const units: string = 'metric';
        const locationName: any = await this.getLocationName();
        console.log(locationName);
        const url: string = `http://api.openweathermap.org/data/2.5/weather?appid=${appId}&units=${units}&q=copacabana`;
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
        let result: Array<string> = [];
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
                result.push(position.coords.latitude.toString());
                result.push(position.coords.longitude.toString());
                console.log(`getCoords(): lat=${result[0]} / long: ${result[1]}`);
                return result;
            });
        }
        return result;
    }
    async getLocationName(): Promise<any> {
        let locationName: any = '';
        const appId: string = 'b0147f6411b11c4795a9f9e4bebc27a3';
        const coords: Array<string> = await this.getCoords();
        console.log(`getLocationName(): lat=${coords[0]} / long: ${coords[1]}`);
        const urlReverseGeocoding: string = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&appid=${appId}`;
        let options: object = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        };
        const response: Response = await fetch(urlReverseGeocoding, options);
        console.log(response);
        locationName = await response.json();

        return locationName;
    }
}



/** Esta clase tiene métodos para gestionar la vista */
class UI {
    weather!: Weather;

    showWeather(data: Weather) {
        this.weather = data;
        const app: HTMLDivElement = document.querySelector('#app-weather')!;
        const weatherDisplay = document.createElement('p');
        weatherDisplay.textContent = data.description;
        app.appendChild(weatherDisplay);
    }
}


//DOM Events
window.addEventListener('load', (evt) => {
    const ui: UI = new UI();
    const weather: Weather = new Weather();
    weather.getLocationName();
});