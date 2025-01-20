import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { MenuItem, Select, InputLabel, FormControl, useMediaQuery } from "@mui/material";
import { cities } from "../data/cities"; 

/**
 * CitySelectorDropdown component allows users to select a city from a dropdown menu.
 * It sorts the cities alphabetically and notifies the parent component when a city is selected.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onCitySelect - Callback function to notify parent of the selected city
 * @returns {JSX.Element} The rendered CitySelectorDropdown component
 */

const CitySelectorDropdown = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState(null); 

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleCitySelect = useCallback((event) => {
    const cityName = event.target.value;
    const city = cities.find((c) => c.name === cityName); 

    setSelectedCity(city || null);
    if (onCitySelect) {
      onCitySelect(city || null); 
    }
  }, [onCitySelect]);

  // Sort cities alphabetically by name
  const sortedCities = [...cities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <FormControl fullWidth variant="outlined" sx={{ marginY: 2 }}>
      <InputLabel id="city-select-label">Select a City</InputLabel>
      <Select
        labelId="city-select-label"
        value={selectedCity?.name || ""}
        onChange={handleCitySelect}
        label="Select a City"
        sx={{
          backgroundColor: "gray.50",
          borderRadius: "8px", 
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: isSmallScreen ? "350px" : "550px", // Max height for dropdown
              overflowY: "auto",  // Scrollable if the list is too long
              borderRadius: "8px", // Rounded corners for the dropdown list
            },
          },
        }}
      >
        {/* None Option at the Top of the list */}
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