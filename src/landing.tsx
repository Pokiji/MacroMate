import './landing.css';
import './assests/inter.css';
import './assests/fontawesome.css';

import phoneImg from './assests/phoneimg.png'; // adjust the path if needed
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useEffect, useState } from 'react';

function Landing() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true); // Show the install button
        });
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null); // Clear the deferred prompt
                setShowInstallButton(false); // Hide the install button
            });
        }
    };

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
                {showInstallButton && (
                    <button
                        className="install-button"
                        onClick={handleInstallClick}
                    >
                        Install App
                    </button>
                )}
            </div>
        </>
    );
}

export default Landing;