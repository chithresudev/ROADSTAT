import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import './Home.css';
import MapComponent from './MapComponent';

const apiUrl = import.meta.env.VITE_API_URL;

function HomePage({ updateHeader, updateButton }) {
    const [currentTime, setCurrentTime] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [truckData, setTruckData] = useState([]);
    const [activeButton, setActiveButton] = useState('trucks');
    const [truckLocations, setTruckLocations] = useState([]);
    const [filteredTruckData, setFilteredTruckData] = useState([]);
    const [mapKey, setMapKey] = useState(0);
    const [selectedTruckNo, setSelectedTruckNo] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const truckNo = queryParams.get('truckNo');
    const [searchedTruckNo, setSearchedTruckNo] = useState(truckNo || '');

    const open_weather_api = process.env.OPEN_WEATHER_API;
    const [alertData, setAlertData] = useState([]);

    useEffect(() => {
        updateHeader('Home');
        updateButton('Home');
    }, [updateHeader, updateButton]);


    useEffect(() => {
        const fetchWeather = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
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

    const fetchAlertData = async () => {
        try {
            const response = await fetch(`${apiUrl}/alerts`);
            const data = await response.json();
            setAlertData(data);
        } catch (error) {
            console.error('Error fetching alert data:', error);
            setAlertData([]);
        }
    };


    const handleButtonClick = async (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === "warnings") {
            await fetchTruckLocations();
        }
        else if (buttonName === "alerts") {
            await fetchAlertData(); // Fetch alert data when "Alerts" button is clicked
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

    useEffect(() => {
        setFilteredTruckData(truckData);
        const searchedTruckIndex = truckData.findIndex(truck => truck.truckId === searchedTruckNo);
        let sortedTruckData = [...truckData];
        if (searchedTruckIndex !== -1) {
            const searchedTruck = sortedTruckData.splice(searchedTruckIndex, 1)[0];
            sortedTruckData = [searchedTruck, ...sortedTruckData];
        }
        setFilteredTruckData(sortedTruckData);
    }, [truckData, searchedTruckNo]);

 
    const handleIconClick = (description, event) => {
        const iconRect = event.target.getBoundingClientRect();
        const popupX = iconRect.left + window.pageXOffset + 15;
        const popupY = iconRect.top + window.pageYOffset;
        const contentAfterIs = description.split('is')[1].trim();
        setShowPopup(true);
        setPopupContent(contentAfterIs);
        setPopupPosition({ x: popupX, y: popupY });
    };


    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupContent('');
    };

    const handleRowClick = (index, truckId) => {

        window.location.href = `/truckcontrol/usage?truckNo=${truckId}`;
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
                            <span className="scard-text">Vehicles</span>
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
                                <th>Vehicle No</th>
                                <th>Driver Id</th>
                                <th>Location</th>
                                <th>Incidents</th>
                                <th>
                                    Status
                                    <img src="/images/sort.png" onClick={() => handleStatusFilter('Yes')} className='filter-button' />
                                </th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTruckData.map((truck, index) => (
                                <tr key={index} className={truck.truckId === searchedTruckNo ? 'selected-row' : ''}>
                                    <td>{index + 1}</td>
                                    <td className='hovertable' onClick={() => handleRowClick(index, truck.truckId)}>{truck.truckId}</td>
                                    <td>{truck.driverId}</td>
                                    <td><Link to="#" onClick={() => handleMapButtonClick(truck.truckId)} className='click'>Click Here</Link></td>
                                    <td>{truck.incidents}</td>
                                    <td>{truck.status === 'Yes' ? <img src="/images/yes.png" alt="Yes" className="status-image" /> : <img src="/images/no.png" alt="No" className="status-image" />}</td>
                                    <td>{truck.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeButton === 'alerts' && (
                <div className='card'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Vehicle No</th>
                                <th>Metric</th>
                                <th>Message</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alertData.map((alert, index) => (
                                <tr key={index}>
                                    <td>{alert.truckId}</td>
                                    <td>{alert.metric}</td>
                                    <td>
                                        {alert.message.includes('is') ? (
                                            <>
                                                {alert.message.split('is')[0]}
                                                <img src="/images/note.png" className='note-ich' onClick={(event) => handleIconClick(alert.message, event)} />
                                            </>
                                        ) : (
                                            alert.message
                                        )}
                                    </td>
                                    <td>{alert.createdAt}</td>
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
            )}



            {activeButton === 'warnings' && (
                <div className='card' style={{ paddingLeft: "0px", paddingRight: "0px", overflow: "hidden" }}>
                    <MapComponent truckLocations={truckLocations} selectedTruckNo={selectedTruckNo} />
                </div>
            )}

        </div>
    );
}

export default HomePage;