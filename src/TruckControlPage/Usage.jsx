import React, { useState, useEffect } from 'react';
import './Usage.css'

function UsagePage({updateHeader, updateButton}) {
    useEffect(() => {
        updateHeader('Truck Control / Usage');
        updateButton('Usage');
    }, [updateHeader, updateButton]);
    return (
        <div>
            
        </div>
    );
}

export default UsagePage;
