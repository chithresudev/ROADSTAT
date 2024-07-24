import React, { useState, useEffect, useRef } from 'react';
import '../Header/header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header({ currentUser, logout, headerContent, activeButtonC }) {
    const navigate = useNavigate();
    // const [activeButton, setActiveButton] = useState('Home');
    const [popupVisible, setPopupVisible] = useState(false);
    const popupRef = useRef(null);

    const handleButtonClick = (buttonName) => {
        if (buttonName === 'Home') {
            navigate('/home');
        } else if (buttonName === 'Track') {
            navigate('/track');
        } else if (buttonName === 'Vehicle Control') {
            navigate('/truckcontrol/usage');
        } else if (buttonName === 'Maintenance') {
            navigate('/maintenance');
        } else if (buttonName === 'Driver') {
            navigate('/driver');
        } else {
            navigate('/');
        }
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
                        className={activeButtonC === 'Home' ? 'active' : ''}
                        onClick={() => handleButtonClick('Home')}
                    >
                        Home
                    </div>
                    <div
                        className={activeButtonC === 'Track' ? 'active' : ''}
                        onClick={() => handleButtonClick('Track')}
                    >
                        Track
                    </div>
                    <div
                        className={activeButtonC === 'Vehicle Control' ? 'active' : ''}
                        onClick={() => handleButtonClick('Vehicle Control')}
                    >
                        Vehicle Control
                    </div>
                    <div
                        className={activeButtonC === 'Maintenance' ? 'active' : ''}
                        onClick={() => handleButtonClick('Maintenance')}
                    >
                        Maintenance
                    </div>
                    <div
                        className={activeButtonC === 'Driver' ? 'active' : ''}
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

