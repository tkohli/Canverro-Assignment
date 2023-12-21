const axios = require('axios');
const { geocode } = require('../utils/geocoding');

exports.getWeather = async (req, res) => {
    try {
        const { longitude, latitude } = req.body;

        // Convet coordinates to location name using geocoding service
        const locationName = await geocode(latitude, longitude);

        // Fetch weather data from the weather API (replace with your API key and URL)
        const apiKey = '1763182e31bb213e43f47b00f0cb541b';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const weatherResponse = await axios.get(weatherApiUrl);

        // Extract relevant weather data
        const { temperature, conditions } = weatherResponse.data;

        // Send response to the client
        res.json({
            location: locationName,
            temperature,
            conditions,
            // Additional weather data...
        });
    } catch (error) {
        console.error(error);
        // Handle errors and send appropriate response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
