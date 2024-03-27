import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import './Driver.css'

function DriverPage({updateHeader, updateButton,driverId}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const driverNo = queryParams.get('driverId');
    const [selectedDriverNo, setSelecteDriverNo] = useState(driverNo || '');

    const [drivers, setDrivers] = useState([]);
    const [heartRates, setHeartRates] = useState([]);
    useEffect(() => {
        updateHeader('Driver');
        updateButton('Driver');
        fetchDriversData();
    }, [updateHeader, updateButton]);

    driverId=1;

    const fetchDriversData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/drivers');
            if (!response.ok) {
                throw new Error('Failed to fetch drivers data');
            }
            const driversData = await response.json();
            setDrivers(driversData);
        } catch (error) {
            console.error('Error fetching drivers data:', error);
        }
    };

    
    useEffect(() => {
        const fetchDriverHealth = async () => {
            try {
                const response = await fetch(`/api/driver-health/${driverId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch driver health');
                }
                const data = await response.json();
                setDHealthData(data);
            } catch (error) {
                console.error('Error fetching driver health:', error);
            }
        };

        fetchDriverHealth();

    }, [selectedDriverId]);

    useEffect(() => {
        handleHeartRateClick(selectedDriverId);
        handleFatigueLevelClick(selectedDriverId);
        handleBodyTempClick(selectedDriverId);
        handleHydrationLevelClick(selectedDriverId);
        handleStressLevelClick(selectedDriverId);
    
        // Fetch data every 5 minutes
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/driver-health/${selectedDriverId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch driver health');
                }
                const driverHealthData = await response.json();
                setDHealthData(driverHealthData);
                setHeartRates(prevHeartRates => [...prevHeartRates, driverHealthData.heartRate]);
                setHeartRates(heartRates.slice(-100));
                setFatigueLevels(prevFatigueLevels => [...prevFatigueLevels, driverHealthData.fatigueLevel]);
                setFatigueLevels(fatigueLevels.slice(-100));
                setBodyTemps(prevBodyTemps => [...prevBodyTemps, driverHealthData.bodyTemp]);
                setBodyTemps(bodyTemps.slice(-100));
                setHydrationLevels(prevHydrationLevels => [...prevHydrationLevels, driverHealthData.hydrationLevel]);
                setHydrationLevels(hydrationLevels.slice(-100));
                setStressLevels(prevStressLevels => [...prevStressLevels, driverHealthData.stressLevel]);
                setStressLevels(stressLevels.slice(-100));
            } catch (error) {
                console.error('Error fetching driver health:', error);
            }
        }, 1* 60 * 1000); // 5 minutes in milliseconds
    
        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [selectedDriverId]); // Include selectedDriverId in the dependency array

    const handleHeartRateClick = async (driverId) => {
        // setSelectedDriverId(driverId);
        try {
            const response = await fetch(`http://localhost:3000/api/driver-health/${driverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setHeartRates(prevHeartRates => [...prevHeartRates, driverHealthData.heartRate]);
            // const heartRatesData = [driverHealthData.heartRate, driverHealthData.heartRate, driverHealthData.heartRate ];
            // heartRates.push(driverHealthData.heartRate);
            // heartRates = heartRates.slice(-10);
            // setHeartRates(heartRates.slice(-100));
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }

        setGraphData(heartRates);
        setMin(50);
        setMax(150);
        setStepSize(10);
        setYLabel('Heart Rate');
    };

    const handleFatigueLevelClick = async (driverId) => {
        // setSelectedDriverId(driverId);
        try {
            const response = await fetch(`http://localhost:3000/api/driver-health/${driverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setFatigueLevels(prevFatigueLevels => [...prevFatigueLevels, driverHealthData.fatigueLevel]);
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }

        setGraphData(fatigueLevels);
        setMin(0);
        setMax(5);
        setStepSize(1);
        setYLabel('Fatigue Level');
    };

    const handleBodyTempClick = async (driverId) => {
        // setSelectedDriverId(driverId);
        try {
            const response = await fetch(`http://localhost:3000/api/driver-health/${driverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setBodyTemps(prevBodyTemps => [...prevBodyTemps, driverHealthData.bodyTemp]);
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }

        setGraphData(bodyTemps);
        setMin(50);
        setMax(150);
        setStepSize(10);
        setYLabel('Body Temperature');
    };

    const handleHydrationLevelClick = async (driverId) => {
        // setSelectedDriverId(driverId);
        try {
            const response = await fetch(`http://localhost:3000/api/driver-health/${driverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setHydrationLevels(prevHydrationLevels => [...prevHydrationLevels, driverHealthData.hydrationLevel]);
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }

        setGraphData(hydrationLevels);
        setMin(0);
        setMax(100);
        setStepSize(20);
        setYLabel('Hydration Level');
    };

    const handleStressLevelClick = async (driverId) => {
        // setSelectedDriverId(driverId);
        try {
            const response = await fetch(`http://localhost:3000/api/driver-health/${driverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setStressLevels(prevStressLevels => [...prevStressLevels, driverHealthData.stressLevel]);
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }

        setGraphData(stressLevels);
        setMin(0);
        setMax(5);
        setStepSize(1);
        setYLabel('Stress Level');
    };

    const data = {
        labels: Array.from({ length: heartRates.length }, (_, i) => i + 1),
        datasets: [
            {
                label: 'Heart Rate',
                data: heartRates,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    // const options = {
    //     scales: {
    //         x: {
    //             type: 'category', // Use 'linear' for a numeric x-axis
    //             title: {
    //                 display: true,
    //                 text: 'Time' // Label for the x-axis
    //             }
    //         },
    //         y: {
    //             title: {
    //                 display: true,
    //                 text: 'Heart Rate' // Label for the y-axis
    //             }
    //         }
    //     }
    // };

    return (
        <div className='d-main'>
            <div className='d-card'>
                <table className='d-table'>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Driver No</th>
                            <th>Driver Name</th>
                            <th>Known Health Issues</th>
                            <th>Experience</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {drivers.map((driver, index) => (
                            <tr key={index} className={driver.driverId === selectedDriverNo ? 'selected-row' : ''}>
                                <td>{index + 1}</td>
                                <td>{driver.driverId}</td>
                                <td>{driver.driverName}</td>
                                <td>{driver.knownHealthIssues}</td>
                                <td>{driver.experience}</td>
                                <td>{driver.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-below'>
            <div className='d-mainprofile'>
                    <div className="d-content">
                        <span className='d-tv'>Health Parameters</span>
                            <div className='d-access'>
                                <div className='d-details'>
                                <div className='table-container'>
                                    <table className='dr-table'>
                                        <tbody>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/hr.png" className="dh-icon" /><Link onClick={() => handleHeartRateClick(selectedDriverId)} className='dclick'>HEART RATE</Link></span></td>
                                                <td className='hp-text'>80/100 BPM</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/fl.png" className="dh-icon" /><Link onClick={() => handleFatigueLevelClick(selectedDriverId)}className='dclick'>FATIGUE LEVEL</Link></span></td>
                                                <td className='hp-text'>Well Rested</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/bt.png" className="dh-icon" /><Link onClick={() => handleBodyTempClick(selectedDriverId)} className='dclick'>BODY TEMP</Link></span></td>
                                                <td className='hp-text'>/ 37 C</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/hl.png" className="dh-icon" /><Link onClick={() => handleHydrationLevelClick(selectedDriverId)}className='dclick'>HYDRATION LEVEL</Link></span></td>
                                                <td className='hp-text'>Well Hydrated</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/sl.png" className="dh-icon" /><Link onClick={() => handleStressLevelClick(selectedDriverId)} className='dclick'>STRESS LEVEL</Link></span></td>
                                                <td className='hp-text'>Low Stress Level</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div className='dtr-details'>
                                    <button className='dtr-map'>Alert Driver !</button>
                                </div>
                            </div>
                    </div>
                    
                </div>
                <div className='dr2-mainprofile'>
                    <div className="dr2-content">
                        <div className='dr2-access'>
                            <div className='dr2-details'>
                            <div className='dr2-table-container'>
                               
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default DriverPage;