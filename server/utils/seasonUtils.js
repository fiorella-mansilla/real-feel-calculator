/**
 * Determines the season based on the timestamp.
 * @param {string} timestamp - ISO 8601 formatted timestamp string
 * @returns {string} - The season ("winter", "spring", "summer", "autumn")
 */

export const getSeasonFromTimestamp = (timestamp) => {
    // Parse the ISO 8601 timestamp into a Date object
    const date = new Date(timestamp);
    
    // Extract the month and day from the Date object
    const month = date.getMonth() + 1; // months are zero-indexed in JavaScript
    const day = date.getDate();

    // Determine the season based on the month and day
    if ((month === 12 && day >= 1) || (month <= 2)) {
        return 'winter'; // December to February
    } else if (month >= 3 && month <= 5) {
        return 'spring'; // March to May
    } else if (month >= 6 && month <= 8) {
        return 'summer'; // June to August
    } else {
        return 'autumn'; // September to November
    }
};