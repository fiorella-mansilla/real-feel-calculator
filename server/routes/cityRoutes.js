import express from "express";
import { getCitiesController } from "../controllers/cityController.js";

const router = express.Router();

/**
 * GET /cities
 * 
 * Route to fetch all cities in Germany.
 * This route returns a list of all cities in Germany along with their corresponding coordinates.
 * The list is fetched from the database in MongoDB Atlas.
 */
router.get("/cities", getCitiesController); 

export default router;