import { City } from "../models/City.js";

const CITY_FIELDS = { name: 1, lat: 1, lon: 1, _id: 0 };
const SORT_BY = { name: 1 };

/**
 * Retrieves all cities in Germany sorted alphabetically by name.
 * @returns {Promise<Array>} List of cities in Germany
 */
export const getAllCities = async () => {
  try {
    return City.find({}, CITY_FIELDS).sort(SORT_BY).lean();
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Could not retrieve cities. Please try again later.");
  }
};