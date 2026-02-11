const button = document.getElementById("btn") as HTMLButtonElement;
const cityInput = document.getElementById("citySelect") as HTMLInputElement;

const tempEl = document.getElementById("temperature") as HTMLSpanElement;
const windEl = document.getElementById("windspeed") as HTMLSpanElement;
const weatherCodeEl = document.getElementById("weathercode") as HTMLSpanElement;
const weatherIconEl = document.getElementById("weathericon") as HTMLSpanElement;
const messageEl = document.getElementById("message") as HTMLParagraphElement;


function getWeatherDescription(code: number): string {
  if (code === 0) return "Nirmal Aakash";
  if (code === 1 || code === 2) return "Baadalein";
  if (code === 3) return "Meghayukt";
  if (code >= 51 && code <= 67) return "Baarish";
  if (code >= 80 && code <= 82) return "Ghana Baarish";
  if (code === 95) return "Aandhee Toofan";
  return "Agyaat";
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤";
  if (code === 3) return "☁️";
  if (code >= 51 && code <= 67) return "🌧";
  if (code >= 80 && code <= 82) return "🌦";
  if (code === 95) return "⛈";
  return "🌍";
}

async function getCoordinates(city: string) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  const response = await fetch(geoUrl);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Shahar nahi mili...");
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
  };
}

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    messageEl.textContent = "Kripya Shahar ka naam likhe...";
    return;
  }

  try {
    messageEl.textContent = "Sthan Prapt Kiyaa jaa raha hai....";

    const coords = await getCoordinates(city);

    messageEl.textContent = "Purvanuman Kiya Jaa raha hai....";

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const weather = weatherData.current_weather;

    tempEl.textContent = `${weather.temperature} °C`;
    windEl.textContent = `${weather.windspeed} km/h`;
    weatherCodeEl.textContent = getWeatherDescription(weather.weathercode);
    weatherIconEl.textContent = getWeatherIcon(weather.weathercode);

    messageEl.textContent = "";

  } catch (error) {
    messageEl.textContent = "Shahar ke upyukt Data prapt nahi hui....";
  }
}

button.addEventListener("click", getWeather);
