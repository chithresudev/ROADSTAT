import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Maintenance.css'

function MaintenancePage({updateHeader, updateButton}) {

    useEffect(() => {
        updateHeader('Maintenance');
        updateButton('Maintenance');
    }, [updateHeader, updateButton]);
    const [activeButton, setActiveButton] = useState('Engine Health');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }
    return (
    <div className='main'>
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
        <div className='card'>
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
                   
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Brake System' && (
        <div className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Name</th>
                        <th>Pad Wear</th>
                        <th>Fluid Level</th>
                        <th>Pressure</th>
                        <th>ABS Status</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Fuel System' && (
        <div className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Name</th>
                        <th>Fuel Level</th>
                        <th>Fuel Consumption Rate</th>
                        <th>Fuel Efficiency</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Tire Health' && (
        <div className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Name</th>
                        <th>Tire Pressure</th>
                        <th>Temperature</th>
                        <th>Tire Depth</th>
                        <th>Tire Age</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Battery Status' && (
        <div className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Truck No</th>
                        <th>Truck Name</th>
                        <th>Battery (V)</th>
                        <th>Charge Status</th>
                        <th>Health %</th>
                        <th>Last Replace</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
         )}
         {activeButton === 'Transmission' && (
        <div className='card'>
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
                   
               </tbody>
           </table>
        </div>
         )}
    </div>
    );
}

export default MaintenancePage;
