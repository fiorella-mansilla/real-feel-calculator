import axios from 'axios';

/**
 * Fetches current weather data for a given city in Germany using the Bright Sky API.
 * Bright Sky Documentation: https://brightsky.dev/docs/#/operations/getCurrentWeather
 * This service retrieves weather parameters such as temperature, humidity, wind speed,
 * sunshine, and cloud cover, which are essential for further calculations like real feel temperature.
 * 
 * @param {number} lat - Latitude of the location in decimal degrees.
 * @param {number} lon - Longitude of the location in decimal degrees.
 * @returns {Promise<Object>} - A promise that resolves to an object containing extracted weather data:
 *  - timestamp: ISO timestamp of the observation.
 *  - temperature: Current air temperature in degrees Celsius at timestamp.
 *  - relativeHumidity: Relative humidity as a percentage (0-100) at timestamp.
 *  - windSpeed: Wind speed averaged over the past 60 minutes (in km/h).
 *  - sunshine: Sunshine duration during previous 60 minutes.
 *  - cloudCover: Cloud cover as a percentage (0-100) at timestamp.
 * @throws {Error} - Throws an error if the API request fails or the response is invalid.
 */
export const getWeatherData = async (lat, lon) => {
    try {
        // Make a GET request to the Bright Sky API to retrieve current weather data
        const response = await axios.get('https://api.brightsky.dev/current_weather', {
            params: { lat, lon }, // Query parameters: latitude and longitude of the location
        });

        // Extract weather data from the API response
        const weather = response.data.weather;

        // Validate that weather data exists in the response
        if (!weather) {
            throw new Error('Weather data is unavailable in the response.');
        }

        // Extract and return relevant weather parameters for further calculations in a structured format
        return {
            timestamp: weather.timestamp,
            temperature: weather.temperature,
            relativeHumidity: weather.relative_humidity,
            windSpeed: weather.wind_speed_60,
            sunshine: weather.sunshine_60,
            cloudCover: weather.cloud_cover,
        };

    } catch (error) {
        // Log the error for debugging purposes
        console.error('[WeatherService] Error:', error.message);

        // Throw a generic error to indicate failure to fetch weather data
        throw new Error('Failed to retrieve weather data.');
    }
};