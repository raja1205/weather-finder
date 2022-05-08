import React from "react";

const Weather = ({ date, areaname, countryname, longitude, lattitude, temperature, humidity, description, wind, error}) => (
  <div className="weather__info">
    {date && (
      <p className="weather__key">
        Date : <span className="weather__value">{date}</span>
      </p>
    )}

    {areaname && countryname && (
      <p className="weather__key">
        City / Country :{" "}
        <span className="weather__value">
          {areaname} / {countryname}
        </span>
      </p>
    )}

{longitude && lattitude && (
      <p className="weather__key">
        Coords. (Lon / Lat) :{" "}
        <span className="weather__value">
          {longitude} / {lattitude}
        </span>
      </p>
    )}

    {temperature && (
      <p className="weather__key">
        Temperature :{" "}
        <span className="weather__value">{temperature}</span>
      </p>
    )}

    {humidity && (
      <p className="weather__key">
        Humidity : <span className="weather__value">{humidity}</span>
      </p>
    )}

    {description && (
      <p className="weather__key">
        Description :{" "}
        <span className="weather__value">{description}</span>
      </p>
    )}

    {wind && (
      <p className="weather__key">
        Wind : <span className="weather__value">{wind}</span>
      </p>
    )}

    {error && <p className="weather__error">Error : {error}</p>}
  </div>
);

export default Weather;
