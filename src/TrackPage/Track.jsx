import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './Track.css';
import DMapComponent from './DMapComponent';

const apiUrl = import.meta.env.VITE_API_URL;

function TrackPage({updateHeader, updateButton}) {

    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [trackData, setTrackData] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0); 
    const [selectedTruckNo, setSelectedTruckNo] = useState(null);
    const [truckLocations, setTruckLocations] = useState([]);
    const [truckDestinations, setTruckDestinations] = useState([]);
    const [showRunningOnly, setShowRunningOnly] = useState(false);

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

    const fetchData = async () => {
        try {
            // const response = await fetch('http://localhost:3000/api/track-location');
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
            // const locationsResponse = await fetch(`http://localhost:3000/api/truck-location/${truckId}`);
            const locationsResponse = await fetch(`${apiUrl}/truck-location/${truckId}`);
            // const destinationsResponse = await fetch(`http://localhost:3000/api/destinations/${truckId}`);
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
    };

    useEffect(() => {
        if (selectedTruckNo) {
            fetchTruckLocationsAndDestinations(selectedTruckNo);
        }
    }, [selectedTruckNo]);

    const filteredTrackData = showRunningOnly ? trackData.filter(item => item.locationStatus === 'Running') : trackData;

    return (
        <div className='tr-main'>
            <div className='tr-card'>
                <table className='tr-table'>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Truck No</th>
                            <th>Trailer No</th>
                            <th>GPS</th>
                            <th>Strength</th>
                            <th>Location Status
                                <input type="checkbox" className='ckbox'
                                    checked={showRunningOnly}
                                    onChange={(e) => setShowRunningOnly(e.target.checked)}/>
                            </th>
                            <th> Beacon</th>
                        </tr>
                    </thead>
                    <tbody>
                            {filteredTrackData.map((trackLocation, index) => (
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
            <div className='tr-below'>
                <div className='tr-mainprofile'>
                    <div className="tr-content">
                        <div className='tr-access'>
                            <div className='e-details' id="map" style={{paddingLeft:"0px",paddingRight:"0px",overflow: "hidden"}}>
                                {(truckLocations && truckDestinations) && (
                                    <DMapComponent truckLocations={truckLocations} truckDestinations={truckDestinations} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='tr-details'>
                        <button className='tr-map' onClick={handleOpenMaps}>Open with Maps</button>
                    </div>
                </div>
                <div className='tra-mainprofile'>
                    <div className="tra-content">
                        <div className='tra-access'>
                            <div className='tra-details'>
                            <table className='tra-table'>
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
                                        <td><strong>Destination Id</strong></td>
                                        <td><strong>:</strong></td>
                                        <td>{truckDestinations.destinationId ? truckDestinations.destinationId : '-'}</td> 
                                    </tr>
                                    <tr>
                                        <td><strong>Truck Condition</strong></td>
                                        <td><strong>:</strong></td>
                                        <td><Link to={`/maintenance?truckNo=${truckDestinations.truckId}`} className='click'>Click Here</Link></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status</strong></td>
                                        <td><strong>:</strong></td>
                                        <td>{truckDestinations.status}</td>
                                    </tr>
                                    <tr>
                                        <td><Link className='click'>Trailer Location</Link></td>
                                        <td></td>
                                        <td><button className='tra-al-button'>Alert ?</button></td>
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
