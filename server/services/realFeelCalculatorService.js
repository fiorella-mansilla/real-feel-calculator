import { getSeasonFromTimestamp } from '../utils/seasonUtils.js';

/**
 * Calculate the real feel temperature based on current weather data.
 * The algorithm accounts for heat index (hot conditions), wind chill (cold conditions),
 * solar irradiation effects, humidity, wind cooling, and seasonal influences.
 * 
 * @param {string} timestamp - ISO timestamp of the retrieved weather data.
 * @param {number} temperature - Current air temperature in degrees Celsius at timestamp.
 * @param {number} humidity - Relative humidity as a percentage (0-100) at timestamp.
 * @param {number} windSpeed - Wind speed in km/h during previous 60 minutes.
 * @param {number} solarIrradiation - Solar irradiation in Wh/m² over the past 60 minutes.
 * @param {number} cloudCover - Cloud cover as a percentage (0-100) at timestamp.
 * @returns {number} - Real feel temperature rounded to one decimal place.
 */
export const calculateRealFeel = (timestamp, temperature, humidity, windSpeed, solarIrradiation, cloudCover) => {
    // Determine the current season (e.g., 'winter', 'summer') from the provided timestamp
    const season = getSeasonFromTimestamp(timestamp); 

    let realFeel; // Variable to hold the calculated real feel temperature

    // Convert wind speed from km/h to m/s (1 km/h = 0.27778 m/s)
    const windSpeedInMps = windSpeed / 3.6;

    // Scale solarIrradiation effect based on season and cloud cover
    let solarFactor = (solarIrradiation ?? 0) * (1 - cloudCover / 100); // Reduce effect with more clouds
    if (season === 'summer') solarFactor *= 1.2; // Stronger sun effect in summer
    if (season === 'winter') solarFactor *= 0.8; // Weaker sun effect in winter

    /* Calculate heat index for hot temperatures (≥ 27°C)
    * The Heat Index (HI) is calculated for high temperatures (typically above 27°C)
    * and it also includes the humidity. */
    if (temperature >= 27) {
        realFeel = -42.379 + 
            2.04901523 * temperature + 
            (0.8 * 10.14333127 * humidity) -  // Adjust humidity influence
            0.22475541 * temperature * humidity -
            0.00683783 * Math.pow(temperature, 2) -
            0.05481717 * Math.pow(humidity, 2) + 
            0.00122874 * Math.pow(temperature, 2) * humidity + 
            0.00085282 * temperature * Math.pow(humidity, 2) -
            0.00000199 * Math.pow(temperature, 2) * Math.pow(humidity, 2);
    
    } 
    /* Calculate wind chill for cold temperatures (≤ 10°C)
    * The Wind Chill (WC) is used for low temperatures (typically below 10°C) and takes into account 
    * the cooling effect of wind speed: important in the winter months in Germany, where cold winds can 
    * make the air feel much colder than the actual temperature.
    */
    else if (temperature <= 10) {
        if (windSpeedInMps < 1.4) {
            realFeel = temperature;  // Minimal wind chill effect at low wind speeds
        } else {
            realFeel = 13.12 + 
                0.6215 * temperature - 
                11.37 * Math.pow(windSpeedInMps, 0.16) + 
                0.3965 * temperature * Math.pow(windSpeedInMps, 0.16);
        }
    } 
    // Adjust for mild temperatures (10°C < temperature < 27°C)
    else {
        realFeel = temperature + 
        (humidity / 100) * (5 - cloudCover / 20) +   // Humidity and cloud cover effects
        (solarFactor / 25) -                         // Solar irradiation contribution
        (windSpeedInMps / 2);                        // Wind cooling effect
        
        // Seasonal adjustments
        if (season === 'winter' && temperature < 15) {
            realFeel -= (windSpeedInMps / 5);  // Amplify wind effect in winter
        } else if (season === 'summer' && temperature >= 15) {
            realFeel += (solarFactor / 50);  // Enhance solar effect in summer
        }
    }

    // Return the real feel temperature rounded to 1 decimal place
    return parseFloat(realFeel.toFixed(1)); 
};