import React, { useState, useEffect } from 'react';
import './Driver.css'

function DriverPage({updateHeader, updateButton}) {
    useEffect(() => {
        updateHeader('Driver');
        updateButton('Driver');
    }, [updateHeader, updateButton]);
    return (
        <div>
            
        </div>
    );
}

export default DriverPage;
