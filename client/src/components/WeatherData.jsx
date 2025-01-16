import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, Divider,ListItemIcon, ListItemText } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

/**
 * WeatherData component displays weather information including temperature, 
 * relative humidity, cloud cover, and sunshine using Material-UI components.
 *
 * @component
 * @example
 * const weatherData = {
 *   temperature: 25,
 *   relativeHumidity: 60,
 *   cloudCover: 20,
 *   sunshine: 80
 * };
 * return <WeatherData weatherData={weatherData} />;
 *
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Weather data object received from the API
 * @param {number} props.weatherData.temperature - Temperature in degrees Celsius
 * @param {number} props.weatherData.relativeHumidity - Relative humidity percentage
 * @param {number} props.weatherData.cloudCover - Cloud cover percentage
 * @param {number} props.weatherData.sunshine - Sunshine percentage
 */

const WeatherData = ({ weatherData }) => {
  const { temperature, relativeHumidity, cloudCover, sunshine } = weatherData;

  return (
    <div className="weather-data bg-white p-4 rounded shadow">
      <List>
        {/* Temperature */}
        <ListItem>
          <ListItemIcon>
            <ThermostatIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Temperature" secondary={`${temperature}°C`} />
        </ListItem>
        <Divider />

        {/* Relative Humidity */}
        <ListItem>
          <ListItemIcon>
            <WaterDropIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Relative Humidity" secondary={`${relativeHumidity}%`} />
        </ListItem>
        <Divider />

        {/* Cloud Cover */}
        <ListItem>
          <ListItemIcon>
            <CloudIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Cloud Cover" secondary={`${cloudCover}%`} />
        </ListItem>
        <Divider />

        {/* Sunshine */}
        <ListItem>
          <ListItemIcon>
            <WbSunnyIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Sunshine" secondary={`${sunshine}%`} />
        </ListItem>
      </List>
    </div>
  );
};

WeatherData.propTypes = {
  weatherData: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    relativeHumidity: PropTypes.number.isRequired,
    cloudCover: PropTypes.number.isRequired,
    sunshine: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherData;