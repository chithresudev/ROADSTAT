
import React, { useState } from "react";
import "./Component1.css";

const Card = ({ truckData, thresholdData }) => {
  const [isToggleOn, setToggleOn] = useState(false);

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
    
  };

  return (
    <div className="card-container">
     
      <div className="card">
        <div className="sectionBackground">
          {Object.entries(truckData).map(([label, value]) => (
            <div key={label} className="field">
              <strong>{label}:</strong> {value}
            </div>
          ))}
        </div>
        <a href="#" className="link">
          Click here for more
        </a>
        Mark for maintenance
        <div className="toggle-switch" onClick={handleToggle}>
          <div className={`slider ${isToggleOn ? "checked" : ""}`}></div>
        </div>
        <button className="alertButton">Alert Driver</button>
      </div>

      {/* Threshold Card */}
      <div className="threshold-card">
        <h2>Threshold Values</h2>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
            </tr>
          </thead>
          <tbody>
            {thresholdData.map(({ data, value }, index) => (
              <tr key={index}>
                <td>{data}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Component1 = () => {
  const truckData = {
    "Truck number": "ABC123",
    Driver: "John Doe",
    Speed: "60pmh",
    "Fuel System Status": "Normal",
    "Fuel Pressure": "50 psi",
    "Gas Emissions": "Low",
  };

  const thresholdData = Array.from({ length: 8 }, (_, index) => ({
    data: `Data ${index + 1}`,
    value: `Value ${index + 1}`,
  }));

  return <Card truckData={truckData} thresholdData={thresholdData} />;
};


// const Component1 = () => {
//   // Define columns for the table
//   const columns = ["Truck number", "Driver", "Speed", "Fuel System Status", "Fuel Pressure", "Gas Emissions"];
  
//   // Dummy data for demonstration purposes
//   const data = [
//     { "Truck number": "ABC123", "Driver": "John Doe", "Speed": "60pmh", "Fuel System Status": "Normal", "Fuel Pressure": "50 psi", "Gas Emissions": "Low" },
//     // ... more rows
//   ];

//   // Render the DataTable component with the specified columns and data
//   return (
//     <div className="card-container">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };


export default Component1;
