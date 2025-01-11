// middlewares/validationMiddleware.js
import { isValidLatitude, isValidLongitude } from '../utils/validationUtils.js';

/**
 * Middleware to validate latitude and longitude in query parameters.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const validateCoordinates = (req, res, next) => {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    // Check for missing or invalid latitude/longitude
    if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid latitude or longitude. Please provide valid values.',
        });
    }

    // Attach parsed lat/lon to the request object for downstream use
    req.coordinates = { lat, lon };
    next(); // Proceed to the next middleware/controller
};