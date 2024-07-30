import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './efficiency.css';

function Efficiency({ updateHeader, updateButton }) {
    const [activeButton, setActiveButton] = useState('Efficiency');
    const [selectedTruckNo, setSelectedTruckNo] = useState(null);
    const [truckData, setTruckData] = useState([]);

    useEffect(() => {
        if (truckData.length > 0) {
            const defaultSelectedTruckId = truckData[0].truckId;
            setSelectedTruckNo(defaultSelectedTruckId);
            fetchTruckControlData(defaultSelectedTruckId);
        }
    }, [truckData]);

    useEffect(() => {
        updateHeader('Truck Control/Efficiency');
        updateButton('Vehicle Control');
    }, [updateHeader, updateButton]);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    }

    return (
        <div className='efficiency_page'>
            <div className='vehicle_cards_bar'>
                <div className='vehicle_cards_text'>
                    <Link to="/truckcontrol/usage" className="vehicle_link {activeButton === 'Usage' ? 'active' : ''}"
                        onClick={() => handleButtonClick('Usage')}>
                        Usage
                    </Link>
                </div>
                <hr></hr>
                <div className='vehicle_cards_text'>
                    <div className={activeButton === 'Efficiency' ? 'active' : ''}
                        onClick={() => handleButtonClick('Efficiency')}>
                        Efficiency
                    </div>
                </div>
            </div >
        </div>
    );

}

export default Efficiency;