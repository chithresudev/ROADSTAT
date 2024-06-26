import express from 'express';
import { TruckControl } from '../../Models/TruckControl.js';

const truckControlRouter = express.Router();

// GET route handler to fetch all truck control details
truckControlRouter.get('/truck-control', async (req, res) => {
    try {
      const allTruckControlDetails = await TruckControl.find();
      res.json(allTruckControlDetails);
    } catch (error) {
      console.error('Error fetching truck control details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// GET route handler for fetching truck control details by ID
truckControlRouter.get('/truck-control/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const truckControlDetail = await TruckControl.findOne({ truckId: truckId });
        if (!truckControlDetail) {
            return res.status(404).json({ message: "Truck control details not found" });
        }
        res.json(truckControlDetail);
    } catch (error) {
        console.error('Error fetching truck control details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for adding new truck control details
truckControlRouter.post('/truck-control', async (req, res) => {
    try {
        const { _id, truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth } = req.body;
        const truckControlDetail = await TruckControl.create({ _id, truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth });
        
        // Now, call /metrics/:truckId endpoint
        const metricsResponse = await fetch(`http://localhost:3000/api/metrics/${truckId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Assuming you want to send some metrics data, adjust accordingly
                speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth
            }),
        });

        if (!metricsResponse.ok) {
            throw new Error('Failed to post to /metrics/:truckId');
        }

        const metricsData = await metricsResponse.json();
        
        res.json({truckControlDetail, metricsData});
    } catch (error) {
        console.error('Error adding truck control details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating truck control details by ID
truckControlRouter.put('/truck-control/:truckNo', async (req, res) => {
    try {
        const { truckNo } = req.params;
        const { truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth } = req.body;
        const updatedTruckControlDetail = await TruckControl.findOneAndUpdate({ truckNo }, {
            truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth
        }, { new: true });
        if (!updatedTruckControlDetail) {
            return res.status(404).json({ message: "Truck control details not found" });
        }
        res.json(updatedTruckControlDetail);
    } catch (error) {
        console.error('Error updating truck control details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting truck control details by ID
truckControlRouter.delete('/truck-control/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const deletedTruckControlDetail = await TruckControl.findOneAndDelete({ truckId });
        if (!deletedTruckControlDetail) {
            return res.status(404).json({ message: "Truck control details not found" });
        }
        res.json({ message: "Truck control details deleted successfully" });
    } catch (error) {
        console.error('Error deleting truck control details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default truckControlRouter;
