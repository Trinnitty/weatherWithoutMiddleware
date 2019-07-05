export function setAbsentWeather() {
  return {
    type: "SET_ABSENTWEATHER",
    payload: {
      lastUpdate: "",
      temprature: "",
      humidity: "",
      visibility: "",
      pressure: "",
      description: "",
      wind: ""
    }
  };
}
