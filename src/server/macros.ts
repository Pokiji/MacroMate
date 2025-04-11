import axios from 'axios';

const myLicenseKey: string = `
bV3rEkOKKctj5CzpC9IA3l1pe2nnrQm8OjJvN0VfjTOVTsj5TeGuttP2KsFZ
ES6FLfAUz40SE4N+dTmdMitrQhJ7ZbS4gJwHGxiMZJxiGgXBiD5CLcScJDoH
0YrlWri01UCEElk4n0VJsSnspEEUqSp3HgQTOpK7qHR2Yh7xW6haEZhk8PIA
bSkNrUnjOxbzfabCnBEv1BNDoWjU5SQEDfXu216xzQNf8n1fyUzRLg+/XW5U
S2VmhaMq6D3NyWa/mbFp88L+A+xvZuD5Qo7s2p4ERZZA4qKLYBzBBvLADx47
vueBuLFPqafJk9xKBgycuD9J7ebLPnInEe9uDhFAIQ==
U2NhbmJvdFNESwpsb2NhbGhvc3R8bWFjcm9mYWN0b3IueHl6CjE3NDUwMjA3OTkKODM4ODYwNwo4
`.trim();

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