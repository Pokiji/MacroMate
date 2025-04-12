import React, { useState, useEffect } from 'react';
import { searchNutritionix } from './server/macros';
import { useNavigate } from 'react-router-dom';
import './addFood.css';

interface Message {
    type: 'user' | 'response';
    content: string;
    nutritionData?: NutritionData;
    foodDetails?: {
        food: string;
        quantity: string;
        unit: string;
    };
}

interface NutritionData {
    calories: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    sodium: number;
}

interface SavedFood {
    food: string;
    quantity: string;
    unit: string;
    nutrition: NutritionData;
}

export default function AddFood() {
    const [food, setFood] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState('');
    const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [savedMessageIds, setSavedMessageIds] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFoods = localStorage.getItem('savedFoods');
        const storedMessages = localStorage.getItem('nutritionMessages');
        const storedMessageIds = localStorage.getItem('savedMessageIds');
        
        if (storedFoods) {
            setSavedFoods(JSON.parse(storedFoods));
        }
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
        if (storedMessageIds) {
            setSavedMessageIds(JSON.parse(storedMessageIds));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('savedMessageIds', JSON.stringify(savedMessageIds));
    }, [savedMessageIds]);

    useEffect(() => {
        localStorage.setItem('nutritionMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('savedFoods', JSON.stringify(savedFoods));
    }, [savedFoods]);

    const handleSave = (nutritionData: NutritionData, foodDetails: { food: string; quantity: string; unit: string }, index: number) => {
        setSavedMessageIds(prev => [...prev, index]);
        setSavedFoods(prev => {
            // Use the current state instead of getting from localStorage
            const existingFoodIndex = prev.findIndex(
                (item: SavedFood) => 
                    item.food === foodDetails.food && 
                    item.unit === foodDetails.unit
            );
    
            if (existingFoodIndex !== -1) {
                // Update existing food
                const updatedFoods = [...prev];
                const existingFood = updatedFoods[existingFoodIndex];
                
                updatedFoods[existingFoodIndex] = {
                    ...existingFood,
                    quantity: (parseFloat(existingFood.quantity) + parseFloat(foodDetails.quantity)).toString(),
                    nutrition: {
                        calories: existingFood.nutrition.calories + nutritionData.calories,
                        protein: existingFood.nutrition.protein + nutritionData.protein,
                        carbohydrates: existingFood.nutrition.carbohydrates + nutritionData.carbohydrates,
                        sugar: existingFood.nutrition.sugar + nutritionData.sugar,
                        sodium: existingFood.nutrition.sodium + nutritionData.sodium
                    }
                };
                
                return updatedFoods;
            }
    
            // Add new food to current state
            return [...prev, {
                food: foodDetails.food,
                quantity: foodDetails.quantity,
                unit: foodDetails.unit,
                nutrition: nutritionData
            }];
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!food || !quantity || !unit) {
            setError('Food, quantity, and unit are all required');
            return;
        }

        setIsSearching(true);
        const query = `${quantity} ${unit} ${food}`;
        setMessages(prev => [...prev, { type: 'user', content: query }]);

        try {
            const nutritionData = await searchNutritionix(query, 'https://trackapi.nutritionix.com/v2/natural/nutrients');
            
            if (nutritionData) {
                const response = `
                    Calories: ${nutritionData.calories.toFixed(1)}
                    Protein: ${nutritionData.protein.toFixed(1)}g
                    Carbs: ${nutritionData.carbohydrates.toFixed(1)}g
                    Sugar: ${nutritionData.sugar.toFixed(1)}g
                    Sodium: ${nutritionData.sodium.toFixed(1)}g
                `;
                setMessages(prev => [
                    ...prev,
                    {
                        type: 'response',
                        content: response,
                        nutritionData,
                        foodDetails: {
                            food,
                            quantity,
                            unit,
                        },
                    },
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        type: 'response',
                        content: "Sorry, I couldn't find nutrition information for that food.",
                    },
                ]);
            }
        } finally {
            setIsSearching(false);
            setFood('');
            setQuantity('');
            setUnit('');
            setError('');
        }
    };

    return (
        <div className="container">
            <button className="returnbutton" type="button" onClick={() => navigate('/home')}>
                <h1 className='returntext'>Return Home</h1>
            </button>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input
                        type="text"
                        value={food}
                        onChange={(e) => setFood(e.target.value)}
                        placeholder="Enter food name"
                        className={`input-field ${error && !food ? 'error' : ''}`}
                        disabled={isSearching}
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className={`input-field ${error && !quantity ? 'error' : ''}`}
                        disabled={isSearching}
                    />
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className={`input-field ${error && !unit ? 'error' : ''}`}
                        disabled={isSearching}
                    >
                        <option value="">Select unit</option>
                        <option value="grams">grams</option>
                        <option value="mL">mL</option>
                        <option value="L">L</option>
                        <option value="cups">cups</option>
                        <option value="pieces">pieces</option>
                        <option value="tablespoons">tablespoons</option>
                        <option value="teaspoons">teaspoons</option>
                    </select>
                    {error && <span className="error-message">{error}</span>}
                    <button type="submit" className="submit-button" disabled={isSearching}>
                        {isSearching ? 'Searching...' : 'Get Nutrition Info'}
                    </button>
                </div>
            </form>

            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.type === 'user' ? 'user-message' : 'response-message'}`}
                    >
                        <pre className="message-content">{message.content}</pre>
                        {message.type === 'response' && message.nutritionData && message.foodDetails && (
                            <button
                                className="save-button"
                                onClick={() => handleSave(message.nutritionData!, message.foodDetails!, index)}
                                disabled={savedMessageIds.includes(index)}
                            >
                                {savedMessageIds.includes(index) ? 'Saved' : 'Save This Food'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}