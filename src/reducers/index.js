import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReduser";
import { weatherServiseReducer } from "./weatherServiseReducer";
import { cityReducer } from "./cityReducer";
import { loadedCityWeatherOpenweathermapReducer } from "./loadedCityWeatherOpenweathermapReducer";
import { loadedCityWeatherMetaweatherReducer } from "./loadedCityWeatherMeataweatherReducer";

export const rootReducer = combineReducers({
  city: cityReducer,
  weatherServise: weatherServiseReducer,
  weather: weatherReducer,
  loadedCityWeatherOpenweathermap: loadedCityWeatherOpenweathermapReducer,
  loadedCityWeatherMetaweather: loadedCityWeatherMetaweatherReducer
});
