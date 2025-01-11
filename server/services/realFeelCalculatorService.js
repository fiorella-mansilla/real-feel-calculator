import { getSeasonFromTimestamp } from '../utils/seasonUtils.js';

/**
 * Calculate real feel temperature based on weather data.
 * @param {string} timestamp - Timestamp of the weather data
 * @param {number} temp - Current temperature
 * @param {number} humidity - Current humidity
 * @param {number} windSpeed - Current wind speed
 * @param {number} sunshine - Amount of sunshine
 * @param {number} cloudCover - Cloud cover percentage
 * @returns {number} - Real feel temperature
 */

export const calculateRealFeel = (timestamp, temp, humidity, windSpeed, sunshine, cloudCover) => {
    const season = getSeasonFromTimestamp(timestamp); // Determine the season based on timestamp
    let realFeel;

    // Convert windSpeed from km/h to m/s
    const windSpeedInMps = windSpeed / 3.6;

    // Heat Index Calculation (for temps >= 27°C)
    if (temp >= 27) {
        realFeel = -42.379 + 
            2.04901523 * temp + 
            (0.8 * 10.14333127 * humidity) -  // Scaled humidity influence
            0.22475541 * temp * humidity -
            0.00683783 * Math.pow(temp, 2) -
            0.05481717 * Math.pow(humidity, 2) + 
            0.00122874 * Math.pow(temp, 2) * humidity + 
            0.00085282 * temp * Math.pow(humidity, 2) -
            0.00000199 * Math.pow(temp, 2) * Math.pow(humidity, 2);
    
    } 
    // Wind Chill Calculation (for temps <= 10°C)
    else if (temp <= 10) {
        if (windSpeedInMps < 1.4) {
            realFeel = temp;  // No wind chill effect if wind speed is low
        } else {
            realFeel = 13.12 + 
                0.6215 * temp - 
                11.37 * Math.pow(windSpeedInMps, 0.16) + 
                0.3965 * temp * Math.pow(windSpeedInMps, 0.16);
        }
    } else {
        // Intermediate temperature range (for mild temperatures)
        realFeel = temp + (humidity / 100) * (5 - cloudCover / 20) + (sunshine / 60) - (windSpeedInMps / 2);
        
        // Adjust for seasonal effects
        if (season === 'winter' && temp < 15) {
            realFeel -= (windSpeedInMps / 5);  // Increase wind effect during colder months
        } else if (season === 'summer' && temp >= 15) {
            realFeel += (sunshine / 60) * 0.2;  // Add some heat during sunny summer days
        }
    }

    return parseFloat(realFeel.toFixed(1)); // Return the real feel temperature rounded to 1 decimal place
};