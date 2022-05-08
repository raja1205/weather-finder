import React, { Component } from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

class App extends Component {
  // New state method introduced in React 16
  // Good practice: Initial State is undefined because we do not know the API Data type (i.e number, string, boolean,etc) from the server data

  state = {
    areaname: undefined,
    countryname: undefined,
    date: undefined,
    longitude: undefined,
    lattitude: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    wind: undefined,
    error: undefined,
    inputcityname: "",
  };

// Gets city name
  onHandlechange = (e) => {
    this.setState({
      inputcityname: e.target.value,
    });
  };

  //Date customization
      mydateConv = (rawDate) => {
        const date = new Date(rawDate * 1000);
        const Weeks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const day = Weeks[date.getDay()];
        const dateNo = date.getDate();
        const Months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const month = Months[date.getMonth()];
        const year = date.getFullYear();
        const formattedDate = `${day} ${dateNo} ${month} ${year}`;
        return formattedDate;
      };
  
      //Temperature conversion
      tempConv = (rawTemp) => {
        const baseTemp = 273.15;
        const currentTemp = Math.round(rawTemp - baseTemp);
        const tempDeg = currentTemp + "°c";
        return tempDeg;
      }
  
  //async -- promised based response
  getWeather = async (e) => {
    e.preventDefault(); // to prevent browser's default behavior

    const api_key = "03d21204830a4280f098f00a5bf3de2d";
//    const cityname = e.target.cityname.value;

    //fetching data from the server using API call, await used to wait until data fetched from the server
    try {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputcityname}&APPID=${api_key}`,
        { method: "GET" }
      );

      if (api_call.status !== 200) {
        this.setState({
          areaname: undefined,
          countryname: undefined,
          date: undefined,
          longitude: undefined,
          lattitude: undefined,
          temperature: undefined,
          humidity: undefined,
          description: undefined,
          wind: undefined,
          error: "No Data Available with this City name, please try again.",
          inputcityname: "",
        });
      } else {
        const data = await api_call.json();
        console.log("Data fetched Successfully");

        const currentTempDeg = this.tempConv(data.main.temp);//temparature converted
        const customDate = this.mydateConv(data.dt);//custom date converted

        this.setState({
          areaname: data.name,
          countryname: data.sys.country,
          date: customDate,
          longitude: data.coord.lon,
          lattitude: data.coord.lat,
          temperature: currentTempDeg,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          wind: data.wind.speed,
          error: "",
          inputcityname: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { areaname, countryname, date, longitude, lattitude, temperature, humidity, description, wind, error } = this.state;
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container shadow ">
              <div className="row">
                <div className="col-sm-5 title-container">
                  <Titles />
                </div>
                <div className="col-sm-7 form-container">
                <Form
                    getWeather={this.getWeather}
                    onHandlechange={this.onHandlechange}
                    inputcityname={this.state.inputcityname}
                  />
                  <Weather
                    areaname={areaname}
                    countryname={countryname}
                    date={date}
                    longitude={longitude}
                    lattitude={lattitude}
                    temperature={temperature}
                    humidity={humidity}
                    description={description}
                    wind={wind}
                    error={error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// To find Weather information based on City name
/* const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?q=Madurai&APPID=03d21204830a4280f098f00a5bf3de2d'; */

/*//API Response sample:

/*
{"coord":{"lon":139.6917,"lat":35.6895},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":288.52,"feels_like":288.25,"temp_min":286.37,"temp_max":290.72,"pressure":1014,"humidity":82},"visibility":8000,"wind":{"speed":5.14,"deg":340},"rain":{"1h":1.47},"clouds":{"all":75},"dt":1650265164,"sys":{"type":2,"id":2038398,"country":"JP","sunrise":1650225909,"sunset":1650273348},"timezone":32400,"id":1850144,"name":"Tokyo","cod":200}

*/