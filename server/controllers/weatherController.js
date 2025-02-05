import { getWeatherData } from '../services/weatherService.js';
import { calculateRealFeel } from '../services/realFeelCalculatorService.js';

/**
 * Handles requests for real feel temperature at a specific city in Germany.
 * 
 * This controller orchestrates the retrieval of weather data from the external API "Bright Sky"
 * and calculates the real feel temperature using the provided services. 
 * It responds with the calculated real feel temperature and the corresponding weather data.
 * 
 * @param {Object} req - Express request object, expected to contain coordinates in `req.coordinates`:
 *  - lat: Latitude of the location in decimal degrees.
 *  - lon: Longitude of the location in decimal degrees.
 * @param {Object} res - Express response object used to send the result back to the client.
 * @param {Function} next - Express middleware function for handling errors.
 * @returns {Promise<void>} - Returns a response with the real feel temperature or passes an error to the next middleware.
 */
export const getRealFeelTemperature = async (req, res, next) => {
    // Extract latitude and longitude from request coordinates
    const { lat, lon } = req.coordinates;

    try {
        // Fetch weather data for the specified location
        const weatherData = await getWeatherData(lat, lon);

        // Calculate the real feel temperature using the fetched weather data
        const realFeel = calculateRealFeel(
            weatherData.timestamp,
            weatherData.temperature,
            weatherData.relativeHumidity,
            weatherData.windSpeed,
            weatherData.solarIrradiation,
            weatherData.cloudCover
        );

        // Respond with the real feel temperature and associated weather data
        return res.status(200).json({
            success: true,
            realFeel,
            weatherData,
        });
    } catch (error) {
        // Log error details for debugging purposes
        console.error('[WeatherController] Error:', error.message);

        // Pass the error to the next middleware for handling
        next(error);
    }
};
