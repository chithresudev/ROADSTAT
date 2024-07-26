import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './usage.css';

const apiUrl = import.meta.env.VITE_API_URL;

function UsagePage({ updateHeader, updateButton }) {

    const [activeButton, setActiveButton] = useState('Usage');
    const [toggledButtonName, setToggledButtonName] = useState("Truck Information");

    useEffect(() => {
        updateHeader('Truck Control / Usage');
        updateButton('Vehicle Control');
        // fetchTruckData();
        // fetchCollisionHistory();
    }, [updateHeader, updateButton]);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    }
    function toggleButton(button) {
        setToggledButtonName(button);
    }

    return (
        <div className='usage_page'>
            <div className='vehicle_cards_bar'>
                <div className='vehicle_cards_text'>
                    <div className={activeButton === 'Usage' ? 'active' : ''}
                        onClick={() => handleButtonClick('Usage')}>
                        Usage
                    </div>
                </div>
                <hr></hr>
                <div className='vehicle_cards_text'>
                    <div className={activeButton === 'Efficiency' ? 'active' : ''}
                        onClick={() => handleButtonClick('Efficiency')}>
                        Efficiency
                    </div>
                </div>
            </div >

            {activeButton === "Usage" && (
                <div className='usage_details'>
                    <div className='u_topcards'>
                        <div className={`u_scard ${toggledButtonName === "Truck Information" ? 'active' : ''}`}>
                            <button className='u_scard_button' onClick={() => toggleButton("Truck Information")}>
                                <Link className='u_scard_link'>
                                    <img src="/images/trin.png" alt="Home" className="u_scard_icon" />
                                    <span className="u_scard_text">Truck Information</span>
                                </Link>
                            </button>
                        </div>
                        <div className={`u_scard ${toggledButtonName === "Collision History" ? 'active' : ''}`}>
                            <button className='u_scard_button' onClick={() => toggleButton("Collision History")}>
                                <Link className='u_scard_link'>
                                    <img src="/images/col.png" alt="Home" className="u_scard_icon" />
                                    <span className="u_scard_text">Collision History</span>
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className='vehicle_card_details'>
                        
                    </div>
                </div>

            )

            }

        </div>
    );

}

export default UsagePage;