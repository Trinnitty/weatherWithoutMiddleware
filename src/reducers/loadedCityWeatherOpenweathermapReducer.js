const initialState = [];

export function loadedCityWeatherOpenweathermapReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case "SET_CITYOPENWEATHERMAPWEATHER":
      return state.concat(action.payload);
    default:
      return state;
  }
}
// { ...state, ...action.payload }
