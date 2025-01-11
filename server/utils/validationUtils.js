// utils/validationUtils.js

/**
 * Check if a value is a valid latitude.
 * @param {number} lat - Latitude to validate.
 * @returns {boolean} - True if valid latitude, false otherwise.
 */
export const isValidLatitude = (lat) => {
    return typeof lat === 'number' && lat >= -90 && lat <= 90;
};

/**
 * Check if a value is a valid longitude.
 * @param {number} lon - Longitude to validate.
 * @returns {boolean} - True if valid longitude, false otherwise.
 */
export const isValidLongitude = (lon) => {
    return typeof lon === 'number' && lon >= -180 && lon <= 180;
};