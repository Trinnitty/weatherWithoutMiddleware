import React, { Fragment, useRef } from "react";

export default function Input(props) {
  const inputEl = useRef(null);
  const { setCity, searchWeatherForCity } = props;

  const onButtonClick = () => {
    const city = inputEl.current.value.toUpperCase();
    inputEl.current.value = "";
    setCity(city);
    searchWeatherForCity(city);
  };

  return (
    <Fragment>
      <input ref={inputEl} type="text" placeholder={"Enter city"} />
      <button onClick={onButtonClick}>
        <i className="fa fa-spinner fa-spin">find</i>
      </button>
    </Fragment>
  );
}
