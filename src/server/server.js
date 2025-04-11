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
        
        console.log("Common foods:");
        body.common.forEach(item => {
            console.log(item.food_name);
        });

        console.log("\nBranded foods:");
        body.branded.forEach(item => {
            console.log(`${item.brand_name} - ${item.food_name}`);
        });
    });
}

// Example use
searchNutritionix("apple kirkland");