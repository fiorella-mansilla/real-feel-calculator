import express from 'express';
import { validateCoordinates } from '../middlewares/validationMiddleware.js';
import { getRealFeelTemperature } from '../controllers/weatherController.js';

const router = express.Router();

/**
 * GET /realfeel
 * 
 * Route to fetch the real feel temperature for a specific location in Germany.
 * This route accepts latitude and longitude as query parameters, validates them using a middleware,
 * and returns the real feel temperature along with the corresponding weather data.
 */ 
 
router.get('/realfeel', validateCoordinates, getRealFeelTemperature);

export default router;