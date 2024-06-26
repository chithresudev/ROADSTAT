import express from 'express';
import { Driver } from '../../Models/Driver.js';

const driverRouter = express.Router();

driverRouter.get('/drivers', async (req, res) => {
    try {
        const allDrivers = await Driver.find();
        res.json(allDrivers);
    } catch (error) {
        console.error('Error fetching all drivers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.get('/drivers/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;
        const driverDetail = await Driver.findById(driverId);
        if (!driverDetail) {
            return res.status(404).json({ message: "Driver details not found" });
        }
        res.json(driverDetail);
    } catch (error) {
        console.error('Error fetching driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.post('/drivers', async (req, res) => {
    try {
        const { _id, driverId, driverName, knownHealthIssues, experience, status } = req.body;
        const driverDetail = await Driver.create({ _id, driverId, driverName, knownHealthIssues, experience, status });
        res.json(driverDetail);
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.put('/drivers/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;
        const { driverName, knownHealthIssues, experience, status } = req.body;
        const updatedDriver = await Driver.findByIdAndUpdate(driverId, { driverName, knownHealthIssues, experience, status }, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.delete('/drivers/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;
        const deletedDriver = await Driver.findByIdAndDelete(driverId);
        if (!deletedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json({ message: "Driver deleted successfully" });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default driverRouter;