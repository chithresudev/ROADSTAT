import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import './Driver.css'
import annotationPlugin from 'chartjs-plugin-annotation';

import Chart from "chart.js/auto";
import { LinearScale, TimeScale } from "chart.js";

Chart.register(LinearScale, TimeScale);
Chart.register(annotationPlugin);

const apiUrl = import.meta.env.VITE_API_URL;

function DriverPage({updateHeader, updateButton,driverId}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const driverNo = queryParams.get('driverId');
    const [selectedDriverNo, setSelectedDriverNo] = useState(driverNo || '');

    // const [healthData, setHealthData] = useState([]);
    const [dHealthData, setDHealthData] = useState([]);
    const [heartRates, setHeartRates] = useState([]);
    const [fatigueLevels, setFatigueLevels] = useState([]);
    const [bodyTemps, setBodyTemps] = useState([]);
    const [hydrationLevels, setHydrationLevels] = useState([]);
    const [stressLevels, setStressLevels] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState('');
    const [graphData, setGraphData] = useState(heartRates);
    const [min, setMin] = useState(50);
    const [max, setMax] = useState(150);
    const [stepSize, setStepSize] = useState(10);
    const [yLabel, setYLabel] = useState('');
    const chartRef = useRef(null);
    const [annotation, setAnnotation] = useState([]);

    const [drivers, setDrivers] = useState([]);

    let [flag, setFlag] = useState(0);

    useEffect(() => {
        updateHeader('Driver');
        updateButton('Driver');
        fetchDriversData();

        // Setting up polling to fetch heart rate data every 10 seconds
        // (10000 milliseconds). Adjust the interval as needed.
        const intervalId = setInterval(() => {
            if (flag == 1) {
                handleHeartRateClick();
            }
            if (flag == 2) {
                handleFatigueLevelClick();
            }
            if (flag == 3) {
                handleBodyTempClick();
            }
            if (flag == 4) {
                handleHydrationLevelClick();
            }
            if (flag == 5) {
                handleStressLevelClick();
            }
        }, 10000);

        // Cleanup: Clearing the interval when the component unmounts
        return () => clearInterval(intervalId);

    }, [updateHeader, updateButton, flag]);

    // driverId=1;

    const fetchDriversData = async () => {
        try {
            // const response = await fetch('http://localhost:3000/api/drivers');
            const response = await fetch(`${apiUrl}/drivers`);
            if (!response.ok) {
                throw new Error('Failed to fetch drivers data');
            }
            const driversData = await response.json();
            setDrivers(driversData);
        } catch (error) {
            console.error('Error fetching drivers data:', error);
        }

    };

    const handleHeartRateClick = async () => {

        if (!selectedDriverId) {
            window.alert('Please select a driver.');
            return;
        }
        
        try {
            // const response = await fetch(`http://localhost:3000/api/driver-health/${selectedDriverId}`);
            const response = await fetch(`${apiUrl}/driver-health/${selectedDriverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setHeartRates(prevHeartRates => {
                const updatedHeartRates = [...prevHeartRates, driverHealthData.heartRate].slice(-100);
                setGraphData(updatedHeartRates);
                const newMin = Math.min(...updatedHeartRates);
                const newMax = Math.max(...updatedHeartRates);
                setMin(newMin > 50 ? 50 : newMin); // Ensure min is at least 50
                setMax(newMax < 120 ? 120 : newMax); // Ensure max is at most 120
                setStepSize(10);
                setYLabel('Heart Rate');                
                setAnnotation([
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 100,
                        borderColor: 'green',
                        borderWidth: 2,
                        label: {
                            content: 'Highest Heart Rate (100)',
                            enabled: true,
                            position: 'right'
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 60,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Lowest Heart Rate (60)',
                            enabled: true,
                            position: 'right'
                        }
                    }
                ])            
                return updatedHeartRates;                
            });
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }

    };

    const handleFatigueLevelClick = async () => {

        if (!selectedDriverId) {
            window.alert('Please select a driver.');
            return;
        }

        try {
            // const response = await fetch(`http://localhost:3000/api/driver-health/${selectedDriverId}`);
            const response = await fetch(`${apiUrl}/driver-health/${selectedDriverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setFatigueLevels(prevFatigueLevels => {
                const updatedFatigueLevels = [...prevFatigueLevels, driverHealthData.fatigueLevel].slice(-100);
                setGraphData(updatedFatigueLevels);
                const newMin = Math.min(...updatedFatigueLevels);
                const newMax = Math.max(...updatedFatigueLevels);
                setMin(newMin > 0 ? 0 : newMin); // Ensure min is at least 0
                setMax(newMax < 5 ? 5 : newMax); // Ensure max is at most 5
                setStepSize(1);
                setYLabel('Fatigue Level');
                setAnnotation([
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 1,
                        borderColor: 'green',
                        borderWidth: 2,
                        label: {
                            content: 'Desired Fatigue Level (1)',
                            enabled: true,
                            position: 'right'
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 4,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Bad Fatigue Level (4)',
                            enabled: true,
                            position: 'right'
                        }
                    }
                ])
                return updatedFatigueLevels;                
            });
            
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }
    };

    const handleBodyTempClick = async () => {

        if (!selectedDriverId) {
            window.alert('Please select a driver.');
            return;
        }

        try {
            // const response = await fetch(`http://localhost:3000/api/driver-health/${selectedDriverId}`);
            const response = await fetch(`${apiUrl}/driver-health/${selectedDriverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setBodyTemps(prevBodyTemps => {
                const updatedBodyTemps = [...prevBodyTemps, driverHealthData.bodyTemp].slice(-100);
                setGraphData(updatedBodyTemps);
                const newMin = Math.min(...updatedBodyTemps);
                const newMax = Math.max(...updatedBodyTemps);
                setMin(newMin > 90 ? 90 : newMin); // Ensure min is at least 90
                setMax(newMax < 105 ? 105 : newMax); // Ensure max is at most 105
                setStepSize(1);
                setYLabel('Body Temperature');
                setAnnotation([
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 98.6,
                        borderColor: 'green',
                        borderWidth: 2,
                        label: {
                            content: 'Desired Body Temp (98.6)',
                            enabled: true,
                            position: 'right'
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 100.4,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Fever Body Temp (100.4)',
                            enabled: true,
                            position: 'right'
                        }
                    },{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 95,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Hypothermia Body Temp (95)',
                            enabled: true,
                            position: 'right'
                        }
                    }
                ])
                return updatedBodyTemps;                
            });
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }
    };

    const handleHydrationLevelClick = async () => {

        if (!selectedDriverId) {
            window.alert('Please select a driver.');
            return;
        }

        try {
            // const response = await fetch(`http://localhost:3000/api/driver-health/${selectedDriverId}`);
            const response = await fetch(`${apiUrl}/driver-health/${selectedDriverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setHydrationLevels(prevHydrationLevels => {
                const updatedHydrationLevels = [...prevHydrationLevels, driverHealthData.hydrationLevel].slice(-100);
                setGraphData(updatedHydrationLevels);
                const newMin = Math.min(...updatedHydrationLevels);
                const newMax = Math.max(...updatedHydrationLevels);
                setMin(newMin > 20 ? 20 : newMin); // Ensure min is at least 20
                setMax(newMax < 90 ? 90 : newMax); // Ensure max is at most 90
                setStepSize(5);
                setYLabel('Hydration Level');
                setAnnotation([
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 65,
                        borderColor: 'green',
                        borderWidth: 2,
                        label: {
                            content: 'Highest Hydration Level (65)',
                            enabled: true,
                            position: 'right'
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 45,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Lowest Hydration Level (45)',
                            enabled: true,
                            position: 'right'
                        }
                    }
                ]) 
                return updatedHydrationLevels;                
            });
            
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }        
    };

    const handleStressLevelClick = async () => {

        if (!selectedDriverId) {
            window.alert('Please select a driver.');
            return;
        }

        try {
            // const response = await fetch(`http://localhost:3000/api/driver-health/${selectedDriverId}`);
            const response = await fetch(`${apiUrl}/driver-health/${selectedDriverId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver health');
            }
            const driverHealthData = await response.json();
            setDHealthData(driverHealthData);
            setStressLevels(prevStressLevels => {
                const updatedStressLevels = [...prevStressLevels, driverHealthData.stressLevel].slice(-100);
                setGraphData(updatedStressLevels);
                const newMin = Math.min(...updatedStressLevels);
                const newMax = Math.max(...updatedStressLevels);
                setMin(newMin > 0 ? 0 : newMin); // Ensure min is at least 0
                setMax(newMax < 5 ? 5 : newMax); // Ensure max is at most 5
                setStepSize(1);
                setYLabel('Stress Level');
                setAnnotation([
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 1,
                        borderColor: 'green',
                        borderWidth: 2,
                        label: {
                            content: 'Desired Stress Level (1)',
                            enabled: true,
                            position: 'right'
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 4,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Bad Stress Level (4)',
                            enabled: true,
                            position: 'right'
                        }
                    }
                ])
                return updatedStressLevels;                
            });
        } catch (error) {
            console.error('Error fetching driver health:', error);
        }
    };

    const data = {
        labels: Array.from({ length: heartRates.length }, (_, i) => i + 1),
        datasets: [
            {
                label: yLabel,
                data: graphData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'linear', // Use 'linear' scale type for numeric data
                title: {
                    display: true,
                    text: 'Time in seconds' // Label for the x-axis
                },
                min: 0, // Set the minimum value of the y-axis
                max: 100, // Set the maximum value of the y-axis
                ticks: {
                    stepSize: 10 // Set the interval between each tick on the x-axis
                }
            },
            y: {
                title: {
                    display: true,
                    text: yLabel // Label for the y-axis
                },
                min: min, // Set the minimum value of the y-axis
                max: max, // Set the maximum value of the y-axis
                ticks: {
                    stepSize: stepSize // Set the interval between each tick on the y-axis
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Health Parameters Graph'
            },
            annotation: {
                annotations: annotation
            }
        }
    };

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
                                <td><Link onClick={() => setSelectedDriverId(driver.driverId)}>
                    {driver.driverId}
                </Link></td>
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
                                                <td className='hp-head'><span className='test'><img src="/images/hr.png" className="dh-icon" /><Link onClick={() => {handleHeartRateClick(); setFlag(1);}} className='dclick'>HEART RATE</Link></span></td>
                                                <td className='hp-text'>60-100 BPM</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/fl.png" className="dh-icon" /><Link onClick={() => {handleFatigueLevelClick(); setFlag(2);}}className='dclick'>FATIGUE LEVEL</Link></span></td>
                                                <td className='hp-text'>Well Rested (Level 1)</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/bt.png" className="dh-icon" /><Link onClick={() => {handleBodyTempClick(); setFlag(3);}} className='dclick'>BODY TEMP</Link></span></td>
                                                <td className='hp-text'> 98.6 F</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/hl.png" className="dh-icon" /><Link onClick={() => {handleHydrationLevelClick(); setFlag(4);}}className='dclick'>HYDRATION LEVEL</Link></span></td>
                                                <td className='hp-text'>Well Hydrated (50% and above)</td>
                                            </tr>
                                            <tr>
                                                <td className='hp-head'><span className='test'><img src="/images/sl.png" className="dh-icon" /><Link onClick={() => {handleStressLevelClick(); setFlag(5);}} className='dclick'>STRESS LEVEL</Link></span></td>
                                                <td className='hp-text'>Low Stress Level (Level 1)</td>
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
                                <Line ref={chartRef} data={data} options={options} />
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
