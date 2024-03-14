import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Usage.css'

function UsagePage({updateHeader, updateButton}) {
    useEffect(() => {
        updateHeader('Truck Control / Usage');
        updateButton('Usage');
    }, [updateHeader, updateButton]);
    const [activeButton, setActiveButton] = useState('Truck Information');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }
    return (
        <div className='u-main'>
        <div className='u-topcards'> 
            <div className={`u-scard ${activeButton === 'Truck Information' ? 'active' : ''}`}>
                <button className='u-scard-button' onClick={() => handleButtonClick('Truck Information')}>
                    <Link className='u-scard-link'>
                        <img src="/images/truckin.png" alt="Home" className="u-scard-icon" />
                        <span className="u-scard-text">Truck Information</span>
                    </Link>
                </button>
            </div>
            <div className={`u-scard ${activeButton === 'Collision History' ? 'active' : ''}`}>
                <button className='u-scard-button' onClick={() => handleButtonClick('Collision History')}>
                    <Link className='u-scard-link'>
                        <img src="/images/coll.png" alt="Home" className="u-scard-icon" />
                        <span className="u-scard-text">Collision History</span>
                    </Link>
                </button>
            </div>
        </div>
        {activeButton === 'Truck Information' && (
        <div>
        <div className='u-card'>
            <table className='u-table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Model</th>
                        <th>Dist. <br/>Travelled</th>
                        <th>Location</th>
                        <th>Idle <br/>Start Dt</th>
                        <th>Idle <br/>Start Time</th>
                        <th>Idle <br/>End Date</th>
                        <th>Idle <br/>End Time</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
        <div className='u-mainprofile'>
            <div className="u-content">
                <div className='u-access'>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Tire Pressure</span><br/>
                            <span className='ut-scard-stext'>Abnormal Tire pressure</span><br/><br/>
                            <span className='ut-scard-mt'>82/ 80-100 PSI</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Brake System</span><br/>
                            <span className='ut-scard-stext'>Fluid Levels</span><br/><br/>
                            <span className='ut-scard-mt'>3 quarters/ Full</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Engine Health</span><br/>
                            <span className='ut-scard-stext'>Temperature levels</span><br/><br/>
                            <span className='ut-scard-mt'>95 C/ 90 -105 C</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Battery Health</span><br/>
                            <span className='ut-scard-stext'>Battery Voltage Levels</span><br/><br/>
                            <span className='ut-scard-mt'>13.2 V/ 13 - 15 V</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Fuel System</span><br/>
                            <span className='ut-scard-stext'>Low Fuel Level</span><br/><br/>
                            <span className='ut-scard-mt'>235 L/ 187 L</span>
                        </button>
                    </div>
                </div>
               
                    <button className='raisealert'>Raise Alert !</button>
               
            </div>
        </div>
    </div>
         )}
         {activeButton === 'Collision History' && (
        <div className='u-card'>
            <table className='u-table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Speed<br/> mph</th>
                        <th> Braking<br/> m/s^2</th>
                        <th>Collision</th>
                        <th>Severaity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
         )}
    </div>
    );
}

export default UsagePage;
