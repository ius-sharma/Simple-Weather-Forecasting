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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
var button = document.getElementById("btn");
var cityInput = document.getElementById("cityInput");
var suggestionsEl = document.getElementById("suggestions");
var tempEl = document.getElementById("temperature");
var windEl = document.getElementById("windspeed");
var weatherCodeEl = document.getElementById("weathercode");
var weatherIconEl = document.getElementById("weathericon");
var messageEl = document.getElementById("message");
var selectedCity = null;
/* 🔹 Auto Suggestion */
cityInput.addEventListener("input", function () { return __awaiter(_this, void 0, void 0, function () {
    var query, geoUrl, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = cityInput.value.trim();
                selectedCity = null; // reset on new typing
                if (query.length < 2) {
                    suggestionsEl.innerHTML = "";
                    return [2 /*return*/];
                }
                geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=".concat(query, "&count=5");
                return [4 /*yield*/, fetch(geoUrl)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                suggestionsEl.innerHTML = "";
                if (!data.results)
                    return [2 /*return*/];
                data.results.forEach(function (place) {
                    var div = document.createElement("div");
                    div.textContent = "".concat(place.name, ", ").concat(place.country);
                    div.addEventListener("click", function () {
                        cityInput.value = "".concat(place.name, ", ").concat(place.country);
                        selectedCity = {
                            latitude: place.latitude,
                            longitude: place.longitude,
                        };
                        suggestionsEl.innerHTML = "";
                    });
                    suggestionsEl.appendChild(div);
                });
                return [2 /*return*/];
        }
    });
}); });
/* 🔹 Weather Description */
function getWeatherDescription(code) {
    if (code === 0)
        return "Nirmal Aakash";
    if (code === 1 || code === 2)
        return "Baadalein";
    if (code === 3)
        return "Meghayukt";
    if (code >= 51 && code <= 67)
        return "Baarish";
    if (code >= 80 && code <= 82)
        return "Ghana Baarish";
    if (code === 95)
        return "Aandhee Toofan";
    return "Agyaat";
}
/* 🔹 Weather Icon */
function getWeatherIcon(code) {
    if (code === 0)
        return "☀️";
    if (code === 1 || code === 2)
        return "🌤";
    if (code === 3)
        return "☁️";
    if (code >= 51 && code <= 67)
        return "🌧";
    if (code >= 80 && code <= 82)
        return "🌦";
    if (code === 95)
        return "⛈";
    return "🌍";
}
/* 🔹 Main Weather Fetch */
function getWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var weatherUrl, weatherResponse, weatherData, weather, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!selectedCity) {
                        messageEl.textContent = "Kripya list se shahar chune.";
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    messageEl.textContent = "Purvanuman kiya ja raha hai...";
                    weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=".concat(selectedCity.latitude, "&longitude=").concat(selectedCity.longitude, "&current_weather=true");
                    return [4 /*yield*/, fetch(weatherUrl)];
                case 2:
                    weatherResponse = _b.sent();
                    return [4 /*yield*/, weatherResponse.json()];
                case 3:
                    weatherData = _b.sent();
                    weather = weatherData.current_weather;
                    tempEl.textContent = "".concat(weather.temperature, " \u00B0C");
                    windEl.textContent = "".concat(weather.windspeed, " km/h");
                    weatherCodeEl.textContent = getWeatherDescription(weather.weathercode);
                    weatherIconEl.textContent = getWeatherIcon(weather.weathercode);
                    messageEl.textContent = "";
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    messageEl.textContent = "Kuch galat ho gaya. Dobara prayas karein.";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
button.addEventListener("click", getWeather);
