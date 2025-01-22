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
    const { lat, lon } = req.coordinates;

    try {
        // Get already-extracted weather data from the service
        const weatherData = await getWeatherData(lat, lon);

        // Calculate the real feel temperature
        const realFeel = calculateRealFeel(
            weatherData.timestamp,
            weatherData.temperature,
            weatherData.relativeHumidity,
            weatherData.windSpeed,
            weatherData.sunshine,
            weatherData.cloudCover
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
