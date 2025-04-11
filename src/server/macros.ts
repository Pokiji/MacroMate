import axios from 'axios';

interface NutritionixResponse {
    foods: Array<{
        nf_calories: number;
        nf_protein: number;
        nf_total_carbohydrates: number;
        sugars: number;
    }>;
}

export async function searchNutritionix(query: string, url: string): Promise<void> {
    try {
        const response = await axios.get<NutritionixResponse>(`${url}${encodeURIComponent(query)}`, {
            headers: {
                'x-app-id':"bfd70bc8",
                'x-app-key':"1021128a0300b52b3d95ba6eda216dc8"
            }
        });

        if (response.data.foods && response.data.foods.length > 0) {
            const food = response.data.foods[0];
            console.log("Calories:", food.nf_calories);
            console.log("Protein:", food.nf_protein);
            console.log("Carbohydrates:", food.nf_total_carbohydrates);
            console.log("Sugar:", food.sugars);
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}