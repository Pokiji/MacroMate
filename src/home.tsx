import React from 'react';
import styles from './home.module.css'; // Assuming you have a CSS module for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home: React.FC = () => {
  return (
    <div className='main'>
      <div className="grid-contain">
        <div className="person">
          {/* Add content here if needed */}
        </div>
        <div className="info">
          <h1 className='slogan'>Welcome to MacroMate</h1>
          <p className='subHeader'>
            Effortlessly track your calories, 
            stay on top of your nutrition goals, 
            and build healthier habits—one meal at a time.
          </p>
        </div>
        <div className="info">
          {/* Add content here if needed */}
        </div>
        <div className="addfood">
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