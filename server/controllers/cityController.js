import { getAllCities } from "../services/cityService.js";

/**
 * Handles fetching all cities and sending a JSON response.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCitiesController = async (req, res) => {
  try {
    const cities = await getAllCities();

    if (Array.isArray(cities) && cities.length === 0) {
      return res.status(204).send();
    }
    res.json(cities);
  } catch (error) {
    console.error("Failed to fetch cities in getCitiesController:", error);
    res.status(500).json({ message: "Server error while fetching cities" });
  }
};