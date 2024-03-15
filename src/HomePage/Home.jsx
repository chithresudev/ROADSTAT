import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function HomePage({updateHeader,updateButton}) {
    const [currentTime, setCurrentTime] = useState('');
    const [weather, setWeather] = useState('');
    const [truckData, setTruckData] = useState([]);
    const [activeButton, setActiveButton] = useState('trucks');

    useEffect(() => {
        updateHeader('Home');
        updateButton('Home');
    }, [updateHeader, updateButton]);


    useEffect(() => {
        const fetchWeather = async () => {
            setWeather('15° C'); 
        };
        const updateCurrentTime = () => {
            const date = new Date();
            const formattedTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? 'pm' : 'am'}`;
            setCurrentTime(formattedTime);
        };

        const fetchTruckData = async () => {
            const response = await fetch('apiUrl');
            const data = await response.json();
            setTruckData(data);
        };

        fetchWeather();
        fetchTruckData();

        updateCurrentTime();
        const interval = setInterval(() => {
            updateCurrentTime();
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    return (
    <div className='main'>
        <div className='info-bar'>
            <div className='info'>
                <img src="/images/clock.png" alt="Home" className="info-icon" />
                <span className="info-text">{currentTime}</span>
            </div>
            <div className='info'>
                <img src="/images/weather.png" alt="Home" className="info-icon" />
                <span className="info-text">{weather}</span>
            </div>
        </div>
        <div className='topcards'> 
            <div className={`scard ${activeButton === 'trucks' ? 'active' : ''}`}>
                <button className='scard-button' onClick={() => handleButtonClick('trucks')}>
                    <Link className='scard-link'>
                        <img src="/images/truck.png" alt="Home" className="scard-icon" />
                        <span className="scard-text">Trucks</span>
                    </Link>
                </button>
            </div>
            <div className={`scard ${activeButton === 'warnings' ? 'active' : ''}`}>
                <button className='scard-button' onClick={() => handleButtonClick('warnings')}>
                    <Link className='scard-link'>
                        <img src="/images/warning.png" alt="Home" className="scard-icon" />
                        <span className="scard-text">Warnings</span>
                    </Link>
                </button>
            </div>
            <div className={`scard ${activeButton === 'alerts' ? 'active' : ''}`}>
                <button className='scard-button' onClick={() => handleButtonClick('alerts')}>
                    <Link className='scard-link'>
                        <img src="/images/alert.png" alt="Home" className="scard-icon" />
                        <span className="scard-text">Alerts</span>
                    </Link>
                </button>
            </div>
        </div>
        {activeButton === 'trucks' && (
        <div className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Truck No</th>
                        <th>Driver Id</th>
                        <th>Location</th>
                        <th>Incidents</th>
                        <th>Status</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {truckData.map((truck, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{truck.truckNo}</td>
                            <td>{truck.driverId}</td>
                            <td><Link to={`/track/${truck.truckNo}`} className='click'>Click Here</Link></td>
                            <td>{truck.incidents}</td>
                            <td>{truck.status === 'yes' ? <img src="/images/yes.png" alt="Yes" className="status-image" /> : <img src="/images/no.png" alt="No" className="status-image"/>}</td>
                            <td>{truck.note}</td>
                        </tr>
                    ))}
            </tbody>
            </table>
        </div>
        )}
        {activeButton === 'warnings' && (
                <div className='card'>
                    <p>No warnings</p>
                </div>
        )}
        {activeButton === 'alerts' && (
            <div className='card'>
                <p>No alerts</p>
            </div>
        )}
    </div>
    );
}

export default HomePage;
