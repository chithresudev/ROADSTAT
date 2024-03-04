import React from "react";
import "./TruckLocation.css"; // Ensure you have a corresponding CSS file

const TruckLocation = () => {
  return (
    <div className="card-container">
      <div className="card">
      <table className="card-table">
        <tbody>
          <tr>
            <td className="field-name">Source:</td>
            <td className="field-value">GPS</td>
          </tr>
          <tr>
            <td className="field-name">Driver Id:</td>
            <td className="field-value">123455677</td>
          </tr>
          <tr>
            <td className="field-name">Destination Id:</td>
            <td className="field-value">34778264457</td>
          </tr>
          <tr>
            <td className="field-name">Truck Condition:</td>
            <td className="field-value">
              <a href="#" className="condition-link">
                Click here
              </a>
            </td>
          </tr>
          <tr>
            <td className="field-name">Status:</td>
            <td className="field-value">on time</td>
          </tr>
          <tr>
            <td className="field-name">Trailer Location:</td>
            <td className="field-value">
              <a href="#" className="location-link">
                Trailer Location
              </a>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="field-section">
              <button className="alertButton">Alert</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TruckLocation;
