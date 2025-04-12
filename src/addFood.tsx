import React, { useState } from 'react';
import { searchNutritionix } from './server/macros';
import './addFood.css';

interface Message {
    type: 'user' | 'response';
    content: string;
}

export default function AddFood() {
    const [food, setFood] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState(''); // New state for the unit
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!food || !quantity || !unit) {
            setError('Food, quantity, and unit are all required');
            return;
        }

        const query = `${quantity} ${unit} ${food}`;
        setMessages(prev => [...prev, { type: 'user', content: query }]);

        const nutritionData = await searchNutritionix(query, 'https://trackapi.nutritionix.com/v2/natural/nutrients');
        
        if (nutritionData) {
            const response = `
                Calories: ${nutritionData.calories.toFixed(1)}
                Protein: ${nutritionData.protein.toFixed(1)}g
                Carbs: ${nutritionData.carbohydrates.toFixed(1)}g
                Sugar: ${nutritionData.sugar.toFixed(1)}g
            `;
            setMessages(prev => [...prev, { type: 'response', content: response }]);
        } else {
            setMessages(prev => [...prev, { 
                type: 'response', 
                content: 'Sorry, I couldn\'t find nutrition information for that food.' 
            }]);
        }

        setFood('');
        setQuantity('');
        setUnit(''); // Reset the unit field
        setError('');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input
                        type="text"
                        value={food}
                        onChange={(e) => setFood(e.target.value)}
                        placeholder="Enter food name"
                        className={`input-field ${error && !food ? 'error' : ''}`}
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className={`input-field ${error && !quantity ? 'error' : ''}`}
                    />
                    <input
                        type="text"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder="Enter unit (e.g., grams, cups)"
                        className={`input-field ${error && !unit ? 'error' : ''}`}
                    />
                    {error && <span className="error-message">{error}</span>}
                    <button type="submit" className="submit-button">
                        Get Nutrition Info
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
                    </div>
                ))}
            </div>
        </div>
    );
}