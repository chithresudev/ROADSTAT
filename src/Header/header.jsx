import React, { useState, useEffect, useRef } from 'react';
import '../Header/header.css';

function Header({ currentUser, logout, headerContent, activeButtonC }) {

    const [activeButton, setActiveButton] = useState('Home');
    const [popupVisible, setPopupVisible] = useState(false);
    const popupRef = useRef(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setPopupVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='header_bg'>
            <div className='icons'>
                <img src="/images/roadstatLogo.png" alt="Logo" className="road_logo" />

                <img src="/images/userIcon.png" alt="User Icon"
                    className="user_icon"
                    onClick={togglePopup}
                />

                {popupVisible && (
                    <div className="user_popup" ref={popupRef}>
                        <p>
                            <img src="/images/user.png" alt="User Icon" />
                            {currentUser.username}
                        </p>
                        <a href="#" onClick={logout}>
                            <img src="/images/logout.png" alt="Logout Icon" />
                            Logout
                        </a>
                    </div>
                )}

                <div className='nav_container'>
                    <div
                        className={activeButton === 'Home' ? 'active' : ''}
                        onClick={() => handleButtonClick('Home')}
                    >
                        Home
                    </div>
                    <div
                        className={activeButton === 'Track' ? 'active' : ''}
                        onClick={() => handleButtonClick('Track')}
                    >
                        Track
                    </div>
                    <div
                        className={activeButton === 'Vehicle Control' ? 'active' : ''}
                        onClick={() => handleButtonClick('Vehicle Control')}
                    >
                        Vehicle Control
                    </div>
                    <div
                        className={activeButton === 'Maintenance' ? 'active' : ''}
                        onClick={() => handleButtonClick('Maintenance')}
                    >
                        Maintenance
                    </div>
                    <div
                        className={activeButton === 'Driver' ? 'active' : ''}
                        onClick={() => handleButtonClick('Driver')}
                    >
                        Driver
                    </div>
                </div>
            </div>
        </header>


    );

}

export default Header;

