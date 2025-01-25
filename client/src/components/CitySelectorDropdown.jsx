import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  useMediaQuery } from "@mui/material";
import { cities } from "../data/cities"; 

/**
 * CitySelectorDropdown allows users to select a city from which they want to get the real feel temperature
 * and weather information. It sorts the cities alphabetically and notifies the parent component when a city is selected.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onCitySelect - Callback function to notify parent of the selected city
 * @returns {JSX.Element} The rendered CitySelectorDropdown component
 */

const CitySelectorDropdown = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState(null); 

  // Detect screen size for responsive dropdown height
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Handle city selection 
  const handleCitySelect = useCallback(
    (event) => {
      const cityName = event.target.value;
      const city = cities.find((c) => c.name === cityName) || null; 

      setSelectedCity(city);
      onCitySelect(city);
  }, 
  [onCitySelect]);

  // Memoized alphabetical sorting of cities to optimize performance
  const sortedCities = useMemo(
    () => [...cities].sort((a, b) => a.name.localeCompare(b.name)),
    [cities]
  );

  // Styles for dropdown and menu
  const styles = {
    formControl: { marginY: 2 },
    select: {
      backgroundColor: "gray.50",
      borderRadius: "8px",
    },
    menuPaper: {
      maxHeight: isSmallScreen ? "350px" : "550px",
      overflowY: "auto",
      borderRadius: "8px",
    },
  };

  return (
    <FormControl fullWidth variant="outlined" sx={styles.formControl}>
      <InputLabel id="city-select-label">Select a City</InputLabel>
      <Select
        labelId="city-select-label"
        value={selectedCity?.name || ""}
        onChange={handleCitySelect}
        label="Select a City"
        sx={styles.select}
        MenuProps={{
          PaperProps: {
            style: styles.menuPaper,
          },
        }}
      >
        {/* Option to clear selection and previous rendered data */}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {/* Render sorted cities */}
        {sortedCities.map((city) => (
          <MenuItem key={city.name} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// Prop Types Validation
CitySelectorDropdown.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    })
  ).isRequired, // Ensure cities is a non-empty array of objects
  onCitySelect: PropTypes.func.isRequired, // Callback to notify parent of selection
};

export default CitySelectorDropdown;