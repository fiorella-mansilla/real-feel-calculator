import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchRealFeel} from "../services/weatherService";
import CitySelectorDropdown from "../components/CitySelectorDropdown";
import WeatherData from "../components/WeatherData";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../assets/home_logo.png";

/**
 * HomePage Component for SPA application.
 * Displays the real-feel temperature and weather information for selected cities.
 *
 * Features:
 * - Dropdown for city selection in Germany.
 * - Real-time data fetching with loading and error states.
 * - Responsive design optimized for various screen sizes.
 *
 * @component
 * @returns {JSX.Element} Rendered HomePage.
 */
const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState(null); // Stores the selected city
  const [showLoading, setShowLoading] = useState(false); // Controls the loading state visibility

  // Fetch real feel data using rect-query
  const { data, isLoading, isError, error } = useQuery(
    ["realFeel", selectedCity?.name, selectedCity?.lat, selectedCity?.lon],
    () => fetchRealFeel(selectedCity?.lat, selectedCity?.lon),
    {
      enabled: !!selectedCity, // Prevent fetching without a selected city
      refetchOnWindowFocus: false,
    }
  );

  // Show or hide loading spinner based on isLoading state
  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => setShowLoading(true), 300); // Delay loading spinner to prevent flickering
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Handle city selection from dropdown and reset weather data if no city is selected
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-fluid-1">
      {/* Header Section with Logo */}
      <header className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 mb-8 lg:mt-2">
        <img
          src={Logo}
          alt="Logo"
          className="h-9 w-9 sm:h-11 sm:w-11 lg:h-16 lg:w-16 object-contain"
        />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
          Real Feel Temperature Calculator
        </h1>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col md:flex-row flex-1 w-full max-w-screen-xl bg-white rounded-lg shadow-md p-fluid-1 md:p-fluid-2">
        {/* Left Column - City Selector */}
        <section className="flex flex-col flex-1 justify-start items-start md:pr-6 md:border-r md:border-gray-200">
          <h2 className="text-2xl font-normal mb-1">Welcome!</h2>
          <p className="text-base lg:text-lg text-gray-500 mb-6 mt-1 transition-all duration-400 ease-in-out">
            Select a city to view its real feel temperature and weather details.
          </p>
          <CitySelectorDropdown onCitySelect={handleCitySelect} className="shadow-md" />
        </section>

        {/* Right Column - Weather Data */}
        <section className="flex flex-col flex-1 justify-start items-start md:pl-6 mt-12">
          {showLoading ? (
            <div className="flex items-center space-x-4 ml-2">
              <p className="text-base lg:text-lg text-gray-600">
                Loading weather data...
              </p>
              <CircularProgress size={30} />
            </div>
          ) : (
            <>
              {isError && (
                <p className="text-base lg:text-lg text-red-500 ml-2">
                  {error?.message || "Error fetching weather data. Please try again."}
                </p>
              )}
              {data?.realFeel !== undefined && selectedCity && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    Real Feel in {selectedCity.name}:{" "}
                    {data.realFeel.toFixed(1)}°C
                  </h2>
                  <WeatherData weatherData={data.weatherData} />
                </div>
              )}
              {!selectedCity && (
                <p className="text-base lg:text-lg text-gray-500">
                  No city selected. Please choose a city to display the results.
                </p>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;