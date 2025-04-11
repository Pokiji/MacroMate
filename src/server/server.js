const request = require("request");
import ScanbotSDK from 'scanbot-web-sdk';

const APP_ID = process.env.NUTRITIONIX_APP_ID;
const APP_KEY = process.env.NUTRITIONIX_APP_KEY;

const myLicenseKey = "bV3rEkOKKctj5CzpC9IA3l1pe2nnrQ" +
"m8OjJvN0VfjTOVTsj5TeGuttP2KsFZ" +
"ES6FLfAUz40SE4N+dTmdMitrQhJ7Zb" +
"S4gJwHGxiMZJxiGgXBiD5CLcScJDoH" +
"0YrlWri01UCEElk4n0VJsSnspEEUqS" +
"p3HgQTOpK7qHR2Yh7xW6haEZhk8PIA" +
"bSkNrUnjOxbzfabCnBEv1BNDoWjU5S" +
"QEDfXu216xzQNf8n1fyUzRLg+/XW5U" +
"S2VmhaMq6D3NyWa/mbFp88L+A+xvZu" +
"D5Qo7s2p4ERZZA4qKLYBzBBvLADx47" +
"vueBuLFPqafJk9xKBgycuD9J7ebLPn" +
"InEe9uDhFAIQ==\nU2NhbmJvdFNESw" +
"psb2NhbGhvc3R8bWFjcm9mYWN0b3Iu" +
"eHl6CjE3NDUwMjA3OTkKODM4ODYwNw" +
"o4\n";

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
        console.log("Calories:" + food.nf_calories)
        console.log("Protein:" + food.nf_protein)
        console.log("Carbohydrates" + food.nf_total_carbohydrates)
        console.log("Sugar" + food.sugars)
    });
}

searchNutritionix("sprite");

async function initializeScanbot() {
    const scanbotSDK = await ScanbotSDK.initialize({
        licenseKey: myLicenseKey
    });

    console.log("Scanbot SDK initialized successfully!");

    // Start barcode scanning
    const result = await scanbotSDK.createBarcodeScanner({
        containerId: 'barcode-scanner-container', // Add a container in your HTML
        onBarcodeDetected: async (barcode) => {
            console.log("Scanned Barcode:", barcode.text);

            // Fetch nutrition data from Nutritionix API
            fetchNutritionData(barcode.text);
        }
    });

    return result;
}

