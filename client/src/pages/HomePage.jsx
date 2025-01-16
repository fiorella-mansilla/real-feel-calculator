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

  const { data, isLoading, isError, error } = useQuery(
    ["realFeel", selectedCity?.name, selectedCity?.lat, selectedCity?.lon],
    fetchRealFeel,
    {
      enabled: !!selectedCity, // Fetch data only when city is selected
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    }
  );

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="home-page p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* City Selector Dropdown component */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Real Feel Temperature</h1>
        <p className="text-gray-600 mb-6">
          Select a city to view its real feel temperature and weather details.
        </p>
        <CitySelectorDropdown onCitySelect={handleCitySelect} className="shadow-md" />
      </div>

      {/* Weather Data component */}
      <div>
        {isLoading && <p>Loading weather data...</p>}
        {isError && (
          <p className="text-red-500">
            {error?.message || "Error fetching weather data. Please try again."}
          </p>
        )}
        {data && data.realFeel !== undefined && selectedCity && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Real Feel in {selectedCity.name}: {data.realFeel.toFixed(1)}°C
            </h2>
            <WeatherData weatherData={data.weatherData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;