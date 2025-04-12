import './landing.css';
import './assests/inter.css';
import './assests/fontawesome.css';

import phoneImg from './assests/phoneimg.png'; // adjust the path if needed
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Landing() {
    return (
        <>
            <div className='main'>
                <div className="header">
                    <h1 className='name'>MacroMate </h1>
                </div>
                <div className="img">
                    <img src={phoneImg} alt="phonedemo" />
                </div>
                <div className="textWrapper">
                    <h1 className='slogan'><i>Eat Smart Without the Math</i></h1>
                    <p className='subHeader'>
                        Effortlessly track your calories, 
                        stay on top of your nutrition goals, 
                        and build healthier habits—one meal at a time.
                    </p>
                </div>
                <Link to="/home">
                    <button className='landingbutton' type="button">
                        Get started <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Landing;