export function weatherAction(weather) {
  return {
    type: "SET_WEATHER",
    payload: {
      lastUpdate: weather.lastUpdate,
      temprature: weather.temprature,
      humidity: weather.humidity,
      visibility: weather.visibility,
      pressure: weather.pressure,
      description: weather.description,
      wind: weather.wind
    }
  };
}
