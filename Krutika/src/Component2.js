import React from "react";
import './HealthCard.css';


const HealthCard =  () =>{
    return(
        <div className="health-card">
      <h3>Health Parameters</h3>
      <table className="health-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td className="td-purple">HEALTH RATE</td>
            <td className="td-black">80/100BPM</td>
        </tr>
        <tr>
            <td className="td-purple">FATIGUE LEVEL</td>
            <td className="td-black">Well Rested</td>
        </tr>
        <tr>
            <td className="td-purple">BODY TEMP</td>
            <td className="td-black">/ 37 c</td>
        </tr>
        <tr>
            <td className="td-purple">HYDRATION LEVEL</td>
            <td className="td-black">Well Hydrated</td>
        </tr>
        <tr>
            <td className="td-purple">STRESS LEVEL</td>
            <td className="td-black">Low Stress Level</td>
        </tr>
        </tbody>
      </table>
      <button className="alertButton">Alert Driver!</button>
    </div>
    );
};

export default HealthCard;