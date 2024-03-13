import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Efficiency.css'

function EfficiencyPage({updateHeader, updateButton}) {
    const [truckData, setTruckData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);

    useEffect(() => {
        updateHeader('Truck Control / Efficiency');
        updateButton('Efficiency');
    }, [updateHeader, updateButton]);
    const fetchTruckData = async () => {
        const response = await fetch('apiUrl');
        const data = await response.json();
        setTruckData(data);
    };
    useEffect(() => {
        fetchTruckData();
    }, []);

    const handleRowClick = (truckNo) => {
        const selectedRow = truckData.find(truck => truck.truckNo === truckNo);
        setSelectedRowData(selectedRow);
    };
    return (
        <div className='mains'>
            <div className='ef-card'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Truck No</th>
                            <th>Service History</th>
                            <th>Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {truckData.map((truck, index) => (
                            <tr key={index} onClick={() => handleRowClick(truck.truckNo)}>
                                <td>{index + 1}</td>
                                <td>{truck.truckNo}</td>
                                <td><Link to={`/track/${truck.service}`} className='click'>Click Here</Link></td>
                                <td>{truck.level}</td>
                                <td>{truck.status === 'yes' ? <img src="/images/yes.png" alt="Yes" className="status-image" /> : <img src="/images/no.png" alt="No" className="status-image"/>}</td>
                            </tr>
                        ))}
                </tbody>
                </table>
            </div>
            <div className='e-below'>
                <div className='e-mainprofile'>
                    <div className="e-content">
                        <div className='e-access'>
                            <div className='e-details'>
                                <p><strong>Truck Number : </strong></p>
                                <p className="flex-container">
                                    <span><strong>Driver :</strong> </span>
                                    <span className="align-right"><strong>Speed :</strong></span>
                                </p>
                                <p className="flex-container">
                                    <span><strong>Fuel System Status :</strong> </span>
                                    <span className="align-right"><strong>Fuel Pressure :</strong></span>
                                </p>
                                <p><strong>Gas Emissions : </strong></p>
                            </div>
                            <Link to="" className='click'>Click here for More</Link>
                        </div>
                        <div className='r-details'>
                            <span className='maint'>Mark for Maintenance 
                            <label class="switch">
                                <input type="checkbox" />
                                <span class="slider round"></span>
                            </label>
                            </span>
                            <button className='alerts'>Alert Driver</button>
                        </div>
                    </div>
                </div>
                <div className='t-mainprofile'>
                    <div className="t-content">
                        <span className='tv'>Threshold Values</span>
                            <div className='t-access'>
                                <div className='t-details'>
                                <div className='table-container'>
                                    <table className='t-table'>
                                        <tbody>
                                            <tr>
                                                <td>CO</td>
                                                <td>20.7 g / bhp - hr</td>
                                            </tr>
                                            <tr>
                                                <td>N0x</td>
                                                <td>0.2  g / bhp - hr</td>
                                            </tr>
                                            <tr>
                                                <td>HC</td>
                                                <td>1.3 g / bhp - hr</td>
                                            </tr>
                                            <tr>
                                                <td>PM</td>
                                                <td>0.01 g / bhp - hr</td>
                                            </tr>
                                            <tr>
                                                <td>Engine Coolant</td>
                                                <td>195°F to 220°F</td>
                                            </tr>
                                            <tr>
                                                <td>Fuel Pressure</td>
                                                <td>30 - 80 PSI</td>
                                            </tr>
                                            <tr>
                                                <td>Intake Air</td>
                                                <td>-40°F to 212°F</td>
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

export default EfficiencyPage;
