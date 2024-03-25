import express from 'express';
import { DriverHealth } from '../../models/DriverHealth.js';

const driverHealthRouter = express.Router();

// GET route handler for fetching all driver health details
driverHealthRouter.get('/driver-health', async (req, res) => {
    try {
        const allDriverHealthDetails = await DriverHealth.find({});
        res.json(allDriverHealthDetails);   
    } catch (error) {
        console.error('Error fetching all driver health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route handler for fetching driver health details by ID
driverHealthRouter.get('/driver-health/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;
        const driverHealthDetail = await DriverHealth.findOne({ driverId: driverId });
        if (!driverHealthDetail) {
            return res.status(404).json({ message: "Driver health details not found" });
        }
        res.json(driverHealthDetail);
    } catch (error) {
        console.error('Error fetching driver health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for adding new driver health details
driverHealthRouter.post('/driver-health', async (req, res) => {
    try {
        const { _id, driverId, heartRate, fatigueLevel, bodyTemp, hydrationLevel, stressLevel, healthStatus } = req.body;
        const driverHealthDetail = await DriverHealth.create({ _id, driverId, heartRate, fatigueLevel, bodyTemp, hydrationLevel, stressLevel, healthStatus });
        res.json(driverHealthDetail);
    } catch (error) {
        console.error('Error adding driver health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating driver health details by ID
driverHealthRouter.put('/driver-health/:driverNo', async (req, res) => {
    try {
        const { driverNo } = req.params;
        const { driverId, heartRate, fatigueLevel, bodyTemp, hydrationLevel, stressLevel, healthStatus } = req.body;
        const updatedDriverHealthDetail = await DriverHealth.findOneAndUpdate({ driverNo }, {
            driverId, heartRate, fatigueLevel, bodyTemp, hydrationLevel, stressLevel, healthStatus
        }, { new: true });
        if (!updatedDriverHealthDetail) {
            return res.status(404).json({ message: "Driver health details not found" });
        }
        res.json(updatedDriverHealthDetail);
    } catch (error) {
        console.error('Error updating driver health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting driver health details by ID
driverHealthRouter.delete('/driver-health/:driverId', async (req, res) => {
    try {
        const { driverId } = req.params;
        const deletedDriverHealthDetail = await DriverHealth.findOneAndDelete({ driverId });
        if (!deletedDriverHealthDetail) {
            return res.status(404).json({ message: "Driver health details not found" });
        }
        res.json({ message: "Driver health details deleted successfully" });
    } catch (error) {
        console.error('Error deleting driver health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default driverHealthRouter;
