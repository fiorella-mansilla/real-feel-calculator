import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  useMediaQuery,
 } from "@mui/material";
import { fetchCities } from "../services/cityService";

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
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Detect screen size for responsive dropdown height
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Fetch cities on mount
  useEffect(() => {
    const loadCities = async () => {
      setLoading(true);
      try {
        const cityList = await fetchCities();
        setCities(cityList);
        setError(null); // Clear error on successful fetch
      } catch (err) {
        setError("Network error: Failed to fetch cities.");
        console.error("Error loading cities: ", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadCities();
  }, []);

    // Retry fetching cities when dropdown opens, if there was an error
    const handleDropdownOpen = () => {
      if (error) {
        setLoading(true);
        setCities([]); // Clear the current list while retrying
        setError(null); // Clear the error message
        fetchCities()
          .then(cityList => {
            setCities(cityList);
          })
          .catch(err => {
            setError("Network error: Failed to fetch cities.");
          })
          .finally(() => setLoading(false));
      }
    };
  

  // Handle city selection 
  const handleCitySelect = (event) => {
      const cityName = event.target.value;
      const city = cities.find((c) => c.name === cityName) || null; 

      setSelectedCity(cityName);
      onCitySelect(city);
  };

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
    errorMessage: {
      color: "red",
      fontSize: "17px",
      textAlign: "center",
    }
  };

  return (
    <FormControl fullWidth variant="outlined" sx={styles.formControl}>
      <InputLabel id="city-select-label">Select a City</InputLabel>
      <Select
        labelId="city-select-label"
        value={selectedCity}
        onChange={handleCitySelect}
        label="Select a City"
        sx={styles.select}
        MenuProps={{
          PaperProps: {
            style: styles.menuPaper,
          },
        }}
        onOpen={handleDropdownOpen}  // Trigger retry when dropdown opens
      >
        {/* Option to clear selection and previous rendered data */}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {/* Render sorted cities */}
        {cities.map((city) => (
          <MenuItem key={city.name} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </Select>

      {/* Show error message when server is not running */}
      {error && (
        <div style={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {/* Show loading message instead of spinner */}
      {loading && !error && (
        <div style={styles.loadingMessage}>
          <p>Loading cities...</p>
        </div>
      )}
    </FormControl>
  );
};

// Prop Types Validation
CitySelectorDropdown.propTypes = {
  onCitySelect: PropTypes.func.isRequired, // Callback to notify parent of selection
};

export default CitySelectorDropdown;