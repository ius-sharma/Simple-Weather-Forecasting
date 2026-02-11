const button = document.getElementById("btn") as HTMLButtonElement;
const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const suggestionsEl = document.getElementById("suggestions") as HTMLDivElement;

const tempEl = document.getElementById("temperature") as HTMLSpanElement;
const windEl = document.getElementById("windspeed") as HTMLSpanElement;
const weatherCodeEl = document.getElementById("weathercode") as HTMLSpanElement;
const weatherIconEl = document.getElementById("weathericon") as HTMLSpanElement;
const messageEl = document.getElementById("message") as HTMLParagraphElement;

let selectedCity: { latitude: number; longitude: number } | null = null;

/* 🔹 Auto Suggestion */
cityInput.addEventListener("input", async () => {
  const query = cityInput.value.trim();

  selectedCity = null; // reset on new typing

  if (query.length < 2) {
    suggestionsEl.innerHTML = "";
    return;
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`;

  const response = await fetch(geoUrl);
  const data = await response.json();

  suggestionsEl.innerHTML = "";

  if (!data.results) return;

  data.results.forEach((place: any) => {
    const div = document.createElement("div");
    div.textContent = `${place.name}, ${place.country}`;

    div.addEventListener("click", () => {
      cityInput.value = `${place.name}, ${place.country}`;
      selectedCity = {
        latitude: place.latitude,
        longitude: place.longitude,
      };
      suggestionsEl.innerHTML = "";
    });

    suggestionsEl.appendChild(div);
  });
});

/* 🔹 Weather Description */
function getWeatherDescription(code: number): string {
  if (code === 0) return "Nirmal Aakash";
  if (code === 1 || code === 2) return "Baadalein";
  if (code === 3) return "Meghayukt";
  if (code >= 51 && code <= 67) return "Baarish";
  if (code >= 80 && code <= 82) return "Ghana Baarish";
  if (code === 95) return "Aandhee Toofan";
  return "Agyaat";
}

/* 🔹 Weather Icon */
function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤";
  if (code === 3) return "☁️";
  if (code >= 51 && code <= 67) return "🌧";
  if (code >= 80 && code <= 82) return "🌦";
  if (code === 95) return "⛈";
  return "🌍";
}

/* 🔹 Main Weather Fetch */
async function getWeather() {

  if (!selectedCity) {
    messageEl.textContent = "Kripya list se shahar chune.";
    return;
  }

  try {
    messageEl.textContent = "Purvanuman kiya ja raha hai...";

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current_weather=true`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const weather = weatherData.current_weather;

    tempEl.textContent = `${weather.temperature} °C`;
    windEl.textContent = `${weather.windspeed} km/h`;
    weatherCodeEl.textContent = getWeatherDescription(weather.weathercode);
    weatherIconEl.textContent = getWeatherIcon(weather.weathercode);

    messageEl.textContent = "";

  } catch {
    messageEl.textContent = "Kuch galat ho gaya. Dobara prayas karein.";
  }
}

button.addEventListener("click", getWeather);
