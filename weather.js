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
var button = document.getElementById("btn");
var cityInput = document.getElementById("citySelect");
var tempEl = document.getElementById("temperature");
var windEl = document.getElementById("windspeed");
var weatherCodeEl = document.getElementById("weathercode");
var weatherIconEl = document.getElementById("weathericon");
var messageEl = document.getElementById("message");
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
function getCoordinates(city) {
    return __awaiter(this, void 0, void 0, function () {
        var geoUrl, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=".concat(city);
                    return [4 /*yield*/, fetch(geoUrl)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.results || data.results.length === 0) {
                        throw new Error("Shahar nahi mili...");
                    }
                    return [2 /*return*/, {
                            latitude: data.results[0].latitude,
                            longitude: data.results[0].longitude,
                        }];
            }
        });
    });
}
function getWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var city, coords, weatherUrl, weatherResponse, weatherData, weather, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    city = cityInput.value.trim();
                    if (!city) {
                        messageEl.textContent = "Kripya Shahar ka naam likhe...";
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    messageEl.textContent = "Sthan Prapt Kiyaa jaa raha hai....";
                    return [4 /*yield*/, getCoordinates(city)];
                case 2:
                    coords = _a.sent();
                    messageEl.textContent = "Purvanuman Kiya Jaa raha hai....";
                    weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=".concat(coords.latitude, "&longitude=").concat(coords.longitude, "&current_weather=true");
                    return [4 /*yield*/, fetch(weatherUrl)];
                case 3:
                    weatherResponse = _a.sent();
                    return [4 /*yield*/, weatherResponse.json()];
                case 4:
                    weatherData = _a.sent();
                    weather = weatherData.current_weather;
                    tempEl.textContent = "".concat(weather.temperature, " \u00B0C");
                    windEl.textContent = "".concat(weather.windspeed, " km/h");
                    weatherCodeEl.textContent = getWeatherDescription(weather.weathercode);
                    weatherIconEl.textContent = getWeatherIcon(weather.weathercode);
                    messageEl.textContent = "";
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    messageEl.textContent = "Shahar ke upyukt Data prapt nahi hui....";
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
button.addEventListener("click", getWeather);
