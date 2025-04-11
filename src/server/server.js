const request = require("request");

const APP_ID = process.env.NUTRITIONIX_APP_ID;
const APP_KEY = process.env.NUTRITIONIX_APP_KEY;

function searchNutritionix(query) {
    const options = {
        method: 'GET',
        url: `https://trackapi.nutritionix.com/v2/natural/nutrients?query=${encodeURIComponent(query)}`,
        headers: {
            'x-app-id': APP_ID,
            'x-app-key': APP_KEY
        },
        json: true
    };

    request(options, (error, response, body) => {
        if (error) throw new Error(error);

        const food = body.foods[0];
        
        console.log("Calories:" + food.nf_calories);
        console.log("Protein:" + food.nf_protein);
        console.log("Carbohydrates" + food.nf_total_carbohydrates);
        console.log("Sugar" + food.sugars)
    });
}

// Example use
searchNutritionix("sprite");