import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import CitySelectorDropdown from "../components/CitySelectorDropdown";
import WeatherData from "../components/WeatherData";

// Fetch real feel temperature data from the server
const fetchRealFeel = async ({ queryKey }) => {
  const [, cityName, lat, lon] = queryKey;
  if (!cityName || !lat || !lon) return null;

  const response = await axios.get("http://localhost:3000/api/realfeel", {
    params: { lat, lon },
  });

  return response.data;
};

// HomePage component
const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const { data, isLoading, isError, error } = useQuery(
    ["realFeel", selectedCity?.name, selectedCity?.lat, selectedCity?.lon],
    fetchRealFeel,
    {
      enabled: !!selectedCity, // Fetch data only when a city is selected
      refetchOnWindowFocus: false, // Prevent refetching on window focus
      onSuccess: (fetchedData) => {
        setWeatherData(fetchedData); 
      },
    }
  );

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    if (!city) {
      setWeatherData(null); // Clear weather data when "None" is selected
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-4xl font-sans font-medium text-center mt-4 mb-8">
        RealFeel Temperature Calculator
      </h1>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 w-full max-w-screen-xl bg-white rounded-lg shadow-md p-8">
        {/* Left Column: City Selector */}
        <div className="flex flex-col flex-1 justify-start items-start md:pr-6 md:border-r md:border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Select a city to view its real feel temperature and weather details.
          </p>
          <CitySelectorDropdown
            onCitySelect={handleCitySelect}
            className="shadow-md"
          />
        </div>

        {/* Right Column: Weather Data */}
        <div className="flex flex-col flex-1 justify-start items-start md:pl-4 mt-8 md:mt-0">
          {isLoading && <p>Loading weather data...</p>}
          {isError && (
            <p className="text-red-500">
              {error?.message || "Error fetching weather data. Please try again."}
            </p>
          )}
          {weatherData && weatherData.realFeel !== undefined && selectedCity && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Real Feel in {selectedCity.name}: {weatherData.realFeel.toFixed(1)}°C
              </h2>
              <WeatherData weatherData={weatherData.weatherData} />
            </div>
          )}
          {!selectedCity && (
            <p className="text-lg text-gray-500">No city selected. Please choose a city to display the results.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;