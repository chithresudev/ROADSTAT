import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Usage.css';

function UsagePage({ updateHeader, updateButton }) {
    useEffect(() => {
        updateHeader('Truck Control / Usage');
        updateButton('Usage');
        fetchTruckData(); // Fetch data when the component mounts
        fetchCollisionHistory(); // Fetch collision history data when the component mounts
    }, [updateHeader, updateButton]);
    

    const [selectedTruckNo, setSelectedTruckNo] = useState(null);
    const [activeButton, setActiveButton] = useState('Truck Information');
    const [truckData, setTruckData] = useState([]);
    const [collisionHistory, setCollisionHistory] = useState([]);
    const [tirePressure, setTirePressure] = useState(null);
    const [brakeHealth, setBrakeHealth] = useState(null);
    const [engineTemp, setEngineHealth] = useState(null);
    const [batteryHealth, setBatteryHealth] = useState(null);
    const [fuelLevel, setFuelLevel] = useState(null); 
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    useEffect(() => {
        if (truckData.length > 0) {
            const defaultSelectedTruckId = truckData[0].truckId;
            fetchTruckControlData(defaultSelectedTruckId);
        }
    }, [truckData]);

    const fetchTruckData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/truck-information');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTruckData(data);
        } catch (error) {
            console.error('Error fetching truck information:', error);
        }
    };

    const fetchCollisionHistory = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/collision-history');
            if (!response.ok) {
                throw new Error('Failed to fetch collision history data');
            }
            const data = await response.json();
            setCollisionHistory(data);
        } catch (error) {
            console.error('Error fetching collision history:', error);
        }
    };

    const fetchTruckControlData = async (truckId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/truck-control/${truckId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch truck control data');
            }
            const data = await response.json();
    
            setTirePressure(data?.tirePressure);
            setBrakeHealth(data?.brakeHealth);
            setEngineHealth(data?.engineTemp);
            setBatteryHealth(data?.batteryHealth);
            setFuelLevel(data?.fuelLevel);
        } catch (error) {
            console.error('Error fetching truck control data:', error);
        }
    };
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    const handleTruckClick = async (index, truckId) => {
        setSelectedRowIndex(index);
        setSelectedTruckNo(truckId);
        fetchTruckControlData(truckId);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const handleIconClick = (description, event) => {
        const iconRect = event.target.getBoundingClientRect();
        const popupX = iconRect.left + window.pageXOffset+15;
        const popupY = iconRect.top + window.pageYOffset ; // Adjust as needed
        setShowPopup(true);
        setPopupContent(description);
        setPopupPosition({ x: popupX, y: popupY });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupContent('');
    };

    const handleRaiseAlert = () => {
        if (selectedTruckNo) {
            alert(`Alert raised for Truck No: ${selectedTruckNo}`);
        }
    };
    

    return (
        <div className='u-main'>
            <div className='u-topcards'>
                <div className={`u-scard ${activeButton === 'Truck Information' ? 'active' : ''}`}>
                    <button className='u-scard-button' onClick={() => handleButtonClick('Truck Information')}>
                        <Link className='u-scard-link'>
                            <img src="/images/trin.png" alt="Home" className="u-scard-icon" />
                            <span className="u-scard-text">Truck Information</span>
                        </Link>
                    </button>
                </div>
                <div className={`u-scard ${activeButton === 'Collision History' ? 'active' : ''}`}>
                    <button className='u-scard-button' onClick={() => handleButtonClick('Collision History')}>
                        <Link className='u-scard-link'>
                            <img src="/images/col.png" alt="Home" className="u-scard-icon" />
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
                                    <th>Truck Model</th>
                                    <th>Dist. <br />Travelled</th>
                                    <th>Location</th>
                                    <th>Idle <br />Start Dt</th>
                                    <th>Idle <br />Start Time</th>
                                    <th>Idle <br />End Date</th>
                                    <th>Idle <br />End Time</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {truckData.map((truck, index) => (
                                    <tr key={index} className={selectedRowIndex === index ? 'selected-row' : ''} onClick={() => handleTruckClick(index, truck.truckId)}>
                                        <td>{truck.truckId}</td>
                                        <td>{truck.truckName}</td>
                                        <td>{truck.distanceTravelled}</td>
                                        <td>{truck.location}</td>
                                        <td>{truck.idleStartDate}</td>
                                        <td>{truck.idleStartTime}</td>
                                        <td>{truck.idleEndDate}</td>
                                        <td>{truck.idleEndTime}</td>
                                        <td>{truck.duration}</td>
                                    </tr>
                                ))}
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
                            <span className='ut-scard-mt'>{tirePressure} / 80-100 PSI</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Brake System</span><br/>
                            <span className='ut-scard-stext'>Fluid Levels</span><br/><br/>
                            <span className='ut-scard-mt'>{brakeHealth} / Full</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Engine Health</span><br/>
                            <span className='ut-scard-stext'>Temperature levels</span><br/><br/>
                            <span className='ut-scard-mt'>{engineTemp} / 90 - 105 C</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Battery Health</span><br/>
                            <span className='ut-scard-stext'>Battery Voltage Levels</span><br/><br/>
                            <span className='ut-scard-mt'>{batteryHealth} / 13 - 15 V</span>
                        </button>
                    </div>
                    <div className="ut-scard">
                        <button className='ut-scard-button'>
                            <span className='ut-scard-text'> Fuel System</span><br/>
                            <span className='ut-scard-stext'>Low Fuel Level</span><br/><br/>
                            <span className='ut-scard-mt'>{fuelLevel} / 187 L</span>
                        </button>
                    </div>
                </div>
               
                <button className='raisealert' onClick={handleRaiseAlert}>Raise Alert !</button>
               
            </div>
        </div>
    </div>
         )}
         {activeButton === 'Collision History' && (
        <div>
        <div className='usa-card'>
            <table className='usa-table'>
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
                        <th>Severity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {collisionHistory.map((collision, index) => (
                    <tr key={index}>
                        <td>{collision.truckId}</td>
                        <td>{collision.date}</td>
                        <td>{collision.driverName}</td>
                        <td>{collision.time}</td>
                        <td>{collision.location}</td>
                        <td>{collision.speedMPH}</td>
                        <td>{collision.brakingMS2}</td>
                        {/* <td>{collision.collisionType}</td> */}
                        <td>{collision.severity}</td>
                        <td style={{fontSize:"12px"}}>{collision.collisionType}</td>
                        <td>
                            <img src="/images/note.png" className='note-ic' onClick={(event) => handleIconClick(collision.description, event)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showPopup && (
                <div className="popup" style={{ position: 'absolute', top: popupPosition.y, left: popupPosition.x }}>
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <p className='pp'>{popupContent}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
         )}
    </div>
    );
}

export default UsagePage;
