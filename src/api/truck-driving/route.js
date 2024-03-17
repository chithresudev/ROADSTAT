import express from 'express';
import { TruckDriving } from '../../models/TruckDriving.js';

const truckDrivingRouter = express.Router();

// GET route handler for fetching truck driving details by ID
truckDrivingRouter.get('/truck-driving/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const truckDrivingDetail = await TruckDriving.findOne({ truckId: truckId });
        if (!truckDrivingDetail) {
            return res.status(404).json({ message: "Truck driving details not found" });
        }
        res.json(truckDrivingDetail);
    } catch (error) {
        console.error('Error fetching truck driving details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for adding new truck driving details
truckDrivingRouter.post('/truck-driving', async (req, res) => {
    try {
        const { truckId, destinationId, driverId, actualArrivalTime, eta, status } = req.body;
        const truckDrivingDetail = await TruckDriving.create({ truckId, destinationId, driverId, actualArrivalTime, eta, status });
        res.json(truckDrivingDetail);
    } catch (error) {
        console.error('Error adding truck driving details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating truck driving details by ID
truckDrivingRouter.put('/truck-driving/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const { destinationId, driverId, actualArrivalTime, eta, status } = req.body;
        const updatedTruckDrivingDetail = await TruckDriving.findOneAndUpdate({ truckId }, {
            truckId, destinationId, driverId, actualArrivalTime, eta, status
        }, { new: true });
        if (!updatedTruckDrivingDetail) {
            return res.status(404).json({ message: "Truck driving details not found" });
        }
        res.json(updatedTruckDrivingDetail);
    } catch (error) {
        console.error('Error updating truck driving details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting truck driving details by ID
truckDrivingRouter.delete('/truck-driving/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const deletedTruckDrivingDetail = await TruckDriving.findOneAndDelete({ truckId });
        if (!deletedTruckDrivingDetail) {
            return res.status(404).json({ message: "Truck driving details not found" });
        }
        res.json({ message: "Truck driving details deleted successfully" });
    } catch (error) {
        console.error('Error deleting truck driving details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default truckDrivingRouter;
