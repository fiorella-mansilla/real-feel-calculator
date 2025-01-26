import axios from "axios";

/**
 * Fetches the real-feel temperature and weather data for a given city.
 *
 * @param {string} lat - Latitude of the city.
 * @param {string} lon - Longitude of the city.
 * @returns {Promise<Object>} The fetched weather data.
 */
export const fetchRealFeel = async (lat, lon) => {
  if (!lat || !lon) throw new Error("Latitude and longitude are required.");

  const { data } = await axios.get("http://localhost:3000/api/realfeel", {
    params: { lat, lon },
  });

  return data;
};