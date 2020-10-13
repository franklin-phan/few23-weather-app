import React, { Component, useState } from 'react';
import Temperature from './Temperature';
import WeatherDescription from './WeatherDescription';
import Atmosphere from './Atmosphere';
import "./App.css";
const unitsMetric = "metric"
const unitsImperial = "imperial"

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
          inputValue: "99508", // Used to hold value entered in the input field //was 94010
          weatherData: null, // Used to hold data loaded from the weather API
          unit: unitsImperial,
          loadingState: "Enter your zip code"
        };
      }

    
      async handleSubmit(e) {
        e.preventDefault();
        const { unit, inputValue } = this.state
        // ! Get your own API key !
        const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        // Get the zip from the input
        const zip = inputValue;
        // Form an API request URL with the apikey and zip
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}&units=${unit}`;
        // console.log(url)
        // Get data from the API with fetch
        try {
          const res = await fetch(url)
          const json = await res.json()
          // If the request was successful assign the data to component state
          const loadingState = json.cod == "200" ? "Success!" : "Failed!"
          this.setState({ weatherData: json, loadingState });
          console.log(json)
        } catch (err) {
          // If there is no data
          this.setState({ weatherData: null }); // Clear the weather data we don't have any to display
          // Print an error to the console.
          console.log("-- Error fetching --");
          console.log(err.message);
          // You may want to display an error to the screen here.
        }
      }
    
      renderWeather() {
        console.log(this.state.weatherData)
        try {
          if (this.state.weatherData["cod"] === "404") {
            // this.setState({loadingState: "Failed! Invalid Zip Code"})
          } else {
            // Take the weather data apart to more easily populate the component
            const { main, description, icon } = this.state.weatherData.weather[0];
            let {
              temp,
              pressure,
              humidity,
              temp_min,
              temp_max,
            } = this.state.weatherData.main;
            return (
              <div className="App">
              
                <WeatherDescription main={main} description={description} icon={icon}/>
                <Temperature temp={temp} temp_min={temp_min} temp_max={temp_max} unit={this.state.unit} />
                <Atmosphere pressure={pressure} humidity={humidity} isMetric={true}/>
              </div>
            );
          }
        } catch (error) {
          
        }
        
        // This method returns undefined or a JSX component
        if (this.state.weatherData === null) {
          // If there is no data return undefined
          return undefined;
        }
        /* 
        This next step needs another level of error checking. It's 
        possible to get a JSON response for an invalid zip in which 
        case the step below fails. 
        */
        // console.log(this.state.weatherData);
        
      }
    
      render() {

        return (
          <div className="App">
            <h1>OpenWeatherMap API</h1>

            {this.state.loadingState}
            {/** This input uses the controlled component pattern */}
            <form onSubmit={(e) => {
              this.handleSubmit(e);
              this.setState({ loadingState: "Loading..." })
              }}>
              {/** 
              This pattern is used for input and other form elements 
              Set the value of the input to a value held in component state
              Set the value held in component state when a change occurs at the input 
              */}
              <input
                value={this.state.inputValue}
                onChange={(e) => this.setState({ inputValue: e.target.value })}
                type="text"
                pattern="(\d{5}([\-]\d{4})?)"
                placeholder="enter zip"
              />
              <button type="submit">Submit</button>
              <div>
                <label for="Fahrenheit">

                <input type="radio" id="Fahrenheit" name="units" value={unitsImperial} checked={this.state.unit === unitsImperial ? true : false}  
                  onChange={(e) => {
                    this.setState({ unit: e.target.value }, () => {
                      this.handleSubmit(e)
                    })
                  }}
                />
                Fahrenheit</label> <br/> 
                <label for="Celsius">

                <input type="radio" id="Celsius" name="units" value={unitsMetric} checked={this.state.unit === unitsMetric ? true : false} 
                  onChange={(e) => {
                    this.setState({ unit: e.target.value }, () => {
                      this.handleSubmit(e)
                    })
                  }}             
                />
                Celsius</label> <br/>
              </div>
            </form>
    
            {/** Conditionally render this component */}
            {this.renderWeather()}
          </div>
        );
      }
    }

export default Weather;
export { unitsImperial, unitsMetric };