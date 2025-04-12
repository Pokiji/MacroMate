import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Add styles for the grid layout
import happy from './assests/happy.jpg'; // Adjust the path to your image
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
        fat: number; // Optional field for fats
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

    // Calculate total nutrition values
    const totalCalories = savedFoods.reduce((total, food) => total + food.nutrition.calories, 0);
    const totalProtein = savedFoods.reduce((total, food) => total + food.nutrition.protein, 0);
    const totalCarbs = savedFoods.reduce((total, food) => total + food.nutrition.carbohydrates, 0);
    const totalFats = savedFoods.reduce((total, food) => total + food.nutrition.fat, 0); // Assuming fats might be missing

    return (
        <div className="main">
            <div className="grid-contain">
                {/* Profile Section */}
                <div className="profile-box">
                    <img src={happy} alt="Profile" className="profile-picture" />
                    <div className="profile-glass">
                        <p>
                            <strong>Welcome User</strong>, Let's Win This Day
                        </p>
                    </div>
                </div>

                {/* Total Nutrition */}
                <div className="total-kcal">
                    <h2>Total Nutrition</h2>
                    <p>Calories: {totalCalories} kcal</p>
                    <p>Protein: {totalProtein} g</p>
                    <p>Carbs: {totalCarbs} g</p>
                    <p>Fats: {totalFats} g</p>
                </div>

                {/* Saved Foods */}
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
                                        <li>Fats: {food.nutrition.fat}g</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No foods saved yet. Add some from the Add Food page!</p>
                    )}
                </div>

                {/* Info Section */}
                <div className="info">
                    <h1 className="slogan">Welcome to MacroMate</h1>
                    <p className="subHeader">
                        Effortlessly track your calories, stay on top of your nutrition goals, and build healthier habits—one meal at a time.
                    </p>
                    <Link to="/addfood">
                        <button className="button" type="button">
                            Add Food
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;