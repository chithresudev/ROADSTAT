import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar/sidebar.css';
import arrowLogo from '/images/rarrow.png';
import darrow from '/images/darrow.png';
import dot from '/images/dot.png';
import sdot from '/images/sdot.png';

const Sidebar = ({ isAdmin, logout, activeButtonC  }) => {

    const [showTruckControlLinks, setShowTruckControlLinks] = useState(false);

    const handleTruckControlClick = () => {
        setShowTruckControlLinks(!showTruckControlLinks);
    };

    const [iconSrc, setIconSrc] = useState(dot);
    const [iconUsage, setIconUsage] = useState(dot);
    const [iconEfficiency, setIconEfficiency] = useState(dot);

    const handleButtonClick = (buttonName) => {
        setIconUsage(dot);
        setIconEfficiency(dot);
    };

    const handleSubLinkClick = (buttonName,icon) => {
        if (buttonName === 'Usage') {
            setIconUsage(icon);
            setIconEfficiency(dot);
        } else if (buttonName === 'Efficiency') {
            setIconEfficiency(icon);
            setIconUsage(dot);
        }
    };

    return (

    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
            <div className='logo'>
                <img src="/images/logo2.png" alt="Logo" className="logo-img" />
            </div>
            <div className='testham'>
            <div>
                <button className={`custom-button ${activeButtonC === 'Home' ? 'active' : ''}`} onClick={() => handleButtonClick('Home')}>
                    <Link to="/home" className="nav-item nav-link">
                        <img src="/images/Home.png" alt="Home" className="icon" />
                        <span className="text">Home</span>
                        <img src={arrowLogo} alt="Arrow" className="arrow-icon" />
                    </Link>
                </button>
            </div>
            <div>
                <button className={`custom-button ${activeButtonC === 'Track' ? 'active' : ''}`} onClick={() => handleButtonClick('Track')}>
                    <Link to="/track" className="nav-item nav-link">
                        <img src="/images/track.png" alt="Home" className="icon" />
                        <span className="text">Track</span>
                        <img src={arrowLogo} alt="Arrow" className="arrow-icon" />
                    </Link>
                </button>
            </div>

            <div>
            <button className={`custom-button ${activeButtonC === 'Truck Control' ? 'active' : ''}`} onClick={handleTruckControlClick}>  
                 <Link className="nav-item nav-link">
                    <img src="/images/truckcontrol.png" alt="Home" className="icon" />
                    <span className="text">Truck Control</span>
                    <img src={showTruckControlLinks ? darrow : arrowLogo} alt="Arrow" className={`arrow-icon ${showTruckControlLinks ? 'down' : 'right'}`} />
                </Link>
                </button>
                {showTruckControlLinks && (
                    <div>
                        <Link to="/truckcontrol/usage" className={`sub-nav ${activeButtonC === 'Usage' ? 'active' : ''}`} onClick={() => handleSubLinkClick('Usage',sdot)}>
                            <img src={iconUsage} alt="Icon1" className="sicon" />
                            <span className="text">Usage</span>
                        </Link>
                        <Link to="/truckcontrol/efficiency" className={`sub-nav ${activeButtonC === 'Efficiency' ? 'active' : ''}`} onClick={() => handleSubLinkClick('Efficiency',sdot)}>
                            <img src={iconEfficiency} alt="Icon2" className="sicon" />
                            <span className="text">Efficiency</span>
                        </Link>
                    </div>
                )}
            </div>
            <div>
                <button className={`custom-button ${activeButtonC === 'Maintenance' ? 'active' : ''}`} onClick={() => handleButtonClick('Maintenance')}> 
                    <Link to="/maintenance" className="nav-item nav-link">
                        <img src="/images/maintain.png" alt="Home" className="icon" />
                        <span className="text">Maintenance</span>
                        <img src={arrowLogo} alt="Arrow" className="arrow-icon" />
                    </Link>
                </button>
            </div>
            <div>
                <button className={`custom-button ${activeButtonC === 'Driver' ? 'active' : ''}`} onClick={() => handleButtonClick('Driver')}>  
                    <Link to="/driver" className="nav-item nav-link">
                        <img src="/images/user.png" alt="Home" className="icon" />
                        <span className="text">Driver</span>
                        <img src={arrowLogo} alt="Arrow" className="arrow-icon" />
                    </Link>
                </button>
            </div>
            {/* <div>
                {isAdmin && <button><Link to="/admin" className="nav-item nav-link">Admin</Link></button>}
            </div> */}
            </div>
        </div>
    </nav>
    
    );
};

export default Sidebar;
