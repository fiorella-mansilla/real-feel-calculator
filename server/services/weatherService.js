// services/weatherService.js
import axios from 'axios';

/**
 * Fetch and extract necessary weather parameters from Bright Sky API.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<Object>} - Extracted and formatted weather data.
 * @throws {Error} - If the API request fails or data is invalid.
 */
export const getWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get('https://api.brightsky.dev/current_weather', {
            params: { lat, lon },
        });

        const weather = response.data.weather;

        if (!weather) {
            throw new Error('Weather data is unavailable in the response.');
        }

        // Extract and return necessary weather parameters
        return {
            timestamp: weather.timestamp,
            temperature: weather.temperature,
            relativeHumidity: weather.relative_humidity,
            windSpeed: weather.wind_speed_60,
            sunshine: weather.sunshine_60,
            cloudCover: weather.cloud_cover,
        };

    } catch (error) {
        console.error('[WeatherService] Error:', error.message);
        throw new Error('Failed to retrieve weather data.');
    }
};