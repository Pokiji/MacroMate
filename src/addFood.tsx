import React, { useState } from 'react';
import { searchNutritionix } from './server/macros.js'
import './home.css';

function AddFood() {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        searchNutritionix(userInput, "https://trackapi.nutritionix.com/v2/natural/nutrients?query=");
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return(
        <>
            <div className="chat-container">
                <div className="chat-header">
                    <h1>Nutrition Finder</h1>
                </div>
                
                <div className="chat-messages" id="chat-messages">
                    {/* Messages will appear here */}
                </div>
                
                <div className="chat-input-container">
                    <form className="input-form" onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Type a food item (e.g., McDonald's Big Mac)..."
                            className="message-input"
                        />
                        <button type="submit" className="send-button">
                            <span>Search</span>
                        </button>
                    </form>
                </div>
            </div>           
        </>
    )
}

export default AddFood