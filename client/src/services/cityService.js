import axios from "axios";

/**
 * Fetches cities from the backend API.
 * @returns {Promise<Array<{name: string, lat: number, lon: number}>>} A list of city objects
 */
export const fetchCities = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/cities"); 
    return Array.isArray(data) ? data : []; 
  } catch (error) {
    console.error("Error fetching cities:", error.response?.data || error.message);
    throw new Error("Failed to fetch cities. Please try again later.");
  }
};