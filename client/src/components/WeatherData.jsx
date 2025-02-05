import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, Divider,ListItemIcon, ListItemText } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

/**
 * WeatherData displays weather information from the selected city such as temperature, 
 * relative humidity, cloud cover, and solar irradiation retrieved by the external API "Bright Sky".
 *
 * @component
 * @example
 * const weatherData = {
 *   temperature: 25,
 *   relativeHumidity: 60,
 *   cloudCover: 20,
 *   solarIrradiation: 0.207
 * };
 * return <WeatherData weatherData={weatherData} />;
 *
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Weather data object received from the API
 * @param {number} props.weatherData.temperature - Temperature in degrees Celsius
 * @param {number} props.weatherData.relativeHumidity - Relative humidity percentage
 * @param {number} props.weatherData.cloudCover - Cloud cover percentage
 * @param {number} props.weatherData.solarIrradiation - Solar irradiation in Wh/m²
 */

const WeatherData = ({ weatherData }) => {
  const { temperature, relativeHumidity, cloudCover, solarIrradiation } = weatherData;

  // Reusable styles for the container
  const styles = {
    container: {
      backgroundColor: "white",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
  };
  
  return (
    <div style={styles.container}>
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

        {/* Solar Irradiation */}
        <ListItem>
          <ListItemIcon>
            <WbSunnyIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Solar Irradiation" secondary={`${solarIrradiation} Wh/m²`} />
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
    solarIrradiation: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherData;