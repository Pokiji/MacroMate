const request = require("request");

const APP_ID = process.env.NUTRITIONIX_APP_ID;
const APP_KEY = process.env.NUTRITIONIX_APP_KEY;

function searchNutritionix(query) {
    const options = {
        method: 'GET',
        url: `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(query)}`,
        headers: {
            'x-app-id': APP_ID,
            'x-app-key': APP_KEY
        },
        json: true
    };

    request(options, (error, response, body) => {
        if (error) throw new Error(error);
        
        
    });
}

// Example use
searchNutritionix("apple kirkland");