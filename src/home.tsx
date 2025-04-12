import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Add styles for the saved foods box

interface SavedFood {
    food: string;
    quantity: string;
    unit: string;
    nutrition: {
        calories: number;
        protein: number;
        carbohydrates: number;
        sugar: number;
        sodium: number;
    };
}

const Home: React.FC = () => {
    const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);

    useEffect(() => {
        // Retrieve saved foods from localStorage
        const storedFoods = localStorage.getItem('savedFoods');
        if (storedFoods) {
            setSavedFoods(JSON.parse(storedFoods));
        }
    }, []);

    return (
        <div className="main">
            <div className="grid-contain">
                <div className="info">
                    <h1 className="slogan">Welcome to MacroMate</h1>
                    <p className="subHeader">
                        Effortlessly track your calories, stay on top of your nutrition goals, and build healthier habits—one meal at a time.
                    </p>
                </div>
                <div className="addfood">
                    <Link to="/addfood">
                        <button className="button" type="button">
                            Add Food
                        </button>
                    </Link>
                </div>
                <div className="saved-foods-box">
                    <h2>Saved Foods</h2>
                    {savedFoods.length > 0 ? (
                        <ul>
                            {savedFoods.map((food, index) => (
                                <li key={index}>
                                    <strong>{food.food}</strong> - {food.quantity} {food.unit}
                                    <ul>
                                        <li>Calories: {food.nutrition.calories}</li>
                                        <li>Protein: {food.nutrition.protein}g</li>
                                        <li>Carbs: {food.nutrition.carbohydrates}g</li>
                                        <li>Sugar: {food.nutrition.sugar}g</li>
                                        <li>Sodium: {food.nutrition.sodium}mg</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No foods saved yet. Add some from the Add Food page!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;