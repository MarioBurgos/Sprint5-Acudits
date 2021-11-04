class WeatherComponent{
    weather!: WeatherComponent;

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
     console.log("weatherComponent is working");
 }

}
export {WeatherComponent};