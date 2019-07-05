const initialState = {
  lastUpdate: "",
  temprature: "",
  humidity: "",
  visibility: "",
  pressure: "",
  description: "",
  wind: ""
};

export function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_WEATHER":
      return { ...state, ...action.payload };
    case "SET_ABSENTWEATHER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
