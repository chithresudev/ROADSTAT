import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import './Home.css';
import MapComponent from './MapComponent';

const apiUrl = import.meta.env.VITE_API_URL;

function HomePage({updateHeader,updateButton}) {
    const [currentTime, setCurrentTime] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [truckData, setTruckData] = useState([]);
    const [activeButton, setActiveButton] = useState('trucks');
    const [truckLocations, setTruckLocations] = useState([]);
    const [filteredTruckData, setFilteredTruckData] = useState([]);
    const [mapKey, setMapKey] = useState(0);
    const [selectedTruckNo, setSelectedTruckNo] = useState(null);
    const open_weather_api = process.env.OPEN_WEATHER_API;

    useEffect(() => {
        updateHeader('Home');
        updateButton('Home');
    }, [updateHeader, updateButton]);


    useEffect(() => {
        const fetchWeather = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    // const apiKey = process.env.OPEN_WEATHER_API;
                    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API;
                    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                    try {
                        const response = await fetch(apiURL);
                        const data = await response.json();
                        const temperature = data.main.temp;
                        setWeather(`${temperature}° C`);
                        setWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
                    } catch (error) {
                        console.error('Error fetching weather data:', error);
                        setWeather('N/A');
                        setWeatherIcon('');
                    }
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
                setWeather('N/A');
                setWeatherIcon('');
            }
        };
        const updateCurrentTime = () => {
            const date = new Date();
            const formattedTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? 'pm' : 'am'}`;
            setCurrentTime(formattedTime);
        };

        const fetchTruckData = async () => {
            // const response = await fetch('http://localhost:3000/api/trucks');
            const response = await fetch(`${apiUrl}/trucks`);
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
    
    const handleButtonClick = async (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === "warnings") {
            await fetchTruckLocations();  
        } 
    };

    const handleMapButtonClick = async (truckNo) => {
        setActiveButton('warnings');
        if (truckNo) {
            await fetchTruckLocations();
            setSelectedTruckNo(truckNo);
        } 
    };

    const fetchTruckLocations = async () => {
        try {
            // const response = await fetch('http://localhost:3000/api/truck-location');
            const response = await fetch(`${apiUrl}/truck-location`);
            const data = await response.json();
            setTruckLocations(data);
        } catch (error) {
            console.error('Error fetching truck locations:', error);
            setTruckLocations([]);
        }
    };

    useEffect(() => {
        setFilteredTruckData(truckData);
    }, [truckData]);

    const handleStatusFilter = (status) => {
        const filteredData = truckData.filter(truck => truck.status === status);
        const otherData = truckData.filter(truck => truck.status !== status);
        setFilteredTruckData([...filteredData, ...otherData]);
    };
    
    return (
    <div className='main'>
        <div className='info-bar'>
            <div className='info'>
                <img src="/images/clock.png" alt="Home" className="info-icon" />
                <span className="info-text">{currentTime}</span>
            </div>
            <div className='info'>
                {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="info-icon" />}
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
                        <img src="/images/map.png" alt="Home" className="scard-icon" />
                        <span className="scard-text">Locations</span>
                    </Link>
                </button>
            </div>
            <div className={`scard ${activeButton === 'alerts' ? 'active' : ''}`}>
                <button className='scard-button' onClick={() => handleButtonClick('alerts')}>
                    <Link className='scard-link'>
                        <img src="/images/warning.png" alt="Home" className="scard-icon" />
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
                        <th>
                            Status
                            <img src="/images/sort.png" onClick={() => handleStatusFilter('Yes')} className='filter-button'/>
                        </th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTruckData.map((truck, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{truck.truckId}</td>
                            <td>{truck.driverId}</td>
                            <td><Link to="#" onClick={() => handleMapButtonClick(truck.truckId)} className='click'>Click Here</Link></td>
                            <td>{truck.incidents}</td>
                            <td>{truck.status === 'Yes' ? <img src="/images/yes.png" alt="Yes" className="status-image" /> : <img src="/images/no.png" alt="No" className="status-image"/>}</td>
                            <td>{truck.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}

        {activeButton === 'warnings' && (
            <div className='card' style={{paddingLeft:"0px",paddingRight:"0px",overflow: "hidden"}}>
                <MapComponent truckLocations={truckLocations} selectedTruckNo={selectedTruckNo}/>
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
