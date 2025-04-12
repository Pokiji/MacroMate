import axios from 'axios';

interface NutritionData {
    calories: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    sodium: number;
    fat: number
}

interface NutritionixResponse {
    foods: {
        nf_calories: number;
        nf_protein: number;
        nf_total_carbohydrate: number;
        nf_sugars: number;
        nf_sodium: number;
        nf_total_fat: number;
    }[];
}

export async function searchNutritionix(query: string, url: string): Promise<NutritionData | null> {
    try {
        const response = await axios.post<NutritionixResponse>(
            url, // The base URL for the Nutritionix API
            { query }, // Pass the query in the request body
            {
                headers: {
                    'x-app-id': "bfd70bc8", // Replace with your actual app ID
                    'x-app-key': "db2abd20267043895d8249b06ca0985d", // Replace with your actual app key
                }
            }
        );

        if (response.data.foods && response.data.foods.length > 0) {
            const food = response.data.foods[0];
            return {
                calories: food.nf_calories,
                protein: food.nf_protein,
                carbohydrates: food.nf_total_carbohydrate,
                sugar: food.nf_sugars,
                sodium: food.nf_sodium,
                fat: food.nf_total_fat
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}