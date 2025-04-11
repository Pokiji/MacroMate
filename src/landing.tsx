import './landing.css'
import './assests/inter.css'
import './assests/fontawesome.css'
import { Link } from 'react-router-dom'; // Import Link from React Router

import phoneImg from './assests/phoneimg.png'; // adjust the path if needed
function Landing (){
    return(
        <>
            <div className='main'>
                <div className="header">
                    <h1>MacroMate </h1>
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
                    <button className='button' type="button">
                        Get started <i className="fa-solid fa-arrow-right"></i>
                    </button>
            </div>
        </>
    )
}

export default Landing