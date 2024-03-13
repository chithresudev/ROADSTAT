import React, { useState, useEffect } from 'react';
import './Track.css'

function TrackPage({updateHeader, updateButton}) {
    useEffect(() => {
        updateHeader('Track');
        updateButton('Track');
    }, [updateHeader, updateButton]);
    return (
        <div>
            
        </div>
    );
}

export default TrackPage;
