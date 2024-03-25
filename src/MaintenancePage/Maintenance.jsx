import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Maintenance.css'

function MaintenancePage({updateHeader, updateButton}) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const truckNo = queryParams.get('truckNo');
    const [selectedTruckNo, setSelectedTruckNo] = useState(truckNo || '');

    const [engineHealthData, setEngineHealthData] = useState([]);
    const [brakeSystemData, setBrakeSystemData] = useState([]);
    const [fuelSystemData, setFuelSystemData] = useState([]); // State to store fuel system data
    const [tireHealthData, setTireHealthData] = useState([]); // State to store tire health data
    const [batteryStatusData, setBatteryStatusData] = useState([]); // State to store battery status data
    const [transmissionData, setTransmissionData] = useState([]); // State to store transmission data

    const [activeButton, setActiveButton] = useState('Engine Health');

    useEffect(() => {
        updateHeader('Maintenance');
        updateButton('Maintenance');

        // Fetch engine health data when the component mounts
        fetchEngineHealthData();
        fetchBrakeSystemData();
        fetchFuelSystemData(); // Fetch fuel system data
        fetchTireHealthData();
        fetchBatteryStatusData(); // Fetch battery status data
        fetchTransmissionData(); // Fetch transmission data

    }, [updateHeader, updateButton]);

    const fetchEngineHealthData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/engine-health');
            if (!response.ok) {
                throw new Error('Failed to fetch engine health data');
            }
            const data = await response.json();
            setEngineHealthData(data);
        } catch (error) {
            console.error('Error fetching engine health data:', error);
            // Handle error (e.g., display error message)
        }
    };

    const fetchBrakeSystemData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/brake-system');
            if (!response.ok) {
                throw new Error('Failed to fetch brake system data');
            }
            const data = await response.json();
            setBrakeSystemData(data);
        } catch (error) {
            console.error('Error fetching brake system data:', error);
            // Handle error (e.g., display error message)
        }
    };

    const fetchFuelSystemData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/fuel-system');
            if (!response.ok) {
                throw new Error('Failed to fetch fuel system data');
            }
            const data = await response.json();
            setFuelSystemData(data); // Set fuel system data in state
        } catch (error) {
            console.error('Error fetching fuel system data:', error);
            // Handle error (e.g., display error message)
        }
    };

    const fetchTireHealthData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tire-health');
            if (!response.ok) {
                throw new Error('Failed to fetch tire health data');
            }
            const data = await response.json();
            setTireHealthData(data);
        } catch (error) {
            console.error('Error fetching tire health data:', error);
            // Handle error (e.g., display error message)
        }
    };

    const fetchBatteryStatusData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/battery-status');
            if (!response.ok) {
                throw new Error('Failed to fetch battery status data');
            }
            const data = await response.json();
            setBatteryStatusData(data); // Set battery status data in state
        } catch (error) {
            console.error('Error fetching battery status data:', error);
            // Handle error (e.g., display error message)
        }
    };

    const fetchTransmissionData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/transmission');
            if (!response.ok) {
                throw new Error('Failed to fetch transmission data');
            }
            const data = await response.json();
            setTransmissionData(data); // Set transmission data in state
        } catch (error) {
            console.error('Error fetching transmission data:', error);
            // Handle error (e.g., display error message)
        }
    };


    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }
    return (
    <div className='ma-main'>
        <div className='m-topcards'> 
            <div className={`m-scard ${activeButton === 'Engine Health' ? 'active' : ''}`}>
                <button className='m-scard-button' onClick={() => handleButtonClick('Engine Health')}>
                    <Link className='m-scard-link'>
                        <img src="/images/eh.png" alt="Home" className="m-scard-icon" />
                        <span className="m-scard-text">Engine Health</span>
                    </Link>
                </button>
            </div>
            <div className={`m-scard ${activeButton === 'Brake System' ? 'active' : ''}`}>
                <button className='m-scard-button' onClick={() => handleButtonClick('Brake System')}>
                    <Link className='m-scard-link'>
                        <img src="/images/bs.png" alt="Home" className="m-scard-icon" />
                        <span className="m-scard-text">Brake System</span>
                    </Link>
                </button>
            </div>
            <div className={`m-scard ${activeButton === 'Fuel System' ? 'active' : ''}`}>
                <button className='m-scard-button' onClick={() => handleButtonClick('Fuel System')}>
                    <Link className='m-scard-link'>
                        <img src="/images/fs.png" alt="Home" className="m-scard-icon" />
                        <span className="m-scard-text">Fuel System</span>
                    </Link>
                </button>
            </div>
            <div className={`m-scard ${activeButton === 'Tire Health' ? 'active' : ''}`}>
                <button className='m-scard-button' onClick={() => handleButtonClick('Tire Health')}>
                    <Link className='m-scard-link'>
                        <img src="/images/th.png" alt="Home" className="m-scard-icon" />
                        <span className="m-scard-text">Tire Health</span>
                    </Link>
                </button>
            </div>
            <div className={`m-scard ${activeButton === 'Battery Status' ? 'active' : ''}`}>
                <button className='m-scard-button' onClick={() => handleButtonClick('Battery Status')}>
                    <Link className='m-scard-link'>
                        <img src="/images/bts.png" alt="Home" className="m-scard-icon" />
                        <span className="m-scard-text">Battery Status</span>
                    </Link>
                </button>
            </div>
            <div className={`m-scard ${activeButton === 'Transmission' ? 'active' : ''}`}>
                <button className='m-scard-button' onClick={() => handleButtonClick('Transmission')}>
                    <Link className='m-scard-link'>
                        <img src="/images/tr.png" alt="Home" className="m-scard-icon" />
                        <span className="m-scard-text">Transmission</span>
                    </Link>
                </button>
            </div>
        </div>
        {activeButton === 'Engine Health' && (
        <div className='ma-card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>RMP</th>
                        <th>Engine Temperature</th>
                        <th>Oil Pressure</th>
                        <th>Coolant Temp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {engineHealthData.map((engine, index) => (
                                 <tr key={index} className={engine.truckId === selectedTruckNo ? 'selected-row' : ''}>
                                    <td>{engine.truckId}</td>
                                    <td>{engine.RPM}</td>
                                    <td>{engine.engineTemperature}</td>
                                    <td>{engine.oilPressure}</td>
                                    <td>{engine.coolantTemperature}</td>
                                    <td>{engine.status}</td>
                                </tr>
                        ))}
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Brake System' && (
        <div className='ma-card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Model</th>
                        <th>Pad Wear</th>
                        <th>Fluid Level</th>
                        <th>Pressure</th>
                        <th>ABS Status</th>
                    </tr>
                </thead>
                <tbody>
                {brakeSystemData.map((brake, index) => (
                                <tr key={index} className={brake.truckId === selectedTruckNo ? 'selected-row' : ''}>
                                    <td>{brake.truckId}</td>
                                    <td>{brake.truckName}</td>
                                    <td>{brake.padWear}</td>
                                    <td>{brake.fluidLevel}</td>
                                    <td>{brake.pressure}</td>
                                    <td>{brake.absStatus}</td>
                                </tr>
                        ))}
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Fuel System' && (
        <div className='ma-card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Model</th>
                        <th>Fuel Level</th>
                        <th>Fuel Consumption Rate</th>
                        <th>Fuel Efficiency</th>
                    </tr>
                </thead>
                <tbody>
                {fuelSystemData.map((fuel, index) => (
                    <tr key={index} className={fuel.truckId === selectedTruckNo ? 'selected-row' : ''}>
                        <td>{fuel.truckId}</td>
                        <td>{fuel.truckName}</td>
                        <td>{fuel.fuelLevel}</td>
                        <td>{fuel.fuelConsumptionRate}</td>
                        <td>{fuel.fuelEfficiency}</td>
                    </tr>
                ))} 
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Tire Health' && (
        <div className='ma-card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Model</th>
                        <th>Tire Pressure</th>
                        <th>Temperature</th>
                        <th>Tire Depth</th>
                        <th>Tire Age</th>
                    </tr>
                </thead>
                <tbody>
                {tireHealthData.map((tire, index) => (
                            <tr key={index} className={tire.truckId === selectedTruckNo ? 'selected-row' : ''}>
                                <td>{tire.truckId}</td>
                                <td>{tire.truckName}</td>
                                <td>{tire.tirePressure}</td>
                                <td>{tire.tireTemperature}</td>
                                <td>{tire.tireDepth}</td>
                                <td>{tire.tireAge}</td>
                            </tr>
                        ))}  
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Battery Status' && (
        <div className='ma-card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Model</th>
                        <th>Battery (V)</th>
                        <th>Charge Status</th>
                        <th>Health %</th>
                        <th>Last Replace</th>
                    </tr>
                </thead>
                <tbody>
                {batteryStatusData.map((battery, index) => (
                                <tr key={index} className={battery.truckId === selectedTruckNo ? 'selected-row' : ''}>
                                    <td>{battery.truckId}</td>
                                    <td>{battery.truckName}</td>
                                    <td>{battery.batteryVoltage}</td>
                                    <td>{battery.chargeStatus}</td>
                                    <td>{battery.healthPercentage}</td>
                                    <td>{new Date(battery.lastReplace).toLocaleDateString()}</td>
                                </tr>
                            ))}  
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Transmission' && (
        <div className='ma-card'>
           <table className='table'>
               <thead>
                   <tr>
                       <th>Truck No</th>
                       <th>RMP</th>
                       <th>Engine Temp</th>
                       <th>Oil Pressure</th>
                       <th>Coolant Temp</th>
                       <th>Status</th>
                   </tr>
               </thead>
               <tbody>
               {transmissionData.map((transmission, index) => (
                                <tr key={index} className={transmission.truckId === selectedTruckNo ? 'selected-row' : ''}>
                                    <td>{transmission.truckId}</td>
                                    <td>{transmission.RPM}</td>
                                    <td>{transmission.engineTemperature}</td>
                                    <td>{transmission.oilPressure}</td>
                                    <td>{transmission.coolantTemperature}</td>
                                    <td>{transmission.status}</td>
                                </tr>
                            ))}
               </tbody>
           </table>
        </div>
         )}
    </div>
    );
}

export default MaintenancePage;
