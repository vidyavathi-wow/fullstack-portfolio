
const apiKey = "5672b657a0c54e2a75c56c8da4e11b72"; 


async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`City not found: ${city}`);
    const data = await response.json();

    console.log(`Weather for ${data.name}:`);
    console.log(`Temperature: ${data.main.temp} °C`);
    console.log(`Feels like: ${data.main.feels_like} °C`);
    console.log(`Weather: ${data.weather[0].main} (${data.weather[0].description})`);
    console.log(`Humidity: ${data.main.humidity}%`);
    console.log(`Wind Speed: ${data.wind.speed} m/s`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}


getWeather("Bangalore"); 
