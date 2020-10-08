import React, {
  Component,
  // useState
} from "react";
import axios from "axios";
import ReactLoading from "react-loading";

class Weathers extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      data: [],
      city: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.getWeatherData(this.state.city);
  }

  handleChange(e) {
    this.setState({
      city: e.target.value,
    });
  }

  async getWeatherData(_searchTerm) {
    const api_key = process.env.REACT_APP_WEATHER_KEY;
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      _searchTerm +
      "&appid=" +
      api_key;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ isLoading: false, data: data });
    console.log(data);
  }

  render() {
    for (let dataResults in this.state.data) {
      return (
        <div style={results.main}>
          <h3 style={results.heading}>Current Weather by City</h3>
          <section style={results.information}>
            <div style={results.city}>City: {this.state.data.name}</div>
            <div style={results.coordinates}>
              <strong style={results.subhead}>Coordinates:</strong>
              <span style={results.subhead}>Latitude:</span>{" "}
              {this.state.data.coord.lat}
              <span style={results.subhead}>Longitude:</span>
              {this.state.data.coord.lon}
            </div>
            <div style={results.temperature}>
              <strong style={results.subhead}>Temperature:</strong>

              <span style={results.subhead}>Maximum temperature:</span>
              {Math.floor(this.state.data.main.temp_max - 273.15)}
              <span style={results.subhead}>Minimum temperature:</span>
              {Math.floor(this.state.data.main.temp_min - 273.15)}
            </div>
            <div>
              <strong style={results.subhead}>Other:</strong>
              <span style={results.subhead}>Humidity:</span>
              {this.state.data.main.humidity}
              <span style={results.subhead}>Pressure:</span>
              {this.state.data.main.pressure}
              <span style={results.subhead}>Wind - speed (m/h):</span>
              {this.state.data.wind.speed}
              <span style={results.subhead}>Wind - gust:</span>
              {this.state.data.wind.gust}
            </div>
          </section>
          <div>
            {this.state.isLoading ? (
              <ReactLoading type="spin" color="#444" />
            ) : (
              <div>
                <section>
                  <form className="form" onSubmit={this.handleSubmit}>
                    <input
                      style={main.input}
                      type="text"
                      className="input addInput"
                      placeholder="Enter city name here"
                      onChange={this.handleChange}
                    />
                    <button style={main.button} className="button is-info ">
                      New Search
                    </button>
                  </form>
                </section>
              </div>
            )}
          </div>
        </div>
      );
      console.log(dataResults);
    }
    return (
      <div style={main.layout}>
        <h3 style={main.heading}>City Weather Finder</h3>
        <div>
          {this.state.isLoading ? (
            <ReactLoading type="spin" color="#444" />
          ) : (
            <div>
              <section>
                <form className="form" onSubmit={this.handleSubmit}>
                  <input
                    style={main.input}
                    type="text"
                    className="input addInput"
                    placeholder="City name (e.g London)"
                    onChange={this.handleChange}
                  />
                  <button style={main.button} className="button is-info ">
                    Search
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Weathers;

const main = {
  layout: {
    overflow: "hidden",
    backgroundColor: "rgba(45, 51, 61, 0.5)",
    padding: "3em",
    width: "50%",
    margin: "auto",
    marginTop: "15em",
    borderRadius: "15px",
  },
  heading: {
    color: "rgb(204, 212, 226)",
    fontSize: "3em",
    paddingBottom: "0.5em",
  },
  input: {
    width: "20em",
    margin: "0 10px",
    borderRadius: "5px",
  },
  button: {
    color: "rgb(45, 51, 61)",
    border: "none",
    padding: "2px",
    width: "10em",
    outline: "none;",
    borderRadius: "5px",
    marginBottom: "2em",
  },
};

const results = {
  main: {
    width: "70%",
    margin: "10em auto 2em",
    backgroundColor: "rgba(45, 51, 61, 0.5)",
    padding: "2em",
    borderRadius: "15px",
  },
  heading: {
    color: "rgb(204, 212, 226)",
    fontSize: "3em",
    paddingBottom: "0.5em",
  },
  information: {
    margin: "2em auto 5em",
    paddingBottom: "2em",
    backgroundColor: "rgba(146, 158, 178, 0.5)",
    width: "70%",
    borderRadius: "15px",
  },
  city: { fontSize: "1.8em", padding: "0.5em" },
  subhead: { textDecoration: "underline", padding: "0 1em" },
};
