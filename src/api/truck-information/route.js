import express from 'express';
import { TruckInformation } from '../../models/TruckInformation.js';

const truckInformationRouter = express.Router();

// GET route handler for fetching truck information by ID
// GET route handler for fetching all truck information
truckInformationRouter.get('/truck-information', async (req, res) => {
    try {
        const allTruckInformation = await TruckInformation.find();
        res.json(allTruckInformation);
    } catch (error) {
        console.error('Error fetching all truck information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

truckInformationRouter.get('/truck-information/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const truckInformationDetail = await TruckInformation.findById(truckId);
        if (!truckInformationDetail) {
            return res.status(404).json({ message: "Truck information details not found" });
        }
        res.json(truckInformationDetail);
    } catch (error) {
        console.error('Error fetching truck information details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// POST route handler for adding new truck information
truckInformationRouter.post('/truck-information', async (req, res) => {
    try {
        const { _id, truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration } = req.body;
        const truckInformationDetail = await TruckInformation.create({ _id, truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration });
        res.json(truckInformationDetail);
    } catch (error) {
        console.error('Error adding truck information details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating truck information by ID
truckInformationRouter.put('/truck-information/:truckNo', async (req, res) => {
    try {
        const { truckNo } = req.params;
        const { truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration } = req.body;
        const updatedTruckInformationDetail = await TruckInformation.findOneAndUpdate({ truckNo }, {
            truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration
        }, { new: true });
        if (!updatedTruckInformationDetail) {
            return res.status(404).json({ message: "Truck information details not found" });
        }
        res.json(updatedTruckInformationDetail);
    } catch (error) {
        console.error('Error updating truck information details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting truck information by ID
truckInformationRouter.delete('/truck-information/:truckId', async (req, res) => {
    try {
        const { truckId } = req.params;
        const deletedTruckInformationDetail = await TruckInformation.findOneAndDelete({ truckId });
        if (!deletedTruckInformationDetail) {
            return res.status(404).json({ message: "Truck information details not found" });
        }
        res.json({ message: "Truck information details deleted successfully" });
    } catch (error) {
        console.error('Error deleting truck information details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default truckInformationRouter;