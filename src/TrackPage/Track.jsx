import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './Track.css'

function TrackPage({updateHeader, updateButton}) {

    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);

    const startCoordinates = { lat: 37.7749, lng: -122.4194 };
    const endCoordinates = { lat: 34.0522, lng: -118.2437 };

    useEffect(() => {
        updateHeader('Track');
        updateButton('Track');
    }, [updateHeader, updateButton]);

    const handleOpenMaps = () => {
        if (startCoordinates && endCoordinates) {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${startCoordinates.lat},${startCoordinates.lng}&destination=${endCoordinates.lat},${endCoordinates.lng}&travelmode=driving`;
          window.open(url, '_blank');
        }
      };
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
                            <th>Location Status</th>
                            <th> Beacon</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div className='tr-below'>
                <div className='tr-mainprofile'>
                    <div className="tr-content">
                        <div className='tr-access'>
                            <div className='e-details' id="map">
                                {/* Map */}
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
                            <div className='tra-table-container'>
                                <table className='tra-table'>
                                    <tbody>
                                    <tr>
                                            <td><strong>Source</strong></td>
                                            <td><strong>:</strong></td>
                                            <td>GPS</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Driver Id</strong></td>
                                            <td><strong>:</strong></td>
                                            <td><Link className='click'>6534262738</Link></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Destination Id</strong></td>
                                            <td><strong>:</strong></td>  
                                            <td>4262222738</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Truck Condition</strong></td>
                                            <td><strong>:</strong></td>
                                            <td><Link className='click'>click here</Link></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Status</strong></td>
                                            <td><strong>:</strong></td>
                                            <td>on time</td>
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
        </div>
    );
}

export default TrackPage;
