// routes/weatherRoutes.jss
import express from 'express';
import { validateCoordinates } from '../middlewares/validationMiddleware.js';
import { getRealFeelTemperature } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/realfeel', validateCoordinates, getRealFeelTemperature);

export default router;