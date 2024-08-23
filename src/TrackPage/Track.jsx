import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './Track.css';
import DMapComponent from './DMapComponent';

const apiUrl = import.meta.env.VITE_API_URL;

function TrackPage({updateHeader, updateButton}) {
    const [popupVisible, setPopupVisible] = useState(false); 
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [trackData, setTrackData] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0); 
    const [selectedTruckNo, setSelectedTruckNo] = useState(null);
    const [truckLocations, setTruckLocations] = useState([]);
    const [truckDestinations, setTruckDestinations] = useState([]);
    const [showRunningOnly, setShowRunningOnly] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const truckNo = queryParams.get('truckNo');
    const [searchedTruckNo, setSearchedTruckNo] = useState(truckNo || '');

    useEffect(() => {
        updateHeader('Track');
        updateButton('Track');
        

        fetchData();
    }, [updateHeader, updateButton]);

    useEffect(() => {
        if (trackData.length > 0) {
            const firstTruckNo = trackData[0].truckId;
            setSelectedTruckNo(firstTruckNo);
            fetchTruckLocationsAndDestinations(firstTruckNo);
        }
    }, [trackData]);

    useEffect(() => {
        if (searchedTruckNo) {
            const foundIndex = trackData.findIndex(trackLocation => trackLocation.truckId === searchedTruckNo);
            if (foundIndex !== -1) {
                setSelectedRowIndex(foundIndex);
                setSelectedTruckNo(searchedTruckNo);
                fetchTruckLocationsAndDestinations(searchedTruckNo);
            }
        }
    }, [searchedTruckNo, trackData]);
    
    const handleAlertButtonClick = () => {
        setPopupVisible(true); // Set popupVisible to true
        // Fetch additional data or perform any necessary actions here
        const alertMessage = `Truck Number: ${selectedTruckNo}`;
        alert(alertMessage);
    };
    

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/track-location`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTrackData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleOpenMaps = () => {
        if (truckLocations && truckDestinations) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${truckLocations.latitude},${truckLocations.longitude}&destination=${truckDestinations.latitude},${truckDestinations.longitude}&travelmode=driving`;
            window.open(url, '_blank');
        }
    };

    const fetchTruckLocationsAndDestinations = async (truckId) => {
        try {
            const locationsResponse = await fetch(`${apiUrl}/truck-location/${truckId}`);
            const destinationsResponse = await fetch(`${apiUrl}/destinations/${truckId}`);
            if (!locationsResponse.ok || !destinationsResponse.ok) {
                throw new Error('Failed to fetch truck locations or destinations');
            }

            const locationsData = await locationsResponse.json();
            const destinationsData = await destinationsResponse.json();

            setTruckLocations(locationsData);
            setTruckDestinations(destinationsData);
        } catch (error) {
            console.error('Error fetching truck locations or destinations:', error);
            setTruckLocations([]);
            setTruckDestinations([]);
        }
    };

    const handleRowClick = (index, truckId) => {
        setSelectedRowIndex(index);
        setSelectedTruckNo(truckId);
        setSearchedTruckNo('');
    };

    
    const filteredTrackData = showRunningOnly ? trackData.filter(item => item.locationStatus === 'Running') : trackData;
    const searchedTruckIndex = filteredTrackData.findIndex(trackLocation => trackLocation.truckId === searchedTruckNo);
    let sortedTrackData = [...filteredTrackData];

    useEffect(() => {
        if (selectedTruckNo) {
            fetchTruckLocationsAndDestinations(selectedTruckNo);
        }
    }, [selectedTruckNo]);

    useEffect(() => {
        if (searchedTruckNo) {
            const foundIndex = sortedTrackData.findIndex(trackLocation => trackLocation.truckId === searchedTruckNo);
            if (foundIndex !== -1) {
                setSelectedRowIndex(foundIndex);
            }
        }
    }, [searchedTruckNo, sortedTrackData]);
    

    if (searchedTruckIndex !== -1) {
        const searchedTruck = sortedTrackData.splice(searchedTruckIndex, 1)[0];
        sortedTrackData = [searchedTruck, ...sortedTrackData];
    }

    

    return (
        <div className='track_page'>
            <div className='track-card'>
                <table className='track-table'>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Vehicle No</th>
                            <th>Trailer No</th>
                            <th>GPS</th>
                            <th>Strength</th>
                            <th>Location Status
                                <input type="checkbox" className='chkbox'
                                    checked={showRunningOnly}
                                    onChange={(e) => setShowRunningOnly(e.target.checked)}/>
                            </th>
                            <th> Beacon</th>
                        </tr>
                    </thead>
                    <tbody>
                            {sortedTrackData.map((trackLocation, index) => (
                            <tr 
                                key={index}
                                className={selectedRowIndex === index ? 'selected' : ''}
                                onClick={() => handleRowClick(index, trackLocation.truckId)}
                            >
                                <td>{index + 1}</td>
                                <td>{trackLocation.truckId}</td>
                                <td>{trackLocation.trailerId}</td>
                                <td>{trackLocation.gps ? 'Enabled' : 'Disabled'}</td>
                                <td>{trackLocation.strength}</td>
                                <td>{trackLocation.locationStatus}</td>
                                <td>{trackLocation.beacon ? 'Enabled' : 'Disabled'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='track-below'>
                <div className='track-mainprofile'>
                    <div className="track-content">
                        <div className='track-access'>
                            <div className='e-details' id="map">
                                {(truckLocations && truckDestinations) && (
                                    <DMapComponent truckLocations={truckLocations} truckDestinations={truckDestinations} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='track-details'>
                        <button className='track-map' onClick={handleOpenMaps}>Open with Maps</button>
                    </div>
                </div>
                <div className='track-mainprofile'>
                    <div className="track-content">
                        <div className='track-access'>
                            <div className='track-details'>
                            <table className='track-table'>
                            <tbody>
                                    <tr>
                                        <td><strong>Source</strong></td>
                                        <td><strong>:</strong></td>
                                        <td>{truckDestinations.source}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Driver Id</strong></td>
                                        <td><strong>:</strong></td>
                                        <td>
                                            <Link to={`/driver?driverId=${truckDestinations.driverId}`} className={truckDestinations.driverId ? 'click' : 'clickempty'}>
                                                {truckDestinations.driverId ? truckDestinations.driverId : '-'}
                                            </Link>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td><strong>Destination Name</strong></td>
                                        <td><strong>:</strong></td>
                                        <td>{truckDestinations.destinationName ? truckDestinations.destinationName : '-'}</td> 
                                    </tr>
                                    <tr>
                                        <td><strong>Vehicle Condition</strong></td>
                                        <td><strong>:</strong></td>
                                        <td><Link to={`/maintenance?truckNo=${truckDestinations.truckId}`} className='click'>Click Here</Link></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status</strong></td>
                                        <td><strong>:</strong></td>
                                        <td>{truckDestinations.status}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><button className='track-al-button' onClick={handleAlertButtonClick}>Alert ?</button></td>
                                    </tr>
                                </tbody>

                            </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackPage;
