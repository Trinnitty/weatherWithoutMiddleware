export function setCity(city) {
  return {
    type: "SET_CITY",
    payload: {
      city: city
    }
  };
}
