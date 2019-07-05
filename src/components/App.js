import React, { PureComponent } from "react";
import weatherServices from "../services/weatherServices";
import LocationService from "../services/LocationService";
import weatherServiceMetaweather from "../services/weatherServiceMetaweather";
import SearchWeather from "./SearchWeather";
import DescriptionWeather from "./DescriptionWeather";
import Input from "./Input";
import Details from "./Details";
import WeatherServise from "./WeatherServise";
import { connect } from "react-redux";
import { setCity } from "../actions/cityAction";
import { absentWeather } from "../actions/setAbsentWeather";
import { weatherAction } from "../actions/weatherAction";
import { loadedCityWeatherOpenweathermapAction } from "../actions/loadedCityWeatherOpenweathermapAction";
import { loadedCityWeatherMetaweatherAction } from "../actions/loadedCityWeatherMetaweatherAction";
import { setWeatherServise } from "../actions/weatherServiseAction";
import PropTypes from "prop-types";

class App extends PureComponent {
  state = {
    loadWeather: true
  };
  componentDidMount = () => {
    const { setCityAction } = this.props;
    const { city } = this.props.city;
    console.log(city, "city1");
    // if first enter on the app
    if (!city) {
      //avoid  block of fetch data
      setTimeout(
        LocationService.getIp()
          .then(response => response.json())
          .then(jsonData => {
            return jsonData.ip;
          })
          .then(data => LocationService.getCity(data))
          .then(responce => responce.json())
          .then(jsonData => {
            setCityAction(jsonData.city_name.toUpperCase());
            this.searchWeatherForCity(jsonData.city_name.toUpperCase());
          })
          .catch(error => {
            absentWeather();
            this.setState({ loadWeather: false });
            console.log(error.message, "error LocationService");
          }),
        3500
      );
    }
  };

  searchWeatherForCity = city => {
    const { weatherServise } = this.props.weatherServise;
    const {
      setWeatherAction,
      loadedCityWeatherOpenweathermap,
      loadedCityWeatherMetaweather
    } = this.props;
    if (!this.state.loadWeather) {
      this.setState({ loadWeather: true });
    }
    if (weatherServise === "Openweathermap") {
      let cityWeather;
      if (loadedCityWeatherOpenweathermap.length) {
        cityWeather = loadedCityWeatherOpenweathermap.filter(item => {
          if (
            item.city === city &&
            new Date().getHours() - cityWeather[0].lastUpdate < 2
          ) {
            return true;
          } else return false;
        });
        if (cityWeather.length) {
          setWeatherAction(...cityWeather);
        } else {
          this.searchWeatherByOpenweathermap(city);
        }
      } else {
        this.searchWeatherByOpenweathermap(city);
      }
    }
    if (weatherServise === "MetaWeather") {
      let cityWeather;
      if (loadedCityWeatherMetaweather.length) {
        cityWeather = loadedCityWeatherMetaweather.filter(item => {
          if (
            item.city === city &&
            new Date().getHours() - cityWeather[0].lastUpdate < 2
          ) {
            return true;
          } else return false;
        });
        if (cityWeather.length) {
          console.log(cityWeather, "cityWeather");
          setWeatherAction(...cityWeather);
        } else {
          this.searchWeatherByMetaWeather(city);
        }
      } else {
        this.searchWeatherByMetaWeather(city);
      }
    }
  };

  searchWeatherByOpenweathermap = city => {
    const {
      setWeatherAction,
      loadedCityWeatherOpenweathermapAction
    } = this.props;
    weatherServices
      .getWeather(city)
      .then(response => response.json())
      .then(jsonData => {
        let responce = {
          lastUpdate: new Date().getHours(),
          temprature: jsonData.main.temp,
          humidity: jsonData.main.humidity,
          visibility: jsonData.visibility,
          pressure: jsonData.main.pressure,
          description: jsonData.weather[0].main,
          wind: jsonData.wind.speed
        };
        return responce;
      })
      .then(data => {
        console.log(data, "data");
        loadedCityWeatherOpenweathermapAction(city, data);
        setWeatherAction(data);
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ loadWeather: false });
        // absentWeather();
      });
  };

  searchWeatherByMetaWeather = city => {
    console.log(city, "city");
    const { setWeatherAction, loadedCityWeatherMetaweatherAction } = this.props;
    weatherServiceMetaweather
      .getWeather(city)
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData, "jsonData");
        let data = jsonData.data[0];
        let responce = {
          lastUpdate: new Date().getHours(),
          temprature: data.temp,
          humidity: data.rh,
          visibility: data.vis * 1000,
          pressure: data.pres.toFixed(1),
          description: data.weather.description,
          wind: data.wind_spd.toFixed(0)
        };
        return responce;
      })
      .then(data => {
        console.log(data, "data");
        setWeatherAction(data);
        loadedCityWeatherMetaweatherAction(city, data);
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ loadWeather: false });
        absentWeather();
      });
  };

  render() {
    const { setCityAction, setWeatherServiseAction, weather } = this.props;
    const { city } = this.props.city;
    const { weatherServise } = this.props.weatherServise;

    return (
      <div
        className={
          new Date().getHours() < 7 || new Date().getHours() > 20
            ? "App night"
            : "App"
        }
      >
        <div className="searchBlock">
          <WeatherServise weatherServise={weatherServise} />
          <Input
            setCity={setCityAction}
            searchWeatherForCity={this.searchWeatherForCity}
          />
          <SearchWeather setWeatherServise={setWeatherServiseAction} />
        </div>
        {this.state.loadWeather ? (
          <div>
            <DescriptionWeather city={city} weather={weather} />
            <Details weather={weather} />
          </div>
        ) : (
          <div className="errorBlock">
            Choose correct entered data or reload page and repeat responce
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  city: PropTypes.object.isRequired,
  weatherServise: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  console.log(store, "store");
  return {
    city: store.city,
    weatherServise: store.weatherServise,
    weather: store.weather,
    loadedCityWeatherOpenweathermap: store.loadedCityWeatherOpenweathermap,
    loadedCityWeatherMetaweather: store.loadedCityWeatherMetaweather
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCityAction: city => dispatch(setCity(city)),
    setWeatherServiseAction: servise => dispatch(setWeatherServise(servise)),
    setWeatherAction: weather => dispatch(weatherAction(weather)),
    loadedCityWeatherOpenweathermapAction: (city, weather) =>
      dispatch(loadedCityWeatherOpenweathermapAction(city, weather)),
    loadedCityWeatherMetaweatherAction: (city, weather) =>
      dispatch(loadedCityWeatherMetaweatherAction(city, weather))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
