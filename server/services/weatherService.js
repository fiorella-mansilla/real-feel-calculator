// services/weatherService.js
import axios from 'axios';

/**
 * Fetch current weather data from the Bright Sky API.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<Object>} - Weather data with necessary parameters extracted.
 * @throws {Error} - If the API request fails.
 */
export const getWeatherData = async (lat, lon) => {
    try {
        // Make API call to Bright Sky API with the lat, lon parameters
        const response = await axios.get('https://api.brightsky.dev/current_weather', {
            params: { lat, lon }
        });

        const weather = response.data.weather;
        
        if (!weather) {
            throw new Error('Weather data is unavailable in the response.');
        }

        // Extract only the necessary weather parameters
        const {
            timestamp,
            temperature,
            relative_humidity: relativeHumidity,
            wind_speed_60: windSpeed,
            sunshine_60: sunshine,
            cloud_cover: cloudCover
        } = weather;

        // Return the extracted weather data for further processing
        return { 
            timestamp,
            temperature,
            relativeHumidity,
            windSpeed,
            sunshine,
            cloudCover
        };

    } catch (error) {
        console.error('Error fetching weather data from Bright Sky API:', error);
        throw new Error('Failed to retrieve weather data');
    }
};
