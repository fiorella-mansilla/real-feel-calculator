// controllers/weatherController.js
import { getWeatherData } from '../services/weatherService.js';
import { calculateRealFeel } from '../services/realFeelCalculatorService.js';

/**
 * Controller to handle the request for real feel temperature.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const getRealFeelTemperature = async (req, res, next) => {
    const { lat, lon } = req.coordinates; // Extract validated coordinates from middleware

    try {
        // Fetch the weather data using the weatherService
        const weatherData = await getWeatherData(lat, lon);

        // Extract necessary parameters for real feel calculation
        const { timestamp, temperature, relativeHumidity, windSpeed, sunshine, cloudCover } = weatherData;

        // Calculate the real feel temperature using the realFeelCalculatorService
        const realFeel = calculateRealFeel(
            timestamp,
            temperature,
            relativeHumidity,
            windSpeed,
            sunshine,
            cloudCover
        );

        // Send the result back to the user
        return res.status(200).json({
            success: true,
            realFeel,
            weatherData,
        });
    } catch (error) {
        console.error('[WeatherController] Error:', error.message);
        next(error);
    }
};
