const initialState = {
  city: ""
};

export function cityReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
