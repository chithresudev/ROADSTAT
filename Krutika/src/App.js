import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './TruckLocation';
import MapComponent from './MapComponent';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        
        <Route path="/component1" element={<Component1 />} />
        <Route path="/component2" element={<Component2 />} />
        <Route path="/component3" element={<Component3 />} />
        <Route path="/mapcomponent" element={<MapComponent />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
