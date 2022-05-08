import React from "react";

const Form = ({ getWeather, onHandlechange, inputcityname }) => (
  <form onSubmit={getWeather}>
    <input
      type="text"
      name="cityname"
      onChange={onHandlechange}
      value={inputcityname}
      placeholder="Enter City name"
      required
    />
    <button>Get Weather</button>
  </form>
);

export default Form;
